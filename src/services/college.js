import axios from 'axios'

const $http = axios.create({
    withCredentials: true,
    // changeOrigin: true,
})

export async function getCollegeTask(params) {
    return await $http.get('/api/queryAllTeachingTask', params)
}
