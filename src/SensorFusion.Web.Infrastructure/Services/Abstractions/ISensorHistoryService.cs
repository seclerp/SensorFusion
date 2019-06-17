using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SensorFusion.Shared.Data.Entities;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ISensorHistoryService
  {
    void AddValue(int sensorId, string value, DateTime timeSent);
    Task<SensorValue> GetLastValue(int sensorId);
    IEnumerable<SensorValue> GetLastValues(int sensorId, int limit = int.MaxValue);
    int GetValuesCount(int sensorId);
  }
}