<template>
    <div class="section">

        <div class="contentMiddle">

            <div class="contentTop">
                <h3>"{{riskName}}"</h3>
                <p>
                    "附加投保人豁免责任"需对投保人的健康状况进行确认，请如实告知，投保人是否有以下情形之一
                </p>
            </div>
            <p v-if="showChildHealth" class="healthContent">
                1.	您的投保申请是否曾被本公司或其他保险公司拒保、延期、加收额外保费、索赔？(因怀孕导致的可不用告知)<br/>
                2.	您目前的体格指数【BMI=体重（公斤）÷身高（米）÷身高（米）】是否BMI≥28？<br/>
                3.	您有无连续服药超过2个月或连续因病住院超过15天？是否正在接受治疗？<br/>
                4.	您是否目前患有或曾经患有下列疾病或症状：恶性肿瘤、脑部肿瘤、性质不明的肿瘤或肿块、血压升高（收缩压≥150mmHg或舒张压≥100mmHg）、肝炎、肝炎病毒感染史或携带史、甲状腺疾病、糖尿病、心脏疾病、冠心病、脑血管疾病、中风、癫痫、多发性硬化、智能障碍、精神疾病、重症肌无力、Ⅲ度烧伤、植物人状态、反复发作的哮喘、肺气肿、慢性阻塞肺疾病、暴发性肝炎、肝硬化、多发性肝囊肿、重度脂肪肝、慢性胰腺炎、慢性肾炎、尿毒症及其他慢性肾脏疾病、类风湿病、系统性红斑狼疮、白血病、再生障碍性贫血、血友病、原因不明的六个月内体重减轻五公斤以上者、失明、上肢腕关节以上或下肢踝关节以上缺失、一个肢体(含一个肢体)以上功能丧失、咀嚼功能丧失、瘫痪、吸毒、性病、艾滋病或艾滋病病毒感染？<br/>
                5.	您是否有身体残障、酒精或药物滥用成瘾、是否曾因身体原因被医生警告戒烟或戒酒、是否患职业病，如尘肺、矽肺、各种慢性中毒？<br/>
                6.	最近两年内是否因受伤或疾病曾接受或被建议或正打算接受医师诊察、治疗或用药？(因普通伤风或感冒、轻微的胃肠炎、无并发症的剖腹产、避孕、疫苗接种、轻微关节或肌肉损伤或无并发症的骨折并已经完全康复的可不用告知)<br/>
                7.	您是否近一年有新发或以往既有以下症状？反复头痛或眩晕、晕厥、咯血、胸痛、呼吸困难、呕血、黄疸、便血、听力下降、食欲不振、耳鸣、复视、视力明显下降、原因不明的皮肤和粘膜及齿龈出血、原因不明发热、原因不明的肌肉萎缩、原因不明的包块或肿物、结节、身体的其他感觉异常或活动障碍。<br/>
                8.	女性补充告知：您是否怀孕及生产期间有合并症？例如蛋白尿、高血压、糖尿病、宫外孕等。您是否曾被建议针对乳房、子宫、卵巢、宫颈疾病进行定期复查或治疗？<br/>
                9.	两周岁以下（含两周岁）儿童补充告知：是否为早产、难产？出生时是否曾有产伤、窒息等异常情况？是否有发育迟滞、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病、畸形或缺陷<br/>
                10.	您是否：（1）从事如下涉及或接触危险物职业：矿工、航海、海上救护、潜水、水下作业人员、爆破工、采掘工、隧道坑道或井下作业、机械加工业搬运工、电讯电台及电力部门天线设施的制造、安装、维修人员、硫酸盐酸或硝酸等有毒化工产品制造人员、森林砍伐人员、火药爆竹制造及加工、液化气体制造、高压电工程作业人员、高空作业人员、战地记者、高空杂技、特技、武打演员、动物园驯兽师；（2）现役军、警人员：防暴警察及负有特殊任务者、地面部队人员、水兵、空军飞行员、前线军人、特种兵（伞兵、海军陆战队、化学兵、布雷爆破任务兵）；（3）曲棍球、橄榄球球员、滑雪教练、滑雪运动员；（4）正在或计划参加跳伞、滑翔、探险、武术摔跤比赛、特技表演、私人飞行、赛车、竞马、潜水、登山攀岩等任何带有危险性的运动或嗜好。<br/>

            </p>
            <p v-else class="healthContent">
                1.	您的投保申请是否曾被本公司或其他保险公司拒保、延期、加收额外保费、索赔？(因怀孕导致的可不用告知)<br/>
                2.	您目前的体格指数【BMI=体重（公斤）÷身高（米）÷身高（米）】是否BMI≥28？<br/>
                3.	您有无连续服药超过2个月或连续因病住院超过15天？是否正在接受治疗？<br/>
                4.	您是否目前患有或曾经患有下列疾病或症状：恶性肿瘤、脑部肿瘤、性质不明的肿瘤或肿块、血压升高（收缩压≥150mmHg或舒张压≥100mmHg）、肝炎、肝炎病毒感染史或携带史、甲状腺疾病、糖尿病、心脏疾病、冠心病、脑血管疾病、中风、癫痫、多发性硬化、智能障碍、精神疾病、重症肌无力、Ⅲ度烧伤、植物人状态、反复发作的哮喘、肺气肿、慢性阻塞肺疾病、暴发性肝炎、肝硬化、多发性肝囊肿、重度脂肪肝、慢性胰腺炎、慢性肾炎、尿毒症及其他慢性肾脏疾病、类风湿病、系统性红斑狼疮、白血病、再生障碍性贫血、血友病、原因不明的六个月内体重减轻五公斤以上者、失明、上肢腕关节以上或下肢踝关节以上缺失、一个肢体(含一个肢体)以上功能丧失、咀嚼功能丧失、瘫痪、吸毒、性病、艾滋病或艾滋病病毒感染？<br/>
                5.	您是否有身体残障、酒精或药物滥用成瘾、是否曾因身体原因被医生警告戒烟或戒酒、是否患职业病，如尘肺、矽肺、各种慢性中毒？<br/>
                6.	最近两年内是否因受伤或疾病曾接受或被建议或正打算接受医师诊察、治疗或用药？(因普通伤风或感冒、轻微的胃肠炎、无并发症的剖腹产、避孕、疫苗接种、轻微关节或肌肉损伤或无并发症的骨折并已经完全康复的可不用告知)<br/>
                7.	您是否近一年有新发或以往既有以下症状？反复头痛或眩晕、晕厥、咯血、胸痛、呼吸困难、呕血、黄疸、便血、听力下降、食欲不振、耳鸣、复视、视力明显下降、原因不明的皮肤和粘膜及齿龈出血、原因不明发热、原因不明的肌肉萎缩、原因不明的包块或肿物、结节、身体的其他感觉异常或活动障碍。<br/>
                8.	女性补充告知：您是否怀孕及生产期间有合并症？例如蛋白尿、高血压、糖尿病、宫外孕等。您是否曾被建议针对乳房、子宫、卵巢、宫颈疾病进行定期复查或治疗？<br/>
                9.	两周岁以下（含两周岁）儿童补充告知：是否为早产、难产？出生时是否曾有产伤、窒息等异常情况？是否有发育迟滞、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病、畸形或缺陷<br/>
                10.	您是否：（1）从事如下涉及或接触危险物职业：矿工、航海、海上救护、潜水、水下作业人员、爆破工、采掘工、隧道坑道或井下作业、机械加工业搬运工、电讯电台及电力部门天线设施的制造、安装、维修人员、硫酸盐酸或硝酸等有毒化工产品制造人员、森林砍伐人员、火药爆竹制造及加工、液化气体制造、高压电工程作业人员、高空作业人员、战地记者、高空杂技、特技、武打演员、动物园驯兽师；（2）现役军、警人员：防暴警察及负有特殊任务者、地面部队人员、水兵、空军飞行员、前线军人、特种兵（伞兵、海军陆战队、化学兵、布雷爆破任务兵）；（3）曲棍球、橄榄球球员、滑雪教练、滑雪运动员；（4）正在或计划参加跳伞、滑翔、探险、武术摔跤比赛、特技表演、私人飞行、赛车、竞马、潜水、登山攀岩等任何带有危险性的运动或嗜好。<br/>

            </p>
        </div>

      <!--  <div class="contentBottom">
         &lt;!&ndash;  <p class="partOne" @click="goDisagree">
                <span>部分有</span></p>
            <a class="partTwo" @click="goBuy">以上情况全无</a>&ndash;&gt;

            <p class="partOne" @click="goDisagree">部分有</p>
            <p class="partTwo" @click="goBuy">以上情况全无</p>
        </div>-->

        <div class="contentBottom"  v-if="ifBtnShow">
            <p  @click="goDisagree">
                <span>部分有</span></p>
            <a @click="goBuy">以上情况全无</a>
        </div>
        <div class="contentBottom2" v-else>
            <p @click="showToast">
                <span>部分有</span>
            </p>
            <a @click="showToast">以上情况全无</a>
        </div>
        <!--icon="warn"-->
        <md-dialog
            :closable="true"
            v-model="iconDialog.open"
            title="未能通过"
            :btns="iconDialog.btns"
        >

            <p style="text-align:center;padding:10px 0;line-height:30px;">投保人未能通过健康测试<br/>建议取消“附加投保人豁免责任”</p>
        </md-dialog>
    </div>
