using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SensorFusion.Web.Infrastructure.Models;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Api.Controllers
{
  [ApiController]
  [Route("api/staticdata")]
  public class StaticDataController : Controller
  {
    private readonly ILocalizationService _localizationService;

    public StaticDataController(ILocalizationService localizationService)
    {
      _localizationService = localizationService;
    }

    [HttpGet("locales")]
    public IEnumerable<LocaleItemModel> Index(string language) =>
      _localizationService.Get(language);
  }
}