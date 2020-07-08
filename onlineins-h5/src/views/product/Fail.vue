<template>
  <div class="section fail-wrap">
    <div class="failimg">
      <img src="@/assets/imgs/intelligentunderwrite/fail.png" alt="这是一张图片未显示">
    </div>
    <div class="text-content">
      <p class="text">抱歉，被保险人未能通过本次投保审核</p>
      <div class="fail-content" v-if="failReason" v-html="failReason"></div>
    </div>
    <div class="btns">
      <md-button type="default" @click="backHome" style="margin-bottom: 20px;" v-if="isBrowser">返回首页</md-button>
      <md-button type="primary" @click="review">重新测评</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fail",
  components: {},
  data() {
    return {
			agentCode: "",
      failReason: "",
      product_id: "",
      isBrowser:false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isBrowser = this.$app.isBrowser()
			this.agentCode = this.$router.query("agentCode");
      this.product_id = this.$router.query("product_id");
        this.$app.wxProductDetail(this.product_id, 0)
      this.failReason = decodeURIComponent(localStorage.getItem("failReason"));
      if (this.failReason === "null") {
        this.failReason = null;
      }
      localStorage.removeItem("failReason"); // 及时清除缓存，避免影响其他流程
    },
    review() {
			if (this.agentCode) {
				window.location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
			} else{
				window.location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id;
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
.fail-wrap {
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .failimg {
    width: 264px;
    height: 268px;
    margin: 76px auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .text-content {
    p {
      text-align: center;
      font-size: 32px;
      &.text {
        margin-top: 44px;
        color: #333;
      }
      &.tip {
        color: #8e8e8e;
        margin-top: 22px;
      }
    }
    .fail-content {
      box-sizing: border-box;
      width: 574px;
      margin: 28px auto;
      border-radius: 10px;
      padding: 40px 60px;
      line-height: 40px;
      background-color: #f2f2f2;
    }
  }
  .btns {
    padding: 206px 30px 166px;
  }
}
</style>
