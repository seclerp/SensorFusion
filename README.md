<h1 align="center">
:bar_chart: SensorFusion
</h1>
<p align="center">
Scalable and extendable sensor monitoring, analyzing and management solution
</p>

---

## Notes

You need to setup Redis and MySQL to use Sensor Fusion locally

## How to use

### 1. Start services

Run `dotnet run` from **SensorFusion.Web.Api** and **SensorFusion.Web.Receiver** directories. For deployment on server use `dotnet publish -c`

### 1. Create new sensors

To start using Sensor Fusion, we need to setup sensors:

1. Go to **Sensors** page
2. Press **'+'** bottom at the right bottom corner
3. Enter new sensor name
4. Press **Create**

Repeat until all our sensor will be created

### 2. Configure and start Hub

1. Open `SensorFusion.IoT.Hub/config.json` using any text editor
2. Go down to the `"sensors"` section and add entries for each sensor. Key can be found at sensor's Edit page from [Sensors](/sensors)

Example of file `config.json`:

```
{
  "receiver": {...},
  "sensors": [
    { "key": "776699624d3749df90bfd14f357c07f4", "source": "emulated" },
    { "key": "0958cc2e561840939d76e353aa75345c", "source": "emulated" },
    { "key": "bc25f0715e25445cb64a25cda069b0eb", "source": "emulated" }
  ]
}
```

3. Start hub using `dotnet run` from the `SensorFusion.IoT.Hub` directory

After that, if setup was correct, you will receive new values for the sensors in **Monitoring** page
