<template>
    <div class="ins-fix" v-show="show">
        <div class="ins-login-box">
            <div class="ins-back" @click="hideLogin"></div>
            <div class="ins-box" v-show="!showStep2">
                <div class="ins-login">
                    <img src="@/assets/imgs/externalPay/logo.png" class="ins-logo"/>
                    <div class="ins-label-mobile">手机号快捷登录</div>
                    <div class="ins-user-name">
                        <md-input-item
                            class="myInput"
                            placeholder="投保人手机号/登录手机号"
                            type="phone"
                            align="left"
                            v-model="userName"
                            maxlength="11"
                            size="size"
                            @change="onChangeUsername(userName)"
                        ></md-input-item>
                    </div>

                    <div class="ins-login-wrap">
                        <div v-if="isUsernameOk" class="ins-btn-login" @click="onNext">下一步</div>
                        <div v-else class="ins-btn-login disabled">下一步</div>
                    </div>
                </div>
            </div>
            <div class="ins-box" v-show="showStep2">
                <div class='ins-container'>
                    <div class="ins-label-qsryzm">
                        输入验证码
                    </div>
                    <div class="ins-label-row2">
                        <div>
                            已发送验证码至
                            <span class="ins-label-phone">{{userNameShow}}</span>
                        </div>
                        <div>请查看短信并输入验证码</div>
                    </div>

                    <form class="ins-sms-form">
                        <div class="ins-input" :class="[verificationCode.length>=item?'enabled':'']"
                             v-for="(item,index) in 6" :key="index" @click='setSmsFocus'>
                            {{verificationCode.length>=item?verificationCode[item-1]:''}}
                        </div>
                    </form>
                    <md-input-item
                        ref="smsCode"
                        type="bankCard"
                        @focus="onSmsFocus"
                        :maxlength="6"
                        class='ins-hidden-ipt'
                        v-model="verificationCode"
                        @change="changeSmsCode(verificationCode)"
                        is-title-latent
                        is-virtual-keyboard
                        clearable
                    ></md-input-item>
                    <div  v-if="codeShow" class="ins-btn-resend" @click="smsVerifySend('code')">重新发送</div>
                    <div  v-else class="ins-btn-resend disabled">重新发送({{codeCount}})</div>
                </div>
            </div>
        </div>
        <md-dialog
            :closable="false"
            v-model="imageCodeDialog.open"
        >
            <div class="ins-dialog-body">
                <img :src="imageCodeDialog.img" class="ins-dlg-img" @click="imageVerifyCode"></img>
                <div class="ins-query-num-block">

                    <div  class="ins-num-item-block" v-for="(item,index) in 4"   @click='setImageCodeFocus' :key="index">
                        {{imageCodeDialogCode.length>=item?imageCodeDialogCode[item-1]:''}}
                    </div>

                </div>
                <md-input-item
                    ref="imageCode"
                    class='ins-hidden-ipt'
                    :maxlength="4"
                    v-model="imageCodeDialogCode"
                    @change="changeImageCode"
                ></md-input-item>
            </div>
        </md-dialog>

    </div>

