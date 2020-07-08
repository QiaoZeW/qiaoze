<template>
  <div class="section Intelli-underwriting-wrap">
    <div class="topContent">
      <div class="topEmpty"></div>
      <div class="add-sickness">
        <h2>被保人曾患或者在患的疾病</h2>
        <div class="choosesickness">
          <div v-for="(item,index) in choose" :key="index" class="choosesickname">
            <div class="choosesickItem">
              <span class="item-name">{{ item }}</span>
              <span class="del" @click="delSickname(index)">x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainContent">
      <h3>请选择被保人目前或过往患有的病症</h3>
      <ul>
        <li class="li-item" v-for="(sickItem, index) in diseaseList" :key="index">
          <div @click="toggleCon(index)">
            <div class="li-item-title">
              <span>{{ sickItem.diseaseDesc }}</span>
              <md-icon
                name="arrow-down"
                class="arrowDown"
                :class="{ arrowUp: sickItem.ifCheck }"
                size="md"
              />
            </div>
            <div
              class="li-item-content"
            >如{{ sickItem.subDiseaseList[0] ? sickItem.subDiseaseList[0].diseaseDesc : '' }}等</div>
          </div>

          <transition name="slide-transition" enter-active-class="animated fadeIn">
            <div class="li-item-checkbox" v-if="sickItem.ifCheck">
              <md-check-group v-model="choose">
                <md-check
                  v-for="(sickCheck) in sickItem.subDiseaseList"
                  :key="sickCheck.diseaseCode"
                  :parentKey="sickItem.diseaseCode"
                  :name="`${sickCheck.diseaseDesc}--${sickCheck.diseaseCode}`"
                  :label="sickCheck.diseaseDesc"
                  @click.native="checksick(sickItem.diseaseCode ,sickCheck.diseaseCode)"
                />
              </md-check-group>
            </div>
          </transition>
        </li>
      </ul>
    </div>
    <div class="subbtn">
      <md-button class="radius" type="primary" @click="subFn">下一步</md-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { getFalg, showFailAlert, getProdFlag, debounce } from "@/utils/utils"
