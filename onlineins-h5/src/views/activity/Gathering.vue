<template>
    <section>
        <div class="pic">
            <img src="@/assets/imgs/gathering/bgTop.png" class="bgTop"/>
            <!-- <img src="@/assets/imgs/gathering/bgMid.png" class="bgMid"/>-->
        </div>
        <div class="myBack">
            <div class="productGathering" >
                <ul  v-if="index.data && index.data.length !== 0" v-for="index in productArr"  >
                    <img v-if="index.data && index.data.length !== 0" class="titleImg" :src="index.titleUrl" />
                    <li v-for="item in index.data" @click="goDetail(item)">
                        <img :src="item.imageUrl"/>
                        <p class="productName">{{item.title}}</p>
                        <p class="briefIntroduction">{{item.description}}</p>
                        <p v-if="item.isRead" class="clickRead" >点击阅读</p>
                        <p v-else class="clickRead read"  >已查看</p>
                    </li>

                    <!--   <li>
                           <img src="@/assets/imgs/evaluation/bnner2@2x.png"/>
                           <p class="productName">康惠保重疾险(旗舰版)</p>
                           <p class="briefIntroduction">重疾性价比之王</p>
                           <p class="clickRead">点击阅读</p>
                       </li>        -->
                    <li v-if="index.data && Number(index.data.length) % 2 !== 0" class="more_content">
                        <img src="../../assets/imgs/gathering/moreContent.png"/>
                        <p class="moreContent">更多内容&nbsp;&nbsp;敬请期待</p>
                    </li>
                </ul>
            </div>
            <p class="completed">
                已查看（{{readArticleNum}}/{{productNum}}）
            </p>

            <img src="@/assets/imgs/gathering/bgBottom.png" class="bgBottom" v-if="showBgBottom === 1"/>
            <img src="@/assets/imgs/gathering/bgBottom2.png" class="bgBottom" @click="loadUpdateScore" v-else-if="showBgBottom === 2"/>
            <img src="@/assets/imgs/gathering/luckyDraw.png" class="bgBottom" v-else-if="showBgBottom === 3"/>
            <md-landscape v-model="showPic" class="myLand">
                <div class="popupContent">
                    <p class="examineDetail">
                        在发现页可<span @click="goDetails">查看百佳豆</span>明细
                    </p>
                    <p class="partOne">
                        到会员尊享兑换好礼
                    </p>
                </div>

            </md-landscape>
        </div>
    </section>
</template>

