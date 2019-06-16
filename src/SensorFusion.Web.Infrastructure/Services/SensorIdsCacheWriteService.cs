using System.Linq;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using StackExchange.Redis;

namespace SensorFusion.Web.Infrastructure.Services
{
  public class SensorIdsCacheWriteService : ISensorIdsCacheWriteService
  {
    private readonly ISensorManagementService _sensorManagementService;
    private readonly IConnectionMultiplexer _redis;

    public SensorIdsCacheWriteService(ISensorManagementService sensorManagementService, IConnectionMultiplexer redis)
    {
      _sensorManagementService = sensorManagementService;
      _redis = redis;
    }

    public void RefreshIds()
    {
      var allSensors = _sensorManagementService
        .GetAll()
        .Select(sensor => new HashEntry(sensor.Key, sensor.Id))
        .ToArray();

      _redis.GetDatabase().HashSet("sensorIds", allSensors);
    }
  }
}