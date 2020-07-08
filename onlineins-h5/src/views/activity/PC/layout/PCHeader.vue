<template>
    <header class="header">
        <div class="header-inner">
          <div class="left">
              <a href="/activity/PC/PCindex.html">
                <img src="@/assets/imgs/activity_pc/layout/logo.png" alt="" width="230" height="62">
              </a>
              <img src="@/assets/imgs/activity_pc/layout/logo_line.png" alt="" width="2" height="66">
              <img src="@/assets/imgs/activity_pc/layout/logo_phone.png" alt="" width="170" height="62">
          </div>
          <div class="right">
              <a href="/activity/PC/PCindex.html" class="btn1" :class="{'active': activeIndex===1}">
                <img v-if="activeIndex===1" src="@/assets/imgs/activity_pc/layout/icon02.png" alt="">
                <img v-else src="@/assets/imgs/activity_pc/layout/icon02_1.png" alt="">
                <span>产品中心</span>
              </a>
              <a href="/activity/PC/PCscan.html" class="btn2" :class="{'active': activeIndex===2}">
                <img v-if="activeIndex===2" src="@/assets/imgs/activity_pc/layout/icon03.png" alt="">
                <img v-else src="@/assets/imgs/activity_pc/layout/icon03_1.png" alt="">
                <span>我的保单</span>
              </a>
          </div>
        </div>
    </header>
</template>

<script>
    import { setSize } from '../PCutils'
    export default {
        name: "Header",
        data () {
            return {
            }
        },
        created() {
          setSize ()
        },
        computed: {
          activeIndex () {
            return location.href.includes('/activity/PC/PCscan') ? 2 : 1
          }
        },
        methods: {
        }
    };
</script>

<style lang='scss' scoped>
.header {
  background-color: #FFF;
  .header-inner {
    width: 1172PX;
    margin: 0 auto;
    height: 150PX;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      img {
        margin-right: 36PX;
      }
    }

    .right {
      display: flex;
      a {
        width: 190PX;
        height: 60PX;
        line-height: 60PX;
        text-align: center;
        font-size: 24PX;
        color: #9A9A9A;
        background-color: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 25PX;
          height: 25PX;
        }
        span {
          margin-left: 8PX;
        }
        &.btn1 {
          border-top-left-radius: 8PX;
          border-bottom-left-radius: 8PX;
        }
        &.btn2 {
          border-top-right-radius: 8PX;
          border-bottom-right-radius: 8PX;
        }
        &.active {
          background-color: #C5241A;
          color: #fff;
        }
      }
    }
  }
}

</style>

