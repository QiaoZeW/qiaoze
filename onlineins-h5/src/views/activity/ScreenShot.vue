<template>
   <section>
       <div class="contentTop">
           <img src="@/assets/imgs/appointment/bg_top02.png" class="bg_top_02"/>
       </div>
       <div class="contentBody">
           <div class="qrCode_part01">
               <img src="@/assets/imgs/appointment/qrCode_left_pic.png" />
               <p>微信扫码或长按识别</p>
           </div>
           <div class="qrCode">
               <vue-qr :logoSrc="imageUrl"    :text="downloadData.url" :size="400"></vue-qr>
           </div>
       </div>
   </section>
</template>

<script>
    import vueQr from 'vue-qr'
    export default {
        name: "ScreenShot",
        data(){
            return{
                imageUrl:  require('../../assets/imgs/appointment/logo_qrCode.png'),
                dataUrl:'',
                downloadData: {
                    url: ''
                }

            }
        },
        components:{
            vueQr
        },
        created() {
            this.downloadData.url = sessionStorage.getItem('qrCode_share')
        }
    }
</script>

<style lang="scss" scoped>
  .contentTop{
      background: url("../../assets/imgs/appointment/bgTop.png");
      background-size: 100% 100%;
      height: 878px;
      position: relative;
      width: 100%;
      .bg_top_02 {
          position: absolute;
          width: 473px;
          height: 327px;
          left: 50%;
          margin-left: -236px;
          top: 16px;
          z-index: 22;
      }
  }
  .contentBody{
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .qrCode_part01{
          flex: 1;
          padding-top: 22px;
          img{
              margin: 0 auto;
              width: 282px;
              height: 134px;
          }
          p{
              margin-top: 49px;
              text-align: center;
              font-size: 26px;
              color: #333;
          }
      }
      .qrCode{
          flex: 1;
      }
  }
    .qrCode{
        width: 100%;
        overflow: hidden;
        display: flex;
        img{
            display: block !important;
            margin: 0 auto 0;
            width: 266px;
            height: 266px;
        }
        p{
            float: right;
            font-size: 26px;
            color: #333;
            margin-top: -1rem;
            margin-right: 1rem;
        }
    }
</style>
