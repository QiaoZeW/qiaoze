<template>
    <div class="shanzhen-wrap">
      <div class="banner">
        <img src="@/assets/imgs/shanzhen/banner.png" alt="">
      </div>
      <div class="text1">
        针对下面这些问题，百年已联合“善诊”为您提供专家解答（点击下方问题查阅）如您仍有担忧，可扫描下方二维码 与专家进行免费咨询 
      </div>
      <ul class="list">
        <li v-for="(item,index) in listImgDatas" :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
      <div class="qr_code">
        <img src="@/assets/imgs/shanzhen/qr_code.png" alt="">
        <p>
          手机截图后在微信打开添加健康顾问为好友疫情期间不限次1V1咨询
        </p>
      </div>

      <div class="service">
        <img src="@/assets/imgs/shanzhen/service.png" alt="">
      </div>

      <div class="line"></div>

      <div class="logo">
        <img src="@/assets/imgs/shanzhen/logo.png" alt="">
      </div>
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "Shanzhen",
        data () {
            return {
              listImgDatas: [
                require('@/assets/imgs/shanzhen/list_01.png'),
                require('@/assets/imgs/shanzhen/list_02.png'),
                require('@/assets/imgs/shanzhen/list_03.png'),
                require('@/assets/imgs/shanzhen/list_04.png'),
              ],
              shareOptions: {
                href: location.href,
                title: '百年人寿—健康贴士',
                desc: '百年人寿—健康贴士',
                link: '',
                imgUrl: this.$router.siteUrl() + require('@/assets/imgs/shanzhen/banner.png')
              },
              isBrowser: false
            }
        },
        created() {
            this.isBrowser = this.$app.isBrowser()
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'CPS_00010009'
            this.isBrowser ? this.appShare() : this.wxshare()
        },
        methods: {
          wxshare () {
              this.shareOptions.link = this.$router.siteUrl() + `/activity/Shanzhen.html?secondaryDistributor=${this.secondaryDistributor}`
              this.$app.wxShareDetail(this.shareOptions)
          },
          appShare () {
              //导航是否显示分享按钮
              setupWebViewJavascriptBridge((bridge)=> {
                  bridge.callHandler('navigationConfig', {
                      'flag_show': 1,
                      'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                      'title': '', //标题
                      'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                      'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                      'share_url': this.$router.siteUrl() + `/activity/Shanzhen.html?secondaryDistributor=${this.secondaryDistributor}`,
                      'share_title': this.shareOptions.title, //分享标题
                      'share_text': this.shareOptions.desc, //分享描述
                      'share_imgurl': this.shareOptions.imgUrl //分享图片地址
                  }, function (response) {
                  })
              })
          },
        }
    };
</script>

<style lang='scss' scoped>
.shanzhen-wrap {
    min-height: 100%;
    width: 750px;
    margin: 0 auto;
    padding-bottom: 40px;
    .banner {
      height: 500px;
      background-color: #fff;
      padding-bottom: 70px;
    }
    .text1 {
      background-color: #E4ECF0;
      color: #266488;
      padding: 30px 112px;
      font-size: 30px;
      text-align: center;
      line-height: 46px;
    }
    .list {
      margin-top: 50px;
      li {
        padding-left: 44px;
        img {
          width: 623px;
          height: 143px;
        }
      }
    }

    .qr_code {
      text-align: center;
      width: 228px;
      margin: 0 auto;
      img {
        width: 228px;
        height: 228px;
      }
      p {
        margin: 40px 0;
        font-size: 20px;
        color: #454245;
        line-height: 36px;
      }
    }

    .service {
      width: 520px;
      height: 52px;
      margin: 0 auto 76px;
    }

    .line {
      border-top: 1px solid #B6B3B4;
      width: 651px;
      margin: 0 auto;
    }

    .logo {
      width: 387px;
      height: 78px;
      margin: 63px auto;
    }
}
</style>

