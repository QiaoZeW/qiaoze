<template>
    <div class="box">
        <div class="activity-title">
            <img  src="@/assets/imgs/activity-title1.png" alt="">
            <img  src="@/assets/imgs/activity-title2.png" alt="">
        </div>
        <ul class="medical_insurance">
            <li class="insuranceList" v-for="item in insurance" >
                <div class="top">
                    <p class="insurance_label">{{item.label}}</p>
                    <p class="insurance_title"  v-html="item.title"></p>
                </div>
                <div class="down">
                    <div class="left">
                        <a :href=item.productUrl><img class="insurance_img" :src=item.url alt="" /></a>
                    </div>
                    <div class="right">
                        <ul class="insurance_details">
                            <li>{{item.details.content1}}</li>
                            <li>{{item.details.content2}}</li>
                            <li>{{item.details.content3}}</li>
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
            sensors.track("click_activity_sale", {});
        },
        data() {
            return {
                insurance:[
                    {
                        label:'医无忧特定疾病医疗保险',
                        title:  '给中老年人定制的<span style="color:#FF3D0D" >百万医疗</span>',
                        details: {
                                    content1:'三高/糖尿病/风湿患者都可保',
                                    content2:'恶性肿瘤及原位癌医疗保险金',
                                    content3:'特定手术医疗保险金200万',
                                 },
                        price: 58,
                        url:require("@/assets/imgs/Insurance1.jpg"),
                        productUrl:'/product/Detail.html?product_id=124'
                    },
                    {
                        label:'医惠通费用补偿医疗保险',
                        title:  '一站式解决<span style="color:#FF3D0D" >百万医疗</span>费用问题',
                        details: {
                                    content1:'6年保证续保，最高赔付400万',
                                    content2:'一般医疗200万',
                                    content3:'重疾医疗200万',
                                 },
                        price: 147,
                        url:require("@/assets/imgs/Insurance2.jpg"),
                        productUrl:'/product/Detail.html?product_id=123'
                    }
                ],
            }
        },
        methods: {
            clickInsure (item){
                location.href=item.productUrl
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .box{
        display: flex;
        flex-direction: column;
        padding: 0 px2em(22px);
        background: #99D8CD url('../../assets/imgs/Insurance-activity.png') top center no-repeat;
        background-size: 100%;
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
        margin:px2em(340px) auto 0 auto;
        .insuranceList:nth-of-type(2){
            margin-top: px2em(38px);
            margin-bottom: 1.5rem;
        }
    }
    //保险list
    .insuranceList{
        background: url("../../assets/imgs/insuranceList-bg.png") no-repeat;
        background-size: 100% 100%;
        width: px2em(706px);
        // height: px2em(425px);
        font-family:PingFangSC-Semibold;
        padding: px2em(43px) px2em(56px) px2em(42px) px2em(40px) ;
        box-sizing: border-box;

        //保险标题
        .top{
            text-align: center;
            .insurance_label{
                font-size:px2em(38px);
                font-weight:600;
                color:rgba(51,51,51,1);
            }
            .insurance_title{
                font-size:px2em(26px);
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-top: 0.41rem;
            }
        }

        .down{
            margin-top: px2em(42px);
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
            line-height:px2em(40px);
            white-space: nowrap;
            position: relative;

            &:before {
                content: '';
                width: px2em(8px);
                height: px2em(8px);
                position: absolute;
                background-color: #0B9A79;
                left: px2em(-26px);
                top: px2em(18px);
                border-radius: 50%;
            }
        }
    }

    //保险价格购买
    .insurance_buy{
        margin-top: 0.2rem;
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
        color: #FF3D0D;
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
        background:rgba(255,61,13,1);
        border-radius: px2em(25px);
        color:#fff;
        text-align: center;
        font-weight: 400;
        line-height: px2em(49px);
        width:  px2em(176px);
        height:  px2em(49px);
        font-size: px2em(28px);
        box-shadow: 0px 3px 3px 1px rgba(255,61,13,1);
        margin-top: .15rem;
    }
</style>

