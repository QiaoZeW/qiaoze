<template>
    <section class="invitation-mod">
        <div class="rule-box" @click="open_descBox">规则</div>
        <header class="invitation-header">
            <div class="header-box">
                <img class="banner" src="@/assets/imgs/invitaion/appHeader.png" alt>
                <div class="prohibit-list">
                    <div :class="{anim:animate==true}">
                        <h2
                            v-for="(item,key) in items"
                        >用户{{dataDesensitization(item.mobile)}}获得百佳豆{{item.addScore}}豆</h2>
                    </div>
                </div>
            </div>
        </header>
        <img class="process" src="@/assets/imgs/invitaion/appHeader1.png" alt>
        <div class="invitation-main">
            <button class="share-btn" v-if="shareStatus === 1" @click="goLogin">点击分享抽大奖</button>
            <button class="share-btn" v-else-if="shareStatus === 0" @click="onShare('click_share_button')">点击分享抽大奖</button>

            <div class="invitation-list">
                <img src="@/assets/imgs/invitaion/tit1.png" class="tit">
                <div class="box">
                    <img src="@/assets/imgs/invitaion/invitationRecord.png" class="invitationRecord"/>
                    <div class="total">
                        <ul>
                            <li>
                                <b>{{recordCount}}个</b>
                                <span>成功邀请人数</span>
                            </li>
                            <li></li>
                            <li>
                                <b>{{receiveRecordCount}}个</b>
                                <span>已领取红包</span>
                            </li>
                        </ul>
                    </div>
                    <div class="lists">
                        <ul>
                            <li v-for="(item, key) in recordInfo">
                                <div v-if="item.avator" class="img">
                                    <img :src="item.avator" alt>
                                </div>
                                <div v-else class="img">
                                    <img src="@/assets/imgs/evaluation/avaitor.png" alt>
                                </div>
                                <span>{{dataDesensitization(item.inviteMobile)}}</span>
                                <button v-if="item.inviterAcceptFlag==='02'" class="prohibit">点击领取</button>
                                <button
                                    :data-inviteUserCode="item.inviteUserCode"
                                    v-else
                                    @click="open_giftBox($event)"
                                >点击领取
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="fortuneBag">
                <md-icon
                    name="question"
                    size="lg"
                    color="#f5f3d7"
                    class="iconTip"
                    @click="showTip"
                ></md-icon>
                <p class="bagTitle">您有<span>{{recordCount}}</span>个福袋待领取</p>
                <p class="goGet" v-if="userStatus === 3" @click="goReceive">点击领取</p>
                <p class="goGet" v-else-if="userStatus === 1" @click="goLogin">立即登录</p>
                <p class="goGet" v-else-if="userStatus === 2" @click="onShare('click_get_lucky_bag')">点击分享邀好友</p>
            </div>

            <hot-products :changeUrlWidth="true" moduleType="02"/>
        </div>
        <div class="footer">
            *奖励以百佳豆形式发放，活动最终解释权归百年人寿所有
            <br>该活动及奖励与Apple Inc.无关
        </div>
        <md-landscape v-model="isDescBoxShow">
            <div class="desc-box">
                <div class="desc">
                    <b>规则说明</b>
                    1.活动简述
                    <p>
                        -通过活动页面给好友分享百佳豆三重好礼，每有一位好友成功领取第一重好礼，您将同步获得一次抽奖机会，次数无上限；
                        <br>
                    </p>
                    2.奖励说明
                    <p>-奖励将以百佳豆（百年人寿APP积分）形式进行发放，您可在百年人寿APP发现频道左上角百佳豆明细中进行查看；</p>
                    <p>-百佳豆可在百年人寿APP发现频道会员尊享版块中兑换各类商品及服务；</p>
                    3.活动规则最终解释权归百年人寿所有。
                </div>
            </div>
        </md-landscape>

        <md-landscape class="gift-box" v-model="isGiftShow">
            <div class="box">
                <img class="tit" src="@/assets/imgs/invitaion/gift-tit.png" alt>
                <div class="gift-lists">
                    <ul ref="giftLists">
                        <li class="flip-container" @click="drawScore(1)">
                            <div class="flipper">
                                <div class="front">
                                    <img src="@/assets/imgs/invitaion/default-gift.png" alt>
                                </div>
                                <div class="back">
                                    <p class="backCon">
                                        <b>100</b>
                                        <span>百佳豆</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="flip-container" @click="drawScore(2)">
                            <div class="flipper">
                                <div class="front">
                                    <img src="@/assets/imgs/invitaion/default-gift.png" alt>
                                </div>
                                <div class="back">
                                    <p class="backCon">
                                        恭喜你获得
                                        <b>100</b>百佳豆
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="flip-container" @click="drawScore(3)">
                            <div class="flipper">
                                <div class="front">
                                    <img src="@/assets/imgs/invitaion/default-gift.png" alt>
                                </div>
                                <div class="back">
                                    <p class="backCon">
                                        <b>100</b>
                                        <span>百佳豆</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="gift-desc">{{winDesc}}</div>
                <div class="gift-btn">
                    <button @click="close_giftBox">知道了</button>
                </div>
            </div>
        </md-landscape>
        <md-dialog
            :closable="false"
            v-model="questionDialog.open"
            :btns="questionDialog.btns"
        >
            <p>您成功邀请的好友，如在2019年7月31日前完成保障升级，您将获得惊喜福袋，抽取最高100万百佳豆，100%中奖。</p>

            <p class="parQ">
                活动截止时间： <br/>
                2019年7月31日（含31日）
            </p>
        </md-dialog>
    </section>
