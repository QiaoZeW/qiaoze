<template>
    <md-popup v-model="loginPopupShow">
      <div class="ex-login-wrap">
          <md-icon @click="loginPopupShow=false" class="close" name="wrong" size="lg" />
          <div class="ex-login">
              <div class="form">
                <div class="form-item">
                  <input
                    id="proposerPhone"
                    class="input-item proposerPhone"
                    type="text"
                    placeholder="请输入手机号"
                    v-model="proposerPhone"
                    maxlength="11"
                    @blur="checkPhone(proposerPhone)"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    />
                </div>

                <div class="form-item code">
                  <input
                    id="verificationCode"
                    class="input-item verificationCode"
                    type="text"
                    v-model="verificationCode"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入验证码"
                    :readonly="isReadonly"
                    maxlength="6"
                    />
                    <input v-if="!isShowCode" class="button" type="button" @click="verifySend('first')" value="获取验证码" />
                    <input v-else type="button" class="button" :value="times + 's'" />
                </div>
                <div class="subbtn">
                    <md-button type="primary" :disabled="!canLogin" @click="subFn">登录</md-button>
                </div>
              </div>
          </div>
          <md-dialog
              :closable="true"
              v-model="smsCodeDialog.open"
              :btns="smsCodeDialog.btns"
          >
              <p style="width: 70%;margin:0 auto;margin-top:20px;">
                  <img @click="smsVerifyCode" :src="smsCodeDialog.img" alt="" />
              </p>
              <p style="margin-top:20px;text-align: center">
                  <input
                      style="font-size:22px;text-align:center;
                            -webkit-appearance:none;-webkit-text-fill-color:#111a34;
                            border:none;border-bottom:1px solid #000;"
                      type="text"
                      v-model="smsCodeDialog.code"
                      maxlength="4"
                      placeholder="请输入图形验证码"
                  />
              </p>
          </md-dialog>
      </div>
    </md-popup>
</template>

