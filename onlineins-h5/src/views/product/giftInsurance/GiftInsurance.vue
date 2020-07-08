<template>
    <div>
        <div class="box">
            <div class="info-title">填写信息</div>
            <md-field title="" class="block">
                <md-input-item
                  placeholder="请输入您的姓名"
                  v-model="insuredName"
                  id="insuredName"
                  name="insuredName"
                  :maxlength="14"
                  @blur="checkName(insuredName,$event)"
                ></md-input-item>
                <md-input-item
                  ref="input1"
                  placeholder="请输入您的身份证号码"
                  is-amount
                  v-model="insuredCard"
                  id="insuredCard"
                  name="insuredCard"
                  :maxlength="18"
                  @blur="cardNumBeneficary(insuredCard,$event)"
                ></md-input-item>
                <md-input-item
                  placeholder="请输入用于接收保单通知的手机号"
                  type="phone"
                  v-model="insuredPhone"
                  name="insuredPhone"
                  @blur="checkPhone(insuredPhone,$event)"
                  id="insuredPhone"
                ></md-input-item>
                <div class="smsvalue">
                    <md-input-item
                      placeholder="请输入验证码"
                      type="digit"
                      v-model="smsvalue"
                      name="smsvalue"
                      :maxlength="6"
                      @blur="checkSmsvalue(smsvalue,$event)"
                      id="smsvalue"
                    >
                    </md-input-item>
                    <div class="smsContent" v-if="codeCount==0" @click="smsVerifySend">获取验证码</div>
                    <div class="smsContent" v-if="codeCount!=0" >{{codeCount}}s</div>

                </div>
                <div class="confirmIcon">
                    <div class="iconChoose1" v-if="showIcon" @click="changeIcon"></div>
                    <div class="iconChoose2" v-else @click="changeIcon"></div>
                    <div class="readConfirm">我已阅读</div>
                    <div class="userAdd" @click="goProductClause">《产品条款》</div>
                    <div class="userAdd" @click="goInstruction">《投保协议》</div>
                </div>
                <md-popup v-model="isPopupShow.bottom" position="bottom" class="myPopup">
                  <md-popup-title-bar
                    :title="popTitle"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="hidePopUp('bottom')"
                    @cancel="hidePopUp('bottom')"
                  ></md-popup-title-bar>
                  <agreement :agreementShow="agreementShow"/>
                </md-popup>
                <md-popup v-model="isPopupShow2.bottom" position="bottom" class="myPopup">
                  <proposerInfo :proposerInfoShow="proposerInfoShow" @proposerInfoFun="getProposerInfo($event)" @cancelProposer="getCancelProposer($event)" @proposerInfoError="getProposerInfoError($event)"/>
                </md-popup>
                <div class="freeGet" @click="getFree">免费领取</div>
                <div class="rule">
                    <h4 class="getRule">领取规则</h4>
                    <div class="ruleContent">
                        <p>1.赠送对象：28天-55岁</p>
                        <p>2.同一被保险人仅能同时拥有1份有效的《百年药惠通特种药品费用医疗保险》</p>
                        <p>3.您以上填写的为被保险人信息，被保险人姓名和身份证号码务必一致，领取后信息无法修改，若信息有误将导致保单失效，请谨慎填写。</p>
                    </div>
                </div>
                <div class="lastWord">*活动最终解释权归百年人寿所有</div>
            </md-field>
        </div>
        <md-dialog
          title="领取失败"
          :closable="true"
          v-model="basicDialog.open"
          :btns="basicDialog.btns"
        >
          出生满28天到55周岁可领取本产品
        </md-dialog>
        <md-dialog :closable="true" v-model="smsCodeDialog.open" :btns="smsCodeDialog.btns" id="smsPic">
          <p style="width: 70%;margin:0 auto;">
            <img @click="smsVerifyCode" :src="smsCodeDialog.img" alt>
          </p>
          <p style="margin-top:5px;text-align: center" class="smsCode">
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
    </div>
</template>

