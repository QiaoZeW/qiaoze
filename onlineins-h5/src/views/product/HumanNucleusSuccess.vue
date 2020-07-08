<template>
    <section>
        <div class="bgTop">
            <img src="@/assets/imgs/insure/successful.png"/>
        </div>
        <p class="bgMidArt">订单转人核成功</p>
       <!-- <p class="bgMidArtTwo">{{failMessage}}</p>-->
        <p class="tip">我们将于1-2个工作日完成审核</p>
        <div class="content">
            <ul>
                <li>订单号：{{orderNumber}}</li>
                <li>保险名称：{{riskName}}</li>
                <li>被保人：{{insuredName}}</li>
                <li>保障额度：¥{{insureAmount}}</li>
                <li>缴费年限：{{payYear}}年</li>
            </ul>
        </div>
        <div class="contentBottom" v-if="isApp">
            <div class="bgBottom">
                <p class="backHome" @click="goHome">返回首页</p>
                <p class="goCustomer" @click="goCustomer">联系客服</p>
            </div>
        </div>
        <div class="downloadApp" v-else >
            <p class="partOne" @click="downloadApp" v-if="agentCode===''&& !cpsNotShow">下载APP</p>
            <p class="partOne" @click="goBackCpsHome" v-if="cosGoBackUrlflag">返回首页</p>
            <p class="partTwo">如有疑问，请联系百年人寿客服热线 <span>95542</span></p>
        </div>

    </section>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    export default {
        name: "underWriting",
        data(){
            return{
                cosGoBackUrlflag:false,
                cpsGoBackUrl:null,
                cpsNotShow: false,
				agentCode:'',
                isApp:null,
                riskName:'',
                product_id:'',
                orderNumber:'',
                insuredName:'',
                allData: null,
                insureAmount: 0,
                payYear: '',
                curRiskCode:'',
                orderNo:'',
                secondaryDistributor: '',
                thirdClassDistributor: ''

            }
        },
        created(){
            document.title = '转人核成功'
			this.agentCode = this.$router.query('agentCode')
            this.orderNo = this.$router.query('orderNo')
            this.isApp = this.$app.isBrowser()
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            this.loadOrderDetail()
            this.init()
            //临时添加针对世纪不显示回访调研
            this.$app.showCustomerIntelligence((data) => {
                this.cpsNotShow = data.downloadVisit
            })
            if ( "null" !== localStorage.getItem('cps_goBackUrl') && null !== localStorage.getItem('cps_goBackUrl')) {
                this.cosGoBackUrlflag = true;
                this.cpsGoBackUrl = localStorage.getItem('cps_goBackUrl');
            }
        },
        methods:{
            init(){
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHomeConfig', {
                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                    }, function (response) {
                    });
                })
            },
            loadOrderDetail() {
                let _this = this
                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/contract/getPolicyDetail`,
                        method: 'POST',
                        isLoading: true,
                        isEncript: true,
                        contentType: 'application/json;charset=UTF-8',
                        data: {'orderNo':_this.orderNo},
                        userToken: userToken,
                        successFn: (data) => {
                            let resData = data;
                            _this.product_id = resData.productId
                            _this.$app.wxProductDetail(_this.product_id, 0)
                            _this.curRiskCode = resData.insuredInfoList[0].riskInfoList[0].riskCode
                            _this.orderNumber = _this.orderNo
                            _this.insuredName = resData.insuredInfoList[0].name
                            _this.insureAmount = parseInt(resData.insuredInfoList[0].riskInfoList[0].amnt)
                            _this.payYear = resData.insuredInfoList[0].riskInfoList[0].payEndYear
                            _this.secondaryDistributor = resData.insuredInfoList[0].contInfo.secondaryDistributor
                            _this.thirdClassDistributor = resData.insuredInfoList[0].contInfo.thirdClassDistributor
                        },
                        failFn: (data) => {
                            Dialog.alert({content: data.resultMsg})
                        }
                    })
                })
            },
            downloadApp(){
                this.$app.downLoadApp()
            },
            goBackCpsHome(){
                if (this.cpsGoBackUrl === 'initUrl') {
                    location.href = (this.$router.siteUrl() + '/product/Detail.html?product_id=' + this.product_id +
                        ("&secondaryDistributor=" + this.secondaryDistributor) + ("&thirdClassDistributor=" + this.thirdClassDistributor) + "&goBackUrl=initUrl")
                } else {
                    location.href = this.cpsGoBackUrl
                }
            },
            goHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
            goCustomer(){
                if(this.isApp){
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('goCustomer'
                            , {'id': 2}, function (responseData) {
                            }
                        );
                    })
                }else{
                    this.$app.getBxdServiceUrl();
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    section{
        .bgTop{
            width: 100%;
            padding-top: 1.4rem;
            img{
                width: 154px;
                height: 166px;
                margin: 0 auto;
            }
        }
        .bgMidArt{
            margin-top:46px;
            font-size:40px;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            text-align: center;
            color:rgba(225,3,18,1);
        }
        .bgMidArtTwo{
            text-align: center;
            margin-top: 16px;
            font-size: 24px;
            color: #8E8E8E;
            line-height: 34px;
            span{
                color: #333333;
            }
        }
        .content{
            margin: .6rem 30px 0;
            height: 372px;
            border: 1px solid #f2f2f2;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background: #fff;
            ul{
                margin-top: 44px;
                li{
                    margin-top: 20px;
                    padding-left: 34px;
                    font-size:28px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                    line-height:40px;
                }
                li:first-child{
                    font-size:32px;
                    font-family:PingFangSC-Medium;
                    font-weight:600;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                }
            }
        }
        .contentBottom{
            background: #fff;
            width: 100%;
            height: 118px;
            position: fixed;
            bottom: 0;
        }
        .bgBottom{
            margin: 0 30px;

            height: 118px;

            display: flex;
            justify-content: space-between;
            p{
                margin-top: 16px;
                width: 320px;
                height: 88px;
                border: 1px solid #E10312;
                line-height: 88px;
                text-align: center;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
            .backHome{
                font-size:32px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(225,3,18,1);
            }
            .goCustomer{
                margin-left: 0.56rem;
                font-size:32px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
                color:rgba(255,255,255,1);
                background: rgba(225,3,18,1);
            }
        }
        .downloadApp{
            position: fixed;
            bottom: 40px;
            width: 100%;
            .partOne{
                width: 320px;
                height: 88px;
                font-size:32px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height: 88px;
                background:  rgba(225,3,18,1);
                text-align: center;
                margin: 0 auto;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
            .partTwo{
                margin-top: 30px;
                font-size:24px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(142,142,142,1);
                line-height:34px;
                text-align: center;
                span{
                    color: #E10312;
                }
            }
        }
    }
    .tip{
        text-align: center;
        margin-top: .3rem;
    }
</style>
<style lang="scss">
    body {
        background: #F2F2F2 !important;
    }
</style>
