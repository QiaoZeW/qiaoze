<template>
    <div class="content">
        <img src="@/assets/imgs/headlinesPic/bg01.png" class="bgPartOne"/>
        <div class="bgPartTwo">
            <div class="rule">
                <span @click="openRule">活动规则></span>
            </div>
            <img src="@/assets/imgs/invitaion/bgPartTwo.png"/>
        </div>

        <div class="myField">
            <div class="proposerPhone">
                <img src="@/assets/imgs/invitaion/phone.png" class="phone"/>
                <input type="tel" maxlength="11" v-model="proposerPhone" oninput="value=value.replace(/[^\d]/g,'')"
                       @blur="backTop" placeholder="请输入您的手机号">

            </div>
            <div v-if="showSmsCode" class="verificationCode">
                <img src="@/assets/imgs/invitaion/lock.png" class="lock"/>
                <input type="tel" maxlength="0" v-model="verificationCode" @click="showTip"
                       oninput="value=value.replace(/[^\d]/g,'')"
                       placeholder="请输入验证码">
                <a v-if="codeShow" class="getCode partOne" ref="partOne" @click="smsVerifySend('first')">
                    获取验证码
                </a>
                <div v-else class="getCode partOne" ref="partOne">
                    {{codeCount}} s
                </div>
            </div>

            <div v-else class="verificationCode">
                <img src="@/assets/imgs/invitaion/lock.png" class="lock"/>
                <input type="tel" maxlength="6" v-model="verificationCode" oninput="value=value.replace(/[^\d]/g,'')"
                       @blur="backTop" placeholder="请输入验证码">
                <a v-if="codeShow" class="getCode partOne" ref="partOne" @click="smsVerifySend('first')">
                    获取验证码
                </a>
                <div v-else class="getCode partOne" ref="partOne">
                    {{codeCount}} s
                </div>
            </div>
            <a class="btnConfirm part1" @click="smsVerifySubmit()">
                <p>免费领取</p>
            </a>
        </div>

        <img src="@/assets/imgs/headlinesPic/bg02.png" class="bgBottom"/>
        <div class="activityDescribe">
            ©百年人寿保险股份有限公司版权所有 <br> 辽ICP备09014139号-1 <br>全国客服热线：95542
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
                       type="text" v-model="smsCodeDialog.code" maxlength="4" placeholder="请输入图形验证码" @blur="backTop">
            </p>
        </md-dialog>
        <md-landscape v-model="showPic" class="myLandScape01">
            <div class="ruleDescribe">
                <div class="title01">活动规则</div>
                <div class="title02">
                    <p>一、活动对象：</p>
                    <p>注册百年人寿APP的新用户</p>
                    <p>二、活动时间：</p>
                    <p>2020年1月1日至2020年3月31日</p>
                    <p>三、活动规则：</p>
                    <p>①活动期间，注册的新用户可以通过下载百年人寿APP，完成6个任务，获得相应的百佳豆，用于兑换活动页面中的礼包。</p>
                    <p>②一个手机号仅可获得5次免费领取资格。</p>
                    <p>③免费名额仅限本账号使用，不得转让、出售，或用于牟利等目的，否则本公司有权追回兑换礼品</p>
                    <p>四、花果学堂儿童免费课程领取规则：</p>
                    <p>①活动期间注册用户可以领取花果学堂免费提供的百年人寿用户专享礼包。</p>
                    <p>②领取路径：【注册花果】-【领取优惠券】-【百年人寿VIP兑换区】-【兑换课程】</p>
                    <p>五、印鸽免费券码领取规则：</p>
                    <p>1.通过链接进入活动页面-点击领取弹出的优惠券，跳转商品下单即可（已领取的券可在底栏优惠券处查看）。</p>
                    <p>2.每人每日可领取1次优惠券，优惠券自领取后15天内有效。</p>
                    <p>3.免费权益商品邮费需自理，全店满18元包邮。</p>
                    <p>4.除特殊注明外，本优惠不能与其他优惠同时享受。</p>
                    <p>5.权益由杭州印鸽科技有限公司提供，如有疑问请在小程序联系客服。</p>
                    <p>客服热线：0571-56331516</p>
                    <p>在线时间：周一到周日（节假日除外） </p>
                    <span class="particular">上午9：00-晚上21：00</span>
                    <p>本活动解释权归百年人寿所有</p>
                </div>
            </div>
        </md-landscape>

    </div>
