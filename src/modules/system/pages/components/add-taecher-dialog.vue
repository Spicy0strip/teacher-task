<template>
    <div class="page-component-container__add-taecher-dialog">
        <el-dialog
            title="修改密码"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form
                :model="formData"
                label-width="100px"
                :rules="rules"
                ref="teacher"
            >
                <el-form-item
                    label="工号"
                    prop="jobNumber"
                >
                    <el-input v-model="formData.jobNumber"></el-input>
                </el-form-item>
                <el-form-item
                    label="姓名"
                    prop="name"
                >
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="学院"
                    prop="collegeCode"
                >
                    <el-select
                        placeholder="请选择学院"
                        v-model="formData.collegeCode"
                        style="width: 100%"
                    >
                        <el-option
                            v-for="department in departments"
                            :key="department.id"
                            :label="department.collegeName"
                            :value="department.collegeCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="职称等级"
                    prop="level"
                >
                    <el-select
                        style="width: 100%"
                        placeholder="请选择职称等级"
                        v-model="formData.level"
                    >
                        <el-option
                            v-for="item in [
                                { value: 1, label: '教授' },
                                { value: 2, label: '副教授' },
                                { value: 3, label: '讲师' },
                                { value: 4, label: '高工' },
                                { value: 5, label: '工程师' },
                            ]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="教师类型"
                    prop="type"
                >
                    <el-select
                        style="width: 100%"
                        placeholder="请选择教师类型"
                        v-model="formData.type"
                    >
                        <el-option
                            v-for="item in [
                                { value: 1, label: '教学为主型' },
                                { value: 2, label: '教学科研并重型' },
                                { value: 3, label: '科研为主型' },
                            ]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Form, FormItem, Dialog, Input, Button, Message, MessageBox, Select, Option } from 'element-ui';

import { mapState } from 'vuex';

import { addTeacher } from '@/services/system.js';

export default {
    name: 'add-taecher-dialog',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElDialog: Dialog,
        ElInput: Input,
        ElButton: Button,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            formData: {
                jobNumber: '',
                name: '',
                collegeCode: '',
                level: 1,
                type: 1,
            },
            rules: {
                jobNumber: [
                    { required: true, message: '请输入工号', trigger: true },
                ],
                name: [
                    { required: true, message: '请输入教师姓名', trigger: true },
                ],
                collegeCode: [
                    { required: true, message: '请输入学院代码', trigger: true },
                ],
                level: [
                    { required: true, message: '请输入职称等级', trigger: true },
                ],
                type: [
                    { required: true, message: '请输入教师类型', trigger: true },
                ]
            }
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        departments: {
            type: Array,
            default: () => [],
        }
    },
    computed: {
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.teacher.validate(async (valid) => {
                if (valid) {
                    const res = await addTeacher(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            message: '添加教师成功',
                            type: 'success',
                        });
                    } else {
                        MessageBox({
                            type: 'error',
                            message,
                            title: '操作失败',
                        });
                    }
                    this.onClose();
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
</style>