<script>
    import { Dialog, Toast } from 'mand-mobile'
    export default {
        name: "Gathering",
        data() {
            return {
                productList: [],
                productArr:[
                    {
                        titleUrl:require('@/assets/imgs/gathering/title01.png'),
                        data: [],
                        id: 0
                    },
                    {
                        titleUrl:require('@/assets/imgs/gathering/title03.png'),
                        data: [],
                        id: 1
                    },
                    {
                        titleUrl:require('@/assets/imgs/gathering/title02.png'),
                        data: [],
                        id: 2
                    }
                ],
                productNum: '',
                readArticleNum:'0',
                startTime:'',
                endTime:'',
                readArticle:[],
                showBgBottom:1,
                showPic:false,
                scroeNum:'',
                showLastPic:null,
                product1:[],
                product2:[],
                product3:[],
                showProduct:false
            }
        },
        components: {
            [Dialog.name]: Dialog
        },
        created() {
            document.title = '国民产品大集结'
        },
        mounted() {
            this.loadDetail()
            this.loadList()
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
        methods: {
            goInvitation(){
                window.location.href =  this.$router.siteUrl() + '/activity/Invitation.html'
            },
            loadUpdateScore(){
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/assembly/updateScore`,
                        params: {},
                        isEncript: true,
                        userToken:userToken,
                        successFn: (data) => {
                            that.showPic = true
                            that.showBgBottom = 3
                        },
                        failFn: () => {

                        }
                    })
                })
            },
            loadDetail() {
                this.$request({
                    url: `/cms/content/image?moduleType=06`,
                    params: {},
                    successFn: (data) => {
                        for (let i = 0; i < data.length; i++) {
                            data[i]["isRead"] = true
                        }
                        this.productList = data
                        this.product1 = data.filter((item)=> Number(item.riskType) === 1)
                        this.product2 = data.filter((item)=> Number(item.riskType) === 2)
                        this.product3 = data.filter((item)=> Number(item.riskType) === 3)
                        this.productArr[0].data = this.product1
                        this.productArr[1].data = this.product2
                        this.productArr[2].data = this.product3
                        this.productArr = this.productArr.filter((item)=> item.data.length !== 0)
                        console.log(this.productArr);
                        this.productNum = data.length;
                    },
                    failFn: () => {
                        this.showError = true
                    }
                })
            },
            loadList() {
                let _this = this
                this.$app.getToken(function (userToken) {
                    _this.$request({
                        url: `/assembly/selUserReadId`,
                        params: {},
                        userToken:userToken,
                        successFn: (data) => {
                            _this.readArticle = data.vipUserAssemblyList
                            for (let i = 0; i <  _this.readArticle.length; i++) {
                                for (let j = 0; j < _this.productList.length; j++) {
                                    if(_this.readArticle[i] === _this.productList[j].id){
                                        _this.productList[j].isRead = false
                                    }
                                }
                            }
                            _this.readArticleNum  = _this.readArticle.length

                            if( _this.readArticle.length >= 3 && data.gainNum === 0){
                                _this.showBgBottom = 2
                            }else if(data.gainNum > 0){
                                _this.showBgBottom = 3
                            }

                        },
                        failFn: () => {
                            Dialog.alert({content:data.resultMsg})
                        }
                    })
                })
            },
            goDetail(item) {
                console.log(item);
                this.$app.getToken(function (userToken) {
                    if(userToken){
                        if(item.isRead){
                            window.location.href = item.linkUrl+ '&gathering_id=' + new Date().getTime() + '&articlePro_id=' + item.id
                        }else{
                            window.location.href = item.linkUrl
                        }

                    }
                })
            },
            goDetails(){
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('goBeanDetails', {
                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                    }, function (response) {
                    });
                })
            },
            goDetailUnread(item){
                this.$app.getToken(function (userToken) {
                    if(userToken){
                        window.location.href = item.linkUrl
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    section {

        .pic {
            .bgTop {
                /*    height: 341px;
                    width: 691px;
                    padding: .4rem 27px 0;*/
            }
            .bgMid {
                height: .7rem;
                width: 274px;
                margin: 0 auto;
            }
        }
        .myBack{
            background: url("../../assets/imgs/gathering/background.png") no-repeat center;
            /* 让背景图基于容器大小伸缩 */
            background-size: cover;
            min-height: calc(100vh - 389px);
            margin-top: -5px;
            padding-top: 45px;
        }
        .productGathering {
            margin: 0 20px ;
            ul {
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                background: #F1AF90;
                display: flex;
                flex-wrap: wrap;
                padding-top: 71px;
                position: relative;
                padding-bottom: 39px;
                .titleImg{
                    position: absolute;
                    top: -.14rem;
                    width: 264px;
                    height: 54px;
                    left: 50%;
                    transform :translate(-50%, 0)
                }
                li {
                    margin-left: .38rem;
                    min-height: 3.74667rem;
                    width: 312px;
                    margin-top: 31px;
                    background: #fff;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    img {
                        max-width: 297px;
                        max-height: 113px;
                        padding-top: 7px;
                        margin: 0 auto;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                    }
                    .productName {
                        margin-top: 15px;
                        font-size: 26px;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                        text-align: center;
                        line-height: 36px;
                    }
                    .briefIntroduction {
                        margin-top: 9px;
                        text-align: center;
                        font-size: 22px;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(149, 85, 38, 1);
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .clickRead {
                        margin: 0 auto;
                        width: 218px;
                        height: 54px;
                        background: linear-gradient(0deg, rgba(206, 77, 66, 1) 0%, rgba(226, 101, 90, 1) 100%);
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        font-size: 26px;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        line-height: 54px;
                        /*text-shadow: 0px 2px 3px rgba(238, 97, 74, 0.7);*/
                        text-align: center;
                        margin-top: .2rem;
                        margin-bottom: 10px;
                    }
                }
                .more_content {
                    background: #F4D0BC;
                    .moreContent {
                        margin-top: 31px;
                        text-align: center;
                        font-size: 26px;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }
                    img {
                        max-height: 183px !important;
                        max-width: 296px !important;
                        padding-top: 7px;
                        margin: 0 auto;
                    }
                }
            }
            ul:nth-child(2){
                margin-top: 59px;
            }
            ul:nth-child(3){
                margin-top: 59px;
            }
        }

        .completed {
            margin-top: .7rem;
            font-size: 22px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(143, 80, 36, 1);
            text-align: center;
        }
        .bgBottom {
            height: 120px;
            width: 270px;
            margin: .6rem auto 0;
            padding-bottom: 21px;
        }
    }

    .read {
        background: #E2DCD6 !important;
        color: #716C68 !important;
    }
    .popupContent {
        background: url("../../assets/imgs/gathering/popupPic.png") no-repeat;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        width: 750px;
        height: 929px;
        .scoreNum {
            padding-top: 4.2rem;
            font-size: 36px;
            color: #333;
            text-align: center;
        }
        .goShare {
            margin: 0 auto;
            margin-top: 30px;
            width: 329px;
            height: 84px;
            line-height: 84px;
            text-align: center;
            color: #fff;
            font-size: 36px;
            background: rgba(232, 68, 57, 1);
            border-radius: 10px;
        }
    }
    .examineDetail , .partOne{
        position: absolute;
        width: 100%;
        text-align: center;
        color: #FFFAE8;
        font-size: 28px;
    }
    .partOne{
        top: 10rem;
    }
    .examineDetail{
        top: 9.5rem;
        span{
            color: #FDDA5F;
            display: inline-block;
            border-bottom: 1px solid #FDDA5F;
        }
    }
</style>
<style lang="scss">
    .myLand .md-landscape-content{
        width: 100% !important;
    }
</style>
