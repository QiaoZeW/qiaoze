<template>
    <section class="myBindCardWrap">
        <div class="md-example-child md-example-child-input-item-2 myBindCard">
            <md-field>
                <md-field-item
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    title="选择银行"
                    class="particularTop"
                    placeholder="请选择"
                    :content="bankName"
                    @click.native="isBankPayShow = true"
                >
                </md-field-item>
                <md-picker
                    v-model="isBankPayShow"
                    :data="bankData"
                    @confirm="getBankConfirm"
                ></md-picker>

                <md-input-item
                    title="银行卡号"
                    type="bankCard"
                    v-model="bankNum"
                    :maxlength="19"
                    placeholder="请输入银行卡号"
                    @click="errorShow = false"
                    @blur="bankCardCheck()"
                ></md-input-item>
                <md-notice-bar icon="clear" type="warning" v-if="errorShow">
                    您输入的卡号所属银行与您选择的银行不一致
                </md-notice-bar>
                <md-input-item
                    title="姓名"
                    :maxlength="14"
                    placeholder="请输入姓名"
                    v-model="name"
                    @blur="checkName(name)"
                ></md-input-item>
                <md-input-item
                    title="证件号"
                    placeholder="请输入身份证号"
                    is-amount
                    v-model="cardNum"
                    @blur="checkCard(cardNum)"
                    :maxlength="18"
                ></md-input-item>
                <md-input-item
                    title="银行预留手机号"
                    type="phone"
                    v-model="phone"
                    @click="checkPhone(phone)"
                    placeholder="请输入银行预留手机号"
                ></md-input-item>
            </md-field>
        </div>
        <div class="bind_btn">
            <button @click="bind">绑定</button>
        </div>
        <Epopup ref="commonPopup" />
    </section>
</template>

<script>
import { Toast, Dialog } from "mand-mobile";
import bankCheckData from "@/static/bankdata.js";
import Epopup from '@/views/activity/IntegralExchange/Epopup'

