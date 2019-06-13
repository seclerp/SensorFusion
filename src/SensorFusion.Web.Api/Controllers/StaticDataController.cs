using Microsoft.AspNetCore.Mvc;
using SensorFusion.Web.Infrastructure.Models;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Api.Controllers
{
  [ApiController]
  [Route("api/staticdata")]
  public class StaticDataController : Controller
  {
    private readonly IStaticDataProvider _staticDataProvider;

    public StaticDataController(IStaticDataProvider staticDataProvider)
    {
      _staticDataProvider = staticDataProvider;
    }

    [HttpGet("")]
    public StaticDataModel Index() => _staticDataProvider.GetStaticData();
  }
}