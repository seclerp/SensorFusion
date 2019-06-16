using System.Threading.Tasks;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ISensorIdsCacheWriteService
  {
    Task RefreshIds();
  }
}