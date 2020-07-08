<template>
	<div class="container-4">
		<div class="row-outer">
			<!-- <inputValidate
				title="联系地址"
				id="address" name="address"
				v-validate="'required'"
				data-vv-validate-on="blur"
				placeholder="请输入联系地址"
				v-model= contactInfo.address
				:error="errors.first('address')"
				@blur="addrCheck()"
			></inputValidate> -->
            <div class="md-field-item md-input-item is-solid is-browser is-amount left normal">
            	<div class="md-field-item-content"  style="padding-bottom: 0px;padding-top: 0px;">
            		<label class="md-field-item-title">联系地址:</label>
            		<div class="md-field-item-control">
            			<textarea class="md-input-item-input itemListCss" v-model="contactInfo.address" @blur="addrCheck()" placeholder="请输入联系地址"></textarea>
            		</div>
            	</div>
            </div>
			<!-- <div class="md-field-item-content">
				<label class="md-field-item-title">联系地址</label>
				<div class="md-field-item-control">
					<textarea
						class="md-input-item-input itemListCss"
						v-model="contactInfo.address"
						placeholder="请输入联系地址"
						@blur="addrCheck()"
					></textarea>
				</div>
			</div> -->
			<inputValidate
				title="邮政编码"
				id="zipCode" name="zipCode"
				v-validate="'required'"
				data-vv-validate-on="blur"
				placeholder="请输入邮政编码"
				v-model= contactInfo.zipCode
				:error="errors.first('zipCode')"
			></inputValidate>
			<inputValidate
				title="手机号码"
				id="mobile" name="mobile"
				v-validate="'required'"
				data-vv-validate-on="blur"
				placeholder="请输入手机号码"
				v-model= contactInfo.mobile
				:error="errors.first('mobile')"
			></inputValidate>
			<inputValidate
				title="家庭电话"
				 name="homePhone"
				 v-validate="'required'"
				 data-vv-validate-on="blur"
				 placeholder="区号+座机号"
				v-model= contactInfo.homePhone
				:error="errors.first('homePhone')"
			></inputValidate>
			<inputValidate
				title="电子邮箱"
				name="email"
				v-model= contactInfo.email
				v-validate="'required|email'"
				data-vv-validate-on="blur"
				:error="errors.first('email')"
			></inputValidate>
			<div></div>
		</div>
		<div class="radio-out">
			<img :src="imgPath" @click="changeImg()"></img>
			<span>订阅电子邮件</span>
		</div>
		<div class="mainBtn">
		    <button class='may_btn' @click="doNext()" >确认变更</button>
		</div>
		<Success v-if="isSuccess"></Success>
		<md-dialog
		    :closable="false"
		    v-model="iconDialog.open"
		    title="提示信息"
		    :btns="iconDialog.btns"
		>
		    <p>
		        {{message}}
		    </p>
		</md-dialog>
	</div>
</template>

