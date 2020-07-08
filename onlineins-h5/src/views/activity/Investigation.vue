<template>
    <div class="investigation-wrap">
        <div class="contentTop">
            <img :src="topImgBg" />
        </div>
        <div v-if="qesLength > 0" class="content">
            <div class="qeswrap">
                <div class="huifang">
                  <div class="form-item" v-for="(item,index) in quesDatas" :key="item.questionNo">
                      <p>{{index+1}}/{{isDiaoyanOpen ? qesLength+diaoyanDatas.length : qesLength}}、{{ item.questionDesc }}</p>
                      <div class="input-item">
                          <input
                            :id="'huifang-'+ item.answer1No"
                            type="radio"
                            :name="'huifang'+item.questionNo"
                            :value="item.answer1No+'-'+item.answer1Desc"
                            v-model="questionList[index].answerNoJoin" />
                          <label :for="'huifang-'+ item.answer1No"></label>
                          <span>{{ item.answer1Desc }}</span>
                      </div>
                      <div class="input-item">
                          <input
                            :id="'huifang-'+ item.answer2No"
                            type="radio"
                            :name="'huifang'+item.questionNo"
                            :value="item.answer2No+'-'+item.answer2Desc"
                            v-model="questionList[index].answerNoJoin" />
                          <label :for="'huifang-'+ item.answer2No"></label>
                          <span>{{ item.answer2Desc }}</span>
                      </div>
                  </div>
                </div>
                <div v-if="isDiaoyanOpen" class="diaoyan">
                    <div class="form-item" v-for="(item,index) in diaoyanDatas" :key="item.id">
                        <p>{{qesLength+index+1}}/{{qesLength+diaoyanDatas.length}}、{{ item.questionDesc }}</p>
                        <div v-if="item.type=='textarea'" class="input-item">
                          <textarea v-model="diaoyanList[index].questionAnwser"></textarea>
                        </div>
                        <div v-else class="input-item" v-for="(child,childindex) in item.answerDatas" :key="childindex">
                            <input :id="child.id" :type="item.type" :name="child.name" :value="child.value" v-model="diaoyanList[index].questionAnwser" />
                            <label :for="child.id"></label>
                            <span>{{ child.value }}</span>
                        </div>
                    </div>
                </div>
                <div class="subbtn">
                  <button id="hf_investigation_visitnext" @click="goNext">下一步</button>
                </div>
            </div>
        </div>
        <div v-else class="content">
            <div class="qeswrap">
                <div class="huifang">
                  <div class="form-item">
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { TabBar, Toast, Dialog } from 'mand-mobile'
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { navGoBack } from "@/utils/utils"
export default {
    name: 'Investigation',
    data() {
        return {
            agentCode: '',
            contNo: '',
            orderNo: '',
            isBrowser: '',
            isMiniApp: '',
            isBnMiniApp: '',
            quesDatas: [],
            userToken: '',
            diaoyanDatas: [
              {
                type: 'radio',
                questionAnwser: '',
                questionNo: 'Q_00001',
                questionDesc: '投保流程是否顺畅？',
                answerDatas: [
                  {value: '是', name: 'diaoyan01', id: 'diaoyan011'},
                  {value: '否', name: 'diaoyan01', id: 'diaoyan012'}
                ],
              },
              {
                type: 'radio',
                questionAnwser: '',
                questionNo: 'Q_00002',
                questionDesc: '产品介绍是否清晰？',
                answerDatas: [
                  {value: '是', name: 'diaoyan02', id: 'diaoyan021'},
                  {value: '否', name: 'diaoyan02', id: 'diaoyan022'}
                ],
              },
              {
                type: 'checkbox',
                questionAnwser: [],
                questionNo: 'Q_00003',
                questionDesc: '您是从什么途径了解到百年人寿APP的？',
                answerDatas: [
                  {value: '微博', name: 'diaoyan031', id: 'diaoyan031'},
                  {value: '知乎', name: 'diaoyan032', id: 'diaoyan032'},
                  {value: '朋友介绍', name: 'diaoyan033', id: 'diaoyan033'},
                  {value: '其他', name: 'diaoyan034', id: 'diaoyan034'},
                ],
              },
              {
                type: 'checkbox',
                questionAnwser: [],
                questionNo: 'Q_00004',
                questionDesc: '您是从什么途径了解到该产品的？',
                answerDatas: [
                  {value: '百年人寿APP', name: 'diaoyan041', id: 'diaoyan041'},
                  {value: '微信', name: 'diaoyan042', id: 'diaoyan042'},
                  {value: '微博', name: 'diaoyan043', id: 'diaoyan043'},
                  {value: '知乎', name: 'diaoyan044', id: 'diaoyan044'},
                  {value: '朋友介绍', name: 'diaoyan045', id: 'diaoyan045'},
                  {value: '其他', name: 'diaoyan046', id: 'diaoyan046'},
                ],
              },
              {
                type: 'textarea',
                questionAnwser: '',
                questionNo: 'Q_00005',
                questionDesc: '请留下您宝贵的意见和建议，让百年为您提供更好的服务和体验。',
              }
            ],
            qesLength: 0,
            questionList: [],
            huifang: null,
            isDiaoyanOpen: false,
            diaoyanList: [],
            topImgBg: require('@/assets/imgs/investigation/bg_03.png')
        }
    },
    computed: {},
    created() {
        if (!this.isBrowser) {
          document.addEventListener("visibilitychange", function () {
              if (!document.hidden) {
                  if (sessionStorage.getItem('visitReady') == 'Y') {
                     location.href = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}&secondaryDistributor=${this.secondaryDistributor}`
                  }
                  window.location.reload();
              }
          }, false);
        }
        document.title="回访问卷"
        this.agentCode= this.$router.query('agentCode') || ''
        this.orderNo = this.$router.query('orderNo') || ''
        // this.contNo = this.$router.query('contNo') || localStorage.getItem('getContNum') || ''
        this.isBrowser = this.$app.isBrowser()
        this.isMiniApp = this.$app.isMiniProgram()
        this.isBnMiniApp = this.$app.isBnMiniApp()
        this.secondaryDistributor = localStorage.getItem('cps_secondaryDistributor') || 'APP_00010001'
        this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || localStorage.getItem('cps_token') || ''
        this.loadOrderDetail((data) => {
          this.contNo = data.insuredInfoList[0].contInfo.contNo || ''
          this.getOrderVisitInfo()
          this.setBackHomeConfig()
          this.getShenceData()
        })
        if (!this.isBrowser) {
          navGoBack(() => {
            if (sessionStorage.getItem('visitReady') == 'Y') {
               location.href = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}&secondaryDistributor=${this.secondaryDistributor}`
            }
          })
        }
    },
    methods: {
        getOrderVisitInfo () { // 订单回访调研信息查询
           this.$request({
               url: `/ins/visit/getOrderVisitInfo`,
               method: 'POST',
               isEncript: true,
               userToken: this.userToken,
               data: {
                orderNo: this.orderNo
               },
               contentType: 'application/json;charset=UTF-8',
               successFn: (data) => {
                   // 返回字段{调研开关:surveyFlag(0:关闭；1:开启),回访状态:rvStatus(0：未回访，1：已回访未调研，2：完成回访调研)}
                   if (data) {
                      if (data.surveyFlag == '1' && !this.agentCode) { // 代理人无调研
                        if (this.secondaryDistributor !== 'APP_00010001') {
                           // 如果不是app渠道就删除此题
                           this.diaoyanDatas.splice(2, 1)
                        }
                        this.diaoyanList = this.diaoyanDatas.map((item,index) => ({
                            'orderNo': this.orderNo,
                            'questionAnwser': item.questionAnwser,
                            'questionNo': item.questionNo ,
                            'userCode': ''
                        }))
                        console.log('this.diaoyanList------', this.diaoyanList)
                        this.isDiaoyanOpen = true
                        this.topImgBg = require('@/assets/imgs/investigation/bg_01.png')
                      }
                   }
                   this.getReturnVisitQuestionnaire()
               },
               failFn: (data) => {
                   Dialog.alert({content: data.resultMsg})
               }
           })
        },
        loadOrderDetail (fn) {
            this.$app.getToken((userToken) => {
              this.$request({
                  url: `/contract/getPolicyDetail`,
                  method: "POST",
                  isLoading: true,
                  isEncript:true,
                  contentType: "application/json;charset=UTF-8",
                  data: { orderNo: this.orderNo },
                  userToken: userToken,
                  successFn: data => {
                      fn && fn(data)
                  },
                  failFn: data => {
                      Dialog.alert({ content: data.resultMsg });
                  }
              });
            })
        },
        goInvitation() {
            if (this.isBrowser) {
                setupWebViewJavascriptBridge((bridge) => {
                    //导航是否显示分享按钮
                    bridge.callHandler(
                        "shareActive", {
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url: this.$router.siteUrl() +
                                "/activity/InvitationShare.html",
                            share_title: "百年人寿官方app上线", //分享标题
                            share_text: "免费领价值百元礼包", //分享描述
                            share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                        },
                        function(response) {
                            //alert(response,'');
                        }
                    );
                });
            } else {
                this.$app.downLoadApp()
            }
        },
        getShenceData(){
            this.$request({
                url: `/ins/order/getOrderRiskForShence/${this.orderNo}`,
                contentType: 'application/json;charset=UTF-8',
                successFn: (data) => {
                    this.aftersaleShenceData(data)
                },
                failFn: (data) => {
                    console.log(data)
                }
            })
        },
        aftersaleShenceData(data){
          const {riskSubType, riskName, riskCode} = data;
          let riskTypeName = getRiskTypeName(riskCode, riskSubType);
          let riskSource = localStorage.getItem('shence_aftersale_questionnaire_risk_source') || '我的保单页';
          sensors.track("bn_oninevisit_huifang_loadquestionnaire", {
            risk_source: riskSource,
            purcahsed_insurance_yn: true,
            risk_type: riskTypeName,
            risk: riskName,
            order_no: this.orderNo,
            cont_no: this.contNo,
            secondaryDistributor: this.secondaryDistributor
          })
        },
        goHome() {
            if (this.order_id) {

            } else {
                if (this.$app.isMiniProgram() && this.$app.isBnMiniApp()) {
                    wx.miniProgram.switchTab({ url: '/pages/home/index' })
                    return;
                }
                if (this.isBrowser) {
                    setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler('backHome', { 'id': 2 }, function(responseData) {})
                    })
                } else {
                    this.iconDialog.open = false;
                    this.$refs.submitbtn.style.background = 'grey';
                }
            }
        },
        setBackHomeConfig () {
          if (this.isBrowser) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('backHomeConfig', {
                    'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                }, function (response) {
                });
            })
          }
        },
        getReturnVisitQuestionnaire() {
            this.$request({
                url: `/ins/visit/getReturnVisitQuestionnaire`,
                userToken: this.userToken,
                data: {
                    "contNo": this.contNo,
                    "customerNo": "",
                    "priority": "6"
                },
                isEncript: true,
                isLoading: true,
                contentType: 'application/json;charset=UTF-8',
                method: 'POST',
                successFn: (data) => {
                    if (data) {
                        this.quesDatas = data.questionList || []
                        this.qesLength = data.questionList.length
                        if (this.qesLength > 0) {
                            this.questionList = this.quesDatas.map(item => ({
                                answerNo: "",
                                questionNo: item.questionNo,
                                questionOrder: item.questionOrder,
                                answerNoJoin: ''
                            }))
                        }
                    }
                },
                failFn: (data) => {
                    Dialog.alert({ content: data.resultMsg })
                }
            })
        },
        validate () {
          // 判断调研是否全部答完
          for (let i = 0; i < this.questionList.length; i++) {
            if (!this.questionList[i].answerNoJoin) {
              Dialog.alert({ content: '请答完题目后提交' })
              return false
            }
          }
          if (this.isDiaoyanOpen) {
            // 判断回访题目是否全部答完
            for (let i = 0; i < this.diaoyanList.length; i++) {
              if (!this.diaoyanList[i].questionAnwser || this.diaoyanList[i].questionAnwser.length == 0) {
                Dialog.alert({ content: '请答完题目后提交' })
                return false
              }
            }
          }
          return true
        },
        goNext () {
          if (!this.validate()) {
            return false
          }
          // 调研提交数据修改['知乎', '微博']转为'知乎，微博' 第三题和第四题
          this.questionList = this.questionList.map(item => {
            item.answerNo = item.answerNoJoin.split('-')[0]
            return item
          })
          let diaoyanSubList = JSON.parse(JSON.stringify(this.diaoyanList)).map((item) => {
            if (typeof item.questionAnwser != 'string') {
              item.questionAnwser = item.questionAnwser.toString()
            }
            return item
          })
          console.log('this.questionList-', this.questionList)
          console.log('diaoyanSubList', diaoyanSubList)
          localStorage.setItem('questionList',JSON.stringify(this.questionList))
          if (this.isDiaoyanOpen) {
              localStorage.setItem('diaoyanSubList', JSON.stringify(diaoyanSubList))
          }
          let url = `/activity/Visit/VisitSign.html?orderNo=${this.orderNo}&contNo=${this.contNo}`
          if (this.agentCode) {
            url += `&agentCode=${this.agentCode}`
          }
          location.href = url
        }
    }
}

