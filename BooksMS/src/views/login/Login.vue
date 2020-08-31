<template>
   <div>
       <div>
           <img src="../../img/logo.png" class="logo1"><h2>图书管</h2>
       </div>
       <div>
           <form action="">
               <div class="login">
                   <div style="height:50px;">
                       <h3><img src="../../img/logo1.png" class="logo2">用户登录</h3>
                   </div>
                   <div class="inputbox">
                       <div class="tb1"><img src="../../img/yonghu.png" class="user"></div>
                       <input type="text" id="username" v-model="user" @blur="blur">
                   </div>
                   <div class="inputbox">
                       <div class="tb2"><img src="../../img/suo.png" class="pwd"></div>
                       <input type="password" id="password" v-model="pwd">
                   </div>
                   <div class="box">
                       <div><a href="register.html">用户注册</a></div>
                       <br/>
                       <input type="button" value="登  录"  @click="submit">
                   </div>
                   <p style="color: red;">{{msg}}</p>
               </div>
           </form>
       </div>
   </div>
</template>

<script>
    export default {
        data(){
            return{
                user:'',
                pwd:'',
                msg:''
            }
        },
        methods:{
            blur(){
                if(!this.user){
                    this.msg='请输入用户名！'
                    return false
                }
                if(!this.pwd){
                    this.msg='请输入密码！'
                    return false
                }
                return true
            },

            submit(){
                const _this=this
                this.$axios.post('/BooksMS/api/login',
                    {username:_this.user,
                        password:_this.pwd}
                ).then((response) =>{
                    const result=response.data[2]//获取值类型为{"1"}   arr[2]即为数字
                    console.log(result)
                    if (result==1){
                        this.msg=''
                        alert('登录成功！')
                        //跳转至index页面并传递参数用户名（用以改密码需求）
                        //加密url并跳转
                        window.location.href=encodeURI('index.html'+'?username='+_this.user+'&')
                    }else{
                        this.msg='账号密码错误或用户名不存在！'
                    }
                }).catch(function (error) {
                    //请求失败
                    alert('请求失败！')
                    console.log(error)
                })

            }
        }
    }
</script>

<style scoped>

    .logo1{
        width: 40px;
        float: left;
    }
    .logo2{
        width: 33px;
        position: relative;
        top: 4px;
        right: 10px;
    }
    .login{
        height: 280px;
        width: 230px;
        padding: 20px;
        position: absolute;
        top: 20%;
        left:40%;
        background: white;
        border-radius: 10px;
    }
    .inputbox{
        height: 70px;
    }
    .inputbox input{
        height: 30px;
        width: 200px;
        margin-left: -10px;
        background-color:#c2c9dc;
        font-size: 20px;
        letter-spacing: 0.05em;
        text-indent: 0.05em;
        padding-left: 42px;
        border: #c5c9cf;
    }
    .user{
        width: 18px;
        height: 18px;
        background-color: white;
        padding-top: 4px;
    }
    .tb1{
        position: absolute;
        top:71.2px;
        left:11.5px;
        width: 32.4px;
        height: 30px;
        background-color: white;
        text-align: center;
        border:#c5c9cf;
    }
    .pwd{
        width: 18px;
        height: 18px;
        background-color: white;
        padding-top: 4px;
    }
    .tb2{
        position: absolute;
        top:141.2px;
        left:11.5px;
        width: 32.4px;
        height: 30px;
        background-color: white;
        text-align: center;
    }
    .box a{
        text-decoration: none;
        color: black;
    }
    .box input{
        font-size: 16px;
        color: white;
        width: 240px;
        height: 35px;
        margin-left: -10px;
        background-color: rgb(122,167,225);
    }
</style>