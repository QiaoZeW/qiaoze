<template>
    <div class="logo-comp">
      <ul class="city-bg">
          <li :class="{'active': logoIndex == bgIndex}" v-for="(bg,bgIndex) in cityBgList" :key="bgIndex">
              <img :src="bg" alt="">
          </li>
      </ul>
      <div class="city-logo">
        <ul
            :style="{'left': `${(285 - (logoIndex)*170)/75}rem`}"
            @touchstart="touchStartFn($event, cityLogoList)"
            @touchend="touchEndFn($event, cityLogoList)"
        >
            <li :class="{'active': logoIndex == index1}" v-for="(logo,index1) in cityLogoList" :key="index1">
                <div class="img-block">
                  <img class="logo" :src="logo" alt="">
                  <span v-if="numberArr[index1] && numberArr[index1].drawNum>0">x{{numberArr[index1].drawNum}}</span>
                </div>
                <img v-show="index1 != cityLogoList.length-1" class="arrow" src="@/assets/imgs/stepComputed/new/city/arrow.png" alt="">
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "LogoComp",
        data(){
            return{
              logoIndex: 0,
              logoLeft: 0,
              cityBgList: [
                  // require('@/assets/imgs/stepComputed/new/city/bg_0.png'),
                  require('@/assets/imgs/stepComputed/new/city/bg_1.png'),
                  require('@/assets/imgs/stepComputed/new/city/bg_2.png'),
                  require('@/assets/imgs/stepComputed/new/city/bg_3.png'),
                  require('@/assets/imgs/stepComputed/new/city/bg_4.png')
              ],
              cityLogoList: [
                // require('@/assets/imgs/stepComputed/new/city/0.png'),
                require('@/assets/imgs/stepComputed/new/city/1.png'),
                require('@/assets/imgs/stepComputed/new/city/2.png'),
                require('@/assets/imgs/stepComputed/new/city/3.png'),
                require('@/assets/imgs/stepComputed/new/city/4.png')
              ],
              numberArr: []
            }
        },
        components: {
        },
        props: {
          cityDrawNumArr: {
            type: Array,
            default: () => []
          }
        },
        created(){
            this.init()
        },
        methods:{
          init () {
          },
          touchEndFn (e, actDatas, act) {
              // if (index==actDatas.length-1) return
              this.endx = e.changedTouches[0].pageX;
              this.endy = e.changedTouches[0].pageY;
              var direction = this.getDirection(this.startx, this.starty, this.endx, this.endy);
              if (direction == 3) { // 左滑
                this.logoIndex++
                if (this.logoIndex > this.cityLogoList.length-1) {
                  this.logoIndex = this.cityLogoList.length-1
                  return false
                }
                this.$emit('chageStepCityCode', this.logoIndex+1)
                return false
              } else if (direction == 4) { // 右滑
                this.logoIndex--
                if (this.logoIndex<0) {
                   this.logoIndex = 0
                   return false
                }
                this.$emit('chageStepCityCode', this.logoIndex+1)
                return false
              }
              // switch (direction) {
              //   case 0:
              //       console.log("未滑动！");
              //       break;
              //   case 1:
              //       console.log("向上！")
              //       break;
              //   case 2:
              //       console.log("向下！")
              //       break;
              //   case 3:
              //       console.log("向左！")
              //       break;
              //   case 4:
              //       console.log("向右！")
              //       break;
              // }
          },
          touchStartFn(e, index, actDatas) {
              // console.log('_touchStart', e)
              this.startx = e.touches[0].pageX;
              this.starty = e.touches[0].pageY;
              // console.log('this.startx ', 'this.starty ', this.startx ,this.starty)
          },
          getAngle(angx, angy) {
            return Math.atan2(angy, angx) * 180 / Math.PI;
          },
          //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
          getDirection (startx, starty, endx, endy) {
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
              return result;
            }
            var angle = this.getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
            result = 1;
            } else if (angle > 45 && angle < 135) {
              result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
              result = 3;
            } else if (angle >= -45 && angle <= 45) {
              result = 4;
            }
            return result;
          }
        },
        watch: {
          cityDrawNumArr (v) {
            if (v) {
              this.numberArr = v
            }
          }
        }
    }
</script>

<style scoped lang="scss">
.logo-comp {
  .city-bg {
     position: absolute;
     top: 230px;
     left: 20px;
     li {
       width: 548px;
       height: 206px;
       display: none;
       img {
         width: 100%;
         height: 100%;
       }
       &.active {
         display: block;
       }
     }
  }

  .city-logo {
    margin-top: 250px;
    position: relative;
    height: 140px;
    overflow: hidden;
    ul {
      position: absolute;
      left: 300px;
      top: 0;
      width: 9999px;
      height: 100%;
      top: 50%;
      transition: all .5s;
      -webkit-transform: translateY(-50%);
         -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
           -o-transform: translateY(-50%);
              transform: translateY(-50%);
      li {
        float: left;
        position: relative;
        width: 170px;
        height: 100%;
        &.active {
          width: 220px;
          .img-block {
            width: 140px;
            height: 138px;
            span {
              top: 0px;
            }
          }
        }
        .arrow {
          right: 10px;
          z-index: -1;
          position: absolute;
          top: 50%;
          -webkit-transform: translateY(-50%);
             -moz-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
               -o-transform: translateY(-50%);
                  transform: translateY(-50%);
        }
        .img-block {
          position: absolute;
          width: 86px;
          height: 84px;
          top: 50%;
          -webkit-transform: translateY(-50%);
             -moz-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
               -o-transform: translateY(-50%);
                  transform: translateY(-50%);
          span {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: #11CEFF;
            padding: 6px 10px 6px 6px;
            border-radius: 16px 16px 16px 0;
          }
        }
      }
    }
  }
}
</style>