</template>

<script>
    import {Dialog, Button, Toast} from 'mand-mobile'
    import '../../assets/detail.scss'
    import {debounce} from "@/utils/utils"
    import {getRiskTypeName} from "@/utils/dictionary" // 神策数据字典
    export default {
        name: 'health',
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
        },
        data() {
            return {
                insGiftInsuranceManage: '',
                ifBtnShow: false,
                agentCode: '',
                basicDialog: {
                    open: false,
                },
                contentDetail:'',
                buyAdd:'',
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确定',
                            handler: this.onIconConfirm,
                        }/*,
                        {
                            text: '进入智能核保',
                            handler: this.onIconConfirm,
                        },*/
                    ],
                },
                warnDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                        },
                        {
                            text: '警示操作',
                            warning: true,
                        },
                    ],
                },
                riskName:'',
                product_id:'',
                riskCode:'',
                showChildHealth:false,
                agreeHealth:false,
                riskInfo:{}
            }
        },
        created(){
            this.product_id = this.$router.query('product_id')
            this.insGiftInsuranceManage = window.localStorage.getItem("insGiftInsuranceManage")
            this.$app.wxProductDetail(this.product_id, 1)
            this.agentCode = this.$router.query('agentCode')
            this.contentDetail = JSON.parse(localStorage.getItem('guarantee'))
            this.riskName = JSON.parse(window.localStorage.getItem('riskName'))
            this.getRiskCode()
            //判断是否为代理人，跳转不同路径
            if(this.insGiftInsuranceManage){
               if(this.agentCode){
                   this.buyAdd = this.$router.siteUrl() +'/product/HealthYht.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode
               }else{
                   this.buyAdd = this.$router.siteUrl() +'/product/HealthYht.html?product_id=' + this.product_id
               }
            }else{
               if (this.agentCode==="") {
                  this.buyAdd = 'Health.html?product_id='+this.product_id
               }else{
                  this.buyAdd = 'Health.html?product_id=' + this.product_id + "&agentCode=" + this.agentCode;
               }
            }
            this.goBuy = debounce(this.goBuy
            )
        },
        mounted(){
          window.addEventListener("scroll", this.handleScroll);
        },
        updated(){
           if(this.getScrollHeight() <= this.getClientHeight()){
               this.ifBtnShow = true;
           }
        },
        destroyed() {
          window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            showToast() {
              Toast.failed("请上滑至页面底部");
            },
            handleScroll() {
              this.$nextTick(() => {
                let scrollTop =
                  window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop;
                if(scrollTop + this.getClientHeight() >= (this.getScrollHeight()-130)) {
                    this.ifBtnShow = true;
                }
              });
            },
             //获取当前可视范围的高度
            getClientHeight() {
                var clientHeight = 0;
                if(document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                } else {
                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                }
                return clientHeight;
            },
             //获取文档完整的高度
            getScrollHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            },
            goDisagree(){
                this.iconDialog.open = true
                this.agreeHealth = false
                this.loadShenceData(this.riskInfo,()=>{})
            },
            loadShenceData(data,callback) {
                let { riskSubType, riskName, riskCode} = data;
                let riskTypeName = getRiskTypeName(riskCode,riskSubType);
                if(riskSubType == 'HE'){
					if (riskCode == "5315" || riskCode == "5316"|| riskCode == "5032"||riskCode == "5323"||riskCode == "5324"||riskCode == "5325") {
						sensors.track("yl_health_notify", {
						    risk_type: riskTypeName,
						    risk: riskName ,
                            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                            notify_name:`"${riskName}"-附加投保人豁免责任`,//notify_name	健告名称
						    health_notify_type: "投保人",
                            //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
						    if_continue_process:this.agreeHealth
						},callback);
					} else{
						sensors.track("zj_health_notify", {
						    risk_type: riskTypeName,
                            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
						    risk: riskName ,
                            notify_name:`"${riskName}"-附加投保人豁免责任`,//notify_name	健告名称
						    health_notify_type: "投保人",
                            //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
						    if_continue_process:this.agreeHealth
						},callback);
					}
                }else if(riskSubType == 'LF'){
                    sensors.track("rs_health_notify", {
                        risk_type: riskTypeName,
                        secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                        risk: riskName ,
                        notify_name:`"${riskName}"-附加投保人豁免责任`,//notify_name	健告名称
                        health_notify_type: "投保人",
                        //health_notify_result:this.agreeHealth?'以上情况全无':'部分有',
                        if_continue_process:this.agreeHealth
                    },callback);
                }

            },
            goBuy(){
                this.agreeHealth = true
                if(this.riskCode == "1318"){
                   location.href = this.buyAdd
                }else{
                   this.loadShenceData(this.riskInfo,()=>{
                       location.href = this.buyAdd
                   })
                }
            },
            getRiskCode() {
                this.$request({
                    url: `/ins/product/product/risk/${this.product_id}`,
                    params: {},
                    successFn: (data) => {
                        console.log(data);
                        this.riskCode = data.riskInfo.riskCode
                        this.riskInfo = data.riskInfo
                        if(this.riskCode === '5307'){
                           this.showChildHealth = true
                        }else{
                            this.showChildHealth = false
                        }
                        document.title = '健康告知'
                    },
                    failFn: () => {
                        this.showError = true
                    }
                })
            },
            onBasicConfirm() {
                /*  Toast({
                      content: '你点击了确认',
                  })*/
                this.basicDialog.open = false
            },
            onIconConfirm() {
                /*    Toast({
                        content: '你点击了确认',
                    })*/
				if (this.riskCode == "5317") {
				  if (this.agentCode) {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
				      this.product_id +
				      "&agentCode=" +
				      this.agentCode;
				  } else {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
				      this.product_id;
				  }
				} else if (this.riskCode == "5319") {
				  if (this.agentCode) {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
				      this.product_id +
				      "&agentCode=" +
				      this.agentCode;
				  } else {
						window.location.href =
						this.$router.siteUrl() +
						"/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
						this.product_id;
					}
				} else if (this.riskCode == "1318") {
				  if (this.agentCode) {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
				      this.product_id +
				      "&agentCode=" +
				      this.agentCode;
				  } else {
						window.location.href =
						this.$router.siteUrl() +
						"/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
						this.product_id;
					}
				} else if (this.riskCode == "5313") {
				  if (this.agentCode) {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/PlusTrial.html?product_id=" +
				      this.product_id +
				      "&agentCode=" +
				      this.agentCode;
				  } else {
						window.location.href =
						this.$router.siteUrl() +
						"/product/PlusTrial.html?product_id=" +
						this.product_id;
					}
				} else if (this.riskCode == "5305" || this.riskCode == "5307") {
				  if (this.agentCode) {
				    window.location.href =
				      this.$router.siteUrl() +
				      "/product/Trial.html?product_id=" +
				      this.product_id +
				      "&agentCode=" +
				      this.agentCode;
				  } else {
						window.location.href =
						this.$router.siteUrl() +
						"/product/Trial.html?product_id=" +
						this.product_id;
					}
				}
                this.iconDialog.open = false

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .section{
        background: #fff;
        padding-bottom: px2em(150px);
    }
    .contentMiddle{
        color: #666;
        background: #fff;
        /*margin-bottom: 150px;*/
        .healthContent{
            font-size: 26px;
            padding:36px 32px 0;
            line-height: 45px;
            margin: 0 0.4rem ;
            background: rgba(255, 246, 246, 1);
            color: rgba(113, 92, 92, 1);
        }
        h3{
            font-size: 34px;
            font-weight: bold;
            padding-top: 20px;
            color: #333;
            text-align: center;
            line-height:48px;
        }
    }
    /*.contentBottom{
        display: flex;
        height: 118px;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        background: #fff;
        z-index: 100 !important;
        bottom: 0;
        border-top: 1px solid #eee;
        p{
            color:#333;
            background: #ffffff;
            text-align: center;
            font-size: 30px;
        }
        a{
            line-height: 100px;
            background: rgb(215,0,15);
            text-align: center;
            font-size: 34px;
            color: #fff;
        }
        .partOne,.partTwo{
            height: 88px;
            line-height: 1.2rem;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            margin: 15px 0;
            width: 320px;
            border: 1px solid rgb(215,0,15);
        }
        .partOne{
            color: rgb(215,0,15);
            margin-left: 26px;
        }
        .partTwo{
            background: rgb(215,0,15);
            color: #fff;
            margin-right: 26px;
        }
    }*/
    .contentBottom{
        display: flex;
        height: 120px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        align-items:center;
        bottom: 0;
        background: #ffffff;
        p{
            flex: 1;
            height: 80px;
            line-height: 80px;
            justify-content:center;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
        a{
            flex: 1;
            height: 80px;
            line-height: 80px;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
    }
    .contentBottom2{
        display: flex;
        height: 120px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        align-items:center;
        bottom: 0;
        background: #ffffff;
        p{
            flex: 1;
            height: 80px;
            line-height: 80px;
            justify-content:center;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
        a{
            flex: 1;
            height: 80px;
            line-height: 80px;
            color:rgba(225, 3, 18, 1);
            background: #ffffff;
            text-align: center;
            border-top: 1px solid #eee;
            font-size: 30px;
            border: 2px solid rgba(225, 3, 18, 1);
            border-radius: 10px;
            margin: 10px 0.4rem ;
        }
    }
    .blank{
        height: .4rem ;
        background: #f3f3f3;
        width: 100%;
    }
    .parT{
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 32px;
        line-height: 50px;
        font-weight: bold;
    }
    .parS{
        color:  rgb(215,0,15);
    }
    .proposer{
        color:  rgb(215,0,15) !important;
    }
    .healthTitle{
        margin-top: .5rem;
        text-align: center;
        width: 100%;
        padding: 0 !important;
        font-size: 14px !important;
        font-weight: bold;
        color: #666!important;
    }
    .contentTop{
        margin: 0 0.4rem ;
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        height:214px;
        background: rgba(247, 99, 94, 1);
        -webkit-border-radius: 10px 10px 0 0;
        -moz-border-radius: 10px 10px 0 0;
        border-radius: 10px 10px 0 0;
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        h3 {
            color: rgba(255, 255, 255, 1);
            height:50px;
            font-size:34px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            line-height:50px;
            padding-top:36px;
        }
        p{
            padding: 12px 32px 36px;
            height:80px;
            font-size:26px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color: rgba(255, 255, 255, 1);
            line-height:40px;
        }
    }
</style>
<style>
    .md-dialog-btn:last-child {
        background: rgba(225, 3, 18, 1) !important;
        color: rgba(255, 255, 255, 1) !important;
    }
    .md-dialog-actions {
        width:402px !important;
        height:88px !important;
        margin:auto !important;
        margin-bottom: 48px !important;
    }
</style>
