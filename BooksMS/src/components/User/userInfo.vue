<template>
    <div class="user">
        <el-table
                :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="id"
                    prop="user_id"
                    width="100">
            </el-table-column>
            <el-table-column
                    border
                    label="username"
                    prop="username"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="password"
                    prop="password"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="tel"
                    prop="user_tel"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="qq"
                    prop="user_qq"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="mail"
                    prop="user_mail"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入username关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleInit(scope.$index, scope.row)">初始化密码</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                userList:[],
                search:'',
                adminName:this.$route.params.adminName
            }
        },
        created(){
            this.showuserList()
        },
        methods: {
            //初始化密码为 0000为默认密码
            handleInit(index, row) {
                if (confirm('确定初始化【'+row.username+'】用户的密码吗？')){
                    this.$axios.post('/BooksMS/api/updUsersPwd',{
                        user_id:row.user_id
                    }).then(response=>{
                        const result=response.data[2]
                        if (result==1){
                            alert('初始化密码成功！')
                        }else{
                            alert('初始化密码失败！')
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            },

            //删除当行用户
            handleDelete(index, row){
                if(confirm('确定删除【'+row.username+'】用户数据吗？')) {
                    this.$axios.post('/BooksMS/api/delUsers', {
                        user_id: row.user_id
                    }).then(response => {
                        const result = response.data[2]
                        console.log(result)
                        if (result == 1) {
                            this.userList.splice(index, 1)//删除该行数据
                            alert('删除成功！')
                        } else {
                            alert('删除失败！请稍后重试。')
                        }
                    }).catch(error => {
                        //请求失败
                        console.log(error)
                        alert('请求操作失败！')
                    })
                }
            },
            //显示全部用户
            showuserList(){
                this.$axios.get('/BooksMS/api/showAllUsers').then(response=>{
                    //请求成功. response.data
                    const result=response.data
                    const need=[]
                    result.forEach(function (item) {
                        need.push({user_id:item.user_id,
                            username:item.username,
                            password:item.password,
                            user_tel:item.user_tel,
                            user_qq:item.user_qq,
                            user_mail:item.user_mail
                        })
                    })
                    this.userList =need
                    console.log(need)
                }).catch(error=>{
                    //请求失败
                    console.log(error)
                })
            }
        },
    }
</script>
<style>
.user{
    margin-top: 60px;
}
</style>
