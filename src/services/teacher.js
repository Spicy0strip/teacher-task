import axios from 'axios'

const $http = axios.create({
    withCredentials: true,
    // changeOrigin: true,
})

// 查询教师自己的任务量
export async function getTeacherInfo(params) {
    return await $http.get('/api/querySelfTeachingTask', { params })
}

export async function getProfile(params) {
    return await $http.get('/api/queryTeacherSelf', { params });
}
