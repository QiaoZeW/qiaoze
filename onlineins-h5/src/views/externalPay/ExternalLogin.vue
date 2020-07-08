<template>
    <div class="content">
        <img src="@/assets/imgs/externalPay/logo.png" />

        <md-field class="myField">
            <md-input-item
                placeholder="请输入投保人手机号"
                type="phone"
                is-amount
                class="myInput"
                v-model="proposerPhone"
            ></md-input-item>
            <md-input-item
                placeholder="请输入投保人身份证号"
                is-amount
                class="myInput"
                v-model="proposerCard"
                @blur="cardNum(proposerCard,$event)"
                name="proposerCard"
                id="proposerCard"
                :maxlength="18"
            ></md-input-item>
            <div v-if="codeShow" class="getCode partOne" ref="partOne" @click="smsVerifySend('first')">
                获取验证码
            </div>
            <div v-else class="getCode partOne" ref="partOne">
                {{codeCount}} s
            </div>
            <md-input-item
                placeholder="请输入验证码"
                class="myInput"
                ref="myInput"
                is-amount
                disabled
                v-if="showSmsCode"
                type="digit"
                maxlength="6"
            ></md-input-item>
            <md-input-item
                v-model="verificationCode"
                placeholder="请输入验证码"
                class="myInput"
                ref="myInput"
                v-else
                is-amount
                type="digit"
                maxlength="6"
            ></md-input-item>
        </md-field>
        <div class="btnConfirm part1" ref="confirmBtn" @click="smsVerifySubmit">
            查询保单
        </div>
        <p class="bottomPhone" v-show="hideshow">全国客服热线<span>95542</span></p>

        <md-dialog
            :closable="true"
            v-model="smsCodeDialog.open"
            :btns="smsCodeDialog.btns"
        >
            <p style="width: 70%;margin:0 auto;margin-top:20px;"><img @click="smsVerifyCode" :src="smsCodeDialog.img"
                                                                      alt=""></p>
            <p style="margin-top:20px;text-align: center">
                <input style="font-size:22px;text-align:center;
                -webkit-appearance:none;-webkit-text-fill-color:#111a34;
                border:none;border-bottom:1px solid #000;"
                       type="text" v-model="smsCodeDialog.code" maxlength="4" placeholder="请输入图形验证码">
            </p>
        </md-dialog>

    </div>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    export default {
        name: "ExternalLogin",
        components: {
            [Dialog.name]: Dialog,
        },
        data(){
            return {
                docuHeight: document.documentElement.clientHeight,  //默认屏幕高度
                showHeight: document.documentElement.clientHeight,   //实时屏幕高度
                hideshow:true,  //显示或者隐藏footer
                proposerPhone: '',
                proposerCard: '',
                smsVerifyFirst:true,
                verificationCode:'',
                codeCount: '',
                codeTimer: null,
                codeShow:true,
                showSmsCode:true,
                isClickShow:false,
                accessToken:'',
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
                anonymousId:'',//神測匿名id,
                secondCps:'',
                isClickLogin:false
            }
        },
        created(){
            window.localStorage.clear()
            //神測匿名id獲取
            this.secondCps = this.$router.query('cps')  || ''
            console.log(this.secondCps);
            let _this = this
            sensors.quick('isReady',function(){
                _this.anonymousId = sensors.quick('getAnonymousID');
                console.log( '1',_this.anonymousId);
            });
        },
        mounted() {
            // window.onresize监听页面高度的变化
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.body.clientHeight;
                })()
            }
        },
        watch:{
            showHeight:function() {
                if(this.docuHeight > this.showHeight){
                    this.hideshow=false
                }else{
                    this.hideshow=true
                }
            }
        },
        updated(){
            if(this.proposerPhone.length === 11 && this.verificationCode !== ''){
                this.$refs.confirmBtn.className = 'btnConfirm part2'
            }else{
                this.$refs.confirmBtn.className = 'btnConfirm part1'
            }
            if(this.proposerPhone !== ''){
                this.$refs.partOne.className = 'getCode partTwo'
            }else{
                this.$refs.partOne.className = 'getCode partOne'
            }
        },
        methods:{
            checkInput1(item) {
                document
                    .getElementById(item)
                    .getElementsByTagName("input")[0]
                    .focus();
            },
            // 去空格
            v_trim(s) {
                return s.replace(/\s/g, "");
            },
            cardNum(cardNum, e = null) {
                if (!this.checkCard(cardNum)) {
                    Toast.failed("您输入的身份证号码不正确！");
                }
            },
            // 校验身份证
            checkCard(item) {
                const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                var idCard = this.v_trim(item);
                if (regIdCard.test(this.v_trim(idCard))) {
                    if (idCard.length == 18) {
                        var idCardWi = new Array(
                            7,
                            9,
                            10,
                            5,
                            8,
                            4,
                            2,
                            1,
                            6,
                            3,
                            7,
                            9,
                            10,
                            5,
                            8,
                            4,
                            2
                        );
                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                        var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
                        var idCardLast = idCard.substring(17); // 得到最后一位身份证号码
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            },
            checkInput(item, conS) {
                if (item == "" || !item) {
                    Toast.failed(conS);
                    return false;
                } else {
                    return true;
                }
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
                if (!this.checkInput(this.proposerCard, "请输入投保人的身份证号")) {
                    this.checkInput1("proposerCard");
                    return false;
                }
                let data = {};
                data.userName = this.proposerPhone
                if (this.smsCodeDialog.code) {
                    data.imageCode = this.smsCodeDialog.code
                    data.randomStr = this.smsCodeDialog.randomStr
                }
                this.$request({
                    url: `/portal/sendSmsCode`,
                    method: 'POST',
                    isLoading: true,
                    isEncript:true,
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.showSmsCode = false
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
                        if (data.resultCode === 'SYS_ERROR_001' || data.resultCode === 'SYS_ERROR_003'||data.resultCode === 'SYS_ERROR_002') {
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
            smsVerifyCode() {
                this.smsCodeDialog.randomStr = (new Date()).getTime()
                this.smsCodeDialog.img = this.$router.serverUrl() + '/code/' + this.smsCodeDialog.randomStr
                this.smsCodeDialog.open = true
            },
            smsCodeSend() {
                if (this.smsCodeDialog.code === '') {
                    Toast({
                        content: '请输入图形验证码',
                    })
                    return false
                }
                this.isClickShow = true
                this.smsCodeDialog.open = false
                this.smsVerifySend("code")
            },
            trackLogin(payload){
                sensors.track("click_external_login", payload);
            },
            smsVerifySubmit() {
                if(this.isClickLogin){
                    return false
                }
                this.isClickLogin = true
                if (this.proposerPhone === '') {
                    Toast({
                        content: '请输入您的手机号'
                    })
                    this.isClickLogin = false
                    return false
                }
                if (!this.checkInput(this.proposerCard, "请输入投保人的身份证号")) {
                    this.checkInput1("proposerCard");
                    this.isClickLogin = false
                    return false
                }
                if (this.verificationCode === '') {
                    Toast({
                        content: '请输入验证码'
                    })
                    this.isClickLogin = false
                    return false
                }
                let data = {
                    "deviceNo": (new Date()).getTime(),
                    "fastFlag": true,
                    "imageCode": this.smsCodeDialog.code,
                    "inviterCode": this.inviterCode,
                    "password": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "smsCode": this.verificationCode,
                    "userName": this.proposerPhone,
                    "anonymousId":this.anonymousId
                }
                //增加体外登录神策埋点
                this.trackLogin({
                    "verification_code":this.verificationCode,
                    "proposer_phone":this.proposerPhone
                });
                console.log(data);
                this.$request({
                    url: '/portal/loginByCode',
                    method: 'POST',
                    data: data,
                    isLoading: true,
                    isEncript: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                        //成功后，调投保接口
                        window.localStorage.setItem("USER_TOKEN_PAY", JSON.stringify(data.accessToken));
                        window.localStorage.setItem("userPhone", this.proposerPhone);
                        window.localStorage.setItem("proposerCard", this.proposerCard);
                        //为了赠险增加
                        window.localStorage.setItem("inviterCode", data.userCode);
                        window.localStorage.setItem("mobile", this.proposerPhone);
                        sensors.login(data.userCode);
                        this.smsCodeDialog.open = false
                        this.smsCodeDialog.code = ''
                        this.isClickShow = false
                        this.smsVerifyFirst = true
                        /*  Toast({
                              content: "验证成功",
                          })*/
                        setTimeout(()=>{
                            this.isClickLogin = false
                        },2000)
                        location.href = "/externalPay/ExternalList.html?cps=" + this.secondCps
                    },
                    failFn: (data) => {
                        this.isClickLogin = false
                        this.smsCodeDialog.code = ''
                        this.codeShow = true
                        if(data.resultCode === "SYS_ERROR_0037"){
                            this.smsVerifySubmit()
                            return false
                        }else if(data.resultCode === "SYS_ERROR_0049"){
                            Toast({
                                content:  '请使用投保人手机号登录查询',
                            })
                            return false
                        }else{
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
    .content{
        img{
            width: 412px;
            height: 124px;
            margin: 0 auto;
            padding-top: 182px;
        }
    }
    .getCode{
        position: absolute;
        width: 146px;
        height: 56px;
        font-size:22px;
        text-align: center;
        line-height: 56px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        left: 6rem;
        top: 3.5rem;
        z-index: 1000 !important;
    }
    .partOne{
        color: #8E8E8E;
        border: 1px solid #8E8E8E;
    }
    .partTwo{
        color: #333;
        border: 1px solid #333;
    }
    .btnConfirm{
        width: 608px;
        z-index:100 !important;
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        margin: 0 auto  ;
        text-align: center;
        margin-top: 106px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .part1{
        color: #A0A0A0;
        border: 2px solid #8E8E8E;
        background: #fff;
    }
    .part2{
        color: #fff;
        border: 2px solid #E10312;
        background: #E10312;
    }
    .bottomPhone{
        color: #333333;
        font-size: 24px;
        z-index: 5;
        width: 100%;
        text-align: center;
        margin-top: 3rem;
        margin-bottom: 60px;
        span{
            color: #E10312;
        }
    }
</style>
<style lang="scss">
    .myInput .md-field-item-content{
        border-bottom: 2px solid #CCCCCC !important;
    }
    .myInput .md-field-item-control{
        font-size: 30px !important;
    }
    .myInput .md-input-item-input{
        text-align: left !important;
    }
    .myField{
        position: relative;
        width: 592px !important;
        margin: 0 auto;
        margin-top: 144px;
        padding-right: 10px;
    }
</style>
