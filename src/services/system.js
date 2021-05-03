import axios from 'axios'

// 查询各级模块人数
export async function getEveryModulePeo() {
    return await axios.get('http://39.96.82.21/ea/queryUserNumbs');
}

// 查询所有学院
export async function getAllDepartments() {
    return await axios.get('http://39.96.82.21/ea/queryAllCollege');
}

export async function stopTeacher() {
    return await axios.get('http://39.96.82.21/ea/disable');
}

export async  function unBanTeacher() {
    return await axios.get('http://39.96.82.21/ea/unDisable');
}

export async function getAllTeachers(params) {
    return await axios.get('http://39.96.82.21/ea/queryAllTeachers', { params });
}
