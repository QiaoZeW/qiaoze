<template>
    <div class="section sucess-wrap">
        <div class="sucessimg">
            <img src="@/assets/imgs/intelligentunderwrite/sucess.png" alt="这是一张图片未显示">
        </div>
        <div class="text-content">
            <p class="text">恭喜，核保通过</p>
        </div>
        <div class="text-content" v-if="EXInfo">
            <p class="tip">本次核保结果对以下疾病所导致的保险事故不承担赔付责任，是否接受并继续投保？</p>
            <div class="exclusions" v-html="EXInfo"></div>
        </div>
        <div class="btns">
            <md-button type="default" @click="backHome" style="margin-bottom: 20px;" v-if="isBrowser">返回首页</md-button>
            <md-button type="primary" @click="goInsure">继续</md-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "Sucess",
  components: {},
  data() {
    return {
      isBrowser: false,
      agentCode:"",
      EXInfo: "",
      product_id: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isBrowser = this.$app.isBrowser()
      this.agentCode = this.$router.query("agentCode");
      this.product_id = this.$router.query("product_id") || "1";
      this.$app.wxProductDetail(this.product_id, 1)
      this.EXInfo = localStorage.getItem("EXInfo");
      localStorage.removeItem("EXInfo"); //赋值后马上删除避免影响其他流程
      setupWebViewJavascriptBridge(function(bridge) { //点击左上按钮回首页
        bridge.callHandler(
          "backHomeConfig",
          {
            flag_back: 1 //是否返回按钮，1-返回 0-不返回
          },
          function(response) {}
        );
      });
    },
    goInsure() {
			if (this.agentCode) {
				window.location.href = "/product/Buy.html?product_id=" + this.product_id +  "&agentCode=" + this.agentCode;
			} else{
				window.location.href = "/product/Buy.html?product_id=" + this.product_id; //todo product_id不能写死
			}
    },
    backHome() {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("backHome", { id: 2 }, function(responseData) {});
      });
    }
  }
};
</script>

 <style lang="scss" scoped>
$primaryColor: #8e8e8e;
.sucess-wrap {
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .sucessimg {
    width: 264px;
    height: 268px;
    margin: 76px auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .text-content {
    width: 572px;
    margin: 0 auto;

    p {
      text-align: center;
      font-size: 32px;

      &.text {
        margin-top: 44px;
        color: #333;
      }

      &.tip {
        color: $primaryColor;
        margin-top: 22px;
        font-size: 26px;
        line-height: 45px;
      }
    }
  }

  .exclusions {
    box-sizing: border-box;
    width: 574px;
    margin: 28px auto;
    border-radius: 10px;
    padding: 40px 60px;
    line-height: 40px;
    background-color: #f2f2f2;
  }

  .btns {
    padding: 130px 30px;
  }
}
</style>
