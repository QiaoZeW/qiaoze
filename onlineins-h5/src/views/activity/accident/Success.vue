<template>
    <section>
        <img src="@/assets/imgs/bonusInsure/bg01.png" class="bgTop"/>
        <div class="btnSubmit">
            <p @click="goHome">更多精彩</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "AccidentToGround",
        data(){
           return{
               shareImgUrl:require('@/assets/imgs/bonusInsure/shareImg.png')
           }
        },
        created(){
            sessionStorage.clear()
         let  secondaryDistributor = this.$router.query("secondaryDistributor") || '',
              thirdClassDistributor = this.$router.query("thirdClassDistributor") || '';
               let options = {}
                options.title = '最高30万交通意外险免费领',
                options.desc = '出行无忧，有我就go了！',
                options.href = location.href 
                options.link = this.$router.siteUrl() + `/activity/accident/Bonus.html?secondaryDistributor=${secondaryDistributor}&thirdClassDistributor=${thirdClassDistributor}`    
                options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(options)
        },
        methods:{
            goHome(){
                window.location.href = 'http://p.alipay.com/P/Qu6uUBuy'
            }
        }
    }
</script>

<style lang="scss" scoped>
    section{
        padding-bottom: 1rem;
    }
    .bgTop{
        width: 100%;
        height: 1012px;
    }
    .btnSubmit{
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        p{
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            font-size: 32px;
            color: #fff;
            text-align: center;
            width: 572px;
            height: 88px;
            line-height: 88px;
            background: linear-gradient(top,#FF837F,#F5504A);
            background: -webkit-linear-gradient(top,#FF837F,#F5504A);
            box-shadow: 0 .125em .125em #D8342E;
        }
    }
</style>
<style lang="scss">
    html,body{
        background: #77CCBE;
    }

</style>
