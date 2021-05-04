<template>
    <div class="page-conponent-container_system">
        <el-row class="every-module" v-if="everyModulePeo">
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/学院负责人.png" />
                    <div class="content">
                        <p class="name">学院负责人</p>
                        <p class="num">{{everyModulePeo.collegeDirectorNumbs}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/系部负责人.png" />
                    <div class="content">
                        <p class="name">系部负责人</p>
                        <p class="num">{{everyModulePeo.departmentNumbs}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/教师.png" />
                    <div class="content">
                        <p class="name">老师</p>
                        <p class="num">{{everyModulePeo.teacherNumbs}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="teacher-content">
            <el-form
                :model="formData"
            >
                <el-form-item
                    label="学院"
                >
                    <el-select
                        placeholder="请选择学院"
                        v-model="formData.collegeCode"
                        @change="updateTeachers"
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
                        <el-link type="primary" v-if="row.enable === 1" @click="disableTeacher(row)">禁用</el-link>
                        <el-link type="primary" v-if="row.enable === 0" @click="unBanTeacher(row)">解禁</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>

import { Row, Col, Form, Select, FormItem, Option, Table, TableColumn, Link, Message, MessageBox } from 'element-ui';

import { getEveryModulePeo, getAllTeachers, getAllDepartments, stopTeacher, unBanTeacher } from '@/services/system.js';

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
    async created() {
        this.updateTeachers();
        await this.updateEveryModulePeo();
        this.updateAllDepartment();
    },
    computed: {
        query() {
            const { collegeCode } = this.formData;
            const query = {
                collegeCode,
            };
            return query;
        },
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
        },
        async disableTeacher(row) {
            const res = await stopTeacher({
                jobNumber: row.teacherWrapper.teacherDetail.jobNumber,
            });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    type: 'success',
                    message: '禁用成功',
                });
                this.updateTeachers();
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
        },
        async unBanTeacher(row) {
            const res = await unBanTeacher({
                jobNumber: row.teacherWrapper.teacherDetail.jobNumber,
            });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    type: 'success',
                    message: '解禁成功',
                });
                this.updateTeachers();
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
.page-conponent-container_system {
    background: #eff1f4;
}
.every-module {
    display: flex;
    justify-content: space-between;
    padding: 48px 0;
    &__item {
        background: #ffffff;
        width: 350px;
        .grid-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content {
                margin-right: 24px;
            }
            .name {
                color: #8c8d8d;
            }
            .name,
            .num {
                font-size: 20px;
            }
        }
        img {
            width: 58px;
            height: 58px;
            margin-left: 24px;
        }
    }
}
.teacher-content {
    background: #fff;
    padding: 24px;
}
</style>
