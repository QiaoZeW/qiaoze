<template>
    <div class="success-wrap">
      <p>恭喜您获得保额翻倍福利</p>
      <p>
        目前保额
        <span class="num">{{policyNum}}</span>
        <span>万元</span>
      </p>
      <img class="img01" src="@/assets/imgs/giving/success.png" alt="">
      <img v-if="status===1" class="img02" src="@/assets/imgs/giving/step.png" alt="">
      <div class="subbtn">
          <md-button v-if="status===2" type="warning" round @click="goInsure">立即激活 保额翻倍</md-button>
          <md-button v-if="status===1" type="warning" round @click="goShare">分享好友 保额翻倍</md-button>
      </div>
    </div>
</template>

<script>
    import NativeShare from './nativeShare'
    import {Dialog} from 'mand-mobile'
    export default {
        name: "Success",
        data () {
            return {
              userToken: '',
              nativeShare: null,
                policyNum: '0',
                userCode:'',
              shareImgUrl:require('../../../assets/imgs/giving/shareImg.png'),
                options:{
                    href:'',
                   title: '百年人寿重疾险限时0元购',
                    desc:'重疾险不要钱，帮好友保额翻倍',
                    link:'',
                    imgUrl:''
                },
                secondary:'',
                thirdClass:''
            }
        },
        props: {
          finish: {
            type: Boolean,
            default: false
          },
          status: {
            type: Number,
            default: 1
          }
        },
        created() {
            this.$app.getToken((userToken)=>{
                this.userToken = userToken
                this.getPolicyNum()
            })
            this.$app.getUserCode((userCode)=>{
                console.log(this.options);
                this.userCode = userCode
                this.options.href = location.href
                this.secondary =  this.$router.query("secondaryDistributor") || ''
                this.thirdClass =  this.$router.query("thirdClassDistributor") || ''
                this.options.link = this.$router.siteUrl() + `/product/giving/Glogin.html?inviterCode=${this.userCode}&secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
                this.options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(this.options)
                if(this.status === 1){
                    this.shareInit()
                }
                //如果在微信小程序内发送分享消息更新分享链接
                if(this.$app.isMiniProgram()&&this.$app.isBnMiniApp()){
                        wx.miniProgram.postMessage({
                            data: JSON.stringify({
                                action: 'shareInfo',
                                key: Math.random().toString(36).substr(2),
                                data: {shareUrl:this.options.link, shareTitle:this.options.title, shareImgUrl:this.options.imgUrl}
                            })
                        });
                }
            })
        },
        components: {
            [Dialog.name]: Dialog
        },
        methods: {
            getPolicyNum(){
                this.$request({
                    url: `/act/giftRisk/getAmntByUserCode`,
                    userToken: this.userToken,
                    method: 'POST',
                    isLoading: true,
                    contentType: 'application/json',
                    successFn: (data) => {
                       this.policyNum = data
                    }
                })
            },
          goInsure () {
            location.href = `/product/giving/GhealthNotice.html?status=2&secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
          },
          shareInit () {
              setupWebViewJavascriptBridge((bridge) =>{
                  //导航是否显示分享按钮
                  bridge.callHandler('navigationConfig', {
                      'flag_show': 1,
                      'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                      'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                      'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                      'share_url': this.options.link, //分享跳转的url
                      'share_title': this.options.title, //分享标题
                      'share_text': this.options.desc, //分享描述
                      'share_imgurl': this.options.imgUrl //分享图片地址
                  }, function (response) {
                      //alert(response,'');
                  })
              })
          },
          goShare () {
                if(this.$app.isBrowser()){
                    setupWebViewJavascriptBridge((bridge)=> {
                        //导航是否显示分享按钮
                        bridge.callHandler(
                            "shareActive",
                            {
                                share_data: '',
                                flag_show: 1,
                                flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                                flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                                flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                                share_url: this.options.link, //分享跳转的url
                                share_title: this.options.title, //分享标题
                                share_text: this.options.desc, //分享描述
                                share_imgurl: this.options.imgUrl //分享图片地址
                            },
                            function (response) {
                                //alert(response,'');
                            }
                        );
                    });
                }else{
                    Dialog.alert({content:'点击右上角进行分享'})
                }
          }
        }
    }
</script>

<style lang='scss' scoped>
.success-wrap {
  p {
    font-size: 44px;
    color: #595B76;
    text-align: center;

    span {
      color: #FF6F58;
      &.num {
        font-size: 84px;
      }
    }
  }


  img.img01 {
    width: 386px;
    height: 294px;
    margin: 64px auto 40px;
  }
  img.img02 {
    margin: 64px auto 40px;
    width: 586px;
    height: 174px;
  }
}
</style>
