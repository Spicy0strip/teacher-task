<template>
    <div class="page-component-container__college-task" v-loading="loading">
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
                    @change="updateData"
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
                    @change="updateData"
                >
                    <el-option
                        v-for="semester in ['2021-2', '2021-1', '2020-2', '2020-1', '2019-2', '2018-2', '2018-1']"
                        :key="semester"
                        :value="semester"
                        :label="semester"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="教师"
            >
                <el-select
                    v-model="formData.semester"
                    placeholder="请选择老师"
                    @change="updateData"
                >
                    <el-option
                        v-for="semester in ['2021-2', '2021-1', '2020-2', '2020-1', '2019-2', '2018-2', '2018-1']"
                        :key="semester"
                        :value="semester"
                        :label="semester"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table
            :data="tasks"
            border
        >
            <el-table-column
                prop="teacherName"
                label="课程老师"
            >
            </el-table-column>
            <el-table-column
                prop="courseCollege"
                label="课程老师所属学院"
            >
            </el-table-column>
            <el-table-column
                prop="teacherTitle"
                label="课程老师职级"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.courseCode"
                label="课程代码"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.courseName"
                label="课程名称"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.type"
                label="课程类型"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.studentNumbs"
                label="学生人数"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.hours"
                label="课时"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.major"
                label="专业"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.grade"
                label="年级"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.classes"
                label="班级"
            >
            </el-table-column>
            <el-table-column
                prop="teachingTask.semester"
                label="学期"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.insertTime"
                label="插入时间"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.updateTime"
                label="更新时间"
            ></el-table-column>
            <el-table-column
                prop="teachingTask.workload"
                label="工作量"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Form, FormItem, Input, Select, Option } from 'element-ui';

import { getCollegeTask } from '@/services/college.js';
export default {
    name: 'college-task',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            loading: false,
            formData: {
                grade: '',
                semester: '2021-1'
            },
            tasks: [],
        }
    },
    computed: {
        query() {
            const { grade, semester } = this.formData;
            return {
                grade,
                semester,
            };
        }
    },
    async created() {
        await this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getCollegeTask(this.query);
            const { code, data, message } = res.data;
            if (code === 200) {
                this.tasks = data ? data : [];
            }
            this.loading = false;
        }
    }
}
</script>
<style lang="less" scoped>
</style>
