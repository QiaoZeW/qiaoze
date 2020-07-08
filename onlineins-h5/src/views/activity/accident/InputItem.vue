<template>
    <div class="gbuycomp-wrap">
        <div class="contentBody">
            <div class="giving">
                <md-field class="myField"  >
                    <p class="insureDate"> 保障期限：30天</p>
                    <md-input-item
                        class="parT"
                        :maxlength="14"
                        placeholder="请输入您的姓名"
                        v-model="proposerName"
                        id="proposerName"
                        name="proposerName"
                        @blur="checkName(proposerName,$event)"
                        @focus="ifClickArea=false"
                    >
                        <img class="person" slot="left" src="@/assets/imgs/bonusInsure/name.png" alt="">
                    </md-input-item>
                    <md-input-item
                        class="parT"
                        placeholder="请输入身份证号"
                        is-amount
                        v-model="proposerCard"
                        @blur="checkCard(proposerCard,$event)"
                        :maxlength="18"
                        @focus="ifClickArea=false"
                    >
                        <img class="card" slot="left" src="@/assets/imgs/bonusInsure/idCard.png" alt="">
                    </md-input-item>
                    <md-input-item
                        placeholder="请输入手机号"
                        is-amount
                        type="digit"
                        v-model="proposerPhone"
                        @blur="checkPhone(proposerPhone,$event)"
                        :maxlength="11"
                        class="particular parT"
                        @focus="ifClickArea=false"
                    >
                        <img class="phone" slot="left" src="@/assets/imgs/bonusInsure/phone.png" alt="">
                    </md-input-item>
                    <div class="area">
                        <md-field-item
                            name="area"
                            align="left"
                            placeholder="所在区域"
                            :content="addressStr1"
                            class="particular"
                            @click="ifAreaShow=true">
                            <img class="local" slot="left" src="@/assets/imgs/bonusInsure/area.png" alt="">
                            <img class="greenTip" slot="right" src="@/assets/imgs/bonusInsure/popup.png" alt="">
                        </md-field-item>
                    </div>
                    <md-input-item
                        class="parT detailAddParticular"
                        placeholder="请输入详细地址"
                        is-amount
                        v-model="detailAddress"
                        :maxlength="18"
                        @blur="cacheAdd"
                    >
                        <img class="detailAdd" slot="left" src="@/assets/imgs/bonusInsure/detailArea.png" alt="">
                        <md-icon
                            name="question"
                            size="lg"
                            color="#8e8e8e"
                            class="cardIcon"
                            slot="right"
                            @click="showTips()"
                        ></md-icon>
                    </md-input-item>
                    <div class="agreement">
                        <md-agree
                            v-model="agreeConf.checked"
                            :disabled="agreeConf.disabled"
                            :size="agreeConf.size"
                            @change="onChange(agreeConf.name, agreeConf.checked, $event)"
                        >
                            我已认真阅读并确认<a @click="goProduct">《产品条款》、</a><a @click="goUserAdd">《用户协议》</a>
                        </md-agree>
                    </div>
                    <div class="subbtn">
                        <p @click="getVer">立即领取</p>
                    </div>
                </md-field>
            </div>
        </div>
        <md-dialog
            :closable="true"
            v-model="smsCodeDialog.open"
            :btns="smsCodeDialog.btns"
        >
            <p style="width: 70%;margin:0 auto;margin-top:20px;"><img @click="smsVerifyCode" :src="smsCodeDialog.img"
                                                                      alt=""></p>
            <p style="margin-top:20px;text-align: center">
                <input  class="parS"
                        type="text" v-model="smsCodeDialog.code" maxlength="4" placeholder="请输入图形验证码">
            </p>
        </md-dialog>
        <div class="md-example-child md-example-child-captcha-1">
            <md-captcha
                ref="captcha"
                v-model="showVerifyCode.open"
                :isView="false"
                title="请输入验证码"
                :maxlength="6"
                :system="false"
                :mask="false"
                :appendTo="smsVerifyAppendTo"
                @submit="smsVerifySubmit"
                @show="onShow"
                @hide="onHide"
                @send="smsVerifySend"
                :auto-countdown="false"
            >
                验证码已发送至 {{proposerPhone | toInt}}
            </md-captcha>
        </div>


        <md-dialog
            :closable="true"
            v-model="goLate"
            @hide="goHome"
        >
            <div class="givingPar">
                <p class="goLate">来晚了，一份都不剩了！</p>
                <div class="btnSubmit">
                    <p  @click="goHome">更多精彩</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="hasReceived"
            @hide="goHome"
        >
            <div class="givingPar">
                <p class="goLate">您已经领取过了~</p>
                <div class="btnSubmit">
                    <p  @click="goHome">更多精彩</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="guaranteedAge"
            @hide="goHome"
        >
            <div class="givingPar">
                <p class="goLate">保障年龄在18~75周岁</p>
                <div class="btnSubmit">
                    <p  @click="goHome">更多精彩</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="receivedFail"
            @hide="receivedFail = false"
        >
            <div class="givingPar">
                <p class="goLate">领取失败</p>
                <div class="btnSubmit know">
                    <p  @click="receivedFail = false">我知道了</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="idBindMobile"
            @hide="goHome"
        >
            <div class="givingPar">
                <p class="goLate">一个手机号和一个身份证只能领取一次</p>
                <div class="btnSubmit">
                    <p  @click="goHome">更多精彩</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="frequentOperation"
            @hide="frequentOperation = false"
        >
            <div class="givingPar">
                <p class="goLate">操作过于频繁，请稍后再试</p>
                <div class="btnSubmit">
                    <p  @click="frequentOperation = false">我知道了</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="offLine"
            @hide="goHome"
        >
            <div class="givingPar">
                <p class="goLate">活动已下线</p>
                <div class="btnSubmit">
                    <p  @click="goHome">我知道了</p>
                </div>
            </div>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="noYetBegun"
            @hide="noYetBegun = false"
        >
            <div class="givingPar">
                <p class="goLate">当前活动未开始</p>
                <div class="btnSubmit">
                    <p  @click="noYetBegun = false">我知道了</p>
                </div>
                <p class="parQ">活动将于2019-10-15 10:00:00开启</p>
            </div>
        </md-dialog>
        <TabpickerSup
            v-model="ifAreaShow"
            :data="addressdata"
            title="请选择地区"
            @change="addressHandleChange"
        />
        <TipComp ref="tipComp"/>
    </div>
