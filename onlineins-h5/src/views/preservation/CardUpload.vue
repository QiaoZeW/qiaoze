<template>
	<div class="container-2">
		<!-- 上半部分 -->
		<div class = "upHalf">
			<!-- 标题 -->
			<div class= "title">
				请上传二代身份证
			</div>

			<!-- 图片 -->
			<div>
				<img @click="uploadPic(1)" :src=idcardFront />
			</div>

			<!-- 描述 -->
			<div class="foot">
				上传身份证正面
			</div>
		</div>

		<!-- 下半部分 -->
		<div class = "downHalf">
			<!-- 标题 -->
			<div class= "title">
				请上传二代身份证
			</div>

			<!-- 图片 -->
			<div>
				<img @click="uploadPic(2)" :src=idcardBack>
			</div>

			<!-- 描述 -->
			<div class="foot">
				上传身份证背面
			</div>
		</div>
		<div class="mainBtn">
			<button :class="btnResult == true?'may_btn':'disable_btn'" @click="goNext()">{{btnValue}}</button>
		</div>
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
		<Success v-if="isSuccess"/>
	</div>
</template>

<script>
	import {Dialog,Toast, Button} from 'mand-mobile'
	import {mapState } from 'vuex'
	import Success from '@/components/preservation/Success'
	export default{
		data(){
			return {
				isSuccess:false,
				iconDialog: {
				    open: false,
				    btns: [
				        {
				            text: "重新上传"
				        },
				        {
				            text: "进入人工审核",
				            handler: this.onIconConfirm
				        }
				    ]
				},
				idcardFront: require('../../assets/imgs/preservation/cardUpload/card_frot.png'),
				idcardBack: require('../../assets/imgs/preservation/cardUpload/card_back.png'),
				custInfo:  {},
				ocrInfo: {},
				ocrResult: false,
				message: '',
				idcardFrontReady: false, //身份证正面上传完毕标识
				idcardBackReady: false, //身份证背面上传完毕标识
				selectedPerson: '',
			}
		},
		components:{
			Success
		},
		created() {
			//获取session中选择变更人员的客户号
			this.selectedPerson =  localStorage.getItem('selectedPerson');
			this.getCustomerInfo();
		},
		computed: {
			...mapState(['Ybt']),
			btnValue: function (){
				if(this.Ybt.businessType == '1') { //证件有效期变更
					return '提交信息'
				} else if(this.Ybt.businessType == '2'){ // 退保
					return '去人脸识别'
				}
			},
            btnResult:function(){
			    return this.idcardFrontReady && this.idcardBackReady;
            }

		},
		methods:{
			uploadPic(frontOrBack){
				let that = this;
				setupWebViewJavascriptBridge(function (bridge) {
					bridge.callHandler('getBase64', {'id': '2'}, function (res) {
						res = JSON.parse(res);
						if(res.data) {
							//文件后缀名
							let suffix = res.data.substring(res.data.lastIndexOf('.')+1)
							//身份证正面
							if(frontOrBack == 1) {
								that.idcardFront = res.data
								console.log('suffix',suffix)
								that.doOcr(res.data,'2','2',suffix)
							}
							//身份证反面
							else if (frontOrBack == 2) {
								that.idcardBack = res.data
								that.doOcr(res.data,'3','2',suffix)
							}
						}

					});
				})
			},
			getCustomerInfo(){
				let that = this;
				this.$app.getCurrentToken(function(userToken){
                    if(!userToken){
                        userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwNzEyMDM1NDMyMDAwMDciLCJleHAiOjE1NzE0NjI3OTB9.yM2c-uAAwZ2OhBiHledZOD5-s3qWhSmUlJhsoq9dbFpOzOynxVcnJHJSnoCSkx18ZedNZc7rbNS95HtLBw5MVg';
                    }
					that.$prequest({
						url:'/customerdata/init',
						method: 'POST',
						data: {
							edorType: 'CM',
							operate: 'Init',
							operatorType: 'a',
							operator: 'wx',
							customerNo: that.selectedPerson
						},
						contentType:'application/json',
						userToken: userToken,
						isLoading: true,
						successFn: (data) => {
							that.custInfo = {
									idNo: data.idNo,
									name: data.name,
									sex: data.sex == '1'? '女':'男',
									birthday: data.birthday,
									idValiDATE: data.idValiDATE
								}
						},
						failFn: () => {
						    alert(data.resultMsg)
						}
					})
				});

			},

			doOcr(imgUrl, imgIndex, imgType, suffix) {
				let that = this
				this.$app.getCurrentToken(function(userToken){
					that.$prequest({
						url: `/ocr/ocr/getappocrinfo`,
						data: {
							"businessType": "1", //1:微信保全
							"imgInfoList": [
								{
								  "imgIndex": imgIndex, //2-二代身份证正面 3-二代身份证证背面 13护照 16户口本 17-银行卡
								  "imgType": imgType, //2-身份证照片 13护照 16户口本 17-银行卡
								  "imgFormat": suffix,
								  "imgUrl": imgUrl
								}
							],
							"requestPlatform": "3", //3：手机
							"userCode": that.selectedPerson
						},
						isLoading: true,
						method:'POST',
						contentType:'application/json',
						userToken: userToken,
						successFn: (data) => {
							if(imgIndex === '2') {//身份证正面
								//如果身份证号码不相同则阻断交易
								if(data.cardNo != that.custInfo.idNo) {
                                    if(that.Ybt.entryType === '0') {
                                        that.message = "身份证号与预留身份证号不一致，身份校验失败！点击确定返回保全功能页面。"
                                    } else if(that.Ybt.entryType === '1') {
                                        that.message = "身份证号与预留身份证号不一致，身份校验失败！点击确定返回首页。"
                                    }
									//阻断交易
									that.iconDialog = {
									    open: true,
									    btns: [
									        {
									            text: "确定",
									            handler: function(){
                                                    //跳转保全页面 //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
                                                    if(that.Ybt.entryType === '0') {
                                                        window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
                                                    } else if(that.Ybt.entryType === '1') {
                                                        that.goHome()
                                                    }
												}
									        }
									    ]
									}
								}
								that.ocrInfo.cardNo = data.cardNo
								that.ocrInfo.name = data.name
								that.ocrInfo.birthday = data.birthday
								that.ocrInfo.sex = data.sex
								that.ocrInfo.country = '中国'
								that.ocrInfo.cardType = '身份证'
								that.idcardFrontReady = true
							}else if (imgIndex === '3') {//身份证反面
								that.ocrInfo.expiryDate = data.expiryDate
								that.idcardBackReady = true
							}
						},
					    failFn: () => {
							if(imgIndex === '2') {
								that.message = "请重新上传正确的身份证正面照片"
								that.idcardFront = require('../../assets/imgs/preservation/cardUpload/card_frot.png')
								that.ocrInfo.name = ''
								that.ocrInfo.birthday = ''
								that.ocrInfo.sex = ''
								that.idcardFrontReady = false
							} else if(imgIndex === '3') {
								that.message = "请重新上传正确的身份证背面照片"
								that.idcardBack = require('../../assets/imgs/preservation/cardUpload/card_back.png')
								that.ocrInfo.expiryDate = ''
								that.idcardBackReady = false
							}

				            that.iconDialog = {
				                open: true,
				                btns: [
				                    {
				                        text: "重新上传"
				                    }
				                ]
				            }
					    }
					})
				});
			},
			reUpload(){
				this.idcardFront = require('../../assets/imgs/preservation/cardUpload/card_frot.png')
				this.idcardBack = require('../../assets/imgs/preservation/cardUpload/card_back.png')
				this.ocrInfo.name = ''
				this.ocrInfo.birthday = ''
				this.ocrInfo.sex = ''
				this.idcardFrontReady = false
				this.idcardBackReady = false
				this.iconDialog.open = false
				this.ocrResult = false
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
			goNext() {
				let that = this
				if(this.btnResult){
					localStorage.setItem('ocrInfo', JSON.stringify(this.ocrInfo))
                    localStorage.setItem('custInfo', JSON.stringify(this.custInfo))
					localStorage.setItem('idCardFront', this.idcardFront)
					localStorage.setItem('idCardBack', this.idcardBack)

					console.log('ocrInfo', this.ocrInfo)
					console.log('custInfo', this.custInfo)
					//校验五要素是否正确
					if( (this.ocrInfo.name != this.custInfo.name) || (this.ocrInfo.birthday != this.custInfo.birthday) || (this.ocrInfo.sex != this.custInfo.sex) ) {
						this.ocrResult = false
					} else {
						this.ocrResult = true
					}
					localStorage.setItem('ocrResult', this.ocrResult)
					//证件有效期变更
					if(this.Ybt.businessType == '1') {
						if(!this.ocrResult) {
							this.message = "您上传的证件信息与系统留存信息不一致，可以选择进入'人工审核'或'重新上传'"
							this.iconDialog = {
							    open: true,
							    btns: [
							        {
							            text: "重新上传",
							            handler: this.reUpload
							        },
									{
									    text: "进入人工审核",
									    handler: function(){
                                            console.log('人核信息',{
														edorType: 'CM',
														operate: 'Save',
														operatorType: 'a',
														operator: 'wx',
														customerNo: that.selectedPerson,
														name:that.custInfo.name,
														sex:that.custInfo.sex == '男'?'0':'1',
														birthday:that.custInfo.birthday,
														idType:'0', //0身份证
														idTypeName:'身份证',
														idNo:that.custInfo.idNo,
														idCvaliDate:that.ocrInfo.expiryDate,
														photo1:that.idcardFront,
														photo2:that.idcardBack,
														confirmMethod:'2',//ocr
														needManualReview:'Y'//人工审核
													})
											that.$app.getCurrentToken(function(userToken){
												that.$prequest({
													url:'/customerdata/custsave',
													method: 'POST',
													data: {
														edorType: 'CM',
														operate: 'Save',
														operatorType: 'a',
														operator: 'wx',
														customerNo: that.selectedPerson,
														name:that.custInfo.name,
														sex:that.custInfo.sex == '男'?'0':'1',
														birthday:that.custInfo.birthday,
														idType:'0', //0身份证
														idTypeName:'身份证',
														idNo:that.custInfo.idNo,
														idCvaliDate:that.ocrInfo.expiryDate,
														photo1:that.idcardFront,
														photo2:that.idcardBack,
														confirmMethod:'2',//ocr
														needManualReview:'Y'//人工审核
													},
													userToken: userToken,
													contentType:'application/json',
                                                    isLoading: true,
													successFn: (data) => {
														that.iconDialog.open = false
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
														that.iconDialog.open = false
													    that.message = data.resultMsg
													    that.iconDialog = {
													        open: true,
													        btns: [
													            {
													                text: "确定",
													                handler: function() {
													    				//跳转保全页面 //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
													    				if(that.Ybt.entryType === '0') {
													    				    window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
													    				} else if(that.Ybt.entryType === '1') {
													    				    that.goHome()
													    				}
													    			}
													            }
													        ]
													    }
													}
												})
											});

										}
									}
							    ]
							}
						} else {
							//进入证件有效期变更页面
                            window.location.href =this.$router.siteUrl() + "/preservation/identity/PolicyChanges.html";
						}
					}
					//退保
					if(this.Ybt.businessType == '2') {
						if(this.ocrResult) {
							//去人脸识别
                            window.location.href =this.$router.siteUrl() + "/preservation/FaceRecognition.html";
						} else {
							this.message = "您上传的证件信息与系统留存信息不一致，可以选择'重新上传'，也可以进入'人脸识别页面'，进入人脸识别页面只能进行人工审核"
							this.iconDialog = {
							    open: true,
							    btns: [
							        {
							            text: "重新上传",
							            handler: this.reUpload
							        },
									{
									    text: "去人脸识别",
									    handler: function(){
											//去人脸识别
                                            window.location.href =that.$router.siteUrl() + "/preservation/FaceRecognition.html";
										}
									}
							    ]
							}
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/preservation/reuse";
	.upHalf{
		width: 710px;
		height: 460px;
		background: #FFFFFF;
        margin: auto;
		.title{
			height: 122px;
			line-height: 122px;
			text-align: center;
			font-size:32px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.foot{
			height: 114px;
			line-height: 122px;
			text-align: center;
			font-size:14px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(129,171,228,1);
		}
	}
	.downHalf{
		width: 710px;
		height: 460px;
		background: #FFFFFF;
        margin: auto;
		margin-top:20px;
		.title{
			height: 122px;
			line-height: 122px;
			text-align: center;
			font-size:32px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.foot{
			height: 114px;
			line-height: 122px;
			text-align: center;
			font-size:14px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(129,171,228,1);
		}
	}
	img{
		width: 390px;
		height: 224px;
		margin: auto;
	}
</style>
