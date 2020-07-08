<template>
    <div>
        <md-landscape v-model="showCycling" :mask-closable="true" class="myLandStepComputed">
            <div class="cycling">
                <p class="part">{{msg}}</p>
                <div class="btn" @click="showGif">
                    立即使用
                </div>
            </div>
        </md-landscape>
        <md-landscape v-model="showSmallTip" :mask-closable="true" class="myLandStepComputed">
            <div class="cyclings">
                <p class="parts"> 连续捐步3天，从第3天开始每日获得的百佳豆乘以1.2倍</p>
                <p class="parts">连续捐步7天，从第7天开始每日获得的百佳豆乘以1.5倍</p>
                <p class="parts">若连续捐步中断，则连续捐步天数清零</p>
            </div>
        </md-landscape>
        <md-landscape v-model="showDonateStep" :mask-closable="true" class="myLandStepComputed">
            <div class="cycling donate">
                <p class="part">步数太少可能拿不到奖励哦！<br/> 要不攒点再捐？</p>
                <div class="btn" @click="showDonateStep = false">
                    再攒点
                </div>
                <div class="goContinue" @click="goContinue">
                    继续捐
                </div>
            </div>
        </md-landscape>
        <md-landscape v-model="showCyclingGif" :mask-closable="true" class="myLandStepComputed myGifCloseTip">
            <img src="@/assets/imgs/stepComputed/cyclingGif.gif"/>
        </md-landscape>
        <md-landscape v-model="showCarGif" :mask-closable="true" class="myLandStepComputed myGifCloseTip">
            <img src="@/assets/imgs/stepComputed/carGif.gif"/>
        </md-landscape>
        <md-landscape v-model="donateGetBean"  @hide="closeDonateOpenBox"  class="myLandStepComputed myGifCloseTip">
            <div class="getBean" >
                <img src="@/assets/imgs/stepComputed/getBean.png" class="beanImg"/>
                <p class="beanTip">赚了{{donateBean}}个豆</p>
                <span class="beanDes">捐的越多奖励越多，记得每天都来哦~</span>
                <div class="beanBtn">
                    <button @click="closeDonateBeanFlag">收下百佳豆</button>
                </div>
            </div>
        </md-landscape>
        <md-landscape v-model="openBoxGetBean" ref="boxBean" @hide="closeParticularBean"  class="myLandStepComputed myGifCloseTip myParticularLanding">
           <div class="shapeBox">
               <img src="@/assets/imgs/stepComputed/shapeBoxOne.png" class="shapeBoxOne"/>
               <p class="shapeTitle">{{openBoxGetBeanNum}}百佳豆</p>
               <p class="shapeDesc">开启了{{boxNum}}个百宝箱</p>
               <div class="btn">
                   <button @click="closeBoxGetBeanMethod">收下百佳豆</button>
               </div>
           </div>
        </md-landscape>
        <md-landscape v-model="showActRule" :mask-closable="true"  class="myLandStepComputed ">
            <div class="cyclingsRule">
                    <p class="ruleTitle"><b>如何玩“百年人寿”计步活动？</b></p>
                    <p>1）累积一定步数后（大于500步），进行线上行走（GO）</p>
                    <p>2）步数不足500步，无法获得奖励，建议继续行走</p>
                    <p>3）线上行走时，会遇见宝箱，打开可获得奖励</p>
                    <p>4）每日可捐步数为本次捐步与上一次捐步间的增量</p>
                    <p>5）每日可捐1次且最多可捐15000步 </p>
                   <p class="ruleTitle"><b>计步活动中的百佳豆有什么用？</b></p>
                    <p>1）百佳豆是“百年人寿”官方APP的积分值</p>
                    <p>2）计步活动中行走、开宝箱、完成任务等均有机会获得百佳豆</p>
                    <p>3）100百佳豆约价值为人民币1元，累计百佳豆可前往“发现”板块兑换心仪礼品</p>
                   <p class="ruleTitle"><b>走星海，嬴华为</b></p>
                   <p> 1）活动时间：2019年11月1日-2020年3月31日</p>
                   <p> 2）在活动期间内完成圈数最多的三位用户可获得华为mate30一部</p>
                    <p>3）活动周期内，小道具“自行车卡”和“汽车卡”仅可获得一次，不可累计 </p>
            </div>
        </md-landscape>
    </div>
</template>

