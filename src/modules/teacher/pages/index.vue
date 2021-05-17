<template>
    <div class="page-conponent-container_teacher" v-loading="loading">
        <el-form
            :model="formData"
            :inline="true"
        >
            <el-form-item
                label="年级"
            >
                <el-select
                    v-model="formData.grade"
                    placeholder="请选择年级"
                    @change="updateTeacherInfo"
                >
                    <el-option
                        v-for="grade in ['2021', '2020', '2019', '2018', '2017', ]"
                        :key="grade"
                        :value="grade"
                        :label="grade"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="学期"
            >
                <el-select
                    v-model="formData.semester"
                    placeholder="请选择学期"
                    @change="updateTeacherInfo"
                >
                    <el-option
                        v-for="semester in ['2021-2', '2021-1', '2020-2', '2020-1', '2019-2', '2018-2', '2018-1']"
                        :key="semester"
                        :value="semester"
                        :label="semester"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="checkAssess">
                    查看考核
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="teacherInfo.teachingTask"
            border
        >
            <el-table-column
                prop="courseCode"
                label="课程代码"
            >
            </el-table-column>
            <el-table-column
                prop="courseName"
                label="课程名称"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="课程类型"
            >
            </el-table-column>
            <el-table-column
                prop="studentNumbs"
                label="学生人数"
            >
            </el-table-column>
            <el-table-column
                prop="hours"
                label="学时"
            >
            </el-table-column>
            <el-table-column
                prop="major"
                label="专业"
            ></el-table-column>
            <el-table-column
                prop="grade"
                label="年级"
            ></el-table-column>
            <el-table-column
                prop="classes"
                label="班级"
            >
            </el-table-column>
            <el-table-column
                prop="semester"
                label="学期"
            ></el-table-column>
            <el-table-column
                prop="insertTime"
                label="插入时间"
            ></el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新时间"
            ></el-table-column>
            <el-table-column
                prop="workload"
                label="工作量"
            ></el-table-column>
        </el-table>
        <check-assess-dialog
            v-if="showCheckAssessDialog"
            :visible="showCheckAssessDialog"
            @onclose="showCheckAssessDialog = false;"
        >
        </check-assess-dialog>
    </div>
</template>
<script>
import { Table, TableColumn, Form, FormItem, Select, Option, Button } from 'element-ui';
import CheckAssessDialog from './components/check-assess-dialog.vue';

import { mapState } from 'vuex';

import { getTeacherInfo } from '@/services/teacher.js';
export default {
    name: 'teacher',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElButton: Button,
        CheckAssessDialog,
    },
    data() {
        return {
            loading: false,
            teacherInfo: {
                teachingTask: [],
            },
            formData: {
                grade: '',
                semester: '2021-1'
            },
            showCheckAssessDialog: false,
        }
    },
    async created() {
        this.userInfo && this.updateTeacherInfo();
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        query() {
            const { grade, semester } = this.formData;
            return {
                grade,
                semester,
                jobNumber: this.userInfo && this.userInfo.jobNumber,
            };
        }
    },
    watch: {
        userInfo: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.updateTeacherInfo();
                }
            }
        }
    },
    methods: {
        async updateTeacherInfo() {
            this.loading = true;
            const res = await getTeacherInfo(this.query);
            const { code, data, message } = res.data;
            this.teacherInfo = data;
            this.loading = false;
        },
        checkAssess() {
            this.showCheckAssessDialog = true;
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container_teacher {
    padding: 24px;
}
</style>
