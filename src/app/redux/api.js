import axios from 'axios';
import { Modal } from 'antd';

const qs = require('qs');

// declare var abp: any;

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});

http.interceptors.request.use(
    function (config) {

        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            config.headers.common.Authorization = `Bearer ${accessToken}`
        } else {
            localStorage.removeItem('accessToken')
            delete config.headers.common.Authorization
        }
        // if (!!abp.auth.getToken()) {
        //     config.headers.common['Authorization'] = 'Bearer ' + abp.auth.getToken();
        // }
        // config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue('Abp.Localization.CultureName');
        // config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        return response;
    },
    errors => {
        let error = JSON.parse(JSON.stringify(errors))
        Modal.error({
            centered: true,
            title: error.name,
            content: error.message
        });
        // if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
        //     Modal.error({
        //         title: error.response.data.error.message,
        //         content: error.response.data.error.details,
        //     });
        // } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
        //     Modal.error({
        //         title: 'LoginFailed',
        //         content: error.response.data.error.message,
        //     });
        // } else if (!error.response) {
        //     Modal.error({ content: 'UnknownError' });
        // }

        setTimeout(() => { }, 1000);

        return Promise.reject(error);
    }
);

export default http;


// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL, // Replace with your API URL
// });

// // Add a response interceptor to handle errors
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             console.log(error.message)
//             return error;
//             // The request was made, and the server responded with an error status code
//             console.error('Response Error:', error.response.data);
//         } else if (error.request) {
//             // The request was made, but no response was received
//             console.error('Request Error:', error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error('Error:', error.message);
//         }
//         return Promise.reject(error); // Reject the Promise so that the caller can handle the error
//     }
// );

// export default api;