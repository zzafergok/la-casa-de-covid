import axios from 'axios';

export default axios.create({
  baseURL: 'https://covid-api.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});
