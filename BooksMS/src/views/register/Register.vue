<template>
    <div>
        <div>
                <h2><img src="../../img/logo.png" class="logo1">图书管</h2>
        </div>
        <div id="main" class="clear">
            <div class="main_left l">
                <div><a href="#" @click="changeAvatar"><img :src="avatar"></a>
                    <h1>默认头像</h1>
                </div>
            </div>
            <div class="main_right l">
                <h2>用户注册</h2>
                <div class="main_input">
                    <div><img src="../../img/yonghu1.png" alt="用户名"><input type="text" placeholder="用户名"  v-model="username"></div>
                    <div><img src="../../img/suo1.png" alt="密码"><input type="password" placeholder="密码" v-model="password"></div>
                    <div><img src="../../img/dianhua.png" alt="电话"><input type="tel" placeholder="tel" v-model="tel"></div>
                    <div><img src="../../img/qie.png" alt="QQ号码"><input type="text" placeholder="qq" v-model="qq"></div>
                    <div><img src="../../img/email.png" alt="邮箱"><input type="email" placeholder="email" v-model="email"></div>
                    <div class="button"><input type="button" value="注册" @click="register"></div>
                </div>
            </div>
        </div>
        <div class="avatarBase" v-if="isShow">
            <h3 style="text-align: center">系统备选头像</h3>
            <ul>
                <li><a href="#" @click="avatar='/Books/img/002.627c8eb8.jpg'"><img src="../../img/002.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/003.715534c0.jpg'"><img src="../../img/003.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/004.c1c08fab.jpg'"><img src="../../img/004.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/005.a3dd2691.jpg'"><img src="../../img/005.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/006.7e5fdb4e.jpg'"><img src="../../img/006.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/007.175a3bf1.jpg'"><img src="../../img/007.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/008.196d6127.jpg'"><img src="../../img/008.jpg"></a></li>
                <li><a href="#" @click="avatar='/Books/img/icon.jpg'"><img src="../../img/icon.jpg"></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:'',
                password:'',
                tel:'',
                qq:'',
                email:'',
                avatar:'/Books/img/icon.jpg',
                isShow:false
            }
        },
/* ../../img/icon.jpg */
        methods:{
            //单击打开备选头像库
            changeAvatar(){
                this.isShow=true
            },
            //注册业务
            register(){
                if (this.username==''||this.password==''||this.tel==''||
                this.qq==''||this.email==''){
                    alert('请您确保完整填写信息再注册！')
                }else{
                    this.$axios.post('/BooksMS/api/queryUsername',{
                        username:this.username
                    }).then(response=>{
                        const result=response.data[2]
                        console.log(result)//结果为1则该用户名未被注册，可注册；为0则不可注册
                        if (result==1){
                            this.$axios.post('/BooksMS/api/regist',{
                                username:this.username,
                                password:this.password,
                                user_tel:this.tel,
                                user_qq:this.qq,
                                user_mail:this.email,
                                user_avatar:this.avatar
                            }).then(response=>{
                                const result1=response.data[2]
                                console.log(result1)//为1则注册成功，0则失败
                                if (result1==1){
                                    alert('恭喜您注册成功！立即前往登录。')
                                    window.location.replace('login.html')
                                }else{
                                    alert('由于系统繁忙，请您稍后注册！')
                                }
                            }).catch(function (error1) {
                                //注册请求失败
                                console.log(error1)
                            })
                        }else{
                            alert('该用户名已被注册，请另起用户名！')
                        }
                    }).catch(function (error) {
                        //验证请求失败
                        alert('请求失败！')
                        console.log(error)
                    })
                }

            }
        }
    }
</script>

<style>
    /*更换头像业务*/
    .avatarBase{
     height: 230px;
        width: 400px;
        background-color: white;
        position: absolute;
        top: 390px;
        left: 17%;
        border-radius: 10px;
    }
    .avatarBase ul li{
        list-style: none;
        display: inline-block;
        margin-right: 10px;
        margin-left: 7px;
        margin-top: 10px;
    }
    .avatarBase ul li img{
        height:80px;
        width: 80px;
        border-radius: 40px;
        border: 1px solid #c5c9cf;
    }
    /*页面*/
    *{margin: 0; padding: 0;}
    a{text-decoration: none; color: #666666;}
    #main h1,h2,h3{
         font-weight: normal;
    }
    .logo1{
        width: 40px;
        float: left;
    }
    img{display: block;}
    .l{float: left;}
    .clear::after{content: "";display: block; clear: both;}

    #header img {width: 28px; height: 32px;margin: 34px 2px 0 58px;color: #347fff;}
    #header h2 {color: #347fff; font-size: 28px;line-height: 28px; margin-top: 34px;}

    #main{ width: 1052px; margin: 0 auto;margin-top: 54px; border-radius: 5px;}
    #main .main_left{width: 450px; height: 575.6px;
        background-image: linear-gradient(#4faeff,#2979ff);}
    #main .main_left img{width: 136px; height: 136px; border: 6px #95bcff solid; border-radius: 50%;
        margin: 0 auto; margin-top: 120px;}
    #main .main_left h1{text-align: center; font-size: 26px; line-height: 26px;color: #fcfeff;
        margin-top: 40px; margin-bottom: 36px;}

    #main .main_right{background: #ffffff;width: 602px;}
    #main .main_right h2{margin-top: 100px; color: #396afe; text-align: center;
        font-size: 46px; line-height: 46px;}
    #main .main_input{margin-top: 40px;}
    #main .main_input div{margin-left: 150px;margin-top: 16px}
    #main .main_input input {width: 240px; height: 24px; color: #999999; margin-bottom: 20px; border-radius: 5px;
        font-size: 14px;text-indent: 9px; border: 1px #94bbfe solid; position: relative; top: -3px; outline: none;
    }
    #main .main_input img{width: 18px; height: 18px;  background:white;float: left;
        }
    #main .main_input i{font-size: 18px; font-weight: bold; color:#396afe ;}
    #main .button input{height: 40px; background: #2878ff; border: none; color: #f4f8ff;font-size: 20px; line-height: 40px;
        text-align: center;width: 280px;margin-bottom: 40px;cursor: pointer;}
</style>