<template>
    <div class="step-wrap">
        <div ref="step" class="step" @click="getXAndY($event)">
          <canvas id="canvas" width="1786" height="1503">不支持canvas</canvas>
          <img :src="avatorUrl" id="avator" class="avator" alt="">
          <img ref="person1" id="person1" :src="avatorUrl" alt="">
          <img ref="person2" id="person2" :src="avatorUrl" alt="">
        </div>
        <Header @howTodraw="howTodraw" :processStep="processStep" />
        <div class="footer">
          <img @click="showRules" class="rules" src="@/assets/imgs/stepComputed/new/icon11.png" alt="">
          <div class="inner">
            <div class="left">
              <div>
                <p class="p1"><span>{{ continuousDay }}</span>天</p>
                <p>连续捐步</p>
              </div>
              <div class="img-block" @click="showRankList">
                <img class="img-rule" src="@/assets/imgs/stepComputed/new/icon08.png" alt="">
              </div>
            </div>
            <div class="right">
              <div class="img-block" :class="{'active': propNum>0}" @click="showStageList">
                <img src="@/assets/imgs/stepComputed/new/icon07.png" alt="">
              </div>
              <div class="img-block" :class="{'active': drawNum>0}">
                <img @click="goLuckyDraw" src="@/assets/imgs/stepComputed/new/icon05.png" alt="">
              </div>
            </div>
          </div>
          <div class="go">
            <img src="@/assets/imgs/stepComputed/new/icon06.png" alt="" @click="goDonate">
            <div class="donate">
              <img src="@/assets/imgs/stepComputed/prop01.png" alt="">
              <span>{{ donateText }}</span>
            </div>
          </div>
        </div>
        <Gpopup ref="tip" :processStep="processStep" />
        <StageList ref="stagelist" />
        <RankingList ref="ranklist" />
        <Rules ref="rules" />
    </div>
</template>

