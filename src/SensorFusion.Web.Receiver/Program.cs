using System.Threading;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace SensorFusion.Web.Receiver
{
  public class Program
  {
    public static void Main(string[] args)
    {
      SynchronizationContext.SetSynchronizationContext(new SynchronizationContext());
      CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>();
  }
}