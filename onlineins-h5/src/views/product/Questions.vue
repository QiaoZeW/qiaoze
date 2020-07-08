<template>
  <div ref="wrap" class="section questions-wrap">
    <div class="spirit">
      <div class="icon">
        <img src="@/assets/imgs/intelligentunderwrite/spirit.png" alt="头像">
      </div>
      <div class="content">
        <div class="text">我是百小年，接下来我会问你几个问题，请根据被保人情况如实回答。</div>
      </div>
    </div>
    <div class="allContent" v-for="(all,allIndex) in alldDatas" :key="allIndex">
      <div class="tip">
        <span>
          下面就
          <em class="red">{{ transDiseaseName(allIndex,0) }}</em>进行问题
        </span>
      </div>
      <div class="list" v-for="(qustion,qustionIndex) in alldDatas[allIndex]" :key="qustionIndex">
        <div class="spirit">
          <div class="icon">
            <img src="@/assets/imgs/intelligentunderwrite/spirit.png" alt="头像">
          </div>
          <div class="content">
            <div class="text">{{ qustion.questionDesc }}</div>
            <div class="btns">
              <div v-for="(btn,btnIndex) in qustion.answerList" :key="btnIndex">
                <button
                  :disabled="qustion.btnNameStatus"
                  :class="{'no-click': qustion.btnNameStatus, 'tc': btn.answerDesc.length<3}"
                  @click="chooseBtn(btn,qustionIndex)"
                >{{ btn.answerDesc }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="user" v-show="qustion.btnName">
          <div class="icon">
            <img src="@/assets/imgs/intelligentunderwrite/person.png" alt="头像">
          </div>
          <div class="btns">
            <button :class="{'tc': qustion.btnName.length<3}">{{ qustion.btnName }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框部分 -->
    <md-dialog
      title="请确定你的选项"
      :closable="false"
      v-model="confirmDialog.open"
      :btns="confirmDialog.btns"
    >
      <ul class="confirmDialog">
        <li v-for="(item,index) in confirmDialogDatas" :key="index">
          <p class="questionDesc">{{ index+1 }}、{{ item.questionDesc }}</p>
          <p class="answerDesc">选择：{{ item.answerDesc }}</p>
        </li>
      </ul>
    </md-dialog>
    <!-- 弹框部分 -->
  </div>
</template>

<script>
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { getFalg, showFailAlert, getProdFlag } from "@/utils/utils"
export default {
  name: "Sucess",
  data() {
    return {
      riskInfo:{},
      canGoNext: true,
			agentCode: "",
      product_id: "",
      userCode: "",
      confirmDialog: {
        open: false,
        btns: [
          {
            text: "重新评估",
            handler: this.review
          },
          {
            text: "确认",
            handler: this.confirm
          }
        ]
      },
      confirmDialogDatas: [],
      confirmData: [],
      channel: "",
      paperId: "",
      answerObj: {},
      alldDatas: [],
      questionList: [],
      index: 0,

      submitConfirmDatas: {
        channel: "",
        paperId: "",
        diseaseList: [
          // {
          //   answerList: [{answerCode: "string"}],
          //   diseaseCode: "string"
          // }
        ]
      }
    };
  },
  created() {
    let self = this;
    document.title = "智能核保";
		this.agentCode = this.$router.query("agentCode");
    this.product_id = this.$router.query("product_id");
    this.loadProDetail()
      this.$app.wxProductDetail(this.product_id, 1)
    this.$app.getUserCode(function(userCode) {
      self.userCode = userCode;
    });
    this.canGoNextFn(this.product_id)
    this.initial();
  },
  methods: {
    loadProDetail() {
      var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType"))
      this.riskInfo = riskInfoObj;
    },
    canGoNextFn (product_id) {
      getProdFlag (product_id, (flagData) => {
        this.$app.showCustomerIntelligence((data) => {
          if (flagData.manualUwFlag) {
            if (!this.$app.isBrowser()) { // 体外根据渠道判断是否可以进入人核
               this.canGoNext = data.manualUwFlag
            }
          } else {
            this.canGoNext = false
          }
        })
      })
    },
    transDiseaseName(index, pos) {
      return this.answerObj.chooseList[index].split("--")[pos]; //pos传0为中文名称，1为code
    },
    transExtDiseaseCode(index) {
      return this.answerObj.extDiseaseArr[index].split("--")[1]; //pos传0为中文名称，1为code
    },
    initial(index = 0) {
      this.answerObj = JSON.parse(localStorage.getItem("nextObjDatas"));
      this.channel = this.answerObj.channel;
      this.paperId = this.answerObj.paperId;
      this.submitConfirmDatas.channel = this.channel;
      this.submitConfirmDatas.paperId = this.paperId;
      this.answerObj.questionList[index].questionList[0].btnName = "";
      this.answerObj.questionList[index].questionList[0].btnNameStatus = false;
      console.log("this.answerObj-----", this.answerObj);
      console.log(
        "questionList[index].questionList[0]",
        this.answerObj.questionList[index].questionList[0]
      );
      this.questionList = [];
      this.questionList.push(
        this.answerObj.questionList[index].questionList[0]
      );
      // !this.confirmDialogDatas[index] && (this.confirmDialogDatas[index] = {})
      // this.confirmDialogDatas[index].questionDesc = this.questionList[index].questionDesc

      this.alldDatas.push(this.questionList);
      this.clientScroll();
      console.log("this.questionList", this.questionList);
      console.log("this.alldDatas", this.alldDatas);
    },
    review() {
			if (this.agentCode) {
				location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id + "&agentCode=" +this.agentCode ;
			} else{
				location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id;
			}
    },
    confirm() {
			if (this.agentCode) {
				location.href = "/product/Fail.html?product_id=" + this.product_id + "&agentCode=" +this.agentCode ;
			} else{
				location.href = "/product/Fail.html?product_id=" + this.product_id;
			}
    },
    moreinfoShenceData(){
        sensors.track("auto_review_more_info",{})
    },
    reviewShenceData(successflag,resinfo){
        const { riskSubType, riskName, riskCode } = this.riskInfo;
        let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
        sensors.track("auto_review_result", {
            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
            risk_type: riskTypeName,
            risk: riskName,
            is_success:successflag,
            fail_reason:resinfo
        });
    },
    submitQuestion(confirmObj) {
      const self = this;
      this.$request({
        url: `/question/submitQuestion`,
        params: {},
        method: "POST",
        isLoading: true,
        contentType: "application/json;charset=UTF-8",
        data: confirmObj || this.answerObj,
        successFn: data => {
          this.moreinfoShenceData()
          if(data.resultType == "D"){
              this.reviewShenceData(false,data.resultInfo);   //智核失败
          }
          if (data.type === "CONFIRM") {
            if (data.resultInfo) {
              const failReason = encodeURIComponent(data.resultInfo);
              localStorage.setItem("failReason", failReason);
            }
            switch (data.resultType) {
              case "D":
                console.log("拒保");
                this.dealConfirmDialogDatas();
                this.confirmDialog.open = true;
                console.log("alldDatas", this.alldDatas);
                console.log("this.submitConfirmDatas", this.submitConfirmDatas);
                break;
              default:
                // case "LastD": // 没有具体结论，需要询问下级疾病
                // case "LastQ": // 没有具体结论，需要询问下级疾病
                // case "MAX": // 没有结论
                // case "R": // 详见险种结论
                // case "Q": // 转人工核保
                // case "EX": // 除外责任
                // case "S": // 提交问券
                console.log("没有具体结论，需要询问下级疾病");
                self.index++;
                if (self.index >= self.answerObj.chooseList.length) {
                  self.submitConfirm();
                } else {
                  this.initial(this.index);
                }
                break;
            }
          } else {
            data.responseList[0].questionList[0].btnName = "";
            data.responseList[0].questionList[0].answerCode = "";
            data.responseList[0].questionList[0].btnNameStatus = false;
            this.questionList.push(data.responseList[0].questionList[0]);
            self.clientScroll();
          }
          console.log("this.questionList", this.questionList);
        },
        failFn: () => {}
      });
    },
    clientScroll() {
      setTimeout(() => {
        // 新增了内容后马上滚到最下面
        let client = document.body.scrollTop
          ? document.body
          : document.documentElement;
        console.log(
          "11111111111",
          document.body.scrollTop,
          document.documentElement.scrollTop
        );
        client.scrollTop = this.$refs["wrap"].scrollHeight;
      }, 0);
    },
    chooseBtn(item, index) {
      console.log(item.answerDesc, item.answerCode);
      console.log("item.answerDesc", item.answerDesc);
      this.questionList[index].btnName = item.answerDesc;
      this.questionList[index].btnNameStatus = true;
      this.questionList[index].answerCode = item.answerCode;
      this.submitQuestion({
        channel: this.channel,
        paperId: this.paperId,
        answerList: [
          {
            answerCode: item.answerCode
          }
        ]
      });
    },
    dealConfirmDialogDatas() {
      this.alldDatas.forEach((item, index) => {
        this.submitConfirmDatas.diseaseList[index] = {}; // 拼接需要提交的submitConfirmDatas
        this.submitConfirmDatas.diseaseList[index].answerList = [];
        this.submitConfirmDatas.diseaseList[
          index
        ].diseaseCode = this.transDiseaseName(index, 1);
        item.forEach((childItem, childIndex) => {
          this.confirmDialogDatas.push({
            questionDesc: childItem.questionDesc,
            answerDesc: childItem.btnName
          });
          this.submitConfirmDatas.diseaseList[index].answerList.push({
            answerCode: childItem.answerCode
          });
        });
      });

      // 把上个页面除责的疾病带回来提交
      if (this.answerObj.extDiseaseArr.length > 0) {
        this.answerObj.extDiseaseArr.forEach((item, index) => {
          // diseaseCode
          this.submitConfirmDatas.diseaseList.push({
            diseaseCode: this.transExtDiseaseCode(index)
          });
        });
      }
    },
    submitConfirm() {
      this.dealConfirmDialogDatas();
      this.$request({
        url: `/question/submitConfirm`,
        params: {},
        method: "POST",
        data: this.submitConfirmDatas,
        isLoading: true,
        contentType: "application/json;charset=UTF-8",
        successFn: data => {
          console.log("submitConfirmdata", data);
					if(data.resultType == "D"){
						this.reviewShenceData(false,data.resultInfo);   //智核失败
					}else if(data.resultType == "Q"){
						//转人核
					}else {
						this.reviewShenceData(true,'');   //智核成功
					}
          let smartUwConclusion = "";
          let storageName = `underwriteInfo${this.userCode}${this.product_id}`;
          switch (data.resultType) {
            case "D":
              console.log("拒保");
              const failReason = encodeURIComponent(data.resultInfo);
              localStorage.setItem("failReason", failReason);
              this.dealConfirmDialogDatas();
              this.confirmDialog.open = true;
              console.log("alldDatas", this.alldDatas);
              console.log("this.submitConfirmDatas", this.submitConfirmDatas);
              break;
            case "EX": // 除外责任
              localStorage.setItem("EXInfo", data.resultInfo);
              localStorage.setItem(
                storageName,
                JSON.stringify({
                  questionnaireNo: this.paperId,
                  smartUwConclusion: "4",
                  product_id: this.product_id,
                  userCode: this.userCode
                })
              );
							if (this.agentCode) {
								location.href = "/product/Sucess.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
							} else{
								location.href = "/product/Sucess.html?product_id=" + this.product_id;
							}
              break;
            case "S": // 承保
              localStorage.setItem(
                storageName,
                JSON.stringify({
                  questionnaireNo: this.paperId,
                  smartUwConclusion: "9",
                  product_id: this.product_id,
                  userCode: this.userCode
                })
              );
              if (this.agentCode) {
								location.href = "/product/Sucess.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
							} else{
								location.href = "/product/Sucess.html?product_id=" + this.product_id;
							}
              break;
            case "Q": // 转人工核保
              if (!this.canGoNext) { //体外人核根据渠道号判断是否继续
                showFailAlert()
                return false
              }
              localStorage.setItem(
                storageName,
                JSON.stringify({
                  questionnaireNo: this.paperId,
                  smartUwConclusion: "5",
                  product_id: this.product_id,
                  userCode: this.userCode
                })
              );
                if (data.riskResultList != null  && data.riskResultList[0].resultType == "EX") {
                    localStorage.setItem("EXInfoQ", data.riskResultList[0].resultInfo);
                } else {
                    localStorage.removeItem("EXInfoQ");
                }
							if (this.agentCode) {
								window.location.href = `/product/ArtificialConfirm.html?product_id=${this.product_id}&agentCode=${this.agentCode}`;
							} else{
								window.location.href = `/product/ArtificialConfirm.html?product_id=${this.product_id}`;
							}
              break;
            default:
              // case "LastD": // user
              // case "LastQ": // user
              // case "MAX": // 没有结论
              // case "R": // 详见险种结论
              // case "Q": // 转人工核保
              // case "EX": // 除外责任
              // case "S": // 提交问券

              localStorage.setItem(
                storageName,
                JSON.stringify({
                  questionnaireNo: this.paperId,
                  smartUwConclusion: "5",
                  product_id: this.product_id,
                  userCode: this.userCode
                })
              );
							if (this.agentCode) {
								location.href = "/product/Sucess.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
							} else{
								location.href = "/product/Sucess.html?product_id=" + this.product_id;
							}
              break;
          }
        },
        failFn: () => {}
      });
    }
  }
};
</script>

 <style lang="scss" scoped>
html {
  height: 2000px;
  body {
    height: 100%;
  }
}
.questions-wrap {
  padding-bottom: 84px;

  .icon {
    width: 68px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tip {
    margin: 40px auto;
    color: #fff;
    text-align: center;
    padding: 12px 40px;
    background-color: #f2f2f2;
    width: 80%;
    border-radius: 12px;

    span {
      line-height: 46px;
      color: #333333;
      em.red {
        color: #e40000;
      }
    }
  }

  .button {
    padding: 8px 20px;
    // height: 60px;
    // line-height: 60px;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #8e8e8e;
    color: #8e8e8e;
    margin-bottom: 24px;
    min-width: 120px;
    font-size: 28px;
    &.tc {
      text-align: center;
    }

    &.yesbtn {
      margin-right: 32px;
    }

    &.nobtn {
      background-color: #fff0f0;
      border-color: #e10312;
      color: #e10312;
    }
  }

  .spirit {
    padding: 0 126px 0 40px;
    display: flex;
    margin-top: 40px;

    .icon {
      margin: 10px 30px 0 0;
      width: 54px;
      height: 50px;
    }
    .content {
      flex: 1;

      .text {
        padding: 20px;
        font-size: 28px;
        line-height: 50px;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-radius: 14px;
      }

      .btns {
        margin-top: 24px;
        margin-bottom: 24px;

        button {
          @extend .button;
          &.question-active {
            color: #e10312;
            border: 1px solid #e10312;
            background-color: #fff0f0;
          }
          &.no-click {
            cursor: not-allowed;
            color: #d3d3d3;
            border-color: #d3d3d3;
            background-color: #fff;
          }
        }
      }
    }
  }

  .user {
    display: flex;
    flex-direction: row-reverse;
    padding:0 40px 0 126px;

    .icon {
      // margin: 10px 30px 0 0;
      width: 76px;
      height: 76px;
      margin-left: 30px;
    }
    .btns {
      flex: 1;
      text-align: right;
      margin-top: 8px;
      button {
        @extend .button;
        margin-bottom: 0;
        color: #fff;
        background-color: #e10312;
        border-color: #e10312;
      }
    }
  }
}
.confirmDialog {
  max-height: 900px;
  overflow: auto;

  p {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    line-height: 42px;
    margin: 18px auto;
    width: 100%;
    box-sizing: border-box;

    &.questionDesc {
      color: rgba(102, 102, 102, 1);
    }
    &.answerDesc {
      color: rgba(227, 5, 19, 1);
      background-color: #f2f2f2;
      padding: 8px 16px;
    }
  }
}
</style>