<script>
import { Dialog, Toast } from "mand-mobile";
export default {
    name: "Login",
    title: "登录模块",
    components: {},
    props: {},
    computed: {
      canLogin () {
        return this.proposerPhone && this.verificationCode && this.verificationCode.length == 6
      }
    },
    data() {
        return {
            loginPopupShow: false,
            isReadonly: true,
            verificationCode: "",
            isShowCode: false,
            proposerPhone: "",
            codeShow: "",
            times: 60,
            codeCount: 1,
            isClickShow: false,
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
            inviterCode: "",
            secondaryDistributor: "",
            thirdClassDistributor: ""
        };
    },
    created() {
        this.inviterCode = this.$router.query("inviterCode") || "";
        this.secondaryDistributor =
            this.$router.query("secondaryDistributor") || "";
        this.thirdClassDistributor =
            this.$router.query("thirdClassDistributor") || ""
    },
    methods: {
        show () {
          this.loginPopupShow = true
        },
        hide () {
          this.loginPopupShow = false
        },
        refreshBtn() {
            this.isShowCode = !this.isShowCode;
            this.isReadonly = false;
            let interval = setInterval(() => {
                this.times--;
                if (this.times == 0) {
                    clearInterval(interval);
                    this.isShowCode = !this.isShowCode;
                    this.times = 5;
                }
            }, 1000);
        },
        checkPhone(phone) {
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(phone)) {
                Toast.failed("您输入的手机号格式不正确！");
                return false;
            } else {
                return true;
            }
        },
        smsCodeSend() {
            if (this.smsCodeDialog.code === "") {
                Toast({
                    content: "请输入图形验证码"
                });
                return false;
            }
            this.isClickShow = true;
            this.smsCodeDialog.open = false;
            this.verifySend("code");
        },
        smsVerifyCode() {
            this.smsCodeDialog.randomStr = new Date().getTime();
            this.smsCodeDialog.img =
                this.$router.serverUrl() +
                "/code/" +
                this.smsCodeDialog.randomStr;
            this.smsCodeDialog.open = true;
        },
        verifySend(flag) {
            if (this.proposerPhone.length !== 11) {
                Toast.info("您的手机号格式不正确");
                return false;
            }
            if (!this.proposerPhone) {
                Toast.info("请输入您的手机号");
                return false;
            }
            let data = {
                userName: this.proposerPhone
            };
            if (this.smsCodeDialog.code) {
                data.imageCode = this.smsCodeDialog.code;
                data.randomStr = this.smsCodeDialog.randomStr;
            }
            console.log("data", data);
            this.$request({
                url: `/portal/sendSmsCode`,
                method: "POST",
                isLoading: true,
                isEncript: true,
                data: data,
                contentType: "application/json",
                successFn: data => {
                    if (data) {
                        Toast({
                            content: "验证码已发送至" + this.proposerPhone
                        });
                        if (flag === "first" || flag === "code") {
                            this.smsCodeDialog.open = false;
                        }
                        this.refreshBtn();
                    } else {
                        Toast.failed("验证码发送失败，请稍后再试！");
                    }
                },
                failFn: data => {
                    if (
                        data.resultCode === "SYS_ERROR_001" ||
                        data.resultCode === "SYS_ERROR_003" ||
                        data.resultCode === "SYS_ERROR_002"
                    ) {
                        this.smsVerifyCode();
                    } else {
                        Toast({
                            content: data.resultMsg
                        });
                    }
                    return false;
                }
            });
        },
        subFn() {
            let subDatas = {
                deviceNo: Date.now(),
                fastFlag: true,
                imageCode: this.smsCodeDialog.code,
                inviterCode: "", // 邀请人userCode
                password: "",
                activityType: "14",
                randomStr: this.smsCodeDialog.randomStr,
                smsCode: this.verificationCode,
                userName: this.proposerPhone
            };
            this.$request({
                url: "/portal/fast/register2",
                method: "POST",
                data: subDatas,
                isLoading: true,
                isEncript: true,
                contentType: "application/json",
                successFn: data => {
                    console.log("data", data);
                    //成功后，调投保接口
                    this.smsCodeDialog.open = false;
                    this.smsCodeDialog.code = "";
                    this.isClickShow = false;
                    this.smsVerifyFirst = true;
                    Toast.succeed("验证成功");
                    setTimeout(() => {
                        sessionStorage.setItem("userPhone", this.proposerPhone);
                        sessionStorage.setItem("inviterCode", data.userCode);
                        sessionStorage.setItem(
                            "USER_TOKEN_PAY",
                            JSON.stringify(data.accessToken)
                        );
                        this.$emit('getData', {
                          userCode: data.userCode,
                          userToken: data.accessToken
                        })
                        this.loginPopupShow = false
                        // location.href = `/product/giving/Gbuy.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}`;
                    }, 1500);
                },
                failFn: data => {
                    this.smsCodeDialog.code = "";
                    this.codeShow = true;
                    if (data.resultCode === "SYS_ERROR_0037") {
                        Toast({
                            content: data.resultMsg
                        });
                        this.subFn();
                        return false;
                    } else {
                        Toast({
                            content: data.resultMsg
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss">
.myButton {
    width: 2.5rem !important;
}
.ex-login-wrap {
    background-color: #fff;
    width: 642px;
    border-radius: 12px;
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #ececec;
      z-index: 10;
    }
    .ex-login {
        padding: 70px 46px 46px;

        .form {
          .form-item {
            margin-bottom: 40px;

            &.code {
              display: flex;
              justify-content: space-between;
            }
            .input-item {
              width: 100%;
              height: 88px;
              border: 1px solid #A6ACBF;
              border-radius: 8px;
              padding-left: 1em;
              box-sizing: border-box;
              font-size: 30px;

              &.verificationCode {
                width: 302px;
              }
            }
            input[type=button] {
              width: 196px;
              height: 88px;
              background-color: #5B637B;
              border-radius: 8px;
              color: #fff;
              font-size: 28px;
            }
          }
          .subbtn {
              .md-button {
                  width: 100%;
                  height: 88px;
                  &[disabled] {
                    background-color: #ccc;
                  }
              }
          }
        }
        .myField {
            position: relative;
            width: 100% !important;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 0 !important;

            .md-field-item-content {
                border: 2px solid #A6ACBF !important;
                margin-bottom: 34px;
                border-radius: 8px;
                height: 88px;
                min-height: 88px;
                padding-left: 20px;
            }
            .md-field-item-control {
                font-size: 30px !important;
            }
            .md-input-item-input {
                text-align: left !important;
            }
            .md-button {
                width: 184px;
                height: 88px;
                font-size: 28px;
                line-height: 88px;
            }
            .subbtn {
                .md-button {
                    width: 100%;
                    height: 88px;
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
</style>
