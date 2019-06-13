namespace SensorFusion.IoT.SensorEmulator.Abstractions
{
  public interface ISensorValueProducer
  {
    void Produce(string sensorKey, string value);
  }
}