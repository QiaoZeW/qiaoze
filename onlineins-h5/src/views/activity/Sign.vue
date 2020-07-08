<template>
    <div class="container">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="sign-mod">
            <img src="../../assets/imgs/sign/signBg.png" alt="">
            <div class="sign-con">
                <div class="sign-mod-day">
                    <ul>
                        <li :class="continuitySignCount >= 1 ? 'on' : ''">
                            <div class="day">第 1 天</div>
                            <div class="dou"><b>1</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 2 ? 'on' : ''">
                            <div class="day">第 2 天</div>
                            <div class="dou"><b>3</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 3 ? 'on' : ''">
                            <div class="day">第 3 天</div>
                            <div class="dou"><b>3</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 4 ? 'on' : ''">
                            <div class="day">第 4 天</div>
                            <div class="dou"><b>5</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 5 ? 'on' : ''">
                            <div class="day">第 5 天</div>
                            <div class="dou"><b>5</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 6 ? 'on' : ''">
                            <div class="day">第 6 天</div>
                            <div class="dou"><b>5</b>豆</div>
                        </li>
                        <li :class="continuitySignCount >= 7 ? 'on' : ''">
                            <div class="day">第 7 天</div>
                            <div class="dou"><b>10</b>豆</div>
                        </li>
                    </ul>
                </div>
                <div class="sign-up">
                    {{ dayName }}签到获得{{ todaySignCount }}百佳豆

                </div>
                <div class="sign-btn" v-if="todayIsSign">
                    <img src="../../assets/imgs/sign/signBtn-on.png" alt="">
                </div>
                <div class="sign-btn" v-else @click="signing()">
                    <img src="../../assets/imgs/sign/signBtn.png" alt="">
                </div>
                <div class="sign-count">已连续签到{{ continuitySignCount }}天</div>
            </div>
        </div>
        <div class="sign-desc">
            <h2>签到规则说明</h2>
            <p>1、同一用户每日仅限参与一次，不可重复参加；</p>
            <p>2、连续签到以7个自然日为一个周期，获取百佳豆规 则如下：<br> *连续签到的天数 一 二 三 四 五 六 七 <br>*所获得对应百佳豆 1 3 3 5 5 5 10 </p>
            <p>3、签到成功所获得百加豆即可进入用户百佳豆账户；</p>
            <div class="br"></div>
            <h2>声明</h2>
            <p>
                活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实时网络攻击等）参与本次活动的用户，百年人寿有权终止其参与活动并回收所有奖品；如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，百年人寿可暂停、中止或终止活动。</p>
        </div>
    </div>
