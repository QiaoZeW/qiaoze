<template>
    <div class="content">

        <img src="@/assets/imgs/register/bgTop.png" class="bgTop"/>
        <img  v-show="goReceive" src="@/assets/imgs/register/beanNum.png" class="beanNum"/>
        <img v-if="goReceive" src="@/assets/imgs/register/bgMid.png" class="bgMid" @click="receiveScore"/>
       <div v-else>
           <img  src="@/assets/imgs/register/bgMid2.png" class="bgMidTwo" @click="goInvitation"/>
           <p class="shareBean shareBeanTwo">分享给好友，可再得百佳豆</p>
           <div class="btnBox btnBoxTwo">
               <p class="goShare" @click="goInvitation()">
                   立即分享
               </p>
           </div>
       </div>
      <!--  <div v-if="goReceive" class="btnReceive" @click="receiveScore">
            <p>立即领取</p>
        </div>
        <div v-else class="alreadyReceive">
            已领取
        </div>-->
        <md-landscape v-model="showPic" class="myLand">
            <div class="popupContent">
                <p class="scoreNum"><span>{{scroeNum}}</span>豆</p>
                <p class="shareBean">分享给好友，可再得百佳豆</p>
               <div class="btnBox">
                   <p class="goShare" @click="goInvitation()">
                      立即分享
                   </p>
               </div>
               <!-- <p class="scoreNum">已获得{{scroeNum}}百佳豆</p>
                <p class="goShare" @click="goInvitation()">
                    分享再得百佳豆
                </p>-->
            </div>

        </md-landscape>

        <hot-products :propImgs="propImgs" :wxregstyle="true" moduleType="01" />
        <p class="explanation">*奖励以百佳豆形式发放，活动最终解释权归百年人寿所有 </p>
    </div>
</template>