export default {
  name: "IntelliUnderwriting",
  components: {},
  data() {
    return {
      riskInfo:{},
	  illnessTypeList:[],
	  diseaseNameList:[],
      canGoNext: true,
	  agentCode:"",
      product_id: "",
      userCode: "",
      createQuestionnaireNo: {
        channel: "aeonlife-online",
        insuredAge: 29,
        insuredSex: "0",
        riskList: [
          {
            riskCode: "5305D1"
          }
        ]
      },
      diseaseList: [
        {
          diseaseCode: "002",
          diseaseDesc: "眼、耳、口、鼻",
          ifCheck: false,
          subDiseaseList: []
        }
      ],
      chooseSickList: [],

      // 点击疾病选项放在这里
      choose: [],

      //问卷提交数据
      subDatas: {
        diseaseList: [], //数据格式 { diseaseCode: "" }
        channel: "aeonlife-online",
        paperId: ""
      }
    };
  },
  created() {
	this.agentCode = this.$router.query("agentCode");
    this.product_id = this.$router.query("product_id");
    this.$app.getUserCode(userCode => {
    this.userCode = userCode;
    this.loadProDetail()
    });

    this.loadSickListDatas();
    this.subFn = debounce(this.subFn)
  },
  mounted() {},
  methods: {
    loadProDetail() {
        var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType")) || {}
        this.riskInfo = riskInfoObj;
        //神策数据采集
        this.insuranceShenceData(riskInfoObj);
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
    toggleCon(index) {
      this.diseaseList[index].ifCheck = !this.diseaseList[index].ifCheck;
    },
    checksick(parentCode, code) {
      console.log("choose----------", this.choose);
    },
    delSickname(index) {
      this.choose.splice(index, 1);
    },
    loadSickListDatas() {
      document.title = "智能核保";
      this.product_id = this.$router.query("product_id");

      this.canGoNextFn(this.product_id);
      let info = JSON.parse(localStorage.getItem("PAWithRule"));
      console.log("info-----------", info);
      const riskList = [];
      info.policyInfoList.forEach(item => {
        if (item.riskCode === '5313' || item.riskCode === '5315') { // 没有多责任的只传险种riskcode
          // 加惠保，医惠通单责任
          riskList.push({ riskCode: item.riskCode });
        } else {
          if (item.dutyCode != '5909D1') {
            riskList.push({ riskCode: item.dutyCode });
          }
        }
      });
      const transSex = {'M': '0', 'F': '1'}
      this.createQuestionnaireNo = {
        channel: "aeonlife-online",
        insuredAge: info.insuredInfo.age,
        insuredSex: transSex[info.insuredInfo.sex] || '2', //info.insuredInfo.sex, 0：男,1：女,2：不确定
        riskList: riskList
      };

      this.$request({
        url: `/question/createQuestionnaireNo`,
        params: {},
        method: "POST",
        //isLoading: true,
        contentType: "application/json;charset=UTF-8",
        data: this.createQuestionnaireNo,
        successFn: data => {
          //手动添加diseaseList ifcheck 下拉菜单初始为隐藏，点击展开
          data.diseaseList.forEach(item => {
            item.ifCheck = false;
          });
          this.diseaseList = data.diseaseList;

          this.subDatas.paperId = data.paperId;
          // document.title = data.riskInfo.riskName;

          console.log("document.referrer", document.referrer);
          if (document.referrer.indexOf("/product/ConfirmSick") > 0) {
            //不是从正常页面进行的跳转
            //获取本地存储的疾病列表，用于返回修改的反选
            const chooseInfo = JSON.parse(
              localStorage.getItem("diseaseListInfo")
            );
            this.choose = chooseInfo.diseaseListArr;
          }
         this.$app.wxProductDetail(this.product_id, 1)
        },
        failFn: () => {}
      });
    },
		insuranceShenceData(riskdata){                              //进入智能核保触发埋点
            const { riskSubType, riskName, riskCode } = riskdata;
            let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
			sensors.track("auto_review_insurance", {
                secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                risk_type: riskTypeName,
                risk: riskName
            });
		},
		loadShenceData(data,newIllnessTypeList){                 //神策埋点zj_auto_review_illness
			let manualFlag = false;
			let moreInfoFlag = false;
			let otherIllnessFlag = false;
			this.choose.forEach(item => {
			  const splitStr = item.split("--");
			  const diseaseName = splitStr[0];
				if(diseaseName=="其他疾病或症状"){
					otherIllnessFlag = true;
				}
			  this.diseaseNameList.push(diseaseName);
			});
			if(data.type=="QUESTION"){
				moreInfoFlag = true;
			}
			if(data.resultType=="Q"){
				manualFlag = true;
			}
            const { riskSubType, riskName, riskCode } = this.riskInfo;
            let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
			sensors.track("auto_review_illness", {
        secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                risk_type: riskTypeName,
                risk: riskName,
				other_illness_yn:otherIllnessFlag,
				trigger_manual_review_yn:manualFlag,
				trigger_auto_review_more_info_yn:moreInfoFlag,
				illness_type:newIllnessTypeList,
				illness_detail:this.diseaseNameList
			});
		},
		reviewShenceData(data){
            const { riskSubType, riskName, riskCode } = this.riskInfo;
            let riskTypeName =getRiskTypeName(riskCode,riskSubType);              // riskTypeNameText[riskSubType] || '';
			if(data.resultType=="D"){                   //如果返回D，智能核保失败,如果type返回Question，成功与否需要到Question页面埋点确认
				sensors.track("auto_review_result", {
          secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                    risk_type: riskTypeName,
                    risk: riskName,
					is_success:false,
					fail_reason:data.resultInfo
				});
			}
		},
		findIllnessType(diseasecode){
			for(let i=0;i< this.diseaseList.length;i++){
					let subDiseaseList = this.diseaseList[i].subDiseaseList;
					for(let j=0;j<subDiseaseList.length;j++){
							if(subDiseaseList[j].diseaseCode==diseasecode){
									this.illnessTypeList.push(this.diseaseList[i].diseaseDesc)
							}
					}
			}
		},
    subFn() {
      if (this.choose && this.choose.length > 0) {
        this.subDatas.diseaseList = []; //每次提交之前先清空
        // choose格式为["脑出血、脑梗塞、蛛网膜下腔出血--001001"]
        this.choose.forEach(item => {
          const splitStr = item.split("--");
          const diseaseCode = splitStr[1];
          this.subDatas.diseaseList.push({ diseaseCode: diseaseCode });
        });
        console.log("this.subDatas", this.subDatas);
				console.log(this.choose)
        this.$request({
          url: "/question/submitQuestion",
          method: "POST",
          isLoading: true,
          contentType: "application/json;charset=UTF-8",
          data: this.subDatas,
          successFn: data => {
            console.log("data------", data);
            /*
              type = 'CONFIRM'时进行疾病确认
              否则进行下一步询问
            */
					for(let k=0;k<this.subDatas.diseaseList.length;k++){
						this.findIllnessType(this.subDatas.diseaseList[k].diseaseCode)
					}
					var illnessType = new Set(this.illnessTypeList)
					var newIllnessTypeList = Array.from(illnessType)
					 this.loadShenceData(data,newIllnessTypeList);
					 this.reviewShenceData(data);
            if (data.type === "CONFIRM") {
              switch (data.resultType) {
                case "D":
                  console.log("拒保");
                  //存储传到下一个页面的信息
                  localStorage.setItem(
                    "diseaseListInfo",
                    JSON.stringify({
                      resultType: data.resultType,
                      resultInfo: data.resultInfo,
                      diseaseListArr: this.choose
                    })
                  );
									console.log(this.choose)
									if (this.agentCode) {
										window.location.href = `/product/ConfirmSick.html?product_id=${this.product_id}&agentCode=${this.agentCode}`;
										// window.location.href = `/product/confirmsick?product_id=${this.product_id}&agentCode=${this.agentCode}`;
									} else{
										window.location.href = `/product/ConfirmSick.html?product_id=${this.product_id}`;
                                        // window.location.href = `/product/confirmsick?product_id=${this.product_id}`;
									}
                  break;
                default:
                  // case "LastD": // 没有具体结论，需要询问下级疾病
                  // case "LastQ": // 没有具体结论，需要询问下级疾病
                  // case "MAX": // 没有结论
                  // case "R": // 详见险种结论
                  // case "Q": // 转人工核保
                  // case "EX": // 除外责任
                  // case "S": // 提交问券
                  this.submitConfirm();
                  break;
              }
            } else {
              const diseaseNameArr = []; // diseaseNameArr按照接口顺序重排
              const extDiseaseArr = []; // 除责疾病存放
              data.responseList.forEach((item, index) => {
                this.choose.forEach((chooseItem, chooseIndex) => {
                  let chooseStr = chooseItem.split("--");
                  if (chooseStr[1] === item.requestCode) {
                    diseaseNameArr[index] = chooseItem;
                    return false;
                  }
                });
              });

              //除责疾病数组处理，需要带到下个页面
              if (diseaseNameArr.length != this.choose.length) {
                this.choose.forEach(item => {
                  let flag = diseaseNameArr.find(childItem => childItem==item)
                  if (!flag) {
                    extDiseaseArr.push(item)
                  }
                });
              }
              console.log("diseaseNameArr---------", diseaseNameArr);
              console.log("extDiseaseArr------", extDiseaseArr);
              const nextObjDatas = {
                channel: this.subDatas.channel,
                paperId: this.subDatas.paperId,
                questionList: data.responseList, // data.responseList[0].questionList
                chooseList: diseaseNameArr,
                extDiseaseArr: extDiseaseArr
              };
              localStorage.setItem(
                "nextObjDatas",
                JSON.stringify(nextObjDatas)
              );
							if (this.agentCode) {
									window.location.href = `/product/Questions.html?product_id=${this.product_id}&agentCode=${this.agentCode}`;
									// window.location.href = `/product/questions?product_id=${this.product_id}&agentCode=${this.agentCode}`;
							} else{
									window.location.href = `/product/Questions.html?product_id=${this.product_id}`;
                                    // window.location.href = `/product/questions?product_id=${this.product_id}`;
							}
            }
          },
          failFn: () => {}
        });
      } else {
        Toast.info("请选择疾病");
      }
    },
    submitConfirm() {
      const diseaseCodeList = [];
      let self = this;
      this.choose.forEach(item => {
        diseaseCodeList.push({
          diseaseCode: item.split("--")[1],
          answerList: []
        });
      });
      console.log("diseaseCodeList", diseaseCodeList);
      const submitConfirmDatas = {
        channel: this.subDatas.channel,
        paperId: this.subDatas.paperId,
        diseaseList: diseaseCodeList
      };
      this.$request({
        url: `/question/submitConfirm`,
        params: {},
        method: "POST",
        data: submitConfirmDatas,
        isLoading: true,
        contentType: "application/json;charset=UTF-8",
        successFn: data => {
          console.log("submitConfirmdata", data);
          let smartUwConclusion = "";
          switch (data.resultType) {
            case "EX": // 除外责任
              localStorage.setItem("EXInfo", data.resultInfo);
              smartUwConclusion = "4";
              break;
            case "Q": // 转人工核保
                    if(!this.canGoNext) { //体外人核根据渠道号判断是否继续
                showFailAlert()
                return false
              }
              smartUwConclusion = "5";
              localStorage.setItem(
                `underwriteInfo${self.userCode}${self.product_id}`,
                JSON.stringify({
                  questionnaireNo: self.subDatas.paperId,
                  smartUwConclusion: smartUwConclusion,
                  product_id: self.product_id
                })
              );
                if (data.riskResultList != null  && data.riskResultList[0].resultType == "EX") {
                    localStorage.setItem("EXInfoQ", data.riskResultList[0].resultInfo);
                } else {
                    localStorage.removeItem("EXInfoQ");
                }
							if (self.agentCode) {
								window.location.href = `/product/ArtificialConfirm.html?product_id=${self.product_id}&agentCode=${self.agentCode}`;
								// window.location.href = `/product/artificialconfirm?product_id=${self.product_id}&agentCode=${self.agentCode}`;
							} else{
								window.location.href = `/product/ArtificialConfirm.html?product_id=${self.product_id}`;
                                // window.location.href = `/product/artificialconfirm?product_id=${self.product_id}`;
							}
              return false;
              break;
            case "S": // 承保
              smartUwConclusion = "9";
              break;
            default:
              // case "LastD": // 没有具体结论，需要询问下级疾病
              // case "LastQ": // 没有具体结论，需要询问下级疾病
              // case "MAX": // 没有结论
              // case "R": // 详见险种结论
              // case "EX": // 除外责任
              // case "S": // 承保
              break;
          }

          localStorage.setItem(
            `underwriteInfo${self.userCode}${self.product_id}`,
            JSON.stringify({
              questionnaireNo: self.subDatas.paperId,
              smartUwConclusion: smartUwConclusion,
              product_id: self.product_id
            })
          );
					if (self.agentCode) {
						window.location.href = `/product/Sucess.html?product_id=${self.product_id}&agentCode=${self.agentCode}`;
					} else{
						window.location.href = `/product/Sucess.html?product_id=${self.product_id}`;
					}
        },
        failFn: () => {}
      });
    }
  }
};
</script>

 <style lang="scss" scoped>
.section {
  background: #f2f2f2;
  padding-bottom: 150px;
  min-height: 100%;
  box-sizing: border-box;

  &.Intelli-underwriting-wrap {
    .topContent {
      position: relative;
    }
    .topEmpty {
      height: 40px;
      background-color: #fff;
    }
    .add-sickness {
      width: 690px;
      min-height: 120px;
      background-color: #fff;
      margin: -28px auto 32px;
      border-radius: 12px;
      box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.06);

      h2 {
        padding: 36px 0 10px;
        font-size: 34px;
        text-align: center;
      }
      .choosesickness {
        padding: 36px 0 16px 20px;
        overflow: hidden;
        zoom: 1;

        .choosesickname {
          width: 202px;
          height: 56px;
          line-height: 56px;
          margin-right: 20px;
          margin-bottom: 20px;
          text-align: center;
          border-radius: 56px;
          background-color: #f2f2f2;
          float: left;

          .choosesickItem {
            display: flex;
            justify-content: center;
            .item-name {
              width: 96px;
              display: block;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .mainContent {
      h3 {
        height: 106px;
        line-height: 106px;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding-left: 32px;
        position: relative;
        background-color: #fff;

        &::before {
          content: "";
          width: 8px;
          height: 32px;
          background-color: red;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .li-item {
        min-height: 154px;
        border-bottom: 1px solid #ececec;
        box-sizing: border-box;
        background-color: #fff;

        .arrowDown {
          transform: rotate(0deg);
          transition: all 0.5s;
          &.arrowUp {
            transform: rotate(180deg);
          }
        }

        .li-item-title {
          font-size: 32px;
          color: #333333;
          padding: 30px 30px 0 30px;
          display: flex;
          justify-content: space-between;
        }

        .li-item-content {
          color: #8e8e8e;
          font-size: 26px;
          line-height: 46px;
          height: 46px;
          padding-left: 30px;
          background-color: #fff;
          margin: 12px 0;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .li-item-checkbox {
          padding: 10px 40px;
          background-color: #f2f2f2;

          .md-check {
            margin: 40px 0;
            font-size: 28px;
            color: #8e8e8e;
          }
        }
      }
    }
    .subbtn {
      background-color: #fff;
      @extend %gm-footer;
      padding: 16px 28px 14px 32px;
    }
  }
}
</style>

<style lang='scss'>
.Intelli-underwriting-wrap {
  .md-icon.icon-font.md {
    font-size: 40px;
    margin-right: 10px;
  }
  .md-check.is-checked {
    .md-check-icon {
      color: #e10716 !important;
    }
  }
}
</style>
