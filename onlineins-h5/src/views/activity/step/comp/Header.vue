<template>
    <div class="header">
      <div class="left">
        <img @click="howTodraw" class="gift" src="@/assets/imgs/stepComputed/new/icon10.png" alt="">
        <GProgress v-if="processStep" :width="238" :height="30" :step="processStep" />
      </div>
      <div class="right">
        <img @click="share" class="share" src="@/assets/imgs/stepComputed/new/icon12.png" alt="">
      </div>
    </div>
</template>

<script>
    import GProgress from './GProgress'
    export default {
        name: "Header",
        data () {
            return {
              siteUrl: this.$router.siteUrl(),
              shareImgUrl: require("@/assets/imgs/stepComputed/new/share_map.png"),
              secondaryDistributor: '',
              thirdClassDistributor: ''
            }
        },
        components: {
          GProgress
        },
        props: {
          processStep: {
            type: Number,
            default: 10
          }
        },
        created() {
          this.secondaryDistributor = this.$router.query("secondaryDistributor") || 'CPS_00010009';
          this.thirdClassDistributor = this.$router.query("thirdClassDistributor") || ''
        },
        methods: {
          howTodraw () {
            this.$emit('howTodraw')
          },
          share () {
            console.log('share---')
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
                        share_url: `${this.siteUrl}/activity/step/StepNew.html?secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=${this.thirdClassDistributor}`, //分享跳转的url
                        share_title: '穿越中国拿大奖', //分享标题
                        share_text: '穿越中国拿大奖', //分享描述
                        share_imgurl: this.siteUrl + this.shareImgUrl //分享图片地址
                    }
                );
            })
          }
        }
    }
</script>

<style lang='scss' scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 26px;
  .left {
    display: flex;
    margin-top: 20px;
    .gift {
      width: 64px;
      height: 58px;
      margin-right: 12px;
    }
  }
  .right {
    .share {
      width: 88px;
      height: 88px;
    }
  }
}
</style>
