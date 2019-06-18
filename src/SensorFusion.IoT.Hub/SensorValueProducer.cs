using System;
using System.Net;
using Microsoft.Extensions.Logging;
using SensorFusion.IoT.Hub.Abstractions;
using SensorFusion.IoT.Hub.Configuration;
using SensorFusion.Shared.Messages;
using Socketize;
using Socketize.Abstractions;

namespace SensorFusion.IoT.Hub
{
  public class SensorValueProducer : ISensorValueProducer
  {
    private readonly IPeer _peer;
    private readonly ILogger<Client> _logger;
    private IPEndPoint _serverEndpoint;

    public SensorValueProducer(IPeer peer, AppSettings appSettings, ILogger<Client> logger)
    {
      _peer = peer;
      _logger = logger;
      _serverEndpoint = new IPEndPoint(IPAddress.Parse(appSettings.Receiver.Host), appSettings.Receiver.Port);
    }

    public void Produce(string sensorKey, string value)
    {
      _logger.LogInformation($"New sensor value '{value}' for key '{sensorKey}'");
      _peer.CreateRemoteContext(_serverEndpoint).Send("sensor/update", new SensorUpdateMessage { SensorKey = sensorKey, Value = value, TimeSent = DateTime.UtcNow });
    }
  }
}