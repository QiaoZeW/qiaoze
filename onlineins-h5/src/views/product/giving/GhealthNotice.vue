<template>
    <div class="ghealth-notice-wrap">
        <div class="top">
            <h2>
                请如实告知<span class="red">投保人</span>是否有以下情形之一
            </h2>
            <p>
                因您申请投保人豁免保费附加险，请对<span class="red">投保人</span>的健康状况进行确认
            </p>
        </div>
        <div class="center">
            <p>1、 您的投保申请是否曾被本公司或其他保险公司拒保、延期、加收额外保费、索赔？(因怀孕导致的可不用告知)</p>

            <p>2、 您目前的体格指数【BMI=体重（公斤）÷身高（米）÷身高（米）】是否BMI≥28？</p>

            <p>3、 您有无连续服药超过2个月或连续因病住院超过15天？是否正在接受治疗？</p>

            <p>4、
                您是否目前患有或曾经患有下列疾病或症状：恶性肿瘤、脑部肿瘤、性质不明的肿瘤或肿块、血压升高（收缩压≥150mmHg或舒张压≥100mmHg）、肝炎、肝炎病毒感染史或携带史、甲状腺疾病、糖尿病、心脏疾病、冠心病、脑血管疾病、中风、癫痫、多发性硬化、智能障碍、精神疾病、重症肌无力、Ⅲ度烧伤、植物人状态、反复发作的哮喘、肺气肿、慢性阻塞肺疾病、暴发性肝炎、肝硬化、多发性肝囊肿、重度脂肪肝、慢性胰腺炎、慢性肾炎、尿毒症及其他慢性肾脏疾病、类风湿病、系统性红斑狼疮、白血病、再生障碍性贫血、血友病、原因不明的六个月内体重减轻五公斤以上者、失明、上肢腕关节以上或下肢踝关节以上缺失、一个肢体(含一个肢体)以上功能丧失、咀嚼功能丧失、瘫痪、吸毒、性病、艾滋病或艾滋病病毒感染？</p>

            <p>5、 您是否有身体残障、酒精或药物滥用成瘾、是否曾因身体原因被医生警告戒烟或戒酒、是否患职业病，如尘肺、矽肺、各种慢性中毒？</p>

            <p>6、
                最近两年内是否因受伤或疾病曾接受或被建议或正打算接受医师诊察、治疗或用药？(因普通伤风或感冒、轻微的胃肠炎、无并发症的剖腹产、避孕、疫苗接种、轻微关节或肌肉损伤或无并发症的骨折并已经完全康复的可不用告知)</p>

            <p>7、
                您是否近一年有新发或以往既有以下症状？反复头痛或眩晕、晕厥、咯血、胸痛、呼吸困难、呕血、黄疸、便血、听力下降、食欲不振、耳鸣、复视、视力明显下降、原因不明的皮肤和粘膜及齿龈出血、原因不明发热、原因不明的肌肉萎缩、原因不明的包块或肿物、结节、身体的其他感觉异常或活动障碍。</p>

            <p>8、 女性补充告知：您是否怀孕及生产期间有合并症？例如蛋白尿、高血压、糖尿病、宫外孕等。您是否曾被建议针对乳房、子宫、卵巢、宫颈疾病进行定期复查或治疗？</p>

            <p>9、 两周岁以下（含两周岁）儿童补充告知：是否为早产、难产？出生时是否曾有产伤、窒息等异常情况？是否有发育迟滞、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病、畸形或缺陷？</p>

            <p>10、
                您是否：（1）从事如下涉及或接触危险物职业：矿工、航海、海上救护、潜水、水下作业人员、爆破工、采掘工、隧道坑道或井下作业、机械加工业搬运工、电讯电台及电力部门天线设施的制造、安装、维修人员、硫酸盐酸或硝酸等有毒化工产品制造人员、森林砍伐人员、火药爆竹制造及加工、液化气体制造、高压电工程作业人员、高空作业人员、战地记者、高空杂技、特技、武打演员、动物园驯兽师；（2）现役军、警人员：防暴警察及负有特殊任务者、地面部队人员、水兵、空军飞行员、前线军人、特种兵（伞兵、海军陆战队、化学兵、布雷爆破任务兵）；（3）曲棍球、橄榄球球员、滑雪教练、滑雪运动员；（4）正在或计划参加跳伞、滑翔、探险、武术摔跤比赛、特技表演、私人飞行、赛车、竞马、潜水、登山攀岩等任何带有危险性的运动或嗜好。</p>
        </div>
        <div class="bottom">
            <div @click="noPass">部分有</div>
            <div class="allno" @click="pass">以上情况全无</div>
        </div>

        <Gpopup ref="pop" :params="params"/>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'mand-mobile'
    import Gpopup from './Gpopup'
    import{debounce} from '../../../utils/utils'

    export default {
        name: "GhealthNotice",
        components: {
            Gpopup
        },
        data() {
            return {
                params: {
                    pText: `您不符合本产品的健康<br>标准，暂时无法领取`,
                    btnText: '知道了',
                    isBlue: true
                },
                userToken: '',
                infoDatas: {},
                status: '0',
                inviterCode: '',
                shareImgUrl:require('../../../assets/imgs/giving/shareImg.png'),
                secondary:'',
                thirdClass:''
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.pass = debounce(this.pass,300)
                this.$app.getToken((userToken)=>{
                    this.userToken = userToken
                })
                this.infoDatas = JSON.parse(localStorage.getItem("infoDatas")) || {};
                this.status = this.$router.query("status");
                this.inviterCode = this.$router.query("inviterCode") || '';
                this.secondary =  this.$router.query("secondaryDistributor") || ''
                this.thirdClass =  this.$router.query("thirdClassDistributor") || ''
                let options = {}
                options.title= '百年人寿重疾险限时0元购',
                options.desc='重疾险不要钱，帮好友保额翻倍',
                options.href = location.href
                options.link = this.$router.siteUrl() + `/product/giving/Glogin.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
                options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(options)
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('navigationConfig', {
                        'flag_show': 1,
                        'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                        'flag_share': 0, //是否显示分享按钮，1-显示 0-不显示
                        'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                        'share_url': '', //分享跳转的url
                        'share_title': '', //分享标题
                        'share_text': '', //分享描述
                        'share_imgurl': '' //分享图片地址
                    }, function (response) {
                    })
                })
            },
            noPass() {
                this.params = {
                    pText: `您不符合本产品的健康标准，暂时无法领取`,
                    btnText: '知道了'
                }
                this.$refs['pop'].show()
            },
            pass() {
                let requestUrl = '/act/giftRisk/receiveGiftRisk'
                if (this.inviterCode) {
                    this.infoDatas.inviterUserCode = this.inviterCode
                }
                if (this.status == '2') {
                    requestUrl = '/act/giftRisk/receiveGiftRiskSecondTime'
                }
                this.$request({
                    url: requestUrl,
                    method: 'POST',
                    isLoading:true,
                    contentType: 'application/json;charset=UTF-8',
                    data:  this.infoDatas,
                    userToken: this.userToken,
                    successFn: (data) => {
                        if (data) {
                            // localStorage.setItem("success", true);
                            location.href = this.$router.siteUrl() + `/product/giving/Gbuy.html?secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
                        }
                    },
                    failFn: (err) => {
                        this.showErrMsg(err)
                    }
                })
            },
            showErrMsg(item){
                if(item.resultCode === 'SYS_ERROR_0097'){
                    this.params = {
                        pText: `一份都不剩了~<br>百年人寿更多精彩活动等着您`,
                        btnText: '立即下载',
                        clickFn: () => {
                            this.$app.downLoadApp()
                        }
                    }
                }else if(item.resultCode === 'SYS_ERROR_0110'){
                    this.params = {
                        pText: `您好友的福利已被领取<br>百年人寿更多精彩活动等着您`,
                        btnText: '立即下载',
                        clickFn: () => {
                            this.$app.downLoadApp()
                        }
                    }
                }else if(item.resultCode === 'SYS_ERROR_0098') {
                    this.params = {
                        pText: `投保人年龄不符~<br>(承保年龄18-45周岁)`,
                        btnText: '确定'
                    }
                } else {
                    this.params = {
                        pText: item.resultMsg ,
                        btnText: '我知道了'
                    }
                }

                this.$refs['pop'].show()
            }
        }
    }
</script>

<style lang='scss' scoped>
    .ghealth-notice-wrap {
        .top {
            width: 682px;
            padding: 40px 50px;
            box-sizing: border-box;
            box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.06);
            border-radius: 10px;
            margin: 10px auto 0;
            .red {
                color: #E93742;
            }
            h2 {
                font-size: 34px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 30px;
            }
            p {
                font-size: 24px;
                color: #333;
                line-height: 40px;
            }
        }
        .center {
            padding: 34px 34px 130px;
            width: 100%;
            box-sizing: border-box;
            p {
                font-size: 28px;
                color: #666;
                line-height: 40px;
            }
        }
        .bottom {
            display: flex;
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            height: 110px;
            > div {
                flex: 1;
                background: #fff;
                font-size: 32px;
                text-align: center;
                line-height: 110px;
                color: #333;
                &.allno {
                    background-color: #E10312;
                    color: #fff;
                }
            }
        }

    }
</style>
