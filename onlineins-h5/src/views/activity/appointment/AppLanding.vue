<template>
    <section id="section" >
        <div class="content_top" >
            <img src="@/assets/imgs/appointment/bg_top02.png" @click="showIphoneTip = false" class="bg_top_02"/>
            <div class="content_part_one" >


            <div :class="isNew === 1 || isNew === 2?'content_part_two_new':'content_part_two'" >
                <div class="partTwoDescription">
                    <p class="part_two_description_01">2020.1.1—2020.1.31</p>
                    <p class="part_two_description_02">投保指定产品可享口腔健康<br>服务一次</p>
                </div>
                <img src="@/assets/imgs/appointment/imgRight.png" class="imgRight"/>
                <div class="product_detail01">
                    <div class="proList" v-for="item in proListAll">
                        <img :src="item.imgUrl" class="productPic"/>
                        <div class="product01">
                            <P class="product_title">{{item.title}}</P>
                            <P class="product_description">{{item.des}}</P>
                            <p class="product_des">需保障至终身</p><a @click="goDetail(item)">立即投保</a>
                        </div>
                    </div>
                </div>
            </div>

                <div class="process">

                    <img src="@/assets/imgs/appointment/processing.png"/>
                    <ul>
                        <li>完成投保</li>
                        <li @click="receivePrize()">点击领奖</li>
                    </ul>
                </div>
            <div class="content_part_four"  >
                <div class="part_four_01"  >
                    <div class="part_four_01_des" >
                        <img src="@/assets/imgs/appointment/rule_title.png" class="rule_title" />
                        <div v-show="showMoreRule">
                            <p><b>一、活动说明</b></p>
                            <p>投保人在2020年1月1日至2020年1月31日期间完成指定产品的投保下单，并最终承保成功，即有机会获得口腔健康服务一次</p>
                            <div class="showBottom" @click="showMoreRule = false">查看更多规则<img
                                src="@/assets/imgs/appointment/showBottom.png" alt=""></div>
                        </div>
                        <div v-show="!showMoreRule">
                            <p><b>一、活动说明</b></p>
                            <p>投保人在2020年1月1日至2020年1月31日期间完成指定产品的投保下单，并最终承保成功，即有机会获得口腔健康服务一次</p>
                            <p><b>二、活动指定产品及保单要求</b></p>
                            <p v-if="isNew === 2">指定产品：百年人寿超倍保重疾险</p>
                            <p v-else-if="isNew === 1" >指定产品：百年人寿康惠保重疾险（2020版）</p>
                            <p v-else>指定产品：百年人寿康惠保重疾险（2020版）、百年人寿超倍保重疾险</p>
                            <p>保单规则：保障期限为终身且承保成功的保单。</p>
                            <p><b>三、服务发放规则</b></p>
                            <p>1、活动期间，同一设备、手机号、身份信息注册的不同账户，视为同一账户</p>
                            <p>2、同一投保人为同一被保人投多个承保成功保单，仅首张承保成功保单可享受服务。如首张保单发生退保，则服务顺延至第二张承保成功保单</p>
                            <p>3、多个投保人为同一被保人投保，则按投保下单的先后顺序，仅最早投保下单的保单可享受服务。如该保单退保则服务按投保下单的先后顺序顺延至第二个保单</p>
                            <p>4、活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实施网络攻击等）参与本次活动的用户，百年人寿保险公司有权终止其参与活动并回收所有奖品</p>
                            <p>5、服务发放时间：2020年2月20日至2020年3月31日，请关注百年人寿发送的手机短信以免错过领取信息。</p>
                            <p><b>四、特殊情况说明</b></p>
                            <p>如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，百年人寿可立即暂停、中止或终止活动。</p>

                            <p class="showBottom showBottomTop" @click="showMoreRule = true">收起<img
                                src="@/assets/imgs/appointment/hideTop.png" alt=""></p>
                        </div>

                    </div>
                    <img src="@/assets/imgs/appointment/rule_bottom.png" alt="" class="rule_bottom"></div>
            </div>
            <p class="content_bottom">*活动最终解释权归百年人寿所有</p>
        </div>

        </div>
    </section>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import img01 from '@/assets/imgs/appointment/product_01.png'
    import img02 from '@/assets/imgs/appointment/product_02.png'

    export default {
        name: "Appointment",
        data() {
            return {
                proList01: [
                    {
                        imgUrl: img01,
                        title: '康惠保重疾险（2020版）',
                        des: '重疾超级魔方 责任组合DIY',
                        url: '/product/Detail.html?product_id=130'
                    },
                    {
                        imgUrl: img02,
                        title: '超倍保重疾险',
                        des: '多次赔付 超倍保护',
                        url: '/product/Detail.html?product_id=128'
                    }
                ],
                proList02: [
                    {
                        imgUrl: img01,
                        title: '康惠保重疾险（2020版）',
                        des: '重疾超级魔方 责任组合DIY',
                        url: '/product/Detail.html?product_id=130'
                    }
                ],
                proList03: [
                    {
                        imgUrl: img02,
                        title: '超倍保重疾险',
                        des: '多次赔付 超倍保护',
                        url: '/product/Detail.html?product_id=128'
                    }
                ],
                showMoreRule: true,
                secondaryDistributor: '',
                allowInput: true,
                thirdClassDistributor:'',
                options:{
                    title:'“金鼠送福”瓜分百万口腔健康服务。',
                    desc:'戳我一键预约>>'
                },
                shareImgUrl:require('@/assets/imgs/appointment/shareImg.png'),
                isNew:0,
                proListAll:[],
            }
        },
        created() {
            this.isNew = Number(this.$router.query("isNew"))
            if(this.isNew === 1){   //只有一个康惠保 2020
                this.proListAll = this.proList02
            }else if(this.isNew === 2){  //只有一个超倍保
                this.proListAll = this.proList03
            }else{   //俩个产品
                this.proListAll = this.proList01
            }
            this.secondaryDistributor = this.$router.query("secondaryDistributor") || '';
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor") || '';
        },
        methods: {
            receivePrize(){
                location.href = '/activity/appointment/AppointmentStart.html?secondaryDistributor=' + this.secondaryDistributor
            },
            goDetail(item) {
                location.href = item.url + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor
            },
        },
    }
