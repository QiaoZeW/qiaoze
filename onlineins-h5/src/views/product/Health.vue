<template>
    <div class="section">
        <div class="contentMiddle">
            <div class="contentTop">
                <h3>"{{riskName}}"<span v-if="socialSecurity=='是'">，</span></h3>
				<h3 v-if="socialSecurity=='是' && riskCode != '1318'">"百年附加医惠通费用补偿医疗保险"</h3>
                <p>请如实告知，被保人是否有以下情形之一</p>
            </div>
            <p :class="setClass" v-html="contentDetail"></p>
        </div>

        <div class="contentBottom" v-if="ifBtnShow">
            <p v-if="socialSecurity=='是'" @click="goDisagree">
                <span>部分有</span>
            </p>
			<p v-else @click="goIntelligence">
			    <span>部分有</span>
			</p>
            <a @click="goBuyPage">以上情况全无</a>
        </div>
        <div class="contentBottom2" v-else>
			<p @click="showToast">
			    <span>部分有</span>
			</p>
            <a @click="showToast">以上情况全无</a>
        </div>
        <!--icon="warn"-->
        <md-dialog
            :closable="false"
            v-model="iconDialog.open"
            title="本产品支持智能核保和人工核保"
            :btns="iconDialog.btns"
            v-if="showIntelligence"
        >
            <p>
                本产品支持
                <span class="parS">被保险人的智能核保和人工核保(不支持投保人，投保人如不符合健康告知则无法附加投保人豁免)。</span>
            </p>
            <h2 class="parT">* 智能核保</h2>
            <p>仅限健康相关的问题，通过两层疾病勾选，回答疾病问卷，即可在线直接得出核保结论。方便、快捷、专业。</p>
            <h2 class="parT">* 人工核保</h2>
            <p>请先申请智能核保。如果智能核保没有您需要了解的疾病或系统建议您申请人工核保，您可根据页面指引提交人工核保相关资料，我们将会向保险公司确认并及时反馈核保结论。</p>

            <!-- <p>被保险人未能通过健康测试，暂无法购买此产品</p> -->
        </md-dialog>


        <md-dialog
			class="warnDialog"
            :closable="true"
            v-model="warnDialog.open"
            title="未通过"
            :btns="warnDialog.btns"
        >

            <p>被保险人未能通过健康测试，暂无法购买此产品</p>
        </md-dialog>
		<md-dialog
			class="iconDialog1"
		    :closable="true"
		    v-model="iconDialog1.open"
		    title="未能通过"
		    :btns="iconDialog1.btns"
		>

		    <p style="text-align:center;padding:10px 0;line-height:30px;">被保险人未能通过健康测试<br/><span v-if="riskCode != '1318'">建议取消“附加医惠通责任”</span></p>
		</md-dialog>
    </div>
</template>