</template>

<script>
    import {Dialog, Toast} from "mand-mobile";
    import HotProducts from '@/components/HotProducts'

    export default {
        components: {
            [Dialog.name]: Dialog,
            HotProducts
        },
        data() {
            return {
                shareImg: require("@/assets/imgs/invitaion/wxshare1.png"),
                smileSrc: require("@/assets/imgs/invitaion/smile.png"),
                userStatus: 0, // 1--未登录  2--已登录点击分享邀好友  3--点击领取福袋
                isDescBoxShow: false,
                isGiftShow: false,
                click_flag: true,
                recordInfo: [],
                recordCount: 0,
                receiveRecordCount: 0,
                animate: false,
                curInviteusercode: "",
                winDesc: "最高可得60000百佳豆",
                items: [],
                commodityList: [],
                questionDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确定'
                        }
                    ],
                },
                shareStatus: 1  // 0 -- 已登录  1--未登录
            };
        },
        created() {
            document.title = "邀请有奖";
			this.loadShenceData();
            this.selRecordInfo();
            setInterval(this.scroll, 3000);
            this.loadWinList();
            setupWebViewJavascriptBridge(function (bridge) {
                //导航是否显示分享按钮，分享内容先固定死
                bridge.callHandler(
                    "currentPageForbid",
                    {
                        flag_back: 0 //是否返回按钮，1-返回 0-不返回
                    },
                    function (response) {
                    }
                );
            });
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler(
                    "backHomeConfig",
                    {
                        flag_back: 1 //是否返回按钮，1-返回 0-不返回
                    },
                    function (response) {
                    }
                );
            });
        },
        updated() {
            let that = this
            this.$app.getCurrentToken(function (userToken) {
                if (userToken && userToken !== '') {
                    that.shareStatus = 0
                    if (that.recordCount === 0) {
                        that.userStatus = 2
                    } else {
                        that.userStatus = 3
                    }
                } else {
                    that.shareStatus = 1
                    that.userStatus = 1
                }
            })
        },
        computed: {},
        methods: {
			loadShenceData() {                        //进入页面触发神策埋点
				sensors.track("click_invite_friends_event", {});
			},
            goReceive() {
                window.location.href = this.$router.siteUrl() + '/activity/FortuneBag.html'
            },
            goLogin() {
                this.$app.getToken()
            },
            showTip() {
                this.questionDialog.open = true
            },
            scroll() {
                this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(() => {
                    //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.items.push(this.items[0]); // 将数组的第一个元素添加到数组的
                    this.items.shift(); //删除数组的第一个元素
                    this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                }, 500);
            },
            open_descBox() {
                this.isDescBoxShow = true;
            },
            close_descBox() {
                this.isDescBoxShow = false;
            },
            open_giftBox(e) {
                console.log(e.target.dataset.inviteusercode);
                this.curInviteusercode = e.target.dataset.inviteusercode;
                this.isGiftShow = true;
                this.click_flag = true;
                this.winDesc = "最高可得60000百佳豆";
                this.$refs.giftLists.getElementsByTagName("li")[0].className =
                    "flip-container";
                this.$refs.giftLists.getElementsByTagName("li")[1].className =
                    "flip-container";
                this.$refs.giftLists.getElementsByTagName("li")[2].className =
                    "flip-container";
                this.$refs.giftLists
                    .getElementsByTagName("li")[0]
                    .getElementsByClassName("backCon")[0].className = "backCon";
                this.$refs.giftLists
                    .getElementsByTagName("li")[1]
                    .getElementsByClassName("backCon")[0].className = "backCon";
                this.$refs.giftLists
                    .getElementsByTagName("li")[2]
                    .getElementsByClassName("backCon")[0].className = "backCon";
            },
            close_giftBox() {
                this.isGiftShow = false;
            },
            onShare(datasource) {
                let _this = this;
                this.$app.getCurrentUserCode(function (userCode) {
                    //设置APP内分享
                    setupWebViewJavascriptBridge(function (bridge) {
                        //导航是否显示分享按钮
                        bridge.callHandler(
                            "shareActive",
                            {
								share_data: datasource,
                                flag_show: 1,
                                flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                                title: "邀请有奖", //标题
                                flag_share: 0, //是否显示分享按钮，1-显示 0-不显示
                                flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                                share_url:
                                    _this.$router.siteUrl() +
                                    "/activity/InvitationShare.html?inviterCode=" +
                                    userCode, //分享跳转的url
                                share_title: "百年人寿官方app上线", //分享标题
                                share_text: "免费领价值百元礼包", //分享描述
                                share_imgurl: _this.$router.siteUrl() + _this.shareImg //分享图片地址
                            },
                            function (response) {
                                //alert(response,'');
                            }
                        );
                    });
                });
            },
            selRecordInfo() {
                //先获取用户token
                let that = this;
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/vipUserInviteRecord/selRecordInfo`,
                        method: "GET",
                        contentType: "application/json;charset=UTF-8",
                        isLoading: true,
                        userToken: userToken,
                        successFn: data => {
                            that.recordInfo = data;
                            that.recordCount = Number(that.recordInfo.length);
                            let receiveRecordCount = 0;
                            that.recordInfo.forEach(function (item) {
                                if (item.inviterAcceptFlag === "02") {
                                    receiveRecordCount++;
                                }
                            });
                            that.receiveRecordCount = receiveRecordCount;
                            if (userToken && userToken !== '') {
                                if (that.recordCount === 0) {
                                    that.userStatus = 2
                                } else {
                                    that.userStatus = 3
                                }
                            } else {
                                that.userStatus = 1
                            }
                        },
                        failFn: data => {
                            Dialog.alert({
                                title: "提示",
                                content: data.resultMsg,
                                cancelText: "取消",
                                confirmText: "确定"
                            });
                        }
                    });
                });
                return false;
            },
            loadWinList() {
                let that = this;
                this.$app.getCurrentToken(function (userToken) {
                    that.$request({
                        url: `/vip/vipUserInviteRecord/getAcceptRecord?size=50`,
                        method: "GET",
                        contentType: "application/json;charset=UTF-8",
                        data: {},
                        userToken: userToken,
                        successFn: data => {
                            console.log(data);
                            that.items = data;
                        },
                        failFn: data => {
                        }
                    });
                });
            },
            drawScore(index) {
                if (!this.click_flag) {
                    return false;
                }
                this.click_flag = false;
                //先获取用户token
                let that = this;
                let tempBox = [1, 2, 3];
                let tempWin = [100, 60000, 8];
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url:
                            `/vip/vipUserInviteRecord/inviterAddScore?inviteUserCode=` +
                            that.curInviteusercode,
                        method: "GET",
                        contentType: "application/json;charset=UTF-8",
                        userToken: userToken,
                        isLoading: true,
                        successFn: data => {
                            console.log("data----", data);
                            console.log("index----", index);

                            //首先去掉一个中奖的牌
                            tempBox.splice(
                                tempBox.findIndex(v => {
                                    return v === index;
                                }),
                                1
                            );
                            //然后去掉一个中奖的积分项
                            tempWin.splice(
                                tempWin.findIndex(v => {
                                    return v === data;
                                }),
                                1
                            );

                            console.log(tempBox);
                            console.log(tempWin);

                            that.curInviteusercode = "";
                           if(data !== 0){
                           setTimeout(function () {
                                that.$refs.giftLists.getElementsByTagName("li")[
                                index - 1
                                    ].className = "flip-container hover";
                                let con = "恭喜你获得<b>" + data + "</b>百佳豆";
                                that.winDesc =
                                    "恭喜您，获得" + data + "百佳豆，请在百佳豆明细查看";
                                that.$refs.giftLists
                                    .getElementsByTagName("li")
                                    [index - 1].getElementsByClassName("backCon")[0].className =
                                    "backCon on";
                                that.$refs.giftLists
                                    .getElementsByTagName("li")
                                    [index - 1].getElementsByClassName(
                                    "backCon"
                                )[0].innerHTML = con;
                            }, 300);
                            }else{
                              that.$refs.giftLists.getElementsByTagName("li")[
                            index - 1
                                ].className = "flip-container hover";
                            let con = "哎呀！差点就中奖了";
                            that.$refs.giftLists
                                .getElementsByTagName("li")
                                [index - 1].getElementsByClassName("backCon")[0].className =
                                "backCon on";
                            that.$refs.giftLists
                                .getElementsByTagName("li")
                                [index - 1].getElementsByClassName(
                                "backCon"
                            )[0].innerHTML = con;

                            let div = document.createElement("span");
                            div.className = "particular"
                            div.innerHTML = con
                            that.$refs.giftLists
                                .getElementsByTagName("li")
                                [index - 1].getElementsByClassName("backCon")[0].innerHTML = "<img id='smile' style='height:1rem !important;margin: 0 auto;width:1rem'>"
                            document.getElementById('smile').src= that.smileSrc

                            that.$refs.giftLists
                                .getElementsByTagName("li")
                                [index - 1].getElementsByClassName("backCon")[0].appendChild(div)
                            }


                            setTimeout(function () {
                                for (let i = 0; i < tempBox.length; i++) {
                                    that.$refs.giftLists.getElementsByTagName("li")[
                                    tempBox[i] - 1
                                        ].className = "flip-container hover";
                                    that.$refs.giftLists
                                        .getElementsByTagName("li")
                                        [tempBox[i] - 1].getElementsByClassName(
                                        "backCon"
                                    )[0].innerHTML = "<b>" + tempWin[i] + "</b>百佳豆";
                                }
                            }, 800);
                            //重置邀请人列表领取状态
                            that.selRecordInfo();
                        },
                        failFn: data => {
                            that.curInviteusercode = "";
                            Toast.failed(data.resultMsg);
                            that.click_flag = true;
                        }
                    });
                });
                return false;
            },
            dataDesensitization(num) {
                let len = num.length;
                if (len && len > 4) {
                    return num.substring(0, 3) + "****" + num.substring(len - 4, len);
                } else {
                    return num;
                }
            }
        }
    };
   </script>

<style lang="scss">
    .gift-box .md-landscape-content {
        width: 9.2rem !important;
    }

    .gift-box .md-popup {
        z-index: 100 !important;
    }

    .invitation-mod {
        background: #592ad3;
        width: 100%;
        position: relative;
    }

    .invitation-header {
        background: url("../../assets/imgs/invitaion/topBg.png") no-repeat center top;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-content: center;
        transition: transform 3s ease;
        height: 7.12rem;
        width: 750px;
        margin: 0 auto;
        position: relative;
    }

    .rule-box {
        background: url("../../assets/imgs/invitaion/ruleBg.png") no-repeat center top;
        background-size: cover;
        width: 103px;
        height: 49px;
        line-height: 49px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        position: fixed;
        right: 0;
        top: 40px;
        z-index: 100;
    }

    .header-box {
        position: absolute;
        top: 50px;
        width: 100%;
        text-align: center;
    }

    .header-box .banner {
        width: 100%;
        height: 422px;
        margin: 0 auto;
    }

    .header-box h2 {
        font-weight: 400;
        margin: 0.3rem 0;
        color: #b5b8fc;
        font-size: 24px;
    }

    .process {
        width: 688px;
        height: 240px;
        margin: 0 auto;
        margin-top: 40px;
    }

    /*.invitation-main {
      margin-top: 30px;
    }*/

    .share-btn {
        background: #f74931;
        display: block;
        width: 688px;
        margin: 0 auto;
        height: 88px;
        line-height: 88px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        color: #fff;
        font-size: 32px;
        text-align: center;
    }

    .invitation-list {
        margin-top: 80px;
    }

    .invitation-list .tit {
        width: 627px;
        height: 34px;
        margin: 40px auto;
    }

    .invitation-list .box {
        position: relative;
        width: 648px;
        max-height: 558px;
        padding: 20px;
        background: #fff;
        border-radius: 6px;
        margin: 0 auto;
        margin-top: 20px;
    }

    .invitation-list .box .total {
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        width: 612px;
        margin: 0 auto;
        padding: 20px;
    }

    .invitation-list .box .total ul {
        display: -webkit-box;
    }

    .invitation-list .box .total ul li {
        flex: 1;
        width: 33.3%;
        -webkit-box-flex: 1;
        text-align: center;
    }

    .invitation-list .box .total ul li b {
        display: block;
        font-size: 52px;
        color: #000;
        line-height: 86px;
    }

    .invitation-list .box .total ul li span {
        font-size: 24px;
        color: #333333;
        line-height: 30px;
    }

    .invitation-list .box .lists {
        max-height: 380px;
        overflow: auto;
    }

    .invitation-list .box .lists li {
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;
        /*text-align: justify;*/
        margin: 40px 0;
    }

    .invitation-list .box .lists li .img {
        border-radius: 50%;
        width: 78px;
        height: 78px;
        display: inline-block;
        overflow: hidden;
    }

    .invitation-list .box .lists li span {
        color: #333;
        font-size: 28px;
        margin-left: 20px;
        margin-right: auto;
    }

    .invitation-list .box .lists li button {
        background: #f74931;
        width: 193px;
        height: 58px;
        line-height: 55px;
        border-radius: 4px;
        color: #fff;
        font-size: 28px;
        text-align: center;
    }

    .invitation-list .box .lists li button.prohibit {
        opacity: 0.4;
    }

    .footer {
        width: 100%;
        padding: 60px 0;
        color: #ffffff;
        font-size: 20px;
        text-align: center;
        line-height: 1.5;
    }

    .desc-box {
        background: #fff;
        background-size: cover;
        /*height: 416px;*/
        overflow: hidden;
        border-radius: 4px;
    }

    .desc-box .desc {
        font-size: 28px;
        color: #8e8e8e;
        line-height: 40px;
        padding: 35px;
        margin-top: 25px;
    }

    .desc-box .desc b {
        font-size: 32px;
        color: #333333;
        margin: 20px 0;
        display: block;
    }

    .desc-box .desc p {
        margin-bottom: 10px;
        line-height: 1.6;
        text-align: left;
    }

    .gift-box {
        width: 690px;
    }

    .gift-box .box {
        width: 690px;
        margin: 0 auto;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
    }

    .gift-box .md-landscape-content {
        width: 690px !important;
    }

    .gift-box .tit {
        width: 353px;
        height: 109px;
        margin: 30px auto;
    }

    .gift-lists ul {
        display: -webkit-box;
        padding: 0 30px;
        height: 280px;
    }

    .gift-lists ul li {
        flex: 1;
        width: 30%;
        -webkit-box-flex: 1;
        text-align: center;
        margin: 0 2%;
        perspective: 1000px;
        -webkit-perspective: 1000px;
        -moz-perspective: 1000px;
        -ms-perspective: 1000px;
        -o-perspective: 1000px;
        perspective: 1000px;
    }

    .gift-lists ul li .flipper {
        transition: transform 0.6s ease-out;
        transition: transform 0.5s ease-in-out;
        -webkit-transition: transform 0.5s ease-in-out;
        -moz-transition: transform 0.5s ease-in-out;
        -ms-transition: transform 0.5s ease-in-out;
        -o-transition: transform 0.5s ease-in-out;
        -webkit-transform-style: preserve-3d; /*使其子类变换后得以保留 3d转换后的位置*/
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        -o-transform-style: preserve-3d;
        transform-style: preserve-3d;
        display: block;
        position: relative;
    }

    .gift-lists li .flipper .front,
    .gift-lists li .flipper .back {
        backface-visibility: hidden;
        transition: 0.6s ease-out;
        -webkit-transition: 0.6s ease-out;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        -o-transform-style: preserve-3d;
        transform-style: preserve-3d;
        position: absolute;
        top: 0;
        left: 0;
    }

    .gift-lists li .flipper .front {
        z-index: 2;
        transform: rotateY(0deg);
        transform: rotateY(0deg);
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
    }

    .gift-lists li .flipper .back {
        z-index: 1;
        transform: rotateY(-180deg);
        transform: rotateY(-180deg);
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        -ms-transform: rotateY(-180deg);
        -o-transform: rotateY(-180deg);
    }

    .gift-lists li.hover .flipper .back {
        transform: rotateY(0deg);
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
        z-index: 2;
    }

    .gift-lists li.hover .flipper .front {
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        z-index: 1;
    }

    .gift-lists li.hover .flipper .back p {
        background: url("../../assets/imgs/invitaion/gift100.png") no-repeat center top;
        background-size: cover;
        width: 197px;
        height: 200px;
        padding-top: 88px;
        position: absolute;
        text-align: center;
        color: #f31e1e;
        font-size: 23px;
        top: 0;
        opacity: 0.5;
    }

    .gift-lists li.hover .flipper .back p b {
        font-size: 34px;
        display: block;
        margin: 10px 0;
    }

    .gift-lists li.hover .flipper .back p span {
        font-size: 23px;
    }

    .gift-lists li.hover .flipper .back p.on {
        background: url("../../assets/imgs/invitaion/gift60000.png") no-repeat center top;
        background-size: cover;
        width: 197px;
        height: 200px;
        padding-top: 88px;
        color: #f31e1e;
        font-size: 24px;
        top: 0;
        line-height: 0;
        opacity: 1;
    }

    .gift-lists li.hover .flipper .back p.on b {
        font-size: 46px;
        display: block;
        margin: 50px 0;
    }

    .gift-lists li.hover .flipper .back p.on span {
        font-size: 30px;
    }

    .gift-desc {
        width: 60%;
        margin: 50px auto;
        text-align: center;
        color: #333;
        font-size: 26px;
    }

    .gift-btn {
        margin: 60px 0;
    }

    .gift-btn button {
        background: #f74931;
        display: block;
        width: 445px;
        margin: 0 auto;
        height: 88px;
        line-height: 88px;
        border-radius: 6px;
        color: #fff;
        font-size: 32px;
        text-align: center;
    }

    .prohibit-list {
        overflow: hidden;
        height: 55px;
        max-height: 55px;
    }

    .anim {
        transition: all 0.5s;
        margin-top: -50px;
    }

    .invitationRecord {
        width: 248px;
        height: 42px;
        left: 3rem;
        top: 0;
        position: absolute;
    }

    .fortuneBag {
        position: relative;
        background: url("../../assets/imgs/invitaion/background.png") no-repeat center top;
        background-size: cover;
        width: 688px;
        height: 168px;
        margin: 80px auto 0;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;

        .bagTitle {
            font-size: 30px;
            color: #fff;
            font-weight: bold;
            padding-top: .2rem;
            padding-left: 3.4rem;
            span {
                font-size: 60px;
                color: #FFEA01;
            }
        }
        .goGet {
            padding-top: .3rem;
            padding-left: 4.8rem;
            font-size: 28px;
            color: #FFEA01;
            text-decoration: underline
        }
        .iconTip {
            position: absolute;
            right: -.2rem;
            top: .1rem;
        }
    }

    .parQ {
        margin-top: 30px;
    }
    .smile{
        width: 1rem;
        height: 1rem !important;
    }
    .particular{
        font-size: .27rem !important;
        display: inline-block;
        margin-top: .5rem;
    }
</style>
