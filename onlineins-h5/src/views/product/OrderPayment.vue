<template>
    <div class="big">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <p class="parS">请于今日23时59分前完成支付,过期此订单失效！</p>
        <div class="box">
            <div class="box-detail">
                <div class="box-title">
                    订单明细
                </div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">订单编号</div>
                        <div class="order-right">{{orderNumber}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">产品名称</div>
                        <div class="order-right">{{riskName}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保额</div>
                        <div class="order-right">¥{{insureAmount}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">缴费年限</div>
                        <div class="order-right">{{payYear}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保障期限</div>
                        <div class="order-right"> {{insuYear}}</div>
                    </div>
                    <!-- <div class="orderdetail">
                         <div class="order-left">交费方式</div>
                         <div class="order-right">年交</div>
                     </div>-->
                    <div class="orderdetail">
                        <div class="order-left">生效日期</div>
                        <div class="order-right">{{jobInfo.cvaliDates}}</div>
                    </div>
                    <!--  <div class="orderdetail">
                          <div class="order-left">附加男女特定疾病</div>
                          <div class="order-right">附加</div>
                      </div>
                      <div class="orderdetail">
                          <div class="order-left">附加身故及全残保障</div>
                          <div class="order-right">附加</div>
                      </div>-->
                    <div class="orderdetail">
                        <div class="order-left">费用合计</div>
                        <div class="order-right">¥{{orderData.premium}}/年</div>
                    </div>
                </div>

            </div>
            <div class="box-detail">
                <div class="box-title">
                    投保人信息
                </div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">姓名</div>
                        <div class="order-right">{{proper.name}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件类型</div>
                        <div class="order-right">{{proper.idType == '4'?'出生证':'身份证'}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件号</div>
                        <div class="order-right">{{proper.idNo}}</div>
                    </div>
                    <div class="orderdetail" v-if="jobInfo.proposerDateFlag != 1">
                        <div class="order-left">证件有效期</div>
                        <div class="order-right">{{jobInfo.proposerIdValidate}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">联系电话</div>
                        <div class="order-right">{{proper.communicationInfo.mobile}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">电子邮箱</div>
                        <div class="order-right">{{proper.communicationInfo.email}}</div>
                    </div>
                    <div v-if="curRiskCode == '1315' || curRiskCode == '5313' || curRiskCode == '5314' || curRiskCode == '5317' || curRiskCode == '5318' || curRiskCode == '5315' || curRiskCode == '5316'">
                        <div class="orderdetail">
                            <div class="order-left">身高</div>
                            <div class="order-right">{{proper.height}}cm</div>
                        </div>
                        <div class="orderdetail myWeight">
                            <div class="order-left">体重</div>
                            <div class="order-right">{{proper.weight}}kg</div>
                        </div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">长期居住地址</div>
                        <div class="order-right">{{jobInfo.proposerAddressArr}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">详细地址</div>
                        <div class="order-right">{{jobInfo.proposerDetailAddress}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">职业</div>
                        <div class="order-right ">{{jobInfo.proposerJob}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">税收居民类型</div>
                        <div class="order-right">{{jobInfo.properResident == 0 ? '仅为中国大陆税收居民' : jobInfo.properResident
                            == 1 ? '仅为非居民' : '中国大陆及其他辖区税收居民'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-detail">
                <div class="box-title">
                    被保人信息
                </div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">姓名</div>
                        <div class="order-right">{{insure.name}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件类型</div>
                        <div class="order-right">{{insureIdTypeCode == '4'?'出生证':'身份证'}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件号</div>
                        <div class="order-right">{{insure.idNo}}</div>
                    </div>
                    <div class="orderdetail" v-if="jobInfo.insureDateFlag != 1">
                        <div class="order-left">证件有效期</div>
                        <div class="order-right">{{jobInfo.insureIdValidate}}</div>
                    </div>
                  <div v-if="curRiskCode != 5307">
                      <div class="orderdetail">
                          <div class="order-left">联系电话</div>
                          <div class="order-right">{{insure.communicationInfo.mobile}}</div>
                      </div>
                      <div class="orderdetail particular">
                          <div class="order-left">电子邮箱</div>
                          <div class="order-right">{{insure.communicationInfo.email}}</div>
                      </div>
                  </div>
                    <div  v-if="curRiskCode == '1315' || curRiskCode == '5313' || curRiskCode == '5314' || curRiskCode == '5317'|| curRiskCode == '5318' || curRiskCode == '5315' || curRiskCode == '5316'">
                        <div class="orderdetail">
                            <div class="order-left">身高</div>
                            <div class="order-right">{{insure.height}}cm</div>
                        </div>
                        <div class="orderdetail myWeight">
                            <div class="order-left">体重</div>
                            <div class="order-right ">{{insure.weight}}kg</div>
                        </div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">长期居住地址</div>
                        <div class="order-right">{{jobInfo.insureLiveAddress}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">详细地址</div>
                        <div class="order-right">{{jobInfo.insureDetailAddress}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">职业</div>
                        <div class="order-right" id="insure">{{jobInfo.insuredJob}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">税收居民类型</div>
                        <div class="order-right"> {{jobInfo.insureResident == 0 ? '仅为中国大陆税收居民' : jobInfo.insureResident
                            == 1 ? '仅为非居民' : '中国大陆及其他辖区税收居民'}}
                        </div>
                    </div>
                    <div class="orderdetail" v-if="curRiskCode == '5315'||curRiskCode == '5316'">
                        <p class="order-left">是否享有基本医疗保险或公费医疗</p>
                        <p class="order-right">{{ socialSecurity }}</p>
                    </div>
                </div>

            </div>
            <div class="box-detail">
                <div class="box-title">
                    受益人信息
                </div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">受益人类型</div>
                        <!--<div class="order-right">{{bnflist ? "法定受益人":"指定受益人"}}</div>-->
                        <div class="order-right">{{jobInfo.benValue}}</div>
                    </div>
                    <div v-if="bnflist" v-for="(item,index) in bnflist" style="margin-bottom: 30px">
                        <div class="orderdetail">
                            <div class="order-left">姓名</div>
                            <div class="order-right">{{item.name}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">受益人顺序</div>
                            <div class="order-right">{{index==0? '第一受益人': index==1?'第二受益人': '第三受益人'}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">证件号码</div>
                             <div class="order-right">{{item.idNo}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">受益比例</div>
                            <div class="order-right">{{(item.proportion) * 100 + '%'}}</div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="box-detail">
                <div class="box-title">
                    续期信息
                </div>
                <md-field-item
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    title="开户银行"
                    disabled
                    class="wid"
                    :content="jobInfo.bankValue"
                    >
                    <!--@click.native="showmodel('isbankshow','bankvalue')"-->
                </md-field-item>
                <md-picker
                    v-model="isbankshow"
                    :data="bankData"
                    @confirm="CertificateConfirm"
                ></md-picker>
                <md-input-item
                    title="账户名"
                    disabled
                   v-model="proper.name"
                >{{proper.name}}
                </md-input-item>
                <md-input-item
                    title="卡号"
                    type="bankCard"
                    disabled
                    placeholder="只限投保人储蓄类型银行卡"
                    v-model="firstBankNo"

                ></md-input-item>
                <div class="renew" v-if="curRiskCode == '5315'||curRiskCode == '5316'">
                    <p>申请自动连续投保</p>
                    <p> {{renew}} </p>
                </div>
                <!-- <md-field-item
                     name="area"
                     title="开户行地区"
                     arrow="arrow-right"
                     align="left"
                     :content="jobInfo.kaihuhangaddress"
                     @click.native="showmodel('isaddressDataShow','kaihuhangaddress')">
                 </md-field-item>-->
            </div>

            <div class="box-detail tips">
                <div class="box-title">
                    首期信息
                </div>
                <md-icon
                    name="question"
                    size="lg"
                    color="#dbdbdb"
                    class="iconTip"
                    @click="showTip"
                ></md-icon>
                <md-field-item
                    name="bankcode"
                    arrow="arrow-right"
                    align="left"
                    disabled
                    title="开户银行"
                    class="wid"
                    :content="jobInfo.bankValue"
                    >
                    <!--@click.native="showmodel('isbankshow','bankvalue')"-->
                </md-field-item>
                <md-picker
                    v-model="isbankshow"
                    :data="bankData"
                    title="请选择开户银行"
                    @confirm="CertificateConfirm"
                ></md-picker>
                <md-input-item
                    title="账户名"
                    disabled
                    v-model="proper.name"
                >{{proper.name}}
                </md-input-item>
                <md-input-item
                    title="卡号"
                    type="bankCard"
                    disabled
                    maxlength="19"
                    placeholder="只限投保人储蓄类型银行卡"
                    v-model="bankInfo.bankAccNo"

                ></md-input-item>

            </div>
        </div>
        <form action="" method="post" >
            <md-action-bar :actions="actionBarData" @click="jsubmit">
                <div class="footerbox">
                    <small class="small">&yen;</small>
                    <div class="btnsize">{{orderData.premium.toFixed(2)}}</div>
                </div>

            </md-action-bar>
        </form>
        <form method="post" action="https://appservicetest.aeonlife.com.cn/appservice/payment/wxpay/createorder.do">
            <p><textarea name="paymentRequest" cols="50" rows="5" style="display:none;">{"appid": "wxpay_appid_bnonline","order_id": "A188292327790","amount": 99000,"remark": "百年人寿康惠保产品","limit_pay": "","user_truename": "张扬","user_creid": "152324199009018250","notify_url": "https://www.aeonlife.com.cn/payment/wxpay/callback","return_url": "https://appservicetest.aeonlife.com.cn/appservice/wx/payment/pay.html","nonce_str": "146579121534","sign": "8AA199867EC9E9095969FAE2984E1755"}</textarea></p>
            <md-action-bar :actions="actionBarData" @click="jsubmit">
                <div class="footerbox">
                    <small class="small">&yen;</small>
                    <div class="btnsize">{{orderData.premium.toFixed(2)}}</div>
                </div>
            </md-action-bar>
        </form>
        <md-agree class="agree" v-model="agreeConf.checked"
                  :disabled="agreeConf.disabled"
                  :size="agreeConf.size">
            同意
            <span @click="goNotice">《投保须知》</span>
            <span> <a class="parF" @click="goClause">《产品条款》</a></span>
            <span  @click="goBankBook">《银行自动转账授权书》</span><br>
            <span  @click="goPersonalReminder">《人身险风险提示书》</span>

        </md-agree>
        <md-dialog
            :closable="false"
            v-model="questionDialog.open"
            :btns="questionDialog.btns"
        >
            <p>承保失败</p>
        </md-dialog>
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
        PopupTitleBar
    } from 'mand-mobile'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import '../../assets/js/bridge'
    import '../../assets/detail.scss'

    export default {
        name: 'OrderPayment',
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
        },
        data() {
            return {
                randomTime: Date.now(),
                renew:"",   //自动续保
                socialSecurity:"",     //社保
                throttleFlag: false,
                pay: "1",
                bankAccNo: '',
                showFullScreen:false,
                showFullScreenBank:false,
                curRiskCode:'',
                isPopupShow: {},
                firstBank:'',
                bankShow: {},
                service:{},
                bankvalue: '请选择',
                bankData: [],
                failMsg: '',
                insuredEmail: '',
                isbankshow: false,
                bankAccNo1: '',
                knows: {},
                allData: null,
                localdata: null,
                proper: {
                    name: '',
                    idNo: '',
                    idValidate: '',
                    address: '',
                    nativePlace: '',
                    birthday: '',
                    communicationInfo: {
                        email: '',
                        mobile: ''
                    },
                    height:'',
                    weight:'',
                    idType:''
                },
                insure: {
                    name: '',
                    idNo: '',
                    idValidate: '',
                    address: '',
                    nativePlace: '',
                    birthday: '',
                    communicationInfo: {
                        email: '',
                        mobile: ''
                    },
                    height:'',
                    weight:'',
                    idType:''
                },
                kaihuhangaddress: '',
                orderData: {
                    premium: 100.00,
                    accCode: '',
                    bankAccNo: '',
                    insuredEmail: ''
                },
                orderNumber: '',
                modelName: '',
                actionBarData: [{
                    text: '确认支付',
                    onClick: function () {
                    }
                }],
                bnflist: [],
                agreeConf: {
                    checked: false,
                    name: 'agree0',
                    size: 'md',
                    disabled: false,
                    introduction: '选中状态'
                },
                bankAccNum: '',
                riskName: '',
                jobInfo: {
                    proposerJob: '',
                    insuredJob: '',
                    cvaliDates: '',
                    properResident: '',
                    insureResident: '',
                    kaihuhangaddress: '',
                    bankValue: '',
                    proposerDetailAddress:'',
                    insureDetailAddress:'',
                    proposerIdValidate:'',
                    insureIdValidate:'',
                    proposerDateFlag:'',
                    insureDateFlag:''
                },
                insureAmount: 0,
                bankInfo: {},
                payYear: '',
                insuYear: '',
                cvilateDate: '',
                bankNum: '',
                isaddressDataShow: false,
                successAdd: '',
                product_id: '',
                showError: false,
                showWhirl: false,
                userCodes: '',
                contNum:'',
                firstBankNo:'',
                insureIdTypeCode:'',
                failAdd:'',
                successingAdd:'',
                questionDialog: {
                    open: false,
                    btns: [
                        {
                            text: '返回首页',
                            handler: this.goHome,
                        }
                    ],
                },
            }
        },
        created() {
            // this.is_weixn()
            this.allDatas()
            this.product_id = this.$router.query('product_id')
            this.agentCode = this.$router.query('agentCode')
            //判断是否为代理人，跳转不同路径
            if (this.agentCode==='') {
                this.successAdd = 'Successful.html?product_id=' + this.product_id+ "&randomTime=" + _this.randomTime
                // this.successAdd = 'successful?product_id=' + this.product_id
                this.failAdd = 'UnderWritingFailed.html?orderNo=' + this.orderNumber
                this.successingAdd = 'UnderWriting.html?orderNo=' + this.orderNumber
            }else{
                this.successAdd = 'Successful.html?product_id=' + this.product_id+ "&agentCode=" + this.agentCode+ "&randomTime=" + _this.randomTime
                // this.successAdd = 'Successful?product_id=' + this.product_id+ "&agentCode=" + this.agentCode
                this.failAdd = 'UnderWritingfailed.html?orderNo=' + this.orderNumber+ "&agentCode=" + this.agentCode
                this.successingAdd = 'UnderWriting.html?orderNo=' + this.orderNumber+ "&agentCode=" + this.agentCode
            }
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            document.title = this.riskName
            this.getRiskCode()
            this.getMarriageDataDic("type_bank")

            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('backHomeConfig', {
                    'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                }, function (response) {
                });
            })
        },
        mounted() {
        },
        updated(){
           /* if(this.jobInfo.insuredJob.toString().length > 15){
                document.getElementById("insure").style.lineHeight = '.7rem'
            }else{
                document.getElementById("insure").style.lineHeight = '1.2rem'
            }*/
        },
        methods: {
            payHandleChoose(e, index) {
                this.pay = index;
            },
            goHome() {
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
            showTip(){
                    Dialog.alert({content:'首续期银行账户需保持一致'})
            },
            goNotice(){  //跳转投保
                window.location.href = this.$router.siteUrl() + '/product/NoticeDetail.html?product_id='+this.product_id
            },
            goPersonalReminder(){  //跳转人身险风险提示书
                window.location.href = this.$router.siteUrl() + '/product/PersonalReminder.html?product_id='+this.product_id
            },
            goClause(){ //跳转产品
                window.location.href = this.$router.siteUrl() + '/product/ProductClause.html?product_id='+this.product_id
            },
            goBankBook(){
                window.location.href = this.$router.siteUrl() + '/product/BankAuthorize.html'
            },
            //从缓存读取数据
            allDatas() {
                this.allData = JSON.parse(localStorage.getItem('allInfo'))
                this.socialSecurity = JSON.parse(localStorage.getItem('SOCIAL_SECURITY'));
                this.renew = JSON.parse(localStorage.getItem('IS_SOCIAL_SECURITY'));
                this.renewFlag = JSON.parse(localStorage.getItem('IS_SOCIAL_SECURITY_VAL'));
                this.insureIdTypeCode = this.allData.insuredInfoList[0].idType
                // this.orderData = JSON.parse(localStorage.getItem('orderNum'))
                this.localdata = JSON.parse(localStorage.getItem('PAWithRule'))
                this.orderContent = JSON.parse(localStorage.getItem('orderNumber'))
                this.jobInfo = JSON.parse(localStorage.getItem('jobInfo'))
                this.orderNumber = this.orderContent
                this.proper.name = this.allData.appntInfo.name
                this.proper.idNo = this.allData.appntInfo.idNo
                this.proper.idValidate = this.allData.appntInfo.idValidate
                this.proper.address = this.allData.appntInfo.rgtAddressText
                this.proper.birthday = this.allData.appntInfo.birthday
                this.proper.height = this.allData.appntInfo.stature
                this.proper.weight = this.allData.appntInfo.avoirdupois
                this.proper.idType = this.allData.appntInfo.idType
                this.proper.communicationInfo.email = this.allData.appntInfo.communicationInfo.email
                this.proper.communicationInfo.mobile = this.allData.appntInfo.communicationInfo.mobile

                this.bankNum = this.allData.insuredInfoList[0].contInfo.chargeInfo.bankCode

                this.insure.name = this.allData.insuredInfoList[0].name
                this.insure.idNo = this.allData.insuredInfoList[0].idNo
                this.insure.idValidate = this.allData.insuredInfoList[0].idValidate
                this.insure.address = this.allData.insuredInfoList[0].rgtAddressText
                this.insure.height = this.allData.insuredInfoList[0].stature
                this.insure.weight = this.allData.insuredInfoList[0].avoirdupois
                this.insure.birthday = this.allData.insuredInfoList[0].birthday
                this.insure.communicationInfo.email = this.allData.insuredInfoList[0].communicationInfo.email
                this.insure.communicationInfo.mobile = this.allData.insuredInfoList[0].communicationInfo.mobile
                this.bnflist = this.allData.insuredInfoList[0].bnfInfoList
                this.bankInfo = this.allData.insuredInfoList[0].contInfo.chargeInfo
                this.orderData.premium = this.allData.insuredInfoList[0].contInfo.sumPrem * 1
                this.bankAccNum = this.allData.insuredInfoList[0].contInfo.chargeInfo.bankAccNo
                /*for (let i = 0; i < this.allData.insuredInfoList[0].riskInfoList.length; i++) {
                    this.insureAmount += parseInt(this.allData.insuredInfoList[0].riskInfoList[i].amnt)
                }*/
                this.insureAmount = parseInt(this.allData.insuredInfoList[0].riskInfoList[0].amnt)
                this.payYear = this.allData.insuredInfoList[0].riskInfoList[0].payEndYear + '年'

                let insureData = this.allData.insuredInfoList[0].riskInfoList[0]
                this.insuYear = ( insureData.insuYearFlag.indexOf('Y') > -1 ? '' : '至') +  insureData.insuYear  +  insureData.insuYearFlag.replace('A', '岁').replace('Y', '年')
                if(insureData.insuYear == '106'){
                    this.insuYear = '保终身'
                }

                if(this.allData.insuredInfoList[0].riskInfoList[0].payEndYear == '1000'){
                    this.payYear = '一次交清'
                }
                this.firstBankNo= this.bankInfo.bankAccNo

                this.knows = JSON.parse(localStorage.getItem('knowledge'))
                // this.jobInfo.cvaliDates = this.transferDate(new Date(), 'yyyy-MM-dd');
            },
            transferDate(time, format) {
                var t = new Date(time);
                var tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                };
                var month = this.insure.birthday.substr(5,2)
                var day = this.insure.birthday.substr(8,2)
                if(month === tf(new Date().getMonth()) && day === tf(new Date().getDate())){
                    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                        switch (a) {
                            case 'yyyy':
                                return tf(t.getFullYear());
                                break;
                            case 'MM':
                                return tf(t.getMonth() + 1);
                                break;
                            case 'mm':
                                return tf(t.getMinutes());
                                break;
                            case 'dd':
                                return tf(t.getDate());
                                break;
                            case 'HH':
                                return tf(t.getHours());
                                break;
                            case 'ss':
                                return tf(t.getSeconds());
                                break;
                        }
                    })
                }else{
                    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                        switch (a) {
                            case 'yyyy':
                                return tf(t.getFullYear());
                                break;
                            case 'MM':
                                return tf(t.getMonth() + 1);
                                break;
                            case 'mm':
                                return tf(t.getMinutes());
                                break;
                            case 'dd':
                                return tf(t.getDate() + 1);
                                break;
                            case 'HH':
                                return tf(t.getHours());
                                break;
                            case 'ss':
                                return tf(t.getSeconds());
                                break;
                        }
                    })
                }



            },
            CertificateConfirm(columnsValue) {
                this.jobInfo.bankValue = columnsValue[0].label;
                this.bankNum = columnsValue[0].value;
            },
            checkbankcard() {
            },
            showmodel(model, modelName, modelIndex) {
                this[model] = true;
                this.modelName = modelName;
                if (modelIndex) {
                    this.modelIndex = modelIndex
                }
            },
            //通过id查询riskCode
            getRiskCode() {
                this.$request({
                    url: `/ins/product/product/risk/${this.product_id}`,
                    params: {},
                    successFn: (data) => {
                        this.curRiskCode = data.riskInfo.riskCode;
                        this.showWhirl = false
                    },
                    failFn: () => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            showPopUp(type) {
                this.$set(this.isPopupShow, type, true)
            },
            hidePopUp(type) {
                this.$set(this.isPopupShow, type, false)
            },
            showPopUpBank(type) {
                this.$set(this.bankShow, type, true)
            },
            hidePopUpBank(type) {
                this.$set(this.bankShow, type, false)
            },
            showPopUpService(type) {
                this.$set(this.service, type, true)
            },
            hidePopUpService(type) {
                this.$set(this.service, type, false)
            },
            //数据字段
            getMarriageDataDic(index) {
                var data = {
                    "type": index
                }
                this.$request({
                    url: `/sys/dict/type`,
                    method: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: data,
                    successFn: (data) => {
                        if (index == "type_bank") {
                            this.bankData = [data]
                        }
                    },
                    failFn: (data) => {
                    }
                })
            },
            is_weixn(){
                let ua = navigator.userAgent.toLowerCase();
                if(!ua.match(/MicroMessenger/i) == "micromessenger") {
                   console.log("是")
                   return true
                } else {
                   console.log("不是")
                   return false
                }
            },
            // 提交订单
            jsubmit() {
                let _this = this
                if (_this.agreeConf.checked == false) {
                    Toast.failed('请您先确认您已充分了解本产品')
                    return false
                }

                if (_this.agentCode==='') {
                    var datas = {
                    "productId":_this.product_id,
                    "accName": _this.proper.name,
                    "bankAccNo": _this.bankInfo.bankAccNo,
                    "bankCode": _this.bankNum,
                    "money": _this.orderData.premium,
                    "orderNo": _this.orderNumber,
                    "payByAeon": "Y",
                    "payMode": "R",
                    "userCode": "72845852",
                    //"userCode": this.userCodes
                    "secondaryDistributor": localStorage.getItem('cps_secondaryDistributor') || '',
                    "thirdClassDistributor": localStorage.getItem('cps_thirdClassDistributor') || '',
                    "shareUserCode": localStorage.getItem('cps_shareUserCode') || ''
                    }
                }else{
                    var datas = {
                    "productId":_this.product_id,
                    "accName": _this.proper.name,
                    "bankAccNo": _this.bankInfo.bankAccNo,
                    "bankCode": _this.bankNum,
                    "money": _this.orderData.premium,
                    "orderNo": _this.orderNumber,
                    "payByAeon": "Y",
                    "payMode": "R",
                    "userCode": _this.agentCode,
                    //"userCode": this.userCodes
                    "secondaryDistributor": localStorage.getItem('cps_secondaryDistributor') || '',
                    "thirdClassDistributor": localStorage.getItem('cps_thirdClassDistributor') || '',
                    "shareUserCode": localStorage.getItem('cps_shareUserCode') || ''
                    }
                }

                //throttleFlag函数节流 默认是false，执行一下改为true,执行结束又回false
                if (this.throttleFlag) return
                this.throttleFlag = true

                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/contract/risk/policycharge`,
                        method: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        data: datas,
                        isLoading:true,
                        userToken: userToken,
                        successFn: (data) => {
                            if(data.chargeOutList && data.chargeOutList.length > 0){
                                if(data.chargeOutList[0].status === '8'){   //承保成功
                                    _this.contNum = data.chargeOutList[0].contNo
                                    window.localStorage.setItem("getContNum", JSON.stringify(_this.contNum));
                                     location.href = _this.successAdd
                                }else if(data.chargeOutList[0].status === '7'){   //承保中
                                    //_this.questionDialog.open = true
                                    location.href = _this.successingAdd
                                }else if(data.chargeOutList[0].status === '6'){   //承保失败
                                    window.localStorage.setItem('failMessage',JSON.stringify(data.chargeOutList[0].message))
                                    //Dialog.alert({content:'承保失败'})
                                    location.href = _this.failAdd
                                }
                            }
                            _this.throttleFlag = false
                        },
                        failFn: (data) => {
                            _this.showWhirl = false
                            _this.throttleFlag = false
                            Dialog.alert({ content:data.resultMsg })
                        }
                    })
                })
            }
        },
        filters: {
            chooseCertificateType(myInput) {
                let result = '身份证'
                switch (myInput) {
                    case '1' :
                        result = '身份证'
                        break;
                    case '2' :
                        result = '护照'
                        break;
                    default :
                        result = '身份证'
                }
                return result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .renew{
        display: flex;
        justify-content: space-between;
        padding-top: .4rem;
        padding-bottom: 30px;
        p{
            font-size: 0.4rem;
            color: #666;
            line-height: 1.45em;
        }
        li{
            border: 1px solid #b0afaf;
            border-radius: 0.06667rem;
            font-size: 0.37333rem;
            text-align: center;
            display: inline-block;
            padding: 0.09333rem 0.53333rem;
            margin-left: 0.16rem;
        }
        .active{
            color: rgb(215, 0, 15) !important;
            border: 2px solid rgb(215, 0, 15) !important;
        }
    }
    .socialSecurity{
        border-top: px2em(1px) solid #e2e4ea;
    }
    .big {
        padding-bottom: px2em(150px);
    }

    .box {
        width: 90%;
        margin: 30px auto 0;
        padding-top: px2em(20px);
    }

    .md-field {
        border-radius: px2em(10px);
        box-shadow: px2em(0px) px2em(3px) px2em(20px) px2em(0px) rgba(30, 0, 2, 0.1);

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
            padding: .4rem 0;
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

    .orderdetail:not(:last-child) {
        border-bottom: px2em(1px) solid #e2e4ea;
    }

    .footerbox {
        display: flex;
        text-align: center;
        justify-content: center;
        flex: 1;
        align-items: flex-end;
        color: #d7000f;
    }

    .small {
        font-size: px2em(26px);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        vertical-align: bottom;
    }

    .btnsize {
        font-size: px2em(50px);
        font-weight: 700;
    }

    .md-button.primary {
        background-color: #d7000f !important;
    }

    .agree {
        margin-top: px2em(20px);
        width: 92%;
        margin-left: 4%;
        span {
            color: #d7000f;
        }
        .parF {
            color: #d7000f !important;
        }
    }

    .md-action-bar {
        padding: 0;
        border-top: px2em(1px) solid #e2e4ea;
    }

    .md-input-item-fake, .md-input-item-input {
        font-size: .37333rem;
        color: #666;
    }

    .parK {
        line-height: .7rem;
    }

    .md-example-child-popup-0 {
        float: left;
        width: 100%;
    }

    .md-button {
        margin-bottom: 20px;
    }

    .md-example-popup {
        position: relative;
        font-size: 28px;
        font-family: DINPro;
        font-weight: 500;
        box-sizing: border-box;
        //text-align: center;
        background-color: #FFF
    }

    .md-example-popup-center {
        padding: 50px;
    }

    .md-example-popup-top {

        width: 100%;
        height: 75px;
        line-height: 75px;
        background: #4a4c5b;
        color: #fff
    }

    .md-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%)
    }

    .md-example-popup-bottom {
        width: 100%;
        padding: 40px 35px;
        line-height: .6rem;
        p {
            line-height: 50px;
        }
    }

    .md-example-popup-left, .md-example-popup-right {
        height: 100%;
        padding: 0 150px;
        display: flex;
        align-items: center
    }
    .tips{
        position: relative;
    }
    .iconTip {
        position: absolute;
        top:60px;
        left: 170px;
    }
    .md-example-child-landscape{
        .md-button{
            margin-bottom :20px;
            .md-landscape-content{
                padding :30px;
                font-size: 30px;
                line-height :1.5;
                color :#666;
                p{
                    margin-bottom :30px
                }
            }
        }
    }
    .insureKnow{
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: .3rem;
        background: #e8e8e8;
        position: fixed;
        font-size: .5rem;
        font-weight: 600;
    }
    .showInsure{
        padding: 100px 30px 30px;
        overflow-x: hidden;
    }
    .bankInsure{
        line-height: 1.5;
    }
    .particular{
        border-bottom: 0.01333rem solid #e2e4ea
    }
    .myWeight{
        border-bottom: 1px solid #e2e4ea;
    }
    .parS{
          position: fixed;
          top: 0px;
          font-size: 24px;
          height: 56px;
          color: #fff;
          line-height: 56px;
          text-align: center;
          background: #FC8F22;
          width: 100%;
      }
</style>
