
using System.Collections.Generic;
using WebData;
using WebData.IdentityModels;
using System.Linq;

namespace WebService.Auth
{

    public sealed class AppUsersHolder
    {

        private static volatile AppUsersHolder instance = new AppUsersHolder();

        private static Dictionary<string, AppUser> users = new Dictionary<string, AppUser>();

        private AppUsersHolder() { }

        public static AppUsersHolder Instance
        {
            get
            {
                return instance;
            }
        }

        public AppUser GetUserById(string userId)
        {

            return userId != null && users.ContainsKey(userId) ? users[userId] : null;
        }

        public string GetUserFullName(string userId)
        {
            if(userId != null && users.ContainsKey(userId))
            {
                return users[userId].FirstName + ' ' + users[userId].LastName;
            }


            ApplicationDbContext appDbContext = new ApplicationDbContext(ApplicationDbContext.options);
            AppUser user = appDbContext.Set<AppUser>().Where(u => u.Id.Equals(userId)).SingleOrDefault();
            if(user != null)
            {
                users.Add(userId, user);
                return users[userId].FirstName + ' ' + users[userId].LastName;
            }
            return "";
        }
    }
}