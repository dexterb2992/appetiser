import axios from 'axios'
import config from '@/store/config.js';

function convertToFormData(payload) {
    var formdata = new FormData;
    for (var key in payload) {
        formdata.append(key, payload[key]);
    }

    return formdata;
}

export function post(path, payload) {
    return axios({
    	method: 'POST',
    	url: config.api+path,
    	data: convertToFormData(payload),
    	headers: {
    		'Content-type': 'application/x-www-form-urlencoded'
    	}
    })
}

export function interceptors(cb) {
    axios.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        cb(err)
        return Promise.reject(err)
    })
}

if (typeof (window._config == 'undefined')) {
    window._config = config;
}