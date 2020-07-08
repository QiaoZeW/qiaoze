<template>
    <div class="section fail-wrap">
        <div class="title_png_frist">
            <img src="@/assets/imgs/giftInsurance/headpic1@2x.png" alt="图片走丢了，请刷新">
        </div>
        <div style="title_png_two" class="title_png_second">
            <img src="@/assets/imgs/giftInsurance/headpic2.png" alt="图片走丢了，请刷新">
        </div>
        <div class="banner-list">
            <div class="img_list_1">
                <div class="img_list_1_1">
                    <img src="@/assets/imgs/giftInsurance/cancerdrugs.png" alt="图片走丢了，请刷新">
                </div>
                <div class="img_list_text">
                    <p class="img_list_text_black">抗癌特药<span class="span-orange">&nbsp;吃得起</span></p>
                    <p class="img_list_text_blue">100万<span class="span-black">&nbsp;用药保障</span></p>
                </div>
            </div>
            <div class="img_list_1">
                <div class="img_list_1_1">
                    <img src="@/assets/imgs/giftInsurance/medicine.png" alt="图片走丢了，请刷新">
                </div>
                <div class="img_list_text_2">
                    <p class="img_list_text_black">持续用药<span class="span-orange">&nbsp;保得全</span></p>
                    <p class="img_list_text_blue">24种药品<span class="span-black">&nbsp;确诊后一年，<br>免费用药</span></p>
                </div>
            </div>
            <div class="img_list_1">
                <div class="img_list_1_1">
                    <img src="@/assets/imgs/giftInsurance/people.png" alt="图片走丢了，请刷新">
                </div>
                <div class="img_list_text_2">
                    <p class="img_list_text_black">找药便捷<span class="span-orange">&nbsp;不操心</span></p>
                    <p class="img_list_text_blue">正规渠道<span class="span-black">&nbsp;药品直赔，药费<br>报销，送药上门</span></p>
                </div>
            </div>
            <div class="img_list_1">
                <div class="img_list_1_1">
                    <img src="@/assets/imgs/giftInsurance/lung.png" alt="图片走丢了，请刷新">
                </div>
                <div class="img_list_text_2">
                    <p><span class="span-orange">抗击疫情</span></p>
                    <p class="span-black" style="padding-top:5px;"><span class="span-orange">新冠肺炎</span>，危重型<span class="span-orange">10万</span><br>康复津贴</p>
                </div>
            </div>
        </div>
        <div class="content-list">
            <div class="content-list-top">
                <p class="content-list-top_p">百年药惠通抗癌特药保障</p>
            </div>
            <div class="content-list-two">
                <div class="content-list-left">保障期限</div>
                <div class="content-list-two-right">1年</div>
            </div>
            <div class="content-list-three">
                <div class="content-list-left" style="line-height:55px;">保险责任</div>
                <div class="content-list-three-right">
                    <p>1、恶性肿瘤特种药品费用医疗<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">100</span>万</p>
                    <p>保险金（仅限指定获<a style="color:rgba(254,72,23,1);" @click="goPharmacyDistribution">【认可的药店】</a>用药）</p>
                    <p>2、特别服务：新增【<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">新冠肺炎</span>危重型</p>
                    <p><span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">10万</span>康复津贴】</p>
                </div>
            </div>
            <div class="content-list-four">
                <div class="content-list-left">药品范围</div>
                <div class="content-list-four-right">
                    <p>约定药品清单中的
                        <span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">&nbsp;24</span>
                        <span style="color:rgba(75,147,255,1);">种药品</span><br/>
                        <a style="color:rgba(254,72,23,1);" @click="goDrugList">【点击查看药品目录】</a>
                    </p>
                </div>
            </div>
            <div class="content-list-five">
                <div class="content-list-left">赔付比例</div>
                <div class="content-list-five-right">
                    <p>一、医保目录内报销比例：<br/>
                        已社保结算，剩余费用的：<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">100%</span><br>
                        未社保结算，整体费用的：<span style="color:rgba(75,147,255,1);">60%</span><br>
                        二、医保目录外报销比例：<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">100%</span>
                    </p>
                </div>
            </div>
            <div class="content-list-six">
                <div class="content-list-left">服务</div>
                <div class="content-list-six-right">
                    <span style="color:rgba(75,147,255,1);">审方、送药、药品直赔、药费报销、慈<br/>善赠药</span><br/>
                    <span style="color:rgba(75,147,255,1);">附加值服务：</span><br>
                    基因检测、海外二诊、国内二诊<br/>
                    <!-- <a style="color:rgba(254,72,23,1);" @click="goServiceManual">【点击查看服务手册】</a><br/>
                    <a style="color:rgba(254,72,23,1);" @click="goPharmacyDistribution">【点击查看药房分布】</a> -->
                    <span style="color:rgba(75,147,255,1);">特别服务：</span><br>
                    新增【<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">新冠肺炎
                        </span>危重型<span style="font-size:18px;color:rgba(75,147,255,1);font-weight:bold;">10万</span>康复<br>
                    津贴】<br>
                    <p class="text-small">
                        投保《百年药惠通特种药品费用医疗保险》<br>
                        的被保险人，在保单生效日起180天内经等<br>
                        待期15天后经医院确诊感染新型冠状肺炎，<br>
                        且临床分型为危重型的，被保险人将获得10<br>
                        万元康复津贴。购买本产品时被保险人已有<br>
                        疑似新型冠状病毒感染症状或确诊新型冠状<br>
                        病毒肺炎，不享受本服务。享受此服务的保<br>
                        单：截止到2020年5月7日24:00前承保百年<br>
                        人寿药惠通产品的有效保单（含既往已生效<br>
                        保单）。<br>
                        <span style="font-size:18px;color:rgba(75,147,255,1);">*</span>
                        具体服务流程和规则以
                        <a style="color:rgba(254,72,23,1);" @click="goServiceManual">【服务手册】</a>为准<br>
                        <span style="font-size:18px;color:rgba(75,147,255,1);">*</span>
                        临床分型：根据国卫办医函【2020】77号<br>
                        《新型冠状病毒感染的肺炎诊疗方案（试行<br>
                        第五版）》（如有更新，以更新后的标准为<br>
                        准）。
                    </p>
                </div>
            </div>
            <!-- <div class="whiteBox"></div> -->
        </div>
        <div class="whiteBox"></div>
        <div class="bottom-follow">
            <p class="botton-money">
                ￥<span>84</span><span class="yuan">元</span>
            </p>
            <button class="bottom-button" @click="goFree">
                <p class="botton-text">免费领取</p>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               secondaryDistributor:'',
               thirdClassDistributor:'',
               productRiskId:'',
            }
        },
        created() {
            this.secondaryDistributor = this.$router.query("secondaryDistributor")
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor")
            this.productRiskId = this.$router.query("productRiskId")
            this.drugList = this.$router.siteUrl() + '/static/pdf/DrugList.pdf'
            this.serviceManual =this.$router.siteUrl() + '/static/pdf/DrugList.pdf'
            this.pharmacyDistribution = this.$router.siteUrl() + '/static/pdf/PharmacyDistribution.pdf'
            //赠险浏览产品详情
            this.shenceZxViewDetails();
            // 微信小程序初始化方法
            this.miniappInit()
        },
        methods: {
            /**
             * 小程序初始化
             */
            miniappInit () {
                // localStorage.removeItem('gift_insurance_openid')
                // 微信小程序获得token
                if (this.$app.isMiniProgram()) {
                    let isbn = this.$router.query('isbn')
                    window.localStorage.removeItem('isbn')
                    if (isbn === '1') {
                        window.localStorage.setItem('isbn', '1')
                    }
                    if (this.$app.isBnMiniApp()) {
                        let code = this.$router.query('code')
                        if (code) {
                            this.selectMiniAppOpenid(code, (r) => {
                                if (r.openid) {
                                    localStorage.setItem('gift_insurance_openid', r.openid)
                                }
                            })
                        }
                    }
                }
            },
            selectMiniAppOpenid (code, callback) {
                this.$request({
                    url: '/portal/startMp',
                    method: 'POST',
                    data: {code: code},
                    contentType: 'application/json',
                    successFn: (data) => {
                        callback(data)
                    },
                    failFn: (data) => {}
                })
            },
            /**
             * 赠险浏览产品详情
             */
            shenceZxViewDetails(){
                sensors.track("zx_view_details", {
                    gift_name: document.title,
                    secondaryDistributor:this.secondaryDistributor
                });
            },
            goDrugList () {
                //药品目录
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2019/12/20191230/1/onlineins/onlineins_1_1_20191230113408791.pdf");
            },
            goServiceManual () {
                //服务手册
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200210/1/onlineins/onlineins_1_1_20200210163022059.pdf");
            },
            goPharmacyDistribution () {
                //药房分布
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2019/12/20191230/1/onlineins/onlineins_1_1_20191230113503778.pdf");
            },
            goViewYaoHuiTong () {
                //查看药惠通
                this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2019/11/20191120/1/5032/5032_1_1_20191120144938558.pdf");
            },
            goFree () {
                window.location.href = this.$router.siteUrl() + '/product/giftInsurance/GiftInsurance.html?productRiskId=' + this.productRiskId + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor
            }
        }
    }
