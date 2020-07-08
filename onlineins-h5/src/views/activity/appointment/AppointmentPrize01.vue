<template>
    <div>
        <div class="titleTop">
            <p>这是你的口腔健康服务！</p>
        </div>
        <div class="app_content">
            <div v-if="!isReceiveOne">
               <div style="position: relative;z-index: 10;" v-if="showStartPic">
                   <img   :src="startPic" @click="closeStart" class="activity_01"/>
                   <img   src="@/assets/imgs/appointment/gifHit/open.png" @click="closeStart" class="activity_01_pic"/>
               </div>
                <div class="activity_01_start" v-else>
                    <p class="start_num">口腔健康<br>
                        服务{{prizeOneNum}}份</p>
                    <div   class="start_blessingDes"><p>{{activityDes}}</p></div>
                    <div style="width: 100%;">
                        <img src="@/assets/imgs/appointment/red_bag_block.png" class="red_bag_block"/>
                    </div>
                </div>
                <span v-show="!showStartPic" class="myService" @click="goTicket">服务详情></span>
            </div>
             <div v-else>
                 <div class="activity_01_start_no_receive" >
                     <p class="start_num_no_receive">口腔健康<br>
                         服务{{prizeOneNum}}份</p>
                     <div class="start_blessingDes"><p>{{activityDes}}</p></div>
                  </div>
                 <span   class="myService" @click="goTicket">服务详情></span>
             </div>

        </div>
        <AppPopup :personInfo="person" :showAddress="showAddress" @closeAdd="closeAdd" :iphoneNum="proposerPhone"/>
        <img :src="item" v-for="item in picList" alt="" style="display: none">
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import AppPopup from "./AppPopup";
    export default {
        name: "AppointmentPrize01",
        data() {
            return {
                startPic: require('@/assets/imgs/appointment/gifHit/redBag/top.png'),
                picList: [
                    require('@/assets/imgs/appointment/gifHit/redBag/1.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/2.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/3.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/4.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/5.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/6.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/7.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/8.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/9.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/10.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/11.png'),
                    require('@/assets/imgs/appointment/gifHit/redBag/12.png'),
                    require('@/assets/imgs/appointment/red_bag_block.png'),
                    require('@/assets/imgs/appointment/start/activity01_one.png'),
                    require('@/assets/imgs/appointment/start/title01.png'),
                    require('@/assets/imgs/appointment/gifHit/open.png'),
                ],
                showStartPic: true,
                isReceive: true,
                showAddress:false,
                description: [
                    '天气因你逆转，世界因你天晴。',
                    '你就是人群中最靓的仔。',
                    '你保护世界，我保护你',
                    '路上总有阴影，抬头便是阳光。',
                    '稳住，我们能赢。',
                    '解释徒劳无功，就专心去做该作的事。',
                    '我遇见你，我记得你，我怀念你，我感恩你。',
                    '打破成见，做自己的英雄',
                    '来吧，地球等着我们去拯救',
                    '自己喜欢的自己，就是最好的自己。',
                    '没关系，我们就是那万分之一。',
                    '当面对两个选择时，抛硬币总是有效。'
                ],
                activityDes: ''
            }
        },
        props: {
            prizeOneNum: {
                type: Number,
                default: 0
            },
            isReceiveOne: {
                type: Boolean,
                default: false
            },
            proposerPhone: {
                type: String,
                default: ''
            },
            person:{
                type: Object,
                default: ()=>{}
            }
        },
        components:{
            AppPopup
        },
        created() {
            this.activityDes = this.description[this.randomNum(0, 11)]
            console.log(this.activityDes);
        },
        methods: {
            closeAdd(){
                this.showAddress = false
            },
            goTicket() {
                sessionStorage.setItem("ACT_TYPE_01", '1')
                location.href = '/activity/appointment/AppService.html?iphone=' + this.proposerPhone
            },
            closeStart() {
                this.updateStatus()
            },
            updateStatus() {
                this.$request({
                    url: `/act/actSubscribeRewardRecord/updateActSubscribeRewardRecord`,
                    method: 'POST',
                    data: {
                        "mobile": this.proposerPhone,
                        "rewardType": "1"
                    },
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.showStartPic = false
                        sessionStorage.setItem("ACT_TYPE_01", '1')
                        setTimeout(()=>{
                            this.showAddress = true
                        },2700)
                    },
                    failFn: (data) => {
                        Toast({
                            content: data.resultMsg,
                        })
                    }
                })
            },
            randomNum(minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1, 10);
                        break;
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                        break;
                    default:
                        return 0;
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myService {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        font-size: .4rem;
        color: #fff;
        text-decoration: underline;
    }

    .activity_01_pic{
        width: 144px;
        height: 144px;
        top: 50%;
        transform: translateX(-50%) translateY(-80%);
        left: 50%;
        position: absolute;
        animation: myRed 1.5s infinite;
    }
    @keyframes myRed {
        0%{
            width: 144px;
            height: 144px;
        }
        50%{
            width: 164px;
            height: 164px;
        }
        100%{
            width: 144px;
            height: 144px;
        }
    }
    .titleTop {
        position: relative;
        margin: 0 auto;
        height: 150px;
        width: 672px;
        background: url("~@/assets/imgs/appointment/start/title01.png");
        background-size: 100% 100%;
        z-index: 20;

        p {
            position: absolute;
            top: 0.35rem;
            left: 2.4rem;
            font-size: 32px;
            font-family: Lantinghei SC;
            color: rgba(255, 222, 165, 1);
            text-shadow: 0px 4px 3px rgba(163, 26, 25, 0.49);
        }
    }

    .app_content {
        width: 664px;
        height: 518px;
        padding-top: 20px;
        padding-bottom: 12px;
        position: relative;
        z-index: 30;
        background: url("~@/assets/imgs/appointment/start/activity01_one.png");
        background-size: 100% 100%;
        margin: -.1rem auto 66px;

        .blessingDes {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 4rem;
            width: 100%;
            font-size: 20px;
            color: #FFDB74;
            line-height: .4rem;
            z-index: 100;
            p {
                text-align: center;
                max-width: 180px;
            }
        }

        img {
            margin: 0 auto;
        }

        .activity_01_start {
            height: 600px;
            width: 664px;
            margin: -.2rem auto 0;
            position: relative;
            background: url("~@/assets/imgs/appointment/gifHit/redBag/12.png");
            background-size: 100% 100%;
            /*  background:  url("~@/assets/imgs/appointment/gifHit/redBag/12.png") 100% 100%;*/
            animation: myfirst 2.11s ease;

            .start_num {
                width: 100%;
                position: absolute;
                font-size: 35px;
                top: 2rem;
                color: #A47206;
                text-align: center;
                animation: myfirstDes 2.11s ease;
                z-index: 10;
            }

            .red_bag_block {
                width: 3.8rem;
                position: absolute;
                top: 2.8rem;
                left: 50%;
                margin-left: -1.9rem;
                z-index: 20;
                animation: redBag 2.11s ease;
            }
        }

        .activity_01_start_no_receive {
            height: 600px;
            width: 664px;
            margin: -.2rem auto 0;
            position: relative;
            background: url("~@/assets/imgs/appointment/gifHit/redBag/12.png");
            background-size: 100% 100%;

            .start_num_no_receive {
                width: 100%;
                position: absolute;
                font-size: 35px;
                top: 2rem;
                color: #A47206;
                text-align: center;
                z-index: 10;
            }
        }


        .start_blessingDes {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 4.5rem;
            width: 100%;
            font-size: 20px;
            color: #FFDB74;
            line-height: .4rem;
            z-index: 100;

            p {
                text-align: center;
                max-width: 180px;
            }
        }


        .activity_01 {
            width: 627px;
            height: 458px;
            padding-top: .6rem;
        }
    }

    @keyframes myfirst {
        0% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/1.png");
            background-size: 100% 100%
        }
        8% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/1.png");
            background-size: 100% 100%
        }
        16% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/2.png");
            background-size: 100% 100%
        }
        24% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/3.png");
            background-size: 100% 100%
        }
        32% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/4.png");
            background-size: 100% 100%
        }
        40% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/5.png");
            background-size: 100% 100%
        }
        48% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/6.png");
            background-size: 100% 100%
        }
        56% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/7.png");
            background-size: 100% 100%
        }
        64% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/8.png");
            background-size: 100% 100%
        }
        72% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/9.png");
            background-size: 100% 100%
        }
        80% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/10.png");
            background-size: 100% 100%
        }
        88% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/11.png");
            background-size: 100% 100%
        }
        100% {
            background: url("~@/assets/imgs/appointment/gifHit/redBag/12.png");
            background-size: 100% 100%
        }
    }

    @keyframes myfirstDes {
        0% {
            display: block;
            top: 4rem;
            opacity: 0;
        }
        56% {
            top: 3rem;
            opacity: 0;
        }
        64% {
            top: 2.8rem;
            opacity: .5;
        }
        72% {
            top: 2.6rem;
            opacity: .8;
        }
        80% {
            top: 2.4rem;
            opacity: 1;
        }
        88% {
            top: 2.2rem
        }
        100% {
            top: 2rem
        }
    }

    @keyframes redBag {
        0% {
            opacity: 0;
        }
        56% {
            opacity: 0;
        }
        64% {
            opacity: .6;
        }
        72% {
            opacity: 1;
        }
        80% {
            opacity: .5;
        }
        88% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
</style>
