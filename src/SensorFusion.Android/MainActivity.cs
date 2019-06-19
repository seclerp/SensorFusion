using Android.App;
using Android.OS;
using Android.Support.V7.App;
using Android.Views;
using Android.Webkit;

namespace SensorFusion.Android
{
  [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
  public class MainActivity : AppCompatActivity
  {
    private WebView _webView;

    protected override void OnCreate (Bundle bundle)
    {
      base.OnCreate (bundle);

      // Set our view from the "main" layout resource
      SetContentView (Resource.Layout.activity_main);

      _webView = FindViewById<WebView> (Resource.Id.webview);
      _webView.Settings.JavaScriptEnabled = true;
      _webView.Settings.DomStorageEnabled = true;
      _webView.SetWebViewClient(new NoOverrideWebViewClient());
      _webView.LoadUrl ("http://bebf3df9.ngrok.io");
    }

    public override bool OnKeyDown (Keycode keyCode, KeyEvent e)
    {
      if (keyCode == Keycode.Back && _webView.CanGoBack ())
      {
        _webView.GoBack ();
        return true;
      }

      return base.OnKeyDown (keyCode, e);
    }
  }
}