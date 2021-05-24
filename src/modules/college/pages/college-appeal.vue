<template>
    <div class="page-component-container__college-appeal" v-loading="loading">
        <el-form
            :inline="true"
        >
            <el-form-item>
                <json-excel
                    class = "export-excel-wrapper"
                    :data="assesses"
                    :fields="json_fields"
                    name="filename.xls"
                >
                    <el-button type="primary">导出</el-button>
                </json-excel>
            </el-form-item>
        </el-form>
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
            <el-table-column
                label="描述"
                prop="description"
            >
            </el-table-column>
            <el-table-column
                label="备注"
                prop="remarks"
            >
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="{ row }">
                    <el-link v-if="row.appeal" type="primary" @click="appeal(row, 'refuse')">拒绝申诉</el-link>
                    <el-link v-if="row.appeal" type="primary" @click="appeal(row, 'agree')">同意申诉</el-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Link, Message, MessageBox, Alert, Form, FormItem, Button } from 'element-ui';
import JsonExcel from 'vue-json-excel';

import { agreeAppeal, refuseAppeal, getAppeals } from '@/services/college.js';
export default {
    name: 'college-appeal',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
        ElAlert: Alert,
        ElForm: Form,
        ElFormItem: FormItem,
        ElButton: Button,
        JsonExcel,
    },
    data() {
        return {
            loading: false,
            assesses: [],
            json_fields: {
                '工号': 'jobNumber',
                '姓名': 'name',
                '学期': 'semester',
                '当前学时': 'realHours',
                '要求学时': 'shouldHours',
                '是否达标': 'reach',
            },
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getAppeals({ });
            const { code, data, message } = res.data;
            this.assesses = data ? data : [];
            this.loading = false;
        },
        async appeal(row, type) {
            const res = type === 'agree' ? await agreeAppeal({ id: row.id }) : await refuseAppeal({ id: row.id });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: type === 'agree' ? '同意申诉成功' : '拒绝申诉成功',
                    type: 'success',
                })
                this.updateData();
            } else {
                 MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
.page-component-container__college-appeal {
    padding: 24px;
    .alert-warning {
        margin-bottom: 24px;
    }
}
</style>
