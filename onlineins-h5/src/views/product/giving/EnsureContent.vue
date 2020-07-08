<template>
    <div class="ensure-content-wrap login-wrap">
      <div class="block-wrap">
        <img class="img02" src="@/assets/imgs/giving/img02.png" alt="">
        <div class="content1">
          <img src="@/assets/imgs/giving/img04.png" alt="">
          <img src="@/assets/imgs/giving/img05.png" alt="">
        </div>
        <img class="img03" src="@/assets/imgs/giving/img03.png" alt="">
        <div class="text">
          <p>1.活动期间每位用户最多可领2份重疾赠险：<br>
              ①凭个人有效身份信息领取1份；<br>
              ②领取成功后分享给好友，好友成功领取，即可再领1份。
          </p>
          <div v-if="showText">
            <p>2.每位用户分享给好友后，最多支持1位好友领取。</p>
            <p>3.最大可领取重疾保额的上限由被保人年龄决定，当被保人为：<br>
            ①18—35周岁（含），最多可领取2.5万保额；<br>
            ②36—45周岁（含），最多可领取1万保额。</p>
          </div>
          <div class="showmore" v-else @click="showText = true">
            展开更多
             <md-icon name="arrow-down" size="sm" />
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "EnsureContent",
        data () {
            return {
              showText: false,
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang='scss' scoped>
.ensure-content-wrap {
  .block-wrap {
    img{
      &.img02,
      &.img03 {
        width: 388px;
        height: 56px;
        margin: 0 auto;
      }

    }
    .content1 {
        display: flex;
        justify-content: space-between;
        padding: 28px 34px 76px;
        img {
          width: 232px;
          height: 278px;
        }
    }
    .text {
      margin-top: 32px;
      p {
        font-size: 30px;
        color: #333;
        line-height: 46px;
      }
      .showmore {
        color: #FC8F7D;
        margin-top: 44px;
        text-align: center;
      }
    }

  }
}
</style>
