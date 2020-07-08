<template>
    <div class="box-order">
        <h1></h1>
        <h2 class="title-info">领取成功</h2>
        <div class="box-detail">
            <div class="box-content-detail">
               <div class="box-title">被保人信息</div>
               <div class="orderdetail-top">
                   <div class="orderdetail">
                     <div class="order-left name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
                     <div class="order-right">{{insuredName}}</div>
                   </div>
                   <div class="orderdetail">
                     <div class="order-left">证件号码：</div>
                     <div class="order-right">{{insuredCard}}</div>
                   </div>
                   <div class="orderdetail">
                     <div class="order-left">手机号码：</div>
                     <div class="order-right">{{insuredPhone}}</div>
                   </div>
               </div>
            </div>
            <div class="box-content-detail box-content-detail2">
               <div class="box-title2">保障内容</div>
               <div class="orderdetail-top">
                   <div class="orderdetail">
                     <div class="order-left amnt">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：</div>
                     <div class="order-right">{{amnt}}万元</div>
                   </div>
                   <div class="orderdetail">
                     <div class="order-left">生效日期：</div>
                     <div class="order-right">{{startTime}}</div>
                   </div>
                   <div class="orderdetail">
                     <div class="order-left">终止日期：</div>
                     <div class="order-right">{{endTime}}</div>
                   </div>
               </div>
            </div>
        </div>
        <div class="goButton" @click="goButton">继续为家人投保</div>
    </div>
</template>
<script>
	import {Dialog,Toast, Button} from 'mand-mobile'
	export default {
		name:'GiftSuccessful',
		data(){
			return {
                secondaryDistributor:'',
                thirdClassDistributor:'',
                productRiskId:'',
                insuredName: '',
                insuredCard: '',
                insuredPhone: '',
                amnt: '',
                startTime: '',
                endTime:'',
		    }
        },
        created(){
            document.title = '百年抗癌特药险'
            this.secondaryDistributor = this.$router.query("secondaryDistributor")
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor")
            this.productRiskId = this.$router.query("productRiskId")
            let successfulData = JSON.parse(localStorage.getItem("successfulData"));
            this.insuredName = successfulData.insuredName
            this.insuredCard = successfulData.insuredIdNo
            this.insuredPhone = successfulData.insuredMobile
            this.amnt = Number(successfulData.amnt)/10000
            this.startTime = successfulData.cvaliDate
            this.endTime = successfulData.terminationTime
        },
		methods:{
            goButton(){
                this.insuredName = window.localStorage.removeItem("insuredName")
                this.insuredCard = window.localStorage.removeItem("insuredCard")
                this.insuredPhone = window.localStorage.removeItem("insuredPhone")
                let isbn = '0'
                if (this.$app.isMiniProgram() && this.$app.isBnMiniApp()) {
                    isbn = '1'
                }
                window.location.href = this.$router.siteUrl() +'/product/giftInsurance/GiftInsuranceDetail.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor+'&isbn='+isbn;
            }
		}
	}
</script>
<style lang="scss" scoped>
    h1{
        width: 120px;
        height: 120px;
        background: url(../../../assets/imgs/giftInsurance/success.png) no-repeat;
        background-size: 100%;
        margin: 35px auto 23px;
    }
    .title-info {
        font-size: 32px;
        color: #333333;
        font-weight: 700;
        text-align: center;
    }
    .box-order {
        background: #fff;
        height: 100%;
    }
    .box-detail {
      height: 670px;
      border-radius: 10px;
      border: 1px solid rgba(13,79,189,0.19);
      box-shadow:0px 0px 16px 0px rgba(13,79,189,0.19);
      margin: 60px 40px 81px;
      .box-content-detail{
          margin: 55px 66px 0;
          height: 271px;
          border-bottom: 1px dashed rgba(203,211,223,1);
          .box-title {
            width: 192px;
            height: 31px;
            line-height: 31px;
            font-size: 32px;
            font-weight: 700;
            color: #4B93FF;
            text-align: center;
            margin: 35px auto 45px;
            background: url(../../../assets/imgs/giftInsurance/squar2.png) no-repeat;
            background-size:100% 55%;
            background-position: bottom;
          }
          .box-title2 {
            width: 180px;
            height: 31px;
            line-height: 31px;
            font-size: 32px;
            font-weight: 700;
            color: #4B93FF;
            text-align: center;
            margin: 35px auto 45px;
            background: url(../../../assets/imgs/giftInsurance/squar.png) no-repeat;
            background-size:100% 55%;
            background-position: bottom;
          }
          .orderdetail-top{
              height: 127px;
              margin-left: 42px;
              margin-top: 51px;
              font-size: 28px;
              color: #333333;
              .orderdetail {
                line-height: 44px;
                display: flex;
                padding: px2em(15px) 0;
                .order-left {
                  font-size: 28px;
                  color: #333;
                  width: 140px;
                  white-space: nowrap;
                  // text-align: justify;
                  // text-align-last: justify;
                }
                .name{
                    display: inline-block;
                    text-align-last: justify;
                    text-align: justify;
                    width: 1.86667rem;
                }
                .amnt{
                    display: inline-block;
                    text-align-last: justify;
                    text-align: justify;
                    width: 1.86667rem;
                }
                .order-right {
                  margin-left: 3px ;
                  font-size: px2em(28px);
                  color: #333333;
                  max-width: 600px;
                }
              }
          }
      }
      .box-content-detail2{
        border-bottom: none;
      }
    }
    .goButton{
        margin-top: 81px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 32px;
        color: #FE4817;
        margin: 0 40px;
        border:1px solid rgba(254,72,23,1);
        border-radius:10px;
    }
</style>
