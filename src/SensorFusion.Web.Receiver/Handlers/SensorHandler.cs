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
    private readonly ISensorManagementService _sensorService;

    public SensorHandler(ILogger<Server> logger, IConnectionMultiplexer redis, ISensorManagementService sensorService)
    {
      _logger = logger;
      _redis = redis;
      _sensorService = sensorService;
    }

    public void Handle(Context context, SensorUpdateMessage message)
    {
      var sensor = _sensorService.Get(message.SensorKey).GetAwaiter().GetResult();
      if (sensor is null)
      {
        _logger.LogWarning($"Sensor for key '{message.SensorKey}' is not found, skipping update message");
        return;
      }

      _redis.GetSubscriber().Publish(RedisConstants.SensorValuesChannel, JsonConvert.SerializeObject(Map(message, sensor)));
    }

    private static NewSensorValueEvent Map(SensorUpdateMessage message, Sensor sensor) => new NewSensorValueEvent
    {
      SensorId = sensor.Id,
      Value = message.Value,
      TimeSent = message.TimeSent
    };
  }
}