<script>
	import {mapState } from 'vuex'
	import { InputItem,
	    Selector,
	    Field,
	    FieldItem,
	    DatePicker,
	    Switch,
		Dialog
	} from 'mand-mobile'
	import inputValidate from "@/components/preservation/input-validate";
	import Success from '@/components/preservation/Success'
	export default {
		name: 'ContactDetails',
        components:{
            [InputItem.name]: InputItem,
            [Selector.name]: Selector,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [DatePicker.name]: DatePicker,
            [Switch.name]: Switch,
			inputValidate,
			Success
        },
		mounted() {
			const dict = {
			  custom: {
			    email: {
					required: '请输入新的电子邮箱地址',
					email: '电子邮箱格式不正确'
			    },
				homePhone: {
					required: '家庭电话不能为空'
				},
				mobile: {
					required: '手机号码不能为空'
				},
				zipCode: {
					required: '邮政编码不能为空'
				},
				address: {
					required: '联系地址不能为空'
				}
			  }
			}
			this.$validator.localize(this.$validator.locale, dict);
		},
		data(){
			return{
				// contactInfo: {
				// 	address: '辽宁省大连市旅顺口区营顺路',
				// 	zipCode: '116041',
				// 	mobile: '13344445555',
				// 	homePhone: '041186236488',
				// 	email: 'easylyw@163.com',
				// 	subscribeEmail: '0' // 1不订阅， 0：订阅
				// },
				contactInfo:{},
				bingo: true,
				imgPath: require('../../../assets/imgs/preservation/contact/bingo.png'),
				isSuccess: false,
				selectedPerson: '',
				message:'',
				iconDialog: {
				    open: false,
				    btns: [
				        {
				            text: "确定"
				        },

				    ]
				}
			}
		},
		created() {
			// this.bingo = (this.contactInfo.subscribeEmail == '0')
			// if(this.bingo) {
			// 	this.imgPath = require('../../../assets/imgs/preservation/contact/bingo.png')
			// } else {
			// 	this.imgPath = require('../../../assets/imgs/preservation/contact/un_bingo.png')
			// }
			this.selectedPerson = localStorage.getItem('selectedPerson')
			this.initContactData()
		},
		computed:{
			...mapState(['Ybt']),
		},
		methods:{
			addrCheck(){
                if(this.contactInfo.address == ""){
                    this.iconDialog.open = true
                    this.message = "联系地址不能为空"
                    return
                }
				let that = this;
				this.$app.getCurrentToken(function(userToken){
				    that.$prequest({
				        url:'/contact/addr/check',
				        data: {
							"edorType":"CD",
							"customerNo":that.selectedPerson,
							"operate":"Check",
							"address":that.contactInfo.address
				        },
				        method: 'POST',
				        isLoading: true,
				        userToken: userToken,
						contentType:'application/json',
				        successFn: (data) => {
                            if(data.userConfirmFlag === '0') {
                                that.iconDialog.open = true
                                that.message = '您申请变更的地址没有百年的服务机构，可能会影响我们服务的时效性。'
                            }
				        },
				        failFn: (data) => {
							that.iconDialog.open = true
							that.message = data.resultMsg
				        }
				    })
				});
			},
			initContactData() {
				let that = this;
				this.$app.getCurrentToken(function(userToken){
				    that.$prequest({
				        url:'/contact/query',
				        data: {
							customerNo: that.selectedPerson,
							operate:'Init',
							edorType:'CD'
				        },
				        method: 'POST',
				        isLoading: true,
				        userToken: userToken,
						contentType:'application/json',
				        successFn: (data) => {
				            console.log('ssuu', data)
							that.contactInfo = data
				        },
				        failFn: (data) => {
							console.log('fal',data)
				        }
				    })
				});
			},
            goHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
			doNext() {
				this.$validator.validateAll().then((x)=>{
					if(x) {
						//调用接口
						let that = this;
						this.$app.getCurrentToken(function(userToken){
							that.$prequest({
								url:'/contact/save',
								method: 'POST',
								data: {
									"customerNo":that.selectedPerson,
									"edorType":"CD",
									"operate":"Save",
									"address":that.contactInfo.address,
									"email":that.contactInfo.email,
									"zipCode":that.contactInfo.zipCode,
									"phone":'',
									"homePhone":that.contactInfo.homePhone,
									"mobile":that.contactInfo.mobile,
									"subscribeEmail":that.contactInfo.subscribeEmail
								},
								contentType:'application/json',
								userToken: userToken,
								isLoading: true,
								successFn: (data) => {
									//Toast弹窗操作成功
									that.isSuccess = true
									setTimeout(()=>{
										that.isSuccess = false
										//跳转保全页面 //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
										if(that.Ybt.entryType === '0') {
										    window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
										} else if(that.Ybt.entryType === '1') {
										    that.goHome()
										}
									},2000)
								},
								failFn: (data) => {
									that.message = data.resultMsg
									if(that.message.indexOf("已被保全挂起") !== -1){
										that.iconDialog = {
											open: true,
											btns: [
												{
													text: "确定",
													handler:function() {
														window.location.href = that.$router.siteUrl() + '/preservation/SelfPreservation.html'
													}
												},

											]
										}
									} else {
										that.iconDialog = {
											open: true,
											btns: [
												{
													text: "确定",
												},

											]
										}
									}

								}
							})
						});
					}
				})
			},
			changeImg(){
				this.bingo = !this.bingo
				if(this.bingo) {
					this.imgPath = require('../../../assets/imgs/preservation/contact/bingo.png')
					this.contactInfo.subscribeEmail = '0'
				} else {
					this.imgPath = require('../../../assets/imgs/preservation/contact/un_bingo.png')
					this.contactInfo.subscribeEmail = '1'
				}

			}
		}
	}
</script>
<style lang="scss">
	.md-field-item-control .md-input-item-input::-webkit-input-placeholder {
		color: rgba(153,153,153,1)!important;
	}
	.md-input-item-msg p {
		text-align: right!important;
		margin-right: 30px!important;
	}
	.md-field-item-title{
		padding-left: 32px;
	}
	.md-input-item-input{
		padding-right: 32px;
	}
    .md-input-item-input::-webkit-input-placeholder{
        font-size: 28px!important;
        font-weight:400!important;
        color:rgba(142,142,142,1)!important;
    }
</style>
<style lang="scss" scoped>
	@import "../../../assets/css/preservation/reuse";
    .itemListCss::-webkit-input-placeholder{
        font-size: 28px!important;
        font-weight:400!important;
        color:rgba(142,142,142,1)!important;
    }
	.row-outer{
		background: white;
	}
	.radio-out{
		// width: 720px;
		background:white;
		height: 52px;
		img{
			height: 52px;
			width:52px;
		}
		padding-top: 26px;
		padding-bottom:26px;
		padding-left: 30px;
		display: flex;
		span{
			display: inline-block;
			line-height: 52px;
			margin-left:35px;
		}
	}
	.itemListCss{
		line-height:3.5;
		white-space:nowrap;
		-webkit-overflow-scrolling: touch;
		overflow-y: hidden;
		color: black !important;
		font-weight:500 !important;
	}
</style>
