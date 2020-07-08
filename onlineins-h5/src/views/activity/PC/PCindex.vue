<template>
    <div class="pcindex">
        <PCHeader />

        <div class="banner">
            <md-swiper
                  ref="swiper"
                  :autoplay="8000"
                  :is-prevent="false"
                  :has-dots="false"
                  transition="fade"
                >
                <md-swiper-item v-for="(item, index) in bannerDatas" :key="index">
                  <div class="banner-item">
                      <img :src="item.imgSrc" alt="图片未显示">
                  </div>
                </md-swiper-item>
            </md-swiper>
        </div>
        <!-- <img src="@/assets/imgs/activity_pc/PCIndex/bgTop.png" class="bgTop"/> -->

        <div class="contentBody">
            <Suspension :scrollHeight="scrollHeight" :homeFlag="homeFlag"/>
            <div class="content01">
                <h2>爆款推荐</h2>
                <ul class="productList">
                    <li v-for="item in productList"><img :src="item.imgUrl" @click="goDetail(item)"/></li>
                </ul>
            </div>
            <div class="content01">
                <h2>精选保障</h2>
                <div class="partOne">
                    <img src="@/assets/imgs/activity_pc/PCIndex/pro01.png" class="pro01"/>
                     <ul class="partOneList">
                         <li v-for="item in partOneList" @click="goDetail(item)">
                             <img :src="item.imgUrl"/>
                            <div>
                                <h4>{{item.title}}</h4>
                                <p class="desc">{{item.desc}}</p>
                                <p class="price"><span class="prizeSymbol">￥</span>{{item.price}}<span class="parT">起</span></p>
                            </div>
                         </li>
                     </ul>
                </div>
                <!-- <div class="partTwo">
                    <img src="@/assets/imgs/activity_pc/PCIndex/pro02.png" class="pro02"/>
                    <ul class="partOneList">
                        <li v-for="item in partTwoList" @click="goDetail(item)">
                            <img :src="item.imgUrl" />
                            <div>
                                <h4>{{item.title}}</h4>
                                <p class="desc">{{item.desc}}</p>
                                <p class="price"><span class="prizeSymbol">￥</span>{{item.price}}<span class="parT">起</span></p>
                            </div>
                        </li>
                    </ul>
                </div> -->
                <div class="partThree">
                    <img src="@/assets/imgs/activity_pc/PCIndex/pro03.png" class="pro03"/>
                    <ul class="partOneList">
                        <li v-for="item in partThreeList" @click="goDetail(item)">
                            <img :class="{'hasTag': item.hasTag}" :src="item.imgUrl" />
                            <div>
                                <h4>{{item.title}}</h4>
                                <p class="desc">{{item.desc}}</p>
                                <p class="price"><span class="prizeSymbol">￥</span>{{item.price}}<span class="parT">起</span></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <PCFooter />
    </div>
</template>

<script>
    import PCHeader from '@/views/activity/PC/layout/PCHeader'
    import PCFooter from '@/views/activity/PC/layout/PCFooter'
    import Suspension from '@/views/activity/PC/layout/Suspension'
    export default {
        name: "PCindex",
        components: {
            PCHeader,
            PCFooter,
            Suspension
        },
        data() {
            return {
                bannerDatas: [
                  {
                    id: '1',
                    imgSrc: require('@/assets/imgs/activity_pc/PCIndex/bgTop.jpg'),
                  },
                  {
                    id: '2',
                    imgSrc: require('@/assets/imgs/activity_pc/PCIndex/bgTop02.png'),
                  }
                ],
                productList: [
                    {
                        imgUrl: require('@/assets/imgs/activity_pc/PCIndex/product01.png'),
                        id:130
                    },
                    {
                        imgUrl: require('@/assets/imgs/activity_pc/PCIndex/product02.png'),
                        id:128
                    },
                    {
                        imgUrl: require('@/assets/imgs/activity_pc/PCIndex/product03.png'),
                        id:2
                    },
                    {
                        imgUrl: require('@/assets/imgs/activity_pc/PCIndex/product04.png'),
                        id:123
                    }
                ],
                partOneList:[
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partOne01.png'),
                        title:'康惠保重疾险（2020版）',
                        desc:'重疾超级魔方 责任组合DIY',
                        price:'257',
                        id:130
                    },
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partOne02.png'),
                        title:'超倍保重疾险',
                        desc:'多次给付 超倍保护',
                        price:'337',
                        id:128
                    },
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partOne03.png'),
                        title:'童惠保少儿重疾险',
                        desc:'保额复利增 最高赔付210万',
                        price:'109',
                        id:2
                    },
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partOne04.png'),
                        title:'康惠保重疾险（旗舰版）',
                        desc:'性价比之选',
                        price:'228',
                        id:1
                    }
                ],
                partTwoList:[
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partTwo01.png'),
                        title:'定惠保定期寿险（旗舰版）',
                        desc:'重疾险好搭档 家庭之主优选',
                        price:'120',
                        id:3
                    }
                ],
                partThreeList:[
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partThree01.png'),
                        title:'医惠通费用补偿医疗保险',
                        desc:'6年保证续保 最高保证400万',
                        price:'147',
                        id: 123
                    },
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partThree02.png'),
                        title:'医无忧特定疾病医疗保险',
                        desc:'防癌+特定手术医疗金',
                        price:'58',
                        id:124
                    },
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partThree03.png'),
                        title:'药惠通抗癌特药险',
                        desc:'24种抗癌特药，100万用药保障',
                        price:'27',
                        hasTag: true,
                        id:132
                    }/*,
                    {
                        imgUrl:require('@/assets/imgs/activity_pc/PCIndex/partThree04.png'),
                        title:'医惠保尊享版定期医疗保险',
                        desc:'一次性保10/15年 保期内均衡费率，最高保障400万',
                        price:'174',
                        hasTag: true,
                        id:134
                    },*/
                ],
                scrollHeight:0,
                homeFlag:true
            }
        },
        created() {
            this.scrollHeight = 800
            this.homeFlag = true
        },
        methods: {
            goDetail(item){
                location.href = `/activity/PC/PCdetail.html?product_id=${item.id}`
            }
        }
    };
