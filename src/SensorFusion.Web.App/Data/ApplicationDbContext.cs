using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SensorFusion.Web.App.Data.Entities;

namespace SensorFusion.Web.App.Data
{
  public class ApplicationDbContext : IdentityDbContext<User>
  {
    public DbSet<Sensor> Sensors { get; set; }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
  }
}