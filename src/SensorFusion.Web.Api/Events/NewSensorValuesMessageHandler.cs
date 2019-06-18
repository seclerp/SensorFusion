using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SensorFusion.Web.Api.Hubs;

namespace SensorFusion.Web.Api.Events
{
  // ReSharper disable once UnusedMember.Global
  public class NewSensorValuesMessageHandler : INotificationHandler<NewSensorValueNotification>
  {
    private static readonly JsonSerializerSettings _settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
    private readonly IHubContext<MonitoringHub> _hubContext;

    public NewSensorValuesMessageHandler(IHubContext<MonitoringHub> hubContext)
    {
      _hubContext = hubContext;
    }

    public async Task Handle(NewSensorValueNotification request, CancellationToken cancellationToken)
    {
      await _hubContext.Clients.All.SendAsync("NewValue", JsonConvert.SerializeObject(request, _settings), cancellationToken);
    }
  }
}