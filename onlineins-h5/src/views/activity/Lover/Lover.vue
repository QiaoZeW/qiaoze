<template>
    <div class="lover-wrap">
      <Mar v-if="isShowMar" />
      <Feb v-else />

      <div :class="showBgMongolia?'bg_mongolia':'hide_mongolia'" @touchmove.prevent>
          <img src="@/assets/imgs/appointment/sharePic01.png" class="sharePic01" />
          <img src="@/assets/imgs/appointment/sharePic02.png" class="sharePic02" v-show="!isSmallProgram"/>
          <img src="@/assets/imgs/appointment/sharePic04.png" class="sharePic04" v-show="isSmallProgram"/>
          <div class="know_hide" @click="hide_know()">
              <img src="@/assets/imgs/appointment/sharePic03.png" class="sharePic03" />
          </div>
      </div>
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    import Feb from './Feb'
    import Mar from './Mar'
    export default {
        name: "Lover",
        components: {
          Feb,
          Mar
        },
        data () {
            return {
              isShowMar: false,
              secondaryDistributor: '',
              shareOptions: {
                href: location.href,
                title: '百年人寿—情人节活动',
                desc: '百年人寿—情人节活动',
                link: '',
                imgUrl: require('@/assets/imgs/lover/shareImage.png')
              },
              thirdClassDistributor:'',
              shareImgUrl: require('@/assets/imgs/lover/shareImage.png'),
              shareImgUrlMar: require('@/assets/imgs/lover/mar/shareImage.png'),
              showEnvironment: 0,
              isNew: '0',
              showMoreProduct:false,
              showBgMongolia:false,
              isAndroid:false,
              isIos:false,
              isSmallProgram:false,
              isBrowser: false,
              docTitle: '情人节活动',
              siteUrl: ''
            }
        },
        created() {
          this.init()
        },
        mounted () {
          this.environment ()
        },
        methods: {
          init () {
            this.siteUrl = this.$router.siteUrl()
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'CPS_00010009'
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor") || '';
            this.isBrowser = this.$app.isBrowser()
            this.compareDate ()
            this.wxshare()
            this.appShare()
          },
          compareDate () {
            if (new Date() > new Date('2020/3/1')) {
              this.isShowMar = true
              this.shareOptions.title = '百年人寿—女神节活动'
              this.shareOptions.desc = '百年人寿—女神节活动'
              this.shareImgUrl = this.shareImgUrlMar
              this.docTitle = '女神节活动'
            }
            document.title = this.docTitle
          },
          hide_know(){
              this.showBgMongolia = false
          },
          environment () {
            var ua = navigator.userAgent.toLowerCase()
            this.isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端

            if(this.isBrowser){
                this.showEnvironment = 0
            } else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                if(this.$app.isMiniProgram()){  //小程序内
                    this.isSmallProgram = true
                }else{
                    this.isSmallProgram = false
                }
                this.showEnvironment = 1
            } else {
                this.showEnvironment = 2
            }
          },
          wxshare () {
            if (!this.isBrowser) {
              console.log('wxshare----')
              this.shareOptions.imgUrl = this.siteUrl + this.shareImgUrl
              this.shareOptions.link = this.siteUrl + `/activity/Lover/Lover.html?secondaryDistributor=${this.secondaryDistributor}&isNew=${this.isNew}`
              this.$app.wxShareDetail(this.shareOptions)
            }
          },
          appShare () {
            if (this.isBrowser) {
              //导航是否显示分享按钮
              setupWebViewJavascriptBridge((bridge)=> {
                  bridge.callHandler('navigationConfig', {
                      'flag_show': 1,
                      'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                      'title': '', //标题
                      'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                      'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                      'share_url': this.siteUrl + `/activity/Lover/Lover.html?secondaryDistributor=${this.secondaryDistributor}&isNew=${this.isNew}`,
                      'share_title': this.shareOptions.title, //分享标题
                      'share_text': this.shareOptions.desc, //分享描述
                      'share_imgurl': this.siteUrl + this.shareImgUrl //分享图片地址
                  }, function (response) {
                  })
              })
            }
          }
        }
    };
</script>

<style lang='scss' scoped>
.lover-wrap {
  min-height: 100%;

  .bg_mongolia {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 300;
      .sharePic01{
          width: 388px;
          height: 65px;
          position: fixed;
          top: 95px;
          left: 63px ;
      }
      .sharePic02{
          width: 219px;
          height: 144px;
          position: fixed;
          right: 10%;
          top: 0;
      }
      .sharePic04{
          width: 178px;
          height: 144px;
          position: fixed;
          right: 16%;
          top: 0;
      }
      .know_hide{
          position: fixed;
          top: 224px;
          left: 50%;
          margin-left: -126px;
          width:253px;
          height:103px;
          border:1px solid rgba(255,255,255,1);
          border-radius:50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .sharePic03{
              width: 124px;
              height: 34px;
          }
      }
  }
  .hide_mongolia{
      display: none;
  }
}
</style>
