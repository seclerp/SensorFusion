namespace SensorFusion.Web.App.Models
{
  public class Locale
  {
    public string Name { get; }
    public string CultureKey { get; } // en_us

    public Locale(string name, string cultureKey)
    {
      Name = name;
      CultureKey = cultureKey;
    }
  }
}