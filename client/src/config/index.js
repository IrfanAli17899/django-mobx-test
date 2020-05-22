/* eslint-disable no-underscore-dangle */
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

function setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export { setToken };
export default axios;