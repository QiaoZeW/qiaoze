<template>
    <section class="prolist-mod">
        <ul>
            <li v-for="(item,key) in proList">
                <a :href="item.href">
                    <img :src="item.maxImage" alt="">
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'wxprolist',
        components: {},
        data() {
            return {
                proList: [
                    {
                        maxImage:require('../../assets/imgs/wechat/banner.png'),
                        href:  this.$router.siteUrl() + '/activity/InvitationShare.html?inviterCode=CPS_00010005'
                    },
                    {
                        maxImage:require('../../assets/imgs/wechat/investigation.png'),
                        href:  this.$router.siteUrl() + '/wechat/WxInvestigation.html'
                    },
                    {
                        maxImage:require('../../assets/imgs/wechat/sign.png'),
                        href:  this.$router.siteUrl() + '/cms/Download.html'
                    },
                    {
                        maxImage:require('../../assets/imgs/wechat/draw.png'),
                        href:  this.$router.siteUrl() + '/cms/Download.html'
                    }
                ],
            }
        },
        created() {
            document.title = '活动列表'
        },
    }
</script>

<style lang="scss" scoped>
    .prolist-mod{padding:30px;}
    .prolist-mod li{border-radius: 8px;overflow: hidden;margin-top:35px;}
    .prolist-mod li:first-child{margin-top:0}
    .prolist-mod li img{width: 100%;}
</style>
