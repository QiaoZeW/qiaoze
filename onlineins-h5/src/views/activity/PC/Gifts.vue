<template>
    <div class="gifts">
        <div class="gifts-wrap">
            <div class="banner" :style="{
                  'backgroundImage': `url(${imgObj.banner_bg})`
                }">
                <div class="qr_code qr_code12">
                    <img src="@/assets/imgs/activity_pc/QR_code.png" width="296" height="296" alt="图片tip">
                    <span class="text text12">扫二维码领好礼</span>
                </div>
            </div>
            <div class="content">
                <div class="gift-list">
                    <img :src="imgObj.gift_1" alt="图1tip">
                    <img :src="imgObj.gift_2" alt="图2tip">
                    <img :src="imgObj.gift_3" alt="图3tip">
                    <img :src="imgObj.gift_4" alt="图4tip">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { setSize } from './PCutils'
    export default {
        name: "Gifts",
        data () {
            return {
                imgObj: {
                    banner_bg: require('@/assets/imgs/activity_pc/banner_bg.png'),
                    gift_1: require('@/assets/imgs/activity_pc/gift_1.png'),
                    gift_2: require('@/assets/imgs/activity_pc/gift_2.png'),
                    gift_3: require('@/assets/imgs/activity_pc/gift_3.png'),
                    gift_4: require('@/assets/imgs/activity_pc/gift_4.png')
                },
                imgObj1: {
                    banner_bg: require('@/assets/imgs/activity_pc/banner_bg_2.png'),
                    gift_1: require('@/assets/imgs/activity_pc/gift_1_1.png'),
                    gift_2: require('@/assets/imgs/activity_pc/gift_2_1.png'),
                    gift_3: require('@/assets/imgs/activity_pc/gift_3_1.png'),
                    gift_4: require('@/assets/imgs/activity_pc/gift_4_1.png')
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.compareTime()
                setSize()
            },
            compareTime () {
                const targetDate = new Date('2020/1/1').getTime() || 1577808000000
                if(Date.now() < targetDate) {
                    this.imgObj = Object.assign({}, this.imgObj1)
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
.gifts {
    width: 100%;
    background: #ce2833 url(../../../assets/imgs/activity_pc/all_bg.png) top left no-repeat;
    padding-bottom: 90PX;
    padding-top: 40PX;
    .gifts-wrap {
        width: 1200PX;
        margin: 0 auto;
        .banner {
            height: 772PX;
            background: url() top center no-repeat;
            position: relative;
            .qr_code {
                position: absolute;
                width: 296PX;
                top: 50%;
                right: 10%;
                transform: translateY(-32%);
                text-align: center;
                img {
                    margin-bottom: 20PX;
                }
                .text {
                    color: #FDD5AA;
                    font-size: 34PX;
                }
            }
        }
        .content {
            margin-top: 80PX;
            width: 100%;
            height: 712PX;
            background: #ce2833 url(../../../assets/imgs/activity_pc/content_bg.png) top center no-repeat;
            box-sizing: border-box;
            padding: 144PX 68PX 0;
            .gift-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                img {
                    width: 514PX;
                    height: 212PX;
                    margin-bottom: 44PX;
                }
            }
        }
    }
}
</style>

