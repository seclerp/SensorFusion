using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SensorFusion.Receiver.Handlers;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Messages;
using SensorFusion.Web.Infrastructure.Services;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using Socketize;
using Socketize.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace SensorFusion.Receiver
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(Configuration.GetConnectionString("MySQL")), ServiceLifetime.Singleton);

      services.AddSingleton<IConnectionMultiplexer>(
        ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis")));
      services.AddSocketizeServer(
        builder => builder.Hub("sensor").Route<SensorUpdateMessage, SensorHandler>("update").Complete(),
        new ServerOptions(60102, "SensorFusionTest")
      );
      services.AddTransient<ISensorManagementService, SensorManagementService>();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.Run(async context => await context.Response.WriteAsync("Hello World!"));
    }
  }
}