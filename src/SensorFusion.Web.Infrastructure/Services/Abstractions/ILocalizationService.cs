using System.Collections.Generic;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Web.Infrastructure.Models;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ILocalizationService
  {
    IEnumerable<LocaleItemModel> Get(string language);
  }
}