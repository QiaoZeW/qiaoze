<template>
    <div class="section">
      <!--  <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>-->
        <div class="content">
            <div ref="divSearch">
               <!-- <div class="contentTop">
                    <img :src="bannerUrl" class="contentTopImg">
                    <div class="topIntroduce">
                        <img src="../../assets/imgs/kanghuibao/logo.png" class="topLogo">
                        <p>本产品由百年人寿保险股份有限公司承保并负责理赔</p>
                    </div>
                </div>-->

                <div class="contentMiddle">
                    <div class="contS">
                        <ul class="contentMiddleTitle">
                            <li class="myTitle">特别职业种类</li>
                        </ul>

                        <div v-for="(item,index) in specialOccupationList">
                            <ul>
                                <li @click="showOneD(item)">
                                    {{item.title}}
                                </li>
                                <li @click="showOneD(item)">
                                    <span>{{item.detail}}</span>
                                    <img
                                        src="../../assets/imgs/kanghuibao/top.png"
                                        v-if="item.showFlag == true"
                                        class="mediumImg"
                                    >
                                    <img src="../../assets/imgs/kanghuibao/bottom.png" v-else class="mediumImg">
                                </li>
                            </ul>
                            <div class="oneDetail" v-if="item.showFlag == true">
                                <!--<p>{{item.detailDescription}}</p>-->
                                <p class="many-content"  v-html="item.detailDescription"></p>
                            </div>
                        </div>

                       <!-- <ul class="lastUl">
                            <li class="tiaoZhuan" style="width: 100%;max-width: 100%;text-align: right">
                                <button v-if="isclick" style="visibility: visible;">
                                    <a :href="trialAdd" class="shiSuan">保费试算</a>
                                </button>
                                <button v-else style="visibility: hidden;">
                                    <a :href="trialAdd"  class="shiSuan">保费试算</a>
                                </button>
                            </li>
                        </ul>-->
                    </div>
                </div>

              <!--  <p class="toast">
                    更多详情请阅读
                    <span @click="goNotice">《投保须知》</span>和
                    <a @click="goClause" class="product">《产品条款》</a>
                </p>-->
              <!--  <md-landscape v-model="showFullScreen" full-screen>
                    <h2 class="insureKnow">投保须知</h2>
                    <div class="showInsure">
                        <p v-html="insureKnow"></p>
                    </div>
                </md-landscape>-->

                <!--<div class="blank"></div>-->

                <!--后期可能有用-->
                <!-- <div class="middleToast">
                             <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
                                 <md-field>
                                     <md-cell-item title="百年人寿为您提供" bold  >
                                         <div class="parS">
                                             <p><img src="../../assets/imgs/kanghuibao/duihao.png"
                                                     class="duiHao"/><span>支持智能核保</span></p>
                                             <p><img src="../../assets/imgs/kanghuibao/duihao.png"
                                                     class="duiHao"/><span>可犹豫期退保</span></p>
                                             <p><img src="../../assets/imgs/kanghuibao/duihao.png"
                                                     class="duiHao"/><span>提供电子发票</span></p>
                                         </div>
                                     </md-cell-item>
                                 </md-field>
                             </div>
                </div>-->
            </div>

            <!--<div class="blank"></div>-->

           <!-- <div class="medium" ref="medium">
                <p @click="showProduct">
                    <span :class="actives == 0?'active':''">产品特色</span>
                </p>
                <p @click="showShuoMing">
                    <span :class="actives == 1?'active':''">理赔说明</span>
                </p>
                <p @click="showQuestion">
                    <span :class="actives == 2?'active':''">常见问题</span>
                </p>
            </div>-->
            <!--<div class="particular" ref="image">
                <div v-html="riskDetail"></div>
            </div>-->

            <!--<div>
                <div class="shuoming" ref="shuoming">
                    <h3>理赔说明</h3>
                    <div v-html="controduce" class="myShuoMing"></div>
                </div>
            </div>-->

          <!--  <div>
                <div class="often" ref="often">
                    <h3>常见问题</h3>
                    <div v-html="question" class="myQuestion"></div>
                </div>
            </div>-->
           <!-- <div class="contentBottom">
                <p class="customerModal" @click="goCustomer" v-if="showCustomer">
                    <img class="customer" src="../../assets/imgs/customer.png">
                    <span>客服</span>
                </p>
                <p class="bottomP" ref="bottomP">
                    ￥
                    <span class="bottomArt">{{lowPrice}}</span>起
                </p>
                <a class="bottomA" v-if="isclick"  style="display: block" :href="trialAdd">立即投保</a>
                <a class="bottomA" v-else  style="display: none" :href="trialAdd">立即投保</a>
            </div>-->

            <!--<div class="xiTop" ref="xiTop">
                <p @click="showProduct">
                    <span :class="activeQ === 0?'activeQ':''">产品特色</span>
                </p>
                <p @click="showShuoMing">
                    <span :class="activeQ === 1?'activeQ':''">理赔说明</span>
                </p>
                <p @click="showQuestion">
                    <span :class="activeQ === 2?'activeQ':''">常见问题</span>
                </p>
            </div>-->
        </div>
        <!--<div class="floatingWindow" v-if="showCount">{{countDown}}S</div>-->
    </div>
