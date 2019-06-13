using System.Collections.Generic;

namespace SensorFusion.Web.Api.Data.Models
{
  public class StaticDataModel
  {
    public List<Locale> Locales { get; set; }
    public List<MenuItem> Menu { get; set; }
  }
}