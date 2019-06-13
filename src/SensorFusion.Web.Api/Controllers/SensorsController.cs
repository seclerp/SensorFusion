using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Web.Api.Data.Dtos;
using SensorFusion.Web.Api.Data.Models;
using SensorFusion.Web.Api.Exceptions;
using SensorFusion.Web.Api.Services.Abstractions;

namespace SensorFusion.Web.Api.Controllers
{
  [ApiController]
  [Route("api/sensors")]
  public class SensorsController : ControllerBase
  {
    private readonly ISensorManagementService _sensorManagementService;
    private readonly UserManager<User> _userManager;

    public SensorsController(ISensorManagementService sensorManagementService, UserManager<User> userManager)
    {
      _sensorManagementService = sensorManagementService;
      _userManager = userManager;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task Create([FromBody] SensorCreateDto createDto)
    {
      var currentUser = await _userManager.GetUserAsync(User);
      await _sensorManagementService.Create(currentUser, createDto.Name);
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

      return _sensorManagementService
        .GetAllByUser(user)
        .Select(Map)
        .ToList();
    }

    private static SensorModel Map(Sensor sensor) =>
      new SensorModel
      {
        Id = sensor.Id,
        Key = sensor.Key,
        Name = sensor.Name
      };
  }
}