import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const $host = axios.create({
    baseURL: API_URL
})

const $authHost = axios.create({
    baseURL: API_URL
})

$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export { 
    $host,
    $authHost
};