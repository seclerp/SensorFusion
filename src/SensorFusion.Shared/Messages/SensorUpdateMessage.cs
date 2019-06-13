using System;
using ZeroFormatter;

namespace SensorFusion.Shared.Messages
{
  [ZeroFormattable]
  public class SensorUpdateMessage
  {
    [Index(0)]
    public virtual string SensorKey { get; set; }
    [Index(1)]
    public virtual string Value { get; set; }
    [Index(2)]
    public virtual DateTime TimeSent { get; set; }
  }
}