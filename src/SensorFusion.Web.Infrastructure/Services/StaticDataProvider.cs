using System.Collections.Generic;
using SensorFusion.Web.Infrastructure.Models;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Infrastructure.Services
{
  public class StaticDataProvider : IStaticDataProvider
  {
    private StaticDataModel _staticData => new StaticDataModel
    {
      Menu = new List<MenuItem>
      {
        new MenuItem("Dashboard", "",          "dashboard"),
        new MenuItem("Sensors",   "sensors",   "leak_add"),
        new MenuItem("Settings",  "settings",  "settings")
      },
      Locales = new List<Locale>
      {
        new Locale("English", "en_us")
      }
    };

    public StaticDataModel GetStaticData() => _staticData;
  }
}