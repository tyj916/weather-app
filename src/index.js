import './style.css';

const API_KEY = '85e15c7e15584e2ba2e160829241103';

// eslint-disable-next-line consistent-return
async function getCurrentWeatherData(location = 'Singapore') {
  try {
    const address = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;
    const response = await fetch(address, { mode: 'cors' });
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

function createWeather(data) {
  const { current } = data;
  const { location } = data;

  const dataContainer = document.querySelector('#weather-data');

  function render() {
    dataContainer.textContent = '';

    const mainContainer = document.createElement('div');
    const locationEl = document.createElement('h2');

    mainContainer.id = 'main-data';

    locationEl.textContent = location.name;

    dataContainer.appendChild(mainContainer);
    mainContainer.appendChild(locationEl);
  }

  return {
    getLastUpdated: () => current.last_updated,
    getCondition: () => current.condition.text,
    getConditionIcon: () => current.condition.icon,
    getTempC: () => current.temp_c,
    getTempF: () => current.temp_f,
    getFeelsLikeC: () => current.feelslike_c,
    getFeelsLikeF: () => current.feelslike_f,
    getAirQuality: () => current.air_quality['us-epa-index'],
    getWindSpeedKPH: () => current.wind_kph,
    getWindSpeedMPH: () => current.wind_mph,
    getHumidity: () => current.humidity,
    getVisibilityKM: () => current.vis_km,
    getVisibilityMiles: () => current.vis_miles,
    getPressureMb: () => current.pressure_mb,
    getPressureIn: () => current.pressure_in,
    getUV: () => current.uv,
    isDay: () => current.is_day,
    render,
  };
}

const body = document.querySelector('body');
const weatherApp = document.createElement('div');
const locationForm = document.createElement('form');
const searchbar = document.createElement('input');
const submitBtn = document.createElement('button');
const weatherData = document.createElement('div');

weatherApp.id = 'weather-app';
locationForm.id = 'location-form';
searchbar.id = 'searchbar';
weatherData.id = 'weather-data';

searchbar.type = 'searchbar';
submitBtn.type = 'submit';

searchbar.placeholder = 'Search for location...';

submitBtn.textContent = 'Search';

body.appendChild(weatherApp);
weatherApp.appendChild(locationForm);
weatherApp.appendChild(weatherData);
locationForm.appendChild(searchbar);
locationForm.appendChild(submitBtn);

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const response = getCurrentWeatherData(searchbar.value);
  response.then((data) => {
    const weather = createWeather(data);
    weather.render();
  });
});

const location = 'London';
const currentWeatherData = await getCurrentWeatherData(location);
const weather = createWeather(currentWeatherData);

console.log(currentWeatherData);
weather.render();
