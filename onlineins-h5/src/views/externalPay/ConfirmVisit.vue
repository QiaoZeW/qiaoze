<template>
    <div class="confirm-visit">
        <popup-comp v-model="show1" class="popwrap">
            <h3 class="pop-title">欢迎您使用在线回访</h3>
            <div class="pop-content">若您未完成在线回访，我们将会安<br>排服务专员为您电话回访</div>
            <div class="btns">
              <button id="onlineVisit" class="yes-btn" @click="onlineVisit">在线回访</button>
              <button id="contactMe" class="no-btn" @click="contactShow">电话回访</button>
            </div>
        </popup-comp>

        <md-captcha
          ref="captcha"
          class="visit-captcha"
          title="验证码已发送至投保人手机"
          count-normal-text="重新发送验证码"
          v-model="smsVerifyShow"
          :maxlength="6"
          @submit="smsVerifySubmit"
          @send="smsVerifySend"
          :auto-countdown="false"
        >
          {{ hidePhoneNum }}
        </md-captcha>
        <md-dialog :closable="true" v-model="smsCodeDialog.open" :btns="smsCodeDialog.btns">
          <p style="width: 70%;margin:0 auto;margin-top:20px;">
            <img @click="smsVerifyCode" :src="smsCodeDialog.img" alt>
          </p>
          <p style="margin-top:20px;text-align: center" class="smsCode">
            <md-input-item
              style="text-align: center !important;border-bottom:1px solid #ccc !important;"
              title
              type="text"
              v-model="smsCodeDialog.code"
              maxlength="4"
              placeholder="请输入图形验证码"
            ></md-input-item>
          </p>
        </md-dialog>
        <!-- <popup-comp v-model="show3" class="popwrap">
            <div class="pop-content">
              我们将会在2个工作日后，通过95542<br>
              电话进行回访，请保持您的手机畅<br>
              通，感谢配合！
            </div>
            <div class="btns">
              <button class="yes-btn" @click="contact">我知道了</button>
            </div>
        </popup-comp> -->
    </div>

</template>

