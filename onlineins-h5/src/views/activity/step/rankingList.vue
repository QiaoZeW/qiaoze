<template>
    <div class="tip-comp">

        <md-popup  position="bottom" v-model="showRankingList" large-radius>
            <div class="personRankList">
               <div class="closeIcon">
                   <i class="iconfont icon-guanbi myCloseIcon" @click="showRankingList = false"></i>
               </div>
                <img src="@/assets/imgs/stepComputed/rankListBg.png" class="rankListBg"/>
                <div class="rankList">
                    <img src="@/assets/imgs/stepComputed/rankList.png" />
                </div>
                <div class="rank">
                    <ul>
                        <li v-for="item in list">
                            <div class="prizePic">
                                <img src="@/assets/imgs/stepComputed/fisrt.png" v-if="item.id === 1"/>
                                <img src="@/assets/imgs/stepComputed/second.png" v-else-if="item.id === 2"/>
                                <img src="@/assets/imgs/stepComputed/third.png"  v-else-if="item.id === 3"/>
                                <span class="prize" v-else>{{item.id}}</span>
                            </div>
                            <p>
                                {{item.mobile | filterMobile}}  <span>完成{{item.totalStep | computerCircle}}圈</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </md-popup>
    </div>
</template>

<script>
    export default {
        name: "rankingList",
        data(){
            return{
                showRankingList:false,
                list:[]
            }
        },
        created(){
            this.getList()
        },
        methods:{
            showRank () {
                this.showRankingList = true
            },
            getList(){
                this.$request({
                    url: `/act/step/findActStepCricle`,
                    contentType: 'application/json;charset=UTF-8',
                    method: 'POST',
                    successFn: (data) => {
                        this.list = data
                        this.list.forEach((item,index)=>{
                            item.id = index + 1
                        })
                        this.list = this.list.filter((item)=>{
                            return item.totalStep >= 6000
                        })
                        console.log(this.list);
                    },
                    errorFn: (data) => {
                    }
                })
            }
        },
        filters: {
            filterMobile(value) {
                if(value && value !== ''){
                    return value.substr(0,3) + '****' + value.substr(7,4);
                }else{
                    return ''
                }

            },
            computerCircle(value){
                    return  (value/60000).toFixed(1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .closeIcon{
        position: absolute;
        top: 0.1rem;
        right: 0.3rem;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
    }
    .myCloseIcon{
        font-size: .45rem;
    }
    .rankListBg{
        width: 100%;
        height: 432px;
        margin: 0 auto;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }
    .personRankList{
        position: relative;
        background: #fff;
        padding-bottom: .5rem;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        .rank{
            /*position: absolute;*/
            max-height: 9rem;
            min-height: 9rem;
            top: 5.5rem;
            left: 1.4rem;
            width: 8.5rem;
            overflow-y: scroll;
            padding: .5rem .3rem;
            margin: 0 auto;
            p{
                font-size: 34px;
                color: #34B776;
                margin-left: 27px;
                display: inline-block;
                height: 47px;
                line-height: .65rem;
                span{
                    margin-left: 2rem;
                }
            }
            li{
                height: 47px;
                display: flex;
                align-items: center;
            }
            ul{
                li{
                    margin-top: 51px;
                }
                li:first-child{
                    margin-top: 0;
                }
            }
        }
    }
    .personRankList{
        .rankList{
            position: absolute;
            width: 100%;
            top: 4rem;
          img{
              width: 377px;
              height: 140px;
              margin: 0 auto;
          }
        }
    }
    .prize{
        width: .67rem;
        font-size: 42px;
        color: #34B776;
        text-align: center;
    }
    .prizePic{
        width: .67rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            margin: 0 auto;
            width: 36px;
            height: 47px;
            display: inline-block;
        }
    }
</style>
<style>
    .myRankList .md-landscape-content{
        width: 100% !important;
    }
</style>
