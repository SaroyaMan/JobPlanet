using System;

namespace WebService.Helpers
{
    public class UserListener
    {

        public string ConnectionId { get; private set; }
        public DateTime ConnectedTime { get; private set; }
        public string Email { get; private set; }

        public UserListener(string _connectionId, string _email)
        {
            ConnectionId = _connectionId;
            ConnectedTime = DateTime.Now;
            Email = _email;
        }

        public void RefreshConnectionTime()
        {
            ConnectedTime = DateTime.Now;
        }

        public bool IsExpired()
        {
            return (ConnectedTime + TimeSpan.FromMinutes(10)) < DateTime.Now;
        }
    }
}