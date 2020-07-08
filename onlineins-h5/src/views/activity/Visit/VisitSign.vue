<template>
    <div class="sign-wrap">
        <div id="dialog" class="dn">
          <!-- 显示签名区域-->
          <div id="anysign_title" class="dn"></div>
          <div id="container" onmousedown="return false;">
            <canvas id="anysignCanvas" width="2">
            </canvas>
          </div>
          <div id="tip_content">
            <div class="inner">
              <p class="p1">手写电子签名</p>
              <p class="p2">请书写姓名全称，并保持字迹清晰，建议横屏书写</p>
            </div>
          </div>
          <div id="single_scrollbar" class="dn">
            <span id="single_scroll_text"> *滑动操作：</span>
            <input id="single_scrollbar_up" type="button" class="button orange" value="左移" />
            <input id="single_scrollbar_down" type="button" class="button orange" value="右移" />
          </div>

          <div id="btnContainerOuter">
              <div id="btnContainerInner">
                  <input id="btnClear" type="button" class="button orange" value="重写"
                         @click="clearCanvas" />
                  <input id="btnOK" type="button" class="button orange" value="提交" @click="getParam"/>
              </div>
          </div>
        </div>
        <!-- <img id="xss_20" src="#" /> -->
    </div>
</template>

<script>
    import { Toast, Dialog } from 'mand-mobile'
    import { navGoBack } from "@/utils/utils"
    export default {
        name: "Sign",
        props: {
        },
        data () {
            return {
                insuredName: '',
                isDiaoyanOpen: false,
                result: '',
                signDataList: [],
                signDataObj: {},
                businessData: {},
                subData: {},
                imgUrl: '',
                aeonlifeCA: null,
                questionList: [],
                diaoyanSubList: [],
                signUrl: '',
                contNo: '',
                userToken: '',
                hasNoAns: false,
                riskName: '',
                riskSource: '',
                apiInstance: null,
                isBrowser: false
            }
        },
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
            Toast.loading('页面初始化加载中...')
            this.isBrowser = this.$app.isBrowser()
            this.orderNo = this.$router.query('orderNo')
            this.agentCode = this.$router.query('agentCode') || ''
            this.product_id = this.$router.query('product_id') || ''
            this.agentName = this.$router.query('agentName') || ''
            this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || localStorage.getItem('cps_token') || ''
            this.questionList = JSON.parse(localStorage.getItem('questionList')) || []
            this.diaoyanSubList = localStorage.getItem('diaoyanSubList') ? JSON.parse(localStorage.getItem('diaoyanSubList')) : []
            this.contNo = this.$router.query('contNo') || ''
            this.secondaryDistributor = localStorage.getItem('cps_secondaryDistributor') || 'APP_00010001'
            this.getOrderVisitInfo()
            this.setBackHomeConfig()
            this.hasNoAnsFn() // 检查回访题目是否有选择否的
            if (!this.isBrowser) {
              navGoBack(() => {
                if (sessionStorage.getItem('visitReady') == 'Y') {
                   location.href = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}&secondaryDistributor=${this.secondaryDistributor}`
                }
              })
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            init () {
                this.loadOrderDetail((data) => {
                    this.insuredName = data.insuredInfoList[0].name || ''
                    console.log('this.insuredName', this.insuredName)
                    this.riskName = data.insuredInfoList[0].riskInfoList[0].riskName || ''
                    this.riskSource = localStorage.getItem('shence_aftersale_questionnaire_risk_source') || '承保成功页';
                    this.shenceLoadvisitsign()

                    let CA_CHANNEL = location.host.indexOf('bnonline.aeonlife.com.cn')>-1 ? '30010080' : '888888';
                    this.testAnySign(CA_CHANNEL)
                })
            },
            testAnySign (channel) {
                var res;
                //识别回调接口
                var identify_callback = function(errCode){
                  if(errCode == SUCCESS){
                    return;
                  }
                }

                var callback = function(context_id,context_type,val)
                {
                    if(context_type == CALLBACK_TYPE_SIGNATURE)
                    {
                        //签名回显
                      // document.getElementById("xss_20").src = "data:image/png;base64," + val;
                      // var aImg=document.getElementById("xss_20");
                      // for(var i=0;i<aImg.length;i++){
                      //   aImg[i].style.height="1500";
                      //   aImg[i].style.width="1500";
                      // }
                    }
                    console.log("收到浏览器回调：" + "context_id：" + context_id + " context_type：" + context_type + " value：" + val);
                };//测试回调，将回调数据显示

                //设置签名算法，默认为RSA，可以设置成SM2
                EncAlgType.EncAlg = "RSA";

                apiInstance = new AnySignApi();
                // var channel = "10010";//渠道号，由信手书提供，请咨询项目经理
                //初始化签名接口
                res = apiInstance.initAnySignApi(callback,channel);

                if(!res){
                  alert("init error");
                }

                //开启识别
                ocrCapture = new OCRCapture();
                ocrCapture.text = "a";
                ocrCapture.IPAdress = "http://60.247.77.116:11203/HWR/RecvServlet";
                ocrCapture.appID = "123";
                ocrCapture.count = 5;
                ocrCapture.language = Language.CHS;
                ocrCapture.resolution = 80;
                ocrCapture.serviceID = "999999";

                this.setIdentifyCallBack(identify_callback);

                //注册单字签字对象20
                res = this.testAddSignatureObj(20);
                if(!res){
                  alert("testAddSignatureObj error");
                  return;
                }

                res = this.testAddCommentObj(30);
                if(!res){
                  alert("testAddCommentObj error");
                  return;
                }

                //将配置提交
                res = apiInstance.commitConfig();

                if(res){
                  this.testSetTemplateData()
                }else{
                  alert("初始化提交配置失败");
                }
            },
            setIdentifyCallBack(callback){
              if(!apiInstance){
                    alert("信手书接口没有初始化");
                    return;
              }
              apiInstance.setIdentifyCallBack(callback);
            },
            //添加单签签名框
            testAddSignatureObj (objId) {
                var context_id = objId;
                var signer = new Signer(this.insuredName, "bnonline");
                var signerRule = new SignRule_KeyWord('投保人签名', 3, 6, 1, 1); //签名规则
                var signatureConfig = new SignatureConfig(signer,signerRule);
                signatureConfig.singleWidth = 500;
                signatureConfig.singleHeight = 500;
                signatureConfig.title = "请投保人签字";
                signatureConfig.isTSS = false;//是否开始时间戳服务
                signatureConfig.signatureImgRatio = 3.0;
                signatureConfig.nessesary = false;
                signatureConfig.isdistinguish = false;
                signatureConfig.ocrCapture = ocrCapture;
                var res = apiInstance.addSignatureObj(context_id,signatureConfig);
                if(res)
                {
                    console.log("addSignatureObj "+context_id+" success");
                    return res;
                }
                else
                {
                    alert("addSignatureObj "+context_id+" error");
                    return res;
                }
            },
            //添加批签签名框
            testAddCommentObj (objId) {
                var context_id = objId;
                var signer = new Signer(this.insuredName, "bnonline");
                var signerRule = new SignRule_XYZ(84.0, 523.0, 400.0, 477.0, 1, "dp");
                var commentConfig = new CommentConfig(signer,signerRule);
                commentConfig.commitment = "本人已阅";
                commentConfig.mass_word_height = 50;
                commentConfig.mass_word_width = 50;
                commentConfig.mass_words_in_single_line = 4;
                commentConfig.penColor = "#FF0000";
                commentConfig.nessesary = false;
                commentConfig.isdistinguish = false;
                commentConfig.ocrCapture = ocrCapture;
                commentConfig.mass_dlg_type = CommentInputType.WhiteBoard;
                var res = apiInstance.addCommentObj(context_id,commentConfig);
                if(res)
                {
                    console.log("addCommentObj "+context_id+" success");
                    return res;
                }
                else
                {
                    alert("addCommentObj "+context_id+" error");
                    return res;
                }
            },
            //配置模板数据
            testSetTemplateData () {
                var formData = "PGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+PG1ldGEgaHR0cC1lcXVpdj0nQ29udGVudC1UeXBlJyBjb250ZW50PSd0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLTgnIC8+PC9oZWFkPjxib2R5PjxkaXY+PGRpdj48bGFiZWw+a2V5d29yZDo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTLvvJo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTPvvJo8L2xhYmVsPjwvZGl2PjwvZGl2PjwvYm9keT48L2h0bWw+";
                //文件数据
                // var formData = fileData;
                var businessId = "bnonline";//集成信手书业务的唯一标识
                var template_serial = "4000";//用于生成PDF的模板ID
                var res;
                res = apiInstance.setTemplate(TemplateType.HTML,formData,businessId,template_serial);

                if(res)
                {
                  this.testPopupDialog(20)
                  console.log("setTemplateData success");
                  return res;
                }
                else
                {
                    alert("setTemplateData error");
                    return res;
                }
            },
            //弹出签名框签名
            testPopupDialog (context_id) {
              if(!apiInstance){
                    alert("信手书接口没有初始化");
                    return;
              }
                switch (apiInstance.showSignatureDialog(context_id))
                {
                    case RESULT_OK:
                      resize()
                      $("body").addClass("body")
                      $("#anysignCanvas").addClass("canvas")
                      this.setCanvasStyle()
                        break;
                    case EC_API_NOT_INITED:
                        alert("信手书接口没有初始化");
                        break;
                    case EC_WRONG_CONTEXT_ID:
                        alert("没有配置相应context_id的签字对象");
                        break;
                }
            },
            shenceLoadvisitsign () {
              sensors.track("bn_oninevisit_huifang_loadvisitsign", {
                cont_no: this.contNo,
                risk_source: this.riskSource,
                risk: this.riskName,
                secondaryDistributor: this.secondaryDistributor
              });
            },
            hasNoAnsFn () {
              if (this.questionList.length > 0) {
                  for (var i = 0; i < this.questionList.length; i++) {
                    if(this.questionList[i].answerNoJoin.indexOf('否') > -1) {
                       this.hasNoAns = true
                    }
                  }
              }
            },
            callBack (businessType, signType, contextType, val) {
                if (contextType == CALLBACK_TYPE_START_RECORDING || contextType == CALLBACK_TYPE_STOP_RECORDING) {
                    return;
                }
                if (contextType == CALLBACK_TYPE_SIGNATURE || contextType == CALLBACK_TYPE_COMMENTSIGN) {
                    console.log('businessType',businessType)
                    //单签回显、批签回显
                    this.imgUrl = 'data:image/png;base64,' + val
                    return;
                }
            },
            setCanvasStyle () {
                const anysignCanvas = document.getElementById('anysignCanvas')
                const containerHeight = anysignCanvas.width + 'px'
                document.getElementById('tip_content').style.height = containerHeight
                Toast.hide()
            },
            loadOrderDetail (fn) {
                this.$app.getToken((userToken) => {
                  this.$request({
                      url: `/contract/getPolicyDetail`,
                      method: "POST",
                      // isLoading: true,
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
                       if (data.surveyFlag == '1' && !this.agentCode) { // 代理人无调研
                         this.isDiaoyanOpen = true
                       }
                   },
                   failFn: (data) => {
                       Dialog.alert({content: data.resultMsg})
                   }
               })
            },
            // 提交方法，resultCode为0是成功，调用签名接口上传msg中的信息
            getParam () {
                sign_confirm(() => {
                  this.testPopupDialog(20)
                  let res = apiInstance.getUploadDataGram()
                  this.uploadSignature(res)
                  return false
                }, () => {
                   Toast.hide()
                   Dialog.alert({ content: '请先手写签名后提交' });
                });
            },
            clearCanvas () {
                clear_canvas(function () {})
            },
            uploadSignature (signatureData) {
              this.$request({
                  url: `/ins/visit/uploadSignature`,
                  method: "POST",
                  isEncript: true,
                  isLoading: true,
                  userToken:this.userToken,
                  contentType: "application/json;charset=UTF-8",
                  data: { signatureData: signatureData },
                  successFn: data => {
                    this.signUrl = data
                    this.uploadReturnVisitResult()
                  },
                  failFn: data => {
                      Dialog.alert({ content: data.resultMsg });
                  }
              });
            },
            uploadReturnVisitResult () {
              let subData = {
                  contNo: this.contNo,
                  customerNo: "",
                  priority: "6",
                  questionList: this.questionList,
                  recognitionRate: "",
                  url1: this.signUrl,
                  url2:"",
                  url3:"",
                  url4:"",
              }
              this.$request({
                  url: `/ins/visit/uploadReturnVisitResult`,
                  method: "POST",
                  isEncript: true,
                  userToken: this.userToken,
                  // isLoading: true,
                  contentType: "application/json;charset=UTF-8",
                  data: subData,
                  successFn: data => {
                    sensors.track("bn_oninevisit_huifang_subhuifang", {
                      order_no: this.orderNo,
                      cont_no: this.contNo,
                      secondaryDistributor: this.secondaryDistributor,
                      risk_source: this.riskSource,
                      risk: this.riskName,
                      has_no_ans: this.hasNoAns
                    }, () => {
                        this.goHref()
                    });
                  },
                  failFn: data => {
                      Dialog.alert({ content: data.resultMsg });
                  }
              });
            },
            addAnswer () {
                this.$app.getToken((userToken) => {
                    let token = userToken || JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY")) || ''
                    this.$request({
                        url: `/ins/visit/addAnswer`,
                        method: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        userToken: token,
                        isEncript: true,
                        data: this.diaoyanSubList,
                        successFn: (data) => {
                            /*sensors.track("bn_oninevisit_huifang_lottery",{
                              order_no: this.orderNo,
                              cont_no: this.contNo,
                              secondaryDistributor: this.secondaryDistributor,
                              risk_source: this.riskSource,
                              risk: this.riskName
                            });*/
                            localStorage.setItem('scoreNum', data)
                            this.shenceSubmit(() => {
                              let url = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}`
                              if (this.agentCode) {
                                url += `&agentCode=${this.agentCode}`
                              }
                              location.href = url
                            })
                        },
                        failFn: (data) => {
                            Dialog.alert({content: data.resultMsg})
                        }
                    })
                })
            },
            shenceSubmit (fn = function () {}) {
              // 调研数据提交
              sensors.track("bn_oninevisit_huifang_subdiaoyan", {
                  risk_source: this.riskSource,
                  risk: this.riskName,
                  is_success:true,
                  aftsale_Q1: this.diaoyanSubList.find((item => item.questionNo == 'Q_00001')).questionAnwser == '是' ? true : false,
                  aftsale_Q2: this.diaoyanSubList.find((item => item.questionNo == 'Q_00002')).questionAnwser == '是' ? true : false,
                  aftsale_Q3: this.diaoyanSubList.find((item => item.questionNo == 'Q_00003')) ? this.diaoyanSubList.find((item => item.questionNo == 'Q_00003')).questionAnwser : '',
                  aftsale_Q4: this.diaoyanSubList.find((item => item.questionNo == 'Q_00004')).questionAnwser,
                  aftsale_Q5: this.diaoyanSubList.find((item => item.questionNo == 'Q_00005')).questionAnwser,
                  cont_no: this.contNo,
                  secondaryDistributor: this.secondaryDistributor
              }, fn);
            },
            goHref () {
              if (this.isDiaoyanOpen) {
                // 调研打开
                this.addAnswer()
              } else {
                // 回访提交跳转
                let url = `/activity/Visit/VisitSuccess.html?orderNo=${this.orderNo}`
                if (this.agentCode) {
                  url += `&agentCode=${this.agentCode}`
                }
                location.href = url
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
            }
        }
    };
