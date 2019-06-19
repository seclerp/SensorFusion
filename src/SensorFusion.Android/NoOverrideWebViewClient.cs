using Android.Webkit;

namespace SensorFusion.Android
{
  public class NoOverrideWebViewClient : WebViewClient
  {
    public override bool ShouldOverrideUrlLoading (WebView view, string url)
    {
      view.LoadUrl(url);
      return false;
    }
  }
}