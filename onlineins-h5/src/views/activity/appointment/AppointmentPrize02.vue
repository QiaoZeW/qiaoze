<template>
    <div>
        <div class="titleTop">
            <p>这是你的尊享体检服务！</p>
        </div>
        <div class="app_content">
            <div v-if="!isReceiveTwo">
                <div v-if="showStartPic" class="img01_list">
                    <img src="@/assets/imgs/appointment/gifHit/hitEgg/top.png" @click="closeStart" class="activity_01"/>

                    <img src="@/assets/imgs/appointment/gifHit/hit.png" class="activity_01_hit" />
                </div>
                <div class="activity_01_start" v-else>
                    <p>尊享体检服务{{prizeTwoNum}}份</p>
                </div>
                <span v-show="!showStartPic" class="myService" @click="goTicket">服务详情></span>
            </div>
            <div v-else>
                <div class="activity_01_start_reveive" >
                    <p>尊享体检服务{{prizeTwoNum}}份</p>
                </div>
                <span   class="myService" @click="goTicket">服务详情></span>
            </div>
        </div>
        <img v-for="item in picList" :src="item" style="display: none" alt="">
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    export default {
        name: "AppointmentPrize01",
        data() {
            return {
                showStartPic:true,
                picList: [
                    require('@/assets/imgs/appointment/gifHit/hitEgg/1.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/2.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/3.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/4.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/5.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/6.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/7.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/8.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/9.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/10.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/11.png'),
                    require('@/assets/imgs/appointment/gifHit/hitEgg/12.png'),
                    require('@/assets/imgs/appointment/start/title02.png'),
                    require('@/assets/imgs/appointment/start/activity02_one.png'),
                    require('@/assets/imgs/appointment/gifHit/hit.png'),
                ],
            }
        },
        props:{
            prizeTwoNum:{
                type:Number,
                default: 0
            },
            isReceiveTwo:{
                type:Boolean,
                default: false
            },
            proposerPhone:{
                type:String,
                default: ''
            }
        },
        methods:{
            goTicket() {
                sessionStorage.setItem("ACT_TYPE_02", '1')
                location.href = '/activity/appointment/AppService.html?iphone=' + this.proposerPhone
            },
            closeStart(){
                this.updateStatus()
            },
            updateStatus(){
                this.$request({
                    url: `/act/actSubscribeRewardRecord/updateActSubscribeRewardRecord`,
                    method: 'POST',
                    data:{
                        "mobile": this.proposerPhone,
                        "rewardType": "2"
                    },
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.showStartPic = false
                        sessionStorage.setItem("ACT_TYPE_02", '1')
                    },
                    failFn: (data) => {
                        Toast({
                            content: data.resultMsg,
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myService{
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        font-size: .4rem;
        color: #fff;
        text-decoration: underline;
    }
    .activity_01_hit{
        width: 260px;
        position: absolute;
        height: 203px;
        top: 1.7rem;
        right: .76rem;
        animation: myHit 2s infinite;
    }

    @keyframes myHit {
       0%{
        transform:rotate(0deg);
         }
        50%{
            transform:rotate(40deg);
        }
        100%{
            transform:rotate(0deg);
        }
    }

    .img01_list{
        position: relative;
    }
    .activity_01_start {
        height: 808px;
        width: 664px;
        margin: -.2rem auto 0;
        position: relative;
        background: url("~@/assets/imgs/appointment/gifHit/hitEgg/12.png");
        background-size: 100% 100%;
         animation: myfirst 2.11s ease;
        p{
            position: absolute;
            color: #FFDEA5;
            width: 100%;
            text-align: center;
            top: 70px;
            font-size: 50px;
            animation: myfirstDes 2.11s ease;
        }
    }
    .activity_01_start_reveive{
        height: 808px;
        width: 664px;
        margin: -.2rem auto 0;
        position: relative;
        background: url("~@/assets/imgs/appointment/gifHit/hitEgg/12.png");
        background-size: 100% 100%;
         p{
            position: absolute;
            color: #FFDEA5;
            width: 100%;
            text-align: center;
            top: 70px;
            font-size: 50px;
        }
    }
    .titleTop {
        position: relative;
        margin: 0 auto;
        height: 150px;
        width: 672px;
        background: url("~@/assets/imgs/appointment/start/title02.png");
        background-size: 100% 100%;
        z-index: 20;

        p {
            position: absolute;
            top: 0.35rem;
            left: .8rem;
            font-size: 32px;
            font-family: Lantinghei SC;
            color: rgba(255, 222, 165, 1);
            text-shadow: 0px 4px 3px rgba(163, 26, 25, 0.49);
        }
    }

    .app_content {
        width: 664px;
        height: 625px;
        padding-top: 68px;
        padding-bottom: 36px;
        position: relative;
        z-index: 30;
        background: url("~@/assets/imgs/appointment/start/activity02_one.png");
        background-size: 100% 100%;
        margin: -.1rem auto 66px;

        .activity_01 {
            width: 636px;
            height: 628px;
            margin: 0 auto;
        }
    }
    @keyframes myfirst {
        0% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/1.png");
            background-size: 100% 100%
        }
        8% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/1.png");
            background-size: 100% 100%
        }
        16% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/2.png");
            background-size: 100% 100%
        }
        24% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/3.png");
            background-size: 100% 100%
        }
        32% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/4.png");
            background-size: 100% 100%
        }
        40% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/5.png");
            background-size: 100% 100%
        }
        48% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/6.png");
            background-size: 100% 100%
        }
        56% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/7.png");
            background-size: 100% 100%
        }
        64% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/8.png");
            background-size: 100% 100%
        }
        72% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/9.png");
            background-size: 100% 100%
        }
        80% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/10.png");
            background-size: 100% 100%
        }
        88% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/11.png");
            background-size: 100% 100%
        }
        100% {
            background: url("~@/assets/imgs/appointment/gifHit/hitEgg/12.png");
            background-size: 100% 100%
        }
    }


    @keyframes myfirstDes {
        0% {
            opacity: 0;
            display: none;
        }
        64% {
            display: block;
            font-size: 16px;
            opacity: 0;
        }
        72% {
            display: block;
            font-size: 16px;
            opacity: 0.2;
        }
        80% {  font-size: 27px;
            opacity:0.6;

        }
        88% {
            font-size: 38px;
            opacity: 0.9;

        }
        100% {
            font-size: 50px;

            opacity: 1;
        }
    }

</style>
