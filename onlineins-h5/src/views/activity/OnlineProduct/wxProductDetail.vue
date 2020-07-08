<template>
    <div class="section">
        <div class="content">
            <div ref="divSearch">
                <div class="contentTop">
                    <img :src="bannerUrl" class="contentTopImg">
                    <div class="topIntroduce">
                        <img src="@/assets/imgs/kanghuibao/logo.png" class="topLogo">
                        <p>本产品由百年人寿保险股份有限公司承保并负责理赔</p>
                    </div>
                </div>
                <div v-for="(item,index) in cpsAdvImage" :key="index">
                    <img :src="item.url" class="contentMiddle2" v-if="item.imagePosition === 1 " @click="goUrl(item)">
                </div>
                <div v-if="ifPositionImage" style="height: 1.4rem;"></div>
                <div class="contentMiddle_a">
                    <div class="contS">
                        <ul class="contentMiddleTitle">
                            <li class="myTitle">保障责任</li>
                        </ul>

                        <div v-for="(item,index) in dutyList" :key="index">
                            <ul>
                                <li @click="showOneD(item)">{{item.protectionName}}</li>
                                <li @click="showOneD(item)">
                                    <span>{{item.description}}</span>
                                    <img
                                        src="@/assets/imgs/kanghuibao/top2.png"
                                        v-if="item.showFlag == true"
                                        class="mediumImg"
                                    >
                                    <img src="@/assets/imgs/kanghuibao/bottom2.png" v-else class="mediumImg">
                                </li>
                            </ul>
                            <div class="oneDetail" v-if="item.showFlag == true">
                                <span class="to-top"></span>
                                <p v-html="item.detailDescription"></p>
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in cpsAdvImage" :key="index">
                        <img :src="item.url" class="contentMiddle1" v-if="item.imagePosition === 3 "
                             @click="goUrl(item)">
                    </div>
                </div>
                <div class="btnBox">
                  <!--  <div>
                        <button>计划书</button>
                    </div>-->
                    <div>
                        <button>去分享</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import "../../../assets/detail.scss"
    import {InputItem,Dialog ,Toast} from "mand-mobile";
    import {getProdFlag, debounce, throttle} from "@/utils/utils"
    export default {
        name: "Index",
        components: {
            [InputItem.name]: InputItem,
        },
        data() {
            return {
                ifyth: false,
                insGiftInsuranceManage: '',
                isPopupShow2: {},
                yhtinfoShow: false,
                ifInfoShow: '',
                giftInsContFlag: false,
                ifCpsFlag: false,
                showExlogin: false,
                showHeight: 0,
                $myQuestion: null,
                isShowAll: false,
                showAllText: '展开',
                cpsWS: '',
                wxShareSign: '',
                ifPositionImage: true,
                advertising: false,
                cpsCode: '',
                cpsAdvImage: [],
                image: {
                    url: undefined,
                    imageType: undefined
                },
                strategy: [],
                wxShareTitle: "", // 微信分享标题
                descContent: "", // 分享描述
                imgUrl: "", //分享小图标
                showBXD: false,
                isclick: true,   //是否有权点击投保
                minDate: new Date("2013/9/9"),
                maxDate: new Date("2019/9/9"),
                currentDate: new Date(),
                dataList: [],
                riskName: "",
                trialAdd: "",
                proData: null,
                showError: false,
                showWhirl: false,
                dutyList: [],
                product_id: null,
                agentCode: "3880100278",
                isPopupShow: {},
                isPopupBoxShow: {},
                isFixed: false,
                lightData: "",
                lightHuo: "",
                dieData: "",
                fatData: "",
                riskCode: "",
                andData: "",
                childData: "",
                actives: "0",
                mediumData: "",
                riskInfo: {},
                showSeven: false,
                riskDetail: null,
                isDatePickerShow: false,
                datePickerValue: "",
                lowPrice: "",
                clauseUrl: "",
                insureKnow: null,
                controduce: null,
                question: null,
                questionLittle: null,
                bannerUrl: "",
                activeQ: null,
                health: null,
                introduce: {},
                modelCode: "",      //模块code
                guaranteeDetails: null,
                knows: {},
                showFullScreen: false,
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: "确认操作",
                            handler: this.onBasicConfirm
                        }
                    ]
                },
                gathering_id: "",
                articlePro_id: "",
                countDown: 5,
                showCount: false,
                evaluation_id: "",
                isBrowser: false,
                reportDetail_id: '',
                showCustomer: null,
                bxdUrl: '',
                areaCode: '',    //代理人地区code
                options: {},
                secondaryDistributor: '',
                isBnMiniApp: false,
                //debounceFlag: true,
                productLink: '',
                thirdClassDistributor: '',
                shareUserCode: ''
            };
        },
        created() {
            console.log(document.referrer);
            this.saveUrlParams();
            this.loadProDetail();
            this.getProductSaleDate();
        },
        methods: {
            showOneD(item) {
                item.showFlag = !item.showFlag;
            },
            loadPrice() {
                this.$request({
                    url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
                    params: {
                        id: this.product_id
                    },
                    successFn: data => {
                        if (data.status == 0) {
                            this.isclick = false
                        }
                        this.wxShareTitle = data.shareTitle; // 分享标题
                        this.descContent = data.shareContent; // 分享描述
                        this.imgUrl = data.minImage; //分享小图标
                        this.modelCode = data.modelCode;
                        if (this.riskCode == '5321') {
                            this.lowPrice = 12
                        } else {
                            this.lowPrice = data.money;
                        }
                        this.showWhirl = false;
                        this.bannerUrl = data.maxImage;
                        this.productLink = data.productLink;
                        this.cpsAdvImage = data.cpsAdvImage;
                        this.riskDetail = data.riskDetail;
                        this.riskName = data.name;
                        document.title = this.riskName;
                    },
                    errorFn: () => {
                    }
                });
            },
            goUrl(item) {
                if (item.linkUrl && item.linkUrl !== '') {
                    if (item.linkUrl.indexOf('?') > -1) {
                        location.href = item.linkUrl + '&thirdClassDistributor=' + this.thirdClassDistributor + '&shareUserCode=' + this.shareUserCode
                    } else {
                        location.href = item.linkUrl + '?thirdClassDistributor=' + this.thirdClassDistributor + '&shareUserCode=' + this.shareUserCode
                    }
                } else {
                    return false
                }
            },
            loadProDetail() {
                this.$request({
                    url: `/ins/product/product/risk/${this.product_id}`,
                    params: {
                        id: this.product_id,
                        cpsCode: this.cpsCode
                    },
                    successFn: data => {
                        this.riskInfo = data.riskInfo;
                        this.riskCode = data.riskInfo.riskCode;
                        window.localStorage.setItem('riskCode', this.riskCode);
                        let dutyList = data.dutyList;
                        for (let i = 0; i < dutyList.length; i++) {
                            if (dutyList[i].dutyCode == "5031D1") {
                                this.ifyth = true;
                            }
                        }
                        this.loadDutyDetail();
                        this.loadPrice()
                    },
                    errorFn: () => {
                        this.showWhirl = false;
                        this.showError = true;
                    }
                });
            },
            loadDutyDetail() {
                this.$request({
                    url: `/ins/product/insProductProtection/${this.product_id}`,
                    params: {
                        id: this.product_id
                    },
                    successFn: data => {
                        let dutyListTmp = [];
                        for (let i = 0; i < data.length; i++) {
                            if (!this.ifyth && data[i].protectionName == '附加医惠通医疗险（可选）') {
                                continue;
                            } else {
                                dutyListTmp.push(data[i]);
                            }
                            data[i]["showFlag"] = false;
                        }
                        this.dutyList = dutyListTmp;
                        console.log('1111', this.dutyList);
                    },
                    errorFn: () => {
                        this.showWhirl = false;
                        this.showError = true;
                    }
                });
            },
            getProductSaleDate() {
                this.$request({
                    url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
                    successFn: data => {
                        // this.insGiftInsuranceManage = 1
                        if (data.insGiftInsuranceManage === null) {
                            this.insGiftInsuranceManage = ''
                        } else {
                            this.insGiftInsuranceManage = data.insGiftInsuranceManage
                        }
                        window.localStorage.setItem("insGiftInsuranceManage", this.insGiftInsuranceManage)
                        if (data.productSaleDate) {
                            let productSaleDateArr = data.productSaleDate.split("-").splice(1)
                            console.log(productSaleDateArr)
                            let productSaleDate = productSaleDateArr[0] + "月" + productSaleDateArr[1] + "日"
                            console.log(productSaleDate)
                            this.ifCpsFlag = true
                            localStorage.setItem("productSaleDate", productSaleDate)
                        }
                     },
                    errorFn: () => {
                    }
                });
            },
            saveUrlParams() {
                this.product_id = this.$router.query("product_id");
                if(this.$router.query("shareBtn") === '1'){
                    Dialog.alert({content: '请点击右上角分享'})
                }
                this.isBrowser = this.$app.isBrowser();
            },
            showLoadingToast() {
                Toast.loading("加载中...");
                setTimeout(() => {
                    Toast.hide();
                }, 3000);
            },
            showProduct() {
                this.actives = 0;
                this.activeQ = 0;
                var a = this.$refs.image.offsetTop - 50;
                window.scrollTo(0, a);
            },
            showShuoMing() {
                this.actives = 1;
                this.activeQ = 1;
                var b = this.$refs.shuoming.offsetTop - 75;
                window.scrollTo(0, b);
            },
            showQuestion() {
                this.actives = 2;
                this.activeQ = 2;
                console.log(this.actives);
                console.log(this.activeQ);
                var c = this.$refs.often.offsetTop - 80;
                window.scrollTo(0, c);
            },

        }
    };
