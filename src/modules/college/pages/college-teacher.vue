<template>
    <div class="page-component-container__college-teacher">
        <el-table
                :data="teachers"
                :loading="loading"
                border
            >
                <el-table-column
                    prop="teacherWrapper.teacherDetail.jobNumber"
                    label="工号"
                >
                </el-table-column>
                <el-table-column
                    prop="teacherWrapper.teacherDetail.name"
                    label="姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="teacherWrapper.title"
                    label="职称"
                ></el-table-column>
                <el-table-column
                    prop="teacherWrapper.college"
                    label="学院"
                ></el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template>
                        <el-link type="primary">修改职称</el-link>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Link } from 'element-ui';
import { getAllTeachers, getAllDepartments, stopTeacher, unBanTeacher } from '@/services/system.js';
export default {
    name: 'college-teacher',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
    },
    data() {
        return {
            teachers: []
        };
    },
    created() {
        this.updateTeachers();
    },
    methods: {
        async updateTeachers() {
            this.loading = true;
            const res = await getAllTeachers(this.query);
            const { code, data, message } = res.data;
            this.teachers = data ? data : [];
            this.loading = false;
        },
    }
}
</script>
<style lang="less" scoped>
.page-component-container__college-teacher {
    padding: 24px;
}
</style>
