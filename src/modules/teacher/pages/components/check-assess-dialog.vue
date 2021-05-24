<template>
    <div class="page-component-container__check-assess-dialog" v-if="data">
        <el-dialog
            title="修改密码"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form>
                <el-form-item
                    label="工号："
                >
                    <span>{{data.jobNumber}}</span>
                </el-form-item>
                <el-form-item
                    label="姓名："
                >
                    <span>{{data.name}}</span>
                </el-form-item>
                <el-form-item
                    label="学期："
                >
                    <span>{{data.semester}}</span>
                </el-form-item>
                <el-form-item
                    label="实际学时："
                >
                    <span>{{data.realHours}}</span>
                </el-form-item>
                <el-form-item
                    label="当前学时："
                >
                    <span>{{data.shouldHours}}</span>
                </el-form-item>
                <el-form-item
                    label="是否达标："
                >
                    <span>{{data.reach ? '达标' : '不达标'}}</span>
                </el-form-item>
                <el-form-item
                    v-if="!data.enable"
                    label="申诉状态："
                >
                    <span>{{appealStatusMap[data.appeal]}}</span>
                </el-form-item>
                <el-form-item
                    v-if="!data.enable&&(data.appeal === 0 || data.appeal === 3)"
                    label="申诉理由"
                >
                    <el-input type="textarea" placeholder="请输入申诉理由" v-model="description"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">关闭</el-button>
                <el-button v-if="!data.enable" type="primary" @click="submitAssess">考核确认</el-button>
                <el-button v-if="!data.enable&&(data.appeal === 0 || data.appeal === 3)" type="primary" @click="submitappeal">
                    申诉
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Dialog, Button, Form, FormItem, Input, Message, MessageBox} from 'element-ui';

import { mapState } from 'vuex';

import { checkAssess, verifyAssess, appeal } from '@/services/teacher.js';
export default {
    name: 'check-assess-dialog',
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
        ElInput: Input,
    },
    data() {
        return {
            data: null,
            appealStatusMap: {
                0: '未申诉',
                1: '申诉中',
                2: '申诉成功',
                3: '申诉失败',
            },
            description: '',
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
    },
    async created() {
        await this.updateData();
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        async updateData() {
            const res = await checkAssess({
                semester: '2021-1',
            });
            this.data = res.data.data;
        },
        async submitAssess() {
            const res = await verifyAssess({
                id: this.data.id,
            })
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: '考核确认成功',
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
        },
        async submitappeal() {
            const res = await appeal({
                id: this.data.id,
                description: this.description,
            });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: '申诉提交成功',
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
    }
}
</script>
<style scoped lang="less">
</style>
