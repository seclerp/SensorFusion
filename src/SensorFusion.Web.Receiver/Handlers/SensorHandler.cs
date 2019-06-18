using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Shared.Data.Events;
using SensorFusion.Shared.Messages;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using Socketize;
using Socketize.Abstractions;
using StackExchange.Redis;

namespace SensorFusion.Web.Receiver.Handlers
{
  public class SensorHandler : IMessageHandler<SensorUpdateMessage>
  {
    private readonly ILogger<Server> _logger;
    private readonly IConnectionMultiplexer _redis;
    private readonly ISensorIdsCacheReadService _idsService;

    public SensorHandler(ILogger<Server> logger, IConnectionMultiplexer redis, ISensorIdsCacheReadService idsService)
    {
      _logger = logger;
      _redis = redis;
      _idsService = idsService;
    }

    public void Handle(Context context, SensorUpdateMessage message)
    {
      var sensorId = _idsService.Get(message.SensorKey);
      if (sensorId is null)
      {
        _logger.LogWarning($"Id for key '{message.SensorKey}' not found");
        return;
      }

      _redis.GetSubscriber().Publish(RedisConstants.SensorValuesChannel, JsonConvert.SerializeObject(Map(message, sensorId.Value)));
    }

    private static NewSensorValueRedisEvent Map(SensorUpdateMessage message, int sensorId) =>
      new NewSensorValueRedisEvent
      {
        SensorId = sensorId,
        Value = message.Value,
        TimeSent = message.TimeSent
      };
  }
}