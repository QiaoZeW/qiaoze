<template>
    <div class="big" v-cloak>
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="box">
            <!-- 顺心宝微信支付 -->
            <div :class="setClass" v-if="shunxinbaoShow">
                <div class="box-title">首期保费支付方式</div>
                <md-cell-item title="微信支付" @click="payHandleChoose($event,'2')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/wechatpay@2x.png">
                    <md-radio name="2" v-model="payChoose" slot="right" size="lg"/>
                </md-cell-item>
            </div>
            <div class="box-detail tips" v-if="shunxinbaoShow">
                <div class="cash-tips" style="padding-top:0px !important;">
                    <div>
                        <p>温馨提示：</p>
                        <p>微信支付支持以下银行的借记卡：</p>
                        <p>工商银行、建设银行、农业银行、中国银行、中信银行、广发银行、交通银行、平安银行、华夏银行、招商银行、兴业银行、光大银行、浦发银行、民生银行、邮储银行、包商银行（仅四川/内蒙）</p>
                    </div>
                </div>
            </div>
            <div :class="setClass" v-if="productElseShow">
                <div class="box-title">首期保费支付方式</div>
                <md-cell-item title="银行卡支付" @click="payHandleChoose($event,'1')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/bankcardpay@2x.png">
                    <md-radio name="1" v-model="payChoose" slot="right" size="lg" />
                </md-cell-item>
                <md-cell-item v-if="showWxPay || agentCode" title="微信支付" @click="payHandleChoose($event,'2')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/wechatpay@2x.png">
                    <md-radio name="2" v-model="payChoose" slot="right" size="lg"/>
                </md-cell-item>
                <md-cell-item v-if="showAliPay || agentCode" title="支付宝支付" @click="payHandleChoose($event,'4')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/wechatpay@2x.png">
                    <md-radio name="4" v-model="payChoose" slot="right" size="lg"/>
                </md-cell-item>
                <md-cell-item v-if="showYbkPay" title="医保卡支付" @click="payHandleChoose($event,'3')">
                    <img class="holder" slot="left" src="@/assets/imgs/payChoose/yibaopay@2x.png">
                    <md-radio name="3" v-model="payChoose" slot="right" size="lg"/>
                </md-cell-item>
            </div>
            <div class="box-detail tips" v-if="productElseShow">
                <div class="box-title" v-if="shunxinbaoShow">首期信息</div>
                <div class="box-title" v-else>续期账户信息
                    <i
                        v-if="isBrowser"
                        class="iconfont icon-yinhangqiashezhi2-copy bankIcon"
                        @click="onBankContactIcon"
                    ></i></div>

                <md-field-item
                    v-if = "isBankPay"
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    title="银行:"
                    class="wid"
                    placeholder="请选择续期银行"
                    :content="bankvaluedata"
                    @click.native="showmodel('isBankPayShow','bankvaluedata')">
                </md-field-item>
                <md-picker
                    v-model="isBankPayShow"
                    :data="bankData"
                    @confirm="getBankConfirm"
                    :default-value="pickerDefaultValue"
                    :default-index="pickerDefaultIndex"
                ></md-picker>

                <md-field-item
                    v-if = "isWechatPay||isAlipay"
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    title="银行:"
                    class="wid"
                    placeholder="请选择续期银行"
                    :content="bankvaluedata"
                    @click.native="showmodel('isWechatPayShow','bankvaluedata')">
                </md-field-item>
                <md-picker
                    v-model="isWechatPayShow"
                    :data="wechatBankData"
                    @confirm="getBankConfirm"
                    :default-value="pickerDefaultValue"
                    :default-index="pickerDefaultIndex"
                ></md-picker>
                <md-input-item
                    title="银行卡号:"
                    slot="left"
                    type="bankCard"
                    class="myBank"
                    maxlength="19"
                    placeholder="请输入续期银行卡号"
                    v-model="bankInfo.bankAccNo"
                    @blur="bankNoStorage(bankInfo.bankAccNo)"
                >
                <md-icon
                    v-if= "isBrowser"
                    name="camera"
                    class="parL"
                    slot="right"
                    @click.native="showCamera(2)"
                    size="lg"
                ></md-icon>
                </md-input-item>
                <md-notice-bar
                    icon="clear"
                    type="warning"
                    v-if= "errorShow"
                    >
                    您输入的卡号所属银行与您选择的银行不一致
                </md-notice-bar>
                <md-input-item title="账户名:" v-model="proper.name" disabled></md-input-item>
                <!-- v-if="showAgreementPay" -->
                <md-input-item
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
        <md-action-bar class="may_btn" :actions="actionBarData" v-if="pay == 2" @click="wx_jsubmit"></md-action-bar>
        <md-action-bar class="may_btn" :actions="actionBarData" v-else-if="pay == 1" @click="jsubmit"></md-action-bar>
        <md-action-bar class="may_btn" :actions="actionBarData" v-else-if="pay == 3" @click="yb_jsubmit"></md-action-bar>
        <md-action-bar class="may_btn" :actions="actionBarData" v-else-if="pay == 4" @click="alipay_jsubmit"></md-action-bar>
        <form ref="iswxpay" id="iswxpay" method="post" :action="wxPayUrl()" >
            <textarea id="payment" ref="payment" name="paymentRequest" rows="5" style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;">{{ wxData }}</textarea>
        </form>
        <form ref="iswxpayspecial" id="iswxpay" method="post" :action="wxPaySpecialUrl()" >
            <textarea id="payment" ref="payment" name="paymentRequest" rows="5" style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;">{{ wxSpecialData }}</textarea>
        </form>
        <form ref="iswxpay5321" id="iswxpay" method="post" :action="wxPayUrl5321()" >
            <textarea id="payment" ref="payment" name="paymentRequest" rows="5" style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;">{{ wxData5321 }}</textarea>
        </form>
        <md-captcha
            ref="captcha"
            v-model="smsVerifyShow"
            title="请输入验证码"
            :maxlength="6"
            :system="false"
            :mask="false"
            :appendTo="smsVerifyAppendTo"
            @submit="smsVerifySubmit"
            @show
            @hide
            @send="smsVerifySend"
            :auto-countdown="false"
        >{{smsVerifyContent}}</md-captcha>
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
    import { getRiskTypeNameExt } from "@/utils/dictionary" // 神策数据字典
    import 'babel-polyfill'
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
            // [PopupTitleBar.name]: PopupTitleBar,
            [Icon.name]: Icon,
            [Captcha.name]: Captcha,
            [Radio.name]: Radio,
            [NoticeBar.name]: NoticeBar
        },
        data() {
            return {
                randomTime: Date.now(),
                wechatBankData:[],
                isBankPayShow:false,
                isWechatPayShow:false,
                isBankPay: false,
                isWechatPay: true,
                isAlipay: false,
                errorShow: false,
                showWhirl: false,
                showError: false,
                payChoose:'2',
                curRiskCode: "",
                shunxinbaoShow: false,
                productElseShow: false,
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
                wxTipShow: true,
                bankvaluedata:'',
                isBrowser: true,
                involidTime:'',
                payType:'0',   //原生 1    H5 0
                showWxPay:false,
                showAliPay:false,
                showYbkPay: false,
                ybkPayFlag:false,
                wxPayFlag:false,
                frompage: "",
                wxData:"" ,
                alipayData:"",
                wxSpecialData: "",
                wxData5321: "",
                socialSecurity: "", //社保
                socialSecurityFlag: "", //社保val
                renew: "", //自动续保
                renewFlag: "", //自动续保val
                pay: "2",
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
                        text: "提交支付",
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
                userToken:"",
                pickerDefaultValue: [],
                pickerDefaultIndex: [],
                intervalVal: null,
                medicalPayData: {},
                 setClass:'box-detail',
                ybAddressList: []
            };
        },
        computed: {

        },
        created() {
            this.errorShow = window.localStorage.getItem("errorShow");
            this.errorShow = false;
            this.proper.name = window.localStorage.getItem('nameTake');
            this.phone = this.$router.query("phone");
            this.agentCode = this.$router.query("agentCode");
            this.orderNo = this.$router.query("orderNo");
            this.frompage = this.$router.query("frompage");
            this.isBrowser = this.$app.isBrowser();
            this.curRiskCode = this.$router.query("curRiskCode");
            this.getBankList();
            //判断产品是否是顺心宝
            if (this.curRiskCode==="5321") {
                this.shunxinbaoShow = true;
            } else {
                this.productElseShow = true;
            }

            if (this.$app.isBrowser()) {
                this.payType = "1";
            }
            else if(this.$app.isMiniProgram()&&this.$app.isBnMiniApp()){
                this.payType = '3'//小程序
            }
            else if(this.is_weixin()){
                this.payType = "0";
            }else {
                this.payType = "2";
            }
            window.localStorage.setItem("orderNumber", JSON.stringify(this.orderNo));
            if (this.isFirstPay) {
                // 正常投保流程首次进入
                setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler(
                        "backHomeConfig",
                        {
                            flag_back: 1 //是否返回按钮，1-返回 0-不返回
                        },
                        function(response) {}
                    );
                });
            }
            this.getMarriageDataDic("type_bank");
            if (this.phone === "") {
                this.loadOrderDetail();
            } else {
                this.checkToken();
            }
            // 增加神策填写支付信息埋点2020-02-19
            this.jsubmit = this.shenceInterceper(this.jsubmit)
            this.wx_jsubmit = this.shenceInterceper(this.wx_jsubmit)
            this.yb_jsubmit = this.shenceInterceper(this.yb_jsubmit)
            this.alipay_jsubmit  = this.shenceInterceper(this.alipay_jsubmit)
        },
        mounted() {
             if (process.env.NODE_ENV !== 'production'){
                this.setClass='box-detail watermark';

            }
            let _this = this;
            _this.$app.ifYbkPay(flag => {
                if (flag) {
                        _this.showYbkPay = false;
                } else {
                    _this.showYbkPay = false;
                }
            });
            this.$app.showCustomerIntelligence(data => {
                _this.wxPayFlag = data.wxPayFlag;               //wxPayFlag为渠道开关（app内也存在渠道开关）
                _this.$app.ifWxPay(flag => {                    //flag为总开关
                    if (flag) {
                        if (_this.wxPayFlag) {
                            _this.showWxPay = true;
                            _this.showAliPay = true;
                        } else {
                            _this.showWxPay = false;
                            _this.showAliPay = false;
                        }
                    } else {
                        _this.showWxPay = false;
                        _this.showAliPay = false;
                    }
                    _this.showPayWay();
                    if(!_this.agentCode && !_this.showWxAndBank){
                        _this.pay = '2';
                    }
                });
            });
            //开关控制是否协议支付
            _this.$app.ifAgreementPay(flag => {
                if (flag) {
                    _this.showAgreementPay = true;
                } else {
                    _this.showAgreementPay = false;
                }
            });
        },
        updated() {

        },
        methods: {
            showPayWay() {
                if((this.showWxPay || this.showAliPay) && !(this.$app.isMiniProgram() && !this.$app.isBnMiniApp())){
                    this.showWxAndBank = true;
                }
            },
            smsVerifyInterface(flag){
                let _this = this;
                let allDatas = {
                    productNo:'PROTOCOLPAYTRADE',
                    orderAmount:_this.orderData.premium.toFixed(2),
                    bankCode:_this.bankNum,
                    bankCardNo:_this.bankInfo.bankAccNo,
                    bankCardName:_this.proper.name,
                    certType:'0',
                    certId:_this.proper.idNo,
                    mobile:_this.proposerPhone,
                    branchOrgNo:'86',
                    busType:'ZC',
                    policyBusType:'01',
                    accType:'0',
                    bankCardType:'0',
                    orderNo : _this.orderNo
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
            smsVerifySubmit(val) {
                let allDatas = {
                    productNo: "PROTOCOLPAYTRADE",
                    applySeq: this.applySeq,
                    codeNo: val,
                    bankCode: this.bankNum,
                    bankName: this.bankLabel,
                    cardType: "0",
                    accName: this.proper.name,
                    accNo: this.bankInfo.bankAccNo,
                    mobile: this.proposerPhone,
                    orderNo: this.orderNo
                };
                let _this = this;
                setTimeout(() => {
                    this.$app.getToken(function(userToken) {
                        _this.$request({
                            url: `/ins/vipUserBankcard/protocalComfirm`,
                            method: "POST",
                            contentType: "application/json;charset=UTF-8",
                            data: allDatas,
                            userToken: userToken,
                            successFn: data => {
                                //成功后，调投保接口
                                _this.smsVerifyShow = false;
                                _this.smsVerifyFirst = true;
                                if (_this.payTypeWay == "wx") {
                                    _this.wxNormalPay();
                                } else if (_this.payTypeWay == "bank") {
                                    console.log("验证码通过");
                                    _this.bankNormalPay();
                                }
                            },
                            failFn: data => {
                                Toast({ content: data.resultMsg });
                                return false;
                            }
                        });
                    });
                }, 300);
            },
            smsVerifySend() {
                if (!this.smsVerifyFirst) {
                    //     Toast({
                    //         content: '操作频繁，请稍后再试',
                    //     })
                    console.log("60秒后发送");
                    return false;
                }
                if (this.countNum !== 0) {
                    this.smsVerifyInterface(1);
                }
                this.countNum = 1;
                this.smsVerifyContent = "验证码已发送至 " + this.proposerPhone;
                this.smsVerifyShow = true;
                //发送成功
                this.smsVerifyFirst = false;

                this.$refs.captcha.countdown();
                let _this = this;
                setTimeout(function() {
                    _this.smsVerifyFirst = true;
                }, 60 * 1000);
            },
            bankChooseConfirm(){
                const values = this.$refs.contactsBankData.getColumnValues();
                values.forEach(value => {
                    if (value) {
                        let data = JSON.parse(value.value)
                        this.bankvaluedata = data.bankName || ''
                        this.bankInfo.bankAccNo = data.accNo || ''
                        this.bankNum = data.bankCode || ''
                        this.bankLabel = data.bankName || ''
                        this.pickerDefaultValue=[data.bankCode]
                    }
                })
                this.bankNoStorage(this.bankInfo.bankAccNo)
                this.bankNameStorage(this.bankvaluedata)
                this.bankNumStorage(this.bankNum)
            },
            showPopUp(type) {
                this.$set(this.isPopupShow, type, true);
            },
            hidePopUp(type) {
                this.$set(this.isPopupShow, type, false);
            },
            showPopUpBank(type) {
                this.$set(this.bankShow, type, true);
            },
            hidePopUpBank(type) {
                this.$set(this.bankShow, type, false);
            },
            showPopUpService(type) {
                this.$set(this.service, type, true);
            },
            hidePopUpService(type) {
                this.$set(this.service, type, false);
            },
            onBankContactIcon() {
                if (
                    !Array.isArray(this.bankNumberData[0]) ||
                    this.bankNumberData[0].length == 0
                ) {
                    Toast.info("暂无绑定银行卡");
                    return false;
                }
                this.showBankChoose = true;
                this.isShowBank = true;
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
                        if (index == "type_bank") {
                            if (this.pay == "1") {
                                //去掉 03中国银行、13平安银行、11华夏银行、07招商银行、10浦发银行、08民生银行、34包商银行
                                const deleteBankList = _this.deleteBankSix(data);
                                _this.bankData = [deleteBankList];
                                for (let i = 0; i < _this.bankData[0].length; i++) {
                                if (_this.bankData[0][i].value == _this.bankNum) {
                                    _this.bankLabel = _this.bankData[0][i].label;
                                    _this.pickerDefaultValue=[_this.bankData[0][i].value]
                                }
                                return arr
                            }
                            } else if (this.pay=="2") {
                                const dealData = _this.deleteItem(data);
                                _this.wechatBankData = [dealData];
                                for (let i = 0; i < _this.wechatBankData[0].length; i++) {
                                if (_this.wechatBankData[0][i].value == _this.bankNum) {
                                    _this.bankLabel = _this.wechatBankData[0][i].label;
                                    _this.pickerDefaultValue=[_this.wechatBankData[0][i].value]
                                }
                                return arr
                            }
                            }
                        }
                    },
                    failFn: data => {}
                });
            },
            payHandleChoose(e, index, data) {
                this.payChoose =index;
                this.name = index;
                this.pay = index;
                if (this.pay == "1") {
                    console.log("银行卡支付")
                    // if (this.bankNum == "13" || this.bankNum == "11" || this.bankNum == "07" ||
                    //     this.bankNum == "10" || this.bankNum == "08" || this.bankNum == "24" ) {
                        this.isWechatPay = false;
                        this.isAlipay = false,
                        this.isBankPay = true;
                        this.bankInfo.bankAccNo="";
                        this.bankvaluedata="";
                        this.bankNum="";
                        this.errorShow= false;
                    // }
                    this.getMarriageDataDic("type_bank");
                } else if (this.pay == "2"){
                    console.log("微信支付")
                    this.isWechatPay = true;
                    this.isBankPay = false;
                    this.bankInfo.bankAccNo="";
                    this.bankvaluedata="";
                    this.bankNum="";
                    this.errorShow= false;
                    this.getMarriageDataDic("type_bank");
                } else if (this.pay == "4"){
                    console.log("支付宝支付")
                    this.isWechatPay = false;
                    this.isAlipay = true;
                    this.isBankPay = false;
                    this.bankInfo.bankAccNo="";
                    this.bankvaluedata="";
                    this.bankNum="";
                    this.errorShow= false;
                    this.getMarriageDataDic("type_bank");
                } else {
                    console.log("医保卡支付")
                    this.isWechatPay = true;
                    this.isBankPay = false;
                    this.bankInfo.bankAccNo="";
                    this.bankvaluedata="";
                    this.bankNum="";
                    this.errorShow= false;
                    this.getMarriageDataDic("type_bank");
                }
            },
            showTip() {
                Dialog.alert({ content: "首续期银行账户需保持一致" });
            },
            deleteItem (arr) {
                // {value: "07", label: "招商银行"}
                // const index = arr.findIndex((item) => item.value === "07")
                // arr.splice(index, 1)
                return arr
            },
            deleteBankSix (arr) {
                //招商银行
                const zhaoshangIndex = arr.findIndex((item) => item.value === "07")
                    arr.splice(zhaoshangIndex, 1)
                //平安银行
                const pinganIndex = arr.findIndex((item) => item.value === "13")
                    arr.splice(pinganIndex, 1)
                //华夏银行
                const huaxiaIndex = arr.findIndex((item) => item.value === "11")
                    arr.splice(huaxiaIndex, 1)
                //浦发银行
                const pufaIndex = arr.findIndex((item) => item.value === "10")
                    arr.splice(pufaIndex, 1)
                //民生银行
                const minshengIndex = arr.findIndex((item) => item.value === "08")
                    arr.splice(minshengIndex, 1)
                //包商银行
                const baoshangIndex = arr.findIndex((item) => item.value === "24")
                    arr.splice(baoshangIndex, 1)

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
                // 银行卡为空不调校验
                if (this.bankInfo.bankAccNo!=undefined) {
                    this.bankCardCheck();
                }
                this.bankLabel = columnsValue[0].label;
            },
            bankCardCheck () {
                var bankAardThree = this.bankInfo.bankAccNo.substring(0,3);
                var bankAardFour = this.bankInfo.bankAccNo.substring(0,4);
                var bankAardFive = this.bankInfo.bankAccNo.substring(0,5);
                var bankAardSix = this.bankInfo.bankAccNo.substring(0,6);

                var bankCheckCode = this.bankNum;
                var checkData = bankdata[bankCheckCode];
                var bankBoolean = false;
                checkData.every(function(item,i){
                    if(item.six_num==bankAardThree||item.six_num==bankAardFour||item.six_num==bankAardFive||item.six_num==bankAardSix){
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
            goNotice() {
                //跳转投保
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/NoticeDetail.html?product_id=" +
                    this.product_id;
            },
            wxPayUrl() {
                let payUrl;
                if (process.env.NODE_ENV === "production") {
                    payUrl =
                        "https://appservice.aeonlife.com.cn/appservice/payment/wxpay/jsapiPay.do";
                } else {
                    payUrl =
                        "https://appservicetest.aeonlife.com.cn/appservice/payment/wxpay/jsapiPay.do";
                }
                return payUrl;
            },
            wxPaySpecialUrl() {
                let paySpecialUrl;
                if (process.env.NODE_ENV === "production") {
                    paySpecialUrl =
                        "https://appservice.aeonlife.com.cn/appservice/payment/wxpay/h5Pay.do";
                } else {
                    paySpecialUrl =
                        "https://appservicetest.aeonlife.com.cn/appservice/payment/wxpay/h5Pay.do";
                }
                return paySpecialUrl;
            },
            wxPayUrl5321(){
                let payUrl5321;
                if (process.env.NODE_ENV === "production") {
                    payUrl5321 =
                        "https://appservice.aeonlife.com.cn/appservice/payment/wxpay/h5Pay.do";
                } else {
                    payUrl5321 =
                        "https://appservicetest.aeonlife.com.cn/appservice/payment/wxpay/h5Pay.do";
                }
                return payUrl5321;
            },
            goClause() {
                //跳转产品
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/ProductClause.html?product_id=" +
                    this.product_id;
            },
            goBankBook() {
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/BankAuthorize.html?product_id=" +
                    this.product_id;
            },
            goPersonalReminder() {
                //跳转人身险风险提示书
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/PersonalReminder.html?product_id=" +
                    this.product_id;
            },
            //ocr 识别银行卡判断银行编码
            contrastBank(index) {
                for (let i = 0; i < this.wechatBankData[0].length; i++) {
                    if (this.wechatBankData[0][i].label == index) {
                        this.bankNum = this.wechatBankData[0][i].value;
                    }
                }
                this.bankNumStorage(this.bankNum);
            },
            showCamera(n) {
                var that = this;
                setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler("getBase64", { id: 2 }, function(responseData) {
                        if (n == 2) {
                            //银行卡号识别
                            responseData = JSON.parse(responseData);
                            that.photoUrl = responseData.data;
                            that.photoUrl = that.photoUrl.replace(/""/g, "%22");
                            var datas = {
                                businessType: "8",
                                requestPlatform: "3",
                                userCode: "1880100269",
                                imgInfoList: [
                                    {
                                        imgIndex: "17",
                                        imgType: "17",
                                        imgFormat: that.photoUrl.substring(that.photoUrl.length - 3),
                                        imgData: "",
                                        imgUrl: that.photoUrl
                                    }
                                ]
                            };
                            that.showWhirl = true;
                            let _this = that;
                            that.$app.getToken(function(userToken) {
                                _this.$request({
                                    url: `/ocr/ocr/getappocrinfo`,
                                    method: "POST",
                                    contentType: "application/json;charset=UTF-8",
                                    data: datas,
                                    userToken: userToken,
                                    successFn: _data => {
                                        let bankFlag = false;
                                        for (let i = 0; i < _this.wechatBankData[0].length; i++) {
                                            if (_this.wechatBankData[0][i].label == _data.bankName) {
                                                bankFlag = true;
                                            }
                                        }
                                        // if (!bankFlag) {
                                        //     Dialog.alert({ content: "暂不支持该银行卡" });
                                        // }
                                        _this.showWhirl = false;
                                        if (_data.cardNo && _data.bankName) {
                                            _this.bankInfo.bankAccNo = _data.cardNo;
                                            _this.bankLabel = _data.bankName;
                                            _this.bankvaluedata = _data.bankName;
                                            _this.bankNum = _data.bankNo;
                                            _this.bankNoStorage(_this.bankInfo.bankAccNo);
                                            _this.bankNameStorage(_data.bankName);
                                            _this.contrastBank(_data.bankName);
                                            console.log("_data.bankNo", _data.bankNo)
                                            _this.pickerDefaultValue=[_data.bankNo]
                                            _this.pickerDefaultIndex=[_data.bankNo]
                                        }
                                    },
                                    failFn: err => {
                                        Dialog.alert({ content: "银行卡识别失败" });
                                        _this.showWhirl = false;
                                    }
                                });
                            });
                        }
                    });
                });
            },
            checkToken() {
                this.$request({
                    url: `/vip/user/getToken?phone=${this.phone}`,
                    // isLoading: true,
                    contentType: "application/json;charset=UTF-8",
                    successFn: data => {
                        this.loadOrderDetail();
                    },
                    failFn: data => {
                        Dialog.alert({ content: "获取信息失败" });
                    }
                });
            },
            loadOrderDetail() {
                let _this = this;
                this.$app.getToken(function(userToken) {
                    _this.$request({
                        url: `/contract/getPolicyDetail`,
                        method: "POST",
                        // isLoading: true,
                        isEncript: true,
                        contentType: "application/json;charset=UTF-8",
                        data: { orderNo: _this.orderNo },
                        userToken: userToken,
                        successFn: data => {
                            console.log(JSON.stringify(data));
                            _this.involidTime = data.orderPayTimeMsg; //获取提示用户订单支付失效时间的内容
                            let resData = data;

                            _this.product_id = resData.productId;
                            _this.order_status = resData.insuredInfoList[0].contInfo.status;
                            _this.socialSecurityFlag =
                                resData.insuredInfoList[0].socialSecurityFlag;
                            _this.renewFlag =
                                resData.insuredInfoList[0].riskInfoList[0].renewFlag;
                            console.log(
                                (_this.renewFlag =
                                    resData.insuredInfoList[0].riskInfoList[0].renewFlag)
                            );
                            _this.socialSecurityFlag == "0"
                                ? (_this.socialSecurity = "是")
                                : (_this.socialSecurity = "否");
                            _this.renewFlag == "Y"
                                ? (_this.renew = "是")
                                : (_this.renew = "否");
                            // 状态不为3和6按钮置灰
                            if (_this.order_status !== "3" && _this.order_status !== "6") {
                                _this.actionBarData[0].disabled = true;
                            }
                            if (_this.order_status === "6") {
                                _this.actionBarData[0].text = "继续支付";
                            }
                            _this.loadRiskName();
                            _this.curRiskCode =
                                resData.insuredInfoList[0].riskInfoList[0].riskCode;
                            if (_this.agentCode) {
                                _this.$app.wxProductDetail(_this.product_id, 1);
                            } else {
                                _this.$app.wxProductDetail(_this.product_id, 1);
                            }
                            //判断是否为代理人体外投保，跳转不同路径
                            if (_this.agentCode) {
                                _this.successAdd =
                                    "agent/AgentSuccessful.html?product_id=" +
                                    _this.product_id +
                                    "&agentCode=" +
                                    _this.agentCode+ "&randomTime=" + _this.randomTime;
                                // _this.successAdd = 'Successful?product_id=' + _this.product_id+ "&agentCode=" + _this.agentCode
                            } else {
                                _this.successAdd =
                                    "Successful.html?product_id=" + _this.product_id+ "&randomTime=" + _this.randomTime;
                                // _this.successAdd = 'successful?product_id=' + _this.product_id
                            }
                            _this.insureIdTypeCode = resData.insuredInfoList[0].idType;
                            // this.orderData = JSON.parse(localStorage.getItem('orderNum'))
                            /*  _this.localdata = JSON.parse(localStorage.getItem('PAWithRule'))
                                              _this.orderContent = JSON.parse(localStorage.getItem('orderNumber'))
                                              _this.jobInfo = JSON.parse(localStorage.getItem('jobInfo'))*/
                            _this.orderNumber = _this.orderNo;
                            _this.proper.name = resData.appntInfo.name;
                            let checkBankName = window.localStorage.getItem("checkBankName")
                            if(_this.proper.name != checkBankName){
                                window.localStorage.removeItem('bankAccNumber');
                                window.localStorage.removeItem('bankAccName');
                                window.localStorage.removeItem('bank_Code');
                            }
                            // _this.bankvaluedata = localStorage.getItem("bankAccName");//银行name显示
                            _this.proper.idNo = resData.appntInfo.idNo;
                            _this.proper.idType = resData.appntInfo.idType;
                            _this.proper.idValidate = resData.appntInfo.idValidate;
                            _this.proper.address = resData.appntInfo.rgtAddressText;
                            _this.proper.birthday = resData.appntInfo.birthday;
                            if (resData.appntInfo.stature) {
                                _this.proper.height = resData.appntInfo.stature.substring(
                                    0,
                                    resData.appntInfo.stature.length - 3
                                );
                            } else {
                                _this.proper.height = "";
                            }

                            if (resData.appntInfo.stature) {
                                _this.proper.weight = resData.appntInfo.avoirdupois.substring(
                                    0,
                                    resData.appntInfo.avoirdupois.length - 3
                                );
                            } else {
                                _this.proper.weight = "";
                            }

                            _this.proper.communicationInfo.email =
                                resData.appntInfo.communicationInfo.email;
                            _this.proper.communicationInfo.mobile =
                                resData.appntInfo.communicationInfo.mobile;

                            localStorage.setItem('userPhone', resData.appntInfo.communicationInfo.mobile)

                            _this.bankNum =
                                resData.insuredInfoList[0].contInfo.chargeInfo.bankCode;
                            if (_this.bankNum == "") {
                                _this.bankNum = localStorage.getItem("bank_Code");
                            }
                            _this.insure.name = resData.insuredInfoList[0].name;
                            _this.insure.idNo = resData.insuredInfoList[0].idNo;
                            _this.insure.idValidate = resData.insuredInfoList[0].idValidate;
                            _this.insure.address = resData.insuredInfoList[0].rgtAddressText;
                            _this.ybAddressList = resData.appntInfo.rgtAddressInfoList;
                            //判断投保人地区是否为福建省
                            if (_this.ybAddressList[0].placeCode==="350000") {
                                _this.showYbkPay = false;
                            } else {
                                _this.showYbkPay = false;
                            }
                            _this.insure.birthday = resData.insuredInfoList[0].birthday;
                            _this.insure.idType = resData.insuredInfoList[0].idType;

                            if (resData.insuredInfoList[0].stature) {
                                _this.insure.height = resData.insuredInfoList[0].stature.substring(
                                    0,
                                    resData.insuredInfoList[0].stature.length - 3
                                );
                            } else {
                                _this.insure.height = "";
                            }
                            if (resData.insuredInfoList[0].avoirdupois) {
                                _this.insure.weight = resData.insuredInfoList[0].avoirdupois.substring(
                                    0,
                                    resData.insuredInfoList[0].avoirdupois.length - 3
                                );
                            } else {
                                _this.insure.weight = "";
                            }

                            _this.insure.communicationInfo.email =
                                resData.insuredInfoList[0].communicationInfo.email;
                            _this.insure.communicationInfo.mobile =
                                resData.insuredInfoList[0].communicationInfo.mobile;
                            _this.bnflist = resData.insuredInfoList[0].bnfInfoList;
                            _this.bankInfo = resData.insuredInfoList[0].contInfo.chargeInfo;
                            if (_this.bankInfo.bankAccNo == "") {
                                // _this.bankInfo.bankAccNo = localStorage.getItem("bankAccNumber");
                            }
                            _this.orderData.premium =
                                resData.insuredInfoList[0].contInfo.prem * 1;
                            _this.bankAccNum =
                                resData.insuredInfoList[0].contInfo.chargeInfo.bankAccNo;

                            _this.insureAmount = parseInt(
                                resData.insuredInfoList[0].riskInfoList[0].amnt
                            );
                            _this.payYear =
                                resData.insuredInfoList[0].riskInfoList[0].payEndYear;
                            let insureData = resData.insuredInfoList[0].riskInfoList[0];
                            // _this.insuYear = ( insureData.payEndYearFlag.indexOf('Y') > -1 ? '至' : '') +  insureData.insuYear  +  insureData.insuYearFlag.replace('A', '岁').replace('Y', '年')
                            _this.insuYear = insureData.insuYearDesc;

                            _this.firstBankNo = _this.bankInfo.bankAccNo;
                            /* _this.knows = JSON.parse(localStorage.getItem('knowledge'))*/

                            _this.jobInfo.proposerDetailAddress =
                                resData.appntInfo.communicationInfo.postalAddressText;

                            _this.jobInfo.insureDetailAddress =
                                resData.insuredInfoList[0].communicationInfo.postalAddressText;
                            _this.jobInfo.proposerAddressArr =
                                resData.appntInfo.communicationInfo.postalAddressInfoList[0]
                                    .placeName +
                                resData.appntInfo.communicationInfo.postalAddressInfoList[1]
                                    .placeName +
                                resData.appntInfo.communicationInfo.postalAddressInfoList[2]
                                    .placeName;

                            _this.jobInfo.proposerJob =
                                resData.appntInfo.occupationInfo.occupationName;
                            _this.jobInfo.proposerIdValidate = resData.appntInfo.idValidate;
                            console.log(_this.jobInfo.proposerIdValidate);
                            if (_this.jobInfo.proposerIdValidate === "3000-01-01") {
                                _this.jobInfo.proposerDateFlag = 1;
                            }
                            // _this.jobInfo.cvaliDates = _this.transferDate(new Date(), 'yyyy-MM-dd');
                            let cdate = "";
                            let applyDate = resData.insuredInfoList[0].contInfo.applyDate;
                            if (
                                resData.insuredInfoList[0].riskInfoList.find(
                                    item => item.riskCode == "5909"
                                )
                            ) {
                                cdate = _this.$app.getCvalidateByBirthday(
                                    resData.insuredInfoList[0].birthday,
                                    resData.appntInfo.birthday,
                                    applyDate
                                );
                            } else {
                                cdate = _this.$app.getCvalidateByBirthday(
                                    resData.insuredInfoList[0].birthday,
                                    undefined,
                                    applyDate
                                );
                            }
                            _this.jobInfo.cvaliDates = cdate;

                            _this.jobInfo.insureIdValidate =
                                resData.insuredInfoList[0].idValidate;
                            if (_this.jobInfo.insureIdValidate === "3000-01-01") {
                                _this.jobInfo.insureDateFlag = 1;
                            }
                            let dateStr = new Date();
                            let day2;
                            let day3;
                            if (resData.insuredInfoList[0].contInfo.smartUwConclusion === "5") {
                                day2 = resData.insuredInfoList[0].contInfo.uwDate
                                    ? resData.insuredInfoList[0].contInfo.uwDate
                                    : resData.insuredInfoList[0].contInfo.applyDate;
                                day3 = new Date(day2);
                                dateStr = new Date(
                                    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000 * 7)
                                );
                            } else if (resData.antiMoneyFlag === "Y") {
                                day2 = resData.antiMoneyDate
                                    ? resData.antiMoneyDate
                                    : resData.insuredInfoList[0].contInfo.applyDate;
                                day3 = new Date(day2);
                                dateStr = new Date(
                                    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000 * 7)
                                );
                            } else if (resData.insuredInfoList[0].contInfo.applyDate) {
                                dateStr = new Date(resData.insuredInfoList[0].contInfo.applyDate);
                            }
                            _this.validityText =
                                dateStr.getFullYear() +
                                "年" +
                                (dateStr.getMonth() + 1) +
                                "月" +
                                dateStr.getDate() +
                                "日";
                            console.log(" _this.validityText ", _this.validityText);

                            _this.jobInfo.insureLiveAddress =
                                resData.insuredInfoList[0].communicationInfo
                                    .postalAddressInfoList[0].placeName +
                                resData.insuredInfoList[0].communicationInfo
                                    .postalAddressInfoList[1].placeName +
                                resData.insuredInfoList[0].communicationInfo
                                    .postalAddressInfoList[2].placeName;
                            _this.jobInfo.insuredJob =
                                resData.insuredInfoList[0].occupationInfo.occupationName;

                            for (let i = 0; i < _this.bankData[0].length; i++) {
                                if (_this.bankData[0][i].value == _this.bankNum) {
                                    _this.bankLabel = _this.bankData[0][i].label;
                                    _this.pickerDefaultValue=[_this.bankNum]
                                }
                            }
                            // 20万反洗钱
                            _this.load20WData(resData);
                        },
                        failFn: data => {
                            Dialog.alert({ content: data.resultMsg });
                        }
                    });
                });
            },
            load20WData(resData) {
                let _this = this;
                _this.$app.if20Access(flag => {
                    if (flag) {
                        // 20万反洗钱
                        if (resData.antiMoneyFlag === "Y") {
                            // if (_this.order_status == 3) {
                            _this.actionBarData[0].disabled = true;
                            // }

                            // 0未审核  1审核中 2审核通过  3审核不通过
                            if (resData.antiMoneyResult === "0") {
                                Dialog.alert({
                                    title: "提示",
                                    content: "根据相关规定，累计保费超20万需上传相关证件照片",
                                    confirmText: "去上传",
                                    onConfirm: () => {
                                        location.href = `/product/UploadIDcard.html?orderNo=${
                                            _this.orderNo
                                            }&product_id=${_this.product_id}`;
                                        return false;
                                    }
                                });
                            } else if (resData.antiMoneyResult === "1") {
                                Dialog.alert({
                                    title: "提示",
                                    content: "证件审核中，请耐心等待",
                                    confirmText: "确认"
                                });
                            } else if (resData.antiMoneyResult === "2") {
                                if (_this.order_status === "3" || _this.order_status === "6") {
                                    _this.actionBarData[0].disabled = false;
                                }
                            } else if (resData.antiMoneyResult === "3") {
                                Dialog.alert({
                                    title: "提示",
                                    content: `证件审核不通过 ${resData.antiMoneyMsg || ""}`,
                                    confirmText: "重新上传",
                                    onConfirm: () => {
                                        location.href = `/product/UploadIDcard.html?orderNo=${
                                            _this.orderNo
                                            }&product_id=${_this.product_id}`;
                                        return false;
                                    }
                                });
                            }
                        }
                    }
                });
            },
            loadRiskName() {
                this.$request({
                    url: `/ins/product/getProductNameList/${this.product_id}`,
                    // isLoading: true,
                    contentType: "application/json;charset=UTF-8",
                    successFn: data => {
                        this.riskName = data.name;
                        document.title = this.riskName;
                    },
                    failFn: data => {
                        Dialog.alert({ content: data.resultMsg });
                    }
                });
            },
            getBankList() {
                this.bankNumberData.length = 0;
                let that = this;
                this.$app.getToken(function(userToken) {
                    that.$request({
                        url: `/ins/vipUserBankcard/list`,
                        params: {},
                        userToken: userToken,
                        successFn: data => {
                            let datas = [];
                            data.forEach(function(item, i) {
                                let temp = {};
                                temp.text = item.accNo + "(" + item.bankName + ")";
                                let _text = {
                                    bankName: item.bankName,
                                    accNo: item.accNo,
                                    bankCode: item.bankCode
                                };
                                temp.value = JSON.stringify(_text);
                                datas.push(temp);
                            });

                            that.bankNumberData.push(datas);
                        },
                        failFn: () => {}
                    });
                });
            },
            getYiBaoPayList () {
                let _this = this;
                var datas = {
                    productId: _this.product_id,
                    accName: _this.proper.name,
                    bankAccNo: _this.bankInfo.bankAccNo,
                    bankCode: _this.bankNum,
                    money: _this.orderData.premium,
                    orderNo: _this.orderNumber,
                    payByAeon: "Y",
                    payMode: "M",
                    userCode: "1370100400", //获取代理人agentCode
                    payType: _this.payType,
                    //"userCode": this.userCodes
                    secondaryDistributor:
                    localStorage.getItem("cps_secondaryDistributor") || "",
                    thirdClassDistributor:
                    localStorage.getItem("cps_thirdClassDistributor") || "",
                    shareUserCode: localStorage.getItem("cps_shareUserCode") || ""
                };
                this.$app.getToken(function(userToken) {
                    _this.$request({
                        url:`/ins/medical/order`,
                        method: "POST",
                        contentType: "application/json;charset=UTF-8",
                        params: {},
                        data: datas,
                        userToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwNDExMDgyNjE3MDAwMjgiLCJleHAiOjE1Nzg1NjUyMTB9.fVb2toiNhRKkn8rozzWvw165uZZgB4fp6W04nOPZgZTSlIxLCKXvBcss-4UM3pOCTAzBHAndoUEFoapkobTFKQ",
                        successFn: data => {
                            debugger
                            _this.intervalVal = setInterval(function(){
                                if(_this.medicalPayData) {
                                    if(_this.medicalPayData.payStatus == '02' ) {
                                        clearInterval(_this.intervalVal);
                                        window.localStorage.setItem("getContNum", JSON.stringify(_this.medicalPayData.contNo));
                                        window.location.href = "agent/AgentSuccessful.html?product_id=" + _this.medicalPayData.productId + "&agentCode=" + _this.medicalPayData.agentCode;
                                    }else if(_this.medicalPayData.payStatus == '03') {
                                        clearInterval(_this.intervalVal);
                                        Dialog.alert({ content: _this.medicalPayData.failReaso });
                                    } else {
                                        _this.getYiBaoResults(data.orderNo);
                                    }
                                } else {
                                    _this.getYiBaoResults(data.orderNo);
                                }
                            },2000)
                        }
                    })
                });
            },
            getYiBaoResults (orderNo) {
                console.log("查询医保支付结果");
                let _this = this;
                this.$app.getToken(function(userToken) {
                    _this.$request({
                        url:`/ins/medical/pay/status`,
                        method: "GET",
                        params: {orderNo:orderNo},
                        userToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwNDExMDgyNjE3MDAwMjgiLCJleHAiOjE1Nzg1NjUyMTB9.fVb2toiNhRKkn8rozzWvw165uZZgB4fp6W04nOPZgZTSlIxLCKXvBcss-4UM3pOCTAzBHAndoUEFoapkobTFKQ",
                        successFn: data => {
                            console.log(data+"打印123");
                            _this.medicalPayData = data;
                        },
                        failFn: () => {
                            console.log("失败了，它为什么失败了");
                        }
                    })
                })
            },
            yb_jsubmit () {
                console.log("医保卡支付提交");
                this.getYiBaoPayList ();
            },
            alipay_jsubmit(){
                let _this = this;

                _this.payTypeWay = 'alipay'
                if(this.curRiskCode == '5321'){
                    this.wxNormalPay5321();
                }else{
                    let result = this.submitCheck();
                    if (!result) {
                        return false;
                    }
                    if (!this.checkPhone(this.proposerPhone)) {
                        return false;
                    }
                    if (this.showAgreementPay) {
                        this.smsVerifyInterface(0);
                    } else {
                        this.aliCheckPay();
                    }
                }
            },
            wx_jsubmit() {
                let _this = this;

                _this.payTypeWay = 'wx'
                if(this.curRiskCode == '5321'){
                    this.wxNormalPay5321();
                }else{
                    let result = this.submitCheck();
                    if (!result) {
                        return false;
                    }
                    if (!this.checkPhone(this.proposerPhone)) {
                        return false;
                    }
                    if (this.showAgreementPay) {
                        this.smsVerifyInterface(0);
                    } else {
                        this.wxCheckPay();
                    }
                }
            },
            jsubmit() {
                let _this = this;
                let result = this.submitCheck();
                if (!result) {
                    return false;
                }
                _this.payTypeWay = 'bank'
                if(!this.checkPhone(this.proposerPhone)){
                    return false
                }
                if(this.showAgreementPay){
                  this.smsVerifyInterface(0)
                }else{
                  this.bankCheckPay()
                }
            },
            bankNormalPay() {
                //银行卡正常走的支付流程
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
                this.$app.getToken(function(userToken) {
                    _this.$request({
                        url: `/contract/risk/policycharge`,
                        method: "POST",
                        contentType: "application/json;charset=UTF-8",
                        data: datas,
                        isLoading: true,
                        userToken: userToken,
                        successFn: data => {
                            if(data.actGiftFlag && data.actGiftFlag == "8"){
                               window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                            }else if (data.actGiftFlag && data.actGiftFlag == "7") {
                                window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                                window.localStorage.setItem("actGiftErrMsg",data.actGiftErrMsg)
                            } else {
                                window.localStorage.setItem("actGiftFlag","")
                                window.localStorage.setItem("actGiftErrMsg","")
                            }
                            if (data.wxPayStatus == 1) {
                                Dialog.alert({ content: "此订单已通过微信正在进行支付处理中" });
                            } else if (data.wxPayStatus == 2) {
                                Dialog.alert({ content: "此订单已通过医保正在进行支付处理中" });
                            } else {
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
                                        if(_this.agentCode) {
                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                        } else {
                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                        }

                                        return false
                                    }
                                })
                            } else {
                                Dialog.alert({ content: data.resultMsg });
                            }
                        }
                    });
                });
            },
            submitCheck() {
                window.localStorage.setItem("errorShow",this.errorShow);

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
                // if(this.curRiskCode == '5321' && this.pay == '1'){

                // }else{
                //   if(!this.checkInput(this.proposerPhone, "请输入手机号")) {
                //     return false;
                //   }
                // }
                let bankFlag = false
                if (this.pay == '1') {
                    for (let i = 0; i < this.bankData[0].length; i++) {
                        if (this.bankData[0][i].label == this.bankLabel) {
                            bankFlag = true
                        }
                    }
                } else {
                    for (let i = 0; i < this.wechatBankData[0].length; i++) {
                        if (this.wechatBankData[0][i].label == this.bankLabel) {
                            bankFlag = true
                        }
                    }
                }
                if (this.curRiskCode != '5321' || this.$app.isMiniProgram()) {
                    if (!bankFlag) {
                        Dialog.alert({ content: "暂不支持该银行卡" });
                    return false
                }
                }
                this.bankCardCheck();
                if (this.errorShow) {
                    return false;
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
            aliCheckPay(){            //微信支付实时支付或者协议支付认证时走的支付流程
                //需要判断是代理人投保还是普通投保，代理人投保需要在suerCode传agentCode
                let _this = this;
                if (_this.agentCode === "") {
                    var datas = {
                        productId: _this.product_id,
                        accName: _this.proper.name,
                        bankMobile:_this.proposerPhone,
                        bankAccNo: _this.bankInfo.bankAccNo,
                        bankCode: _this.bankNum,
                        money: _this.orderData.premium,
                        orderNo: _this.orderNumber,
                        payByAeon: "Y",
                        payMode: "A",
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
                        bankMobile:_this.proposerPhone,
                        bankAccNo: _this.bankInfo.bankAccNo,
                        bankCode: _this.bankNum,
                        money: _this.orderData.premium,
                        orderNo: _this.orderNumber,
                        payByAeon: "Y",
                        payMode: "A",
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
                if(!_this.is_weixin() || _this.$app.isBrowser()){
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
                                            } else if (data.ybPaying) {
                                                Dialog.alert({ content: "此订单已通过医保正在进行支付处理中" });
                                            } else {
                                                if(_this.$app.isBrowser()){
                                                    _this.alipayData = data.alipayAppResultDTO
                                                    setupWebViewJavascriptBridge(function (bridge) {
                                                        bridge.callHandler('alipay'
                                                            , _this.alipayData , function (responseData) {
                                                            }
                                                        );
                                                    })
                                                } else{
                                                    // 支付宝支付动态生成form 其中数字为这个div中的第四个form表单
                                                    // 如果更改页面中的元素请注意修改
                                                    var form=  data.alipayAppResultDTO.aliPayInfo;
                                                    const div = document.createElement('div')
                                                    div.innerHTML = form //此处form就是后台返回接收到的数据
                                                    document.body.appendChild(div)
                                                    document.forms[4].submit()
                                                }
                                            }
                                        },
                                        failFn: (data) => {
                                            if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                                Dialog.alert({
                                                    title: '提示',
                                                    content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                                    confirmText: '去上传',
                                                    onConfirm: () => {
                                                        if(_this.agentCode) {
                                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                                        } else {
                                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                                        }

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
                                            if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                                Dialog.alert({
                                                    title: '提示',
                                                    content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                                    confirmText: '去上传',
                                                    onConfirm: () => {
                                                        if(_this.agentCode) {
                                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                                        } else {
                                                            location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                                        }

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
                            failFn: (data) => {
                                Dialog.alert({ content: data.resultMsg });
                            }
                        })
                    })
                }
            },
            wxCheckPay(){            //微信支付实时支付或者协议支付认证时走的支付流程
                //需要判断是代理人投保还是普通投保，代理人投保需要在suerCode传agentCode
                let _this = this;
                if (_this.agentCode === "") {
                    var datas = {
                        productId: _this.product_id,
                        accName: _this.proper.name,
                        bankMobile:_this.proposerPhone,
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
                        bankMobile:_this.proposerPhone,
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
                                 } else if (data.ybPaying) {
                                     Dialog.alert({ content: "此订单已通过医保正在进行支付处理中" });
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
                                 if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                     Dialog.alert({
                                         title: '提示',
                                         content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                         confirmText: '去上传',
                                         onConfirm: () => {
                                             if(_this.agentCode) {
                                                 location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                             } else {
                                                 location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                             }

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
                                 if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                     Dialog.alert({
                                         title: '提示',
                                         content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                         confirmText: '去上传',
                                         onConfirm: () => {
                                             if(_this.agentCode) {
                                                 location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                             } else {
                                                 location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                             }

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
                       bankMobile:_this.proposerPhone,
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
                       bankMobile:_this.proposerPhone,
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
                                  if(data.actGiftFlag && data.actGiftFlag == "8"){
                                      window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                                  }else if (data.actGiftFlag && data.actGiftFlag == "7") {
                                      window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                                      window.localStorage.setItem("actGiftErrMsg",data.actGiftErrMsg)
                                  } else {
                                      window.localStorage.setItem("actGiftFlag","")
                                      window.localStorage.setItem("actGiftErrMsg","")
                                  }
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
                                              if(_this.agentCode) {
                                                  location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                              } else {
                                                  location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                              }

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
            wxNormalPay5321() {                     //5321微信支付流程
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
                                        _this.wxData = data.wechatSendPayDTO
                                        _this.$nextTick(function(){
                                            _this.$refs.iswxpay.submit()
                                        });
                                    }
                                }
                            },
                            failFn: (data) => {
                                if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                    Dialog.alert({
                                        title: '提示',
                                        content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                        confirmText: '去上传',
                                        onConfirm: () => {
                                            if(_this.agentCode) {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                            } else {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                            }

                                            return false
                                        }
                                    })
                                } else {
                                    Dialog.alert({ content: data.resultMsg });
                                }
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
                                if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                    Dialog.alert({
                                        title: '提示',
                                        content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                        confirmText: '去上传',
                                        onConfirm: () => {
                                            if(_this.agentCode) {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                            } else {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                            }

                                            return false
                                        }
                                    })
                                } else {
                                    Dialog.alert({ content: data.resultMsg });
                                }
                            }
                        })
                    })
                }
            },
            wxNormalPay() {
                //微信支付正常走的支付流程
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
                            url: `/contract/risk/npCheck`,
                            method: "POST",
                            contentType: "application/json;charset=UTF-8",
                            data: datas,
                            isLoading: true,
                            userToken: userToken,
                            successFn: data => {
                                if (data.insured) {
                                    window.localStorage.setItem(
                                        "getContNum",
                                        JSON.stringify(data.wechatPayResultOutDTO.contNo)
                                    );
                                    if (data.modelCode === 1) {
                                        window.location.href =
                                            "Successful.html?product_id=" +
                                            data.wechatPayResultOutDTO.productId +
                                            "&agentCode=" +
                                            data.wechatPayResultOutDTO.agentCode+ "&randomTime=" + _this.randomTime;
                                    } else {
                                        window.location.href =
                                            "Successful.html?product_id=" +
                                            data.wechatPayResultOutDTO.productId+ "&randomTime=" + _this.randomTime;
                                    }
                                } else {
                                    if (_this.$app.isBrowser()) {
                                        _this.wxData = data.wechatAppPayDTO;
                                        setupWebViewJavascriptBridge(function(bridge) {
                                            bridge.callHandler("gowxpay", _this.wxData, function(
                                                responseData
                                            ) {});
                                        });
                                    }
                                    else if(_this.$app.isMiniProgram()&&_this.$app.isBnMiniApp()){
                                        //百年小程序微信支付
                                        let obj =data.wechatAppMiniDTO;
                                        let params = `?orderId=${obj.order_id}&signType=${obj.signType}&paySign=${obj.paySign}&timeStamp=${obj.timeStamp}&nonceStr=${obj.nonceStr}&prepay_id=${obj.prepay_id}`
                                        wx.miniProgram.navigateTo({url:'/pages/pay'+params});
                                    }
                                    else {
                                        _this.wxData = data.wechatSendPayDTO;
                                        _this.$nextTick(function() {
                                            _this.$refs.iswxpay.submit();
                                        });
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
                                            if(_this.agentCode) {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                            } else {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                            }

                                            return false
                                        }
                                    })
                                } else {
                                    Dialog.alert({ content: data.resultMsg });
                                }
                            }
                        });
                    });
                }else{
                    this.$app.getToken(function(userToken) {
                        _this.$request({
                            url: `/contract/risk/npCheck`,
                            method: "POST",
                            contentType: "application/json;charset=UTF-8",
                            data: datas,
                            isLoading: true,
                            userToken: userToken,
                            successFn: data => {
                                _this.wxSpecialData = data.wechatSendH5PayDTO
                                _this.$nextTick(function(){
                                    _this.$refs.iswxpayspecial.submit()
                                });
                            },
                            failFn: data => {
                                if (data.resultCode === 'ANTIMONEY_UNUW_ERR') {
                                    Dialog.alert({
                                        title: '提示',
                                        content: '根据相关规定，累计保费超20万需上传相关证件照片',
                                        confirmText: '去上传',
                                        onConfirm: () => {
                                            if(_this.agentCode) {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}&agentCode=`+_this.agentCode
                                            } else {
                                                location.href = `/product/UploadIDcard.html?orderNo=${_this.orderNo}&product_id=${_this.product_id}`
                                            }

                                            return false
                                        }
                                    })
                                } else {
                                    Dialog.alert({ content: data.resultMsg });
                                }
                            }
                        });
                    });
                }
            },
            shenceFillPayInfo (callback) {
               let that = this
                let payTypeName = that.pay === '1' ? '银行卡支付' : that.pay === '2' ? '微信支付' : that.pay === '3' ? '医保卡支付' : ''
                sensors.track('fill_pay_info', {
                    risk_type: getRiskTypeNameExt(that.curRiskCode), // 产品类型
                    risk: that.riskName,	// 产品名称
                    order_no: that.orderNumber,	// 订单编号
                    total_amnt: that.orderData.premium,	// 费用合计
                    pay_type: payTypeName,	// 缴费类型
                    bank: that.bankLabel,	// 开户银行
                    acc_name: that.proper.name,	// 账户名
                    bank_acc_no: that.bankInfo.bankAccNo,	// 卡号
                    bank_mobile: that.proposerPhone	// 手机号
                }, callback)
            },
            shenceInterceper (fn) {
                let context = this
                return function () {
                    context.shenceFillPayInfo(() => {
                        fn.apply(context, arguments)
                    })
                }
            }
        },
        filters: {
            chooseCertificateType(myInput) {
                let result = "身份证";
                switch (myInput) {
                    case "1":
                        result = "身份证";
                        break;
                    case "2":
                        result = "护照";
                        break;
                    default:
                        result = "身份证";
                }
                return result;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../assets/css/preservation/reuse.scss";
    @import "../../assets/app";
    [v-cloak] {
        display: none;
    }
    .watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center #fff !important;
        background-size: 100% auto!important;
    }
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
    .bankIcon {
        font-size: 40px;
        position: absolute;
        color: #d7000f;
        right: 0.6rem;
        margin-right: 0.2rem;
    }
</style>
