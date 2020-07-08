<template>
    <div :class="styleType === 0 ?'content_part_three':''">
        <div class="verification">
            <div class="iphone">
                <img src="@/assets/imgs/appointment/iphone_logo.png" alt="">
                <input class="iphone_input inputLogin" type="tel" maxlength="11" v-model="proposerPhone"
                       oninput="value=value.replace(/[^\d]/g,'')" @blur="checkPhone(proposerPhone)"
                       @click="showTip($event)" @keyup="hideTip($event)" placeholder="请输入投保人手机号">

                <div class="iphoneTip" v-show="showIphoneTip && showNeedTip">* 请使用预约手机号完成投保</div>
                <!-- <p class="verificationSmallTip">* 请确保预约手机号与投保手机号一致</p>-->
            </div>
            <div class="password" @click="showIphoneTip = false">
                <img src="@/assets/imgs/appointment/lock_logo.png" alt="">
                <input v-if="allowInput " class="password_input inputLogin" type="tel" maxlength="0"
                       v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')"
                       placeholder="请输入验证码" >

                <input v-else class="password_input inputLogin" type="tel" maxlength="6"
                       v-model="verificationCode"  oninput="value=value.replace(/[^\d]/g,'')"
                       placeholder="请输入验证码">
                <div v-if="codeShow" class="send_code" @click="smsVerifySend('first')">
                    获取验证码
                </div>
                <div v-else class="send_code" ref="partOne">
                    {{codeCount}} s
                </div>
            </div>
            <button class="activityStart" @click="implementBtn">{{btnText}}</button>
        </div>
        <md-dialog
            :closable="true"
            v-model="smsCodeDialog.open"
            :btns="smsCodeDialog.btns"
        >
            <p style="width: 70%;margin:0 auto;margin-top:20px;"><img @click="smsVerifyCode" :src="smsCodeDialog.img"
                                                                      alt=""></p>
            <p  id="pic" class="pic">
                <input class="parT"
                       type="text" v-model="smsCodeDialog.code"   maxlength="4" placeholder="请输入图形验证码"   >
            </p>
        </md-dialog>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    export default {
        name: "SendCode",
        data() {
            return {
                showIphoneTip: false,
                proposerPhone: '',
                verificationCode: '',
                codeShow: true,
                allowInput: true,
                isIos: false,
                smsVerifyFirst: true,
                codeCount: '',
                smsCodeDialog: {
                    img: '',
                    randomStr: '',
                    code: '',
                    open: false,
                    btns: [
                        {
                            text: '确定',
                            handler: this.smsCodeSend
                        }
                    ],
                },
            }
        },
        props:{
            styleType:{
                type:Number,
                default: 0
            },
            showNeedTip:{
                type:Boolean,
                default:  false
            },
            btnText:{
                type:String,
                default: ''
            }
        },
        created() {
            var u = navigator.userAgent.toLowerCase()
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            let _this = this
            sensors.quick('isReady',function(){
                _this.anonymousId = sensors.quick('getAnonymousID');
            });
        },
        watch: {
            proposerPhone(newName, oldName) {
                if (newName.length === 11) {
                    this.showIphoneTip = false
                }
            }
        },
        methods: {
            implementBtn(){
                if (this.proposerPhone === '') {
                    Toast.info('手机号不可为空')
                    return false
                }
                if (this.verificationCode === '') {
                    Toast.info('验证码不可为空')
                    return false
                }
                let data = {
                    "deviceNo": (new Date()).getTime(),
                    "fastFlag": true,
                    "imageCode": this.smsCodeDialog.code,
                    "inviterCode": '',
                    "password": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "smsCode": this.verificationCode,
                    "userName": this.proposerPhone,
                    "anonymousId": this.anonymousId,
                    "activityType": '13'
                }

                this.$request({
                    url: '/portal/fast/register2',
                    method: 'POST',
                    data: data,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                        //成功后，调投保接口
                        this.smsCodeDialog.open = false
                        this.smsCodeDialog.code = ''
                        this.$emit('query_prize',this.proposerPhone)
                    },
                    failFn: (data) => {
                        this.smsCodeDialog.code = ''
                        this.codeShow = true
                        if (data.resultCode === "SYS_ERROR_0037") {
                            Toast({
                                content: data.resultMsg,
                            })
                            this.implementBtn()
                            return false
                        }  else {
                            Toast({
                                content: data.resultMsg,
                            })
                            return false
                        }
                    }
                })
            },
            showTip(e) {
                console.log(e);
                e.stopPropagation()
                this.showIphoneTip = true
            },
            hideTip(e) {
                if (e.keyCode === 13) {
                    this.showIphoneTip = false
                }
            },
            checkPhone(phone, e = null) {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (phone.length > 2) {
                    if (!myreg.test(phone)) {
                        Toast.failed("您输入的手机号格式不正确！");
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false
                }
            },
            smsVerifyCode() {
                this.smsCodeDialog.randomStr = (new Date()).getTime()
                this.smsCodeDialog.img = this.$router.serverUrl() + '/code/' + this.smsCodeDialog.randomStr
                this.smsCodeDialog.open = true
                if (this.isIos) {
                    window.scrollTo(0, 0)
                }
            },
            backTop(){
              window.scrollTo(0,0)
            },
            smsCodeSend() {
                if (this.smsCodeDialog.code === '') {
                    Toast({
                        content: '请输入图形验证码',
                    })
                    return false
                }
                this.smsCodeDialog.open = false
                this.smsVerifySend("code")
            },
            smsVerifySend(flag) {
                if (!this.smsVerifyFirst) {
                    return false;
                }
                if (this.proposerPhone === '') {
                    Toast({
                        content: '请输入您的手机号'
                    })
                    return false;
                }
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.proposerPhone)) {
                    Toast.failed("您输入的手机号格式不正确！");
                    return false;
                }
                if (this.proposerPhone.length !== 11) {
                    Toast({
                        content: '您的手机号不正确'
                    })
                    return false;
                }
                let data = {};
                data.userName = this.proposerPhone
                if (this.smsCodeDialog.code) {
                    data.imageCode = this.smsCodeDialog.code
                    data.randomStr = this.smsCodeDialog.randomStr
                }
                console.log(data);
                this.$request({
                    url: `/portal/sendSmsCode`,
                    method: 'POST',
                    isLoading: true,
                    isEncript: true,
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        Toast({
                            content: '验证码已发送至' + this.proposerPhone
                        })

                        if (flag === 'first' || flag === 'code') {
                            this.smsCodeDialog.open = false
                        }

                        //发送成功
                        this.smsVerifyFirst = false
                        this.smsCodeDialog.code = ''
                        this.smsCodeDialog.randomStr = ''

                        this.allowInput = false
                        //开始倒计时
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
                                    _this.smsVerifyFirst = true
                                }
                            }, 1000)
                        }
                    },
                    failFn: (data) => {
                        if (data.resultCode === 'SYS_ERROR_001' || data.resultCode === 'SYS_ERROR_003' || data.resultCode === 'SYS_ERROR_002') {
                            this.smsVerifyCode()
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                        }
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .content_part_three {
        background: url("../../assets/imgs/appointment/pic03.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin: 37px auto 0;
        width: 664px;
        height: 486px;
    }
    .verification {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            width: 580px;
            height: 88px;
            line-height: 88px;
            margin-top: 54px;
            border-radius: 50px;
            font-size: 34px;
            font-weight: bold;

        }

        .activityEnd {
            color: #7F5454;
            background: linear-gradient(top, #EFCD92, #CCA050);
            background: -webkit-linear-gradient(top, #EFCD92, #CCA050);
            box-shadow: 0 0.05rem 0 #90733E;
        }

        .activityStart {
            background: linear-gradient(top, #FFD893, #FFBC44);
            background: -webkit-linear-gradient(top, #FFD893, #FFBC44);
            color: #B41D1C;
            box-shadow: 0 0.05rem 0 #D97D1B;
        }
    }

    .iphone_input, .password_input {
        width: 470px;
        height: 88px;
        border-radius: 10px;
        border: 1px solid #FFD893;
        background: #D62221;
        padding-left: 80px;
        padding-right: 30px;
        color: #FFDEA5;
        font-size: 30px;
    }

    .send_code {
        width: 218px;
        background: #FFD893;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 30px;
        color: #B41D1C;
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .iphone {
        position: relative;
        margin-top: 42px;

        img {
            position: absolute;
            width: 31px;
            display: inline-block;
            height: 45px;
            top: .35rem;
            left: 26px;
        }
    }

    .password {
        position: relative;
        margin-top: .56rem;

        img {
            position: absolute;
            display: inline-block;
            width: 33px;
            height: 45px;
            top: .35rem;
            left: 26px;
        }
    }

    .iphoneTip:before {
        content: "";
        position: absolute;
        left: 1.1rem;
        top: -.2rem;
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: .25rem solid #FBC462;
    }

    .iphoneTip {
        width: 558px;
        position: absolute;
        height: 64px;
        line-height: 64px;
        z-index: 200;
        top: 1.1rem;
        padding-left: 24px;
        color: #D62221;
        background: #FBC462;
        border-radius: 10px;
    }
    .pic{
        margin-top:20px;
        text-align: center
    }
    .parT {
        font-size: 36px;
        text-align: center;
        -webkit-appearance: none;
        -webkit-text-fill-color: #111a34;
        border: none;
        border-bottom: 1px solid #000;
        height: 1rem;
        width: 5rem;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: #FFDEA5 !important;
        -webkit-box-shadow: 0 0 0px 1000px #D62221  inset !important;
        background-color:#D62221;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    }
</style>
<style lang="scss">

    .inputLogin::-webkit-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-moz-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-ms-input-placeholder {
        color: #FFD893;
    }
    input,textarea {
        -webkit-appearance: none; /* 方法2 */
    }
</style>
