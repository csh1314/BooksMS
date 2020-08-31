<template>
    <el-menu :default-active="default_key" :router="true" theme="dark" style="top:60px">
        <el-submenu index="user">
            <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
            <el-menu-item index="userInfo" :route="{path:'/User/userInfo/',query:{getAdmin:getAdmin}}">用户信息</el-menu-item>
            <el-menu-item index="userOpera" :route="{path:'/User/userOpera/',query:{getAdmin:getAdmin}}">用户操作</el-menu-item>
        </el-submenu>
        <el-submenu index="book">
            <template slot="title"><i class="el-icon-menu"></i>图书管理</template>
            <el-menu-item index="bookInfo" :route="{path:'/Book/bookInfo/',query:{getAdmin:getAdmin}}">图书信息</el-menu-item>
            <el-menu-item index="bookOpera" :route="{path:'/Book/bookOpera/',query:{getAdmin:getAdmin}}">图书操作</el-menu-item>
        </el-submenu>
        <el-submenu index="admin">
            <template slot="title"><i class="el-icon-warning"></i>管理员</template>
            <el-menu-item index="adminInfo" :route="{path:'/Admin/adminInfo/',query:{getAdmin:getAdmin}}">管理员信息</el-menu-item>
            <el-menu-item index="adminOpera" :route="{name:'adminChange',query:{getAdmin:getAdmin}}">管理员操作</el-menu-item>
        </el-submenu>
        <el-submenu index="data">
            <template slot="title"><i class="el-icon-s-data"></i>实时数据</template>
            <el-menu-item index="bookRecord" :route="{path:'/Data/BookRecord',query:{getAdmin:getAdmin}}">借书记录</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        created () {
            var array_url = window.location.hash.split("/");
            if (array_url.length == 2){
                return;
            }
            var active_key = array_url[array_url.length-2]
            this.default_key = active_key;
        },
        data() {
            return {
                default_key: "userInfo",
                getAdmin:this.$route.query.getAdmin
            };
        }
    };
</script>
