<template>
    <section>
        <div class="content">
            <div class="cont_01" v-for="item in ticketList">
                <div class="contTop">
                    <img :src="dealImgUrl(item)" class="pro" />
                    <div class="topDes">
                        <div v-if="item.ticketStatus !== '2'">
                            <div
                                v-if="
                                    item.showType === '1' ||
                                        item.showType === '3'
                                "
                                class="status_1"
                            >
                                <div v-if="item.ticketStatus !== '3'">
                                    <p class="des_01">
                                        券号：{{ item.ticketNo }}
                                    </p>
                                    <p
                                        class="des_02"
                                        v-if="item.ticketStatus === '1'"
                                    >
                                        密码：{{ item.ticketPassword }}
                                    </p>
                                    <p
                                        class="des_02"
                                        v-else-if="item.ticketStatus === '0'"
                                    >
                                        密码：<span v-if="item.passwordFlag==1">预计<span>{{ item.actType | actTypeText }}</span>生效</span><span v-else>犹豫期过后生效</span>
                                    </p>
                                </div>
                                <div v-else>
                                    <p class="des_01">券码正在筹备中</p>
                                    <p class="des_02">请耐心等待</p>
                                </div>
                            </div>
                            <div v-else-if="item.showType === '2'">
                                <div
                                    class="receiveAdd status_2"
                                    v-if="item.area && item.address"
                                >
                                    <p class="add_01">
                                        <span>收货地址</span
                                        >{{
                                            item.receiverName +
                                                item.receiverMobile
                                        }}
                                    </p>
                                    <p class="add_02">
                                        {{
                                            (item.area + item.address)
                                                | addFilter
                                        }}
                                    </p>
                                </div>
                                <div class="receiveAdd status_4" v-else>
                                    <p class="add_01"><span>收货地址</span></p>
                                    <div class="add_03">
                                        <p
                                            @click="
                                                addAddress(
                                                    item.ticketNo,
                                                    item.ticketStatus
                                                )
                                            "
                                        >
                                            添加收货地址
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="receiveAdd status_3" v-else>
                            <p class="des_01 grey">券号：{{ item.ticketNo }}</p>
                            <p class="des_02 grey">密码：已失效</p>
                        </div>

                        <div
                            :class="
                                item.ticketStatus === '2'
                                    ? 'top_des01_grey'
                                    : 'top_des01'
                            "
                        >
                            获得时间：{{ item.receiveTime | transferDate }}
                        </div>
                        <a
                            v-if="
                                item.showType === '1' &&
                                    item.ticketStatus === '1'
                            "
                            href="tel:4008801900"
                            >电话预约</a
                        >
                        <a
                            v-else-if="
                                item.showType === '3' &&
                                    item.ticketStatus === '1'
                            "
                            @click="goAppointment"
                            >立即预约</a
                        >

                        <img
                            v-if="item.ticketStatus === '0'"
                            src="@/assets/imgs/appointment/start/status01.png"
                            class="status"
                        />
                        <img
                            v-else-if="item.ticketStatus === '1'"
                            src="@/assets/imgs/appointment/start/status02.png"
                            class="status"
                        />
                        <img
                            v-else-if="item.ticketStatus === '2'"
                            src="@/assets/imgs/appointment/start/status03.png"
                            class="status"
                        />
                        <img
                            v-else-if="item.ticketStatus === '3'"
                            src="@/assets/imgs/appointment/start/prepare.png"
                            class="status"
                        />
                    </div>
                </div>
                <div class="explain" v-if="item.ticketStatus !== '3'">
                    <p v-if="item.showType === '1'">
                        ①生效后，可致电400 880 1900完成预约使用。<br />
                        ②该服务有效期截止于2020.12.31，过期将视为放弃。
                    </p>
                    <p v-else-if="item.showType === '2'">
                        ①预计于<span>{{ item.actType | actTypeText }}</span>起，开始寄送口腔护理套餐。 <br />
                        ②请认真填写收货地址并保持电话畅通。 <br />
                        ③该服务有效期截止于2020.12.31，过期将视为放弃。
                    </p>
                    <p v-else-if="item.showType === '3'">
                        ①生效后，可致电400 728 7289完成预约使用或点击<a
                            v-if="item.ticketStatus === '1'"
                            @click="goAppointment"
                            >预约页面</a
                        >
                        <span v-else>预约页面</span>完成预约。<br />
                        ②该服务有效期截止于2020.12.31，过期将视为放弃。
                    </p>
                </div>
                <div class="explain" v-if="item.ticketStatus === '3' && item.showType === '2'">
                    <p v-if="item.showType === '2'">
                        ①预计于<span>{{ item.actType | actTypeText }}</span>起，开始寄送口腔护理套餐。 <br />
                        ②请认真填写收货地址并保持电话畅通。 <br />
                        ③该服务有效期截止于2020.12.31，过期将视为放弃。
                    </p>
                </div>
            </div>
            <div class="explainDes" v-if="showExplain">
                <h2>注：</h2>
                <p>
                    1、根据活动规则，若在保单犹豫期内退保，您的对应服务将不会生效。
                </p>
            </div>
        </div>
        <AppPopup
            :personInfo="person"
            @updateInfo="updateInfo"
            @closeAdd="closeAdd"
            :iphoneNum="iphone"
            :showAddress="showAddress"
            :ticketNumber="ticketNumber"
        />
    </section>
