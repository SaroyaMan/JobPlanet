using System;
using WebData.Repositories;
using WebData.Repositories.Interfaces;

namespace WebData {

    //public class UnitOfWork: IUnitOfWork {
    //    readonly ApplicationDbContext _context;

    //    ISkillsRepository _skills;



    //    public UnitOfWork(ApplicationDbContext context) {
    //        _context = context;
    //    }

    //    public ISkillsRepository Skills {
    //        get {
    //            if(_skills == null) {
    //                _skills = new SkillsRepository(_context);
    //            }
    //            return _skills;
    //        }
    //    }

    //    public int SaveChanges() {
    //        return _context.SaveChanges();
    //    }
    //}
}
