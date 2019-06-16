using System.Linq;
using System.Threading.Tasks;
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

    public async Task RefreshIds()
    {
      var allSensors = _sensorManagementService
        .GetAll()
        .Select(sensor => new HashEntry(sensor.Key, sensor.Id))
        .ToArray();

      await _redis.GetDatabase().HashSetAsync("sensorIds", allSensors);
    }
  }
}