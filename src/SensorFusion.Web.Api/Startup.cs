using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SensorFusion.Shared.Data;
using SensorFusion.Shared.Data.Entities;
using SensorFusion.Web.Api.Filters;
using SensorFusion.Web.Api.Hubs;
using SensorFusion.Web.Infrastructure.Services.Abstractions;
using SensorFusion.Web.Infrastructure.Services;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.Swagger;

namespace SensorFusion.Web.Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(Configuration.GetConnectionString("MySQL")), ServiceLifetime.Transient);

      services.AddIdentity<User, IdentityRole>()
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
      services
        .AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(cfg =>
        {
          cfg.RequireHttpsMetadata = false;
          cfg.SaveToken = true;
          cfg.TokenValidationParameters = new TokenValidationParameters
          {
            ValidIssuer = Configuration["Auth:Issuer"],
            ValidAudience = Configuration["Auth:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Key"])),
            ClockSkew = TimeSpan.Zero // remove delay of token when expire
          };
        });

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
      services.AddSignalR();

      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Info { Title = "SensorFusion API", Version = "v1" });
        c.AddSecurityDefinition("Bearer",
          new ApiKeyScheme { In = "header",
            Description = "Please enter into field the word 'Bearer' following by space and JWT",
            Name = "Authorization", Type = "apiKey" });
        c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
          { "Bearer", Enumerable.Empty<string>() }
        });
      });

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

      if (Convert.ToBoolean(Configuration["Redis:Enabled"]))
      {
        services.AddSingleton<IConnectionMultiplexer>(
          ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis")));
        services.AddTransient<IStartupFilter, SubscriptionsSetupFilter>();
      }

      services.AddTransient<ISensorManagementService, SensorManagementService>();
      services.AddTransient<ISensorIdsCacheWriteService, SensorIdsCacheWriteService>();
      services.AddTransient<ISensorHistoryService, SensorHistoryService>();
      services.AddTransient<ILocalizationService, LocalizationService>();

      services.AddCors(o => o.AddPolicy("SensorFusionPolicy",
        builder => builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader())
      );

      services.AddMediatR(Assembly.GetAssembly(typeof(Startup)));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, AppDbContext dbContext, ISensorHistoryService sensorHistoryService)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseMiddleware<ErrorHandlingMiddleware>();
      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();
      app.UseAuthentication();

      app.UseSwagger();

      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SensorFusion API V1");
      });

      app.UseSignalR(routes =>
      {
        routes.MapHub<MonitoringHub>("/monitoringHub");
      });

      app.UseCors("SensorFusionPolicy");
      app.UseMvc(routes =>
      {
        routes.MapRoute(
          name: "default",
          template: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });

      UpdateDatabase(app);
    }

    private static void UpdateDatabase(IApplicationBuilder app)
    {
      using (var serviceScope = app.ApplicationServices
        .GetRequiredService<IServiceScopeFactory>()
        .CreateScope())
      {
        using (var context = serviceScope.ServiceProvider.GetService<AppDbContext>())
        {
          context.Database.Migrate();
        }
      }
    }
  }
}