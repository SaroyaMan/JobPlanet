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

namespace WebService.Tasks
{
    public class CandidateRecommenderTask: IJob
    {
        // TEMPORARY - TO BE CHANGED
        private double skillWeight = 1;
        private static bool isRunning = false;

        public void Execute()
        {
            if(ApplicationDbContext.options != null && !isRunning)
            {
                isRunning = true;
                ApplicationDbContext appDbContext = new ApplicationDbContext(ApplicationDbContext.options);

                // Load all skills
                var skills = new SkillsRepository(appDbContext).GetAll();

                // Load relevant candidates (which enabled to send their resume) and solved at least MIN_QUESTIONS_RECOMMEND
                IEnumerable<CandidateUser> candidates = appDbContext.Set<CandidateUser>()
                    .Include("Questions.Question")
                    .Where(c => c.AllowSendResume && c.Questions.Count() >= Consts.MIN_QUESTIONS_RECOMMEND);

                // Load relevant recruiters (which enabled to receive notifications)
                Dictionary<string, RecruiterUser> recruiters = appDbContext.Set<RecruiterUser>()
                    .Where(r => r.ReceiveNotifications).ToDictionary(r => r.IdentityId, r => r);

                // Load only OPEN positions which created by recruiters who enabled notifications
                IEnumerable<Position> positions = new PositionsRepository(appDbContext)
                    .GetAll()
                    .Where(p => p.Status == (int) PositionStatus.Opened && recruiters.ContainsKey(p.CreatedBy));


                foreach(Position position in positions)
                {
                    List<int> skillIds = Utils.ConvertStringIdsToList(position.RequiredSkills);
                    Dictionary<int, double> matchingNumbersOfCandidates = new Dictionary<int, double>();

                    foreach(CandidateUser candidate in candidates)
                    {
                        double matchingNumber = 0;
                        foreach(int skillId in skillIds) 
                        {
                            double skillGrade = 0;
                            double maxTotalRank = 0;
                            double totalRank = 0;
                            double sumQuestionsRank = 0;

                            // Load questions which done by the candidate, and has at least one skill of this position
                            var relevantQuestions = candidate.Questions.Where(cq => cq.IsDone);
                            var questionsWithAtLeastOneRelevantSkill = new List<CandidateQuestion>();

                            foreach(CandidateQuestion cq in relevantQuestions)
                            {
                                if(Utils.ConvertStringIdsToList(cq.Question.TestedSkills).Contains(skillId))
                                {
                                    questionsWithAtLeastOneRelevantSkill.Add(cq);
                                }
                            }
                            relevantQuestions = questionsWithAtLeastOneRelevantSkill;

                            maxTotalRank = relevantQuestions.Count() * Consts.MAX_QUESTION_RANK;

                            foreach(var relevantQuestion in relevantQuestions)
                            {
                                sumQuestionsRank += relevantQuestion.Question.Rank / Consts.MAX_QUESTION_RANK;
                                totalRank += relevantQuestion.Question.Rank;
                            }

                            skillGrade = sumQuestionsRank * (totalRank / maxTotalRank) * skillWeight;
                            matchingNumber += skillGrade;
                        }
                        matchingNumbersOfCandidates.Add(candidate.Id, matchingNumber);
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

                    if(candidateId != -1)
                    {
                        // TODO: Send recommendation of that candidate

                        // TODO: Update recommentdation table
                    }

                    //double maxMatchingNumber = matchingNumbersOfCandidates.Values.Max();
                    //int candidateId = matchingNumbersOfCandidates.Where((key, value) => value == maxMatchingNumber).First().Key;
                }
                isRunning = false;
            }
        }
    }
}