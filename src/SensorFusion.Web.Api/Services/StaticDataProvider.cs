using System.Collections.Generic;
using SensorFusion.Web.Api.Data.Models;
using SensorFusion.Web.Api.Services.Abstractions;

namespace SensorFusion.Web.Api.Services
{
  class StaticDataProvider : IStaticDataProvider
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