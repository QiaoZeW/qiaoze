<template>
    <div class="layout">
        <div class="logo" @click="goHome"></div>
        <div class="banner">
            <md-swiper
                  ref="swiper"
                  :autoplay="5000"
                  :is-prevent="false"
                >
                <md-swiper-item v-for="(item, index) in bannerDatas" :key="index">
                  <div class="banner-item">
                      <img @click="goDetail(item)" :src="item.imgSrc" alt="图片未显示">
                  </div>
                </md-swiper-item>
            </md-swiper>
        </div>
        <div class="content">
            <!-- <slot name="content" /> -->
            <div v-for="(item, index) in allDatas" :key="index">
                <div class="content-title" :class="{'first': index === 0}">
                    <span>{{ item.title }}</span>
                    <img class="title-bg-img" src="@/assets/imgs/activity_m_entrance/01/title_bg_01.png" alt="">
                </div>
                <div class="content-bottom">
                    <div v-if="item.bothImg">
                        <div v-if="item.hasSingle">
                            <img class="common-img" v-for="img4 in item.singleImgs" :src="img4.url" alt="" @click="goDetail(img4)">
                        </div>
                        <div class="both-img">
                            <div class="left">
                                <img v-for="img1 in item.leftImgs" :src="img1.url" alt="" @click="goDetail(img1)">
                            </div>
                            <div class="right">
                                <img v-for="img2 in item.rightImgs" :src="img2.url" alt="" @click="goDetail(img2)">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <img class="common-img" v-for="img3 in item.singleImgs" :src="img3.url" alt="" @click="goDetail(img3)">
                    </div>
                </div>
            </div>
        </div>
        <div class="about-bainian">
            <h3>关于百年</h3>
            <img src="@/assets/imgs/activity_m_entrance/01/10.png" alt="">
            <p>百年人寿保险股份有限公司于2009年6月3日正式开业，十年累计实现保费收入超过1400亿元，总资产突破千亿元，价值与规模、品质和效益同步提升，连续四年实现盈利，从寿险到资管，健康而快速的发展备受行业瞩目。</p>
        </div>

        <img src="@/assets/imgs/activity_m_entrance/01/11.png" alt="" @click="download" name="down_btn">

        <div class="footer" :class="{'show': true}">
          <p><span>©</span>&nbsp;&nbsp;百年人寿保险股份有限公司授权所有</p>
          <p>辽ICP备09014139号-1</p>
          <p>全国客服热线：95542</p>
        </div>
        <div ref="tip-download" class="tip-download" :class="{'tipshow': tipshow, 'hideDownBar': hideDownBar}">
          <img class="left-icon" src="@/assets/imgs/activity_m_entrance/left.png" alt="图片" @click="hideDownBarFn">
          <div class="center">
            <img class="logo-icon" src="@/assets/imgs/activity_m_entrance/logo.png" alt="图片">
            <div class="wenzi">
              <h3>百年人寿APP</h3>
              <p>保单查询、续期理赔一步到位</p>
            </div>
          </div>
          <button v-if="!isMiniApp||(isMiniApp&&isBnMiniApp)" @click="download">立即下载</button>
        </div>

        <img class="download-icon" :class="{'download-icon-show': downloadIconShow}" src="@/assets/imgs/activity_m_entrance/download_icon.png" alt=""  @click="download">
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "Layout",
        props: {
            allDatas: {
                type: Array,
                default: () => []
            }
        },
        data () {
            return {
                downloadIconShow: false,
                hideDownBar: false,
                tipshow: false,
                client: null,
                isShow: false,
                thirdClassDistributor: '',
                secondaryDistributor: '',
                isAndroid: false,
                isIos: false,
                downloadUrl: '',
                canShowTip: location.href.includes('/activity/m/Activity03') || location.href.includes('/activity/m/Activity04'),
                bannerDatas: [
                  {
                    id: '130',
                    imgSrc: require('@/assets/imgs/activity_m_entrance/01/banner01.png'),
                  },
                  {
                    id: '128',
                    imgSrc: require('@/assets/imgs/activity_m_entrance/01/banner02.png'),
                  }
                ],
                isMiniApp:false,
                isBnMiniApp:false
            }
        },
        created() {
            this.getParams()
            let u = navigator.userAgent.toLowerCase()
            this.isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            // if (this.isAndroid) {
            //     window.location = 'app://bnonline'
            // }
            this.getAppUrl()
            this.isMiniApp = this.$app.isMiniProgram()
            this.isBnMiniApp = this.$app.isBnMiniApp()
        },
        mounted () {
            window.addEventListener('scroll',this.compuTop, false)
        },
        methods: {
           hideDownBarFn () {
              this.hideDownBar = true
              this.downloadIconShow = true
           },
           compuTop () {
                let client = document.body.scrollTop
                            ? document.body
                            : document.documentElement;
                let top1 = client.scrollTop+client.clientHeight+1
                let top = client.scrollHeight
                if (top1 > top) {
                   setTimeout(() => {
                      this.isShow = true
                   }, 500)
                }
                if (this.canShowTip) {
                    this.tipshow = (client.scrollTop > 400)
                    if (top/top1 < 1.1) this.tipshow = false
                }
           },
           getParams () {
              this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'SEM_H5'
              this.thirdClassDistributor = this.$router.query('thirdClassDistributor') || ''
           },
           goHome () {
              // 添加首页地址
           },
           download () {
               if(this.isMiniApp&&this.isBnMiniApp){
                   wx.miniProgram.navigateTo({url:'/pages/user/downloadApp'});
                   return;
               }
              this.openApp()
           },
           goDetail (item) {
              location.href = `https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=${item.id}&secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}`
           },
           getAppUrl () {
               let url = '', sysKeyNum = '01';
               sysKeyNum = /Activity(\d{2})/.exec(location.href)
               console.log(location.href);
               console.log(sysKeyNum);
               if (this.isAndroid) {
                   sysKeyNum = /Activity(\d{2})/.exec(location.href)[1];
                   (sysKeyNum == '03') && (sysKeyNum = '01');
                   (sysKeyNum == '04') && (sysKeyNum = '02');
                   this.$request({
                       url: `/config/getBySysKey`,
                       params: {sysKey: `${this.secondaryDistributor}_${sysKeyNum}`},
                       contentType: 'application/json',
                       method: 'POST',
                       successFn: (data) => {
                           if (data && data.sysValue) {
                               this.downloadUrl = data.sysValue
                           }
                       }
                   })
               } else if (this.isIos) {
                   this.$request({
                       url: `/app/version/ios`,
                       successFn: (data) => {
                           if (data && data.packageUrl) {
                               this.downloadUrl = data.packageUrl
                           }
                       }
                   })
               } else {
                   Toast.info('暂不支持该浏览器！')
               }

           },
           openApp () {
               if (this.downloadUrl) {
                   window.location.href = this.downloadUrl
               } else {
                   Toast.info('暂未配置app下载地址')
               }
           }
        }
    };
