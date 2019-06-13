using System;
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
using SensorFusion.IoT.SensorEmulator.Configuration;
using Socketize.Abstractions;

namespace SensorFusion.IoT.SensorEmulator
{
  class Program
  {
    static void Main(string[] args)
    {
      SynchronizationContext.SetSynchronizationContext(new SynchronizationContext());

      Console.WriteLine("Hello World!");
      var config = ConfigParser.ProcessArgs(args);
      var services = new ServiceCollection();
      ContainerConfig.RegisterServices(services, config);
      var provider = services.BuildServiceProvider();
      var client = provider.GetService<IPeer>();
      client.Start();

      while (true) {}
    }
  }
}