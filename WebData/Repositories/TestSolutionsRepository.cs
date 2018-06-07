using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories.Interfaces;
using System.Linq;
using System;
using WebData.IdentityModels;
using WebData.ConstValues;

namespace WebData.Repositories
{
    public class TestSolutionsRepository: Repository<TestSolution>, ITestSolutionsRepository
    {
        public TestSolutionsRepository(DbContext context) : base(context) { }


        public TestSolutionDto SaveTestSolution(TestSolutionDto testSolutionDto)
        {
            testSolutionDto.Email = testSolutionDto.Email.ToLower();
            TestSolution testSolution = Mapper.Map<TestSolution>(testSolutionDto);

            string fullName = testSolution.FullName;
            string email = testSolution.Email;

            Test test = _context.Set<Test>().SingleOrDefault(t => t.Id == testSolution.TestId);


            // Check if user who solved the test exists
            var user = _context.Set<AppUser>().SingleOrDefault(u => u.Email.ToLower().Equals(testSolution.Email));
            if(user != null)
            {
                var candidates = _context.Set<CandidateUser>().Where(c => c.Identity.Id.Equals(user.Id))?.Include(c => c.Identity);
                if(candidates != null && candidates.Count() > 0)
                {
                    var candidateUser = candidates.First();
                    testSolution.CandidateUserId = candidateUser.Id;
                    testSolution.IsMember = true;
                    testSolution.FullName = $"{candidateUser.Identity.FirstName} {candidateUser.Identity.LastName}";


                    fullName = testSolution.FullName;
                    email = candidateUser.Identity.Email;
                }
            }

            new PositionsRepository(_context).AddCandidateToPotentials(
                test.PositionId,
                testSolution.CandidateUserId ?? -1,
                CandidatePositionStatus.PendingAnswer, fullName, email);

            testSolution.DateCreated = DateTime.Now;
            Add(testSolution);
            _context.SaveChanges();

            return Mapper.Map<TestSolutionDto>(testSolution);
        }
    }
}