<script>
    import {
      Agree,
      ActionBar,
      Field,
      FieldItem,
      InputItem,
      Picker,
      Icon,
      Toast,
      Dialog,
      Button,
      TabPicker,
      Captcha
    } from "mand-mobile";
    import Whirl from "@/components/Whirl";
    import Error from "@/components/Error";
    import Agreement from "@/components/BuyComp/Agreement";
    import ProposerInfo from "@/components/GiftInsurance/ProposerInfo";
    import TabpickerSup from "@/components/BuyComp/TabpickerSup";
    import TipComp from "@/components/BuyComp/TipComp";
    export default {
        name:"GiftInsurance",
        components:{
            [Agree.name]: Agree,
            [ActionBar.name]: ActionBar,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [InputItem.name]: InputItem,
            [Picker.name]: Picker,
            [Dialog.name]: Dialog,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [TabPicker.name]: TabPicker,
            [Captcha.name]: Captcha,
            Whirl,
            Error,
            Agreement,
            ProposerInfo,
            TabpickerSup,
            TipComp
        },
        data () {
            return {
                codeCount: '',
                shenceErrorMessage:"",
                ifAge:false,
                secondaryDistributor:'',
                thirdClassDistributor:'',
                productRiskId:'',
                showIcon: true,
                anonymousId: '',
                relationToAppnt: '00',
                userToken: '',
                agreementShow: true,
                proposerInfoShow: false,
                popTitle: "用户协议",
                isPopupShow: {},
                isPopupShow2: {},
                insuredName: '',
                insuredCard: '',
                insuredPhone: '',
                proposerCard: '',
                proposerName: '',
                proposerPhone: '',
                agreeConf: {
                  checked: true,
                  name: "agree0",
                  size: "md",
                  disabled: false,
                  introduction: "选中状态"
                },
                smsvalue: '',
                smsVerifyShow: false,
                smsVerifyAppendTo: document.body,
                smsVerifyContent: "",
                smsVerifyFirst: true,
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
                basicDialog: {
                  open: false,
                  btns: [
                    {
                      text: '确认',
                      handler: this.onBasicConfirm,
                    },
                  ],
                },
            }
        },
        created () {
            document.title = '百年抗癌特药险'
            this.secondaryDistributor = this.$router.query("secondaryDistributor")
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor")
            this.productRiskId = this.$router.query("productRiskId")
            if(window.localStorage.getItem("insuredName")){
               this.insuredName = window.localStorage.getItem("insuredName")
            }
            if(window.localStorage.getItem("insuredCard")){
               this.insuredCard = window.localStorage.getItem("insuredCard")
            }
            if(window.localStorage.getItem("insuredPhone")){
               this.insuredPhone = window.localStorage.getItem("insuredPhone")
            }
            let _this = this
            sensors.quick('isReady',function(){
                _this.anonymousId = sensors.quick('getAnonymousID');
            });
        },
        methods:{
            /**
             * 赠险填写信息成功
             */
            shenceZxFillInfo(callback){
                sensors.track('zx_fill_info', {
                    gift_name:document.title,	//产品名称
                    insured_name:this.insuredName,	//被投保人姓名
                    insured_id_no:this.insuredCard,	//被投保人证件号
                    insured_mobile:	this.insuredPhone,//被投保人联系电话
                    secondaryDistributor: this.secondaryDistributor //二级经销商
                },callback)
            },
            /**
             * 赠险填写信息失败
             * @param callback
             */
            shenceZxFillInfoError(fail_reason){
                let proposerName = "";
                let proposerIdNo = "";
                if(this.insuredCard&&this.getAge(this.insuredCard)<18){
                    proposerName = this.proposerName;
                    proposerIdNo = this.proposerCard;
                }
                sensors.track('zx_fill_info_error', {
                    gift_name:document.title,	//产品名称
                    secondaryDistributor:this.secondaryDistributor,
                    proposer_name: proposerName,//监护人姓名
                    proposer_id_no: proposerIdNo,	//监护人身份证号
                    insured_mobile:this.insuredPhone,	//被投保人姓名
                    insured_id_no:this.insuredCard,	//被投保人证件号
                    fail_reason:fail_reason//失败原因
                })
            },
            /**
             * 赠险填写信息失败
             * @param callback
             */
            shenceZxFillInfoErrorExt(data){
                sensors.track('zx_fill_info_error', {
                    gift_name:document.title,	//产品名称
                    secondaryDistributor:this.secondaryDistributor,
                    proposer_name: data.proposerName,//监护人姓名
                    proposer_id_no: data.proposerCard,	//监护人身份证号
                    insured_mobile:this.insuredPhone,	//被投保人姓名
                    insured_id_no:this.insuredCard,	//被投保人证件号
                    fail_reason:data.shenceErrorMessage//失败原因
                })
            },
            /**
             * 进入监护人
             */
            shenceZxFillInfoEnterJhr(){
                sensors.track('zx_fill_info_enter_jhr', {
                    gift_name:document.title,	//赠险名称
                    secondaryDistributor:this.secondaryDistributor,//二级经销商
                    insured_mobile:this.insuredPhone,	//被投保人姓名
                    insured_id_no:this.insuredCard	//被投保人证件号
                });
            },
            /**
             * 填写监护人信息
             */
            shenceZxFillJhrInfo(callback){
                sensors.track('zx_fill_jhr_info', {
                    gift_name:document.title,	//赠险名称
                    secondaryDistributor:this.secondaryDistributor,//二级经销商
                    insured_mobile:this.insuredPhone,	//被投保人姓名
                    insured_id_no:this.insuredCard,	//被投保人证件号
                    proposer_name: this.proposerName,//监护人姓名
                    proposer_id_no: this.proposerCard //监护人身份证号
                },callback);
            },

            goProductClause() {
                this.$app.goPdfView('https://yxfile.aeonlife.com.cn/doc/2019/11/20191120/1/5032/5032_1_1_20191120144938558.pdf');
            },
            goInstruction() {
                window.location.href =this.$router.siteUrl() + '/product/UserAgreement.html'
            },
            onBasicConfirm() {
              window.location.href = this.$router.siteUrl() +'/product/giftInsurance/GiftInsuranceDetail.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor;
            },
            changeIcon(){
                this.showIcon = !this.showIcon
            },
            getProposerInfo(value){
                this.proposerName = value.proposerName
                this.proposerCard = value.proposerCard
                this.goInsure()
            },
            getProposerInfoError(data){
                //增加神策埋点监护人信息填写错误
                this.shenceZxFillInfoErrorExt(data);
            },
            getCancelProposer(value){
                this.$set(this.isPopupShow2, "bottom", value)
            },
            onChange(name, checked) {
                console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
            },
            showPopUp(type, name) {
              if (name === "agreementShow") {
                this.popTitle = "用户协议";
                this.agreementShow = true;
              } else {
                this.popTitle = "隐私声明";
                this.agreementShow = false;
              }
              this.$set(this.isPopupShow, type, true);
            },
            hidePopUp(type) {
              this.$set(this.isPopupShow, type, false);
            },
            _parseStorage() {
              let object;
              try {
                object = JSON.parse(window.localStorage.getItem(this.storageName));
              } catch (e) {
                object = {};
              }

              return object || {};
            },
            addStorage(e, val) {
              //放缓存
              console.log(e, val)
              window.localStorage.setItem(e,val);
              // if (e) {
              //   let _storageInfo = {};
              //   _storageInfo[e] = val;
              //   this._expireStorage(_storageInfo);
              // }
            },
            _expireStorage(info) {
              let object = this._parseStorage();
              let commos = Object.assign(object, info);
              commos.time = new Date().getTime();
              window.localStorage.setItem(this.storageName, JSON.stringify(commos));
              // console.log(window.localStorage.getItem())
            },
            getBirthday(cardNo){
                //获取生日
                let str = cardNo.substr(6,4) + '-' + cardNo.substr(10,2) + '-' + cardNo.substr(12,2)
                return str
            },
            getSex(cardNo) {
                //获取性别
                return (parseInt(cardNo.substr(16, 1)) % 2 == 1) ? '0' : '1'
            },
            //            校验名字
            checkName(name, e = null) {
              var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
              if (!regName.test(name)) {
                Toast.failed("您输入的姓名格式不正确！");
                return false;
              } else {
                this.addStorage("insuredName", name); //放缓存
                return true;
              }
            },
            checkPhone(phone, e = null) {
              var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
              if (!myreg.test(phone)) {
                Toast.failed("您输入的手机号格式不正确！");
                return false;
              } else {
                this.addStorage("insuredPhone", phone); //放缓存
                return true;
              }
            },
            checkSmsvalue(value) {
                console.log(value)
            },
            cardNumBeneficary(phone, e = null) {
              if (this.checkCard(phone)) {
                this.addStorage("insuredCard", phone); //放缓存
                return true;
              } else {
                Toast.failed("被保人的身份证号码不正确！");
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
            // 计算年龄
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
            smsVerifySend(flag) {
                if (!this.smsVerifyFirst) {
                    return false;
                }
                if (this.insuredPhone === '') {
                    Toast({
                        content: '请输入您的手机号'
                    })
                    return false;
                }

                let data = {};
                data.userName = this.insuredPhone
                if (this.smsCodeDialog.code) {
                    data.imageCode = this.smsCodeDialog.code
                    data.randomStr = this.smsCodeDialog.randomStr
                }
                this.$request({
                    url: `/portal/sendSmsCode`,
                    method: 'POST',
                    isLoading: true,
                    isEncript: true,
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.showSmsCode = false
                        Toast({
                            content: '验证码已发送至' + this.insuredPhone
                        })

                        if (flag === 'first' || flag === 'code') {
                            this.smsCodeDialog.open = false
                        }

                        //发送成功
                        this.smsVerifyFirst = false
                        this.smsCodeDialog.code = ''
                        this.smsCodeDialog.randomStr = ''

                        //开始倒计时
                        const TIME_COUNT = 60
                        let _this = this
                        if (!this.codeTimer) {
                            this.codeCount = TIME_COUNT
                            this.codeShow = false
                            this.codeTimer = setInterval(() => {
                                if (_this.codeCount > 0 && _this.codeCount <= TIME_COUNT) {
                                    _this.codeCount--
                                } else {
                                    _this.codeShow = true
                                    clearInterval(_this.codeTimer)
                                    _this.codeTimer = null
                                    _this.smsVerifyFirst = true
                                }
                            }, 1000)
                        }
                    },
                    failFn: (data) => {
                        if (data.resultCode === 'SYS_ERROR_001' || data.resultCode === 'SYS_ERROR_003' || data.resultCode === 'SYS_ERROR_002') {
                            this.smsVerifyCode()
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                        }
                        return false
                    }
                })
            },
            smsVerifyCode() {
                this.smsCodeDialog.randomStr = (new Date()).getTime()
                this.smsCodeDialog.img = this.$router.serverUrl() + '/code/' + this.smsCodeDialog.randomStr
                this.smsCodeDialog.open = true
                // document.getElementById('smsPic').getElementsByTagName('input').focus();
            },
            smsCodeSend() {
                if (this.smsCodeDialog.code === '') {
                    Toast({
                        content: '请输入图形验证码',
                    })
                    return false
                }
                this.isClickShow = true
                this.smsCodeDialog.open = false
                this.smsVerifySend("code")
            },
            smsVerifySubmitRegister() {
                /*if (!this.isClickShow) {
                    return false
                }*/
                let data = {
                    "deviceNo": (new Date()).getTime(),
                    "fastFlag": true,
                    "imageCode": this.smsCodeDialog.code,
                    "inviterCode": this.inviterCode,
                    "password": "",
                    "randomStr": this.smsCodeDialog.randomStr,
                    "smsCode": this.smsvalue,
                    "userName": this.insuredPhone,
                    "anonymousId": this.anonymousId,
                    "activityType": '03',
                    "secondaryDistributor":this.secondaryDistributor
                }
                this.$request({
                    url: '/portal/fast/register2',
                    method: 'POST',
                    data: data,
                    isEncript: true,
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {

                        //成功后，调投保接口
                        this.userToken = data.accessToken
                        localStorage.setItem('userToken',this.userToken)
                        this.codeShow = true
                        this.smsCodeDialog.open = false
                        this.smsCodeDialog.code = ''
                        this.isClickShow = false
                        this.smsVerifyFirst = true
                        let insured_age = this.getAge(this.insuredCard);
                        if(data.userCode){
                            sensors.login(data.userCode);
                        }
                        if(insured_age < 18) {
                            this.relationToAppnt = '03'
                            this.shenceZxFillInfo(()=>{
                                //弹起投保人填写信息--填好之后关闭窗口
                                this.proposerInfoShow = true
                                this.$set(this.isPopupShow2, "bottom", true);
                                //进入监护人
                                this.shenceZxFillInfoEnterJhr();
                            })
                        }else{
                            this.proposerCard = this.insuredCard
                            this.proposerName = this.insuredName
                            this.proposerPhone = this.insuredPhone
                            this.shenceZxFillInfo(()=>{
                                this.goInsure()
                            })

                        }
                    },
                    failFn: (data) => {
                        this.smsCodeDialog.code = ''
                        this.codeShow = true
                        this.smsVerifyFirst = true
                        this.isClickShow = false
                        if (data.resultCode === "SYS_ERROR_0037") {
                            Toast({
                                content: data.resultMsg,
                            })
                            this.smsVerifySubmitRegister()
                            return false
                        } else if (data.resultCode === 'SYS_ERROR_003') {
                            Toast({
                                content: "图形验证码错误",
                            })
                            this.shenceZxFillInfoError("图形验证码错误")
                        } else {
                            Toast({
                                content: data.resultMsg,
                            })
                            this.shenceZxFillInfoError(data.resultMsg)
                        }
                    }
                })
            },
            goInsure() {
                let day3 = new Date()
                day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
                let tomorrow = day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate()
                let openid = ''
                if (this.$app.isMiniProgram() && this.$app.isBnMiniApp()) {
                    openid = localStorage.getItem('gift_insurance_openid') || ''
                }
                let subData = {
                    "actGiftRiskDTO": { // 投保人信息
                        "contPlanCode": "1",   //属性值不为空，1是随便填写的
                    	"agentCode": "1",      //属性值不为空，1是随便填写的
                        "appntInfo": {
                            "address": "",
                            "birthday": this.getBirthday(this.proposerCard),
                            "idNo": this.proposerCard, // 身份证号
                            "idType": "0",
                            "mobile": this.insuredPhone,
                            "name": this.proposerName,
                            "sex": this.getSex(this.proposerCard)
                        },
                        "insuredInfo": { // 被保人信息
                            "address": "",
                            "birthday": this.getBirthday(this.insuredCard),
                            "idNo": this.insuredCard,
                            "idType": "0",
                            "mobile": this.insuredPhone,
                            "name":  this.insuredName,
                            "relationToAppnt": this.relationToAppnt, // 为本人或子女
                            "sex": this.getSex(this.insuredCard),
                            "impartInfo":{
                                "impart1":"否",
                                "impart2":"否",
                                "impart3":"否",
                                "impart4":"否",
                                "impart5":"否",
                                "impart6":"",
                                "impart7":"",
                                "impart8":"",
                                "impart9":"",
                                "impart10":""
                            }
                        },
                        "cValidate": tomorrow,
                        "mult": "1",
                        "secondaryDistributor": this.secondaryDistributor,
                        "relationContNo" : "",
                    },
                    "secondaryDistributor": this.secondaryDistributor,
                    "thirdClassDistributor": this.thirdClassDistributor,
                    "productRiskId": this.productRiskId,
                    "receiveType": "0",
                    "openid": openid
                }
                window.localStorage.setItem("subData", JSON.stringify(subData));
                //增加赠险填写信息神策埋点
                let insured_age = this.getAge(this.insuredCard);
                if(insured_age < 18) {
                    this.shenceZxFillJhrInfo(()=>{
                        window.location.href = this.$router.siteUrl() +'/product/giftInsurance/GiftInsuranceHealth.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor;
                    });
                }else{
                    window.location.href = this.$router.siteUrl() +'/product/giftInsurance/GiftInsuranceHealth.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor;
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
            submitCheck() {
                this.shenceErrorMessage="";
              //被保人
              if (!this.checkInput(this.insuredName, "请输入被保人的姓名")) {
                  this.shenceErrorMessage="被保人的姓名为空";
                this.checkInput1("insuredName");
                return false;
              }
              if (!this.checkInput(this.insuredCard, "请输入被保人的证件号")) {
                  this.shenceErrorMessage="被保人的证件号为空";
                this.checkInput1("insuredCard");
                return false;
              }
              if (!this.checkInput(this.insuredPhone, "请输入被保人的手机号")) {
                  this.shenceErrorMessage="被保人的手机号为空";
                this.checkInput1("insuredPhone");
                return false;
              }
              if(this.smsvalue === ''){
                  Toast.info('验证码不可为空')
                  this.shenceErrorMessage="验证码为空";
                  return false
              }
              let checkNameResult = this.checkName(this.insuredName);
              if (!checkNameResult) {
                  this.shenceErrorMessage="被保人的姓名不符";
                return false;
              }
              let cardNumBeneficaryResult = this.cardNumBeneficary(this.insuredCard);
              if (!cardNumBeneficaryResult) {
                  this.shenceErrorMessage="被保人的证件号不符";
                return false;
              }
              let checkPhoneResult = this.checkPhone(this.insuredPhone);
              if (!checkPhoneResult) {
                  this.shenceErrorMessage="被保人的手机号不符";
                return false;
              }
              return true;
            },
            getFree() {
                if (this.showIcon) {
                  Toast.failed("请勾选《产品条款》");
                  return false;
                }
                //前端表单校验
                let result = this.submitCheck();
                if (!result) {
                    //神策埋点增加错误信息记录
                    if(this.shenceErrorMessage){
                        this.shenceZxFillInfoError(this.shenceErrorMessage)
                    }
                  return false;
                }
                let insuredAge = this.getAge(this.insuredCard);
                console.log(insuredAge)
                if (insuredAge > 55 || !this.ifAge) {
                  this.basicDialog.open = true;
                  this.shenceZxFillInfoError("被保人年龄不符")
                  return false;
                }
                this.smsVerifySubmitRegister();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-title {
       color: #4B93FF;
       font-size: 36px;
       display: inline-block;
       text-align: center;
       background: #fff;
       width: 100%;
       height: 131px;
       line-height: 131px;
       margin: 0 auto;
       font-weight: 700;
    }
    .box {
      padding: px2em(20px) px2em(24px) px2em(100px);
      background-color: #fcfcfc;
    }
    .block {
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      box-shadow: px2em(0px) px2em(0px) px2em(16px) rgba(30, 0, 2, 0.1);
      position: relative;
    }
    .getSms{
        position: relative;
        width: 100%;
        height: 100px;
        line-height: 100px;
        li{
            font-size: 32px;
            color: #666;
            float: left;
            input{
                border: 1px solid #ccc;
            }
        }
        li:nth-of-type(2){
            padding-left: 30px;
        }
        li:nth-of-type(3){
            font-size: 30px;
            color: #000;
            background-color: #ccc;
            height: 50px;
            line-height: 50px;
            border: 1px solid #ccc;
            border-radius: 16px;
            position: absolute;
            right: 0px;
            top: 0.3rem;
        }
    }
    .freeGet{
        width: 100%;
        height: 88px;
        text-align: center;
        color: #fff;
        background-color: #FE4817;
        line-height: 88px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        font-size: 32px;
        margin: 49px auto 42px;
    }
    .rule{
        margin-top: 52px;
        height: 380px;
        border: 1px solid rgba(13,79,189,0.19);
        border-radius: 20px;
        box-shadow: 0px 0px 16px 0px rgba(13,79,189,0.19);
    }
    .getRule{
        font-size: 32px;
        font-weight: 700;
        color: #4B93FF;
        text-align: center;
        width: 159px;
        height: 31px;
        margin: 35px auto 45px;
        background: url(../../../assets/imgs/giftInsurance/squar.png) no-repeat;
        background-position: bottom;
    }
    .ruleContent{
        margin: 0 auto;
        width: 582px;
        height: 131px;
        color: #333;
    }
    .ruleContent p{
        font-size: 24px;
        line-height: 36px;
    }
    .lastWord{
        margin-top: 25px;
        margin-left: 44px;
        margin-bottom: 20px;
        font-size: 24px;
        color: #A7BFE3;
    }
    .userAdd {
      height: 37px;
      line-height: 37px;
      color: #FE4817;
    }
    .contentS {
      h2 {
        text-align: center;
        font-weight: bold;
      }
      p {
        margin: 40px 0 30px;
        font-size: 28px;
        color: #666;
        line-height: 0.6rem;
      }
    }
</style>
<style lang="css">
    .myPopup .md-popup-box {
      height: 70% !important;
    }
    .agreement {
        background:#FFF;
    }
    .private {
        background:#FFF;
    }
    /* .block .md-field-title{
        color: #4B93FF;
        font-size: 36px;
        font-family: FZHanZhenGuangBiaoS-GB;
        margin-top:48px ;
        margin-bottom:48px ;
        display: inline-block;
        text-align: center;
    } */
    .box .md-field {
        padding: 0 40px 0 41px!important;
    }
    .md-field-item-content::before{
        border: none;
    }
    .md-field-header{
        margin-bottom: 0rem!important;
    }
    .md-field-item-content{
        margin-bottom: 36px;
    }
    .md-input-item-input {
        border: 1px solid #BBC9DF;
        height: 88px!important;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        text-align: left !important;
        padding-left: 89px;
    }
    .smsvalue .md-input-item-input {
        border-top-right-radius:0;
        border-bottom-right-radius:0;
    }
    #insuredName .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/name.png") no-repeat  24px 50%;
        background-size: 42px 43px;
    }
    #insuredPhone .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/phone.png") no-repeat  24px 50%;
        background-size: 30px 45px;
    }
    #insuredCard .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/idcard.png") no-repeat  24px 50%;
        background-size: 45px 31px;
    }
    #smsvalue .md-input-item-input{
        background: url("~@/assets/imgs/giftInsurance/sms.png") no-repeat  24px 50%;
        background-size: 33px 45px;
        border-right: none;
    }
    .smsvalue{
        display: flex;
    }
    #smsvalue{
        flex:2;
    }
    #smsvalue .md-field-item-content{
        margin-bottom: 31px;
    }
    .smsContent{
        flex:1;
        height: 88px;
        text-align: center;
        line-height: 88px;
        background: #4B93FF;
        color: #fff;
        font-size: 28px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        margin-top:0.0867rem;
        border-top-left-radius:0;
        border-bottom-left-radius:0;
    }
    .confirmIcon{
        height: 37px;
    }
    .confirmIcon div{
            float:left;
    }
    .iconChoose1{
        width: 37px;
        height: 37px;
        background: url(../../../assets/imgs/giftInsurance/choose1.png) no-repeat;
        background-size:100% 100%;
    }
    .iconChoose2{
        width: 37px;
        height: 37px;
        background: url(../../../assets/imgs/giftInsurance/choose2.png) no-repeat;
        background-size:100% 100%;
    }
    .readConfirm{
        margin-left: 16px;
        height: 37px;
        line-height: 37px;
        font-size: 24px;
        color: #697993;
    }
    .md-dialog-content {
        width:540px;
        height:5.1rem;
    }
    .md-dialog-body{
        padding: 49px 101px 46px !important;
        text-align: center;
    }
    .md-dialog-body .md-dialog-title{
        margin-bottom: 46px!important;
        font-size: 34px!important;
        color: #333333;
        font-weight: 600!important;
    }
    .md-dialog-text{
        font-size: 34px!important;
        color: #333333;
        text-align: center;
    }
    .md-dialog-actions {
        height: 88px;
        line-height: 88px;
        margin:0 69px;
        background: #FE4817;
        border-radius: 10px;
    }
    .md-dialog-btn:last-child{
        color: #fff!important;
        height: 88px;
        line-height: 88px;
    }
    #smsPic .md-dialog-body{
        padding-bottom: 0.1333rem!important;
    }
    #smsPic .md-field-item-content{
        margin-bottom: 0px!important;
    }
    #smsPic .md-field-item-control .md-input-item-input{
        padding-left: 0px!important;
        border:none!important;
    }
</style>