<script>
    import { Dialog } from 'mand-mobile'
    import HotProducts from '@/components/HotProducts'
    export default {
        name: "Register",
        components: {
          HotProducts
        },
        data() {
            return {
                propImgs: require('@/assets/imgs/register/exchange.png'),
                showPic: false,
                goReceive: true,
                checkToken: true,
                scroeNum: '',
                isBrowser: false,
                commodityList:[],
                shareImg: require("@/assets/imgs/invitaion/wxshare1.png"),
            }
        },
        created() {
            document.title = '注册有礼'
            this.isBrowser = this.$app.isBrowser()
			this.loadShenceData()
        },
        mounted() {
             let _this = this
             setupWebViewJavascriptBridge(function (bridge) {
                 bridge.callHandler('getCurrentToken'
                     , {'id': 2}, function (responseData) {
                         responseData = JSON.parse(responseData)
                         var userToken = responseData.data
                         if (userToken) {
                             _this.loadUserFlag()
                         } else {

                         }
                         callback && callback(userToken)
                     }
                 )
             })
        },
        methods: {
		   loadShenceData() {
			   sensors.track("click_event_sign_up", {});
		   },
		   receiveScoreShenceData() {
			   sensors.track("click_event_sign_up_award", {});
		   },
           closeFloatWindow(){
               setupWebViewJavascriptBridge(function (bridge) {
                   bridge.callHandler('closeFloatWindow'
                       , {'id': 2}, function (responseData) {
                       }
                   )
               })
           },
            goInvitation(){
                sensors.track("bn_register_goshare", {});
                setupWebViewJavascriptBridge((bridge)=> {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "shareActive",
                        {
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            flag_share:  1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url:
                                this.$router.siteUrl() +
                                "/activity/InvitationShare.html" ,
                            share_title: "百年人寿官方app上线", //分享标题
                            share_text: "免费领价值百元礼包", //分享描述
                            share_imgurl:this.$router.siteUrl() + this.shareImg //分享图片地址
                        },
                        function(response) {
                            //alert(response,'');
                        }
                    );
                });
           },
            receiveScore() {
                let that = this
				this.receiveScoreShenceData()
                if (this.isBrowser) { // app内
                    this.$app.getToken(function (userToken) {
                        that.loadUserFlag()
                        that.$request({
                            url: `/cms/cmsActivity/getIntegral`,
                            contentType: 'application/json;charset=UTF-8',
                            userToken: userToken,
                            isEncript: true,
                            isLoading: true,
                            successFn: (data) => {
                                that.closeFloatWindow()
                                that.scroeNum = data
                                that.showPic = true
                                that.goReceive = false

                            },
                            failFn: (data) => {
                                if(data.resultCode === 'SYS_ERROR_0039'){
                                    Dialog.alert({content:data.resultMsg})
                                }
                                that.showWhirl = false
                                that.showError = true
                            }
                        })
                    })
                } else {
                    that.$app.downLoadApp()
                }

            },
            loadUserFlag() {
                let that = this
                this.$app.getCurrentToken(function (userToken) {
                    that.$request({
                        url: `/cms/cmsActivity/getRegister`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            //是否领取     未领取
                            if (data == '0') {
                                that.goReceive = true
                            } else {
                                that.goReceive = false
                            }
                        },
                        failFn: (data) => {
                            that.showWhirl = false
                            that.showError = true
                        }
                    })
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    html, body {
        height: 100%;
    }

    .content {
        background: url("../../assets/imgs/register/background.jpg") no-repeat;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        min-height: 100%;
        position: relative;
        .btnReceive {
            width: 432px;
            font-size: 52px;
            color: #fff;
            margin: 0 auto;
            margin-top: 23px;
            text-align: center;
            line-height: 94px;
            height: 94px;
            background: #E2A346;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            box-shadow: 0px 0.1rem 0.3rem #F6CE9A;
        }
        .alreadyReceive {
            width: 432px;
            font-size: 52px;
            color: #fff;
            margin: 0 auto;
            margin-top: 23px;
            text-align: center;
            line-height: 94px;
            height: 94px;
            background: #CABFB4;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            box-shadow: 0px 0.1rem 0.3rem #F6CE9A;
        }
        .bgTop {
            width: 549px;
            height: 193px;
            margin: 0 auto;
            padding-top: 51px;
        }
        .bgMid {
            width: 552px;
            height: 640px;
            margin: 0 auto;
            padding-top: 24px;
        }
        .explanation {
            margin-top: 58px;
            width: 100%;
            color: #A56A35;
            font-size: 22px;
            text-align: center;
            padding-bottom: 27px;
        }
    }

    .popupContent {
        background: url("../../assets/imgs/register/received.png") no-repeat;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        width: 728px;
        height: 886px;
        .scoreNum {
            font-size: 48px;
            text-align: center;
            position: absolute;
            width: 100%;
            top: 4.75rem;
            color: #D9362B;
            font-weight: bold;
            span{
                font-size: 96px;
            }
        }
    }
    .shareBean{
        position: absolute;
        text-align: center;
        width: 100%;
        font-size: 28px;
        color: #FFF8ED;
        top: 8.5rem;
    }
    .btnBox{
        width: 100%;
        position: absolute;
        top: 9.5rem;
        text-align: center;
    }
    .goShare {
        margin: 0 auto;
        margin-top: 30px;
        display: inline-block;
        width: 308px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        color: #D03529;
        font-size: 30px;
        background: linear-gradient(#FFF0BC, #FFCB14);
        border-radius:1rem;
    }
    .bgMidTwo{
        width: 680px;
        height: 636px;
        margin: 0 auto;
    }
    .beanNum{
        margin: 0 auto;
        height: 122px;
        width: 422px;
    }
    .shareBeanTwo{
        top: 8.2rem;
    }
    .btnBoxTwo{
        top: 9rem;
    }
</style>
<style lang="scss">
    .myLand .md-landscape-content{
        width: 100% !important;
    }
</style>
