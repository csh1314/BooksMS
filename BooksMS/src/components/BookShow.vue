<template>
	<div class="bookShow">
		<div class="pf">
			<div class="lab">
				<label>评分最高</label>
			</div>
			<!-- gutter来指定间隔 span来指定宽度 当前为最适应状态-->
			<el-row :gutter="45" style="margin-top: 10px">
			<el-col :span="6" v-for="(book,index) in books1" :key="index">
				<a href="#" @click="showBookDetail1(index)">
				<div class="grid-content bg-purple">
				<div class="bookCover">
					<img :src="book.bk_src">
				</div>
				<div class="bookIntro">
					<h4>{{book.bk_name}}</h4>
					<p>总共：{{book.bk_amount}}本；评分：{{book.bk_grade}}分</p>
				</div>
				</div>
				</a>
			</el-col>
			</el-row>
		</div>

		<div class="jc">
			<div class="lab">
				<label>借出最高</label>
			</div>
			<el-row :gutter="45" style="margin-top: 10px">
				<el-col :span="6" v-for="(book,index) in books2" :key="index">
					<a href="#" @click="showBookDetail2(index)">
					<div class="grid-content bg-purple">
						<div class="bookCover">
							<img :src="book.bk_src">
						</div>
						<div class="bookIntro">
							<h4>{{book.bk_name}}</h4>
							<p>总共：{{book.bk_amount}}本；借出：{{book.bk_times}}次</p>
						</div>
					</div>
					</a>
				</el-col>
			</el-row>
		</div>

		<div class="xh">
			<div class="lab">
				<label>猜你喜欢</label>
			</div>
			<el-row :gutter="45" style="margin-top: 10px">
				<el-col :span="6" v-for="(book,index) in books3" :key="index">
					<a href="#" @click="showBookDetail3(index)">
					<div class="grid-content bg-purple">
						<div class="bookCover">
							<img :src="book.bk_src">
						</div>
						<div class="bookIntro">
							<h4>{{book.bk_name}}</h4>
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
				books1:[],
				books2:[],
				books3:[]
			}
		},

		created(){
			this.showBookList1()
			this.showBookList2()
			this.showBookList3()
		},
		methods: {
			showBookList1() {
				//评分最高
				this.$axios.get('/BooksMS/api/grade').then(response => {
					//请求成功. response.data
					const result1 = response.data
					const need1 = []
					result1.forEach(function (item) {
						need1.push({
							bk_src: 'img/book.png',
							bk_name: item.bk_name,
							bk_amount: item.bk_amount,
							bk_grade: item.bk_grade
						})
					})
					this.books1 = need1
					console.log(need1)
				}).catch(error => {
							//请求失败
							console.log(error)
						})
			},
			//借书最多
			showBookList2(){
				this.$axios.get('/BooksMS/api/times').then(response => {
					const result2 = response.data
					const need2 = []
					result2.forEach(function (item) {
						need2.push({
							bk_src: 'img/book.png',
							bk_name: item.bk_name,
							bk_amount: item.bk_amount,
							bk_times: item.bk_times
						})
					})
					this.books2 = need2
				})
				},
			//猜你喜欢
			showBookList3(){
				this.$axios.get('/BooksMS/api/recommend').then(response => {
					const result3 = response.data
					const need3 = []
					result3.forEach(function (item) {
						need3.push({
							bk_src: 'img/book.png',
							bk_name: item.bk_name,
						})
					})
					this.books3 = need3
				})
			},

			//点击每本书时发生的事件
			showBookDetail1(index){
				//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
				const url=decodeURIComponent(window.location.href)
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url

				this.$axios.post('/BooksMS/api/detailBooks',
						{bk_name:this.books1[index].bk_name}).then((response) => {
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

			showBookDetail2(index){
				//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
				const url=decodeURIComponent(window.location.href)
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url

				this.$axios.post('/BooksMS/api/detailBooks',
						{bk_name:this.books2[index].bk_name}).then((response) => {
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

			showBookDetail3(index){
				//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
				const url=decodeURIComponent(window.location.href)
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url

				this.$axios.post('/BooksMS/api/detailBooks',
						{bk_name:this.books3[index].bk_name}).then((response) => {
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
			}

		}
	}
</script>

<style>
/* 书籍展示 */
			.bookShow{
				width: 60%;
				margin: 0 auto;
				padding-top: 10px;
			}
			.lab{
				width: 120px;
				height: 50px;
				background-color: #c5cbd7;
				border-left: 6px solid green;
			}
			.lab label{
				font-size: 16px;
				padding-left: 30px;
				line-height: 50px;
			}
			.bookCover img{
				width: 193px;
			}
			.bookIntro{
				text-align: center;
				height: 70px;
			}
			.bookIntro  p{
				font-size: 12px;
			}
	/*ele样式*/
.el-row {
	margin-bottom: 20px;
&:last-child {
	 margin-bottom: 0;
 }
}
.el-col {
	border-radius: 4px;
	margin-top: 8px;
}
.el-col a{
	text-decoration: none;
	color: black;
}
.el-col a:hover{
	color: #5a92ff;
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
