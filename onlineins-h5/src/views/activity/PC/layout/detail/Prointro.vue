<template>
    <div class="detail">
      <div class="detail-inner">
        <div class="left">
          <h2>{{ introData.title }}</h2>
          <p>
            <b>投保年龄：</b>
            <span>{{ introData.age }}</span>
          </p>
          <p>
            <b>缴费方式：</b>
            <span>{{ introData.payStyle }}</span>
          </p>
          <p>
            <b>缴费年限：</b>
            <span>{{ introData.payLimit }}</span>
          </p>
          <div class="total">
            <p>
              <b>保费：</b>
              <span class="unit">￥</span>
              <span class="money unit bold">{{ introData.money }}</span>
              <span>元起</span>
            </p>
            <button class="gonInsrue" @click="gonInsrue">立即投保</button>
          </div>
        </div>
        <div class="right">
          <img :src="introData.imgUrl" alt="" width="408">
        </div>
      </div>
      <div class="qr_code_wrap" :class="{'show': showQrCode}">
        <md-icon class="close" name="close" size="md" @click="closeQrCode"></md-icon>
        <img :src="qrCodeUrl" alt="">
        <p>手机扫码&nbsp;&nbsp;立即投保</p>
      </div>
      <div class="bottomGoInsure" @click="gonInsrue" :class="{'show': (sclTop > 800 && !showQrCode), 'offsetTop': offsetTopShow}">
        <button>立即投保</button>
      </div>
    </div>
</template>

<script>
    import proIntroData from './proIntroData'
    export default {
        name: "PCindex",
        data () {
          return {
            proIntroData: proIntroData,
            introData: {},
            product_id: '',
            qrCodeUrl: require(`@/assets/imgs/activity_pc/pc_detail/1/qr_code.png`),
            showQrCode: false,
            showBottomBtn: false,
            offsetTopShow: false,
            sclTop: 0,
            offsetTop: 0,
            clientHeight: 0,
            scrollHeight: 0,
            windowHeight: 0
          }
        },
        created() {
          this.product_id = this.$router.query('product_id') || '1'
          this.introData = this.proIntroData[this.product_id]
          document.title = this.introData.title
          this.qrCodeUrl = require(`@/assets/imgs/activity_pc/pc_detail/${this.product_id}/qr_code.png`)
        },
        mounted() {
            let self = this
            window.addEventListener("scroll", this.hScroll);
            this.clientHeight = document.querySelector('.footer').clientHeight

        },
        destroyed() {
            window.removeEventListener("scroll", this.hScroll);
        },
        methods: {
          getScrollTop(){
          　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
          　　if(document.body){
          　　　　bodyScrollTop = document.body.scrollTop;
          　　}
          　　if(document.documentElement){
          　　　　documentScrollTop = document.documentElement.scrollTop;
          　　}
          　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
          　　return scrollTop;
          },
          getScrollHeight(){
          　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
          　　if(document.body){
          　　　　bodyScrollHeight = document.body.scrollHeight;
          　　}
          　　if(document.documentElement){
          　　　　documentScrollHeight = document.documentElement.scrollHeight;
          　　}
          　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
          　　return scrollHeight;
          },
          getWindowHeight(){
          　　var windowHeight = 0;
          　　if(document.compatMode == "CSS1Compat"){
          　　　　windowHeight = document.documentElement.clientHeight;
          　　}else{
          　　　　windowHeight = document.body.clientHeight;
          　　}
          　　return windowHeight;
          },
          gonInsrue () {
            this.showQrCode = true
          },
          closeQrCode () {
            this.showQrCode = false
          },
          hScroll() {
              this.sclTop = this.getScrollTop()
              this.windowHeight = this.getWindowHeight()
              this.scrollHeight = this.getScrollHeight()
              this.showBottomBtn = (this.sclTop > 800 && !this.showQrCode)
              this.offsetTopShow = (this.sclTop > this.scrollHeight-this.windowHeight-this.clientHeight )
          }
        }
    };
</script>

<style lang='scss' scoped>
.bold {
  font-weight: bold;
}
.detail {
  background-color: #fff;
  .detail-inner {
    width: 990PX;
    padding-top: 90PX;
    padding-bottom: 60PX;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      margin-top: 32PX;
      h2 {
        margin-bottom: 40PX;
        font-size: 36PX;
        font-weight: bold;
      }
      > p {
        margin-bottom: 20PX;
        font-size: 24PX;
        > span {
          font-size: 24PX;
          color: #575757;
        }
      }
      .total {
        display: flex;
        margin-top: 20PX;
        font-size: 24PX;
        .unit {
          color: #C42C20;
        }
        .money {
          font-size: 40PX;
        }
        button {
          width: 190PX;
          height: 46PX;
          color: #fff;
          line-height: 46PX;
          text-align: center;
          background-color: #D6000E;
          margin-left: 24PX;
          font-size: 24PX;
          margin-top: 0PX;
          border-radius: 4PX;
          cursor: pointer;
        }
      }
    }
  }
  .qr_code_wrap {
    width: 368PX;
    height: 339PX;
    background: rgba(0,0,0, .6);
    position: fixed;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: center;
    -webkit-transform: translate(-50%, -50%);
       -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
         -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    opacity: 0;
    z-index: -1;
    img {
      width: 179PX;
      height: 179PX;
      margin-top: 50PX;
    }
    &.show {
      opacity: 1;
      z-index: 1;
    }
    .close {
      position: absolute;
      right: 10PX;
      top: 10PX;
      color: #fff;
    }
    p {
      font-size: 26PX;
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 50PX;
    }
  }
  .bottomGoInsure {
    height: 114PX;
    width: 100%;
    background: rgba(0,0,0, .6);
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: -1;
    button {
      width: 170PX;
      height: 40PX;
      line-height: 40PX;
      border-radius: 4PX;
      text-align: center;
      background-color: #D6000E;
      font-size: 16PX;
      color: #fff;
      cursor: pointer;
    }
    &.offsetTop {
      bottom: 363PX;
    }
    &.show {
      opacity: 1;
      z-index: 1;
    }
  }
}
</style>

