<template>
    <div class="box">
        <img src="@/assets/imgs/newBickness/bgTop@2x.png" class="bgTop"/>
        <img class="linkImg" v-if="showLinkImg" :src="linkImgUrl" alt="" @click="goLink">
        <ul class="medical_insurance">
            <li class="insuranceList" v-for="(item, index) in insurance" :key="index">
                <div class="top">
                    <p class="insurance_label"><img :class="item.active01?'img01':'img02'"  :src="item.title_url" alt=""></p>
                    <p :class="item.active01?'insurance_title01':'insurance_title02'"  v-html="item.title"></p>
                </div>
                <div class="down">
                    <div class="left">
                        <a :href=item.productUrl><img class="insurance_img" :src=item.url alt="" /></a>
                    </div>
                    <div class="right">
                        <ul class="insurance_details">
                            <li>{{item.details.content1}}</li>
                            <li>{{item.details.content2}}</li>
                            <li style="color:rgba(48, 159, 182, 1);">{{item.details.content3}}</li>
                            <!-- <li class="particular">{{item.details.content4}}</li> -->
                            <div class="outbreak">
                                <div class="giving"><p>赠</p></div>
                                <div class="medicine">
                                    <p>{{item.details.content4}}</p>
                                    <p>{{item.details.content5}}</p>
                                </div>
                            </div>
                        </ul>
                        <div class="insurance_buy">
                            <div class="insurance_price">
                                <span class="price-l">￥</span>
                                <span class="price-r">{{item.price}}</span>
                                <span class="price-m">起</span>
                            </div>
                            <button class="insurance_btn" @click="clickInsure(item)">立即投保</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'InsuranceActivity',
        components: {
        },
        created(){
            //为了兼容小程序
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload();
                }
            }, false);
            this.processParams();
            this.insurance = this.getInsuranceList();
            if (this.$app.isBrowser() || (this.$app.isMiniProgram()&&this.$app.isBnMiniApp())) {
                this.showLinkImg = true
                if (new Date() > new Date('2020/3/1')) {
                  this.linkImgUrl = require('@/assets/imgs/activityToGround/mar.png')
                }
            }
        },

        mounted(){
            setupWebViewJavascriptBridge( (bridge)=> {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'title': '', //标题
                    'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': this.$router.siteUrl() + '/activity/BnSickness.html?secondaryDistributor=CPS_00010009&isbn='+this.isbn, //分享跳转的url
                    'share_title': '百年重疾险重磅升级', //分享标题
                    'share_text': '康惠保(2020版)&超倍保,性价比再超越', //分享描述
                    'share_imgurl':this.$router.siteUrl() + this.shareImg //分享图片地址
                }, function (response) {
                })
            })
            let options = {}
            options.href = location.href
            options.title = '百年重疾险重磅升级'
            options.desc = '康惠保(2020版)&超倍保,性价比再超越'
            options.link = this.$router.siteUrl() + '/activity/BnSickness.html?secondaryDistributor=CPS_00010009&isbn='+this.isbn
            options.imgUrl = this.$router.siteUrl() + this.shareImg
            this.$app.wxShareDetail(options)

        },
        data() {

            return {
                isbn:'',
                shareImg:require('@/assets/imgs/activityToGround/share.png'),
                insurance:[

                ],
                linkImgUrl: require('@/assets/imgs/activityToGround/feb.png'),
                showLinkImg: false
            }
        },
        methods: {
            goLink () {
                location.href = '/activity/Lover/Lover.html'
            },
            clickInsure (item){
                location.href=item.productUrl
            },
             processParams(){

            if (!this.$app.isBrowser()) {
                //如果是cps投保，需要提前保存cps相关信息
                let cps_thirdClassDistributor = this.$router.query("thirdClassDistributor");
                let cps_secondaryDistributor = this.$router.query("secondaryDistributor");
                cps_thirdClassDistributor ? window.localStorage.setItem("cps_thirdClassDistributor", cps_thirdClassDistributor) : window.localStorage.removeItem("cps_thirdClassDistributor");
                cps_secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", cps_secondaryDistributor) :  window.localStorage.removeItem("cps_secondaryDistributor");
                //微信小程序获得token
                if(this.$app.isMiniProgram()){
                    window.localStorage.removeItem('isbn');
                    this.isbn = this.$router.query("isbn")||'';
                    if('1'==this.isbn){
                        window.localStorage.setItem("isbn","1");
                    }
                    if(this.$app.isBnMiniApp()){
                        let code = this.$router.query("code");
                        this.$app.getMiniToken(code,(token,error)=>{
                            console.log('mini app token:',token);
                        });
                    }
                }
            }else{
                window.localStorage.setItem("cps_secondaryDistributor", "APP_00010001")
                this.cpsCode = "APP_00010001"
                console.log(this.cpsCode)
            }
        },
            getInsuranceList(){
                let isbn = this.isbn;
                let secondaryDistributor = window.localStorage.getItem("cps_secondaryDistributor")||'';
                let thirdClassDistributor = window.localStorage.getItem("cps_thirdClassDistributor")||'';
                let productId1= process.env.NODE_ENV === "production"?'130':process.env.NODE_ENV === "uat"?'124':'130';
                let productId2 = process.env.NODE_ENV === "production"?'128':process.env.NODE_ENV === "uat"?'121':'158';
                return [
                    {
                        title_url:require("@/assets/imgs/newBickness/title01Bg.png"),
                        title:  '重疾超级魔方 责任组合DIY',
                        details: {
                            content1:'重疾加码Plus，最高175%',
                            content2:'责任组合DIY',
                            content3:'附加400万医疗保障',
                            content4:'100万抗癌特药',
                            content5:'新冠肺炎危重型10万康复津贴',
                        },
                        price: 257,
                        url:require("@/assets/imgs/newBickness/product01.png"),
                        productUrl:`/product/Detail.html?product_id=${productId1}&isbn=${isbn}&secondaryDistributor=${secondaryDistributor}&thirdClassDistributor=${thirdClassDistributor}`,
                        active01:true
                    },
                    {
                        title_url:require("@/assets/imgs/newBickness/title02Bg.png"),
                        title:  '多次给付 超倍保护',
                        details:
                            {
                                content1:'重中轻症赔10次，重疾最高150%',
                                content2:'恶性肿瘤/心脑血管二次赔',
                                content3:'附加400万医疗保障',
                                content4:'100万抗癌特药',
                                content5:'新冠肺炎危重型10万康复津贴',
                            },
                        price: 337,
                        url:require("@/assets/imgs/newBickness/product02.png"),
                        productUrl:`/product/Detail.html?product_id=${productId2}&isbn=${isbn}&secondaryDistributor=${secondaryDistributor}&thirdClassDistributor=${thirdClassDistributor}`,
                        active01:false
                    }
                ];
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .bgTop{
       width: 100%;
       min-height: 730px;
    }
    .box{
        display: flex;
        flex-direction: column;
        background-color: rgba(254, 165, 146, 1);
        background-size: 100%;
    }
    .linkImg {
        position: fixed;
        right: 0;
        top: 30%;
        width: 212px;
        height: 212px;
        z-index: 999;
    }
    //保险活动标题
    .activity-title{
        margin: px2em(41px) auto 0 auto;
        img:nth-of-type(1){
            width: 7.08rem;
            height: 1rem;
        }
        img:nth-of-type(2){
            width: px2em(368px);
            height: px2em(33px);
            margin: px2em(28px) auto 0 auto;
        }
    }

    //医疗保险
    .medical_insurance{
        margin:-.4rem auto 0 auto;
        .insuranceList:nth-of-type(2){
            margin-top: px2em(38px);
            margin-bottom: 1.5rem;
        }
    }
    .particular{
        color: #1EA4A9 !important;
        font-weight: bold !important;
    }
    //保险list
    .insuranceList{
        background: url("~@/assets/imgs/newBickness/bodyBg@2x.png");
        background-size: 100% 100%;
        width: px2em(706px);
        // height: px2em(425px);
        font-family:PingFangSC-Semibold;
        padding: px2em(43px) px2em(40px) px2em(42px) px2em(40px) ;
        box-sizing: border-box;

        //保险标题
        .top{
            text-align: center;
            position: relative;
            .insurance_label{
                font-size:px2em(38px);
                font-weight:600;
                .img01{
                    margin: 0 auto;
                    width: 480px;
                    height: 48px;
                }
                .img02{
                    margin: 0 auto;
                    width: 365px;
                    height: 48px;
                }
            }
            .insurance_title01{
                font-size:px2em(26px);
                font-weight:400;
                color:rgba(213, 39, 28, 1);
                margin-top: 0.41rem;
                &:before {
                    content: '';
                    height: 1px;
                    position: absolute;
                    border-top: 3px solid  #D22934;
                    width: 64px;
                    top: 85%;
                    left: 12%;
                }
                &:after {
                    content: '';
                    height: 1px;
                    position: absolute;
                    border-top: 3px solid  #D22934;
                    width: 64px;
                    top: 85%;
                    left: 77%;
                }
            }
            .insurance_title02{
                font-size:px2em(26px);
                font-weight:400;
                color:rgba(213, 39, 28, 1);
                margin-top: 0.41rem;
                &:before {
                    content: '';
                    height: 1px;
                    position: absolute;
                    border-top: 3px solid  #D22934;
                    width: 64px;
                    top: 85%;
                    left: 20%;
                }
                &:after {
                    content: '';
                    height: 1px;
                    position: absolute;
                    border-top: 3px solid  #D22934;
                    width: 64px;
                    left: 69%;
                    top: 85%;
                }
            }
        }

        .down{
            margin-top: .36rem;
            display: flex;

            .right {
                margin-left: px2em(26px);
                flex: 1;
            }
        }

    }
    //保险内容
    .insurance_details{
        margin-left: 0.46rem;
        margin-top: px2em(9px);
        li{
            font-size:px2em(23px);
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(84,84,84,1);
            line-height:px2em(34px);
            white-space: nowrap;
            position: relative;

            &:before {
                content: '';
                width: 7px;
                height: 7px;
                position: absolute;
                background-color: #D22934;
                left: px2em(-26px);
                top: .15rem;
                border-radius: 50%;
            }
        }
    }

    //保险价格购买
    .insurance_buy{
        display: flex;
        justify-content: space-between;
    }
    //保险图片
    .insurance_img{
        width: px2em(206px);
        height: px2em(206px);
        border-radius: 10px;
    }
    //保险价格
    .insurance_price{
        color: #D22934;
        .price-l{
            font-size: px2em(42px);
            position: relative;
            top: -2px;
        }
        .price-r{
            font-size: px2em(60px);
            font-family: Impact,Helvetica;
            position: relative;
            font-weight: bold;
            left: -0.15rem;
        }
        .price-m{
            font-size: px2em(37px);
            position: relative;
            top: -3px;
            left: -0.17rem;
        }
    }

    //立即投保btn
    .insurance_btn{
        background:#D22934;
        border-radius: px2em(25px);
        color:#fff;
        text-align: center;
        font-weight: 400;
        line-height: px2em(49px);
        width:  px2em(176px);
        height:  px2em(49px);
        font-size: px2em(28px);
        /*box-shadow: 0px 3px 3px 1px rgba(255,61,13,1);*/
        margin-top: .22rem;
    }

    .outbreak {
        display:flex;
        width:388px;
        height:69px;
        align-items: center;
        background:rgba(255,234,231,1);
        border:1px solid rgba(240,78,67,1);
        border-radius:35px;
        margin-left:-30px;
        .giving {
            width:56px;
            height:56px;
            line-height: 56px;
            background:rgba(240,78,67,1);
            border-radius:50%;
            margin-left:10px;
            p {
                width:27px;
                height:29px;
                font-size:30px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(255,234,231,1);
                margin:auto;
            }
        };
        .medicine {
            padding-left:13px;
            p {
                height:22px;
                line-height: 22px;
                padding:2px 0;
                font-size:22px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(240,78,67,1);
            }
        }
    }
</style>
