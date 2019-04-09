using System.ComponentModel.DataAnnotations;

namespace SensorFusion.Web.App.Controllers
{
  public partial class AccountController
  {
    public class AuthorizeDto
    {
      [Required] public string Email { get; set; }

      [Required] public string Password { get; set; }
    }
  }
}