</template>

<script>
    import {Dialog, Toast, Landscape} from 'mand-mobile'
    import {debounce} from '../../utils/utils'

    export default {
        name: "ExternalLogin",
        components: {
            [Dialog.name]: Dialog,
            [Landscape.name]: Landscape,
        },
        data() {
            return {
                anonymousId: '',//神測匿名id
                docuHeight: document.documentElement.clientHeight,  //默认屏幕高度
                showHeight: document.documentElement.clientHeight,   //实时屏幕高度
                proposerPhone: '',
                smsVerifyFirst: true,
                verificationCode: '',
                codeCount: '',
                codeTimer: null,
                codeShow: true,
                showSmsCode: true,
                isClickShow: false,
                showPic: false,
                accessToken: '',
                inviterCode: '',
                imgUrls: require('@/assets/imgs/invitaion/wxshare1.png'),
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
                options: {
                    href: '',
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: ''
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
                showOld: true,
                showTeamActivity: false,
                secondaryDistributor:''
            }
        },
        created() {
            this.smsVerifySubmit = debounce(this.smsVerifySubmit, 300)
            this.inviterCode = this.$router.query('inviterCode')
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || ''
            window.localStorage.setItem('secondaryDistributor',this.secondaryDistributor)
            const targetDate = new Date('2019-10-1').getTime() || 1569859200000
            if (new Date().getTime() > targetDate) {
                this.showOld = false
            }
            //this.shareDetail()
            document.title = '新人注册有礼'
            this.options.href = location.href
            this.options.title = '百年人寿官方app上线'
            this.options.desc = '免费领价值百元礼包'
            this.options.link = this.$router.siteUrl() + '/activity/InvitationShare.html'
            this.options.imgUrl = this.$router.siteUrl() + this.imgUrls
            this.$app.wxShareDetail(this.options)
            //神測匿名id獲取
            let _this = this
            sensors.quick('isReady', function () {
                _this.anonymousId = sensors.quick('getAnonymousID');
                console.log('1', _this.anonymousId);
            });
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload()
                }
            }, false);
        },
        methods: {
            checkPhone(phone) {
                this.backTop()
                if (phone.length !== 11) {
                    Toast.failed('您输入的手机号位数不正确！')
                    return false;
                }
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    Toast.failed('您输入的手机号格式不正确！')
                    return false;
                } else {
                    return true
                }
            },
            openRule() {
                this.showPic = true
            },
            backTop() {
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                console.log(scrollHeight);
                window.scrollTo(0, 0);
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
                let result = this.checkPhone(this.proposerPhone)
                if(!result){
                    Toast.info('您的手机格式不正确')
                    return false
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
                this.smsVerifySend("code")
            },
            smsVerifySubmit() {
                this.backTop()
                if (this.proposerPhone === '') {
                    Toast.info('手机号不可为空')
                    return false
                }
                let result = this.checkPhone(this.proposerPhone)
                if(!result){
                    Toast.info('您的手机格式不正确')
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
                    "deviceNo": (new Date()).getTime(),
                    "fastFlag": true,
                    "imageCode": this.smsCodeDialog.code,
                    "inviterCode": this.inviterCode,
                    "password": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "smsCode": this.verificationCode,
                    "userName": this.proposerPhone,
                    "anonymousId": this.anonymousId,
                    "activityType": '09'
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
                        location.href = '/activity/HeadLinesLanding.html?quickJump=1'
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
    .bgBottom {
        width: 690px;
        height: 976px;
        margin: 1.8rem auto 0;
    }

    .myField {
        position: absolute;
        width: 100%;
        top: 7.9rem;
    }

    .parNum {
        color: #fff;
        font-size: 26px;
        margin-left: 1rem;
        margin-top: 40px;
    }

    .content {
        background: #CE2833;
        width: 100%;
        min-height: 100%;
        background-attachment: fixed;
        .bgPartTwo {
            img {
                margin: 0 auto;
            }
        }

    }

    .getCode {
        top: -0.03rem;
        right: 0;
        width: 2.44rem;
        background: #D02A2A;
        color: #fff;
        height: 1.235rem;
        position: absolute;
        font-size: 28px;
        text-align: center;
        line-height: 1.2rem;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        z-index: 1000 !important;
    }

    .partTwo {
        color: #333;
        border: 1px solid #333;
    }

    .btnConfirm {
        width: 100%;
        height: 88px;
    }

    .btnConfirm p {
        width: 570px;
        z-index: 100 !important;
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        margin: 0 auto;
        text-align: center;
        color: #D02A2A;
        margin-top: 48px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background: #FFD9B4;

    }

    .part2 {
        color: #fff;
        border: 2px solid #E10312;
        background: #E10312;
    }

    .bottomPhone {
        color: #333333;
        font-size: 24px;
        z-index: 5;
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 60px;
        span {
            color: #E10312;
        }
    }

    .proposerPhone {
        input {
            width: 5rem;
            height: .95rem;
            padding: .1rem 0 .1rem;
            margin-left: 1rem;
            font-size: .36rem !important;
            z-index: 100;
        }
    }

    .proposerPhone, .verificationCode {
        display: block;
        z-index: 1000;
        position: relative;
        //margin: 1rem auto 0;
        width: 570px;
        height: 88px;
        border: 1px solid #D02A34;
        margin: 0 auto;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }

    ::-webkit-input-placeholder {
        color: #8e8e8e;
        font-size: 22px !important;
    }

    .verificationCode {
        margin-top: 36px;
        input {
            background: #fff;
            font-size: .36rem !important;
            height: .95rem;
            padding: .1rem 0 .1rem;
            margin-left: 1rem;
            width: 5rem;
            z-index: 100;
        }
    }

    .bgPartOne {
        height: 884px;
        width: 100%;
    }

    .bgPartTwo {
        position: absolute;
        top: 6.4rem;
        width: 100%;
        margin: 0 auto;
        img {
            width: 690px;
            height: 438px;
        }
    }

    .phone, .lock {
        width: 27px;
        position: absolute;
        top: .3rem;
        left: .3rem;
    }

    .phone {
        height: 40px;
    }

    .lock {
        height: 30px;
    }

    .parT {
        font-size: 24px;
        text-align: center;
        -webkit-appearance: none;
        -webkit-text-fill-color: #111a34;
        border: none;
        border-bottom: 1px solid #000;
        height: 1rem;
        width: 5rem;
    }

    .dialogContent {
        text-align: center;
    }

    .picOne {
        width: 520px;
        height: 664px;
        margin-left: .2rem;
    }

    .verification {
        padding-bottom: 42px;
    }

    .goVerification {
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
        background: linear-gradient(to right, #ff903a, #ff3f32);
    }

    .contOne {
        position: absolute;
        top: 6rem;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

    .parS {
        text-align: center;
        color: #333333;
        font-size: 32px;
    }

    .rule {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 32px;
        span {
            margin-right: .7rem;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(253, 206, 162, 1);
            line-height: 30px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(253, 206, 162, 1);
        }
    }

    .activityDescribe {
        text-align: center;
        width: 100%;
        margin-top: 34px;
        padding-bottom: 54px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 230, 230, 1);
        line-height: 36px;
    }

    .ruleDescribe {
        background: #fff;
        width: 690px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        padding-bottom: .1rem;
        .title01 {
            height: 100px;
            background: #D02A2A;
            text-align: center;
            line-height: 100px;
            font-size: 36px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
        }
        .title02 {
            padding: 0 42px 0;
            margin-top: 36px;
            margin-bottom: 36px;
            max-height: 8rem;
            overflow-y: scroll;
            p {
                line-height: 40px;
            }
        }
        .particular {
            display: inline-block;
            width: 100%;
            text-indent: 5em;
        }
    }
</style>
<style lang="scss">
    .myLandScape01 {
        .md-popup-box {
            width: 690px;
        }
        .md-landscape-content {
            width: 690px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
    }
</style>
