<template>
	<div class="container-1">
		<div class="tip1">
			请拍摄脸部确认身份
		</div>
		<div class="img-pack">
			<img :src=facePic @click="uploadPic()" />
		</div>
		<div style="height: 20px;background: whitesmoke;"></div>
		<div class="tip2">
			<img src="../../assets/imgs/preservation/face/face_tip_light.jpg"/>
			<img src="../../assets/imgs/preservation/face/face_tip_face.jpg"/>
			<img src="../../assets/imgs/preservation/face/face_tip_hat.jpg"/>
		</div>
		<div class="mainBtn">
			<button class="may_btn" @click="doNext()">身份认证</button>
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
	import {mapState } from 'vuex'
	import {Dialog,Toast, Button} from 'mand-mobile'
	import Success from '@/components/preservation/Success'
	export default{
		data() {
			return {
				suffix: '',
				facePic: require('../../assets/imgs/preservation/face/face_take.jpg'),
				ocrInfo:{},
				ocrResult: false,
				idCardBack:'',
				idCardFront:'',
				btnResult: false,
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
				message: '',
				isSuccess:false, //Toast弹窗
				failTimes: 0, //人脸是被失败次数
				similarity: '', //人脸识别相似度
                cannelPolicyInfo:{}//退保信息对象
			}
		},
		created() {
			// this.ocrInfo = JSON.parse(localStorage.getItem('ocrInfo'))
			this.idCardBack = localStorage.getItem('idCardBack')
			this.idCardFront = localStorage.getItem('idCardFront')
			this.ocrResult = localStorage.getItem('ocrResult') //获取ocr识别结果
            if(this.Ybt.businessType == '2'){
                 let temp = localStorage.getItem('cannelPolicyInfo') //退保信息对象
                if(temp){
                    this.cannelPolicyInfo=JSON.parse(temp);
                }

            }
		},
		computed: {
			...mapState(['Ybt']),
            faceDetect(){
              return parseFloat(this.similarity).toFixed(3) >= 0.707
            }
		},
		methods:{
			jumpToNewPage(){
				//证件有效期变更
				if(this.Ybt.businessType == 1){
					this.$router.push({path:'/idcard/info'})
				}
				//联系方式变更
				else if(this.Ybt.businessType == 3){
					this.$router.push({path:'/contact/info'})
				}
			},
			uploadPic(){
				let that = this;
				setupWebViewJavascriptBridge(function (bridge) {
					bridge.callHandler('getBase64', {'id': '2'}, function (res) {
							res = JSON.parse(res);
							if(res.data) {
								//文件后缀名
								that.suffix = res.data.substring(res.data.lastIndexOf('.')+1)
								//替换图片
								that.facePic = res.data
								that.btnResult = true
							}
						});
				})
			},
			doNext() {
				console.log('click')
				let that = this
				if(!this.btnResult) {
					that.iconDialog = {
						open: true,
						btns: [
							{
								text: "请拍摄脸部确认身份"
							}
						]
					}
					return;
				}
				this.$app.getCurrentToken(function(userToken){
					that.$prequest({
						url: `/xface/recognition`,
						data: {
							businessType: '1', //微信保全
							requestPlatform: '3', //手机app
							userCode: that.Ybt.customerNo,
							clientName: that.Ybt.customerInfo.name, //客户姓名
							idType: '0', //证件类型
							idNo: that.Ybt.customerInfo.idNo,//证件号码
							imgInfoList: [{
								imgIndex: '1', //手机自拍照片
								imgType: '1', //手机自拍照片
								imgFormat: that.suffix, //照片格式
								imgUrl: that.facePic
							}]
						},
						method: 'POST',
						userToken: userToken,
						contentType:'application/json',
						isLoading: true,
						successFn: (data) => {
							console.log('data', data)
							//处理相似度
							that.dealSth(data.similarity)
						},
					    failFn: (data) => {
							that.message = data.resultMsg
							that.iconDialog = {
							    open: true,
							    btns: [
							        {
							            text: "确定"
							        }
							    ]
							}
					    },
                        errorFn: function(){
                            Toast({
                                content: '网络开小差了！请检查网络后重试',
                            })
                        }
					})
				});
			},
			//退保前置处理，判断上一步ocr结果，如果成功则走自动退保，如果失败走人工审核
			beforeTuibao() {
				//ocr识别成功
				if(this.ocrResult == 'true') {
					console.log('ocr陈宫',this.ocrResult)
					//调用退保接口
					this.tuibao('N')
				}
				//ocr是被失败
				else {
					console.log('ren gong',this.ocrResult)
					//调用退保接口,强制人工审核
					this.tuibao('Y')
				}
			},
			//人脸识别失败退保业务处理
			failedFaceTuibao() {
				let that = this
				this.failTimes++
				if(this.failTimes <= 3) {
					this.message="人脸识别失败"
					this.iconDialog = {
					    open: true,
					    btns: [
					        {
					            text: "重新上传",
								handler: function() {
									//重置图片
									that.facePic = require('../../assets/imgs/preservation/face/face_take.jpg')
									that.iconDialog.open = false
									that.btnResult = false
								}
					        }
					    ]
					}
				} else {
					this.message="人脸识别失败,您可以选择人工审核或重新上传"
					this.iconDialog = {
					    open: true,
					    btns: [
					        {
					            text: "重新上传",
								handler: function() {
									//重置图片
									that.facePic = require('../../assets/imgs/preservation/face/face_take.jpg')
									that.iconDialog.open = false
									that.btnResult = false
								}
					        },{
					            text: "人工审核",
								handler: function() {
									//调用退保接口
									that.tuibao('Y')
									that.iconDialog.open = false
								}
					        }
					    ]
					}
				}
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
			dealSth(similarity){
				let that = this
                this.similarity = similarity
				//0.707
				if(parseFloat(similarity).toFixed(3) >= 0.707) {
					console.log('tuibao busi', this.Ybt.businessType)
					//退保人脸识别业务逻辑
					if(this.Ybt.businessType == '2') {
						console.log('jin ru before  ')
						this.beforeTuibao()
					}
					//联系方式变更人脸识别业务逻辑
					if(this.Ybt.businessType == '3') {
						//进入联系方式变更页面
                        window.location.href =this.$router.siteUrl() + "/preservation/contact/ContactDetails.html";
					}
				} else {
					//退保人脸识别业务逻辑
					if(this.Ybt.businessType == '2') {
						this.failedFaceTuibao()
					}
					//联系方式变更人脸识别业务逻辑
					if(this.Ybt.businessType == '3') {
						//重新上传照片
						//重置图片
						that.facePic = require('../../assets/imgs/preservation/face/face_take.jpg')
						that.iconDialog.open = false
						that.btnResult = false
					}
				}
			},
			// needManualReview是否人工审核 Y:强制人工，N:正常
			tuibao(needManualReview) {
				console.log('needManualReview', needManualReview)
				let that = this
                var  pdata={
                    edorType:'YT',
                    operate:'Save',
                    operator:'bnzx',
                    operatorType:'bnzx',
                    customerNo:that.Ybt.customerNo,
                    contNo:'',
                    edorReseaonCode:'',
                    edorReseaon:'',
                    tbType:'01',//退保类型,01-整单退保 02-选择附加险退保 (如果前端不支持选险种单独退则传01整单退保)
                    polList:[],
                    photo1:that.idCardFront,
                    photo2:that.idCardBack,
                    photo3:that.facePic,
                    queryDate:'',
                    getMoney:'',
                    confirmMethod:'1',//确认方式,0-短信，1-人脸识别
                    needManualReview:needManualReview,//人工审核标识,Y-强制人工审核，N或空时核心自己判断阀值是否需要人工审核
                    similarity:that.similarity,
                    faceDetect:that.faceDetect?'1':'0',
                    ocrRecognition:that.ocrResult?'1':'0'
                };
				Object.assign(pdata,that.cannelPolicyInfo);
				console.log(pdata);
				this.$app.getCurrentToken(userToken=>{
					that.$prequest({
						url: `/policy/cancel/save`,
						data: pdata,
						method: 'POST',
						userToken: userToken,
						contentType:'application/json',
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
							that.iconDialog = {
							    open: true,
							    btns: [
							        {
							            text: "确定",
										handler:function() {
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
		},
		components: {
			Success
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/preservation/reuse";
	.tip1{
		height: 100px;
		color: black;
		font-size: 32px;
		line-height: 100px;
		text-align: center;
	}
	.img-pack{
		height: 700px;
		position: relative;
	}
	.img-pack img{
		width: 600px;
		height: 450px;
		margin: auto;
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
	}
	.tip2{
        width: 700px;
		display: flex;
		padding-top: 20px;
        margin: auto;
		img{
			width: 160px;
			height: 160px;
		}
		img:nth-child(1) {
			margin-right: 25px;
			margin-left: 50px;
			margin-top: 30px;
		}
		img:nth-child(2) {
			margin-right: 25px;
			margin-left: 25px;
			margin-top: 30px;
		}
		img:nth-child(3) {
			margin-right: 50px;
			margin-left: 25px;
			margin-top: 30px;
		}
	}
</style>
