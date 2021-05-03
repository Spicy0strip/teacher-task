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
            :router="true"
        >
            <el-menu-item index="system" route="/system">
                <i class="teacher">&#xe604;</i>
                <span slot="title">系统管理</span>
            </el-menu-item>
            <el-submenu index="college-teache">
                <template slot="title">
                    <i class="teacher">&#xe603;</i>
                    <span>学院管理</span>
                </template>
                <el-menu-item index="college-teacher" route="/college/teacher">
                    <i class="teacher">&#xe603;</i>
                    <span>老师列表</span>
                </el-menu-item>
                <el-menu-item index="college-task" route="/college/task">
                    <i class="teacher">&#xe603;</i>
                    <span>任务列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="department">
                <template slot="title">
                    <i class="teacher">&#xe606;</i>
                    <span>系部管理</span>
                </template>
                <el-menu-item index="unassign-task" route="/department/unassign-task">
                    <i class="teacher">&#xe606;</i>
                    <span>未分配任务</span>
                </el-menu-item>
                <el-menu-item index="assign-task" route="/department/assign-task">
                    <i class="teacher">&#xe606;</i>
                    <span>已分配任务</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="teacher" route="/teacher">
                <i class="teacher">&#xe605;</i>
                <span slot="title">老师管理</span>
            </el-menu-item>
        </el-menu>
        <div class="home-content">
            <header class="home-header">
                <el-dropdown class="profile" :hide-on-click="false">
                    <span class="el-dropdown-link">
                        <i class="teacher avatar">&#xe601;</i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>查询个人信息</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import { Menu, Submenu, MenuItemGroup, MenuItem, Button, Dropdown, DropdownItem, DropdownMenu } from "element-ui";
export default {
    name: 'index',
    components: {   
        ElMenu: Menu,
        ElSubmenu: Submenu,
        ElMenuItemGroup: MenuItemGroup,
        ElMenuItem: MenuItem,
        ElButton: Button,
        ElDropdown: Dropdown,
        ElDropdownItem: DropdownItem,
        ElDropdownMenu: DropdownMenu,
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
            line-height: 56px;
            height: 56px;
            box-shadow: 0 2px 3px -1px rgb(0 0 0 / 4%),
                0 2px 8px 2px rgb(0 0 0 / 2%), 0 4px 7px 1px rgb(0 0 0 / 5%);

            .profile {
                float: right;
                margin-right: 12px;
                cursor: pointer;
            }
            .avatar {
                font-size: 44px;
            }
        }
    }
}
</style>