</script>

<style lang="scss" scoped>
    .roft{
        width: 400px;
        height: 300px;
        display: block;
        background: red;
    }
    section {
        .process{
            background: url("~@/assets/imgs/appointment/processBg.png");
            background-size: 100% 100%;
            width: 664px;
            height: 303px;
            margin-top: 27px;
            img{
                padding-top: 1.5rem;
                margin: 0 auto;
                width: 483px;
                height: 66px;
            }
            ul{
                display: flex;
                justify-content: center;
                margin-top: .34rem;
                li{
                    text-align: center;
                     font-size: 26px;
                    color: #FFD893;
                }
                li:first-child{
                    line-height: 38px;
                    margin-left: .45rem;
                }
                .particular{
                    margin-left: .8rem;
                    line-height: .45rem;
                }
                li:last-child{
                    margin-left: 1.4rem;
                    width:135px;
                    height:38px;
                    text-align: center;
                    color:rgba(214,34,33,1);
                    line-height: 38px;
                    background: linear-gradient(top, rgba(253,229,146,1),rgba(252,179,62,1));
                    background: -webkit-linear-gradient(top, rgba(253,229,146,1),rgba(252,179,62,1));
                    border-radius:5px;
                    }
            }
        }
        .bg_mongolia {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 300;
            .sharePic01{
                width: 388px;
                height: 65px;
                position: fixed;
                top: 95px;
                left: 63px ;
            }
            .sharePic02{
                width: 219px;
                height: 144px;
                position: fixed;
                right: 10%;
                top: 0;
            }
            .sharePic04{
                width: 178px;
                height: 144px;
                position: fixed;
                right: 16%;
                top: 0;
            }
            .know_hide{
                position: fixed;
                top: 224px;
                left: 50%;
                margin-left: -126px;
                width:253px;
                height:103px;
                border:1px solid rgba(255,255,255,1);
                border-radius:50%;
                display: flex;
                align-items: center;
                justify-content: center;
                .sharePic03{
                    width: 124px;
                    height: 34px;
                }
            }
        }
        .hide_mongolia{
            display: none;
        }
        .content_top {
            position: relative;
            background: url("~@/assets/imgs/appointment/bg_top01.png");
            background-size: 100% 100%;
            z-index: 10;
            height: 1058px;
            width: 100%;

            .bg_top_02 {
                position: absolute;
                width: 473px;
                height: 327px;
                left: 50%;
                margin-left: -236px;
                top: 16px;
                z-index: 22;
            }
        }

        .content_part_one {
            width: 664px;
            padding-top: 12.5rem;
            z-index: 30;
            margin: 0rem auto 0;

            .part_one {
                background: url("~@/assets/imgs/appointment/pic01.png") no-repeat;
                background-size: 100% 100%;
                margin: 10px auto 0;
                width: 664px;
                height: 270px;
                position: relative;
            }

            .part_one_title {
                text-align: right;
                font-size: 18px;
                color: #FFC494;
            }

            .part_one_description {
                position: absolute;
                left: 44px;
                top: 1.5rem;

                .part_one_description_01 {
                    font-size: 34px;
                    font-weight: bold;
                    color: #fff;
                }

                .part_one_description_02 {
                    font-size: 34px;
                    font-weight: bold;
                    color: #FFDEA5;
                    margin-top: 12px;
                }
            }
        }

        .content_part_two {
            margin: 30px auto 0;
            width: 664px;
            height: 602px;
            background: url("~@/assets/imgs/appointment/pic02.png");
            background-size: 100% 100%;
            position: relative;
        }
        .content_part_two_new {
            margin: 30px auto 0;
            width: 664px;
            height: 466px;
            background: url("~@/assets/imgs/appointment/pic02New.png");
            background-size: 100% 100%;
            position: relative;
        }
        .partTwoDescription {
            position: absolute;
            left: 44px;
            top: 1.5rem;

            .part_two_description_01 {
                font-size: 34px;
                color: #fff;
                font-weight: bold;
            }

            .part_two_description_02 {
                font-size: 34px;
                font-weight: bold;
                color: #FFDEA5;
                margin-top: 12px;
            }
        }

        .imgRight {
            position: absolute;
            width: 144px;
            height: 144px;
            right: 0.45rem;
            top: 1.2rem;
        }

        .product_detail01 {
            padding-top: 3.4rem;
            padding-left: 44px;

            .productPic {
                width: 196px;
                height: 132px;
                display: inline-block;
            }

            .particular {
                margin-top: 27px;
            }

            .proList {
                margin-top: .3rem;
            }

            .product01 {
                width: 5rem;
                position: absolute;
                display: inline-block;
                margin-left: 23px;
                overflow: hidden;

                .product_title {
                    font-size: 32px;
                    color: #FFDEA5;
                    font-weight: bold;
                }

                .product_description {
                    font-size: 28px;
                    margin-top: 9px;
                    color: #FFDEA5;
                }

                a {
                    margin-top: .1rem;
                    display: inline-block;
                    text-align: center;
                    line-height: .64rem;
                    border-radius: 10px;
                    width: 148px;
                    float: right;
                    margin-right: .3rem;
                    height: 46px;
                    color: #D62221;
                    font-size: 26px;
                    background: linear-gradient(top, #FDE592,#FCB33E);
                    background: -webkit-linear-gradient(top, #FDE592,#FCB33E);
                }
            }
        }

        .content_part_four {
            width: 656px;
            margin: 1rem auto 24px;
            position: relative;
            .rule_title{
                position: absolute;
                top: -1.8rem;
                width: 373px;
                height: 101px;
                left: 50%;
                margin-left: -186.5px;
            }
            .rule_bottom{
                position: absolute;
                bottom: 0;
                z-index: 20;
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            .smallTip {
                margin-left: 44px;
                font-size: 26px;
                color: #FFD893;
            }

            .part_four_01_des {
                padding-left: 45px;
                padding-right: 38px;
                font-size: 26px;
                position: relative;
                z-index: 150;
            }


            .part_four_01 {
                background: #D62221;
                outline: none;
                box-shadow: 0 0 0 4px #FFD893;
                margin-top: 38px;
                font-size: 28px;
                color: #FFD893;
                line-height: 42px;
                border-radius: 20px;
                padding-bottom: 39px ;
                padding-top: 1.2rem;
            }

            .showBottom {
                text-align: center;
                margin: 44px auto 0;
                line-height: .3rem;
                img {
                    width: 31px;
                    height: 20px;
                    display: inline-block;
                    margin-left: 10px;
                }
            }

            .showBottomTop {
                margin-top: .8rem !important;
            }
        }



        .product_des {
            margin-top: 0.25rem;
            font-size: 26px;
            color: #FFDEA5;
            float: left;
        }


        .content_bottom{
            margin: 0 auto 0;
            padding-bottom: 80px;
            padding-left: 1rem;
            font-size: 18px;
            color: #FFAA93;
        }
        .verificationSmallTip{
            position: absolute;
        }
        .iphoneTip:before{
            content: "";
            position: absolute;
            left: 1.1rem;
            top: -.2rem;
            width: 0px;
            height: 0px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: .25rem solid #FBC462;
        }
        .iphoneTip{
            width: 558px;
            position: absolute;
            height: 64px;
            line-height: 64px;
            z-index: 200;
            top: 1.1rem;
            padding-left: 24px;
            color: #D62221;
            background: #FBC462;
            border-radius: 10px;
        }
    }
    .pic{
        margin-top:20px;
        text-align: center
    }
    .parT {
        font-size: 36px;
        text-align: center;
        -webkit-appearance: none;
        -webkit-text-fill-color: #111a34;
        border: none;
        border-bottom: 1px solid #000;
        height: 1rem;
        width: 5rem;
    }
    .send_code_part{
        color: #7F5454 !important;
        background: linear-gradient(top, #EFCD92, #CCA050) !important;
        background: -webkit-linear-gradient(top, #EFCD92, #CCA050)!important;
    }
    input:-webkit-autofill {
        -webkit-text-fill-color: #FFDEA5 !important;
        -webkit-box-shadow: 0 0 0px 1000px #D62221  inset !important;
        background-color:#D62221;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    }
</style>
<style>
    html, body {
        background: #B41D1C;
    }

    .showMyLand .md-landscape-content {
        width: 100% !important;
    }

    .inputLogin::-webkit-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-moz-input-placeholder {
        color: #FFD893;
    }

    .inputLogin::-ms-input-placeholder {
        color: #FFD893;
    }


    input,textarea {
        -webkit-appearance: none; /* 方法2 */
    }
</style>
