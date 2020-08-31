<template>
    <div class="book">
        <el-table
                :data="bookList.filter(data => !search || data.bk_name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="图书编号"
                    prop="bk_number">
             </el-table-column>
            <el-table-column
                    label="图书名"
                    prop="bk_name">
                <template slot-scope="scope">
                    <template v-if="scope.row.editing">
                        <el-input class="edit-input" v-model="scope.row.bk_name"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bk_name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="作者"
                    prop="bk_writer">
                <template slot-scope="scope">
                    <template v-if="scope.row.editing">
                        <el-input class="edit-input" v-model="scope.row.bk_writer"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bk_writer }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="出版社"
                    prop="bk_publish">
                <template slot-scope="scope">
                    <template v-if="scope.row.editing">
                        <el-input class="edit-input" v-model="scope.row.bk_publish"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bk_publish }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="图书总数"
                prop="bk_amount">
                <template slot-scope="scope">
                    <template v-if="scope.row.editing">
                        <el-input class="edit-input" v-model="scope.row.bk_amount"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bk_amount }}</span>
                </template>
        </el-table-column>
            <el-table-column
                    label="评分"
                    prop="bk_grade">
                <template slot-scope="scope">
                    <template v-if="scope.row.editing">
                        <el-input class="edit-input" v-model="scope.row.bk_grade"></el-input>
                    </template>
                    <span v-else>{{ scope.row.bk_grade }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入书名关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            type="danger"
                            size="mini"
                            v-if="!scope.row.editing"
                            v-model="scope.$index"
                            @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--在这里@click单击未生效按F12才有效果-->
                    <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.editing"
                            v-model="scope.$index"
                            @click="savedata(scope.$index, scope.row)">保存</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.editing"
                            @click="handleCancel(scope.$index, scope.row)">取消</el-button>
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
    export default {
        data(){
            return{
                bookList:[],
                prevValue:{},
                search:'',
            }
        },
        created(){
            this.showAllbookList()
        },

        methods:{
            //编辑图书基本信息
            handleEdit(index, row) {
                row.editing=true
                this.prevValue=JSON.parse(JSON.stringify(row))
            },

            //取消编辑动作并恢复原来数据
            handleCancel(index,row){
                row.editing=false
                let prevContent=[]
                prevContent[0]=this.prevValue.bk_name
                prevContent[1]=this.prevValue.bk_writer
                prevContent[2]=this.prevValue.bk_publish
                prevContent[3]=this.prevValue.bk_amount
                prevContent[4]=this.prevValue.bk_grade
                this.$set(row,"bk_name",prevContent[0])
                this.$set(row,"bk_writer",prevContent[1])
                this.$set(row,"bk_publish",prevContent[2])
                this.$set(row,"bk_amount",prevContent[3])
                this.$set(row,"bk_grade",prevContent[4])
            },

            //保存改变
            savedata(index,row){
                const bookChange=JSON.parse(JSON.stringify(this.bookList[index]))
                console.log(bookChange)
                this.$axios.post('/BooksMS/api/updBooks',{
                    bk_number:bookChange.bk_number,
                    bk_name:bookChange.bk_name,
                    bk_writer:bookChange.bk_writer,
                    bk_publish:bookChange.bk_publish,
                    bk_amount:bookChange.bk_amount,
                    bk_grade:bookChange.bk_grade
                }).then(response=>{
                    const result=response.data[2]
                    if (result==1){
                        alert('修改id为【'+bookChange.bk_number+'】的图书成功！')
                        row.editing=false
                    }else{
                        alert('修改失败！')
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },



            //删除当行图书
            handleDelete(index, row) {
                console.log(index, row);
                if(confirm('确定删除《'+row.bk_name+'》吗？')){
                    this.$axios.post('/BooksMS/api/delBooks',{
                        bk_number:row.bk_number
                    }).then(response=>{
                        const result=response.data[2]
                        console.log(result)
                        if (result==1){
                            this.bookList.splice(index,1)//删除该行数据
                            alert('删除成功！')
                        }else{
                            alert('删除失败！请稍后重试。')
                        }
                    }).catch(error=>{
                        //请求失败
                        console.log(error)
                        alert('请求操作失败！')
                    })
                }
            },
            //数据库图书全部信息
            showAllbookList(){
                this.$axios.get('/BooksMS/api/showAllBooks').then(response=>{
                    //请求成功. response.data
                    const result=response.data
                    console.log(result)
                    const need=[]
                    result.forEach(function (item) {
                        need.push({bk_number:item.bk_number,
                            bk_name:item.bk_name,
                            bk_publish:item.bk_publish,
                            bk_amount:item.bk_amount,
                            bk_writer:item.bk_writer,
                            bk_grade:item.bk_grade,
                            bk_amount:item.bk_amount,
                            })
                    })
                    this.bookList =need
                    console.log(need)
                }).catch(error=>{
                        //请求失败
             console.log(error)
            })
            }
            }

    }
</script>
<style>
    .book{
        margin-top: 60px;
    }
.el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