</template>

<script>
    import { Toast,Dialog ,Captcha} from 'mand-mobile'
    import addressdata from '@/static/addressInsure'
    import TabpickerSup from '@/components/BuyComp/TabpickerSup'
    import TipComp from '@/components/BuyComp/TipComp'
    import { agentCodeDatas } from '../../product/giving/agentCodeDatas'
    export default {
        name: "Gbuycomp",
        data () {
            return {
                ifClickArea: false,
                ifAreaShow: false,
                agentCodeDatas: agentCodeDatas,
                smsVerifyAppendTo: document.body,
                codeCount:'',
                proposerName: '',
                proposerCard: '',
                proposerPhone:'',
                proposerAddressStr: '',
                addressdata: addressdata,
                proposerAddressValue:'',
                addressData: [],
                showAgainGet:false,
                agreeConf: {
                    checked: false,
                    name: 'agree0',
                    size: 'md',
                    disabled: false,
                    introduction: '选中状态',
                },
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
                showVerifyCode:{
                    open: false,
                },
                smsVerifyFirst:true,
                showSmsCode:true,
                isClickShow:false,
                codeTimer: null,
                verificationCode:'',
                anonymousId:'',
                userToken:'',
                goLate:false,
                hasReceived:false,
                guaranteedAge:false,
                receivedFail:false,
                idBindMobile:false,
                frequentOperation:false,
                storageName:'USERINFO',
                offLine:false,
                isIos:false,
                noYetBegun:false,
                detailAddress:'',
                addressStr1:'',
                cps_secondaryDistributor:'',
                cps_thirdClassDistributor:'',
                shareImgUrl:require('@/assets/imgs/bonusInsure/shareImg.png')
            }
        },
        components: {
            [Dialog.name]: Dialog,
            [Captcha.name]: Captcha,
            TabpickerSup,
            TipComp
        },
        created() {
            this.loadCityData()
            this._setStorage()
            var u = navigator.userAgent.toLowerCase()
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            let _this = this
            sensors.quick('isReady',function(){
                _this.anonymousId = sensors.quick('getAnonymousID');
            });
            this.cps_secondaryDistributor = this.$router.query("secondaryDistributor") || '';
            this.cps_thirdClassDistributor = this.$router.query("thirdClassDistributor") || '';


            let options = {}
                options.title = '最高30万交通意外险免费领',
                options.desc = '出行无忧，有我就go了！',
                options.href = location.href 
                options.link = this.$router.siteUrl() + `/activity/accident/Bonus.html?secondaryDistributor=${this.cps_secondaryDistributor}&thirdClassDistributor=${this.cps_thirdClassDistributor}`    
                options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(options)
        },
        methods: {
            showTips(){
                this.$refs['tipComp'].showDetailTip()
            },
            addressHandleChange({options}) {
                console.log(options);
                let addStrArr = [],showSZ = false
                this.proposerAddressStr  = options[0].label + options[1].label + options[2].label
                options.forEach((item, index) => {
                    addStrArr.push(item.label)
                    if (index === 0) {
                        this.proposerAddressValue = this.agentCodeDatas.find(item1 => item1.value === item.value).agentCode
                    }
                    if (index === 1) {
                        if (item.value === '210200') { // 大连特殊处理agentCode 因为跟辽宁重复了
                            this.proposerAddressValue = this.agentCodeDatas.find(item1 => item1.value === item.value).agentCode // 取得是最后一位置的value
                        }else if(item.value === '320500'){
                            Dialog.alert({content:'暂不支持苏州地区'})
                            this.proposerAddressStr = ''
                            console.log("addStrArr",addStrArr);
                            addStrArr.length = 0
                            showSZ = true
                            return false
                        }
                    }
                })
                console.log("addStrArr111",addStrArr);
                if(showSZ){
                    this.addressStr1 = ''
                }else{
                    this.addressStr1 = addStrArr.length === 0?[]:addStrArr.join('-')
                }
                this.addStorage('addressStr1', this.addressStr1)
                this.addStorage('proposerAddressStr', this.proposerAddressStr)
                this.addStorage('proposerAddressValue', this.proposerAddressValue)
            },
            cacheAdd(){
                this.changeBlur()
                if(this.detailAddress !== ''){
                    this.addStorage('detailAddress', this.detailAddress)
                }
            },
            onShow(){},
            onHide(){},
            goUserAdd(){
                window.location.href =this.$router.siteUrl() + '/product/UserAgreement.html'
            },
            goProduct(){
                let url = 'https://yxfile.aeonlife.com.cn/doc/2019/10/20191010/1/onlineins/onlineins_1_1_20191010102722399.pdf'
                this.$app.goPdfView(url);
            },
            goHome(){
                sessionStorage.clear()
                window.location.href = 'http://p.alipay.com/P/Qu6uUBuy'
            },
            getVer(){
                if (this.proposerPhone === '' || this.proposerCard === '' || this.proposerName === '' || this.proposerAddressStr === '' || this.detailAddress === '' || this.addressStr1 === '') {
                    Toast({
                        content: '您有信息未填写'
                    })
                    return false;
                }
                if(!this.agreeConf.checked){
                    Toast({
                        content: '请勾选条款及协议'
                    })
                    return false;
                }
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!regName.test(this.proposerName)) {
                    Toast({
                        content: '您的名字有误，请重新输入'
                    })
                    return false;
                }
                let result2 = this.checkCard(this.proposerCard)

                if(!result2){
                    Toast({
                        content: '您的证件号输入有误，请重新输入'
                    })
                    return false;
                }
                let result = this.checkPhone(this.proposerPhone)
                console.log(result);
                if(!result){
                    Toast({
                        content: '您的手机号输入有误，请重新输入'
                    })
                    return false;
                }
                this.showVerifyCode.open = true
            },
            smsVerifySend(flag) {
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
                        this.$refs.captcha.countdown()
                        this.showSmsCode = false
                        this.changeBlur()
                        if (flag === 'first' || flag === 'code') {
                            this.smsCodeDialog.open = false
                            this.showVerifyCode.open = true
                        }

                        //发送成功
                        this.smsVerifyFirst = false
                        this.smsCodeDialog.code = ''
                        this.smsCodeDialog.randomStr = ''
                        //开始倒计时
                        const TIME_COUNT = 60
                        if (!this.codeTimer) {
                            this.codeCount = TIME_COUNT
                            this.codeTimer = setInterval(() => {
                                if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
                                    this.codeCount--
                                } else {
                                    clearInterval(this.codeTimer)
                                    this.codeTimer = null
                                    this.smsVerifyFirst = true
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
                            return false
                        }
                    }
                })
            },
            smsVerifyCode() {
                this.smsCodeDialog.randomStr = (new Date()).getTime()
                this.smsCodeDialog.img = this.$router.serverUrl() + '/code/' + this.smsCodeDialog.randomStr
                if(this.isIos){
                    window.scrollTo(0,0)
                }
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
            smsVerifySubmit(val) {
                this.verificationCode = val
                console.log("val",val);
                if(this.proposerPhone === ''){
                    Toast.info('手机号不可为空')
                    return false
                }
                if(this.verificationCode === ''){
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
                    "activityType": '08'
                }

                sensors.track("click_sign_up", {
                    register_scenario: '注册有礼活动',
                });

                this.$request({
                    url: '/portal/fast/register2',
                    method: 'POST',
                    data: data,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                        //成功后，调投保接口
                        this.userToken = data.accessToken
                        sensors.login(data.userCode);
                        this.smsCodeDialog.open = false
                        this.smsCodeDialog.code = ''
                        this.isClickShow = false
                        this.showVerifyCode.open = false
                        this.goInsure()
                    },
                    failFn: (data) => {
                        this.showVerifyCode.open = false
                        this.smsCodeDialog.code = ''
                        this.isClickShow = false
                        if (data.resultCode === "SYS_ERROR_0037") {
                            Toast({
                                content: data.resultMsg,
                            })
                            this.smsVerifySubmit()
                            return false
                        } else if (data.resultCode === 'SYS_ERROR_003') {
                            Toast({
                                content: "图形验证码错误",
                            })
                            return false
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                            return false
                        }
                    }
                })
            },
            changeBlur(){
                let u = navigator.userAgent, app = navigator.appVersion;
                let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if(isIOS){
                    setTimeout(() => {
                        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                    }, 200)
                }
            },
            getSex(cardNo) {
                //获取性别
                return (parseInt(cardNo.substr(16, 1)) % 2 == 1) ? '0' : '1'
            },
            loadCityData () {
                this.$request({
                    url: `/sys/dict/type`,
                    method: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: {'type': 'giveRiskArea'},
                    successFn: (data) => {
                        this.addressData = data
                    }
                })
            },
            onChange(name, checked) {
                console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
            },
            checkName(name, e = null) {
                this.changeBlur()
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!regName.test(name)) {
                    Toast.failed('您输入的姓名格式不正确！')
                    return false;
                } else {
                    this.addStorage('proposerName', this.proposerName)
                    return true
                }
            },
            checkCard(item) {
                this.changeBlur()
                const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                var idCard = item.trim();
                if (regIdCard.test(idCard.trim())) {
                    if (idCard.length == 18) {
                        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                        var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
                        var idCardLast = idCard.substring(17); // 得到最后一位身份证号码
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                this.addStorage('proposerCard', this.proposerCard)
                                return true;
                            } else {
                                Toast.failed('您输入的身份证号不正确')
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                this.addStorage('proposerCard', this.proposerCard)
                                return true;
                            } else {
                                Toast.failed('您输入的身份证号不正确')
                                return false;
                            }
                        }
                    }
                } else {
                    Toast.failed('您输入的身份证号不正确')
                    return false;
                }
            },
            getBirthday(cardNo){
                let str = cardNo.substr(6,4) + '-' + cardNo.substr(10,2) + '-' + cardNo.substr(12,2)
                return str
            },
            checkPhone(phone) {
                this.changeBlur()
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    Toast.failed('您输入的手机号格式不正确！')
                    return false;
                } else {
                    this.addStorage('proposerPhone', this.proposerPhone)
                    return true
                }
                return true
            },
            goInsure () {
                let subData = {
                    "actGiftRiskDTO": { // 投保人信息
                        "appntInfo": {
                            "address": this.proposerAddressStr + this.detailAddress, // 地址文字
                            "birthday": this.getBirthday(this.proposerCard),
                            "idNo": this.proposerCard, // 身份证号
                            "idType": "0",
                            "mobile": this.proposerPhone,
                            "name": this.proposerName,
                            "sex": this.getSex(this.proposerCard)
                        },
                        "insuredInfo": { // 被保人信息
                            "address": this.proposerAddressStr + this.detailAddress,
                            "birthday": this.getBirthday(this.proposerCard),
                            "idNo": this.proposerCard,
                            "idType": "0",
                            "mobile": this.proposerPhone,
                            "name":  this.proposerName,
                            "relationToAppnt": "00", // 为本人
                            "sex": this.getSex(this.proposerCard)
                        },
                        "agentCode": this.proposerAddressValue, // 地址code
                        "contPlanCode": "34",
                        "cvalidate": ""
                    },
                    "contNo": "",
                    "insuYear": "",
                    "prem": "",
                    "riskName": "",
                    "secondaryDistributor": this.cps_secondaryDistributor,
                    "thirdClassDistributor": this.cps_thirdClassDistributor
                }
                this.$request({
                    url: `/act/giftRisk/receiveYwGiftRisk`,
                    method: 'POST',
                    isLoading:true,
                    userToken:this.userToken,
                    contentType: 'application/json;charset=UTF-8',
                    data: subData,
                    successFn: (data) => {
                        Toast.hide()
                        sessionStorage.clear()
                        location.href = `Success.html?secondaryDistributor=${this.cps_secondaryDistributor}&thirdClassDistributor=${this.cps_thirdClassDistributor}`
                    },
                    failFn:(data)=>{
                        if(data.resultCode === 'SYS_ERROR_0097'){
                            this.goLate = true
                        } else if(data.resultCode === 'SYS_ERROR_0099' || data.resultCode === 'SYS_ERROR_0031'){
                            this.hasReceived = true
                        } else if(data.resultCode === 'SYS_ERROR_0107'){
                            this.guaranteedAge = true
                        }  else if(data.resultCode === 'SYS_ERROR_0034'){  //操作过于频繁
                            this.frequentOperation = true
                        }else if(data.resultCode === 'SYS_ERROR_0093'){  //活动下线
                            this.offLine = true
                        }else if(data.resultCode === 'SYS_ERROR_0092'){  //活动未开始
                            this.noYetBegun = true
                        }else if(data.resultCode === 'SYS_ERROR_0109'){  //活动未开始
                            this.receivedFail = true
                        }else{
                            Dialog.alert({content:data.resultMsg})
                        }
                    }
                })
            },
            _setStorage() {
                //从浏览器储存里面读
                let storageItem = this._parseStorage();
                for (let item in storageItem) {
                    if (storageItem[item]) {
                        this[item] = storageItem[item]
                    }
                }
            },
            _parseStorage() {
                let object;
                try {
                    object = JSON.parse(sessionStorage.getItem(this.storageName));
                } catch (e) {
                    object = {};
                }

                return object || {};
            },
            addStorage(e, val) {
                //放缓存
                if (e) {
                    let _storageInfo = {}
                    _storageInfo[e] = val
                    this._expireStorage(_storageInfo)
                }
            },
            _expireStorage(info) {
                let object = this._parseStorage();
                let commos = Object.assign(object, info);
                commos.time = new Date().getTime();
                sessionStorage.setItem(this.storageName, JSON.stringify(commos));
            },
        },
        filters: {
            toInt(value) {
                return value.substr(0,3) + '****' + value.substr(7,4);
            }
        }
    }

