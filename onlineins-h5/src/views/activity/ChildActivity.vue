<template>
    <div class="content">
        <img src="@/assets/imgs/activityToGround/childBg.png"  class="bg"/>
        <div class="contentBody">
            <ul>
                <li v-for="item in productData">
                    <img :src="item.imgUrl"/>
                    <div class="contS">
                        <p><span>{{item.num}} </span>{{item.simple}}</p>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>

        </div>
        <div class="btnBox">
            <p class="btn" @click="goDetail">
                立即投保
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                productData:[
                    {
                        num: 100,
                        simple:'种重疾',
                        desc:'单次赔付最高可达130万',
                        imgUrl: require('../../assets/imgs/activityToGround/logo01.png')
                    },
                    {
                        num: 50,
                        simple:'种轻症',
                        desc:'最高赔付3次，赔付30%基本保额',
                        imgUrl:require('../../assets/imgs/activityToGround/logo02.png')
                    },
                    {
                        num: 12,
                        simple:'种特定疾病',
                        desc:'18岁前赔付保额翻番',
                        imgUrl:require('../../assets/imgs/activityToGround/logo03.png')
                    }
                ]
            }
        },
        methods:{
            goDetail(){
                location.href = this.$router.siteUrl() + '/product/Detail.html?product_id=2'
            }
        }
    }
</script>

<style scoped lang="scss">

    .content{
        overflow: hidden;
        .bg{
            width:750px;
            height:100%;
        }
        position: relative;
        .contentBody{
            max-width: 90%;
            min-width: 600px;
            position: absolute;
            top: 58%;
            left: 50%;
            transform: translateX(-50%);
            ul{
                li{
                    width: 100%;
                    img{
                        display: inline-block;
                    }
                    .contS{
                        margin-left: 30px;
                        display: inline-block;
                        p:first-child{
                            span{
                                font-size: 48px;
                                color: #FA6821;
                                font-family: Impact,Helvetica;
                                font-weight: bold;
                            }
                            color: #545454;
                            font-size: 34px;
                            font-weight: bold;
                        }
                        p:last-child{
                            color: #545454;
                            margin-top: 10px;
                            font-size: 30px;
                        }
                    }
                }
                li:first-child{
                    img{
                        width: 74px;
                        height: 90px;
                        margin-left: .1rem;
                    }
                }
                li:nth-child(2){
                    img{
                        width: 88px;
                    }
                }
                li:nth-child(3){
                    img{
                        width: 74px;
                        margin-left: .1rem;
                    }
                }
                li:nth-child(2),li:nth-child(3){
                    margin-top: .6rem;
                    img{
                        height: 74px;
                    }
                }
            }
        }
    }
    .btnBox{
        position: absolute;
        top: 91%;
        left: 30px;
    }
    .btn{
        width: 690px;
        height: 88px;
        font-weight: bold;
        background: linear-gradient(top,#FC8934,#EE531A);
        background: -webkit-linear-gradient(top,#FC8934,#EE531A);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        border-bottom: 3px solid #C4460D;
        font-size: 36px;
        color: #fff;
        text-align: center;
        line-height: 88px;
        text-shadow: 10px 5px 30px #DA3D10;
    }
</style>
<style lang="scss">
    html,body{
        background: #FEF0D9;
    }
</style>
