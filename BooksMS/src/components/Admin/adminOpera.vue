<template>
    <div class="adminO">
        <div class="changgePwd">
            <h2>【{{this.$route.query.getAdmin}}】管理员修改密码</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="pass">
                    <el-col :span="7">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-col :span="7">
                    <el-input type="password" v-model="ruleForm.newpass" autocomplete="off">
                    </el-input>
                     </el-col>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-col :span="7">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off">
                    </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-divider></el-divider>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass0 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                }else{
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newpass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                getAdmin:'',
                ruleForm: {
                    pass:'',
                    newpass: '',
                    checkPass: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass0, trigger: 'blur' }
                    ],
                    newpass: [
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.getAdmin=this.$route.query.getAdmin
                console.log(this.getAdmin)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.adminName==''){
                            alert('请确认您是否登录！')
                        }else{
                            this.$axios.post('/BooksMS/api/updAdminPwd',{
                                admin_number:this.getAdmin,
                                admin_pwd:this.ruleForm.pass,
                                newadmin_pwd:this.ruleForm.newpass
                            }).then(response=>{
                                const result=response.data[2]
                                if (result==1){
                                    alert('【'+this.getAdmin+'】管理员修改密码成功！')
                                    this.resetForm(formName)
                                }else{
                                    alert('请确保您的原密码正确！')
                                }
                            }).catch(error=>{
                                console.log(error)
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
.adminO{
    margin-top: 60px;
}
</style>