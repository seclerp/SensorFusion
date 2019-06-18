using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SensorFusion.IoT.Hub.Abstractions;
using SensorFusion.IoT.Hub.Handlers;
using Socketize;
using Socketize.Extensions.DependencyInjection;

namespace SensorFusion.IoT.Hub.Configuration
{
  public class ContainerConfig
  {
    public static void RegisterServices(IServiceCollection services, AppSettings settings)
    {
      var logger = new LoggerFactory()
        .AddConsole()
        .AddDebug()
        .CreateLogger<Client>();
      services.AddSingleton(logger);

      services.AddSingleton(settings);
      services.AddTransient<ISensorValueProducer, SensorValueProducer>();
      services.AddSocketizeClient(builder => builder.OnConnect<ConnectHandler>(),
        new ClientOptions(settings.Receiver.Host, settings.Receiver.Port, settings.Receiver.AppName));
    }
  }
}