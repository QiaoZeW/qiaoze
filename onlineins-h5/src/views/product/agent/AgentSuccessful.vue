<template>
    <section class="successful-wrap">
        <div :class="setClass">
            <div class="status">
                <md-icon class="success-icon" name="success" size="lg" />
                <span>支付成功</span>
            </div>
            <p>{{ cvalidateText }}</p>
            <p>
                <a id="hf_successful_gorderlist" class="red" :class="{'ml24': showGoHomeBtn}" href="javascript:;" @click="goOrderList">查看保单></a>
            </p>
        </div>

        <div class="visit">
            <div class="visit-title">
                保单回访
            </div>
            <div class="visit-tip">
                <md-icon class="tip-icon" name="info" size="sm" />为了<span class="red">保障您的投保权利和义务</span>,同时<span class="red">规避销售误导</span>,应监管部门要求,需对本次投保进行回访,请您<span class="red">如实完成</span>。
            </div>

            <div class="btns">
                <button id="hf_successful_onlinevisit" class="online-visit button primary" :class="{'disabled': isDisabled}" @click="onlineVisit" :disabled="isDisabled">
                    {{ visitBtnText }}
                </button>
            </div>
            <div v-if="!isDisabled" class="button mt30">
                <a href="javascript:;" id="hf_successful_televisit" class="tele-visit" @click="teleVisit">预约电话回访</a>
            </div>
        </div>

        <div v-if="actGiftFlag == '8'" class="bottom-tip">100万保额1年期“药惠通抗癌特药险”赠送成功</div>
        <div v-else-if="actGiftFlag == '7'" class="bottom-tip1">{{ actGiftErrMsg }}</div>
        <div v-else-if="ifGift == '0'" class="bottom-tip1">您的健康情况不符合“药惠通抗癌特药险”赠送规则。</div>

        <ConfirmVisit ref="confirm-visit" :contNo="contNo" :orderNo="orderNumber" />
        <md-dialog
            :closable="true"
            v-model="iconDialog.open"
            :btns="iconDialog.btns"
            title="您还没有完成回访"
        >
            <div style="padding-bottom: 30px;">
                为了保障您的投保权利和义务，同时规避销售误导，应监管部门要求，需对本次投保进行回访，请您如实完成。
            </div>
        </md-dialog>

        <div class="mask-wrap" v-show="showMask">
            <div class="mask">
                <img class="loading" src="@/assets/imgs/investigation/loading.png" alt="">
                <p>保单回访准备中...</p>
            </div>
        </div>
    </section>
</template>

