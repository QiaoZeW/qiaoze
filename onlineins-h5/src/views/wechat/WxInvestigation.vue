<template>
    <section>
        <div class="bgTop">
            <img src="@/assets/imgs/investigation/bgTop.png"/>
            <p class="bgTopTitle">回访调研有礼</p>
            <p class="bgTitle">说就“兑”了</p>
        </div>

        <div class="bgMid">
            <img src="@/assets/imgs/investigation/bgCharacter.png"/>
            <p class="bgMidTop">邀请您参加保单回访调研活动</p>
            <p class="bgMidCharacter">说出您对百年产品、APP的宝贵建议或意见</p>
        </div>
        <div class="bgBottom">

            <img src="@/assets/imgs/investigation/bgMid.png"/>
            <p class="parOne">最高可得</p>
            <p class="parTwo">20000</p>
            <p class="parThree">百佳豆</p>
            <p class="parFour">兑换精彩好礼</p>
            <div class="parT">
                <p class="parFive" @click="openPopups">立即参与</p>
            </div>

        </div>
    </section>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'

    export default {
        name: "WxInvestigation",
        created() {
            document.title = '回访调研'
        },
        methods: {
            openPopups() {
                //下载app
                // Toast({content: "正在跳转至App下载..."})
                this.$app.downLoadApp()
                return false
            },
        }
    }
</script>

<style lang="scss" scoped>
    section {
        .bgTop {
            position: relative;
            img {
                width: 100%;
                height: 244px;
            }
            .bgTopTitle {
                position: absolute;
                font-size: 56px;
                font-weight: 600;
                color: #fff;
                top: 38px;
                width: 100%;
                text-align: center;
            }
            .bgTitle {
                position: absolute;
                font-size: 64px;
                font-weight: 600;
                color: #FED53F;
                top: 122px;
                width: 100%;
                text-align: center;
            }
        }
        .bgMid {
            height: 122px;
            margin: 0 auto;
            margin-top: 42px;
            text-align: center;
            img {
                width: 442px;
                height: 102px;
                display: inline-block;
            }
            .bgMidTop {
                font-size: 34px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                line-height: 48px;
                text-align: center;
                padding-top: 20px;
            }
            .bgMidCharacter {
                font-size: 23px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 32px;
                text-align: center;
                padding-top: 15px;
            }
        }
        .bgBottom {
            position: relative;
            img {
                height: 638px;
                width: 494px;
                margin: 0 auto;
                margin-top: 1.5rem;
            }
            p {
                position: absolute;
                text-align: center;
                width: 100%;
            }
            .parOne {
                top: 48px;
                font-size: 36px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(255, 162, 0, 1);
                line-height: 50px;
            }
            .parTwo {
                position: absolute;
                top: 1.3rem;
                font-size: 82px;
                font-family: FZLTTHJW--GB1-0;
                font-weight: bold;
                color: rgba(255, 162, 0, 1);
                line-height: 104px;
            }
            .parThree {
                position: absolute;
                top: 206px;
                font-size: 36px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(255, 162, 0, 1);
                line-height: 50px;
            }
            .parFour {
                position: absolute;
                top: 358px;
                font-size: 34px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 48px;
            }
            .parT {
                width: 100%;
                position: absolute;
                top: 468px;
                height: 88px;
            }
            .parFive {
                width: 360px;
                height: 88px;
                left: 2.5rem;
                background: #FFDD63;
                -webkit-border-radius: 70px;
                -moz-border-radius: 70px;
                border-radius: 70px;
                line-height: 88px;
                font-size: 32px;
                font-weight: 600;
                color: rgba(224, 42, 42, 1);
            }
        }
    }
</style>