<script>
    import {Toast,Dialog} from "mand-mobile";
    import Gpopup from "@/views/activity/step/comp/Gpopup";
    import StageList from "@/views/activity/step/comp/StageList";
    import RankingList from "@/views/activity/step/comp/RankingList";
    import Rules from "@/views/activity/step/comp/Rules";
    import Header from "@/views/activity/step/comp/Header";
    import { data, simpleDatas } from "@/views/activity/step/comp/data";
    export default {
        name: "stepComputed",
        data() {
            return {
              isBrowser: '',
              myPosition: {x:0,y:0},
              position1: {x:0,y:0},
              position2: {x:0,y:0},
              firstLoad: true,
              OriginDatas: data,
              simpleDatas: simpleDatas,
              avatorUrl: require('@/assets/imgs/stepComputed/headImg.png'),
              imgDom: null,
              cvs: null,
              ctx: null,
              nextPointIndex: 0,
              dateContinuous: 0,
              isDonate: true,
              lastStepData: {},
              donatedStep: 0,
              todayStep: 0,
              circleNum: 0,
              processStep: 0,
              totalStep: 0,
              areaArr: [353500,196000,228500,353500,453500,233500,453500,403500,303500,460000],
              personStepArr: [],
              personAreaTotalIndex: 0,
              personRate: 0,
              persoRateIndex: 0,
              areaTotalIndex: 0,
              areaIndex: 0,
              finalPosition: {x:0,y:0},
              activeDistance: 0,
              rate: 1,
              rateIndex: 0,
              mapDatas: [],
              continuousDay: 0,
              isDonateFlag: false,
              isDonate: false,
              versionFlag:false,
              drawNum: 0,
              propNum: 0,
              step: 0,
              deviceNo: '9511040880084aefb4dd1377cf1159ea'
            }
        },
        components: {
          Gpopup,
          StageList,
          RankingList,
          Rules,
          Header
        },
        computed: {
          donateText () {
            return  this.isDonate ? '今日已捐' : `今日可捐步数${this.step}`
          }
        },
        created() {
          this.isBrowser = this.$app.isBrowser()
          // console.log('mapDatas', this.mapDatas)
            // document.addEventListener("visibilitychange", function () {
            //     if (!document.hidden) {
            //         window.location.reload()
            //     }
            // }, false);
        },
        mounted() {
            // this.$refs['tip'].show('5')
            // this.init()
            window.onload = () => {
              this.imgDom=document.getElementById("avator")
              this.cvs = document.getElementById('canvas')
              this.ctx = this.cvs.getContext('2d')
              this.init()
            }
        },
        methods: {
            init () {
              var u = navigator.userAgent.toLowerCase()
              this.isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
              this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
              this.$app.getDeviceNo((deviceNo) => {
                  this.deviceNo = deviceNo
                  // this.getStep(deviceNo)
              })
              if (this.isAndroid) {
                  setupWebViewJavascriptBridge((bridge) => {
                      bridge.callHandler('getStepAndroidAllNum', {}, (response) => {
                          response = JSON.parse(response)
                          console.log('getStepAndroidAllNum', response)
                          this.saveAndroidStep(response)
                      })
                  })
              }
              this.getActStepTwoHomeInfo() //获取首页信息
              if(this.isIos){
                  this.judgeVersion()
              }
              // this.getStep()
            },
            howTodraw () {
              this.$refs['tip'].show('4')
            },
            positionInit (point={x: 1218, y: 603}) {
                let doc = document.documentElement,
                    body = document.body;
                if (doc) {
                  doc.scrollLeft = point.x - doc.clientWidth/2
                  doc.scrollTop = point.y - doc.clientHeight/2;
                }

                if (body) {
                  body.scrollLeft= point.x - body.clientWidth/2;
                  body.scrollTop = point.y - body.clientHeight/2;
                }
            },
            showRules () {
              this.$refs['rules'].show()
            },
            showStageList () {
              this.$refs['stagelist'].show()
            },
            showRankList () {
              this.$refs['ranklist'].show()
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
                if (this.isDonate) {
                    Toast.info('您已捐过，明天再来吧')
                    return false
                }
                this.getStepInfo(this.lastStepData)

                let result = this.judgeAccordNext()
                if(!result) return false
                this.$app.getToken(()=>{
                   if (this.step === 0) {
                       Toast.info('您没有步数可捐')
                       return false
                   } else if (this.step < 500 && this.step > 0) {
                       // this.$refs['stepDialog'].openDonateStep()
                   } else {
                       this.donateAllStep()
                   }
                })
            },
            donateAllStep() {
                //捐步
                // POST /api/act/stepTwo/goStep
                this.$app.getToken((userToken) => {
                    let data = {
                        "stepNum" : this.step,
                        "deviceNo" : this.deviceNo
                    }
                    this.$request({
                        url: `/act/stepTwo/goStep`,
                        userToken: userToken,
                        contentType: 'application/json;charset=UTF-8',
                        method: 'POST',
                        data: data,
                        successFn: (data) => {
                            // this.donateBean = data.score
                            this.totalStep += this.step

                            this.step = 0
                            // 刷新页面数据
                            this.refresh()
                            // 捐步后人绘制的路径
                            this.loadPersonPath ()

                            this.isDonate = true  //判断是否捐过步
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            loadPersonPath () {
              // 计算出要走的数据
              // this.areaTotalIndex = this.compuAreaTotalIndex (this.totalStep)
              this.personAreaTotalIndex = this.compuAreaTotalIndex (this.totalStep)
              //比例算法 要走的步数/阶段总步数 = 要走到的点位/阶段总点数    要走到的点位 = (要走的步数/阶段总步数)*阶段总点数

              this.personRate = this.activeDistance/this.areaArr[this.personAreaTotalIndex]
              this.persoRateIndex = (this.personRate * this.OriginDatas[this.personAreaTotalIndex].length).toFixed(0)

              if (this.areaTotalIndex == this.personAreaTotalIndex) {
                 this.personStepArr = this.OriginDatas[this.areaTotalIndex].slice(this.rateIndex, this.persoRateIndex)
              } else {
                 let arr = this.OriginDatas[this.areaTotalIndex];
                 this.personStepArr = this.OriginDatas[this.areaTotalIndex].slice(this.rateIndex,arr.length).concat(this.OriginDatas[this.areaTotalIndex+1].slice(0, this.persoRateIndex))
              }
              console.log('this.personStepArr', this.personStepArr)
              this.personMapInit ()
            },
            compuAreaTotalIndex (totalStep) {
                let compRate = 1,nextNum = 0;
                for (var i = 0; i < this.areaArr.length; i++) {
                  nextNum = totalStep;
                  totalStep = totalStep - this.areaArr[i]
                  if (totalStep <= 0) {
                    compRate = nextNum % this.areaArr[i]
                    this.activeDistance = compRate
                    return i
                  }
                }
            },
            //从原生拿到最终计算出来的步数
            getStepInfo(data) {
                let lastStepTime = data.lastStepTime ? this.transDate(data.lastStepTime) : null
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler('getStepNum', {
                        'lastStepTime': lastStepTime, 'lastStepNum': data.deviceStepNum || 0//是否返回按钮，1-返回 0-不返回
                    }, (response) => {
                        console.log('getStepNum----------response', response)
                        this.isDonateFlag = true
                        let data = JSON.parse(response)
                        let step =  Number(data.donateStep)
                        this.step = step > 15000 ? 15000 : step;
                    });

                })
            },
            transDate (v) {
              let fmt = 'yyyy-MM-dd hh:mm:ss'
              let date = new Date(v)
              if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
              }
              let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
              }
              for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                  let str = o[k] + ''
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
                }
              }
              return fmt
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
                var mousePos = this.getMousePosition(event);
                var x = mousePos.x;
                var y = mousePos.y;
                console.log(x,y)
            },
            refresh () {
              this.getActStepTwoHomeInfo()
              this.$refs['stagelist'].getList()
              this.$refs['ranklist'].getList()
            },
            getActStepTwoHomeInfo () {
               this.$app.getToken((userToken) => {
                  console.log('userToken', userToken)
                   this.$request({
                       url: `/act/stepTwo/getActStepTwoHomeInfo/${this.deviceNo}`,
                       userToken: userToken,
                       successFn: (data) => {
                          this.processStep = data.processStep || 0
                          this.avatorUrl = data.imageUrl || require('@/assets/imgs/stepComputed/headImg.png')
                          this.totalStep = data.totalStep || 0
                          this.continuousDay = data.continuousDay || 0
                          this.drawNum = data.drawNum
                          this.propNum = data.propNum

                          this.isDonate =  data.stepFlag !== '1'
                          this.todayStep = data.todayStep
                          this.lastStepData = data

                          if (this.firstLoad) {
                            this.firstLoad = false
                            // 第一次加载绘制
                            this.getStepInfo(this.lastStepData)

                            if (this.totalStep && this.totalStep > 0) {
                                // 计算出要走的数据 自己的部分
                                this.areaTotalIndex = this.compuAreaTotalIndex (this.totalStep)
                                this.compuMapDatas()
                                this.mapInit ()

                                // 别人的部分
                                if (data.actStepTwoBeforeUserDTOList && data.actStepTwoBeforeUserDTOList.length > 0) {
                                  for (let i=0;i < data.actStepTwoBeforeUserDTOList.length; i++) {
                                    let item = data.actStepTwoBeforeUserDTOList[i];
                                    this.areaTotalIndex = this.compuAreaTotalIndex (item.baseStep)
                                    this['position'+(i+1)] = this.compOtherPersonPosition()
                                    console.log('this.position1', this['position'+(i+1)])
                                    this.$refs['person'+(i+1)].style.visibility = 'visible'
                                    this.$refs['person'+(i+1)].style.left = `${this['position'+(i+1)].x}px`
                                    this.$refs['person'+(i+1)].style.top = `${this['position'+(i+1)].y}px`
                                  }
                                }
                            }
                          }

                          // this.mapDatas[this.areaTotalIndex] = this.totalStep/this.areaArr[this.areaTotalIndex]
                       },
                       failFn: (data) => {
                       }
                   })
               })
            },
            compOtherPersonPosition () {
              //比例算法 要走的步数/阶段总步数 = 要走到的点位/阶段总点数    要走到的点位 = (要走的步数/阶段总步数)*阶段总点数
              this.rate = this.activeDistance/this.areaArr[this.areaTotalIndex]
              this.rateIndex = (this.rate * this.OriginDatas[this.areaTotalIndex].length).toFixed(0)
              return this.OriginDatas[this.areaTotalIndex][this.rateIndex]
            },
            compuMapDatas () {
               //比例算法 要走的步数/阶段总步数 = 要走到的点位/阶段总点数    要走到的点位 = (要走的步数/阶段总步数)*阶段总点数
               this.rate = this.activeDistance/this.areaArr[this.areaTotalIndex]
               this.rateIndex = (this.rate * this.OriginDatas[this.areaTotalIndex].length).toFixed(0)
               for (var i = 0; i < this.areaTotalIndex; i++) {
                 this.mapDatas.push(this.simpleDatas[i]) // 加载简单的点数据，节省性能
               }
               this.mapDatas[this.areaTotalIndex] = this.OriginDatas[this.areaTotalIndex].slice(0, this.rateIndex)
               const point = this.OriginDatas[this.areaTotalIndex][this.rateIndex]
               this.positionInit({x: point.x, y: point.y})
               console.log('this.mapDatas', this.mapDatas)
            },
            //获取安卓的总步数
            saveAndroidStep(response) {
                let data = {
                    "deviceNo": this.deviceNo,
                    "deviceStepNum": response.totalStep
                }
                // POST /api/act/stepTwo/saveDeviceTotalStep
                this.$app.getCurrentToken((userToken) => {
                    this.$request({
                        url: `/act/stepTwo/saveDeviceTotalStep`,
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
            judgeVersion(){
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler('getVersion', {}, (response) => {
                        response = JSON.parse(response)
                        this.versionFlag = true
                        console.log("response12312312321312",response);
                        this.version = Number(response.data.replace(/\./g,''))
                        if(this.version < 110){
                            Dialog.alert({content:'您当前的版本过低，请升级版本'})
                            return false
                        }
                    });

                })
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
            mapInit() {
                this.ctx.strokeStyle = '#17BAA7' // '#47AC76'
                this.ctx.shadowColor = '#17BAA7'
                this.ctx.shadowBlur = 1
                this.ctx.lineWidth = 4

                this.loadWalkedPath()
            },
            loadWalkedPath () {
              for (var i=0; i < this.mapDatas.length; i++) {
                let item1 = this.mapDatas[i]
                for (var j = 0; j < item1.length; j++) {
                  let item2 = item1[j]
                  this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
                  this.ctx.globalAlpha = 1
                  this.ctx.lineTo(item2.x, item2.y);
                  this.ctx.drawImage(this.imgDom, item2.x -25 , item2.y - 10 , 30, 30)
                }
              }
              this.ctx.stroke()
            },
            personMapInit () {
              // this.personStepArr
              this.ctx.strokeStyle = '#17BAA7' // '#47AC76'
              this.ctx.shadowColor = '#17BAA7'
              this.ctx.shadowBlur = 1
              this.ctx.lineWidth = 4
              this.personAnimate()
            },
            personAnimate () {
              this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
              this.ctx.globalAlpha = 1
              this.ctx.lineTo(this.personStepArr[this.nextPointIndex].x, this.personStepArr[this.nextPointIndex].y);
              this.ctx.drawImage(this.imgDom, this.personStepArr[this.nextPointIndex].x -25 , this.personStepArr[this.nextPointIndex].y - 10 , 30, 30);
              this.nextPointIndex++
              // this.ctx.lineTo(this.personStepArr[this.nextPointIndex].x, this.personStepArr[this.nextPointIndex].y);
              this.ctx.stroke()
              if (this.nextPointIndex > this.personStepArr.length-1) {
                this.nextPointIndex = 0
                return false
              }
              this.timer = window.requestAnimationFrame(this.personAnimate)
            },
            animate () {
                // this.areaTotalIndex
                this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
                this.ctx.globalAlpha = 1
                this.ctx.lineTo(this.mapDatas[this.areaIndex][this.nextPointIndex].x, this.mapDatas[this.areaIndex][this.nextPointIndex].y);
                this.ctx.drawImage(this.imgDom, this.mapDatas[this.areaIndex][this.nextPointIndex].x -25 , this.mapDatas[this.areaIndex][this.nextPointIndex].y - 10 , 30, 30);
                this.nextPointIndex++
                // this.ctx.lineTo(this.mapDatas[this.areaIndex][this.nextPointIndex].x, this.mapDatas[this.areaIndex][this.nextPointIndex].y);
                this.ctx.stroke()
                if (this.nextPointIndex > this.mapDatas[this.areaIndex].length-1) {
                  this.nextPointIndex = 0
                  this.areaIndex++
                  if (this.areaIndex > this.areaTotalIndex) { return false }
                }
                this.timer = window.requestAnimationFrame(this.animate)
            },
            goLuckyDraw () {
              location.href = `/activity/step/LuckyDraw.html`
            }
        }
    }

</script>

<style lang="scss" scoped>
    .step-wrap {
      min-height: 100%;
      width: 100%;
      .step {
        width: 1786PX;
        height: 1503PX;
        background: url('~@/assets/imgs/stepComputed/new/map.jpg') 0 / 100% 100% no-repeat;
        .avator {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: absolute;
          top: 603PX;
          left: 1218PX;
          visibility: hidden;
        }
        #person1,
        #person2 {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: absolute;
          top: 603PX;
          left: 1218PX;
          visibility: hidden;
        }
      }
      .footer {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        .rules {
          width: 110px;
          height: 34px;
          margin: 20px;
        }
        .inner {
          border-radius: 40px 40px 0 0;
          background-color: #1ABAAB;
          height: 136px;
          display: flex;
          box-sizing: border-box;
          padding-top: 22px;
          justify-content: space-between;
          .img-block {
            width: 88px;
            height: 104px;
            position: relative;
            &.active {
              &::before {
                content: '';
                width: 20px;
                height: 20px;
                background-color: #F6434E;
                border-radius: 20px;
                position: absolute;
                top: 0;
                right: 0;
              }
            }
          }
          .left {
            display: flex;
            > div {
              margin-left: 30px;
              p {
                color: #fff;
                font-size: 30px;
                &.p1 {
                  font-size: 24px;
                  span {
                    font-size: 40px;
                  }
                }
              }
            }
          }
          .right {
            display: flex;
            > div {
              margin-right: 30px;
            }
          }
        }
        .go {
          width: 196px;
          height: 196px;
          position: fixed;
          left: 50%;
          -webkit-transform: translateX(-50%);
             -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
               -o-transform: translateX(-50%);
                  transform: translateX(-50%);
          bottom: 20px;
          .donate {
              position: absolute;
              height: 60px;
              width: max-content;
              line-height: 60px;
              padding: 6px 20px;
              top: -90px;
              background: #fff;
              white-space: nowrap;
              color: #1DBAA3;
              font-size: 30px;
              border-radius: 16px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
              &:before {
                 content: '';
                 width: 0;
                 height: 0;
                 border: 0.2rem solid;
                 position: absolute;
                 bottom: -30px;
                 left: 50%;
                 transform: translateX(-50%);
                 border-color: #fff transparent transparent transparent;
              }

              img {
                width: 40px;
                height: 40px;
                border-radius: 40px;
                margin-right: 8px;
              }
          }
        }
      }
    }
</style>
