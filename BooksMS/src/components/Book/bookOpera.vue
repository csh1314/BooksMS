<template>
    <div class="bookO">
        <div class="addBook">
            <h2>添加图书</h2>
            <el-button type="primary" @click="addLine">添加行数</el-button>
            <el-button type="success" @click="save(tableData.length)">保存</el-button>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                     >
                <el-table-column prop="bk_name" label="书名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_name" placeholder="书名"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_writer" label="作者">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_writer" placeholder="作者"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_publish" label="出版社">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_publish" placeholder="出版社"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_intro" label="简介">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_intro" placeholder="简介"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_amount" label="数量(本)">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_amount" placeholder="数量"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_else" label="剩余（本）">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_else" placeholder="剩余"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bk_grade" label="评分（满分10.0）">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bk_grade" placeholder="评分"></el-input>
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
    export default{
        data() {
            return {
                tableData:[{
                    bk_name:'',
                    bk_writer:'',
                    bk_publish:'',
                    bk_intro:'',
                    bk_amount:'',
                    bk_else:'',
                    bk_grade:''
                }]
            }
        },

        methods:{
            addLine(){ //添加行数
                var newValue = {
                    bk_name:'',
                    bk_writer:'',
                    bk_publish:'',
                    bk_intro:'',
                    bk_amount:'',
                    bk_else:'',
                    bk_grade:''
                };
                //添加新的行数
                this.tableData.push(newValue);
            },
            handleDelete(index){ //删除行数
                this.tableData.splice(index, 1)
            },

            save(addB){
                let i=0
                console.log('共添加'+addB+'本书！')
                //遍历添加每本书
                for (i;i<addB;i++){
                    const addBooks=JSON.parse(JSON.stringify(this.tableData))
                    console.log(addBooks)
                    if (addBooks[i].bk_name==''||addBooks[i].bk_writer==''
                        ||addBooks[i].bk_publish==''||addBooks[i].bk_intro==''
                    ||addBooks[i].bk_amount==''||addBooks[i].bk_else==''
                    ||addBooks[i].bk_grade==''){
                        alert('请填写完整内容后保存！')
                    }else{
                        //保存添加的图书
                        alert('《'+addBooks[i].bk_name+'》添加成功！')
                        this.$axios.post('/BooksMS/api/insBooks',
                            addBooks[i]).then(response=>{
                            const result=response.data[2]
                            if (result==1){
                                console.log('添加图书成功！')
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
    .bookO{
        margin-top: 60px;
    }
</style>