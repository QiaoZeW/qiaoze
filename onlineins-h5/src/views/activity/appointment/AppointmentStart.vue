<template>
    <section>
        <div class="contentTop" :style="{'backgroundImage': `url(${imgObj.picLoad})`}">
            <img :src="imgObj.startTitle" class="start_title" />
        </div>
        <SendCode v-if="!isLogin" class="smsCodeStyle" :showNeedTip="false" :btnText="btnText"
                  @query_prize="query_prize"/>
        <img :src="imgObj.picLoad"  alt="" style="display: none">
        <img :src="imgObj1.picLoad"  alt="" style="display: none">

        <AppPopup  :showAddress="showAddress" @closeAdd="closeAdd"/>
        <md-landscape v-model="showNoPrize" :mask-closable="true" class="showMyLand">
            <div class="noPrize">
                <h2>您没有可领取的服务<br>或领取时效已过期</h2>
                <p v-show="showDate">金鼠送福  瓜分百万口腔健康服务</p>
                <div  class="btn">
                    <button class="btn_confirm" @click="goDetail">{{ isZiying ? '我要领取' : '我知道了'}}</button>
                    <!-- <button class="btn_cancel"  v-else @click="showNoPrize = false">取消</button> -->
                </div>
            </div>
        </md-landscape>
    </section>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import SendCode from "@/components/smsCode/SendCode";
    import AppPopup from "./AppPopup";
    // import { navGoBack } from "@/utils/utils"
    export default {
        name: "AppointmentStart",
        data() {
            return {
                isZiying: false,
                btnText: '查看我的服务',
                isLogin: false,
                showNoPrize:false,
                prizeOneNum:0,
                prizeTwoNum:0,
                prizeThreeNum:0,
                isReceiveOne:false,
                isReceiveTwo:false,
                showAddress:false,
                person:{},
                proposerPhone:'',
                showDate:true,
                isFeb: true,
                secondaryDistributor:'',
                isNew:'',
                imgObj: {
                    picLoad:require('@/assets/imgs/appointment/appointmentStartLogin.png'),
                    startTitle:require('@/assets/imgs/appointment/start_title.png')
                },
                imgObj1: {
                    picLoad:require('@/assets/imgs/appointment/appointmentStartLogin1.png'),
                    startTitle:require('@/assets/imgs/appointment/start_title1.png')
                }
            }
        },
        created(){
            this.secondaryDistributor = this.$router.query("secondaryDistributor") || '';
            // 判断是否是自营渠道
            this.getIsOwns()
            let data = JSON.parse(sessionStorage.getItem('IS_LOGIN'))
            this.proposerPhone  = JSON.parse(sessionStorage.getItem('LOGIN_NUM')) || ''
            if(this.secondaryDistributor){
                this.getLinkUrl()
            }
            if(data){
                this.isLogin = true
                this.person = sessionStorage.getItem('PERSON_INFO') ? JSON.parse(sessionStorage.getItem('PERSON_INFO')) : {}
                this.goTicket()
            }
        },
        mounted(){
            const targetDate = new Date('2020/1/21').getTime() || 1580486400000
            if(new Date().getTime() < targetDate){
                this.showDate = true
                this.isFeb = false
            }else{
                this.imgObj = Object.assign({}, this.imgObj1)
                this.btnText = '查询奖品'
                this.showDate = false
                this.isFeb = true
                document.title = "贺新年 百年有礼了"
            }
        },
        methods: {
            getIsOwns () {
                this.$request({
                    url: `/cps/getIsOwns/${this.secondaryDistributor}`,
                    successFn: data => {
                      // 判断渠道是否自营接口
                      this.isZiying = data
                    },
                    failFn: data => {
                        Dialog.alert({ content: data.resultMsg });
                    }
                });
            },
            goTicket() {
                location.href = '/activity/appointment/AppService.html?iphone=' + this.proposerPhone
            },
            closeAdd(){
                this.showAddress = false
            },
            showAdd(){
                this.showAddress = false
            },
            getLinkUrl(){
                this.$request({
                    url: `/act/actSubscribe/getIsNew/${this.secondaryDistributor}`,
                    contentType: 'application/json',
                    successFn: (data) => {
                        this.isNew = data
                    },
                    failFn: (data) => {
                        Toast.info(data.resultMsg)
                    }
                })
            },
            goDetail(){
                this.showNoPrize = false
                if (this.isZiying) {
                   let url = `/activity/appointment/AppLanding.html?secondaryDistributor=${this.secondaryDistributor}&isNew=${this.isNew}`
                   if (this.isFeb) {
                       url = `/activity/Lover/Lover.html?secondaryDistributor=${this.secondaryDistributor}&isNew=${this.isNew}`
                   }
                   location.href = url
                }
            },
            query_prize(item) {
                this.proposerPhone = item
                console.log(item);
                this.$request({
                    url: `/act/actSubscribeRewardRecord/getActSubscribeRewardRecord`,
                    method: 'POST',
                    isLoading: true,
                    data:{"mobile" : item},
                    contentType: 'application/json',
                    successFn: (data) => {
                        console.log(data);
                        this.isLogin = true
                        sessionStorage.setItem("IS_LOGIN", JSON.stringify(data))
                        sessionStorage.setItem("LOGIN_NUM", JSON.stringify(item))
                        if(data.ticketReceiver){
                            this.person.name = data.ticketReceiver.receiverName
                            this.person.iphone = data.ticketReceiver.receiverMobile
                            this.person.areaAdd = data.ticketReceiver.area
                            this.person.detailAdd = data.ticketReceiver.address
                            sessionStorage.setItem("PERSON_INFO", JSON.stringify(this.person))
                        }
                        this.goTicket()
                    },
                    failFn: (data) => {
                        if(data.resultCode === 'SYS_ERROR_0120'){
                            this.showNoPrize = true
                        }else{
                            Toast({
                                content: data.resultMsg,
                            })
                        }
                    }
                })
            }
        },
        filters:{
            phoneFilter(value){
                return   value.substr(7, 4);
            }
        },
        components: {
            SendCode,
            AppPopup
        }
    }
