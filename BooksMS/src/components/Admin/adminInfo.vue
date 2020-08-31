<template>
    <div class="admin">
            <el-table
                    :data="adminList"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"
                        >
                </el-table-column>
                <el-table-column
                        prop="admin_number"
                        label="管理员账号"
                        >
                </el-table-column>
                <el-table-column
                        prop="admin_pwd"
                        label="管理员密码">
                </el-table-column>
                <el-table-column
                        prop="admin_job"
                        label="管理员工作">
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                adminList:[]
            }
        },
        created(){
            this.showadminList()
        },

        methods:{
            showadminList(){
                this.$axios.get('/BooksMS/api/owAdmin').then(response=>{
                    const result=response.data
                    console.log(result)
                    this.adminList=result
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
.admin{
    margin-top: 60px;
}
</style>