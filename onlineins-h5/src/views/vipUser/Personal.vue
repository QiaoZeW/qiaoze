<template>
    <div>
        <div class="picTitle">
            <p class="contTitle">专属顾问</p>
            <p class="contDes">百年福利送不停</p>
        </div>
        <div class="description">
            <h3>权益说明</h3>
            <p class="wenZi parP">获得权益的用户，将获得平台一对一专属健康顾问服务</p>
        </div>


    </div>
</template>

<script>
    import {Landscape, Toast, Button} from 'mand-mobile'

    export default {
        name: "vipUser",
        components: {
            [Landscape.name]: Landscape,
            [Button.name]: Button,
        },
        data() {
            return {
            }
        },
        created(){
            document.title = '专属顾问'
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";

    .picTitle {
        width: 100%;
        height: 384px;
        background: url("../../assets/imgs/vip/personal@2x.png") no-repeat left top;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: relative;
        .contTitle {
            position: absolute;
            font-size: 40px;
            color: #D8BB89;
            left: 30px;
            top: 160px;
        }
        .contDes {
            position: absolute;
            font-size: 24px;
            color: #D8BB89;
            left: 30px;
            top: 3.2rem;
        }
    }

    .description {
        padding: 0 35px;
        margin-top: 40px;
    }

    h3 {
        font-size: 32px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
    }

    .parP {
        border-bottom: 1px solid #f2f2f2;
    }

    .wenZi {
        margin-top: 12px;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(107, 117, 145, 1);
        line-height: 36px;
        padding-bottom: 40px;
    }

    .rule {
        padding: 0 35px;
        margin-top: 40px;
    }

    .contBottom {
        position: fixed;
        bottom: 0;
        height: 94px;
        width: 100%;
        background: url("../../assets/imgs/vip/goBottom.png") no-repeat left top;
        background-size: 100%;
        text-align: center;
        p {
            font-size: 32px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 94px;
        }
    }

    .contBottomS {
        position: fixed;
        bottom: 0;
        height: 94px;
        width: 100%;
        background: url("../../assets/imgs/vip/Rectangle 2@2x.png") no-repeat left top;
        background-size: 100%;
        text-align: center;
        p {
            font-size: 32px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 94px;
        }
    }

    .myPic {
        height: 718px;
        width: 542px;
        background: url("../../assets/imgs/vip/分组 6@2x.png") no-repeat left top;
        -webkit-background-size: 100%;
        background-size: 100%;
        position: relative;

        .popupTitle {
            font-size: 52px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 54px;
            text-align: center;
            padding-top: 100px;
        }
        .popupDescrible {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 34px;
            text-align: center;
        }
        .beanTitle {
            font-size: 36px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 0.2rem;
            text-align: center;
            padding-top: 1.4rem;
        }
        .beanDescrible {
            font-size: 44px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 60px;
            text-align: center;
        }
        .myKnow {
            display: flex;
            justify-content: center;
            .myKnowList {
                width: 360px;
                height: 88px;
                background: #fff;
                margin-top: 1.1rem;
                font-size: 32px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(198, 153, 76, 1);
                text-align: center;
                line-height: 88px;
                -webkit-border-radius: 50px;
                -moz-border-radius: 50px;
                border-radius: 50px;
            }

        }
    }

    .md-example-child-landscape {
        .md-button {
            margin-bottom: 20px;
        }
    }

    .md-landscape-content {
        padding: 30px;
        font-size: 30px;
        line-height: 1.5;
        color: #666;
        p {
            margin-bottom: 30px;
        }
    }
</style>
