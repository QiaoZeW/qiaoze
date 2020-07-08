<template>
    <div>
        <div class="section"  id="section">
            <div class="canvas-box" id="test"  @click="getXAndY($event)">
                <canvas id="canvas" width="375" height="603">不支持canvas</canvas>
                <div class="title">
                    <div class="title_left">
                        <img src="@/assets/imgs/stepComputed/circle02.png"/>
                        <div class="titleNum">
                            <!--<NumScroll :value="score"></NumScroll>-->
                            <countTo :startVal='lastScore' :endVal='score' :duration='3000' :autoplay="true"></countTo>
                            <span class="bean">豆</span>
                        </div>
                        <a class="goExchange " @click="goZuiMarket">
                            去兑换
                            <div class="shape" v-show="showShape" ></div>
                        </a>

                    </div>
                    <div class="title_right">
                        <p @click="goActRule">活动规则></p>
                    </div>
                </div>

                <img :src="avatorUrl" v-show="showImg" alt="" class="logoHeight">
                <img src="@/assets/imgs/stepComputed/start.png" class="startPic"/>

                <img src="@/assets/imgs/stepComputed/chest01.png" class="chestOne" v-show="openChestOne"/>
                <img src="@/assets/imgs/stepComputed/chest04.png" class="chestOne" v-show="!openChestOne"/>

                <img src="@/assets/imgs/stepComputed/chest03.png" class="chestThree" v-show="openChestTwo"/>
                <img src="@/assets/imgs/stepComputed/chest06.png" class="chestThree" v-show="!openChestTwo"/>

                <img src="@/assets/imgs/stepComputed/chest02.png" class="chestTwo" v-show="openChestThree"/>
                <img src="@/assets/imgs/stepComputed/chest05.png" class="chestTwo" v-show="!openChestThree"/>
            </div>


            <div class="bottom_use">
                <div class="bottom_left">
                    <p :class="isDonate?'donatedChange':'donatedExchange'">{{isDonate?'今日已捐步':'今日可捐步'}} <br><span :class="isDonate?'donatedChange':'donatedExchange'">{{isDonate?donatedStep:step}}</span></p>
                </div>
                <div class="bottom_center">
                    <img src="@/assets/imgs/stepComputed/circle05.png" class="goPic" @click="goDonate"/>
                </div>
                <div class="bottom_right">
                    <p>已连续捐步 <br><span>{{dateContinuous}}</span>天
                        <img src="@/assets/imgs/stepComputed/question.png" class="question" @click="showTip"/></p>
                </div>
            </div>
            <img :src="avatorUrl" id="tulip" class="avator" alt="" style=" border-radius: 50%;position: absolute;z-index: -1;opacity: 0;">
            <StepDialog ref="stepDialog" :donateGetBean="donateGetBean" :openBoxGetBean="openBoxGetBean"
                        :boxNum="boxNum" :openBoxGetBeanNum="openBoxGetBeanNum" @carAndBikeAdd="carAndBikeAdd"
                        @donateAllStep="donateAllStep" :donateBean="donateBean" :lastStep="lastStep" :step="step"
                        :lastScore="lastScore" @beanAndShape="beanAndShape" @beanChange="beanChange" :score="score"  :boxJudge="boxJudge"  :showAnimation="showAnimation"></StepDialog>
            <RankingList ref="rankListPerson"></RankingList>
        </div>
        <div class="ranking_list" @click="openRank">
            <img src="@/assets/imgs/stepComputed/circle04.png"/>
         <!--   <span>排行榜</span>-->
        </div>
        <div class="prop_list logoPic" v-show="showProp">
            <img src="@/assets/imgs/stepComputed/circle03.png"@click="showProp = !showProp"/>
          <!--  <span class="circle" @click="showProp = !showProp">道具</span>-->
        </div>
        <div class="prop_list_open logoPic" v-show="!showProp">
            <div class="openProp">
                <div class="prop01"  >
                    <img src="@/assets/imgs/stepComputed/prop01.png" @click="openStepCarDialog" v-show="carProp"/>
                    <img src="@/assets/imgs/stepComputed/prop01an.png" @click="openCarTip" v-show="!carProp"/>

                    <div class="propTip" v-show="useCarCard">保单过犹豫期可获得一张</div>
                    <!--<span :class="carProp?'circles':'circlet'"  >加50圈</span>-->
                </div>


                <div class="prop02"  >
                    <img src="@/assets/imgs/stepComputed/prop02.png" @click="openStepDialog" v-show="cyclingProp"/>
                    <img src="@/assets/imgs/stepComputed/prop02an.png" @click="openBikeTip" v-show="!cyclingProp"/>
                    <div class="propTip" v-show="useBikeCard">承保成功可获得一张</div>
                  <!--  <span :class="cyclingProp?'circles':'circlet'"  >加10圈</span>-->
                </div>
            </div>
            <img src="@/assets/imgs/stepComputed/propImg.png" class="propTextImg" @click="openProp"/>
