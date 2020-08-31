<template>
<div>
	<Carousel/>
	<BookShow/>
</div>
</template>

<script>
 import Carousel from './Carousel.vue'
 import BookShow from './BookShow.vue'
export default {
	components:{
		Carousel,
		BookShow
	},
	created(){
		this.$emit("getIndex",0)
	}
}
</script>

<style>
	
</style>
