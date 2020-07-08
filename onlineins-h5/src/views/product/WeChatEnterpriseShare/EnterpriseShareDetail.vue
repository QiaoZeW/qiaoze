<template>
  <div class="section">
      <whirl v-if="showWhirl"></whirl>
      <error v-if="showError"></error>
      <div class="content">
        <div ref="divSearch">
          <div class="contentTop">
            <img :src="bannerUrl" class="contentTopImg">
            <div class="topIntroduce">
              <img src="../../../assets/imgs/kanghuibao/logo.png" class="topLogo">
              <p>本产品由百年人寿保险股份有限公司承保并负责理赔</p>
            </div>
          </div>
            <div v-for="(item,index) in cpsAdvImage" :key="index">
                <img :src="item.url" class="contentMiddle2" v-if="item.imagePosition === 1 " @click="goUrl(item)" >
            </div>
            <div v-if="ifPositionImage" style="height: 1.4rem;"></div>
            <div  class="contentMiddle_a">
            <div class="contS">
              <ul class="contentMiddleTitle">
                <li class="myTitle">保障责任</li>
              </ul>

              <div v-for="(item,index) in dutyList" :key="index">
                <ul>
                  <li @click="showOneD(item)">{{item.protectionName}}</li>
                  <li @click="showOneD(item)">
                    <span>{{item.description}}</span>
                    <img
                      src="../../../assets/imgs/kanghuibao/top2.png"
                      v-if="item.showFlag == true"
                      class="mediumImg"
                    >
                    <img src="../../../assets/imgs/kanghuibao/bottom2.png" v-else class="mediumImg">
                  </li>
                </ul>
                <div class="oneDetail" v-if="item.showFlag == true">
                  <span class="to-top"></span>
                  <p>{{item.detailDescription}}</p>
                </div>
              </div>

              <div v-if="insGiftInsuranceManage">
                <ul class="giftIns">
                  <img src="../../../assets/imgs/kanghuibao/giftlogo.png" class="giftIns-tip">
                  <li @click="showGiftins">1年药惠通抗癌特药险</li>
                  <li @click="showGiftins">
                    <span>100万保额</span>
                    <img
                      src="../../../assets/imgs/kanghuibao/top2.png"
                      v-if="giftInsContFlag == true"
                      class="mediumImg"
                    >
                    <img src="../../../assets/imgs/kanghuibao/bottom2.png" v-else class="mediumImg">
                  </li>
                </ul>
                <div class="oneDetail"  v-if="giftInsContFlag == true">
                  <span class="to-top"></span>
                  <p>24种抗癌特药保障；年限额100万、免赔额0元、保险期间1年，等待期30天。保障范围内赔付比例100%（医保目录内药品，有社保未使用社保报销的，赔付比例60%）。<br/>被保险人在等待期30天后，初次经医院确诊发生恶性肿瘤，对于其确诊之日后365个自然日内用于治疗该恶性肿瘤且满足条款所载明条件的特定药品。百年人寿在保险金给付限额内按约定的赔付比例支付恶性肿瘤特种药品费用医疗保险金，限指定或认可的药店购药。<br/>更多详情阅读<span @click="goYhtClause('clause')">《药惠通产品条款》</span><span @click="goDrugList('list')">《药惠通药品清单》</span><span @click="serviceClause('serviceClause')">《药惠通服务手册》</span></p>
                </div>
              </div>

              <md-popup id="tyy" v-model="isPopupShow2.bottom" position="bottom" class="myPopup">
                <yhtinfo :yhtinfoShow="yhtinfoShow" :ifInfoShow="ifInfoShow" @cancelYht="getCancelYht($event)" />
              </md-popup>

              <ul class="lastUl">
                <li class="tiaoZhuan" style="width: 100%;max-width: 100%;text-align: right">
                  <button v-if="isclick" style="visibility: visible;">
                    <a href="javascript:void(0);" v-if="riskCode == 5321" class="shiSuan" @click="goTrialPageLjtb">立即投保</a>
                    <a href="javascript:void(0);" v-else class="shiSuan" @click="goTrialPageBfss">保费试算</a>                  </button>
                <button v-else style="visibility: hidden;">
                    <a href="javascript:void(0);" v-if="riskCode == 5321" class="shiSuan"  @click="goTrialPageBfss">保费试算</a>
                    <a href="javascript:void(0);" v-else class="shiSuan"  @click="goTrialPageBfss">保费试算</a>                </button>
                </li>
              </ul>
            </div>
          </div>

          <p class="toast">
            更多详情请阅读
            <span @click="goNotice">《投保须知》</span>和
            <a @click="goClause" class="product">《产品条款》</a><br>
              <span  @click="goPersonalReminder">《人身险风险提示书》</span><span v-if="riskCode == '5032'" @click="goProductRate">《产品费率表》</span>
          </p>
          <md-landscape v-model="showFullScreen" full-screen>
            <h2 class="insureKnow">投保须知</h2>
            <div class="showInsure">
              <p v-html="insureKnow"></p>
            </div>
          </md-landscape>

          <div class="blank"></div>

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

        <div class="blank"></div>

        <div class="medium" ref="medium">
          <p @click="showProduct">
            <span :class="actives == 0?'active':''">产品特色</span>
          </p>
          <p @click="showShuoMing">
            <span :class="actives == 1?'active':''">理赔说明</span>
          </p>
          <p @click="showQuestion">
            <span :class="actives == 2?'active':''">常见问题</span>
          </p>
        </div>
        <div class="particular" ref="image">
          <div v-html="riskDetail"></div>
        </div>

        <div>
          <div class="shuoming" ref="shuoming">
            <h3>理赔说明</h3>
            <div v-html="controduce" class="myShuoMing"></div>
          </div>
        </div>

        <div>
          <div class="often" ref="often">
            <h3>常见问题</h3>
            <span class="showAllText" @click="showAll" v-show="showAllText">{{ showAllText }}>></span>
            <div v-show="!isShowAll" v-html="questionLittle" class="myQuestion"></div>
            <div v-show="isShowAll" v-html="question" class="myQuestion"></div>
          </div>
        </div>
        <div class="contentBottom" :class="{'isIphonex': isIphonex}">
          <p class="customerModal" @click="goCustomer" v-if="showCustomer">
            <img class="customer" src="../../../assets/imgs/customer.png">
            <span>客服</span>
          </p>
          <p v-if="!isBrowser &&!isBnMiniApp && showExlogin" class="customerModal" @click="goExlogin">
            <img class="customer exlogin" src="../../../assets/imgs/cps_icon.png">
            <span>保单</span>
          </p>
          <p class="bottomP" ref="bottomP">
            ￥
            <span class="bottomArt">{{lowPrice}}</span><span v-if="riskCode != '5321'">起</span>
          </p>
          <a class="bottomA"  v-if="isclick && ifCpsFlag && riskCode == '5317'"  href="javascript:void(0);" @click="goTrialPageLjtb">保费测算</a>
          <a class="bottomA"  v-else-if="isclick"  href="javascript:void(0);" @click="goTrialPageLjtb">立即投保</a>
          <a class="bottomA"  v-else href="javascript:void(0);" style="pointer-events: none;cursor: default;background: #ccc;" >立即投保</a>
        </div>
        <div class="empty" v-if="isIphonex"></div>

        <div class="xiTop" ref="xiTop">
          <p @click="showProduct">
            <span :class="activeQ === 0?'activeB':''">产品特色</span>
          </p>
          <p @click="showShuoMing">
            <span :class="activeQ === 1?'activeB':''">理赔说明</span>
          </p>
          <p @click="showQuestion">
            <span :class="activeQ === 2?'activeB':''">常见问题</span>
          </p>
        </div>
      </div>
      <div class="floatingWindow" v-if="showCount">{{countDown}}S</div>
      <div v-for="(item,index) in cpsAdvImage" :key="index">
          <img :src="item.url" class="contentMiddle1" v-if="item.imagePosition === 3 " @click="goUrl(item)" >
      </div>
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
import "../../../assets/detail.scss";
import Whirl from "@/components/Whirl";
import Error from "@/components/Error";
import { InputItem } from "mand-mobile";
import Settings from "~/settings.json";
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { getProdFlag, debounce, throttle} from "@/utils/utils"
import Yhtinfo from "@/components/GiftInsurance/Yhtinfo";
// import wx from "weixin-js-sdk";

