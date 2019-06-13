using SensorFusion.Web.Api.Data.Models;

namespace SensorFusion.Web.Api.Services.Abstractions
{
  public interface IStaticDataProvider
  {
    StaticDataModel GetStaticData();
  }

  // Register as Single instance
}