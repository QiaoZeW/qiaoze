<template>
    <div class="big">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="box">
            <div class="box-detail">
                <div class="box-title">首期保费支付方式</div>
                <md-cell-item title="银行卡支付" @click="payHandleChoose($event,'2')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/bankcardpay@2x.png">
                    <md-radio name="2" v-model="payChoose" slot="right" size="lg" />
                </md-cell-item>
                <md-cell-item title="微信支付" @click="payHandleChoose($event,'1')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/wechatpay@2x.png">
                    <md-radio name="1" v-model="payChoose" slot="right" size="lg"/>
                </md-cell-item>
            </div>
            <div class="box-detail tips" v-if="curRiskCode != '5321' || (curRiskCode == '5321' && !showWxAndBank)">
                <div class="box-title" v-if="curRiskCode == '5321'">首期信息</div>
                <div class="box-title" v-else>续期账户信息</div>
                <md-field-item
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    title="银行:"
                    class="wid"
                    placeholder="请选择续期银行"
                    :content="bankvaluedata"
                    @click.native="showmodel('isbankshow','bankvaluedata')">
                </md-field-item>
                <md-picker v-model="isbankshow" :data="bankData" @confirm="getBankConfirm"></md-picker>
                <md-input-item
                    title="银行卡号:"
                    type="bankCard"
                    class="myBank"
                    maxlength="19"
                    placeholder="请输入续期银行卡号"
                    v-model="bankInfo.bankAccNo"
                    @blur="bankNoStorage(bankInfo.bankAccNo)"
                >
                </md-input-item>
                <md-notice-bar
                    icon="clear"
                    type="warning"
                    v-if = "errorShow"
                    >
                    您输入的卡号所属银行与您选择的银行不一致
                </md-notice-bar>
                <md-input-item 
                    title="账户名:" v-model="proper.name" disabled></md-input-item>
                <md-input-item 
                    v-if="showAgreementPay"
                    title="手机号："
                    placeholder="请输入续期手机号" ref="proposerPhone" type="phone" v-model="proposerPhone" name="proposerPhone"
                    id="proposerPhone" v-bind:disabled="proposerPhoneDisable"
                    @blur="checkPhone(proposerPhone,$event)"
                >
                </md-input-item>
                
                <div class="cash-tips">
                    <div>
                        <p>温馨提示：</p>
                        <p>微信支付首期保费，续期账户支持以下银行的借记卡：</p>
                        <p>工商银行、建设银行、农业银行、中国银行、中信银行、广发银行、交通银行、平安银行、华夏银行、招商银行、兴业银行、光大银行、浦发银行、民生银行、邮储银行、包商银行（仅四川/内蒙）</p>
                    </div>
                    <div style="margin-top:15px;">
                        <p>银行卡支付首期保费，续期账户支持以下银行的借记卡：</p>
                        <p>工商银行、建设银行、农业银行、中国银行、中信银行、广发银行、交通银行、兴业银行、光大银行、邮储银行</p>
                    </div>
                </div>
            </div>
        </div>

        <md-picker
            ref="contactsBankData"
            v-if="showBankChoose"
            v-model="isShowBank"
            :data="bankNumberData"
            @confirm="bankChooseConfirm"
            title="常用银行卡"
        ></md-picker>

        <!-- <md-action-bar :actions="actionBarData" v-if="pay == 1" @click="wx_jsubmit"> -->
            <div class="twoBtn" :actions="actionBarData" v-if="pay == 1" @click="wx_jsubmit">
                <button class="may_btn">提交支付</button>
            </div>
        <!-- </md-action-bar> -->
        <!-- <md-action-bar :actions="actionBarData"  v-else  @click="jsubmit"> -->
            <div class="twoBtn" :actions="actionBarData" v-else  @click="jsubmit">
                <button class="may_btn">提交支付</button>
            </div>
        <!-- </md-action-bar> -->
    </div>
