<template>
    <div class="giving-login-wrap">
        <div class="banner">
          <img src="@/assets/imgs/giving/img01.png" alt="">
        </div>
        <div class="block-wrap totop">
          <Login />
        </div>
        <EnsureContent />
        <p class="tip">
          *本活动最终解释权归百年人寿所有
        </p>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    import Login from '@/components/Login'
    import EnsureContent from './EnsureContent'
    export default {
        name: "GivingLoginWrap",
        components: {
          Login,
          EnsureContent
        },
        data () {
            return {
              showText: false,
            }
        },
        created() {
            window.localStorage.clear()
            window.sessionStorage.clear()
        },
        methods: {
        }
    }
</script>

<style lang='scss' scoped>
.giving-login-wrap {
    background-color: #FFE4D2;
    padding-bottom: 40px;
    overflow: hidden;
    .banner {
      height: 1132px;
      width: 750px;
      background: url('../../../assets/imgs/giving/banner.png') top center no-repeat;
      background-size: contain;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      box-sizing: border-box;
      img {
        width: 416px;
        height: 314px;
        margin: 0 auto;
      }
    }
    .tip {
      font-size: 28px;
      color: #FC8F7D;
      padding-left: 48px;
      width: 750px;
      margin: 0 auto;
    }
}
</style>
