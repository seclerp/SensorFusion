using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SensorFusion.Web.App.Data.Entities;

namespace SensorFusion.Web.App.Data
{
  public class AppDbContext : IdentityDbContext<User>
  {
    public DbSet<Sensor> Sensors { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
  }
}