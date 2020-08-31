<template>
    <div class="userO">
        <div class="addUser">
                <h2>添加用户</h2>
                <el-button type="primary" @click="addLine">添加行数</el-button>
                <el-button type="success" @click="save(tableData.length)">保存</el-button>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                <el-table-column prop="username" label="username">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.username" placeholder="用户名"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="password" label="password">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.password" placeholder="密码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_tel" label="tel">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.user_tel" placeholder="电话"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_qq" label="qq">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.user_qq" placeholder="QQ号码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_mail" label="email">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.user_mail" placeholder="邮箱号码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    v-if="!scope.row.editing"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-divider></el-divider>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[{
                    username:'',
                    password:'',
                    user_tel:'',
                    user_qq:'',
                    user_mail:''
                }]
                }
            },

        methods: {
            addLine() { //添加行数
               const newValue = {
                    username:'',
                    password:'',
                    user_tel:'',
                    user_qq:'',
                    user_mail:''
                };
                //添加新的行数
                this.tableData.push(newValue);
            },
            handleDelete(index) { //删除行数
                this.tableData.splice(index, 1)
            },
            save(adds){
                let i=0
                console.log('共添加'+adds+'个用户！')
                //遍历添加每个用户
                for (i;i<adds;i++){
                    //保存添加的用户
                    const addUsers=JSON.parse(JSON.stringify(this.tableData))
                    console.log(addUsers)
                    if (addUsers[i].username==''||addUsers[i].password==''
                    ||addUsers[i].user_tel==''||addUsers[i].user_qq==''
                    ||addUsers[i].user_mail==''){
                        alert('请填写完整内容后再保存！')
                    }else{
                        alert('添加【'+addUsers[i].username+'】用户成功！')
                        this.$axios.post('/BooksMS/api/insUsers',
                            addUsers[i]).then(response=>{
                            const result=response.data[2]
                            if (result==1){
                                console.log('添加用户成功！')
                            }else{
                                console.log('添加失败！')
                            }
                        }).catch(error=>{
                            console.log(error)
                        })
                    }
                }
            }
        }
    }
</script>
<style>
.userO{
    margin-top: 60px;
}
</style>
