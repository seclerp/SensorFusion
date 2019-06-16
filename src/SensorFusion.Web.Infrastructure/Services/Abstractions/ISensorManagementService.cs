using System.Collections.Generic;
using System.Threading.Tasks;
using SensorFusion.Shared.Data.Entities;

namespace SensorFusion.Web.Infrastructure.Services.Abstractions
{
  public interface ISensorManagementService
  {
    Task<int> Create(User user, string name);
    Task<Sensor> Get(int id);
    Task<Sensor> Get(string key);
    IEnumerable<Sensor> GetAllByUser(User user);
    IEnumerable<Sensor> GetAll();
    Task Rename(int id, string name);
    Task Delete(int id);
  }
}