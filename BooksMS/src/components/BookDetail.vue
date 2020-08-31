<template>
    <div class="bookIntro">
        <h3>关于《{{this.$route.params.bk_name}}》的信息</h3>
        <div class="bookInfo">
            <ul>
                <li>图书编号：{{this.$route.params.bk_number}}</li>
                <li>书名：《{{this.$route.params.bk_name}}》</li>
                <li>作者：{{this.$route.params.bk_writer}}</li>
                <li>出版社：{{this.$route.params.bk_publish}}</li>
                <li>评分：{{this.$route.params.bk_grade}}</li>
                <li>剩余：{{this.$route.params.bk_else}}本</li>
                <li>图书简介：{{this.$route.params.bk_intro}}</li>
            </ul>
            <el-button class="btn" :type="type" @click="browBook" :disabled="isBrow">{{msg}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:this.$route.params.username,
                bk_name: this.$route.params.bk_name,
                bk_publish:this.$route.params.bk_publish,
                type:'primary',
                msg:'借书',
                isBrow:false
            }
        },
        created(){
            this.isBrowed()
        },

        methods:{
            //判断该图书是否被该用户已借来变化按钮
            isBrowed(){
                this.$axios.post('/BooksMS/api/whetherReturn',
                    {
                        username:this.username,
                        bk_name:this.bk_name
                    }).then((response)=>{
                    const result=response.data[2]//获取值类型为{"1"}   0为已借/未还，1为未借/已还书
                    console.log(result)
                    if(result==1){
                        //为0则表示不可借书：借书按钮不可用————默认为可用
                        this.isBrow=true,
                            this.msg='未还书',
                            this.type='info',
                            console.log('尚未归还')
                    }else{
                        //为0则表示可以借书：借书按钮可用
                        console.log('可借书')
                    }
                }).catch(function (error) {
                    //请求失败
                    alert('请求失败！')
                    console.log(error)
                })
            },

            browBook(){
                if (confirm('确定要借《'+this.bk_name+'》吗？')){
                   if(this.username=='undefined'){
                       alert('请您先登录再进行借书！')
                   }else {
                       //借书的业务
                       this.$axios.post('/BooksMS/api/brrowBooks',
                           {
                               bk_name:this.bk_name,
                               username:this.username,
                               bk_publish:this.bk_publish
                           }).then((response)=>{
                           const result=response.data[2]//获取值类型为{"1"} 1为借书成功 0为借书失败
                           console.log(result)
                           if (result==1){
                               //借书成功
                               alert('借书成功 ！')
                               this.isBrow=true,
                                   this.msg='未还书',
                                   this.type='info',
                                   //借书成功的同时添加一次借书次数
                                   this.$axios.post('/api/incTimes',{
                                       bk_name:this.bk_name
                                   }).catch(error=>{
                                       console.log(error)
                                   })

                           }else{
                               //借书失败
                               alert('借书失败！')
                           }
                       }).catch(error => {
                           //请求失败
                           alert('请您确定您是否已登录！')
                           console.log(error)
                       })
                   }
                }
            }
        }
    }
</script>

<style scoped>
.bookIntro{
    width: 60%;
    height: 600px;
    margin: 0 auto;
    border: 1px solid #c5c9cf;
}
.bookInfo{
        float: left;
}
    .bookInfo ul li{
        padding-top: 30px;
        font-size: 16px;
        list-style: none;
    }
    .btn{
        position: relative;
        top: 80px;
        left: 300px;
    }
</style>