</script>

<style lang='scss' scoped>
    .pcindex {
        margin: 0 auto;
        max-width: 100%;
        overflow: hidden;

        .bgTop {
            width: 1920PX;
            height: 467PX;
            margin: 0 auto;
        }
        .banner {
           width: 1920PX;
           height: 485PX;
           margin: 0 auto;
           overflow: hidden;

           .banner-item {
             width: 100%;
             height: 100%;
           }

           .md-swiper-indicator.md-swiper-indicator-active {
               background: red;
           }
        }

        .contentBody {
            width: 1188PX;
            margin: 0 auto 0;
            position: relative;
        }

        .content01 {
            margin-top: 80PX;

            h2 {
                font-size: 44PX;
                color: #333;
                text-align: center;
                position: relative;
                margin-bottom: 80PX;
            }

            h2:before, h2:after {
                content: '';
                top: 50%;
                height: 4PX;
                position: absolute;
                border-top:  2PX solid #050A10;
                width: 276PX;
            }

            h2:before {
                left: 16%;
            }
            h2:after {
                right: 16%;
            }
            .productList {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                li {
                    img {
                        cursor:pointer;
                        min-width: 572PX;
                        max-width: 572PX;
                        min-height: 420PX;
                        max-height: 420PX;
                    }
                }

                li:nth-child(n+3) {
                    margin-top: 36PX;
                }
            }

            .pro01{
                height: 316PX;
                width: 284PX;
                display: inline-block;
                float: left;
            }
            .partOne,.partTwo,.partThree{
                background: #fff;
                overflow: hidden;
            }
            .partThree{
                margin-top: 41PX;
                margin-bottom: 73PX;
            }
            .partOneList{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                flex-direction: row;
                flex-wrap: wrap;
                li{
                    padding: 39PX 0 0 20PX;
                    display: inline-block;
                    flex: 1;
                    min-width: 40%;
                    cursor:pointer;
                    h4 {
                        font-weight: bold;
                    }
                    img{
                        width: 150PX;
                        height: 100PX;
                        float: left;
                        display: inline-block;
                        &.hasTag {
                            height: 130PX;
                        }
                    }
                    div{
                        margin-left: 165PX;
                        h4{
                            font-size: 20PX;
                            margin-top: 5PX;
                        }
                        .desc{
                            font-size: 16PX;
                            margin-top: 10PX;
                            color: #747474;
                        }
                        .price{
                            margin-top: 14PX;
                            font-size: 26PX;
                            color: #BD0000;
                            .prizeSymbol{
                                font-size: 20PX;
                            }
                            .parT{
                                font-size: 16PX;
                                color: #747474 !important;
                            }
                        }
                    }
                }
            }
            .partTwo{
                margin-top: 41PX;
            }
            .pro02{
                width: 284PX;
                height: 180PX;
                display: inline-block;
                float: left;
            }
            .pro03{
                width: 284PX;
                display: inline-block;
                float: left;
            }
        }
    }
</style>
