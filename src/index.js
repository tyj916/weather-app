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

  function getAirQuality() {
    const airQualityChart = [
      'Good',
      'Moderate',
      'Unhealthy for Sensitive Group',
      'Unhealthy',
      'Very Unhealthy',
      'Hazardous',
    ];
    const currentAirQuality = current.air_quality['us-epa-index'];
    return airQualityChart[currentAirQuality - 1];
  }

  function getUVValue() {
    const currentUVIndex = current.uv;

    if (currentUVIndex <= 2) {
      return 'Low';
    }
    if (currentUVIndex <= 5) {
      return 'Moderate';
    }
    if (currentUVIndex <= 7) {
      return 'High';
    }
    if (currentUVIndex <= 10) {
      return 'Very High';
    }
    return 'Extreme';
  }

  function render() {
    dataContainer.textContent = '';

    const mainContainer = document.createElement('div');
    const locationEl = document.createElement('h2');
    const lastUpdateEl = document.createElement('p');

    const weatherConditionContainer = document.createElement('div');
    const weatherIconEl = document.createElement('img');
    const tempEl = document.createElement('p');
    const conditionEl = document.createElement('p');
    const feelsLikeEl = document.createElement('p');

    const subContainer = document.createElement('div');
    const airQualityContainer = document.createElement('div');
    const airQualityLabel = document.createElement('p');
    const airQualityEl = document.createElement('p');
    const windContainer = document.createElement('div');
    const windLabel = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityContainer = document.createElement('div');
    const humidityLabel = document.createElement('p');
    const humidityEl = document.createElement('p');
    const visibilityContainer = document.createElement('div');
    const visibilityLabel = document.createElement('p');
    const visibilityEl = document.createElement('p');
    const pressureContainer = document.createElement('div');
    const pressureLabel = document.createElement('p');
    const pressureEl = document.createElement('p');
    const UVContainer = document.createElement('div');
    const UVLabel = document.createElement('p');
    const UVEl = document.createElement('p');

    mainContainer.id = 'main-data';
    weatherConditionContainer.id = 'weather-condition-container';
    weatherIconEl.id = 'weather-icon';
    tempEl.id = 'temp';
    conditionEl.id = 'weather-condition';
    feelsLikeEl.id = 'feelslike';

    subContainer.id = 'sub-data';
    airQualityContainer.className = 'data-container';
    windContainer.className = 'data-container';
    humidityContainer.className = 'data-container';
    visibilityContainer.className = 'data-container';
    pressureContainer.className = 'data-container';
    UVContainer.className = 'data-container';

    locationEl.textContent = location.region
      ? `${location.name}, ${location.region}, ${location.country}`
      : `${location.name}, ${location.country}`;
    lastUpdateEl.textContent = `Last updated: ${current.last_updated}`;
    tempEl.textContent = `${current.temp_c}°C`;
    conditionEl.textContent = current.condition.text;
    feelsLikeEl.textContent = current.feelslike_c;
    airQualityLabel.textContent = 'Air Quality';
    airQualityEl.textContent = getAirQuality();
    windLabel.textContent = 'Wind';
    windEl.textContent = `${current.wind_kph} km/h`;
    humidityLabel.textContent = 'Humidity';
    humidityEl.textContent = `${current.humidity}%`;
    visibilityLabel.textContent = 'Visibility';
    visibilityEl.textContent = `${current.vis_km} km`;
    pressureLabel.textContent = 'Pressure';
    pressureEl.textContent = `${current.pressure_mb} mb`;
    UVLabel.textContent = `UV Index`;
    UVEl.textContent = `${current.uv} - ${getUVValue()}`;

    weatherIconEl.src = current.condition.icon;
    weatherIconEl.alt = 'Weather condition icon';

    dataContainer.appendChild(mainContainer);
    dataContainer.appendChild(subContainer);
    mainContainer.appendChild(locationEl);
    mainContainer.appendChild(lastUpdateEl);
    mainContainer.appendChild(weatherConditionContainer);
    weatherConditionContainer.appendChild(weatherIconEl);
    weatherConditionContainer.appendChild(tempEl);
    weatherConditionContainer.appendChild(conditionEl);
    weatherConditionContainer.appendChild(feelsLikeEl);
    subContainer.appendChild(airQualityContainer);
    airQualityContainer.appendChild(airQualityLabel);
    airQualityContainer.appendChild(airQualityEl);
    subContainer.appendChild(windContainer);
    windContainer.appendChild(windLabel);
    windContainer.appendChild(windEl);
    subContainer.appendChild(humidityContainer);
    humidityContainer.appendChild(humidityLabel);
    humidityContainer.appendChild(humidityEl);
    subContainer.appendChild(visibilityContainer);
    visibilityContainer.appendChild(visibilityLabel);
    visibilityContainer.appendChild(visibilityEl);
    subContainer.appendChild(pressureContainer);
    pressureContainer.appendChild(pressureLabel);
    pressureContainer.appendChild(pressureEl);
    subContainer.appendChild(UVContainer);
    UVContainer.appendChild(UVLabel);
    UVContainer.appendChild(UVEl);
  }

  return {
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
searchbar.required = true;

submitBtn.textContent = 'Search';

body.appendChild(weatherApp);
weatherApp.appendChild(locationForm);
weatherApp.appendChild(weatherData);
locationForm.appendChild(searchbar);
locationForm.appendChild(submitBtn);

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const response = getCurrentWeatherData(searchbar.value);
  response
    .then((data) => {
      const weather = createWeather(data);
      weather.render();
    })
    .catch((err) => console.error(err));
});

const location = 'Thailand';
const currentWeatherData = await getCurrentWeatherData(location);
const weather = createWeather(currentWeatherData);
weather.render();