<script>
    import { Toast, Dialog } from 'mand-mobile'
    import { Captcha } from 'mand-mobile'
    import PopupComp from '@/components/PopupComp'
    export default {
        name: 'ConfirmVisit',
        components: {
          PopupComp,
          [Captcha.name]: Captcha,
        },
        props: {
           value: {
              type: Boolean,
              default: false
           },
           orderNo: {
              type: String,
              default: ''
           },
           contNo: {
               type: String,
               default: ''
           },
            userPhone:{
                type: String,
                default:  localStorage.getItem('userPhone') || ''
            }
        },
        computed: {
           hidePhoneNum () {
             return this.userPhone.replace(/^(\d{3})\d+(\d{4})$/,'$1***$2')
           }
        },
        data() {
            return {
                userToken: '',
                agentCode: '',
                riskName: '',
                smsVerifyShow: false,
                confirmCode: '',
                show1: false,
                show2: false,
                show3: false,
                smsVerifyFirst: true,
                secondaryDistributor: '',
                riskSource: '',
                smsCodeDialog: {
                  img: "",
                  randomStr: "",
                  code: "",
                  open: false,
                  btns: [
                    {
                      text: "确定",
                      handler: this.smsCodeSend
                    }
                  ]
                },
            }
        },
        created(){
            this.agentCode= this.$router.query('agentCode') || ''
           this.secondaryDistributor = this.$router.query('secondaryDistributor') || localStorage.getItem('cps_secondaryDistributor') || 'APP_00010001'
           this.riskName = JSON.parse(window.localStorage.getItem("riskName"))
           this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || localStorage.getItem('cps_token') || ''
           this.saveSource()
        },
        methods: {
            open () {
              this.show1 = true
            },
            saveSource () {
              const pageObj = {
                '/product/successful': '承保成功页',
                '/externalpay/externallist': '保单列表页',
                '/externalpay/policydetails': '保单详情页',
                 'returnvisitlist/visitlist': '回访订单页'
              }
              let pageref = location.href.toLocaleLowerCase()
              for (var i in pageObj) {
                if (pageref.indexOf(i) > -1) {
                  console.log('ConfirmVisitConfirmVisit-----------', pageObj[i])
                  this.riskSource = pageObj[i]
                  localStorage.setItem("shence_aftersale_questionnaire_risk_source", pageObj[i] || '承保成功页');
                }
              }
            },
            teleConfirm () {
                Dialog.confirm({
                  content: "<span style='padding-bottom: 20px;'>选择电话回访后，我们将通过<span style='color: #ff4747;'>95542</span>电话进行回访，请保持您手机通畅！</span>",
                  confirmText: "电话回访",
                  cancelText: "取消",
                  onConfirm: () => {
                    this.contact('1', () => {
                      let url = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}`
                      if (this.agentCode) {
                        url += `&agentCode=${this.agentCode}`
                      }
                      // bn_oninevisit_huifang_televisit
                      sensors.track("bn_oninevisit_huifang_televisit", {
                        risk_source: this.riskSource,
                        cont_no: this.contNo,
                        risk: this.riskName,
                        secondaryDistributor: this.secondaryDistributor
                      }, () => {
                          location.href = url
                          Dialog.closeAll()
                      });
                    })
                  }
                });
            },
            shenceClickOnline () {
              sensors.track("bn_oninevisit_huifang_clickonline", {
                risk_source: this.riskSource,
                cont_no: this.contNo,
                risk: this.riskName,
                secondaryDistributor: this.secondaryDistributor
              });
            },
            getReturnVisitQuestionnaire() {
                this.$request({
                    url: `/ins/visit/getReturnVisitQuestionnaire`,
                    data: {
                        "contNo": this.contNo,
                        "customerNo": "",
                        "priority": "6"
                    },
                    userToken: this.userToken,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json;charset=UTF-8',
                    method: 'POST',
                    successFn: (data) => {
                        if (data) {
                            if (data.questionList && data.questionList.length > 0) {
                                // 问卷生成进行下一步操作
                                // this.show1 = true
                                this.onlineVisit()
                            } else {
                              Dialog.confirm({
                                title: "提示",
                                content: "<span style='padding-bottom: 20px;'>问卷还没准备好，再试试呢？</span>",
                                confirmText: "再试一下",
                                cancelText: "取消",
                                onConfirm: () => {
                                  this.getReturnVisitQuestionnaire()
                                  Dialog.closeAll()
                                  return false;
                                }
                              });
                            }
                        }
                    },
                    failFn: (data) => {
                      if (data.data.questionList && data.data.questionList.length === 0) {
                          Dialog.confirm({
                            title: "提示",
                            content: "<span style='padding-bottom: 20px;'>问卷还没准备好，再试试呢？</span>",
                            confirmText: "再试一下",
                            cancelText: "取消",
                            onConfirm: () => {
                              this.getReturnVisitQuestionnaire()
                              Dialog.closeAll()
                              return false;
                            }
                          });
                      } else {
                        Dialog.alert({ content: data.resultMsg })
                      }
                    }
                })
            },
            smsCodeSend() {
              if (this.smsCodeDialog.code === "") {
                Toast({
                  content: "请输入图形验证码"
                });
                return false;
              }
              this.smsVerifySend("code");
            },
            smsVerifyCode() {
              this.smsCodeDialog.randomStr = new Date().getTime();
              this.smsCodeDialog.img = this.$router.serverUrl() + "/code/" + this.smsCodeDialog.randomStr;
              this.smsCodeDialog.open = true;
              window.scrollTo(0, 0);
            },
            smsVerifySend (flag) {
               console.log('sendCode-------------', flag)
               if (!this.smsVerifyFirst) {
                  console.log("60秒后发送");
                  return false;
                }

                let data = {};
                data.userName = this.userPhone;
                if (this.smsCodeDialog.code) {
                  data.imageCode = this.smsCodeDialog.code;
                  data.randomStr = this.smsCodeDialog.randomStr;
                }
                this.$request({
                  url: `/portal/sendSmsCode`,
                  method: "POST",
                  isLoading: true,
                  isEncript: true,
                  data: data,
                  contentType: "application/json",
                  successFn: data => {
                    // this.smsVerifyContent = "验证码已发送至 " + data.userName;
                    if (flag === "first" || flag === "code") {
                      this.smsCodeDialog.open = false;
                      this.smsVerifyShow = true;
                    }
                    //发送成功
                    this.smsVerifyFirst = false;
                    this.smsCodeDialog.code = "";
                    this.smsCodeDialog.randomStr = "";

                    this.$refs.captcha.countdown();
                    let _this = this;
                    setTimeout(function() {
                      _this.smsVerifyFirst = true;
                    }, 60 * 1000);
                  },
                  failFn: data => {
                    if (data.resultCode === "SYS_ERROR_001") {
                      this.smsVerifyShow = false;
                      this.smsVerifyCode();
                    } else {
                      this.smsVerifyCode();
                      this.smsCodeDialog.code = "";
                      this.smsCodeDialog.randomStr = "";
                      Toast({
                        content: data.resultMsg
                      });
                    }
                    return false;
                  }
                });
            },
            smsVerifySubmit (val) {
              console.log('smsVerifySubmit-------------', val)
              let _this = this;
              setTimeout(() => {
                this.$request({
                  url: `/portal/validSmsCode/${this.userPhone}/${val}`,
                  method: "GET",
                  isLoading: true,
                  isEncript: true,
                  params: { pathQueryLen: 2 },
                  contentType: "application/json",
                  successFn: data => {
                    if (data) {
                      //成功后，调投保接口
                      this.smsCodeDialog.open = false;
                      this.smsVerifyShow = false;
                      this.smsVerifyFirst = true;

                      // 在线回访保存记录 contact (rvType='0')
                      this.contact('0', () => {
                        // 这里是跳转成功的页面
                        let url = `/activity/Investigation.html?orderNo=${this.orderNo}&contNo=${this.contNo}`
                        if (this.agentCode) {
                          url += `&agentCode=${this.agentCode}`
                        }
                        location.href = url
                      })
                    } else {
                      Toast({
                        content: "验证码错误，请重新输入"
                      });
                    }
                  },
                  failFn: data => {
                    Toast({ content: data.resultMsg });
                    return false;
                  }
                });
              }, 300);
            },
            onlineVisit () {
              this.shenceClickOnline()
              this.show1 = false
              this.smsVerifyShow = true
              // this.smsVerifySend('first')
            },
            contactShow () {
              // 点击选择电话回访
              sensors.track("bn_oninevisit_huifang_clicktele", {
                risk_source: this.riskSource,
                cont_no: this.contNo,
                risk: this.riskName,
                secondaryDistributor: this.secondaryDistributor
              })
              this.show1 = false
              // this.show3 = true
              this.teleConfirm()
            },
            contact (rvType='1', fn) { // rvType='1'--电话回访 '0'--在线回访
              this.$app.getToken((userToken) => {
                let token = userToken || JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || ''
                this.$request({
                    url: `/ins/visit/saveOrderVisitType`,
                    method: 'POST',
                    data: {
                     orderNo: this.orderNo,
                     rvType: rvType
                    },
                    isEncript: true,
                    userToken: token,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        // this.show3=false
                        // if (localStorage.getItem('userPhone') && this.$app.isBrowser()) {
                        //   // app内部清除
                        //   localStorage.removeItem('userPhone')
                        // }
                        fn && fn()
                    },
                    failFn: (data) => {
                        Dialog.alert({content: data.resultMsg})
                    }
                })
              })
            }
        },
        watch: {
          value (v) {
            this.show1 = v
          },
          show1 (n) {
            this.$emit('input', n)
          }
        }
    }

</script>

<style lang="scss" scoped>
.confirm-visit {
   .popwrap {
      .pop-title {
        font-size: 36px;
        color: #333;
        font-weight: bold;
      }
      .pop-content {
        font-size: 28px;
        color: #8E8E8E;
        line-height: 40px;
        margin: 30px auto 48px;
      }
      .send-code {
        font-size: 24px;
        color: #3B9CF7;
        text-align: right;
        margin-top: 18px;
      }
      .btns {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
          width: 402px;
          height: 88px;
          line-height: 88px;
          font-size: 32px;
          text-align: center;
          box-sizing: border-box;
          border-radius: 12px;
          &.yes-btn {
            background-color: #E10312;
            color: #fff;
          }
          &.no-btn {
            background-color: #fff;
            color: #8E8E8E;
            border: 1px solid #8E8E8E;
            margin-top: 40px;
          }
        }
      }
    }
}
</style>

<style lang="scss">
  .visit-captcha {
      .md-captcha-title {
        font-size: 32px;
        color: #333;
      }
      .md-captcha-content {
        font-size: 32px;
        color: #333;
      }
      .md-codebox.is-justify .md-codebox-box {
        border: 1px solid #979797;
        border-radius: 8px;
      }
  }
</style>
