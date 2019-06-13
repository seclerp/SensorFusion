using System;
using SensorFusion.Shared.Exceptions;

namespace SensorFusion.IoT.SensorEmulator.Configuration
{
  public class ConfigParser
  {
    public static Config ProcessArgs(string[] args)
    {
      if (args.Length % 2 != 0)
      {
        throw new BusinessLogicException("Incorrect number of arguments");
      }

      var config = new Config();
      for (var i = 0; i < args.Length; i += 2)
      {
        var key = args[i];
        var value = args[i + 1];
        config = ProcessArg(config, key, value);
      }

      return config;
    }

    private static Config ProcessArg(Config config, string key, string value)
    {
      switch (key.ToLower())
      {
        case "--host":
        case "-h":
          config.ReceiverHost = value;
          break;
        case "--port":
        case "-p":
          config.ReceiverPort = Convert.ToInt32(value);
          break;
        case "--appname":
        case "-a":
          config.AppName = value;
          break;
        case "--key":
        case "-k":
          config.SensorKey = value;
          break;
        default:
          throw new BusinessLogicException($"Incorrect key: '{key}'");
      }

      return config;
    }
  }
}