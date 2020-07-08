<template>
    <div>
        <section class="insure-questions">
            <div class="header">
                <div class="my-tabar">
                    <ul class="tabs" @click="clickQuestion">
                        <li data-index="1" :class="{'active': index==1}">全部</li>
                        <li data-index="2" :class="{'active': index==2}">重疾</li>
                        <li data-index="3" :class="{'active': index==3}">医疗</li>
                        <li data-index="4" :class="{'active': index==4}">寿险</li>
                    </ul>
                    <ul class="tabs-content">
                        <li :class="{'active': index==1}">
                            <all/>
                        </li>
                        <li :class="{'active': index==2}">
                            <serious-illness/>
                        </li>
                        <li :class="{'active': index==3}">
                            <medical-care/>
                        </li>
                        <li :class="{'active': index==4}">
                            <life-insurance/>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- <div v-show="!isBrowser" class="contentBottom" @click="goDownload">
            下载APP，了解更多保险小知识
        </div> -->
    </div>
</template>
<script>
    import All from '@/views/cms/insureQues/All'
    import MedicalCare from '@/views/cms/insureQues/MedicalCare'
    import LifeInsurance from '@/views/cms/insureQues/LifeInsurance'
    import SeriousIllness from '@/views/cms/insureQues/SeriousIllness'

    export default {
        name: 'InsureQuestions',
        components: {
            All,
            MedicalCare,
            LifeInsurance,
            SeriousIllness
        },
        data() {
            return {
                riskType: '全部',     //产品类型
                shareImg: require('../../../assets/imgs/invitaion/strategy.png'),
                isBrowser: null,
                options: {},
                index: 1
            }
        },
        created() {
            this.share()
        },
        methods: {
            share() {
                this.isBrowser = this.$app.isBrowser()
                setupWebViewJavascriptBridge((bridge) => {
                    bridge.callHandler(
                        "navigationConfig",
                        {
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url: location.href,
                            share_title: '保险小知识，你知道几个?', //分享标题
                            share_text: '听说看过宝宝都会自己选保险了', //分享描述
                            share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                        },
                        function (response) {
                            //alert(response,'');
                        }
                    );
                });
                this.options.href = location.href
                this.options.title = "保险小知识，你知道几个?"
                this.options.desc = '听说看过宝宝都会自己选保险了'
                this.options.link = location.href
                this.options.imgUrl = this.$router.siteUrl() + this.shareImg
                this.$app.wxShareDetail(this.options)
            },
            goDownload() {
                this.$app.downLoadApp()
            },
            clickQuestion(e) {
                const index = e.target.dataset['index']
                if (index) {
                    this.index = index
                    this.riskType = e.target.innerText
                    this.loadShenceData()
                }
            },

            //神策埋点
            loadShenceData() {
                sensors.track("insurance_20Q_view", {
                    risk_type: this.riskType
                });
                console.log('产品类型：', this.riskType)
            },
        }
    };

</script>

<style lang="scss" scoped>
    .insure-questions {
        .my-tabar {
            .tabs {
                border-bottom: 1px solid #f6f6f6;
                display: flex;
                padding-left: 28px;
                li {
                    padding: 0 32px;
                    height: 80px;
                    line-height: 80px;
                    font-size: 28px;
                    &.active {
                        color: #24B6F7;
                    }
                }
                
            }
            .tabs-content {
                li {
                    display: none;
                    &.active {
                        display: block;
                    }
                }
            }
        }
    }

    .contentBottom {
        position: fixed;
        bottom: 0;
        height: 88px;
        line-height: 88px;
        text-align: center;
        width: 100%;
        color: #fff;
        background: #E10312;
        font-size: 32px;
    }
</style>
