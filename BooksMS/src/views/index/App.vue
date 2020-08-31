<template>
		<div>
			<nav class="navbar navbar-inverse" role="navigation">
				<ul class="nav navbar-nav" style="display: inline-block;float:none;">
					<!-- 使用v-for遍历来实现路由与切换效果整合 -->
					<li v-for="(item,index) in items" :class="{active:isTrue==index}"
					@click="isTrue=index,isShow=false,isShow1=false" >
					<router-link :to="{ path: item.path }">
						{{item.name}}
					</router-link>
					</li>
							<!-- <router-link to="/home" tag="p">首页</router-link>
						
							<router-link to="/research" tag="p">搜索</router-link>
						
							<router-link to="/return" tag="p">退书</router-link> -->
					
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img :src="avatar" class="icon" alt="请登录">&nbsp;
							我
							<b class="caret"></b>
						</a>·
						<ul class="dropdown-menu">
							<li><a href="#" @click="isShow=true,isShow1=false">修改密码</a></li>
							<li><a href="#" @click="isShow1=true,isShow=false,handleBookList()">借书记录</a></li>
							<li><a href="#" @click="reLogin">退出</a></li>
						</ul>
					</li>
				</ul>
			</nav>

			<!--显示当前组件-->
			<div>
				<router-view @getIndex="getIndex"></router-view>
			</div>



			<!-- 修改密码框 -->
			<div class="changepwd" v-show="isShow">
				<form action="" method="post">
					<p>修改密码</p>
					<div class="pwdbox">
						<p>原始密码:</p>
						<p>新密码:</p>
						<p>确认密码:</p>
						<input type="password" placeholder="请输入原始密码" v-model="pwd1"/>
						<br>
						<input type="password" placeholder="请输入新密码" v-model="pwd2"/>
						<br>
						<input type="password" placeholder="请再次输入新密码" v-model="pwd3"/>
					</div>
					<div class="bottom">
						<input type="button" value="取消" class="qx" @click="cancel"/>
						<input type="submit" value="保存" class="ok" @click.prevent="submit"/>
					</div>
					</form>
					<img src="../../img/guanbi.png" class="gb" @click="isShow=false">
			</div>


			<!--借书信息表（对应username的借书信息————书名、借书时间、还书时间（可为无即未归还））-->
			<div class="browrecord" v-show="isShow1">
				<template>
					<el-table
							ref="singleTable"
							:data="bookList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
							highlight-current-row
							border
							align="center"
							:header-cell-style="{background:'#eef1f6'}"
							:default-sort = "{prop: 'date', order: 'descending'}"
							style="width: 100%;">
						<el-table-column
								type="index"
								sortable
								width="50"
								header-align="center"
								align="center">
						</el-table-column>
						<el-table-column
								prop="bk_name"
								sortable
								label="书名"
								width="150"
								header-align="center"
								align="center">
						</el-table-column>
						<el-table-column
								prop="brow_time"
								label="借书时间"
								sortable
								width="180"
								header-align="center"
								align="center">
						</el-table-column>
						<el-table-column
								prop="return_time"
								label="还书时间"
								sortable
								width="180"
								header-align="center"
								align="center">
						</el-table-column>
					</el-table>
					<el-pagination
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-size="pagesize"
							:current-page="currentPage"
							layout="total,prev, pager, next, jumper"
							:total="bookList.length"
							style="position: relative;top: 10px;left: 100px">
					</el-pagination>
				</template>
				<a href="#" @click="isShow1=false"><i class="el-icon-close" ></i></a>
			</div>
		</div>
