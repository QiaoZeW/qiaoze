<template>
    <div class="section">
        <div class="contentMiddle">
            <h3>
                <span class="colorword">{{insuredName}}</span><span class="colorword" v-if="sex == '0'">先生</span><span class="colorword" v-else>女士</span>
                <span class="proposer">，请如实告知以下情况：</span>
            </h3>
            <p class="content" v-html="contentDetail"></p>
        </div>

        <div class="contentBottom">
            <p @click="popFail">
                <span>部分有</span>
            </p>
            <a @click="goGetsuccess">以上情况全无</a>
        </div>


        <md-dialog
          v-if="popShow"
          class="popFail"
          :closable="true"
          v-model="basicDialog.open"
          :btns="basicDialog.btns"
        >
          {{dialogContent}}
        </md-dialog>

        <md-dialog
          v-else
          title="领取失败"
          :closable="true"
          v-model="basicDialog.open"
          :btns="basicDialog.btns"
        >
          {{dialogContent}}
        </md-dialog>

        <md-dialog
            v-if="outbreakShow"
            class="miniappDialog"
            title="领完了"
            :closable="true"
            v-model="outbreakDialog.open"
            :btns="outbreakDialog.btns"
        >
           <div class="line1">很抱歉！免费份额已被领完了！</div>
            <div class="line2">众志成城，共抗疫情</div>
            <div class="line3"><b>药惠通新增<br/>新冠肺炎危重型给付10万康复津贴</b></div>
        </md-dialog>
    </div>
</template>

