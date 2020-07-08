<template>
    <section>
        <div class="partTwo" v-if="isPartOne === 1">
            <div :class="showBgMongolia?'bg_mongolia':'hide_mongolia'" @touchmove.prevent>

                <img src="@/assets/imgs/appointment/sharePic01.png" class="sharePic01" />
                <img src="@/assets/imgs/appointment/sharePic02.png" class="sharePic02" v-show="!isSmallProgram"/>
                <img src="@/assets/imgs/appointment/sharePic04.png" class="sharePic04" v-show="isSmallProgram"/>
                <div class="know_hide" @click="hide_know()">
                    <img src="@/assets/imgs/appointment/sharePic03.png" class="sharePic03" />
                </div>

            </div>
        </div>
        <div class="partOne"  v-else-if="isPartOne === 2">
            <div class="contentTop">
                <img :src="bgImgUrl" class="bg_top_02"/>
            </div>
            <div class="contentBody">
                <div class="qrCode_part01">
                    <img src="@/assets/imgs/appointment/qrCode_left_pic.png" />
                    <p>微信扫码或长按识别</p>
                </div>
                <div class="qrCode">
                    <vue-qr :logoSrc="imageUrl"    :text="downloadData.url" :size="400"></vue-qr>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import vueQr from 'vue-qr'
    export default {
        name: "Mongolia",
        props: {
            showBgMongolia: {
                type: Boolean,
                default: true
            },
            isPartOne: {
                type: Number,
                default: 0
            },
            bgImgUrl:{
                type: String,
                default: require('@/assets/imgs/appointment/bg_top02.png')
            }
        },
        data(){
            return{
                isSmallProgram:false,
                imageUrl:  require('@/assets/imgs/appointment/logo_qrCode.png'),
                dataUrl:'',
                downloadData: {
                    url: ''
                }
            }
        },
        created(){
            this.downloadData.url = sessionStorage.getItem('qrCode_share') || ''
            var ua = window.navigator.userAgent.toLowerCase()
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                if(this.$app.isMiniProgram()){  //小程序内
                    this.isSmallProgram = true
                }else{
                    this.isSmallProgram = false
                }
            }
        },
        components:{
            vueQr
        },
        methods:{
            hide_know(){
                this.showBgMongolia = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contentTop{
        background: url("../../assets/imgs/appointment/bgTop.png");
        background-size: 100% 100%;
        height: 878px;
        position: relative;
        width: 100%;
        .bg_top_02 {
            position: absolute;
            width: 473px;
            height: 327px;
            left: 50%;
            margin-left: -236px;
            top: 16px;
            z-index: 22;
        }
    }
    .contentBody{
        margin-top: 30px;
        display: flex;
        justify-content: center;
        .qrCode_part01{
            flex: 1;
            padding-top: 22px;
            img{
                margin: 0 auto;
                width: 282px;
                height: 134px;
            }
            p{
                margin-top: 49px;
                text-align: center;
                font-size: 26px;
                color: #333;
            }
        }
        .qrCode{
            flex: 1;
        }
    }
    .qrCode{
        width: 100%;
        overflow: hidden;
        display: flex;
        img{
            display: block !important;
            margin: 0 auto 0;
            width: 266px;
            height: 266px;
        }
        p{
            float: right;
            font-size: 26px;
            color: #333;
            margin-top: -1rem;
            margin-right: 1rem;
        }
    }
    .bg_mongolia {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 300;
        .sharePic01{
            width: 388px;
            height: 65px;
            position: fixed;
            top: 95px;
            left: 63px ;
        }
        .sharePic02{
            width: 219px;
            height: 144px;
            position: fixed;
            right: 10%;
            top: 0;
        }
        .sharePic04{
            width: 178px;
            height: 144px;
            position: fixed;
            right: 16%;
            top: 0;
        }
        .know_hide{
            position: fixed;
            top: 224px;
            left: 50%;
            margin-left: -126px;
            width:253px;
            height:103px;
            border:1px solid rgba(255,255,255,1);
            border-radius:50%;
            display: flex;
            align-items: center;
            justify-content: center;
            .sharePic03{
                width: 124px;
                height: 34px;
            }
        }
    }
    .hide_mongolia{
        display: none;
    }
</style>

