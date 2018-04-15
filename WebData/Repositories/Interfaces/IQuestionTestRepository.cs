using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebData.Data;

namespace WebData.Repositories.Interfaces
{
    public interface IQuestionTestRepository: IRepository<QuestionTest>
    {
        void Add(int testId, List<int> questionIds);
    }
}
