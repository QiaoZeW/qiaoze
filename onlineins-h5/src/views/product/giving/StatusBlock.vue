<template>
    <div class="status-block-wrap" :class="{'status-color': second}">
      <div class="first-img" v-if="!second" >
          <img v-if="status == 0" class="status" src="@/assets/imgs/giving/status1.png" alt="">
          <img v-else class="status" src="@/assets/imgs/giving/status3.png" alt="">
      </div>
      <div class="second-img" v-else>
          <img v-if="status == 0" class="status" src="@/assets/imgs/giving/status2.png" alt="">
          <img v-else-if="status == 1 || status == 2" class="status" src="@/assets/imgs/giving/status1.png" alt="">
          <img v-else class="status" src="@/assets/imgs/giving/status3.png" alt="">
      </div>
      <h3>重大疾病保险体验版</h3>
      <h4>{{ second ? '最高加保2.5万' : '基础保额' }}</h4>
      <img src="@/assets/imgs/giving/line_gray.png" alt="">
      <p>保障期限：1年</p>
      <p>保障年龄：18—45周岁</p>
      <div class="insure-num">
        ￥<span>0</span>元
      </div>
       <div v-if="!(isBrowser||isBnMiniApp)">
           <p v-if="!second && status != 0" class="queryPolicy" @click="goDownload">查看保单</p>
           <p v-if="second && status == 3" class="queryPolicyS" @click="goDownload">查看保单</p>
       </div>
    </div>
</template>

<script>
    export default {
        name: "Gbuycomp",
        data () {
            return {
                isBrowser: true,
                isBnMiniApp: false
            }
        },
        props: {
          second: {
            type: Boolean,
            default: false
          },
          status: { // 0--初次待领取  1--初次已领取完毕结果页  2--二次待领取  3--二次已领取完毕结果页
            type: Number,
            default: 0
          },
        },
        created() {
            this.isBrowser = this.$app.isBrowser()
            this.isBnMiniApp = this.$app.isMiniProgram() && this.$app.isBnMiniApp()
        },
        methods: {
            goDownload(){
                this.$app.downLoadApp()
            }
        }
    }
</script>

<style lang='scss' scoped>
    .queryPolicy , .queryPolicyS{
        margin: 0 auto;
        background: #5C6BD0;
        height: 68px;
        font-size: 32px;
        text-align: center;
        line-height: 68px;
        color: #fff !important;
        width: 236px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
    }
    .queryPolicyS{
        background: #FF6F58 !important;
    }
.status-block-wrap {
  color: #5C6BD0;
  position: relative;
  &.status-color {
    color: #FF6F58;
  }
  h3,h4,p,div {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 40px;
    font-weight: bold;
  }
  h4 {
    font-size: 36px;
    font-weight: bold;
  }
  p {
    color: #9295AA;
  }
  img {
    margin-bottom: 20px;
    &.status {
      width: 102px;
      height: 86px;
      position: absolute;
      top: -80px;
      left: -22px;
    }
  }
  .insure-num {
    font-size: 32px;
    margin-bottom: 0;
    span {
      font-size: 108px;
      font-weight: bold;
    }
  }
}
</style>
