<template>
    <div class="cartoon-wrap">
        <audio class="music" id="music1" src="/static/music_01.mp3" loop preload></audio>
        <audio class="music" id="music2" src="/static/music_02.mp3" loop></audio>
        <audio class="music" id="music3" src="/static/music_03.mp3" loop></audio>
        <div v-if="isMusicPlay" @click.once="puseMusic" class="musicPlay">
          <img class="play" v-lazy="lazyImgs.play" alt="">
        </div>
        <div class="page page0">
          <div class="loading">
            <img class="loading1" v-lazy="lazyImgs.loading1" alt="">
            <div class="progress">
              <img class="loading2" v-lazy="lazyImgs.loading2" alt="">
              <div class="percent" :style="{'width': percent+'%'}"></div>
            </div>
            <img class="loading3" v-lazy="lazyImgs.loading3" alt="">
            <!-- <img class="loading4" v-lazy="lazyImgs.loading4" alt="" onclick="document.getElementById('music1').play()"> -->
          </div>
        </div>
        <div class="page page1" :class="{'show': page1Show}">
          <img v-lazy="lazyImgs.banner0" alt="">
          <div @click="start" class="start" alt=""></div>
        </div>
        <div class="page page2" :class="{'show': page2Show}">
          <img v-lazy="lazyImgs['A-1']" alt="">
          <div class="buttons">
            <div @click="page2ClickA"></div>
            <div @click="page2ClickB"></div>
          </div>
        </div>
        <div class="page page3" :class="{'show': page3Show}">
          <img  v-if="sex == 'A'" v-lazy="lazyImgs['A-2']" alt="">
          <img v-else v-lazy="lazyImgs['B-1']" alt="">
          <div class="button button1" @click="page3ClickA"></div>
          <div class="button button2" @click="page3ClickB"></div>
          <div class="button button3" @click="page3ClickC"></div>
          <div class="button button4" @click="page3ClickD"></div>
        </div>
        <div class="page page4" :class="{'show': page4Show}">
            <ul class="move" :style="{'top': -page4ShowIndex*100 + '%', 'height': page4ActDatas.length*100+'%'}">
                <li @touchstart="touchStartFn($event, index, page4ActDatas)"
                    @touchend="touchEndFn($event, index, page4ActDatas, 'page4Act')"
                    v-for="(item, index) in page4ActDatas" :key="index" :style="{'height': (100/page4ActDatas.length)+'%'}">
                    <div class="banner-item">
                        <img v-lazy="item" alt="图片未显示">
                        <img v-if="index!=page4ActDatas.length-1" @click="page4Act" class="arrow-down" :src="lazyImgs.loading4" alt="">
                        <div v-else>
                          <div class="button button1" @click="page4ClickA"></div>
                          <div class="button button2" @click="page4ClickB"></div>
                          <div class="button button3" @click="page4ClickC"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="page page5" :class="{'show': page5Show}">
            <ul class="move" :style="{'top': -page5ShowIndex*100 + '%', 'height': page5ActDatas.length*100+'%'}">
                <li @touchstart="touchStartFn($event, index, page5ActDatas)"
                    @touchend="touchEndFn($event, index, page5ActDatas, 'page5Act')"
                    v-for="(item, index) in page5ActDatas" :key="index" :style="{'height': (100/page5ActDatas.length)+'%'}">
                    <div class="banner-item">
                        <img  v-lazy="item" alt="图片未显示">
                        <img v-if="index!=page5ActDatas.length-1" @click="page5Act" class="arrow-down" :src="lazyImgs.loading4" alt="">
                        <div v-else>
                          <div class="button button1" @click="page5ClickA"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="page page6" :class="{'show': page6Show}">
          <img v-if="isBrowser" v-lazy="lazyImgs['C-14out']" alt="">
          <img v-else v-lazy="lazyImgs['C-14app']" alt="">
          <div class="button button1" :class="{'isBrowser': !isBrowser}" @click="page6ClickA"></div>
          <div v-if="!isBrowser" class="button button2" :class="{'isBrowser': !isBrowser}" @click="page6ClickB"></div>
          <div class="sepBtn button" :class="{'isBrowser': !isBrowser}">
            <div class="button3" @click="page6ClickC"></div>
            <div class="button4" @click="page6ClickD"></div>
          </div>
        </div>
        <div class="page hidearea">
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "Cartoon",
        data () {
            return {
              startx: NaN,
              starty: NaN,
              endx: NaN,
              endy: NaN,
              music1: null,
              music2: null,
              music3: null,
              showLoadedBtn: false,
              isMusicPlay: false,
              lazyImgs: {
                loading1: require('@/assets/imgs/cartoon/loading1.png'),
                loading2: require('@/assets/imgs/cartoon/loading2.png'),
                loading3: require('@/assets/imgs/cartoon/loading3.png'),
                loading4: require('@/assets/imgs/cartoon/arow-down.gif'),
                'A-1': require('@/assets/imgs/cartoon/A-1.gif'),
                'A-2': require('@/assets/imgs/cartoon/A-2.gif'),
                'B-1': require('@/assets/imgs/cartoon/B-1.gif'),
                'C-14app': require('@/assets/imgs/cartoon/C-14app.gif'),
                'C-14out': require('@/assets/imgs/cartoon/C-14out.jpg'),
                banner0: require('@/assets/imgs/cartoon/banner0.gif'),
                play: require('@/assets/imgs/cartoon/play.png'),
                pause: require('@/assets/imgs/cartoon/pause.png')
              },
              page1Show: false,
              page2Show: false,
              page3Show: false,
              page4ActDatas: [
                require('@/assets/imgs/cartoon/A-3.gif'),
                require('@/assets/imgs/cartoon/A-4.gif'),
                require('@/assets/imgs/cartoon/A-5-13-19.gif'),
                require('@/assets/imgs/cartoon/A-6.gif'),
                require('@/assets/imgs/cartoon/C-1.gif')
              ],
              page4ActDatasObj: {
                'B0': [require('@/assets/imgs/cartoon/loading1.png'),require('@/assets/imgs/cartoon/loading2.png'),require('@/assets/imgs/cartoon/loading3.png'),require('@/assets/imgs/cartoon/arow-right.gif'),require('@/assets/imgs/cartoon/banner0.gif'),require('@/assets/imgs/cartoon/start.png'),require('@/assets/imgs/cartoon/play.png'),require('@/assets/imgs/cartoon/pause.png'),require('@/assets/imgs/cartoon/A-1.gif'),require('@/assets/imgs/cartoon/A-2.gif'),require('@/assets/imgs/cartoon/B-1.gif')],
                'A2': [ require('@/assets/imgs/cartoon/A-7.gif'), require('@/assets/imgs/cartoon/A-8.gif'), require('@/assets/imgs/cartoon/A-9.gif'), require('@/assets/imgs/cartoon/A-10.gif'), require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'A3': [ require('@/assets/imgs/cartoon/A-11.gif'), require('@/assets/imgs/cartoon/A-12.gif'), require('@/assets/imgs/cartoon/A-5-13-19.gif'), require('@/assets/imgs/cartoon/A-14.gif'), require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'A4': [ require('@/assets/imgs/cartoon/A-15.gif'), require('@/assets/imgs/cartoon/A-16.gif'), require('@/assets/imgs/cartoon/A-17.gif'), require('@/assets/imgs/cartoon/A-18.gif'), require('@/assets/imgs/cartoon/A-5-13-19.gif'), require('@/assets/imgs/cartoon/A-20.gif'), require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'B1': [require('@/assets/imgs/cartoon/B-2.gif'),require('@/assets/imgs/cartoon/B-3.gif'),require('@/assets/imgs/cartoon/B-4-8-12-16.gif'),require('@/assets/imgs/cartoon/B-5.gif'),require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'B2': [require('@/assets/imgs/cartoon/B-6.gif'),require('@/assets/imgs/cartoon/B-7.gif'),require('@/assets/imgs/cartoon/B-4-8-12-16.gif'),require('@/assets/imgs/cartoon/B-9.gif'),require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'B3': [require('@/assets/imgs/cartoon/B-10.gif'),require('@/assets/imgs/cartoon/B-11.gif'),require('@/assets/imgs/cartoon/B-4-8-12-16.gif'),require('@/assets/imgs/cartoon/B-13.gif'),require('@/assets/imgs/cartoon/C-1.gif')
                ],
                'B4': [require('@/assets/imgs/cartoon/B-14.gif'),require('@/assets/imgs/cartoon/B-14a.gif'),require('@/assets/imgs/cartoon/B-15.gif'),require('@/assets/imgs/cartoon/B-4-8-12-16.gif'),require('@/assets/imgs/cartoon/B-17.gif'),require('@/assets/imgs/cartoon/C-1.gif')
                ]
              },
              page4ShowIndex: -1,
              page5ShowIndex: -1,
              page4Show: false,
              page5Show: false,
              page5ActDatas: [
                 require('@/assets/imgs/cartoon/C-2.gif'),
                 require('@/assets/imgs/cartoon/C-3.gif'),
                 require('@/assets/imgs/cartoon/C-4.gif'),
                 require('@/assets/imgs/cartoon/C-5.gif'),
                 require('@/assets/imgs/cartoon/C-6.gif')
              ],
              page6Show: false,
              sex: 'A',
              percent: 0,
              shareOptions: {
                href:'',
                title: '测测你的老年生活有多嗨！',
                desc:'测测你的老年生活有多嗨！',
                link:'',
                imgUrl:''
              },
              shareImgUrl: require('@/assets/imgs/cartoon/share.gif'),
              isPage4ClickA: false,
              isPage4ClickB: false,
              isPage4ClickC: false,
              isPage3ClickBSexA: false,
              isPage3ClickDSexA: false,
              secondaryDistributor: 'CPS_00010009'
            }
        },
        computed: {
          isBrowser () {
            // app分享，微信公众号
            return ['cps_00010005', 'CPS_00010009'].indexOf(this.secondaryDistributor) == -1
          },
          is_weixin() {
              let ua = navigator.userAgent.toLowerCase();
              return (ua.match(/MicroMessenger/i) == "micromessenger" )
          },
          is_ios () {
              let u = navigator.userAgent.toLowerCase()
              return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)
          }
        },
        created() {
          this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'CPS_00010009'
        },
        mounted () {
          if(this.$app.isBrowser()) {
            setupWebViewJavascriptBridge((bridge)=> {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'title': '', //标题
                    'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': this.$router.siteUrl() + '/activity/Cartoon/Cartoon.html?secondaryDistributor=' + this.secondaryDistributor,
                    'share_title': '测测你的老年生活有多嗨！', //分享标题
                    'share_text': '测测你的老年生活有多嗨！', //分享描述
                    'share_imgurl':this.$router.siteUrl() + this.shareImgUrl //分享图片地址
                }, function (response) {
                })
            })
          }
          this.wxshare()
          this.music1 = document.getElementById('music1')
          this.music2 = document.getElementById('music2')
          this.music3 = document.getElementById('music3')
          this.playM(1)
          this.loadProgressBar()
          let hidearea = document.querySelector('.hidearea')
          for (let i in this.page4ActDatasObj) {
            let item = this.page4ActDatasObj[i]
            for (let j = 0; j < item.length; j++) {
              let img = new Image()
              img.src = item[j]
              hidearea.appendChild(img)
            }
          }
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState == 'hidden') {
              this.puseMusic()
            } else if (document.visibilityState == 'visible') {
              this.isMusicPlay = true
            }
          });
        },
        methods: {
          wxshare () {
            this.shareOptions.href = location.href
            this.shareOptions.link = this.$router.siteUrl() + '/activity/Cartoon/Cartoon.html?secondaryDistributor=' + this.secondaryDistributor
            this.shareOptions.imgUrl = this.$router.siteUrl() + this.shareImgUrl
            this.$app.wxShareDetail(this.shareOptions)
          },
          touchEndFn (e, index, actDatas, act) {
              if (index==actDatas.length-1) return
              this.endx = e.changedTouches[0].pageX;
              this.endy = e.changedTouches[0].pageY;
              var direction = this.getDirection(this.startx, this.starty, this.endx, this.endy);
              if (direction == 1) {
                if (act == 'page5Act') {
                  this.page5Act()
                } else {
                  this.page4Act()
                }
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
              if (index==actDatas.length-1) return
              console.log('_touchStart', e)
              this.startx = e.touches[0].pageX;
              this.starty = e.touches[0].pageY;
              console.log('this.startx ', 'this.starty ', this.startx ,this.starty)
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
          },
          loadingEnd () {
            this.isMusicPlay = true
            this.playM()
            this.removeLoading()
            this.music1.play()
          },
          removeLoading () {
            document.querySelector('.cartoon-wrap').removeChild(document.querySelector('.page0'))
          },
          puseMusic () {
            this.isMusicPlay = false
            this.music1.pause()
            this.music2.pause()
            this.music3.pause()
          },
          playM (start=0) {
            try {
                if(this.music1.canPlayType('audio/mpeg') == "probably") {
                  this.music1.addEventListener('canplaythrough', (e) => {
                    if (start == 1) {
                      this.music1.play()
                      this.music1.pause()
                    } else {
                      this.music1.play()
                    }
                  }, false);
                }
                if (this.is_weixin) {
                  document.addEventListener("WeixinJSBridgeReady", () => {
                      if (start == 1) {
                        this.music1.play()
                        this.music1.pause()
                      } else {
                        this.music1.play()
                      }
                  }, false)
                }
            }
            catch(e){
                console.log(e);
            }
          },
          loadProgressBar () {
            let timer = setInterval(() => {
              this.percent += 10
              if (this.percent == 90) {
                clearInterval(timer)
                this.page1Show = true
                this.loadingEnd()
              }
            }, 1000)
          },
          start () {
            this.page1Show = false
            this.page2Show = true
            if (this.isMusicPlay) {
              this.music1.play()
              // if (this.is_ios) {
              this.music2.play()
              this.music3.play()
              // }
              this.music2.pause()
              this.music3.pause()
            }
          },
          page2ClickA () {
            this.sex = 'A'
            this.page2Show = false
            this.page3Show = true
          },
          page2ClickB () {
            this.sex = 'B'
            this.page2Show = false
            this.page3Show = true
          },
          page3ClickA () {
            this.page3Show = false
            this.page4Show = true
            if (this.sex == 'B') {
                this.page4ActDatas = this.page4ActDatasObj['B1']
            }
            this.page4Act()
          },
          page3ClickB () {
            this.page3Show = false
            this.page4Show = true
            if (this.sex == 'A') {
              this.page4ActDatas = this.page4ActDatasObj['A2']
              this.isPage3ClickBSexA = true
            } else {
              this.page4ActDatas = this.page4ActDatasObj['B2']
            }
            this.page4Act()
          },
          page3ClickC () {
            this.page3Show = false
            this.page4Show = true
            if (this.sex == 'A') {
              this.page4ActDatas = this.page4ActDatasObj['A3']
            } else {
              this.page4ActDatas = this.page4ActDatasObj['B3']
            }
            this.page4Act()
          },
          page3ClickD () {
            this.page3Show = false
            this.page4Show = true
            if (this.sex == 'A') {
              this.page4ActDatas = this.page4ActDatasObj['A4']
              this.isPage3ClickDSexA = true
            } else {
              this.page4ActDatas = this.page4ActDatasObj['B4']
            }
            this.page4Act()
          },
          page4ClickA () {
            this.isPage4ClickA = true
            this.page4Show = false
            this.page5Show = true
            this.page5Act()
          },
          page4ClickB () {
            this.page5ActDatas=[
               require('@/assets/imgs/cartoon/C-2.gif'),
               require('@/assets/imgs/cartoon/C-7.gif'),
               require('@/assets/imgs/cartoon/C-8.gif'),
               require('@/assets/imgs/cartoon/C-9.gif'),
               require('@/assets/imgs/cartoon/C-10.gif'),
               require('@/assets/imgs/cartoon/C-15.gif')
            ]
            this.page4Show = false
            this.isPage4ClickB = true
            this.page5Show  = true
            if (this.isMusicPlay) {
              this.music3.pause()
              this.music1.load()
              this.music1.play()
            }
            this.page5Act()
          },
          page4ClickC () {
            this.page5ActDatas = [
               require('@/assets/imgs/cartoon/C-2.gif'),
               require('@/assets/imgs/cartoon/C-11.gif'),
               require('@/assets/imgs/cartoon/C-12.gif'),
               require('@/assets/imgs/cartoon/C-13.gif')
            ]
            this.page4Show = false
            this.isPage4ClickC = true
            this.page5Show  = true
            this.page5Act()
          },
          page4Act () {
              if (this.page4ShowIndex == this.page4ActDatas.length-1) return 
              this.page4ShowIndex++
              if (this.isMusicPlay) { // 音乐禁止
                if (this.page4ShowIndex == 1) {
                  if (this.isPage3ClickBSexA) {
                    this.music1.pause()
                    this.music3.play()
                  }
                }
                if (this.page4ShowIndex == this.page4ActDatas.length-4 && !this.isPage3ClickBSexA) {
                  this.music1.pause()
                }
                if (this.page4ShowIndex == this.page4ActDatas.length-3 && !this.isPage3ClickBSexA) {
                  this.music2.play()
                }
                if (this.page4ShowIndex == this.page4ActDatas.length-2 && !this.isPage3ClickBSexA) {
                    this.music2.pause()
                    this.music3.play()
                }
              }
          },
          page5Act () {
            if (this.page5ShowIndex == this.page5ActDatas.length-1) return 
            this.page5ShowIndex++
            if (this.isMusicPlay) {
              if (this.page5ShowIndex == this.page5ActDatas.length-1) {
                if (this.isPage4ClickA || this.isPage4ClickC) {
                    this.music3.pause()
                    this.music1.load()
                    this.music1.play()
                }
              }
            }
          },
          page5ClickA () {
            this.page5Show = false
            this.page6Show = true
            this.page5Act()
          },
          page6ClickA () {
            location.href = 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=130&secondaryDistributor=' + this.secondaryDistributor
          },
          page6ClickB () {
            location.href = 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=123&secondaryDistributor=' + this.secondaryDistributor
          },
          page6ClickC () {
            location.href='/activity/Cartoon/Cartoon.html?secondaryDistributor=' + this.secondaryDistributor
          },
          page6ClickD () {
            if (!this.$app.isBrowser()) {
               Toast.info('请点击右上角进行分享')
            }
            setupWebViewJavascriptBridge((bridge)=> {
                //导航是否显示分享按钮
                bridge.callHandler(
                    "shareActive",
                    {
                        share_data: '',
                        flag_show: 1,
                        flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                        flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                        flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                        share_url: this.$router.siteUrl() + '/activity/Cartoon/Cartoon.html?secondaryDistributor=' + this.secondaryDistributor, //分享跳转的url
                        share_title: '测测你的老年生活有多嗨！', //分享标题
                        share_text: '测测你的老年生活有多嗨！', //分享描述
                        share_imgurl: this.$router.siteUrl() + this.shareImgUrl //分享图片地址
                    }
                );
            })
          }

        }
    };