<!--            <span class="circle" @click="openProp">道具</span>-->
        </div>
        <div class="circle_num logoPic" @click="closeAllTip">
            <img src="@/assets/imgs/stepComputed/circle01.png"/>
            <span class="circleNumber">{{circleNum}}</span>
            <div class="circleTip" v-show="circleNumTip">累计圈数</div>
           <!-- <span class="circle">圈数</span>-->
        </div>
    </div>
</template>

<script>
    import {Toast,Dialog} from "mand-mobile";
    import data from '../step/data'
    import RankingList from "./rankingList";
    import StepDialog from "./stepDialog";
    import countTo from 'vue-count-to';
    export default {
        name: "stepComputed",
        data() {
            return {
                timer: 0,
                points: [],
                animatePoint: {x: 0, y: 0},
                nextPointIndex: 1,
                cvs: null,
                ctx: null,
                routes: data,
                numx: 0,
                numy: 0,
                data2: [],
                stepAll: 0,
                isAndroid: false,
                isIos: false,
                deviceNo: '',
                step: 0,
                lastStep: 0,
                startTime: new Date().getTime(),
                showProp: true,
                dateContinuous: 0,
                score: 0,
                lastScore: 0,
                circleNum: 0,
                carProp: false,
                cyclingProp: false,
                openChestOne: true,
                openChestTwo: true,
                openChestThree: true,
                donateBean: 0,
                openBoxGetBeanNum: 0,
                isDonate: false,
                img: '',
                arrFlag: 0,
                boxNum: 0,
                donateGetBean: false,
                openBoxGetBean: false,
                animateRoutes: [],
                secondFlag: false,
                avatorUrl:require('../../../assets/imgs/stepComputed/headImg.png'),
                useBikeCard:false,
                useCarCard:false,
                imgDom: null,
                showImg:true,
                judgeCarTip:null,
                judgeBikeTip:null,
                donatedStep:0,
                boxJudge:false,
                appAndroidVersion:'1.1.2',
                appIosVersion:'',
                isDonateFlag:false,
                clickFlag: 0,
                showShape:false,
                showAnimation:false,
                circleNumTip:false,
                versionFlag:false,
                lastStepData:{

                },
                receiveFlag:true
            }
        },
        components: {
            RankingList,
            StepDialog,
            countTo,
            [Dialog.name]: Dialog
        },
        created() {
           /* this.showShape = true
            setTimeout(()=>{
                this.showShape = false
            },2000)*/
            console.log('3');
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload()
                }
            }, false);

        },
        updated() {
        },
        mounted() {

            Toast.loading('加载中...')
            var u = navigator.userAgent.toLowerCase()
            this.isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            if (this.isAndroid) {
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler('getStepAndroidAllNum', {}, (response) => {
                        response = JSON.parse(response)
                        this.saveAndroidStep(response)
                    })
                })
            }
           setTimeout(()=>{
               Toast.hide()
           },1200)
            this.cvs = document.getElementById('canvas')
            this.ctx = this.cvs.getContext('2d')
            this.imgDom=document.getElementById("tulip")
            this.$app.getDeviceNo((deviceNo) => {
                this.deviceNo = deviceNo
                this.getStep(deviceNo)
            })
            if(this.isIos){
                this.judgeVersion()
            }
            // this.getStep()
        },
        methods: {
            getAppDownload(){
                this.$request({
                    url: `/vip/user/current`,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        if(data.avator && data.avator !==''){
                            this.avatorUrl = data.avator
                        }
                    },
                    failFn: (data) => {
                        Toast.info(data.resultMsg)
                    }
                })
            },
            goDownload() {
                if(this.isAndroid){
                    this.$app.downLoadApp()
                }
            },
            judgeVersion(){
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler('getVersion', {}, (response) => {
                        response = JSON.parse(response)
                        this.versionFlag = true
                        console.log("response12312312321312",response);
                        this.version = Number(response.data.replace('.','').replace('.',''))
                        if(this.version < 110){
                            Dialog.alert({content:'您当前的版本过低，请升级版本'})
                            return false
                        }
                    });

                })
            },
            //打開活動規則
            goActRule(){
                this.$refs['stepDialog'].openShowActRule()
            },
            getAvator() {
                this.$app.getCurrentToken((userToken) => {
                    this.$request({
                        url: `/vip/user/current`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            if(data.avator && data.avator !==''){
                                this.avatorUrl = data.avator
                            }
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            closeAllTip(){
                this.circleNumTip = !this.circleNumTip
                this.showProp = true
                this.useBikeCard = false
                this.useCarCard = false
            },
            openProp(){
                this.showProp = true
                this.useBikeCard = false
                this.useCarCard = false
            },
            //汽车和自行车加速卡
            carAndBikeAdd(speedUp) {
                if(!this.receiveFlag)return false
                let data = {
                    "bikeCardFlag": speedUp === 1 ? '1' : '0',
                    "carCardFlag": speedUp === 2 ? '1' : '0'
                }
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/step/stepAddCard`,
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        method: 'POST',
                        data: data,
                        successFn: (data) => {
                            if(data){
                                this.receiveFlag = false
                                this.$refs['stepDialog'].showGifFlag()
                                if (speedUp === 1) {
                                    this.circleNum = this.circleNum + 10
                                    this.cyclingProp = !this.cyclingProp
                                    this.useBikeCard = false
                                } else if (speedUp === 2) {
                                    this.circleNum = this.circleNum + 50
                                    this.carProp = !this.carProp
                                    this.useCarCard = false
                                }
                            }
                            setTimeout(()=>{
                                this.receiveFlag = true
                            },1500)
                            this.$refs['rankListPerson'].getList()
                        },
                        failFn: (data) => {
                            this.receiveFlag = true
                            console.log(this.$refs['stepDialog']);
                            this.$refs['stepDialog'].closeBikeAndCar()
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            goZuiMarket() {
                location.href = '/activity/step/ZuiMarket.html'
            },
            judgeDialog(flag) {
                if (flag === 1) {  //1打开  2关闭
                    this.$refs['stepDialog'].openDonateGetBean()
                    this.$refs['stepDialog'].closeBoxGetBeanMethod()
                } else {
                    this.$refs['stepDialog'].closeDonateGetBean()
                    this.$refs['stepDialog'].openBoxGetBeanMethod()
                }
            },
            //捐步
            donateAllStep() {
                this.$app.getToken((userToken) => {
                    let data = {
                        "stepNum" : this.step,
                        "deviceNo" : this.deviceNo
                    }
                    this.$request({
                        url: `/act/step/giveStep`,
                        userToken: userToken,
                        isEncript:true,
                        contentType: 'application/json;charset=UTF-8',
                        method: 'POST',
                        params:data,
                        successFn: (data) => {
                            this.donateBean = data.score

                            setTimeout(()=>{
                                this.$refs['stepDialog'].openDonateGetBean()
                            },1300)

                            this.lastStep = data.totalStep  //捐步完之后的总步数
                            this.$refs['rankListPerson'].getList() //更新排行榜
                            this.circleNum = Math.floor(this.lastStep / 60000) //计算捐步完成之后的总圈数
                            this.isDonate = true  //判断是否捐过步
                            this.donatedStep = this.step
                            this.judgeBoxStatus(1)
                            this.test(this.lastStep, this.arrFlag)
                            if (data.actStepBoxDTOList.length !== 0) {
                                this.boxJudge = true
                                let bean = 0
                                data.actStepBoxDTOList.forEach((item) => {
                                    bean = bean + item.boxScore
                                })
                                this.openBoxGetBeanNum = bean
                                this.boxNum = data.actStepBoxDTOList.length
                            }
                            this.dateContinuous = data.continuousDay
                             this.step = 0  //捐步完成后 今日可捐步数为0
                            // this.lastStep = this.lastStep + this.step

                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            beanAndShape(){
                this.lastScore = this.score
                console.log("111",this.score);
                this.score = this.score + this.donateBean   //计算积分
                console.log("222",this.score);
                this.showShape = true
                setTimeout(()=>{
                    this.showShape = false
                },2000)
            },
            beanChange(){
                this.lastScore = this.score
                this.score = this.score + this.openBoxGetBeanNum
                this.showShape = true
                setTimeout(()=>{
                    this.showShape = false
                },2000)
            },
            //判断上次捐的步数 应该打开哪个箱子
            judgeBoxStatus(flag) {

                let steps = 0
                if (flag === 1) {
                    steps = Number(this.lastStep) % 60000
                } else if (flag === 0) {
                    steps = this.lastStep % 60000
                }
                console.log("judgeBox",steps);
                if (steps >= 5000 && steps < 20000) {
                    this.openChestOne = false
                } else if (steps >= 20000 && steps < 60000) {
                    this.openChestOne = false
                    this.openChestTwo = false
                } else if (steps >= 60000) {
                    console.log("steps", steps);
                    /*this.animateRoutes = []
                    this.test(this.lastStep)*/
                    if (steps % 60000 >= 5000) {
                        this.openChestOne = false
                        this.openChestTwo = true
                    }
                    this.openChestThree = false
                } else {
                    this.openChestOne = true
                    this.openChestTwo = true
                    this.openChestThree = true
                }
            },
            showTip() {
                this.$refs['stepDialog'].openSmallTips()
            },
            judgeAccordNext(){
                if(!this.isDonateFlag){
                    if(this.isAndroid){
                        Dialog.alert({
                            content: "您当前的版本过低，请升级版本",
                            confirmText: "确定",
                            onConfirm: () => {
                                this.goDownload()
                                return false;
                            }
                        });
                    }
                    return false
                }
                return  true
            },
            goDonate() {
                if(this.isIos){
                    if(!this.versionFlag){
                        Dialog.alert({content:'您当前的版本过低，请升级版本'})
                        return false
                    }
                }
                this.getStepInfo(this.lastStepData)

                let result = this.judgeAccordNext()
                if(!result) return false
                console.log(this.score);
                this.$app.getToken(()=>{
                    if (this.step === 0) {
                        if (this.isDonate) {
                            Toast.info('您已捐过，明天再来吧')
                            return false
                        } else {
                            Toast.info('您没有步数可捐')
                            return false
                        }
                    } else if (this.step < 500 && this.step > 0) {
                        if (this.isDonate) {
                            Toast.info('您已捐过，明天再来吧')
                            return false
                        }else{
                            this.$refs['stepDialog'].openDonateStep()
                        }
                    } else {
                        this.donateAllStep()
                    }
                })
            },
            openStepDialog() {
                this.$refs['stepDialog'].openCycling()
            },
            openStepCarDialog() {
                this.$refs['stepDialog'].openCar()
            },
            openRank() {
                this.$refs['rankListPerson'].showRank()
                this.openProp()
            },
            //获取安卓的总步数
            saveAndroidStep(response) {
                let data = {
                    "deviceNo": this.deviceNo,
                    "deviceStepNum": response.totalStep
                }
                this.$app.getCurrentToken((userToken) => {
                    this.$request({
                        url: `/act/step/saveInfo`,
                        userToken: userToken,
                        contentType: 'application/json;charset=UTF-8',
                        method: 'POST',
                        data: data,
                        successFn: (data) => {
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            //获取上一次的时间和上一次的步数  并传给原生
            getStep(deviceNo) {
                this.$app.getCurrentToken((userToken) => {
                    this.$request({
                        url: `/act/step/getInfo?deviceNo=${deviceNo}`,
                        userToken: userToken,
                        method: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        successFn: (data) => {

                            this.dateContinuous = data.continuousDay ? data.continuousDay : 0
                            this.score = data.score ? data.score : 0
                            this.$refs['rankListPerson'].getList()
                            this.isDonate =  data.stepFlag === '1'?false:true
                            this.donatedStep = data.todayStep
                            this.lastStepData = data
                            this.getStepInfo(this.lastStepData)
                            if (data.totalStep && data.totalStep !== 0) {
                                this.circleNum = Math.floor(data.totalStep / 60000)
                                this.lastStep = data.totalStep % 60000
                                this.judgeBoxStatus(0)
                                console.log("this.lastStep", this.lastStep);
                                this.test(this.lastStep)
                            }
                            if(data.carAddCardFlag === '1'){
                                if(data.carAddCardStatus === '1' ){ //可以使用
                                    this.judgeCarTip = false
                                    this.carProp = true
                                } else if(data.carAddCardStatus === '2' ){ //已經用過了
                                    this.judgeCarTip = false
                                    this.carProp = false
                                } else {  //未使用
                                    this.judgeCarTip = true
                                    this.carProp = false
                                }
                            }else{
                                this.carProp = false
                                this.judgeCarTip = true
                            }

                            if(data.bikeAddCardFlag === '1'){
                                if(data.bikeAddCardStatus === '1' ){ //可以使用
                                    this.judgeBikeTip = false
                                    this.cyclingProp = true
                                }else if(data.bikeAddCardStatus === '2'){ //可以使用
                                    this.judgeBikeTip = false
                                    this.cyclingProp = false
                                } else {  //未使用
                                    this.judgeBikeTip = true
                                    this.cyclingProp = false
                                }
                            }else{
                                this.cyclingProp = false
                                this.judgeBikeTip = true
                            }

                             //this.getAvator()
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            openCarTip(){
                if(this.judgeCarTip){
                    this.useCarCard = !this.useCarCard
                    this.useBikeCard = false
                }else{
                    return false
                }
            },
            openBikeTip(){
                if(this.judgeBikeTip){
                    this.useBikeCard = !this.useBikeCard
                    this.useCarCard = false
                }else{
                    return false
                }
            },
            //从原生拿到最终计算出来的步数
            getStepInfo(data) {
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler('getStepNum', {
                        'lastStepTime': data.lastStepTime, 'lastStepNum': data.deviceStepNum//是否返回按钮，1-返回 0-不返回
                    }, (response) => {
                        console.log('getStepNum', response)
                        this.isDonateFlag = true
                        let data = JSON.parse(response)
                        let step =  Number(data.donateStep)
                        this.step = step > 15000 ? 15000 : step;
                    });

                })
            },
            computedStep(step) {
                let b = ((step % 60000) / 60000).toFixed(4)
                return b
            },
            test(step, stepPoint = 0) {

                let num = this.routes
                let b = this.computedStep(step)
                let x = num.length * Number(b)  //算出他的比例
                if(step % 60000 === 0){
                    this.showImg = true
                }else{
                    this.showImg = false
                }
                if (stepPoint > x && !this.secondFlag) {   //判斷第二圈  先跑完第一圈
                    num = this.routes.slice(0, x)
                    this.animateRoutes = this.routes.slice(stepPoint, this.routes.length - 1)
                    console.log("this.animateRoutes", this.animateRoutes);
                    this.animateRoutes = this.animateRoutes.concat(num)
                    this.ctx.clearRect(0, 0, this.cvs.clientWidth, this.cvs.clientHeight)
                    this.secondFlag = true
                    this.init(this.animateRoutes) //走完剩余的步数 然后置为0，开始第二圈
                } else {
                    if (this.secondFlag) {
                        num = num.slice((this.routes.length - 1) - stepPoint, x)
                    } else {
                        num = num.slice(stepPoint, x)
                    }
                    this.arrFlag = Math.floor(x)
                    this.animateRoutes = num
                    this.init(this.animateRoutes)
                }
            },
            getMousePosition(event) {
                var x = 0, y = 0,
                    doc = document.documentElement,
                    body = document.body;
                if (!event) event = window.event;
                if (window.pageYoffset) {//pageYoffset是Netscape特有
                    x = window.pageXOffset;
                    y = window.pageYOffset;
                } else {
                    x = (doc && doc.scrollLeft || body && body.scrollLeft || 0)
                        - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    y = (doc && doc.scrollTop || body && body.scrollTop || 0)
                        - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                x += event.clientX;
                y += event.clientY;
                return {x: x, y: y};
            },
            getXAndY(event) {
                this.showProp = true
                this.useBikeCard = false
                this.useCarCard = false
                this.circleNumTip = false
                //鼠标点击的绝对位置
                var Ev = event || window.event;
                var mousePos = this.getMousePosition(event);
                var x = mousePos.x;
                var y = mousePos.y;
                this.data2.push({x: x, y: y})
            },
            mouseMove(ev) {
                var Ev = ev || window.event;

                var absolute = this.getXAndY(ev);
                this.numx = absolute.x;
                this.numy = absolute.y;
                this.data2.push({x: this.numx, y: this.numy})
            },

            init() {
                this.nextPointIndex = 1
                this.ctx.strokeStyle = '#47AC76'
                this.ctx.shadowColor = '#47AC76'
                this.ctx.shadowBlur = 1
                this.ctx.lineWidth = 4
                this.ctx.clearRect(0, 0, this.cvs.clientWidth, this.cvs.clientHeight)
                this.animate()
            },
            clearTimer() {
                window.cancelAnimationFrame(this.timer)
            },
            animate() {
                this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
                this.ctx.globalAlpha = 1
                this.ctx.lineTo(this.animateRoutes[this.nextPointIndex].x, this.animateRoutes[this.nextPointIndex].y);
                this.ctx.drawImage(this.imgDom, this.animateRoutes[this.nextPointIndex].x -25 , this.animateRoutes[this.nextPointIndex].y - 10 , 30, 30);
                this.nextPointIndex = this.nextPointIndex + 15
                this.ctx.stroke()
                if (this.nextPointIndex > this.animateRoutes.length-1) return false
                this.timer = window.requestAnimationFrame(this.animate)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .bean {
        font-size: 34px !important;
        display: inline-block;
        margin-left: -.2rem;
    }

    .section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(90vh);
        background: url("../../../assets/imgs/stepComputed/bgFilter.jpg") 0 0 no-repeat;
        background-size: cover;
        #canvas {
        }

        .canvas-box {
            width: 375PX;
            position: relative;
            height: 603PX;
            max-height: calc(100vh);
            background: url("../../../assets/imgs/stepComputed/bg.png") 0 0 no-repeat;
            background-size: 100% 100%;
        }

        .title {
            .title_left {
                padding: 7px;
                position: fixed;
                top: 22px;
                left: 29px;
                background: #fff;
                border-radius: 50px;
                display: flex;
                align-items: center;

                img {
                    width: 64px;
                    height: 64px;
                    display: inline-block;
                    margin-right: 12px;
                }

                .titleNum {
                    display: inline-block;
                    font-size: 55px;
                    color: #333333;
                    font-weight: bold;
                }

                .goExchange {
                    display: inline-block;
                    color: #fff;
                    border-radius: 50px;
                    height: 64px;
                    width: 148px;
                    line-height: 64px;
                    text-align: center;
                    margin-left: 16px;
                    position: relative;
                    font-size: .45rem;
                    background: linear-gradient(left, #7FDD5A, #45AA77);
                    background: -webkit-linear-gradient(left, #7FDD5A, #45AA77);
                }
                .shape{
                    position:absolute;
                    top: 0;
                    height: 64px;
                    background: #fff;
                    width: .4rem;
                    filter:blur(6px);
                    opacity: 0.35;/*
                    background: -moz-linear-gradient(left,rgba(255,255,255,0)0,rgba(255,255,255,.2)50%,rgba(255,255,255,0)100%);
                    background: -webkit-gradient(linear,left top,right top,color-stop(0%,rgba(255,255,255,0)),color-stop(50%,rgba(255,255,255,.2)),color-stop(100%,rgba(255,255,255,0)));
                    background: -webkit-linear-gradient(left,rgba(255,255,255,0)0,rgba(255,255,255,.2)50%,rgba(255,255,255,0)100%);
                    background: -o-linear-gradient(left,rgba(255,255,255,0)0,rgba(255,255,255,.2)50%,rgba(255,255,255,0)100%);
                    */-webkit-transform: skewX(-25deg);
                    -moz-transform: skewX(-25deg);
                    -webkit-animation:rolled 1.5s .2s linear both ;
                    -moz-animation:rolled 1.5s .2s linear both ;
                    -o-animation:rolled 1.5s .2s linear both ;
                    -ms-animation:rolled 1.5s .2s linear both ;


                    left: -185px;
                    background: linear-gradient(left,transparent,rgba(255,255,255,0.6),transparent);
                    background: -moz-linear-gradient(left,transparent,rgba(255,255,255,0.6),transparent);
                    transform: skew(-30deg,0);
                    overflow: hidden;
                }
                @-webkit-keyframes rolled{
                    0%{left:0px ;height: 64px;top: 0}
                    80%{left:115px;height: 60px;top: 0.1rem}
                    100%{left:135px;height: 56px;top: 0.2rem}
                }
                @-moz-keyframes rolled{
                    0%{left:0px ;height: 64px;top: 0}
                    80%{left:115px;height: 60px;top: 0.1rem}
                    100%{left:135px;height: 56px;top: 0.2rem}
                }
                @-o-keyframes rolled{
                    0%{left:0px ;height: 64px;top: 0}
                    80%{left:115px;height: 60px;top: 0.1rem}
                    100%{left:135px;height: 56px;top: 0.2rem}
                }
                @-ms-keyframes rolled{
                    0%{left:0px ;height: 64px;top: 0}
                    80%{left:115px;height: 60px;top: 0.1rem}
                    100%{left:135px;height: 56px;top: 0.2rem}
                }
                @keyframes rolled{
                    0%{left:0px ;height: 64px;top: 0}
                    80%{left:115px;height: 60px;top: 0.1rem}
                    100%{left:135px;height: 56px;top: 0.2rem}
                }
            }

            .title_right {
                position: fixed;
                top: 53px;
                right: 28px;

                p {
                    font-size: 24px;
                    color: #47AC76;
                    text-decoration: underline;
                }
            }
        }



        .startPic {
            width: 54px;
            height: 76px;
            position: absolute;
            top: 94PX;
            left: 202PX;
        }

        .chestOne, .chestTwo, .chestThree {
            width: 69px;
            height: 63px;
            position: absolute;
        }

        .chestOne {
            top: 190PX;
            left: 65PX;
        }

        .chestTwo {
            top: 137PX;
            left: 230PX;
        }
        .chestThree {
            top: 371PX;
            left: 60PX;
        }

        .bottom_use {
            width: 100%;
            bottom: 0;
            position: fixed;
            background: #24B288;
            height: 138px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            display: flex;
            align-items: center;

            .bottom_left {
                flex: 0.7;
                text-align: center;

                p {
                    font-size: 26px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);

                    span {
                        font-size: 62px;
                        font-family: DINCond;
                        font-weight: 900;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }

            .bottom_center {
                flex: 1.1;

                img {
                    margin: 0 auto;
                    width: 172.4px;
                    height: 172.4px;
                    margin-top: -1rem;
                }
            }

            .bottom_right {
                flex: 0.7;
                text-align: center;

                p {
                    font-size: 26px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);

                    span {
                        font-size: 62px;
                        font-family: DINCond;
                        font-weight: 900;
                        color: rgba(255, 255, 255, 1);
                    }
                }

                .question {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                }
            }
        }
    }

    .ranking_list {
        position: fixed;
        left: 35px;
        top: 75%;

        img {
            width: 108px;
            height: 118px;
        }

        span {
            position: absolute;
            top: 1.1rem;
            text-shadow: 1px 1px 0px #576ADB, -1px -1px 0px #576ADB, 2px 2px 0px #576ADB, -2px -2px 0px #576ADB, 3px 3px 0px #576ADB, -3px -3px 0px #576ADB;
            //text-shadow: #576ADB 1px 0 0, #576ADB 0 1px 0, #576ADB -1px 0 0, #576ADB 0 -1px 0;
            color: #fff;
            font-size: 30px;
            display: inline-block;
            width: 110px;
            text-align: center;
        }
    }

    .prop_list {
        top: 63%;

    }
    .propTextImg{
        width: 67px!important;
        height: 37px !important;
        margin: -.25rem auto 0;
    }
    .circle_num {
        top: 75%;


        .circle {
            text-shadow: 1px 1px 0px #EFC227, -1px -1px 0px #EFC227, 2px 2px 0px #EFC227, -2px -2px 0px #EFC227, 3px 3px 0px #EFC227, -3px -3px 0px #E8432D;
            //text-shadow: #576ADB 1px 0 0, #576ADB 0 1px 0, #576ADB -1px 0 0, #576ADB 0 -1px 0;
        }

        .circleNumber {
            position: absolute;
            top: .25rem;
            left: -0.05rem;
            width: 1.55rem;
            text-align: center;
            font-size: 53px;
            font-family: DINCond;
            font-weight: 900;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 0px 12px rgba(202, 130, 16, 0.51);
        }
        .circleTip {
            position: absolute;
            padding: 13px;
            top: .4rem;
            background: #000000  ;
            white-space: nowrap;
            right: 1.7rem;
            color: #fff;
            font-size: 22px;
            opacity: 0.38;
            border-radius: 5px;
        }

        .circleTip::before {
            content: '';
            width: 0;
            height: 0;
            border: 15px solid;
            position: absolute;
            top: 0.14rem;
            right: -0.35rem;
            border-color: transparent transparent transparent #000000;
        }
    }

    .logoPic {
        position: fixed;
        right: 32px;

        img {
            width: 108px;
            height: 118px;
        }

        .circle {
            position: absolute;
            top: 1.2rem;
            color: #fff;
            font-size: 30px;
            width: 100%;
            text-align: center;
            display: inline-block;
        }
    }
    .prop_list_open {
        top: 46%;
        right: 3%;
        .openProp {
            padding: 30px 14px 0;
            height: 298px;
            background: #fff;
            border-radius: 50px;

        }

        .circle {
            top: 4rem !important;
            text-shadow: 1px 1px 0px #E8432D, -1px -1px 0px #E8432D, 2px 2px 0px #E8432D, -2px -2px 0px #E8432D, 3px 3px 0px #E8432D, -3px -3px 0px #E8432D;
        }

        .prop01, .prop02 {
            display: flex;
            justify-content: center;

            img {
                width: 96px !important;
                height: 100px !important;
            }

            .propTip {
                position: absolute;
                padding: 13px;
                top: .2rem;
                background: #000000  ;
                white-space: nowrap;
                right: 1.7rem;
                color: #fff;
                font-size: 22px;
                opacity: 0.38;
                border-radius: 5px;
            }

            .propTip::before {
                content: '';
                width: 0;
                height: 0;
                border: 15px solid;
                position: absolute;
                top: 0.14rem;
                right: -0.35rem;
                border-color: transparent transparent transparent #000000;
            }
        }

        .prop01 {
            position: relative;

            .circles {
                text-align: center;
                width: 1.5rem;
                position: absolute;
                top: .9rem;
                font-size: 26px;
                color: #fff;
                font-weight: bold;
                text-shadow: 1px 1px 0px #31A2D1, -1px -1px 0px #31A2D1, 2px 2px 0px #31A2D1, -2px -2px 0px #31A2D1, 3px 3px 0px #31A2D1, -3px -3px 0px #31A2D1;
            }

            .circlet {
                text-align: center;
                width: 1.5rem;
                position: absolute;
                top: .9rem;
                font-size: 26px;
                color: #fff;
                font-weight: bold;
                text-shadow: 1px 1px 0px #818181, -1px -1px 0px #818181, 2px 2px 0px #818181, -2px -2px 0px #818181, 3px 3px 0px #818181, -3px -3px 0px #818181;
            }
        }

        .prop02 {
            position: relative;
            margin-top: 48px;

            .circles {
                text-align: center;
                width: 1.5rem;
                position: absolute;
                top: .9rem;
                font-size: 26px;
                font-weight: bold;
                color: #fff;
                text-shadow: 1px 1px 0px #3EB676, -1px -1px 0px #3EB676, 2px 2px 0px #3EB676, -2px -2px 0px #3EB676, 3px 3px 0px #3EB676, -3px -3px 0px #3EB676;
            }

            .circlet {
                text-align: center;
                width: 1.5rem;
                position: absolute;
                top: .9rem;
                font-size: 26px;
                color: #fff;
                font-weight: bold;
                text-shadow: 1px 1px 0px #818181, -1px -1px 0px #818181, 2px 2px 0px #818181, -2px -2px 0px #818181, 3px 3px 0px #818181, -3px -3px 0px #818181;
            }
        }
    }

    .logoPar {
        height: 30px;
        width: 30px;
    }

    #canvas {
        z-index: 9999;
    }
   .avator{
       width: 46px;
       height: 46px;
   }
    .logoHeight{
        position: absolute;
        height: .7rem;
        z-index: 20;
        top: 100PX;
        left: 180PX;
    }
    .quanXian{
        p{
            text-align: center;
        }
    }

    .donatedChange{
        color: #a6cfc3 !important;
    }
    .donatedExchange{
        color: #fff;
    }
</style>
<style>
    html, body {
        background: #edf4ef;
    }
</style>
