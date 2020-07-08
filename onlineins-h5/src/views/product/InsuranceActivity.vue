<template>
    <div class="box">
        <img class="insurance-activity" src="../../assets/imgs/activity-title.png" alt="">
        <ul class="medical_insurance">
            <div class="top">
                <img src="../../assets/imgs/shield.png" alt="">
                <span>平台专享 医疗保险</span>
            </div>
            <li class="insuranceList" v-for="item in insurance" >
                <div class="left">
                    <a :href=item.productUrl><img class="insurance_img" :src=item.url alt="" /></a>
                </div>
                <div class="right">
                    <p class="insurance_title">{{item.title}}</p>
                    <p class="insurance_content">{{item.content}}</p>
                    <p class="insurance_price"><span class="price-l">￥</span><span class="price-r">{{item.price}}</span>&nbsp;&nbsp;起</p>
                    <button class="insurance_btn" @click="clickInsure(item)">立即投保</button>
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
                        label:'医无忧',
                        title: '医无忧特定疾病医疗保险',
                        content: '给中老年人定制的百万医疗',
                        price: 58,
                        url:require("../../assets/imgs/Insurance1.jpg"),
                        productUrl:'/product/Detail.html?product_id=124'
                    },
                    {
                        label:'医惠通',
                        title: '医惠通费用补偿医疗保险',
                        content: '6年保证续保，最高赔付400万',
                        price: 147,
                        url:require("../../assets/imgs/Insurance2.jpg"),
                        productUrl:'/product/Detail.html?product_id=123'
                    }
                ]
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
    .box{
        display: flex;
        flex-direction: column;
        padding: .35rem;
        background: url("../../assets/imgs/Insurance-activity.jpg") no-repeat;
        background-size: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    //保险活动标题
    .insurance-activity{
        margin: .61rem auto;
        width: 80%;
    }

    //医疗保险
    .medical_insurance{
        width: 100%;
        height: auto;
        background: #62d9f2;
        border-radius: 18px;
        display: flex;
        padding:.56rem .46rem;
        flex-direction: column;
        box-sizing: border-box;
        margin-top: 1.2rem;
        .top{
            color: #077f6a;
            font-weight: bold;
            position: relative;
            img{
                position: absolute;
                width: 3.4rem;
                top: -1.8rem;
                left: -0.4rem;
            }
            span{
                position: absolute;
                right: 1rem;
                font-size: .53rem;
            }
        }
    }

    //保险list
    .insuranceList{
        width: 100%;
        background: #fff;
        padding: 0.36rem;
        display: flex;
        box-sizing: border-box;
        margin: .17rem 0;
        border-radius: 16px;
    }
    .medical_insurance li:nth-of-type(1){
        margin-top:1rem;
    }

    //保险图片
    .insurance_img{
        width: 2.5rem;
        margin-right: .36rem;
        border-radius: 16px;
    }

    //保险标题
    .insurance_title{
        color: #515d7a;
        font-size: .36rem;
        font-weight: bold;
    }

    //保险内容
    .insurance_content{
        color: #747d95;
        font-size: .29rem;
        margin-top: 0.08rem;
    }

    //保险价格
    .insurance_price{
        color: #515d7a;
        font-size: .33rem;
        .price-l{
            color:#ff1d38;
            font-size: .39rem;
            position: relative;
            top: -1px;
            font-weight: bold;
        }
        .price-r{
            color:#ff1d38;
            font-size: .72rem;
            font-style:oblique;
            font-family: Impact,Helvetica;
            font-weight: bold;
        }
    }

    //立即投保btn
    .insurance_btn{
        background-size: 100%;
        background:#347dd2;
        border-radius: .3rem ;
        color:#fff;
        text-align: center;
        line-height: .59rem;
        width: 2.15rem;
        height: .59rem;
        font-size: .3rem;
        box-shadow: 0px 3px 4px 1px rgba(252,175,175,1);
    }
</style>

