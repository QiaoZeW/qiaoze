<template>
    <div class="GPolicyDetails">
        <div class="content">
            <div class="title">
                <h2>{{ detailData.contPlanCode | tranProdName }}</h2>
                <p class="red">承保成功</p>
            </div>
            <ul class="list">
                <li>
                    <span>保单号</span>
                    <span class="value">{{ contNo }}</span>
                </li>
                <li>
                    <span>被保人</span>
                    <span class="value">{{ detailData.name }}</span>
                </li>
                <li>
                    <span>生效时间</span>
                    <span class="value">{{ detailData.cvalidate }}</span>
                </li>
                <li>
                    <span>终止时间</span>
                    <span class="value">{{ detailData.terminationTime }}</span>
                </li>
                <li v-if="riskCode === '301134' || riskCode === '301135'">
                    <span>保障责任</span>
                    <span class="value">{{ detailData.contPlanCode | tranPolicyName }}</span>
                </li>
                <li v-if="elePolicyAdd">
                    <span>电子保单</span>
                    <span class="value" style="color: #E10312;" @click="goElectronicPolicy">查看></span>
                </li>
            </ul>
            <!-- <p class="godetail red" v-if="riskCode === '301133'" @click="goElectronicPolicy">
                查看电子保单>
            </p> -->
        </div>
         <div class="subbtn" v-if="showBtn && detailData.contPlanCode === '301133'">
          <md-button class="radius" type="primary" @click="subFn">点我翻倍</md-button>
        </div>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'

    export default {
        name: "GPolicyDetails",
        data() {
            return {
                contNo: '',
                detailData: {},
                riskCode: '',
                elePolicyAdd: '',
                showBtn:false
            }
        },
        created() {
            this.init()
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'flag_share': 0, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': '', //分享跳转的url
                    'share_title': '', //分享标题
                    'share_text': '', //分享描述
                    'share_imgurl': '' //分享图片地址
                }, function (response) {
                })
            })
        },
        mounted() {
        },
        methods: {
            init() {
                this.contNo = this.$router.query('contNo')
                this.loadDetailDatas()
                this.getInsureNum()
            },
            getInsureNum () {
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: `/act/giftRisk/getReceiveTimes`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            if(data === 1){
                                this.showBtn = true
                            }else{
                                this.showBtn = false
                            }
                        },
                        failFn: (err) => {
                            Toast.failed(err.resultMsg)
                        }
                    })
                })
            },
            loadDetailDatas() {
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/giftRisk/getActGiftRiskDetail`,
                        userToken: userToken,
                        isLoading: true,
                        params: {
                            contNo: this.contNo
                        },
                        successFn: (data) => {
                            this.detailData = Object.assign({}, data.insuredInfo, {
                                terminationTime: data.terminationTime,
                                cvalidate: data.cvalidate,
                                contPlanCode: data.contPlanCode
                            })
                            this.riskCode = data.contPlanCode
                            this.elePolicyAdd = data.elecPolicy
                        }
                    })
                })
            },
            goElectronicPolicy() {
                let eleUrl = this.elePolicyAdd;
                if(this.$app.isMiniProgram()){
                    eleUrl = this.elePolicyAdd.replace(/http:\/\//, 'https://')
                    console.log(eleUrl)
                }
                this.$app.goPdfView(eleUrl)
            },
            toView() {
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url:`/act/giftRisk/getPolicyList`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            this.$app.goPdfView(this.elePolicyAdd)
                        },
                        failFn: (err) => {
                            Toast.failed(err.resultMsg)
                        }
                    })
                })
            },
            subFn() {
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: `/act/giftRisk/getIsInviteReceiveZJRisk`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            location.href = `/product/giving/Gbuy.html?t=${new Date().getTime()}`
                        },
                        failFn: (err) => {
                            Toast.failed(err.resultMsg)
                        }
                    })
                })
            }
        },
        filters: {
            tranPolicyName(code) {
                let codeDic = {
                    '301134': '营运火车意外伤害20万',
                    '301135': '营运汽车意外伤害10万'
                }
                return codeDic[code] || ''
            },
            tranProdName(code) {
                let codeDic = {
                    '301134': '交通工具意外险体验版',
                    '301135': '交通工具意外险体验版',
                    '301133': '一年期重大疾病保险体验版'
                }
                return codeDic[code] || ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .GPolicyDetails {
        .red {
            color: #E10312;
        }
        .content {
            width: 690px;
            padding: 30px 30px 48px;
            box-sizing: border-box;
            box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.06);
            margin: 10px auto 0;
            border-radius: 10px;

            .title {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                font-size: 32px;
                h2 {
                    font-weight: bold;
                    font-size: 32px;
                }
            }

            .list {
                li {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0;
                    font-size: 30px;

                    .value {
                        color: #8E8E8E;
                    }
                }
            }
            .godetail {
                text-align: right;
                margin-top: 48px;
                font-size: 30px;
            }
        }
        .subbtn {
            background-color: #fff;
            @extend %gm-footer;
            padding: 16px 28px 14px 32px;
        }
    }
</style>
