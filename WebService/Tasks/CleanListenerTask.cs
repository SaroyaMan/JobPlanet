using FluentScheduler;
using System.Collections.Generic;
using WebService.Helpers;
using WebService.Services;

namespace WebService.Tasks
{
    public class CleanListenerTask: IJob
    {

        public void Execute()
        {
            var listeners = NotificationsHub.Listeners;

            List<UserListener> usersToRemove = new List<UserListener>();

            foreach(var value in listeners.Values)
            {
                foreach(UserListener listener in value.Values)
                {
                    if(listener.IsExpired())
                    {
                        usersToRemove.Add(listener);
                    }
                }
            }

            foreach(UserListener user in usersToRemove)
            {
                NotificationsHub.RemoveUserFromListeners(user.Email, user.ConnectionId);
            }
        }
    }
}