</script>
<style lang='scss' scoped>
.investigation-wrap {
    background-color: #EE3D34;
    padding-bottom: 50px;

    .contentTop {
        height: 334px;

        img {
            margin: 0 auto;
        }
    }

    .content {
        min-height: 800px;
        background: #EE3D34 url('~@/assets/imgs/investigation/bg_02.png') top center no-repeat;
        background-size: contain;
        padding-top: 210px;
        position: relative;
        margin-top: -20px;

        .qeswrap {
            width: 671px;
            margin: 0 auto;
            background-color: #fff;
            min-height: 500px;
            box-sizing: border-box;
            padding: 0 47px 50px;

            .form-item {
                padding-top: 50px;

                p {
                    font-size: 30px;
                    color: #333;
                    line-height: 40px;
                }

                .input-item {
                    position: relative;
                    font-size: 34px;
                    margin-top: 36px;

                    label {
                        position: absolute;
                        top: -4px;
                        left: 0;
                        width: 48px;
                        height: 48px;
                        background: url('~@/assets/imgs/investigation/uncheck.png') left center no-repeat;
                        background-size: contain;
                    }

                    input[type=checkbox],
                    input[type=radio] {
                        visibility: hidden;
                    }

                    input[type=checkbox]:checked+label,
                    input[type=radio]:checked+label {
                        background: url('~@/assets/imgs/investigation/checked.png') left center no-repeat;
                        background-size: contain;
                    }

                    span {
                        margin-left: 20px;
                    }

                    textarea {
                      width: 100%;
                      height: 220px;
                      font-size: 34px;
                      border: 1px solid #ccc;
                      border-radius: 12px;
                      box-sizing: border-box;
                      padding: 14px;
                    }
                }
            }
        }

        .subbtn {
          padding-top: 80px;
          width: 530px;
          height: 88px;
          margin: 0 auto;
          button{
            font-size: 36px;
            width: 100%;
            height: 100%;
            border-radius: 88px;;
            text-align: center;
            line-height: 88px;
            color: #fff;
            background: linear-gradient(to top, #EE3D34, #FA5B46);
          }
        }
    }
}

</style>
