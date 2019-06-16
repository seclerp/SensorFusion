using Microsoft.AspNetCore.Mvc;

namespace SensorFusion.Web.Api.Controllers
{
  [ApiController]
  public class HomeController : ControllerBase
  {
    [HttpGet("")]
    public string Index() => "SensorFusion API is running";
  }
}