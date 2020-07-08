<template>
    <div class="big">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="tip-msg" v-if="order_status === '6'">
            <div class="parT">试一试点击继续支付 或 修改银行卡后点击继续支付</div>
        </div>
        <div class="tip-msg" v-else>
            <div class="parT">{{involidTime}}</div>
        </div>
        <div class="box">
            <div :class="setClass">
                <div class="box-title">订单明细</div>
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
                        <div class="order-left">交费期间</div>
                        <div v-if="payYear === '1000'" class="order-right">一次缴清</div>
                        <div v-else class="order-right">{{payYear}}年</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保险期限</div>
                        <div class="order-right">{{insuYear}}</div>
                    </div>
                    <div v-if="renewAssureYear" class="orderdetail">
                        <div class="order-left">保证续保年限</div>
                        <div class="order-right">{{renewAssureYear}}年</div>
                    </div>
                    <div class="orderdetail">
                       <div class="order-left">交费方式</div>
                       <div v-if="payIntv === '12'" class="order-right">年缴</div>
                        <div v-if="payIntv === '0'" class="order-right">趸缴</div>
                        <div v-if="payIntv === '1'" class="order-right">月缴</div>
                    </div>
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
                        <div v-if="payIntv === '0'" class="order-left">费用合计</div>
                        <div v-else class="order-left">首年费用合计</div>
                        <div v-if="payIntv === '12'" class="order-right">¥{{orderData.premium}}/年</div>
                        <div v-if="payIntv === '1'" class="order-right">¥{{orderData.premium}}/月</div>
                        <div v-if="payIntv === '0'" class="order-right">¥{{orderData.premium}}</div>
                    </div>
                </div>
            </div>

            <div class="box-detail" v-if="ifyht">
                <div class="box-title">附加医惠通医疗险</div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">保额</div>
                        <div class="order-right">¥4000000</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保障期限</div>
                        <div class="order-right">1年</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">是否连续续保</div>
                        <div class="order-right">{{renewFlagYiHuiTong == "Y" ? "是" : "否"}} </div>
                    </div>
                </div>
            </div>

            <div class="box-detail" v-if="insGiftInsuranceManage">
                <div class="box-title">药惠通抗癌特药险<img src="../../assets/imgs/kanghuibao/giftlogo.png" class="giftIns-tip"></div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">保额</div>
                        <div class="order-right">¥{{yhtamnt}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保障期限</div>
                        <div class="order-right">{{yhtinsuYear}}年</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">保险费用</div>
                        <div class="order-right">¥0</div>
                    </div>
                </div>
            </div>

            <div class="box-detail">
                <div class="box-title">投保人信息</div>
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
                    <div v-if="proper.height">
                        <div class="orderdetail">
                            <div class="order-left">身高</div>
                            <div class="order-right">{{proper.height}}cm</div>
                        </div>
                        <div class="orderdetail myWeight">
                            <div class="order-left">体重</div>
                            <div class="order-right">{{proper.weight}}kg</div>
                        </div>
                    </div>
                    <!-- <div class="orderdetail">
                                   <div class="order-left">长期居住地址</div>
                                   <div class="order-right">{{jobInfo.proposerAddressArr}}</div>
                    </div>-->
                    <div class="orderdetail">
                        <div class="order-left">联系地址</div>
                        <div class="order-right">{{jobInfo.proposerDetailAddress}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">职业</div>
                        <div class="order-right">{{jobInfo.proposerJob}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">税收居民类型</div>
                        <div class="order-right">
                            {{jobInfo.properResident == 0 ? '仅为中国大陆税收居民' : jobInfo.properResident
                            == 1 ? '仅为非居民' : '中国大陆及其他辖区税收居民'}}
                        </div>
                    </div>
                    <div class="socialSecurity" v-if="curRiskCode == '5315'||curRiskCode == '5316' || curRiskCode == '5325'">
                        <p>是否享有基本医疗保险或公费医疗</p>
                        <p>{{ socialSecurity }}</p>
                    </div>
                </div>
            </div>
            <div class="box-detail">
                <div class="box-title">被保人信息</div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">姓名</div>
                        <div class="order-right">{{insure.name}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件类型</div>
                        <div class="order-right">{{insure.idType == '4'?'出生证':insure.idType == '5'?'户口本':'身份证'}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">证件号</div>
                        <div class="order-right">{{insure.idNo}}</div>
                    </div>
                    <div
                        class="orderdetail"
                        v-if="insure.idType != '4' && insure.idType != '5' && jobInfo.insureIdValidate != '3000-01-01'"
                    >
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
                    <div v-if="insure.height">
                        <div class="orderdetail">
                            <div class="order-left">身高</div>
                            <div class="order-right">{{insure.height}}cm</div>
                        </div>
                        <div class="orderdetail myWeight">
                            <div class="order-left">体重</div>
                            <div class="order-right">{{insure.weight}}kg</div>
                        </div>
                    </div>
                    <!-- <div class="orderdetail">
                                   <div class="order-left">长期居住地址</div>
                                   <div class="order-right">{{jobInfo.insureLiveAddress}}</div>
                    </div>-->
                    <div class="orderdetail parS">
                        <div class="order-left">联系地址</div>
                        <div class="order-right" id="insureAddress">{{jobInfo.insureDetailAddress}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">职业</div>
                        <div class="order-right">{{jobInfo.insuredJob}}</div>
                    </div>
                    <div class="orderdetail">
                        <div class="order-left">税收居民类型</div>
                        <div class="order-right">
                            {{jobInfo.insureResident == 0 ? '仅为中国大陆税收居民' : jobInfo.insureResident
                            == 1 ? '仅为非居民' : '中国大陆及其他辖区税收居民'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-detail" v-if="information">
                <div class="box-title">受益人信息</div>
                <div>
                    <div class="orderdetail">
                        <div class="order-left">受益人类型</div>
                        <div class="order-right">{{bnflist.length == 0? "法定受益人":"指定受益人"}}</div>
                        <!-- <div class="order-right">{{jobInfo.benValue}}</div>-->
                    </div>
                    <div v-if="bnflist" v-for="(item,index) in bnflist" style="margin-bottom: 10px">
                        <div class="orderdetail">
                            <div class="order-left">姓名</div>
                            <div class="order-right">{{item.name}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">受益人顺序</div>
                            <div class="order-right">{{index == 0 ? '第一受益人' : index == 1 ? '第二受益人' : '第三受益人'}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">证件号码</div>
                            <div class="order-right">{{item.idNo}}</div>
                        </div>
                        <div class="orderdetail">
                            <div class="order-left">受益比例</div>
                            <div class="order-right">{{item.proportion * 100}}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <md-action-bar :actions="actionBarData" v-if="pay == 1" @click="wx_jsubmit">
            <div class="footerbox">
                <small class="small">&yen;</small>
                <div class="btnsize">{{orderData.premium.toFixed(2)}}</div>
            </div>
        </md-action-bar>
        <md-action-bar :actions="actionBarData"  v-else  @click="jsubmit">
            <div class="footerbox">
                <small class="small">&yen;</small>
                <div class="btnsize">{{orderData.premium.toFixed(2)}}</div>
            </div>
        </md-action-bar>
        <form ref="iswxpay" id="iswxpay" method="post" :action="wxPayUrl()">
      <textarea
          id="payment"
          ref="payment"
          name="paymentRequest"
          rows="5"
          style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;"
      >{{ wxData }}</textarea>
        </form>
        <form ref="iswxpayspecial" id="iswxpay" method="post" :action="wxPaySpecialUrl()">
      <textarea
          id="payment"
          ref="payment"
          name="paymentRequest"
          rows="5"
          style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;"
      >{{ wxSpecialData }}</textarea>
        </form>
        <form ref="iswxpay5321" id="iswxpay" method="post" :action="wxPayUrl5321()">
      <textarea
          id="payment"
          ref="payment"
          name="paymentRequest"
          rows="5"
          style="visibility: hidden;position: absolute;width: 100%;box-sizing: border-box;"
      >{{ wxData5321 }}</textarea>
        </form>
        <md-agree
            class="agree"
            v-model="agreeConf.checked"
            :disabled="agreeConf.disabled"
            :size="agreeConf.size"
        >

            <div v-if="isSubRiskYiHuiTong == true && renewFlagYiHuiTong == 'N'">
                同意
                <span @click="goNotice">《投保须知》</span>
                <span v-if="isAndroidShow===false">
                     <span @click="goPreView(1)">《附加医惠通投保须知》</span>
                     <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                </span>
                <span v-if="isAndroidShow===true && isBrowser" >
                     <span @click="goPreView(1)">《附加医惠通投保须知》</span>
                     <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                </span>
                <span>
                  <a class="parF" @click="goClause">《产品条款》</a>
                </span>
                <span @click="goBankBook">《银行自动转账授权书》</span>
                <span v-if="(curRiskCode == '5319' || curRiskCode == '5317' ) && !isBrowser && isAndroidShow===true" v-for="(data,index) in dataUrl" :key="index">
                    <span v-if="data.fileShowName==='《人身险风险提示书》' || data.fileShowName==='《附加医惠通投保须知》'">
                        <span @click="goAndroidNotice(data.url)">{{data.fileShowName}}</span>
                    </span>
                </span>

            </div>
            <div v-else-if ="isSubRiskYiHuiTong == true && renewFlagYiHuiTong == 'Y'">
                同意
                <span @click="goNotice">《投保须知》</span>
                <span v-if="isAndroidShow===false">
                     <span @click="goPreView(1)">《附加医惠通投保须知》</span>
                    <span @click="goPreView(3)">《附加医惠通费率表》</span>
                     <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                </span>
                <span v-if="isAndroidShow===true && isBrowser" >
                    <span @click="goPreView(1)">《附加医惠通投保须知》</span>
                    <span @click="goPreView(3)">《附加医惠通费率表》</span>
                     <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                </span>
                <span>
                  <a class="parF" @click="goClause">《产品条款》</a>
                </span>
                <span @click="goBankBook">《银行自动转账授权书》</span>
                <span v-if="(curRiskCode == '5319' || curRiskCode == '5317' ) && !isBrowser && isAndroidShow===true" v-for="(data,index) in dataUrl" :key="index">
                    <span  v-if="data.fileShowName==='《人身险风险提示书》' || data.fileShowName==='《附加医惠通费率表》' || data.fileShowName==='《附加医惠通投保须知》'">
                        <span @click="goAndroidNotice(data.url)">{{data.fileShowName}}</span>
                    </span>
                </span>
            </div>
            <div v-else>
                <span v-if ="curRiskCode == '5323'" style="color:#333333;">我已了解，本产品为长期医疗保险产品，其费率在保险期间内是可能调整的。<br/></span>
                <span v-if ="curRiskCode == '5324'" style="color:#333333;">我已了解，本产品为长期医疗保险产品，其费率在保证续保期间内是可能调整的。<br/></span>
                同意
                <span @click="goNotice">《投保须知》</span>
                      <span>
                  <a class="parF" @click="goClause">《产品条款》</a>
                </span>
                  <span @click="goBankBook">《银行自动转账授权书》</span>

                <span v-if="isAndroidShow===false">
                    <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                    <span v-if="curRiskCode == '5032'" @click="goProductRate">《产品费率表》</span>
                    <span v-if="curRiskCode == '5324'" @click="goPreView(4)">《产品说明书》</span>
                    <span v-if="curRiskCode == '5323'" @click="goPreView(5)">《产品说明书》</span>
                    <span v-if="curRiskCode == '5324'" @click="goPreView(6)">《产品费率表》</span>
                    <span v-if="curRiskCode == '5323'" @click="goPreView(7)">《产品费率表》</span>
                    <span v-if="curRiskCode == '5325'" @click="goPreView(8)">《产品费率表》</span>
                    <!--<span v-if="insGiftInsuranceManage && curRiskCode != '5032'" @click="goProductRate">《药惠通费率表》</span>
                    <span v-if="insGiftInsuranceManage" @click="goYhtNotice">《药惠通投保须知》</span>-->
                    <span v-if="insGiftInsuranceManage" @click="goYhtClause">《药惠通产品条款》</span>
                </span>
                <span v-if="isAndroidShow===true && isBrowser" >
                    <span @click="goPersonalReminder" >《人身险风险提示书》</span>
                    <span v-if="curRiskCode == '5032'" @click="goProductRate">《产品费率表》</span>
                    <span v-if="curRiskCode == '5324'" @click="goPreView(4)">《产品说明书》</span>
                    <span v-if="curRiskCode == '5323'" @click="goPreView(5)">《产品说明书》</span>
                    <span v-if="curRiskCode == '5324'" @click="goPreView(6)">《产品费率表》</span>
                    <span v-if="curRiskCode == '5323'" @click="goPreView(7)">《产品费率表》</span>
                    <span v-if="curRiskCode == '5325'" @click="goPreView(8)">《产品费率表》</span>
                    <!--<span v-if="insGiftInsuranceManage && curRiskCode != '5032'" @click="goProductRate">《药惠通费率表》</span>
                    <span v-if="insGiftInsuranceManage" @click="goYhtNotice">《药惠通投保须知》</span>-->
                    <span v-if="insGiftInsuranceManage" @click="goYhtClause">《药惠通产品条款》</span>
                </span>
                <span v-if="(curRiskCode == '5319' || curRiskCode == '5317' ) && !isBrowser && isAndroidShow===true" v-for="(data,index) in dataUrl" :key="index">
                    <span  v-if="data.fileShowName==='《人身险风险提示书》'">
                        <span @click="goAndroidNotice(data.url)">{{data.fileShowName}}</span>
                    </span>
                    <span v-if="insGiftInsuranceManage && data.fileShowName==='《药惠通产品条款》'">
                        <span @click="goAndroidNotice(data.url)">{{data.fileShowName}}</span>
                    </span>
                </span>
            </div>
        </md-agree>
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
        Captcha
    } from "mand-mobile";
    import Whirl from "@/components/Whirl";
    import Error from "@/components/Error";
    import "../../assets/js/bridge";
    import "../../assets/detail.scss";
    import { debounce, throttle } from "../../utils/utils"
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
            [PopupTitleBar.name]: PopupTitleBar,
            [Icon.name]: Icon,
            [Captcha.name]: Captcha
        },
        data() {
            return {
                insGiftInsuranceManage:'',
                ifyht : false,
                isAndroidShow: false,//ceshi true
                dataUrl: [],
                yhtamnt: '',
                yhtinsuYear: '',
                randomTime: Date.now(),
                showWxAndBank: false,           //判断是否微信支付与银行卡支付同时显示
                smsVerifyShow: false,
                smsVerifyAppendTo: document.body,
                smsVerifyContent: "",
                smsVerifyFirst: true,
                applySeq: "",
                countNum: 0,
                payTypeWay: "",
                showAgreementPay: false, //是否显示预留手机号
                proposerPhoneDisable: false, //预留手机号默认可修改
                proposerPhone: "", //预留手机号
                wxTipShow: true,
                isBrowser: true,
                involidTime: "",
                payType: "0", //原生 1    H5 0
                showWxPay: false,
                wxPayFlag: false,
                frompage: "",
                wxData: "",
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
                curRiskCode: "",
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
                        onClick: function() {
                            this.actionBarData = debounce(throttle(this.actionBarData,2000))
                        }
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
                showBankChoose: true,
                isShowBank: false,
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
                payIntv : "",
                renewAssureYear : "",
                insuYear: "",
                cvilateDate: "",
                bankNum: "",
                isaddressDataShow: false,
                successAdd: "",
                product_id: "",
                orderNo: "",
                showError: false,
                showWhirl: false,
                userCodes: "",
                contNum: "",
                firstBankNo: "",
                insureIdTypeCode: "",
                bankLabel: "",
                newBankLabel: "",
                isSubRiskYiHuiTong: false,//测试 true
                renewFlagYiHuiTong: 'N',//N 测试
                setClass:'box-detail',
				information: true
            };
        },
        computed: {
            // isFirstPay() {
            //   return document.referrer.toLocaleLowerCase().includes("/product/buy");
            // }
        },
        created() {
            this.jsubmit= debounce(this.jsubmit);
            this.wx_jsubmit = debounce(this.wx_jsubmit);
            this.phone = this.$router.query("phone");
            this.agentCode = this.$router.query("agentCode");
            this.orderNo = this.$router.query("orderNo");
            this.product_id = this.$router.query("product_id");
            this.frompage = this.$router.query("frompage");
            this.curRiskCode = this.$router.query("curRiskCode");
            this.isBrowser = this.$app.isBrowser();
            this.getBankList();


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
        },
        mounted() {
              if (process.env.NODE_ENV !== 'production'){
                this.setClass='box-detail watermark';

            }
            let _this = this;
            this.$app.showCustomerIntelligence(data => {
                _this.wxPayFlag = data.wxPayFlag;               //wxPayFlag为渠道开关（app内也存在渠道开关）
                _this.$app.ifWxPay(flag => {                    //flag为总开关
                    if (flag) {
                        if (_this.wxPayFlag) {
                            _this.showWxPay = true;
                        } else {
                            _this.showWxPay = false;
                        }
                    } else {
                        _this.showWxPay = false;
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
        updated() {},
        methods: {
            goPreView(id) {
              if(id == 1) {
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200120/1/onlineins/onlineins_1_1_20200120155929726.pdf")
              } else if(id == 2) {
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200121/1/onlineins/onlineins_1_1_20200121085535867.pdf")
              } else if(id == 3) {
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200120/1/onlineins/onlineins_1_1_20200120155837527.pdf")
              }else if (id === 4) { // 5324 产品说明书
                    this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200217/1/onlineins/onlineins_1_1_20200217105742568.pdf")
                }
                else if (id === 5) { // 5323 产品说明书
                    this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200212/1/onlineins/onlineins_1_1_20200212131816353.pdf")
                }
                else if (id === 6) { // 5324 费率
                    this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200213/1/onlineins/onlineins_1_1_20200213093828997.pdf")
                }
                else if (id === 7) { // 5323 费率
                    this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200213/1/onlineins/onlineins_1_1_20200213093842883.pdf")
                } else if (id === 8) { //5325 费率
                  this.$app.goPdfView("https://bnonline.aeonlife.com.cn/bnonlineimg/h5/20200325/flb.pdf")
              }
            },
            showPayWay() {
                if(this.showWxPay && !(this.$app.isMiniProgram() && !this.$app.isBnMiniApp())){
                    this.showWxAndBank = true;
                }
            },
            smsVerifyInterface(flag) {
                let _this = this;
                let allDatas = {
                    productNo: "PROTOCOLPAYTRADE",
                    orderAmount: _this.orderData.premium.toFixed(2),
                    bankCode: _this.bankNum,
                    bankCardNo: _this.bankInfo.bankAccNo,
                    bankCardName: _this.bankLabel,
                    certType: "0",
                    certId: _this.proper.idNo,
                    mobile: _this.proposerPhone,
                    branchOrgNo: "86",
                    busType: "ZC",
                    policyBusType: "01",
                    accType: "0",
                    bankCardType: "0"
                };
                this.$app.getToken(function(userToken) {
                    _this.$request({
                        url: `/ins/vipUserBankcard/verifyBankProtocal`,
                        method: "POST",
                        contentType: "application/json;charset=UTF-8",
                        data: allDatas,
                        userToken: userToken,
                        successFn: data => {
                            _this.applySeq = data.applySeq;
                            if (data.protocolFlag == "0") {
                                if (_this.payTypeWay == "wx") {
                                    _this.wxCheckPay();
                                } else if (_this.payTypeWay == "bank") {
                                    console.log("实时支付");
                                    _this.bankCheckPay();
                                }
                            } else {
                                if (data.protocolNoExistsFlag == "0") {
                                    if (_this.payTypeWay == "wx") {
                                        _this.wxNormalPay();
                                    } else if (_this.payTypeWay == "bank") {
                                        console.log("已存在协议号");
                                        _this.bankNormalPay();
                                    }
                                } else if (data.protocolNoExistsFlag == "1") {
                                    if (flag == 0) {
                                        _this.smsVerifyShow = true;
                                    }
                                }
                            }
                        },
                        failFn: data => {
                            Toast({ content: data.resultMsg });
                            return false;
                        }
                    });
                });
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
            //  校验预留手机号
            checkPhone(phone, e = null) {
                if (!phone) {
                    Toast({
                        content: "银行预留手机号不可为空"
                    });
                    return false;
                }
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    Toast.failed("您输入的手机号格式不正确！");
                    return false;
                }
                return true;
            },
            deleteItem(arr) {
                // {value: "07", label: "招商银行"}
                // {value: "09", label: "邮储银行"} 去掉邮储银行
                const index = arr.findIndex(item => item.value === "07");
                arr.splice(index, 1);

                /* const youchuIndex = arr.findIndex((item) => item.value === "09")
                arr.splice(youchuIndex, 1)*/
                return arr;
            },
            payHandleChoose(e, index) {
                this.pay = index;
                if (index == 1) {
                    this.wxTipShow = true;
                } else {
                    this.wxTipShow = false;
                }
            },
            showTip() {
                Dialog.alert({ content: "首续期银行账户需保持一致" });
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
                if (process.env.ENV_MODE === "production") {
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
                if (process.env.ENV_MODE === "production") {
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
                if (process.env.ENV_MODE === "production") {
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
                this.$app.goPdfView("https://bnonline.aeonlife.com.cn/bnonlineimg/h5/20200325/tss.pdf");
            },
            goYhtNotice(){

            },
            goYhtClause(){
                this.$app.goPdfView('https://yxfile.aeonlife.com.cn/doc/2019/11/20191120/1/5032/5032_1_1_20191120144938558.pdf');
            },
            goProductRate(){
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200108/1/onlineins/onlineins_1_1_20200108152633452.pdf");
            },
            isAndroid() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isAndroid){
                    this.loadInsureNotice();
                }
            },
            loadInsureNotice(){
                this.$request({
                    url: `/ins/product/getProductFiles/${this.product_id }?showType=1`,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.dataUrl = data;
                        if (this.dataUrl.length===0) {
                            this.isAndroidShow = false
                        } else {
                            this.isAndroidShow = true;
                        }
                    },
                    failFn: (data) => {
                        console.error("error");
                    }
                })
            },
            //Android
            goAndroidNotice(val) {
                // this.$app.goPdfView(val)
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/NoticeAndroidDetail.html?pdf_url=" + val;
            },
            //ocr 识别银行卡判断银行编码
            contrastBank(index) {
                for (let i = 0; i < this.bankData[0].length; i++) {
                    if (this.bankData[0][i].label == index) {
                        this.bankNum = this.bankData[0][i].value;
                    }
                }
                this.bankNumStorage(this.bankNum);
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
            bankNoStorage(val) {
                window.localStorage.setItem("bankAccNumber", val);
                window.localStorage.setItem("checkBankName", this.proper.name);

            },
            bankNameStorage(val) {
                window.localStorage.setItem("bankAccName", val);
            },
            bankNumStorage(val) {
                window.localStorage.setItem("bank_Code", val);
                console.log(val);
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
                            _this.insGiftInsuranceManage = data.insGiftInsuranceManage
                            if (data.insGiftInsuranceManage) {
                                _this.yhtamnt = data.insGiftInsuranceManage.ensureMoney
                                _this.yhtinsuYear = data.insGiftInsuranceManage.ensureDate
                            }
                            _this.involidTime = data.orderPayTimeMsg; //获取提示用户订单支付失效时间的内容
                            let resData = data;

                            // 处理渠道
                            window.localStorage.setItem("cps_secondaryDistributor", resData.insuredInfoList[0].contInfo.secondaryDistributor)
                            window.localStorage.setItem("cps_thirdClassDistributor", resData.insuredInfoList[0].contInfo.thirdClassDistributor)

                            _this.product_id = resData.productId;
                            _this.isAndroid();
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
                            if (_this.curRiskCode === '5032' || _this.curRiskCode === '5315' || _this.curRiskCode === '5316' || _this.curRiskCode == "5325") {
                                _this.information = false
                            }
                            if (_this.agentCode) {
                                _this.$app.wxProductDetail(_this.product_id, 1);
                            } else {
                                _this.$app.wxProductDetail(_this.product_id, 1);
                            }
                            let riskInfoList = resData.insuredInfoList[0].riskInfoList;
                            for (let i = 0; i < riskInfoList.length; i++) {
                                if (riskInfoList[i].riskCode == "5031") {
                                    _this.ifyht = true;
                                }
                            }
                            //判断是否为代理人体外投保，跳转不同路径
                            if (_this.agentCode) {
                                _this.successAdd =
                                    "Successful.html?product_id=" +
                                    _this.product_id +
                                    "&agentCode=" +
                                    _this.agentCode  + "&randomTime=" + _this.randomTime;
                                // _this.successAdd = 'Successful?product_id=' + _this.product_id+ "&agentCode=" + _this.agentCode
                            } else {
                                _this.successAdd =
                                    "Successful.html?product_id=" + _this.product_id + "&randomTime=" + _this.randomTime;
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
                            _this.bankvaluedata = localStorage.getItem("bankAccName");
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
                                _this.bankInfo.bankAccNo = localStorage.getItem("bankAccNumber");
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
                            _this.renewAssureYear = resData.insuredInfoList[0].riskInfoList[0].renewYear;
                            _this.payIntv = resData.insuredInfoList[0].riskInfoList[0].payIntv;
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
                                    item => item.riskCode == "5031"
                                )
                            ) {
                                _this.isSubRiskYiHuiTong = true
                                let renewFlay
                                resData.insuredInfoList[0].riskInfoList.find(
                                    item => {
                                        if(item.riskCode == "5031"){
                                            renewFlay = item.renewFlag
                                            if (renewFlay === "Y") {
                                                _this.renewFlagYiHuiTong = "Y"
                                            }
                                        }
                                    }
                                )
                            }
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
                                if (_this.bankData[0][i].value == _this.bankInfo.bankCode) {
                                    _this.bankLabel = _this.bankData[0][i].label;
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
            getBankConfirm(columnsValue) {
                this.bankvaluedata = columnsValue[0].label;
                this.bankNum = columnsValue[0].value;
                this.bankNameStorage(this.bankvaluedata);
                this.bankNumStorage(this.bankNum);
            },
            bankChooseConfirm() {
                const values = this.$refs.contactsBankData.getColumnValues();
                values.forEach(value => {
                    if (value) {
                        let data = JSON.parse(value.value);
                        this.bankvaluedata = data.bankName || "";
                        this.bankInfo.bankAccNo = data.accNo || "";
                        this.bankNum = data.bankCode || "";
                    }
                });
                this.bankNoStorage(this.bankInfo.bankAccNo);
                this.bankNameStorage(this.bankvaluedata);
                this.bankNumStorage(this.bankNum);
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
            // showmodel(model, modelName, modelIndex) {
            //   this[model] = true;
            //   this.modelName = modelName;
            //   if (modelIndex) {
            //     this.modelIndex = modelIndex;
            //   }
            // },
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
            //数据字段
            getMarriageDataDic(index) {
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
                            const dealData = this.deleteItem(data);
                            this.bankData = [dealData];
                        }
                    },
                    failFn: data => {}
                });
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
                                        window.location.href = "Successful.html?product_id=" + data.wechatPayResultOutDTO.productId + "&agentCode=" + data.wechatPayResultOutDTO.agentCode + "&randomTime=" + _this.randomTime;
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
            // 提交订单
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
                                            data.wechatPayResultOutDTO.agentCode + "&randomTime=" + _this.randomTime;
                                    } else {
                                        window.location.href =
                                            "Successful.html?product_id=" +
                                            data.wechatPayResultOutDTO.productId + "&randomTime=" + _this.randomTime;
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
                                Dialog.alert({ content: data.resultMsg });
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
                                Dialog.alert({ content: data.resultMsg });
                            }
                        });
                    });
                }
            },
            wxCheckPay() {
                //微信支付实时支付或者协议支付认证时走的支付流程
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
                        payType: _this.payType,      //_this.payType
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
                                                        data.wechatPayResultOutDTO.agentCode + "&randomTime=" + _this.randomTime;
                                                } else {
                                                    window.location.href =
                                                        "Successful.html?product_id=" +
                                                        data.wechatPayResultOutDTO.productId + "&randomTime=" + _this.randomTime;
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
                                            Dialog.alert({ content: data.resultMsg });
                                        }
                                    });
                                });
                            },
                            failFn: data => {
                                Dialog.alert({ content: data.resultMsg });
                            }
                        });
                    });
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
                                            Dialog.alert({ content: data.resultMsg });
                                        }
                                    });
                                });
                            },
                            failFn: data => {
                                Dialog.alert({ content: data.resultMsg });
                            }
                        });
                    });
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
                            if (data.wxPayStatus == 1) {
                                Dialog.alert({ content: "此订单已通过微信正在进行支付处理中" });
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
                            if (data.resultCode === "ANTIMONEY_UNUW_ERR") {
                                Dialog.alert({
                                    title: "提示",
                                    content: "根据相关规定，累计保费超20万需上传身份证照片",
                                    confirmText: "去上传",
                                    onConfirm: () => {
                                        location.href = `/product/UploadIDcard.html?orderNo=${
                                            _this.orderNo
                                            }&product_id=${_this.product_id}`;
                                        return false;
                                    }
                                });
                            } else {
                                Dialog.alert({ content: data.resultMsg });
                            }
                        }
                    });
                });
            },
            bankCheckPay() {
                //银行卡实时支付或者协议支付认证前走的支付流程
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
                                        if (data.wxPayStatus == 1) {
                                            Dialog.alert({
                                                content: "此订单已通过微信正在进行支付处理中"
                                            });
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
                                        if (data.resultCode === "ANTIMONEY_UNUW_ERR") {
                                            Dialog.alert({
                                                title: "提示",
                                                content: "根据相关规定，累计保费超20万需上传身份证照片",
                                                confirmText: "去上传",
                                                onConfirm: () => {
                                                    location.href = `/product/UploadIDcard.html?orderNo=${
                                                        _this.orderNo
                                                        }&product_id=${_this.product_id}`;
                                                    return false;
                                                }
                                            });
                                        } else {
                                            Dialog.alert({ content: data.resultMsg });
                                        }
                                    }
                                });
                            });
                        },
                        failFn: data => {
                            Dialog.alert({ content: data.resultMsg });
                        }
                    });
                });
            },
            wx_jsubmit() {
                let _this = this;
                if (_this.agreeConf.checked == false) {
                    Toast.failed("请您先确认您已充分了解本产品");
                    return false;
                }
                window.localStorage.setItem('nameTake', this.proper.name)
                window.location.href = this.$router.siteUrl()
                                        +"/product/OrderPayments.html?product_id="
                                        + this.product_id + '&orderNo=' + this.orderNo + '&agentCode=' + this.agentCode + '&curRiskCode=' + this.curRiskCode;
                // window.location.href = "/product/orderpayments?product_id="+
                // this.product_id + '&orderNo=' + this.orderNo + '&agentCode=' + this.agentCode + '&curRiskCode=' + this.curRiskCode;
            },
            jsubmit() {
                let _this = this;
                if (_this.agreeConf.checked == false) {
                    Toast.failed("请您先确认您已充分了解本产品");
                    return false;
                }
                window.localStorage.setItem('nameTake', this.proper.name)
                window.location.href = this.$router.siteUrl()
                                        +"/product/OrderPayments.html?product_id="
                                        + this.product_id + '&orderNo=' + this.orderNo + '&agentCode=' + this.agentCode + '&curRiskCode=' + this.curRiskCode;
                // window.location.href = "/product/orderpayments?product_id="
                // + this.product_id + '&orderNo=' + this.orderNo + '&agentCode=' + this.agentCode + '&curRiskCode=' + this.curRiskCode;
            },

            checkInput(item, conS) {
                if (item == "" || !item) {
                    Toast.failed(conS);
                    return false;
                } else {
                    return true;
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
    @import "../../assets/app";
    .watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center #fff !important;
        background-size: 100% auto!important;
    }
    .socialSecurity,
    .renew {
        display: flex;
        justify-content: space-between;
        padding-top: 0.4rem;
        padding-bottom: 30px;
        .wxpay5321 li{
            margin: 0 auto;
        }
        ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        li {
            border: 1px solid #b0afaf;
            border-radius: 0.18rem;
            font-size: 0.37333rem;
            text-align: center;
            padding: 0.09333rem 0.53333rem;
            width: 32%;
            height: 1.1rem;
            display: flex;
            justify-content: space-around;

            .bankCardPay {
                padding-left: 0.15rem;
            }
            .bankCardPay1 {
                background: url("../../assets/imgs/modeOfPayment/BankCardPay1.png")
                no-repeat 0 center;
                background-size: 0.46rem;
                width: 0.5rem;
                position: relative;
            }

            .weChatPay1 {
                background: url("../../assets/imgs/modeOfPayment/WeChatPay1.png")
                no-repeat 0 center;
                background-size: 0.5rem;
                width: 0.5rem;
                position: relative;
                left: 2px;
            }

            span {
                font-size: 0.4rem;
                color: #666;
                line-height: 1.1rem;
                white-space: nowrap;
            }
        }
        .wx_active {
            color: #3eb135 !important;
            border: 2px solid #3eb135 !important;

            span {
                color: #3eb135;
            }

            .weChatPay1 {
                background: url("../../assets/imgs/modeOfPayment/WeChatPay2.png")
                no-repeat 0 center;
                background-size: 0.5rem;
            }
        }
        .active {
            color: rgb(215, 0, 15) !important;
            border: 2px solid rgb(215, 0, 15) !important;

            span {
                color: rgb(215, 0, 15);
            }

            .bankCardPay1 {
                background: url("../../assets/imgs/modeOfPayment/BankCardPay2.png")
                no-repeat 0 center;
                background-size: 0.46rem;
            }
        }
    }
    .wx-tip {
        color: #999;
        padding-bottom: px2em(15px);
        font-size: 0.33rem;
        position: relative;
        left: 0.2rem;
        top: 0rem;
        span {
            position: absolute;
            left: -0.25rem;
            top: 0.0246rem;
            font-size: 0.49rem;
        }
    }
    .cash-tips {
        padding: 30px 0;

        .red {
            color: red;
        }
    }
    .socialSecurity {
        border-top: px2em(1px) solid #e2e4ea;
    }
    .big {
        padding-bottom: px2em(150px);
    }

    .box {
        width: 90%;
        margin: 0 auto;
        padding-top: px2em(20px);
    }

    .md-field {
        border-radius: px2em(10px);
        box-shadow: px2em(0px) px2em(3px) px2em(20px) px2em(0px) rgba(30, 0, 2, 0.1);
    }

    .md-captcha .md-icon.icon-font.md {
        display: none !important;
    }
    .giftIns-tip{
        position: absolute;
        width: 52px;
        height: 36px;
        left: 3.85rem;
        top: -0.49rem;
    }
    .box-detail {
        padding: px2em(40px) px2em(20px) px2em(0);
        border-radius: px2em(10px);
        box-shadow: px2em(0px) px2em(3px) px2em(20px) px2em(0px) rgba(30, 0, 2, 0.1);
        margin-bottom: px2em(30px);
        /*background-color: #f52b55;*/
        .box-title {
            position: relative;
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
            border-bottom: px2em(1px) solid #e2e4ea;
        }

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

    .md-input-item-fake,
    .md-input-item-input {
        font-size: 0.37333rem;
        color: #666;
    }

    .parK {
        line-height: 0.7rem;
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
        background-color: #fff;
    }

    .md-example-popup-center {
        padding: 50px;
    }

    .md-example-popup-top {
        width: 100%;
        height: 75px;
        line-height: 75px;
        background: #4a4c5b;
        color: #fff;
    }

    .md-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .md-example-popup-bottom {
        width: 100%;
        padding: 40px 35px;
        line-height: 0.6rem;
        p {
            line-height: 50px;
        }
    }

    .md-example-popup-left,
    .md-example-popup-right {
        height: 100%;
        padding: 0 150px;
        display: flex;
        align-items: center;
    }

    .tips {
        position: relative;
    }

    .iconTip {
        position: absolute;
        top: 60px;
        left: 170px;
    }

    .md-example-child-landscape {
        .md-button {
            margin-bottom: 20px;
            .md-landscape-content {
                padding: 30px;
                font-size: 30px;
                line-height: 1.5;
                color: #666;
                p {
                    margin-bottom: 30px;
                }
            }
        }
    }

    .insureKnow {
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        background: #e8e8e8;
        position: fixed;
        font-size: 0.5rem;
        font-weight: 600;
    }

    .showInsure {
        padding: 100px 30px 30px;
        overflow-x: hidden;
    }

    .bankInsure {
        line-height: 1.5;
    }

    .particular {
        border-bottom: 0.01333rem solid #e2e4ea;
    }
    .myWeight {
        border-bottom: 1px solid #e2e4ea;
    }
    .parT {
        position: fixed;
        top: 0;
        z-index: 1;
        font-size: 24px;
        width: 100%;
        height: 56px;
        color: #fff;
        line-height: 56px;
        text-align: center;
        background: #fc8f22;
    }
</style>

<style lang="scss">
    .wid {
        input {
            padding-right: 60px !important;
        }
    }
    .bankIcon {
        font-size: 0.53rem !important;
        position: absolute;
        top: 0.45rem;
        color: #d7000f;
        right: 0.6rem;
    }
    .myBankcard .md-input-item-input {
        margin-left: -0.73rem !important;
    }
    .parL {
        right: 0.10667rem !important;
    }
</style>
