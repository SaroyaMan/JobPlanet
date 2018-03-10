
using WebData.Repositories.Interfaces;

namespace WebData {

    public interface IUnitOfWork {

        ISkillsRepository Skills { get; }

        int SaveChanges();
    }
}
