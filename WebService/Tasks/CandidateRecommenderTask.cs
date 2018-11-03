using FluentScheduler;
using System;
using System.Collections.Generic;
using WebData;
using WebData.Data;
using WebData.IdentityModels;
using WebData.Repositories;
using System.Linq;
using WebData.ConstValues;
using Microsoft.EntityFrameworkCore;
using WebService.Init;
using WebService.Services;
using WebData.Dtos;
using WebData.HelperModels;
using Microsoft.Extensions.Logging;

namespace WebService.Tasks
{
    public class CandidateRecommenderTask: IJob
    {
        private static volatile bool isRunning = false;

        public void Execute()
        {
            if(ApplicationDbContext.options != null && !isRunning)
            {
                isRunning = true;
                ApplicationDbContext appDbContext = new ApplicationDbContext(ApplicationDbContext.options);

                try
                {
                    // Load relevant constants from Configration file (appSettings)
                    int minQuestionsRecommend = ConfigurationManager.Instance.GetValue("MIN_QUESTIONS_RECOMMEND", Consts.MIN_QUESTIONS_RECOMMEND);
                    double maxQuestionRank = ConfigurationManager.Instance.GetValue("MAX_QUESTION_RANK", Consts.MAX_QUESTION_RANK);
                    double minDaysAfterRejected = ConfigurationManager.Instance.GetValue("NUM_DAYS_AFTER_REJECTED", Consts.NUM_DAYS_AFTER_REJECTED);

                    // Load relevant candidates (which enabled to send their resume) and solved at least MIN_QUESTIONS_RECOMMEND
                    IEnumerable<CandidateUser> candidates = appDbContext.Set<CandidateUser>()
                        .Include("Questions.Question")
                        .Where(c => c.AllowSendResume
                        && c.Questions.Where(q => q.IsDone).Count() >= minQuestionsRecommend);

                    // Load relevant recruiters (which enabled to receive notifications)
                    Dictionary<string, RecruiterUser> recruiters = appDbContext.Set<RecruiterUser>()
                        .Include(r => r.Identity)
                        .Where(r => r.ReceiveNotifications).ToDictionary(r => r.IdentityId, r => r);

                    // Load only OPEN positions which created by recruiters who enabled notifications
                    IEnumerable<Position> positions = appDbContext.Set<Position>()
                        .Include(p => p.PositionSkills)
                        .Where(p => p.Status == (int) PositionStatus.Opened && recruiters.ContainsKey(p.CreatedBy));


                    // Load recommendations which is relevant to filter users
                    /*
                     * It is uses in order to prevent from sending recommendations to recruiters
                     * about candidates which sent a recommendation already
                     */ 
                    var recommendations = appDbContext.Set<RecommendationNotification>()
                        .Where(r => !(r.Approved == false && r.DateResponded.Value.AddDays(minDaysAfterRejected) < DateTime.Now))
                        .ToLookup(r => r.PositionId, r => r);


                    foreach(Position position in positions)
                    {
                        IEnumerable<PositionSkill> positionSkills = position.PositionSkills;
                        Dictionary<int, double> matchingNumbersOfCandidates = new Dictionary<int, double>();

                        foreach(CandidateUser candidate in candidates)
                        {
                            bool skipToNextCandidate = false;
                            //if(recommendations.Contains(position.Id))
                            //{

                            //}
                            foreach(RecommendationNotification recommendation in recommendations[position.Id])
                            {
                                if(recommendation.CandidateId == candidate.Id)
                                {
                                    skipToNextCandidate = true;
                                    break;
                                }
                            }
                            if(skipToNextCandidate) continue;

                            double matchingNumber = 0;
                            foreach(PositionSkill positionSkill in positionSkills)
                            {
                                double skillGrade = 0;
                                double maxTotalRank = 0;
                                double totalRank = 0;
                                double sumQuestionsRank = 0;

                                // Load questions which done by the candidate, and has at least one skill of this position
                                var relevantQuestions = candidate.Questions.Where(cq => cq.IsDone && cq.Question.Rank > 0);
                                var questionsWithAtLeastOneRelevantSkill = new List<CandidateQuestion>();

                                foreach(CandidateQuestion cq in relevantQuestions)
                                {
                                    if(Utils.ConvertStringIdsToList(cq.Question.TestedSkills).Contains(positionSkill.Id))
                                    {
                                        questionsWithAtLeastOneRelevantSkill.Add(cq);
                                    }
                                }
                                relevantQuestions = questionsWithAtLeastOneRelevantSkill;

                                maxTotalRank = relevantQuestions.Count() * maxQuestionRank;

                                if(maxTotalRank > 0)
                                {
                                    foreach(var relevantQuestion in relevantQuestions)
                                    {
                                        sumQuestionsRank += relevantQuestion.Question.Rank / maxQuestionRank;
                                        totalRank += relevantQuestion.Question.Rank;
                                    }

                                    skillGrade = sumQuestionsRank * (totalRank / maxTotalRank) * positionSkill.SkillWeight;
                                    matchingNumber += skillGrade;
                                }
                            }
                            if(matchingNumber > 0)
                            {
                                matchingNumbersOfCandidates.Add(candidate.Id, matchingNumber);
                            }
                        }

                        // Getting the recommended candidate which his matching number is the heighest
                        double max = 0;
                        int candidateId = -1;
                        foreach(var matchingNumber in matchingNumbersOfCandidates)
                        {
                            if(matchingNumber.Value > max)
                            {
                                max = matchingNumber.Value;
                                candidateId = matchingNumber.Key;
                            }
                        }

                        if(candidateId != -1 && recruiters.ContainsKey(position.CreatedBy))
                        {
                            RecruiterUser relevantRecruiter = recruiters[position.CreatedBy];

                            // Update recommentdation table
                            Notification notificiation = new Notification()
                            {
                                Type = (int) NotificationType.Recommendation,
                                DateCreated = DateTime.Now,
                                IsViewed = false,
                                Recipent = relevantRecruiter.IdentityId,
                            };

                            RecommendationNotification recommendation = new RecommendationNotification()
                            {
                                Approved = null,
                                Notification = notificiation,
                                CandidateId = candidateId,
                                PositionId = position.Id,
                            };
                            var otherDbContext = new ApplicationDbContext(ApplicationDbContext.options);
                            new RecommendationNotificationsRepository(otherDbContext).Add(recommendation);
                            otherDbContext.SaveChanges();


                            var genericNotificationToClient = new GenericNotification()
                            {
                                NotificationId = recommendation.Notification.Id,
                                Type = recommendation.Notification.Type,
                                DateCreated = recommendation.Notification.DateCreated,
                                IsViewed = recommendation.Notification.IsViewed,
                                Approved = recommendation.Approved,
                                CandidateId = recommendation.CandidateId,
                            };

                            // Send the recommendation
                            NotificationsHub.Notify(relevantRecruiter.Identity.Email, genericNotificationToClient);
                        }

                        //double maxMatchingNumber = matchingNumbersOfCandidates.Values.Max();
                        //int candidateId = matchingNumbersOfCandidates.Where((key, value) => value == maxMatchingNumber).First().Key;
                    }
                }
                catch(Exception)
                {
                    // TODO: write to log
                }
                finally
                {
                    isRunning = false;
                }
            }
        }
    }
}