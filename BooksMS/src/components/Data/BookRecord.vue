<template>
    <div class="bookR">
        <el-table
                :data="bookRecordList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())
                ||data.bk_name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    prop="brow_id"
                    label="BROW_ID"
            >
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="借书用户"
            >
            </el-table-column>
            <el-table-column
                    prop="brow_time"
                    label="借书时间">
            </el-table-column>
            <el-table-column
                prop="return_time"
                label="还书时间">
            </el-table-column>
            <el-table-column
                    prop="bk_name"
                    label="所借书目">
            </el-table-column>
            <el-table-column
                    prop="bk_publish"
                    label="出版社">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入用户名或书名搜索"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                bookRecordList:[],
                search:''
            }
        },

        created(){
            this.showbookRecordList()
        },

        methods:{
            showbookRecordList(){
                this.$axios.get('/BooksMS/api/owBrowRecord').then(response=>{
                    const result=response.data
                    const need = []
                    result.forEach(function (item) {
                        need.push({
                            brow_id:item.brow_id,
                            username:item.username,
                            brow_time:item.brow_time,
                            return_time:item.return_time,
                            bk_name: item.bk_name,
                            bk_publish:item.bk_publish
                        })
                    })
                    this.bookRecordList=need
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
.bookR{
    margin-top: 60px;
}
</style>