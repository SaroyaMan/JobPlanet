using System;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;
using WebData.HelperModels;
using System.Collections.Generic;
using System.Linq;

namespace WebData.Repositories {
    public class QuestionsRepository: Repository<Question>, IQuestionsRepository {

        public QuestionsRepository(DbContext context) : base(context) { }

        public IEnumerable<Question> GetQuestionsByQuery(SearchQuestionsQuery query) {

            IEnumerable<Question> results =  base.Find(q =>
            (query.Title != null && query.Title.Length > 0 ? q.Title.Contains(query.Title) : true)
            && (query.MinRank != null ? q.Rank >= query.MinRank : true)
            && (query.MaxRank != null ? q.Rank <= query.MaxRank : true));

            if(query.SkillIds != null && query.SkillIds.Count > 0) {
                results = results.Where(q =>
                        Array.ConvertAll((q.TestedSkills.Split(',')), s => int.Parse(s)).
                        Join(query.SkillIds, qSid => qSid, sId => sId, (qSid, sId) => sId).Count() > 0);

            }
            return results;
        }
    }
}