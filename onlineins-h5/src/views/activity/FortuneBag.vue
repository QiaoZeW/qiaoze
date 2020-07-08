<template>
  <div class="content">
     <div class="myBag" v-if="showReceive">
         <div class="contentTop">可领取 <span>{{readCount}}</span>个</div>
         <img src="@/assets/imgs/fortuneBag/fortuneBag.png" class="fortuneBag" @click="goReceive"/>
     </div>
      <div class="myBag" v-else>
          <div class="parS animated fadeOutUp" id="parS"><p>+ {{receiveBean}} 豆</p></div>
          <img src="@/assets/imgs/fortuneBag/fortuning.png" class="fortuningBag"/>
      </div>
      <md-icon
          name="question"
          size="lg"
          color="#6E6E6E"
          class="iconTip"
          @click="showTip"
      ></md-icon>
      <div class="contentMid">
          <p>待领取 <span>{{recordCount}}</span> 个</p>

      </div>
      <div class="contentBottom">
          <p>
              已领取的百佳豆 <br>
              请查看<span @click="goDetails">百佳豆明细</span>
          </p>
      </div>
      <md-dialog
          :closable="false"
          v-model="questionDialog.open"
          :btns="questionDialog.btns"
      ><p>您成功邀请的好友，如在2019年7月31日前完成保障升级，您将获得惊喜福袋，抽取最高100万百佳豆，100%中奖。</p>

          <p class="parQ">
              活动截止时间： <br/>
              2019年7月31日（含31日）
          </p></md-dialog>
  </div>

</template>

<script>
    import { Dialog,Toast } from "mand-mobile";
    import '../../assets/animate.min.css'
    export default {
        name: "forturneBag",
        data(){
            return{
                questionDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确定'
                        }
                    ],
                },
                readCount:0,
                showReceive:true,
                dataList:[],
                receiveBean:0,
                recordCount:0,
                shareImg: require("@/assets/imgs/invitaion/wxshare1.png"),
            }
        },
        components:{
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
        },
        created(){
           document.title = '邀请领福袋'
           this.getBagListNum()
           this.getBagList()
           this.getReadCount()

            let that = this
            this.$app.getCurrentUserCode(function(userCode) {
                //设置APP内分享
                setupWebViewJavascriptBridge(function(bridge) {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "navigationConfig",
                        {
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            flag_share:  1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url:
                                that.$router.siteUrl() +
                                "/activity/InvitationShare.html?inviterCode=" +
                                userCode,
                            share_title: "百年人寿官方app上线", //分享标题
                            share_text: "免费领价值百元礼包", //分享描述
                            share_imgurl: that.$router.siteUrl() + that.shareImg //分享图片地址
                        },
                        function(response) {
                            //alert(response,'');
                        }
                    );
                });
            });
        },
        methods:{
            goDetails(){
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('goBeanDetails', {
                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                    }, function (response) {
                    });
                })
            },
            getReadCount(){
                let that = this;
                this.$app.getToken(function(userToken) {
                    that.$request({
                        url: `/vip/vipUserInviteRecord/selRecordInfo`,
                        method: "GET",
                        contentType: "application/json;charset=UTF-8",
                        isLoading: true,
                        userToken: userToken,
                        successFn: data => {
                            that.recordCount = Number(data.length);
                        },
                        failFn: data => {
                            Dialog.alert({
                                title: "提示",
                                content: data.resultMsg,
                            });
                        }
                    });
                });
            },
            showTip(){
                this.questionDialog.open = true
            },
            getBagList(){
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/lucky/getAllLuckyByUserCode`,
                        userToken:userToken,
                        contentType: "application/json;charset=UTF-8",
                        successFn: data => {
                            that.dataList = data
                        },
                        errorFn: () => {
                        }
                    });
                })
            },
            getBagListNum(){
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/lucky/getAllLuckyNumByUserCode`,
                        userToken:userToken,
                        contentType: "application/json;charset=UTF-8",
                        successFn: data => {
                        that.readCount = Number(data)
                        },
                        errorFn: () => {
                        }
                    });
                })
            },
            goReceive(){
                let obj = {},that = this, readId = [] ,newObj={};
                if(this.dataList !== [] && this.dataList.length !== 0){
                    readId = this.dataList[0].id
                }else{
                    Toast.info('暂无福袋可领取')
                    return false
                }
                let data={
                    "userLuckyList": [{"id":readId}]
                }
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/lucky/updateLucky`,
                        userToken:userToken,
                        method:'POST',
                        isEncript: true,
                        contentType: "application/json;charset=UTF-8",
                        data : data,
                        successFn: (data) => {
                            that.showReceive = false
                            that.receiveBean = that.dataList[0].luckyScore
                            that.dataList.splice(0,1)
                            that.getBagListNum()
                            let timers =  setInterval(()=>{
                                that.showReceive = true
                                clearInterval(timers)
                            },3000)
                        },
                        errorFn: (data) => {
                            Dialog.alert({content:data.resultMsg})
                        }
                    });
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        height:calc(100vh) ;
    }
    .contentTop{
        background: url("../../assets/imgs/fortuneBag/myTip.png") no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        width: 172px;
        top: 3.8rem;
        height: 60px;
        position: absolute;
        left: 6rem;
        text-align: center;
        line-height: .6rem;
        color: #FFE0DB;
        font-size: 26px;
        span{
            font-size: 44px !important;
            color: #FFEA01 !important;
        }
    }

    .tip{
        width: 172px;
        height: 60px;
    }
    .contentMid{
       p{
           font-size: 44px;
           color: #EB1F31;
           text-align: center;
           font-weight: bold;
           margin-top: -.2rem;
           margin-left: .2rem;
           span{
               font-size: 56px;
               color: #FFE401;
           }
       }
    }
    .contentBottom{
        p{
            padding-top: 1.5rem;
            font-size: 24px;
            color: #333;
            text-align: center;
            span{
                color: #EC2F3F;
                text-decoration:underline ;
            }
        }
    }
    .parQ{
        margin-top: 30px;
    }
    .iconTip{
        position: relative;
        left: 6.8rem;
    }
    .fortuneBag{
        width: 538px;
        padding-top: 2.5rem;
        margin: 0 auto ;
        height: 538px;
    }
    .fortuningBag{
        width: 538px;
        padding-top: 3rem;
        margin: 0 auto ;
        height: 538px;
    }
    .myBag p{
        background: #EC2F3F;
        width: 216px;
        height: 40px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        line-height: 40px;
    }
    .parS {
        position: absolute;
        height: 40px;
        top: 2.7rem;
        text-align: center;
        margin-left: .2rem;
        width: 100%;
        p{
            display: inline-block;
        }
    }
</style>
<style>
    body{
        background: url("../../assets/imgs/fortuneBag/background.png") no-repeat center top;
        background-size: cover;
    }
</style>
