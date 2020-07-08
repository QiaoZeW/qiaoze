<template>
    <div>
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="picTitle">
            <p class="contTitle">升级礼包</p>
            <p class="contDes">百年福利送不停</p>
        </div>
        <div class="description">
            <h3>权益说明</h3>
            <p class="wenZi parP">用户升级即可领取等级对应的百佳豆礼包</p>
        </div>
        <div class="rule">
            <h3>各等级对应礼包如下：</h3>

            <table>
                <tr class="parK">
                    <th>新手上路</th>
                    <th class="solidWhite">100百佳豆</th>
                </tr>
                <tr class="parT">
                    <td>健康先锋</td>
                    <td class="solidWhite">6000百佳豆</td>
                </tr>
                <tr class="parK">
                    <td>保障达人</td>
                    <td class="solidWhite">8000百佳豆</td>
                </tr>
                <tr class="parT">
                    <td>保险专家</td>
                    <td class="solidWhite">12000百佳豆</td>
                </tr>
                <tr class="parK">
                    <td>一代宗师</td>
                    <td class="solidWhite">22000百佳豆</td>
                </tr>
            </table>

        </div>
        <div class="contBottomS" v-if="floatGift===0">
            <p>去领取</p>
        </div>
        <!--  <div class="contBottom" v-else-if="floatGift===1">
              <p @click="goRealName">实名认证</p>
          </div>-->
        <div class="contBottomS" ref="contBottomQ" v-else-if="floatGift===2">
            <p>升级后解锁</p>
        </div>
        <div class="contBottomS" ref="contBottomS" v-else-if="floatGift===3">
            <p>已领取</p>
        </div>
        <div class="contBottom" v-else-if="floatGift===4">
            <p @click="goReceive">去领取</p>
        </div>
        <md-landscape v-model="showPic">
            <div class="myPic">
                <p class="popupTitle">升级福利</p>
                <p class="popupDescrible">{{currentLevel == '1'? '新手上路':currentLevel == '2'? '健康先锋':currentLevel == '3'?'保障达人':currentLevel == '4'?'保险专家':currentLevel == '5'?'一代宗师':''}}礼包专享</p>
                <p class="beanTitle">你已领取</p>
                <p class="beanDescrible">{{myBean}}豆</p>
                <div class="myKnow">
                    <div class="myKnowList" @click="showPic = false">我知道了</div>
                </div>
            </div>
            <!--<img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">-->
        </md-landscape>

    </div>
</template>

