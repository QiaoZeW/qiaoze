<template>
    <div>
        <div class="titleTop">
            <p>参与回访与调研最高得10万豆</p>
        </div>
        <div class="app_content">
            <img src="@/assets/imgs/appointment/activity_03.png"  class="activity_01"/>
            <img src="@/assets/imgs/appointment/start/activity03_btn.png"  class="activity_01_btn"/>
            <div class="app03_bottom">
                <p>您有{{prizeThreeNum}}笔待回访的订单</p>
                <button @click="goSmallInvestigation">立即回访</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppointmentPrize01",
        props:{
            prizeThreeNum:{
                type:Number,
                default:0
            }
        },
        methods:{
            goSmallInvestigation(){
                if (this.$app.isMiniProgram() && this.$app.isBnMiniApp()) {
                    let linkUrl = encodeURIComponent(this.$router.siteUrl() + `/mp/MpPolicyList.html?index=1`);
                    let path = `/pages/user/policyList?u=${linkUrl}`;
                    wx.miniProgram.navigateTo({url: path})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .titleTop{
        position: relative;
        margin: 0 auto  ;
        height: 150px;
        width: 672px;
        background: url("~@/assets/imgs/appointment/start/title01.png");
        background-size: 100% 100%;
        z-index: 20;
        p{
            position: absolute;
            top: 0.35rem;
            left: 2.4rem;
            font-size:32px;
            font-family:Lantinghei SC;
            color:rgba(255,222,165,1);
            text-shadow:0px 4px 3px rgba(163,26,25,0.49);
        }
    }
    .app_content{
        width: 665px;
        height: 740px;
        padding-top: 41px;
        padding-bottom: 38px;
        position: relative;
        z-index: 30;
        background: url("~@/assets/imgs/appointment/start/activity03_bg.png");
        background-size: 100% 100%;
        margin: -.1rem auto 87px;
        .activity_01{
            width: 554px;
            height: 485px;
            margin: 0 35px 0 76px;
        }
        .activity_01_btn{
            width: 567px;
            height: 152px;
            margin: -.36rem auto 0;
        }
        .app03_bottom{
            margin-top: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                display: inline-block;
                font-size:30px;
                font-family:Lantinghei SC;
                color:rgba(255,222,165,1);
            }
            button{
                width:240px;
                margin-left: 36px;
                height:88px;
                background:linear-gradient(0deg,rgba(255,186,64,1),rgba(255,216,147,1));
                border-radius:44px;
                font-size:36px;
                font-family:Lantinghei SC;
                font-weight:600;
                color:rgba(180,29,28,1);
                box-shadow: 0 .125em .125em #D97D1B;
            }
        }
    }
</style>
