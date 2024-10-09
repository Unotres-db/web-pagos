import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000'
  // baseURL: 'https://db-pagos.onrender.com'
})

export default api;