</script>

<style lang='scss' scoped>
.dn {
  display: none;
}
.sign-wrap {
    .comment_titlecss {
        font-size: 20px;
        clear: both;
    }

    .comment_btncontainer {
        text-align: center;
        margin: 0 auto;
        font-size: 40pt;
        width: 100%;
        clear: both;
        position: absolute;
    }

    .signImagecss {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow: scroll;
        border: 1px solid rgb(229, 229, 229)
    }

    .tmpcanvascss {
        border: 1px solid rgb(229, 229, 229)
    }

    .btn_orange {
        font-size: 20pt;
        color: #fef4e9;
        border: solid 1px #da7c0c;
        background: #f78d1d;
        background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
    }



    #dialog {
        width: 94% !important;
        padding: 3%;
    }

    #container {
        width: calc(100% - 2px) !important;
        border: 1px solid #ccc !important;
        overflow: hidden !important;
    }

    #anysign_title {
        height: auto !important;
        padding-bottom: 1.2rem;
        font-size: 1.8rem !important;
        display: none;
    }

    #anysign_title big {
        font-size: 1.8rem;
    }

    .title {
        display: none;
    }

    .autograph {
        position: relative;
        width: 100%;
        height: 9rem;
    }

    #back {
        width: 100% !important;
        height: 100% !important;
        background: rgba(0, 0, 0, .4) !important;
    }

    #single_scrollbar {
        height: auto !important;
        margin: 10px 0;
    }

    #tip_content {
        width: 100%;
        height: 70%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        .inner {
          height: 100%;
          .p1 {
            position: absolute;
            top: 50%;
            left: 50%;
            color: #CECECE;
            font-size: 36px;
            background-color: transparent;
            -webkit-transform: translate(-50%, -50%);
               -moz-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                 -o-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
          }
          .p2 {
            width: 750px;
            text-align: center;
            position: absolute;
            bottom: 2%;
            left: 50%;
            color: #CECECE;
            font-size: 28px;
            background-color: transparent;
            -webkit-transform: translateX(-50%);
               -moz-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                 -o-transform: translateX(-50%);
                    transform: translateX(-50%);
          }
        }
    }

    %btncommon {
        width: 4.213rem;
        border-radius: 1.173rem;
        border: none;
        height: 1.173rem;
        font-size: 0.48rem;
    }
    #btnContainerOuter {
      margin-top: 4%;
      display: flex;
      justify-content: center;
      #btnContainerInner {
          height: 1.173rem;
          #btnOK {
            @extend %btncommon;
            background: linear-gradient(to top, #EE3D34, #FA5B46);
          }
          #btnClear {
            @extend %btncommon;
            background: linear-gradient(to bottom, #C9C9C9, #8E8E8E);
          }
      }
    }
}
</style>

<style lang="scss">
  @media screen and (orientation:portrait) {
    /*竖屏样式*/
    .body{
      transform-origin: 0 0;
      transform: rotateZ(90deg) translateY(-100%);
      .canvas {
        transform-origin: 0 0;
        transform: rotateZ(270deg) translateY(0%) translateX(-100%);
        position: fixed;
        /*top: 0;*/
        left: 0;
      }
    }
  }
</style>

