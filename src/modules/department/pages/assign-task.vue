<template>
    <div class="page-conponent-container__assign-task" v-loading="loading">
        <el-table
            :data="tasks"
            border
        >
            <el-table-column
                prop="departmentTask.courseName"
                label="任务名称"
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
                label="课程所属许学院"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.type"
                label="课程类型"
            ></el-table-column>
            <el-table-column
                prop="departmentTask.classes"
                label="班级"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import { getDepartmentTask } from '@/services/department.js';
export default {
    name: 'assign-task',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
    },
    data() {
        return {
            loading: false,
            tasks: [],
        };
    },
    async created() {
        this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getDepartmentTask({
                enable: 0
            });
            const { code, message, data } = res.data;
            if (code === 200) {
                this.tasks = data ? data : [];
            }
            this.loading = false;
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container__assign-task {
    padding: 24px;
}
</style>
