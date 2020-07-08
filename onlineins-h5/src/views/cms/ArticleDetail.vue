<template>
    <section>
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
       <div class="part1">
           <div class="cms-mod">
               <div class="cms-tit">
                   {{ pageData.title }}
               </div>
               <div class="cms-tip">
                   <span>{{ pageData.auther }}</span>
                   <span>{{ myTime }}</span>
                   <span>{{ pageData.num }}</span>
               </div>
               <div class="cms-content" >
                   <div v-html="pageData.content" id="imgPar">

                   </div>
               </div>
           </div>

           <div>
               <ul>
                   <li v-for="(item,key) in articleProduct" class="productArticle">
                       <p>{{item.name}}</p>
                       <img :src="item.maxImage" alt="" @click="goDetail(item)">
                   </li>
               </ul>
           </div>


           <div>
               <ul>
                   <li v-for="(item,key) in articleList" class="productArticle">
                       <p>{{item.title}}</p>
                       <img :src="item.maxPicture" alt="" @click="goArticleDetail(item)">
                   </li>
               </ul>
           </div>
           <div class="cms-banner">
               <!--<div class="seat"></div>-->
               <div class="list" v-for="item in appArticleData">
                   <div class="tit">{{ item.title }}</div>
                   <img :src="item.attachmentUrl" alt=""  @click="goAdvertisement(item)">
               </div>
           </div>
           <div class="cms-banner"  v-if="isWeiXinBrowser">
               <!--<div class="seat"></div>-->
               <div class="list" v-for="item in shareArticleData">
                   <div class="tit">{{ item.title }}</div>
                   <img :src="item.attachmentUrl" alt="">
               </div>
           </div>
       </div>
        <div class="statusList" v-if="showList">
            <ul>
                <li @click="giveThumbsUp" > <img src="@/assets/imgs/article/thumbs_up.png" v-if="!showThumbsUp" /> <img ref="thumbs_uped" v-else src="@/assets/imgs/article/thumbs_uped.png" /><p>点赞 {{thumbsNum}}</p></li>
                <li @click="giveCollection" class="collection"><img src="@/assets/imgs/article/collection.png" v-if="!showCollection"/> <img v-else ref="collected" src="@/assets/imgs/article/collected.png" /><p>收藏 {{collectionNum}}</p></li>
                <li v-show="isShare"><img src="@/assets/imgs/article/share.png" @click="showShare()"/> <p>分享</p></li>
            </ul>
        </div>
    </section>

</template>

