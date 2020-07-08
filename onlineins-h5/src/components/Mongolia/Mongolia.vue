<template>
    <div
        :class="showBg ? 'bg_mongolia' : 'hide_mongolia'"
        @touchmove.prevent
    >
        <img
            src="@/assets/imgs/appointment/sharePic01.png"
            class="sharePic01"
        />
        <img
            src="@/assets/imgs/appointment/sharePic02.png"
            class="sharePic02"
            v-show="!isSmallProgram"
        />
        <img
            src="@/assets/imgs/appointment/sharePic04.png"
            class="sharePic04"
            v-show="isSmallProgram"
        />
        <div class="know_hide">
            <img
                src="@/assets/imgs/appointment/sharePic03.png"
                class="sharePic03"
                @click="showBg = false"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSmallProgram: false,
                showBg:false
            };
        },
        props:{
            showBgMongolia: {
                type: Boolean,
                default: false
            }
        },
        created() {
            console.log(this.showBgMongolia);
            var ua = window.navigator.userAgent.toLowerCase();
            if (
                ua.match(/MicroMessenger/i) == "micromessenger" &&
                this.$app.isMiniProgram()
            ) {
                this.isSmallProgram = true;
            } else {
                if ((ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    this.isSmallProgram = false;
                }else{
                    this.isSmallProgram = true;
                }
            }
        },
        methods:{
            showDialog(){
                this.showBg = true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .bg_mongolia {
        width: 100%;
        height: calc(100vh);
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 300;
        .sharePic01 {
            width: 388px;
            height: 65px;
            position: fixed;
            top: 95px;
            left: 63px;
        }
        .sharePic02 {
            width: 219px;
            height: 144px;
            position: fixed;
            right: 10%;
            top: 0;
        }
        .sharePic04 {
            width: 178px;
            height: 144px;
            position: fixed;
            right: 16%;
            top: 0;
        }
        .know_hide {
            position: fixed;
            top: 224px;
            left: 50%;
            margin-left: -126px;
            width: 253px;
            height: 103px;
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            .sharePic03 {
                width: 124px;
                height: 34px;
            }
        }
    }
    .hide_mongolia {
        display: none;
    }
</style>
