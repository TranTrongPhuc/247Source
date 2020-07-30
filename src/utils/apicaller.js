import axios from 'axios';
import * as config from '../constants/config';

export function CallApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${config.UrlApi}/${endpoint}`,
        data: body
    });
};

export function CallApiAuth(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${config.UrlApi}/${endpoint}`,
        data: body,
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
    });
};

export function CallApiExternal(url, method = 'GET', body) {
    return axios({
        method: method,
        url: url,
        data: body
    });
};