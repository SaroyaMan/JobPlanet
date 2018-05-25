using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using WebService.Helpers;

namespace WebService.Services
{
    public class NotificationsHub: Hub
    {

        // Register a new connected user (base on his email address)
        [HubMethodName("Register")]
        public void Register(string email)
        {
            lock(Listeners)
            {
                if(!Listeners.ContainsKey(email))
                {
                    Listeners[email] = new Dictionary<string, UserListener>();
                }
                if(Listeners[email] != null)
                {
                    Listeners[email][Context.ConnectionId] = new UserListener(Context.ConnectionId, email);
                }
            }
        }

        [HubMethodName("Unregister")]
        public void Unregister(string email)
        {
            RemoveUserFromListeners(email, Context.ConnectionId);
        }

        [HubMethodName("Ping")]
        public void Ping(string email)
        {
            if(Listeners.ContainsKey(email) && Listeners[email] != null && Listeners[email].ContainsKey(Context.ConnectionId))
            {
                Listeners[email][Context.ConnectionId].RefreshConnectionTime();
            }
        }

        public void Notification(string name, string message)
        {
            Clients.All.SendAsync("Send", name, message);

            //Clients.Client(name).SendAsync(message);
        }


        public static void RemoveUserFromListeners(string email, string connectionId)
        {
            lock(Listeners)
            {
                if(Listeners.ContainsKey(email) && Listeners[email].ContainsKey(connectionId))
                {
                    Listeners[email].Remove(connectionId);
                    if(Listeners[email].Count == 0)
                    {
                        Listeners.Remove(email);
                    }
                }
            }
        }

        //private static Dictionary<string, List<UserListener>> Listeners = new Dictionary<string, List<UserListener>>();
        public static Dictionary<string, Dictionary<string, UserListener>> Listeners { get; }
            = new Dictionary<string, Dictionary<string, UserListener>>();
    }
}