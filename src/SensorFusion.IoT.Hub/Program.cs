using System;
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
using SensorFusion.IoT.Hub.Configuration;
using Socketize.Abstractions;

namespace SensorFusion.IoT.Hub
{
  class Program
  {
    static void Main(string[] args)
    {
      SynchronizationContext.SetSynchronizationContext(new SynchronizationContext());

      Console.WriteLine("Hello World!");
      var settings = AppSettingsProvider.Get();
      var services = new ServiceCollection();
      ContainerConfig.RegisterServices(services, settings);
      var provider = services.BuildServiceProvider();
      var client = provider.GetService<IPeer>();
      client.Start();

      while (true) {}
    }
  }
}