<template>
    <section>
        <div class="contentTop">
            <img src="../../../assets/imgs/investigation/bgTop.png"/>
            <p class="topTitle">参与回访</p>
            <!--<p class="topDes">您投保的是：{{riskName}}</p>-->
        </div>
        <div class="content" ref="step1">
            <div class="contentMid">
                <h2><span class="midTitle">{{questionnaireList.visitTitle}}</span></h2>
                <p class="midCont" v-html="questionnaireList.visitContent">
                </p>

            </div>

            <p class="btns" @click.once="getReadConfirm" ref="btns">
                我已阅读并确认
            </p>
        </div>
    </section>
</template>

<script>
    import {Dialog} from 'mand-mobile'
    import {TabBar, Toast,} from 'mand-mobile'
	import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
    export default {
        name: 'Investigation',
        data () {
            return {
                agentCode: '',
                proposalAnswer: '',
                questionnaireList: {},
                questionnaireListTwo: {},
                showListTwo: false,
                scoreNum: '',
                showPic: false,
                allData: null,
                orderData: {
                    premium: 100.00,
                    accCode: '',
                    bankAccNo: '',
                    insuredEmail: ''
                },
                payYear: '',
                orderContent: '',
                riskName: '',
                riskCode: '',
                userCode: '',
                product_id: '',
                order_id: '',
                isBrowser: true
            }
        },
        created () {
            document.title = '回访'
            this.order_id = this.$router.query('order_id')
            this.agentCode = this.$router.query('agentCode')
            /* this.product_id = this.$router.query('product_id')*/
            //this.allData = JSON.parse(localStorage.getItem('allInfo'))
            this.orderContent = this.$router.query('orderNo')
            this.isBrowser = this.$app.isBrowser()
            this.getReturnVisit()
            if (this.order_id) {

            } else {
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHomeConfig', {
                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                    }, function (response) {
                    })
                })
            }

        },
        methods: {
			confirmShenceData(){             //点击确认触发埋点
				sensors.track("click_start_aftersale_questionnaire", {});
			},
            //第一步我已阅读并确认
            getReadConfirm () {
				this.confirmShenceData();
                let that = this
                let data = {
                    'agreeFlag': '1',
                    'orderNo': this.orderContent,
                    /*"productId": Number(this.product_id),*/
                    'userCode': '',
                    'productId': this.product_id,
                    'agentCode': this.agentCode
                }
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/ins/visit/addInsProductVisit`,
                        method: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        data: data,
                        successFn: (data) => {
                            if (data) {
                                // that.$refs.step1.style.display = 'none'
                                Dialog.alert({content: "回访已完成,感谢您的参与"})
                                that.$refs.btns.style.background = 'grey'
                                //如果agentCode为空，则说明为非代理人体外投保，那么才显示调研，否则只显示回访
                                // if (this.agentCode==="") {
                                //     that.$refs.step3.style.display = 'block'
                                // }
                            }
                        },
                        failFn: (data) => {
                            Dialog.alert({content: data.resultMsg})
                        }
                    })
                })
            },
			aftersaleShenceData(data){
				const {riskSubType, riskName, riskCode} = data;
				let riskTypeName = getRiskTypeName(riskCode,riskSubType);
				let riskSource = localStorage.getItem('shence_aftersale_questionnaire_risk_source') || '';
				sensors.track("click_aftersale_questionnaire", {
					risk_source: riskSource,
					purcahsed_insurance_yn: true,
				    risk_type: riskTypeName,
				    risk: riskName,
					order_no: this.orderContent
				})
			},
            getReturnVisit () {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        // url: `/ins/visit/insProductVisit/${that.product_id}/${that.orderContent}`,
                        url: `/ins/visit/insProductVisit/${that.orderContent}`,
                        params: {},
                        isLoading: true,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            if (data) {
                                that.questionnaireList = data
                                that.product_id = data.productId
								var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType"))
								that.aftersaleShenceData(riskInfoObj);
                                // that.getRiskCode()
                                console.log(data)
                            } else if (!data || !data.visitContent) {
                                that.$refs.step1.style.display = 'none'
                                that.$refs.step3.style.display = 'block'
                            }
                        },
                        failFn: (data) => {
                            Dialog.alert({content: data.resultMsg})
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    html, body {
        position: relative;
    }

    .contentTop {
        width: 100%;
        height: 236px;
        position: relative;
        .topTitle {
            position: absolute;
            top: 60px;
            width: 100%;
            text-align: center;
            font-size: 54px;
            font-weight: 600;
            color: #fff;
        }
        .topTitlePercent {
            position: absolute;
            top: 130px;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 54px;
            color: #fff;
            span {
                color: #FED53F !important;
                font-weight: 800;
                font-size: 54px;
            }
        }
        .topDes {
            position: absolute;
            top: 146px;
            width: 100%;
            text-align: center;
            font-size: 24px;
            color: #fff;
        }
    }

    .contentMid {
        margin-top: 46px;
        padding: 0 30px;
        h2 {
            padding-bottom: 23px;
            border-bottom: 2px solid #f6f6f6;
        }
        .step {
            font-size: 40px;
            color: #E10312;
            font-weight: bold;
        }
        .midTitle {
            margin-left: 28px;
            color: #333333;
            font-size: 32px;
            font-weight: bold;
        }
        .midCont {
            min-height: 8rem;
        }
    }

    .btn {
        /* position: absolute;*/
        margin-top: .5rem;
        margin-bottom: .5rem;
        width: 100%;
        height: 88px;
        bottom: 30px;
        background: #E10312;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        line-height: 88px;
        font-size: 32px;
        color: #fff;
        text-align: center;
    }

    .btns {

        margin-top: .5rem;
        margin-bottom: .5rem;
        width: 94%;
        margin-left: 3%;
        height: 88px;
        bottom: 30px;
        background: #E10312;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        line-height: 88px;
        font-size: 32px;
        color: #fff;
        text-align: center;
    }

    .questionOne {
        position: relative;
        textarea {
            border: 1px solid #ccc;
            width: 98%;
            margin-top: .5rem;
        }
    }

    .questionnaire {
        margin-top: 28px;
        font-size: 28px;
    }

    .important {
        width: 0.3rem;
        height: 0.3rem;
        top: 0;
        left: 3.5rem;
        display: inline;
    }

    .parQ {
        /*display: inline-block;*/
        margin-left: .1rem;
    }

    .popupContent {
        background: url("../../../assets/imgs/register/popup.png") no-repeat;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        width: 469px;
        height: 521px;
        margin-left: .4rem;
        .scoreNum {
            padding-top: 4.2rem;
            font-size: 36px;
            color: #333;
            text-align: center;
        }
        .goShare {
            margin: 0 auto;
            margin-top: 30px;
            width: 329px;
            height: 84px;
            line-height: 84px;
            text-align: center;
            color: #fff;
            font-size: 36px;
            background: rgba(232, 68, 57, 1);
            border-radius: 10px;

            &.btndisabled {
                background: #ccc;
            }
        }
    }

    .questionCheck ul {
        display: flex;
        margin-top: .3rem;
        flex-wrap: wrap;
        li {
            width: 3rem;
            input {
                vertical-align: -0.1rem;
                width: .4rem;
                height: 0.4rem;
            }
        }
    }

    .questionRadio {
        display: flex;
        margin-top: .3rem;
        p {
            width: 2rem;
            input {
                vertical-align: -0.06rem;
                width: .4rem;
                height: 0.4rem;
            }
        }
    }
</style>