</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'

    export default {
        name: "MpBuyLogin",
        components: {
            [Dialog.name]: Dialog,
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showStep2: false,
                userName: '',
                smsVerifyFirst: true,
                verificationCode: '',
                codeCount: '',
                codeTimer: null,
                codeShow: true,
                showSmsCode: true,
                accessToken: '',
                imageCodeDialogCode:'',
                imageCodeDialog: {
                    img: '',
                    randomStr: '',
                    open: false,
                },
                anonymousId: '',//神測匿名id,
                //isClickLogin: false,
                isUsernameOk: false,
                isSmsCodeOk: false,
            }
        },
        created() {
            let _this = this
            sensors.quick('isReady', function () {
                _this.anonymousId = sensors.quick('getAnonymousID');
            });
        },
        mounted() {

        },
        watch: {},

        computed:{
            userNameShow(){
                return this.userName.replace(/^([0-9]{3})([0-9]{6})([0-9]{2})$/, (match, $1, $2, $3) => {
                    return $1 + '******' + $3;
                })
            }
        },
        methods: {
            setSmsFocus(){
                this.$refs.smsCode.focus();
            },
            onSmsFocus(name){
                console.log('smsCode focus',name);
            },
            changeImageCode(name,code){
              //  console.log('changeImageCode',name,code)
                console.log('changeImageCode',this.imageCodeDialogCode)
                if (/^\w{4}$/.test(this.imageCodeDialogCode)) {
                    //发送验证码
                    this.smsCodeSend();
                }
            },
            changeSmsCode(smsCode) {
                console.log('changeSmsCode',smsCode)
                let flag = false;
                if (/^[0-9]{6}$/.test(smsCode)) {
                    flag = true;
                }
                this.isSmsCodeOk = flag;
                if(this.isSmsCodeOk){
                    this.smsVerifySubmit();
                }
            },
            setImageCodeFocus(){
                this.$refs.imageCode.focus();
            },
            onNext() {
                if (!this.isUsernameOk) {
                    Toast({
                        content: '请输入正确的手机号'
                    })
                    return false;
                }
                this.verificationCode='';//清空
                this.showStep2 = true;
                this.smsVerifySend('first')
            },
            hideLogin() {
                if(this.showStep2){
                    this.showStep2=false;
                }else{
                    this.$emit('back');
                }
            },
            smsVerifySend(flag) {
                let data = {};
                data.userName = this.userName
                if (this.imageCodeDialogCode) {
                    data.imageCode = this.imageCodeDialogCode
                    data.randomStr = this.imageCodeDialog.randomStr
                }
                this.$request({
                    url: `/portal/sendSmsCode`,
                    method: 'POST',
                    isLoading: true,
                    isEncript: true,
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.showSmsCode = false
                        if(flag=='code'){
                            Toast({
                                content: '验证码已发送至' + this.userName
                            })
                        }
                        if (flag === 'first' || flag === 'code') {
                            this.imageCodeDialog.open = false
                        }
                        //发送成功
                        this.imageCodeDialogCode = ''
                        this.imageCodeDialog.randomStr = ''

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
                                }
                            }, 1000)
                        }
                    },
                    failFn: (data) => {
                        if (data.resultCode === 'SYS_ERROR_001' || data.resultCode === 'SYS_ERROR_003' || data.resultCode === 'SYS_ERROR_002') {
                            this.imageVerifyCode()
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                        }
                        return false
                    }
                })
            },
            imageVerifyCode() {
                this.imageCodeDialog.randomStr = (new Date()).getTime()
                this.imageCodeDialog.img = this.$router.serverUrl() + '/code/' + this.imageCodeDialog.randomStr
                this.imageCodeDialogCode=''
                this.imageCodeDialog.open = true
            },
            smsCodeSend() {
                if (this.imageCodeDialogCode === '') {
                    Toast({
                        content: '请输入图形验证码',
                    })
                    return false
                }
                this.imageCodeDialog.open = false
                this.smsVerifySend("code")
            },
            trackLogin(payload) {
                sensors.track("click_external_login", payload);
            },
            onChangeUsername(phone) {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                var flag = false;
                if (myreg.test(phone)) {
                    flag = true;
                }
                this.isUsernameOk = flag;
            },

            smsVerifySubmit() {
                let data = {
                    "smsCode": this.verificationCode,
                    "userName": this.userName,
                    "anonymousId": this.anonymousId,
                    "activityType": '08' //小程序端登录
                }

                //增加体外登录神策埋点
                this.trackLogin({
                    "verification_code": this.verificationCode,
                    "proposer_phone": this.userName
                });
                console.log(data);
                this.$request({
                    url: "/portal/mpLogin",
                    method: 'POST',
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        //登录成功
                        var accessToken = data.accessToken;
                        var userCode = data.userCode;
                        window.localStorage.setItem("cps_token", accessToken);
                        window.localStorage.setItem("miniapp_user_code", userCode);
                        sensors.login(userCode);
                        this.imageCodeDialog.open = false
                        this.imageCodeDialogCode = ''
                        this.smsVerifyFirst = true

                        //小程序登录成功
                        if (wx.miniProgram) {
                            wx.miniProgram.postMessage({
                                data: JSON.stringify({
                                    action: 'loginSuccess',
                                    key: Math.random().toString(36).substr(2),
                                    data: {userCode: userCode, token: accessToken}
                                })
                            });
                        }
                        this.$emit('success', userCode);

                    },
                    failFn: (data) => {
                        this.imageCodeDialogCode = ''
                        this.codeShow = true
                        if (data.resultCode === "SYS_ERROR_0037") {
                            Toast({
                                content: data.resultMsg,
                            })
                            this.smsVerifySubmit()
                            return false
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .ins-login{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ins-label-mobile {
        width: 300px;
        height: 70px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 70px;
        margin-top: 70px;
        text-align: center;
    }
    .ins-user-name{
        margin-top:80px;
        margin-bottom:100px;
    }
    .ins-box {
        padding: 40px;
    }

    .ins-logo{
        width: 320px;
        height: 88px;
        margin-top: 200px;
    }

    .ins-btn-login {
        background-color: #d61e0f;
        border: 2px solid #d61e0f;
        color: #fff;
        height: 88px;
        width: 400px;
        border-radius: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
    }

    .ins-btn-login.disabled {
        border: 2px solid #ccc;
        background-color: #eee;
        color: #555;
    }



/** step2 start **/

    .ins-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .ins-label-qsryzm {
        margin-top:80px;
        width:270px;
        height:74px;
        font-size:52px;
        color:#333;
        font-weight:400;
        line-height:74px;
        white-space: nowrap;
    }
    .ins-label-row2{
        margin-top:60px;
        font-size:36px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:100px;
        text-align: center;
    }
    .ins-label-phone {
        color:rgba(51,51,51,1);
        font-size: 40px;
        color:#333;
    }


    .ins-sms-form{
        margin-top:60px;
        display: flex;
        justify-content: space-around;
        width:100%;
    }
    .ins-sms-form .ins-input{
        height: 88px;
        width:88px;
        border:2px solid #cdcdcd;
        display: inline-block;
        line-height: 88px;
        text-align: center;
        font-size: 48px;
        margin:0 8px;
        background-color: #fff;
    }
    .ins-input.enabled{
        border:2px solid rgba(225,3,18,1);
    }



    .ins-btn-resend{
        margin-left:40px;
        margin-top:60px;
        width:260px;
        height:70px;
        font-size:36px;
        font-weight:500;
        color:rgba(225,3,18,1);
        line-height:70px;
    }
    .ins-btn-resend.disabled{
        color:rgba(153,153,153,1);
    }



    .ins-dialog-body{
        padding:20px 40px 0px 40px;
        text-align: center;
    }

    .ins-query-num-block{
        width: 100%;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        height:200px;
    }

    .ins-num-item-block{
        height: 120px;
        width:80px;
        border-bottom:4px solid rgba(32, 32, 32, 0.55);
        line-height: 120px;
        text-align: center;
        font-size: 80px;
        color: #000;
    }
    .ins-hidden-ipt{
        height: 0px;
        width:0px;
        border:none;
        margin:0;
        padding:0;
        font-size: 0px;
        caret-color: transparent;
        color:transparent;
    }
    .ins-dlg-img{
        width:400px;
        height:120px;
    }

    /** step2 end **/

    .ins-back{
        position:absolute;
        left: 0px;
        top: 0px;
        width: 90px;
        height: 90px;
        z-index:3;
    }
    .ins-back:before {
        content:"";
        position:absolute;
        left: 40px;
        top: 20px;
        width: 20px;
        height: 20px;
        border-left: 2px solid #000;
        border-bottom: 2px solid #000;
        transform: rotate(45deg);
    }

    .ins-fix {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        z-index: 101;
        background: #fff;
    }
    .ins-login-box{
        position: relative;
        pointer-events: auto;
        z-index: 2;
        max-width: 100%;
        max-height: 100%;
        overflow: auto;
    }



</style>
<style lang="scss">
    .myInput{
        width:450px;
    }
    .myInput .md-field-item-content{
        border-bottom: 2px solid #CCCCCC !important;
    }
    .myInput .md-field-item-control{
        font-size: 36px !important;
    }
    .myInput .md-input-item-input{
        text-align: left !important;
        background-color: #fff !important;
    }

    .myField{
        position: relative;

    }
    .md-input-item-fake {
        visibility: hidden !important;
    }
    .md-icon-clear {
        visibility: hidden !important;
    }
</style>
