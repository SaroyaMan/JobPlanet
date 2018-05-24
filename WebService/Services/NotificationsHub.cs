using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace WebService.Services
{
    public class NotificationsHub: Hub
    {
        [HubMethodName("Register")]
        public void Register(string email)
        {
            // Register a new connected user (base on his email address)
            Listeners[this.Context.ConnectionId] = email;
        }

        [HubMethodName("Unregister")]
        public void Unregister(string email)
        {
            if(Listeners.ContainsKey(this.Context.ConnectionId))
            {
                Listeners.Remove(this.Context.ConnectionId);
            }
        }

        public void Notification(string name, string message)
        {
            //Clients.All.SendAsync()
            Clients.All.SendAsync("Send", name, message);
        }

        private static Dictionary<string, string> Listeners = new Dictionary<string, string>();
    }
}
