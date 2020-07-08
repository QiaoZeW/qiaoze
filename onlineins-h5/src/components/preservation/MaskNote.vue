<template>
	<div class="bq_mask">
		<div class="note-outer">

		</div>
		<img class='mask-close' src='../../assets/imgs/preservation/policycancel/mask_close.png' />
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "../../assets/css/preservation/reuse";
	.bq_mask{
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(51,51,51,0.5);
		width: 100%;
		height: 100%;
	}
	.note-outer{
		width:610px;
		height: 976px;
		background:rgba(255,255,255,1);
		border-radius:10px;
		position: fixed;
		top: 0px;
		left: 70px;
	}
	.mask-close{
		width: 76px;
		height: 76px;
		position: fixed;
		top: 1040px;
		left: 338px;
	}
</style>