<script>
    export default {
        name: "stepDialog",
        data() {
            return {
                showCycling: false,
                showDonateStep: false,
                showSmallTip: false,
                msg: '',
                speedUp: 0,
                showCyclingGif: false,
                showCarGif: false,
                donateGetBean: false,
                openBoxGetBean:false,
                beanNum: 0,
                showActRule:false
            }
        },
        props: {
            openBoxGetBeanNum:{
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 0
            },
            lastStep: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default: 0
            },
            lastScore: {
                type: Number,
                default: 0
            },
            donateBean:{
                type: Number,
                default: 0
            },
            boxNum:{
                type:Number,
                default: 0
            },
            boxJudge:{
                type:Boolean,
                default: false
            },
            showAnimation:{
                type:Boolean,
                default: false
            }
        },
        methods: {
            closeDonateOpenBox(){
                console.log(123123213);
                this.$emit('beanAndShape','')
                if(this.boxJudge){
                    this.openBoxGetBeanMethod()
                }else{
                    return false
                }

            },
            testAlert(){
                console.log(1);
            },
            closeDonateBeanFlag(){
                this.donateGetBean = false
            },
            openShowActRule(){
              this.showActRule = true
            },
            openBoxGetBeanMethod(){
              this.openBoxGetBean = true
            },
            closeBoxGetBeanMethod(){
                this.openBoxGetBean = false
            },
            closeParticularBean(){
                this.openBoxGetBean = false
                this.$emit('beanChange','')
            },
            openDonateGetBean(){
              this.donateGetBean = true
              this.closeBoxGetBeanMethod()
            },
            closeDonateGetBean(){
                this.donateGetBean = false
            },
            goContinue(){
                this.$emit('donateAllStep','')
                this.showDonateStep = false
            },
            showGif() {
                this.$emit('carAndBikeAdd',this.speedUp)
            },
            showGifFlag(){
                if (this.speedUp === 1) {
                    this.showCyclingGif = true
                    this.showCycling = false
                    setTimeout(() => {
                        this.showCyclingGif = false
                    }, 1750)
                } else if (this.speedUp === 2) {
                    this.showCarGif = true
                    this.showCycling = false
                    setTimeout(() => {
                        this.showCarGif = false
                    }, 1600)
                }
            },
            closeBikeAndCar(){
                this.showCycling = false
            },
            openSmallTips() {
                this.showSmallTip = true
            },
            openCycling() {
                this.msg = '是否使用自行车加速卡'
                this.speedUp = 1
                this.showCycling = true
            },
            openCar() {
                this.speedUp = 2
                this.msg = '是否使用汽车加速卡'
                this.showCycling = true
            },
            openDonateStep() {
                this.showDonateStep = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shapeBox{
        width: 100%;
        .shapeTitle{
            font-size: 48px;
            color: #fff;
            text-align: center;
            font-weight: bold;
        }
        .shapeDesc{
            font-size: 32px;
            color: #fff;
            text-align: center;
            margin-top: 29px;
        }
        .btn{
            margin-top: 60px;
            button{
                width: 402px;
                height: 88px;
                border-radius: 50px;
                line-height: 88px;
                font-size: 32px;
                color: #fff;
                text-align: center;
                background: linear-gradient(top,#F5DA2B,#F4B411);
                background: -webkit-linear-gradient(top,#F5DA2B,#F4B411);
            }
        }
    }
    .beanBtn{
        margin-top: 37px;
        button{
            width: 100%;
            height: 88px;
            border-radius: 50px;
            line-height: 88px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            background: linear-gradient(top,#F5DA2B,#F4B411);
            background: -webkit-linear-gradient(top,#F5DA2B,#F4B411);
        }
    }
    .shapeBoxOne{
        width: 467px;
        height: 458px;
        margin: 0 auto;
    }
    .cycling {
        width: 540px;
        height: 380px;
        background: #fff;
        border-radius: 10px;
    }

    .donate {
        height: 480px !important;

        .part {
            padding-bottom: 40px;
        }
    }

    .part {
        font-size: 36px;
        padding-top: 101px;
        padding-bottom: 87px;
        font-weight: bold;
        color: #333333;
        text-align: center;
    }

    .cyclings {
        width: 450px;
        height: 300px;
        background: #fff;
        border-radius: 10px;
        padding: 60px 44px;
    }
    .cyclingsRule{
        width: 540px;
        background: #fff;
        border-radius: 10px;
        padding: 30px 44px 60px;
        line-height: .45rem;
        p{
            line-height: .5rem;
            font-size: 30px;
        }
        .ruleTitle{
            margin-top: 20px;
            font-size: 30px;
        }
    }
    .parts {
        margin-top: 30px;
        color: #333333;
        font-size: 30px;
    }

    .btn {
        margin: 0 auto;
        width: 402px;
        height: 88px;
        font-size: 32px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 88px;
        background: linear-gradient(top, #F5DB2B, #F4B311);
        background: -webkit-linear-gradient(top, #F5DB2B, #F4B311);
        border-radius: 50px;
        text-align: center;
    }

    .goContinue {
        margin: 0 auto;
        margin-top: 40px;
        width: 402px;
        height: 88px;
        font-size: 32px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 88px;
        background: linear-gradient(top, #33DFAC, #24B389);
        background: -webkit-linear-gradient(top, #33DFAC, #24B389);
        border-radius: 50px;
        text-align: center;
    }

    .getBean {
        background: #fff;
        max-width: 4.8rem;
        border-radius: 16px;
        padding: 0 109px 30px;
    }

    .beanImg {
        width: 300px;
        height: 300px;
        margin: 0 auto;
    }

    .beanTip {
        font-size: 36px;
        color: #333333;
        font-weight: bold;
        text-align: center;
    }

    .beanDes {
        margin-top: 30px;
        font-size: 30px;
        color: #333333;
        text-align: center;
        display: inline-block;
        width: 100%;
    }
</style>
<style lang="scss">
    .myLandStepComputed .md-landscape-content {
        width: 100% !important;
    }
    .myGifCloseTip .md-icon-close:before{
        content:'' !important;
    }
</style>
