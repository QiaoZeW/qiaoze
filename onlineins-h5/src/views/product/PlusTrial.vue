<template>
    <div class="section">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="content trial-mod">
            <div :class="setClass">
                <h2 class="touBaoInfo">被保人信息</h2>
                <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
                    <md-field>
                        <div style="position: relative;">
                            <md-field-item
                                name="name"
                                class="trialBorder"
                                title="出生日期"
                                arrow="arrow-right"
                                align="right"
                                :content="datePickerValue"
                                @click.native="datePickerShow"><span v-if="!isBirthdayShow">{{ birthdayVal }}</span>
                            </md-field-item>
                        </div>
                    </md-field>
                    <md-date-picker
                        ref="datePicker"
                        v-model="isDatePickerShow"
                        type="custom"
                        :min-date="minDate"
                        :max-date="maxDate"
                        title="选择出生日期"
                        :text-render="textRender"
                        :custom-types="['yyyy', 'MM','dd']"
                        :default-date="currentDate"
                        @change="onDatePickerChange"
                        @confirm="onDatePickerConfirm"
                    ></md-date-picker>
                </div>
                <div class="sex">
                    <span class="sexChoose">性别</span>
                    <ul>
                        <li data-val="M" :class="{active:(sexSelected === 'M')}"
                            @click="sexHandleChoose($event,'M')">男
                        </li>
                        <li data-val="F" :class="{active:(sexSelected === 'F')}"
                            @click="sexHandleChoose($event,'F')">女
                        </li>
                    </ul>
                </div>

            </div>

            <div :class="setClass2">
                <h2>选择投保方案</h2>
                <div class="details" ref="insuYearMod">
                    <p>保障期限</p>
                    <ul>
                        <li :data-val="item" v-for="(item, key) in insuYear"
                            :class="{ active : (insuYearSelected === key)}"
                            @click="insuYearHandleChoose($event,key)" v-if="item==='106A'">终身
                        </li>
                        <li :data-val="item" @click="insuYearHandleChoose($event,key)"
                            :class="{ active : (insuYearSelected === key)}"
                            v-else>{{ item.indexOf('Y') > -1 ? '' : '至' }}{{ item.replace('A', '岁').replace('Y', '年') }}
                        </li>
                    </ul>
                </div>
                <div class="details" ref="payEndYearMod">
                    <p>缴费年限</p>
                    <ul>
                        <li :data-val="item" v-for="(item, key) in payEndYear"
                            :class="{ active : (payEndYearSelected === key)}"
                            @click="payEndYearHandleChoose($event,key)">{{ item.replace('Y', '年').replace('1000年', '一次交清')
                            }}
                        </li>
                    </ul>
                </div>
                <div class="details amnt-mod">
                    <p>基本保额</p>
                    <ul>
                        <li :data-val="item" v-for="(item,key) in amnt" :class="{active:(amntSelected === key)}"
                            @click="amntHandleChoose($event,key)">{{ item / 10000 }}万
                        </li>
                    </ul>
                </div>
                <div class="details" v-if="getLimit">
                    <p>免赔额</p>
                    <ul>
                        <li :data-val="item" v-for="(item,key) in getLimit" :class="{active:(getLimitSelected === key)}"
                            @click="getLimitHandleChoose($event,key)">{{ item / 10000 }}万
                        </li>
                    </ul>
                </div>
                <div ref="dutyMod"
                     :class="(item.dutyCode==='5031D1'&&item.choFlag!=='M')?'detailP':'detailP hide'"
                     v-for="(item,key) in dutyList" :data-dutycode="item.dutyCode">
                    <p>{{ item.dutyName }}<md-icon name="question" @click.native="showToast(item.dutyCode)" size="lg"></md-icon></p>
                    <ul v-if="item.riskCode === '5313' || !item.premAmnt">
                        <li :data-val="0" :data-dutyCode="item.dutyCode" :data-riskCode="item.riskCode"
                            @click="handleChoose($event,key,0)" class="active">不投保
                        </li>
                        <li :data-key="key" :data-val="0" :data-dutyCode="item.dutyCode"
                            :data-riskCode="item.riskCode"
                            @click="handleChoose($event,key,1)">
                            投保
                        </li>
                    </ul>
                </div>
                <div class="bn-topList" v-if="showYihuitong">
                    <p>是否享有基本医疗保险或公费医疗</p>
                    <ul>
                        <li data-val="Y" :class="{active:(marriage === '2')}"
                            @click="marriageHandleChoose($event,'2')">是
                        </li>
                        <li data-val="N" :class="{active:(marriage === '1')}"
                            @click="marriageHandleChoose($event,'1')">否
                        </li>
                    </ul>
                </div>
                <div class="bn-topList" v-if="showYihuitong">
                    <p>是否连续续保<md-icon name="question" @click.native="showToast('ifrenewFlag')" size="lg"></md-icon></p>
                    <ul>
                        <li
                          data-val="Y"
                          :class="{active:(isMarriage === '2')}"
                          @click="isMarriageHandleChoose($event,'2')"
                        >是</li>
                        <li
                          data-val="N"
                          :class="{active:(isMarriage === '1')}"
                          @click="isMarriageHandleChoose($event,'1')"
                        >否</li>
                    </ul>
                </div>
                <div ref="dutyMod"
                     :class="(item.dutyCode==='5909D1'&&item.choFlag!=='M')?'detailP':'detailP hide'"
                     v-for="(item,key) in dutyList" :data-dutycode="item.dutyCode">
                    <p>{{ item.dutyName }}<md-icon name="question" @click.native="showToast(item.dutyCode)" size="lg"></md-icon></p>
                    <ul v-if="item.riskCode === '5313' || !item.premAmnt">
                        <li :data-val="0" :data-dutyCode="item.dutyCode" :data-riskCode="item.riskCode"
                            @click="handleChoose($event,4,0)" class="active">不投保
                        </li>
                        <li :data-key="key" :data-val="0" :data-dutyCode="item.dutyCode"
                            :data-riskCode="item.riskCode"
                            @click="handleChoose($event,4,1)">
                            投保
                        </li>
                    </ul>
                </div>
                <!--投保人豁免时显示-->
                <div ref="hmMod" class="contentTop hide" style="border-radius: 0;margin-top:0;box-shadow:none;">
                    <div class="proposerDate md-example-child md-example-child-date-picker md-example-child-date-picker-3">
                        <md-field>
                            <div style="position: relative;">
                                <md-field-item
                                    name="name"
                                    title="投保人出生日期"
                                    arrow="arrow-right"
                                    align="right"
                                    :content="appDatePickerValue"
                                    @click.native="appDatePickerShow"><span v-if="!isAppBirthdayShow">{{ appBirthdayVal
                                    }}</span>
                                </md-field-item>
                            </div>
                        </md-field>
                        <md-date-picker
                            ref="appDatePicker"
                            v-model="isAppDatePickerShow"
                            type="custom"
                            :min-date="appMinDate"
                            :max-date="appMaxDate"
                            title="选择出生日期"
                            :text-render="appTextRender"
                            :custom-types="['yyyy', 'MM','dd']"
                            :default-date="appCurrentDate"
                            @change="onAppDatePickerChange"
                            @confirm="onAppDatePickerConfirm"
                        ></md-date-picker>
                    </div>
                    <div class="proposersex">
                        <span class="sexChoose">投保人性别</span>
                        <ul>
                            <li data-val="M" :class="{active:(sexAppSelected === 'M')}"
                                @click="sexAppHandleChoose($event,'M')">男
                            </li>
                            <li data-val="F" :class="{active:(sexAppSelected === 'F')}"
                                @click="sexAppHandleChoose($event,'F')">女
                            </li>
                        </ul>
                    </div>
                </div>
                <!--投保人豁免时显示-->

                <div class="md-example-child md-example-child-action-sheet" style="display: block">
                    <div class="detailB" style="border-top:1px solid #e8e8e8">
                        <p>缴费方式</p>
                        <p class="parT">{{ payIntvName }}</p>
                    </div>
                    <md-action-sheet
                        v-model="value"
                        :title="title"
                        :default-index="0"
                        :cancel-text="cancelText"
                        :options="options"
                        @selected="$_selected"
                        @cancel="$_cancel"
                    ></md-action-sheet>
                </div>
            </div>
        </div>
        <div class="contentBottom">
            <p class="customerModal" v-if="showCustomer" @click="goCustomer"> <img class="customer" src="../../assets/imgs/customer.png" /><span>客服</span></p>
            <p class="bottom1" ref="bottom1">
                <span class="zongHe">￥</span><span class="price">{{ proposalResult
                }}</span><span
                class="year"> /年</span></p>
            <a class="justDown" @click="immediateInsurance"
            >立即投保</a>
        </div>
        <md-dialog
            title='提示'
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns">
            {{ basicDialog.msg }}
        </md-dialog>
    </div>
