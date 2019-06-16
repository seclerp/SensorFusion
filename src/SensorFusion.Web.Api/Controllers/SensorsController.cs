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
      if (sensor.User != currentUser)
      {
        throw new NotAllowedException($"You are not allowed to rename this sensor");
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

    private static SensorModel Map(Sensor sensor, SensorValue value) =>
      new SensorModel
      {
        Id = sensor.Id,
        Key = sensor.Key,
        Name = sensor.Name,
        LastValue = value?.Value,
        LastValueSent = value?.TimeSent
      };
  }
}