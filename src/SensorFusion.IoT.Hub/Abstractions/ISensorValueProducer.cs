namespace SensorFusion.IoT.Hub.Abstractions
{
  public interface ISensorValueProducer
  {
    void Produce(string sensorKey, string value);
  }
}