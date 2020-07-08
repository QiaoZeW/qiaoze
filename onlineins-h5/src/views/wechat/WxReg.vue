<template>
    <div class="content">

        <img src="@/assets/imgs/register/wx-bgTop.png" class="bgTop"/>
        <img src="@/assets/imgs/register/wx-bgMid.png" class="bgMid"/>
        <div class="btnReceive" @click="receiveScore">
            <p>立即领取</p>
        </div>
        <hot-products :propImgs="propImgs" :wxregstyle="true" moduleType="01" />
        <p class="explanation">*奖励以百佳豆形式发放，活动最终解释权归百年人寿所有 </p>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    import HotProducts from '@/components/HotProducts'
    export default {
        name: "wxreg",
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
                commodityList:[]
            }
        },
        created() {
            document.title = '注册有礼'
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

            goInvitation(){
                window.location.href =  this.$router.siteUrl() + '/activity/Invitation.html'
           },
            receiveScore() {
                //下载app
                // Toast({content: "正在跳转至App下载..."})
                this.$app.downLoadApp()
                return false
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
            width: 503px;
            height: 341px;
            margin: 0 auto;
            padding-top: 51px;
        }
        .bgMid {
            width: 720px;
            height: 626px;
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
        background: url("../../assets/imgs/register/popup.png") no-repeat;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        width: 469px;
        height: 521px;
        margin-left: .4rem;
        .scoreNum {
            padding-top: 4.2rem;
            font-size: 36px;
            color: #333;
            text-align: center;
        }
        .goShare {
            margin: 0 auto;
            margin-top: 30px;
            width: 329px;
            height: 84px;
            line-height: 84px;
            text-align: center;
            color: #fff;
            font-size: 36px;
            background: rgba(232, 68, 57, 1);
            border-radius: 10px;
        }
    }
</style>
