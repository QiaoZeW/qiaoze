<template>
    <div class="login-wrap">
        <div class="giving">
            <md-field class="myField">
                <md-input-item
                    placeholder="请输入手机号"
                    type="phone"
                    is-amount
                    class="myInput"
                    v-model="proposerPhone"
                    @blur="checkPhone(proposerPhone)"
                >
                    <img
                        class="phone"
                        slot="left"
                        src="@/assets/imgs/giving/phone.png"
                        alt=""
                    />
                </md-input-item>
                <md-input-item
                    v-model="verificationCode"
                    placeholder="请输入验证码"
                    is-amount
                    type="digit"
                    :readonly="isReadonly"
                    maxlength="6"
                >
                    <img
                        class="password"
                        slot="left"
                        src="@/assets/imgs/giving/password.png"
                        alt=""
                    />
                    <md-button
                        type="warning"
                        slot="right"
                        class="myButton"
                        size="small"
                        @click.native="verifySend('first')"
                    >
                        <span v-if="!isShowCode">获取验证码</span>
                        <span v-else>{{ times }} s</span>
                    </md-button>
                </md-input-item>
                <div class="agreement">
                    <md-agree
                        v-model="agreeConf.checked"
                        :disabled="agreeConf.disabled"
                        :size="agreeConf.size"
                        @change="
                            onChange(agreeConf.name, agreeConf.checked, $event)
                        "
                    >
                        我已认真阅读并确认<a @click="goUserAdd">《用户协议》</a
                        ><a @click="goPrivacy">《隐私协议》</a>
                    </md-agree>
                </div>
                <div class="subbtn">
                    <md-button type="warning" round @click="subFn"
                        >我要领</md-button
                    >
                </div>
            </md-field>
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
</template>

<script>
import { Dialog, Toast } from "mand-mobile";
export default {
    name: "Login",
    title: "登录模块",
    components: {},
    props: {},
    data() {
        return {
            isReadonly: true,
            verificationCode: "",
            isShowCode: false,
            proposerPhone: "",
            codeShow: "",
            times: 60,
            codeCount: 1,
            isClickShow: false,
            agreeConf: {
                checked: false,
                name: "agree0",
                size: "md",
                disabled: false,
                introduction: "选中状态"
            },
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
            thirdClassDistributor: "",
            shareImgUrl: require("../assets/imgs/giving/shareImg.png"),
            anonymousId:""
        };
    },
    created() {
        this.inviterCode = this.$router.query("inviterCode") || "";
        this.secondaryDistributor =
            this.$router.query("secondaryDistributor") || "";
        this.thirdClassDistributor =
            this.$router.query("thirdClassDistributor") || "";
        let options = {};
        (options.title = "百年人寿重疾险限时0元购"),
            (options.desc = "重疾险不要钱，帮好友保额翻倍"),
            (options.href = location.href);
        options.link =
            this.$router.siteUrl() + `/product/giving/Glogin.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}`
        options.imgUrl = this.$router.siteUrl() + this.shareImgUrl;
        this.$app.wxShareDetail(options);
        sensors.quick('isReady',()=>{
            this.anonymousId = sensors.quick('getAnonymousID');
        });
        //微信小程序获得token
        if(this.$app.isMiniProgram()){
            let isbn = this.$router.query("isbn");
            window.localStorage.removeItem('isbn');
            if('1'==isbn){
                window.localStorage.setItem("isbn","1");
            }
        }
    },
    methods: {
        goUserAdd() {
            window.location.href =
                this.$router.siteUrl() + "/product/UserAgreement.html";
        },
        goPrivacy() {
            window.location.href =
                this.$router.siteUrl() + "/product/PrivacyState.html";
        },
        onChange(name, checked) {
            console.log(
                `agree name = ${name} is ${checked ? "checked" : "unchecked"}`
            );
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
            if (!this.agreeConf.checked) {
                Toast({
                    content: "请勾选条款及协议"
                });
                return false;
            }
            let subDatas = {
                deviceNo: Date.now(),
                fastFlag: true,
                imageCode: this.smsCodeDialog.code,
                inviterCode: "", // 邀请人userCode
                password: "",
                activityType: "07",
                randomStr: this.smsCodeDialog.randomStr,
                smsCode: this.verificationCode,
                userName: this.proposerPhone,
                anonymousId: this.anonymousId,
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
                        localStorage.setItem("mobile", this.proposerPhone);
                        localStorage.setItem("inviterCode", data.userCode);
                        localStorage.setItem(
                            "USER_TOKEN_PAY",
                            JSON.stringify(data.accessToken)
                        );
                        if (this.$app.isMiniProgram() && this.$app.isBnMiniApp()) {
                            window.localStorage.setItem("cps_token",data.accessToken);
                            window.localStorage.setItem("miniapp_user_code",data.userCode);
                        }
                        location.href = `/product/giving/Gbuy.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}`;
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
.login-wrap {
    .giving {
        padding: 0 22px;
        .myField {
            position: relative;
            width: 100% !important;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 0 !important;

            .md-field-item-content {
                border: 2px solid #ffac9f !important;
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
            .agreement {
                .md-agree {
                    color: #8e8e8e;
                    font-size: 24px;
                }
                a {
                    color: #f35351;
                }
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