<script>
    import {Dialog, Button, Toast} from "mand-mobile";
    import "../../assets/detail.scss";
    import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
    import { getProdFlag, debounce } from "@/utils/utils"

    export default {
        name: "health",
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button
        },
        data() {
            return {
				socialSecurity: '',
                ifBtnShow: false,
                showZNHB: false,
				agentCode: '',
                basicDialog: {
                    open: false
                },
                isBrowser: false,
                contentDetail: "",
                buyAdd: "",
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: "取消"
                        },
                        {
                            text: "进入智能核保",
                            handler: this.onIconConfirm
                        }
                    ]
                },
				iconDialog1: {
				    open: false,
				    btns: [
				        {
				            text: '确定',
				            handler: this.goTrial
				        }
				    ],
				},
                warnDialog: {
                    open: false,
                    btns: [
                        {
                            text: "取消",
                        }
                    ]
                },
                riskName: "",
                product_id: "",
                localdata: null,
                riskCode: '',
                showIntelligence: false,
                agreeHealth:false,
                riskInfo:{},
                setClass:'healthContent',
                debounceFlag: true
            };
        },
        created() {
            this.product_id = this.$router.query("product_id");
            this.$app.wxProductDetail(this.product_id, 1)
            this.agentCode = this.$router.query("agentCode");
            this.localdata = JSON.parse(localStorage.getItem("PAWithRule"));
            let policyInfoList = this.localdata.policyInfoList;
            for (let i = 0; i < policyInfoList.length; i++) {
                if (policyInfoList[i].dutyCode == "5031D1") {
                    this.socialSecurity = "是";
                }
            }
            this.isBrowser = this.$app.isBrowser()
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            //this.contentDetail = JSON.parse(localStorage.getItem("guarantee"));
            this.loadPrice()
            // this.getRiskCode();
            getProdFlag (this.product_id, (flagData, riskInfo) => {
                this.showIntelligence = flagData.smartUwFlag
                this.riskInfo = riskInfo
            })
            this.$app.showCustomerIntelligence((data) => {
                this.showZNHB = data.showZNHB
            })
            this.clearStoragy()
            this.goIntelligence = debounce(this.goIntelligence)
            this.goBuyPage = debounce(this.goBuyPage)
        },
        mounted(){
              if (process.env.NODE_ENV !== 'production'){
                this.setClass='healthContent watermark';

            }

            window.addEventListener("scroll", this.handleScroll);
        },
        updated(){
           if(this.getScrollHeight() <= this.getClientHeight()){
               this.ifBtnShow = true;
           }
        },
        destroyed() {
          window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            showToast() {
              Toast.failed("请上滑至页面底部");
            },
            handleScroll() {
              this.$nextTick(() => {
                let scrollTop =
                  window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop;
                  console.log("scrollTop",scrollTop)
                  console.log("getClientHeight",this.getClientHeight())
                  console.log("getScrollHeight",this.getScrollHeight())
                if(scrollTop + this.getClientHeight() >= (this.getScrollHeight()-130)) {
                    this.ifBtnShow = true;
                }
              });
            },
             //获取当前可视范围的高度
            getClientHeight() {
                var clientHeight = 0;
                if(document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                } else {
                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                }
                return clientHeight;
            },
             //获取文档完整的高度
            getScrollHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            },
            onIconConfirm() {
                if (!this.debounceFlag) return
                if (this.debounceFlag) {
                  this.debounceFlag = false
                }
                setTimeout(() => {
                  this.debounceFlag = true
                }, 500)
				if (this.agentCode) {
					location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
					// location.href = "/product/intelligentunderwriting?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
				} else{
					location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id;
				}
            },
			goDisagree(){
				this.iconDialog1.open = true
			},
			goTrial() {
                this.agreeHealth = false
                if(this.riskCode == "1318"){
                    if (this.agentCode) {
                        window.location.href =
                            this.$router.siteUrl() +
                            "/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
                            this.product_id +
                            "&agentCode=" +
                            this.agentCode;
                    } else {
                        window.location.href =
                            this.$router.siteUrl() +
                            "/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
                            this.product_id;
                    }
                }else{
                    this.loadShenceData(this.riskInfo,()=>{
                        if (this.riskCode == "5317") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
                                    this.product_id;
                            }
                        } else if (this.riskCode == "5319") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
                                    this.product_id;
                            }
                        } else if (this.riskCode === "5305" || this.riskCode === "5307") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/Trial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/Trial.html?product_id=" +
                                    this.product_id;
                            }
                        } else if (this.riskCode == "5313") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/PlusTrial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/PlusTrial.html?product_id=" +
                                    this.product_id;
                            }
                        } else if (this.riskCode == "5318") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/kangbeyond/KangBeyondTrial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/kangbeyond/KangBeyondTrial.html?product_id=" +
                                    this.product_id;
                            }
                        } else if (this.riskCode == "5314") {
                            if (this.agentCode) {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/KangluxuryTrial.html?product_id=" +
                                    this.product_id +
                                    "&agentCode=" +
                                    this.agentCode;
                            } else {
                                window.location.href =
                                    this.$router.siteUrl() +
                                    "/product/KangluxuryTrial.html?product_id=" +
                                    this.product_id;
                            }
                        }
                    });
                }

			},
            goIntelligence() {
                this.agreeHealth = false
                var riskInfoStr = JSON.stringify(this.riskInfo)
                localStorage.setItem('shence_riskInfo_data_riskType',riskInfoStr)
                if(this.riskCode == "1318"){
                   if (this.showIntelligence) {
                       /*体外屏蔽*/
                       if (this.isBrowser) { //app内部
                           this.iconDialog.open = true
                       } else {
                           // 智能核保入口判断
                           if (this.showZNHB) {
                               this.iconDialog.open = true
                           } else {
                               this.warnDialog.open = true
                           }
                       }
                   } else {
                       this.warnDialog.open = true
                   }
                }else{
                   this.loadShenceData(this.riskInfo,()=>{
                       // this.warnDialog.open = true
                       //判断是否是康惠保
                       if (this.showIntelligence) {
                           /*体外屏蔽*/
                           if (this.isBrowser) { //app内部
                               this.iconDialog.open = true
                           } else {
                               // 智能核保入口判断
                               if (this.showZNHB) {
                                   this.iconDialog.open = true
                               } else {
                                   this.warnDialog.open = true
                               }
                           }
                       } else {
                           this.warnDialog.open = true
                       }
                   });
                }
            },
            loadShenceData(data,callback) {
                const { riskSubType, riskName, riskCode } = data;
                let riskTypeName = getRiskTypeName(riskCode,riskSubType);
                let notify_name = `"${riskName}"`+(this.socialSecurity=='是'?'，百年附加医惠通费用补偿医疗保险':'');
                if(riskSubType == 'HE'){
					if (riskCode == "5315" || riskCode == "5316"|| riskCode == "5032"||riskCode == "5323"||riskCode == "5324"||riskCode == "5325") {
						sensors.track("yl_health_notify", {
						    risk_type: riskTypeName,
						    risk: riskName ,
                            notify_name:notify_name,//notify_name	健告名称
                            health_notify_type: "被保人",
                            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                            //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
						    if_continue_process:this.agreeHealth
						},callback);
					} else{
						sensors.track("zj_health_notify", {
						    risk_type: riskTypeName,
						    risk: riskName ,
                            notify_name:notify_name,//notify_name	健告名称
						    health_notify_type: "被保人",
                            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                            //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
						    if_continue_process:this.agreeHealth
						},callback);
					}
                }else if(riskSubType == 'LF'){
                    sensors.track("rs_health_notify", {
                        risk_type: riskTypeName,
                        risk: riskName ,
                        notify_name:notify_name,//notify_name	健告名称
                        health_notify_type: "被保人",
                        secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                        //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
                        if_continue_process:this.agreeHealth
                    },callback);
                }

            },
            loadPrice() {
                this.$request({
                    url: `/ins/product/getHealthInfo/${this.product_id}`,
                    params: {
                        riskFlag: "M"           //M主险，S附加险，G赠险
                    },
                    successFn: (data) => {
                        console.log(data[0]);
						this.riskCode = data[0].riskCode
						this.contentDetail  = data[0].healthNotification
                        //判断是否为代理人，跳转不同路径
                        if(this.riskCode == "1318"){
                           if(this.socialSecurity == "是"){
                              if (this.agentCode==='') {
                                 this.buyAdd = "YihtHealthTwice.html?product_id=" + this.product_id;
                              }else{
                                 this.buyAdd = "YihtHealthTwice.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
                              }
                           }else{
                              if (this.agentCode==='') {
                                 this.buyAdd = "Buy.html?product_id=" + this.product_id;
                              }else{
                                 this.buyAdd = "Buy.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
                              }
                           }
                        }else{
                           if (this.agentCode==='') {
                              this.buyAdd = "Buy.html?product_id=" + this.product_id;
                           }else{
                              this.buyAdd = "Buy.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
                           }
                        }
                    },
                    errorFn: () => {
                        this.showWhirl = false;
                        this.showError = true;
                    }
                });
            },
            clearStoragy () {
                if (localStorage.getItem('HealthNotification')) {
                    localStorage.removeItem('HealthNotification')
                }
                if (localStorage.getItem('ZNHBbodyInfo')) {
                    localStorage.removeItem('ZNHBbodyInfo')
                }
                this.$app.getUserCode(userCode => {
                    if (localStorage.getItem("underwriteInfo" + userCode + this.product_id)) {
                        localStorage.removeItem("underwriteInfo" + userCode + this.product_id);
                    }
                });
            },
            goBuyPage() {
                var riskInfoStr = JSON.stringify(this.riskInfo)
                localStorage.setItem('shence_riskInfo_data_riskType',riskInfoStr)
                this.agreeHealth = true
                if(this.riskCode == "1318"){
                   window.location.href = this.buyAdd;
                }else{
                   this.loadShenceData(this.riskInfo,()=>{
                    window.location.href = this.buyAdd;
                });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center #fff9f6 !important;
        background-size: 100% auto!important;
    }
    .section {
        background: #fff;
        padding-bottom: px2em(150px);
    }
    .contentTop {
        margin: 0 0.4rem ;
        height:214px;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        // height:174px;
        text-align: center;
        background: rgba(247, 140, 94, 1);
        -webkit-border-radius: 10px 10px 0 0;
        -moz-border-radius: 10px 10px 0 0;
        border-radius: 10px 10px 0 0;
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        h3 {
            color: rgba(255, 255, 255, 1);
            height:50px;
            font-size:34px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            line-height:50px;
            padding-top:36px;
        }
        p{
            padding: 12px 32px 36px;
            height:80px;
            font-size:26px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color: rgba(255, 255, 255, 1);
            line-height:40px;
            text-align: center;
        }
    }

    .contentMiddle{
        color: #666;
        background: #fff;
        /*margin-bottom: 150px;*/
        .healthContent{
            font-size: 26px;
            padding:36px 32px 0;
            line-height: 45px;
            margin: 0 0.4rem ;
            background: rgba(255, 249, 246, 1);
            color: rgba(113, 99, 92, 1);
        }
        h3{
            font-size: 34px;
            font-weight: 500;
            padding-top: 48px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height:48px;
        }
    }

    .contentBottom {
        display: flex;
        height: 120px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        align-items:center;
        bottom: 0;
        background: #ffffff;
        p{
            flex: 1;
            height: 80px;
            line-height: 80px;
            justify-content:center;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
        a{
            flex: 1;
            height: 80px;
            line-height: 80px;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
    }
    .contentBottom2{
        display: flex;
        height: 120px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        align-items:center;
        bottom: 0;
        background: #ffffff;
        p{
            flex: 1;
            height: 80px;
            line-height: 80px;
            justify-content:center;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
        a{
            flex: 1;
            height: 80px;
            line-height: 80px;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
    }
    .blank {
        height: 0.4rem;
        background: #f3f3f3;
        width: 100%;
    }

    .parT {
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 32px;
        line-height: 50px;
        font-weight: bold;
    }

    .parS {
        color: rgb(215, 0, 15);
    }

    .proposer {
        color: rgb(215, 0, 15) !important;
    }
</style>
<style>
	.md-dialog-btn:last-child {
	    background: rgba(225, 3, 18, 1) !important;
	    color: rgba(255, 255, 255, 1) !important;
	}
	.warnDialog .md-dialog-actions {
	    width:402px !important;
	    height:88px !important;
	    margin:auto !important;
	    margin-bottom: 48px !important;
        margin-top: 30px !important;
	}
	.iconDialog1 .md-dialog-actions {
	    width:402px !important;
	    height:88px !important;
	    margin:auto !important;
	    margin-bottom: 48px !important;
	}
</style>
