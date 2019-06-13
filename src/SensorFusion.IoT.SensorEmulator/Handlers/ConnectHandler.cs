using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using SensorFusion.IoT.SensorEmulator.Abstractions;
using Socketize;
using Socketize.Abstractions;

namespace SensorFusion.IoT.SensorEmulator.Handlers
{
  public class ConnectHandler : IMessageHandler
  {
    private readonly Config _config;
    private readonly ISensorValueProducer _producer;

    public ConnectHandler(Config config, ISensorValueProducer producer)
    {
      _config = config;
      _producer = producer;
    }

    public void Handle(Context context)
    {
      ThreadPool.QueueUserWorkItem(EmulateSensor);
    }

    private void EmulateSensor(object _)
    {
      var random = new Random();

      while (true)
      {
        var waitForMs = (int) (random.NextDouble() * 5000) + 500;
        Thread.Sleep(waitForMs);
        var newValue = random.NextDouble() * 1000;
        _producer.Produce(_config.SensorKey, newValue.ToString(CultureInfo.InvariantCulture));
      }
    }
  }
}