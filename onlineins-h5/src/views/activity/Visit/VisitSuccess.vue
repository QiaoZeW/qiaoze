<template>
    <div class="section sucess-wrap">
        <div class="sucessimg">
            <img src="@/assets/imgs/investigation/success.png" alt="这是一张图片未显示">
        </div>
        <div class="text-content">
            <p class="text">{{ onlineVist ? '在线回访完成' : '电话回访预约成功' }}</p>
            <p class="tip" v-if="isShowTip">
                针对您不明确的内容，后续会通过<span class="red">95542</span>与您再次完成沟通与确认。
            </p>
            <!-- <p v-if="isDiaoyanOpen" class="tip">
                百家豆已存入您的账户
                <a v-if="isBrowser" href="javascript:;" @click="goJifenmingxi">去查看>></a>
            </p> -->
        </div>

        <div class="btns" v-if="downLoadFlagOpen && !isBrowser&& !agentCode">
            <button id="downloadApp" @click="downloadApp">下载百年APP管理保单</button>
        </div>
        <div class="btns" v-else>
            <button id="goOrderList" @click="goOrderList">查看保单</button>
        </div>

        <div class="btns" v-if="isBrowser && onlineVist && isDiaoyanOpen">
            <button id="goJifenmingxi" class="outline" @click="goJifenmingxi">百家豆换购</button>
        </div>

        <div class="btns" v-if="!isBrowser && !agentCode">
            <button id="hf_visitsuccess_gobackhome" class="outline" @click="goBackHome">返回首页</button>
        </div>

        <div v-show="bottomPicFlg" class="bottom_img">
            <img :src="bottomPic" v-show="bottomPic && bottomPic !== ''" @click="goUrl()"/>
        </div>

        <div style="display: none">
            <img v-for="item in imgList" :src="item" alt="">
        </div>
        <md-landscape v-model="showPic" class="successbag">
            <div class="popupContent">
                <p class="p1">恭喜您获得</p>
                <p class="p2"><span>{{ scoreNum }}</span>豆</p>
                <div class="btns">
                    <button id="baojiadounow" @click="showPic=false">我知道了</button>
                </div>
            </div>
        </md-landscape>

        <md-popup
            v-model="showLanding"
            position="bottom"
            class="land_title"
        >
            <md-popup-title-bar
                large-radius
            ></md-popup-title-bar>
            <div class="md-example-popup md-example-popup-bottom  showLand">
                <div class="land_body">
                    <i class="iconfont icon-guanbi myCloseIcon" @click="showLanding = false"></i>
                    <h2>领取方法</h2>
                    <p class="method01">
                        方法一：在微信中搜索“百年人寿”或<br>“aoen-life”，完成关注。
                    </p>
                    <textarea id="input" disabled="disabled" readonly="readonly" style="display: none">百年人寿</textarea>
                    <div class="copy">
                        <a href="javascript:;" @click="copyCtrl">点击复制公众号</a>
                    </div>
                    <p class="method02">
                        方法二：截屏本页面，打开微信扫一扫-->相册-->选取本截图，即可关注公众号。
                    </p>
                    <img src="@/assets/imgs/appointment/smallProgram.png" class="smallProgram"/>
                </div>
            </div>
        </md-popup>

        <md-popup
            v-model="showQrCode"
            position="bottom"
            class="land_title"
        >
            <md-popup-title-bar
                large-radius
            ></md-popup-title-bar>
            <div class="md-example-popup md-example-popup-bottom  showLand">
                <div class="code_body">
                    <i class="iconfont icon-guanbi myCloseIcon" @click="showQrCode = false"></i>
                    <h2>领取地址</h2>
                    <img src="@/assets/imgs/appointment/smallProgram.png" class="smallProgram"/>
                    <p class="btn_qrCode">长按识别二维码，进入小程序领取奖品</p>
                </div>
            </div>
        </md-popup>
        <BannerSettings :showBanner="false" @getImageData="getImageData" :moduleType="'15'" />
    </div>
