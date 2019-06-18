using System;

namespace SensorFusion.Shared.Data.Events
{
  public class NewSensorValueRedisEvent
  {
    public int SensorId { get; set; }
    public string Value { get; set; }
    public DateTime TimeSent { get; set; }
  }
}