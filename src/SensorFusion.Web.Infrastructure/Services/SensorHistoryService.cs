using System;
using System.Threading.Tasks;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Infrastructure.Services
{
  public class SensorHistoryService : ISensorHistoryService
  {
    private readonly AppDbContext _context;

    public SensorHistoryService(AppDbContext context) =>
      _context = context;

    public void AddValue(int sensorId, string value, DateTime timeSent)
    {
      _context.SensorValues.Add(new SensorValue
      {
        SensorId = sensorId,
        Value = value,
        TimeSent = timeSent
      });
      _context.SaveChanges();
    }
  }
}