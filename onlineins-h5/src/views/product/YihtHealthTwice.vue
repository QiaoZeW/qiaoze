<template>
    <div class="section">
            <div class="contentMiddle">
                <div class="contentTop">
                    <h3>"百年附加医惠通费用补偿医疗保险"</h3>
                    <p>请如实告知，被保人是否有以下情形之一</p>
                </div>
                <p class="healthContent" v-html="contentDetail"></p>
            </div>


        <div class="contentBottom"  v-if="ifBtnShow">
            <p  @click="goDisagree">
                <span>部分有</span></p>
            <a @click="goBuy">以上情况全无</a>
        </div>
        <div class="contentBottom2" v-else>
            <p @click="showToast">
                <span>部分有</span>
            </p>
            <a @click="showToast">以上情况全无</a>
        </div>
        <!--icon="warn"-->
        <md-dialog
            :closable="true"
            v-model="iconDialog.open"
            title="未能通过"
            :btns="iconDialog.btns"
        >

            <p style="text-align:center;padding:10px 0;line-height:30px;">被保险人未能通过健康测试<br/>建议取消“附加医惠通责任”</p>
        </md-dialog>
    </div>
</template>

<script>
    import {Dialog, Button, Toast} from 'mand-mobile'
    import '../../assets/detail.scss'
    import {debounce} from "@/utils/utils"
    import {getRiskTypeName} from "@/utils/dictionary" // 神策数据字典
    export default {
        name: 'health',
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
        },
        data() {
            return {
                insGiftInsuranceManage: '',
                ifBtnShow: false,
                agentCode: '',
                basicDialog: {
                    open: false,
                },
                contentDetail:'',
                buyAdd:'',
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确定',
                            handler: this.onIconConfirm,
                        }/*,
                        {
                            text: '进入智能核保',
                            handler: this.onIconConfirm,
                        },*/
                    ],
                },
                warnDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                        },
                        {
                            text: '警示操作',
                            warning: true,
                        },
                    ],
                },
                riskName:'',
                product_id:'',
                agreeHealth:false,
                PAWithRule:"",
                subRiskCode:"",
                riskCode:''
            }
        },
        created(){
            this.riskCode = localStorage.getItem("riskCode");
            this.product_id = this.$router.query('product_id')
            // this.insGiftInsuranceManage = window.localStorage.getItem("insGiftInsuranceManage")
            // this.PAWithRule = JSON.parse(window.localStorage.getItem("PAWithRule"))
            // console.log("PAWithRule",this.PAWithRule)
            // if(this.PAWithRule.policyInfoList){
            //    for(let i=0;i<this.PAWithRule.policyInfoList.length;i++){
            //        if(this.PAWithRule.policyInfoList[i].dutyCode == "5909D1"){
            //            this.subRiskCode = this.PAWithRule.policyInfoList[i].dutyCode
            //        }
            //    }
            // }
            // console.log("subRiskCode",this.subRiskCode)
            this.$app.wxProductDetail(this.product_id, 1)
            this.agentCode = this.$router.query('agentCode')
            this.loadPrice()
            //判断是否为代理人，跳转不同路径
            if (this.agentCode==='') {
               this.buyAdd = "Buy.html?product_id=" + this.product_id;
            }else{
               this.buyAdd = "Buy.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
            }
            this.goBuy = debounce(this.goBuy
            )
        },
        mounted(){
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
            loadPrice() {
                this.$request({
                    url: `/ins/product/getHealthInfo/${this.product_id}`,
                    params: {
                    riskFlag: "S"                //M主险，S附加险，G赠险
                },
                successFn: data => {
                    for(let i=0;i<data.length;i++){
                        if(data[i].riskCode == "5031"){
                            this.contentDetail  = data[i].healthNotification
                        }
                    }
                },
                errorFn: () => {
                    this.showWhirl = false;
                    this.showError = true;
                }
                });
            },
            goDisagree(){
                this.iconDialog.open = true
                this.agreeHealth = false
                this.shenceHealthNotify(()=>{

                })
            },
            goBuy(){
                this.agreeHealth = true
                this.shenceHealthNotify(()=>{
                    location.href = this.buyAdd
                })
            },
            shenceHealthNotify(callback) {
                sensors.track("yl_health_notify", {
                    risk_type: "医疗",
                    risk: "百年附加医惠通费用补偿医疗保险" ,
                    notify_name:`"百年附加医惠通费用补偿医疗保险"`,//notify_name	健告名称
                    health_notify_type: "投保人",
                    secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                    if_continue_process:this.agreeHealth
                },callback);
            },
            onBasicConfirm() {
                /*  Toast({
                      content: '你点击了确认',
                  })*/
                this.basicDialog.open = false
            },
            onIconConfirm() {
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
                }
                this.iconDialog.open = false
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .section{
        background: #fff;
        padding-bottom: px2em(150px);
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
            background: rgba(255, 246, 246, 1);
            color: rgba(113, 92, 92, 1);
        }
        h3{
            font-size: 34px;
            font-weight: bold;
            padding-top: 20px;
            color: #333;
            text-align: center;
            line-height:48px;
        }
    }
    /*.contentBottom{
        display: flex;
        height: 118px;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        background: #fff;
        z-index: 100 !important;
        bottom: 0;
        border-top: 1px solid #eee;
        p{
            color:#333;
            background: #ffffff;
            text-align: center;
            font-size: 30px;
        }
        a{
            line-height: 100px;
            background: rgb(215,0,15);
            text-align: center;
            font-size: 34px;
            color: #fff;
        }
        .partOne,.partTwo{
            height: 88px;
            line-height: 1.2rem;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            margin: 15px 0;
            width: 320px;
            border: 1px solid rgb(215,0,15);
        }
        .partOne{
            color: rgb(215,0,15);
            margin-left: 26px;
        }
        .partTwo{
            background: rgb(215,0,15);
            color: #fff;
            margin-right: 26px;
        }
    }*/
    .contentBottom{
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
    .blank{
        height: .4rem ;
        background: #f3f3f3;
        width: 100%;
    }
    .parT{
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 32px;
        line-height: 50px;
        font-weight: bold;
    }
    .parS{
        color:  rgb(215,0,15);
    }
    .proposer{
        color:  rgb(215,0,15) !important;
    }
    .healthTitle{
        margin-top: .5rem;
        text-align: center;
        width: 100%;
        padding: 0 !important;
        font-size: 14px !important;
        font-weight: bold;
        color: #666!important;
    }
    .contentTop{
        margin: 0 0.4rem ;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        height:214px;
        background: rgba(247, 99, 94, 1);
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
            white-space: nowrap;
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
</style>
<style>
    .md-dialog-btn:last-child {
        background: rgba(225, 3, 18, 1) !important;
        color: rgba(255, 255, 255, 1) !important;
    }
    .md-dialog-actions {
        width:402px !important;
        height:88px !important;
        margin:auto !important;
        margin-bottom: 48px !important;
    }
</style>
