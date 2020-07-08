  <template>
    <div class="container">
        <div class="wheel-main">
            <div class="prize" @click="goAwardList">我的奖品</div>
            <LogoComp :cityDrawNumArr="cityDrawNumArr" @chageStepCityCode="chageStepCityCode" />
            <div class="wheel-bg" ref="luckMod">
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery0">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[0].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[0].rewardName }}</span>
                        </li>
                        <li class="lottery-unit lottery1">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[1].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[1].rewardName }}</span>
                        </li>
                        <li class="lottery-unit lottery2">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[2].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[2].rewardName }}</span>
                        </li>
                    </ul>
                </div>
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery7">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[7].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[7].rewardName }}</span>
                        </li>
                        <li @click="rotate_handle">
                            <div class="bg1" style="background: #EA7E5C"></div>
                            <div class="bg2" style="background: #FFBDA9"></div>
                            <div class="bg3"
                                 style="background: #FC4941;box-shadow:inset 0px 0px 5px 1px #E43C34;"></div>
                            <b class="start">立即<br>抽奖</b>
                            <span style="color:#FFF6F5;">{{drawNum}}次抽奖机会</span>
                        </li>
                        <li class="lottery-unit lottery3">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[3].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[3].rewardName }}</span>
                        </li>
                    </ul>
                </div>
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery6">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[6].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[6].rewardName }}</span>
                        </li>
                        <li class="lottery-unit lottery5">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[5].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[5].rewardName }}</span>
                        </li>
                        <li class="lottery-unit lottery4">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <div class="imglogo">
                              <img :src="RewardsInfo[4].rewardLogoUrl" alt="">
                            </div>
                            <span>{{ RewardsInfo[4].rewardName }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="wheel-desc">
            <!--<span>中奖纪录</span><b>|</b>-->
            <span @click="open_descBox">抽奖规则</span>
        </div>
        <div class="wheel-list">
            <h2>- 中奖名单 -</h2>
            <div class="box">
                <ul id="con1" ref="con1" :class="{anim:animate==true}">
                    <li v-for='item in items'>
                        尾号<span>{{item.mobile}}</span>客户通过“{{item.drawName}}”获得<span>{{item.rewardName}}</span></li>
                </ul>
            </div>
        </div>
        <div class="win-main" v-if="isWinBoxShow">
            <div class="win-box-mask"></div>
            <div class="win-box">
                <md-icon class="close" name="clear" size="lg" @click="isWinBoxShow=false" />
                <div class="win-img">
                  <img :src="winBoxImg" alt="">
                </div>
                <div class="desc">恭喜你抽中 {{winBoxDesc}}</div>
                <div class="btns">
                  <button class="btn red" @click="rotate_handle">继续抽奖</button>
                  <button class="btn yellow" @click="goAwardDetail">查看奖品</button>
                </div>
            </div>
        </div>

        <md-landscape v-model="isDescBoxShow">
            <!--  // <div class="desc-box-mask"></div>-->
            <div class="desc-box">
                <div class="desc">
                    <b>抽奖规则说明</b>
                    1.用户每次抽奖使用9个百佳豆。 <br>
                    2.每个用户每天抽奖次数不限。 <br>
                    3.用户所抽中的百佳豆实时到账,用户可前往发现页百佳豆账户查看。 <br>
                    4.最终解释权归百年人寿所有。
                </div>
                <!-- <div class="close" @click="close_descBox"></div>-->
            </div>

        </md-landscape>
    </div>
</template>
<script>
    import { Dialog } from 'mand-mobile'
    import LogoComp from "@/views/activity/step/comp/LogoComp";
    export default {
        components: {
            LogoComp
        },
        data() {
            return {
                winBoxImg: '',
                winBoxDesc: '',
                animate: false,
                items: [],
                isWinBoxShow: false,
                winCount: '',
                isDescBoxShow: false,
                easejoy_bean: 0, //金豆
                lottery_ticket: 0, //抽奖次数
                //0-188百佳豆 1-88百佳豆 2-8百佳豆 3-58百佳豆 4-9百佳豆 5-8百佳豆 6-18百佳豆 7-9百佳豆
                prize_list: [
                    {
                        count: 188, // 奖品数量
                        name: "百佳豆", // 奖品名称
                        isPrize: 1 // 该奖项是否为奖品
                    },
                    {
                        count: 88,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 8,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 58,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 9,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 8,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 18,
                        name: "百佳豆",
                        isPrize: 1
                    },
                    {
                        count: 9,
                        name: "百佳豆",
                        isPrize: 1
                    }
                ],
                hasPrize: false, //是否中奖
                click_flag: true, //是否可以旋转抽奖
                index: 0,    //当前转动到哪个位置，起点位置
                count: 8,     //总共有多少个位置
                timer: 0,     //setTimeout的ID，用clearTimeout清除
                timerid: 0,
                speed: 20,    //初始转动速度
                times: 0,     //转动次数
                cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1,    //中奖位置,
                stepCityCode: '1', // step_city_code 北京-江苏--1  江苏-上海--2  上海-浙江--3  浙江-广东--4  广东-四川--5  四川-陕西--6  陕西-西藏--7 西藏-新疆--8 新疆-内蒙--9 内蒙-辽宁--10
                RewardsInfo: '',
                drawNum: 0,
                deviceNo: '',
                cityDrawNumArr: []
            }
        },
        created() {
            document.title = '大转盘抽奖'
            this.$app.getDeviceNo((deviceNo) => {
                this.deviceNo = deviceNo
            })
            this.init()
        },

        computed: {},
        methods: {
            init () {
              this.RewardsInfo = this.initInfoArr() //初始化数组
              this.getCityDrawNum() // 用户每个城市的抽奖机会次数
              // this.getActStepTwoDrawGroupReward() // 奖品数量列表

              this.getCityRewardsInfo() // 城市大转盘奖品信息
              // this.getActStepTwoHomeInfo() // 获取用户可用抽奖次数
              this.loadWinList() // 最新十次抽奖名单
              // this.loadShenceData()   //进入页面执行神策埋点
            },
            getActStepTwoHomeInfo () {
               // 获取用户抽奖次数
               this.$app.getToken((userToken) => {
                   this.$request({
                       url: `/act/stepTwo/getActStepTwoHomeInfo/${this.deviceNo || '9511040880084aefb4dd1377cf1159ea'}`,
                       userToken: userToken,
                       successFn: (data) => {
                          this.drawNum = data.drawNum || 0
                       },
                       failFn: (data) => {
                       }
                   })
               })
            },
            initInfoArr () {
                return Array(9).fill('').map(item => ({rewardLogoUrl:'',rewardName:'',stepRewardCode:''}))
            },
            getCityDrawNum () {
              // 用户每个城市的抽奖机会次数
              this.$app.getToken((userToken) => {
                  this.$request({
                      url: `/act/stepTwo/getCityDrawNum`,
                      userToken: userToken,
                      successFn: (data) => {
                         // this.drawNum = data.drawNum || 0
                         this.cityDrawNumArr = data
                         // drawNum
                         const city = this.cityDrawNumArr.find(item => item.stepCityCode == this.stepCityCode)
                         this.drawNum = city ? city.drawNum : 0
                      },
                      failFn: (data) => {
                      }
                  })
              })
            },
            getActStepTwoDrawGroupReward () {
              // 奖品数量列表
              this.$app.getToken((userToken) => {
                  this.$request({
                      url: `/act/stepTwo/getActStepTwoDrawGroupReward`,
                      userToken: userToken,
                      successFn: (data) => {
                         // this.drawNum = data.drawNum || 0
                      },
                      failFn: (data) => {
                      }
                  })
              })
            },
            chageStepCityCode (v) {
              this.stepCityCode = v;
              this.init()
            },
            goAwardList () {
              location.href = '/activity/step/AwardList.html'
            },
            getCityRewardsInfo () {
               // 城市大转盘奖品信息
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/stepTwo/getCityRewardsInfo/${this.stepCityCode}`,
                        method: 'GET',
                        userToken: userToken,
                        successFn: (data) => {
                            if (data && data.length > 7) {
                              this.RewardsInfo = data
                            } else {
                              this.RewardsInfo = this.initInfoArr()
                              Dialog.alert({
                                content: '该城市未配置奖品信息'
                              })
                            }
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            loadShenceData() {  //神策埋点
                sensors.track("click_lottery_event", {});
            },
            clickShenceData() {	//神策埋点
                sensors.track("click_lottery_button", {});
            },
            resultShenceData(score) {
                var evluationScore = score+'';
                sensors.track("lottery_event_result", {
                    evaluation_score:evluationScore
                });
            },
            loadWinList() {
                this.$app.getToken((userToken) => {
                    this.$request({
                      // /api/act/stepTwo/getActStepTwoDrawUsers/{stepCityCode}
                        url: `/act/stepTwo/getActStepTwoDrawUsers/${this.stepCityCode}`,
                        method: 'GET',
                        contentType: 'application/json;charset=UTF-8',
                        userToken: userToken,
                        successFn: (data) => {
                            this.items = data
                            clearInterval(this.timerid)
                            if (data && data.length > 3) {
                               this.timerid = setInterval(this.scroll, 3000)
                            }
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            roll() {
                let index = this.index;
                let count = this.count;

                let _lottery_list = this.$refs.luckMod.getElementsByClassName("lottery-unit")
                for (let i = 0; i < _lottery_list.length; i++) {
                    _lottery_list[i].className = _lottery_list[i].className.replace("active", "")
                }
                index += 1
                if (index > count - 1) {
                    index = 0
                }
                this.$refs.luckMod.getElementsByClassName("lottery" + index)[0].className = "lottery-unit active lottery" + index
                this.index = index
                return false
            },
            rolling() {
                this.times += 1
                this.roll()

                if (this.times > this.cycle + 10 && this.prize === this.index) {
                    clearTimeout(this.timer)
                    this.prize = -1
                    this.times = 0
                    let _this = this
                    setTimeout(function () {
                        _this.isWinBoxShow = true
                    }, 600)
                    this.getActStepTwoHomeInfo()
                    this.click_flag = true
                } else {

                    if (this.times < this.cycle) {
                        this.speed -= 10
                    } else if (this.times == this.cycle) {
                      // var index = Math.random() * (this.count) | 0 //静态演示，随机产生一个奖品序号，实际需请求接口产生
                      // this.prize = index;
                    } else {
                        if (this.times > this.cycle + 10 && ((this.prize == 0 && this.index == 7) || this.prize == this.index + 1)) {
                            this.speed += 110
                        } else {
                            this.speed += 20
                        }
                    }
                    if (this.speed < 40) {
                        this.speed = 40
                    }
                    let _this = this
                    this.timer = setTimeout(_this.rolling, _this.speed) //循环调用
                }
                return false
            },
            goAwardDetail () {
               this.isWinBoxShow = false
               location.href = `/activity/step/AwardDetail.html`
            },
            rotate_handle() {
                this.isWinBoxShow = false

                if (!this.click_flag) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false
                }

                if (this.drawNum==0) {
                  Dialog.alert({
                      content: '您没有抽奖机会了',
                  })
                  return false
                }
                this.drawNum--
                this.click_flag = false
                //先获取用户token
                this.speed = 100
                this.clickShenceData()    //点击抽奖按钮执行神策埋点
                let that = this
                this.$app.getToken((userToken) => {
                    this.$request({
                       // /api/act/stepTwo/saveActStepTwoDraw/{stepCityCode}
                        url: `/act/stepTwo/saveActStepTwoDraw/${this.stepCityCode}`,
                        method: 'GET',
                        userToken: userToken,
                        successFn: (data) => {
                            //0-188百佳豆 1-88百佳豆 2-8百佳豆 3-58百佳豆 4-9百佳豆 5-8百佳豆 6-18百佳豆 7-9百佳豆
                            this.prize = this.RewardsInfo.findIndex(item => {
                              return item.stepRewardCode == data.stepRewardCode
                            })// data
                            this.winBoxImg = this.RewardsInfo[this.prize].rewardLogoUrl
                            this.winBoxDesc = this.RewardsInfo[this.prize].rewardName
                            data.rewardLogoUrl = this.winBoxImg
                            sessionStorage.setItem('stepRewardDatail', JSON.stringify(data))
                            // this.winCount = this.prize_list[data].count
                            // this.resultShenceData(this.winCount)    //显示抽奖结果时触发神策埋点
                            this.rolling() //转圈过程不响应click事件，会将click置为false
                        },
                        failFn: (data) => {
                            console.log(data)
                            if(data.resultCode === 'SYS_ERROR_005'){
                                this.goRealName()
                            }else{
                                Dialog.alert({
                                    title: '提示',
                                    content: data.resultMsg,
                                    cancelText: '取消',
                                    confirmText: '确定'
                                })
                            }
                            this.click_flag = true
                        }
                    })
                })
                return false
            },
            close_winBox() {
                this.isWinBoxShow = false
            },
            open_descBox() {
                this.isDescBoxShow = true
            },
            close_descBox() {
                this.isDescBoxShow = false
            },
            scroll(){
                this.animate = true    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.items.push(this.items[0])  // 将数组的第一个元素添加到数组的
                    this.items.shift()               //删除数组的第一个元素
                    this.animate = false  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                }, 500)
            },
            //去实名认证
            goRealName() {
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('goRealName'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background: #F7655E;
        width: 100%;
        padding:50px 0 60px;
    }

    .win-main {
    }

    .win-box-mask {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(37, 38, 45, .6);
        z-index: 999;
        pointer-events: auto;
        bottom: 0;
        right: 0
    }

    .win-box {
        background: #fff;
        width: 606px;
        box-sizing: border-box;
        text-align: center;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 50%;
        margin-top: -255px;
        z-index: 1000;
        padding: 64px 42px 52px;
        border-radius: 30px;
    }

    .win-box .close {
      color: #DBD9DC;
      position: absolute;
      top: 30px;
      right: 30px;
    }
    .win-box .win-img {
      width: 292px;
      height: 168px;
      margin: 0 auto;
    }

    .win-box .win-img img{
      width: initial;
      max-height: 100%;
      margin: 0 auto;
    }

    .win-box .desc {
        font-size: 34px;
        color: #333333;
        width: 100%;
        text-align: center;
        margin-top: 12px;
    }

    .win-box .btns {
        display: flex;
        justify-content: space-between;
    }
    .win-box .btns .btn {
        width: 240px;
        height: 80px;
        line-height: 80px;
        margin: 0 auto;
        margin-top: 52px;
        background: #F7655E;
        text-align: center;
        font-size: 32px;
        color: #FFFFFF;
        border-radius: 5px;
        color: #fff;
        border-radius: 12px;
    }

    .win-box .btns .btn.red{
       background-color: #F7665E;
    }

    .win-box .btns .btn.yellow{
       background-color: #FFC513;
    }


    .desc-main {
    }

    .desc-box-mask {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(37, 38, 45, .6);
        z-index: 999;
        pointer-events: auto;
        bottom: 0;
        right: 0
    }

    .desc-box {
        background: url("~@/assets/imgs/draw2/descbg.png") no-repeat;
        background-size: cover;
        /* width: 542px;*/
        height: 416px;
        overflow: hidden;
        /*  position: fixed;
          left: 50%;
          margin-left: -271px;*/
        /*  top: 30%;
          z-index: 1000;*/
    }

    .desc-box .desc {
        font-size: 28px;
        color: #8E8E8E;
        line-height: 40px;
        padding: 35px;
        margin-top:25px;
    }

    .desc-box .desc b {
        font-size: 32px;
        color: #333333;
        margin: 20px 0;
        display: block
    }

    .desc-box .close {
        background: url("~@/assets/imgs/draw2/icon-close.png") no-repeat center top;
        background-size: cover;
        width: 72px;
        height: 72px;
        position: relative;
        margin: 0 auto;
        margin-top: 150px;
    }

    .wheel-main {
        background: url("~@/assets/imgs/stepComputed/new/bg.png") no-repeat center top;
        background-size: cover;
        color: #fff;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-content: center;
        transition: transform 3s ease;
        height: 1158px;
        width: 710px;
        margin: 0 auto;
        position: relative;
    }

    .wheel-main .prize {
       position: absolute;
       right: 30px;
       top: 20px;
       text-decoration: underline;
    }

    .wheel-main h2 {
        text-align: center;
        color: #7D403E;
        font-size: 32px;
        position: relative;
        top: 240px;
        font-weight: 400;
    }

    .wheel-bg {
        width: 560px;
        position: absolute;
        /*border: 1px solid blue;*/
        height: 600px;
        top: 490px;
        left: 50%;
        margin-left: -280px;
    }

    .luck-mod {
        width: 100%;
    }

    .luck-mod ul {
        display: -webkit-box;
    }

    .luck-mod ul li {
        flex: 1;
        -webkit-box-flex: 1;
        text-align: center;
        width: 32%;
        height: 184px;
        position: relative;
        margin: 6px;
    }

    .luck-mod ul li .bg1 {
        position: absolute;
        left: 0;
        top: 0;
        background: #F4CBAC;
        z-index: 10;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    .luck-mod ul li .bg2 {
        position: absolute;
        left: 0;
        top: 0;
        background: #FFFFFF;
        z-index: 11;
        width: 100%;
        height: 93%;
        border-radius: 12px;
    }

    .luck-mod ul li .bg3 {
        position: absolute;
        top: 3%;
        background: #FFEFE3;
        z-index: 12;
        width: 94%;
        left: 3%;
        height: 85%;
        border-radius: 12px;
        box-shadow: inset 0px 0px 4px 1px #E0945B;
    }

    .luck-mod ul li .imglogo {
        width: 42%;
        margin-top: 13%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 20;
    }

    .luck-mod ul li .imglogo img {
        max-height: 100%;
        margin: 0 auto;
    }

    .luck-mod ul li span {
        width: 100%;
        text-align: center;
        position: absolute;
        z-index: 20;
        font-size: 26px;
        color: #FC4941;
        display: block;
        left: 0;
        bottom: 35px;
    }

    .luck-mod ul li span b {
        display: inline-block;
        font-weight: normal;
        font-size: 32px;
        margin-right: 2px;
        margin-top: 2px;
    }

    .luck-mod ul li .start {
        font-size: 40px;
        color: #FFF6F5;
        text-align: center;
        width: 100%;
        margin-top: 9%;
        z-index: 100;
        position: relative;
        display: block;
    }

    .luck-mod ul li.active .bg1 {
        background: #E5BE56
    }

    .luck-mod ul li.active .bg2 {
        background: #FCEBBF
    }

    .luck-mod ul li.active .bg3 {
        background: #FED66D;
        box-shadow: inset 0px 0px 4px 1px #C98D0C;
    }

    .wheel-desc {
        text-align: center;
        margin: 30px 0;
    }

    .wheel-desc span {
        display: inline-block;
        color: #FFF2DF;
        font-size: 28px;
    }

    .wheel-desc b {
        display: inline-block;
        margin: 0 15px;
        color: #FFF2DF;
        font-size: 28px;
    }

    .wheel-list {
        width: 80%;
        margin: 0 auto;
        background: #FDE6D9;
        padding: 20px;
        border-radius: 8px;
        margin-top: 30px;
    }

    .wheel-list h2 {
        text-align: center;
        width: 100%;
        color: #F23932;
        font-size: 28px;
    }

    .wheel-list .box {
        background: #FDCAC4;
        padding: 0 20px;
        border-radius: 8px;
        margin-top: 20px;
        max-height: 200px;
        overflow: hidden;
    }

    .anim {
        transition: all 0.5s;
        margin-top: -50px;
    }

    .wheel-list .box li {
        list-style: none;
        line-height: 50px;
        height: 50px;
        color: #983E3B;
        font-size: 26px;
    }

    .wheel-list .box li span {
        color: #FC4941
    }

    .wheel-footer {
        height: 80px;
    }
    .iosExplain{
        font-size: .3rem;
        text-align: center;
        margin-top: .8rem;
        color: #FFF2DF;
        padding-bottom: .5rem;
    }
</style>
