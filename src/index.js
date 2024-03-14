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

const location = 'Singapore';
const currentWeatherData = await getCurrentWeatherData(location);

console.log(currentWeatherData);
