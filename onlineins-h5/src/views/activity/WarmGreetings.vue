<template>
     <section>
         <div class="contentTop"><img src="@/assets/imgs/groupBuying/warmGreetings.png" /></div>
         <div class="contentMid">
             <div class="contentBody">
                  <h3>接受好友分享至<span>百年人寿APP</span>内付费获取保障</h3>
                 <img src="@/assets/imgs/groupBuying/yiliao.png" class="yiLiao"/>
                 <div class="verification">
                     <p class="goVerification" @click="goRegister">立即注册领百元礼包</p>
                 </div>
             </div>
         </div>
     </section>
</template>

<script>
    export default {
        name: "WarmGreetings",
        data(){
          return{
              userCode:''
          }
        },
        created(){
          this.userCode = this.$router.query('inviterCode')
        },
        methods:{
            goRegister(){
                location.href = this.$router.siteUrl() + '/activity/InvitationShare.html?groupBuying=1&inviterCode=' + this.userCode
            }
        }
    }
</script>

<style lang="scss" scoped>
 .register{
     border: 1px solid #ccc;
     background: #E10312;
     font-size: 32px;
     height: 88px;
     line-height: 88px;
     width: 200px;
     margin: 0 auto;
     margin-top: 40px;
     color: #fff;
     -webkit-border-radius: 10px;
     -moz-border-radius: 10px;
     border-radius: 10px;
 }
 .contentTop{
     width: 100%;
     min-height: 832px;
     img{
         width: 100%;
         min-height: 832px;
     }
 }
    .contentMid{
        background: url("../../assets/imgs/groupBuying/bgMid.png") no-repeat;
        background-size: cover;
        padding-bottom: 72px;
    }
    .contentBody{
        -webkit-border-radius: 26px;
        -moz-border-radius: 26px;
        border-radius: 26px;
        background: #ffefed;
        margin: 0 26px;
        box-shadow:  0 0 1.5rem #ffcbbb inset;
        padding-top: 44px;
        h3{
            font-size: 30px;
            color: #353535;
            text-align: center;
            span{
                color: #EB3B14;
            }
        }
    }
    .yiLiao{
        width: 646px;
        height: 290px;
        margin: 32px auto 0;
    }
 .verification{
     padding-bottom:42px;
 }
 .goVerification{
     width: 570px;
     height: 88px;
     line-height: 88px;
     margin: 48px auto 0;
     font-size: 32px;
     color: #fff;
     text-align: center;
     -webkit-border-radius: 50px;
     -moz-border-radius: 50px;
     border-radius: 50px;
     background: linear-gradient(to right,#ff903a,#ff3f32);
     background:  -webkit-linear-gradient(to right,#ff903a,#ff3f32);
 }
</style>
