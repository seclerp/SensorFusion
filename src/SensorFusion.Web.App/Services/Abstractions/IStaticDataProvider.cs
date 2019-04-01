using System.Collections.Generic;
using SensorFusion.Web.App.Models;

namespace SensorFusion.Web.App.Services.Abstractions
{
  public interface IStaticDataProvider
  {
    StaticDataModel GetStaticData();
  }

  // Register as Single instance
  class StaticDataProvider : IStaticDataProvider
  {
    private StaticDataModel _staticData => new StaticDataModel
    {
      Menu = new List<MenuItem>
      {
        new MenuItem("Dashboard", "/",          "dashboard"),
        new MenuItem("Sensors",   "/sensors",   "leak_add"),
        new MenuItem("Settings",  "/settings",  "settings")
      }
    };

    public StaticDataModel GetStaticData() => _staticData;
  }
}