<script>
    import {Landscape, Toast, Button, Dialog} from 'mand-mobile'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import '../../assets/js/bridge'

    export default {
        name: "vipUser",
        components: {
            [Landscape.name]: Landscape,
            [Button.name]: Button,
            Whirl,
            Error
        },
        data() {
            return {
                showError: false,
                showWhirl: false,
                showPic: false,
                myBean: '',
                isReal: '',
                floatGift: 0,  //0-不可领取 1-实名认证 2-升级后解锁 3-已领取 4-去领取
                currentLevel: '',
                myRank:''
            }
        },
        created() {
            document.title = '升级礼包'
            //当前等级，从App获取
            this.currentLevel = this.$router.query('current_level')
            if (this.currentLevel === '') {
                this.showError = true
            }

            this.loadDetail()

        },
        methods: {
            goReceive() {

                let _this = this
                _this.showWhirl = true
                this.$app.getToken(function (userToken) {
                    console.log(userToken);
                    _this.$request({
                        //url: `/vip/grade/gift/type/` + 1 + '/rank/'+ _this.currentLevel,
                        url: `/vip/grade/gift/1/${_this.currentLevel}`,
                        isEncript: true,
                        params: { pathQueryLen: 2 },
                        userToken: userToken,
                        successFn: (data) => {
                            _this.myBean = data
                            _this.showWhirl = false
                            _this.showPic = true
                            _this.floatGift = 3; //设置成已领取状态
                        },
                        failFn: (data) => {
                            _this.showWhirl = false
                            Dialog.alert({
                                title: '提示',
                                content: data.resultMsg,
                                cancelText: '取消',
                                confirmText: '确定',
                                onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
                            })
                        }
                    })
                })
            },

            //加载礼包详情
            loadDetail() {
                let _this = this
                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/vip/grade/details`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            /* //判断是否实名
                             if (data.isReal == 0) {
                                 _this.floatGift = 1;
                                 return;
                             }*/
                            _this.myRank = data.rank
                            //判断当前等级是否提示升级后解锁
                            if (_this.currentLevel > data.rank) {
                                _this.floatGift = 2;
                            } else {

                                //判断是否已领取
                                if (data.giftRecordList) {
                                    //判断是否已领取
                                    for (let i in data.giftRecordList) {
                                        let item = data.giftRecordList[i];
                                        //giftType==1代表升级礼包 并且 判断是否是当前等级
                                        if (item.giftType == 1 && item.giftRank == _this.currentLevel) {
                                            //标记已领取
                                            _this.floatGift = 3;
                                            return;
                                        }
                                    }
                                }

                                //判断是否可领取:1、判断是否当前等级
                                if (_this.currentLevel <= data.rank) {
                                    _this.floatGift = 4;
                                }
                            }
                        },
                        failFn: () => {
                             _this.showError = true
                        }
                    })
                })
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
    @import "../../assets/app";

    .picTitle {
        width: 100%;
        height: 3.4rem;
        background: url("../../assets/imgs/vip/vipUser.png") no-repeat left top;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: relative;
        .contTitle {
            position: absolute;
            font-size: 40px;
            color: #D8BB89;
            left: 30px;
            top: 78px;
        }
        .contDes {
            position: absolute;
            font-size: 24px;
            color: #D8BB89;
            left: 30px;
            top: 150px;
        }
    }

    .description {
        padding: 0 35px;
        margin-top: 44px;
    }

    h3 {
        font-size: 32px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
    }

    .parP {
        border-bottom: 1px solid #f2f2f2;
    }

    .wenZi {
        margin-top: 12px;
        padding-left: 0.3rem;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(107, 117, 145, 1);
        line-height: 36px;
        padding-bottom: 40px;
    }

    .rule {
        padding: 0 35px;
        margin-top: 40px;
    }

    .contBottom {
        position: fixed;
        bottom: 0;
        height: 94px;
        width: 100%;
        background: url("../../assets/imgs/vip/goBottom.png") no-repeat left top;
        background-size: 100%;
        text-align: center;
        p {
            font-size: 32px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 94px;
        }
    }

    .contBottomS {
        position: fixed;
        bottom: 0;
        height: 94px;
        width: 100%;
        background: url("../../assets/imgs/vip/Rectangle 2@2x.png") no-repeat left top;
        background-size: 100%;
        text-align: center;
        p {
            font-size: 32px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 94px;
        }
    }

    .myPic {
        height: 718px;
        width: 542px;
        background: url("../../assets/imgs/vip/分组 6@2x.png") no-repeat left top;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: relative;

        .popupTitle {
            font-size: 52px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 54px;
            text-align: center;
            padding-top: 100px;
        }
        .popupDescrible {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
        }
        .beanTitle {
            font-size: 36px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.2rem;
            text-align: center;
            padding-top: 1.4rem;
        }
        .beanDescrible {
            font-size: 44px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 60px;
            text-align: center;
        }
        .myKnow {
            display: flex;
            justify-content: center;
            .myKnowList {
                width: 360px;
                height: 88px;
                background: #fff;
                margin-top: 1.1rem;
                font-size: 32px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(198, 153, 76, 1);
                text-align: center;
                line-height: 88px;
                -webkit-border-radius: 50px;
                -moz-border-radius: 50px;
                border-radius: 50px;
            }

        }
    }

    .md-example-child-landscape {
        .md-button {
            margin-bottom: 20px;
        }
    }

    .md-landscape-content {
        padding: 30px;
        font-size: 30px;
        line-height: 1.5;
        color: #666;
        p {
            margin-bottom: 30px;
        }
    }

    table {
        margin-top: 0.4rem;
    }

    table tr {
        text-align: left;
        font-size: 26px;
        th {
            text-align: left;
            padding-left: .3rem;
            padding-top: .2rem;
            padding-bottom: .2rem;
            color: #6B7591;
            font-weight: 500;
        }
        td {
            padding-left: .3rem;
            padding-top: .2rem;
            padding-bottom: .2rem;
            color: #6B7591;
        }
    }

    .parK {
        background: #F9f9f9;
    }

    .parT {
        background: #F3f3f3;
    }

    .solidWhite {
        border-left: 1px solid #fff;
    }
</style>
