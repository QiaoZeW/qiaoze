<template>
  <div class="strategy-wrap">
      <div class="banner-wrap">
          <div class="banner">
            <div class="title"></div>
            <div class="top-content">
              <div class="inner">
                  <div>
                      <div>
                          <div class="icon"></div>
                          <h3>保险攻略</h3>
                      </div>
                      <div class="img"></div>
                  </div>
                  <p>如何科学配置保险？哪款保险产品适合我？想了解更多保险知识？——这里统统告诉你</p>
              </div>
            </div>
          </div>
      </div>
      <div class="strategy">
        <div class="content">
            <md-tabs ref="tabs" class="strategy-tabs" @change="tabsChangeFn">
                <md-tab-pane class="content"
                             name="p1"
                             label="全部">
                    <All v-if="isLoadingDone" :allDatas="allDatas" />
                </md-tab-pane>
                <md-tab-pane class="content"
                             name="p2"
                             label="保险问答">
                    <InsureQuestions />
                </md-tab-pane>
                <md-tab-pane class="content"
                             name="p3"
                             label="对比&方案">
                    <Compare v-if="isLoadingDone" :allDatas="allDatas" />
                </md-tab-pane>
                <md-tab-pane class="content"
                             name="p4"
                             label="小课堂">
                    <ClassRoom v-if="isLoadingDone" :allDatas="allDatas" />
                </md-tab-pane>
            </md-tabs>
        </div>
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
import All from '@/views/cms/prodStrategy/All'
import Compare from '@/views/cms/prodStrategy/Compare'
import ClassRoom from '@/views/cms/prodStrategy/ClassRoom'
import InsureQuestions from '@/views/cms/insureQues/InsureQuestions'
import { debounce, throttle } from '@/utils/utils'
export default {
  name: 'Strategy',
  components: {
    Compare,
    ClassRoom,
    InsureQuestions,
    All
  },
  provide () {
    return {
      changeTabs: (id) => {
        this.$refs['tabs'].currentName = 'p2'
        this.updateReadNum(id)
      }
    }
  },
  data () {
    return {
      questionLabel:'全部',       //模块来源
      compareLabel:'全部',      //内容类型
      insureQuestionsId: '',
      isLoadingDone: false,
      allDatas: [],
      $inner: '',
      flag: 0,
      //riskSource: '',  //内容类型
      //contentTitle:'', //内容标题
      shareImg:require('@/assets/imgs/invitaion/strategy.png'),
      isBrowser:null,
      isMiniApp:false,
      isBnMiniApp:false,
      options: {
        href: location.href,
        title:  "还不知道怎么选保险？看我",
        desc: '满满的干货~',
        link: location.href
      }
    }
  },
  created () {
    this.isBrowser = this.$app.isBrowser()
    this.noShare()
    this.loadAllDatas()
   //  let _this = this
   //  window.addEventListener('scroll',
   //      _this.scrollFn
   // , false)
      //shence add-----
      localStorage.setItem("shence_insurance_tactics_content_click_risk_source",this.questionLabel);
      localStorage.setItem("shence_insurance_tactics_content_click_content_type",this.compareLabel);
      this.isMiniApp = this.$app.isMiniProgram()
      this.isBnMiniApp = this.$app.isBnMiniApp()
      },
  mounted () {
    this.$inner = document.querySelector('.md-tab-bar-inner')
  },
  methods: {
      //去小程序下载页面
      goMiniAppDownload(){
          wx.miniProgram.navigateTo({url:'/pages/user/downloadApp'});
      },
      updateReadNum () {
        this.$request({
            url: `/cms/articleStrategy/updateReadNum`,
            params: { detailId: this.insureQuestionsId }
        })
          sensors.track("insurance_tactics_content_click", {
              risk_source : '保险问答' ,
              content_type: '保险问答' ,
          });
      },
      loadAllDatas () {
          this.$request({
              url: `/cms/articleStrategy/getArticleStrategyList`,
              isLoading: true,
              successFn: (data) => {
                this.isLoadingDone = true
                if(data && data.length > 0) {
                    this.allDatas = data
                    this.insureQuestionsId = this.allDatas.find(item => item.strategyType === '01').id
                }
              },
              failFn: () => {
                  this.isLoadingDone = true
              }
          })
      },
      scrollFn () {
        let client = document.body.scrollTop
            ? document.body
            : document.documentElement;

        console.log('client.scrollTop', client.scrollTop)
        if(client.scrollTop >= 400) {
            this.flag = 1
            this.$inner.classList.add('fixed')
        } else {
            if (this.flag === 1) {
                this.flag = 0
                this.$inner.classList.remove('fixed')
            }
        }
      },
      goDownload(){
          this.$app.downLoadApp()
      },

    dealUrl (detail_id) {
      return `/cms/prodStrategy/StrategyDetail.html?detail_id=${detail_id}`
    },
      //神策埋点
    loadShenceData() {
        localStorage.setItem("shence_insurance_tactics_content_click_risk_source",this.questionLabel);
        localStorage.setItem("shence_insurance_tactics_content_click_content_type",this.compareLabel);
      // sensors.track("insurance_tactics_content_click", {
      //     risk_source : this.questionLabel ,
      //     content_type: this.compareLabel ,
      // });
    },
    noShare () {
      //设置APP内分享
        setupWebViewJavascriptBridge((bridge)=> {
            bridge.callHandler(
                "navigationConfig",
                {
                    flag_show: 1,
                    flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                    flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                    flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    share_url: location.href ,
                    share_title: '还不知道怎么选保险？看我', //分享标题
                    share_text: '满满的干货~', //分享描述
                    share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                },
                function(response) {
                    //alert(response,'');
                }
            );
        });

        this.options.imgUrl = this.$router.siteUrl() + this.shareImg
        this.$app.wxShareDetail(this.options)
    },
    tabsChangeFn (tab) {
         this.questionLabel = tab.label
        this.compareLabel = tab.label
        // console.log(tab.label)
        // console.log(this.compareLabel)
        this.loadShenceData()
        if (tab.name === 'p2') {
          this.updateReadNum()
        }
    }
  }
}
</script>
<style lang="scss" scoped>
  .strategy-wrap {
    .banner-wrap {
        height: 294px;
        background-color: #237EA8;
        position: relative;
        margin-bottom: 52px;
        .banner {
          width: 690px;
          // height: 328px;
          position: absolute;
          top: 52px;
          margin-left: 50%;
          transform: translateX(-50%);
          border-radius: 10px;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.06);

          .title {
            height: 22px;
            background: linear-gradient(left,#2BE2F1,#23B4F7);
            background: -webkit-linear-gradient(left,#2BE2F1,#23B4F7);
          }
          img {
            border-radius: 10px;
          }
          .top-content {
              padding: 30px;
              box-sizing: border-box;
              .inner {
                  > div {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 26px;
                  }

                  .icon {
                      width: 50px;
                      height: 30px;
                      background: url('../../../assets/imgs/prodStrategy/icon_book.png') center center no-repeat;
                      background-size: cover;
                      margin-left: 8px;
                      margin-bottom: 18px;
                  }
                  h3 {
                    color: #333;
                    font-size: 40px;
                    font-weight: bold;
                  }
                  .img {
                      width: 194px;
                      height: 120px;
                      background: url('../../../assets/imgs/prodStrategy/banner_img1.png') center center no-repeat;
                      background-size: cover;
                      border-radius: 10px;
                  }

                  p {
                      color: #8e8e8e;
                      font-size: 26px;
                      line-height: 40px;
                      margin: 16px 0 28px;
                  }
              }
          }
        }
    }

    .strategy {
      padding: 80px 0px 100px;

      .content {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 36px 0;
          border-top: 1px solid #ccc;
          .text {
            color: #333;
            font-size: 32px;
            line-height: 44px;
            width: 352px;
            font-weight: bold;
          }
          .img {
            width: 292px;
            height: 194px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
    }
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

</style>

<style lang="scss">
.strategy-wrap {
    .strategy {
        .strategy-tabs {
            .md-tab-bar {
               border: none;
               padding: 0 12px !important;
               background-color: #fff !important;

               .md-tab-bar-inner {
                  &.fixed {
                     position: fixed;
                     top: 0;
                     z-index: 1;
                     background-color: #fff;
                     padding: 24px 0;
                     margin-left: -14px;
                  }
               }

               .md-scroll-view {
                  overflow: visible;
               }
               .md-tab-bar-item {
                  background-color: #F4F4F4;
                  width: 152px;
                  padding: 0;
                  font-size: 28px;
                  color: #666;
                  min-height: 68px;
                  border-radius: 10px;
                  position: relative;
                  box-sizing: border-box;

                  &.is-active {
                      color: #fff !important;
                      background: linear-gradient(top,#2BE2F1,#23B4F7);
                      background: -webkit-linear-gradient(top,#2BE2F1,#23B4F7);
                      border: none;

                      &.is-active::after {
                          content: '';
                          position: absolute;
                          width: 0;
                          border-width: 20px 20px 0 20px;
                          border-style: solid;
                          border-color: transparent;
                          border-top-color: #23B7F6;
                          bottom: -10px;
                          left: 50%;
                          transform: translateX(-50%);
                      }
                  }
               }

               .md-tab-bar-ink {
                  background: none !important;
               }
            }
            .md-tabs-content {
                margin-top: 30px;
                padding: 0 12px;
                box-sizing: border-box;
            }
        }
    }
}
</style>