</script>

<style lang='scss' scoped>
    .contentBody{
        -webkit-border-radius: 26px;
        -moz-border-radius: 26px;
        border-radius: 26px;
        background: #fff;
        margin: 0 26px;
        padding-top: .7rem;
        padding-bottom: .7rem;
        box-shadow:  0 0 .6rem #77CCBE inset;
    }
    .gbuycomp-wrap {
        .area {
            position: relative;
            .optionlist {
                background-color: #fff;
                position: absolute;
                top: 100px;
                left: 50px;
                z-index: 99;
                border-radius: 8px;
                height: 300px;
                overflow: auto;
                li {
                    width: 480px;
                    margin: 30px 0;
                    padding-left: 18px;
                    font-size: .35rem;
                }
            }
        }

        img {
            &.person {
                width: 41px;
                height: 42px;
            }
            &.card {
                width: 44px;
                height: 30px;
            }
            &.local {
                width: 29px;
                height: 38px;
            }
            &.phone {
                width: 29px;
                height: 44px;
            }
        }
    }
    .btnSubmit{
        margin: .5rem auto 0;
        display: flex;
        justify-content: center;
        p{
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            width: 402px;
            height: 88px;
            line-height: 88px;
            background: linear-gradient(top,#FF837F,#F5504A);
            background: -webkit-linear-gradient(top,#FF837F,#F5504A);
        }
    }

    .know{
        p{
            background: linear-gradient(top,#45D3FF,#1F71FA);
            background: -webkit-linear-gradient(top,#45D3FF,#1F71FA);
        }
    }
    .goLate{
        font-size: 36px;
        color: #333;
        text-align: center;
        font-weight: bold;
    }
    .parS{
        font-size:36px;
        text-align:center;
        height: 88px;
        width: 6rem;
        -webkit-appearance:none;
        -webkit-text-fill-color:#111a34;
        border:none;
        border-bottom:1px solid #000;
    }
    .parQ{
        font-size: 28px;
        text-align: center;
        margin-top: .4rem;
    }
    .detailAdd{
        width: 41px;
        height: 44px;
    }
    .cardIcon{
        padding-right: .2rem;
    }
</style>

<style lang="scss">
    .parT{
        .md-field-item-content{
            border-right: 2px solid #47B7AE !important;
        }
    }
    .givingPar{
        .myFieldPar{
            position: relative;
            padding:30px 0 !important;
            .verCode{
                position: absolute;
                right: 0;
                top: .42rem;
                width: 152px;
                height: 102px;
                min-height: 102px;
                font-size:32px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(254,254,254,1);
                background: #8e8e8e !important;
                line-height:102px;
                text-align: center;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
        .md-field-item-control{
            font-size: 30px !important;
            text-align: left !important;
        }
        .md-input-item-input{
            font-size: 30px !important;
            text-align: left !important;
        }
        .md-field-item-content{
            border-left: 1px solid  #8E8E8E !important;
            border-top: 1px solid  #8E8E8E !important;
            border-bottom: 1px solid  #8E8E8E !important;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding-left: 26px;

        }
    }
    .gbuycomp-wrap {
        .giving {
            padding: 0 22px;
            .myField{
                position: relative;
                width: 90% !important;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 0 !important;

                .md-field-item-content{
                    border-left: 2px solid #47B7AE !important;
                    border-top: 2px solid #47B7AE !important;
                    border-bottom: 2px solid #47B7AE !important;
                    margin-bottom: 34px;
                    border-radius: 8px;
                    height: 88px;
                    min-height: 88px;
                    padding-left: 16px;
                }
                .md-field-item-control{
                    font-size: 30px !important;
                    text-align: left !important;
                }
                .md-input-item-input{
                    font-size: 30px !important;
                    text-align: left !important;
                }
                .md-button {
                    width: 184px;
                    height: 88px;
                    font-size: 28px;
                    line-height: 88px;
                }
                .agreement {
                    .md-agree {
                        color: #8e8e8e;
                        font-size: 24px;
                        a {
                            color: #F35351;
                        }
                    }
                }
                .subbtn {
                    margin-top: 40px;
                    p{
                        width: 100%;
                        height: 88px;
                        line-height: 88px;
                        font-size: 32px;
                        background: linear-gradient(top,#FF837F,#F5504A);
                        background: -webkit-linear-gradient(top,#FF837F,#F5504A);
                        color: #fff;
                        text-align: center;
                        -webkit-border-radius: 50px;
                        -moz-border-radius: 50px;
                        border-radius: 50px;
                    }
                }
                img.phone {
                    width: 28px;
                    height: 40px;
                }
                img.password {
                    width: 30px;
                    height: 32px;
                }
            }
        }
    }
    .particular .md-field-item-control{
        padding-left: .23rem;
        font-size: 30px !important;
    }
    .detailAddParticular .md-field-item-control{
        padding-left: .15rem;
    }
    .insureDate{
        font-size:36px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:30px;
        margin-bottom: .5rem;
    }
    .greenTip{
        width: 86px;
        height: 88px;
        z-index: 111;
    }
    .area{
        .md-field-item-content{
            border-right: 0 !important;
        }
    }

</style>
