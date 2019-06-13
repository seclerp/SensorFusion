using System;

namespace SensorFusion.Shared.Exceptions
{
  public class NotAllowedException : Exception
  {
    public NotAllowedException(string message) : base(message)
    {
    }

    public NotAllowedException(string message, Exception innerException) : base(message, innerException)
    {
    }
  }
}