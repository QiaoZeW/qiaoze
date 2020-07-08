<template>
    <section>
        <div class="contentTop">
            <h1>人生第一份保险</h1>
            <p>重疾险是管理健康风险的无二法宝</p>
            <p>一生罹患重疾的概率高达72.18%，做好保障很有必要</p>
        </div>

        <img src="@/assets/imgs/appointment/product_detail01.png" class="bgCenter01"/>
        <img src="@/assets/imgs/appointment/product_detail02.png" class="bgCenter02"/>
        <div class="contentBg">
            <div class="contentBottom">
                康惠保重疾险（2020版）
            </div>
            <div class="contentCenter">￥<span>257</span>元/年 起</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "AppointmentPro01"
    }
</script>

<style lang="scss" scoped>
    .contentTop {
        padding-top: 89px;
        background: #F0EEEE;
        padding-bottom: 24px;
        h1 {
            font-size: 60px;
            font-weight: 400;
            color: rgba(31, 26, 23, 1);
            text-align: center;
            margin-bottom: 36px;
        }

        p {
            font-size: 28px;
            font-family: FZLanTingHeiS-EL-GB;
            font-weight: 400;
            line-height: 40px;
            color: rgba(31, 26, 23, 1);
            text-align: center;
        }
    }
    .bgCenter01 {
        width: 100%;
        height: 364px;
    }

    .bgCenter02 {
        width: 100%;
        height: 470px;
    }

    .contentBottom {
        font-size: 40px;
        font-family: FZLanTingHeiS-R-GB;
        font-weight: 400;
        color: rgba(31, 26, 23, 1);
        margin-top: 29px;
        text-align: center;
    }

    .contentCenter {
        text-align: center;
        margin-top: 29px;
        font-size: 34px;
        font-family: FZHei-B01S;
        font-weight: 400;
        color: rgba(169, 19, 19, 1);

        span {
            font-size: 68px;
            font-family: FZZhengHeiS-B-GB;
            font-weight: 600;
            color: rgba(169, 19, 19, 1);
        }
    }
</style>
<style lang="scss">
    html,body{
        background: #f5f5f5;
    }
</style>