</script>

<style lang='scss' scoped>
.layout {
    padding-top: 60px;
    min-height: 100%;
    background: #FFFCFB  url(../../../assets/imgs/activity_m_entrance/01/bg_01.png) top center no-repeat;
    background-size: 100%;

    .logo {
       width: 300px;
       height: 100px;
       margin: 0 auto;
    }
    img {
       margin: 0 auto;
       border-radius: 10px;
    }
    .banner {
        border-radius: 10px;
        margin: 0 auto;
        width: 696px;
        height: 245px;
        overflow: hidden;
        .banner-item {
          width: 100%;
          height: 100%;
        }

        .md-swiper-indicator.md-swiper-indicator-active {
            background: red;
        }
    }

    .content {
        padding:0 40px 40px;
        box-sizing: border-box;

        .content-title {
            position: relative;
            margin: 40px auto;
            &.first {
                margin: 80px auto 40px;
            }
            span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                font-size: 30px;
            }
            .title-bg-img {
                width: 531px;
                height: 53px;
            }
        }

        .content-bottom {
            img {
                box-shadow: 2px 2px 10px 6px rgba(0, 0, 0, 0.06);
            }
            .both-img {
                display: flex;
                justify-content: space-between;

                > div {
                    img {
                        width: 315px;
                        margin-bottom: 40px;
                    }
                }
            }
        }

        .common-img {
            margin: 20px auto;
        }
    }

    .about-bainian {
        padding: 0 40px;
        box-sizing: border-box;
        h3 {
            font-size: 38px;
            color: #333;
            padding: 26px;
            border-bottom: 1px solid #ececec;
            margin-bottom: 40px;
            text-align: center;
            font-weight: bold;
        }
        p {
            font-size: 20px;
            color: #666;
            text-align: center;
            line-height: 46px;
            margin: 40px 0 60px;
        }
    }

    .footer {
      display: none;
      background-color: #FFFCFB;
      transition: all .5s;
      &.show {
        height: 1.227rem;
        padding: 30px 0 60px;
        display: block;
        background-color: #FFFCFB;
      }
      p {
        text-align: center;
        color: #666;
        line-height: 40px;
        span {
          font-size: 30px;
          line-height: 40px;
        }
      }
    }

    .tip-download {
       height: 104px;
       background-color: #fff;
       position: fixed;
       padding: 14px 38px;
       bottom: 0;
       width: 100%;
       box-sizing: border-box;
       display: none;

       &.tipshow {
          &.hideDownBar {
             display: none;
          }
          display: block;
          overflow: hidden;
          .left-icon {
             width: 48px;
             height: 48px;
             float: left;
             margin-right: 32px;
             margin-top: 12px;
          }
          button {
            float: right;
            width: 138px;
            height: 49px;
            border-radius: 10px;
            text-align: center;
            line-height: 49px;
            background-color: #D6000F;
            font-size: 22px;
            color: #fff;
            margin-top: 12px;
          }
          .center {
            float: left;
            .logo-icon {
              width: 74px;
              height: 74px;
              float: left;
              margin-right: 13px;
            }
            .wenzi {
              float: left;
              h3 {
                font-size: 27px;
                font-weight: bold;
                font-family: '方正兰亭大黑简体';
                margin-top: 6px;
                margin-bottom: 12px;
              }
              p {
                font-size: 22px;
              }
            }
          }
       }
    }

    .download-icon {
       width: 128px;
       height: 146px;
       position: fixed;
       right: 10px;
       bottom: 150px;
       display: none;
       &.download-icon-show {
          display: block;
       }
    }

}
</style>

<style lang='scss'>
  .layout {
      .md-swiper-indicator.md-swiper-indicator-active {
          background: red;
      }
  }
</style>

