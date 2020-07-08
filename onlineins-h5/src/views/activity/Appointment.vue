<template>
    <section id="section" @click="hideTipAll($event)">
        <div class="content_top" >
            <img src="@/assets/imgs/appointment/bg_top02.png" @click="showIphoneTip = false" class="bg_top_02"/>
            <div class="content_part_one" @click="showIphoneTip = false">
                <p class="part_one_title">*图片仅为展示，以实际收到的服务为准</p>
                <div class="part_one">
                    <div class="part_one_description">
                        <p class="part_one_description_01">2019.12.12—2019.12.31</p>
                        <p class="part_one_description_02">提前预约可加享一份体检<br>服务</p>
                    </div>
                </div>
            </div>
            <div :class="isNew === 1 || isNew === 2?'content_part_two_new':'content_part_two'" @click="showIphoneTip = false">
                <div class="partTwoDescription">
                    <p class="part_two_description_01">2020.1.1—2020.1.31</p>
                    <p class="part_two_description_02">投保指定产品可享口腔健康<br>服务一次</p>
                </div>
                <img src="@/assets/imgs/appointment/imgRight.png" class="imgRight"/>
                <div class="product_detail01">
                    <div class="proList" v-for="item in proListAll">
                        <img :src="item.imgUrl" class="productPic"/>
                        <div class="product01">
                            <P class="product_title">{{item.title}}</P>
                            <P class="product_description">{{item.des}}</P>
                            <p class="product_des">需保障至终身</p><a @click="goDetail(item)">了解产品</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_part_three" v-show="!loginSuccess">
                <div class="verification">
                    <div class="iphone">
                        <img src="@/assets/imgs/appointment/iphone_logo.png" alt="">
                        <input class="iphone_input inputLogin" v-if="showButton" type="tel" maxlength="11" v-model="proposerPhone"
                               oninput="value=value.replace(/[^\d]/g,'')" @blur="checkPhone(proposerPhone)" @click="showTip($event)" @keyup="hideTip($event)"  placeholder="请输入预约手机号">
                        <input class="iphone_input inputLogin " v-else type="tel" maxlength="0" v-model="proposerPhone"
                               oninput="value=value.replace(/[^\d]/g,'')"   placeholder="请输入预约手机号">
                        <div class="iphoneTip" v-show="showIphoneTip">* 请使用预约手机号完成投保</div>
                       <!-- <p class="verificationSmallTip">* 请确保预约手机号与投保手机号一致</p>-->
                    </div>
                    <div class="password" v-if="showButton" @click="showIphoneTip = false">
                        <img src="@/assets/imgs/appointment/lock_logo.png" alt="">
                        <input v-if="allowInput " class="password_input inputLogin" type="tel" maxlength="0"
                               v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')"
                               placeholder="请输入验证码">

                        <input v-else class="password_input inputLogin" type="tel" maxlength="6"
                               v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')"
                               placeholder="请输入验证码">
                        <div v-if="codeShow" class="send_code" @click="smsVerifySend('first')">
                            获取验证码
                        </div>
                        <div v-else class="send_code" ref="partOne">
                            {{codeCount}} s
                        </div>
                    </div>
                    <div class="password" v-else @click="showIphoneTip = false">
                        <img src="@/assets/imgs/appointment/lock_logo.png" alt="">
                        <input   class="password_input inputLogin" type="tel" maxlength="0"
                               v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')"
                               placeholder="请输入验证码">
                        <div   class="send_code send_code_part" >
                            获取验证码
                        </div>
                    </div>
                    <button @click="smsVerifySubmit()" class="activityStart" v-show="showButton">立即预约</button>
                    <button class="activityEnd" v-show="!showButton">12月12日 0点开放预约</button>
                </div>
            </div>

            <div class="content_part_five" v-show="loginSuccess" @click="showIphoneTip = false">
                <div class="five_success">
                    <h3>{{proposerPhone | toInt}}已成功预约</h3>
                    <p>投保时，请将此手机号作为投保人手机号使用。</p>
                </div>
                <button @click="showAllShare">分享给朋友</button>
            </div>

            <div class="content_part_four" @click="showIphoneTip = false">
                <div class="part_four_01"  >
                    <div class="part_four_01_des" >
                        <img src="@/assets/imgs/appointment/rule_title.png" class="rule_title" />
                        <div v-show="showMoreRule">
                            <p><b>一、活动说明</b></p>
                            <p>1、投保人在2020年1月1日至2020年1月31日期间完成指定产品的投保下单，并最终承保成功，即有机会获得口腔健康服务一次</p>
                            <p>2、如在2019年12月12日至2019年12月31日期间完成预约，并在活动期内使用预约手机号完成投保，还可额外获得体检服务一次。</p>
                            <div class="showBottom" @click="showMoreRule = false">查看更多规则<img
                                src="@/assets/imgs/appointment/showBottom.png" alt=""></div>
                        </div>
                        <div v-show="!showMoreRule">
                                <p><b>一、活动说明</b></p>
                                <p>1、投保人在2020年1月1日至2020年1月31日期间完成指定产品的投保下单，并最终承保成功，即有机会获得口腔健康服务一次</p>
                                <p>2、如在2019年12月12日至2019年12月31日期间完成预约，并在活动期内使用预约手机号完成投保，还可额外获得体检服务一次。</p>
                                <p><b>二、活动指定产品及保单要求</b></p>
                                <p v-if="isNew === 2">指定产品：百年人寿超倍保重疾险</p>
                                <p v-else-if="isNew === 1" >指定产品：百年人寿康惠保重疾险（2020版）</p>
                                <p v-else>指定产品：百年人寿康惠保重疾险（2020版）、百年人寿超倍保重疾险</p>
                                <p>保单规则：保障期限为终身且承保成功的保单。</p>
                                <p><b>三、服务说明</b></p>
                                <p>1、体检服务</p>
                                <p>2、口腔健康服务</p>
                                <p>以上服务由知名机构提供并负责后续服务。</p>
                                <p><b>四、服务发放规则</b></p>
                                <p>1、活动期间，同一设备、手机号、身份信息注册的不同账户，视为同一账户</p>
                                <p>2、同一投保人为同一被保人投多个承保成功保单，仅首张承保成功保单可享受服务。如首张保单发生退保，则服务顺延至第二张承保成功保单</p>
                                <p>3、多个投保人为同一被保人投保，则按投保下单的先后顺序，仅最早投保下单的保单可享受服务。如该保单退保则服务按投保下单的先后顺序顺延至第二个保单</p>
                                <p>4、活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实施网络攻击等）参与本次活动的用户，百年人寿保险公司有权终止其参与活动并回收所有奖品</p>
                                <p>5、服务发放时间：2020年2月20日至2020年3月31日，请关注百年人寿发送的手机短信以免错过领取信息。</p>
                                <p><b>五、特殊情况说明</b></p>
                                <p>如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，百年人寿可立即暂停、中止或终止活动。</p>

                                <p class="showBottom showBottomTop" @click="showMoreRule = true">收起<img
                                    src="@/assets/imgs/appointment/hideTop.png" alt=""></p>
                            </div>

                    </div>
                    <img src="@/assets/imgs/appointment/rule_bottom.png" alt="" class="rule_bottom"></div>
                </div>
            <p class="content_bottom">*活动最终解释权归百年人寿所有</p>
            </div>
        <div :class="showBgMongolia?'bg_mongolia':'hide_mongolia'" @touchmove.prevent>

            <img src="@/assets/imgs/appointment/sharePic01.png" class="sharePic01" />
            <img src="@/assets/imgs/appointment/sharePic02.png" class="sharePic02" v-show="!isSmallProgram"/>
            <img src="@/assets/imgs/appointment/sharePic04.png" class="sharePic04" v-show="isSmallProgram"/>
            <div class="know_hide" @click="hide_know()">
                <img src="@/assets/imgs/appointment/sharePic03.png" class="sharePic03" />
            </div>

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
                       type="text" v-model="smsCodeDialog.code" maxlength="4" placeholder="请输入图形验证码"   >
            </p>
        </md-dialog>

        <md-landscape v-model="showLand" :mask-closable="false" class="showMyLand">
            <div class="dialogSuccess">
                <p>{{proposerPhone | toInt}}已预约过</p>
                <div class="btn_box">
                    <button class="btn_one" @click="showAllShare">分享给朋友</button>
                    <button class="btn_two" @click="showLand = false">我知道了</button>
                </div>
            </div>
        </md-landscape>
        <md-landscape v-model="showScreenShot" :mask-closable="true" class="showMyLand">
            <div class="screenShot">
                     <h2>如何分享?</h2>
                <p>第一步：截图并保存到相册</p>
                <p>第二步：通过微信将保存的图片发送给好友</p>
                <div style="width: 100%">
                    <button @click="goScreen">去截图</button>
                </div>
            </div>
        </md-landscape>
    </section>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import img01 from '@/assets/imgs/appointment/product_01.png'
    import img02 from '@/assets/imgs/appointment/product_02.png'

    export default {
        name: "Appointment",
        data() {
            return {
                dataURL: '',
                firstFlag: true,
                proList01: [
                    {
                        imgUrl: img01,
                        title: '康惠保重疾险（2020版）',
                        des: '重疾超级魔方 责任组合DIY',
                        url: '/activity/appointment/AppointmentPro02.html'
                    },
                    {
                        imgUrl: img02,
                        title: '超倍保重疾险',
                        des: '多次赔付 超倍保护',
                        url: '/activity/appointment/AppointmentPro02.html?isTwo=1'
                    }
                ],
                proList02: [
                    {
                        imgUrl: img01,
                        title: '康惠保重疾险（2020版）',
                        des: '重疾超级魔方 责任组合DIY',
                        url: '/activity/appointment/AppointmentPro01.html'
                    }
                ],
                proList03: [
                    {
                        imgUrl: img02,
                        title: '超倍保重疾险',
                        des: '多次赔付 超倍保护',
                        url: '/activity/appointment/AppointmentPro02.html?isTwo=1'
                    }
                ],
                showLand: false,
                showMoreRule: true,
                proposerPhone: '',
                smsVerifyFirst: true,
                verificationCode: '',
                codeCount: '',
                codeTimer: null,
                codeShow: true,
                showSmsCode: true,
                isClickShow: false,
                accessToken: '',
                inviterCode: '',
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
                secondaryDistributor: '',
                shareUserCode: '',
                loginSuccess: false,
                allowInput: true,
                showPoster: false,
                thirdClassDistributor:'',
                options:{
                    title:'“金鼠送福”瓜分百万口腔健康服务。',
                    desc:'戳我一键预约>>'
                },
                shareImgUrl:require('../../assets/imgs/appointment/shareImg.png'),
                showEnvironment: 0,
                userCode:'',
                shareCount:0,
                showScreenShot:false,
                userToken:'',
                isLogin:false,
                showButton:false,
                showIphoneTip:false,
                isNew:0,
                showMoreProduct:false,
                proListAll:[],
                showBgMongolia:false,
                isAndroid:false,
                isIos:false,
                anonymousId:'',
                isSmallProgram:false
            }
        },
        created() {
            console.log(6);
            this.shareUserCode = this.$router.query("shareUserCode");
            this.isNew = Number(this.$router.query("isNew"))
            if(this.isNew === 1){   //只有一个康惠保 2020
                this.proListAll = this.proList02
            }else if(this.isNew === 2){  //只有一个超倍保
                this.proListAll = this.proList03
            }else{   //俩个产品
                this.proListAll = this.proList01
            }
            this.shareCount = Number(this.$router.query("s")) || 0;
            this.isLogin = sessionStorage.getItem('qrCode_user_token') || false
            this.proposerPhone = sessionStorage.getItem('qrCode_user_iphone') || ''
            this.secondaryDistributor = this.$router.query("secondaryDistributor");
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor");
            if(this.isLogin && this.isLogin !== ''){
                this.loginSuccess = true
            }
            if(this.$app.isBrowser()){
                this.$app.getCurrentToken((userToken)=>{
                    if(userToken && userToken !== ''){
                        this.judgeUser(userToken)
                    }
                })
            }
            var u = navigator.userAgent.toLowerCase()
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            this.options.href = location.href
            this.options.link = this.$router.siteUrl() + '/activity/Appointment.html?secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor + '&s=' + this.shareCount
            this.options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
            this.$app.wxShareDetail(this.options)
            this.getSysConfig()
            //增加匿名id获取
            sensors.quick('isReady',()=>{
                this.anonymousId = sensors.quick('getAnonymousID');
            });
        },
        mounted(){
            sensors.track("appointment_activity_cps", {
                secondaryDistributor:this.secondaryDistributor,
                thirdClassDistributor: this.thirdClassDistributor
            });
            var ua = window.navigator.userAgent.toLowerCase()
            if(this.$app.isBrowser()){
                this.showEnvironment = 0
            }else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                 if(this.$app.isMiniProgram()){  //小程序内
                     this.isSmallProgram = true
                 }else{
                     this.isSmallProgram = false
                 }
                this.showEnvironment = 1
            }else{
                this.showEnvironment = 2
            }
            this.options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
            console.log(this.options.imgUrl);
        },
        watch: {
            proposerPhone(newName, oldName) {
                console.log("------------",newName);
                console.log("=============",oldName);
                if(newName.length === 11){
                   this.showIphoneTip = false
                }
            }
            } ,
        methods: {
            getSysConfig(){
                this.$request({
                    url: `/config/list`,
                    params: {},
                    successFn: (data) => { //0--false  1--true
                        if(data.find((item)=>item.sysKey === 'IS_OPEN_KAIMENHONG').sysValue === '0'){
                            const targetDate = new Date('2019-12-12').getTime() || 1576080000000
                            if(new Date().getTime()  > targetDate){
                                this.showButton = true
                            }
                        }else{
                            this.showButton = true
                        }
                    },
                    failFn: () => {
                    }
                })
            },
            hide_know(){
                this.showBgMongolia = false
            },
            hideTipAll(e){
                console.log(e);
                 this.showIphoneTip = false
            },
            checkPhone(phone, e = null) {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
               if(phone.length > 2){
                   if (!myreg.test(phone)) {
                       Toast.failed("您输入的手机号格式不正确！");
                       return false;
                   } else {
                       return true;
                   }
               }else{
                   return false
               }
            },
            showTip(e){
                console.log(e);
                 e.stopPropagation()
                this.showIphoneTip = true
            },
            hideTip(e){
                if(e.keyCode === 13){
                    this.showIphoneTip = false
                }
            },
            judgeUser(userToken){
                this.$request({
                    url: `/act/actSubscribe/getSubscribeInfo`,
                    method: 'POST',
                    userToken:userToken,
                    isLoading: true,
                    isEncript: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                         if(data.isSubscribe === 'Y'){
                             this.loginSuccess = true
                             this.proposerPhone = data.mobile
                             this.userCode = data.userCode
                             sensors.login(data.userCode);
                         }
                    },
                    failFn: (data) => {
                    }
                })
            },
            goScreen(){
              location.href =  '/activity/ScreenShot.html'
            },
            /**
             * @author joe
             * @date 2019/12/5
             * @Description:
            */
            showAllShare(){
                this.options.href = location.href
                this.options.link = this.$router.siteUrl() + '/activity/Appointment.html?secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor + '&s=' + this.shareCount + '&shareUserCode=' + this.userCode
                this.options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(this.options)
                sessionStorage.setItem("qrCode_share", this.options.link)
                this.showLand = false
                if(this.showEnvironment === 0){  //app里
                    this.showShare()
                }else if(this.showEnvironment === 1){   //微信里
                    this.showBgMongolia = true
                    window.scrollTo(0,0)
                }else{
                    this.showScreenShot = true
                }
            },
            showShare(){

                setupWebViewJavascriptBridge((bridge)=> {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "shareActive",
                        {
                            share_data: '',
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            title: '', //标题
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url:  this.$router.siteUrl() + '/activity/Appointment.html?secondaryDistributor=CPS_00010009' + '&thirdClassDistributor=' + this.thirdClassDistributor + '&s=' + this.shareCount + '&shareUserCode=' + this.userCode, //分享跳转的url
                            share_title: this.options.title, //分享标题
                            share_text: this.options.desc, //分享描述
                            share_imgurl: this.options.imgUrl //分享图片地址
                        },
                        function (response) {
                            //alert(response,'');
                        }
                    );
                });
            },
            goDetail(item) {
                location.href = item.url
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

                sensors.track("click_send_vrf_code", {
                    register_scenario: '金鼠送福活动',
                });

                this.$request({
                    url: `/portal/sendSmsCode`,
                    method: 'POST',
                    isLoading: true,
                    isEncript: true,
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
            smsVerifyCode() {
                this.smsCodeDialog.randomStr = (new Date()).getTime()
                this.smsCodeDialog.img = this.$router.serverUrl() + '/code/' + this.smsCodeDialog.randomStr
                this.smsCodeDialog.open = true
                if(this.isIos){
                    window.scrollTo(0,0)
                }
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
                /*  if (this.showTeamActivity) {
                      this.smsVerifySubmitRegister()
                  } else {
                      this.smsVerifySubmit()
                  }*/

                this.smsVerifySend("code")
            },
            smsVerifySubmit() {
              // this.backTop()
                if (this.proposerPhone === '') {
                    Toast.info('手机号不可为空')
                    return false
                }
                if (this.verificationCode === '') {
                    Toast.info('验证码不可为空')
                    return false
                }
                /*if (!this.isClickShow) {
                    return false
                }*/

                let data = {
                    "anonymousId": this.anonymousId,
                    "imageCode": this.smsCodeDialog.code,
                    "mobile": this.proposerPhone,
                    "productId": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "secondaryDistributor": this.secondaryDistributor,
                    "thirdClassDistributor": this.thirdClassDistributor,
                    "shareUserCode": this.shareUserCode,
                    "smsCode": this.verificationCode,
                    "activityType": '11',
                    "shareCount": Number(this.shareCount)
                }

                sensors.track("click_sign_up", {
                    register_scenario: '金鼠送福活动',
                });

                this.$request({
                    url: '/act/actSubscribe/activitySubscribe',
                    method: 'POST',
                    data: data,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                        if (data.successFlag) {
                            this.shareCount =  Number(this.shareCount) + 1
                        }else{
                            this.showLand = true
                        }
                        this.loginSuccess = true
                        this.userCode = data.userCode
                        this.isLogin = true
                        sessionStorage.setItem("qrCode_user_token", this.isLogin)
                        sessionStorage.setItem("qrCode_user_iphone", this.proposerPhone)
                        sensors.login(data.userCode);
                    },
                    failFn: (data) => {
                            Toast.info(data.resultMsg)
                    }
                })
            },
            backTop() {
                window.scrollTo(0, 0);
            },
        },
        filters: {
            toInt(value) {
                return value.substr(0, 3) + '****' + value.substr(7, 4);
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        .bg_mongolia {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 300;
            .sharePic01{
                width: 388px;
                height: 65px;
                position: fixed;
                top: 95px;
                left: 63px ;
            }
            .sharePic02{
                width: 219px;
                height: 144px;
                position: fixed;
                right: 10%;
                top: 0;
            }
            .sharePic04{
                width: 178px;
                height: 144px;
                position: fixed;
                right: 16%;
                top: 0;
            }
            .know_hide{
                position: fixed;
                top: 224px;
                left: 50%;
                margin-left: -126px;
                width:253px;
                height:103px;
                border:1px solid rgba(255,255,255,1);
                border-radius:50%;
                display: flex;
                align-items: center;
                justify-content: center;
                .sharePic03{
                    width: 124px;
                    height: 34px;
                }
            }
        }
        .hide_mongolia{
            display: none;
        }
        .content_top {
            position: relative;
            background: url("../../assets/imgs/appointment/bg_top01.png");
            background-size: 100% 100%;
            z-index: 10;
            height: 1058px;
            width: 100%;

            .bg_top_02 {
                position: absolute;
                width: 473px;
                height: 327px;
                left: 50%;
                margin-left: -236px;
                top: 16px;
                z-index: 22;
            }
        }

        .content_part_one {
            width: 664px;
            padding-top: 12.5rem;
            z-index: 30;
            margin: 0rem auto 0;

            .part_one {
                background: url("../../assets/imgs/appointment/pic01.png") no-repeat;
                background-size: 100% 100%;
                margin: 10px auto 0;
                width: 664px;
                height: 270px;
                position: relative;
            }

            .part_one_title {
                text-align: right;
                font-size: 18px;
                color: #FFC494;
            }

            .part_one_description {
                position: absolute;
                left: 44px;
                top: 1.5rem;

                .part_one_description_01 {
                    font-size: 34px;
                    font-weight: bold;
                    color: #fff;
                }

                .part_one_description_02 {
                    font-size: 34px;
                    font-weight: bold;
                    color: #FFDEA5;
                    margin-top: 12px;
                }
            }
        }

        .content_part_two {
            margin: 30px auto 0;
            width: 664px;
            height: 602px;
            background: url("../../assets/imgs/appointment/pic02.png");
            background-size: 100% 100%;
            position: relative;
        }
        .content_part_two_new {
            margin: 30px auto 0;
            width: 664px;
            height: 466px;
            background: url("../../assets/imgs/appointment/pic02New.png");
            background-size: 100% 100%;
            position: relative;
        }
        .partTwoDescription {
            position: absolute;
            left: 44px;
            top: 1.5rem;

            .part_two_description_01 {
                font-size: 34px;
                color: #fff;
                font-weight: bold;
            }

            .part_two_description_02 {
                font-size: 34px;
                font-weight: bold;
                color: #FFDEA5;
                margin-top: 12px;
            }
        }

        .imgRight {
            position: absolute;
            width: 144px;
            height: 144px;
            right: 0.45rem;
            top: 1.2rem;
        }

        .product_detail01 {
            padding-top: 3.4rem;
            padding-left: 44px;

            .productPic {
                width: 196px;
                height: 132px;
                display: inline-block;
            }

            .particular {
                margin-top: 27px;
            }

            .proList {
                margin-top: .3rem;
            }

            .product01 {
                width: 5rem;
                position: absolute;
                display: inline-block;
                margin-left: 23px;
                overflow: hidden;

                .product_title {
                    font-size: 32px;
                    color: #FFDEA5;
                    font-weight: bold;
                }

                .product_description {
                    font-size: 28px;
                    margin-top: 9px;
                    color: #FFDEA5;
                }

                a {
                    margin-top: .1rem;
                    display: inline-block;
                    text-align: center;
                    line-height: .64rem;
                    border-radius: 10px;
                    width: 148px;
                    float: right;
                    margin-right: .3rem;
                    height: 46px;
                    color: #FFDEA5;
                    font-size: 26px;
                    border: 1px solid #FFDEA5;
                }
            }
        }
        .content_part_three {
            background: url("../../assets/imgs/appointment/pic03.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            margin: 37px auto 0;
            width: 664px;
            height: 486px;

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
                .activityEnd{
                    color: #7F5454;
                    background: linear-gradient(top, #EFCD92, #CCA050);
                    background: -webkit-linear-gradient(top, #EFCD92, #CCA050);
                    box-shadow: 0 0.05rem 0 #90733E;
                }
                .activityStart{
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

        }

        .content_part_four {
            width: 656px;
            margin: 1rem auto 24px;
            position: relative;
            .rule_title{
                position: absolute;
                top: -1.8rem;
                width: 373px;
                height: 101px;
                left: 50%;
                margin-left: -186.5px;
            }
            .rule_bottom{
                position: absolute;
                bottom: 0;
                z-index: 20;
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            .smallTip {
                margin-left: 44px;
                font-size: 26px;
                color: #FFD893;
            }

            .part_four_01_des {
                padding-left: 45px;
                padding-right: 38px;
                font-size: 26px;
                position: relative;
                z-index: 150;
            }


            .part_four_01 {
                background: #D62221;
                outline: none;
                box-shadow: 0 0 0 4px #FFD893;
                margin-top: 38px;
                font-size: 28px;
                color: #FFD893;
                line-height: 42px;
                border-radius: 20px;
                padding-bottom: 39px ;
                padding-top: 1.2rem;
            }

            .showBottom {
                text-align: center;
                margin: 44px auto 0;
                line-height: .3rem;
                img {
                    width: 31px;
                    height: 20px;
                    display: inline-block;
                    margin-left: 10px;
                }
            }

            .showBottomTop {
                margin-top: .8rem !important;
            }
        }

        .content_part_five {
            background: url("../../assets/imgs/appointment/pic04.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            margin: 37px auto 0;
            width: 664px;
            height: 464px;

            .five_success {
                position: absolute;
                width: 454px;
                left: 50%;
                top: 1rem;
                transform: translateX(-50%);

                h3 {
                    text-align: center;
                    font-size: 38px;
                    color: #FFD893;
                }

                p {
                    margin-top: 54px;
                    font-size: 30px;
                    color: #FFD893;
                    line-height: 36px;
                }
            }

            button {
                width: 388px;
                height: 88px;
                position: absolute;
                left: 50%;
                top: 4rem;
                margin-left: -194px;
                background: linear-gradient(top, rgba(32, 220, 125, 1),rgba(49, 191, 78, 1));
                background: -webkit-linear-gradient(top, rgba(32, 220, 125, 1),rgba(49, 191, 78, 1));
                border-radius: 44px;
                font-size: 36px;
                font-family: Lantinghei SC;
                font-weight: 600;
                color: rgba(243, 254, 252, 1);
            }
        }


        .product_des {
            margin-top: 0.25rem;
            font-size: 26px;
            color: #FFDEA5;
            float: left;
        }

        .dialogSuccess {
            width: 540px;
            height: 422px;
            background: #fff;
            border-radius: 16px;
            padding-top: 68px;

            p {
                text-align: center;
                font-size: 35px;
            }

            button {
                width: 388px;
                height: 88px;
                color: #fff;
                font-size: 36px;
                line-height: 88px;
                text-align: center;
                margin-top: 35px;
                border-radius: 44px;
            }

            .btn_one {
                background: linear-gradient(top,  rgba(32, 220, 125, 1),rgba(49, 191, 78, 1));
                background: -webkit-linear-gradient(top, rgba(32, 220, 125, 1),rgba(49, 191, 78, 1));
            }

            .btn_two {
                background: linear-gradient(top,  rgba(255, 216, 147, 1),rgba(255, 186, 64, 1));
                background: -webkit-linear-gradient(top,  rgba(255, 216, 147, 1),rgba(255, 186, 64, 1));
            }

            .btn_box {
                margin-top: 35px;
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        }

        .poster {
            width: 654px;
            padding-top: 17px;
            padding-bottom: 34px;
            height: 873px;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;

            img {
                margin: 0 auto;
            }

            .pic01 {
                height: 564px;
                width: 618px;
            }

            .pic02 {
                width: 266px;
                height: 266px;
                margin-top: 44px;
            }

            p {
                text-align: center;
                font-size: 26px;
                color: #333;
                display: inline-block;
                float: right;
                margin-right: .5rem;
                margin-top: -1rem;
            }
        }

        .savePoster {
            width: 526px;
            height: 88px;
            background: linear-gradient(top, rgba(32, 220, 125, 1), rgba(49, 191, 78, 1));
            background: -webkit-linear-gradient(top, rgba(32, 220, 125, 1), rgba(49, 191, 78, 1));
            border-radius: 44px;
            display: inline-block;
            margin: 45px auto 0;
            font-size: 36px;
            line-height: 88px;
            font-family: Lantinghei SC;
            color: rgba(255, 255, 255, 1);
        }

        .savePoster_btn {
            width: 100%;
            display: flex;
        }

        .screenShot{
            width: 540px;
            height: 483px;
            background: #fff;
            border-radius: 16px;
            h2{
                padding-top: 55px;
                padding-bottom: 20px;
                font-size: 38px;
                text-align: center;
                font-weight:600;
                color: #333333;
            }
            p{
                max-width:414px ;
                color: #333;
                margin:32px auto 0;
                font-size: 32px;
                font-weight:600;
            }
            button{
                display: block;
                margin: 59px auto 0;
                width: 388px;
                height: 88px;
                border-radius: 46px;
                font-size: 36px;
                color: #fff;
                background:linear-gradient(top,rgba(32,220,125,1),rgba(49,191,78,1));
                background:-webkit-linear-gradient(top,rgba(32,220,125,1),rgba(49,191,78,1));
            }
        }
        .content_bottom{
            width: 664px;
            margin: 0 auto 0;
            padding-bottom: 80px;
            padding-left: 1rem;
            font-size: 18px;
            color: #FFAA93;
        }
        .verificationSmallTip{
            position: absolute;
        }
        .iphoneTip:before{
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
        .iphoneTip{
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
    .send_code_part{
        color: #7F5454 !important;
        background: linear-gradient(top, #EFCD92, #CCA050) !important;
        background: -webkit-linear-gradient(top, #EFCD92, #CCA050)!important;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: #FFDEA5 !important;
        -webkit-box-shadow: 0 0 0px 1000px #D62221  inset !important;
        background-color:#D62221;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    }
</style>
<style>
    html, body {
        background: #B41D1C;
    }

    .showMyLand .md-landscape-content {
        width: 100% !important;
    }

    .inputLogin::-webkit-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-moz-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-ms-input-placeholder {
        color: #FFD893;
    }

    .showMyLand .md-icon-close:before {
        content: '' !important;
    }
    input,textarea {
        -webkit-appearance: none; /* 方法2 */
    }
</style>
