<template>
	<div>
		<!--bookList.slice((currentPage-1)*pagesize,currentPage*pagesize) 当前页的数据获取-->
		<el-table
				class="table"
				border
				:data="bookList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				style="margin: 0px auto;width: 900px;"
				:header-cell-style="'background:#eef1f6'"
				:default-sort = "{prop: 'date', order: 'descending'}"
		>
			<el-table-column
					prop="brow_id"
					label="#"
					sortable
					width="180"
					header-align="center"
					align="center"
			>
				<template slot-scope="scope">
					{{scope.row.brow_id}}
				</template>
			</el-table-column>
			<el-table-column
					prop="bk_name"
					label="书名"
					sortable
					width="180"
					header-align="center"  >
				<template slot-scope="scope">
					{{scope.row.bk_name}}
				</template>
			</el-table-column>
			<el-table-column
					prop="bk_publish"
					label="出版社"
					sortable
					width="180"
					header-align="center"
					align="center">
				<template slot-scope="scope">
					{{scope.row.bk_publish}}
				</template>
			</el-table-column>
			<el-table-column
					prop="brow_time"
					label="借书时间"
					sortable
					width="180"
					header-align="center"
					align="center">
				<template slot-scope="scope">
					{{scope.row.brow_time}}
				</template>
			</el-table-column>
			<el-table-column
					prop="bk_state"
					label="操作"
					:formatter="formatter"
					header-align="center"
					align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="returnBook(scope.$index,scope.row)" :disabled="isReturn[scope.$index]==1">还书</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" style="position: absolute;top:600px;left: 39%">
			<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-size="pagesize"
					:current-page="currentPage"
					layout="total,prev, pager, next, jumper"
					:total="bookList.length">
			</el-pagination>
		</div>
	</div>

</template>
<!-- npm run json:server 启动json服务器访问本地json文件 -->
<script>

export default {
	data(){
		return{
			pagesize:7,
			currentPage:1,
			bookList:[],
			isReturn:[]
		}
	},
	created(){
		this.handleBookList()
		this.$emit("getIndex",2)
	},

	methods: {

		formatter(row) {
			return row.address;
		},

		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.currentPage = 1;
			this.pageSize = val;
		},

		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.currentPage = val;
		},

		//展示待还的书籍列表
		handleBookList(){
			//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
			const url=decodeURIComponent(window.location.href)
			const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
			const temp1=temp.split('&')//去掉"&"后的部分
			const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
			const getusername=decodeURI(temp2)//解码url
			console.log(getusername)


			//获取当前username的还书信息表
			/*Axios.get('http://localhost:3000/book').then(response=>{*/
			this.$axios.post('/BooksMS/api/browRecord',{
				username:getusername
			}).then(response=>{
				//请求成功. response.data
				const result=response.data
				const need=[]
				result.forEach(function (item) {
					need.push({brow_id:item.brow_id,
						bk_name:item.bk_name,bk_publish:item.bk_publish,
						brow_time:item.brow_time})
				})
				this.bookList =need
				console.log(need)
			})
			.catch(error=>{
				//请求失败
				console.log(error)
			})
		},

		returnBook(index,row){
			//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
			const url=decodeURIComponent(window.location.href)
			const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
			const temp1=temp.split('&')//去掉"&"后的部分
			const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
			const getusername=decodeURI(temp2)//解码url

			if (confirm('确定归还《'+row.bk_name+'》吗？')){
				//实现还书功能
				this.$axios.post('/BooksMS/api/returnBooks', {
							username:getusername,
							brow_time:row.brow_time,
							bk_publish:row.bk_publish,
							bk_name: row.bk_name,
						}
				).then((response) => {
					const result = response.data[2]
					console.log(result)

					if (result==1){
						alert('还书成功！')
						//需求为：同时可还多本书且按钮状态发生对应变化
						// 不可用以下方式来更新状态！
						// this.isReturn[index]=index
						//根据vue.js官方文档给出解决方法来实现，逻辑为：动态设置数组的值来更新变化
						this.$set(this.isReturn,index,1)

					}else{
						alert('还书失败！')
					}
				}).catch(error=>{
					//请求失败
					alert('请求失败！')
					console.log(error)
				})
			}

		},

	}
}
</script>

<style>
</style>
