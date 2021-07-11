import axios from 'axios';


//define a URL da api
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;