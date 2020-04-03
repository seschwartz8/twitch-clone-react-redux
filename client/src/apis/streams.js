import axios from 'axios';

export default axios.create({
  // This is the URL we configured out json-server api server to run on (see the package.json in api directory)
  baseURL: 'http://localhost:3001'
});
