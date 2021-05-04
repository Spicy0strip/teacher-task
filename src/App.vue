<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { checkMySelfInfo } from '@/services/login.js'
export default {
    name: 'app-teacher-task',
    async created() {
        const { name } = this.$route;
        if (name === 'login') {
            return;
        }
        const res = await checkMySelfInfo();
        const { code, data, message } = res.data;

        if (code === 200) {
            this.$store.commit('sso:user:login', data);
        } else {
            this.$router.push({
                path: '/login',
            });
        }
    }
}
</script>

<style scoped lang="less">
</style>