</template>

<script>
import AppPopup from "./AppPopup";
export default {
    name: "AppService",
    data() {
        return {
            appUrl: "",
            ticketNumber: "",
            tickSecret: "",
            ticketList: [],
            showAddress: false,
            iphone: "",
            person: {},
            showExplain: false,
            status: "0" //0 未生效  1 已生效 2已失效
        };
    },
    components: {
        AppPopup
    },
    created() {
        this.appUrl = this.$router.siteUrl() + "/activity/Appointment.html";
        let info = JSON.parse(sessionStorage.getItem("PERSON_INFO"));
        this.iphone = JSON.parse(sessionStorage.getItem("LOGIN_NUM")) || "";
        this.person = info;
        this.getList();
    },
    methods: {
        dealImgUrl (item) {
            const actTive1 = require('@/assets/imgs/appointment/start/pro01.png'),
                    grey1 = require('@/assets/imgs/appointment/start/greyPic01.png'),
                    actTive3 = require('@/assets/imgs/appointment/start/pro03.png'),
                    grey3 = require('@/assets/imgs/appointment/start/greyPic03.png');
            // maps: {ticketStatus: {showType: {actType}}}
            const mapsActTive = { //ticketStatus-0 1 2   showType- 1 2 3    actType- 01 02 03
                '1': {'01': actTive1,'02': actTive1,'03': actTive1},
                '2': {
                    '01': require('@/assets/imgs/appointment/start/pro02.png'),
                    '02': require('@/assets/imgs/appointment/start/pro02_1.png'),
                    '03': require('@/assets/imgs/appointment/start/pro02_2.png')
                },
                '3': {'01': actTive3,'02': actTive3,'03': actTive3}
            }
            const mapsGrey = {
                '1': {'01': grey1,'02': grey1,'03': grey1},
                '2': {
                    '01': require('@/assets/imgs/appointment/start/greyPic02.png'),
                    '02': require('@/assets/imgs/appointment/start/greyPic02_1.png'),
                    '03': require('@/assets/imgs/appointment/start/greyPic02_2.png')
                },
                '3': {'01': grey3,'02': grey3,'03': grey3}
            }
            if (item.ticketStatus === '2') {
                return mapsGrey[item.showType][item.actType || '03'] || ''
            } else {
                return mapsActTive[item.showType][item.actType || '03'] || ''
            }
        },
        closeAdd() {
            this.showAddress = false;
        },
        addAddress(item, status) {
            if (status === "3") {
                //筹备中  传111000
                this.ticketNumber = "111000";
            } else {
                this.ticketNumber = item;
            }
            this.showAddress = true;
        },
        updateInfo(obj) {
            console.log(obj);
            this.getList();
        },
        goAppointment() {
            location.href =
                "http://m.guanaihui.com/sh/payCard/?navIndex=2&from=singlemessage&isappinstalled=0";
        },
        getList() {
            this.$request({
                url: `/act/actSubscribeRewardRecord/getReceiveTicketList`,
                method: "POST",
                isLoading: true,
                data: { mobile: this.iphone },
                contentType: "application/json",
                successFn: data => {
                    console.log(data);
                    this.ticketList = data.ticketForShowList;
                    this.showExplain = true;
                },
                failFn: data => {}
            });
        }
    },
    filters: {
        actTypeText (v) {
            let map = {
                '01': '2020.02.20',
                '02': '2020.03.20',
                '03': '2020.04.20'
            }
            return map[v] || map['03']
        },
        addFilter(value) {
            if (value.length > 25) {
                return value.substring(0, 25) + "...";
            } else {
                return value;
            }
        },
        transferDate(time, format = "yyyy.MM.dd") {
            var t = new Date(time);
            var tf = function(i) {
                return (i < 10 ? "0" : "") + i;
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                switch (a) {
                    case "yyyy":
                        return tf(t.getFullYear());
                        break;
                    case "MM":
                        return tf(t.getMonth() + 1);
                        break;
                    case "mm":
                        return tf(t.getMinutes());
                        break;
                    case "dd":
                        return tf(t.getDate());
                        break;
                    case "HH":
                        return tf(t.getHours());
                        break;
                    case "ss":
                        return tf(t.getSeconds());
                        break;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
section {
    padding-top: 28px;
}
.content {
    margin: 0 32px 0;
    .cont_01:first-child {
        margin-top: 0 !important;
    }
    .cont_01 {
        width: 100%;
        /*height: 258px;*/
        margin-top: 28px;
        background: #fff;
        box-shadow: 0px 5px 6px 0px rgba(192, 211, 221, 0.21);
        .contTop {
            display: flex;
            flex-direction: row;
            box-shadow: 0px 4px 32px 0px rgba(58, 58, 58, 0.15);
        }

        .topDes {
            display: inline-block;
            margin: 0 12px 0 0.1rem;
            padding-bottom: 10px;
            font-size: 24px;
            width: 100%;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(49, 49, 49, 1);
            position: relative;
            .grey {
                color: #bfbfbf !important;
            }
            .des_01 {
                margin-top: 0.32rem;
            }
            .des_02 {
                margin-top: 18px;
                margin-bottom: 13px;
                span {
                    font-size: 24px;
                    color: #bfbfbf;
                }
            }
            .top_des01 {
                border-top: 1px dashed #dcdcdc;
                color: #535353;
                height: 30%;
                position: absolute;
                bottom: 0;
                width: 100%;
                font-size: 18px;
                display: flex;
                align-items: center;
            }
            .top_des01_grey {
                border-top: 1px dashed #dcdcdc;
                color: #bfbfbf;
                font-size: 18px;
                height: 30%;
                display: flex;
                align-items: center;
            }
            a {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 124px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                top: 0.8rem;
                right: 0.4rem;
                border: 1px solid #ff3d3c;
                border-radius: 18px;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(255, 61, 60, 1);
            }
            .status {
                position: absolute;
                top: 0;
                right: -12px;
                width: 91px;
                height: 79px;
            }
            .receiveAdd {
                margin-top: 0.15rem;
                .add_01 {
                    font-size: 26px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(49, 49, 49, 1);
                    span {
                        width: 140px;
                        height: 34px;
                        display: inline-block;
                        background: #ff3d3c;
                        font-size: 24px;
                        margin-left: -0.13rem;
                        transform: scale(0.8);
                        -webkit-transform: scale(0.8);
                        color: #fff;
                        text-align: center;
                        line-height: 34px;
                        border-radius: 25px;
                    }
                }
                .add_02 {
                    margin-top: 5px;
                    font-size: 24px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(49, 49, 49, 1);
                    max-width: 342px;
                    min-height: 0.53rem;
                    /* display: flex;
                        align-items: center;*/
                    margin-bottom: 6px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .add_03 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 8px;
                    margin-bottom: 10px;
                    p {
                        border-radius: 20px;
                        border: 1px solid rgba(255, 61, 60, 1);
                        color: rgba(255, 61, 60, 1);
                        width: 185px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                    }
                }
            }
        }

        .explain {
            height: 102px;
            padding-left: 25px;
            padding-right: 25px;
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(83, 83, 83, 1);
            line-height: 0.4rem;
            a {
                transform: scale(0.8);
                -webkit-transform: scale(0.8);
                text-decoration: underline;
                color: rgba(48, 0, 255, 1);
                font-size: 24px;
            }
        }
    }
    .explainDes {
        margin-top: 34px;
        padding-bottom: 30px;
        h2 {
            font-size: 28px;
            color: #d62221;
        }
        p {
            margin-top: 20px;
            font-size: 24px;
            font-family: FZXiHei I-Z08S;
            font-weight: 400;
            color: rgba(63, 63, 63, 1);
            line-height: 42px;
        }
    }
    .pro {
        width: 223px !important;
        display: inline-block;
        height: 156px;
    }
    .proDiv {
        width: 223px !important;
        display: inline-block;
        height: 156px;
    }
}
</style>
<style>
html,
body {
    background: #f1efef;
}
</style>