<script>
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import '@/assets/animate.min.css'
    import {  Toast } from 'mand-mobile'
    export default {
        name: 'Index',
        components: {
            Error,
            Whirl
        },
        data() {
            return {
                article_id: null,
                showError: false,
                showWhirl: false,
                myTime: '',
                pageData: {
                    title: '',
                    auther: '',
                    createTime: '',
                    content: '',
                    num: ''
                },
                isWeiXinBrowser:false,
                shareData: null,
                cmsAttachmentData: null,
                shareArticleData:[],
                appArticleData:[],
                articleProduct:[],
                articleList:[],
                options:{
                },
                isShare:null,
                showThumbsUp:null,//展示是否点赞
                isThumbsUp:null,  //控制点击事件
                showCollection:null,//展示是否收藏
                isCollection:null,//展示是否收藏
                thumbsNum:0,
                collectionNum:0,
                deviceNo: '',
                showList: false
            }
        },

        created() {
            this.article_id = this.$router.query('article_id')

            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload()
                }
            }, false);
            //05C14A61-4B81-47B1-BDF5-9100AA777CA2
            this.isWeiXin()
            this.loadCmsProduct()
            this.loadCmsDetail()
            this.loadCmsArticle()
        },
        mounted(){
            this.$app.getDeviceNo((deviceNo)=>{
                if(this.$app.isBrowser() && deviceNo !== ''){
                    this.showList = true
                    this.deviceNo = deviceNo
                    this.loadCollectionAndThumbs()
                }else{
                    this.showList = false
                }
            })

        },
        updated(){
            let imgPart = document.getElementById('imgPar').getElementsByTagName("img");
            for (let i = 0; i < imgPart.length; i++) {
                imgPart[i].removeAttribute('width')
                imgPart[i].removeAttribute('height')
                imgPart[i].style.maxWidth = '100%';
                imgPart[i].style.margin = '0 auto';
            }

        },
        methods: {
            loadCollectionAndThumbs(){
                let data = {
                    "articleId": Number(this.article_id),
                    "deviceNo": this.deviceNo
                }
                console.log("data",data);
                if(this.deviceNo !== ''){
                    this.$app.getCurrentToken((userToken)=>{
                        this.$request({
                            url: `/cmsArticleCollectUser/getCollectAndLikeInfo`,
                            method:'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data:data,
                            userToken:userToken,
                            successFn: (data) => {
                                this.thumbsNum = data.loveNum
                                this.collectionNum = data.collectNum
                                this.showThumbsUp = data.loveFlag === '0'? false :true
                                this.showCollection = data.collectFlag === '0'? false :true
                                console.log(this.showThumbsUp);

                            },
                            errorFn: () => {
                                //this.showError = true
                            }
                        })
                    })
                }else {
                    this.showList = false
                }

            },
            giveThumbsUp(){
                if (this.isThumbsUp) return
                this.isThumbsUp = true
                this.goThumbsUp()

                setTimeout(()=>{
                    this.isThumbsUp = false
                },2000)
            },
            goThumbsUp(){
                let data = {
                    "articleId": Number(this.article_id),
                    "deviceNo": this.deviceNo,
                    "loveFlag": !this.showThumbsUp? '1':'0'
                }
                this.$app.getCurrentToken((userToken)=>{
                    this.$request({
                        url: `/cmsArticleCollectUser/editLoveFlag`,
                        method:'POST',
                        contentType: 'application/json;charset=UTF-8',
                        data:data,
                        userToken:userToken,
                        successFn: (data) => {
                         if(data){
                             this.showThumbsUp = !this.showThumbsUp
                             if(this.showThumbsUp){
                                 this.thumbsNum++
                                 Toast.succeed('点赞成功')
                                 setTimeout(()=>{
                                     this.$refs.thumbs_uped.className = 'animated fadeOutUp'
                                 },200)
                             }else{
                                 Toast.info('取消点赞')
                                 if(this.thumbsNum !== 0){
                                     this.thumbsNum--
                                 }
                                 this.$refs.thumbs_uped.className = ''
                             }
                             setTimeout(()=>{
                                 if(this.showThumbsUp){
                                     this.$refs.thumbs_uped.className = ''
                                 }
                             },1000)
                         }
                        },
                        errorFn: () => {
                            //this.showError = true
                        }
                    })
                })
            },
            giveCollection(){
                if (this.isCollection) return
                this.isCollection = true
                this.goCollection()
                setTimeout(()=>{
                    this.isCollection = false
                },2000)
            },
            goCollection(){
                let data = {
                    "articleId": Number(this.article_id),
                    "collectFlag": !this.showCollection? '1':'0'
                }
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: `/cmsArticleCollectUser/editCollectFlag`,
                        method:'POST',
                        contentType: 'application/json;charset=UTF-8',
                        data:data,
                        userToken:userToken,
                        successFn: (data) => {
                            if(data){
                                this.showCollection = !this.showCollection
                                if(this.showCollection){
                                    this.collectionNum++
                                    Toast.succeed('收藏成功')
                                    setTimeout(()=>{
                                        this.$refs.collected.className = 'animated fadeOutUp'
                                    },200)
                                }else{
                                    Toast.info('取消收藏')
                                    if(this.collectionNum !== 0){
                                        this.collectionNum--
                                    }
                                    this.$refs.collected.className = ''
                                }
                                setTimeout(()=>{
                                    if(this.showCollection){
                                            this.$refs.collected.className = ''
                                    }
                                },800)
                            }
                        },
                        errorFn: () => {
                            //this.showError = true
                        }
                    })
                })
            },
            showShare(){
                console.log(this);
                setupWebViewJavascriptBridge((bridge)=> {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "shareActive",
                        {
                            share_data: '',
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            title: '', //标题
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url: this.options.href, //分享跳转的url
                            share_title: this.options.title, //分享标题
                            share_text: this.options.desc, //分享描述
                            share_imgurl: this.options.imgUrl //分享图片地址
                        },
                        function (response) {
                            //alert(response,'');
                        }
                    );
                });
            },
            goAdvertisement(item){
                window.location.href = item.linkUrl
            },
            showTime(timespan) {
                var dateTime = new Date(timespan)

                var year = dateTime.getFullYear()
                var month = dateTime.getMonth() + 1
                var day = dateTime.getDate()
                /* var hour = dateTime.getHours()
                 var minute = dateTime.getMinutes() */
                var now = new Date().getTime()
                var milliseconds = 0
                var timeSpanStr
                milliseconds = now - timespan
                if (milliseconds <= 1000 * 60 * 1) {
                    timeSpanStr = '刚刚'
                } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
                    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
                } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
                    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
                } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
                    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
                } else {
                    timeSpanStr = year + '年' + month + '月' + day + '日'
                }
                return timeSpanStr
            },
            loadCmsProduct(){
                this.$request({
                    url: `/cms/content/selProduct?id=` +  this.article_id,
                    successFn: (data) => {
                        this.articleProduct = data
                    },
                    errorFn: () => {
                        //this.showError = true
                    }
                })
            },
            loadCmsArticle(){
                this.$request({
                    url: `/cms/content/selArticle?id=` +  this.article_id,
                    successFn: (data) => {
                        this.articleList = data
                    },
                    errorFn: () => {
                        //this.showError = true
                    }
                })
            },
            goDetail(item){
                window.location.href = this.$router.siteUrl() + '/product/Detail.html?product_id=' + item.id
            },
            goArticleDetail(item){
                window.location.href = this.$router.siteUrl() + '/cms/ArticleDetail.html?article_id=' + item.id
            },
            loadCmsDetail() {
                this.$request({
                    url: `/cms/content/selectInfoById`,
                    params: {
                        id: this.article_id
                    },
                    successFn: (data) => {
                        let records = data
                        document.title = records.title
                        console.log(records.content);
                        this.pageData = {
                            title: records.title,
                            auther: records.auther,
                            createTime: records.createTime,
                            content: records.content,
                            num: records.readFalseNum + "阅读"
                        }
                        this.myTime = this.showTime(this.pageData.createTime)
                        this.shareData = {
                            shareTitle: records.shareTitle,
                            shareContent: records.shareContent,
                            miniPicture: records.miniPicture,
                            shareUrl: location.href
                        }
                        this.options.href = location.href
                        this.options.title = records.shareTitle
                        this.options.desc =records.shareContent
                        this.options.link = location.href
                        this.options.imgUrl = records.miniPicture
                        this.$app.wxShareDetail(this.options)
                        this.loadFujianDetail()
                       if(Number(records.flagShare) === 1){
                           this.isShare = true
                       }else{
                           this.isShare = false
                       }
                           //设置分享
                       setupWebViewJavascriptBridge(function (bridge) {
                           //导航是否显示分享按钮
                           bridge.callHandler('navigationConfig', {
                               'flag_show': 1,
                               'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                               'title': records.title, //标题
                               'flag_share': Number(records.flagShare), //是否显示分享按钮，1-显示 0-不显示
                               'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                               'share_url': location.href, //分享跳转的url
                               'share_title': records.shareTitle, //分享标题
                               'share_text': records.shareContent, //分享描述
                               'share_imgurl': records.miniPicture //分享图片地址
                           }, function (response) {
                               //alert(response,'');
                           })
                       })
                    },
                    errorFn: () => {
                        this.showWhirl = false
                        //this.showError = true
                    }
                })
            },
            loadFujianDetail() {
                this.$request({
                    url: `/cms/content/selAttachment`,
                    params: {
                        id: this.article_id
                    },
                    successFn: (data) => {
                        this.cmsAttachmentData = data
                        this.cmsAttachmentData.forEach((item)=>{
                            if(item.attachmentType == '01'){
                                this.shareArticleData.push(item)
                            }
                            if(item.attachmentType == '02'){
                                console.log(item);
                                this.appArticleData.push(item)

                            }
                        })
                        this.showWhirl = false
                    },
                    errorFn: () => {
                        this.showWhirl = false
                       // this.showError = true
                    }
                })
            },
            isWeiXin() {
                let ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/bnonline/i) == 'bnonline') {
                    this.isWeiXinBrowser = false
                } else {
                    this.isWeiXinBrowser = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app.scss";

    .cms-mod {
        padding: 30px;
    }

    .cms-tit {
        font-size: 36px;
        color: #000;
        line-height: 50px;
        font-weight: bolder;
    }

    .cms-tip {
        margin: 20px 0;
    }

    .cms-tip span {
        color: #666;
        font-size: 24px;
        display: inline-block;
        margin-right: 25px;
    }

    .cms-content {
        margin-top: 20px;
    }
    .cms-content {
        img{
            max-width: 100% !important;
            max-height: 500px !important;
            margin: 0 auto !important;
        }
    }
    .cms-banner {
        margin-top: 25px;
    }

    .cms-banner .seat {
        height: 15px;
        background: #f0f0f0;
    }

    .cms-banner .list {
        padding: 40px;
    }

    .cms-banner .list .tit {
        font-size: 32px;
        color: #000;
        line-height: 80px;
    }

    /*.cms-banner .list .banner{}*/
    .cms-banner .list .banner img {
        max-width: 100%;
        max-height: 500px !important;
        margin: 0 auto;
    }
    .productArticle{
        margin-top: 20px;
          p{
              font-size: 32px;
              margin-bottom: 20px;
              text-align: center;
              font-weight: bold;
          }
        img{
            margin: 0 auto;
            max-width: 80%!important;
        }
    }
    .part1{
        padding-bottom: 130px;
    }
    .statusList{
        width: 100%;
        position: fixed;
        background: #fff;
        bottom: 0;
        height: 116px;
        border-top: 1px solid #CCCCCC;
        ul{
            height: 100%;
            display: flex;
            li{
                flex: 1;
                text-align: center;
                img{
                    margin: 0 auto;
                    margin-top: 18px;
                    width: 40px;
                    height: 40px;
                }

                p{
                    margin-top: 12px;
                    font-size: 22px;
                    color: #979797;
                }
            }
            .collection{
                img{
                    width: 40px;
                    height: 36px
                }
            }
        }
    }
</style>
