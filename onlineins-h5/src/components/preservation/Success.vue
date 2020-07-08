<template>
    <div class="bq_mask">
        <div class="bq_mask_content">
            <img src="../../assets/imgs/preservation/success.png" alt="">
            <p>操作成功</p>
        </div>
    </div>
</template>

<script>
	export default {
		name : "success",
		data(){
		    return{
            }
		},
		methods: {
		},
		components:{
		},
		props: {
			content : String
		}
	}
</script>

<style lang="scss" scoped>
    .bq_mask{
        height: 100%;
        width: 100%;
        background:rgba(0,0,0,.7);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
		z-index: 10000;
        .bq_mask_content{
            padding-top: 60px;
            width:290px;
            height:234px;
            background:#fff;
            border-radius:10px;
            margin: 418px auto auto auto;
            img{
                width: 112px;
                height: 112px;
                margin: auto auto 20px auto;
            }
            p{
                font-size:30px;
                font-weight:400;
                color: #333333;
                line-height:42px;
                text-align: center;
            }
        }
    }

</style>
