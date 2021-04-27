<template>
    <div class="teacher-task__home">
        <el-menu
            default-active="teacher"
            class="home-menu home-menu-item"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="system">
                <i class="icon-menu"></i>
                <span slot="title">系统管理</span>
            </el-menu-item>
            <el-submenu index="college">
                <template slot="title">
                    <i class="icon-location"></i>
                    <span>学院管理</span>
                </template>
                <el-menu-item index="college-teacher">老师列表</el-menu-item>
                <el-menu-item index="college-task">任务列表</el-menu-item>
            </el-submenu>
            <el-submenu index="department">
                <template slot="title">
                    <i class="icon-location"></i>
                    <span>系部管理</span>
                </template>
                <el-menu-item index="teacher">老师列表</el-menu-item>
                <el-menu-item index="task">任务列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="teacher">
                <i class="icon-setting"></i>
                <span slot="title">老师管理</span>
            </el-menu-item>
        </el-menu>
        <div class="home-content">
            <header class="home-header">
                header头部
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import { Menu, Submenu, MenuItemGroup, MenuItem, Button } from "element-ui";
export default {
    name: 'index',
    components: {
        ElMenu: Menu,
        ElSubmenu: Submenu,
        ElMenuItemGroup: MenuItemGroup,
        ElMenuItem: MenuItem,
        ElButton: Button
    },
    methods: {
        handleOpen() {

        },
        handleClose() {

        }
    }
}
</script>
<style lang="less" scoped>
.teacher-task__home {
    display: flex;
    .home-menu {
        width: 200px;
        position: absolute;
        bottom: 0;
        top: 0;
    }
    .home-content {
        margin-left: 200px;
        flex: 1;
        .home-header {
            height: 56px;
            border-bottom: 1px solid grey;
        }
    }
}
</style>
