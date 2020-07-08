<template>
	<div class="div-out-Main-note">
		<div class="content-div">
			<ul v-html="content"></ul>
		</div>
	</div>
</template>

<script>
	export default {
		name : "note",
		data(){return{
		}},
		methods: {
		},
		components:{
		},
		props: {
			content : String
		}
	}
</script>

<style>
	@import '../../assets/css/preservation/ybtmain.css';
	ul{
		padding: 0;
	}
	ul li {
    text-align: justify;
    font-size: 0.8rem;
    color: #333;
    line-height: 1.6rem;
	}

</style>
