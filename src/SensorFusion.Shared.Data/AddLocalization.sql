DELETE FROM Localizations WHERE TRUE;
# English
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'signintitle'   ,'Sign In to Sensor Fusion');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'signin'        ,'Sign In');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'signuptitle'   ,'Sign Up to Sensor Fusion');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'signup'        ,'Sign Up');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'email'         ,'Email');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'password'      ,'Password');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'repeatpassword','Repeat password');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'logout'        ,'Logout');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'sensors'       ,'Sensors');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'monitoring'    ,'Monitoring');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'settings'      ,'Settings');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'howtouse'      ,'How to use');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'yoursensor'    ,'Your sensors');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'numeric'       ,'Numeric');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'enabled'       ,'Enabled');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'disabled'      ,'Disabled');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'currentvalue'  ,'Current value');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'valuescount'   ,'Values count');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'value'         ,'Value');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'timesent'      ,'Time sent');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'novalues'      ,'No values yet');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'edit'          ,'Edit');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'details'       ,'Details');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'name'          ,'Name');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'key'           ,'Key');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'save'          ,'Save');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'delete'        ,'Delete');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'language'      ,'Language');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'en'            ,'English');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'ua'     ,'Ukrainian');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'createsensor'  ,'Create a new sensor');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'selectname'    ,'Select name for your sensor');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'sensorsname'   ,'Sensor\'s name');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'cancel'        ,'Cancel');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'create'        ,'Create');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'updated'        ,'Sensor successfully updated');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'deleted'        ,'Sensor successfully deleted');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'loading'        ,'Loading');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'sensor'         ,'Sensor');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('en', 'howtouseguide'  ,'# Start using Sensor Fusion

You can start using Sensor Fusion with 3 simple steps

## 1. Create a new sensors

To start using Sensor Fusion, we need to setup sensors:

1. Go to [Sensors](/sensors) page
2. Press ''+'' bottom at the right bottom corner
3. Enter new sensor name
4. Press ''Create''

Repeat until all our sensor will be created

## 2. Download Hub

1. [Download](/download/SensorFusion.Hub.zip) actual version of Hub app
2. Extract downloaded archive to any folder

## 3. Configure and start Hub

1. Open `config.json` using any text editor
2. Go down to the `"sensors"` section and add entries for each sensor. Key can be found at sensor''s Edit page from [Sensors](/sensors)

Example of file `config.json`:

\`\`\`
{
  "receiver": {...},
  "sensors": [
    { "key": "776699624d3749df90bfd14f357c07f4", "source": "com1" },
    { "key": "0958cc2e561840939d76e353aa75345c", "source": "com2" },
    { "key": "bc25f0715e25445cb64a25cda069b0eb", "source": "com3" }
  ]
}
\`\`\`
3. Start hub using `dotnet run` from the Hub''s directory

After that, if setup was correct, you will receive new values');

# Ukrainian
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'signintitle'   ,'Увійти до Sensor Fusion');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'signin'        ,'Увійти');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'signuptitle'   ,'Зареєструватися у Sensor');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'signup'        ,'Створити');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'email'         ,'Email');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'password'      ,'Пароль');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'repeatpassword','Повторіть пароль');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'logout'        ,'Вийти');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'sensors'       ,'Сенсори');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'monitoring'    ,'Моніторинг');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'settings'      ,'Налаштування');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'howtouse'      ,'Як користуватись');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'yoursensor'    ,'Ваші сенсори');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'numeric'       ,'Числовий');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'enabled'       ,'Увімкнений');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'disabled'      ,'Вимкнений');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'currentvalue'  ,'Теперішне значення');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'valuescount'   ,'Кількість значень');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'value'         ,'Значення');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'timesent'      ,'Час відправки');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'novalues'      ,'Нема значень');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'edit'          ,'Редагувати');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'details'       ,'Деталі');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'name'          ,'Ім\'я');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'key'           ,'Ключ');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'save'          ,'Зберегти');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'delete'        ,'Видалити');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'language'      ,'Мова');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'en'            ,'Англійська');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'ua'            ,'Українська');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'createsensor'  ,'Створити новий сенсор');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'selectname'    ,'Введіть ім\'я сенсору');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'sensorsname'   ,'Ім\'я сенсору');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'cancel'        ,'Назад');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'create'        ,'Створити');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'updated'        ,'Сенсор успішно оновлено');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'deleted'        ,'Сенсор успішно видалено');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'loading'        ,'Завантаження');
INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'sensor'         ,'Сенсор');

INSERT INTO Localizations (`Language`, `Key`, `Value`) VALUES ('ua', 'howtouseguide'  ,'# Як почати користуватися Sensor Fusion

Почати користуватися Sensor Fusion можна у 3 прості кроки

## 1. Створити сенсори

1. Відкрийте сторінку [Сенсори](/sensors)
2. Натисніть кнопку ''+'' у нижньому правому кутку екрану
3. Введіть ім''я сенсору
4. Натисніть ''Створити''

Повторюйте ці дії доки не створите усі необхідні сенсори

## 2. Завантажте Hub

1. [Завантажте](/download/SensorFusion.Hub.zip) актуальну версію додатку Hub
2. Розархівуйте файл у будь яку папку

## 3. Налаштуйте та запустіть Hub

1. Відкрийте `config.json` будь яким текстовим редактором
2. У секції `"sensors"` додайте конфігурацію для кожного з доданих сенсорів. Ключ можна отримати на сторінці Редагування сенсору зі сторінки [Сенсори](/sensors)

Приклад файлку `config.json`:

\`\`\`
{
  "receiver": {...},
  "sensors": [
    { "key": "776699624d3749df90bfd14f357c07f4", "source": "com1" },
    { "key": "0958cc2e561840939d76e353aa75345c", "source": "com2" },
    { "key": "bc25f0715e25445cb64a25cda069b0eb", "source": "com3" }
  ]
}
\`\`\`
3. Запустіь Hub за допомогою `dotnet run`

Після цього, якщо всі кроки були виконані правильно та якщо ваш сенсор працює, ви побачите на [панелі моніторингу](/monitoring) нові значення для сенсору!');