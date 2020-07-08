<template>
  <div class="strategy-detail">
      <div class="inner" v-html="content">

      </div>
      <div class="next">
        <span @click="goNext(linkUrl)">{{ nextTitle }}</span>
      </div>
      <div v-if="!isBrowser&&!isMiniApp" class="contentBottom" @click="goDownload">
          下载APP，了解更多保险小知识
      </div>
      <div v-if="isMiniApp&&isBnMiniApp" class="contentBottom" @click="goMiniAppDownload">
          下载APP，了解更多保险小知识
      </div>
  </div>
</template>
<script>
// strategyType 01-保险问答 02-对比 03-方案 04-小课堂
export default {
  name: 'StrategyDetail',
  data () {
    return {
      article_id: '',
      content: '',
      path: '',
      showTitle: '对比',
      shareImg:require('@/assets/imgs/invitaion/strategy.png'),
      isBrowser:null,
      isMiniApp:false,
      isBnMiniApp:false,
      options: {},
      nextTitle: '',
      des:'',
      strategyTypeText: {
        '01': '保险问答', '02': '对比', '03': '方案', '04': '小课堂'
      }
    }
  },
  components: {
  },
  created () {
    this.isBrowser = this.$app.isBrowser()
    this.detailId = this.$router.query('detailId')
    this.article_id = this.$router.query('article_id')
    this.id = this.$router.query('id')
    this.updateReadNum()
    this.getDetailData(() => {
        this.noShare()
    })
    this.isMiniApp = this.$app.isMiniProgram()
    this.isBnMiniApp = this.$app.isBnMiniApp()
  },
  methods: {
      //去小程序下载页面
      goMiniAppDownload(){
          wx.miniProgram.navigateTo({url:'/pages/user/downloadApp'});
      },
    getDetailData (cb=function(){}) {
        this.$request({
            url: `/cms/articleStrategy/getArticleStrategyDetail`,
            isLoading: true,
            params: {
              id: this.article_id
            },
            successFn: (data) => {
              if (data) {
                 this.content = data.content
                 this.linkUrl = data.linkUrl + '?article_id=' + data.nextId
                 this.nextTitle = data.nextTitle
                 this.showTitle =  data.title
                  console.log(this.showTitle);
                  this.des = data.productDescription || ''
                 document.title = this.showTitle
                 cb()
              }
            }
        })
    },
    updateReadNum () {
        this.$request({
            url: `/cms/articleStrategy/updateReadNum`,
            params: { detailId: this.article_id },
            isLoading: true
        })
    },
    goNext (href) {
      location.href = href
    },
    goDownload(){
      this.$app.downLoadApp()
    },
    noShare () {
      //设置APP内不分享
        setupWebViewJavascriptBridge((bridge)=> {
            bridge.callHandler(
                "navigationConfig",
                {
                    flag_show: 1,
                    flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                    flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                    flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    share_url: location.href ,
                    share_title: this.showTitle, //分享标题
                    share_text: this.des, //分享描述
                    share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                }
            );
        });
        this.options.href = location.href
        this.options.title =  this.showTitle
        this.options.desc = this.des
        this.options.link = location.href
        this.options.imgUrl = this.$router.siteUrl() + this.shareImg
        this.$app.wxShareDetail(this.options)
    }
  }
}
</script>
<style lang="scss" scoped>
.strategy-detail {
   padding-bottom: 70px;

   .next {
     width: 690px;
     box-sizing: border-box;
     margin: 10px auto;
     padding: 22px 50px;
     background:rgba(242,243,245,1);
     border-radius:10px;
     color: #4B576D;
     text-align: center;
     line-height: 40px;
     font-size: 28px;
   }
  .contentBottom{
      position: fixed;
      bottom: 0;
      height: 88px;
      line-height:  88px;
      text-align: center;
      width: 100%;
      color: #fff;
      background: #E10312;
      font-size: 32px;
  }
}
</style>
