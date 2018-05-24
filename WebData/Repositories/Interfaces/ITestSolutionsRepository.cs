using WebData.Dtos;

namespace WebData.Repositories.Interfaces
{
    public interface ITestSolutionsRepository
    {
        TestSolutionDto SaveTestSolution(TestSolutionDto testSolutionDto);
    }
}
