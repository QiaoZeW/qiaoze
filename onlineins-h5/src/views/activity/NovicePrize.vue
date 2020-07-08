<template>
    <div>
        <div class="content_01" v-if="openContent === 1" >
            <img src="@/assets/imgs/invitaion/newPic11.png" class="bgContent"/>
            <img src="@/assets/imgs/invitaion/question.png" @click="isPopupShow = true" class="question"/>
            <div class="content_body">
                <div class="sectionPart">
                    <img src="@/assets/imgs/invitaion/giftTop.png"  class="giftTop"/>
                    <div class="particular">
                        <span class="taskOne">任务1</span> <span class="taskTwo">注册百年APP</span>
                        <p class="taskThree" v-if="userStatusRegister === 0" @click="goLogin">去登录</p>
                        <p class="taskThree" v-else-if="userStatusRegister === 1" @click="goRegister">去领100豆</p>
                        <p class="taskThree part" v-else-if="userStatusRegister === 2">已完成</p>
                    </div>
                    <div class="particular">
                        <span class="taskOne">任务2</span> <span class="taskTwo">领取成长礼包</span>
                        <p class="taskThree" v-if="userStatusVip === 0" @click="goLogin">去登录</p>
                        <p class="taskThree" v-else-if="userStatusVip === 1" @click="goVip">去领100豆</p>
                        <p class="taskThree part" v-else-if="userStatusVip === 2">已完成</p>
                    </div>
                    <div class="particular">
                        <span class="taskOne">任务3</span> <span class="taskTwo">天天走路嬴百佳豆</span>
                        <p class="taskThree" v-if="!isLoginFlag" @click="goLogin">去登录</p>
                        <p class="taskThree" v-else @click="goStep">去参加</p>
                    </div>
                    <div class="particular" v-for="(item,index) in taskList">
                        <span class="taskOne">任务{{index + 4}}</span> <span class="taskTwo">{{item.taskTitle}}</span>
                        <p class="taskThree" v-if="!isLoginFlag" @click="goLogin">去登录</p>
                        <p class="taskThree" v-else-if="item.taskStatus === '1'" @click="goReceive(item)">
                            立即领取</p>
                        <p class="taskThree" v-else-if="item.taskStatus === '2'" @click="goCompleteTask(item)">
                            去领{{item.rewardScore}}豆</p>
                        <p class="taskThree part" v-else-if="item.taskStatus === '3'">已完成</p>
                    </div>

                </div>
                <div class="partBottom">
                    <ul>
                        <li v-for="item in picData"><img :src="item.imageUrl" @click="goDetail(item)"/></li>
                    </ul>
                </div>

                <p class="bottomTip">本活动最终解释权归百年人寿所有</p>
            </div>
            <md-popup
                v-model="isPopupShow"
                position="bottom"
            >

                <div class="ruleBottom">
                    <div class="md-example-popup md-example-popup-bottom myRuleBottom">
                        <i class="iconfont icon-guanbi myCloseIcon" @click="isPopupShow = false"></i>
                        <img src="@/assets/imgs/invitaion/ruleTop.png" class="ruleTop"/>

                        <p>   一、活动对象：<br>
                            注册百年人寿APP的新用户<br>
                            二、活动时间：<br>
                            2020年1月1日至2020年3月31日<br>
                            三、活动规则：<br>
                            ①活动期间，注册的新用户可以通过下载百年人寿
                            APP，完成6个任务，获得相应的百佳豆，用于兑换
                            活动页面中的礼包。<br>
                            ②一个手机号仅可获得5次免费领取资格。<br>
                            ③免费名额仅限本账号使用，不得转让、出售，或
                            用于牟利等目的，否则本公司有权追回兑换礼品<br>
                            四、花果学堂儿童免费课程领取规则：<br>
                            ①活动期间注册用户可以领取花果学堂免费提供的
                            百年人寿用户专享礼包。<br>
                            ②领取路径：【注册花果】-【领取优惠券】-【百
                            年人寿VIP兑换区】-【兑换课程】<br>
                            五、印鸽免费券码领取规则：<br>
                            1.通过链接进入活动页面-点击领取弹出的优惠券，
                            跳转商品下单即可（已领取的券可在底栏优惠券处
                            查看）。<br>
                            2.每人每日可领取1次优惠券，优惠券自领取后15天
                            内有效。<br>
                            3.免费权益商品邮费需自理，全店满18元包邮。<br>
                            4.除特殊注明外，本优惠不能与其他优惠同时享受。<br>
                            5.权益由杭州印鸽科技有限公司提供，如有疑问请在
                            小程序联系客服。<br>
                            客服热线：0571-56331516<br>
                            在线时间：周一到周日（节假日除外）<br>
                            上午9：00-晚上21：00</p>
                    </div>
                </div>
            </md-popup>
        </div>

        <div class="content_02" v-else-if="openContent === 2">
            <img v-if="showOld" src="@/assets/imgs/invitaion/newPic1.png" class="bgContent"/>
            <img  v-else src="@/assets/imgs/invitaion/newPic10.png" class="bgContent"/>
            <div class="bannerPart2">
                <img src="@/assets/imgs/invitaion/bannerPart2.png"/>
            </div>

            <div class="sectionPart">
                <div class="particular">
                    <span class="taskOne">任务1</span> <span class="taskTwo">注册百年APP</span>
                    <p class="taskThree" v-if="userStatusRegister === 0" @click="goLogin">去登录</p>
                    <p class="taskThree" v-else-if="userStatusRegister === 1" @click="goRegister">去领100豆</p>
                    <p class="taskThree part" v-else-if="userStatusRegister === 2">已完成</p>
                </div>
                <div class="particular">
                    <span class="taskOne">任务2</span> <span class="taskTwo">领取成长礼包</span>
                    <p class="taskThree" v-if="userStatusVip === 0" @click="goLogin">去登录</p>
                    <p class="taskThree" v-else-if="userStatusVip === 1" @click="goVip">去领100豆</p>
                    <p class="taskThree part" v-else-if="userStatusVip === 2">已完成</p>
                </div>
                <div>
                    <span class="taskOne">任务3</span> <span class="taskTwo">了解3个保险知识</span>
                    <p class="taskThree" v-if="userStatusGathering === 0" @click="goLogin">去登录</p>
                    <p class="taskThree" v-else-if="userStatusGathering === 1" @click="goGathering">去领100豆</p>
                    <p class="taskThree part" v-else-if="userStatusGathering === 2">已完成</p>
                </div>
            </div>
            <div class="partBottom">
                <ul>
                    <li v-for="item in picData"><img :src="item.imageUrl" @click="goDetail(item)"/></li>
                </ul>
            </div>
            <div class="contentBottom1">
                <p v-if="showOld">
                    一、活动对象：<br/>
                    2019年10月1日以后注册百年人寿APP的新用户<br/>
                    二、活动时间：<br/>
                    2019年10月1日至2019年10月31日<br/>
                    三、活动规则：<br/>
                    ①活动期间，注册的新用户可以通过下载百年人寿
                    APP，完成三个任务，获得300百佳豆，用于兑换
                    活动页面中的礼包。<br/>
                    ②一个手机号仅可获得5次免费领取资格。<br/>
                    ③免费名额仅限本账号使用，不得转让、出售，或
                    用于牟利等目的，否则本公司有权追回兑换礼品<br/>
                    四、花果学堂儿童免费课程领取规则：<br/>
                    ①活动期间注册用户可以领取花果学堂免费提供的
                    百年人寿用户专享礼包。<br/>
                    ②领取路径：【注册花果】-【领取优惠券】-【百
                    年人寿VIP兑换区】-【兑换课程】<br/>
                    五、印鸽免费券码领取规则：<br/>
                    ①进入活动页面-点击领取弹出的优惠券，
                    跳转商品下单即可（已领取的券可在底栏优惠券处
                    查看）。<br/>
                    ②每人每日可领取1次优惠券，优惠券自领取后15天
                    内有效。<br/>
                    ③免费权益商品邮费需自理，全店满18元包邮。<br/>
                    ④除特殊注明外，本优惠不能与其他优惠同时享受。<br/>
                    ⑤权益由杭州印鸽科技有限公司提供，如有疑问请在小程序联系客服。<br/>
                    客服热线：0571-56331516<br/>
                    在线时间：周一到周日（节假日除外）<br/>
                    <span class="parT">上午9：00-晚上21：00</span>

                </p>
                <p v-else>
                    一、活动对象：<br/>
                    2019年11月1日以后注册百年人寿APP的新用户<br/>
                    二、活动时间：<br/>
                    2019年11月1日至2020年2月29日<br/>
                    三、活动规则：<br/>
                    ①活动期间，注册的新用户可以通过下载百年人寿
                    APP，完成三个任务，获得300百佳豆，用于兑换
                    活动页面中的礼包。<br/>
                    ②一个手机号仅可获得5次免费领取资格。<br/>
                    ③免费名额仅限本账号使用，不得转让、出售，或
                    用于牟利等目的，否则本公司有权追回兑换礼品<br/>
                    四、花果学堂儿童免费课程领取规则：<br/>
                    ①活动期间注册用户可以领取花果学堂免费提供的
                    百年人寿用户专享礼包。<br/>
                    ②领取路径：【注册花果】-【领取优惠券】-【百
                    年人寿VIP兑换区】-【兑换课程】<br/>
                    五、印鸽免费券码领取规则：<br/>
                    ①进入活动页面-点击领取弹出的优惠券，
                    跳转商品下单即可（已领取的券可在底栏优惠券处
                    查看）。<br/>
                    ②每人每日可领取1次优惠券，优惠券自领取后15天
                    内有效。<br/>
                    ③免费权益商品邮费需自理，全店满18元包邮。<br/>
                    ④除特殊注明外，本优惠不能与其他优惠同时享受。<br/>
                    ⑤权益由杭州印鸽科技有限公司提供，如有疑问请在小程序联系客服。<br/>
                    客服热线：0571-56331516<br/>
                    在线时间：周一到周日（节假日除外）<br/>
                    <span class="parT">上午9：00-晚上21：00</span>
                </p>
            </div>
            <img src="@/assets/imgs/invitaion/newRule2.png"    class="rule"/>

            <p class="bottomTip">本活动最终解释权归百年人寿所有</p>
        </div>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import {goNative} from '@/utils/nativeUtils'

    export default {
        name: "NovicePrize",
        components: {
            [Toast.name]: Toast,
        },
        data() {
            return {
                userStatusRegister: 0,// 0---未登录  1----已经登录未领取  2---已领取      任务一
                userStatusVip: 0,// 0---未登录  1----已经登录未领取  2---已领取      任务二
                userStatusGathering: 0, // 0---未登录  1----已经登录未领取  2---已领取      任务三
                rank: 0,
                picData: [],
                showClick: null,
                showOld: false,
                shareImg: require("@/assets/imgs/invitaion/wxshare1.png"),
                taskList: [],
                isLoginFlag: false,
                isPopupShow: false,
                openContent:0
            }
        },
        created() {
            const targetDate = new Date('2020/1/1').getTime() || 1577808000000
            if (new Date().getTime() > targetDate) {
                this.openContent = 1
            }else{
                this.openContent = 2
            }
            document.title = '新人达标有好礼'
            let _this = this
            setupWebViewJavascriptBridge(function (bridge) {
                //导航是否显示分享按钮
                bridge.callHandler(
                    "navigationConfig",
                    {
                        flag_show: 1,
                        flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                        flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                        flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                        share_url:
                            _this.$router.siteUrl() +
                            "/activity/InvitationShare.html",
                        share_title: "百年人寿官方app上线", //分享标题
                        share_text: "免费领价值百元礼包", //分享描述
                        share_imgurl: _this.$router.siteUrl() + _this.shareImg //分享图片地址
                    },
                    function (response) {
                        //alert(response,'');
                    }
                );
            });
            this.getTaskList()
            this.getPicList()
            this.loadList()

            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload()
                }
            }, false);


        },
        updated() {

        },
        methods: {
            goReceive(item) {
                this.$app.getToken((userToken) => {
                    let data = {
                        "taskCode": item.taskCode
                    }
                    this.$request({
                        url: `/cms/taskCenter/taskScoresReceive`,
                        method: 'POST',
                        contentType: "application/json;charset=UTF-8",
                        userToken: userToken,
                        isEncript:true,
                        params: data,
                        successFn: data => {
                            Toast.info('已领取成功')
                            setTimeout(()=>{
                                this.getTaskList()
                            },1000)
                        },
                        failFn: data => {
                            Toast.info(data.resultMsg)
                        }
                    });
                })
            },
            goCompleteTask(item) {
                location.href = '/activity/TaskCenter/TaskCenter.html'
            },
            getTaskList() {
                this.$app.getCurrentToken((userToken) => {
                    this.$request({
                        url: `/cms/taskCenter/getTaskInfoList`,
                        method: 'POST',
                        isLoading: true,
                        contentType: "application/json;charset=UTF-8",
                        userToken: userToken,
                        successFn: data => {
                            this.taskList = data.cmsTaskCenterVoList
                            console.log(this.taskList);
                        },
                        failFn: data => {
                            Toast.info(data.resultMsg)
                        }
                    });
                })
            },
            loadList() {
                let that = this
                this.$app.getCurrentToken((userToken) => {
                    if (userToken && userToken !== '') {
                        that.judgeRegister()
                        that.judgeVip()
                        that.judgeGathering()
                        that.isLoginFlag = true
                    } else {
                        that.userStatusRegister = 0
                        that.userStatusVip = 0
                        that.userStatusGathering = 0
                        that.isLoginFlag = false
                    }
                })
            },
            goStep() {
                location.href = '/activity/step/StepComputed.html'
            },
            goDetail(item) {
                if (this.showClick) {
                    this.goLogin()
                    return false
                }
                if (item.isClick === '1') {
                    if (item.isLogin === '1') {
                        this.goCommodity(item)
                    } else {
                        if (item.linkUrl === '') {
                            return false
                        }
                        window.location.href = item.linkUrl
                    }
                } else {
                    Toast({
                        content: '仅活动期间注册的新用户可兑换'
                    })
                }
                //
            },
            goLogin() {
                this.$app.getToken()
            },
            goCommodity(item) {
                let that = this
                this.$app.getCurrentToken(function (userToken) {
                    that.$request({
                        url: `/shop/zuifuli/login`,
                        contentType: 'application/json;charset=UTF-8',
                        params: {redirect: `${item.linkUrl}`},
                        isLoading: true,
                        isEncript: true,
                        userToken: userToken,
                        successFn: data => {
                            window.location.href = data
                        },
                        failFn: data => {
                        }
                    })
                })
            },

            getPicList() {
                let that = this
                this.$app.getCurrentToken(function (userToken) {
                    that.$request({
                        url: `/act/resource/novicePrizeImage`,
                        contentType: 'application/json;charset=UTF-8',
                        isLoading: true,
                        userToken: userToken,
                        successFn: (data) => {
                            that.picData = data.actResourceList
                            if (data.isNewUser === 'F') {
                                that.showClick = true
                            }
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            //判断用户有没有注册
            judgeRegister() {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/cms/cmsActivity/getRegister`,
                        contentType: 'application/json;charset=UTF-8',
                        isLoading: true,
                        userToken: userToken,
                        successFn: (data) => {
                            //是否领取
                            if (data === '0') {  //0 未领取
                                that.userStatusRegister = 1
                            } else {
                                that.userStatusRegister = 2

                            }
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            //判断用户有没有领取升级礼包
            judgeVip() {
                let _this = this
                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/vip/grade/details`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            _this.rank = data.rank
                            if (data.giftRecordList.find((item) => item.giftRank === data.rank && item.giftType === 1)) {
                                _this.userStatusVip = 2
                            } else {
                                _this.userStatusVip = 1
                            }
                        },
                        failFn: () => {
                        }
                    })
                })
            },
            goRegister() {
                location.href = '/activity/Register.html'
            },
            goVip() {
                location.href = '/vipUser/Vip.html?current_level=' + this.rank
            },
            goGathering() {
                location.href = '/activity/Gathering.html'
            },
            judgeGathering() {
                let _this = this
                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/assembly/isGathering`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            if (data === '1') {
                                _this.userStatusGathering = 1
                            } else if (data === '0') {
                                _this.userStatusGathering = 2
                            }
                        },
                        failFn: () => {
                        }
                    })
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .parT {
        text-indent: 5em;
        display: inline-block;
    }

    .content_01 {
        background: #CE2833;
        width: 100%;
        background-size: 100% 100%;
        .question {
            width: 44px;
            height: 44px;
            position: absolute;
            top: .5rem;
            right: .5rem;
        }

        .content_body {
            position: absolute;
            width: 100%;
            top: 7.3rem;
        }

        .bannerPart2 {
            .pic01 {
                margin: 0 auto;
                width: 690px;
                height: 486px;
            }

            .pic02 {
                margin: 0 auto;
                width: 690px;
                height: 858px;
            }
        }
        .ruleBottom{
            padding-top: 1rem;
            width: 100%;
        }
        .myCloseIcon{
            position: absolute;
            font-size: .6rem;
            right: .5rem;
            top: 0.5rem;
        }
        .myRuleBottom {
            background: #fff;
            height: 14rem;
            padding-top: 100px;
            width: 100%;
            position: relative;
            border-top-left-radius: 28px;
            border-top-right-radius: 28px;
            p{
                margin: 0 54px 0;
                font-size: 28px;
                line-height: 40px;
                max-height: 13rem;
                overflow-y: scroll;
            }
        }
        .ruleTop{
            top: -.2rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 476px;
            height: 66px;
        }
        .bgContent {
            height: 884px;
            width: 100%;
        }

        .sectionPart {
            padding-top: 1rem;
            box-shadow: inset 0px 0px .4rem 1px #EA9AA1;
            border-radius: 28px;
            background: #fff;
            /*    top: 1rem;
                position: absolute;*/
            margin: 0 0.4rem 0;
            position: relative;

            .giftTop {
                position: absolute;
                left: 50%;
                top: -0.2rem;
                transform: translateX(-50%);
                width: 476px;
                height: 66px;
            }

            div {
                width: 8rem;
                margin: 0 auto;
                height: 118px;
                line-height: 118px;
            }

            .particular:last-child {
                border-bottom: none;
            }
        }

        .taskOne {
            font-size: 32px;
            color: #DA4852;
            font-weight: bold;
        }

        .taskTwo {
            font-size: 28px;
            color: #333;
            margin-left: 26px;
            width: 3rem;
            display: inline-block;
        }

        .particular {
            border-bottom: 1px solid #F7EAEB;
        }

        .taskThree {
            display: inline-block;
            width: 2.6rem;
            height: 52px;
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(208, 42, 42, 1);
            line-height: 52px;
            background: #FFD9B4;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            text-align: center;
            margin-left: .4rem;
        }

        .partBottom {
            background: url("../../assets/imgs/invitaion/picPart.png") no-repeat;
            /* 让背景图基于容器大小伸缩 */
            background-size: cover;
            width: 690px;
            margin: 0 auto;
            margin-top: 1.2rem;
            height: 100%;

            ul {
                padding-top: .88rem;
                padding-bottom: 32px;
                display: flex;
                flex-wrap: wrap;

                li {
                    display: inline-block;
                    margin-top: 28px;

                    img {
                        z-index: 100;
                        max-width: 306px;
                        max-height: 210px;
                        padding-left: .35rem;
                    }
                }
            }
        }

        .rule {
            width: 690px;
            height: 18rem;
            margin: 1.1rem auto 0;
            position: relative;
        }

        .newRule {
            width: 690px;
            height: 800px;
            margin: 1.1rem auto 0;
            position: relative;
        }

        .contentBottom1 {
            width: 100%;
            position: absolute;
            /* top: 25.5rem; */
            padding-top: 2.3rem;

            p {
                width: 616px;
                margin: 0 auto;
                color: #FFF4ED;
                font-size: 28px;
                line-height: .55rem;
            }
        }

        .picPart {
            width: 690px;
            height: 380px;
            top: 15rem;
            position: absolute;
            left: 30px;
            z-index: 5;
        }

        .part {
            color: #FFFFFF;
            background: #C8C8C8;
        }

        .bottomTip {
            width: 8.21333rem;
            margin: 0 auto;
            margin-top: 26px;
            padding-bottom: 48px;
            font-size: 28px;
            color: #FFF4ED;
        }
    }

    .content_02 {
        .parT{
            text-indent: 5em;
            display: inline-block;
        }
        .content {
            background: #CE2833;
            width: 100%;
            background-size: 100% 100%;
        }

        .bannerPart2 {
            position: absolute;
            width: 100%;
            top: 7.3rem;
            img {
                margin: 0 auto;
                width: 690px;
                height: 486px;
            }
        }

        .bgContent {
            height: 884px;
            width: 100%;
        }

        .sectionPart {
            width: 100%;
            top: 8.5rem;
            position: absolute;
            div {
                width: 590px;
                margin: 0 auto;
                height: 118px;
                line-height: 118px;
            }
        }

        .taskOne {
            font-size: 32px;
            color: #DA4852;
            font-weight: bold;
        }

        .taskTwo {
            font-size: 28px;
            color: #333;
            margin-left: 26px;
            width: 214px;
            display: inline-block;
        }

        .particular {
            border-bottom: 1px solid #F7EAEB;
        }

        .taskThree {
            display: inline-block;
            width: 180px;
            height: 52px;
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(208, 42, 42, 1);
            line-height: 52px;
            background: #FFD9B4;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            text-align: center;
            margin-left: .8rem;
        }

        .partBottom {
            background: url("../../assets/imgs/invitaion/picPart.png") no-repeat;
            /* 让背景图基于容器大小伸缩 */
            background-size: cover;
            width: 690px;
            margin: 0 auto;
            margin-top: 3.5rem;
            height: 100%;
            ul {
                padding-top: .88rem;
                padding-bottom: 32px;
                display: flex;
                flex-wrap: wrap;
                li {
                    display: inline-block;
                    margin-top: 28px;
                    img {
                        z-index: 100;
                        max-width: 306px;
                        max-height: 210px;
                        padding-left: .35rem;
                    }
                }
            }
        }

        .rule {
            width: 690px;
            height: 18rem;
            margin: 1.1rem auto 0;
            position: relative;
        }

        .newRule {
            width: 690px;
            height: 800px;
            margin: 1.1rem auto 0;
            position: relative;
        }
        .contentBottom1 {
            width: 100%;
            position: absolute;
            /* top: 25.5rem; */
            padding-top: 2.3rem;
            p {
                width: 616px;
                margin: 0 auto;
                color: #FFF4ED;
                font-size: 28px;
                line-height: .55rem;
            }
        }

        .picPart {
            width: 690px;
            height: 380px;
            top: 15rem;
            position: absolute;
            left: 30px;
            z-index: 5;
        }

        .part {
            color: #FFFFFF;
            background: #C8C8C8;
        }
        .bottomTip{
            width: 8.21333rem;
            margin: 0 auto;
            margin-top: 26px;
            padding-bottom: 48px;
            font-size: 28px;
            color: #FFF4ED;
        }
    }

</style>
<style>
    html, body {
        background: #CE2732;
    }
</style>
