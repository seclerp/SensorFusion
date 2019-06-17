using System;

namespace SensorFusion.Web.Infrastructure.Models
{
  public class SensorModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastValue { get; set; }
    public DateTime? LastValueSent { get; set; }
  }
}