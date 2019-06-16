using System;
using System.Threading.Tasks;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ISensorHistoryService
  {
    void AddValue(int sensorId, string value, DateTime timeSent);
  }
}