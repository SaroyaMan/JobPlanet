using Microsoft.Extensions.Configuration;
using System;
using System.ComponentModel;
using WebService.Init;

namespace WebService.Services
{
    public class ConfigurationManager
    {
        private IConfiguration config;
        private static ConfigurationManager _instance;

        private ConfigurationManager()
        {
            config = Startup.Configuration;
        }

        public static ConfigurationManager Instance
        {
            get
            {
                return _instance ?? (_instance = new ConfigurationManager());
            }
        }

        public T GetValue<T>(string key, T defaultValue)
        {
            try
            {
                var converter = TypeDescriptor.GetConverter(typeof(T));
                var settingObject = config.GetSection(key);
                return (T) converter.ConvertFromString(settingObject.Value);
            }
            catch(Exception)
            {
                return defaultValue;
            }
        }
    }
}
