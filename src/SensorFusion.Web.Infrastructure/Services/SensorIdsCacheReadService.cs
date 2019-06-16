using Microsoft.Extensions.Logging;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using StackExchange.Redis;

namespace SensorFusion.Web.Infrastructure.Services
{
  public class SensorIdsCacheReadService : ISensorIdsCacheReadService
  {
    private readonly IConnectionMultiplexer _redis;
    private readonly ILogger _logger;

    public SensorIdsCacheReadService(IConnectionMultiplexer redis, ILogger<SensorIdsCacheReadService> logger)
    {
      _redis = redis;
      _logger = logger;
    }

    public int? Get(string key)
    {
      var cachedId = _redis.GetDatabase().HashGet("sensorIds", key);

      if (!cachedId.HasValue || !cachedId.TryParse(out int id))
      {
        _logger.LogWarning($"There is no id for key {key}");
        return null;
      }

      return id;
    }
  }
}