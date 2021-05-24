import axios from 'axios'

const $http = axios.create({
    withCredentials: true,
    // changeOrigin: true,
})

export async function getCollegeTask(params) {
    return await $http.get('/api/queryAllTeachingTask', { params })
}

export async function getAllTeacherLevels() {
    return await $http.get('/api/queryTitles');
}

// 更新教师职称
export async function updateTeacherLevel(params) {
    return await $http.get('/api/updateTeacherTitle', { params });
}

export async function getAllCourses() {
    return await $http.get('/api/getAllCourse');
}

export async function getAllClasses(params) {
    return await $http.get('/api/queryClasses', { params });
}

export async function getDepartmentPeo() {
    return await $http.get('/api/queryDepartments');
}

export async function getMajor() {
    return await $http.get('/api/queryMajor');
}

export async function getGrade(params) {
    return await $http.get('/api/queryGrade', { params });
}

export async function createTask(params) {
    return await $http.get('/api/receiveDepartmentTask', { params });
}

// check教师考核情况
export async function getAssesses(params) {
    return await $http.get('/api/queryTasks', { params });
}

export async function assessTeacher(body) {
    return await $http.post('/api/assess', body);
}

export async function getAppeals(params) {
    return await $http.get('/api/queryAppeal', { params });
}

export async function refuseAppeal(params) {
    return await $http.get('/api/disagreeAppeal', { params });
}

export async function agreeAppeal(params) {
    return await $http.get('/api/agreeAppeal', { params });
}
