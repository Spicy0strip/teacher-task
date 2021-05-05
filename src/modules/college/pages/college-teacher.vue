<template>
    <div class="page-component-container__college-teacher" v-loading="loading">
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
                <template slot-scope="{ row }">
                    <el-link type="primary" @click="updateLevel(row)">修改职称</el-link>
                </template>
            </el-table-column>
        </el-table>
        <update-level-dialog
            :teacherInfo="currTeacherInfo"
            v-if="showUpdateLevelDialog"
            :visible="showUpdateLevelDialog"
            @onclose="showUpdateLevelDialog = false; updateTeachers()"
        >
        </update-level-dialog>
    </div>
</template>
<script>
import { Table, TableColumn, Link } from 'element-ui';
import { getAllTeachers, getAllDepartments, stopTeacher, unBanTeacher } from '@/services/system.js';
import UpdateLevelDialog from './components/update-level-dialog.vue';
export default {
    name: 'college-teacher',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
        UpdateLevelDialog,
    },
    data() {
        return {
            loading: false,
            teachers: [],
            currTeacherInfo: null,
            showUpdateLevelDialog: false,
        }
    },
    created() {
        this.updateTeachers();
    },
    methods: {
        async updateTeachers() {
            this.loading = true;
            const res = await getAllTeachers();
            const { code, data, message } = res.data;
            this.teachers = data ? data : [];
            this.loading = false;
        },
        updateLevel(row) {
            this.showUpdateLevelDialog = true;
            this.currTeacherInfo = row;
        }
    }
}
</script>
<style lang="less" scoped>
.page-component-container__college-teacher {
    padding: 24px;
}
</style>