export default {
    data() {
        return {
            name: "",
            cardNum: "",
            phone: "",
            bankNum: "",
            isBankPayShow: false,
            bankName: "",
            bankData: [],
            bankCode: "",
            errorShow: false,
            userCode: "",
            userToken:''
        };
    },
    components: {
      Epopup
    },
    created() {
        this.userCode = sessionStorage.getItem("inviterCode") || ''
        this.userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN_PAY'))
        if (!this.userToken) {
          location.href = '/activity/IntegralExchange/MyIntegEx.html'
          return false
        }
        this.getBankData();
    },
    methods: {
        bind() {
            if (
                !this.bankName ||
                !this.bankNum ||
                !this.name ||
                !this.cardNum ||
                !this.phone
            ) {
                Toast.failed("您有信息未填写");
                return false;
            }
            this.bankCardCheck();
            if (this.errorShow) {
                Toast.failed("您的银行卡输入有误");
                return false;
            }
            let resultName = this.checkName(this.name),
                resultCard = this.checkCard(this.cardNum),
                resultPhone = this.checkPhone(this.phone);
            if (!resultName) {
                Toast.failed("您的名字输入有误");
                return false;
            }
            if (!resultCard) {
                Toast.failed("您的身份证输入有误");
                return false;
            }
            if (!resultPhone) {
                Toast.failed("您的手机号输入有误");
                return false;
            }
            let data = {
                accName: this.name,
                accNo: this.bankNum,
                bankCode: this.bankCode,
                bankMobile: this.phone,
                bankName: this.bankName,
                cardType: "0",
                idNo: this.cardNum,
                userCode: this.userCode
            };
            this.$request({
                url: `/ins/vipUserBankcard/addBankcardNew`,
                method: "POST",
                userToken: this.userToken,
                contentType: "application/json;charset=UTF-8",
                data: data,
                successFn: data => {
                    if(data){
                        location.href = '/activity/IntegralExchange/MyIntegEx.html'
                    }
                    console.log(data);
                },
                failFn: data => {
                    this.$refs['commonPopup'].showTip({
                      title: '绑卡失败',
                      text: data.resultMsg
                    })
                }
            });
        },
        getBankConfirm(columnsValue) {
            this.bankName = columnsValue[0].label;
            this.bankCode = columnsValue[0].value;
            if (this.bankNum) {
                this.bankCardCheck();
            }
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
        checkName(name, e = null) {
            var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
            if (!regName.test(name)) {
                Toast.failed("您输入的姓名格式不正确！");
                return false;
            }
            return true;
        },
        bankCardCheck() {
            if (!this.bankNum) {
                Toast.failed("银行卡号不可为空");
                return false;
            }
            var bankAardThree = this.bankNum.substring(0, 3);
            var bankAardFour = this.bankNum.substring(0, 4);
            var bankAardFive = this.bankNum.substring(0, 5);
            var bankAardSix = this.bankNum.substring(0, 6);
            if (!this.bankCode) {
                this.errorShow = true;
                return false;
            }
            var bankCheckCode = this.bankCode;
            var checkData = bankCheckData[bankCheckCode];
            var bankBoolean = false;

            checkData.every(function(item, i) {
                if (
                    item.six_num == bankAardThree ||
                    item.six_num == bankAardFour ||
                    item.six_num == bankAardFive ||
                    item.six_num == bankAardSix
                ) {
                    bankBoolean = true;
                    return false;
                } else {
                    bankBoolean = false;
                    return true;
                }
            });
            if (bankBoolean == false) {
                this.errorShow = true;
            } else {
                this.errorShow = false;
            }
            if (bankAardSix.length === 0) {
                this.errorShow = false;
            }
        },
        getBankData() {
            this.$request({
                url: `/sys/dict/type`,
                method: "POST",
                contentType: "application/json;charset=UTF-8",
                data: { type: "type_bank" },
                successFn: data => {
                    this.bankData = [data];
                },
                failFn: data => {}
            });
        },
        v_trim(s) {
            return s.replace(/\s/g, "");
        },
        checkCard(item) {
            const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            var idCard = this.v_trim(item);
            if (regIdCard.test(this.v_trim(idCard))) {
                if (idCard.length == 18) {
                    var idCardWi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
                    var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                    var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                    for (var i = 0; i < 17; i++) {
                        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                    }
                    var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
                    var idCardLast = idCard.substring(17); // 得到最后一位身份证号码
                    if (idCardMod == 2) {
                        if (idCardLast == "X" || idCardLast == "x") {
                            return true;
                        } else {
                            Toast.failed("您输入的身份证号不正确！");
                            return false;
                        }
                    } else {
                        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                        if (idCardLast == idCardY[idCardMod]) {
                            return true;
                        } else {
                            Toast.failed("您输入的身份证号不正确！");
                            return false;
                        }
                    }
                }
            } else {
                Toast.failed("您输入的身份证号不正确！");
                return false;
            }
        }
    }
};
</script>

<style lang="scss">
.myBindCardWrap {
    background: #f2f2f2;
    min-height: 100%;

    .myBindCard {
        padding-top: 22px;
        .md-field-item-content {
            border-top: 1px solid #ececec;
        }
        .particularTop .md-field-item-content {
            border-top: none;
        }
        .md-field-item-placeholder {
            color: #333;
        }
        .md-field {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            margin: 0;
        }
        .md-field-item-content:before {
            width: 0% !important;
        }
        .md-field-item-title {
            font-size: 28px;
        }
        .md-notice-bar.warning {
            border: 1px dashed;
            margin-bottom: 20px;
            border-radius: 20px;
        }
    }
    .bind_btn {
        text-align: center;
        margin-top: 70px;
        button {
            width: 538px;
            height: 88px;
            background: rgba(225, 3, 18, 1);
            border-radius: 10px;
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }
}

</style>
