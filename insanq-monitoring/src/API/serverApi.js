import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 9000,
});

export default serverApi;
