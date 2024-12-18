// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:8080';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default axios;
