
using System.Collections.Generic;
using WebData.IdentityModels;

namespace WebService.Auth {

    public sealed class AppUsersHolder {

        private static volatile AppUsersHolder instance;
        private static object lockObject = new object();

        private static Dictionary<string, AppUser> users = new Dictionary<string, AppUser>();

        private AppUsersHolder() { }

        public static AppUsersHolder Instance {
            get {
                if(instance == null) {
                    lock(lockObject) {
                        instance = new AppUsersHolder();
                    }
                }
                return instance;
            }
        }

        public AppUser GetUserByToken(string token) {
            return token != null && users.ContainsKey(token) ? users[token] : null;
        }

        public void SetAppUser(string token, AppUser client) {
            if(users.ContainsKey(token)) {
                users[token] = client;
            }
            else {
                users.Add(token, client);
            }
        }

    }
}