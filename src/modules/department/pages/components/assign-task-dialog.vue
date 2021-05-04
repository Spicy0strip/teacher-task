<template>
    <div class="page-component-container__assign-task-dialog" v-if="task">
        <el-dialog
            title="分配任务"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form
                :model="formData"
                label-width="70px"
            >
                <el-form-item
                    label="任务名称"
                    prop="task.departmentTask.courseName"
                >
                    <el-input disabled v-model="task.courseName"></el-input>
                </el-form-item>
                <el-form-item
                    label="教师"
                    prop="jobNumber"
                    :rules="[
                        { required: true, message: '请选择要分配给的教师', trigger: true }
                    ]"
                >
                    <el-select v-model="formData.jobNumber" style="width: 100%">
                        <el-option
                            v-for="tea in teachers"
                            :key="tea.id"
                            :value="tea.jobNumber"
                            :label="tea.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Dialog, Button, Form, FormItem, Input, Select, Option, Message, MessageBox } from 'element-ui';

import { mapState } from 'vuex';
import { getDepartmentTeachers } from '@/services/department.js';
export default {
    name: 'assign-task-dialog',
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
        ElInput: Input,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            formData: {
                id: undefined,
                jobNumber: '',
            },
            teachers: [],
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        task: {
            type: [Object, null],
            default: () => null,
        },
    },
    created() {
        this.updateDepartmentTeachers();
        this.formData.id = this.task.departmentTask.id;
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        })
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.assign.validate(async valid => {
                if (valid) {
                    const res = await assignTask(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            type: 'success',
                            message: '分配成功',
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
            });
        },
        async updateDepartmentTeachers() {
            const res = await getDepartmentTeachers();
            const { code, data, message } = res.data;
            if (code === 200) {
                this.teachers = data ? data : [];
            }
        }
    }
}
</script>
<style scoped lang="less">
</style>
