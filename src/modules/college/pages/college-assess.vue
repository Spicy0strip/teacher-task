<template>
    <div class="page-component-container__college-assess" v-loading="loading">
        <el-alert
            type="warning"
            effect="dark"
            class="alert-warning"
        >
            <template slot="title">
                <p>教学为主型，要求学时200</p>
                <p>科研为主型，要求学时90</p>
                <p>教学科研并重型，要求140学时/学期</p>
            </template>
        </el-alert>
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
                label="操作"
            >
                <template slot-scope="{ row }">
                    <el-link v-if="row.needAssess" type="primary" @click="assess(row)">考核</el-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Table, TableColumn, Link, Message, MessageBox, Alert, Form, FormItem, Button } from 'element-ui';
import JsonExcel from 'vue-json-excel';

import { assessTeacher, getAssesses } from '@/services/college.js';
export default {
    name: 'college-assess',
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
            const res = await getAssesses({
                semester: '2021-1',
            });
            const { code, data, message } = res.data;
            this.assesses = data ? data : [];
            this.loading = false;
        },
        async assess(row) {
            const res = await assessTeacher(row);
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: '考核操作成功',
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
.page-component-container__college-assess {
    padding: 24px;
    .alert-warning {
        margin-bottom: 24px;
    }
}
</style>
