<template>
    <div class="section myintegex-wrap">
        <div class="myintegex">
            <div class="my">
                <p class="baijiadou">我的百佳豆</p>
                <p class="num">
                  <a id="myintegex_login" v-if="!userToken" href="javascript:;" @click="showLoginPop">登录查看</a>
                  <span v-else>{{ totalScore }}</span>
                </p>
                <div class="btns">
                    <a id="myintegex_records" href="javascript:;" class="btn exchange" @click="goExRecord">
                        <img src="@/assets/imgs/IntegralExchange/icon_btn1.png" alt="">
                        <span>兑换记录</span>
                    </a>
                    <a id="myintegex_activerules" href="javascript:;" class="btn rules" @click="showRulesPopup">
                        <img src="@/assets/imgs/IntegralExchange/icon_btn2.png" alt="">
                        <span>活动规则</span>
                    </a>
                </div>
            </div>

            <div class="awardList" v-if="productList.length > 0">
              <div class="item" v-for="item in productList" :key="item.code">
                <img :src="item.minImage" alt="">
                <div class="right">
                  <h3>{{ item.name }}</h3>
                  <p class="p1">{{ item.price }}豆</p>
                  <p class="p2">{{ item.adesc }}
                    <a v-if="item.fileLink" href="javascript:;" @click="openPdf(item.fileLink)">服务说明</a>
                  </p>
                  <!-- <p v-if="item.fileLink" class="p3">
                    <a href="javascript:;" @click="openPdf(item.fileLink)">服务说明</a>
                  </p> -->
                  <button v-if="item.count > 0" class="exchange" @click="goExchange(item)">去兑换</button>
                  <button v-else class="exchange" disabled>补货中</button>
                </div>
              </div>
            </div>

            <BannerSettings :moduleType="'16'" />
            <!-- <img id="myintegex_gojssf" @click="goJSSF" class="banner" src="@/assets/imgs/IntegralExchange/banner02.png" alt=""> -->
            <img id="myintegex_download" @click="downLoadApp" class="banner" src="@/assets/imgs/IntegralExchange/banner03.png" alt="">
        </div>
        <!-- 活动规则弹窗 -->
        <Epopup ref="commonPopup" />
        <ExLogin ref="loginPopup" @getData="getLoginData" />
        <AppPopup
          :personInfo="person"
          :showAddress="showAddress"
          @closeAdd="closeAdd"
          pageSource="积分兑换" />
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    import { goNative } from '@/utils/nativeUtils'
    import Epopup from '@/views/activity/IntegralExchange/Epopup'
    import ExLogin from '@/views/activity/IntegralExchange/ExLogin'
    import AppPopup from "@/views/activity/appointment/AppPopup";
    import BannerSettings from '@/components/BannerSettings'
    export default {
        name: "MyIntegEx",
        components: {
          Epopup,
          ExLogin,
          AppPopup,
          BannerSettings
        },
        data() {
            return {
              totalScore: 0,
              rulesPopupShow: false,
              userCode: null,
              userToken: '',
              productList: [],
              hasBindCard: false,
              person:{
                name:'',
                iphone:'',
                areaAdd:'',
                detailAdd:''
              },
              showAddress: false,
              ticketNo: ''
            };
        },
        computed: {
        },
        created() {
          this.init();
        },
        mounted () {
        },
        methods: {
            init() {
              document.addEventListener("visibilitychange", function () {
                  if (!document.hidden) {
                      window.location.reload();
                  }
              }, false);
              var browserRules = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
              if(browserRules.test(navigator.userAgent)){
                  window.onpageshow = function(e){
                      if(e.persisted || (window.performance && window.performance.navigation.type == 2)){
                          window.location.reload();
                      }
                  }
              }
              this.userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN_PAY')) || ''
              this.getProductList()
              if (this.userToken) {
                this.getScoreNum()
              }
              // this.clearStorage()
            },
            clearStorage () {
              sessionStorage.removeItem('USER_TOKEN_PAY')
              sessionStorage.removeItem('inviterCode')
              sessionStorage.removeItem('userPhone')
            },
            goExRecord () {
              if (!this.userToken) {
                this.showLoginPop ()
              } else {
                location.href = '/activity/IntegralExchange/ExRecord.html'
              }
            },
            openPdf (url) {
              this.$app.goPdfView(url);
            },
            showRulesPopup () {
              this.$refs['commonPopup'].showRulesPopup()
            },
            showLoginPop() {
              this.$refs['loginPopup'].show()
            },
            getLoginData (v) {
              this.userCode = v.userCode,
              this.userToken = v.userToken
              this.getScoreNum()
            },
            getScoreNum () {
                this.$request({
                  url: `/vip/score/current`,
                  // isLoading: true,
                  userToken: this.userToken,
                  successFn: data => {
                    this.totalScore = data.totalScore || 0
                  },
                  failFn: () => {}
                });
            },
            getProductList () {
              this.$request({
                  url: "/act/actScoreExchange/getProductList",
                  // isLoading: true,
                  successFn: data => {
                    this.productList = data.productShowList || []
                  }
              });
            },
            hasBindCardFn (fn=function(){}) {
              this.$request({
                  url: `/ins/vipUserBankcard/list`,
                  userToken: this.userToken,
                  successFn: data => {
                      if(data && data.length > 0){
                          this.hasBindCard = true
                          fn && fn()
                      } else {
                        this.$refs['commonPopup'].showTip({
                          text: '因涉及到您的账户安全，需通过绑定银行卡认证身份',
                          btnText: '去绑卡',
                          twobtn: true,
                          clickFn: () => {
                            location.href = '/externalPay/BindCard.html'
                          }
                        })
                      }
                  },
                  failFn: data => {
                      Toast.info(data.resultMsg);
                  }
              });
            },
            saveReceiverInfo (data) {
              // POST /api/act/actScoreExchange/saveReceiverInfo
              this.$request({
                  url: `/act/actScoreExchange/saveReceiverInfo`,
                  method: "POST",
                  userToken: this.userToken,
                  contentType: "application/json;charset=UTF-8",
                  data: {
                    address: data.detailAdd,
                    area: data.areaAdd,
                    ticketNo: this.ticketNo,
                    receiverMobile: data.iphone,
                    receiverName: data.name
                  },
                  successFn: data => {
                      location.href = '/activity/IntegralExchange/ExRecord.html'
                  },
                  failFn: data => {
                      this.$refs['commonPopup'].showTip({
                        text: data.resultMsg
                      })
                  }
              });
            },
            goExchange (item) {
              if (this.userToken) {
                if (item.count > 0) {
                  this.hasBindCardFn(() => {
                    this.$refs['commonPopup'].showTip({
                      twobtn: true,
                      text: `兑换${item.name}需要花费您${item.price}百佳豆`,
                      clickFn: () => {
                        this.useScoreExchange(item)
                      }
                    })
                  })
                }
              } else {
                this.showLoginPop()
              }
            },
            useScoreExchange (item) {
              this.$request({
                  url: `/act/actScoreExchange/useScoreExchange`,
                  method: "POST",
                  userToken: this.userToken,
                  isEncript: true,
                  contentType: "application/json;charset=UTF-8",
                  data: { productCode: item.code },
                  successFn: data => {
                      this.getScoreNum()
                      this.hideTip()
                      if (item.isSend == 1) {
                        // 刷新百佳豆数量
                        if (data.receiver) {
                          this.person.name = data.receiver.receiverName || ''
                          this.person.iphone = data.receiver.receiverMobile || ''
                          this.person.areaAdd = data.receiver.area || ''
                          this.person.detailAdd = data.receiver.address || ''
                        }
                        // 打开保存收货地址弹框
                        this.showAddress = true
                        // 记录当前的ticketNo
                        this.ticketNo = data.exchangeRecord.ticketNo || 0
                      } else {
                        location.href = '/activity/IntegralExchange/ExRecord.html'
                      }
                  },
                  failFn: data => {
                      let dataText = data.resultMsg || '您的百佳豆余额不足'
                      if (data.resultCode == 'SYS_ERROR_0021') {
                        dataText = '您的百佳豆余额不足'
                      }
                      this.$refs['commonPopup'].showTip({
                        title: '兑换失败',
                        text: dataText
                      })
                  }
              });
            },
            hideTip () {
              this.$refs['commonPopup'].hideTip()
            },
            closeAdd (data) {
              this.showAddress = false
              if (data) {
                this.saveReceiverInfo(data)
              } else {
                location.href = '/activity/IntegralExchange/ExRecord.html'
              }
            },
            downLoadApp () {
              this.$app.downLoadApp()
            },
            goJSSF () {
              location.href = '/activity/appointment/AppLanding.html?secondaryDistributor=APP_00010001'
            }
        },
        watch: {
          person (v) {
            this.person = v
          }
        }
    };
