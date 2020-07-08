<template>
    <div class="hot-mod" :class="{wxregstyle: wxregstyle}">
      <div class="wrap" v-if="commodityList.length>0">
        <img :src="propImgs" class="hotExchange" :class="{changeWidth: changeUrlWidth, wxregstyle: wxregstyle}">
        <div class="goodsList">
          <ul>
            <li v-for="(item,index) in commodityList" :key="index">
              <div class="img-wrap">
                <img :src="item.imageUrl" @click="goCommodity(item)">
              </div>
              <p class="characterDescription">{{item.title}}</p>
              <p class="priceDescription">{{item.price}}豆</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>

// <hot-products :propImgs="propImgs" :wxregstyle="true" /> 微信页面传参
export default {
    name: 'HotProducts',
    props: {
        propImgs: {
            type: String,
            default: require('@/assets/imgs/invitaion/tit2.png')
        },
        changeUrlWidth: {
            type: Boolean,
            default: true
        },
        wxregstyle: {
            type: Boolean,
            default: false
        },
        moduleType: {
          type: String,
          default: '03'
        },
        isClick: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
            commodityList: [],
            isBrowser: false
        }
    },
    created () {
        this.isBrowser = this.$app.isBrowser()
        this.getCommodity()
    },
    methods: {
        getCommodity () {
            this.$request({
                url: `/act/resource/image?moduleType=${this.moduleType}`,
                contentType: 'application/json;charset=UTF-8',
                isLoading: true,
                successFn: data => {
                    this.commodityList = data
                },
                failFn: data => {}
            })
        },
        // 跳转商品链接
        goCommodity (item) {
            if (!this.isClick) {
              return false
            }
            if (this.isBrowser) { // app内部
                let that = this
                const localUrl = location.href.toLocaleLowerCase()
                if (localUrl.includes('/activity/invitation')) { // 邀请好友页面跳转处理
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler(
                  'backHomeConfig',
                            {
                                flag_back: 0 // 是否返回按钮，1-返回 0-不返回
                            },
                  function (response) {}
                )
                    })
                }
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/shop/zuifuli/login`,
                        contentType: 'application/json;charset=UTF-8',
                        params: {redirect: `${item.linkUrl}`},
                        isLoading: true,
                        isEncript: true,
                        userToken: userToken,
                        successFn: data => {
                            window.location.href = data
                        },
                        failFn: data => {}
                    })
                })
            } else { // app外部下载app
              this.$app.downLoadApp()
              return false
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.hot-mod {
  margin-top: 80px;
  &.wxregstyle {
    margin-top: 50px;
  }
  .hotExchange {
    width: 496px;
    height: 35px;
    margin: 40px auto;

    &.changeWidth {
      width: 415px;
    }
    &.wxregstyle {
      width: 100%;
      height: 80px;
      margin-bottom: 0;
      margin-top: 0;
    }
  }
  .goodsList {
    width: 690px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    border-radius: 8px;
    background: #fff;
    ul {
      display: flex;
      margin-left: 20px;
      li {
        flex: 1;
        margin-right: 20px;
        .img-wrap {
          background: #faf3ec;
          margin-top: 20px;
          max-height: 200px;
          line-height: 200px;
          text-align: center;
          border-radius: 10px;
          img {
            max-height: 200px;
            margin: 0 auto;
            display: inline-block;
            vertical-align: middle;
          }
        }

        p {
          text-align: center;
        }

        %ellipsis {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .characterDescription {
          @extend %ellipsis;
          width: 100%;
          line-height: 60px;
          font-size: 26px;
        }
        .priceDescription {
          @extend %ellipsis;
          width: 100%;
          line-height: 30px;
          font-size: 26px;
          color: #e10312;
        }
      }
    }
  }
}
</style>
