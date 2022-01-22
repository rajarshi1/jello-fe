import axios from 'axios';

const setAuthToken = (token) => {
  if (token || localStorage.getItem('token')) {
    axios.defaults.headers.common['authorization'] = token || localStorage.getItem('token');
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
};

export default setAuthToken;