<template>
    <div class="ins-container">
        <SelectPerson @clickPerson="clickPerson"></SelectPerson>
		<!-- 证件有效期变更按钮 -->
		<div class="mainBtn" >
			<button class="may_btn" v-if="selectedPerson" @click="goNext()">下一步</button>
			<button v-else class="disable_btn">请选择需要变更的人员</button>
		</div>
    </div>
</template>

<script>
   import SelectPerson from '@/components/preservation/SelectPerson'
   export default{
	   data(){
		 return {
			 selectedPerson:'',
			 oneBtnOrTwo: 'two',
		 }
	   },
	   methods:{
			clickPerson(person) {
				this.selectedPerson = person.customerNo

		    },
			goNext() {
				//把客户号放入localstorage中，在证件上传页面获取
				localStorage.setItem('selectedPerson', this.selectedPerson)
				//跳转证件上传页面
				window.location.href = this.$router.siteUrl() + '/preservation/CardUpload.html'
			}
	   },
	   components:{
		   SelectPerson,
	   }
   }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/preservation/reuse.scss";
    .ins-container {
        padding: 30px;
        background: #FFF;
        padding-bottom: 118px;
    }
</style>
