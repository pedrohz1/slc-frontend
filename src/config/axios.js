import axios from 'axios';

export const BASE_URL = 'https://jsonfake-etv6.onrender.com/movida_5.0';

export const api = axios.create({
    baseURL: BASE_URL,
})