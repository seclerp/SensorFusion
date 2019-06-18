using Newtonsoft.Json;

namespace SensorFusion.IoT.Hub.Configuration
{
  public class AppSettings
  {
    [JsonProperty("receiver", Required = Required.Always)]
    public Receiver Receiver { get; set; }

    [JsonProperty("sensors")]
    public Sensor[] Sensors { get; set; }

    [JsonProperty("emulationSettings")]
    public EmulationSettings EmulationSettings { get; set; }
  }

  public class EmulationSettings
  {
    [JsonProperty("from")]
    public long From { get; set; }

    [JsonProperty("to")]
    public long To { get; set; }

    [JsonProperty("delayMs")]
    public int DelayMs { get; set; }

    [JsonProperty("delayRandomityMs")]
    public int DelayRandomityMs { get; set; }
  }

  public class Receiver
  {
    [JsonProperty("host", Required = Required.Always)]
    public string Host { get; set; }

    [JsonProperty("port", Required = Required.Always)]
    public int Port { get; set; }

    [JsonProperty("appName", Required = Required.Always)]
    public string AppName { get; set; }
  }

  public class Sensor
  {
    [JsonProperty("key", Required = Required.Always)]
    public string Key { get; set; }

    [JsonProperty("source", Required = Required.Always)]
    public string Source { get; set; }
  }
}