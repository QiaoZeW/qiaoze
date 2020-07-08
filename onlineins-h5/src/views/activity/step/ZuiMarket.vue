<template>
    <div class="market_box">
        <ul>
            <!--<li v-for="item in productList">
                <img :src="item.imageUrl"/>
                <p class="productTitle">{{item.title}}</p>
                <p class="goExchange">
                    <span>{{item.price}}豆</span>
                    <button @click="goDetail(item)">兑换</button>
                </p>
            </li>-->
            <li v-for="item in productList">
                <div class="imgBg"><img :src="item.imageUrl"/></div>
                <p class="productTitle">{{item.title}}</p>
                <p class="goExchange">
                    <span>{{item.price}}豆</span>
                    <button @click="goDetail(item)">兑换</button>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mand-mobile";
    export default {
        name: "ZuiMarket",
        data() {
            return {
                productList: [],
            }
        },
        created(){
          this.getList()
        },
        methods: {
            getList() {
                this.$request({
                    url: `/act/resource/image?moduleType=05`,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.productList = data
                    },
                    errorFn: (data) => {
                    }
                })
            },
            goDetail(item) {
                if (item.isClick === '1') {
                    if(item.isLogin === '1'){
                        this.goCommodity(item)
                    }else{
                        if(item.linkUrl === ''){
                            return false
                        }
                        window.location.href = item.linkUrl
                    }
                } else {
                    Toast({
                        content: '仅活动期间注册的新用户可兑换'
                    })
                }
                //
            },
            goCommodity(item){
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/shop/zuifuli/login`,
                        contentType: 'application/json;charset=UTF-8',
                        params: {redirect: `${item.linkUrl}`},
                        isLoading: true,
                        isEncript: true,
                        userToken: userToken,
                        successFn: data => {
                            window.location.href = data
                        },
                        failFn: data => {}
                    })
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .imgBg{
        min-height: 4rem;
        display: flex;
        align-items: center;
    }
    .market_box {
        width: 100%;
        padding-bottom: 30px;

        ul {
            display: flex;
            flex-wrap: wrap;
            padding-right: 30px;

            li {
                max-width: 4.4rem;
                margin-top: 30px;
                padding-top: 0.3rem;
                padding-bottom: 28px;
                min-width: 330px;
                margin-left: 30px;
                display: inline-block;
                flex: 1;
                box-shadow: 0px 0px 15px 0px rgba(91, 91, 91, 0.09);
                -webkit-box-shadow: 0px 0px 15px 0px rgba(91, 91, 91, 0.09);
                border-radius: 10px;
            }

        }

        img {
            max-height: 4rem;
            margin: 0 auto;
        }

        .productTitle {
            font-size: .4rem;
            margin-top: 0.4rem;
            margin-left: 22px;
        }

        .goExchange {
            margin-top: 12px;
            color: #24B288;
            font-size: 26px;
            line-height: 0.8rem;
            margin-left: 22px;
             display: flex;
            align-items: center;
            justify-content: space-between;
            button {
                margin-right: 21px;
                height: 48px;
                line-height: .5rem;
                width: 118px;
                background: #F5B10F;
                color: #ffff;
                font-size: 28px;
                border-radius: 10px;
            }
        }
    }
</style>
