import './style.css';

const API_KEY = '85e15c7e15584e2ba2e160829241103';

async function getWeatherInfo(location = 'Singapore') {
  try {
    const address = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
    const response = await fetch(address, { mode: 'cors' });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

console.log(await getWeatherInfo('london'));