</template>

<script>
    import { DatePicker, Field, FieldItem, ActionSheet, Button, Dialog, Icon, Toast } from 'mand-mobile'
    import '../../assets/detail.scss'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import '../../assets/js/bridge'
    import Settings from '~/settings.json'
    import addressdata from '@/static/addresstest'
    import { load_shence_zj_buynow, loadShenceData } from '@/utils/shence_trial'
    import { getProdFlag, debounce, throttle } from "@/utils/utils"
    import 'babel-polyfill'
    export default {
        name: 'trial',
        height: 500,
        components: {
            [DatePicker.name]: DatePicker,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [ActionSheet.name]: ActionSheet,
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Icon.name]: Icon,
            Whirl,
            Error
        },
        data() {
            return {
                cpsCode: '',
                ifHasYht:true,
                showYihuitong: false,
                marriage: '2',  //社保
                isMarriage: '2',  //续保
                showBXD: false,
                shence_riskInfo: {},
                showCustomer: false,
                id: 1,
                showError: false,
                showWhirl: false,
                toastInfo: '',
                showInfo: false,
                basicDialog: {
                    open: false,
                    msg: '',
                    btns: [
                        {
                            text: '确认',
                            handler: this.onBasicConfirm,
                        },
                    ],
                },
                minDate: null,
                maxDate: null,
                currentDate: new Date('1990/06/06'),
                appMinDate: null,
                appMaxDate: null,
                appCurrentDate: new Date('1983/02/13'),
                isDatePickerShow: false,
                isAppDatePickerShow: false,
                datePickerValue: '',
                appDatePickerValue: '',
                payIntvName: '年缴',
                payIntvVal: '12',
                birthdayVal: "1990-06-06",
                appBirthdayVal: "1983-02-13",
                isBirthdayShow: false,
                isAppBirthdayShow: false,

                value: false,
                title: '缴费方式',
                options: [
                    {
                        label: '一次交清',
                        value: 0
                    },
                    {
                        label: '年缴',
                        value: 12
                    },
                    {
                        label: '月缴',
                        value: 1
                    },
                    {
                        label: '季缴',
                        value: 3
                    },
                    {
                        label: '半年缴',
                        value: 6
                    }
                ],
                cancelText: '取消',
                defaultIndex: 1,
                product_id: null,
                riskInfo: this.info,
                insuYearAct: false,
                insuYear: null,
                payEndYear: null,
                amnt: null,
                insuYearVal: "",
                insuredYearFlagVal: "A",
                payEndYearVal: "",
                payEndYearFlagVal: "Y",
                amntVal: null,
                insuYearSelected: 0,
                payEndYearSelected: 0,
                amntSelected: 0,
                dutySelected: 0,
                sexSelected: 'M',
                sexAppSelected: 'M',
                dutyList: null,
                getLimit: null,
                getLimitSelected: 0,
                flagNJ: 0,
                proposal: {
                    "appntInfo": {
                        "age": "25",
                        "birthday": "1994-01-01",
                        "ifSmoke": "N",
                        "occupationCode": "3030101",
                        "sex": "M",
                        "socialSecurityFlag": "N"
                    },
                    "cvalidate": "2019-01-20",
                    "insuredInfo": {
                        "age": "",
                        "birthday": "",
                        "ifSmoke": "N",
                        "occupationCode": "3030101",
                        "sex": "M",
                        "socialSecurityFlag": "N"
                    },
                    "insuredRelationToAppnt": "SF", //与投保人关系,不可为空,取值范围:SF:本人;CP:配偶;PR:父母;CH:子女;GP:祖父母;GC:孙子女;EB:哥哥;YB:弟弟;ES:姐姐;YS:妹妹
                    "policyInfoList": [
                        {
                            "amnt": "",
                            "dutyCode": "",
                            "familyType": "",
                            "getRate": "",
                            "getYear": "",
                            "getYearFlag": "",
                            "insuredYear": "",
                            "insuredYearFlag": "",
                            "mult": "",
                            "payEndYear": "",
                            "payEndYearFlag": "",
                            "payIntv": "",
                            "prem": "",
                            "renewalFlag": "NC",
                            "riskCode": "",
                            "getLimit": ""
                        }
                    ],
                    "saleChnl": "O"
                },
                policyInfoList: {
                    "amnt": "",
                    "dutyCode": "",
                    "familyType": "",
                    "getRate": "",
                    "getYear": "",
                    "getYearFlag": "",
                    "insuredYear": "",
                    "insuredYearFlag": "",
                    "mult": "",
                    "payEndYear": "",
                    "payEndYearFlag": "",
                    "payIntv": "",
                    "prem": "",
                    "renewalFlag": "NC",
                    "riskCode": "",
                    "getLimit": ""
                },
                proposalResult: 0,
                tempEndYearEvent: null,
                tempAmntEvent: null,
                insuYearEvent: null,
                riskName: '',
                userToken: '',
                curRiskCode: '',
                isaddressDataShow: false,
                addressData: addressdata,
                addressDataValue: [
                    {
                        "value": "110000",
                        "label": "北京市"
                    },
                    {
                        "value": "110100",
                        "label": "北京市"
                    },
                    {
                        "value": "110105",
                        "label": "朝阳区"
                    }
                ],
                defaultAddressLevel: 1,
                floatClick: false,
                insuSelectVal: null,
                payEndYearSelectVal: null,
                amntSelectVal: null,
                setClass:'contentTop',
                setClass2:'contentMedium',
                appntIsRead: false
            }
        },
        created() {
            this.cpsCode=window.localStorage.getItem("cps_secondaryDistributor")
            this.id = this.$router.query('id')
            this.product_id = this.$router.query("product_id");
            this.$app.wxProductDetail(this.product_id, 1)
            this.showWhirl = true
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            document.title = this.riskName
            //初始化生效时间，默认设置为第二天
            let day3 = new Date()
            day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
            let tomorrow = day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate()
            this.proposal.cvalidate = tomorrow
            this.proposal.policyInfoList[0].cvalidate = tomorrow
            this.proposal.policyInfoList.cvalidate = tomorrow
            this.isBrowser = this.$app.isBrowser()
            //设置不允许分享
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'title': '', //标题
                    'flag_share': 0, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': '', //分享跳转的url
                    'share_title': '', //分享标题
                    'share_text': '', //分享描述
                    'share_imgurl': '' //分享图片地址
                }, function (response) {
                })
            })
            this.loadRiskInfo()
            this.immediateInsurance = debounce(throttle(this.immediateInsurance,3000))//节流防抖防多次跳转到登录
        },
        mounted(){
             if (process.env.NODE_ENV !== 'production'){
                this.setClass='contentTop watermark';
                this.setClass2='contentMedium watermark';
            }
            this.$app.showCustomerIntelligence((data) => {
                getProdFlag (this.product_id, (flagData) => {
                    this.showBXD = data.showBXD
                    // 体内显示或者 体外 客服入口判断显示
                    if (flagData.serviceFlag) {
                        if(this.isBrowser || this.showBXD){
                            this.showCustomer = true
                            this.$refs.bottom1.style.flex = '.7'
                        }else{
                            this.showCustomer = false
                            this.$refs.bottom1.style.flex = '1'
                        }
                    }

                })
            })
        },
        computed: {
            proposerAddressStr() {
                return this.addressDataValue.map(item => item.label).join('-')
            }
        },
        methods: {
            // 社保选择
            marriageHandleChoose(e, index) {
                this.proposal.insuredInfo.socialSecurityFlag = e.target.dataset.val;
                if(this.proposal.insuredInfo.socialSecurityFlag == "Y"){
                    this.socialSecurity = "是"
                    this.socialSecurityFlag = '0'
                }else{
                    this.socialSecurity = "否"
                    this.socialSecurityFlag = '1'
                }
                window.localStorage.setItem("SOCIAL_SECURITY", this.socialSecurity);
                window.localStorage.setItem("SOCIAL_SECURITY_VAL", this.socialSecurityFlag);
                console.log("def",window.localStorage.getItem("SOCIAL_SECURITY_VAL"))
                this.marriage = index;
                this.calPAWithRule();
            },
            //续保
            isMarriageHandleChoose(e, index) {
              this.isMarriage = index;
              this.renewFlag = e.target.dataset.val;
              this.renewFlag == "Y" ? (this.renew = "是") : (this.renew = "否");
              window.localStorage.setItem("renew",this.renew);
              window.localStorage.setItem("renewFlag",this.renewFlag);
            },
            goCustomer() {
                if(this.isBrowser){
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('goCustomer'
                            , {'id': 2}, function (responseData) {
                            }
                        );
                    })
                }else{
                    this.$app.getBxdServiceUrl();
                }
            },
            loginSuccess(userCode){
                var _this = this;
                let storage_userCode = window.localStorage.getItem("USERCODE");
                if (storage_userCode == null || storage_userCode != userCode) {
                    window.localStorage.setItem("USERCODE", userCode);
                }

                load_shence_zj_buynow(_this.shence_riskInfo, {
                    riskName: _this.riskName,
                    payIntvName: _this.payIntvName,
                    proposalResult: _this.proposalResult,
                    addressDataValue: _this.addressDataValue
                },()=>{
                    let goHref = '';
                    if(_this.proposal.policyInfoList.find((item) => (item.dutyCode == '5909D1'))){
                        goHref = _this.$router.siteUrl() +'/product/HealthTwice.html?product_id=' + _this.product_id
                    }else{
                        goHref = _this.$router.siteUrl() +'/product/Health.html?product_id=' + _this.product_id
                    }
                    _this.$app.goHrefFilter(goHref);
                })
            },

            //获取APP的token
            immediateInsurance() {
                if (!this.floatClick) {
                    return false;
                }
                //缓存投保城市
                window.localStorage.setItem("TRIAL_ADDRESS", JSON.stringify(this.addressDataValue));
                let _this = this
                this.$app.getUserCode(function (userCode) {
                    _this.loginSuccess(userCode);
                })
            },
            calPAWithRule() {
                for(let i=0;i<this.proposal.policyInfoList.length;i++){                  //---附加险修改位置---//
                    if(this.proposal.policyInfoList[i].dutyCode == "5031D1"){
                       this.proposal.policyInfoList[i].amnt = 2000000;
                       this.proposal.policyInfoList[i].payEndYear = 1;
                       this.proposal.policyInfoList[i].insuredYear = 1;
                       this.proposal.policyInfoList[i].insuredYearFlag = "Y";
                    }
                }
                this._resetPayIntvVal(this.payIntvVal)
                this.showWhirl = true
                this.floatClick = false
                console.log(this.proposal)
                this.$request({
                    url: `/ins/product/productplatform/duty/calPAWithRule`,
                    method: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: this.proposal,
                    successFn: (data) => {
                        console.log(data)
                        let res = data.paCalResultList;
                        let resultVal = 0;
                        let d6_amnt = 0;
                        for (let j = 0; j < res.length; j++) {
                            let index = this._isCreateDuty(res[j].dutyCode)
                            if (res[j].dutyCode === "5313D1") {
                                d6_amnt += parseInt(res[j].prem);
                            }
                            this.proposal.policyInfoList[index].amnt = res[j].amnt == 0 ? '' : res[j].amnt
                            this.proposal.policyInfoList[index].prem = res[j].prem == 0 ? '' : res[j].prem
                            resultVal += parseInt(res[j].prem)
                        }
                        this.proposalResult = resultVal
                        this.showWhirl = false
                        //保存缓存
                        window.localStorage.setItem("PAWithRule", JSON.stringify(this.proposal));
                        this.floatClick = true
                    },
                    failFn: (data) => {
                        this.showWhirl = false
                        this.basicDialog.open = true
                        this.basicDialog.msg = data.resultMsg
                    }
                })
            },
            _resetInsuYear(val, flag) {
                for (let index in this.proposal.policyInfoList) {
                    if (this.proposal.policyInfoList[index].insuredYear) {
                        this.proposal.policyInfoList[index].insuredYear = val
                        this.proposal.policyInfoList[index].insuredYearFlag = flag
                    }
                }
            },
            _defaultInsuYear(){
                if(!this.insuYear.includes(this.insuSelectVal) || this.insuYearSelected > this.insuYear.length - 1){
                    //保障年限重置到最大选择项
                    let maxLength = this.insuYear.length - 1
                    this.insuYearVal = parseInt(this.insuYear[maxLength])
                    this.insuSelectVal = this.insuYear[maxLength]
                    this._resetInsuYear(parseInt(this.insuYear[maxLength]), this.insuYear[maxLength].substr(this.insuYear[maxLength].length - 1, 1))
                    this.insuYearSelected = maxLength;
                }else{
                    //当前选中坐标的值 不等于 实际选中的值时，重置选中的值
                    if(this.insuYear[this.payEndYearSelected]!== this.insuYearSelected){
                        let curLength = this.insuYearSelected;
                        this.insuYearVal = parseInt(this.insuYear[curLength])
                        this.insuSelectVal = this.insuYear[curLength]
                        this._resetInsuYear(parseInt(this.insuYear[curLength]), this.insuYear[curLength].substr(this.insuYear[curLength].length - 1, 1))
                        this.insuYearSelected = curLength;
                    }
                }
            },
            insuYearHandleChoose(e, index) {
                if (this.insuYearSelected === index) {
                    return false;
                }
                this.insuYearEvent = e;
                this.insuSelectVal = e.target.dataset.val;

                //需要更新policyInfoList下所有的insuYearVal、insuredYearFlag，包括主责任和附加责任
                this._resetInsuYear(parseInt(e.target.dataset.val), e.target.dataset.val.substr(e.target.dataset.val.length - 1, 1))
                this.insuYearVal = parseInt(e.target.dataset.val)
                this.insuredYearFlag = e.target.dataset.val.substr(e.target.dataset.val.length - 1, 1)

                this.insuYearSelected = index;

                if (this.curRiskCode === '5313') {
                    //加惠保
                    if (this.insuYearVal === 70) {
                        if (this.proposal.insuredInfo.age >= 0 && this.proposal.insuredInfo.age <= 35) {
                            this.payEndYear = ["10Y", "15Y", "20Y", "30Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (this.proposal.insuredInfo.age >= 36 && this.proposal.insuredInfo.age <= 45) {
                            this.payEndYear = ["10Y", "15Y", "20Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (this.proposal.insuredInfo.age >= 46 && this.proposal.insuredInfo.age <= 50) {
                            this.payEndYear = ["10Y", "15Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (this.proposal.insuredInfo.age >= 51 && this.proposal.insuredInfo.age <= 55) {
                            this.payEndYear = ["10Y"];
                            this.amnt = ["100000"];
                        }
                    } else {
                        if (this.proposal.insuredInfo.age >= 0 && this.proposal.insuredInfo.age <= 40) {
                            this.payEndYear = ["10Y", "15Y", "20Y", "30Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (this.proposal.insuredInfo.age >= 41 && this.proposal.insuredInfo.age <= 45) {
                            this.payEndYear = ["10Y", "15Y", "20Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (this.proposal.insuredInfo.age >= 46 && this.proposal.insuredInfo.age <= 50) {
                            this.payEndYear = ["10Y", "15Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (this.proposal.insuredInfo.age >= 51 && this.proposal.insuredInfo.age <= 55) {
                            this.payEndYear = ["10Y"];
                            this.amnt = ["100000"];
                        }
                    }
                    //缴费年限重置到第一个选择项
                    this._defaultPayEndYear()
                    //基本保额重置到第一个选择项
                    if (this.tempAmntEvent) {
                        this._defaultAmnt()
                    }
                }
                this.calPAWithRule();
            },
            _resetPayEndYear(val, flag) {
                for (let index in this.proposal.policyInfoList) {
                    if (this.proposal.policyInfoList[index].payEndYear) {
                        this.proposal.policyInfoList[index].payEndYear = val
                        this.proposal.policyInfoList[index].payEndYearFlag = flag
                    }
                }
                //投保人豁免特殊处理
                let _index = this._isCreateDuty("5909D1");
                if (_index >= 0) {
                    val == 1000 ? val : (val = val - 1)
                    this.proposal.policyInfoList[_index].payEndYear = val;
                    this.proposal.policyInfoList[_index].payEndYearFlag = flag
                }
            },
            _defaultPayEndYear() {
                if(!this.payEndYear.includes(this.payEndYearSelectVal) || this.payEndYearSelected > this.payEndYear.length - 1){
                    //缴费年限重置到最大选择项
                    let maxLength = this.payEndYear.length - 1
                    this.payEndYearVal = parseInt(this.payEndYear[maxLength])
                    this.payEndYearSelectVal = this.payEndYear[maxLength]
                    this._resetPayEndYear(parseInt(this.payEndYear[maxLength]), this.payEndYear[maxLength].substr(this.payEndYear[maxLength].length - 1, 1))
                    this.payEndYearSelected = maxLength
                }else{
                    //当前选中坐标的值 不等于 实际选中的值时，重置选中的值
                    if(this.payEndYear[this.payEndYearSelected]!== this.payEndYearSelectVal){
                        let curLength = this.payEndYearSelected;
                        this.payEndYearVal = parseInt(this.payEndYear[curLength])
                        this.payEndYearSelectVal = this.payEndYear[curLength]
                        this._resetPayEndYear(parseInt(this.payEndYear[curLength]), this.payEndYear[curLength].substr(this.payEndYear[curLength].length - 1, 1))
                        this.payEndYearSelected = curLength
                    }
                }
            },
            payEndYearHandleChoose(e, index) {
                if (this.payEndYearSelected === index) {
                    return false;
                }
                
                let dutys = this.$refs.dutyMod
                /** ------如果年龄小于18周岁，豁免投保人年龄必须大于被保人18周岁----- **/
                if (this.proposal.insuredInfo.age < 18) {
                    let appntInfo_age = parseInt(this.proposal.insuredInfo.age) + 18;
                    this.proposal.appntInfo.age = appntInfo_age;
                    this.proposal.appntInfo.birthday = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                    this.appBirthdayVal = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                    this.appDatePickerValue = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                    //豁免投保人
                    this.appMaxDate = new Date(this.minOrMaxBirthday(appntInfo_age, 2));//最小年龄
                    this.proposal.insuredRelationToAppnt = 'CH';
                } else {
                    //豁免投保人
                    this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                    this.proposal.insuredRelationToAppnt = 'SF' //本人
                }
                this._delCaleDuty('5909D1')
                this.$refs.hmMod.className = 'contentTop hide'
                //附加投保人豁免隐藏控制
                for (let ii = 0; ii < dutys.length; ii++) {
                    if (dutys[ii].getAttribute('data-dutycode') === "5909D1" || dutys[ii].getAttribute('data-dutycode') === "5305D7") {
                        dutys[ii].getElementsByTagName('li')[0].className = 'active'
                        dutys[ii].getElementsByTagName('li')[1].className = ''
                    }
                }
                
                this.tempEndYearEvent = e;
                this.payEndYearSelectVal = e.target.dataset.val;
                //需要更新policyInfoList下所有的payEndYear、payEndYearFlag，包括主责任和附加责任
                this._resetPayEndYear(parseInt(e.target.dataset.val), e.target.dataset.val.substr(e.target.dataset.val.length - 1, 1));
                this.payEndYearVal = parseInt(e.target.dataset.val)
                this.payEndYearFlagVal = e.target.dataset.val.substr(e.target.dataset.val.length - 1, 1)
                this.payEndYearSelected = index;
                if (this.curRiskCode === '5313') {
                    //根据缴费年限，控制豁免投保人可选择的最大最小年龄
                    let _val = parseInt(e.target.dataset.val);
                    if (_val === 30 || _val === 20) {
                        this.appMinDate = new Date(this.minOrMaxBirthday(50));//最大年龄
                        this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                        //重置投保人出生日期
                        this.proposal.appntInfo.age = this._jsGetAge(this.appBirthdayVal);
                        this.proposal.appntInfo.birthday = this.appBirthdayVal;
                    } else if (_val === 15) {
                        this.appMinDate = new Date(this.minOrMaxBirthday(55));//最大年龄
                        this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                        //重置投保人出生日期
                        this.proposal.appntInfo.age = this._jsGetAge(this.appBirthdayVal);
                        this.proposal.appntInfo.birthday = this.appBirthdayVal;
                    } else {
                        this.appMinDate = new Date(this.minOrMaxBirthday(60));//最大年龄
                        this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                    }

                }
                this.calPAWithRule();
            },
            _resetPayIntvVal(val) {
                //为趸交时，重置payIntv为0
                for (let index in this.proposal.policyInfoList) {
                    if (this.proposal.policyInfoList[index].payIntv) {
                        this.proposal.policyInfoList[index].payIntv = val
                    }
                }
            },
            _defaultAmnt(){
                if(!this.amnt.includes(this.amntSelectVal)  || this.amntSelected > this.amnt.length - 1){
                    //保额重置到最大选择项
                    let maxLength = this.amnt.length - 1
                    this.proposal.policyInfoList[0].amnt = this.amnt[maxLength];
                    this.amntSelectVal = this.amnt[maxLength]
                    this.amntSelected = maxLength;
                }else{
                    //当前选中坐标的值 不等于 实际选中的值时，重置选中的值
                    if(this.amnt[this.amntSelectVal]!== this.amntSelectVal){
                        let curLength = this.amntSelected;
                        this.proposal.policyInfoList[0].amnt = this.amnt[curLength];
                        this.amntSelectVal = this.amnt[curLength]
                        this.amntSelected = curLength;
                    }
                }
            },
            amntHandleChoose(e, index) {
                if (this.amntSelected === index) {
                    return false;
                }
                this.tempAmntEvent = e;
                this.amntSelectVal = e.target.dataset.val;
                this.proposal.policyInfoList[0].amnt = e.target.dataset.val;
                this.amntSelected = index;
                this.calPAWithRule();
            },
            getLimitHandleChoose(e, index) {
                if (this.getLimitSelected === index) {
                    return false;
                }
                this.tempAmntEvent = e;
                this.proposal.policyInfoList[0].getLimit = e.target.dataset.val;
                this.getLimitSelected = index;
                this.calPAWithRule();
            },
            sexHandleChoose(e, index) {
                this.proposal.insuredInfo.sex = e.target.dataset.val;
                this.sexSelected = index;
                this.calPAWithRule();
            },
            sexAppHandleChoose(e, index) {
                this.proposal.appntInfo.sex = e.target.dataset.val;
                this.sexAppSelected = index;
                this.calPAWithRule();
            },
            handleChoose(e, key, amntKey) {
                if (this.$refs.dutyMod[key].getElementsByTagName('li')[amntKey].className === "active") {
                    return false;
                }
                if(e.target.dataset.dutycode == "5031D1" && amntKey == 1){
                    this.showYihuitong = true;
                    this.socialSecurity = "是";
                    this.socialSecurityFlag = "0";
                    this.proposal.insuredInfo.socialSecurityFlag = "Y";
                    this.marriage = "2";
                    window.localStorage.setItem("SOCIAL_SECURITY", this.socialSecurity);
                    window.localStorage.setItem("SOCIAL_SECURITY_VAL", this.socialSecurityFlag);
                    console.log("是",window.localStorage.getItem("SOCIAL_SECURITY_VAL"))
                    //自动续保
                    this.isMarriage = "2";
                    this.renewFlag = "Y";
                    this.renew = "是";
                    window.localStorage.setItem("renew",this.renew);
                    window.localStorage.setItem("renewFlag",this.renewFlag);
                }else if(e.target.dataset.dutycode == "5031D1" && amntKey == 0){
                    this.showYihuitong = false;
                    this.proposal.insuredInfo.socialSecurityFlag = "N";
                    window.localStorage.removeItem("SOCIAL_SECURITY");
                    window.localStorage.removeItem("SOCIAL_SECURITY_VAL");
                    console.log("否",window.localStorage.getItem("SOCIAL_SECURITY_VAL"))
                    //自动续保
                    window.localStorage.removeItem("renew");
                    window.localStorage.removeItem("renewFlag");
                }
                let lis = this.$refs.dutyMod[key].getElementsByTagName('li')
                for (let i = 0; i < lis.length; i++) {
                    lis[i].className = ''
                }
                this.$refs.dutyMod[key].getElementsByTagName('li')[amntKey].className = 'active'
                let val = e.target.dataset.val;
                let dutyCode = e.target.dataset.dutycode;
                let riskCode = e.target.dataset.riskcode;
                if (dutyCode === '5909D1') {
                    //豁免处理
                    if (amntKey == 1) {
                        /** ------如果年龄小于18周岁，豁免投保人年龄必须大于被保人18周岁----- **/
                        let appntInfo_age = parseInt(this.proposal.insuredInfo.age) + 18;
                        if (this.proposal.insuredInfo.age < 18) {
                            this.proposal.appntInfo.age = appntInfo_age;
                            this.proposal.appntInfo.birthday = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                            this.appMaxDate = new Date(this.minOrMaxBirthday(appntInfo_age, 2));//最小年龄
                        } else {
                            appntInfo_age = this._jsGetAge(this.appBirthdayVal);
                            this.proposal.appntInfo.age = appntInfo_age;
                            this.proposal.appntInfo.birthday = this.appBirthdayVal;
                            this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                        }
                        this.appBirthdayVal = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                        this.appDatePickerValue = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                        //判断是否生日单
                        this._appBirthdayOrder(this.appBirthdayVal)
                        /** ------如果年龄小于18周岁，豁免投保人年龄必须大于被保人18周岁----- **/
                        this.$refs.hmMod.className = 'contentTop'
                        this._addHmCaleDuty('5909D1')
                    } else {
                        this.$refs.hmMod.className = 'contentTop hide'
                        this._delCaleDuty('5909D1')
                    }
                    this.calPAWithRule()
                    return false
                }
                if(dutyCode === '5031D1'){                        //---附加险修改位置---//
                   if (amntKey == 1) {
                       this._addHmCaleDuty('5031D1')
                   } else {
                       this._delCaleDuty('5031D1')
                   }
                   this.calPAWithRule()
                   return false
                }
                //判断报文是否有该责任，如果存在返回数组坐标
                let flagCreate = this._isCreateDuty(dutyCode)
                if (flagCreate >= 0) {
                    if (val == 0) {
                        //删除
                        this.proposal.policyInfoList.splice(flagCreate, 1);
                    } else {
                        let item = this.proposal.policyInfoList[flagCreate];
                        item.dutyCode = dutyCode;
                        item.riskCode = riskCode;
                        item.insuredYear = this.insuYearVal;
                        item.insuredYearFlag = this.insuredYearFlag;
                        item.payEndYear = this.payEndYearVal;
                        item.payEndYearFlag = this.payEndYearFlagVal;
                        item.payIntv = this.payIntvVal;
                        item.amnt = val == 0 ? '' : val;
                        item.mult = 1;
                    }
                } else {
                    let temp = Object.assign({}, this.policyInfoList, temp);
                    temp.dutyCode = dutyCode;
                    temp.riskCode = riskCode;
                    temp.insuredYear = this.insuYearVal;
                    temp.insuredYearFlag = this.insuredYearFlag;
                    temp.payEndYear = this.payEndYearVal;
                    temp.payEndYearFlag = this.payEndYearFlagVal;
                    temp.payIntv = this.payIntvVal;
                    temp.amnt = val == 0 ? '' : val;
                    temp.mult = 1;
                    this.proposal.policyInfoList.push(temp);
                }
                this.calPAWithRule();
            },
            _addCaleDuty(dutyCode) {
                //存在
                if (this._isCreateDuty(dutyCode) >= 0) {
                    return false;
                }
                let temp = Object.assign({}, this.policyInfoList, temp);
                temp.dutyCode = dutyCode;
                temp.riskCode = "5313";
                temp.insuredYear = this.insuYearVal
                temp.insuredYearFlag = this.insuredYearFlag
                temp.payEndYear = this.payEndYearVal
                temp.payEndYearFlag = this.payEndYearFlagVal
                temp.payIntv = this.payIntvVal
                temp.mult = 1
                this.proposal.policyInfoList.push(temp)
                console.log('policyInfoList', this.proposal.policyInfoList)
            },
            _addHmCaleDuty(dutyCode) {
                if (this._isCreateDuty(dutyCode) >= 0) {
                    return false;
                }
                let temp = Object.assign({}, this.policyInfoList, temp);
                temp.dutyCode = dutyCode;
                temp.riskCode = "5909";

                temp.insuredYear = this.insuYearVal
                temp.insuredYearFlag = this.insuredYearFlag
                temp.payEndYear = this.payEndYearVal - 1
                temp.payEndYearFlag = this.payEndYearFlagVal
                temp.payIntv = this.payIntvVal
                temp.amnt = ""
                temp.mult = 1
                if(dutyCode == "5031D1"){
                   temp.riskCode = "5031";
                   temp.amnt = "2000000"
                   temp.payEndYear = 1
                   temp.insuredYear = 1
                   temp.insuredYearFlag = "Y"
                }
                this.proposal.policyInfoList.push(temp)
            },
            //删除责任
            _delCaleDuty(dutyCode) {
                let flagCreate = this._isCreateDuty(dutyCode)
                if (flagCreate >= 0) {
                    //删除
                    this.proposal.policyInfoList.splice(flagCreate, 1);
                }
            },
            //重置必须责任的试算条件
            _resetCaleDuty(dutyCode) {
                let flagCreate = this._isCreateDuty(dutyCode)
                if (flagCreate >= 0) {
                    let item = this.proposal.policyInfoList[flagCreate];
                    item.insuredYear = this.insuYearVal;
                    item.insuredYearFlag = this.insuredYearFlag;
                    item.payEndYear = this.payEndYearVal;
                    item.payEndYearFlag = this.payEndYearFlagVal;
                    item.payIntv = this.payIntvVal;
                    //主要责任的试算额度,默认试算报文数组第一个是主要责任
                }
            },
            datePickerShow() {
                this.isDatePickerShow = true;
            },
            appDatePickerShow() {
                this.isAppDatePickerShow = true;
            },
            //判断报文是否有该责任
            _isCreateDuty(dutyCode) {
                for (let index in this.proposal.policyInfoList) {
                    if (this.proposal.policyInfoList[index].dutyCode === dutyCode) {
                        return index;
                    }
                }
                return -1;
            },
            minOrMaxBirthday(age, flagDay = 0) {
                //精确到天
                if (flagDay === 1) {
                    let date = new Date;
                    date.setDate(date.getDate() - 28);
                    //当前日期的毫秒数 + 天数 * 一天的毫秒数
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let year = date.getFullYear();
                    if(year%4==0&&year%100!=0||year%400==0){ // 润年
                    } else { // 非润年
                        if (month == "02") {
                            if (day == 29) {
                                day = 1;
                                month = "03";
                            }
                        }
                    }
                    return (date.getFullYear().toString() + "-" + (month < 10 ? "0" + month : month).toString() + "-" + (day<10?"0"+day:day));
                } else if (flagDay === 2) {
                    //多少周岁以上
                    let date = new Date;
                    let year = date.getFullYear() - (age);
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    month = (month < 10 ? "0" + month : month);
                    if(year%4==0&&year%100!=0||year%400==0){ // 润年
                    } else { // 非润年
                        if (month == "02") {
                            if (day == 29) {
                                day = 1;
                                month = "03";
                            }
                        }
                    }
                    return (year.toString() + "-" + month.toString() + "-" + (day<10?"0"+day:day));
                } else {
                    //多少周岁以下
                    let date = new Date;
                    date.setDate(date.getDate() + 1);

                    let year = date.getFullYear() - (age + 1);
                    let month = date.getMonth() + 1;
                    month = (month < 10 ? "0" + month : month);
                    let day = date.getDate();
                    if(year%4==0&&year%100!=0||year%400==0){ // 润年
                    } else { // 非润年
                        if (month == "02") {
                            if (day == 29) {
                                day = 1;
                                month = "03";
                            }
                        }
                    }
                    return (year.toString() + "-" + month.toString() + "-" + (day<10?"0"+day:day));
                }
            },
            loadRiskInfo() {
                this.$request({
                    url: `/ins/product/product/risk/${this.product_id}`,
                    params: {
                        cpsCode:this.cpsCode
                    },
                    successFn: (data) => {
                        console.log(data)
                        this.curRiskCode = data.riskInfo.riskCode;
                        this.shence_riskInfo = data.riskInfo
                        this.insuYearVal = parseInt(data.riskInfo.insuYear.split('|')[0]);
                        this.insuSelectVal = data.riskInfo.insuYear.split('|')[0]; //当前默认选择第一项
                        this.insuredYearFlag = data.riskInfo.insuYear.split('|')[0].substr(data.riskInfo.insuYear.split('|')[0].length - 1, 1);

                        this.payEndYearVal = parseInt(data.riskInfo.payEndYear.split('|')[0]);
                        this.payEndYearSelectVal = data.riskInfo.payEndYear.split('|')[0]; //当前默认选择第一项
                        this.payEndYearFlagVal = data.riskInfo.payEndYear.split('|')[0].substr(data.riskInfo.payEndYear.split('|')[0].length - 1, 1);

                        this.insuYear = data.riskInfo.insuYear.split('|');
                        this.payEndYear = data.riskInfo.payEndYear.split('|');
                        this.amnt = data.dutyList[0].premAmnt.split('|');
                        this.amntSelectVal = data.dutyList[0].premAmnt.split('|')[0]; //当前默认选择第一项

                        if (data.dutyList[0].getLimit) {
                            this.getLimit = data.dutyList[0].getLimit.split('|');
                        }
                        this.dutyList = data.dutyList;
                        data.dutyList.forEach((item, index) => {
                            if (item.choFlag === 'M') {//必须责任

                                this.proposal.policyInfoList[0].insuredYear = parseInt(data.riskInfo.insuYear.split('|')[0]);
                                this.insuYearVal = parseInt(data.riskInfo.insuYear.split('|')[0]);
                                this.proposal.policyInfoList[0].insuredYearFlag = data.riskInfo.insuYear.split('|')[0].substr(data.riskInfo.insuYear.split('|')[0].length - 1, 1);
                                this.insuredYearFlagVal = data.riskInfo.insuYear.split('|')[0].substr(data.riskInfo.insuYear.split('|')[0].length - 1, 1);

                                this.proposal.policyInfoList[0].payEndYear = parseInt(data.riskInfo.payEndYear.split('|')[0]);
                                this.payEndYearVal = parseInt(data.riskInfo.payEndYear.split('|')[0]);
                                this.proposal.policyInfoList[0].payEndYearFlag = data.riskInfo.payEndYear.split('|')[0].substr(data.riskInfo.payEndYear.split('|')[0].length - 1, 1);
                                this.payEndYearFlagVal = data.riskInfo.payEndYear.split('|')[0].substr(data.riskInfo.payEndYear.split('|')[0].length - 1, 1);
                                this.proposal.policyInfoList[0].payIntv = this.payIntvVal;
//                                this.proposal.policyInfoList[0].amnt = data.riskInfo.amnt.split('|')[0];
                                this.proposal.policyInfoList[0].amnt = item.premAmnt.split('|')[0];
                                this.proposal.policyInfoList[0].dutyCode = item.dutyCode;
                                this.proposal.policyInfoList[0].mult = 1;
                                this.proposal.policyInfoList[0].riskCode = item.riskCode;
                            }
                        })
                        //重置被投保试算年龄
                        if (this.curRiskCode === '5313') {
                            //加惠保
                            this.minDate = new Date(this.minOrMaxBirthday(55));//最大年龄
                            this.maxDate = new Date(this.minOrMaxBirthday(28, 1));//最小年龄
                            this.currentDate = new Date(this.minOrMaxBirthday(28, 1));//日期默认年龄
                            this.birthdayVal = this.minOrMaxBirthday(28, 1).replace('/', '-').replace('/', '-');
                            //豁免投保人
                            this.appMinDate = new Date(this.minOrMaxBirthday(60));//最大年龄
                            this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                            this.proposal.appntInfo.age = 25;
                            this.proposal.appntInfo.birthday = this.minOrMaxBirthday(25).replace('/', '-').replace('/', '-');
                            this.proposal.insuredRelationToAppnt = 'CH' //默认关系父母
                        }
                        for(let i=0;i<data.dutyList.length;i++){
                            if(data.dutyList[i].dutyCode == "5031D1"){
                                this.ifHasYht = false;
                            }
                        }
                        console.log(this.ifHasYht,"yee")
                        if(this.ifHasYht){
                           let tempData="tempData"
                           data.dutyList.push(tempData)
                        }
                        this.$nextTick(function(){
                            this.$refs.dutyMod[2].className = "detailP delborder"
                            if(this.ifHasYht){
                               this.$refs.dutyMod[2].className = "hide"
                            }
                            this.$refs.dutyMod[4].className = "detailP addborder"

                        })
                        //判断是否生日单，初始化生效时间，设置为当天
                        this._birthdayOrder(this.birthdayVal)
                        //初始化默认值
                        let defaultAge = this._jsGetAge(this.birthdayVal);
                        this.proposal.insuredInfo.birthday = this.birthdayVal;
                        this.proposal.insuredInfo.age = defaultAge;
                        this.calPAWithRule();
                        this.showWhirl = false
                        // 神策数据埋点
                        loadShenceData(data.riskInfo)
                    },
                    failFn: () => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            textRender() {
                const args = Array.prototype.slice.call(arguments)
                const typeFormat = args[0] // 类型
                const column2Value = args[3] // 第3列选中值
                if (typeFormat === 'dd') {
                    return `${column2Value}日`
                }
            },
            appTextRender() {
                const args = Array.prototype.slice.call(arguments)
                const typeFormat = args[0] // 类型
                const column2Value = args[3] // 第3列选中值
                if (typeFormat === 'dd') {
                    return `${column2Value}日`
                }
            },
            onDatePickerChange(columnIndex, itemIndex, value) {
            },
            onAppDatePickerChange(columnIndex, itemIndex, value) {
            },
            _birthdayOrder (value){
                //判断是否生日单，初始化生效时间，设置为当天
                let insuredBirth=this.datePickerValue || this.birthdayVal
                let appBirthday=undefined;
                if(this.proposal.policyInfoList.find((item) => (item.dutyCode == '5909D1'))){
                    appBirthday=this.appDatePickerValue
                }
                this.proposal.cvalidate = this.$app.getCvalidateByBirthday (value,appBirthday)
            },
            _appBirthdayOrder (value){
                //判断是否生日单，初始化生效时间，设置为当天
                let insuredBirth=this.datePickerValue || this.birthdayVal
                let appBirthday=undefined;
                if(this.proposal.policyInfoList.find((item) => (item.dutyCode == '5909D1'))){
                    appBirthday=value
                }
                this.proposal.cvalidate = this.$app.getCvalidateByBirthday (insuredBirth,value)
            },
            onDatePickerConfirm(columnsValue) {
                this.isBirthdayShow = true;
                this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
                this.proposal.insuredInfo.birthday = this.datePickerValue
                let _age = this._jsGetAge(this.datePickerValue)
                this.proposal.insuredInfo.age = _age
                let dutys = this.$refs.dutyMod
                //判断是否生日单，初始化生效时间，设置为当天
                this._birthdayOrder(this.datePickerValue)
                //加惠保规则校验
                    /** ------如果年龄小于18周岁，豁免投保人年龄必须大于被保人18周岁----- **/
                    if (_age < 18) {
                        let appntInfo_age = parseInt(this.proposal.insuredInfo.age) + 18;
                        this.proposal.appntInfo.age = appntInfo_age;
                        this.proposal.appntInfo.birthday = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                        this.appBirthdayVal = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                        this.appDatePickerValue = this.minOrMaxBirthday(appntInfo_age, 2).replace('/', '-').replace('/', '-');
                        //豁免投保人
                        this.appMaxDate = new Date(this.minOrMaxBirthday(appntInfo_age, 2));//最小年龄
                        this.proposal.insuredRelationToAppnt = 'CH';
                        for (let ii = 0; ii < dutys.length; ii++) {
                            if (dutys[ii].getAttribute('data-dutycode') === "5909D1" ) {
                                dutys[ii].getElementsByTagName('li')[0].className = 'active'
                                dutys[ii].getElementsByTagName('li')[1].className = ''
                            }
                        }
                    } else {
                        //豁免投保人,附加投保人豁免隐藏控制
                        for (let ii = 0; ii < dutys.length; ii++) {
                            if (dutys[ii].getAttribute('data-dutycode') === "5909D1" ) {
                                dutys[ii].getElementsByTagName('li')[0].className = 'active'
                                dutys[ii].getElementsByTagName('li')[1].className = 'hide'
                            }
                        }
                        this.appMaxDate = new Date(this.minOrMaxBirthday(18, 2));//最小年龄
                        this.proposal.insuredRelationToAppnt = 'SF' //本人
                    }
                    /** ------如果年龄小于18周岁，豁免投保人年龄必须大于被保人18周岁----- **/

                    /** ------重新选择日期后，重置身故豁免和投保豁免----- **/
                    this._delCaleDuty('5909D1')
                    this.$refs.hmMod.className = 'contentTop hide'
                    /** ------重新选择日期后，重置身故豁免和投保豁免----- **/

                    if (_age > 55) {
                        this.insuYear = ["106A"]
                    } else {
                        this.insuYear = ["70A", "106A"]
                    }
                    this._defaultInsuYear()
                    if (this.insuYearVal === 70) {
                        if (_age >= 0 && _age <= 35) {
                            this.payEndYear = ["10Y", "15Y", "20Y", "30Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (_age >= 36 && _age <= 45) {
                            this.payEndYear = ["10Y", "15Y", "20Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (_age >= 46 && _age <= 50) {
                            this.payEndYear = ["10Y", "15Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (_age >= 51 && _age <= 55) {
                            this.payEndYear = ["10Y"];
                            this.amnt = ["100000"];
                        }
                    }
                    else {
                        if (_age >= 0 && _age <= 40) {
                            this.payEndYear = ["10Y", "15Y", "20Y", "30Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000", "350000", "400000", "450000", "500000"];
                        } else if (_age >= 41 && _age <= 45) {
                            this.payEndYear = ["10Y", "15Y", "20Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (_age >= 46 && _age <= 50) {
                            this.payEndYear = ["10Y", "15Y"];
                            this.amnt = ["100000", "150000", "200000", "250000", "300000"];
                        } else if (_age >= 51 && _age <= 55) {
                            this.payEndYear = ["10Y"];
                            this.amnt = ["100000"];
                        }
                    }
                    //重置到第一个选择项
                    this._defaultPayEndYear()
                    //基本保额重置到第一个选项
                    if (this.tempAmntEvent) {
                        this._defaultAmnt()
                    }
                this.calPAWithRule();
            },
            onAppDatePickerConfirm(columnsValue) {
                //附加投保人豁免选择出生日期
                this.isAppBirthdayShow = true;
                this.appDatePickerValue = this.$refs.appDatePicker.getFormatDate('yyyy-MM-dd')
                this.proposal.appntInfo.birthday = this.appDatePickerValue
                this.appBirthdayVal = this.appDatePickerValue
                let _age = this._jsGetAge(this.appDatePickerValue)
                this.proposal.appntInfo.age = _age
                //判断是否生日单，初始化生效时间，设置为当天
                this._appBirthdayOrder(this.appDatePickerValue)

                this.calPAWithRule();
            },
            $_showActionSheet() {
                this.value = true
            },
            $_selected(item) {
                this.payIntvName = item.label
                this.payIntvVal = item.value
            },
            $_cancel() {
            },
            _jsGetAge(strBirthday) {
                var returnAge;
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];
                var d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();
                if (nowYear == birthYear) {
                    returnAge = 0;//同年 则为0岁
                }
                else {
                    var ageDiff = nowYear - birthYear; //年之差
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                        else {
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            }
                            else {
                                returnAge = ageDiff;
                            }
                        }
                    }
                    else {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge;//返回周岁年龄
            },
            addressPropHandleChange({options}) {
                this.addressDataValue = options
                this.defaultAddressLevel = this.caleCityLevel(options.map(item => item.label).join(''))
                let _age = this.proposal.insuredInfo.age
            },
            caleCityLevel(options){
                let name = options;
                let citylist1 = ["北京", "上海", "广州", "深圳", "苏州", "宁波", "杭州", "南京"];
                let citylist2 = ["哈尔滨", "石家庄", "兰州", "昆明", "成都", "长春", "沈阳", "西宁", "西安",
                    "郑州", "济南", "太原", "合肥", "武汉", "长沙", "南京", "贵阳", "南宁", "杭州", "南昌", "福州",
                    "海口", "银川", "澳门", "天津", "重庆"];
                for (let i = 0; i <= citylist1.length; i++) {
                    if (name.indexOf(citylist1[i]) > -1) {
                        return 1;
                    }
                }
                for (let i = 0; i <= citylist2.length; i++) {
                    if (name.indexOf(citylist2[i]) > -1) {
                        return 2;
                    }
                }
                return 3;
            },
            // 计算性别
            getSex(cardNo) {
                //获取性别
                if (parseInt(cardNo.substr(16, 1)) % 2 == 1) {
                    return "M";
                } else {
                    return "F";
                }
            },
            // 计算年龄
            getAge(cardNo) {
                var myDate = new Date();
                var month = myDate.getMonth() + 1;
                var day = myDate.getDate() + 1;
                var age = myDate.getFullYear() - cardNo.substring(6, 10) - 1;
                if (cardNo.substring(10, 12) < month || cardNo.substring(10, 12) == month && cardNo.substring(12, 14) <= day) {
                    age++;
                }
                return age;
            },
            // 获取生日
            getBirth(cardNo) {
                var tmpStr = cardNo.substring(6, 14);
                return tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
            },
            //特定疾病提示语
            showToast(n) {
               if (n === '5909D1') {
                    this.toastInfo = '若投保人在等待期后发生身故、全残或者指定的100种重疾、20种中症、35种轻症五种情况中的一种，则豁免后续未交保费，被保险人的保障继续有效'
                    Dialog.alert({content: this.toastInfo})
                } else if(n === 'ifrenewFlag'){
                    this.toastInfo = '自动续保，不用担心忘了续保，省心！<br/>开通自动续保后，可以随时取消，放心！'
                    Dialog.alert({content: this.toastInfo})
                } else if(n === '5031D1') {
                   this.toastInfo = '医疗保险为补偿性质的保险，即被保险人因为疾病或意外伤害，需要住院治疗而产生相关费用，可以进行费用补偿的保险，百万医疗保险重点解决大额医疗费用。附加医惠通费用补偿医疗保险，不但具备最高可达400万的医疗保障，而且6年保证续保，在保证续保期间内，按保证续保期初约定费率缴费，不因健康状况或历史理赔情况而拒保，不因该保险的统一停售而拒保。'
                   Dialog.alert({content: this.toastInfo})
               }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .block {
      /*border: px2em(1px) solid coral;*/
      /*margin-bottom: px2em(20px);
      /*-webkit-border-radius: 10px;*/
      /*-moz-border-radius: 10px;*/
      /*border-radius: 10px;*/
      /*box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);*/
      padding-top: px2em(41px) !important;
      padding-bottom: px2em(0px) !important;
      padding-right: 4% !important;
      position: relative;
    }
    .watermark{
        background: url("../../assets/imgs/watermark.png") repeat-y center!important;
        background-size: 100% auto!important;
    }

    #block {
      padding-top: px2em(0px) !important;
      width: 92%!important;
      p {
        line-height: 1.65em;
      }
    }
    .renew {
      display: flex;
      justify-content: space-between;
      padding-top: 0.4rem;
      padding-bottom: 30px;
      p {
        font-size: 26px;
        color: #000;
        line-height: 1.45em;
      }
      li {
        border: 1px solid #b0afaf;
        border-radius: 0.06667rem;
        font-size: 26px;
        text-align: center;
        display: inline-block;
        padding: 0.08333rem 0.43333rem;
        margin-left: 0.26667rem;
      }
      .active {
        color: rgb(215, 0, 15) !important;
        border: 2px solid rgb(215, 0, 15) !important;
      }
    }
    .to-top{
       position: absolute;
       width: 24px;
       height: 14px;
       background: url("~@/assets/imgs/kanghuibao/top3.png") no-repeat;
       background-size: 100%;
       top: 0.1rem;
       left: 0.73rem;
    }
    .giftIns-tip{
        position: absolute;
        width: 52px;
        height: 36px;
        right: 0rem;
        top: 0.071rem;
    }
    .amnt-mod li{
        padding: 8px 0;
        width: 83px;
    }

    .md-field-item {
        width: 100% !important;
    }

    .md-field-item-title {
        color: #000 !important;
    }

    .md-icon.icon-font.md {
        font-size: 0.42667rem
    }

    .hide {
        display: none !important;
    }

    .section {
        background: #fff;
        padding-bottom: px2em(150px);
        overflow: hidden;
    }
    .bn-topList{
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin-left: 4%;
        padding-top: .4rem;
        padding-bottom: 30px;
        p{
            font-size: 26px;
            line-height: 1.45em;
            width: 50%;
        }
        li {
            border: 1px solid rgb(176, 175, 175);
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            color: #000;
            font-size: 26px;
            text-align: center;
            display: inline-block;
            padding: 0.08333rem 0.43333rem;
            margin-left: 20px;
        }
    }
    .active {
        color: rgb(215, 0, 15) !important;
        border: 2px solid rgb(215, 0, 15) !important;
    }

    .content {
        width: 92%;
        margin-left: 4%;
        .contentTop {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            margin-top: 20px;
            border-radius: 10px;
            width: 100%;
            background: #fff;
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            .sex {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-top: 1px solid #e8e8e8;
                padding-top: .4rem;
                margin-bottom: 30px;
                span {
                    font-size: 30px;
                }
                ul {
                    margin-bottom: 30px;
                }
            }
            .proposersex{
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                padding-top: .4rem;
                span {
                    font-size: 26px;
                }
                ul {
                    margin-bottom: 30px;
                }
            }
            li {
                border: 1px solid rgb(176, 175, 175);
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                color: #000;
                font-size: 26px;
                text-align: center;
                display: inline-block;
                padding: 7px 40px;
                margin-left: 12px;
            }
        }

        .contentMedium {
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            margin-top: 20px;
            background: #fff;
            /*padding-bottom: 180px;*/
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            h2 {
                font-size: 36px;
                width: 92%;
                margin-left: 4%;
                padding-bottom: 30px;
                /*border-bottom: 1px solid #ccc;*/
                padding-top: 20px;
                font-weight: bold;
            }
            .detail {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #e8e8e8;
                p {
                    display: inline-block;
                    padding: 12px 0;
                    font-size: 30px;
                    line-height: 89px;
                }
                ul {
                    margin-top: 32px;

                }
                li {
                    border: 2px solid rgb(176, 175, 175);
                    color: #000;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    width: 120px;
                    text-align: center;
                    display: inline-block;
                    padding: 7px 15px;
                }
            }
            .details:first-child {
                border-top: none;
            }
            .details {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-top: 1px solid #e8e8e8;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
                ul {
                    padding-top: 10px;
                    padding-bottom: 30px;
                    max-width: 74%;
                    text-align: right;
                }
                li {
                    color: #000;
                    margin-left: 20px;
                    border: 2px solid rgb(176, 175, 175);
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    text-align: center;
                    display: inline-block;
                    padding: 8px 15px;
                    margin-top: 20px;
                }
            }

            .detailQ {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #ccc;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
                ul {
                    padding-top: 20px;
                    margin-bottom: 30px;
                }
                li {
                    margin-top: 23px;
                    font-size: 28px;
                    display: inline-block;
                }

            }

            .detailP {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #e8e8e8;
                p {
                    font-size: 30px;
                    line-height: 40px;
                    width: 46%;
                    margin-top: 30px;
                }
                ul {
                    margin-top: 10px;
                    margin-bottom: 30px;
                    text-align: right;
                    white-space: nowrap;
                    width: 46%;
                }
                li {
                    color: #000;
                    margin-left: 20px;
                    border: 2px solid rgb(176, 175, 175);
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    text-align: center;
                    display: inline-block;
                    padding: 8px 10px;
                    margin-top: 20px;
                }
            }
            #delborder{
                border-bottom: none!important;
            }
            .delborder{
                border-bottom: none!important;
            }
            .addborder{
                border-bottom: none!important;
                border-top: 1px solid #e8e8e8;
            }
            .detailB {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
            }

        }
    }

    .contentBottom {
        display: flex;
        height: 100px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        bottom: 0;
        .customerModal{
            flex: 0.3;
        }
       .bottom1 {
            flex: .7;
            border-top: 1px solid #eee;
            color: rgb(153, 153, 153);
            line-height: 100px;
        }
        a {
            flex: 1;
            color: #fff;
            line-height: 100px;
        }
        a:visited {
            color: #fff;
        }
    }

    .isFixed {
        position: fixed;
        top: 0;
    }

    .touBaoInfo {
        font-size: 36px;
        width: 92%;
        margin-left: 4%;
        padding-bottom: 30px;
        border-bottom: 1px solid #e8e8e8;
        padding-top: 20px;
        font-weight: bold;
    }

    .zongHe {
        color: rgb(215, 0, 15);
    }

    .year {
        color: #999;
    }

    .justDown {
        background: rgb(215, 0, 15);
        text-align: center;
        font-size: 34px;
        color: #fff;
    }

    .price {
        font-size: 50px;
        color: #d7000f !important;
    }

    .parT {
        font-size: 28px;
    }

    .parS {
        position: absolute;
        top: 40px;
        left: 120px;
        color: red;
    }

    .bottom1 {
        background: #ffffff;
        text-align: center;
        color: rgb(215, 0, 15);
        font-size: 30px;
        font-weight: bold;
    }
    .customer{
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: .1rem;
        margin-left: .4rem;
    }
    .customerModal{
        border-right: 1px solid #ccc;
        border-top: 1px solid #f3f3f3;
        background: #fff;
        overflow: hidden;
        line-height: 1.2;
        span{
            display:  block;
            margin-left: .35rem;
        }
    }
</style>
<style lang="scss">
    .trialBorder{
        .md-field-item-content:before{
            border-bottom: 0 !important;
        }
    }
    .md-toast .md-popup .md-popup-box {
        width: 9.2rem!important;
    }
    .md-field{
        padding-left: 4% !important;
    }
    .proposerDate .md-field .md-field-content .md-field-item .md-field-item-content .md-field-item-title{
        font-size: 26px!important;
    }
    .proposerDate .md-field .md-field-content .md-field-item .md-field-item-content:before{
        border-bottom:none!important;
    }
    .insuredDate .md-field .md-field-content .md-field-item .md-field-item-content:before{
        border-bottom:none!important;
    }
</style>