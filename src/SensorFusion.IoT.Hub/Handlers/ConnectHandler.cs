using System;
using System.Globalization;
using System.Linq;
using System.Threading;
using SensorFusion.IoT.Hub.Abstractions;
using SensorFusion.IoT.Hub.Configuration;
using Socketize;
using Socketize.Abstractions;

namespace SensorFusion.IoT.Hub.Handlers
{
  public class ConnectHandler : IMessageHandler
  {
    private readonly AppSettings _appSettings;
    private readonly ISensorValueProducer _producer;

    public ConnectHandler(AppSettings appSettings, ISensorValueProducer producer)
    {
      _appSettings = appSettings;
      _producer = producer;
    }

    public void Handle(Context context)
    {
      if (_appSettings.Sensors?.Length > 0)
      {
        foreach (var sensorInfo in _appSettings.Sensors.Where(sensorInfo => sensorInfo.Source is "emulated"))
        {
          Console.WriteLine($"Start emulating sensor with key '{sensorInfo.Key}'");
          ThreadPool.QueueUserWorkItem(EmulateSensor, sensorInfo.Key);
        }
      }
    }

    private void EmulateSensor(object keyRaw)
    {
      var emulationSettings = _appSettings.EmulationSettings;
      var key = (string) keyRaw;
      var random = new Random();

      while (true)
      {
        var waitForMs = emulationSettings.DelayMs + random.Next(0, emulationSettings.DelayRandomityMs + 1);
        Thread.Sleep(waitForMs);
        var newValue = random.NextDouble() * (emulationSettings.To - emulationSettings.From) + emulationSettings.From;
        _producer.Produce(key, newValue.ToString(CultureInfo.InvariantCulture));
      }
    }
  }
}