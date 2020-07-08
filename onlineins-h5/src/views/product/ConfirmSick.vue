<template>
  <div class="section confirm-sick-wrap">
    <h2>请确认被保险人是否曾患有或者正在患有以下疾病</h2>
    <ul class="confirm-sicklist">
      <li
        v-for="(item,index) in diseaseListInfo.diseaseListArr"
        :key="index"
      >{{ index+1 }}、 {{ item }}</li>
    </ul>
    <div class="btns">
      <md-button type="default" style="margin-right: 26px;" @click="goback">返回修改</md-button>
      <md-button type="primary" @click="confirm">确认</md-button>
    </div>
  </div>
</template>

<script>
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
export default {
  name: "ConfirmSick",
  components: {},
  data() {
    return {
        riskInfo:{},
		agentCode:"",
		product_id:"",
        diseaseListInfo: {
        resultType: "",
        resultInfo: "",
        diseaseListArr: []
      }
    };
  },
  created() {
	this.agentCode = this.$router.query("agentCode");
    this.product_id = this.$router.query("product_id");
    this.loadProDetail();
    this.$app.wxProductDetail(this.product_id, 1)
    console.log("created--------");
    this.getInitData();
    console.log("diseaseListInfo------------", this.diseaseListInfo);
  },
  methods: {
    loadProDetail() {
        var riskInfoObj = JSON.parse(localStorage.getItem("shence_riskInfo_data_riskType"))
        this.riskInfo = riskInfoObj;
    },
    getInitData() {
      this.diseaseListInfo = JSON.parse(
        localStorage.getItem("diseaseListInfo")
      );
      const diseaseListArr = this.diseaseListInfo.diseaseListArr.map(item => {
        return item.split("--")[0];
      });
      this.diseaseListInfo.diseaseListArr = diseaseListArr;
    },
    goback() {
			if (this.agentCode) {
				location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
			} else{
				location.href = "/product/IntelligentUnderwriting.html?product_id=" + this.product_id;
			}
    },
		confirmShenceData(){
            const { riskSubType, riskName, riskCode } = this.riskInfo;
            let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
            sensors.track("confirm_illness", {
                secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                risk_type: riskTypeName,
                risk: riskName
            });
		},
    confirm() {
			this.confirmShenceData();                        //确认疾病时触发埋点
      /*
        type = 'CONFIRM'时进行下一步询问
        否则进行结果也跳转

        代码	名称
        resultType
        D	拒保
        LastD	没有具体结论，需要询问下级疾病
        R	详见险种结论
        Q	转人工核保
        EX	除外责任
        S	承保
        LastQ	没有具体结论，需要询问下级问题
        MAX	没有结论

      */
      switch (this.diseaseListInfo.resultType) {
        case "D":
          console.log("拒保");
          const failReason = JSON.stringify(
            encodeURIComponent(this.diseaseListInfo.resultInfo)
          );
          localStorage.setItem("failReason", failReason);
					if (this.agentCode) {
						window.location.href = "/product/Fail.html?product_id=" + this.product_id + "&agentCode=" + this.agentCode;
					} else{
						window.location.href = `/product/Fail.html?product_id=${this.product_id}`;
					}
          break;
        case "LastD":
          console.log("没有具体结论，需要询问下级疾病");
          break;
        case "R":
          console.log("详见险种结论");
          break;
        case "Q":
          // 提交问券
          console.log("转人工核保");
          break;
        case "EX":
          // 提交问券
          console.log("除外责任");
          break;
        case "S":
          // 提交问券
          console.log("承保");
          // window.location.href = '/product/Sucess.html'
          break;
        case "LastQ":
          console.log("没有具体结论，需要询问下级问题");
          break;
        case "MAX":
          console.log("没有结论");
          break;
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
.section {
  background: #f2f2f2;
  min-height: 100%;
  padding-bottom: 120px;
  box-sizing: border-box;

  &.confirm-sick-wrap {
    h2 {
      padding: 32px 76px 32px 32px;
      position: relative;
      font-size: 32px;
      color: #333;

      &::before {
        content: "";
        width: 8px;
        height: 32px;
        background-color: red;
        position: absolute;
        left: 0;
        top: 32px;
      }
    }
    .confirm-sicklist {
      padding: 8px 30px;
      li {
        padding: 24px 20px 24px 26px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.18);
        border-radius: 8px;
        font-size: 30px;
        color: #666666;
        margin-bottom: 22px;
        line-height: 46px;
      }
    }

    .btns {
      @extend %gm-footer;
      padding: 14px 28px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
    }
  }
}
</style>
