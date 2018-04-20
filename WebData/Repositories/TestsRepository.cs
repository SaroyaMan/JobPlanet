using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.IdentityModels;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class TestsRepository : Repository<Test>, ITestsRepository
    {
        public TestsRepository(DbContext context) : base(context) { }

        public TestDto Add(TestDto testToSave, AppUser user)
        {
            List<int> questionsIds = Utils.ConvertStringIdsToList(testToSave.Questions);

            testToSave.LastUpdateDate = testToSave.DateCreated = DateTime.Now;
            testToSave.LastUpdateByDisplayName =
                testToSave.CreatedByDisplayName = Utils.FormatFullName(user.FirstName, user.LastName);

            Test test = Mapper.Map<TestDto, Test>(testToSave);

            // Initialize properties which are not in the dto
            test.CreatedBy = test.LastUpdateBy = user.Id;
            test.FinalDifficultyLevel = new QuestionsRepository(_context)
                .Find(q => questionsIds.Contains(q.Id))
                .Select(q => q.Rank)
                .Average();

            // save in db
            base.Add(test);

            _context.SaveChanges();

            new QuestionTestRepository(_context).Add(test.Id, questionsIds);

            return Mapper.Map<Test, TestDto>(test);
        }
    }
}