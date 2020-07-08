<template>
    <div class="investigation-wrap">
        <div class="inner">
            <div class="top-imgs">
                <div class="words">
                    <img src="@/assets/imgs/visit_investigation/words.png" alt="这是一张文字图片 ">
                </div>
                <div class="tipwords">立即参加保单在线回访调研活动，为我们出谋划策。您，就是百年的体验官</div>
                <div class="gift">
                    <img src="@/assets/imgs/visit_investigation/gift.png" alt="这是一张图片 ">
                </div>
            </div>
            <div class="insurance-policy" :class="{center: insuranceArr.length===0}">
                <div v-if="insuranceArr.length>0" class="list">
                    <ul>
                        <li
                            v-for="(item,index) in insuranceArr"
                            :key="item.order_no"
                            :class="{'nobottomborder': index===insuranceArr.length-1}"
                        >
                            <div class="item-content">
                                <div class="item-top">
                                    <div class="icon">
                                        <img src="@/assets/imgs/visit_investigation/disicon.png" alt="小图标">
                                    </div>
                                    <h3>{{ item.mainRiskName || '-'}}</h3>
                                    <div class="item-status">承保成功</div>
                                </div>
                                <div class="item-center">
                                    <p>被保人：{{ item.insuredName || '-'}}</p>
                                    <p>生效日期：{{ item.cvalidate ? item.cvalidate.substr(0,10) : '-' }}</p>
                                </div>
                                <div class="btn-wrap">
                                    <div class="btn">
                                        <button @click="goInvist(item)">回访调研&nbsp;100%中奖</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else class="empty">
                    亲！您暂无适合的保单
                    <img src="@/assets/imgs/visit_investigation/fail_icon.png" alt="小图标">
                </div>
            </div>
            <div class="btn-bottom">
                <button @click="knowMore">{{ showBtnName }}</button>
            </div>
        </div>

        <hot-products :propImgs="propImgs" :changeUrlWidth="false" moduleType="03" />
    </div>
</template>

<script>
    import HotProducts from '@/components/HotProducts'
    export default {
        name: "VisitInvestigation",
        components: {
            HotProducts
        },
        data() {
            return {
                insuranceArr: [],
                propImgs: require('@/assets/imgs/visit_investigation/tit2.png')
            }
        },
        created() {
            this.init();
        },
        computed: {
            showBtnName () {
                return this.insuranceArr.length>0 ? '继续参与' : '了解产品'
            }
        },
        methods: {
            init() {
                document.title = "调研回访";
                this.loadInvistData();
            },
            loadInvistData() {
                this.$app.getToken(userToken => {
                    this.$request({
                        url: `/ins/visit/getAllNoVisitOrder`,
                        contentType: "application/json;charset=UTF-8",
                        isLoading: true,
                        userToken: userToken,
                        successFn: data => {
                            this.insuranceArr = data;
                        },
                        failFn: data => {}
                    });
                });
            },
            goInvist(item) {
                console.log("item.order_no", item.orderNo);
                location.href = `/activity/Investigation.html?orderNo=${item.orderNo}&order_id=1`;
            },
            knowMore() {
                setupWebViewJavascriptBridge(function(bridge) {
                    //点击左上按钮回首页
                    bridge.callHandler(
                        "goRiskList",
                        {
                            flag_back: 1 //是否返回按钮，1-返回 0-不返回
                        },
                        function(response) {}
                    );
                });
            }
        }
    };
</script>

<style lang='scss' scoped>
    .investigation-wrap {
        min-height: 100%;
        box-sizing: border-box;
        background: #EC1C21 url(../../assets/imgs/visit_investigation/bgc.png) top
        center no-repeat;
        background-size: 750px 1242px;
        text-align: center;
        padding-bottom: 80px;

        .inner {
            width: 750px;
            margin: 0 auto;
            padding: 30px;
            box-sizing: border-box;

            .top-imgs {
                .words {
                    width: 480px;
                    height: 172px;
                    margin: 40px auto 0;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                .tipwords {
                    font-size: 30px;
                    color: #F8DAA5;
                    width: 540px;
                    text-align: center;
                    line-height: 40px;
                    margin: 46px auto;
                }
                .gift {
                    width: 658px;
                    height: 750px;
                    margin: 0 auto;
                }
            }

            .insurance-policy {
                width: 690px;
                min-height: 144px;
                background-color: #fff;
                border-radius: 12px;
                position: relative;
                top: -50px;

                &.center {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .empty {
                    font-size: 26px;
                    color: #8e8e8e;
                    display: flex;
                    img {
                        margin-left: 8px;
                        margin-top: -6px;
                        width: 36px;
                        height: 36px;
                    }
                }

                .list {
                    li {
                        border-bottom: 1px solid #ccc;
                        &.nobottomborder {
                            border-bottom: none;
                        }
                        .item-content {
                            padding: 30px 22px;
                            min-height: 40px;

                            .item-top {
                                display: flex;

                                .icon {
                                    width: 48px;
                                    height: 48px;
                                }
                                h3 {
                                    font-size: 28px;
                                    color: #333;
                                    flex: 1;
                                    text-align: left;
                                    margin-left: 12px;
                                    line-height: 40px;
                                }
                                .item-status {
                                    color: #e10312;
                                    width: 160px;
                                    margin-top: 4px;
                                    text-align: right;
                                    font-size: 26px;
                                }
                            }
                            .item-center {
                                margin-left: 62px;
                                color: #8e8e8e;
                                padding-bottom: 12px;
                                p {
                                    line-height: 30px;
                                    text-align: left;
                                    margin: 12px 0;
                                }
                            }
                            .btn-wrap {
                                display: flex;
                                justify-content: center;
                                margin: 12px 0;

                                .btn {
                                    position: relative;
                                    button {
                                        width: 254px;
                                        height: 60px;
                                        text-align: center;
                                        line-height: 60px;
                                        margin: 0 auto;
                                        border: 1px solid #e10312;
                                        color: #e10312;
                                        border-radius: 10px;
                                        cursor: pointer;
                                        font-size: 24px;
                                    }
                                    img {
                                        position: absolute;
                                        width: 35px;
                                        height: 22px;
                                        right: 44px;
                                        top: 8px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .btn-bottom {
                margin-top: -12px;
                button {
                    color: #D31715;
                    width: 430px;
                    height: 92px;
                    border-radius: 92px;
                    background: linear-gradient(0deg, #FFA200, #FFDA6B);
                    font-size: 52px;
                }
            }
        }
    }
</style>

