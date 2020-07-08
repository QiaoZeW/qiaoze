<template>
    <div>
        <p class="phone">手机号码：<span class="phone_num">{{proposerPhone}}</span>  </p>
        <div style="text-align: right;">
            <input type="tel" v-if="!codeShow" maxlength="6" class="smsInput" v-model="verificationCode" @click="showTip()" oninput="value=value.replace(/[^\d]/g,'')"
                   placeholder="请输入验证码">
            <input type="tel" v-else maxlength="0" class="smsInput" v-model="verificationCode" @click="showTip()" oninput="value=value.replace(/[^\d]/g,'')"
                   placeholder="请输入验证码">
            <div class="getCode" v-if="codeShow" ref="partOne" @click="smsVerifySend()">
                发送验证码
            </div>
            <div class="getCode" v-else  ref="partOne">
                {{codeCount}}
            </div>
        </div>
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	import {Toast} from 'mand-mobile'
    export default {
        name:'SendMessage',
        data() {
            return {
                codeShow:true,
                codeCount: '',
                codeTimer: null,
                verificationCode:'',
            }
        },
		computed: {
		    ...mapState(['Ybt']),
			proposerPhone: function() {
		        if(this.Ybt.customerInfo.mobile){
                    return this.Ybt.customerInfo.mobile.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3')
                }
                return "";
			}
		},
        mounted() {
        },
        methods:{
            //验证码发送
            smsVerifySend() {
                let that = this;
                this.$app.getCurrentToken(function(userToken){
                    that.$prequest({
                        url:'/sms/getcode',
                        params: {
                            mobile:that.Ybt.customerInfo.mobile,
                        },
                        method: 'GET',
                        isLoading: true,
                        userToken: userToken,
                        successFn: (data) => {
                            console.log(data)
                        },
                        failFn: () => {
                            Toast({
                                content: data.resultMsg
                            })
                        }
                    })
                });

                this.codeShow = false
                const TIME_COUNT = 60
                let _this = this
                if (!this.codeTimer) {
                    this.codeCount = TIME_COUNT
                    this.codeShow = false
                    this.codeTimer = setInterval(() => {
                        if (_this.codeCount > 0 && _this.codeCount <= TIME_COUNT) {
                            _this.codeCount--
                        } else {
                            _this.codeShow = true
                            clearInterval(_this.codeTimer)
                            _this.codeTimer = null
                            // _this.smsVerifyFirst = true
                        }
                    }, 1000)
                }
                // this.$request({
                //     url: `/portal/sendSmsCode`,
                //     method: 'POST',
                //     isLoading: true,
                //     isEncript: true,
                //     data: data,
                //     contentType: 'application/json',
                //     successFn: (data) => {
                //         Toast({
                //             content: '验证码已发送至' + this.proposerPhone
                //         })
                //
                //         //发送成功
                //         this.smsVerifyFirst = false
                //
                //         //开始倒计时
                //         const TIME_COUNT = 60
                //         let _this = this
                //         if (!this.codeTimer) {
                //             this.codeCount = TIME_COUNT
                //             this.codeShow = false
                //             this.codeTimer = setInterval(() => {
                //                 if (_this.codeCount > 0 && _this.codeCount <= TIME_COUNT) {
                //                     _this.codeCount--
                //                 } else {
                //                     _this.codeShow = true
                //                     clearInterval(_this.codeTimer)
                //                     _this.codeTimer = null
                //                     _this.smsVerifyFirst = true
                //                 }
                //             }, 1000)
                //         }
                //     },
                //     failFn: (data) => {
                //             Toast({
                //                 content: data.resultMsg,
                //             })
                //         return false
                //     }
                // })
            },
			verifySmsCode(){
                if(this.verificationCode == '') {
                    Toast({
                        content: '请输入短信验证码'
                    })
                    return
                }
				let that = this;
				this.$app.getCurrentToken(function(userToken){
				    that.$prequest({
				        url:'/sms/verify',
				        params: {
				            mobile:that.Ybt.customerInfo.mobile,
							smsCode: that.verificationCode
				        },
				        method: 'GET',
				        isLoading: true,
				        userToken: userToken,
				        successFn: (data) => {
				            console.log('verify', data)
							Toast({
							    content: '操作成功'
							})
							setTimeout(()=>{
								//回传父组件
								that.$emit('verifySuccess')
							},2000)

				        },
				        failFn: (data) => {
							Toast({
								content: data.resultMsg
							})
				        }
				    })
				});
			}
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/preservation/reuse";
    .phone{
        font-size: 30px;
        font-weight: bold;
        color: #111a34;
        .phone_num{
            color: #E10312;
        }
    }
    .smsInput{
        width: 100%;
        border-bottom: 1px solid #CCCCCC;
        font-size:30px;
        padding: 30px 0;
    }
    .smsInput::-webkit-input-placeholder{
        font-size: 30px!important;
        font-weight:400;
        color:rgba(142,142,142,1);
        line-height:42px;
    }
    .smsInput::-moz-placeholder{
        font-size: 30px;
        font-weight:400;
        color:rgba(142,142,142,1);
        line-height:42px;
    }
    .getCode{
        position: relative;
        top: -0.98rem;
        padding: 0 26px;
        display: inline-block;
        /*width:170px;*/
        min-width: 47.5px;
        height:48px;
        border-radius:10px;
        border:1px solid rgba(225,3,18,1);
        font-size:24px;
        font-weight:400;
        color:rgba(225,3,18,1);
        line-height:48px;
        text-align: center;
    }
</style>
