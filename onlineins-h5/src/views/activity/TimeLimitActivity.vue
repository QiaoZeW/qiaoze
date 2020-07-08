<template>
    <div class="box">
        <img :src=item.imgUrl alt=""  v-for="(item,key) in imgData" @click="portal(key)">
    </div>
</template>

<script>
    export default {
        name: 'TimeLimitActivity',
        components: {
        },
        created(){
            let _this = this
            setupWebViewJavascriptBridge(function(bridge) {
                //导航是否显示分享按钮
                bridge.callHandler(
                    "navigationConfig",
                    {
                        flag_show: 1,
                        flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                        flag_share:  1, //是否显示分享按钮，1-显示 0-不显示
                        flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                        share_url:
                            _this.$router.siteUrl() +
                            "/activity/TimeLimitActivity.html" ,
                        share_title: "@康惠保系列老客户，您的保额可以追加啦！", //分享标题
                        share_text: "应广大老客户需求，重疾保额最高可到70万。点击了解详情>>", //分享描述
                        share_imgurl:_this.$router.siteUrl() + _this.shareImg //分享图片地址
                    },
                    function(response) {
                        //alert(response,'');
                    }
                );
            });
        },
        data() {
            return {
                flag:true,
                shareImg: require("@/assets/imgs/timeLimitActivity/wxshare.png"),
                imgData:[
                    {
                        imgUrl: require('../../assets/imgs/timeLimitActivity/top.png'),
                    },
                    {
                        imgUrl: require('../../assets/imgs/timeLimitActivity/portal.png'),
                    },
                    {
                        imgUrl: require('../../assets/imgs/timeLimitActivity/bottom.png'),
                    }
                ]
            }
        },
        methods: {
            portal(key){
                if(this.flag){
                    this.flag = false
                    if(key === 1){
                        location.href = '/product/Detail.html?product_id=125'
                    }
                }

            }
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../assets/app";
    .box{
        background: url("../../assets/imgs/timeLimitActivity/bg.png") no-repeat;
        background-size: 100%;
        padding: 755px 24px 16px 24px;
    }
</style>

