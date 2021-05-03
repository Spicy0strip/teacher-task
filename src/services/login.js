import axios from 'axios'

const baseURL = "http://39.96.82.21/ea";

// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

const $http = axios.create({
    // withCredentials: true,
    // changeOrigin: true,
    // baseURL: 'http://172.20.10.6/ea',
})

export async function doLogin(params) {
    // console.log('dd', $http);
    return await axios.get('/api/login', {
        params,
        withCredentials: true,
    });
}

