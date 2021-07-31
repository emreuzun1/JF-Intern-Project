import axios from 'axios';

export function requestGetUser() {
    return axios({
        method: 'GET',
        url: 'https://api.jotform.com/user',
        params: {
            apikey: '85d3a1500fabf66c0c9199c4b6793298'
        }
    })
};