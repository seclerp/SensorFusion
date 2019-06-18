using System;
using MediatR;

namespace SensorFusion.Web.Api.Events
{
  public class NewSensorValueNotification : INotification
  {
    public int SensorId { get; set; }
    public string Value { get; set; }
    public DateTime ValueSent { get; set; }
  }
}