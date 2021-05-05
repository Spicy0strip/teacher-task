import axios from 'axios'

const $http = axios.create({
    withCredentials: true,
    // changeOrigin: true,
})

export async function getDepartmentTask(params) {
    return await $http.get('/api/queryAllDepartmentTask', { params })
}

export async function getDepartmentTeachers(params) {
    return await $http.get('/api/queryCollegeTeacher', { params })
}

// 分配任务
export async function assignTask(params) {
    return await $http.get('/api/receiveTeachingTask', { params });
}
