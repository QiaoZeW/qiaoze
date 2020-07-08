<template>
    <div class="section fail-wrap">
        <div class="failimg">
            <img src="@/assets/imgs/intelligentunderwrite/sucess.png" alt="这是一张图片未显示">
        </div>
        <div class="text-content">为了进一步了解您的健康状况，我们会对您进行人工核保，请知悉</div>
        <div class="text-content" v-if="EXInfo">
            <p class="tip">本次核保结果对以下疾病所导致的保险事故不承担赔付责任。</p>
            <div class="exclusions" v-html="EXInfo"></div>
        </div>
        <div class="text-content" v-if="ERRInfo">
            <div class="exclusions" v-html="ERRInfo"></div>
        </div>
        <div class="btns-exinfo" v-if="EXInfo">
            <md-button type="default" @click="noagree" style="margin-bottom: 15px;" v-if="isBrowser">放弃</md-button>
            <md-button type="primary" @click="agree">继续</md-button>
        </div>
        <div class="btns" v-else>
            <md-button type="default" @click="noagree" style="margin-bottom: 15px;" v-if="isBrowser">放弃</md-button>
            <md-button type="primary" @click="agree">继续</md-button>
        </div>
    </div>
</template>

<script>
    import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
    import { debounce } from "@/utils/utils"
    export default {
        name: "Fail",
        components: {},
        data() {
            return {
                EXInfo:"",
                ERRInfo : "",
                riskInfo:{},
				agentCode:"",
                failReason: "",
                product_id: '',
                orderNo: '',
                prtNo: '',
                antiMoneyFlag: '',
                isBrowser:true,
                subDatas: {
                  orderNo: "",
                  prtNo: "",
                  userCode: ""
                }
            };
        },
        created() {
            this.init();
            this.loadProDetail();
            this.noagree = debounce(this.noagree)
            this.agree = debounce(this.agree)
        },
        methods: {
            loadProDetail() {
                var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType")) || {}
                this.riskInfo = riskInfoObj;
            },
            init() {
                this.isBrowser = this.$app.isBrowser()
                this.orderNo = this.$router.query("orderNo") // prtNo
                this.prtNo = this.$router.query("prtNo")
                this.antiMoneyFlag = this.$router.query("antiMoneyFlag")
                this.orderNo ? document.title = "确认" : document.title = "智能核保"
				this.agentCode = this.$router.query("agentCode");
                this.product_id = this.$router.query("product_id") || 1; //todo 产品id不能写死
                this.$app.wxProductDetail(this.product_id, 1)
                this.subDatas.orderNo = this.orderNo
                this.subDatas.prtNo = this.prtNo
                this.EXInfo = localStorage.getItem("EXInfoQ");
                this.ERRInfo = localStorage.getItem("ERRInfo");
                this.$app.getUserCode((userCode) => {
                  this.subDatas.userCode = userCode;
                });
                this.$app.if20Access((flag) => {
                    if (!flag) {
                        this.antiMoneyFlag = 'N'
                    }
                })
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHomeConfig', {
                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                    }, function (response) {
                    });
                })
            },
			manualShenceData(data){
                const { riskSubType, riskName, riskCode } = this.riskInfo;
                let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
				sensors.track("manual_review", {
                    secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
					agree_yn:data,
                    risk_type: riskTypeName,
                    risk: riskName
				});
			},
            agree() {
				this.manualShenceData(true);
                if (this.prtNo && this.orderNo) {
                    this.saveMoreImpartinfo ()
                } else {
                    if (this.agentCode) {
                     window.location.href = `/product/HealthNotification.html?product_id=${this.product_id}&agentCode=${this.agentCode}&orderNo=${this.orderNo}&prtNo=${this.prtNo}`;
                    } else{
                     window.location.href = `/product/HealthNotification.html?product_id=${this.product_id}&orderNo=${this.orderNo}&prtNo=${this.prtNo}`;
                    }
                }

            },
            noagree() {
				this.manualShenceData(false);
                this.$app.getUserCode((userCode) => {
                    this.clearStorage('underwriteInfo' + userCode + this.product_id)
                })
                var that = this;
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler("backHome", {id: 2}, function (responseData) {
                        that.iconDialog.open = true;
                    });
                });
            },
            saveMoreImpartinfo () {
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/contract/saveMoreImpartinfo`,
                        contentType: 'application/json;charset=UTF-8',
                        method: 'POST',
                        userToken:userToken,
                        isLoading: true,
                        data: this.subDatas,
                        successFn: data => {
                          if (localStorage.getItem('HealthNotification')) {
                              localStorage.removeItem('HealthNotification')
                          }
                          if (localStorage.getItem("underwriteInfo" + this.userCode + this.product_id)) {
                              localStorage.removeItem("underwriteInfo" + this.userCode + this.product_id);
                          }
                          if (this.antiMoneyFlag === 'Y') {
                            window.location.href = `/product/UploadIDcard.html?status=2&product_id=${this.product_id}&orderNo=${this.orderNo}&prtNo=${this.prtNo}`
                          } else {
                            if (this.agentCode) {
                              window.location.href = this.$router.siteUrl() + '/product/HumanNucleusSuccess.html?orderNo=' + this.orderNo + "&agentCode=" + this.agentCode
                            } else{
                              window.location.href = this.$router.siteUrl() + '/product/HumanNucleusSuccess.html?orderNo=' + this.orderNo
                            }
                          }
                        },
                        failFn: data => {
                          Toast.failed('提交失败，请稍后再试')
                        }
                    })
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .fail-wrap {
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;

        .failimg {
            width: 264px;
            height: 268px;
            margin: 76px auto;

            img {
                width: 100%;
                height: 100%;
            }
        }
        .text-content {
            padding: 15px 50px;
            text-align: center;
            font-size: 30px;
            line-height: 50px;
            color: #333;
        }
        .btns-exinfo{
            padding: 103px 30px 166px;
        }
        .btns {
            padding: 206px 30px 166px;
        }
    }
</style>