</script>

<style lang="scss" scoped>
    .contentTop {
        height: 881px;
        padding-top: 55px;
        width: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
        .start_title{
            width: 710px;
            height: 154px;
            margin: 0 auto;
        }
    }

    .smsCodeStyle {
        margin-top: -2.5rem !important;
    }
    .noPrize{
        width: 540px;
        height: 4.41333rem;
        background: #fff;
        border-radius: 10px;
        padding-top: 98px;
        h2{
            font-size:36px;
            font-family:PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            text-align: center;
        }
        p{
            font-size:30px;
            color: #ef962e;
            margin-top: 46px;
            text-align: center;
        }
        .btn_confirm{
            width:402px;
            height:88px;
            background:linear-gradient(0deg,rgba(255,186,64,1),rgba(255,216,147,1));
            -webkit-background:linear-gradient(0deg,rgba(255,186,64,1),rgba(255,216,147,1));
            border-radius:44px;
            color:rgba(180,29,28,1);
            font-size: 32px;
        }
        .btn_cancel{
            width:402px;
            height:88px;
            background:linear-gradient(0deg,#b4b4b4,#e2e2e2);
            -webkit-background:linear-gradient(0deg,#b4b4b4,#e2e2e2);
            border-radius:44px;
            color:#fff;
            font-size: 32px;
        }
        .btn{
            margin-top: 77px;
            display: flex;
            justify-content: center;
        }
    }
    .contentBody{
        width: 100%;
        margin-top: -1.5rem;
        padding-bottom: 321px;
    }
    .prize_know{
        background:#D62221 ;
        width: 656px;
        margin: 0 auto;
        height: 364px;
        border: 4px solid #FFD893;
        border-radius: 20px;
        position: relative;
        .prize_know_title{
            position: absolute;
            width: 553px;
            height: 102px;
            top: -.4rem;
            left: 50%;
            margin-left: -276.5px;
        }
        .prize_know_des{
            font-size:26px;
            font-family:FZLanTingHeiS-R-GB;
            color:rgba(255,216,147,1);
            line-height:42px;
            max-width: 575px;
            margin: 1.3rem auto 0;
            a{
                font-size:26px;
                text-decoration:underline;
                color:rgba(48,0,255,1);
            }
        }
    }
</style>
<style lang="scss">
    .showMyLand .md-landscape-content {
        width: 100% !important;
    }
    .showMyLand .md-icon-close:before {
        content: '' !important;
    }
    html, body {
        background: #B71D1E;
    }
</style>
