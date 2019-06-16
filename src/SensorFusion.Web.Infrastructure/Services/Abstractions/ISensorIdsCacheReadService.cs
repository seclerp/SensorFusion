namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ISensorIdsCacheReadService
  {
    int? Get(string key);
  }
}