<template>
    <footer class="footer">
        <div class="footer-inner">
            <div class="left">
                <img src="@/assets/imgs/activity_pc/layout/logo_footer.png" alt="">
                <div class="service">
                    <img src="@/assets/imgs/activity_pc/layout/icon01.png" alt="">
                    <span>全国服务热线：</span>
                    <b>95542</b>
                </div>
            </div>
            <div class="right">
                <ul>
                    <li v-for="(item, index) in imgCodeList" :key="index">
                        <img :src="item.url" alt="">
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>
                Copyright©Aeon Life Insurance Company,Ltd.All Rights Reserved.<br>
版权所有  2009  百年人寿保险股份有限公司    辽ICP备09014139号
            </p>
            <img class="img_icp" src="@/assets/imgs/activity_pc/layout/img_icp.png" alt="">
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                imgCodeList: [
                    {
                        url: require('@/assets/imgs/activity_pc/layout/img_code_01.png'),
                        text: '百年人寿APP'
                    },
                    {
                        url: require('@/assets/imgs/activity_pc/layout/img_code_02.jpg'),
                        text: '百年人寿公众号'
                    }
                ]
            }
        }
    };
</script>

<style lang='scss' scoped>
    .footer {
        background: #ECECEC;
        padding: 46PX 0 40PX;
        box-sizing: border-box;

        .footer-inner {
            width: 1060PX;
            margin: 0 auto;
            display: flex;
            justify-content: center;

            .left {
                .service {
                    display: flex;
                    line-height: 36PX;
                    margin-top: 16PX;
                    color: #585858;

                    span {
                        font-size: 24PX;
                        margin-left: 6PX;
                    }

                    img {
                        width: 36PX;
                        height: 36PX;
                    }

                    b {
                        font-size: 30PX;
                    }
                }
            }

            .right {
                ul {
                    display: flex;
                    margin-left: 300PX;
                    li {
                        margin-left: 30PX;

                        > img {
                            margin-bottom: 8PX;
                            width: 124PX;
                            height: 124PX;
                        }

                        p {
                            text-align: center;
                            font-size: 16PX;
                            margin-top: 15PX;
                            /*-webkit-transform-origin-x: 4PX;
                            -webkit-transform: scale(0.75);
                            -moz-transform: scale(0.75);
                            -ms-transform: scale(0.75);
                            -o-transform: scale(0.75)*/;
                           /* transform: scale(0.75);*/
                            color: #585858;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
        .copyright {
            display: flex;
            margin-top: 50PX;
            background: #ECECEC;
            justify-content: center;
            p {
                padding: 15PX 0;
                color: #585858;
                font-size: 16PX;
                line-height: 20PX;
                margin-right: 30PX;
            }
            .img_icp {
                width: 47PX;
                height: 60PX;
            }
        }
    }
</style>

