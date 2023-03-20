import axios from 'axios';

const serverApi = axios.create({
  baseURL: './backend',
  timeout: 9000,
});

export default serverApi;
