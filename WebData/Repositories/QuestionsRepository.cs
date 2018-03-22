using System;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;
using WebData.HelperModels;
using System.Collections.Generic;

namespace WebData.Repositories {
    public class QuestionsRepository: Repository<Question>, IQuestionsRepository {

        public QuestionsRepository(DbContext context) : base(context) { }

        public IEnumerable<Question> GetQuestionsByQuery(SearchQuestionsQuery query) {
            return base.Find(q => q.Title.Contains(query.Title));
        }
    }
}