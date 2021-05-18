<template>
    <div class="page-conponent-container__unassign-task" v-loading="loading">
        <el-form
            :inline="true"
        >
            <el-form-item>
                <json-excel
                    class = "export-excel-wrapper"
                    :data="tasks"
                    :fields="json_fields"
                    name="filename.xls"
                >
                    <el-button type="primary">导出</el-button>
                </json-excel>
            </el-form-item>
        </el-form>
        <el-table
            :data="tasks"
            border
        >
            <el-table-column
                prop="departmentTask.courseName"
                label="课程名称"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.courseCode"
                label="课程代码"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.courseCollegeCode"
                label="课程学院代码"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.grade"
                label="年级"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.semester"
                label="学期"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.major"
                label="课程所属学院"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.type"
                label="课程类型"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.classes"
                label="班级"
            ></el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="{ row }">
                    <el-link type="primary" @click="assigntask(row)">分配</el-link>
                </template>
            </el-table-column>
        </el-table>
        <assign-task-dialog
            v-if="showAssignDialog"
            :visible="showAssignDialog"
            @onclose="showAssignDialog = false; updateData()"
            :task="currUnassignTask"
        ></assign-task-dialog>
    </div>
</template>
<script>
import { Table, TableColumn, Link, Form, FormItem, Button } from 'element-ui';
import AssignTaskDialog from './components/assign-task-dialog.vue';
import JsonExcel from 'vue-json-excel'

import { getDepartmentTask } from '@/services/department.js';
export default {
    name: 'unassign-task',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
        ElForm: Form,
        ElFormItem: FormItem,
        ElButton: Button,
        AssignTaskDialog,
        JsonExcel,
    },
    data() {
        return {
            loading: false,
            tasks: [],
            showAssignDialog: false,
            currUnassignTask: null,
            json_fields: {
                '课程名称': 'departmentTask.courseName',
                '课程代码': 'departmentTask.courseCode',
                '课程学院代码': 'departmentTask.courseCollegeCode',
                '年级': 'departmentTask.grade',
                '学期': 'departmentTask.semester',
                '课程所属学院': 'departmentTask.major',
                '课程类型': 'departmentTask.type',
                '班级': 'departmentTask.classes',
            }
        };
    },
    async created() {
        this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getDepartmentTask({
                enable: 1
            });
            const { code, message, data } = res.data;
            if (code === 200) {
                this.tasks = data ? data : [];
            }
            this.loading = false;
        },
        assigntask(row) {
            this.showAssignDialog = true;
            this.currUnassignTask = row;
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container__unassign-task {
    padding: 24px;
}
</style>
