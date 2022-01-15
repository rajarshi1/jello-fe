import axios from 'axios';

const setAuthToken = (token) => {
  if (token || localStorage.getItem('token')) {
    axios.defaults.headers.common['x-auth-token'] = token || localStorage.getItem('token');
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;