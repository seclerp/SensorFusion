using Autofac;
using SensorFusion.Web.App.Services;
using SensorFusion.Web.App.Services.Abstractions;

namespace SensorFusion.Web.App.Config
{
  public class AutofacModule : Module
  {
    protected override void Load(ContainerBuilder builder)
    {
      base.Load(builder);

      builder
        .RegisterType<StaticDataProvider>()
        .AsImplementedInterfaces()
        .SingleInstance();
    }
  }
}