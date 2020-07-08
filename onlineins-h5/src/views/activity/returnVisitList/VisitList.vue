<template>
    <section>
        <div v-if="visitList && visitList.length !== 0">
            <div class="contentTop">
                为了保障您的投保权利和义务，同时规避销售误导，应监管部门要求，需对投保进行回访，请您如实完成。
            </div>
            <div class="content">
                <div class="listDetail" v-for="item in visitList">
                    <h2>{{item.mainRiskName}}</h2>
                    <p class="listInfo">
                        保单号：{{item.contNo}} <br>
                        被保人：{{item.insuredName}}
                    </p>
                    <div class="operationBox">
                        <div class="ellipsis">
                            <img src="@/assets/imgs/visitList/ellipsis.png" @click="goDetail(item)" class="ellipsis"/>
                        </div>
                        <div class="btnBox" v-show="item.visitType === '0' || !item.visitType">
                            <button @click="openShowLand(item)">电话回访</button>
                            <button @click="saveVisitType('0',item)">在线回访</button>
                        </div>
                    </div>
                    <div class="explain" v-show="item.visitType === '0' || !item.visitType">
                        <p>在线回访截止日期：{{item.startDate | transferDate}}-{{item.endDate | transferDate}}</p>
                    </div>
                    <div class="explain" v-show="item.visitType === '1'">
                        <p><span>*</span>工作人员将通过<span>95542</span>电话回访，请您保持手机畅通!</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="blankContent" v-else>
            <img src="@/assets/imgs/visitList/blank.png" class="blank"/>
            <div class="otherBtn">
                <button @click="goPolicyShop()">立即挑保障</button>
                <button @click="goEvaluation()">帮我挑保障</button>
            </div>
        </div>
        <md-landscape v-model="showLand" :mask-closable="false" class="showMyLand">
            <div class="dialogSuccess">
                <p>选择电话回访后，我们将通过<span>95542</span>电话进行回访，请保持您的手机畅通！</p>
                <div class="btn_box">
                    <button class="btn_two" @click="saveVisitType('1',null)">我知道了</button>
                </div>
            </div>
        </md-landscape>
        <ConfirmVisit ref="confirm-visit" :contNo="userContNo" :userPhone="userPhone" :orderNo="userOrderNo" />
    </section>
</template>

