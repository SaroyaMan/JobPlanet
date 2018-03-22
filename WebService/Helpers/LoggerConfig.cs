using Microsoft.Extensions.Logging;
using System;

namespace WebService.Helpers {
    public static class LoggerConfig {
        static ILoggerFactory _loggerFactory;


        public static void ConfigureLogger(ILoggerFactory loggerFactory) {
            _loggerFactory = loggerFactory;
        }


        public static ILogger CreateLogger<T>() {
            if(_loggerFactory == null) {
                throw new InvalidOperationException($"{nameof(ILogger)} is not configured. {nameof(ConfigureLogger)} must be called before use");
                //_loggerFactory = new LoggerFactory().AddConsole().AddDebug();
            }

            return _loggerFactory.CreateLogger<T>();
        }
    }
}