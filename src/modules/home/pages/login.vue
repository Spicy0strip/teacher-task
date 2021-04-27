<template>
    <div class="page-conponent-container_login">
        <el-form
            :model="formData"
            label-width="80px"
        >
            <el-form-item
                label="工号"
                prop="jobNumber"
            >
                <el-input placeholder="请输入工号" v-model="formData.jobNumber"></el-input>
            </el-form-item>

            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Input, Form, FormItem, Button } from 'element-ui';
export default {
    name: 'login',
    components: {
        ElInput: Input,
        ElForm: Form,
        ElFormItem: FormItem,
        ElButton: Button,
    },
    data() {
        const self = this;
        return {
            formData: {
                jobNumber: '',
                password: '',
            }
        };
    },
    methods: {
        submit() {

        }
    }
}
</script>
<style lang="less" scoped>
</style>