<script>
    import {Toast,Landscape,Dialog,Captcha} from 'mand-mobile'
    import ConfirmVisit from '@/views/externalPay/ConfirmVisit'
    export default {
        name: "VisitList",
        components:{
            [Landscape.name]: Landscape,
            [Captcha.name]: Captcha,
            ConfirmVisit
        },
        computed: {
            hidePhoneNum () {
                return this.userPhone.replace(/^(\d{3})\d+(\d{4})$/,'$1***$2')
            }
        },
        data() {
            return {
                visitList: [],
                showLand: false,
                userPhone: '',
                userContNo:'',
                userOrderNo:'',
                phoneOrderNo:'',
                visitContNo:'',
                visitOrderNo:'',
                riskSource:'',
                secondaryDistributor:''
                }
        },
        created() {
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || localStorage.getItem('cps_secondaryDistributor') || 'APP_00010001'
            this.getList()
            this.getInfo()
            this.saveSource()
        },
        methods: {
            saveSource () {
                this.riskSource = '回访订单页'
                localStorage.setItem("shence_aftersale_questionnaire_risk_source", '回访订单页');
            },
            openShowLand(item){
                sensors.track("bn_oninevisit_huifang_clicktele", {
                    risk_source: this.riskSource,
                    cont_no: item.contNo,
                    risk: item.mainRiskName,
                    secondaryDistributor: this.secondaryDistributor
                })
                this.showLand = true
                this.phoneInfo = item
            },
            goDetail(item){
                location.href = this.$router.siteUrl() + `/externalPay/PolicyDetails.html?orderNo=${item.orderNo}`
            },
            goEvaluation() {
                location.href = this.$router.siteUrl() + '/evaluation/Evaluation.html'
            },
            goPolicyShop(){
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('goRiskList'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
            getInfo(){
                this.$app.getToken((userToken)=> {
                    this.$request({
                        url: `/vip/user/current`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            this.userPhone = data.mobile
                        },
                        failFn: () => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            saveVisitType(index,item){
                if(index === '1'){
                    this.showLand = false
                    item = this.phoneInfo
                    sensors.track("bn_oninevisit_huifang_televisit", {
                        risk_source: this.riskSource,
                        cont_no: item.contNo,
                        risk: item.mainRiskName,
                        secondaryDistributor: this.secondaryDistributor
                    })
                }
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/ins/visit/saveOrderVisitType`,
                        method: 'POST',
                        contentType: "application/json;charset=UTF-8",
                        data: {
                            "orderNo": item.orderNo,
                            "rvType": index
                        },
                        isLoading: true,
                        isEncript: true,
                        userToken: userToken,
                        successFn: (data) => {
                            if(data){
                                if(index === '1'){
                                    this.getList()
                                }else if(index === '0'){
                                    this.userOrderNo = item.orderNo
                                    this.userContNo = item.contNo
                                    console.log(this.userContNo);
                                    console.log(this.userOrderNo);
                                    this.$refs['confirm-visit'].onlineVisit()
                                }
                            }
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                });
            },
            getList() {
                this.$app.getToken((userToken) => {
                    localStorage.setItem('USER_TOKEN_PAY',JSON.stringify(userToken))
                    this.$request({
                        url: `/contract/getVisitOrderList`,
                        contentType: 'application/json;charset=UTF-8',
                        isLoading: true,
                        isEncript: true,
                        params:{},
                        userToken: userToken,
                        successFn: (data) => {
                            this.visitList = data
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                });
            }
        },
        filters:{
            transferDate(time, format='yyyy.MM.dd') {
                var t = new Date(time);
                var tf = function(i) {
                    return (i < 10 ? "0" : "") + i;
                };
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                    switch (a) {
                        case "yyyy":
                            return tf(t.getFullYear());
                            break;
                        case "MM":
                            return tf(t.getMonth() + 1);
                            break;
                        case "mm":
                            return tf(t.getMinutes());
                            break;
                        case "dd":
                            return tf(t.getDate());
                            break;
                        case "HH":
                            return tf(t.getHours());
                            break;
                        case "ss":
                            return tf(t.getSeconds());
                            break;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    section {
        .contentTop {
            background: #FB8F24;
            padding: 8px 26px 8px 42px;
            font-size: 22px;
            line-height: 32px;
            color: #fff;
        }

        .content {
            padding: 0 20px;

            .listDetail {
                background: #fff;
                border-radius: 10px;
                padding: 34px 30px 30px 30px;
                margin-top: 24px;

                h2 {
                    font-size: 36px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }

                .listInfo {
                    margin-top: 12px;
                    font-size: 28px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    line-height: 40px;
                }

                .operationBox {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 8px;
                    min-height: 60px;

                    .ellipsis {
                        height: 1rem;
                        width: 1rem;
                        display: flex;
                        align-items: center;
                        img{
                            width: 34px;
                            height: 6px;
                        }
                    }

                    .btnBox {
                        button:first-child {
                            color: #333333;
                            margin-right: 20px;
                            border: 1px solid rgba(153, 153, 153, 1);
                        }

                        button:last-child {
                            color: #E10312;
                            border: 1px solid rgba(225, 3, 18, 1);
                        }

                        button {
                            width: 172px;
                            height: 60px;
                            line-height: .5rem;
                            font-size: 28px;
                            background: rgba(255, 255, 255, 1);
                            border-radius: 32px;

                        }
                    }
                }

                .explain {
                    margin-top: 20px;
                    border-top: 2px solid #F2F2F2;
                    padding-top: 20px;

                    p {
                        font-size: 26px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                    }

                    span {
                        color: #A72B2E;
                    }
                }

            }
        }

        .blank {
            width: 378px;
            height: 414px;
            display: inline-block;
            margin-top: 134px;
        }

        .blankContent {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #fff;
            text-align: center;

            .otherBtn {
                display: flex;
                flex-direction: column;
                align-items: center;

                button:first-child {
                    color: #BF1521;
                    border: 1px solid #BF1521;
                    margin-top: 30px;
                }

                button:last-child {
                    color: #DF9A49;
                    border: 1px solid #DF9A49;
                    margin-top: 40px;
                }

                button {
                    display: block;
                    width: 304px;
                    height: 64px;
                    font-size: 32px;
                    border-radius: 40px;
                }
            }
        }
    }
    .dialogSuccess {
        width: 8rem;
        height: 3.62667rem;
        background: #fff;
        border-radius: 16px;
        padding-top: 68px;
        padding-left: 25px;
        padding-right: 25px;

        p {
            font-size: 35px;
            color: #333333;
            span{
                color: #BF1521;
            }
        }

        button {
            height: 88px;
            color: #333333;
            font-size: 32px;
            margin-top: .4rem;
            line-height: 88px;
            text-align: center;
            border-top: 1px solid #f2f2f2;
            width: 100%;
        }

        .btn_box {
            margin-top: .7rem;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }
</style>
<style lang="scss">
    html, body {
        background: #F4F1F4;
        height: 100%;
        width: 100%;
        position: relative;
    }
    .showMyLand .md-landscape-content {
        width: 100% !important;
    }
    .showMyLand .md-icon-close:before {
        content: '' !important;
    }
    .visit-captcha {
        .md-captcha-title {
            font-size: 32px;
            color: #333;
        }
        .md-captcha-content {
            font-size: 32px;
            color: #333;
        }
        .md-codebox.is-justify .md-codebox-box {
            border: 1px solid #979797;
            border-radius: 8px;
        }
    }
</style>