</script>

<style lang='scss' scoped>
.cartoon-wrap {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .page {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    display: none;
    &.show {
      display: block;
      animation: fadeIn 1s linear forwards;
    }
    button {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
      &.banner-top {
        width: 690px;
        height: 288px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .page0 {
    display: block;
    z-index: 100;
    background-color: #fff;
    text-align: center;
    // background-color: #F7DF20;
    .loading {
      margin-top: 50%;

      .progress {
        width: 606px;
        height: 43px;
        margin: 0 auto;
        position: relative;
        .percent {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 1%;
          background-color: #F7DF20;
          height: 53%;
          width: 50%;
          border-radius: 30%;
        }
      }
    }
    img {
      margin: 0 auto;
      &.loading1 {
        width: 403px;
        height: 78px;
      }
      &.loading2 {
        width: 606px;
        height: 43px;
      }
      &.loading3 {
        width: 197px;
        height: 60px;
      }
      &.loading4 {
        width: 57px;
        height: 52px;
        margin-left: 85%;
        opacity: 0;
        &.show {
          animation: fadeIn 1s linear forwards;
        }
      }
    }
  }
  .page1 {
    .start {
      position: absolute;
      top: 34%;
      left: 34%;
      width: 312px;
      height: 134px;
    }
  }
  .page2 {
     .buttons {
        position: absolute;
        display: flex;
        top: 32%;
        left: 0;
        width: 100%;
        > div {
           flex: 1;
           height: 270px;
           width: 50%;
        }
     }
  }
  .page3 {
    .button {
        position: absolute;
        width: 100px;
        height: 560px;
        &.button1 {
          top: 30%;
          left: 50px;
        }
        &.button2 {
          top: 39%;
          left: 220px;
          height: 590px
        }
        &.button3 {
          top: 43%;
          left: 430px;
          height: 540px
        }
        &.button4 {
          width: 115px;
          height: 260px;
          top: 49%;
          left: 580px;
        }
    }
     
  }
  .page4 {
    &.show {
      display: block;
      animation: fadeIn 1s linear forwards;
    }
    ul {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      transition: all 1s;
    }
    li {
      width: 100%;
      height: 100%;
      position: relative;
      .arrow-down {
        width: 83px;
        height: 83px;
        position: absolute;
        left: 48%;
        bottom: 5%;
      }
      
    }
    .button {
        position: absolute;
        width: 100%;
        height: 160px;
        top: 300px;
        left: 0;
        &.button1 {
          top: 36%;
        }
        &.button2 {
          top: 58%;
        }
        &.button3 {
          top: 81%;
        }
    }
  }
  .page5 {
    &.show {
      display: block;
      animation: fadeIn 1s linear forwards;
    }
    ul {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      transition: all 1s;
    }
    li {
      position: relative;
      opacity: 1;
      height: 100%;
      .arrow-down {
        width: 83px;
        height: 87px;
        position: absolute;
        left: 48%;
        bottom: 5%;
      }
    }
    .button {
        position: absolute;
        width: 286px;
        height: 112px;
        bottom: 9%;
        left: 50%;
        transform: translateX(-50%);
    }
  }
  .page6 {
    .button {
      position: absolute;
      &.button1 {
        width: 30%;
        height: 6%;
        top: 45%;
        right: 10%;
        &.isBrowser {
          top: 35%;
        }
      }
      &.button2 {
        width: 30%;
        height: 6%;
        bottom: 13%;
        right: 10%;
      }
      &.sepBtn {
        width: 100%;
        display: flex;
        bottom: 12%;
        height: 7%;
        justify-content: space-between;
        &.isBrowser {
          bottom: 2%;
        }
        .button3 {
          width: 40%;
          height: 100%;
        }
        .button4 {
          width: 40%;
          height: 100%;
        }
      }
    }
  }
  .page {
    ul {
      height: 100%;
      li {
        height: 100%;
        div {
          height: 100%;
        }
      }
    }
  }
  .hidearea {
    position: absolute;
    z-index: -999;
    opacity: 0;
  }
  .musicPlay {
    position: absolute;
    right: 2.4%;
    top: 0.5%;
    width: 90px;
    height: 90px;
    border-radius: 100px;
    background-color: #fff;
    z-index: 9999;
    img.play {
      animation: roll 2s linear infinite;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    70% {
      opacity: .7;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes roll {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
}
</style>
