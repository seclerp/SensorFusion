using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

    public Task<SensorValue> GetLastValue(int sensorId) =>
      _context.SensorValues
        .Where(sensor => sensor.SensorId == sensorId)
        .OrderByDescending(sensorValue => sensorValue.TimeSent)
        .FirstOrDefaultAsync();

    public IEnumerable<SensorValue> GetLastValues(int sensorId, int limit = int.MaxValue) =>
      _context.SensorValues
        .Where(sensorValue => sensorValue.SensorId == sensorId)
        .OrderByDescending(sensorValue => sensorValue.TimeSent)
        .Take(limit);

    public int GetValuesCount(int sensorId) =>
      _context.SensorValues.Count(sensorValue => sensorValue.SensorId == sensorId);
  }
}