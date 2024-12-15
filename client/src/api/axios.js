import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:8080';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default axios;
