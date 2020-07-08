<template>
    <div>
        <div class="left-delete" >
            <!-- <div  style="position: relative;">-->
            <div  style="position: relative;overflow: hidden;" class="articleList"  v-for="item in searchList" >
                <div  @touchstart="_touchStart($event,item)"
                      @touchmove="_touchMove($event,item)"
                      @touchend="_touchEnd($event,item)"
                >
                    <div :class="item.isActive?'move':'moves'"   :style="leftStyle"  @click="goArticleDetail(item)">
                        <p class="articleTitle">{{item.title}}</p>
                        <img class="myDemo" :src="item.minPicture" />
                        <p class="readCount">百年人寿 <span>{{item.readFalseNum}}阅读数</span></p>
                    </div>
                </div>
                <div   class="deleteIcon" :style="zIndex"  @click="deleteItem($event,item)">{{isThumbsUp?'取消点赞':'取消收藏'}}</div>
                <div class="blank"></div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Demo",
        data(){
            return{
                list:[],
                startX: 0,    //触摸位置
                moveX: 0,    //滑动时的位置
                disX: 0,    //移动距离
                txtStyle: '',
                delWidth: 200,
                top: '',
                zIndex: 'z-index:0',
                myStyle:'',
                showTip:'',
                leftStyle:'',
                deviceNo:''
            }
        },
        props: {
            searchList: {
                type: Array,
                default: () => []
            },
            isThumbsUp: {
                type: Boolean,
                default: false
            },
        },
        created(){
            this.searchList.forEach((item)=>{
                item.isActive = false
            })
            this.$app.getDeviceNo((deviceNo)=>{
                this.deviceNo = deviceNo
            })
        },
        methods:{
            _touchStart: function(ev,item) {
                ev = ev || event;
                this.searchList.forEach((obj)=>{
                    obj.isActive = false
                })
                item.isActive = true
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            _touchMove: function(ev,item) {
                ev = ev || event;
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX == 0  ) {
                        // console.log('没有移动');
                        this.leftStyle=''
                        item.isActive = false
                    }else if(this.disX < 0){
                        this.leftStyle = 'margin-left: 0% ;transition:margin-left .5s;'
                        item.isActive = false
                    } else if (this.disX > 0) {
                        this.leftStyle=''
                        // 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        item.isActive = true
                        this.zIndex = "z-index:" + 10 + "rem";
                        if (this.disX >= this.delWidth/75) {
                            item.isActive = true
                            /*this.zIndex = "z-index:" + 10 + "rem;";*/
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            _touchEnd: function(ev, item) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            goArticleDetail(item){
                console.log(item);
                location.href = this.$router.siteUrl()  + '/cms/ArticleDetail.html?article_id=' + item.id
            },
            deleteItem (e,item) {
                console.log(item);
                if(this.isThumbsUp){
                    this.cancelThumpsUp(item)
                }else{
                    this.cancelCollection(item)
                }
            },
            cancelThumpsUp(item){
                let data = {
                    "articleId": item.id,
                    "deviceNo": this.deviceNo,
                    "loveFlag":  '0'
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
                                this.$emit('deleteItems', item);
                            }
                        },
                        errorFn: (data) => {
                            console.log(data);
                        }
                    })
                })
            },
            cancelCollection(item){
                let data = {
                    "articleId": item.id,
                    "collectFlag": '0'
                }
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: `/cmsArticleCollectUser/editCollectFlag`,
                        method:'POST',
                        contentType: 'application/json;charset=UTF-8',
                        data:data,
                        userToken:userToken,
                        successFn: (data) => {
                            this.$emit('deleteItems', item);
                        },
                        errorFn: () => {
                            //this.showError = true
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
     .articleList:last-child .blank{
         display: none;
     }
     .articleList:first-child{
         border-top: 1px solid #F6F6F6;
     }
    .readCount{
       /* float: left;
        margin-left: 30px;
        margin-top: 46px;*/
        position: absolute;
        top: 2.3rem;
        left: 0.4rem;
        font-size: 20px;
        span{
            margin-left: 44px;
        }
        color:#8E8E8E;
    }
    .moves{
        z-index: 2;
        padding-top: 44px;
        padding-bottom: 12px;
        position: relative ;
        width: 100%  ;
        background: #fff;
        height: 2.1rem;
        margin-left:0% ;
        transition:margin-left .5s;
    }
    .move{
        width: 100% ;
        z-index: 2;
        padding-top: 44px;
        padding-bottom: 12px;
        position: relative ;
        background: #fff;
        height: 2.1rem;
        margin-left:-17% ;
        transition:margin-left .5s;
    }
    .myDemo{
        float: right;
        margin-right: 30px;
        width: 168px;
        height:128px;
        display: inline-block;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .left-delete{
        width:100%;
        position:relative;
        z-index:2;
        display:inline
    }

    .deleteIcon{
        width: 17%;
        line-height:2.8rem;
        text-align: center;
        height: 2.8rem;
        position: absolute;
        right: 0;
        top: 0.02rem;
        background: red;
        background-size: contain;
        color: #fff;
    }
    .articleTitle {
        float: left;
        line-height: 40px;
        margin-left: 30px;
        display: inline-block;
        max-width: 448px;
        font-size: 28px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp: 2; //显示的行
    }
    .blank{
        margin: 0 30px 0;
        height: 2px;
        background: #f6f6f6;
    }
    .particular{
        width: 100%;
        margin-left: 0;
        transition:margin-left .5s;
    }
     .particulars{
         transition:margin-left .5s;
         width: 100%;
         margin-left: -17%;
     }
</style>
