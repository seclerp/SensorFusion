using System;
using System.Net;
using Microsoft.Extensions.Logging;
using SensorFusion.IoT.SensorEmulator.Abstractions;
using SensorFusion.Shared.Messages;
using Socketize;
using Socketize.Abstractions;

namespace SensorFusion.IoT.SensorEmulator
{
  public class SensorValueProducer : ISensorValueProducer
  {
    private readonly IPeer _peer;
    private readonly ILogger<Client> _logger;
    private IPEndPoint _serverEndpoint;

    public SensorValueProducer(IPeer peer, Config config, ILogger<Client> logger)
    {
      _peer = peer;
      _logger = logger;
      _serverEndpoint = new IPEndPoint(IPAddress.Parse(config.ReceiverHost), config.ReceiverPort);
    }

    public void Produce(string sensorKey, string value)
    {
      _logger.LogInformation($"New sensor value '{value}' for key '{sensorKey}'");
      _peer.CreateRemoteContext(_serverEndpoint).Send("sensor/update", new SensorUpdateMessage { SensorKey = sensorKey, Value = value, TimeSent = DateTime.UtcNow });
    }
  }
}