<script>
    import {Dialog, Button, Toast} from "mand-mobile";
    import "../../../assets/detail.scss";
    import { getProdFlag, debounce } from "@/utils/utils"

    export default {
        name: "health",
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button
        },
        data() {
            return {
                popShow:false,
                outbreakShow:false,
                secondaryDistributor:'',
                thirdClassDistributor:'',
                productRiskId:'',
                erroMessage:'',
                sex:'',
                insuredName:'',
                dialogContent: '',
                subData: {},
                showZNHB: false,
				agentCode: '',
                isBrowser: false,
                contentDetail: "",
                buyAdd: "",
                outbreakDialog: {
                    open: false,
                    btns: [
                        {
                        text: '27元起 立即购买',
                        handler: this.onOutbreakConfirm,
                        },
                    ],
                },
                basicDialog: {
                  open: false,
                  btns: [
                    {
                      text: '确认',
                      handler: this.onBasicConfirm,
                    },
                  ],
                },
                riskName: "",
                localdata: null,
                riskCode: '',
                agreeHealth:false,
                riskInfo:{},
                debounceFlag: true
            };
        },
        created() {
            document.title = '百年抗癌特药险'
            this.subData = JSON.parse(localStorage.getItem("subData"));
            console.log(this.subData)
            this.productRiskId = this.$router.query("productRiskId");
            this.secondaryDistributor = this.$router.query("secondaryDistributor");
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor");
            this.sex = this.subData.actGiftRiskDTO.insuredInfo.sex;
            this.insuredName = this.subData.actGiftRiskDTO.insuredInfo.name;
            this.agentCode = this.$router.query("agentCode");
            this.isBrowser = this.$app.isBrowser()
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            this.loadPrice()
            this.goGetsuccess = debounce(this.goGetsuccess)
            this.popFail = debounce(this.popFail)
        },
        methods: {
            /**
             * 赠险健康告知埋点
             * @param properties
             * @param callback
             */
            shenceZxHealthNotify(properties,callback){
                sensors.track("zx_health_notify",properties,callback);
            },
            onBasicConfirm() {
              window.location.href = this.$router.siteUrl() +'/product/giftInsurance/GiftInsuranceDetail.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor;
            },
            onOutbreakConfirm() {
                let productId = process.env.NODE_ENV === "production"?'132':process.env.NODE_ENV === "uat"?'130':'186';
                let url = this.$router.siteUrl() + '/product/Detail.html?product_id='+productId+'&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor
                wx.miniProgram.navigateTo({url:`/pages/w?u=${encodeURIComponent(url)}`});
            },
            onBasicCancel() {
              this.basicDialog.open = false
            },
            goGetsuccess() {
                var _this = this;
                if(this.erroMessage == 'SYS_ERROR_0097'){
                    //增加神策健康告知埋点
                    _this.shenceZxHealthNotify({
                        gift_name:document.title,	//产品名称
                        insured_id_no:	_this.subData.actGiftRiskDTO.insuredInfo.idNo,//被投保人证件号
                        insured_mobile:	_this.subData.actGiftRiskDTO.insuredInfo.mobile,//被投保人联系电话
                        health_notify_result:"以上情况全无",	//健康告知结果
                        if_continue_process:false,	//是否继续投保
                        secondaryDistributor:_this.secondaryDistributor
                    },()=>{
                        if (_this.secondaryDistributor==='miniapp') {
                            //小程序中弹出
                            this.outbreakShow = true
                            this.outbreakDialog.open =  true
                        } else {
                            this.basicDialog.open = true
                            this.dialogContent = '一份都不剩了~'
                        }
                    });
                    return false
                }

                var userToken = localStorage.getItem('userToken')
                 _this.$request({
                     url: `/act/giftRisk/giftRisk`,
                     method: 'POST',
                     isLoading:true,
                     userToken:userToken,
                     contentType: 'application/json;charset=UTF-8',
                     data: _this.subData,
                     successFn: (data) => {
                         //渲染成功页
                         window.localStorage.setItem('successfulData',JSON.stringify(data.data))
                         //增加神策健康告知埋点
                         _this.shenceZxHealthNotify({
                                 gift_name:document.title,	//产品名称
                                 insured_id_no:	_this.subData.actGiftRiskDTO.insuredInfo.idNo,//被投保人证件号
                                 insured_mobile:_this.subData.actGiftRiskDTO.insuredInfo.mobile,//被投保人联系电话
                                 health_notify_result:"以上情况全无",	//健康告知结果
                                 if_continue_process:true,	//是否继续投保
                                 secondaryDistributor:_this.secondaryDistributor
                             },()=>{
                             window.location.href = _this.$router.siteUrl() +'/product/giftInsurance/GiftSuccessful.html?productRiskId=' + _this.productRiskId + '&secondaryDistributor=' + _this.secondaryDistributor + '&thirdClassDistributor=' + _this.thirdClassDistributor;
                         });
                     },
                     failFn: (data) => {
                         //增加神策健康告知埋点
                         _this.shenceZxHealthNotify({
                             gift_name:document.title,	//产品名称
                             insured_id_no:	_this.subData.actGiftRiskDTO.insuredInfo.idNo,//被投保人证件号
                             insured_mobile:_this.subData.actGiftRiskDTO.insuredInfo.mobile,//被投保人联系电话
                             health_notify_result:"以上情况全无",	//健康告知结果
                             if_continue_process:false,	//是否继续投保
                             secondaryDistributor:_this.secondaryDistributor
                         },()=>{
                             this.dialogContent = data.resultMsg
                             if(data.resultCode == 'SYS_ERROR_0097'){
                                 if (this.secondaryDistributor==='miniapp') {
                                     //小程序中弹出
                                     this.outbreakShow = true
                                     this.outbreakDialog.open =  true
                                 } else {
                                     this.basicDialog.open = true
                                     this.dialogContent = data.resultMsg
                                 }
                             }else{
                                 this.basicDialog.open = true
                                 this.dialogContent = data.resultMsg
                             }

                         });

                     },
                 })
            },
            loadPrice() {
                this.$request({
                    url: `/ins/product/getInsGiftInfo/${this.productRiskId}`,
                    params: {
                        cpsCode: this.secondaryDistributor
                    },
                    successFn: (data) => {
                        console.log(data);
                        this.contentDetail  = data.healthNotification
                    },
                    failFn: (data) => {
                        this.dialogContent = data.resultMsg
                        this.erroMessage = data.resultCode
                        this.showWhirl = false;
                        this.showError = true;
                        if(this.erroMessage == 'SYS_ERROR_0097'){
                            if (this.secondaryDistributor==='miniapp') {
                                //小程序中弹出
                                this.outbreakShow = true
                                this.outbreakDialog.open =  true
                            } else {
                                this.basicDialog.open = true
                                this.dialogContent = '一份都不剩了~'
                            }
                        }else{
                            this.basicDialog.open = true
                        }
                    },
                    errorFn: (data) => {
                        this.basicDialog.open = true
                        this.dialogContent = "您的网路开小差啦"
                        this.showWhirl = false;
                        this.showError = true;
                    }
                });
            },
            popFail() {
                var that = this
                //增加神策健康告知埋点
                that.shenceZxHealthNotify({
                    gift_name:document.title,	//产品名称
                    insured_id_no:	that.subData.actGiftRiskDTO.insuredInfo.idNo,//被投保人证件号
                    insured_mobile:	that.subData.actGiftRiskDTO.insuredInfo.mobile,//被投保人联系电话
                    health_notify_result:"部分有",	//健康告知结果
                    if_continue_process:false,	//是否继续投保
                    secondaryDistributor:that.secondaryDistributor
                },()=>{
                    this.popShow = true
                    this.basicDialog.open = true
                    this.dialogContent = '您不符合本产品的健康标准，暂时无法领取'

                });

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/app";

    .section {
        background: #fff;
        padding-bottom: px2em(150px);
    }

    .contentTop {
        background: #fff;
        color: #666;
        font-size: 28px;
        line-height: 45px;
        p {
            margin: 30px;
            margin-bottom: 0;
            padding-bottom: 20px;
        }
    }

    .contentMiddle {
        color: #666;
        background: #fff;
        /*margin-bottom: 150px;*/
        p {
            font-size: 28px;
            padding: 0px 41px 0;
            line-height: 45px;
        }
        h3 {
            margin-bottom: 37px;
            font-size: 32px;
            font-weight: bold;
            padding-left: 0.14667rem;
            padding-top: 39px;
            color: #333;
        }
    }

    .contentBottom {
        background: #fff;
        display: flex;
        height: 117px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        bottom: 0;
        p {
            flex: 1;
            height: 88px;
            line-height: 88px;
            color: #FE4817;
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 32px;
            border: 1px solid #FE4817;
            border-radius: 10px;
            margin-left: 30px;
            margin-right: 25px;
            margin-top: 16px;
        }
        a {
            flex: 1;
            height: 88px;
            line-height: 88px;
            background: #FE4817;
            text-align: center;
            border: 1px solid #FE4817;
            border-radius: 10px;
            font-size: 32px;
            color: #fff;
            margin-top: 16px;
            margin-left: 25px;
            margin-right: 28px;
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
    h3{
        margin-left: 30px;
    }
    h3 span{
        font-size: 32px;
        font-weight: 700;
    }
    .colorword{
        color: #FE4817;
    }
    .content{
        color: #333;
    }
</style>
<style lang="css">
    .md-dialog-content {
        width:540px;
        height:5.1rem;
    }
    .md-dialog-body{
        padding: 49px 101px 46px !important;
        text-align: center;
    }
    .md-dialog-body .md-dialog-title{
        margin-bottom: 46px!important;
        font-size: 34px!important;
        color: #333333;
        font-weight: 600!important;
    }
    .md-dialog-text{
        font-size: 34px!important;
        color: #333333;
        text-align: center;
    }
    .md-dialog-actions {
        height: 88px;
        line-height: 88px;
        margin:0 69px;
        background: #FE4817;
        border-radius: 10px;
    }
    .md-dialog-btn:last-child{
        color: #fff!important;
        height: 88px;
        line-height: 88px;
    }
    .popFail .md-dialog-body{
        padding: 68px 101px 65px!important;
        font-size: 34px!important;
        color: #333333;
        text-align: center;
    }
    .popFail .md-dialog-content{
        height: 434px;
    }
    .miniappDialog .md-dialog-body{
        padding: 0.65333rem!important;
        font-size: 32px!important;
        text-align: center;
    }
    .miniappDialog .md-dialog-content {
        width:640px;
        height:8.0rem;
    }
    .miniappDialog .line1{
        color:#777D81;
        margin-bottom:30px;
    }
    .miniappDialog .line2{
        color:#777D81;
    }
    .miniappDialog .line3{
        margin-top:16px;
        color:#333333;

    }
</style>
