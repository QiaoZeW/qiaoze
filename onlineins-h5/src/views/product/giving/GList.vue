<template>
    <div class="content" ref="content">
        <div v-if="!showPolicyList" class="blankPolicy">
            <p class="particular"></p>
            <p class="tips" ><img src="@/assets/imgs/externalPay/blankPolicy.png" /></p>
            <div class="contentBottom newPart" >
                <p class="logo"> <img src="@/assets/imgs/externalPay/logo.png" /></p>
                <p class="bottomPhone">全国客服热线<span>95542</span></p>
            </div>
        </div>
        <div v-else>
           <div class="contentBody" ref="contentBody">
               <div class="policyList">
                   <div class="policyDetail" v-for="item in policyList"  >
                       <div class="detailTop" @click="goDetail(item)">
                           <img class="productImg" src="@/assets/imgs/activity_m_entrance/logo.png" />
                           <div class="orderDetail">
                               <h3>{{item.contPlanCode | tranProdName}}</h3>
                               <p class="insureName">被保人：{{item.name}}</p>
                               <p class="partNo" v-if="item.contPlanCode === '301134'">保障期限：30天</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301135'">保障期限：30天</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301133'">保障期限：1年</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301160'">保障期限：1年</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301161'">保障期限：1年</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301162'">保障期限：1年</p>
                               <p class="partNo" v-else-if="item.contPlanCode === '301163'">保障期限：1年</p>
                               <img v-if="item.status === '8'" src="@/assets/imgs/externalPay/status8.png"  />
                           </div>

                       </div>
                      <div class="clickBtn" v-show="showBtn && item.contPlanCode === '301133'">
                          <p @click="subFn">点我翻倍</p>
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
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "ExternalList",
        data(){
            return{
                orderNo:'',
                policyList: [],
                showPolicyList: false,
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
                showBtn:false,
                debouceFlag: true
            }
        },
        created(){
          this.init()
          this.getInsureNum()
        },
        methods:{
            subFn() {
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: `/act/giftRisk/getIsInviteReceiveZJRisk`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            location.href = `/product/giving/Gbuy.html`
                        },
                        failFn: (err) => {
                            Toast.failed(err.resultMsg)
                        }
                    })
                })
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
            init () {
              this.getList()
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
            goDetail (item) {
              if (!this.debouceFlag) { return false }
              this.debouceFlag = false
              setTimeout(()=>{
                this.debouceFlag = true
                location.href = `/product/giving/GPolicyDetails.html?contNo=${item.contNo}`
              }, 300)
            },
            getList(){
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/giftRisk/getPolicyList`,
                        userToken: userToken,
                        isLoading: true,
                        contentType: 'application/json',
                        successFn: (data) => {
                            this.policyList = data
                        }
                    })
                })
            }
        },
        watch: {
          policyList (v) {
            if (v) {
              if (v.length > 0) {
                this.showPolicyList = true
              }
              this.policyList = v
            }
          }
        },
        filters: {
            explainStatus(status) {
                let statusDic = {
                  "1": "投保失败",
                  "2": "自核失败",
                  "3": "自核成功",
                  "4": "转人工核保失败",
                  "5": "转人工核保成功",
                  "6": "承保失败",
                  "7": "承保中",
                  "8": "承保成功",
                  "9": "已撤单",
                  "10": "已终止"
                }
                return statusDic[status] || "承保成功";
            },
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
        }
    }
</script>
<style lang="scss" scoped>
    .part1{
        position: fixed;
        bottom: 60px;
        width: 100%;
    }
    .bottomPhone{
        color: #333333;
        font-size: 24px;
        width: 100%;
        margin-top: .5rem;
        text-align: center;
        bottom: 60px;
        span{
            color: #E10312;
        }
    }
    .content {
        background: #f2f2f2;
        .contentTop{
            background: #fff;
            position: relative;
            height: 102px;
            width: 100%;
            .bePay{
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
    .contentBottom{
        position: relative;
    }
    .logo{
        bottom: 118px;
        width: 100%;
        img{
            margin: 0 auto;
            width: 224px;
            height: 68px;
        }
    }
    .particular{
        height: 22px;
        width: 100%;
        background: #f2f2f2;
    }
    .blankPolicy{
        background: #fff;
        padding-top: 1.35rem;
        .tips{
            width: 100%;
            padding-top: 76px;
            img{
                margin: 0 auto;
                width: 378px;
                height: 416px;
            }
        }
        .newPart{
            margin-top: 282px;
            padding-bottom: 3.33333rem;
            margin-bottom: 0;
        }
    }
   .smallTip{
       margin: 26px 0.32rem 26px;
       background: #FC8F22;
       height: 56px;
       line-height: 56px !important;
       font-size:24px;
       color: #fff;
       -webkit-border-radius: 50px;
       -moz-border-radius: 50px;
       border-radius: 50px;
       text-align: center;
       position: relative;
       img{
           width: 18px;
           height: 30px;
           display: inline-block;
           vertical-align: middle;
           position: absolute;
           top: .18rem;
           right: 1rem;
       }
   }
   .otherBlankS{
       z-index: 10;
       padding: 1.4rem 0.32rem .5rem;
   }
    .otherBlank{
        z-index: 10;
        padding: 2.5rem 0.32rem .5rem;
    }
   .policyList{
       width: 100%;
       padding: 10px 18px 40px;
       box-sizing: border-box;
       .policyDetail{
           background: #fff;
           -webkit-border-radius: 10px;
           -moz-border-radius: 10px;
           border-radius: 10px;
           padding: 26px;
           overflow: hidden;

           .detailTop{
               width: 100%;
               height: 180px;
               border-bottom: 1px solid #f2f2f2;
               .productImg{
                   width: 160px;
                   height: 160px;
                   display: inline-block;
                   -webkit-border-radius: 10px;
                   -moz-border-radius: 10px;
                   border-radius: 10px;
                   float: left;
               }
               .orderDetail{
                   float: left;
                   display: inline-block;
                   margin-left: 20px;
                   h3{
                       font-size: 28px;
                       color: #333;
                       font-weight: bold;
                       height: 40px;
                       line-height: 40px;
                       overflow:hidden;
                       text-overflow:ellipsis;
                       width: 448px;
                       white-space: nowrap;
                       margin-top: 10px;
                   }
                   .insureName{
                       margin-top: 20px;
                       line-height: 36px;
                       font-size: 26px;
                       color: #8E8E8E;
                   }
                   .partNo{
                       font-size: 26px;
                       color: #8E8E8E;
                       line-height: 36px;
                       margin-top: 8px;
                   }
                   img{
                       height: 98px;
                       width: 98px;
                       display: inline-block;
                       float: right;
                       margin-top: -1.6rem;
                       margin-right: -.2rem;
                   }
               }
           }
           .btnBox{
               padding-top: 12px;
               display: flex;
               justify-content: flex-end;
               .goOrder{
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
       .policyDetail:not(first-child){
           margin-top: 26px;
       }
   }
    .downloadApp{
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
    .detailTip, .detailTips{
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
    .detailTips{
        width: calc(100% - 60px);
        padding-left: 60px;
    }
    .gift{
        top: .14rem;
        left: 20px;
        width: 26px;
        height: 28px;
        position: absolute;
    }
    .triangle{
        position: absolute;
        width:0;
        top: -.5rem;
        right: .76rem;
        height:0;
        border:24px solid #F4f4f4;
        border-color: transparent transparent #F4f4f4 transparent;
    }
   .contTop{
       position: relative;
       width: 100%;
       top: 0;
       z-index: 20;
       background: #f2f2f2;
   }
    .clickBtn{
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        p{
            width: 156px;
            height: 52px;
            -webkit-border-radius: 10px;
            background: #fff;
            font-size: 24px;
            line-height: 52px;
            text-align: center;
            color: #E10312;
            border: 1px solid #E10312;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
    }
</style>

<style lang="scss">
.externalTab{
      .is-active{
        color: #333 !important;
    }
    .md-tab-bar-ink {
        background-color: #E10312 !important;
        height: 2px !important;
    }
}
</style>