</template>
<script>
	/*import axios from 'axios'
	axios.get("/api/bookdata").then((data)=>{
		console.log(data)
	})*/
	export default {
		data () {
		    return {
			  isTrue: 0,
			  isShow:false,isShow1:false,
			  pwd1:'',pwd2:'',pwd3:'',
				avatar:'',
		      items: [{
		        name: '首页', path: '/home'
		     }, {
		        name: '搜索', path: '/research'
		      },{
				name: '还书', path: '/return'
		     }],
				/*分页*/
				pagesize:6,
				currentPage:1,
				bookList:[]
		    }
		},
		created(){
		this.getAvatar();
		},
		methods:{
			//获取用户头像
			getAvatar(){
				//执行操作
				const url=decodeURIComponent(window.location.href)
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url

				this.$axios.post('/BooksMS/api/owAvatar',{
					username:getusername
				}).then(response=>{
					const result=response.data.user_avatar
					this.avatar=result
				}).catch(error=>{
					console.log(error)
				})
			},

			//解决F5刷新页面路由导航效果变化问题
			getIndex(num){
				this.isTrue=num
			},
			//退出至登录界面且清除缓存（即点击退出后必须重新登录）
			reLogin(){
			window.location.replace('login.html')
			//window.history.back(-1)
			},
			//清空输入
			cancel(){
				this.pwd1=''
				this.pwd2=''
				this.pwd3=''
			},
			//修改密码
			submit(){
				//校验部分
				if(!this.pwd1){
					alert('请输入初始密码！')
				}if(this.pwd2!==this.pwd3){
					alert('请确认两次输入密码一致！')
				}
				//执行操作
				const url=decodeURIComponent(window.location.href)
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url
				console.log(getusername)
				const _this=this
				this.$axios.post('/BooksMS/api/updatepwd',
						{username:getusername,
							password:_this.pwd1,
						newPassword:_this.pwd3}
				).then((response) =>{
					const result=response.data[2]//获取值类型为{"1"}   arr[2]即为数字
					console.log(result)
					if (result==1&&_this.pwd2==_this.pwd3){
						alert('修改密码成功！')
						_this.isShow=false
						_this.cancel()
					}else{
						alert('原密码错误！')
					}
				}).catch(function (error) {
					//请求失败
					alert('请求失败！')
					console.log(error)
				})
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

			//展示全部借书的列表
			handleBookList(){
				//获取url中的username 此处可优化！由于急于功能实现，暂且如此。。。。
				const url=decodeURIComponent(window.location.href)//解密url
				const temp=url.slice(url.indexOf('?')+1)//截取"?"后的url部分
				const temp1=temp.split('&')//去掉"&"后的部分
				const temp2=temp1[0].split('=')[1]//获得并截取数组【0】位置的值（即第一个数组）
				const getusername=decodeURI(temp2)//解码url
				console.log(getusername)

				//获取当前username的还书信息表
				/*Axios.get('http://localhost:3000/book').then(response=>{*/
				this.$axios.post('/BooksMS/api/allBrowRecord',{
					username:getusername
				}).then(response=>{
					//请求成功. response.data
					const result=response.data
					const need=[]
					result.forEach(function (item) {
						need.push({brow_id:item.brow_id,
							bk_name:item.bk_name, brow_time:item.brow_time,
						return_time:item.return_time})
					})
					this.bookList =need
					console.log(need)
				}).catch(error=>{
					//请求失败
					alert('请求失败')
				console.log(error)
				})
			}
		}
	}
</script>

<style>
	/* 导航栏 */
	.navbar {
		font-size: 18px;
		height: 60px;
		text-align: center;
	}

	.navbar-inverse {
		height: 50px;
	}

	.navbar-nav li{
		padding-left: 20px;
	}

	.icon {
		float: left;
		position: relative;
		top: -10px;
		width: 40px;
		height: 40px;
		border-radius: 30px;
	}
	.active a{
		border-bottom: 4px solid #008000;
	}
	.dropdown{
		margin-left: 20px;
		padding-left: 0!important;
	}
	.dropdown-menu{
		min-width: 100px;
		position: absolute;
		top: 50px;
	}
	.dropdown-menu li{
		padding: 0!important;
		width: 100px;
	}
	/* 修改密码框 */
	.changepwd{
		width: 360px;
		height: 250px;
		border: 1px solid #c5c9cf;
		position: absolute;
		top: 8%;
		left: 37%;
		background-color: white;
	}
	.changepwd p{
		position: relative;
		top: 10px;
		left: 20px;
	}
	.changepwd .pwdbox input{
		width: 200px;
		height: 30px;
		float: right;
		margin-top: 19px;
		margin-right: 20px;
		position: relative;
		top: -150px;
		letter-spacing: 3px;
		padding-left: 5px;
	}
	.changepwd .pwdbox input::-webkit-input-placeholder {
		font-size: 14px;
		letter-spacing: 0;
		padding-left: 3px;
	}
	.changepwd .pwdbox p{
		position: relative;
		top: 2px;
		left: 67px;
		padding-top: 20px;
	}
	.qx{
		background-color: white;
		border:1px solid #c5c9cf;
	}
	.ok{
		color: white;
		background-color: royalblue;
		border: royalblue;
	}
	.bottom input{
		position: relative;
		top: -15px;
		left: 120px;
	}
	.gb{
		width: 20px;
		position: relative;
		top: -235px;
		left: 330px;
		cursor: pointer;
	}
/*  借书信息表*/
	.browrecord{
		height: 440px;
		width:563px;
		border: 1px solid #c5c9cf;
		background-color: white;
		position: absolute;
		top: 60px;
		left: 30%;
		font-size: 20px;
	}
	.el-icon-close{
		position: absolute;
		top: 0px;
		left: 540px;
	}
</style>
