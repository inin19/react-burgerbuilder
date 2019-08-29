import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-myburger-50f53.firebaseio.com/'
})

export default instance;