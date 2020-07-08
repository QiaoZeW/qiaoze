<template>
    <div class="content">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <div class="content" v-for="(item,index) in codeResult">
            <md-cell-item :title="item.name + '产品条款'" arrow @click="goDetail(item.url)"  />
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
                isBrowser: true,
                cpsCode :'',
                detailList:[],
                showError: false,
                showWhirl: false,
                content:'',
                detail_id:'',
                clauseUrl:'',
                product_id:'',
                riskCode:'',
                codeResult:[],
                showHuo:null,
                click_flag:true,
                judgeRouter:false
            }
        },
        created(){
            this.isBrowser = this.$app.isBrowser();
            if(document.referrer.toString().indexOf('Detail')>-1){
                this.judgeRouter = true
            }
            document.title = '产品条款'
            this.cpsCode=window.localStorage.getItem("cps_secondaryDistributor")
            this.product_id = this.$router.query('product_id')
            this.$app.wxProductDetail(this.product_id, 1)
            this.loadRiskCode()
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('backHomeConfig', {
                    'flag_back': 0, //是否返回按钮，1-返回 0-不返回
                }, function (response) {
                });
            })
        },
        methods:{
            loadRiskCode(){
                this.$request({
                    url: `/ins/product/${this.product_id}`,
                    params: {
                        cpsCode:this.cpsCode
                    },
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.detailList = data.riskList
                        this.loadClause()
                        this.showWhirl = false
                    },
                    failFn: (data) => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            loadClause() {
                this.codeResult.length = 0;
                this.detailList.forEach((item)=>{
                    this.$request({
                        url: `/ins/product/productplatform/risk/getriskfileinfoinner`,
                        method: 'POST',
                        data: {
                            'riskFileQueryList': [
                                {
                                    riskCode: item.riskCode,
                                    type: 'T'
                                }
                            ]
                        },
                        contentType: 'application/json',
                        successFn: (data) => {
                            let _item = {
                                "url":data.riskFileResultList[0].url,
                                "name":item.riskName
                            };
                            this.codeResult.push(_item);
                        }
                    })
                })

            },
            goDetail(url){
                if (!this.click_flag) {
                    return false;
                }
                this.click_flag = false;
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if (url.indexOf("https://yxfile") > -1) {
                    this.$app.goPdfView(url);
                }
                if(isAndroid && !this.isBrowser){
                    window.location.href =
                        this.$router.siteUrl() +
                        "/product/NoticeAndroidDetail.html?pdf_url=" + url;
                    // this.$app.goPdfView(url);
                } else {
                    this.$app.goPdfView(url);
                }
                setTimeout(()=>{
                    this.click_flag = true
                },3000)
            }
        },
        updated(){
        }
    }
</script>

<style scoped lang="scss">
    .content{
        width: 94%;
        margin-left: 3%;
        margin-bottom: .5rem;
        margin-top: .5rem;
    }
</style>
