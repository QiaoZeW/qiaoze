<template>
    <section class="about-mod">
        <img :src="img" alt="">
        <div class="con">
            <p>
                百年人寿保险股份有限公司于2009年6月3日正式开业，总部选址大连,是东北地区首家中资寿险法人机构。公司注册资本77.948亿元,截至2017年12月31日,公司总资产达到687亿元。百年人寿从创建伊始,便以强大的股东背景、良好的法人治理结构、优秀的管理团队等雄厚的综合实力令业界瞩目。
            </p>
            <p>
                百年人寿业务规模高速成长,业务品质与价值同步提升。公司于2015年首次实现盈利,已连续三年盈利,利润规模再创新高,标志着公司真正步入盈利稳定增长和价值加速回报的新时期。百年保险资产管理公司获批成立,投资收益实现丰收,投资能力显著提升。
            </p>
            <p>
                百年人寿坚持价值导向和结构调整,采取多元化销售发展策略,陆续建立并行发展个险、银行保险、团险、电话销售、顾问行销等业务渠道,注重高价值业务增长。百年人寿已在全国开设20家省级分公司,累计拥有分支机构330余家,全国主要省市战略布局已基本完成,销售体系日益完善。百年人寿注重多领域发展,推出开心保、壹佰金、爱立方等互联网金融和健康管理服务,走创新发展之路。
            </p>
        </div>
        <img src="../../assets/imgs/about2.png" alt="">
        <div class="con">
            <p>
                凭借优异的市场表现,百年人寿连续被评为行业最具发展潜力和最具成长性的保险公司、最佳保险企业和最佳责任典范公司;2015年、2016年、2017年连续三年荣膺“年度中国价值成长性十佳寿险公司”,公司产品创新亮点频出,多项产品获得行业大奖,行业地位和品牌知名度显著提升。
            </p>
            <p>
                百年人寿通过“以客户为中心”战略有效改善客户体验,提升客户价值。服务坚持科技引领,持续优化微信、一保通、百年通在线自助服务,直付先赔一年连升三级,服务体验和效率领先行业,在保监会公布的2017年人身险公司服务评价结果中,百年人寿获得A类评级,标志百年的服务已经进入行业先进行列。
            </p>
            <p>
                经过多年沉淀和积累,公司已拥有一支经得住考验、勇于拼搏的内外勤员工队伍,百年人共同的价值观进一步凝聚,风清气正、政通人和,成为企业稳健发展背后的强大精神力量。百年始终肩负企业社会责任,积极参加社会公益与精准扶贫活动,仅2017年全年4000多名志愿者累计开展志愿公益活动400余场,弘扬百年关爱文化,为保险行业健康发展注入“正能量”,实现公司发展与社会共赢。
            </p>
            <p>

                百年伟业,始于当下。百年人寿始终坚持科学发展,把握时代脉搏,不断创新优化发展机制,全面提升价值创造能力和公司综合实力,脚踏实地,开拓创新,不忘初心,锐意进取,倡导企业高度的市场灵活性与适应性,不断提升企业抗风险能力,以最专业的态度努力发展成为中国金融服务行业最值得尊崇、客户首选的保险业服务标杆。打造百年老店,创中国保险市场杰出品牌。
            </p>
        </div>
        <div class="about-logo" v-if="!isApp">
            <img src="../../assets/imgs/logo.png" alt="">
        </div>
        <div class="bottomShare" v-if="isApp">
            <ul>
                <li><img src="@/assets/imgs/ios.png" class="parT"/>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'about',
        components: {},
        data() {
            return {
                img: require('@/assets/imgs/about1.png'),
                isApp:false,
                options:{

                }
            }
        },
        created() {
            document.title = '关于我们'
            this.isBrowser()
            let _this = this;
            setupWebViewJavascriptBridge(function (bridge) {
                //导航是否显示分享按钮，分享内容先固定死
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    'title': '关于我们', //标题
                    'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': _this.$router.siteUrl() + '/cms/About.html', //分享跳转的url
                    'share_title': "百年人寿", //分享标题
                    'share_text': '百年人寿简介', //分享描述
                    'share_imgurl': _this.$router.siteUrl() + _this.img //分享图片地址
                }, function (response) {
                });
        })
            this.options.href = location.href
            this.options.title =  "百年人寿"
            this.options.desc ='百年人寿简介'
            this.options.link = this.$router.siteUrl() + '/cms/About.html'
            this.options.imgUrl = this.$router.siteUrl() + this.img
            this.$app.wxShareDetail(this.options)
        },

        methods: {
            isBrowser() {
                let ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/bnonline/i) == 'bnonline') {
                    this.isApp = false
                } else {
                    this.isApp = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .about-mod {
        padding: 30px;
    }

    .about-mod img {
        width: 100%
    }

    .about-mod .con p {
        color: #666666;
        font-size: 28px;
        line-height: 44px;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    .about-logo {
        margin: 40px 0;
    }

    .about-logo img {
        width: 25%;
        margin: 0 auto;
    }

    .parT {
        width: 3.5rem !important;
        height: 3.5rem !important;
    }

    .bottomShare ul {
        display: flex;
        li {
            margin: 0 auto;
        }
    }
</style>
