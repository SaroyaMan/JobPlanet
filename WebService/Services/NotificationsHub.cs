using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using WebService.Helpers;

namespace WebService.Services
{
    public class NotificationsHub: Hub
    {
        [HubMethodName("Register")]
        public void Register(string email)
        {
            // Register a new connected user (base on his email address)
            if(!Listeners.ContainsKey(email))
            {
                Listeners[email] = new Dictionary<string, UserListener>();
            }
            if(Listeners[email] != null)
            {
                Listeners[email][Context.ConnectionId] = new UserListener(Context.ConnectionId, email);
            }
        }

        [HubMethodName("Unregister")]
        public void Unregister(string email)
        {
            if(Listeners.ContainsKey(email) && Listeners[email].ContainsKey(Context.ConnectionId))
            {
                Listeners[email].Remove(Context.ConnectionId);
                if(Listeners[email].Count == 0)
                {
                    Listeners.Remove(email);
                }
            }
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
            //Clients.All.SendAsync()
            Clients.All.SendAsync("Send", name, message);
        }

        //private static Dictionary<string, List<UserListener>> Listeners = new Dictionary<string, List<UserListener>>();
        private static Dictionary<string, Dictionary<string, UserListener>> Listeners
            = new Dictionary<string, Dictionary<string, UserListener>>();


    }
}

            //foreach(var value in Listeners.Values)
            //{
            //    foreach(var innerValue in value.Values)
            //    {
            //        innerValue.IsExpired();
            //    };
            //}