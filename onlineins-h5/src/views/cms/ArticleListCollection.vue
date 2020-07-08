<template>
    <div>
        <md-tabs class="myCmsTabs" ref="tabs" @change="getMyThumbsUp" :immediate=true>
            <md-tab-pane class="content" name="p1" label="我的收藏">

                <div v-if="!showCollectionFlag" class="blankList">
                    <img src="@/assets/imgs/article/blank.png" class="blankPic"/>
                    <p @click="goArticleList">精彩资讯</p>
                </div>
                <LeftSlider  @deleteItems="loadDetail" v-else   :searchList="collectionList" :isThumbsUp="false"/>
            </md-tab-pane>
            <md-tab-pane class="content" name="p2" label="我的点赞">
                <div v-if="!showSearchListFlag" class="blankList">
                    <img src="@/assets/imgs/article/blankThumbsUp.png" class="blankPic"/>
                    <p @click="goArticleList">精彩资讯</p>
                </div>
                <LeftSlider  v-else :searchList="searchList"   :isThumbsUp="true" @deleteItems="loadDetail"/>

            </md-tab-pane>
        </md-tabs>
    </div>
</template>

<script>
    import LeftSlider from '@/components/LeftSlider'

    export default {
        name: "ArticleListCollection",
        components: {
            LeftSlider
        },
        data() {
            return {
                searchList: [],
                isLoading: false,
                collectionList: [],
                deviceNo: '',
                showCollectionFlag:true,
                showSearchListFlag:true,
                tabName:''
            }
        },
        created() {

            console.log(location.href);
            this.$app.getDeviceNo((deviceNo)=>{
                this.deviceNo = deviceNo
                this.loadDetail()
            })
        },
        mounted(){
            if(localStorage.getItem('TabName') && localStorage.getItem('TabName') !== ''){
                this.$refs.tabs.currentName = localStorage.getItem('TabName')
                localStorage.removeItem('TabName')
            }
        },
        updated() {
        },
        methods: {
            getMyThumbsUp(tab){
                console.log(tab);
                this.tabName = tab.name
                window.localStorage.setItem("TabName", this.tabName);
            },
            goArticleList() {
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('goArticleList', {
                        'id': 2
                    }, function (response) {
                    })
                })
            },
            loadDetail() {
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/cmsArticleCollectUser/getCollectAndLikeList`,
                        userToken:userToken,
                        isLoading:true,
                        method:'POST',
                        contentType: 'application/json;charset=UTF-8',
                        successFn: (data) => {
                            this.isLoading = true
                            this.searchList = data.loveList
                            this.collectionList = data.collectList
                            if(this.searchList.length !== 0){
                                this.showSearchListFlag = true
                            }else{
                                this.showSearchListFlag = false
                            }
                            if(this.collectionList.length !== 0){
                                this.showCollectionFlag = true
                            }else{
                                this.showCollectionFlag = false
                            }
                        },
                        failFn: () => {
                            this.isLoading = true
                        }
                    })
                })
            },
        }
    }

</script>
<style lang="scss" scoped>
    .blankPic {
        margin: 0 auto;
        margin-top: 94px;
        height: 414px;
        width: 378px;
    }

    .blankList {
        p {
            border: 1px solid #E61A27;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            margin: 0 auto;
            margin-top: 84px;
            width: 304px;
            font-size: 26px;
            color: #E30513;
            height: 64px;
            line-height: 64px;
            text-align: center;
        }
    }
</style>
<style lang="scss">
    .myCmsTabs {
        .md-tab-bar-ink {
            background: #E10312 !important;
        }
        .md-tab-bar-item{
            color: #333 !important;
            font-size: 30px !important;
        }
        .md-tab-bar-item.is-active {
            color: #E10312 !important;

            font-size: 30px !important;
        }
        .md-tab-bar {
            background: #fff !important;
        }
    }
</style>
