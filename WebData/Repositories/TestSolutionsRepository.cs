using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories.Interfaces;
using System.Linq;
using System;
using WebData.IdentityModels;

namespace WebData.Repositories
{
    public class TestSolutionsRepository: Repository<TestSolution>, ITestSolutionsRepository
    {
        public TestSolutionsRepository(DbContext context) : base(context) { }


        public TestSolutionDto SaveTestSolution(TestSolutionDto testSolutionDto)
        {

            TestSolution testSolution = Mapper.Map<TestSolution>(testSolutionDto);

            // Check if user who solved the test exists
            var user = _context.Set<AppUser>().SingleOrDefault(u => u.Email.Equals(testSolution.Email));
            if(user != null)
            {
                testSolution.IsMember = true;
                var candidateUser = _context.Set<CandidateUser>().SingleOrDefault(c => c.Identity.Id.Equals(user.Id));
                if(candidateUser != null)
                {
                    testSolution.CandidateUserId = candidateUser.Id;
                }
                else
                {
                    throw new Exception("User ID found, but candidate havn't found");
                }
            }

            testSolution.DateCreated = DateTime.Now;
            this.Add(testSolution);
            _context.SaveChanges();

            return Mapper.Map<TestSolutionDto>(testSolution);
        }
    }
}