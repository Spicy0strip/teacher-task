<template>
    <div class="page-component-container__create-task-dialog">
        <el-dialog
            title="创建任务"
            :visible.sync="visible"
            width="40%"
            @close="onClose"
        >
            <el-form
                :model="formData"
                label-width="120px"
                ref="task"
            >
                <el-form-item
                    label="课程"
                    prop="courseCode"
                    :rules="[
                        { required: true, message: '请选择课程', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.courseCode"
                        placeholder="请选择课程"
                        style="width: 100%;"
                    >
                        <el-option
                            v-for="item in courses"
                            :key="item.id"
                            :label="item.courseName"
                            :value="item.courseCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="专业"
                    prop="major"
                    :rules="[
                        { required: true, message: '请选择专业', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.major"
                        placeholder="请选择职称"
                        style="width: 100%;"
                        @change="updateGrade"
                    >
                        <el-option
                            v-for="item in majors"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="年级"
                    prop="grade"
                    :rules="[
                        { required: true, message: '请选择年级', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.grade"
                        placeholder="请选择年级"
                        style="width: 100%;"
                    >
                        <el-option
                            v-for="item in grades"
                            :key="item.id"
                            :label="item.grade"
                            :value="item.grade"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="班级"
                    prop="classes"
                    :rules="[
                        { required: true, message: '请选择班级', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.classes"
                        placeholder="请选择班级"
                        style="width: 100%;"
                        multiple
                    >
                        <el-option
                            v-for="item in classes"
                            :key="item.id"
                            :label="item.className"
                            :value="item.className"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="时长"
                    prop="hours"
                    :rules="[
                        { required: true, message: '请输入课程时长', trigger: true },
                    ]"
                >
                    <el-input
                        v-model.number="formData.hours"
                        placeholder="请输入课程时长"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="系部负责人"
                    prop="departmentJobNumber"
                    :rules="[
                        { required: true, message: '请选择系部负责人', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.departmentJobNumber"
                        placeholder="请选择系部负责人"
                        style="width: 100%;"
                    >
                        <el-option
                            v-for="item in departmentPeo"
                            :key="item.jobNumber"
                            :label="item.name"
                            :value="item.jobNumber"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Form, FormItem, Dialog, Input, Button, Message, MessageBox, Select, Option } from 'element-ui';

import { mapState } from 'vuex';

import { getDepartmentPeo, getAllCourses, getAllClasses, getGrade, getMajor, createTask } from '@/services/college.js';
export default {
    name: 'update-password-dialog',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElDialog: Dialog,
        ElInput: Input,
        ElButton: Button,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            formData: {
                major: '',
                grade: '',
                courseCode: '',
                classes: [],
                departmentJobNumber: '',
                hours: undefined,
            },
            courses: [],
            classes: [],
            departmentPeo: [],
            majors: [],
            grades: [],
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        })
    },
    watch: {
        'formData.grade': {
            immediate: true,
            handler(val) {
                if (val && this.formData.major) {
                    this.updateClass();
                }
            }
        },
        'formData.major': {
            immediate: true,
            handler(val) {
                if (val && this.formData.grade) {
                    this.updateClass();
                }
            }
        }
    },
    created() {
        this.updateCourse();
        this.updateMajor();
        this.updateDepartmentPeo();
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.task.validate(async (valid) => {
                if (valid) {
                    const { major, grade, courseCode, hours, classes, departmentJobNumber } = this.formData;
                    const course = this.courses.filter(co => co.courseCode == courseCode)[0];
                    const classs = this.classes.filter(c => classes.includes(c.className));
                    const res = await createTask({
                        collegeJobNumber: this.userInfo.jobNumber,
                        major,
                        grade,
                        courseCode,
                        courseName: course.courseName,
                        type: course.type,
                        hours,
                        classes: classes.join(','),
                        studentNumbs: classs.map(c => c.studentNumbs).reduce((all, curr) => all + curr),
                        departmentJobNumber,
                        semester: '2021-1',
                    });
                    const { code, data, message } = res.data;
                    if (code === 200) {
                        Message({
                            message: '创建课程成功',
                            type: 'success',
                        });
                    } else {
                        MessageBox({
                            type: 'error',
                            message,
                            title: '操作失败',
                        });
                    }
                    this.onClose();
                }
            })
        },
        async updateCourse() {
            const res = await getAllCourses();
            const { code, data, message } = res.data;
            if (code === 200) {
                this.courses = data ? data : [];
            }
        },
        async updateMajor() {
            const res = await getMajor();
            const { code, data, message } = res.data;
            this.majors = data ? data : [];
        },
        async updateGrade(val) {
            if (val) {
                this.formData.grade = '';
                const res = await getGrade({
                    major: val,
                });
                const { code, data, message } = res.data;
                this.grades = data ? data : [];
            }

        },
        async updateClass() {
            const { major, grade } = this.formData;
            const res = await getAllClasses({
                major,
                grade,
            });
            const { code, data, message } = res.data;
            if (code === 200) {
                this.classes = data ? data : [];
            }
        },
        async updateDepartmentPeo() {
            const res = await getDepartmentPeo();
            const { code, data, message } = res.data;
            if (code === 200) {
                this.departmentPeo = data ? data : [];
            }
        }
    }
}
</script>
<style scoped lang="less">
</style>