<script>
    import { Toast, Dialog } from 'mand-mobile'
    import ConfirmVisit from '@/views/externalPay/ConfirmVisit'
    import { navGoBack } from "@/utils/utils"
    import 'babel-polyfill'
    export default {
        name: 'successful',
        components: {
            ConfirmVisit
        },
        computed: {
            cvalidateText () {
                if (this.cvalidate) {
                    const cDate = new Date(this.cvalidate.replace(/-/g, '/'))
                    if (cDate < new Date()) {
                        return '保单已生效'
                    } else {
                        const dateInfo = {
                            '年': cDate.getFullYear(),
                            '月': cDate.getMonth() + 1,
                            '日': cDate.getDate(),
                            '点': cDate.getHours()
                        }
                        let dateStr = ''
                        for (let i in dateInfo) {
                            dateStr += dateInfo[i] + i
                        }
                        return `保单将于${dateStr}生效`
                    }
                } else {
                    return ''
                }
            },
            isDisabled () {
                // rvType: null--电话 在线都没做  0--选择了在线可以改  1-选择了电话就不可以改了
                return !(this.rvType == null || (this.rvType == 0 && this.rvStatus == 0))
            },
            showGoHomeBtn () {
                // return !this.isBrowser && (this.visitFlag==0 || this.cosGoBackUrlflag)
                // 现在业务要求放出来
                return true
            }
        },
        data() {
            return {
                isNavBack: false,
                actGiftFlag: '',
                actGiftErrMsg : "",
                ifGift:"",
                showMask: false,
                isDiaoyanOpen: false,
                cvalidate: '',
                rvStatus: '', // (0：未回访，1：已回访未调研，2：完成回访调研)
                canLeave: 1,
                visitFlag: 0, // 回访开关 1：开 0： 关闭
                rvType: null, // rvType(0：在线回访(默认)，1：电话回访)
                orderNumber: '',
                showConfirm: false,
                cpsOrderSuccessImag : '',
                cpsOrderSuccessImageUrl : '',
                product_id: '',
                detailAdd: '',
                contNo: '',
                leaveConfirm: true,
                myOneT: '',
                riskName: '',
                isBrowser: true,
                cpsNotShow: false,
                cosGoBackUrlflag:false,
                cpsGoBackUrl:null,
                bannerShow: false,
                secondaryDistributor: '',
                riskSource: '承保成功页',
                thirdClassDistributor: '',
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: '还是走吧',
                            handler: this.confirmLeave,
                        },
                        {
                            text: '参与调研',
                            handler: this.goInvestigation,
                        },
                    ],
                },
                openInvestigationConfig: false,
                visitBtnText: '在线完成',
                setClass:'status-wrap',
                riskCode:'',
				userToken: ''
            }
        },
        created(){
            if (!this.isBrowser) {
                document.addEventListener("visibilitychange", function () {
                    if (!document.hidden) {
                        if (sessionStorage.getItem('visitReady') == 'Y') {
                            location.href = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}&secondaryDistributor=${this.secondaryDistributor}`
                        }
                        window.location.reload();
                    }
                }, false);
            }
            this.ifGift = window.localStorage.getItem("ifGift")
            this.actGiftFlag = window.localStorage.getItem("actGiftFlag")
            this.actGiftErrMsg = window.localStorage.getItem("actGiftErrMsg")
            this.init()
        },
          mounted(){
           if (process.env.NODE_ENV !== 'production'){
                this.setClass='status-wrap watermark';

            }
        },
        methods: {
            init () {
                this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || localStorage.getItem('cps_token') || ''
                this.getSysConfig()
                this.isBrowser = this.$app.isBrowser()
                this.product_id = this.$router.query('product_id')
                //不显示回访调研
                this.$app.showCustomerIntelligence((data) => {
                    this.cpsNotShow = data.downloadVisit
                })
                if (!this.isBrowser) {
                    navGoBack(() => {
                        if (sessionStorage.getItem('visitReady') == 'Y') {
                            this.isNavBack = true
                        }
                    })
                }
                if ( "null" !== localStorage.getItem('cps_cpsOrderSuccessImag') && null !== localStorage.getItem('cps_cpsOrderSuccessImag')
                    && "" !== localStorage.getItem('cps_cpsOrderSuccessImag')) {
                    this.bannerShow = true;
                    this.cpsOrderSuccessImag = localStorage.getItem('cps_cpsOrderSuccessImag');
                    this.cpsOrderSuccessImageUrl = "#";
                }
                if ( "null" !== localStorage.getItem('cps_goBackUrl') && null !== localStorage.getItem('cps_goBackUrl')) {
                    this.cosGoBackUrlflag = true;
                    this.cpsGoBackUrl = localStorage.getItem('cps_goBackUrl');
                }
                if ( "null" !== localStorage.getItem('cps_cpsOrderSuccessImageUrl') && null !== localStorage.getItem('cps_cpsOrderSuccessImageUrl')) {
                    this.cpsOrderSuccessImageUrl = localStorage.getItem('cps_cpsOrderSuccessImageUrl');
                }
                this.contNo = JSON.parse(localStorage.getItem('getContNum'))
                this.loadRiskName()
                this.orderNumber = JSON.parse(localStorage.getItem('orderNumber'))
                this.clearLocalData()
                this.getOrderVisitInfo()
            },
            clearLocalData () {
                this.clearStorage('bankAccNumber')
                this.clearStorage('bankAccName')
                this.clearStorage('bank_Code')
                this.clearStorage('scoreNum')
                this.clearStorage('questionList')
                this.clearStorage('diaoyanSubList')
                this.clearStorage('BUYSTORAGE'+ this.product_id + (window.localStorage.getItem("USERCODE") || ''))
                this.clearStorage('PAWithRule')
                this.$app.getUserCode((userCode)=>{
                    this.clearStorage('underwriteInfo'+userCode+this.product_id)
                })
                //this.clearStorage('BUYSTORAGE')
                this.clearStorage('allInfo')
                this.clearStorage('guarantee')
                this.clearStorage('jobInfo')
                this.clearStorage('knowledge')
            },
            onlineVisit () {
                this.$refs['confirm-visit'].getReturnVisitQuestionnaire()
            },
            teleVisit () {
                this.$refs['confirm-visit'].contactShow()
            },
            tipVisit (url) {
                // 如果用户未完成操作，离开页面，提示操作
                if (this.canLeave == 1 && this.visitFlag == 1) {
                    this.canLeave++
                    Dialog.confirm({
                        title: "提示",
                        content: "<span style='padding-bottom: 20px;'>您还没有参加回访调研</span>",
                        confirmText: "立即参加",
                        cancelText: "还是走吧",
                        onConfirm: () => {
                            this.$refs['confirm-visit'].getReturnVisitQuestionnaire()
                            return false;
                        },
                        onCancel: () => {
                            location.href = url;
                            return false;
                        }
                    });
                }
            },
            getOrderVisitInfo () { // 订单回访调研信息查询
                this.$request({
                    url: `/ins/visit/getOrderVisitInfo`,
                    method: 'POST',
                    userToken: this.userToken,
                    isEncript: true,

                    data: {
                        orderNo: this.orderNumber
                    },
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        // 返回字段{调研开关:surveyFlag(0:关闭；1:开启),回访状态:rvStatus(0：未回访，1：已回访未调研，2：完成回访调研)}
                        // rvType(0：在线回访(默认)，1：电话回访)
                        console.log('data-------', data)
                        // if (data.surveyFlag == '0') { this.visitBtnText = '回访调研' }
                        const textMap = {
                            '1': '已预约电话回访'
                        }
                        this.rvType = data.rvType
                        this.visitBtnText = textMap[data.rvType] || '在线完成'
                        this.rvStatus = data.rvStatus
                        this.visitFlag = data.visitFlag || 0
                        this.cvalidate = data.cvalidate
                        this.isDiaoyanOpen = data.surveyFlag == '1'
                        if (data.rvType == null && this.visitFlag == 1) {
                            this.ifConfirm() // 如果没做回访调研 -- 设置点击左上角离开提醒
                        }
                        /* ---不展示蒙层了
                         if (this.visitFlag == '1') {
                           this.showMask = true
                           setTimeout(() => {
                            this.showMask = false
                          }, 3000)
                        }*/
                    },
                    failFn: (data) => {
                        Dialog.alert({content: data.resultMsg})
                    }
                })
            },
            cpsBannerShence(){
                localStorage.setItem('shence_view_detail_risk_source', '承保成功页');
            },
            goDownload(){
                window.location.href = this.$router.siteUrl() + '/cms/Download.html'
            },
            goInvestigation(){
                this.iconDialog.open = false
            },
            getSysConfig(){
                this.$request({
                    url: `/config/list`,
                    params: {},
                    successFn: (data) => { //0--false  1--true
                        if(data.find((item)=>item.sysKey === 'SYS_IS_SHOW_HUIFANG').sysValue === '1'){
                            this.openInvestigationConfig = true
                        }
                        this.setBackHomeConfig() // 设置点击左上角返回到首页
                    },
                    failFn: () => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            setBackHomeConfig () {
                if (this.isBrowser) {
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('backHomeConfig', {
                            'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                        }, function (response) {
                        });
                    })
                }
            },
            confirmLeave(){
                this.backHome()
            },
            closeBrowser(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('closeBrower'
                        , {'id': 2}, function (responseData) {
                        }
                    );

                })
            },
            loadShenceData () {
                // 承保成功加载完毕，开始选择回访方式
                sensors.track("bn_oninevisit_huifang_loadsuccessful", {
                    risk_source: this.riskSource,
                    cont_no: this.contNo,
                    risk: this.riskName,
                    secondaryDistributor: this.secondaryDistributor
                })
            },
            loadRiskName(){
                this.$request({
                    url: `/ins/product/getProductNameList/${this.product_id}`,
                    // isLoading: true,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.riskName = data.name
                        this.riskCode = data.riskCode
                        document.title =  this.riskName
                        this.$app.wxProductDetail(this.product_id, 0)
                        this.loadShenceData()
                    },
                    failFn: (data) => {
                        Dialog.alert({content: data.resultMsg})
                    }
                })
            },
            goOrderList(){
                let orderNumber = this.orderNumber
                let url = `/externalPay/PolicyDetails.html?orderNo=${orderNumber}`
                if (this.agentCode) {
                    url += `&agentCode=${this.agentCode}`
                }
                location.href = url
            },
            clearStorage(name){
                window.localStorage.removeItem(name)
            },
            backHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                            //that.iconDialog.open = true
                        }
                    );
                })
            },
        },
    }

</script>

<style lang="scss" scoped>
.watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center #fff !important;
        background-size: 100% auto!important;
    }
    .bottom-tip{
        position: fixed;
        bottom: 0px;
        background: #DEDDDD;
        width: 100%;
        height: 88px;
        line-height: 88px;
        font-size: 28px;
        color: #FF7B17;
        text-align: center;
    }
    .bottom-tip1{
        position: fixed;
        bottom: 0px;
        background: #949494;
        width: 100%;
        height: 88px;
        line-height: 88px;
        font-size: 28px;
        color: #f6c809;
        text-align: center;
    }
    .red {
        color: #D7000F;
    }
    .button {
        width: 100%;
        height: 88px;
        text-align: center;
        line-height: 88px;
        border-radius: 88px;
        color: #fff;
        display: inline-block;
        margin: 0 auto;
        font-size: 32px;
    }
    .primary {
        background: #D7000F;
        color: #fff;
    }
    .disabled {
        background-color: #F2ABB0;
    }
    .ml24 {
        margin-left: 24px;
    }
    .successful-wrap {
        background-color: #f2f2f2;
        min-height: 100%;

        .status-wrap {
            padding: 50px;
            .status {
                font-size: 44px;
                text-align: center;
                height: 60px;
                line-height: 60px;
                .success-icon {
                    font-size: 60px;
                    color: #D7000F;
                    vertical-align: -6px;
                }
            }
            p {
                font-size: 24px;
                color: #333;
                text-align: center;
                margin-top: 45px;
            }
        }

        .visit {
            width: 702px;
            padding: 50px 40px 55px;
            box-sizing: border-box;
            margin: 0 auto;
            text-align: center;
            background: #fff;
            border-radius: 12px;

            .visit-title {
                font-size: 42px;
                font-weight: bold;
                text-align: center;
            }
            .visit-tip {
                font-size: 24px;
                margin: 45px 0 105px;
                line-height: 40px;
                text-align: left;
                .tip-icon {
                    font-size: 28px;
                    margin-right: 8px;
                }
            }

            .btns {
                position: relative;
                .activity_img01 {
                    width: 179px;
                    height: 108px;
                    position: absolute;
                    top: -80px;
                    right: 90px;
                }
            }

            .mt30 {
                margin-top: 30px;
            }
            .online-visit {
                color: #fff;
            }

            .tele-visit {
                text-decoration: underline;
            }
        }

        .activity_img {
            width: 702px;
            margin: 40px auto;
        }
        .backbtns {
            .btns {
                padding: 10px 30px;
                text-align: center;
                margin-bottom: 30px;

                button {
                    width: 530px;
                    height: 88px;
                    line-height: 88px;
                    border-radius: 88px;
                    text-align: center;
                    color: #fff;
                    font-size: 36px;
                    background: linear-gradient(to top, #EE3D34, #FA5B46);

                    &.outline {
                        color: #EE3D34;
                        border: 1px solid #EE3D34;
                        background: #fff;
                    }
                }
            }
        }
        .bottom {
            position: fixed;
            bottom: 100px;
            width: 92%;
            margin-left: 4%;
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            height: 100px;

            ul {
                display: flex;
                justify-content: center;
                text-align: center;
                li {
                    width: 320px;
                    height: 88px;
                    line-height: 88px;
                    font-size: .4rem;
                    text-align: center;
                    border: 2px solid #d7000f;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
                .parQ {
                    color: #d7000f;
                    box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
                }
                .parS {
                    color: #fff;
                    background: #d7000f;
                    margin-left: 20px;
                }
            }
        }
        .bottomBanner {
            margin-top: 2rem;
            width: 92%;
            margin-left: 4%;
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            height: 100px;

            ul {
                display: flex;
                justify-content: center;
                text-align: center;
                li {
                    width: 320px;
                    height: 88px;
                    line-height: 88px;
                    font-size: .4rem;
                    text-align: center;
                    border: 2px solid #d7000f;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
                .parQ {
                    color: #d7000f;
                    box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
                }
                .parS {
                    color: #fff;
                    background: #d7000f;
                    margin-left: 20px;
                }
            }
        }
        .mediumContent{
            width: 100%;
            text-align: center;
        }
        .bottomContentBanner{

            width: 100%;

            text-align: center;
        }
        .bottomContent{
            width: 100%;
            text-align: center;
        }

        .mask-wrap {
            background: rgba(0, 0, 0, .3);
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .mask {
                .loading {
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 40px;
                    animation: rotate 3s linear infinite;
                }
                p {
                    font-size: 36px;
                    color: #fff;
                }
            }
        }

        @keyframes rotate {
            from {
                -webkit-transform: rotate(0);
                -moz-transform: rotate(0);
                -ms-transform: rotate(0);
                -o-transform: rotate(0);
                transform: rotate(0);
            }

            to {
                -webkit-transform: rotate(720deg);
                -moz-transform: rotate(720deg);
                -ms-transform: rotate(720deg);
                -o-transform: rotate(720deg);
                transform: rotate(720deg);
            }
        }
    }
</style>
