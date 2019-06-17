using System;
using System.Collections.Generic;

namespace SensorFusion.Web.Infrastructure.Models
{
  public class SensorDetailedModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Key { get; set; }
    public int ValuesCount { get; set; }
    public List<SensorValueModel> LastValues { get; set; }
  }

  public class SensorValueModel
  {
    public string Value { get; set; }
    public DateTime ValueSent { get; set; }
  }
}