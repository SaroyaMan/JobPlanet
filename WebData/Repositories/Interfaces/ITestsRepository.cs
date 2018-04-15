using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebData.Data;
using WebData.Dtos;
using WebData.IdentityModels;

namespace WebData.Repositories.Interfaces
{
    public interface ITestsRepository: IRepository<Test>
    {
        TestDto Add(TestDto testToSave, AppUser user);
    }
}
