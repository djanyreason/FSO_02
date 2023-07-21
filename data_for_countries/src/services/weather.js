import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

const getWeather = (lat, lon) => {
  return axios
    .get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then(response => response.data)
    .catch(error => []);
}

export default {
  getWeather
};