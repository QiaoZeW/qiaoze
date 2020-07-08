<template>
    <section @click="closeBg">
        <div class="bg" ref="bg" v-if="showBg"><img src="../../assets/imgs/insure/download.png" class="download"/></div>
        <div class="bgTop">
            <img src="../../assets/imgs/logo.png"/>
        </div>
        <p class="downloadBtn" @click="openApp">下载百年人寿APP</p>
        <div class="part">
            <ul>
                <li>
                    <img src="../../assets/imgs/insure/insure.png"/>
                    <p class="parQ">甄选产品</p>
                    <p>保障全面</p>
                </li>
                <img src="../../assets/imgs/insure/line.png" class="line"/>
                <li>
                    <img src="../../assets/imgs/insure/selfSupport.png"/>
                    <p class="parQ">官方自营</p>
                    <p>安全放心</p>
                </li>
                <img src="../../assets/imgs/insure/line.png" class="line"/>
                <li>
                    <img src="../../assets/imgs/insure/king.png"/>
                    <p class="parQ">会员专享</p>
                    <p>福利优惠</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import {
        Toast
    } from 'mand-mobile'

    export default {
        name: 'Download',
        data () {
            return {
                showBg: true,
                isAndroid: null,
                isIos: null,
                downloadUrl: ''
            }
        },
        created () {
            document.title = '下载百年人寿APP'
            var ua = window.navigator.userAgent.toLowerCase()
            var u = navigator.userAgent.toLowerCase()
            this.isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.showBg = true
            } else {
                this.showBg = false
                if (this.isAndroid) {
                    window.location = 'app://bnonline'
                }
            }
            this.getAppUrl()
        },
        methods: {
            closeBg () {
                this.showBg = false
            },
            getAppUrl () {
                let platform = ''
                if (this.isAndroid) {
                    platform = 'Android'
                } else if (this.isIos) {
                    platform = 'ios'
                } else {
                    Toast.info('暂不支持该浏览器！')
                    return false
                }
                this.$request({
                    url: `/app/version/${platform}`,
                    successFn: (data) => {
                        if (data && data.packageUrl) {
                            this.downloadUrl = data.packageUrl
                        }
                    },
                    errorFn: () => {
                    }
                })
            },
            openApp () {
                if(this.$app.isMiniProgram()){
                    if(this.$app.isBnMiniApp()){
                        wx.miniProgram.navigateTo({url:'/pages/user/downloadApp'});
                        return;
                    }else{
                        Toast.info('请您在应用市场搜索“百年人寿”下载APP')
                        return;
                    }
                }
                if (this.downloadUrl) {
                    window.location.href = this.downloadUrl
                } else {
                    Toast.info('暂未配置app下载地址')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .bgTop {
        padding-top: 348px;
        img {
            width: 376px;
            height: 152px;
            margin: 0 auto;
        }
    }

    .downloadBtn {
        margin: 182px 30px 0;
        height: 88px;
        line-height: 88px;
        background: #E10312;
        text-align: center;
        font-size: 36px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }

    .part {
        margin-top: 126px;
        ul {
            display: flex;
            .line {
                width: 4px;
                height: 97px;
                margin-top: 0.2rem;
            }
            li {
                flex: 1;
                img {
                    width: 38px;
                    height: 40px;
                    margin: 0 auto;
                }
                .parQ {
                    margin-top: 12px;
                }
                p {
                    text-align: center;
                }
            }
        }
    }

    .download {
        width: 474px;
        height: 342px;
        position: absolute;
        top: .5rem;
        right: 46px;
    }
</style>
