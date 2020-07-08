<template>
    <section>
        <div class="content">
            <div class="contentBody" v-for="item in productList" @click="goDetail(item)">
                <img :src="item.productImage"/>
                <div class="productDes">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                    <div class="btnBox">
                        <!--<button>计划书</button>-->
                        <button @click.stop="goShare(item)">去分享</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        Toast,
    } from "mand-mobile";

    export default {
        name: "OnlineProduct",
        data() {
            return {
                productList: [],
                shareImg: require('@/assets/imgs/logo.png'),
                wxCode: null
            }
        },
        created() {


            this.wxCode = this.$router.query('code') || ''
            console.log('wxCode', this.wxCode);

            let options = {}
            options.href = location.href
            options.title =  '111'
            options.desc = '222'
            options.link = location.href
            options.imgUrl = this.$router.siteUrl() + this.shareImg
            this.$app.businessShareOptions(options,true)
            let cacheProductList = JSON.parse(sessionStorage.getItem('WX_PRO_LIST')) || ''
            if(cacheProductList && cacheProductList !== ''){
                this.productList = cacheProductList
            }else{
                this.getProductList()
            }
        },
        methods: {
            goShare(item) {
                sessionStorage.setItem("product_link", JSON.stringify(item.productLink))
                sessionStorage.setItem("wxDetail", '1')
                sessionStorage.setItem("shareBtn", '1')
                location.href = item.productLink
            },
            goDetail(item) {
                sessionStorage.setItem("product_link", JSON.stringify(item.productLink))
                sessionStorage.setItem("wxDetail",'1')
                location.href = item.productLink
            },
            getProductList() {
                this.$request({
                    url: `/wx/user/getProductByCode/${this.wxCode}`,
                    method: "GET",
                    contentType: "application/json",
                    successFn: data => {
                        if (data) {
                            this.productList = data
                            sessionStorage.setItem('WX_PRO_LIST',JSON.stringify(this.productList))
                        } else {
                            return false
                        }
                    },
                    failFn: data => {
                        Toast({content: data.resultMsg});
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        padding: 0 30px 94px;

        .contentBody {
            padding: 30px 0;
            border-bottom: 2px solid #ECECEC;
            display: flex;
            flex-direction: row;

            img {
                width: 216px;
                height: 180px;
                display: inline-block;
                border-radius: 20px;
            }

            .productDes {
                display: inline-block;
                margin-left: 18px;
                width: 100%;
                position: relative;

                h3 {
                    font-size: 32px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                    line-height: .7rem;
                }

                P {
                    font-size: 28px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(142, 142, 142, 1);
                    line-height: 40px;
                }

                .btnBox {
                    position: absolute;
                    bottom: 0;
                    right: 0;

                    button {
                        width: 168px;
                        height: 50px;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 26px;
                        border: 2px solid rgba(225, 3, 18, 1);
                        font-size: 26px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(225, 3, 18, 1);
                        line-height: .4rem;
                    }

                    button:first-child {
                        margin-right: 30px;
                    }
                }
            }
        }
    }
</style>