</template>

<script>
    import {
        FieldItem,
        Field,
        DatePicker,
        Landscape,
        Dialog,
        Button,
        Toast,
        Tabs,
        TabPane,
        Popup,
        PopupTitleBar,
        Icon
    } from "mand-mobile";
    import "../../assets/detail.scss";
    import Whirl from "@/components/Whirl";
    import Error from "@/components/Error";
    import { InputItem } from "mand-mobile";
    import Settings from "~/settings.json";
    import { riskTypeNameText } from "@/utils/dictionary" // 神策数据字典

    export default {
        name: "Index",
        components: {
        },
        data() {
            return {
                specialOccupationList: [],
            };
        },
        created() {
            this.loadSpecialOccupationDetail();
        },
        mounted() {
           /* window.addEventListener("scroll", this.handleScroll);
            if (this.evaluation_id) {
                let _this = this;
                if (window.history && window.history.pushState) {
                    history.pushState(null, null, document.URL);
                    window.addEventListener("popstate", _this.closeBrowser, false);
                }
            }*/
        },
        destroyed() {
           /* window.removeEventListener("scroll", this.handleScroll);
            window.removeEventListener("popstate", this.closeBrowser, false);*/
        },
        methods: {
            loadSpecialOccupationDetail(){
                this.specialOccupationList = [
                    {
                    title:'工程技术人员',
                    detail:'详情',
                    showFlag:false,
                    detailDescription:"<span style='font-weight: bold;'>地质勘探工程技术人员：</span>地质勘探工程技术人员</br>" +
                    "<span style='font-weight: bold;'>测绘工程技术人员：</span>大地测量工程技术人员；工程测量工程技术人员</br>" +
                    "<span style='font-weight: bold;'>测绘工程技术人员：</span>海洋测绘工程技术人员(海上作业)</br>" +
                    "<span style='font-weight: bold;'>矿山工程技术人员：</span>采矿工程技术人员；矿寻工程师、技师、领班</br>" +
                    "<span style='font-weight: bold;'>化工工程技术人员：</span>化工生产工程技术人员</br>" +
                    "<span style='font-weight: bold;'>兵器工程技术人员：</span>火炸药工程技术人员；光电火控工程\n技术人员</br>" +
                    "<span style='font-weight: bold;'>电力工程技术人员：</span>发电工程技术人员；输变电工程技术人员</br>" +
                    "<span style='font-weight: bold;'>交通工程技术人员：</span>水上交通工程技术人员(进行水上安全监督管理、搜寻救助等行动)；海上救助打捞工程技术人员(参与海上艘救、打捞行动)</br>" +
                    "<span style='font-weight: bold;'>民用航空工程技术人员：</span>通用航空技术人员(从事航空摄影、航空物探、航空吊挂吊装、石油航空作业、航空环境污染监测、航空护林、播种、喷施、研究航空体育运动等)</br>" +
                    "<span style='font-weight: bold;'>林业工程技术人员：</span>野生动物保护与繁殖利用工程技术人员(研究调查野生动物资源及野生动物驯化、繁殖技术人员)；自然保护区工程技术人员；森林保护工程技术人员；木、竹材加工工程技术人员；森林采伐和运输工程技术人员；经济林和林特产品加工工程技术人员</br>" +
                    "<span style='font-weight: bold;'>海洋工程技术人员：</span>海洋资源开发利用和保护工程技术人员(海洋矿产、油气资源开发利用)；海洋工程勘察设计工程技术人员（进行海洋、海底勘察人员）</br>" +
                    "<span style='font-weight: bold;'>环境保护工程技术人员：</span>紧急救助员</br>"
                    },
                    {
                        title:'飞机和船舶技术人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"飞行驾驶员"
                    }
                    ,
                    {
                        title:'教学人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"飞行教官"
                    }
                    ,
                    {
                        title:'文学艺术工作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"武打演员；特技演员；高空杂技飞车飞人演员"
                    }
                    ,
                    {
                        title:'体育工作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"滑冰运动员；举重运动员；篮球运动员；排球运动员；体操运动员；滑雪运动员；手球运动员；足球运动员；橄榄球球员；乒乓球球员；击剑运动员；水球球员；摔跤运动员</br>" +
                        "<span style='font-weight: bold;'>划船运动：</span>驾乘人员</br>" +
                        "<span style='font-weight: bold;'>泛舟运动：</span>驾乘人员</br>" +
                        "<span style='font-weight: bold;'>风浪板运动：</span>教练员；驾乘人员</br>" +
                        "<span style='font-weight: bold;'>水上摩托车：</span>教练员；驾乘人员</br>" +
                        "<span style='font-weight: bold;'>马术运动：</span>运动员</br>" +
                        "<span style='font-weight: bold;'>拳击运动：</span>教练员；职业拳击运动员；业余拳击运动员</br>"
                    }
                    ,
                    {
                        title:'新闻出版、文化工作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"战地记者；考古工作者"
                    } ,
                    {
                        title:'安全保卫和消防人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"<span style='font-weight: bold;'>人民警察：</span>警务特勤；防暴警察；警校学生</br>" +
                        "<span style='font-weight: bold;'>电信通信传输业务人员：</span>灭火员；防毒防化防核抢险员；一般事故抢险员；建(构)筑物消防员；火灾瞭望观察员(瞭望塔)"
                    } ,
                    {
                        title:'邮政和电信业务人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"<span style='font-weight: bold;'>电信通信传输业务人员：</span>电信工程设施架设人员"
                    }
                    ,
                    {
                        title:'广告从业人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"<span style='font-weight: bold;'>室外工作人员：</span>广告招牌架设人员；霓虹光管安装及维修人员"
                    }
                    ,
                    {
                        title:'购销人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"<span style='font-weight: bold;'>废旧物资回收利用人员：</span>船舶拆解工(机舱、船体拆解)；船舶拆解工(油船清洗工)"
                    }
                    ,
                    {
                        title:'饭店、旅游及健身娱乐场所服务',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:"<span style='font-weight: bold;'>海水浴场：</span>潜水教练</br>" +
                        "<span style='font-weight: bold;'>游乐园动物园：</span>动物园驯兽师</br>" +
                        "<span style='font-weight: bold;'>娱乐场所：</span>保安人员；DJ"
                    }
                    ,
                    {
                        title:'运输服务人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>公路道路运输服务人员：</span>搬运工人</br>
                        <span style='font-weight: bold;'>铁路客货运输服务人员：</span>铁路货运、搬运工人；铁路行李搬运工人</br>
                <span style='font-weight: bold;'>水上运输服务人员：</span>救难船员`
                    }
                    ,
                    {
                        title:'社会服务和居民生活服务人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>供水、供热、供电及生活燃料供应服务人员：</span>锅炉安装、调试、操作、检修人员；瓦斯分装工；液化气送货员</br>
<span style='font-weight: bold;'>环境卫生人员：</span>高楼外部清洁工、烟囱清洁工`
                    }
                    ,
                    {
                        title:'种植业生产人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>园艺作物生产人员：</span>果、茶、桑园艺工</br>
<span style='font-weight: bold;'>农副林特产品加工人员：</span>竹、藤、麻、棕、草制品加工工`
                    }
                    ,
                    {
                        title:'林业生产及野生动植物保护人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>木材采运人员：</span>木材采伐工；集材作业工；木材水运工；装卸归楞工；锯木工人`
                    }
                    ,
                    {
                        title:'畜牧业生产人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>家畜饲养人员：</span>有毒动物饲养工（蛇、蝎子、蜈蚣等）`
                    }
                    ,
                    {
                        title:'渔业生产人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>水产养殖人员：</span>水生植物栽培工；珍珠养殖工(淡水)；珍珠养殖工(海水)；水产养殖潜水工；养殖工人(沿海)</br>
                        <span style='font-weight: bold;'>水产捕捞及有关人员：</span>渔业生产船员；水生动植物采集工；捕鱼人(沿海)`
                    }
                    ,
                    {
                        title:'勘测及矿物开采人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>地质勘查人员：</span>钻探工；坑探工；物探工；地震物探爆炸工；水文、矿山地质工(从事采送水样、矿样和观测获取数据的人员)；海洋地质取样工；地质探测员
</br><span style='font-weight: bold;'>矿物开采人员：</span>露天采矿挖掘机司机；钻孔机司机；井筒冻结工；矿井开掘工；井下采矿工；支护工；矿山提升机、架空索道及绞车等操作工；矿井机车运输工；矿井通风工；火药、雷管等火工品管理工；矿山井下抢险、救灾人员；矿物开采辅助工；海上所有作业人员(潜水人员拒保)
</br><span style='font-weight: bold;'>钻井人员：</span>钻井设备、井架安装工；钻井工；固井工；平台水手；水下设备操作工
</br><span style='font-weight: bold;'>石油、天然气开采人员：</span>油、气井测试工；采油工；采气工；井下作业工
</br><span style='font-weight: bold;'>盐业生产人员：</span>湖盐采掘船工；湖盐采掘爆破工
</br><span style='font-weight: bold;'>其他勘测矿物开采人员：</span>采石业工人；采砂业工人`
                    }
                    ,
                    {
                        title:'金属冶炼、轧制人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>炼铁人员：</span>烧结球团原料工；烧结工；球团焙烧工；烧结成品工；高炉原料工；高炉炉前工；高炉运转工
</br><span style='font-weight: bold;'>炼钢人员：</span>炼钢原料工；平炉炼钢工；转炉炼钢工；电炉炼钢工；炼钢浇铸工；炼钢准备工；整脱模工
</br><span style='font-weight: bold;'>铁合金冶炼人员：</span>铁合金电炉冶炼工；铁合金焙烧工；铁合金湿法冶炼工；铁合金炉外法冶炼工
</br><span style='font-weight: bold;'>重有色金属冶炼人员：</span>重冶备料工；焙烧工；火法冶炼工；湿法冶炼工；电解精炼工；烟气制酸工
</br><span style='font-weight: bold;'>轻有色金属冶炼人员：</span>氧化铝制取工；铝电解工；镁冶炼工；硅冶炼工
</br><span style='font-weight: bold;'>稀贵金属冶炼人员：</span>钨钼冶炼工；钽铌冶炼工；钛冶炼工；稀土冶炼工；贵金属冶炼工；锂冶炼工
</br><span style='font-weight: bold;'>半导体材料制备人员：</span>半导体原料制备工；多晶制取工
</br><span style='font-weight: bold;'>金属轧制人员：</span>轧制原料工；金属轧制工；酸洗工；金属材涂层工；金属材热处理工；焊管工；精整工；金属材丝拉拔工；金属挤压工；铸轧工；钢丝绳制造工
</br><span style='font-weight: bold;'>铸铁管人员：</span>铸管备品工；铸管工；铸管精整工
</br><span style='font-weight: bold;'>碳素制品生产人员：</span>碳素煅烧工；碳素成型工；碳素焙烧工；碳素浸渍工；碳素石墨化工；碳素石墨加工工；碳素纤维工
</br><span style='font-weight: bold;'>硬质合金生产人员：</span>硬质合金混合料制备工；硬质合金成型工；硬质合金烧结工；硬质合金精加工工
</br><span style='font-weight: bold;'>其他金属冶炼、轧制人员：</span>冶炼风机工`
                    }

                    ,
                    {
                        title:'化工产品生产人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>化工产品生产通用工艺人员：</span>化工原料准备工；压缩机工；防腐蚀工；化工工艺试验工
</br><span style='font-weight: bold;'>石油炼制生产人员：</span>油制气工
</br><span style='font-weight: bold;'>煤化工生产人员：</span>备煤筛焦工；焦炉调温工；炼焦工、焦炉机车司机；煤制气工；煤气储运工
</br><span style='font-weight: bold;'>化学肥料生产人员：</span>硫酸铵生产工；过磷酸钙生产工
</br><span style='font-weight: bold;'>无机化工产品生产人员：</span>硫酸生产工；硝酸生产工；盐酸生产工；磷酸生产工；纯碱生产工；烧碱生产工；氟化盐生产工；缩聚磷酸盐生产工；气体深冷分离工、制氧工；工业气体液化工；炭黑制造工；二硫化碳制造工；一般工人
</br><span style='font-weight: bold;'>基本有机化工产品生产人员：</span>脂肪烃生产工；环烃生产工；烃类衍生物生产工
</br><span style='font-weight: bold;'>合成树脂生产人员：</span>聚乙烯生产工；聚丙烯生产工；聚苯乙烯生产工；聚丁二烯生产工；聚氯乙烯生产工；酚醛树脂生产工；环氧树脂生产工；丙烯腈-丁二烯-苯乙烯共聚物(ABS)
</br><span style='font-weight: bold;'>合成橡胶生产人员：</span>顺丁橡胶生产工；乙丙橡胶生产工；异戊橡胶生产工；丁腈橡胶生产工；丁苯橡胶生产工；氯丁橡胶生产工
</br><span style='font-weight: bold;'>化学纤维生产人员：</span>化纤聚合工
</br><span style='font-weight: bold;'>火药制造人员：</span>单基火药制造工；双基火药制造工；多基火药制造工；黑火药制造工；混合火药制造工
</br><span style='font-weight: bold;'>炸药制造人员：</span>单质炸药制造工；混合炸药制造工；起爆药制造工；含水炸药制造工；火药爆竹制造及处理人(包括爆竹、烟火制造工)
</br><span style='font-weight: bold;'>日用化学品生产人员：</span>火柴制造工`
                    }
                    ,
                    {
                        title:'机械制造加工人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>机械冷加工人员：</span>车工；技工
</br><span style='font-weight: bold;'>机械热加工人员：</span>铸造工；锻造工；冲压工；剪切工；焊工；金属热处理工；粉末冶金制造工
</br><span style='font-weight: bold;'>特种加工设备操作人员：</span>电切削工
</br><span style='font-weight: bold;'>冷作钣金加工人员：</span>冷作钣金工
</br><span style='font-weight: bold;'>工件表面处理加工人员：</span>镀层工
</br><span style='font-weight: bold;'>航天器件加工成型人员：</span>航天器件高温处理工
</br><span style='font-weight: bold;'>其他机械制造加工人员：</span>电焊条制造工`
                    }
                    ,
                    {
                        title:'机电产品装配人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>机械设备装配人员：</span>装配钳工；工具钳工
</br><span style='font-weight: bold;'>动力设备装配人员：</span>锅炉设备装配厂；有关高压电之工作人员；铁心叠装工
</br><span style='font-weight: bold;'>电气元件及设备装配人员：</span>变压器、互感器装配工
</br><span style='font-weight: bold;'>运输车辆装配人员：</span>铁路机车机械制修工；铁路车辆机械制修工；铁路机车电气装修工；铁路车辆电气装修工；城轨接触网检修工
</br><span style='font-weight: bold;'>日用机械电器制造装配人员：</span>空调机装配工
</br><span style='font-weight: bold;'>枪炮制造人员：</span>火炮装试工
</br><span style='font-weight: bold;'>弹制造人员：</span>炮弹装配工；枪弹装配工；火工装药工
</br><span style='font-weight: bold;'>引信加工制造人员：</span>引信装试工
</br><span style='font-weight: bold;'>火工品制造人员：</span>雷管制造工；索状爆破器材制造工；火工品装配工；爆破器材试验工
</br><span style='font-weight: bold;'>船舶制造人员：</span>船体制造工；拆船工人
</br><span style='font-weight: bold;'>航空产品试验人员：</span>航空环控救生装备试验工(空中试验)
</br><span style='font-weight: bold;'>导弹卫星装配测试人员：</span>航天器引信装配工；弹头装配工；导弹总体装配工；卫星总体装配工
</br><span style='font-weight: bold;'>火箭发动机装配试验人员：</span>液体火箭发动机装配试验工；固体火箭发动机装配工；固体火箭发动机试验工；固体火箭发动机检测工
</br><span style='font-weight: bold;'>靶场试验人员：</span>靶场试射工`
                    }

                    ,
                    {
                        title:'机械设备修理人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`船舶修理工`
                    }

                    ,
                    {
                        title:'电力设备安装、运行、检修及供电人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>电力设备安装人员：</span>电力电缆安装工；高压线路架设工；小风电利用工；微水电利用工
</br><span style='font-weight: bold;'>电力设备检修人员：</span>锅炉本体设备检修工；高压线路带电检修工；变压器检修工；变电设备检修工
</br><span style='font-weight: bold;'>生活生产电力设备安装、操作、修理人员:</span>牵引电力线路安装维护工`
                    },
                    {
                        title:'电子元器件与设备制造、装配调试及维修人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>电池制造人员:</span>铅酸蓄电池制造工；碱性蓄电池制造工；电池制造(工人)`
                    }
                    ,
                    {
                        title:'橡胶和塑料制品生产人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>橡胶制品生产人员：</span>橡胶炼胶工；橡胶半成品制造工；橡胶成型工；橡胶硫化工；废胶再生工；轮胎翻修工`
                    }
                    ,
                    {
                        title:'裁剪缝纫和皮革、毛皮制品加工制作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>皮革、毛皮加工人员：</span>皮革加工工；毛皮加工工`
                    }
                    ,
                    {
                        title:'木材加工、人造板生产及木材制品制作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>木材加工人员：</span>锯木工人；防腐剂工人；木材搬运工人
</br><span style='font-weight: bold;'>人造板生产人员：</span>纤维板工；刨花板工；人造板制胶工
</br><span style='font-weight: bold;'>木材制品制作人员：</span>手工木工；机械木工；木制家具制造工人`
                    }
                    ,
                    {
                        title:'制浆、造纸和纸制品生产加工人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>制浆人员：</span>制浆设备操作工；制浆废液回收利用工
</br><span style='font-weight: bold;'>造纸人员：</span>造纸工`
                    }
                    ,
                    {
                        title:'建筑材料生产加工人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>水泥及水泥制品生产加工人员：</span>水泥生产制造工；水泥制品工；石灰焙烧工；一般工人；采掘工；爆破工
</br><span style='font-weight: bold;'>墙体屋面材料生产人员：</span>加气混凝土制品工
</br><span style='font-weight: bold;'>建筑防水密封材料生产人员：</span>油毡生产工；高分子防水卷材生产工
</br><span style='font-weight: bold;'>建筑保温及吸音材料生产人员：</span>保温材料制造工；吸音材料生产工；珍珠岩制造工
</br><span style='font-weight: bold;'>装饰石材生产人员：</span>装饰石材生产工
</br><span style='font-weight: bold;'>非金属矿及其制品生产加工人员：</span>云母制品加工工；石棉制品工；高岭土制品工：金刚石制品工；人工合成晶体工
</br><span style='font-weight: bold;'>耐火材料生产人员：</span>耐火原料加工工；耐火材料成型工；耐火材料烧成工；耐火制品浸油工；耐火纤维制品工`
                    }
                    ,
                    {
                        title:'玻璃、陶瓷、搪瓷及其制品生产加工人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>玻璃熔制人员：</span>玻璃熔化工；玻璃制板及玻璃成型工；玻璃加工工；玻璃制品装饰加工工
</br><span style='font-weight: bold;'>玻璃纤维及制品生产人员：</span>玻璃纤维制品工；玻璃钢制品工
</br><span style='font-weight: bold;'>石英玻璃制品加工人员：</span>石英玻璃制品加工工`
                    }
                    ,
                    {
                        title:'广播影视制品制作、播放及文物保护作业人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>广播影视舞台设备安装调试及运行操作人员：</span>广播电视天线工
</br><span style='font-weight: bold;'>文物保护作业人员：</span>考古发掘工`
                    }
                    ,
                    {
                        title:'工艺、美术品制作人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`烟花爆竹制作工`
                    }
                    ,
                    {
                        title:'工程施工人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>土石方施工人员：</span>凿岩工；爆破工；土石方机械操作工(推土、铲运机驾驶员、挖掘机驾驶员、打桩工、铲运机操作工)
</br><span style='font-weight: bold;'>钢筋加工人员：</span>钢筋工
</br><span style='font-weight: bold;'>施工架子搭设人员：</span>架子工
</br><span style='font-weight: bold;'>装饰装修人员：</span>油漆工、喷漆工；室外装潢人员；铁门窗制造安装工人；木工；安装玻璃幕墙工人
</br><span style='font-weight: bold;'>古建筑修建人员：</span>古建筑结构施工工
</br><span style='font-weight: bold;'>筑路、养护、维修人员：</span>铁道线路工；桥梁工；隧道工；铁路舟桥工；高速公路工程人员；电线架设及维护工人
</br><span style='font-weight: bold;'>工程设备安装人员：</span>电梯、升降机安装工人(非高空作业)；电梯、升降机安装工人(高空作业)
</br><span style='font-weight: bold;'>其他工程施工人员：</span>拆屋、迁屋工人；海湾港口工程人员；水坝工程人员、挖井工程人员；潜水工作人员；挖泥船工人`
                    }
                    ,
                    {
                        title:'运输设备操作人员及有关人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>公(道)路运输机械设备操作及有关人员：</span>人力三轮车夫
</br><span style='font-weight: bold;'>民用航空设备操作及有关人员：</span>航空摄影员
</br><span style='font-weight: bold;'>水上运输设备操作及有关人员：</span>潜水员；视觉航标工(灯塔、航标维护保养)；航道航务施工工
</br><span style='font-weight: bold;'>起重装卸机械操作及有关人员：</span>起重装卸机械操作工；起重工`
                    }
                    ,
                    {
                        title:'军人',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`特种兵(海军陆站队、伞兵、水兵、爆破兵、蛙人、化学兵、负有布雷爆破任务之工兵、情报单位负有特殊任务者)；
空军飞行官兵、空军海洋巡弋舰艇及潜艇官兵；
前线军人；
军校学生及入伍受训新兵`
                    }
                    ,
                    {
                        title:'其他从业人员',
                        detail:'详情',
                        showFlag:false,
                        detailDescription:`<span style='font-weight: bold;'>特殊运动从业人员：</span>特殊运动班学生（拳击、摔跤、跆拳道等）；武术学校学生`
                    }
                ];
            },
            showOneD(item) {
                item.showFlag = !item.showFlag;
            },
            /*handleScroll() {
                this.$nextTick(() => {
                    let scrollTop =
                        window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;
                    // let searchHeight = this.$refs.divSearch.offsetHeight
                   /!* let a = this.$refs.medium.offsetTop + 100;
                    var b = this.$refs.image.offsetTop;
                    var c = this.$refs.shuoming.offsetTop - 130;
                    var d = this.$refs.often.offsetTop - 130;*!/
                    if (scrollTop >= a) {
                        /!*this.$refs.xiTop.style.display = "flex";
                        this.$refs.xiTop.style.position = "fixed";
                        this.$refs.xiTop.style.top = "0";*!/
                    } else {
                        /!*this.$refs.xiTop.style.display = "none";*!/
                    }
                    if (scrollTop >= b && scrollTop < c) {
                        this.activeQ = 0;
                    } else if (scrollTop >= c && scrollTop < d) {
                        this.activeQ = 1;
                    } else if (scrollTop >= d) {
                        this.activeQ = 2;
                    }
                });
            },*/
           /* closeBrowser() {
                var that = this;
                setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler("closeBrower", { id: 2 }, function(responseData) {});
                });
            },*/
        }
    };
</script>

<style lang="scss" scoped>
/*    @import "../../assets/app";*/

    .content {
        background: #fff;
        position: relative;
    }

    .md-field {
        padding: 0 25px !important;
    }

    .button1.gm-btn {
        background: #1fb2a7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: 36px;
        line-height: 140px;
    }

    .button.gm-btn {
        background: #1fb2a7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: px2em(36px);
        line-height: px2em(140px);
    }

    .contentTop {
        width: 100%;
        .contentTopImg {
            width: 100%;
            position: relative;
        }
        .topIntroduce {
            height: 100px;
            margin-top: -15px;
            position: absolute;
            overflow: hidden;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background: #fff;
            width: 94%;
            /*box-shadow: 0px 4px 15px #6666;*/
            box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            margin-left: 3%;
            .topLogo {
                width: 120px;
                margin-top: 35px;
                display: inline-block;
                margin-left: 15px;
            }
            p {
                font-size: 22px;
                float: right;
                margin-right: 25px;
                margin-top: 25px;
            }
        }
    }

    .contentBottom {
        display: flex;
        height: 100px;
        position: fixed;
        z-index: 100 !important;
        width: 100%;
        bottom: 0;
        .customerModal {
            flex: 0.3;
        }
        .bottomP {
            flex: 0.7;
            line-height: 100px;
        }
        .bottomA {
            flex: 1;
            line-height: 100px;
        }
        a a:visited {
            color: #fff;
        }
    }

    .contentMiddle {
        /*box-shadow: 0px 4px 15px #6666;*/
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        width: 94%;
        //margin-top: 120px;
        margin-left: 3%;
        background: #fff;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        .contentMiddleTitle {
            display: flex;
            font-weight: bold;
            padding: 30px 0 30px;
            border-bottom: 1px solid rgb(237, 237, 237);
            justify-content: space-between;
        }
        .contS {
            width: 96%;
            margin-left: 2%;
            ul {
                display: flex;
                justify-content: space-between;
                margin-top: 0.2rem;
                li:first-child {
                    color: rgb(102, 102, 102);
                    font-size: 28px;
                    width: 3.65rem;
                    white-space: nowrap;
                }
                li:last-child {
                    color: rgb(215, 0, 15);
                    font-size: 28px;
                    max-width: 6rem;
                    span{
                        display: inline-block;
                    }
                }
                li {
                    line-height: 0.7rem;
                }
                button {
                    height: 65px;
                    width: 180px;
                    /*height: .9rem;*/
                    /*width: 2.9rem;*/
                    background: #fff;
                    padding: 10px;
                    font-size: 26px;
                    color: #fff;
                    border: 1px solid #d7000f;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
            .oneDetail {
                margin-top: 15px;
                font-size: 25px;
                padding: 30px 35px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                background: rgb(245, 245, 245);
                color: rgb(153, 153, 153);
            }
            .parT {
            }
        }
    }

    .toast {
        width: 94%;
        margin-left: 3%;
        margin-top: 37px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 24px;
        span {
            color: rgb(215, 0, 15);
        }
    }

    .middleToast {
        width: 100%;
        overflow: hidden;
        .parS {
            margin-top: 20px;
        }
        p {
            width: 31%;
            display: inline-block;
            span {
                font-size: 24px;
                float: left;
                margin-top: -8px;
            }
            img {
                float: left;
                margin-right: 15px;
                display: inline-block;
            }
        }
    }

    .md-cell-item-title {
        font-size: 30px;
    }

    .md-example-child-popup-2 {
        float: left;
        width: 100%;
    }

    .md-button {
        margin-bottom: 20px;
    }

    .md-popup-title-bar .md-popup-cancel .md-icon {
        align-self: flex-start;
        margin-left: 32px;
    }

    .md-example-popup {
        position: relative;
        /*font-size: font-minor-large;*/
        /*background :color-bg-base;*/
        box-sizing: border-box;
        // text-align: center;
        background-color: #fff;
    }

    .md-example-popup-center {
        padding: 50px;
        border-radius: 10px;
    }

    .md-example-popup-top {
        width: 100%;
        height: 75px;
        line-height: 75px;
        background: #4a4c5b;
        color: #fff;
    }

    .md-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .md-example-popup-bottom {
        width: 100%;
        padding: 40px 35px;
        line-height: 0.6rem;
    }

    .md-example-popup-left,
    .md-example-popup-right {
        height: 100%;
        padding: 0 150px;
        display: flex;
        align-items: center;
    }

    p {
        line-height: 50px;
    }

    .shuoming {
        position: relative;
        .wenan {
            position: absolute;
            left: 20%;
            top: 4%;
        }
        h3 {
            color: #d7000f;
            font-size: 30px;
            margin-left: 30px;
            margin-top: 45px;
        }
        img {
            margin-left: 55px;
            display: inline-block;
            margin-top: 30px;
            margin-bottom: 50px;
        }
        .shuoOne {
            .oneTitle {
                display: inline-block;
                font-size: 0.384rem;
                margin-top: 50px;
                color: #333;
            }
            .TwoTitle {
                margin-top: 45px;
                display: inline-block;
                font-size: 0.384rem;
                color: #333;
            }
            .oneBottom {
                font-size: 24px;
                color: #999999;
            }
        }
    }

    .often {
        width: 100%;

        .A {
            float: left;
            margin-top: 10px;
            color: #333;
        }
        h3 {
            color: #d7000f;
            font-size: 30px;
            margin-left: 30px;
            margin-top: 45px;
        }
        p {
            width: 87%;
        }
        .questionOne {
            margin-left: 30px;
            margin-top: 40px;
            font-size: 26px;
        }
    }

    .blank {
        height: 20px;
        background: #f3f3f3;
        width: 100%;
    }

    .xiTop {
        display: none;
        width: 100%;
        height: 105px;
        background: #f3f3f3;
        p {
            flex: 1;
            line-height: 105px;
            text-align: center;
            font-size: 26px;
        }
    }

    .medium {
        display: flex;
        width: 100%;
        height: 105px;
        background: #fff;
        p {
            flex: 1;
            line-height: 105px;
            text-align: center;
            font-size: 26px;
            span {
                display: inline-block;
            }
            .active {
                border-bottom: 1px solid #d7000f;
                color: #d7000f;
            }
        }
    }

    .liPei {
        height: 500px;
        width: 72px;
    }

    .activeQ {
        font-size: 30px !important;
        color: #d7000f !important;
    }

    .myTitle {
        font-size: 36px !important;
    }

    .topImg {
        height: 30px;
        float: right;
        margin-left: 20px;
        width: 35px;
        margin-top: 15px;
    }

    .mediumImg {
        height: 30px;
        float: right;
        margin-left: 10px;
        width: 35px;
        margin-top: 0.15rem;
    }

    .bottomImg {
        height: 30px;
        float: right;
        margin-left: 20px;
        width: 35px;
        margin-top: 23px;
    }

    .rightImg {
        height: 40px;
        float: right;
        margin-left: 10px;
        width: 40px;
    }

    .tiaoZhuan a a:visited {
        color: #fff;
    }

    .shiSuan {
        color: #d7000f !important;
    }

    .phone {
        color: #d7000f;
    }

    .particular1 {
        height: 719px;
        width: 100%;
    }

    .particular2 {
        height: 787px;
        width: 100%;
    }

    .particular3 {
        height: 1102px;
        width: 100%;
    }

    .particular4 {
        height: 1198px;
        width: 100%;
    }

    .particular5 {
        height: 604px;
        width: 100%;
    }

    .particular6 {
        height: 1550px;
        width: 100%;
        margin-bottom: 50px;
    }

    .particular {
        margin-top: 1px;
    }

    .touBaoHuoMian {
        border-bottom: 1px solid rgb(237, 237, 237);
        padding-bottom: 30px;
        line-height: 75px;
    }

    .hangGao {
        line-height: 60px;
    }

    .lastUl {
        padding-bottom: 30px;
        p {
            font-size: 0.4rem;
            line-height: 1rem !important;
        }
    }

    .bottomP {
        background: #ffffff;
        text-align: center;
        color: rgb(215, 0, 15);
        border-top: 1px solid #f3f3f3;
        font-size: 30px;
        font-weight: bold;
    }

    .bottomA {
        background: rgb(215, 0, 15);
        text-align: center;
        font-size: 34px;
        flex: 1;
        line-height: 100px;
        color: #fff !important;
    }

    .chakan {
        overflow: hidden;
        color: rgb(215, 0, 15);
        margin-top: 15px;
        font-size: 30px;
    }

    .product {
        color: #d7000f !important;
    }

    .bottomArt {
        font-size: 50px;
    }

    .questionTitle {
        color: #333;
    }

    .questionAnswer {
        color: #999;
    }

    .parL {
        display: inline-block;
    }

    .duiHao {
        height: 30px;
        width: 30px;
        margin-right: 10px;
    }

    .section {
        padding-bottom: px2em(150px);
    }

    .myQuestion {
        padding: 50px 30px;
        overflow-x: hidden;
        word-wrap: break-word !important;
        word-break: normal !important;
    }

    .myShuoMing {
        padding: 0 30px;
    }

    .parLq {
        width: 200px;
        height: 200px;
        background: red;
    }

    .md-example-child-landscape {
        .md-button {
            margin-bottom: 20px;
            .md-landscape-content {
                padding: 30px;
                font-size: 30px;
                line-height: 1.5;
                color: #666;
                p {
                    margin-bottom: 30px;
                }
            }
        }
    }

    .insureKnow {
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        background: #e8e8e8;
        position: fixed;
        font-size: 0.5rem;
        font-weight: 600;
    }

    .showInsure {
        padding: 100px 30px 30px;
        overflow-x: hidden;
    }

    .customer {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.1rem;
        margin-left: 0.4rem;
    }

    .customerModal {
        border-right: 1px solid #ccc;
        border-top: 1px solid #f3f3f3;
        background: #fff;
        overflow: hidden;
        line-height: 1.2;
        span {
            display: block;
            margin-left: 0.35rem;
        }
    }

    .floatingWindow {
        position: fixed;
        background: #8c8c8c;
        width: 100px;
        height: 100px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        bottom: 2.5rem;
        right: 0.5rem;
        font-size: 42px;
        color: #fff;
        text-align: center;
        line-height: 1.3rem;
    }
    .many-content{
       /* text-align: left;*/
    }
    .many-content span{
      /*  font-weight: bold !important;*/
    }
</style>