</template>
<script>
    import {
        Agree,
        ActionBar,
        Field,
        FieldItem,
        Landscape,
        InputItem,
        Picker,
        Icon,
        Toast,
        Dialog,
        Button,
        Popup,
        PopupTitleBar,
        Captcha,
        Radio,
        NoticeBar
    } from "mand-mobile";
    import Whirl from "@/components/Whirl";
    import Error from "@/components/Error";
    import bankdata from "@/static/bankdata.js";

    export default {
        name: "OrderPayment",
        components: {
            [Agree.name]: Agree,
            [ActionBar.name]: ActionBar,
            [Landscape.name]: Landscape,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [InputItem.name]: InputItem,
            [Picker.name]: Picker,
            [Dialog.name]: Dialog,
            [Button.name]: Button,
            Whirl,
            Error,
            [Popup.name]: Popup,
            [PopupTitleBar.name]: PopupTitleBar,
            [Icon.name]: Icon,
            [Captcha.name]: Captcha,
            [Radio.name]: Radio,
            [NoticeBar.name]: NoticeBar
        },
        data() {
            return {
                randomTime: Date.now(),
                errorShow: false,
                showWhirl: false,
                showError: false,
                payChoose:'2',
                curRiskCode: "",
                showWxAndBank: false,           //判断是否微信支付与银行卡支付同时显示
                smsVerifyShow:false,
                smsVerifyAppendTo:document.body,
                smsVerifyContent:'',
                smsVerifyFirst:true,
                applySeq:'',
                countNum:0,
                payTypeWay:'',
                showAgreementPay:false,          //是否显示预留手机号
                proposerPhoneDisable:false,      //预留手机号默认可修改
                proposerPhone:'',                //预留手机号
                bankvaluedata:'',
                isBrowser: true,
                involidTime:'',
                payType:'0',   //原生 1    H5 0
                showWxPay:false,
                wxPayFlag:false,
                frompage: "",
                wxData:"" ,
                wxSpecialData: "",
                wxData5321: "",
                socialSecurity: "", //社保
                socialSecurityFlag: "", //社保val
                renew: "", //自动续保
                renewFlag: "", //自动续保val
                pay: "1",
                phone: "",
                agentCode: "",
                validityText: "",
                order_status: "",
                bankAccNo: "",
                showFullScreen: false,
                showFullScreenBank: false,
                isPopupShow: {},
                firstBank: "",
                bankShow: {},
                service: {},
                bankvalue: "请选择",
                bankData: [],
                failMsg: "",
                insuredEmail: "",
                isbankshow: false,
                bankAccNo1: "",
                knows: {},
                allData: null,
                localdata: null,
                proper: {
                    name: "",
                    idNo: "",
                    idValidate: "",
                    address: "",
                    nativePlace: "",
                    birthday: "",
                    communicationInfo: {
                        email: "",
                        mobile: ""
                    },
                    height: "",
                    weight: "",
                    idType: ""
                },
                insure: {
                    name: "",
                    idNo: "",
                    idValidate: "",
                    address: "",
                    nativePlace: "",
                    birthday: "",
                    communicationInfo: {
                        email: "",
                        mobile: ""
                    },
                    height: "",
                    weight: "",
                    idType: ""
                },
                kaihuhangaddress: "",
                orderData: {
                    premium: 100.0,
                    accCode: "",
                    bankAccNo: "",
                    insuredEmail: ""
                },
                orderNumber: "",
                modelName: "",
                actionBarData: [
                    {
                        text: "确认支付",
                        disabled: false,
                        onClick: function() {}
                    }
                ],
                bnflist: [],
                agreeConf: {
                    checked: false,
                    name: "agree0",
                    size: "md",
                    disabled: false,
                    introduction: "选中状态"
                },
                bankAccNum: "",
                showBankChoose:true,
                isShowBank:false,
                bankNumberData: [],
                riskName: "",
                jobInfo: {
                    proposerJob: "",
                    insuredJob: "",
                    cvaliDates: "",
                    properResident: "",
                    insureResident: "",
                    kaihuhangaddress: "",
                    bankValue: "",
                    proposerDetailAddress: "",
                    insureDetailAddress: "",
                    proposerIdValidate: "",
                    insureIdValidate: "",
                    proposerDateFlag: "",
                    insureDateFlag: ""
                },
                insureAmount: 0,
                bankInfo: {},
                payYear: "",
                insuYear: "",
                cvilateDate: "",
                bankNum: "",
                isaddressDataShow: false,
                successAdd: "",
                product_id: "",
                orderNo: "",
                userCodes: "",
                contNum: "",
                firstBankNo: "",
                insureIdTypeCode: "",
                bankLabel: "",
                newBankLabel: "",
                userToken:""
            };
        },
        computed: {

        },
        created() {
            this.proper.name = window.localStorage.getItem('nameTake')
            this.getMarriageDataDic("type_bank");
        },
        mounted() {
            let _this = this
            //开关控制是否协议支付
            _this.$app.ifAgreementPay((flag) => {
                if(flag) {
                    _this.showAgreementPay = true
                } else {
                    _this.showAgreementPay = false
                }
            })
        },
        updated() {

        },
        methods: {
            bankChooseConfirm(){
                const values = this.$refs.contactsBankData.getColumnValues();
                conosle.log(values);
                values.forEach(value => {
                    if (value) {
                        let data = JSON.parse(value.value)
                        this.bankvaluedata = data.bankName || ''
                        this.bankInfo.bankAccNo = data.accNo || ''
                        this.bankNum = data.bankCode || ''
                    }
                })
                this.bankNoStorage(this.bankInfo.bankAccNo)
                this.bankNameStorage(this.bankvaluedata)
                this.bankNumStorage(this.bankNum)
            },
            bankNameStorage(val){
                window.localStorage.setItem("bankAccName", val);
            },
            bankNumStorage(val){
                window.localStorage.setItem("bank_Code", val);
            },
            getMarriageDataDic(index) {
                let _this = this;
                let data = {
                    type: index
                };
                this.$request({
                    url: `/sys/dict/type`,
                    method: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: data,
                    successFn: data => {
                       
                            const dealData = _this.deleteItem(data)

                            _this.bankData = [dealData];

                            for (let i = 0; i < _this.bankData[0].length; i++) {
                            if (_this.bankData[0][i].value == _this.bankInfo.bankCode) {
                                _this.bankLabel = _this.bankData[0][i].label;
                            }
                        
                        }
                    },
                    failFn: data => {}
                });
            },
            deleteItem (arr) {
                // {value: "07", label: "招商银行"}
                // {value: "09", label: "邮储银行"} 去掉邮储银行
                const index = arr.findIndex((item) => item.value === "07")
                arr.splice(index, 1)

             /*   const youchuIndex = arr.findIndex((item) => item.value === "09")
                arr.splice(youchuIndex, 1)*/
                return arr
            },
            showmodel(model, modelName, modelIndex) {
                this[model] = true;
                this.modelName = modelName;
                if (modelIndex) {
                    this.modelIndex = modelIndex;
                }
            },
            getBankConfirm(columnsValue) {
                this.bankvaluedata = columnsValue[0].label;
                this.bankNum = columnsValue[0].value;
                this.bankNameStorage(this.bankvaluedata)
                this.bankNumStorage(this.bankNum)
                console.log(this.bankInfo.bankAccNo+"银行卡号")
                // 银行卡为空不调校验
                if (this.bankInfo.bankAccNo===undefined) {
                    console.log(this.bankInfo.bankAccNo+"银行卡号为空")
                } else {
                    this.bankCardCheck();
                }
            },
            bankCardCheck () {
                var bankAardSix = this.bankInfo.bankAccNo.substring(0,6)
                var bankCheckCode = this.bankNum;
                var checkData = bankdata[bankCheckCode];
                var bankBoolean = false;
                
                checkData.every(function(item,i){
                    if(item.six_num==bankAardSix){
                        bankBoolean = true;
                        return false;
                    }else{
                         bankBoolean = false;
                         return true;
                    }
                });
                if(bankBoolean==false){
                    this.errorShow = true;
                }else{
                    this.errorShow = false;
                }
                if (bankAardSix.length===0) {
                    this.errorShow = false;
                }
            },
            bankNoStorage(val){
                this.bankCardCheck();
                window.localStorage.setItem("bankAccNumber", val);
                window.localStorage.setItem("checkBankName", this.proper.name);
                console.log(val)
            },
            //  校验预留手机号
            checkPhone(phone, e = null) {
            if (!phone) {
                Toast({
                    content: '银行预留手机号不可为空',
                })
                return false;
            }
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(phone)) {
                Toast.failed('您输入的手机号格式不正确！')
                return false;
            }
            return true
            },
            payHandleChoose(e, index) {
                console.log(this.payChoose);
                this.pay = index;
            },
            wx_jsubmit() {
                let _this = this;
                // if (_this.agreeConf.checked == false) {
                //     Toast.failed("请您先确认您已充分了解本产品");
                //     return false;
                // }
                let result = this.submitCheck();
                if (!result) {
                    return false;
                }
                _this.payTypeWay = 'wx'
                if(this.curRiskCode == '5321'){
                  this.wxNormalPay5321();
                }else{
                  if (this.showAgreementPay) {
                    if (!this.checkPhone(this.proposerPhone)) {
                      return false;
                    }
                    this.smsVerifyInterface(0);
                  } else {
                    this.wxCheckPay();
                  }
                }
            },
            jsubmit() {
                let _this = this;
                // if (_this.agreeConf.checked == false) {
                //     Toast.failed("请您先确认您已充分了解本产品");
                //     return false;
                // }
                let result = this.submitCheck();
                if (!result) {
                    return false;
                }
                _this.payTypeWay = 'bank'
                if(this.showAgreementPay){
                  if(!this.checkPhone(this.proposerPhone)){
                    return false
                  }
                  this.smsVerifyInterface(0)
                }else{
                  this.bankCheckPay()
                }
            },
            submitCheck() {
                if(this.curRiskCode == '5321' && this.pay == '1'){

                }else{
                  if(this.curRiskCode == '5321'){
                      if (!this.checkInput(this.bankvaluedata, "请选择首期缴费银行")) {
                        return false;
                      }
                  }else{
                    if (!this.checkInput(this.bankvaluedata, "请选择续期缴费银行")) {
                      return false;
                    }
                  }
                }
                if(this.curRiskCode == '5321' && this.pay == '1'){

                }else{
                  if(!this.checkInput(this.bankInfo.bankAccNo, "请输入银行卡号")) {
                    return false;
                  }
                }
                return true;
            },
            checkInput(item, conS) {
                if (item == '' || !item) {
                    Toast.failed(conS)
                    return false
                } else {
                    return true
                }
            },
            smsVerifyInterface(flag){
                  let _this = this;
                  let allDatas = {
                      productNo:'PROTOCOLPAYTRADE',
                      orderAmount:_this.orderData.premium.toFixed(2),
                      bankCode:_this.bankNum,
                      bankCardNo:_this.bankInfo.bankAccNo,
                      bankCardName:_this.bankLabel,
                      certType:'0',
                      certId:_this.proper.idNo,
                      mobile:_this.proposerPhone,
                      branchOrgNo:'86',
                      busType:'ZC',
                      policyBusType:'01',
                      accType:'0',
                      bankCardType:'0'
                  }
                this.$app.getToken(function(userToken) {
                      _this.$request({
                          url: `/ins/vipUserBankcard/verifyBankProtocal`,
                          method: "POST",
                          contentType: "application/json;charset=UTF-8",
                          data: allDatas,
                          userToken: userToken,
                          successFn: data => {
                              _this.applySeq = data.applySeq
                              if(data.protocolFlag == '0'){
                                    if(_this.payTypeWay == 'wx'){
                                        _this.wxCheckPay()
                                    }else if(_this.payTypeWay == 'bank'){
                                        console.log('实时支付')
                                        _this.bankCheckPay()
                                    }
                              }else{
                                 if(data.protocolNoExistsFlag == '0'){
                                    if(_this.payTypeWay == 'wx'){
                                        _this.wxNormalPay()
                                    }else if(_this.payTypeWay == 'bank'){
                                        console.log('已存在协议号')
                                        _this.bankNormalPay()
                                    }
                                 }else if(data.protocolNoExistsFlag == '1'){
                                     if(flag == 0){
                                        _this.smsVerifyShow = true
                                     }
                                 }
                              }
                          },
                          failFn: data => {
                              Toast({content: data.resultMsg})
                              return false
                          }
                      });
                })
            },
            is_weixin() {
        // return false
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger" ) {
            //目前让小程序不显示微信支付modify time 2019-10-16
            if(!this.$app.isMiniProgram()){
                return true
            }else{
                //return false;
                if(this.$app.isBnMiniApp()){
                    return true;
                }
                return false;
            }
        } else {
            return false
        }
    },
            wxCheckPay(){            //微信支付实时支付或者协议支付认证时走的支付流程
               //需要判断是代理人投保还是普通投保，代理人投保需要在suerCode传agentCode
               let _this = this;
               if (_this.agentCode === "") {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: "72845852",
                       payType: _this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               } else {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: _this.agentCode, //获取代理人agentCode
                       payType: _this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               }
               if (this.is_qyweixin()) {
                 Dialog.alert({
                   content: "请分享到微信中，并使用投保人绑定的微信支付账号支付!"
                 });
                 return false;
               }
              if(_this.is_weixin() || _this.$app.isBrowser()){
                this.$app.getToken(function(userToken) {
                 _this.$request({
                     url: `/contract/verifyUserBankcard`,
                     method: "POST",
                     contentType: "application/json;charset=UTF-8",
                     data: datas,
                     userToken: userToken,
                     successFn: data => {
                        _this.$app.getToken(function(userToken) {
                         _this.$request({
                             url: `/contract/risk/npCheck`,
                             method: 'POST',
                             contentType: 'application/json;charset=UTF-8',
                             data: datas,
                             isLoading: true,
                             userToken: userToken,
                             successFn: (data) => {
                                 if(data.insured){
                                     window.localStorage.setItem("getContNum", JSON.stringify(data.wechatPayResultOutDTO.contNo));
                                     if(data.modelCode === 1){
                                         window.location.href = "Successful.html?product_id=" + data.wechatPayResultOutDTO.productId + "&agentCode=" + data.wechatPayResultOutDTO.agentCode+ "&randomTime=" + _this.randomTime;
                                     }else{
                                         window.location.href = "Successful.html?product_id=" + data.wechatPayResultOutDTO.productId + "&randomTime=" + _this.randomTime;
                                     }
                                 } else {
                                     if(_this.$app.isBrowser()){
                                         _this.wxData = data.wechatAppPayDTO
                                         setupWebViewJavascriptBridge(function (bridge) {
                                             bridge.callHandler('gowxpay'
                                                 , _this.wxData , function (responseData) {
                                                 }
                                             );
                                         })
                                     }
                                     else if(_this.$app.isMiniProgram()&&_this.$app.isBnMiniApp()){
                                         //百年小程序微信支付
                                         let obj =data.wechatAppMiniDTO;
                                         let params = `?orderId=${obj.order_id}&signType=${obj.signType}&paySign=${obj.paySign}&timeStamp=${obj.timeStamp}&nonceStr=${obj.nonceStr}&prepay_id=${obj.prepay_id}`
                                         wx.miniProgram.navigateTo({url:'/pages/pay'+params});
                                     }
                                     else{
                                         _this.wxData = data.wechatSendPayDTO;
                                         _this.$nextTick(function() {
                                           _this.$refs.iswxpay.submit();
                                         });
                                     }
                                 }
                             },
                             failFn: (data) => {
                                 Dialog.alert({ content: data.resultMsg });
                             }
                         })
                         })
                        },
                        failFn: (data) => {
                            Dialog.alert({ content: data.resultMsg });
                        }
                      })
                })
              }else{
                this.$app.getToken(function(userToken) {
                 _this.$request({
                     url: `/contract/verifyUserBankcard`,
                     method: "POST",
                     contentType: "application/json;charset=UTF-8",
                     data: datas,
                     userToken: userToken,
                     successFn: data => {
                        _this.$app.getToken(function(userToken) {
                         _this.$request({
                             url: `/contract/risk/npCheck`,
                             method: 'POST',
                             contentType: 'application/json;charset=UTF-8',
                             data: datas,
                             isLoading: true,
                             userToken: userToken,
                             successFn: (data) => {
                                 console.log(data.wechatH5PayDTO)
                                 _this.wxSpecialData = data.wechatSendH5PayDTO
                                 _this.$nextTick(function(){
                                     _this.$refs.iswxpayspecial.submit()
                                 });
                             },
                             failFn: (data) => {
                                 Dialog.alert({ content: data.resultMsg });
                             }
                         })
                         })
                        },
                        failFn: (data) => {
                            Dialog.alert({ content: data.resultMsg });
                        }
                      })
                })
              }
            },
            bankCheckPay(){            //银行卡实时支付或者协议支付认证前走的支付流程
               //需要判断是代理人投保还是普通投保，代理人投保需要在suerCode传agentCode
               let _this = this;
               if (_this.agentCode === "") {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: "72845852",
                       payType:_this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               } else {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: _this.agentCode, //获取代理人agentCode
                       payType: _this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               }
                this.$app.getToken(function(userToken) {
                   _this.$request({
                       url: `/contract/verifyUserBankcard`,
                       method: "POST",
                       contentType: "application/json;charset=UTF-8",
                       data: datas,
                       userToken: userToken,
                       successFn: data => {
                         _this.$app.getToken(function(userToken) {
                          _this.$request({
                              url: `/contract/risk/policycharge`,
                              method: "POST",
                              contentType: "application/json;charset=UTF-8",
                              data: datas,
                              isLoading: true,
                              userToken: userToken,
                              successFn: data => {
                                  if(data.wxPayStatus == 1){
                                      Dialog.alert({ content:"此订单已通过微信正在进行支付处理中"});
                                  }else {
                                      if (data.chargeOutList && data.chargeOutList.length > 0) {
                                          if (data.chargeOutList[0].status === "8") {
                                              //承保成功
                                              _this.contNum = data.chargeOutList[0].contNo;
                                              window.localStorage.setItem(
                                                  "getContNum",
                                                  JSON.stringify(_this.contNum)
                                              );
                                              location.href = _this.successAdd;
                                          } else if (data.chargeOutList[0].status === "7") {
                                              //承保中
                                              //判断是否为代理人体外投保，跳转不同路径
                                              if (_this.agentCode) {
                                                  window.location.href =
                                                      _this.$router.siteUrl() +
                                                      "/product/UnderWriting.html?orderNo=" +
                                                      _this.orderNumber +
                                                      "&agentCode=" +
                                                      _this.agentCode +
                                                      "&product_id=" +
                                                      _this.product_id;
                                              } else {
                                                  window.location.href =
                                                      _this.$router.siteUrl() +
                                                      "/product/UnderWriting.html?orderNo=" +
                                                      _this.orderNumber +
                                                      "&product_id=" +
                                                      _this.product_id;
                                              }
                                          } else if (data.chargeOutList[0].status === "6") {
                                              //承保失败
                                              let failmessage =
                                                  data.chargeOutList[0].message || "未知系统异常";
                                              window.localStorage.setItem("failMessage", failmessage);
                                              //Dialog.alert({content:'承保失败'})
                                              //判断是否为代理人体外投保，跳转不同路径
                                              if (_this.agentCode) {
                                                  window.location.href =
                                                      _this.$router.siteUrl() +
                                                      "/product/UnderWritingFailed.html?orderNo=" +
                                                      _this.orderNumber +
                                                      "&agentCode=" +
                                                      _this.agentCode +
                                                      "&product_id=" +
                                                      _this.product_id;
                                              } else {
                                                  window.location.href =
                                                      _this.$router.siteUrl() +
                                                      "/product/UnderWritingFailed.html?orderNo=" +
                                                      _this.orderNumber +
                                                      "&product_id=" +
                                                      _this.product_id;
                                              }
                                          }
                                      }
                                  }
                              },
                              failFn: data => {
                                  if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                      Dialog.alert({
                                          title: '提示',
                                          content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                          confirmText: '去上传',
                                          onConfirm: () => {
                                              location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                              return false
                                          }
                                      })
                                  } else {
                                      Dialog.alert({ content: data.resultMsg });
                                  }
                              }
                          })
                         })
                       },
                       failFn: data => {
                          Dialog.alert({ content: data.resultMsg });
                       }
                   })
                });
            },
            is_qyweixin() {
      // return false
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/wxwork/i) == "wxwork") {
        return true;
      } else {
        return false;
      }
    },
            wxNormalPay5321() {
            //5321微信支付流程
            //需要判断是代理人投保还是普通投保，代理人投保需要在suerCode传agentCode
               let _this = this;
               if (_this.agentCode === "") {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: "72845852",
                       payType: _this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               } else {
                   var datas = {
                       productId: _this.product_id,
                       accName: _this.proper.name,
                       bankAccNo: _this.bankInfo.bankAccNo,
                       bankCode: _this.bankNum,
                       money: _this.orderData.premium,
                       orderNo: _this.orderNumber,
                       payByAeon: "Y",
                       payMode: "R",
                       userCode: _this.agentCode, //获取代理人agentCode
                       payType: _this.payType,
                       //"userCode": this.userCodes
                       secondaryDistributor:
                           localStorage.getItem("cps_secondaryDistributor") || "",
                       thirdClassDistributor:
                           localStorage.getItem("cps_thirdClassDistributor") || "",
                       shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                   };
               }
               if (this.is_qyweixin()) {
                 Dialog.alert({
                   content: "请分享到微信中，并使用投保人绑定的微信支付账号支付!"
                 });
                 return false;
               }
             if(_this.is_weixin() || _this.$app.isBrowser()){
              this.$app.getToken(function(userToken) {
               _this.$request({
                   url: `/contract/risk/npCheckNobank`,
                   method: 'POST',
                   contentType: 'application/json;charset=UTF-8',
                   data: datas,
                   isLoading: true,
                   userToken: userToken,
                   successFn: (data) => {
                       if(data.insured){
                           window.localStorage.setItem("getContNum", JSON.stringify(data.wechatPayResultOutDTO.contNo));
                           if(data.modelCode === 1){
                               window.location.href = "Successful.html?product_id=" + data.wechatPayResultOutDTO.productId + "&agentCode=" + data.wechatPayResultOutDTO.agentCode+ "&randomTime=" + _this.randomTime;
                           }else{
                               window.location.href = "Successful.html?product_id=" + data.wechatPayResultOutDTO.productId+ "&randomTime=" + _this.randomTime;
                           }
                       } else {
                           if(_this.$app.isBrowser()){
                               _this.wxData = data.wechatAppPayDTO
                               setupWebViewJavascriptBridge(function (bridge) {
                                   bridge.callHandler('gowxpay'
                                       , _this.wxData , function (responseData) {
                                       }
                                   );
                               })
                           }else{
                               _this.wxData = data.wechatSendPayDTO
                               _this.$nextTick(function(){
                                   _this.$refs.iswxpay.submit()
                               });
                           }
                       }
                   },
                   failFn: (data) => {
                       Dialog.alert({ content: data.resultMsg });
                   }
               })
              })
              }else{
                this.$app.getToken(function(userToken) {
                 _this.$request({
                     url: `/contract/risk/npCheckNobank`,
                     method: 'POST',
                     contentType: 'application/json;charset=UTF-8',
                     data: datas,
                     isLoading: true,
                     userToken: userToken,
                     successFn: (data) => {
                        _this.wxData5321 = data.wechatSendH5PayDTO
                        _this.$nextTick(function(){
                            _this.$refs.iswxpay5321.submit()
                        });
                     },
                     failFn: (data) => {
                         Dialog.alert({ content: data.resultMsg });
                     }
                 })
                })
              }
            },

        },
        filters: {

        }
    };
