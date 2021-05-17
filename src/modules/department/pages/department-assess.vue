<template>
    <div class="page-component-container__department-assess" v-loading="loading">
        <el-table
            :data="assesses"
            :loading="loading"
            border
        >
            <el-table-column
                prop="jobNumber"
                label="工号"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
            >
            </el-table-column>
            <el-table-column
                prop="semester"
                label="学期"
            ></el-table-column>
            <el-table-column
                prop="realHours"
                label="当前学时"
            ></el-table-column>
            <el-table-column
                prop="shouldHours"
                label="要求学时"
            >
            </el-table-column>
            <el-table-column
                label="是否达标"
                prop="reach"
            >
                <template slot-scope="{ row }">
                    <span>{{row.reach ? '达标' : '不达标'}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Link, Message, MessageBox, Alert } from 'element-ui';
import { assessTeacher, getAssesses } from '@/services/college.js';
export default {
    name: 'department-assess',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
        ElAlert: Alert,
    },
    data() {
        return {
            loading: false,
            assesses: [],
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getAssesses({
                semester: '2021-1',
            });
            const { code, data, message } = res.data;
            this.assesses = data ? data : [];
            this.loading = false;
        }
    }
}
</script>
<style lang="less" scoped>
.page-component-container__department-assess {
    padding: 24px;
    .alert-warning {
        margin-bottom: 24px;
    }
}
</style>
