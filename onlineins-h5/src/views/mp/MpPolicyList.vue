<template>
    <div class="content" ref="content">
        <div v-if="showPolicyList" class="blankPolicy">
            <p class="particular"></p>
            <p class="tips"><img src="@/assets/imgs/externalPay/blankPolicy.png"/></p>
            <div class="contentBottom newPart">
                <p class="logo"><img src="@/assets/imgs/externalPay/logo.png"/></p>
                <p class="bottomPhone">全国客服热线<span>95542</span></p>
            </div>
        </div>
        <div class="contTop">
            <div class="contentTop" >
                <!-- <div class="bePay">待支付</div>-->
                <mp-tab-bar
                    class="externalTab"
                    v-model="current"
                    @change="onChange"
                    :items="items"
                    :inkLength="60"
                    ref="tabbar"
                />
            </div>
            <p class="smallTip" @click="changeWaitPay" v-if="current === 0 && waitPayList.length !==  0">
                您有{{waitPayList.length}}个待支付订单，请于失效前完成支付！ <img src="@/assets/imgs/externalPay/arrowRight.png"
            /></p>
        </div>
        <div v-show="!showPolicyList" :class="waitPayList.length !==  0 && current === 0?'otherBlank':'otherBlankS'">

            <div class="contentBody" ref="contentBody">

                <div class="policyList">
                    <div class="policyDetail" v-if="current!=4" v-for="(item,index) in policyList" :key="index">
                        <div class="detailTop" @click="goDetail(item)">
                            <img class="productImg" :src="item.minImage"/>
                            <div class="orderDetail">
                                <h3>{{item.mainRiskName}}</h3>
                                <p class="insureName">被保人：{{item.insuredName}}</p>
                                <p class="partNo">投保单号：{{item.prtNo}}</p>


                               <img v-if="item.codeNew && item.codeNew.substring(0,2) === '02'" src="@/assets/imgs/externalPay/statusNew1.png"  />
                                   <img v-else-if="item.codeNew && item.codeNew.substring(0,2) === '03'" src="@/assets/imgs/externalPay/statusNew3.png"  />
                                   <img v-else-if="item.codeNew && item.codeNew.substring(0,2) === '04'" src="@/assets/imgs/externalPay/statusNew4.png"  />
                                   <img v-else-if="item.codeNew && item.codeNew.substring(0,2) === '05'" src="@/assets/imgs/externalPay/statusNew5.png"  />
                                   <img v-else-if="item.codeNew && item.codeNew.substring(0,2) === '06'" src="@/assets/imgs/externalPay/statusNew6.png"  />
                                   <img v-else-if="item.codeNew && item.codeNew.substring(0,2) === '07'" src="@/assets/imgs/externalPay/statusNew7.png"  />
                            </div>
                        </div>

                        <div v-if="item.codeNew && item.codeNew == '0201'" class="btnBox">
                               <p  class="goOrder" @click="goHuman(item)">转人工核保</p>
                           </div>
                           <div v-else-if="item.codeNew && item.codeNew === '0203'" class="btnBox">
                               <p  class="goOrder" @click="uploadCard(item)">上传证件</p>
                           </div>
                           <div v-else-if="item.codeNew && item.codeNew === '0205'" class="btnBox">
                               <p  class="goOrder" @click="uploadCard(item)">重新上传</p>
                           </div>
                           <div v-else-if="item.codeNew && item.codeNew === '0305'" class="btnBox">
                               <p  class="goOrder" @click="continuePay(item.orderNo)">继续支付</p>
                           </div>
                           <div v-else-if="item.codeNew && item.codeNew.substring(0,2) === '03'" class="btnBox">
                               <p  class="goOrder" @click="goPay(item)">去支付</p>
                           </div>
                           <div v-else-if="item.codeNew && item.codeNew === '0501' && surveyFlag  && item.visitFlag" class="btnBox">
                               <p  class="goOrder" @click="goInvestigation(item)">回访调研</p>
                           </div>
                            <div v-else-if="item.codeNew && item.codeNew === '0501' && visit  && item.visitFlag" class="btnBox">
                                <p  class="goOrder" @click="goInvestigation(item)">回访调研</p>
                            </div>
                           <div  class="goOrder" v-else-if="item.codeNew && (item.codeNew === '0601' || item.codeNew === '0602'|| item.codeNew === '0603'|| item.codeNew === '0604'|| item.codeNew === '0605'|| item.codeNew === '0701'|| item.codeNew === '0702'|| item.codeNew === '0703')">
                                 <div class="btnBox" >
                                    <p class="goOrder" @click="goShopping">去逛逛</p>
                                </div>
                            </div>
                            <div v-else class="btnBox">
                               <p  class="goOrder" @click="goDetail(item)">查看订单</p>
                           </div>
                           <p class="detailTips" v-if="item.codeNew != null && surveyFlag && item.visitFlag">
                            <span class="triangle"></span>
                            <img src="@/assets/imgs/externalPay/gift.png"  class="gift"/>{{item.orderPayTimeMsg}}
                           </p>
                           <p class="detailTip" v-else-if="item.orderPayTimeMsg && !item.visitFlag">{{item.orderPayTimeMsg}}</p >

                    </div>
                    <div class="policyDetail" v-if="current==4" v-for="(item,index) in policyList" :key="index">
                        <div class="detailTop" @click="goGiftDetail(item)">
                            <img class="productImg" src="@/assets/imgs/activity_m_entrance/logo.png" />
                            <div class="orderDetail">
                                <h3>{{item.contPlanCode | tranProdName}}</h3>
                                <p class="insureName">被保人：{{item.name}}</p>
                                <p class="partNo">投保单号：{{item.contNo}}</p>
                                <img v-if="item.status === '8'" src="@/assets/imgs/externalPay/statusNew5.png"  />
                            </div>
                        </div>
                        <div v-show="showZxFbBtn && item.contPlanCode === '301133'" class="btnBox">
                            <p  class="goOrder" @click="goZxBuy(item)">点我翻倍</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <p class="downloadApp" @click="goDownload">下载APP获取更多精彩</p>-->
        <md-dialog
            title="提示信息"
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns"
        >
            是否要发起撤单请求？
        </md-dialog>
        <ConfirmVisit ref="confirm-visit" v-if="contNo" v-model="showConfirm" :contNo="contNo" :orderNo="orderNo" />
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import ConfirmVisit from '@/views/externalPay/ConfirmVisit'
    import MpTabBar from './MpTabBarComponent'
    export default {
        name: 'MpPolicyList',
        components: {
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
            ConfirmVisit,
            [MpTabBar.name]: MpTabBar
        },
        data() {
            return {
                contNo: '',
                showConfirm: false,
                userToken: '',
                orderNo: '',
                policyList: [],
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                            handler: this.onBasicCancel,
                        },
                        {
                            text: '确认',
                            handler: this.onBasicConfirm,
                        },
                    ],
                },
                waitPayList: [],
                current: 0,
                surveyFlag: false,
                visit : false,
                uwStatus: null,
                showInvestigationConfig: null,
                showPolicyList: false,
                secondaryDistributor: '',
                thirdClassDistributor: '',
                items: [{ name: 0, label: '全部', group: 1 }, { name: 1, label: '保障中', group: 1 }, { name: 2, label: '待支付', group: 1 }, { name: 3, label: '处理中', group: 1 }, { name: 4, label: '赠险', group: 2, activeIcon: require(`@/assets/imgs/mp/zx-tab-active.png`), icon: require(`@/assets/imgs/mp/zx-tab.png`) }],
                isbn:'',
                cachedPolicyList:[],
                showZxFbBtn:false
            }
        },
        created() {
            document.title = '我的保单'
            // var browserRules = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
            // if (browserRules.test(navigator.userAgent)) {
            //     window.onpageshow = function (e) {
            //         if (e.persisted || (window.performance && window.performance.navigation.type == 2)) {
            //             window.location.reload();
            //         }
            //     }
            // }
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || ''
            this.secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", this.secondaryDistributor) : window.localStorage.removeItem("cps_secondaryDistributor");
            this.thirdClassDistributor = this.$router.query('thirdClassDistributor') || ''
            this.thirdClassDistributor ? window.localStorage.setItem("cps_thirdClassDistributor", this.thirdClassDistributor) : window.localStorage.removeItem("cps_thirdClassDistributor");

            //不显示回访调研
            this.$app.showCustomerIntelligence((data) => {
                this.surveyFlag = data.surveyFlag
                this.visit = data.visit
            })
            var isPageHide = false;
            window.addEventListener('pageshow', function () {
                if (isPageHide) {
                    window.location.reload();
                }
            });
            window.addEventListener('pagehide', function () {
                isPageHide = true;
            });

            localStorage.removeItem("isbn");
            this.isbn = this.$router.query('isbn') || ''
            if(this.isbn=='1'){
                window.localStorage.setItem("isbn","1");
            }

            this.code = this.$router.query('code') || ''
            //避免返回造成code失效
            if (this.code !==window.localStorage.getItem("LAST_CODE")) {
                    let _index = parseInt(this.$router.query('index') || 0)
                    this.current = _index;
                    sessionStorage.setItem(this.code+"_index",_index);

            }else{
                this.current = parseInt(sessionStorage.getItem(this.code+"_index")||this.$router.query('index')|| 0) ;
            }
            this.$app.getMiniToken(this.code,(token)=>{
                this.userToken = token;//window.localStorage.getItem("cps_token")
                //0-全部 1-保障中 2-待支付 3-已失效
                this.getList( this.current)
                //获取赠险领取次数
                this.getReceiveTimes()
                //this.getWaitPayList()
                //this.getSysConfig()
                if (wx) {
                    //如果在微信小程序内发送分享消息更新分享链接
                    wx.miniProgram.postMessage({
                        data: JSON.stringify({
                            action: 'token',
                            key: Math.random().toString(36).substr(2),
                            data: {token:window.localStorage.getItem("cps_token")}
                        })
                    });
                }
            });

        },
        mounted(){
            // this.$refs.tabbar.reflow();
        },
        filters: {
            tranProdName (code) {
                let codeDic = {
                    '301134': '交通工具意外险体验版',
                    '301135': '交通工具意外险体验版',
                    '301133': '一年期重大疾病保险体验版',
                    '301160': '百年抗癌特药险',
                    '301161': '百年抗癌特药险',
                    '301162': '百年抗癌特药险',
                    '301163': '百年抗癌特药险'
                }
                return codeDic[code] || ''
            }
        },
        methods: {
            goZxBuy () {
                //赠险邀请页面
                location.href = this.$router.siteUrl() + `/product/giving/Gbuy.html?secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}&t=${new Date().getTime()}`
            },
            getReceiveTimes () {
                this.$request({
                    url: `/act/giftRisk/getReceiveTimes`,
                    contentType: 'application/json;charset=UTF-8',
                    userToken: this.userToken,
                    successFn: (data) => {
                        if(data === 1){
                            this.showZxFbBtn = true
                        }else{
                            this.showZxFbBtn = false
                        }
                    },
                    failFn: (err) => {
                        Toast.failed(err.resultMsg)
                    }
                })
            },
            goHuman(item) {
                location.href = this.$router.siteUrl() + `/product/ArtificialConfirm.html?orderNo=${item.orderNo}&prtNo=${item.prtNo}&status=2`
            },
            getToken(callBack) {
                var code = this.code;
                //避免返回造成code失效
                if (code&&code !==window.localStorage.getItem("LAST_CODE")) {
                    this.$request({
                        url: '/portal/startMp',
                        method: 'POST',
                        isLoading: true,
                        data: {code: code},
                        contentType: 'application/json',
                        successFn: (data) => {
                            window.localStorage.setItem("LAST_CODE",code);
                            window.localStorage.setItem("cps_token", data.accessToken);
                            window.localStorage.setItem("userPhone", data.mobile);
                            window.localStorage.setItem("miniapp_user_code",data.userCode);
                            //神策登录
                            sensors.login(data.userCode);
                            callBack();
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                } else {
                    callBack();
                }
            },

            onChange(item, index, prevIndex) {
                this.getList(index)
                sessionStorage.setItem(this.code+"_index",index)
            },
            openDialog(index) {
                this.orderNo = index;
                this.basicDialog.open = true
            },
            onBasicConfirm() {
                this.cancelOrder()
                this.basicDialog.open = false
            },
            onBasicCancel() {
                this.basicDialog.open = false
            },
            goDownload() {
                if (this.$app.isMiniProgram()) {
                    //小程序跳转下载页面
                    wx.miniProgram.navigateTo({url: '/pages/user/downloadApp'})
                } else {
                    this.$app.downLoadApp()
                }

            },
            cancelOrder() {
                if (this.orderNo === '') {
                    return false
                }
                let data = {
                    "orderNo": this.orderNo,
                }
                this.$request({
                    url: '/contract/cancelPolicy',
                    userToken: this.userToken,
                    method: 'POST',
                    isLoading: true,
                    data: data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.getList(2)
                    },
                    failFn: (data) => {
                        Toast.info(data.resultMsg)
                    }
                })
            },
            goPay(item) {
                item.secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", item.secondaryDistributor) : window.localStorage.removeItem("cps_secondaryDistributor");
                location.href = this.$router.siteUrl() + "/product/AgainOrderPayment.html?orderNo=" + item.orderNo
            },
            continuePay(orderNo) {
                location.href = this.$router.siteUrl() + "/product/AgainOrderPayment.html?orderNo=" + orderNo + '&frompage=failcash'
            },
            goShopping(index) {
                if(this.$app.isMiniProgram()){
                    //去首页
                    wx.miniProgram.switchTab({url: '/pages/home/index'})
                }
            },
            uploadCard(item) {
                let status = item.status.substring(0, 1)
                location.href = this.$router.siteUrl() +`/product/UploadIDcard.html?orderNo=${item.orderNo}&prtNo=${item.prtNo}&status=${status}`
            },
            goInvestigation(item) {
                // location.href = this.$router.siteUrl() +`/activity/Investigation.html?orderNo=${orderNo}`
                //localStorage.setItem('userPhone', item.appntMobile);
                this.orderNo = item.orderNo;
                this.contNo = item.contNo;
                console.log("goInvestigation",this.orderNo,this.contNo);
                // this.$nextTick(() => {
                //     this.showConfirm = true;
                //     console.log("goInvestigation end");
                // });
                setTimeout(() => {
                    this.$refs['confirm-visit'].open()
                    // this.showConfirm = true
                }, 0)
                // setTimeout(() => {
                //     this.showConfirm = true
                // }, 0)

            },
            goDetail(item) {
                item.secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", item.secondaryDistributor) : window.localStorage.removeItem("cps_secondaryDistributor");
                location.href = this.$router.siteUrl() +`/mp/MpPolicyDetail.html?orderNo=${item.orderNo}&status=${item.status}`
            },
            goGiftDetail(item) {
                location.href = this.$router.siteUrl() +`/product/giving/GPolicyDetails.html?contNo=${item.contNo}`
            },
            changeWaitPay() {
                this.current = 2
                this.onChange('', 2)
            },

            _getCachedOrRemoteData(index,callback){
                let _i = parseInt(index);
                 if(this.cachedPolicyList[_i]){
                     callback(this.cachedPolicyList[_i]);
                }else{
                     if (index === 4) {
                         this.$request({
                             url: `/act/giftRisk/getPolicyList`,
                             userToken: this.userToken,
                             isLoading: true,
                             contentType: 'application/json',
                             successFn: (data) => {
                                 let r = data || []
                                 this.cachedPolicyList[_i] = r
                                 callback(r)
                             },
                             failFn: (data) => {
                                Toast.info(data.resultMsg)
                             }
                         })
                     } else {
                         this.$request({
                             //url: `/contract/getPolicyList/current?status=${index}&secondaryDistributor=` + this.secondaryDistributor,
                             url: `/contract/getPolicyListSplitNew/current?status=${index}`,
                             userToken: this.userToken,
                             isLoading: true,
                             contentType: 'application/json',
                             successFn: (data) => {
                                 let r = data.policyInfoList || []
                                 this.cachedPolicyList[_i] = r
                                 callback(r)
                             },
                             failFn: (data) => {
                                 if (data.resultCode === 'SYS_ERROR_0010') {
                                     Toast.info('请重新登录')
                                 } else if (data.resultCode === 'SYS_ERROR_005') {
                                     this.showPolicyList = true
                                 } else {
                                     Toast.info(data.resultMsg)
                                 }
                             }
                         })
                     }
                }
            },

            getList(index) {
                this.policyList=[];
                this._getCachedOrRemoteData(index,(policyInfoList)=>{
                    this.waitPayList.length = 0;
                    policyInfoList.forEach((item)=>{
                        if(item.subSaleMode === 'ONLINE'){
                            if(item.codeNew != null && item.codeNew.substring(0,2) == '03'){
                                this.waitPayList.push(item)
                            }
                        }
                    })
                    this.showPolicyList = false
                    this.policyList = policyInfoList

                    if (this.policyList === null || this.policyList.length === 0) {
                       // this.$refs.content.style.background = '#fff'
                        this.showPolicyList = true
                    } else {
                       // this.$refs.content.style.background = '#f2f2f2'
                        this.policyList.forEach((item) => {
                            if (item.status === '3') {
                                if (item.antiMoneyFlag === 'Y') {   //20w 反洗钱
                                    if (item.antiMoneyResult === '0') {   //证件未审核
                                        item.status = '30'
                                    } else if (item.antiMoneyResult === '1') {  //证件审核中
                                        item.status = '31'
                                    } else if (item.antiMoneyResult === '2') {  //证件审核通过
                                        item.status = '32'
                                    } else if (item.antiMoneyResult === '3') {  //证件审核不通过
                                        item.status = '33'
                                    }
                                } else {
                                    item.status = '3'
                                }
                            }
                            if (item.status === '5') {
                                if (item.antiMoneyFlag === 'Y') {   //20w 反洗钱
                                    if (item.antiMoneyResult === '0') {   //证件未审核
                                        item.status = '50'
                                    } else if (item.antiMoneyResult === '1') {  //证件审核中
                                        item.status = '51'
                                    } else if (item.antiMoneyResult === '2') {  //证件审核通过
                                        item.status = '52'
                                    } else if (item.antiMoneyResult === '3') {  //证件审核不通过
                                        item.status = '53'
                                    }
                                } else {
                                    item.status = '5'
                                }
                            }
                        })
                    }
                });

            }
        }
    }
</script>
<style lang="scss" scoped>
    .part1 {
        position: fixed;
        bottom: 60px;
        width: 100%;
    }

    .bottomPhone {
        color: #333333;
        font-size: 24px;
        width: 100%;
        margin-top: .5rem;
        text-align: center;
        bottom: 60px;

    span {
        color: #E10312;
    }

    }
    .content {
        background: #f2f2f2;
        min-height: calc(100vh);

    .contentTop {
        background: #fff;
        position: relative;
        height: 1.17rem;
        width: 100%;

    .bePay {
        width: 112px;
        height: 99px;
        line-height: 99px;
        text-align: center;
        border-bottom: 2px solid #E10312;
        color: #E10312;
        font-size: 28px;
        margin-left: 38px;
    }

    }


    }
    .contentBottom {
        position: relative;
        padding-bottom: 2rem;
    }

    .logo {
        bottom: 118px;
        width: 100%;

    img {
        margin: 0 auto;
        width: 224px;
        height: 68px;
    }

    }
    .particular {
        height: 0.6rem;
        width: 100%;
        background: #f2f2f2;
    }

    .blankPolicy {
        background: #fff;
        padding-top: 1.15rem;

    .tips {
        width: 100%;
        padding-top: 76px;

    img {
        margin: 0 auto;
        width: 378px;
        height: 416px;
    }

    }
    .newPart {
        margin-top: 282px;
        padding-bottom: 3.33333rem;
        margin-bottom: 0;
    }

    }
    .smallTip {
        margin: 26px 0.32rem 26px;
        background: #FC8F22;
        height: 56px;
        line-height: 56px !important;
        font-size: 24px;
        color: #fff;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        text-align: center;
        position: relative;

    img {
        width: 18px;
        height: 30px;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: .18rem;
        right: 1rem;
    }

    }
    .otherBlankS {
        z-index: 10;
        padding: 1.35rem 0.32rem .5rem;
    }

    .otherBlank {
        z-index: 10;
        padding: 2.3rem 0.32rem .5rem;
    }

    .contentBody {
        margin-bottom: 1.2rem;
    }

    .policyList {
        width: 100%;

    .policyDetail {
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        padding: 26px;
        overflow: hidden;

    .detailTop {
        width: 100%;
        height: 180px;
        border-bottom: 1px solid #f2f2f2;

    .productImg {
        width: 160px;
        height: 160px;
        display: inline-block;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        float: left;
        object-fit:cover;
    }

    .orderDetail {
        float: left;
        display: inline-block;
        margin-left: 20px;

    h3 {
        font-size: 28px;
        color: #333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 5.0rem;
        height: 1.07rem;
    }

    .insureName {
        // margin-top: .6rem;
        line-height: 36px;
        font-size: 26px;
        color: #8E8E8E;
    }

    .partNo {
        font-size: 26px;
        color: #8E8E8E;
        line-height: 36px;
        margin-top: 8px;
    }

    img {
        height: 127.5px;
        width: 127.5px;
        display: inline-block;
        float: right;
        margin-top: -2.49rem;
        margin-right: -1.63rem;
    }

    }
    }
    .btnBox {
        padding-top: 12px;
        display: flex;
        justify-content: flex-end;

    .goOrder {
        width: 156px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        border: 1px solid #E10312;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background: #fff;
        color: #E10312;
        font-size: 24px;
    }

    }
    }
    .policyDetail:not(first-child) {
        margin-top: 26px;
    }

    }
    .downloadApp {
        position: fixed;
        height: 88px;
        bottom: 0;
        background: #E10312;
        width: 100%;
        line-height: 88px;
        text-align: center;
        color: #fff;
        font-size: 32px;
        z-index: 20;
    }

    .detailTip, .detailTips {
        width: calc(100% - 20px);
        height: 52px;
        line-height: 52px;
        background: #F4f4f4;
        color: #333;
        font-size: 24px;
        padding-left: 20px;
        margin-top: 20px;
        position: relative;
        z-index: 5;
    }

    .detailTips {
        width: calc(100% - 60px);
        padding-left: 60px;
    }

    .gift {
        top: .14rem;
        left: 20px;
        width: 26px;
        height: 28px;
        position: absolute;
    }

    .triangle {
        position: absolute;
        width: 0;
        top: -.5rem;
        right: .76rem;
        height: 0;
        border: 24px solid #F4f4f4;
        border-color: transparent transparent #F4f4f4 transparent;
    }

    .contTop {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 20;
        background: #f2f2f2;
    }

</style>

<style lang="scss">

</style>
