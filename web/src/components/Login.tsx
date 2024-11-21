import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Bank from './Bank';

const clientAPI = axios.create({
    baseURL: "../../../examples/example", //?? (back-end URL)
    headers: {
        'Content-Type': 'application/json' //JSON is expected in the request body
    }
});
clientAPI.interceptors.request.use( //Request interceptor (adds the token to the Authorization header)
    (config) => {
        const token = localStorage.getItem('jwt'); //token from the back-end response
        if(token) {
            if(config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default clientAPI;