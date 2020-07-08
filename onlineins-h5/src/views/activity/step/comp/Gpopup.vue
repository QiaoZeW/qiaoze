<template>
    <div class="pop-list">
      <md-popup v-model="isShow1">
        <div class="gpopup">
          <md-icon class="close" name="clear" size="lg" @click="isShow1=false" />
          <h3 class="mb88">您还有未使用的抽奖机会</h3>
          <button @click="click1">去抽奖</button>
        </div>
      </md-popup>

      <md-popup v-model="isShow2">
        <div class="gpopup">
          <md-icon class="close" name="clear" size="lg" @click="isShow2=false" />
          <h3>恭喜您完成本季目标<br>下季xx月xx日开始</h3>
          <p class="mb88">连续捐步可获得行者奖励，<br>明天记得来捐步哦~</p>
          <button class="green" @click="click2">知道了</button>
        </div>
      </md-popup>

      <md-popup v-model="isShow3">
        <div class="gpopup">
          <md-icon class="close" name="clear" size="lg" @click="isShow3=false" />
          <h3>步数有点少,每天只能捐一次，<br>要不要再运动一会？</h3>
          <button class="yellow" @click="click3">再捐点</button>
          <button class="green" @click="click3">继续捐</button>
        </div>
      </md-popup>

      <md-popup v-model="isShow4">
        <div class="gpopup pop4">
          <md-icon class="close" name="clear" size="lg" @click="isShow4=false" />
          <h3 class="title4">如何得到抽奖机会？</h3>
          <p>每走40000步，可获得一次抽奖机会</p>
          <GProgress v-if="processStep" :step="processStep" text="您行走了" />
        </div>
      </md-popup>

      <md-popup v-model="isShow5">
        <div class="gpopup pop4">
          <md-icon class="close" name="clear" size="lg" @click="isShow5=false" />
          <h3 class="title4">连续捐步规则说明</h3>
          <p class="p5">连续3天完成行走，第3天起，行走步数按1.2倍计算。<br>
              连续7天完成行走，第7天起，行走步数按1.5倍计算。<br>
              如有中断，加成需从新累计。
          </p>
        </div>
      </md-popup>

      <md-popup v-model="isShow6">
        <div class="gpopup pop4 pop6">
          <md-icon class="close" name="clear" size="lg" @click="isShow6=false" />
          <div class="popsImg" :class="{'bikeshow': isShow6}">
          </div>
          <GProgress v-if="processStep" :step="processStep" />
        </div>
      </md-popup>

      <md-popup v-model="isShow7">
        <div class="gpopup pop4 pop7">
          <md-icon class="close" name="clear" size="lg" @click="isShow7=false" />
          <div class="popsImg" :class="{'carshow': isShow7}">
          </div>
          <GProgress v-if="processStep" :step="processStep" />
        </div>
      </md-popup>
      <img :src="item" v-for="item in picList" alt="" style="display: none">
    </div>
</template>

<script>
    import GProgress from './GProgress'
    export default {
        name: "Gpopup",
        data () {
            return {
              isShow1: false,
              isShow2: false,
              isShow3: false,
              isShow4: false,
              isShow5: false,
              isShow6: false,
              isShow7: false,
              picList: [
                require("@/assets/imgs/stepComputed/new/bike/bike1.png"),
                require("@/assets/imgs/stepComputed/new/bike/bike2.png"),
                require("@/assets/imgs/stepComputed/new/bike/bike3.png"),
                require("@/assets/imgs/stepComputed/new/bike/bike4.png"),
                require("@/assets/imgs/stepComputed/new/bike/bike5.png"),
                require("@/assets/imgs/stepComputed/new/car/car1.png"),
                require("@/assets/imgs/stepComputed/new/car/car2.png"),
                require("@/assets/imgs/stepComputed/new/car/car3.png"),
                require("@/assets/imgs/stepComputed/new/car/car4.png"),
                require("@/assets/imgs/stepComputed/new/car/car5.png"),
              ]
            }
        },
        components: {
          GProgress
        },
        props: {
            processStep: {
              type: Number,
              default: 0
            }
        },
        created() {
        },
        methods: {
          show (n='1') {
            this[`isShow${n}`] = true
          },
          hide (n='1') {
            this[`isShow${n}`] = false
          },
          click1 () {
            console.log('click1')
          },
          click2 () {
            this.isShow2 = false
          },
          click3 () {
            console.log('isshow3')
            // this.isShow3 = false
          },
          click4 () {
            console.log('isshow4')
            // this.isShow3 = false
          }
        }
    }
</script>

<style lang='scss' scoped>
.grey {
  color: #DBD9DC;
}
.gpopup {
  background-color: #fff;
  text-align: center;
  border-radius: 32px;
  box-sizing: border-box;
  padding: 84px 100px 44px;
  &.pop4 {
    padding: 54px 64px 70px;
  }
  &.pop4.pop6 {
    .popsImg {
      width: 133px;
      height: 150px;
      margin: 0 auto;
      background: url("~@/assets/imgs/stepComputed/new/bike/bike1.png") no-repeat;
      background-size: 100%;
    }
  }
  &.pop4.pop7 {
    .popsImg {
      width: 200px;
      height: 120px;
      margin: 0 auto;
      background: url("~@/assets/imgs/stepComputed/new/car/car1.png") no-repeat;
      background-size: 100%;
    }
  }
  .mb88 {
    margin-bottom: 88px;
  }
  .close {
    color: #DBD9DC;
    position: absolute;
    top: 30px;
    right: 30px;
  }
  h3 {
    color: #333;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    margin-bottom: 20px;
    &.title4 {
      background-color: #E5F4F6;
      color: #07A895;
      font-size: 36px;
      font-weight: bold;
      width: 388px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      border-radius: 80px;
      margin: 0 auto 50px;
    }
  }
  p {
    font-size: 28px;
    color: #333;
    line-height: 40px;
    margin-bottom: 20px;

    &.p4 {
      text-align: left;
    }
    &.p5 {
      width: 484px;
      margin: 0 auto;
      text-align: left;
      line-height: 44px;
    }
  }
  button {
    width: 400px;
    height: 88px;
    border-radius: 88px;
    display: block;
    margin: 0 auto 20px;
    background: linear-gradient(to bottom, #FF764D, #F64528);
    color: #fff;
    font-size: 32px;
    &.blue {
      background: linear-gradient(to bottom, #47C1FE, #2877F6);
    }
    &.green {
      background: linear-gradient(to bottom, #11D3C7, #07A895);
    }
    &.yellow {
      background: linear-gradient(to bottom, #FFDD2B, #FFB913);
    }
  }

}

.bikeshow {
  animation: bikemove 1s infinite;
}

.carshow {
  animation: carmove 1s infinite;
}

@keyframes bikemove {
    0% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike1.png");
    }
    20% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike1.png");
    }
    40% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike2.png");
    }
    60% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike3.png");
    }
    80% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike4.png");
    }
    100% {
        background-image: url("~@/assets/imgs/stepComputed/new/bike/bike5.png");
    }
}

@keyframes carmove {
    0% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car1.png");
    }
    20% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car1.png");
    }
    40% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car2.png");
    }
    60% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car3.png");
    }
    80% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car4.png");
    }
    100% {
        background-image: url("~@/assets/imgs/stepComputed/new/car/car5.png");
    }
}
</style>
