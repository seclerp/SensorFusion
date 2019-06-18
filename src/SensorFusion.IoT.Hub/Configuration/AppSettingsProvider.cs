using System.IO;
using Newtonsoft.Json;
using SensorFusion.Shared.Exceptions;

namespace SensorFusion.IoT.Hub.Configuration
{
  public static class AppSettingsProvider
  {
    public static AppSettings Get(string fileName = "config.json")
    {
      if (!File.Exists(fileName))
      {
        throw new BusinessLogicException("Failed to load config file '{fileName}': File not found");
      }

      return JsonConvert.DeserializeObject<AppSettings>(File.ReadAllText(fileName));
    }
  }
}