using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SensorFusion.IoT.SensorEmulator.Abstractions;
using SensorFusion.IoT.SensorEmulator.Handlers;
using Socketize;
using Socketize.Extensions.DependencyInjection;

namespace SensorFusion.IoT.SensorEmulator.Configuration
{
  public class ContainerConfig
  {
    public static void RegisterServices(IServiceCollection services, Config config)
    {
      var logger = new LoggerFactory().AddConsole().AddDebug().CreateLogger<Client>();
      services.AddSingleton(logger);

      services.AddSingleton(config);
      services.AddTransient<ISensorValueProducer, SensorValueProducer>();
      services.AddSocketizeClient(builder => builder.OnConnect<ConnectHandler>(),
        new ClientOptions(config.ReceiverHost, config.ReceiverPort, config.AppName));
    }
  }
}