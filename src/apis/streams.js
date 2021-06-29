//base url of 'localhost:3001' used as 'json-server' endpoint
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001'
});
