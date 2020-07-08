<template>
    <div class="container">
        <div class="wheel-main">
            <h2>我的百佳豆：{{totalScore}}</h2>
            <div class="wheel-bg" ref="luckMod">
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery0">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou188.png" alt="">
                            <span><b>188</b>百佳豆</span>
                        </li>
                        <li class="lottery-unit lottery1">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou88.png" style="width: 68%" alt="">
                            <span><b>88</b>百佳豆</span>
                        </li>
                        <li class="lottery-unit lottery2">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou8.png" style="width: 36%;margin-top:17%" alt="">
                            <span><b>8</b>百佳豆</span>
                        </li>
                    </ul>
                </div>
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery7">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou9.png" style="width: 50%;margin-top:20%" alt="">
                            <span><b>9</b>百佳豆</span>
                        </li>
                        <li @click="rotate_handle">
                            <div class="bg1" style="background: #EA7E5C"></div>
                            <div class="bg2" style="background: #FFBDA9"></div>
                            <div class="bg3"
                                 style="background: #FC4941;box-shadow:inset 0px 0px 5px 1px #E43C34;"></div>
                            <b class="start">立即<br>抽奖</b>
                            <span style="color:#FFF6F5;">-9百佳豆</span>
                        </li>
                        <li class="lottery-unit lottery3">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou58.png" style="width: 68%" alt="">
                            <span><b>58</b>百佳豆</span>
                        </li>
                    </ul>
                </div>
                <div class="luck-mod">
                    <ul>
                        <li class="lottery-unit lottery6">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou18.png" style="width: 48%" alt="">
                            <span><b>18</b>百佳豆</span>
                        </li>
                        <li class="lottery-unit lottery5">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou8.png" style="width: 36%;margin-top:17%" alt="">
                            <span><b>8</b>百佳豆</span>
                        </li>
                        <li class="lottery-unit lottery4">
                            <div class="bg1"></div>
                            <div class="bg2"></div>
                            <div class="bg3"></div>
                            <img src="../../assets/imgs/draw2/dou9.png" style="width: 50%;margin-top:20%" alt="">
                            <span><b>9</b>百佳豆</span>
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
            <h2>- 今日中奖名单 -</h2>
            <div class="box">
                <ul id="con1" ref="con1" :class="{anim:animate==true}">
                    <li v-for='item in items'>
                        恭喜尾号<span>{{dataDesensitization(item.mobile)}}</span>客户抽中<span>{{item.prize}}豆</span></li>
                </ul>
            </div>
        </div>
        <p class="iosExplain" v-if="isIosShow">该活动及奖励与Apple Inc.无关</p>
        <div class="wheel-footer" v-if="!isIosShow"></div>
        <div class="win-main" v-if="isWinBoxShow">
            <div class="win-box-mask"></div>
            <div class="win-box">
                <div class="desc">恭喜你抽中 {{winCount}} 百佳豆</div>
                <div class="btn" @click="close_winBox">确定</div>
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
    export default {
        components: {
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                animate: false,
                items: [],
                isWinBoxShow: false,
                winCount: '',
                isDescBoxShow: false,
                easejoy_bean: 0, //金豆
                lottery_ticket: 0, //抽奖次数
                totalScore: 0,
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
                speed: 20,    //初始转动速度
                times: 0,     //转动次数
                cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1,    //中奖位置,
                isIosShow:false
            }
        },
        created() {
            document.title = '大转盘抽奖'
            this.isIos()
            setInterval(this.scroll, 3000)
            this.loadWinList()
            this.loadTotalScore()
            this.loadShenceData()   //进入页面执行神策埋点
        },

        computed: {},
        methods: {
            loadShenceData() {   	//神策埋点
                sensors.track("click_lottery_event", {});
            },
            clickShenceData() {		//神策埋点
                sensors.track("click_lottery_button", {});
            },
            resultShenceData(score) {
                var evluationScore = score+'';
                sensors.track("lottery_event_result", {
                    evaluation_score:evluationScore
                });
            },
            isIos(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    this.isIosShow = false
                }
                if(isiOS){
                    this.isIosShow = true
                }
            },
            loadWinList() {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/turntable/record/50`,
                        method: 'GET',
                        contentType: 'application/json;charset=UTF-8',
                        data: {},
                        userToken: userToken,
                        successFn: (data) => {
                            that.items = data
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            loadTotalScore() {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/grade/discover`,
                        method: 'GET',
                        contentType: 'application/json;charset=UTF-8',
                        data: {},
                        userToken: userToken,
                        successFn: (data) => {
                            that.totalScore = data.totalScore
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
                    this.loadTotalScore()
                    this.click_flag = true
                } else {

                    if (this.times < this.cycle) {
                        this.speed -= 10
                    } else if (this.times == this.cycle) {
//                        var index = Math.random() * (this.count) | 0 //静态演示，随机产生一个奖品序号，实际需请求接口产生
//                        this.prize = index;
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
            rotate_handle() {

                if (!this.click_flag) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false
                }

                this.click_flag = false
                //先获取用户token
                this.speed = 100
                this.clickShenceData()    //点击抽奖按钮执行神策埋点
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/turntable/play`,
                        method: 'GET',
                        contentType: 'application/json;charset=UTF-8',
                        data: {},
                        userToken: userToken,
                        successFn: (data) => {
                            //0-188百佳豆 1-88百佳豆 2-8百佳豆 3-58百佳豆 4-9百佳豆 5-8百佳豆 6-18百佳豆 7-9百佳豆
                            that.prize = data
                            that.winCount = that.prize_list[data].count
                            that.resultShenceData(that.winCount)    //显示抽奖结果时触发神策埋点
                            that.rolling() //转圈过程不响应click事件，会将click置为false
                        },
                        failFn: (data) => {
                            console.log(data)
                            if(data.resultCode === 'SYS_ERROR_005'){
                                that.goRealName()
                            }else{
                                Dialog.alert({
                                    title: '提示',
                                    content: data.resultMsg,
                                    cancelText: '取消',
                                    confirmText: '确定'
                                })
                            }
                            that.click_flag = true
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
            dataDesensitization(num) {
                let len = num.length
                if (len && len > 4) {
                    return num.substring(0, 3) + '****' + num.substring(len - 4, len)
                } else {
                    return num
                }
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

<style scoped>
    .container {
        background: #F7655E;
        width: 100%;
        padding-top:50px;
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
        background: url("../../assets/imgs/draw2/winbg.png") no-repeat center top;
        background-size: cover;
        width: 460px;
        height: 510px;
        text-align: center;
        position: fixed;
        left: 50%;
        margin-left: -230px;
        top: 50%;
        margin-top: -255px;
        z-index: 1000;
    }

    .win-box .desc {
        font-size: 30px;
        color: #333333;
        margin-top: 288px;
        width: 100%;
        text-align: center;
    }

    .win-box .btn {
        width: 320px;
        height: 80px;
        line-height: 80px;
        margin: 0 auto;
        margin-top: 70px;
        background: #F7655E;
        text-align: center;
        font-size: 32px;
        color: #FFFFFF;
        border-radius: 5px;
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
        background: url("../../assets/imgs/draw2/descbg.png") no-repeat;
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
        background: url("../../assets/imgs/draw2/icon-close.png") no-repeat center top;
        background-size: cover;
        width: 72px;
        height: 72px;
        position: relative;
        margin: 0 auto;
        margin-top: 150px;
    }

    .wheel-main {
        background: url("../../assets/imgs/draw2/bg.png") no-repeat center top;
        background-size: cover;
        color: #fff;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-content: center;
        transition: transform 3s ease;
        height: 1036px;
        width: 710px;
        margin: 0 auto;
        position: relative;
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
        top: 357px;
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

    .luck-mod ul li img {
        width: 42%;
        margin: 0 auto;
        margin-top: 13%;
        position: relative;
        z-index: 20;
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
