using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Data.Events;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using StackExchange.Redis;

namespace SensorFusion.Web.Api.Filters
{
  public class SubscriptionsSetupFilter : IStartupFilter, IDisposable
  {
    private readonly ILogger<SubscriptionsSetupFilter> _logger;
    private readonly IConnectionMultiplexer _redisConnection;
    private readonly ISensorIdsCacheWriteService _idsCacheWriteService;
    private IServiceScope _scope;

    public SubscriptionsSetupFilter(
      IServiceProvider provider,
      ILogger<SubscriptionsSetupFilter> logger,
      IConnectionMultiplexer redisConnection)
    {
      _logger = logger;
      _redisConnection = redisConnection;
      _scope = provider.CreateScope();
      _idsCacheWriteService = _scope.ServiceProvider.GetRequiredService<ISensorIdsCacheWriteService>();
    }

    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
    {
      return builder =>
      {
        _idsCacheWriteService.RefreshIds();

        var subscriber = _redisConnection.GetSubscriber();

        subscriber.Subscribe(RedisConstants.SensorValuesChannel, NewValueHandler);

        next(builder);
      };
    }

    private void NewValueHandler(RedisChannel channel, RedisValue value)
    {
      var dto = JsonConvert.DeserializeObject<NewSensorValueRedisEvent>(value.ToString());
      var historyService = _scope.ServiceProvider.GetRequiredService<ISensorHistoryService>();
      historyService.AddValue(dto.SensorId, dto.Value, dto.TimeSent);
      _logger.LogInformation($"Processed new value for sensor '{dto.SensorId}'");
    }

    public void Dispose()
    {
      _scope?.Dispose();
    }
  }
}