import axios from 'axios'

const $http = axios.create({
    withCredentials: true,
    // changeOrigin: true,
    // baseURL: 'http://172.20.10.6/ea',
})

// 查询各级模块人数
export async function getEveryModulePeo() {
    return await $http.get('/api/queryUserNumbs');
}

// 查询所有学院
export async function getAllDepartments() {
    return await $http.get('/api/queryAllCollege');
}

export async function stopTeacher(params) {
    return await $http.get('/api/disable', { params });
}

export async  function unBanTeacher(params) {
    return await $http.get('/api/unDisable', { params });
}

export async function getAllTeachers(params) {
    return await $http.get('/api/queryAllTeachers', { params });
}
