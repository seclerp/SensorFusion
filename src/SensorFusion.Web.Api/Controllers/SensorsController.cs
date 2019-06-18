using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Shared.Exceptions;
using SensorFusion.Web.Api.Models;
using SensorFusion.Web.Infrastructure.Models;
using SensorFusion.Web.Infrastructure.Services.Abstractions;

namespace SensorFusion.Web.Api.Controllers
{
  [ApiController]
  [Route("api/sensors")]
  public class SensorsController : ControllerBase
  {
    private readonly ISensorManagementService _sensorManagementService;
    private readonly ISensorIdsCacheWriteService _cacheWriteService;
    private readonly UserManager<User> _userManager;
    private readonly ISensorHistoryService _historyService;

    public SensorsController(
      ISensorManagementService sensorManagementService,
      ISensorIdsCacheWriteService cacheWriteService,
      UserManager<User> userManager,
      ISensorHistoryService historyService)
    {
      _sensorManagementService = sensorManagementService;
      _cacheWriteService = cacheWriteService;
      _userManager = userManager;
      _historyService = historyService;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task Create([FromBody] SensorCreateDto createDto)
    {
      var currentUser = await _userManager.GetUserAsync(User);
      await _sensorManagementService.Create(currentUser, createDto.Name);
      await _cacheWriteService.RefreshIds();
    }

    [Authorize]
    [HttpPut("rename")]
    public async Task Rename([FromBody] SensorRenameDto renameDto)
    {
      var currentUser = await _userManager.GetUserAsync(User);
      var sensor = await _sensorManagementService.Get(renameDto.Id);
      if (sensor.User.Id != currentUser.Id)
      {
        ThrowNotAllowed();
      }
      await _sensorManagementService.Rename(renameDto.Id, renameDto.Name);
    }

    [Authorize]
    [HttpGet("")]
    public async Task<List<SensorModel>> GetByUser()
    {
      var user = await _userManager.GetUserAsync(User);
      var sensorsByUser = _sensorManagementService.GetAllByUser(user).ToArray();
      var sensorValues = await Task.WhenAll(sensorsByUser.Select(sensor => _historyService.GetLastValue(sensor.Id)));

      return
        (from sensor in sensorsByUser
        join sensorValue in sensorValues on sensor.Id equals sensorValue?.SensorId into sensorModels
        from m in sensorModels.DefaultIfEmpty()
        select Map(sensor, m)).ToList();
    }

    [Authorize]
    [HttpGet("detailed")]
    public async Task<List<SensorDetailedModel>> GetByUserDetailed()
    {
      var user = await _userManager.GetUserAsync(User);
      var sensorsByUser = _sensorManagementService.GetAllByUser(user).ToArray();
      var sensorValues = sensorsByUser
        .SelectMany(sensor => _historyService.GetLastValues(sensor.Id, 50))
        .GroupBy(sensorValue => sensorValue.SensorId)
        .Select(group => new { SensorId = group.Key, Values = group.OrderByDescending(value => value.TimeSent).ToList() })
        .ToArray();

      return
        (from sensor in sensorsByUser
          join sensorValue in sensorValues on sensor.Id equals sensorValue?.SensorId into sensorModels
          from m in sensorModels.DefaultIfEmpty()
          select new SensorDetailedModel
          {
            Id = sensor.Id,
            Key = sensor.Key,
            Name = sensor.Name,
            LastValues = m?.Values.Select(Map).ToList(),
            ValuesCount = _historyService.GetValuesCount(sensor.Id)
          }).ToList();
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<SensorModel> Get(int id)
    {
      var user = await _userManager.GetUserAsync(User);
      var sensor = await _sensorManagementService.Get(id);
      if (sensor.User.Id != user.Id)
      {
        ThrowNotAllowed();
      }

      return Map(sensor);
    }

    [Authorize]
    [HttpGet("detailed/{id:int}")]
    public async Task<SensorDetailedModel> GetDetailed(int id, int limit = 10)
    {
      var user = await _userManager.GetUserAsync(User);
      var sensor = await _sensorManagementService.Get(id);
      if (sensor.User.Id != user.Id)
      {
        ThrowNotAllowed();
      }

      var lasSensorValues = _historyService.GetLastValues(sensor.Id, limit != -1 ? limit : int.MaxValue);
      var valuesCount = _historyService.GetValuesCount(sensor.Id);

      return Map(sensor, lasSensorValues, valuesCount);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var user = await _userManager.GetUserAsync(User);
      var sensor = await _sensorManagementService.Get(id);
      if (sensor.User.Id != user.Id)
      {
        ThrowNotAllowed();
      }

      await _sensorManagementService.Delete(id);

      return Ok();
    }

    private static void ThrowNotAllowed() =>
      throw new NotAllowedException($"You are not allowed to manage this sensor");

    private static SensorModel Map(Sensor sensor, SensorValue value) =>
      new SensorModel
      {
        Id = sensor.Id,
        Name = sensor.Name,
        LastValue = value?.Value,
        LastValueSent = value?.TimeSent
      };

    private static SensorModel Map(Sensor sensor) =>
      new SensorModel
      {
        Id = sensor.Id,
        Name = sensor.Name
      };

    private static SensorDetailedModel Map(Sensor sensor, IEnumerable<SensorValue> values, int valuesCount) =>
      new SensorDetailedModel
      {
        Id = sensor.Id,
        Key = sensor.Key,
        Name = sensor.Name,
        ValuesCount = valuesCount,
        LastValues = values.Select(Map).ToList()
      };

    private static SensorValueModel Map(SensorValue value) =>
      new SensorValueModel
      {
        Value = value.Value,
        ValueSent = value.TimeSent
      };
  }
}