import axios from 'axios'

export async function doLogin(params) {
    return await axios.get('http://39.96.82.21/ea/login', { params });
}
