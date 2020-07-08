<template>
    <div class="content">
        <img class="tbanner" src="../../assets/imgs/ouRegist/tbanner.png" alt="">
        <div class="myField">
            <div  class="proposerPhone"  >
                <img src="../../assets/imgs/ouRegist/phone.png" class="phone"/>
                <input type="tel" maxlength="11"  v-model="proposerPhone"  oninput="value=value.replace(/[^\d]/g,'')" @blur="backTop" placeholder="请输入投保人手机号">
            </div>
            <div  v-if="showSmsCode" class="verificationCode"  >
                <img src="../../assets/imgs/ouRegist/lock.png" class="lock"/>
                <input type="tel" maxlength="0" v-model="verificationCode" @click="showTip" oninput="value=value.replace(/[^\d]/g,'')"
                       placeholder="请输入验证码">
                <div v-if="codeShow" class="getCode partOne" ref="partOne" @click="smsVerifySend('first')">
                    获取验证码
                </div>
                <div v-else class="getCode partOne" ref="partOne">
                    {{codeCount}} s
                </div>
            </div>

            <div  v-else  class="verificationCode" >
                <img src="../../assets/imgs/ouRegist/lock.png" class="lock"/>
                <input type="tel" maxlength="6" v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')" @blur="backTop" placeholder="请输入验证码">
                <div v-if="codeShow" class="getCode partOne" ref="partOne" @click="smsVerifySend('first')">
                    获取验证码
                </div>
                <div v-else class="getCode partOne" ref="partOne">
                    {{codeCount}} s
                </div>
            </div>
            <div class="btnConfirm part1"   @click="smsVerifySubmit()">
                <p>立即注册</p>
            </div>
        </div>



        <md-dialog
            :closable="true"
            v-model="smsCodeDialog.open"
            :btns="smsCodeDialog.btns"
        >
            <p style="width: 70%;margin:0 auto;margin-top:20px;"><img @click="smsVerifyCode" :src="smsCodeDialog.img"
                                                                      alt=""></p>
            <p style="margin-top:20px;text-align: center" id="pic">
                <input class="parT" @click="backTop"
                       type="text" v-model="smsCodeDialog.code"  maxlength="4" placeholder="请输入图形验证码"   @blur="backTop">
            </p>
        </md-dialog>

        <md-landscape
            :closable="true"
            v-model="newUser.open"
        >
            <img src="@/assets/imgs/groupBuying/picOne.png" class="picOne"/>
            <div class="contOne">
                <p class="parS">去百年人寿APP领百元礼包</p>
                <div class="verification  ">
                    <p class="goVerification" @click="goDownload" >领百元礼包</p>
                </div>
            </div>

        </md-landscape >
        <md-landscape
            :closable="true"
            v-model="noAssistance.open"
        ><img src="@/assets/imgs/groupBuying/picTwo.png" class="picOne"/>
            <div class="contOne">
                <div class="verification  ">
                    <p class="goVerification" @click="goDownload" >更多活动</p>
                </div>
            </div>
        </md-landscape>
        <md-landscape
            :closable="true"
            v-model="assistance.open"
        >
            <img src="@/assets/imgs/groupBuying/picThree.png" class="picOne"/>
            <div class="contOne">
                <div class="verification  ">
                    <p class="goVerification"  @click="goDownload">更多活动</p>
                </div>
            </div>
        </md-landscape>
        <div class="bgBottom">
            <img src="../../assets/imgs/ouRegist/btbanner.png"  class="bgBottom2" @click="goDownload()">
        </div>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    import { debounce} from  '../../utils/utils'
    export default {
        name: "ExternalLogin",
        components: {
            [Dialog.name]: Dialog,
        },
        data(){
            return {
                anonymousId:'',//神測匿名id
                docuHeight: document.documentElement.clientHeight,  //默认屏幕高度
                showHeight: document.documentElement.clientHeight,   //实时屏幕高度
                proposerPhone: '',
                smsVerifyFirst:true,
                verificationCode:'',
                codeCount: '',
                codeTimer: null,
                codeShow:true,
                showSmsCode:true,
                isClickShow:false,
                accessToken:'',
                inviterCode:'',
                imgUrls:require('@/assets/imgs/invitaion/wxshare1.png'),
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
                options:{
                    href:'',
                    title:'',
                    desc:'',
                    link:'',
                    imgUrl:''
                },
                newUser: {
                    open: false,
                },
                noAssistance: {
                    open: false,
                },
                assistance: {
                    open: false,
                },
                showOld:false,
            }
        },
        created(){
            this.smsVerifySubmit = debounce(this.smsVerifySubmit,300)
            this.smsVerifySubmitRegister = debounce(this.smsVerifySubmitRegister,300)
            this.inviterCode = this.$router.query('inviterCode')
            console.log(this);
            window.localStorage.clear()
            //this.shareDetail()
            document.title = '线上管理保单'
            this.options.href = location.href
            this.options.title = '百年人寿官方app上线'
            this.options.desc = '免费领价值百元礼包'
            this.options.link = this.$router.siteUrl() + '/activity/InvitationShare.html'
            this.options.imgUrl = this.$router.siteUrl() + this.imgUrls
            this.$app.wxShareDetail(this.options)
            //神測匿名id獲取
            let _this = this
            sensors.quick('isReady',function(){
                _this.anonymousId = sensors.quick('getAnonymousID');
                console.log( '1',_this.anonymousId);
            });
        },
        methods: {
            backTop() {
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                console.log(scrollHeight);
                window.scrollTo(0, 0);
            },
            shareDetail() {
                var that = this;
                var reg = new RegExp('&', "g");
                var urlStr = `/wx/config/getWxShareConfig?curUrl=${location.href}`.replace(reg, '-');
                this.$request({
                    url: urlStr,
                    successFn: data => {
                        wx.config({
                            debug: false,
                            appId: data.appId,
                            timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature, // 必填，签名
                            jsApiList: [ // 用的方法都要加进来
                                /*'updateTimelineShareData',*/ 'updateAppMessageShareData'
                            ]
                        });
                        wx.ready(function () {
                            /* wx.updateTimelineShareData({
                                 title: '百年人寿官方app上线', // 分享标题
                                 link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                 imgUrl: that.imgUrl, // 分享图标
                                 success: function () {
                                     // 用户确认分享后执行的回调函数
                                 },
                                 fail: function (res) {
                                 }
                             });*/
                            wx.updateAppMessageShareData({
                                title: '百年人寿官方app上线', // 分享标题
                                desc: '免费领价值百元礼包', // 分享描述
                                link: 'https://bnonlinesit.aeonlife.com.cn/activity/InvitationShare.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: that.$router.siteUrl() + that.imgUrls, // 分享图标
                                type: 'link', // 分享类型,music、video或link，不填默认为link
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                },
                                fail: function (res) {
                                }
                            });
                        });
                        wx.error(function (res) {
                            console.log("config信息验证失败")
                            // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                    },
                    errorFn: () => {
                    }
                });
            },
            showTip() {
                Toast({
                    content: '请先获取验证码'
                })
            },
            goDownload() {
                this.$app.downLoadApp()
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

                let data = {};
                data.userName = this.proposerPhone
                if (this.smsCodeDialog.code) {
                    data.imageCode = this.smsCodeDialog.code
                    data.randomStr = this.smsCodeDialog.randomStr
                }

                sensors.track("click_send_vrf_code", {
                    register_scenario: '注册有礼活动',
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
                // document.getElementById('pic').getElementsByTagName('input').focus();
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
            // smsVerifySubmitRegister() {
            //     this.backTop()
            //     if(this.proposerPhone === ''){
            //         Toast.info('手机号不可为空')
            //         return false
            //     }
            //     if(this.verificationCode === ''){
            //         Toast.info('验证码不可为空')
            //         return false
            //     }
            //     /*if (!this.isClickShow) {
            //         return false
            //     }*/
            //     let data = {
            //         "deviceNo": (new Date()).getTime(),
            //         "fastFlag": true,
            //         "imageCode": this.smsCodeDialog.code,
            //         "inviterCode": this.inviterCode,
            //         "password": "",
            //         "randomStr": this.smsCodeDialog.randomStr,
            //         "smsCode": this.verificationCode,
            //         "userName": this.proposerPhone,
            //         "anonymousId": this.anonymousId,
            //         "activityType": '03'
            //     }
            //
            //     sensors.track("click_sign_up", {
            //         register_scenario: '注册有礼活动',
            //     });
            //
            //     this.$request({
            //         url: '/portal/fast/register',
            //         method: 'POST',
            //         data: data,
            //         isLoading: true,
            //         contentType: 'application/json',
            //         successFn: (data) => {
            //             //成功后，调投保接口
            //             this.codeShow = true
            //             sensors.login(data.userCode);
            //             this.smsCodeDialog.open = false
            //             this.smsCodeDialog.code = ''
            //             this.isClickShow = false
            //             this.smsVerifyFirst = true
            //             if (data.teamStatus === "0") {
            //                 this.assistance.open = true
            //             } else if (data.teamStatus === "1") {
            //                 this.newUser.open = true
            //             } else if (data.teamStatus === "2") { //0-已加入别人的团，1-新用户参团成功，2-老用户参团成功
            //                 this.noAssistance.open = true
            //             }
            //         },
            //         failFn: (data) => {
            //             this.smsCodeDialog.code = ''
            //             this.codeShow = true
            //             this.smsVerifyFirst = true
            //             this.isClickShow = false
            //             if (data.resultCode === "SYS_ERROR_0037") {
            //                 Toast({
            //                     content: data.resultMsg,
            //                 })
            //                 this.smsVerifySubmitRegister()
            //                 return false
            //             } else if (data.resultCode === 'SYS_ERROR_003') {
            //                 Toast({
            //                     content: "图形验证码错误",
            //                 })
            //             } else {
            //                 Toast({
            //                     content: data.resultMsg,
            //                 })
            //             }
            //
            //
            //         }
            //     })
            // },
            smsVerifySubmit() {
                this.backTop()
                if(this.proposerPhone === ''){
                    Toast.info('手机号不可为空')
                    return false
                }
                if(this.verificationCode === ''){
                    Toast.info('验证码不可为空')
                    return false
                }
                /*if (!this.isClickShow) {
                    return false
                }*/
                let data = {
                    "deviceNo": (new Date()).getTime(),
                    "fastFlag": true,
                    "imageCode": this.smsCodeDialog.code,
                    "inviterCode": this.inviterCode,
                    "password": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "smsCode": this.verificationCode,
                    "userName": this.proposerPhone,
                    "anonymousId": this.anonymousId,
                    "activityType": '06'
                }

                sensors.track("click_sign_up", {
                    register_scenario: '注册有礼活动',
                });

                this.$request({
                    url: '/portal/fast/register',
                    method: 'POST',
                    data: data,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                        //成功后，调投保接口
                        this.codeShow = true
                        sensors.login(data.userCode);
                        this.smsCodeDialog.open = false
                        this.smsCodeDialog.code = ''
                        this.isClickShow = false
                        this.smsVerifyFirst = true
                        Toast({
                            content: '注册成功',
                        })
                        setTimeout(() => {
                            this.goDownload()
                        }, 2000)
                    },
                    failFn: (data) => {
                        this.smsCodeDialog.code = ''
                        this.codeShow = true
                        this.smsVerifyFirst = true
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
    .content{
        background: url("../../assets/imgs/ouRegist/bg.png") no-repeat #565a8f;
        background-size: 100%;
        padding-top: 36px;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
        .tbanner{
            width: 674px;
            margin:auto;
        }
    }
    .getCode{
        top: 10px;
        right: 10px;
        background:rgba(86,90,143,1);
        border-radius:45px;
        width:192px;
        height:71px;
        position: absolute;
        font-size:30px;
        text-align: center;
        line-height: 71px;
        z-index: 1000 !important;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .partTwo{
        color: #333;
        border: 1px solid #333;
    }
    .btnConfirm{
        width:628px;
        height:90px;
        background:rgba(176,183,211,1);
        border:1px solid rgba(218,218,218,1);
        border-radius:45px;
        font-size:40px;
        font-weight:500;
        color:rgba(86,90,143,1);
        line-height:90px;
        margin:15px auto;
    }
    .btnConfirm p{
        z-index:100 !important;
        margin: 0 auto ;
        text-align: center;
        font-size:40px;
        font-weight:500;
        color:rgba(86,90,143,1);
        line-height:90px;
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
        position: fixed;
        bottom: 60px;
        span{
            color: #E10312;
        }
    }
    .proposerPhone,.verificationCode{
        display: block;
        z-index: 1000;
        position: relative;
        //margin: 1rem auto 0;
        width: 628px;
        height: 90px;
        border:1px solid rgba(218,218,218,1);
        border-radius:45px;
        margin: 0 auto;
        background:rgba(242,242,242,1);
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        input{
            font-size: 30px !important;
            height: 100%;
            padding: 31px 29px;
            margin-left: 94px;
            width: 5rem;
            background:rgba(242,242,242,1);
            z-index: 100;
            box-sizing: border-box;
            border-left:1px solid rgba(218,218,218,1);
            border-radius: 0;
        }
    }
    ::-webkit-input-placeholder {
        color:rgba(0,0,0,1);
        font-size: 30px !important;
        opacity:0.5;
    }
    .verificationCode{
        margin-top: 15px;
    }
    .bgPartOne{
        height: 884px;
        width: 100%;
    }
    .phone {
        width: 29px;
        position: absolute;
        top: 24px;
        left: 37px;
    }
    .lock {
        width: 37px;
        position: absolute;
        top: 21px;
        left: 33px;
    }
    .bgBottom{
        width: 100%;
    }
    .bgBottom2{
        margin: 0 auto;
        width: 633px;
        margin-top: 40px;
    }
    .parT{
        font-size:24px;text-align:center;
        -webkit-appearance:none;-webkit-text-fill-color:#111a34;
        border:none;border-bottom:1px solid #000;
        height: 1rem;
        width: 5rem;
    }
    .dialogContent{
        text-align: center;
    }
    .picOne{
        width: 520px;
        height: 664px;
        margin-left: .2rem;
    }
    .verification{
        padding-bottom:42px;
    }
    .goVerification{
        width: 360px;
        height: 88px;
        line-height: 88px;
        margin: 48px auto 0;
        font-size: 32px;
        color: #fff;
        text-align: center;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background: linear-gradient(to right,#ff903a,#ff3f32);
    }
    .contOne{
        position: absolute;
        top: 6rem;
        width: 100%;
        left: 50%;
        transform :translateX(-50%);
    }
    .parS{
        text-align: center;
        color: #333333;
        font-size: 32px;
    }
</style>
