<template>
  <div class="serious-illness">
    <div v-show="banner" class="banner">
      <img :src="banner" alt="重疾banner图片">
      <div class="banne-tip" v-if="isShow">
        {{ name }}共{{ datas.length }}个问答，阅读完毕预计用时3分钟
      </div>
    </div>
    <div class="content">
      <div class="line"></div>
      <div class="block-item" v-for="(item,index) in datas">
        <div class="title">
          <div class="icon"></div>
          <div class="title-content">{{ item.title }}</div>
        </div>
        <div class="con" :class="{'animate': item.isClick}">
          <div class="all-con" :style="item.isClick? 'display: -webkit-box;-webkit-line-clamp: 4;overflow: hidden; -webkit-box-orient: vertical !important;':''" v-html="item.content">
          </div>
          <div class="up" @click="slideUp(item)">
            <span v-show="!item.isClick">收起</span>
            <span v-show="item.isClick">展开</span>
            <img class="up-img" :class="{'down': !item.isClick}" src="@/assets/imgs/insureQues/arrow.png" alt="箭头图标">
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Template',
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    banner: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  created () {
    //this.noShare()
  },
  methods: {
    slideUp (item) {
      item.isClick = !item.isClick
      this.loadShenceData(item)
    },

      //神策埋点
    loadShenceData(item) {
          sensors.track("insurance_20Q_more_click", {
              risk_type : this.name,
              content_title: item.title,
          });
        console.log('产品类型：',this.name)
        console.log('内容标题：',item.title)
    },

    noShare () {
      //设置APP内不分享
      setupWebViewJavascriptBridge(function(bridge) {
        //导航是否显示分享按钮
        bridge.callHandler(
          "navigationConfig",
          {
            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
            flag_share: 0, //是否显示分享按钮，1-显示 0-不显示
          },
          function(response) {
          }
        );
      });
    }
  }
}
</script>
<style lang="scss"
       scoped>
.serious-illness {
  padding: 0px 12px 30px;

  .banner {
    border-radius: 10px;
    margin-top: 40px;
    img {
      border-radius: 10px;
    }
    .banne-tip {
      text-align: right;
      color: #333;
      font-size: 22px;
      margin-top: 14px;
    }
  }

  .content {
    margin-top: 30px;
    position: relative;
    overflow: hidden;

    .line {
      position: absolute;
      width: 2px;
      height: 100%;
      left: 28px;
      top: 40px;
      z-index: -1;
      border-left: 4px dashed #EAF6FC;
    }

    .block-item {
      margin-top: 30px;
    }
    .title {
      display: flex;
      margin-bottom: 20px;

      .icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #EAF6FC;
        margin-right: 30px;
        margin-top: 10px;
      }

      .title-content {
        min-width: 438px;
        max-width: 604px;
        background-color: #EAF6FC;
        border-radius: 66px;
        box-sizing: border-box;
        padding: 20px 34px;
        line-height: 40px;
        color: #333;
        font-size: 30px;
      }
    }

    .con {
      margin-left: 86px;
      box-sizing: border-box;
      width: 604px;
      background-color: #F9F9F9;
      padding: 20px 34px 80px;
      color: #8e8e8e;
      font-size: 26px;
      line-height: 42px;
      position: relative;
      border-radius: 12px;
      &.animate {
        animation: fadeIn 2s forwards;
      }

      .ellips-con {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        overflow: hidden;
          /*! autoprefixer: off */
        -webkit-box-orient: vertical !important;
          /* autoprefixer: on */
      }

      .up {
        color: #333;
        font-size: 26px;
        position: absolute;
        bottom: 16px;
        right: 50px;
        display: flex;

        .up-img {
          width: 24px;
          height: 14px;
          margin-top: 16px;
          margin-left: 20px;
          transition: all .5s;

          &.down {
            transform: rotateX(180deg)
          }
        }
      }
    }
  }
}
@keyframes fadeIn{
  0% {
    opacity: 1;
  }
  5% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
