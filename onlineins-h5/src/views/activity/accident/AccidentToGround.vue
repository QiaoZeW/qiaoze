<template>
    <section>
        <img src="@/assets/imgs/bonusInsure/bg02.png" class="bgTop"/>
        <div class="btnSubmit">
            <p @click="goFollow.open = true">关注领30万意外险</p>
        </div>
        <p class="rule" @click="showRuleDialog.open = true">活动规则</p>
        <md-dialog
            :closable="true"
            v-model="showRuleDialog.open"
        >
            <p class="actRule">
                <strong>一、活动时间：</strong> 10月14日<br/>
                <strong>二、活动内容：</strong><br/>
                1）关注百年人寿生活号，即可获得30万交通意外险0元领取资格<br/>
                2）30万交通意外险责任包含：10万保额营运汽车意外伤害和20万保额营运火车意外伤害<br/>
                3）该活动允许参与年龄：18周岁-75周岁（投保人和被保人皆需满足此年龄条件，方可参与活动）<br/>
                4）每位用户仅可享受一份30万交通意外险<br/>
                <strong> 三、Iphone奖品与苹果公司无关<br/></strong>
                <strong>四、活动最终解释权归百年人寿所有</strong>
            </p>
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="goFollow.open"
        >
            <p class="dialogTitle">是否关注百年人寿生活号</p>
            <div class="dialogBtn">
                <p>立即关注</p>
                <p @click="goFollow.open = false">暂不关注</p>
            </div>
        </md-dialog>
    </section>
</template>

<script>
    import {Dialog} from 'mand-mobile'

    export default {
        name: "AccidentToGround",
        data() {
            return {
                showRuleDialog: {
                    open: false
                },
                goFollow: {
                    open: false
                },
            }
        },
        methods: {
            hidePopUp() {
                this.goFollow.open = false
            }
        },
        components: {
            [Dialog.name]: Dialog,
        }
    }
</script>

<style lang="scss" scoped>
    .actRule {
        font-size: 28px;
        color: #333;
        margin-bottom: .5rem;
    }

    .dialogTitle {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
        text-align: center;
    }

    .bgTop {
        width: 100%;
        height: 1012px;
    }

    .dialogBtn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .7rem;
        p:first-child {
            background: linear-gradient(top, #FF837F, #F5504A);
            background: -webkit-linear-gradient(top, #FF837F, #F5504A);
            color: #fff;
        }
        p:nth-child(2) {
            background: #fff;
            color: #CCCCCC;
            border: 1px solid #D0D0D0;
        }
        p {
            margin-top: .5rem;
            text-align: center;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            width: 402px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
        }
    }

    .rule {
        font-size: 28px;
        font-family: FZLTZHUNHPro;
        font-weight: normal;
        color: rgba(228, 254, 252, 1);
        line-height: 56px;
        text-align: center;
        margin-top: 56px;
    }

    .btnSubmit {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        p {
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            width: 572px;
            height: 88px;
            line-height: 88px;
            background: linear-gradient(top, #FF837F, #F5504A);
            background: -webkit-linear-gradient(top, #FF837F, #F5504A);
            box-shadow: 0 .125em .125em #D8342E;
        }
    }
</style>
<style lang="scss">
    html, body {
        background: #77CCBE;
    }

</style>
