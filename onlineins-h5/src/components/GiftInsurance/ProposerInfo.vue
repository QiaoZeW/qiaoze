<template>
  <div class="md-example-popup md-example-popup-bottom">
      <div class="contentS">
          <div class="white-box-top"></div>
          <div class="proposerInfo" v-if="proposerInfoShow">
            <span class="cancelLogo" @click="cancelFunc"></span>
            <div class="proposerContent">
                <md-input-item
                  placeholder="请输入监护人姓名"
                  v-model="proposerName"
                  id="proposerName"
                  name="proposerName"
                  :maxlength="14"
                  @blur="checkName(proposerName,$event)"
                ></md-input-item>
                <md-input-item
                  ref="input1"
                  placeholder="请输入监护人身份证号码"
                  is-amount
                  v-model="proposerCard"
                  id="proposerCard"
                  name="proposerCard"
                  :maxlength="18"
                  @blur="cardNumBeneficary(proposerCard,$event)"
                ></md-input-item>
                <div class="tipInfo">*因被保人未满18周岁，需提供监护人信息</div>
            </div>
            <div class="closePopup" @click="closePopup">提交监护人信息，并免费领取</div>
          </div>
      </div>
  </div>
</template>

<script>
import {
    Toast,
} from "mand-mobile";
export default {
    name: 'ProposerInfo',
    props: {
      proposerInfoShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
            insuredCard:'',
            proposerName:'',
            proposerCard:'',
            shenceErrorMessage:'',
        }
    },
    created () {
    },
    methods: {
        cancelFunc(){
            this.$emit("cancelProposer",false)
        },
        closePopup(){
            this.insuredCard = window.localStorage.getItem("insuredCard")
            let result = this.submitCheck();
            if (!result) {
                //神策埋点增加错误信息记录
                if(this.shenceErrorMessage){
                    this.$emit('proposerInfoError',{shenceErrorMessage:this.shenceErrorMessage,proposerName:this.proposerName,proposerCard:this.proposerCard})
                }
              return false;
            }
            let proposerInfo = {
                "proposerName":this.proposerName,
                "proposerCard":this.proposerCard
            }
            this.$emit('proposerInfoFun',proposerInfo)
        },
        cardNumBeneficary(phone, e = null) {
          if (this.checkCard(phone)) {
            return true;
          } else {
            Toast.failed("监护人的身份证号码不正确！");
            return false;
          }
        },
        checkCard(item) {
          const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
          var idCard = this.v_trim(item);
          if (regIdCard.test(this.v_trim(idCard))) {
            if (idCard.length == 18) {
              var idCardWi = new Array(
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
              );
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
                  return false;
                }
              } else {
                // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          } else {
            return false;
          }
        },
        // 去空格
        v_trim(s) {
          return s.replace(/\s/g, "");
        },
        checkName(name, e = null) {
          var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
          if (!regName.test(name)) {
            Toast.failed("您输入的姓名格式不正确！");
            return false;
          } else {
            return true;
          }
        },
        //校验
        checkInput(item, conS) {
          if (item == "" || !item) {
            Toast.failed(conS);
            return false;
          } else {
            return true;
          }
        },
        checkInputS(item, conS) {
          if (item == "请选择" || item == "") {
            Toast.failed(conS);
            return false;
          } else {
            return true;
          }
        },
        checkInput1(item) {
          document
            .getElementById(item)
            .getElementsByTagName("input")[0]
            .focus();
        },
        getAge(cardNo) {
          var returnAge;
          var strBirthday =
            cardNo.substring(6, 10) +
            "-" +
            cardNo.substring(10, 12) +
            "-" +
            cardNo.substring(12, 14);
          var strBirthdayArr = strBirthday.split("-");
          var birthYear = strBirthdayArr[0];
          var birthMonth = strBirthdayArr[1];
          var birthDay = strBirthdayArr[2];
          var d = new Date();
          var nowYear = d.getFullYear();
          var nowMonth = d.getMonth() + 1;
          var nowDay = d.getDate();
          let birthDate = (new Date() - new Date(strBirthday).getTime())/(24*3600*1000);
          if(birthDate >= 28){
              this.ifAge = true;
          }
          console.log(birthDate/(24*3600*1000))
          if (nowYear == birthYear) {
            returnAge = 0; //同年 则为0岁
          } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
              if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                  returnAge = ageDiff - 1;
                } else {
                  returnAge = ageDiff;
                }
              } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                  returnAge = ageDiff - 1;
                } else {
                  returnAge = ageDiff;
                }
              }
            } else {
              returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
          }
          return returnAge; //返回周岁年龄
        },
        submitCheck() {
          this.shenceErrorMessage="";
          if (!this.checkInput(this.proposerName, "请输入监护人姓名")) {
            this.checkInput1("proposerName");
            this.shenceErrorMessage = "监护人姓名为空"
            return false;
          }
          if (!this.checkInput(this.proposerCard, "请输入监护人身份证号码")) {
            this.checkInput1("proposerCard");
              this.shenceErrorMessage = "监护人身份证号码为空"
            return false;
          }
          let checkNameResult = this.checkName(this.proposerName);
          if (!checkNameResult) {
              this.shenceErrorMessage = "监护人姓名不符"
            return false;
          }
          let cardNumBeneficaryResult = this.cardNumBeneficary(this.proposerCard);
          if (!cardNumBeneficaryResult) {
              this.shenceErrorMessage = "监护人身份证号不符"
            return false;
          }
          let insuredAge = this.getAge(this.insuredCard);
          let proposerAge = this.getAge(this.proposerCard);

          if((proposerAge - insuredAge) < 18){
            Toast.failed("监护人需大于被保人18岁以上！");
              this.shenceErrorMessage = "监护人未大于被保人18岁以上"
            return false;
          }
          return true;
        },
    }
}
</script>

<style lang='scss' scoped>
    .contentS{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10rem;
        background: #FFF;
        border-radius:20px 20px 0px 0px;
        h2{
            text-align: center;
            font-weight: bold;
        }
    }
    .white-box-top{
        height:2.13333rem;
    }
    .proposerInfo{
        border-radius:20px 20px 0px 0px;
        margin: 0rem 0.53333rem 0px;
        .cancelLogo{
            width: 56px;
            height: 56px;
            top: 25px;
            right: 35px;
            position: absolute;
            background: url(../../assets/imgs/giftInsurance/cancel.png) no-repeat;
            background-size: 100%;
        }
    }
    .proposerContent{
        /* margin: 160px 40px 0px; */
        height: 383px;
    }
    .closePopup{
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        color: #fff;
        border-radius: 10px;
        text-align: center;
        background: #FE4817;
    }
    .tipInfo{
        margin-top: 37px;
        margin-left: 23px;
        font-size: 26px;
        color: #FFB47E;
    }
</style>
<style lang="css">
    #proposerName .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/name.png") no-repeat  24px 50%;
        background-size: 42px 43px;
    }
    #proposerCard .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/idcard.png") no-repeat  24px 50%;
        background-size: 45px 31px;
    }
</style>
