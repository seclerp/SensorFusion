using System.Collections.Generic;
using System.Linq;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Web.Infrastructure.Models;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Infrastructure.Services
{
  public class LocalizationService : ILocalizationService
  {
    private readonly AppDbContext _context;

    public LocalizationService(AppDbContext context)
    {
      _context = context;
    }

    public IEnumerable<LocaleItemModel> Get(string language) =>
      _context.Localizations.Where(localization => localization.Language == language).Select(Map);

    private static LocaleItemModel Map(Localization localization) =>
      new LocaleItemModel
      {
        Key = localization.Key,
        Value = localization.Value
      };
  }
}