<template>
  <div class="section health-wrap">
    <form ref="health">
      <div class="form-item required first">
        <div class="form-item-title">1.首次发病日期</div>
        <div class="form-item-content">
          <div class="input-item">
            <input
              type="text"
              @focus="datePickerShowFn1($event)"
              placeholder="请选择日期"
              v-model="healthDatas['01']"
            >

            <md-date-picker
              ref="datePicker1"
              v-model="isDatePickerShow1"
              type="custom"
              :min-date="minDate"
              :max-date="maxDate"
              title="选择首次发病日期"
              :custom-types="['yyyy', 'MM','dd']"
              :default-date="currentDate"
              @confirm="onDatePickerConfirm1"
            ></md-date-picker>
          </div>
        </div>
      </div>

      <div class="form-item required">
        <div class="form-item-title">2.主要症状</div>
        <div class="form-item-content">
          <div class="input-item">
            <textarea placeholder="被保人健康状况描述" v-model="healthDatas['02']"></textarea>
          </div>
        </div>
      </div>

      <div class="form-item required">
        <div class="form-item-title">3.具体诊断</div>
        <div class="form-item-content">
          <div class="input-item">
            <textarea placeholder="医院诊断疾病名称" v-model="healthDatas['03']"></textarea>
          </div>
        </div>
      </div>

      <div class="form-item required">
        <div class="form-item-title">4.发作情况</div>
        <div class="form-item-content">
          <div class="input-item">
            <p>a、发作持续时间</p>
            <input type="text" placeholder="每天发病持续平均时长" v-model="healthDatas['04A']">
          </div>
          <div class="input-item">
            <p>b、发作频率</p>
            <input type="text" placeholder="如每天/每周" v-model="healthDatas['04B']">
          </div>
          <div class="input-item">
            <p>c、最近一次发作时间</p>
            <input
              type="text"
              placeholder="选择时间"
              @focus="datePickerShowFn2($event)"
              v-model="healthDatas['04C']"
            >
            <md-date-picker
              ref="datePicker2"
              v-model="isDatePickerShow2"
              type="custom"
              :min-date="minDate"
              :max-date="maxDate"
              title="最近一次发作时间"
              :custom-types="['yyyy', 'MM','dd']"
              :default-date="currentDate"
              @confirm="onDatePickerConfirm2"
            ></md-date-picker>
          </div>
        </div>
      </div>

      <div class="form-item required">
        <div class="form-item-title">5.治疗情况</div>
        <div class="form-item-content">
          <div class="input-item">
            <p>a、目前是否正在治疗</p>
            <label>
              <input type="radio" name="005a" value="是" v-model="healthDatas['005a']">是
            </label>
            <label style="margin-left: 40px;">
              <input type="radio" name="005a" value="否" v-model="healthDatas['005a']">否
            </label>
            <input
              type="text"
              class="ext"
              placeholder="请输入停止治疗时间"
              v-if="healthDatas['005a'] === '否'"
              v-model="A5"
              @focus="datePickerShowFn3($event)"
            >
            <md-date-picker
              ref="datePicker3"
              v-model="isDatePickerShow3"
              type="custom"
              :min-date="minDate"
              :max-date="maxDate"
              title="选择停止治疗时间"
              :custom-types="['yyyy', 'MM','dd']"
              :default-date="currentDate"
              @confirm="onDatePickerConfirm3"
            ></md-date-picker>
          </div>
          <div class="input-item">
            <p>b、治疗的方法（多选，至少选一个）</p>
            <div class="iput-childen">
              <label>
                <input type="checkbox" value="手术治疗" v-model="healthDatas['05B1']">手术治疗
              </label>
              <input
                type="text"
                class="ext"
                placeholder="请输入手术名称"
                v-if="healthDatas['05B1']"
                v-model="B1"
              >
            </div>
            <div class="iput-childen">
              <label>
                <input type="checkbox" value="药物治疗" v-model="healthDatas['05B2']">药物治疗
              </label>
              <input
                type="text"
                class="ext"
                placeholder="请输入药物名称"
                v-if="healthDatas['05B2']"
                v-model="B2"
              >
            </div>

            <div class="iput-childen">
              <label>
                <input type="checkbox" value="物理治疗" v-model="healthDatas['05B3']">物理治疗
              </label>
            </div>
            <div class="iput-childen">
              <label>
                <input type="checkbox" value="其他治疗" v-model="healthDatas['05B4']">其他治疗
              </label>
              <input
                type="text"
                class="ext"
                placeholder="其他的请具体说明"
                v-if="healthDatas['05B4']"
                v-model="B4"
              >
            </div>
          </div>
          <div class="input-item">
            <div class="input-item">
              <p>c、治疗效果</p>
              <div class="iput-childen">
                <label>
                  <input type="radio" name="05C" value="1" v-model="healthDatas['05C']">治愈，无不适症状，无复发
                </label>
              </div>
              <div class="iput-childen">
                <label>
                  <input type="radio" name="05C" value="2" v-model="healthDatas['05C']">症状缓解
                </label>
              </div>
              <div class="iput-childen">
                <label>
                  <input type="radio" name="05C" value="3" v-model="healthDatas['05C']">未治愈，治疗无效果，症状无缓解或加重
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-item weight required">
        <div class="form-item-title">6.被保人身高</div>
        <div class="form-item-content">
          <div class="input-item">
            <md-input-item
              type="digit"
              v-model="ZNHBbodyInfo['height']"
              placeholder="请填写身高（单位：cm）"
            ></md-input-item>
          </div>
        </div>
      </div>

      <div class="form-item weight required">
        <div class="form-item-title">7.被保人体重</div>
        <div class="form-item-content">
          <div class="input-item">
            <md-input-item
              type="digit"
              v-model="ZNHBbodyInfo['weight']"
              placeholder="请填写体重（单位：kg）"
            ></md-input-item>
          </div>
        </div>
      </div>


      <div class="form-item">
        <div class="form-item-title">8.补充说明（选填）</div>
        <div class="form-item-content">
          <div class="input-item">
            <textarea placeholder="补充说明" v-model="healthDatas['06']"></textarea>
          </div>
        </div>
      </div>

      <div class="form-item">
        <div class="form-item-title">9.影像上传（选填）</div>
        <div class="form-item-content">
          <div class="input-item">
            <UploadImags
              @serverUrlsArr="dealServerUrls"
            />
          </div>
        </div>
      </div>

      <div class="btns">
        <md-button type="primary" @click="goNext">提交</md-button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import UploadImags from "@/components/UploadImags"
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { debounce } from "@/utils/utils"
export default {
  name: "HealthNotification",
  components: { UploadImags },
  data() {
    return {
      riskInfo:{},
      agentCode: '',
      storageName: '',
      userCode: '',
      minDate: null,
      maxDate: null,
      currentDate: new Date(),
      isDatePickerShow1: false,
      isDatePickerShow2: false,
      isDatePickerShow3: false,
      ZNHBbodyInfo: {
        height: '',
        weight: ''
      },
      healthDatas: {
        "01": "",
        "02": "",
        "03": "",
        "04A": "",
        "04B": "",
        "04C": "",
        "005a": "",
        "05B1": "",
        "05B2": "",
        "05B3": "",
        "05B4": "",
        "05C": "",
        "06": ""
      },
      B1: "",
      B2: "",
      B3: "",
      B4: "",
      A5: "",
      subDatas: {
        // idNo: "", //
        // name: "",
        orderNo: "",
        impartInfoList: [
          // {code: "string",param: "string"}
        ]
      },
      product_id: "",
      imageInfoList: [],
      uploadFilesData: {
        businessNo: '', // questionnaireNo
        businessType: "questionnaireNo", // 问券号
        imageInfoList: [
          // {
          //   fileType: "1090", // 投保资料单证类型
          //   imageBase64: dataUrlStr,
          //   imgSide: "A", // 影像正反面 A:正面，B:背面 为空时默认正面
          //   imgType: "OT", // 影像类型 ID:身份证，BC:银行卡,OT：其他 为空时默认其他
          //   order: "1", // 顺序
          //   suffix: fileType // 文件后缀
          // }
        ]
      }
    };
  },
  created() {
    this.init();
    this.loadProDetail();
    this.goNext = debounce(this.goNext)
  },
  methods: {
    loadProDetail() {
        var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType")) || {}
        this.riskInfo = riskInfoObj;
    },
    init() {
      // document.title = "补充健康告知";
			this.agentCode = this.$router.query("agentCode")
      this.product_id = this.$router.query("product_id") || "";
        this.$app.wxProductDetail(this.product_id, 1)
      this.orderNo = this.$router.query("orderNo") // prtNo
      this.prtNo = this.$router.query("prtNo")
      this.orderNo && (this.subDatas.orderNo = this.orderNo)
      this.$app.getUserCode((userCode) => {
        this.userCode = userCode;
        this.storageName = `underwriteInfo${userCode}${this.product_id}`;
        const { questionnaireNo } = localStorage.getItem(this.storageName) ? JSON.parse(localStorage.getItem(this.storageName)) : {}
        this.uploadFilesData.businessNo = questionnaireNo || ''
      });

      const { idNo, name, sex, birthday, idType } = localStorage.getItem("allInfo") ? JSON.parse(
        localStorage.getItem("allInfo")
      ).insuredInfoList[0] : {};
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler(
          "backHomeConfig",
          {
            flag_back: 0 //是否返回按钮，1-返回 0-不返回
          },
          function(response) {}
        );
      });
      this.subDatas.idNo = idNo;
      this.subDatas.name = name;
      this.subDatas.sex = sex;
      this.subDatas.birthday = birthday;
      this.subDatas.idType = idType;
    },
    datePickerShowFn1(e) {
      document.activeElement.blur();
      this.isDatePickerShow1 = true;
    },
    datePickerShowFn2(e) {
      document.activeElement.blur();
      this.isDatePickerShow2 = true;
    },
    datePickerShowFn3(e) {
      document.activeElement.blur();
      this.isDatePickerShow3 = true;
    },
    onDatePickerConfirm1() {
      this.healthDatas["01"] = this.$refs["datePicker1"].getFormatDate(
        "yyyy/MM/dd"
      );
    },
    onDatePickerConfirm2() {
      this.healthDatas["04C"] = this.$refs["datePicker2"].getFormatDate(
        "yyyy/MM/dd"
      );
    },
    onDatePickerConfirm3() {
      this.A5 = this.$refs["datePicker3"].getFormatDate("yyyy/MM/dd");
    },
    dealServerUrls (data) {
      this.imageInfoList = data
    },
    deImpartInfoList() {
      const impartInfoList = [];
      for (let i in this.healthDatas) {
        let item = this.healthDatas[i];
        if(i != "06"){          //i=="06"是补充说明，补充说明为空，需要走switch"06" 给!item分支传入"无"这个字符串(主要是为了给神策传入一个字符串)
           if (!item) continue // 如果没有内容就跳过
        }
        if (typeof item === 'string') {
         //目的是便于后台处理，后台处理根据英文逗号，这里把输入改为中文逗号
          item = item.replace(/,/g,'，')
        }
        const impartInfoObj = {
          code: i,
          param: ""
        };
        switch (i) {
          case "005a":
            if (item === '否') {
              this.A5 = this.A5.replace(/,/g,'，')
              impartInfoObj.param = `N,${this.A5}`;
            } else {
              impartInfoObj.param = "Y";
            }
            break;
          case "05B1":
            if (item) {
              this.B1 = this.B1.replace(/,/g,'，')
              impartInfoObj.param = `Y,${this.B1}`;
            }
            break;
          case "05B2":
            if (item) {
              this.B2 = this.B2.replace(/,/g,'，')
              impartInfoObj.param = `Y,${this.B2}`;
            }
            break;
          case "05B3":
            if (item) {
              impartInfoObj.param = `Y`;
            }
            break;
          case "05B4":
            if (item) {
              this.B4 = this.B4.replace(/,/g,'，')
              impartInfoObj.param = `Y,${this.B4}`;
            }
            break;
          case "05C":
            let code = "05C1";
            if (item === "2") {
              code = "05C2";
            } else if (item === "3") {
              code = "05C3";
            }
            impartInfoObj.code = code
            impartInfoObj.param = "Y"
            break;
          case "06":
            if (!item) {
              impartInfoObj.param = `无`;
            } else {
              impartInfoObj.param = item;
            }
            break;
          default:
            impartInfoObj.param = item;
            break;
        }
        impartInfoList.push(impartInfoObj);
      }
      return impartInfoList;
    },
    validate() {
      if (!this.healthDatas["01"]) {
        Toast.info("请输入首次发病日期");
        return false;
      } else if (!this.healthDatas["02"]) {
        Toast.info("请输入被保人健康状况描述");
        return false;
      } else if (!this.healthDatas["03"]) {
        Toast.info("请输入医院诊断疾病名称");
        return false;
      } else if (!this.healthDatas["04A"]) {
        Toast.info("请输入发病持续时间");
        return false;
      } else if (!this.healthDatas["04B"]) {
        Toast.info("请输入发作频率");
        return false;
      } else if (!this.healthDatas["04C"]) {
        Toast.info("请输入最近一次发作时间");
        return false;
      } else if (!this.healthDatas["005a"]) {
        Toast.info("请选择是否正在治疗");
        return false;
      } else if (this.healthDatas["005a"] === "否" && !this.A5) {
        Toast.info("请输入停止治疗时间");
        return false;
      } else if (
        !this.healthDatas["05B1"] &&
        !this.healthDatas["05B2"] &&
        !this.healthDatas["05B3"] &&
        !this.healthDatas["05B4"]
      ) {
        Toast.info("请选择治疗方法");
        return false;
      } else if (!this.healthDatas["05C"]) {
        Toast.info("请选择治疗效果相关项");
        return false;
      } else {
        if (this.healthDatas["05B1"] && !this.B1) {
          Toast.info("请输入手术名称");
          return false;
        }
        if (this.healthDatas["05B2"] && !this.B2) {
          Toast.info("请输入药物名称");
          return false;
        }
        if (this.healthDatas["05B4"] && !this.B4) {
          Toast.info("请输入其他治疗内容");
          return false;
        }
      }

      if (!this.ZNHBbodyInfo['height']) {
        Toast.info("请输入被保人身高")
        return false
      } else if (!this.ZNHBbodyInfo['weight']) {
        Toast.info("请输入被保人体重")
        return false
      }

      if(!this.checkBMI(this.ZNHBbodyInfo['weight'],this.ZNHBbodyInfo['height'])){
          Toast.info('被保人的身高和体重不符合健康要求')
          return false
      }

      return true;
    },
    dealImageInfoListData () {
      if (this.prtNo) {
        this.uploadFilesData.businessType = 'prtNo'
        this.uploadFilesData.businessNo = this.prtNo
      }
      this.uploadFilesData.imageInfoList = this.imageInfoList.map(
        (item, index) => {
          // const dataUrlStr = item.dataUrl.replace(/data:(.*)base64,/, '')
          return {
            fileType: "1090", // 投保资料单证类型
            imageBase64: '',
            imageUrl: item.imageUrl,
            imgSide: "A", // 影像正反面 A:正面，B:背面 为空时默认正面
            imgType: "OT", // 影像类型 ID:身份证，BC:银行卡,OT：其他 为空时默认其他
            order: index+1, // 顺序
            suffix: item.fileType // 文件后缀
          }
        }
      )
    },
		notificationShenceData(){                                               //神策埋点
			let therapyRes = "治愈，无不适症状，无复发";
			let therapyFlag = false;
			let therapyStr = '';
			let therapyList = [];         //治疗方法的code数组
			let therapyNameList = [];			//治疗方法的文字数组
			if(this.subDatas.impartInfoList[6].param=="Y"){
				therapyFlag = true;
			}
			if(this.subDatas.impartInfoList[this.subDatas.impartInfoList.length-2].code=="05C2"){
				therapyRes = "症状缓解";
			}else if(this.subDatas.impartInfoList[this.subDatas.impartInfoList.length-2].code=="05C3"){
				therapyRes = "未治愈，治疗无效果，症状无缓解或加重";
			}
			for(var i=0;i<this.subDatas.impartInfoList.length;i++){
				if(this.subDatas.impartInfoList[i].code == "05B1" || this.subDatas.impartInfoList[i].code == "05B2" || this.subDatas.impartInfoList[i].code == "05B3" ||this.subDatas.impartInfoList[i].code == "05B4"){
					therapyList.push(this.subDatas.impartInfoList[i].code)
				}
			}
			for(var j=0;j<therapyList.length;j++){
				if(therapyList[j]=="05B1"){
					therapyNameList.push("手术治疗")
				} else if(therapyList[j]=="05B2"){
					therapyNameList.push("药物治疗")
				}	else if(therapyList[j]=="05B3"){
					therapyNameList.push("物理治疗")
				} else if(therapyList[j]=="05B4"){
					therapyNameList.push("其他治疗")
				}
			}
            const onsetDate = new Date(this.subDatas.impartInfoList[0].param)
            const latestOnsetDate = new Date(this.subDatas.impartInfoList[5].param)
            const { riskSubType, riskName, riskCode } = this.riskInfo;
            let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
			sensors.track("health_supplement", {
                risk_type: riskTypeName,
                risk: riskName,
				onset_date:onsetDate,
				main_symptom:this.subDatas.impartInfoList[1].param,
				main_diagnosis:this.subDatas.impartInfoList[2].param,
				onset_time:this.subDatas.impartInfoList[3].param,
				onset_frequence:this.subDatas.impartInfoList[4].param,
				latest_onset_date:latestOnsetDate,
				under_therapy_yn:therapyFlag,
				therapy:therapyNameList,
				therapy_result:therapyRes,
        secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
				supplementary_instruction:this.subDatas.impartInfoList[this.subDatas.impartInfoList.length-1].param
			});
		},
    jumpUrl () {
      this.subDatas.impartInfoList = this.deImpartInfoList();
	  this.notificationShenceData()
      //缓存数据至buy页面提交
      localStorage.setItem("HealthNotification", JSON.stringify(this.subDatas));
      localStorage.setItem("ZNHBbodyInfo", JSON.stringify(this.ZNHBbodyInfo));
      Toast.succeed("提交成功");
      //需要加agentCode校验，判断是否为跳转到代理人投保页面
      if (this.agentCode) {
        setTimeout(() => {
          location.href =
            this.$router.siteUrl() +
            "/product/Buy.html?product_id=" +
            this.product_id +  "&agentCode=" + this.agentCode;
        }, 2000);
      } else{
        setTimeout(() => {
          location.href =
            this.$router.siteUrl() +
            "/product/Buy.html?product_id=" +
            this.product_id;
        }, 2000);
      }

    },
    goNext () {
      if (!this.validate()) {
        return;
      }
      console.log('this.subDatas----------', this.subDatas)
      if (this.imageInfoList && this.imageInfoList.length > 0) {
        this.dealImageInfoListData ()
        this.$request({
            url: `/image/upload`,
            contentType: 'application/json;charset=UTF-8',
            method: 'POST',
            isLoading: true,
            data: this.uploadFilesData,
            successFn: data => {
              if (data.success === 'true') {
                this.jumpUrl ()
              } else {
                Toast.failed('图片上传失败，请稍后再试')
              }
            },
            failFn: data => {
              Toast.failed('图片上传失败，请稍后再试')
            }
        })
      } else {
        this.jumpUrl ()
      }
      // this.$request({
      //   url: `/question/getMoreimpartinfo`,
      //   params: {},
      //   method: "POST",
      //   data: this.subDatas,
      //   isLoading: true,
      //   contentType: "application/json;charset=UTF-8",
      //   successFn: data => {
      //     let _this = this;
      //     this.$app.getUserCode(userCode => {
      //       localStorage.removeItem(
      //         "underwriteInfo" + userCode + _this.product_id
      //       );
      //     });

      //     Toast.succeed("提交成功");
      //     setTimeout(function() {
      //       location.href =
      //         _this.$router.siteUrl() +
      //         "/product/Detail.html?product_id=" +
      //         _this.product_id;
      //     }, 2000);
      //   },
      //   failFn: err => {
      //     Toast.failed(err.resultMsg);
      //   }
      // });
    },
    checkBMI(weight, height){
        //【BMI=体重（公斤）÷身高（米）÷身高（米）】是否BMI≥28？
        let bmi = parseInt(weight / (height / 100) / (height / 100))
        if (bmi >= 28) {
            return false
        }
        return true
    }
  }
};
</script>