export default {
  name: "Index",
  components: {
    [DatePicker.name]: DatePicker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Dialog.name]: Dialog,
    [Landscape.name]: Landscape,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [InputItem.name]: InputItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon,
    Yhtinfo,
    Error,
    Whirl
  },
  data() {
    return {
        insGiftInsuranceManage: '',
        isPopupShow2: {},
        yhtinfoShow: false,
        ifInfoShow: '',
        giftInsContFlag: false,
        ifCpsFlag: false,
        showExlogin: false,
        showHeight: 0,
        $myQuestion: null,
        isShowAll: false,
        showAllText: '展开',
        cpsWS:'',
        wxShareSign:'',
        ifPositionImage:true,
        advertising: false,
        cpsCode:'',
        cpsAdvImage:[],
        image:{
            url:undefined,
            imageType:undefined
        },
      strategy:[],
      wxShareTitle: "", // 微信分享标题
      descContent: "", // 分享描述
      imgUrl: "", //分享小图标
      showBXD: false,
      isclick: true,   //是否有权点击投保
      minDate: new Date("2013/9/9"),
      maxDate: new Date("2019/9/9"),
      currentDate: new Date(),
      dataList: [],
      riskName: "",
      trialAdd: "",
      proData: null,
      showError: false,
      showWhirl: false,
      dutyList: [],
      product_id: null,
      agentCode: "3880100278",
      isPopupShow: {},
      isPopupBoxShow: {},
      isFixed: false,
      lightData: "",
      lightHuo: "",
      dieData: "",
      fatData: "",
      riskCode: "",
      andData: "",
      childData: "",
      actives: "0",
      mediumData: "",
      riskInfo: {},
      showSeven: false,
      riskDetail: null,
      isDatePickerShow: false,
      datePickerValue: "",
      lowPrice: "",
      clauseUrl: "",
      insureKnow: null,
      controduce: null,
      question: null,
      questionLittle: null,
      bannerUrl: "",
      activeQ: null,
      health: null,
      introduce: {},
      modelCode: "",      //模块code
      guaranteeDetails: null,
      knows: {},
      showFullScreen: false,
      basicDialog: {
        open: false,
        btns: [
          {
            text: "确认操作",
            handler: this.onBasicConfirm
          }
        ]
      },
      gathering_id: "",
      articlePro_id: "",
      countDown: 5,
      showCount: false,
      evaluation_id: "",
      isBrowser: false,
      reportDetail_id:'',
      showCustomer:null,
      bxdUrl:'',
      areaCode:'',    //代理人地区code
      options:{

      },
      secondaryDistributor:'',
      isBnMiniApp:false,
      //debounceFlag: true,
      productLink:'',
      isMpLoadFinished:false, //百年小程序登录完成
      thirdClassDistributor:'',
      shareUserCode:''
    };
  },
  computed: {
    isIphonex () {
      if (typeof window !== 'undefined' && window) {
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
      }
      return false
    }
  },
  created() {
    window.localStorage.removeItem("ifGift");
    if('保障攻略'==localStorage.getItem("shence_view_detail_risk_source")){
        this.strategy.push(localStorage.getItem('shence_view_detail_risk_source_sub'));
    }
    this.saveUrlParams();
    this.loadProDetail();
    this.loadDutyDetail();
    this.getProductSaleDate();
    if(this.reportDetail_id){ //reportUser_id
          let that = this
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('backHomeConfig', {
                'flag_back': 0, //是否返回按钮，1-返回 0-不返回
            }, function (response) {
            });
        })
          setupWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler("goEvaluationReport", { reportAdd: that.$router.siteUrl() + '/evaluation/ReportDetail.html?reportUser_id=' + that.reportDetail_id }, function(responseData) {});
          });
      }
    if (this.gathering_id) {
      this.countNum();
      this.showCount = true;
    }
      this.goTrialPageLjtb = debounce(throttle(this.goTrialPageLjtb,2000))//节流防抖防多次跳转到登录
      this.goTrialPageBfss = debounce(throttle(this.goTrialPageBfss,2000))//节流防抖防多次跳转到登录
  },
  mounted() {
    this.$myQuestion = document.querySelector('.myQuestion')
    window.addEventListener("scroll", this.handleScroll);
    this.$app.showCustomerIntelligence((data) => {
        this.showExlogin = data.insOrderFlag
        getProdFlag (this.product_id, (flagData) => {
            this.showBXD = data.showBXD
            // 体内显示或者 体外 客服入口判断显示
            if (flagData.serviceFlag) {
              if(this.isBrowser || this.showBXD){
                  this.showCustomer = true
                  this.$refs.bottomP.style.flex = '.7'
              }else{
                  this.showCustomer = false
                  this.$refs.bottomP.style.flex = '1'
              }
              if (this.evaluation_id) {
                let _this = this;
                if (window.history && window.history.pushState) {
                  history.pushState(null, null, document.URL);
                  window.addEventListener("popstate", _this.closeBrowser, false);
                }
              }
            }

        })
    })
  },
  updated () {
    if (this.$myQuestion.children[9]) {
      let pagebreak = document.querySelector('.ke-pagebreak')
      if (pagebreak) {
        pagebreak.style.opacity = '0'
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("popstate", this.closeBrowser, false);
    //remove storage
    window.localStorage.removeItem("shence_view_detail_risk_source");
  },
  methods: {
      getCancelYht(value){
        this.$set(this.isPopupShow2, "bottom", value)
      },
      goUrl(item){
          if(item.linkUrl && item.linkUrl !== ''){
              if(item.linkUrl.indexOf('?')>-1){
                  location.href = item.linkUrl + '&thirdClassDistributor=' + this.thirdClassDistributor + '&shareUserCode=' +  this.shareUserCode
              }else{
                  location.href = item.linkUrl + '?thirdClassDistributor=' + this.thirdClassDistributor + '&shareUserCode=' +  this.shareUserCode
              }
          }else{
              return false
          }
      },
      goTrialPageLjtb(){
          if(this.isBnMiniApp&&!this.isMpLoadFinished){return} //避免在小程序环境小程序加载token未完成就直接跳转到下已页面
          // if (!this.debounceFlag) return
          // if (this.debounceFlag) {
          //   this.debounceFlag = false
          // }
          // setTimeout(() => {
          //   this.debounceFlag = true
          // }, 1000)
          //顺心保如果没有登录，调用小程序登录
          let userCode =window.localStorage.getItem("miniapp_user_code")||'';
          if (!userCode&&this.riskCode == '5321'&&this.$app.isMiniProgram()&&this.$app.isBnMiniApp()) {
              let url = this.$router.siteUrl() +'/product/Buy.html?product_id=' + this.product_id+'&agentCode='+this.agentCode;
              let u= encodeURIComponent(this.$router.siteUrl()+'/mp/MpHref.html?u='+encodeURIComponent(url));
              wx.miniProgram.navigateTo({url:`/pages/user/login?a=h5login&u=${u}`});
              return;
          }else{
              this.clickPolicyShenceExt();
              window.location.href=this.trialAdd;
          }
      },
      goTrialPageBfss(){
          if(this.isBnMiniApp&&!this.isMpLoadFinished){return} //避免在小程序环境小程序加载token未完成就直接跳转到下已页面

          //顺心保如果没有登录，调用小程序登录
          let userCode =window.localStorage.getItem("miniapp_user_code")||'';
          if (!userCode&&this.riskCode == '5321'&&this.$app.isMiniProgram()&&this.$app.isBnMiniApp()) {
              let url = this.$router.siteUrl() +'/product/Buy.html?product_id=' + this.product_id+'&agentCode='+this.agentCode;
              let u= encodeURIComponent(this.$router.siteUrl()+'/mp/MpHref.html?u='+encodeURIComponent(url));
              wx.miniProgram.navigateTo({url:`/pages/user/login?a=h5login&u=${u}`});
              return;
          }else{
              this.clickCalculateShenceExt();
              window.location.href=this.trialAdd;
          }
      },

      goExlogin () {
        location.href = '/externalPay/ExternalLogin.html?cps=' + this.cpsCode
      },
      showAll () {
        this.isShowAll = !this.isShowAll
        this.showAllText = this.isShowAll ? '收起' : '展开'
      },
      loadAdvertising(){
          // if ((Array.prototype.isPrototypeOf(this.cpsAdvImage) && this.cpsAdvImage.length === 0) || this.cpsAdvImage == null) {
          //     this.advertising = false
          // } else {
          //     this.advertising = true
          // }
           console.log(this.cpsAdvImage,'yyy')
        if ((Array.prototype.isPrototypeOf(this.cpsAdvImage) && this.cpsAdvImage.length === 0) || this.cpsAdvImage == null) {
            this.advertising = false;
            this.ifPositionImage = true;
        } else {
            for(let i = 0;i < this.cpsAdvImage.length;i++){
                if(this.cpsAdvImage[i].imagePosition == 1 && this.cpsAdvImage[i].url != ""){
                  this.ifPositionImage = false;
                }
            }
            this.advertising = true
        }
      },
      //增加神策埋点事件来源
      clickPolicyShenceExt(){
          localStorage.setItem("shence_calculate_risk_button","立即投保");
      },
      clickCalculateShenceExt(){
          localStorage.setItem("shence_calculate_risk_button","保费试算");
      },
    closeBrowser() {
      var that = this;
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("closeBrower", { id: 2 }, function(responseData) {});
      });
    },
    //浮窗倒计时
    countNum() {
      let timer = setInterval(() => {
        this.countDown--;
        if(this.countDown === 0){
            this.saveTimeInfo();
        }
        if (this.countDown === -1) {
          clearInterval(timer);
          window.localStorage.removeItem("startTime");
          this.showCount = false;
        }
      }, 1000);
    },
    //保存阅读数据
    saveTimeInfo() {
      let that = this;
      let currentTime = new Date().getTime() - Number(this.gathering_id);
      let data = {
        resourceId: Number(this.articlePro_id),
        resourceType: "01",
        startTime: this.gathering_id,
        duration: new Date(currentTime) / 1000,
        endTime: new Date().getTime().toString()
      };
      this.$app.getToken(function(userToken) {
        that.$request({
          url: `/assembly/saveReadRecord`,
          method: "POST",
          contentType: "application/json;charset=UTF-8",
          userToken: userToken,
          data: data,
          successFn: data => {},
          errorFn: () => {}
        });
      });
    },
    goCustomer() {
      if (this.isBrowser) {
        setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("goCustomer", { id: 2 }, function(
            responseData
          ) {});
        });
      } else {
        this.$app.getBxdServiceUrl();
      }
    },
    loadShenceData(data) {
      const { riskSubType, riskName, riskCode } = data;
      let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
      let riskSource = localStorage.getItem('shence_view_detail_risk_source')||'首页运营位';
      let secondaryDistributor = localStorage.getItem('cps_secondaryDistributor');
      if(riskSubType == 'HE'){
					if (riskCode == "5315" || riskCode == "5316"||riskCode == "5032"||riskCode == "5323"||riskCode == "5324"||riskCode == "5325") {
						sensors.track("yl_view_details", {
                            risk_source : riskSource,
                            risk_source_sub:this.strategy,
						    risk_type: riskTypeName,
						    risk: riskName,
                            secondaryDistributor:secondaryDistributor
						});
					}
					else if (riskCode == "5321") {
                        sensors.track("yw_view_details", {
                            risk_source : riskSource,
                            risk_source_sub:this.strategy,
                            risk_type: riskTypeName,
                            risk: riskName,
                            secondaryDistributor:secondaryDistributor
                        });
                    }
					else{
						sensors.track("zj_view_details", {
                            risk_source : riskSource,
                            risk_source_sub:this.strategy,
						    risk_type: riskTypeName,
						    risk: riskName,
                            secondaryDistributor:secondaryDistributor
						});
					}
      }else if(riskSubType == 'LF'){

          sensors.track("rs_view_details", {
              risk_type: riskTypeName,
              risk_source_sub:this.strategy,
              risk: riskName,
              risk_source: riskSource,
              secondaryDistributor:secondaryDistributor
          });
      }

    },
    loadProDetail() {
      this.$request({
        url: `/ins/product/product/risk/${this.product_id}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
          this.riskInfo = data.riskInfo;
          this.riskCode = data.riskInfo.riskCode;
          window.localStorage.setItem('riskCode',this.riskCode)
          this.loadClause();
          this.showWhirl = false;

          //神策数据采集
          this.loadShenceData(data.riskInfo);
          this.loadPrice();
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    loadDutyDetail() {
      this.$request({
        url: `/ins/product/insProductProtection/${this.product_id}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
          for (let i = 0; i < data.length; i++) {
            data[i]["showFlag"] = false;
          }
          this.dutyList = data;

          this.showWhirl = false;
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    getProductSaleDate(){
       this.$request({
         url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
         successFn: data => {
             // this.insGiftInsuranceManage = 1
             if(data.insGiftInsuranceManage === null){
                this.insGiftInsuranceManage = ''
             }else{
                this.insGiftInsuranceManage = data.insGiftInsuranceManage
             }
             window.localStorage.setItem("insGiftInsuranceManage",this.insGiftInsuranceManage)
             if(data.productSaleDate){
                let productSaleDateArr = data.productSaleDate.split("-").splice(1)
                console.log(productSaleDateArr)
                let productSaleDate = productSaleDateArr[0] + "月" + productSaleDateArr[1] + "日"
                console.log(productSaleDate)
                this.ifCpsFlag = true
                localStorage.setItem("productSaleDate",productSaleDate)
             }
             localStorage.setItem("ifCpsFlag",this.ifCpsFlag)
         },
         errorFn: () => {
           this.showWhirl = false;
           this.showError = true;
         }
       });
    },
    saveUrlParams () {
      this.agentCode = this.$router.query("agentCode");
      this.product_id = this.$router.query("product_id");
      this.articlePro_id = this.$router.query("articlePro_id");
      this.evaluation_id = this.$router.query("evaluation_id");
      this.isBrowser = this.$app.isBrowser();
      this.gathering_id = this.$router.query("gathering_id");
      this.reportDetail_id = this.$router.query("reportDetail_id");
      if (!this.$app.isBrowser()) {

        //如果是cps投保，需要提前保存cps相关信息
        let cps_thirdClassDistributor = this.$router.query(
          "thirdClassDistributor"
        );
        this.thirdClassDistributor = this.$router.query("thirdClassDistributor");
        let cps_secondaryDistributor = this.$router.query(
          "secondaryDistributor"
        );
        let cps_shareUserCode = this.$router.query("shareUserCode");
        this.shareUserCode = this.$router.query("shareUserCode");
        if (!cps_thirdClassDistributor || !cps_secondaryDistributor) {
          console.log("体外投保没有渠道标识");
        }
        // 添加cps 特殊分享信息存储
        let cps_wxShareSign = this.$router.query(
            "wxShareSign"
        );
        let cpsWS = this.$router.query(
            "cpsWS"
        );
          let goBackUrl = this.$router.queryAll(
              "goBackUrl"
          );
          console.log(goBackUrl)
          goBackUrl ? window.localStorage.setItem("cps_goBackUrl", goBackUrl) : window.localStorage.removeItem("cps_goBackUrl");
          this.cpsCode = cps_secondaryDistributor;
          console.log(this.cpsCode)
        cps_thirdClassDistributor ? window.localStorage.setItem("cps_thirdClassDistributor", cps_thirdClassDistributor) : window.localStorage.removeItem("cps_thirdClassDistributor");
        cps_secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", cps_secondaryDistributor) :  window.localStorage.removeItem("cps_secondaryDistributor");
        cps_shareUserCode ? window.localStorage.setItem("cps_shareUserCode", cps_shareUserCode) : window.localStorage.removeItem("cps_shareUserCode");
        if (cps_wxShareSign !== '' || cpsWS !== '') {
            cps_wxShareSign ? window.localStorage.setItem("cps_wxShareSign", cps_wxShareSign) : window.localStorage.removeItem("cps_wxShareSign");
            cpsWS ? window.localStorage.setItem("cps_cpsWS", cpsWS) : window.localStorage.removeItem("cps_cpsWS");
        }

          //微信小程序获得token
          if(this.$app.isMiniProgram()){
              let isbn = this.$router.query(
                  "isbn"
              );
              window.localStorage.removeItem('isbn');
              if('1'==isbn){
                  window.localStorage.setItem("isbn","1");
              }
            if(this.$app.isBnMiniApp()){
                this.isBnMiniApp=true;
                let code = this.$router.query("code");
                this.$app.getMiniToken(code,(token,error)=>{
                    console.log('mini app token:',token);
                    this.isMpLoadFinished=true;
                    if(error){
                        this.showError=true;
                    }
                });
            }
          }
      }else{
          window.localStorage.setItem("cps_secondaryDistributor", "APP_00010001")
          this.cpsCode = "APP_00010001"
          console.log(this.cpsCode)
      }
    },
      //代理人地区接口
    agentRegioncode(){
        let that = this
        if(this.isclick){
           this.$request({
               url: '/ins/product/validAgent?agentCode='+ this.agentCode,
               successFn: data => {
                   this.areaCode = data.regionCode
                   window.localStorage.setItem("areaCode", JSON.stringify(that.areaCode))
                   this.isclick = true
               },
               failFn:() =>{
                this.isclick = false
                Dialog.alert({content: '代理人无效'})
               },
               errorFn: () => {
                 this.isclick = false
                 console.log('error')
               }
           });
        }
      },
    loadPrice() {
      this.$request({
        url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
            if(data.status == 0){
                this.isclick = false
            }
            this.wxShareTitle = data.shareTitle; // 分享标题
            this.descContent = data.shareContent; // 分享描述
            this.imgUrl = data.minImage; //分享小图标
          this.modelCode = data.modelCode;
          if(this.riskCode =='5321'){
            this.lowPrice = 12
          }else{
            this.lowPrice = data.money;
          }
          this.showWhirl = false;
          this.bannerUrl = data.maxImage;
          this.productLink = data.productLink;
          this.cpsAdvImage = data.cpsAdvImage;
          window.localStorage.setItem("cps_cpsOrderSuccessImag", data.cpsOrderSuccessImag)
          window.localStorage.setItem("cps_cpsOrderSuccessImageUrl", data.cpsOrderSuccessImageUrl)
          this.loadAdvertising();
          this.riskDetail = data.riskDetail;
          this.riskName = data.name;
          document.title = this.riskName;
            //微信小程序发送分享消息标题
            if(this.$app.isMiniProgram()){
                //小程序分享标题消息发送
                if (wx.miniProgram) {
                    wx.miniProgram.postMessage({
                        data: JSON.stringify({
                            action: 'share',
                            key: Math.random().toString(36).substr(2),
                            data: {title: document.title}
                        })
                    });
                }
            }
          window.localStorage.setItem("riskName", JSON.stringify(this.riskName))
          window.localStorage.setItem("locationHref", JSON.stringify(location.href))
          this.$app.wxProductDetail(this.product_id, 0)
          this.controduce = data.claimExplanation;
          this.question = data.commonProblem;
          let pagebreak = data.commonProblem.split(`class="ke-pagebreak"`)
          if (pagebreak.length == '1') {
            this.questionLittle = pagebreak[0]
            this.showAllText = ''
          } else {
            this.questionLittle =  pagebreak[0] + `style="opacity:0;" /></p>`
          }
          this.insureKnow = data.insuranceNotice;
          this.guaranteeDetails = data.guaranteeDetails;
          this.health = data.healthNotification;
          this.introduce.guarantee = this.guaranteeDetails;
          this.introduce.health = this.health;
          window.localStorage.setItem(
            "guarantee",
            JSON.stringify(this.introduce)
          );
          this.knows.insureKnow = this.insureKnow;
          window.localStorage.setItem("knowledge", JSON.stringify(this.knows));
          if(this.riskCode === "5305" || this.riskCode === "5307" || this.riskCode === "1315"){

              //代理人模块
              if(this.modelCode == 1){
                  this.trialAdd = 'Trial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                  this.agentRegioncode()
              }else{
                  this.trialAdd = 'Trial.html?product_id=' + this.product_id;
              }

          } else if(this.riskCode === "5313") {
                  this.trialAdd = 'PlusTrial.html?product_id=' + this.product_id;
          } else if(this.riskCode === "5314") {
                  this.trialAdd = 'KangluxuryTrial.html?product_id=' + this.product_id;
          }else if(this.riskCode === "5315") {
              //医惠通
              if(this.modelCode == 1){
                  this.trialAdd = 'dkorenix/DKorenixTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                  // this.trialAdd = 'dkorenix/dkorenixtrial?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                  this.agentRegioncode()
              }else{
                  this.trialAdd = 'dkorenix/DKorenixTrial.html?product_id=' + this.product_id;
                  // this.trialAdd = 'dkorenix/dkorenixtrial?product_id=' + this.product_id;
              }
          }else if(this.riskCode === "5316") {
              //医无忧
              if(this.modelCode == 1){
                  this.trialAdd = 'nosorrow/NoSorrowTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                  // this.trialAdd = 'nosorrow/nosorrowtrial?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                  this.agentRegioncode()
              }else{
                  this.trialAdd = 'nosorrow/NoSorrowTrial.html?product_id=' + this.product_id;
                  // this.trialAdd = 'nosorrow/nosorrowtrial?product_id=' + this.product_id;
              }
          } else if(this.riskCode === "5318") {
                //康惠保超越
                    if(this.modelCode == 1){
                        this.trialAdd = 'kangbeyond/KangBeyondTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        // this.trialAdd = 'kangbeyond/kangbeyondtrial?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        this.agentRegioncode()
                    }else{
                        this.trialAdd = 'kangbeyond/KangBeyondTrial.html?product_id=' + this.product_id;
                        // this.trialAdd = 'kangbeyond/kangbeyondtrial?product_id=' + this.product_id;
                    }
          } else if(this.riskCode === "5317") {
                //超倍保
                    if(this.modelCode == 1){
                        this.trialAdd = 'chaobeibao/ChaobeibaoTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        // this.trialAdd = 'chaobeibao/chaobeibaotrial?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        this.agentRegioncode()
                    }else{
                        this.trialAdd = 'chaobeibao/ChaobeibaoTrial.html?product_id=' + this.product_id;
                        // this.trialAdd = 'chaobeibao/chaobeibaotrial?product_id=' + this.product_id;
                    }
          } else if(this.riskCode === "5319") {
                //超惠保
                    if(this.modelCode == 1){
                        this.trialAdd = 'chaohuibao/ChaohuibaoTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        // this.trialAdd = 'chaohuibao/chaohuibaotrial?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        this.agentRegioncode()
                    }else{
                        this.trialAdd = 'chaohuibao/ChaohuibaoTrial.html?product_id=' + this.product_id;
                        // this.trialAdd = 'chaohuibao/chaohuibaotrial?product_id=' + this.product_id;
                    }
          } else if(this.riskCode === "5321") {
                //顺心保
                    if(this.modelCode == 1){
                        this.trialAdd = "Buy.html?product_id=" + this.product_id; + '&agentCode=' + this.agentCode;
                        this.agentRegioncode()
                    }else{
                        this.trialAdd = "Buy.html?product_id=" + this.product_id;;
                    }
          } else if(this.riskCode === "5032") {
                //药惠通
                    if(this.modelCode == 1){
                        this.trialAdd = 'yaohuitong/YaohuitongTrial.html?product_id=' + this.product_id + '&agentCode=' + this.agentCode;
                        this.agentRegioncode()
                    }else{
                        this.trialAdd = 'yaohuitong/YaohuitongTrial.html?product_id=' + this.product_id;
                    }
          }else {
              this.trialAdd = 'Trial.html?product_id=' + this.product_id;
          }
          let that = this
          this.$app.getCurrentUserCode(function(userCode) {
            //设置APP内分享
            setupWebViewJavascriptBridge(function(bridge) {
              console.log('data.shareFlag-------', data.shareFlag)
                var herf =  location.href;
                if (that.productLink !==''&& that.productLink !== null){
                  herf = that.productLink + "?product_id="+ that.product_id;
               }
               console.log(herf)
              //导航是否显示分享按钮
              bridge.callHandler(
                "navigationConfig",
                {
                  flag_show: 1,
                  flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                  title: data.shareTitle, //标题
                  flag_share: Number(data.shareFlag), //是否显示分享按钮，1-显示 0-不显示
                  flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                  share_url:
                    herf +
                    "&thirdClassDistributor=" +
                    "&secondaryDistributor=CPS_00010009" +
                    "&shareUserCode=" +
                    userCode, //分享跳转的url
                  share_title: data.shareTitle, //分享标题
                  share_text: data.shareContent, //分享描述
                  share_imgurl: data.minImage //分享图片地址
                },
                function(response) {
                  //alert(response,'');
                }
              );
            });
          });
					// this.shareDetail();
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    goNotice() {
      window.location.href =
        this.$router.siteUrl() +
        "/product/NoticeDetail.html?product_id=" +
        this.product_id;
    },
    goClause() {
      window.location.href =
        this.$router.siteUrl() +
        "/product/ProductClause.html?product_id=" +
        this.product_id;
    },
    goPersonalReminder(){  //跳转人身险风险提示书
        window.location.href = this.$router.siteUrl() + '/product/PersonalReminder.html?product_id='+this.product_id
    },
    goProductRate(){
        this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200108/1/onlineins/onlineins_1_1_20200108152633452.pdf");
    },
    goYhtNotice (value) {             //药惠通投保须知
        // window.location.href =this.$router.siteUrl() + "/product/NoticeDetail.html?product_id=" + this.product_id;
        this.yhtinfoShow = true;
        this.$set(this.isPopupShow2, "bottom", true);
        this.ifInfoShow = value;
    },
    goYhtClause () {             //药惠通产品条款
        this.$app.goPdfView('https://yxfile.aeonlife.com.cn/doc/2019/11/20191120/1/5032/5032_1_1_20191120144938558.pdf');
    },
    goDrugList () {              //药惠通药品清单
        this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200109/1/onlineins/onlineins_1_1_20200109144148636.pdf");
    },
    serviceClause(){
        this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200210/1/onlineins/onlineins_1_1_20200210163022059.pdf");
    },
    loadClause() {
      this.$request({
        url: `/ins/product/productplatform/risk/getriskfileinfoinner`,
        method: "POST",
        data: {
          riskFileQueryList: [
            {
              riskCode: this.riskCode,
              type: "T"
            }
          ]
        },
        contentType: "application/json",
        successFn: data => {
          this.clauseUrl = data.riskFileResultList[0].url;
          this.knows.clauseUrl = this.clauseUrl;
          window.localStorage.setItem("knowledge", JSON.stringify(this.knows));
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // let searchHeight = this.$refs.divSearch.offsetHeight
        let a = this.$refs.medium.offsetTop + 100;
        var b = this.$refs.image.offsetTop;
        var c = this.$refs.shuoming.offsetTop - 130;
        var d = this.$refs.often.offsetTop - 180;
        if (scrollTop >= a) {
          this.$refs.xiTop.style.display = "flex";
          this.$refs.xiTop.style.position = "fixed";
          this.$refs.xiTop.style.top = "0";
        } else {
          this.$refs.xiTop.style.display = "none";
        }
        if (scrollTop >= b && scrollTop < c) {
          this.actives = 0;
          this.activeQ = 0;
        } else if (scrollTop >= c && scrollTop < d) {
          this.actives = 1;
          this.activeQ = 1;
        } else if (scrollTop >= d) {
          this.actives = 2;
          this.activeQ = 2;
        }
      });
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },

    showLoadingToast() {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.hide();
      }, 3000);
    },
    showProduct() {
      this.actives = 0;
      this.activeQ = 0;
      var a = this.$refs.image.offsetTop - 50;
      window.scrollTo(0, a);
    },
    showShuoMing() {
      this.actives = 1;
      this.activeQ = 1;
      var b = this.$refs.shuoming.offsetTop - 75;
      window.scrollTo(0, b);
    },
    showQuestion() {
      this.actives = 2;
      this.activeQ = 2;
        console.log(this.actives);
        console.log(this.activeQ);
        var c = this.$refs.often.offsetTop - 80;
      window.scrollTo(0, c);
    },
    onBasicConfirm() {
      Toast({
        content: "你点击了确认"
      });
      this.basicDialog.open = false;
    },
    showOneD(item) {
      item.showFlag = !item.showFlag;
    },
    showGiftins() {
      this.giftInsContFlag = !this.giftInsContFlag;
    },
    textRender() {
      const args = Array.prototype.slice.call(arguments);
      const typeFormat = args[0]; // 类型
      // const column0Value = args[1] // 第1列选中值
      // const column1Value = args[2] // 第2列选中值
      const column2Value = args[3]; // 第3列选中值
      if (typeFormat === "dd") {
        return `${column2Value}日`;
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {},
    onDatePickerConfirm(columnsValue) {
      this.datePickerValue = this.$refs.datePicker.getFormatDate(
        "yyyy/MM/dd hh:mm"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/app";

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
  background-color: #fff;
  &.isIphonex {
    bottom: 68px;
  }
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
.empty {
  display: flex;
  height: 100px;
  position: fixed;
  background-color: #fff;
  z-index: 99 !important;
  width: 100%;
  bottom: 0;
}
.contentMiddle {
  /*box-shadow: 0px 4px 15px #6666;*/
  box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
  width: 94%;
  margin-top: 120px;
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
        color: #333;
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
      font-size: 28px;
      padding: 30px 35px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      background: rgb(245, 245, 245);
      color: #333333;
    }
    .parT {
    }
  }
}
.oneDetail p span{
    color: #d7000f;
}
.contentMiddle_a {
    /*box-shadow: 0px 4px 15px #6666;*/
    box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
    width: 94%;
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
        color: #333;
        ul {
            display: flex;
            justify-content: space-between;
            margin-top: 28px;
            margin-bottom: 26px;
            font-size: 28px;
            li:first-child {
                width: 3.65rem;
                white-space: nowrap;
            }
            li:last-child {
                max-width: 6rem;
                span{
                    display: inline-block;
                }
            }
            li {
                line-height: 0.7rem;
            }
            button {
                height: 68px;
                width: 208px;
                line-height: 0.48rem;
                /*height: .9rem;*/
                /*width: 2.9rem;*/
                background: #fff;
                font-size: 30px;
                font-weight: 700;
                color: #fff;
                border: 1px solid #d7000f;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
        }
        .oneDetail {
            position: relative;
            margin-top: 28px;
            font-size: 24px;
            padding: 20px 18px 22px 20px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background: rgba(242,242,242,1);
            color: #8E8E8E;
            text-align: justify;
            .to-top{
               position: absolute;
               border-top: none;
               border-left: 15px solid #fff;
               border-right: 15px solid #fff;
               border-bottom: 20px solid rgba(242,242,242,1);
               top: -20px;
               left: 0.8rem;
            }
        }
        .parT {
        }
    }
}
.giftIns{
    position: relative;
}
.giftIns-tip{
    position: absolute;
    width: 52px;
    height: 36px;
    left: 3.58rem;
    top: -0.2rem;
}
.contentMiddle1 {
    width: 94%;
    height: 4rem;
    margin-top: 4%;
    margin-bottom: 4%;
    margin-left: 3%;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;}
.contentMiddle2 {
    width: 94%;
    height: 2.4rem;
    margin-left: 3%;
    margin-top: 15%;
    margin-bottom: 4%;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;}
.toast {
  margin-left: 56px;
  margin-top: 37px;
  margin-bottom: 30px;
  font-size: 26px;

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
  position: fixed;
  /*font-size: font-minor-large;*/
  /*background :color-bg-base;*/
  box-sizing: border-box;
  // text-align: center;
  background-color: #fff;
  bottom: 0;
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
  overflow: hidden;
  position: relative;
  min-height: 325PX;

  .showAllText {
    background: rgb(255,255,255);
    opacity: 0.9;
    filter:alpha(opacity=100);
    position: absolute;
    bottom: -2Px;
    right: 50px;
    color: #d7000f;
    width: 100%;
    height: 40Px;
    background: rgba(255,255,255, 0.9);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 1Px -10Px 20Px #fff;
    -webkit-box-shadow: 1Px -10Px 20Px #fff;
    z-index: 99;
  }


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

.activeB {
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
  height: 20px;
  float: right;
  margin-left: 10px;
  width: 34px;
  margin-top: 0.18rem;
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
  font-weight: 700;
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
  border-top: 1px solid #f3f3f3;
  background: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 1.2;
  img {
    width: 42px;
    height: 42px;
    &.exlogin {
      width: 34px;
      height: 42px;
    }
  }
  span {
    display: block;
    margin-left: 0.35rem;
    font-size: 18px;
    color: #8e8e8e;
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
</style>
<style>
   .myPopup .md-popup-box {
     height: 82% !important;
   }
</style>
