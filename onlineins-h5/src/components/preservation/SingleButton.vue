<template>
	<div>
		<div class="myb"></div>
		<div class="step-father">
		<input type="button" class="btn-commit" @click="doCommit()" v-model="buttonValue"/>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			doCommit() {
				this.$emit('doSubmit')
			}
		},
		props:{
			buttonValue: String
		}
	}
</script>

<style>
	@import '../../assets/css/preservation/ybtmain.css'
</style>