</template>

<script>
    import {Toast, Dialog} from 'mand-mobile'
    import {goNative} from '@/utils/nativeUtils'
    import BannerSettings from '@/components/BannerSettings'

    export default {
        name: "Sucess",
        components: {
            BannerSettings
        },
        data() {
            return {
                visitStatusText: '',
                userToken: '',
                isBrowser: false,
                agentCode: "",
                product_id: "",
                showPic: false,
                isDiaoyanOpen: false,
                downLoadFlagOpen: false,
                bottomPic: '',
                bottomPicFlg: false,
                scoreNum: 0,
                person:{},
                inviterCode: '',
                isReceive: false,
                shareImgUrl: require('@/assets/imgs/invitaion/wxshare1.png'),
                cpsCode:'',
                thirdClassDistributor: '',
                prizeUrl:'',
                showLanding:false,
                showQrCode:false,
                questionList: [],
                rvType: null,
                userPhone:'',
                riskCode:'',
                bannerData: [],
                imgList:[
                    require('@/assets/imgs/appointment/visitSuccess.png'),
                    require('@/assets/imgs/appointment/visitSuccess01.png'),
                    require('@/assets/imgs/appointment/smallProgram.png'),
                ]
            };
        },
        computed: {
            isShowTip () {
                // 如果之前的问卷中有回答否的就显示提示信息
                if (this.questionList.length > 0) {
                    for (var i = 0; i < this.questionList.length; i++) {
                        if(this.questionList[i].answerNoJoin.indexOf('否') > -1) {
                            return true
                        }
                    }
                }
                return false
            },
            onlineVist () {
                // rvType(0：在线回访(默认)，1：电话回访)
                return this.rvType == 0
            },
            teleVisit () {
                // rvType(0：在线回访(默认)，1：电话回访)
                return this.rvType == 1
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.isBrowser = this.$app.isBrowser()
                this.agentCode = this.$router.query("agentCode");
                this.orderNo = this.$router.query("orderNo");
                this.product_id = this.$router.query("product_id") || "1";
                this.scoreNum = localStorage.getItem('scoreNum') || 0;
                this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || localStorage.getItem('cps_token') || ''
                this.cpsCode = localStorage.getItem('cps_secondaryDistributor') || ''
                this.thirdClassDistributor = localStorage.getItem("cps_thirdClassDistributor") || this.$router.query('thirdClassDistributor') || ''
                this.getIsOwns()
                this.getOrderVisitInfo()
                sessionStorage.setItem('visitReady', 'Y')
                this.$app.wxProductDetail(this.product_id, 1)
                this.questionList = JSON.parse(localStorage.getItem('questionList')) || []
                console.log('this.questionList----', this.questionList)
                this.$app.showCustomerIntelligence((data) => {
                    this.downLoadFlagOpen = !data.downloadVisit
                })
                this.setBackHomeConfig()
                setTimeout(() => {
                    this.clearLocalData()
                }, 2000)
                this.loadOrderDetail()
            },
            getIsOwns () {
                this.$request({
                    url: `/cps/getIsOwns/${this.cpsCode}`,
                    successFn: data => {
                      // 判断渠道是否自营接口
                      this.bottomPicFlg = data
                    },
                    failFn: data => {
                        Dialog.alert({ content: data.resultMsg });
                    }
                });
            },
            setBackHomeConfig () {
                if (this.isBrowser) {
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('backHomeConfig', {
                            'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                        }, function (response) {
                        });
                    })
                }
            },
            getImageData (data) {
                this.bannerData = data || []
            },
            clearLocalData () {
                localStorage.removeItem('questionList')
                localStorage.removeItem('diaoyanSubList')
                localStorage.removeItem('scoreNum')
                localStorage.removeItem('shence_aftersale_questionnaire_risk_source')
            },
            loadOrderDetail () {
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/contract/getPolicyDetail`,
                        method: "POST",
                        isLoading: true,
                        isEncript:true,
                        contentType: "application/json;charset=UTF-8",
                        data: { orderNo: this.orderNo },
                        userToken: userToken,
                        successFn: data => {
                            this.product_id = data.productId
                            this.riskCode = data.insuredInfoList[0].riskInfoList[0].riskCode
                            this.userPhone =  data.appntInfo.communicationInfo.mobile
                            this.queryQualifications()
                        },
                        failFn: data => {
                            Dialog.alert({ content: data.resultMsg });
                        }
                    });
                })
            },
            goBackHome () {
              let cpsGoBackUrl = localStorage.getItem('cps_goBackUrl') || '';
              if (this.$app.isMiniProgram()&&this.$app.isBnMiniApp()){   //是否在小程序内   直接跳转到首页
                  wx.miniProgram.switchTab({ url: '/pages/home/index' })
                  return false
              } else if (cpsGoBackUrl) { // 渠道链接首页
                  if (cpsGoBackUrl === 'initUrl') {
                      location.href = (this.$router.siteUrl() + '/product/Detail.html?product_id=' + this.product_id +
                          ("&secondaryDistributor=" + this.cpsCode) + ("&thirdClassDistributor=" + this.thirdClassDistributor) + "&goBackUrl=initUrl")
                  } else {
                      location.href = cpsGoBackUrl
                  }
                return false
              } else {
                // 回详情页面
                location.href = `/product/Detail.html?product_id=${this.product_id}&thirdClassDistributor=${this.thirdClassDistributor}&secondaryDistributor=${this.cpsCode}&shareUserCode=`
              }
            },
            goOrderList(){
                let orderNumber = this.orderNo
                // app外部跳转至外部保单详情
                let url = `/externalPay/PolicyDetails.html?orderNo=${orderNumber}`
                if (this.agentCode) {
                    url += `&agentCode=${this.agentCode}`
                }
                location.href = url
            },
            downloadApp () {
                this.$app.downLoadApp()
            },
            goJifenmingxi() {
                // 去微信分享页
                goNative(6)
            },
            getOrderVisitInfo() { // 订单回访调研信息查询
                this.$request({
                    url: `/ins/visit/getOrderVisitInfo`,
                    method: 'POST',
                    isEncript: true,
                    userToken: this.userToken,
                    data: {
                        orderNo: this.orderNo
                    },
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        // 返回字段{调研开关:surveyFlag(0:关闭；1:开启),回访状态:rvStatus(0：未回访，1：已回访未调研，2：完成回访调研)}
                        console.log('data-------', data)
                        this.rvType = data.rvType
                        if (data.surveyFlag == '1' && !this.agentCode) { // 代理人无调研
                            this.isDiaoyanOpen = true
                            if (this.rvType == 0 && this.scoreNum) { // 在线回访时候才弹框提示发豆了
                                this.showPic = true
                            }
                        }
                    },
                    failFn: (data) => {
                        Dialog.alert({content: data.resultMsg})
                    }
                })
            },
            /**
             * @author joe
             * @date 2019/12/20
             * @Description: 查询是否有领奖资格
             */
            queryQualifications() {
                //todo  调查询资格的接口
                this.$request({
                    url: `/act/actSubscribeRewardRecord/getActSubscribeRewardRecord`,
                    method: 'POST',
                    data: {
                        mobile: this.userPhone
                    },
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        sessionStorage.setItem("IS_LOGIN", JSON.stringify(data))
                        sessionStorage.setItem("LOGIN_NUM", JSON.stringify(this.userPhone))
                        if(data.ticketReceiver){
                            this.person.name = data.ticketReceiver.receiverName
                            this.person.iphone = data.ticketReceiver.receiverMobile
                            this.person.areaAdd = data.ticketReceiver.area
                            this.person.detailAdd = data.ticketReceiver.address
                            sessionStorage.setItem("PERSON_INFO", JSON.stringify(this.person))
                        }
                        if(data.tookPrizeOne){
                            sessionStorage.setItem("ACT_TYPE_01", '1')
                        }
                        if(data.tookPrizeTwo){
                            sessionStorage.setItem("ACT_TYPE_02", '1')
                        }
                        this.isReceive = true
                        this.loadBottomPic()
                    },
                    failFn: (data) => {
                        this.isReceive = false
                        this.loadBottomPic()
                    }
                })
            },
            copyCtrl(){
                var Url2 = document.getElementById("input").innerText;
                var oInput = document.createElement("input");
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = "oInput";
                oInput.style.display = "none";
                Toast.info('复制成功')
            },
            goUrl(){

                if(this.isReceive){
                    let linkUrl = this.bannerData[0].linkUrl || ''
                    var ua = window.navigator.userAgent.toLowerCase()
                    if(this.$app.isBrowser()){
                        location.href = linkUrl
                    } else if(ua.match(/MicroMessenger/i) == 'micromessenger'){   //判断是否在微信里
                        if(this.$app.isMiniProgram()&&this.$app.isBnMiniApp()){   //是否在小程序内   直接跳转到首页
                            wx.miniProgram.switchTab({ url: '/pages/home/index' })
                            return
                        }else{  //微信非小程序   太阳码
                            // this.showQrCode = true
                            location.href = linkUrl + '?secondaryDistributor=' + this.cpsCode
                        }
                    }
                    else{
                        // this.showLanding = true
                        location.href = linkUrl + '?secondaryDistributor=' + this.cpsCode
                    }
                }else{
                    let url = this.bannerData[1].linkUrl + '?secondaryDistributor=' + this.cpsCode;
                    if(this.$app.isBrowser()){
                        url = this.bannerData[1].linkUrl
                    }
                    if (this.agentCode) {
                        url += `&agentCode=${this.agentCode}`
                    }
                    location.href = url
                }
            },
            loadBottomPic() {
                if (this.isReceive) { //有资格
                    if(this.riskCode === '5317' || this.riskCode === '5319'){
                        this.bottomPic = this.bannerData[0].imageUrl || ''
                    }else{
                        this.bottomPic = ''
                    }
                } else {
                    if (this.$app.isBrowser()) {
                        this.bottomPic = this.bannerData[1].imageUrl || '' // todo 更换图片
                    } else {
                        this.$request({
                            url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
                            successFn: data => {
                                this.bottomPic = data.cpsAdvImage.find((item) => item.imagePosition === 1).url
                            },
                            failFn: () => {
                            }
                        });
                    }
                }


            },
            goShare() {
                //    let urlHref = "/product/Buy.html?product_id=" + this.product_id
                // if (this.agentCode) {
                // 	urlHref += "&agentCode=" + this.agentCode;
                // }
                // window.location.href = urlHref; //todo product_id不能写死
                if (!this.isBrowser) {
                    Toast.info('请点击右上角进行分享邀请好友注册')
                }
                setupWebViewJavascriptBridge((bridge) => {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "shareActive",
                        {
                            share_data: '',
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url: this.$router.siteUrl() + '/activity/HeadLines.html?secondaryDistributor=' + this.secondaryDistributor + '&inviterCode=' + this.inviterCode, //分享跳转的url
                            share_title: '新人注册有礼', //分享标题
                            share_text: '新人注册有礼', //分享描述
                            share_imgurl: this.$router.siteUrl() + this.shareImgUrl //分享图片地址
                        }
                    );
                })
            },
        }
    };
</script>

<style lang="scss" scoped>
    $primaryColor: #8e8e8e;
    .red {
        color: #D7000F;
    }
    .sucess-wrap {
        min-height: 100%;
        box-sizing: border-box;
        overflow: hidden;

        .sucessimg {
            width: 264px;
            height: 268px;
            margin: 76px auto 50px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .text-content {
            width: 572px;
            margin: 0 auto 170px;

            p {
                text-align: center;
                font-size: 30px;

                &.text {
                    color: #333;
                    font-size: 36px;
                    font-weight: bold;
                }

                &.tip {
                    color: #8E8E8E;
                    margin-top: 22px;
                    line-height: 40px;
                    text-align: left;
                    font-size: 24px;

                    a {
                        text-decoration: underline;
                        color: #EE3D34;
                        margin-left: 12px;
                    }
                }
            }
        }

        .exclusions {
            box-sizing: border-box;
            width: 574px;
            margin: 28px auto;
            border-radius: 10px;
            padding: 40px 60px;
            line-height: 40px;
            background-color: #f2f2f2;
        }

        .btns {
            padding: 10px 30px;
            text-align: center;
            margin-bottom: 30px;

            button {
                width: 530px;
                height: 88px;
                line-height: 88px;
                border-radius: 88px;
                text-align: center;
                color: #fff;
                font-size: 36px;
                background: linear-gradient(to top, #EE3D34, #FA5B46);

                &.outline {
                    color: #EE3D34;
                    border: 1px solid #EE3D34;
                    background: #fff;
                }
            }
        }
    }

    .bottom_img {
        margin-top: 20px;

        img {
            height: 228px;
            width: 702px;
            margin: 0 auto;
        }
    }
    .showLand{
        background: #fff;
    }
    .land_body,.code_body{
        padding-bottom: 178px;
        position: relative;
        h2{
            font-size: 40px;
            font-weight: bold;
            color: #010101;
            text-align: center;
        }
        .myCloseIcon{
            top: -.4rem;
            right: 0.6rem;
            font-size: 0.6rem;
            position: absolute;
        }
        .method01{
            text-align: center;
            margin-top: 75px;
            font-size:26px;
            font-family:FZLanTingHeiS-R-GB;
            font-weight:400;
            color:rgba(1,1,1,1);
            line-height:40px;
        }
        .method02{
            text-align: center;
            margin: 57px auto 0 ;
            font-size:26px;
            font-family:FZLanTingHeiS-R-GB;
            font-weight:400;
            color:rgba(1,1,1,1);
            line-height:40px;
            max-width: 503px;
        }
        .copy{
            margin-top: 56px;
            a{
                display: block;
                margin: 0 auto;
                border-top: 1px solid #595959;
                border-bottom: 1px solid #595959;
                width: 259px;
                height: 73px;
                font-size:28px;
                font-family:FZLanTingHeiS-B-GB;
                font-weight:600;
                color:rgba(48,81,141,1);
                line-height: 73px;
                text-align: center;
            }
        }
        .smallProgram{
            width: 344px;
            height: 344px;
            margin: 55px auto 0;
        }
        .btn_qrCode{
            font-size: 32px;
            color: #010101;
            text-align: center;
            margin-top: 53px;
        }
    }
</style>

<style lang="scss">
    .land_title .md-popup-title-bar{
        height: 1rem !important;
    }
    .successbag {
        .md-landscape-content {
            width: 594px;

            .popupContent {
                background: url('~@/assets/imgs/investigation/redbag.png') top center no-repeat;
                background-size: 100%;
                width: 594px;
                height: 730px;
                box-sizing: border-box;
                padding: 108px 0 90px;
                overflow: hidden;

                .p1 {
                    color: #98251E;
                    font-size: 38px;
                    text-align: center;
                }

                .p2 {
                    color: #D92F2C;
                    font-size: 61px;
                    text-align: center;
                    margin-top: 50px;

                    span {
                        font-size: 80px;
                    }
                }

                .btns {
                    text-align: center;
                    margin-top: 225px;

                    button {
                        width: 384px;
                        height: 88px;
                        line-height: 88px;
                        text-align: center;
                        color: #D92F2C;
                        border-radius: 88px;
                        background: linear-gradient(to top, #FDDD60, #FFBB29, #FFE468)
                    }
                }
            }
        }
    }
</style>