</script>
<style lang="scss" scoped>
    @import "../../assets/css/preservation/reuse.scss";
    @import "../../assets/app";
    .big {
        padding-bottom: px2em(150px);
    }
    .box {
        width: 90%;
        margin: 0 auto;
        padding-top: px2em(20px);
    }
    .cash-tips {
        padding: 30px 0;
        p {
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:34px;
        }
    }
    .holder {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 40px;
        background-color: #E6E6E6;
    }
    .box-detail {
        padding: px2em(40px) px2em(20px) px2em(0);
        border-radius: px2em(10px);
        box-shadow: px2em(0px) px2em(3px) px2em(20px) px2em(0px) rgba(30, 0, 2, 0.1);
        margin-bottom: px2em(30px);
        /*background-color: #f52b55;*/
        .box-title {
            font-size: px2em(36px);
            font-weight: 700;
        }
        .orderdetail {
            display: flex;
            padding: 0.4rem 0;
            justify-content: space-between;

            .order-left {
                font-size: px2em(30px);
                color: #333333;
                min-width: 2.4rem;
            }
            .order-right {
                font-size: px2em(28px);
                color: #666666;
                max-width: 5rem;
            }
        }
    }
</style>
<style>
    .md-radio.is-checked .md-radio-icon {
        color: #E10312 !important;
    }
    .md-notice-bar {
        border:2px dashed rgba(225,2,18,1);
        border-radius:8px;
        width:630px !important;
        height:80px !important;
    }
    .md-notice-bar.warning {
        color: #E10312 !important;
        margin-top: 20px;
    }
</style>


