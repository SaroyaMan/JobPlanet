using System.Collections.Generic;
using WebData.Data;

namespace WebData.Repositories.Interfaces
{
    public interface ITestQuestionsRepository: IRepository<TestQuestion>
    {
        void Add(int testId, List<int> questionIds);
    }
}
