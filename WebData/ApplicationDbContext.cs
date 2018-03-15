﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.IdentityModels;

namespace WebData {
    public class ApplicationDbContext: IdentityDbContext<AppUser> {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) { }

        public string CurrentUserId { get; set; }
        public DbSet<CandidateUser> Candidates { get; set; }
        public DbSet<RecruiterUser> Recruiters { get; set; }
        public DbSet<Skill> Skills { get; set; }
    }
}