</script>

<style lang="scss" scoped>
.myintegex-wrap {
    padding: 0 30px 30px;
    background-color: #fff;
    color: #fff;
    font-size: 26px;
    .myintegex {
        width: 690px;
        margin: 0 auto;
        .my {
            width: 100%;
            height: 244px;
            background-color: #383E50;
            border-radius: 12px 12px 0 0;
            padding: 26px 40px;
            box-sizing: border-box;

            p {
                text-align: center;
                &.baijiadou {
                    margin-bottom: 12px;
                    color: #fff;
                }
                &.num {
                  margin-bottom: 20px;
                  font-size: 56px;
                  color: #B69665;
                  a {
                    color: #B69665;
                    font-size: 36px;
                  }
                }
            }

            .btns {
              display: flex;
              justify-content: space-between;
              .btn {
                width: 286px;
                height: 60px;
                border: 1px solid #727C99;
                border-radius: 8px;
                line-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #8895B8;
                img {
                  width: 28px;
                  height: 28px;
                  margin-right: 8px;
                }
              }
            }
        }

        .awardList {
          box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.06);
          border-radius: 0 0 12px 12px;
          .item {
            padding: 30px 40px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ececec;
            &:last-of-type {
              border-bottom: none;
            }
            img {
              width: 100px;
              height: 100px;
              margin-right: 32px;
            }
            .right {
              position: relative;
              flex: 1;
              h3 {
                color: #333;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 14px;
              }
              p {
                width: 260px;
                line-height: 32px;
              }
              .p1 {
                font-size: 28px;
                color: #E10312;
                margin-bottom: 14px;
              }
              .p2,
              .p3 {
                font-size: 24px;
                color:#8E8E8E;
                margin-bottom: 8px;
                a {
                  color: #C99D58;
                  text-decoration: underline;
                }
              }
              button {
                width: 136px;
                height: 48px;
                line-height: 48px;
                background-color: #C99D58;
                border-radius: 8px;
                position: absolute;
                color: #fff;
                font-size: 26px;
                right: 0;
                top: 20%;
                &[disabled] {
                  background-color: #ccc;
                }
              }
            }
          }
        }

        .banner {
          margin: 30px auto;
          border-radius: 12px;
        }
    }
}

</style>
