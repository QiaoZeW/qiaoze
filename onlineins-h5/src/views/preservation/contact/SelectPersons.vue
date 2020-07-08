<template>
    <div class="ins-container">
        <SelectPerson @clickPerson="clickPerson"></SelectPerson>
		<div class="twoBtn">
		<button class="may_btn" v-if="(selectedPerson && oneBtnOrTwo =='two') || (selectedPerson && oneBtnOrTwo =='one')" @click="goMess()">短信验证</button>
		<button class="yew" v-if="selectedPerson && oneBtnOrTwo =='two'" @click="goFace()">人脸识别</button>
		<button class="disable_btn" v-if="selectedPerson && oneBtnOrTwo =='one'" >人脸识别</button>
		<button class="disable_btn" v-if="selectedPerson == ''">请选择需要变更联系方式的人员</button>
		</div>
		<md-dialog
		    :closable="false"
		    v-model="iconDialog.open"
		    title="短信验证"
		    :btns="iconDialog.btns"
		>
		    <SendMessage ref='sms' @verifySuccess="verifySuccess()"></SendMessage>
		</md-dialog>
    </div>
</template>

<script>
   import SelectPerson from '@/components/preservation/SelectPerson'
   import SendMessage from '@/components/preservation/SendMessage'
   import {Dialog} from 'mand-mobile'
   export default{
	   data(){
		 return {
			 selectedPerson:'',
			 oneBtnOrTwo: 'two',
			 iconDialog: {
			     open: false,
			     btns: [
			         {
			             text: "取消"
			         },
			         {
			             text: "确认",
						 handler: this.doVerify
			         }
			     ]
			 },
		 }
	   },
	   methods:{
			clickPerson(customer) {
				this.selectedPerson = customer.customerNo
				localStorage.setItem('selectedPerson', this.selectedPerson)
				//判断客户证件，如果是身份证可以人脸和短信，如果其他证件只显示短信验证
				if( customer.idType == '0' ) {
					this.oneBtnOrTwo = 'two'
				} else {
					this.oneBtnOrTwo = 'one'
				}
		    },
			goFace() {
				//人脸识别
				window.location.href = this.$router.siteUrl() + '/preservation/FaceRecognition.html'
			},
			goMess() {
				let that = this
				this.iconDialog.open = true
			},
			doVerify() {
				// this.iconDialog.open = true
				this.$refs.sms.verifySmsCode()
			},
			verifySuccess() {
				window.location.href= this.$router.siteUrl() + "/preservation/contact/ContactDetails.html"
			}
	   },
	   components:{
		   SelectPerson,
		   SendMessage
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
