using System.ComponentModel.DataAnnotations;

namespace SensorFusion.Web.Api.Data.Dtos
{
  public class SensorCreateDto
  {
    [Required]
    public string Name { get; set; }
  }
}