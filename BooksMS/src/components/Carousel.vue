<template>
<div class="lb">
	<!--走马灯效果，会遮挡动作框-->
	<!--<div class="block">
		<el-carousel trigger="click" height="150px">
			<el-carousel-item v-for="item in 3" :key="item">
				<h3 class="small">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>-->

	<div id="myCarousel" class="carousel slide">
		<!-- 轮播（Carousel）指标 -->
		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active" wrap="true"></li>
			<li data-target="#myCarousel" data-slide-to="1" wrap="true" ></li>
			<li data-target="#myCarousel" data-slide-to="2" wrap="true" ></li>
		</ol>
		<!-- 轮播（Carousel）项目 -->
		<div class="carousel-inner">
			<div class="item active">
				<img src="../img/1.jpg" alt="First slide">
			</div>
			<div class="item">
				<img src="../img/2.jpg" alt="Second slide">
			</div>
			<div class="item">
				<img src="../img/3.jpg" alt="Third slide">
			</div>
		</div>
		<!-- 轮播（Carousel）导航 -->
		<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>

</div>
</template>

<script>

export default {
 
}
</script>

<style>
	/* 轮播图 */
	.lb{
		width: 60%;
		margin: 0 auto;
	}
	/*ele组件走马灯（轮播）*/

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
