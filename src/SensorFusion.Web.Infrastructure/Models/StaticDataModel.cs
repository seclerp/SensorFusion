using System.Collections.Generic;

namespace SensorFusion.Web.Infrastructure.Models
{
  public class StaticDataModel
  {
    public List<Locale> Locales { get; set; }
    public List<MenuItem> Menu { get; set; }
  }
}