<style lang="scss" scoped>
$family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
  Microsoft YaHei, 微软雅黑, Arial, sans-serif;
.health-wrap {
  padding: 0 32px 72px 32px;
  min-height: 100%;
  font-family: $family;

  .form-item {
    margin: 34px 0;
    &.required {
      position: relative;
    }
    &.required::before {
      position: absolute;
      top: 0;
      left: 180px;
      content: "";
      width: 30px;
      height: 30px;
      background: url("../../assets/imgs/intelligentunderwrite/required.png")
        top center no-repeat;
      background-size: 100%;
    }
    &.required.first::before {
      left: 250px;
    }
    &.required.weight::before {
      left: 210px;
    }

    .form-item-title {
      font-size: 32px;
      color: #333;
      padding-bottom: 24px;
    }

    .form-item-content {
      .input-item {
        margin-bottom: 24px;
        font-size: 28px;
        p {
          margin-bottom: 24px;
          font-family: $family;
        }
        input[type="text"]{
          width: 100%;
          border: 1px solid #333;
          box-sizing: border-box;
          padding: 20px 18px 20px 18px;
          border-radius: 12px;
          font-family: $family;
        }
        ::-webkit-input-placeholder {
          color: #999;
        }
        input[type="radio"],
        input[type="checkbox"] {
          vertical-align: -8px;
          margin-right: 24px;
          font-family: $family;
          font-size: 28px;
          width: 34px;
          height: 34px;
        }
        textarea {
          width: 100%;
          min-height: 144px;
          box-sizing: border-box;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 18px;
          font-family: $family;
          font-size: 28px;
        }
        .ext {
          margin: 20px 0;
        }
        .iput-childen {
          margin-bottom: 20px;
        }
        input[type="text"]::-webkit-input-placeholder {
          padding: 0;
          line-height: 30px;
        }
        textarea::-webkit-input-placeholder {
          font-size: 28px;
          padding: 0;
          line-height: 30px;
          font-family: $family;
        }
      }
    }
  }

}
</style>

<style lang="scss">
$family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
  Microsoft YaHei, 微软雅黑, Arial, sans-serif;
.health-wrap {
  .md-input-item-input {
    width: 100%;
    border: 1px solid #333;
    box-sizing: border-box;
    padding: 16px 18px;
    height: 80px;
    border-radius: 12px;
    font-family: $family;
    text-align: left !important;
  }
}
</style>