</template>
<script>
    import {
        Toast,
        Dialog
    } from 'mand-mobile'
    import Vue from 'vue'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'

    export default {
        components: {
            [Dialog.name]: Dialog,
            Error,
            Whirl
        },
        data() {
            return {
                click_flag: true, //是否签到
                index: 0,
                continuitySignCount: 0,
                todaySignCount: 0,
                showWhirl: false,
                showError: false,
                todayIsSign: false,
                dayName: '今天'
            };
        },
        created() {
            document.title = '每日签到'
            this.selSignCount()
			this.loadShenceData()    //进入签到页面执行神策埋点
        },
        computed: {},
        methods: {
            caleSignCount (count){
                console.log(count)
                if (count === 1 || count === 2) {
                    this.todaySignCount = 3;
                } else if (count === 3 || count === 4 || count === 5) {
                    this.todaySignCount = 5;
                } else if (count === 6) {
                    this.todaySignCount = 10;
                } else if (count === 0 || count === 7) {
                    this.todaySignCount = 1;
                }
            },
            selSignCount (){
                let that = this;
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/sign/getDays`,
                        method: 'GET',
                        data: {},
                        userToken: userToken,
                        successFn: (data) => {
                            console.log(data);
                            that.continuitySignCount = data.count
                            that.todayIsSign = data.isSign == 1 ? true : false
                            that.dayName = data.isSign == 1 ? '明天' : '今天'
                            that.caleSignCount(data.count);
                        },
                        failFn: (data) => {
                            Dialog.alert({
                                title: '提示',
                                content: data.resultMsg,
                                cancelText: '取消',
                                confirmText: '确定',
                                onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
                            })
                        }
                    })
                });
            },
			loadShenceData(){
				sensors.track("click_event_signin", {});
			},
			clickShenceData(data){
				let continuous_signin_flag = false;
				if(data >= 2){
					continuous_signin_flag = true;     //连续签到天数大于等于2天，判断为"是"连续签到
				}
				sensors.track("click_event_signin_button", {
					continuous_signin_yn:continuous_signin_flag,
					continous_day:data
				});
			},
            signing (){
                if (!this.click_flag) return;
                let that = this;
                this.$app.getToken(function (userToken) {
                    Toast.loading('请稍后')
                    that.click_flag = false; // 签到结束前，不允许再次触发
                    that.$request({
                        url: `/vip/sign/getIntegral`,
                        method: 'GET',
                        data: {},
                        isEncript: true,
                        userToken: userToken,
                        successFn: (data) => {
                            console.log(data);
                            that.continuitySignCount = data
                            that.todayIsSign = true
                            that.dayName = '明天'
                            let dou = 0;
                            if (data === 1) {
                                dou = 1;
                            } else if (data >= 2 && data <= 3) {
                                dou = 3;
                            } else if (data >= 4 && data <= 6) {
                                dou = 5;
                            } else if (data === 7) {
                                dou = 10;
                            }
                            Toast.info('你已签到获取' + dou + '百佳豆')
                            that.caleSignCount(data)

                            that.click_flag = true
							that.clickShenceData(data)
                        },
                        failFn: (data) => {
                            Toast.hide();
                            Dialog.alert({
                                title: '提示',
                                content: data.resultMsg,
                                cancelText: '取消',
                                confirmText: '确定',
                                onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
                            })
                            that.click_flag = true
                        }
                    })
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-dialog-btn:last-child {
        color: #2f86f6 !important;
    }

    .container {
        width: 100%
    }

    .sign-mod {
        width: 100%;
        position: relative
    }

    .sign-con {
        position: relative;
        z-index: 100;
    }

    .sign-mod > img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0
    }

    .sign-mod-day {
        padding-top: 50px;
        width: 100%
    }

    .sign-mod-day ul {
        display: -webkit-box;
        padding: 15px;
    }

    .sign-mod-day li {
        opacity: .7;
        flex: 1;
        -webkit-box-flex: 1;
        background: url(../../assets/imgs/sign/signDay.png) no-repeat;
        background-size: cover;
        margin: 0 10px;
        width: 84px;
        height: 116px;
        position: relative;
        text-align: center;
    }

    .sign-mod-day li.on {
        opacity: 1;
        background: url(../../assets/imgs/sign/signDay-on.png) no-repeat;
        background-size: cover;
    }

    .sign-mod-day li .day {
        color: #fff;
        font-size: 18px;
        margin-top: 20px;
        font-weight: 400
    }

    .sign-mod-day li .dou {
        color: #FF8013;
        font-size: 18px;
        margin-top: 33px;
    }

    .sign-mod-day li .dou b {
        font-size: 32px !important;
    }

    .sign-up {
        color: #fff;
        width: 100%;
        margin: 45px 0;
        text-align: center;
        font-size: 28px;
    }

    .sign-btn {
        margin: 85px 0;
        width: 100%;
        text-align: center;
        line-height: 280px;
        position: relative
    }

    .sign-btn img {
        width: 280px;
        height: 280px;
        margin: 0 auto;
    }

    .sign-count {
        width: 208px;
        height: 48px;
        line-height: 50px;
        margin: 0 auto;
        border-radius: 10px;
        background: rgba(63, 130, 230, .4);
        font-size: 22px;
        color: #fff;
        text-align: center
    }

    .sign-desc {
        padding: 30px;
        margin-top: 140px;
        margin-bottom: 50px;
    }

    .sign-desc h2 {
        font-size: 28px;
        color: #333;
        text-align: left;
        margin: 30px 0;
    }

    .sign-desc p {
        color: #8E8E8E;
        font-size: 28px;
        text-align: left;
        line-height: 40px;
        margin-top: 10px;
    }

    .sign-desc .br {
        border-top: 1px solid #e8e8e8;
        margin: 45px 0;
    }

</style>
