<template>
    <div style="position: relative;">
        <img src="@/assets/imgs/headlinesPic/bgTop.png" class="bgTop"/>
        <img src="@/assets/imgs/headlinesPic/bgCenter.png" class="bgCenter"/>
        <div class="btn"> <button @click="goDownload" >下载百年人寿APP</button>  </div>
        <div class="introduction">
            ©百年人寿保险股份有限公司版权所有 <br> 辽ICP备09014139号-1 <br> 全国客服热线：95542
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeadLinesLanding",
        data(){
            return{
                isIos:false,
                isAndroid:false,
                secondaryDistributor:'',
                iosAdd:'',
                androidAdd:''
            }
        },
        created(){
            document.addEventListener("visibilitychange",  ()=> {
                if (!document.hidden) {
                    window.location.href = this.$router.siteUrl() + '/activity/HeadLinesLanding.html'
                }
            }, false);
            this.secondaryDistributor = window.localStorage.getItem('secondaryDistributor')
            var ua = window.navigator.userAgent.toLowerCase()
            var u = navigator.userAgent.toLowerCase()
            this.isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            this.getAppUrl()
        },
        methods:{
            getAppUrl () {
                if (this.isAndroid) {
                    this.$request({
                        url: `/config/getBySysKey`,
                        params: {sysKey: `${this.secondaryDistributor}hd`},
                        contentType: 'application/json',
                        method: 'POST',
                        successFn: (data) => {
                            if (data && data.sysValue) {
                                this.androidAdd = data.sysValue
                                if(this.$router.query('quickJump')){window.location.href = data.sysValue}

                            }
                        }
                    })
                }
                if(this.isIos){
                    this.$request({
                        url: `/app/version/ios`,
                        successFn: (data) => {
                            if (data && data.packageUrl) {
                                this.iosAdd = data.packageUrl
                                if(this.$router.query('quickJump')){window.location.href = data.packageUrl}
                            }
                        },
                        errorFn: (data) => {
                        }
                    })
                }
            },
            goDownload(){
                if(this.isIos){
                    window.location.href = this.iosAdd
                }else if(this.isAndroid){
                    window.location.href = this.androidAdd
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn{
        width: 100%;
        position: absolute;
        top: 12.4rem;
        display: flex;
        justify-content: center;
        a{
            display: inline-block;
            line-height: 88px;
            background: #D02A2A;
            margin: 0 auto;
            width: 570px;
            height: 88px;
            font-size:32px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color: #fff;
            text-align: center;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
        }
    }
    .bgTop {
        height: 1092px;
    }
    .bgCenter{
        margin-top: 46px;
        height: 684px;
    }
    .introduction{
        margin-top: 32px;
        padding: 50px 0 62px;
        text-align: center;
        font-size: 28px;
        color: #fff;
        background: #71727A;
        line-height:40px;
    }
</style>
