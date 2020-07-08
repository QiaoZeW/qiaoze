<template>
    <div class="container-1">
        <div class="card-top">
            <h4 class="title">身份证正面</h4>
            <div class="title-img">
                <div class="box-left">
                    <img class="img-icon" :src="idcardFront" @click="uploadPic(1)"></img>
                    <div class="text-left" >点击拍照</div>
                </div>
                <div class="box-right">
                    <div class="img-icon-positive" @click="showBig(0)"></div>
                    <div class="text-right" >示例：点击查看大图</div>
                </div>
            </div>
            <hr class="line1"/>
        </div>
        <div class="card-middle" style="margin-top:14px;">
            <h4 class="title">身份证反面</h4>
            <div class="title-img">
                <div class="box-left">
                    <img class="img-icon" :src="idcardBack" @click="uploadPic(2)"></img>
                    <div class="text-left" >点击拍照</div>
                </div>
                <div class="box-right">
                    <div class="img-icon-back" @click="showBig(1)"></div>
                    <div class="text-right">示例：点击查看大图</div>
                </div>
            </div>
            <hr class="line1"/>
        </div>
        <div class="card-bottom" style="margin-top:14px;">
            <h4 class="title">本人与身份证合照</h4>
            <div class="title-img">
                <div class="box-left">
                    <img class="img-icon" :src="together" @click="uploadPic(3)"></img>
                    <div class="text-left" >点击拍照</div>
                </div>
                <div class="box-right">
                    <div class="img-icon-photo" @click="showBig(2)"></div>
                    <div class="text-right">示例：点击查看大图</div>
                </div>
            </div>
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
		<Success v-if="isSuccess"></Success>
		<md-image-viewer
		  v-model="isViewerShow"
		  :list="imgs"
		  :initial-index="viewerIndex">
		</md-image-viewer>
        <div class="mainBtn">
            <button :class="btnResult == true?'may_btn':'disable_btn'" @click="cardChange()">确认提交信息</button>
        </div>
    </div>
</template>

<script>
    import { ImageViewer,Dialog } from 'mand-mobile'
    import "@/assets/css/preservation/reuse.scss"
	import { mapState } from 'vuex'
	import Success from '@/components/preservation/Success'
    export default {
        name:'SelfPreservation',
        data() {
            return {
				idcardFront: require('../../../assets/imgs/preservation/idcard/4@2x.png'),
				idcardBack: require('../../../assets/imgs/preservation/idcard/4@2x.png'),
				together: require('../../../assets/imgs/preservation/idcard/4@2x.png'),
				idcardFrontReady: false,
				idcardBackReady: false,
				togetherReady: false,
				bankName: '',
				newBankCode: '',
				changeFlag: '',
				account: '',
				chooseOptions: [],
				chooseOptionsNew: [],
				message:'',
				iconDialog: {
				    open: false,
				    btns: [
				        {
				            text: "确定"
				        },

				    ]
				},
				isSuccess: false,
				isViewerShow:false,
				viewerIndex:0,
				imgs: [
					require('../../../assets/imgs/preservation/idcard/idcardfront_big.png'),
					require('../../../assets/imgs/preservation/idcard/idcardback_big.png'),
					require('../../../assets/imgs/preservation/idcard/together_big.png')
				  ],
			}
        },
		components: {
			[ImageViewer.name]: ImageViewer,
            Success
		},
		computed:{
			btnResult:function(){
			    return this.idcardFrontReady && this.idcardBackReady && this.togetherReady;
			},
			...mapState(['Ybt'])
		},
        mounted() {
        },
		created() {
			this.bankName = window.localStorage.getItem("NewBankName");
			this.newBankCode = window.localStorage.getItem("BankCode");
			this.changeFlag = window.localStorage.getItem("ChangeFlag");
			this.account = window.localStorage.getItem("Account");
			this.chooseOptions = JSON.parse(window.localStorage.getItem("ContNo"));
			// for(let i  in this.chooseOptions) {
			// 	let cont = {}
			// 	cont.contNo = this.chooseOptions[i]
			// 	this.chooseOptionsNew.push(cont)
			// }
		},
        methods:{
			showBig(index) {
				this.isViewerShow = true
				this.viewerIndex = index
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
            cardChange() {
				if(!this.btnResult) {
					return
				}
                let that = this
                this.$app.getCurrentToken(function(userToken){
                    that.$prequest({
                        url:'/payment/modifyPaymentAccount',
                        method: 'POST',
                        data: {
                            "changeFlag": that.changeFlag,
                            "contNos": that.chooseOptions,
                            "customerNo": that.Ybt.customerNo,
                            "edorType": "PC",
                            "newAccName": that.Ybt.customerInfo.name,
                            "newBankAccNo": that.account,
                            "newBankCode": that.newBankCode,
                            "operate": "Save",
                            "photo1": that.idcardFront,
                            "photo2": that.idcardBack,
                            "photo3": that.together
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
                            that.iconDialog = {
                            	open: true,
                            	btns: [
                            		{
                            			text: "确定",
                            			handler:function() {
                                            window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
                            			}
                            		},

                            	]
                            }
                        }
                    })
                });
            },
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
								that.idcardFrontReady = true
							}
							//身份证反面
							else if (frontOrBack == 2) {
								that.idcardBack = res.data
								that.idcardBackReady = true
							}
							//手持证件照片
							else if (frontOrBack == 3) {
								that.together = res.data
								that.togetherReady = true
							}
						}

					});
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/preservation/reuse";
    .title {
        width:256px;
        height:44px;
        font-size:32px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:44px;
    }
    .title-img {
        display:flex;
        justify-content: space-around;
        margin-top:20px;
    }
    .img-icon-positive {
		width: 234px;
		height: 146px;
        background: url('../../../assets/imgs/preservation/idcard/1@2x.png') center center no-repeat;
		background-size:234px auto;
	}
    .img-icon-back {
		width: 234px;
		height: 146px;
        background: url('../../../assets/imgs/preservation/idcard/2@2x.png') center center no-repeat;
		background-size:234px auto;
	}
    .img-icon-photo {
		width: 166px;
		height: 166px;
        margin:auto;
        background: url('../../../assets/imgs/preservation/idcard/3@2x.png') center center no-repeat;
		background-size:166px auto;
	}
    .img-icon {
        width: 166px;
		height: 166px;
        margin:auto;
        background: url('../../../assets/imgs/preservation/idcard/4@2x.png') center center no-repeat;
		background-size:166px auto;
    }
    .text-left {
        width:96px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(142,142,142,1);
        line-height:34px;
        margin:28px auto;
    }
    .text-right {
        width:216px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(142,142,142,1);
        line-height:34px;
        margin:28px auto;
    }
    .line1{
        border: none;
        border-bottom:4px dashed #8E8E8E;
        padding-top:6px;
    }
</style>
