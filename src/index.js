import './style.css';

const API_KEY = '85e15c7e15584e2ba2e160829241103';

// eslint-disable-next-line consistent-return
async function getCurrentWeatherData(location = 'Singapore') {
  try {
    const address = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;
    const response = await fetch(address, { mode: 'cors' });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

function createWeather(data) {
  const { current } = data;

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
  };
}

const location = 'Singapore';
const currentWeatherData = await getCurrentWeatherData(location);
const weather = createWeather(currentWeatherData);

console.log(currentWeatherData);
console.log(weather.getAirQuality());