</script>

<style>
    .title_png_frist {
        width:100%;
        height:301px;
        position: relative;
    }
    .title_png_frist img{
        width: 100%!important;
        height: 100%;
        display:block;
        border: 0;
    }
    .title_png_two {
        width:100%;
        height:526px;
        position: absolute;
        top:0;
    }
    .title_png_second img{
        width: 100%!important;
        display:block;
        border: 0;
        margin-top: -1px;
    }
    .banner-list {
        width:94%;
        height:839px;
        border-radius: 20px;
        margin: 50px auto;
        box-shadow:0px 0px 8px 0px rgba(13,79,189,0.19);
    }
    .img_list_1 {
        display: flex;
    }
    .img_list_1_1 {
        width:146px;
        height:146px;
        padding: 48px 0 0 53px;
    }
    .img_list_text {
        padding: 81px 0 0 32px;
    }
    .img_list_text_2 {
        padding: 56px 0 0 32px;
    }
    .img_list_text_black {
        height:34px;
        font-size:34px;
        font-family:FZLanTingHeiPro_GB18030;
        font-weight:bold;
        color:rgba(94,104,118,1);
        line-height:40px;
    }
    .span-orange {
        height:34px;
        font-size:34px;
        font-family:FZLanTingHeiPro_GB18030;
        font-weight:bold;
        color:rgba(251,73,40,1);
        line-height:40px;
    }
    .img_list_text_blue {
        height:28px;
        font-size:32px;
        font-family:FZLanTingHeiPro_GB18030;
        font-weight:600;
        color:rgba(79,150,252,1);
        line-height:40px;
        padding-top: 11px;
    }
    .span-black {
        height:31px;
        font-size:32px;
        font-family:FZLanTingHeiPro_GB18030;
        font-weight:500;
        color:rgba(94,104,118,1);
        line-height:40px;
    }
    .content-list {
        width:94%;
        height:1588px;
        border-radius: 20px;
        margin: 76px auto;
        box-shadow:0px 0px 8px 0px rgba(13,79,189,0.19);
        margin-bottom: 170px;
    }
    .content-list-top {
        height:102px;
        line-height: 102px;
        background:rgba(132,181,255,1);
        border-radius:10px 10px 0px 0px;
    }
    .content-list-top_p {
        height:40px;
        font-size:42px;
        font-family:FZLanTingHei-EB-GBK;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .content-list-two {
        height:76px;
        line-height: 76px;
        display: flex;
        background: rgba(255,255,255,1);
    }
    .content-list-left {
        width:30%;
        height:26px;
        font-size:26px;
        font-family:FZLanTingHeiS-DB1-GBK;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align:center;
    }
    .content-list-two-right {
        width:60%;
        height:26px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .content-list-three {
        height:200px;
        line-height: 200px;
        display: flex;
        background:rgba(242,247,255,1);
    }
    .content-list-three-right {
        height:26px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:38px;
        padding-top:24px;
        white-space: nowrap;
    }
    .content-list-four {
        height:127px;
        line-height:127px;
        display: flex;
        background: rgba(255,255,255,1);
    }
    .content-list-four-right {
        height:26px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:36px;
        padding-top:29px;
    }
    .content-list-five {
        height:208px;
        line-height: 208px;
        display: flex;
        background:rgba(242,247,255,1);
    }
    .content-list-five-right {
        height:26px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:36px;
        padding-top:24px;
    }
    .content-list-six {
        height:324px;
        line-height:324px;
        display: flex;
        background: rgba(255,255,255,1);
    }
    .content-list-six-right {
        height:26px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:46px;
        padding-top:24px;
    }
    .text-small {
        height:491px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:36px;
    }
    .content-content {
        width:95.7%;
        height:658px;
        border-radius: 0 0 20px 20px;
        margin-left:15px;
        box-shadow:0px 0px 8px 0px rgba(13,79,189,0.19);
    }
    .content-content-frist {
        width:596px;
        height:122px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
        margin:auto;
    }
    .content-content-two {
        width:598px;
        height:170px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
        margin:36px auto;
    }
    .content-content-three {
        width:598px;
        height:122px;
        font-size:26px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
        margin:44px auto;
    }
    .content-content-four {
        width:598px;
        height:122px;
        font-size:22px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
        margin:44px auto;
    }
    .bottom-follow {
        width:100%;
        height:108px;
        background:rgba(255,255,255,1);
        border-top:1px solid rgba(227,233,243,1);
        position: fixed;
        bottom: 0;
        display: flex;
        align-items:center;
        /* justify-content: space-around; */
        padding: 13px 0;
    }
    .botton-money {
        height:38px;
        font-size: 40px;
        font-family:FZLanTingHeiS-DB1-GBK;
        font-weight:400;
        color:rgba(142,142,142,1);
        padding-left:98px;
        text-decoration:line-through;
        white-space: nowrap;
    }
    .bottom-button {
        width:408px;
        height:88px;
        background:rgba(254,72,23,1);
        border-radius:10px;
        margin-left:90px;
    }
    .botton-text {
        font-size:30px;
        font-family:FZLanTingHei-R-GBK;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .whiteBox{
        height: 0.16rem;
    }
</style>
