<template>
    <div class="page-conponent-container_system">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/系部负责人.png" />
                    <div>
                        <p>院负责人</p>
                        <p>10</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/系部负责人.png" />
                    <div>
                        <p>系部负责人</p>
                        <p>10</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/系部负责人.png" />
                    <div>
                        <p>老师</p>
                        <p>10</p>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-form
            :model="formData"
        >
            <el-form-item
                label="学院"
            >
                <el-select
                    placeholder="请选择学院"
                    v-model="formData.collegeCode"
                >
                    <el-option
                        v-for="department in departments"
                        :key="department.id"
                        :label="department.collegeName"
                        :value="department.collegeCode"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
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
                    <el-link type="primary" v-if="row.enable === 1">禁用</el-link>
                    <el-link type="primary" v-if="row.enable === 0">解禁</el-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

import { Row, Col, Form, Select, FormItem, Option, Table, TableColumn, Link } from 'element-ui';

import { getEveryModulePeo, getAllTeachers, getAllDepartments } from '@/services/system.js';

export default {
    name: 'system',
    components: {
        ElRow: Row,
        ElCol: Col,
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElLink: Link,
    },
    data() {
        return {
            loading: false,
            everyModulePeo: null,
            teachers: [],
            formData: {
                collegeCode: '',
            },
            departments: [],
        }
    },
    created() {
        this.updateTeachers();
        this.updateEveryModulePeo();
        this.updateAllDepartment();
    },
    computed: {
        query() {
            const { collegeCode } = this.formData;
            const query = {
                collegeCode: '',
            };
            return query;
        }
    },
    methods: {
        async updateEveryModulePeo() {
            const res = await getEveryModulePeo();
            const { code, data, message } = res.data;
            this.everyModulePeo = data;
        },
        async updateTeachers() {
            this.loading = true;
            const res = await getAllTeachers(this.query);
            const { code, data, message } = res.data;
            this.teachers = data ? data : [];
            this.loading = false;
        },
        async updateAllDepartment() {
            const res = await getAllDepartments();
            const { code, data, message } = res.data;
            this.departments = data ? data : [];
        }
    }
}
</script>
<style lang="less" scoped>
</style>
