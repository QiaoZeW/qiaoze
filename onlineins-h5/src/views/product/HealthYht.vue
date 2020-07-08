<template>
    <div class="section">
        <div class="contentMiddle">
            <div class="contentTop">
                <h3>"药惠通抗癌特药险"</h3>
                <p>请如实告知，被保人是否有以下情形之一</p>
            </div>
            <p :class="setClass" v-html="contentDetail"></p>
        </div>
        <div class="contentBottom"  v-if="ifBtnShow">
            <p  @click="goDisagree(0)">
                <span>部分有</span></p>
            <a @click="goBuy(1)">以上情况全无</a>
        </div>
        <div class="contentBottom2" v-else>
            <p @click="showToast">
                <span>部分有</span>
            </p>
            <a @click="showToast">以上情况全无</a>
        </div>
		<md-dialog :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">
		  <p>非常抱歉，您的健康情况不符合药惠通抗癌特药险的投保要求，请您理解！</p>
		</md-dialog>
    </div>
</template>

<script>
    import {Dialog, Button, Toast} from 'mand-mobile'
    import {debounce} from "@/utils/utils"
    import '../../assets/detail.scss'

    export default {
        name: 'health',
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
        },
        data() {
            return {
                cpsCode:'',
                ifBtnShow: false,
                agentCode: '',
				basicDialog: {
				  open: false,
				  btns: [
				    {
				      text: "我知道了",
				      handler: this.closeBasicDialog
				    }
				  ]
				},
                contentDetail:'',
                buyAdd:'',
                riskName:'',
                product_id:'',
                riskCode:'',
                showChildHealth:false,
                setClass:'healthContent',
                agreeHealth:false
            }
        },
        created(){
            this.product_id = this.$router.query('product_id')
            this.$app.wxProductDetail(this.product_id, 1)
            this.agentCode = this.$router.query('agentCode')
            this.cpsCode = localStorage.getItem('cps_secondaryDistributor');
            this.loadPrice()
            //判断是否为代理人，跳转不同路径
            if (this.agentCode==="") {
               this.buyAdd = 'Health.html?product_id='+this.product_id
            }else{
               this.buyAdd = 'Health.html?product_id=' + this.product_id + "&agentCode=" + this.agentCode;
            }
            this.goBuy = debounce(this.goBuy)
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
                    riskFlag: "G"                //M主险，S附加险，G赠险
                },
                successFn: data => {
                    console.log(data);
                    this.contentDetail  = data[0].healthNotification
                },
                errorFn: () => {
                    this.showWhirl = false;
                    this.showError = true;
                }
                });
            },
			closeBasicDialog(){
				this.shenceHealthNotify(()=>{
				    location.href = this.buyAdd
				})
			},
            goDisagree(value){
                console.log(value)
                this.agreeHealth=false;
                window.localStorage.setItem("ifGift",value);
				this.basicDialog.open = true;
            },
            goBuy(value){
                console.log(value)
                this.agreeHealth=true;
                window.localStorage.setItem("ifGift",1)
                this.shenceHealthNotify(()=>{
                    location.href = this.buyAdd
                })
            },
            shenceHealthNotify(callback) {
                sensors.track("yl_health_notify", {
                    risk_type: "医疗",
                    risk: "药惠通抗癌特药险" ,
                    notify_name:`"药惠通抗癌特药险"健康告知`,//notify_name	健告名称
                    health_notify_type: "投保人",
                    secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                    if_continue_process:this.agreeHealth
                },callback);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
     .watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center rgba(247, 250, 255, 1) !important;
        background-size: 100% auto!important;
    }
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
            background: rgba(247, 250, 255, 1);
            color: rgba(92, 99, 113, 1);
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
        height:174px;
        background: rgba(74, 136, 229, 1);
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
</style>
