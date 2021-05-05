<template>
    <div class="page-component-container__update-level-dialog">
        <el-dialog
            title="修改职称"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form
                :model="formData"
                label-width="60px"
                ref="level"
            >
                <el-form-item
                    label="工号"
                    prop="jobNumber"
                >
                    <el-input disabled v-model="formData.jobNumber"></el-input>
                </el-form-item>
                <el-form-item
                    label="职称"
                    prop="level"
                    :rules="[
                        { required: true, message: '请选择职称', trigger: true },
                    ]"
                >
                    <el-select
                        v-model="formData.level"
                        placeholder="请选择职称"
                        style="width: 100%;"
                    >
                        <el-option
                            v-for="le in levels"
                            :key="le.id"
                            :label="le.title"
                            :value="le.level"
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

import { getAllTeacherLevels, updateTeacherLevel } from '@/services/college.js';

export default {
    name: 'update-password-dialog',
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
                level: undefined,
            },
            levels: [],
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        teacherInfo: {
            type: [Object, null],
            default: () => null,
        }
    },
    created() {
        this.updateLevels();
        const { level, jobNumber } = this.teacherInfo.teacherWrapper.teacherDetail;
        this.formData = {
            ...this.formData,
            level,
            jobNumber,
        };
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.level.validate(async (valid) => {
                if (valid) {
                    const res = await updateTeacherLevel(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            message: '职称等级修改成功',
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
        },
        async updateLevels() {
            const res = await getAllTeacherLevels();
            const { code, data, message } = res.data;
            if (code === 200) {
                this.levels = data ? data : [];
            }
        }
    }
}
</script>
<style scoped lang="less">
</style>
