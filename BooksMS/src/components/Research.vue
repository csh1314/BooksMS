<template>
    <div >
        <form action="" style="text-align: center;">
            <span style="font-size: 16px">书&nbsp;&nbsp;名：</span>
            <input type="text" class="search" placeholder="输入书名" v-model="bkname" @keypress.prevent="research" >
            <el-button type="primary" icon="el-icon-search" class="btn" @click="research">搜索</el-button>
        </form>
        <div style="margin: 0 auto;width:60% ">
            <h2>搜索结果：</h2>
            <h2 v-show="ok" style="color:red">无搜索结果！</h2>
            <el-row :gutter="45" style="margin-top: 10px">
                <el-col :span="6" v-for="(book,index) in books" :key="index">
                    <a href="#" @click="showBookDetail(index)">
                    <div class="grid-content bg-purple">
                        <div class="bookCover">
                            <img :src="book.bk_src">
                        </div>
                        <div class="bookIntro">
                            <h4>{{book.bk_name}}</h4>
                            <p>总共：{{book.bk_amount}}本；评分：{{book.bk_grade}}</p>
                        </div>
                    </div>
                    </a>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>

    export default {
        data(){
            return{
                bkname:'',
                books:null,
                ok:false
            }
        },
        created(){
            this.$emit("getIndex",1)
        },
        methods:{

            //点击事件
            research()
                {
                    const bkname = this.bkname
                    this.$axios.post('/BooksMS/api/findbooks',
                        {bk_name: bkname}
                    ).then((response) => {
                        const result = response.data
                        const need = []
                        console.log(response.data)
                        result.forEach(function (item) {
                            need.push({
                                bk_src: 'img/book.png',
                                bk_name: item.bk_name,
                                bk_amount: item.bk_amount,
                                bk_grade: item.bk_grade
                            })
                        })
                        this.books = need
                        if (need.length == 0) {
                            this.ok = true
                        }else if(need.length>0){
                            this.ok = false
                        }
                    }).catch(function (error) {
                        //请求失败
                        alert('请求失败！')
                        console.log(error)
                    })
                },


            //点击每本书时发生的事件
            showBookDetail(index){
                //获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
                const url=decodeURIComponent(window.location.href)
                const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
                const temp1=temp.split('&')//去掉"&"后的部分
                const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
                const getusername=decodeURI(temp2)//解码url

                this.$axios.post('/BooksMS/api/detailBooks',
                    {bk_name:this.books[index].bk_name}).then((response) => {
                    const result=response.data
                    this.$router.push(
                        {
                            name:'bookDetail',
                            params:{
                                username:getusername,
                                bk_number:result[0].bk_number,
                                bk_writer:result[0].bk_writer,
                                bk_publish:result[0].bk_publish,
                                bk_intro:result[0].bk_intro,
                                bk_times:result[0].bk_times,
                                bk_else: result[0].bk_else,
                                bk_grade:result[0].bk_grade,
                                bk_name:result[0].bk_name
                            }
                        }
                    )
                }).catch(function (error) {
                    alert('请求失败！')
                })
            },
        }
    }
</script>

<style>
    .search {
        margin-left: 10px;
        height: 35px;
        font-size: 16px;
    }
    .btn{
        margin-left: 10px;
    }

    /*ele样式*/

    .el-col {
        border-radius: 4px;
        margin-top: 8px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
