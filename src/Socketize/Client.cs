using Lidgren.Network;
using Microsoft.Extensions.Logging;

namespace Socketize
{
  public class Client : Peer
  {
    private readonly ClientOptions _options;
    private NetConnection _serverConnection;

    public Client(
      IProcessingService processingService,
      ILogger<Client> logger,
      ClientOptions options) : base(processingService, logger)
    {
      _options = options;
    }

    public override NetPeer GetPeer() =>
      new NetClient(new NetPeerConfiguration(_options.AppId) { AcceptIncomingConnections = true });

    public Context CreateServerContext() => new Context(_serverConnection);

    public override void Start()
    {
      base.Start();

      var approval = NetPeer.CreateMessage();
      approval.Write("Approve me please, there might be token");

      _serverConnection = NetPeer.Connect(_options.ServerHost, _options.ServerPort, approval);
      Logger.LogInformation($"Send connection approval to {_options.ServerHost}:{_options.ServerPort}");
    }
  }
}