</script>

<style lang="scss" scoped>
    .content {
        background: #fff;
        position: relative;
    }

    .md-field {
        padding: 0 25px !important;
    }

    .button1.gm-btn {
        background: #1fb2a7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: 36px;
        line-height: 140px;
    }

    .button.gm-btn {
        background: #1fb2a7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: px2em(36px);
        line-height: px2em(140px);
    }

    .contentTop {
        width: 100%;

        .contentTopImg {
            width: 100%;
            position: relative;
        }

        .topIntroduce {
            border: 1px solid #f3f3f3;
            height: 100px;
            margin-top: -15px;
            position: absolute;
            overflow: hidden;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background: #fff;
            width: 94%;
            /*box-shadow: 0px 4px 15px #6666;*/
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            margin-left: 3%;

            .topLogo {
                width: 120px;
                margin-top: 35px;
                display: inline-block;
                margin-left: 15px;
            }

            p {
                font-size: 22px;
                float: right;
                margin-right: 25px;
                margin-top: 25px;
            }
        }
    }

    .contentBottom {
        display: flex;
        height: 118px;
        position: fixed;
        z-index: 100 !important;
        width: 100%;
        bottom: 0;
        background-color: #fff;

        &.isIphonex {
            bottom: 68px;
        }

        .customerModal {
            flex: 0.3;
        }

        .bottomP {
            padding-top: 0.21333rem;
            flex: 0.7;
            line-height: 1.17333rem;
        }

        .bottomA {
            flex: 1;
            line-height: 118px;
        }

        a a:visited {
            color: #fff;
        }
    }

    .empty {
        display: flex;
        height: 100px;
        position: fixed;
        background-color: #fff;
        z-index: 99 !important;
        width: 100%;
        bottom: 0;
    }

    .contentMiddle {
        /*box-shadow: 0px 4px 15px #6666;*/
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        width: 94%;
        margin-top: 120px;
        margin-left: 3%;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;

        .contentMiddleTitle {
            display: flex;
            font-weight: bold;
            padding: 30px 0 30px;
            border-bottom: 1px solid rgb(237, 237, 237);
            justify-content: space-between;
        }

        .contS {
            width: 96%;
            margin-left: 2%;

            ul {
                display: flex;
                justify-content: space-between;
                margin-top: 0.2rem;

                li:first-child {
                    color: #333;
                    font-size: 28px;
                    width: 3.65rem;
                    white-space: nowrap;
                }

                li:last-child {
                    color: rgb(215, 0, 15);
                    font-size: 28px;
                    max-width: 6rem;

                    span {
                        display: inline-block;
                    }
                }

                li {
                    line-height: 0.7rem;
                }

                button {
                    height: 65px;
                    width: 180px;
                    /*height: .9rem;*/
                    /*width: 2.9rem;*/
                    background: #fff;
                    padding: 10px;
                    font-size: 26px;
                    color: #fff;
                    border: 1px solid #d7000f;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }

            .oneDetail {
                margin-top: 15px;
                font-size: 28px;
                padding: 30px 35px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                background: rgb(245, 245, 245);
                color: #333333;
            }

            .parT {
            }
        }
    }

    .oneDetail p span {
        color: #d7000f;
    }

    .contentMiddle_a {
        /*box-shadow: 0px 4px 15px #6666;*/
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        width: 94%;
        margin-left: 3%;
        border: 1px solid #f3f3f3;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;

        .contentMiddleTitle {
            display: flex;
            font-weight: bold;
            padding: 30px 0 30px;
            border-bottom: 1px solid rgb(237, 237, 237);
            justify-content: space-between;
        }

        .contS {
            width: 96%;
            margin-left: 2%;
            color: #333;

            ul {
                display: flex;
                justify-content: space-between;
                margin-bottom: 26px;
                font-size: 28px;

                li:first-child {
                    width: 3.65rem;
                    white-space: nowrap;
                }

                li:last-child {
                    max-width: 6rem;

                    span {
                        display: inline-block;
                    }
                }

                li {
                    line-height: 0.7rem;
                }

                button {
                    height: 68px;
                    width: 208px;
                    line-height: 0.48rem;
                    /*height: .9rem;*/
                    /*width: 2.9rem;*/
                    background: #fff;
                    font-size: 30px;
                    font-weight: 700;
                    color: #fff;
                    border: 1px solid #d7000f;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }

            .oneDetail {
                position: relative;
                margin-top: 28px;
                font-size: 24px;
                padding: 20px 18px 22px 20px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                background: rgba(242, 242, 242, 1);
                color: #8E8E8E;
                text-align: justify;

                .to-top {
                    position: absolute;
                    border-top: none;
                    border-left: 15px solid #fff;
                    border-right: 15px solid #fff;
                    border-bottom: 20px solid rgba(242, 242, 242, 1);
                    top: -20px;
                    left: 0.8rem;
                }
            }

            .parT {
            }
        }
    }

    .giftIns {
        position: relative;
    }

    .giftIns-tip {
        position: absolute;
        width: 52px;
        height: 36px;
        left: 6.1rem;
        top: -0.2rem;
    }

    .contentMiddle1 {
        width: 94%;
        height: 4rem;
        margin-top: 4%;
        margin-bottom: 4%;
        margin-left: 3%;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }

    .contentMiddle2 {
        width: 94%;
        height: 2.4rem;
        margin-left: 3%;
        margin-top: 15%;
        margin-bottom: 4%;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }

    .toast {
        font-size: 26px;
        margin: auto;
        padding: 0 40px 30px 40px;

        span {
            color: rgb(215, 0, 15);
        }
    }

    .middleToast {
        width: 100%;
        overflow: hidden;

        .parS {
            margin-top: 20px;
        }

        p {
            width: 31%;
            display: inline-block;

            span {
                font-size: 24px;
                float: left;
                margin-top: -8px;
            }

            img {
                float: left;
                margin-right: 15px;
                display: inline-block;
            }
        }
    }

    .md-cell-item-title {
        font-size: 30px;
    }

    .md-example-child-popup-2 {
        float: left;
        width: 100%;
    }

    .md-button {
        margin-bottom: 20px;
    }

    .md-popup-title-bar .md-popup-cancel .md-icon {
        align-self: flex-start;
        margin-left: 32px;
    }

    .md-example-popup {
        position: fixed;
        /*font-size: font-minor-large;*/
        /*background :color-bg-base;*/
        box-sizing: border-box;
        // text-align: center;
        background-color: #fff;
        bottom: 0;
    }

    .md-example-popup-center {
        padding: 50px;
        border-radius: 10px;
    }

    .md-example-popup-top {
        width: 100%;
        height: 75px;
        line-height: 75px;
        background: #4a4c5b;
        color: #fff;
    }

    .md-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .md-example-popup-bottom {
        width: 100%;
        padding: 40px 35px;
        line-height: 0.6rem;
    }

    .md-example-popup-left,
    .md-example-popup-right {
        height: 100%;
        padding: 0 150px;
        display: flex;
        align-items: center;
    }

    p {
        line-height: 50px;
    }

    .shuoming {
        position: relative;

        .wenan {
            position: absolute;
            left: 20%;
            top: 4%;
        }

        h3 {
            color: #d7000f;
            font-size: 30px;
            margin-left: 30px;
            margin-top: 45px;
        }

        img {
            margin-left: 55px;
            display: inline-block;
            margin-top: 30px;
            margin-bottom: 50px;
        }

        .shuoOne {
            .oneTitle {
                display: inline-block;
                font-size: 0.384rem;
                margin-top: 50px;
                color: #333;
            }

            .TwoTitle {
                margin-top: 45px;
                display: inline-block;
                font-size: 0.384rem;
                color: #333;
            }

            .oneBottom {
                font-size: 24px;
                color: #999999;
            }
        }
    }

    .often {
        width: 100%;
        overflow: hidden;
        position: relative;
        min-height: 325PX;

        .showAllText {
            background: rgb(255, 255, 255);
            opacity: 0.9;
            filter: alpha(opacity=100);
            position: absolute;
            bottom: -2Px;
            right: 50px;
            color: #d7000f;
            width: 100%;
            height: 40Px;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-shadow: 1Px -10Px 20Px #fff;
            -webkit-box-shadow: 1Px -10Px 20Px #fff;
            z-index: 99;
        }


        .A {
            float: left;
            margin-top: 10px;
            color: #333;
        }

        h3 {
            color: #d7000f;
            font-size: 30px;
            margin-left: 30px;
            margin-top: 45px;
        }

        p {
            width: 87%;
        }

        .questionOne {
            margin-left: 30px;
            margin-top: 40px;
            font-size: 26px;
        }
    }

    .blank {
        height: 20px;
        background: #f3f3f3;
        width: 100%;
    }

    .xiTop {
        display: none;
        width: 100%;
        height: 105px;
        background: #f3f3f3;

        p {
            flex: 1;
            line-height: 105px;
            text-align: center;
            font-size: 26px;
        }
    }

    .medium {
        display: flex;
        width: 100%;
        height: 105px;
        background: #fff;

        p {
            flex: 1;
            line-height: 105px;
            text-align: center;
            font-size: 26px;

            span {
                display: inline-block;
            }

            .active {
                border-bottom: 1px solid #d7000f;
                color: #d7000f;
            }
        }
    }

    .liPei {
        height: 500px;
        width: 72px;
    }

    .activeB {
        font-size: 30px !important;
        color: #d7000f !important;
    }

    .myTitle {
        font-size: 36px !important;
    }

    .topImg {
        height: 30px;
        float: right;
        margin-left: 20px;
        width: 35px;
        margin-top: 15px;
    }

    .mediumImg {
        height: 20px;
        float: right;
        margin-left: 10px;
        width: 34px;
        margin-top: 0.18rem;
    }

    .bottomImg {
        height: 30px;
        float: right;
        margin-left: 20px;
        width: 35px;
        margin-top: 23px;
    }

    .rightImg {
        height: 40px;
        float: right;
        margin-left: 10px;
        width: 40px;
    }

    .tiaoZhuan a a:visited {
        color: #fff;
        font-weight: 700;
    }

    .shiSuan {
        color: #d7000f !important;
    }

    .phone {
        color: #d7000f;
    }

    .particular1 {
        height: 719px;
        width: 100%;
    }

    .particular2 {
        height: 787px;
        width: 100%;
    }

    .particular3 {
        height: 1102px;
        width: 100%;
    }

    .particular4 {
        height: 1198px;
        width: 100%;
    }

    .particular5 {
        height: 604px;
        width: 100%;
    }

    .particular6 {
        height: 1550px;
        width: 100%;
        margin-bottom: 50px;
    }

    .particular {
        margin-top: 1px;
    }

    .touBaoHuoMian {
        border-bottom: 1px solid rgb(237, 237, 237);
        padding-bottom: 30px;
        line-height: 75px;
    }

    .hangGao {
        line-height: 60px;
    }

    .lastUl {
        padding-bottom: 30px;

        p {
            font-size: 0.4rem;
            line-height: 1rem !important;
        }
    }

    .bottomP {
        background: #ffffff;
        text-align: center;
        color: rgb(215, 0, 15);
        border-top: 1px solid #f3f3f3;
        font-size: 30px;
        font-weight: bold;
    }

    .bottomA {
        background: rgb(215, 0, 15);
        text-align: center;
        font-size: 34px;
        flex: 1;
        line-height: 100px;
        color: #fff !important;
    }

    .chakan {
        overflow: hidden;
        color: rgb(215, 0, 15);
        margin-top: 15px;
        font-size: 30px;
    }

    .product {
        color: #d7000f !important;
    }

    .bottomArt {
        font-size: 50px;
    }

    .questionTitle {
        color: #333;
    }

    .questionAnswer {
        color: #999;
    }

    .parL {
        display: inline-block;
    }

    .duiHao {
        height: 30px;
        width: 30px;
        margin-right: 10px;
    }

    .section {
        padding-bottom: px2em(150px);
    }

    .myQuestion {
        padding: 50px 30px;
        overflow-x: hidden;
        word-wrap: break-word !important;
        word-break: normal !important;
    }

    .myShuoMing {
        padding: 0 30px;
    }

    .parLq {
        width: 200px;
        height: 200px;
        background: red;
    }

    .md-example-child-landscape {
        .md-button {
            margin-bottom: 20px;

            .md-landscape-content {
                padding: 30px;
                font-size: 30px;
                line-height: 1.5;
                color: #666;

                p {
                    margin-bottom: 30px;
                }
            }
        }
    }

    .insureKnow {
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        background: #e8e8e8;
        position: fixed;
        font-size: 0.5rem;
        font-weight: 600;
    }

    .showInsure {
        padding: 100px 30px 30px;
        overflow-x: hidden;
    }

    .customer {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.21333rem;
        margin-left: 0.35rem;
    }

    .customerModal {
        border-top: 1px solid #f3f3f3;
        background: #fff;
        overflow: hidden;
        text-align: center;
        line-height: 1.2;

        img {
            width: 0.6rem;
            height: 0.6rem;

            &.exlogin {
                margin-top: 0.253rem;
                width: 34px;
                height: 42px;
            }
        }

        span {
            display: block;
            margin-left: 0.30rem;
            font-size: 18px;
            color: #8e8e8e;
        }
    }

    .floatingWindow {
        position: fixed;
        background: #8c8c8c;
        width: 100px;
        height: 100px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        bottom: 2.5rem;
        right: 0.5rem;
        font-size: 42px;
        color: #fff;
        text-align: center;
        line-height: 1.3rem;
    }

    .btnBox {
        height: 118px;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
        display: flex;
        justify-content: center;
        align-content: center;
        div{
            flex: 1;
            height: 118px;
            line-height: 118px;
            text-align: center;
        }
        button {
            vertical-align: middle;
            width: 320px;
            height: 80px;
            background: rgba(255, 255, 255, 1);
            border-radius: 44px;
            border: 1px solid rgba(225, 3, 18, 1);
            font-size:32px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(225,3,18,1);
        }
    }
</style>
<style>
    .myPopup .md-popup-box {
        height: 82% !important;
    }

    .download {
        color: #d7000f;
        text-align: justify;
    }
</style>

