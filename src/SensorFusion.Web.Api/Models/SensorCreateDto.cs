using System.ComponentModel.DataAnnotations;

namespace SensorFusion.Web.Api.Models
{
  public class SensorCreateDto
  {
    [Required]
    public string Name { get; set; }
  }
}