<template>
    <div class="wrap">
      <md-popup v-model="rulesPopupShow">
        <div class="pop-rules">
          <h3>一、活动对象：</h3>
          <p>百年人寿APP用户</p>
          <h3>二、活动时间：</h3>
          <p>2020年1月15日至2020年3月31日</p>
          <h3>三、活动说明：</h3>
          <p>用户可使用百年人寿APP账户内的百佳豆进行健康服务和礼包的兑换，一经兑换不得更改。</p>
          <p>因受春节期间物流影响，活动商品预计2020年2月20日陆续发货。</p>
          <p class="bottom">
            本活动解释权归百年人寿保险股份有限公司
          </p>
          <md-icon @click="rulesPopupShow=false" class="close" name="wrong" size="md" />
        </div>
      </md-popup>

     <md-popup v-model="tipShow">
        <div class="epopup">
          <h4>{{ params.title }}</h4>
          <p v-html="params.text"></p>
          <div class="btns" :class="{'twobtn': params.twobtn}">
            <button v-if="params.twobtn" class="cancel" @click="cancelClick">取消</button>
            <button :class="{'blue': params.isBlue}" @click="btnClick">{{ params.btnText }}</button>
          </div>
        </div>
      </md-popup>
    </div>
</template>

<script>
    export default {
        name: "Epopup",
        data () {
            return {
              tipShow: false,
              rulesPopupShow: false,
              params: {
                title: '失败',
                btnText: '确定',
                text: '失败原因',
                twobtn: false,
              }
            }
        },
        props: {
        },
        created() {
        },
        methods: {
          showTip (obj) {
            let defaultObj = {
              title: '',
              btnText: '确定',
              text: '失败原因',
              twobtn: false
            }
            this.params = Object.assign({}, defaultObj, obj)
            this.tipShow = true
          },
          hideTip () {
            this.tipShow = false
          },
          btnClick () {
            if (this.params.clickFn) {
              this.params.clickFn()
            } else {
              this.tipShow = false
            }
          },
          showRulesPopup() {
            this.rulesPopupShow = true
          },
          cancelClick () {
            this.tipShow = false
          }
        }
    }
</script>

<style lang='scss' scoped>
.pop-rules {
  width: 642px;
  margin: 0 auto;
  background-color: #fff;
  color: #333;
  padding: 56px 56px 40px;
  box-sizing: border-box;
  border-radius: 12px;

  h3 {
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 28px;
  }
  p {
    margin-bottom: 12px;
    font-size: 28px;
    &.bottom {
      margin: 40px 0 12px;
      color: #BDC1CD;
      font-size: 24px;
    }
  }
  .close {
    position: absolute;
    top: 30px;
    right: 30px;
    color: #ccc;
    z-index: 10;
  }
}

.epopup {
  background-color: #fff;
  width: 542px;
  padding: 48px 30px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 12px;
  h4 {
    font-weight: bold;
    font-size: 36px;
    color: #333;
    text-align: center;
  }
  p {
    font-size: 28px;
    margin: 40px auto;
    color: #333;
    text-align: center;
    width: 70%;
    line-height: 40px;
  }
  .btns {
    &.twobtn {
      display: flex;
      justify-content: space-between;
      button {
        width: 226px;
        &.cancel {
          background-color: #DDDDDD;
          color: #333;
        }
      }
    }
    button {
      width: 356px;
      height: 88px;
      line-height: 88px;
      border-radius: 8px;
      background-color: #E10312;
      text-align: center;
      color: #fff;
      font-size: 32px;

      &.cancel {

      }
    }
  }
}
</style>
