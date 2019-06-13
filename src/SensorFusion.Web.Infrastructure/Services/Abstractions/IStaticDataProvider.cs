using SensorFusion.Web.Infrastructure.Models;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface IStaticDataProvider
  {
    StaticDataModel GetStaticData();
  }

  // Register as Single instance
}