<template>
    <el-row class="header">
        <el-col :span="20" >
            <img src="../../img/logo.png" style="width: 30px;height: 30px;float: left">
            <div class="grid-content" style="color:#f5dd5d;font-size:20px;padding:0px 30px">BooksMS后台管理系统</div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <el-dropdown menu-align="start" trigger="click" @command="logout" style="color:#fff;margin-top: 10px">
                      <span class="el-dropdown-link">
                          {{this.$route.query.getAdmin}}<i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown" >
                        <!--<el-dropdown-item style="min-width:200px">账号设置</el-dropdown-item>-->
                        <el-dropdown-item command="logout" style="min-width:200px">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data(){
            return{
                adminName:this.$route.query.getAdmin
            }
        },
        methods:{
            logout() {
                this.$router.push({path: '/login/'});
            }
        }
    }
</script>

<style>
.header{
    line-height:3;
    background:#0ea6b2;
    color:#fff;
    z-index:9999;
    position:fixed;
    width:100%;
}

.header img{
    display: block;
     margin: 18px 10px auto auto;
     height:32px;
}


</style>
