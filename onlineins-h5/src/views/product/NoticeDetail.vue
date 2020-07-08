<template>
    <div class="content">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div v-html="content">

        </div>
    </div>
</template>

<script>
    import {Field, CellItem, Dialog, Icon} from 'mand-mobile'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    export default {
        name: "insureNotice",
        components: {
            [Field.name]: Field,
            [CellItem.name]: CellItem,
            [Icon.name]: Icon,
            Whirl,
            Error
        },
        data(){
            return{
                detailList:[],
                showError: false,
                showWhirl: false,
                content:'',
                detail_id:'',
                product_id:'',
                cpsCode:localStorage.getItem('cps_secondaryDistributor') || ''
            }
        },
        created(){
            document.title = '投保须知'
            this.product_id = this.$router.query('product_id')
            this.$app.wxProductDetail(this.product_id, 1)
            //this.detail_id = this.$router.query('detail_id')
            this.showWhirl = true
            this.loadInsureNotice()
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('backHomeConfig', {
                    'flag_back': 0, //是否返回按钮，1-返回 0-不返回
                }, function (response) {
                });
            })
           //设置不分享
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'title': '', //标题
                    'flag_share': 0, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': '', //分享跳转的url
                    'share_title': '', //分享标题
                    'share_text': '', //分享描述
                    'share_imgurl': '' //分享图片地址
                }, function (response) {
                })
            })
        },
        methods:{
            loadInsureNotice(){
                this.$request({
                    url: `/ins/product/insProductNotice/${this.product_id }?cpsCode=${this.cpsCode}`,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.showWhirl = false
                       // this.content = data[this.detail_id].noticeContent
                         this.content = data[0].noticeContent
                    },
                    failFn: (data) => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .content{
        width: 94%;
        margin-left: 3%;
        padding-bottom: .5rem;
        padding-top: .5rem;
        overflow-x: hidden;
    }
</style>
