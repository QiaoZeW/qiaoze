<template>
  <div class="section uploadIDcard-wrap">
    <div class="top-tip">
      根据相关规定，累计保费超20万需上传相关证件照片
    </div>
    <div class="content" v-if="loadingDone">
      <div class="box box1">
        <UploadCards :orderNo="orderNo" :uwStatus="uwStatus1" :imgBackUrl="imgBackUrl1" title="投保人二代身份证" imgType="img1" @img1="reImg1" />
        <UploadCards :orderNo="orderNo" :uwStatus="uwStatus2" :imgBackUrl="imgBackUrl2" :bgcUrl="require('@/assets/imgs/upload_IDcard/card_B.png')" imgType="img2" tip="点击上传国徽面" @img2="reImg2" />
      </div>
      <div class="box box2" v-if="isBenren !== 'true' && uploadInsureIdTypeCode == '0'">
        <UploadCards :orderNo="orderNo" :uwStatus="uwStatus3" :imgBackUrl="imgBackUrl3" title="被保人二代身份证" imgType="img3" @img3="reImg3" />
        <UploadCards :orderNo="orderNo" :uwStatus="uwStatus4" :imgBackUrl="imgBackUrl4" :bgcUrl="require('@/assets/imgs/upload_IDcard/card_B.png')" imgType="img4" tip="点击上传国徽面" @img4="reImg4" />
      </div>
      <div class="box box2" v-if="isBenren !== 'true' && (uploadInsureIdTypeCode == '4' || uploadInsureIdTypeCode == '5')">
        <UploadOtherCards v-if="uploadInsureIdTypeCode == '5'" :orderNo="orderNo" :uwStatus="uwStatus5" :imgBackUrl="imgBackUrl5" title="被保人户口本本人页面" imgType="img5" tip="点击上传被保人页正面" @img5="reImg5"/>
        <UploadOtherCards v-else-if="uploadInsureIdTypeCode == '4'" :orderNo="orderNo" :uwStatus="uwStatus6" :imgBackUrl="imgBackUrl6" title="被保人出生证" imgType="img6" tip="点击上传出生证正面" @img6="reImg6" />
      </div>
    </div>
    <div class="subbtn">
      <md-button class="radius" type="primary" @click="subFn">提交审核</md-button>
    </div>
    <md-dialog
      title=""
      :closable="false"
      v-model="warnDialog.open"
      :btns="warnDialog.btns"
    >
      <p class="fail-tip">{{ failMsg }}</p>
    </md-dialog>
  </div>
</template>

<script>
import UploadCards from "@/components/UploadCards"
import UploadOtherCards from "@/components/UploadOtherCards"
import { Toast,Dialog } from 'mand-mobile'
export default {
  name: "UploadIDcard",
  components: {
    UploadCards,
    UploadOtherCards
  },
  data() {
    return {
      uploadInsureIdTypeCode:'',
      isBrowser: true,
      agentCode: '',
      isBenren: 'false',
      status: '',
      userToken: '',
      orderNo: '',
      prtNo: '',
      product_id: '',
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
      img6: '',
      imgBackUrl1: '',
      imgBackUrl2: '',
      imgBackUrl3: '',
      imgBackUrl4: '',
      imgBackUrl5: '',
      imgBackUrl6: '',
      uwStatus1: NaN,
      uwStatus2: NaN,
      uwStatus3: NaN,
      uwStatus4: NaN,
      uwStatus5: NaN,
      uwStatus6: NaN,
      loadingDone: false,
      subDatas: {
        'orderNo': '',
        'personFlag': '0'
      },
      failMsg: '请选择',
      warnDialog: {
        open: false,
        btns: [
          {
            text: '重新上传'
          },
          {
            text: '转人工审核',
            handler: this.personConfirm
          }
        ],
      }
    }
  },
  created() {
    this.isBrowser = this.$app.isBrowser()
    this.agentCode = this.$router.query('agentCode')
    this.orderNo = this.$router.query('orderNo') || ''
    this.status = this.$router.query('status') // 3-自核成功  2-自核失败
    // this.product_id = this.$router.query('product_id')
    this.prtNo = this.$router.query('prtNo')
    this.$app.getToken((userToken) => {
        this.userToken = userToken
        this.loadDetailDatas()
        this.loadBackImgDatas()
    })
    this.subDatas.orderNo = this.orderNo
  },
  methods: {
    showErrTip () {
      Dialog.alert({
        title: '提示',
        content: '网络错误，请稍后再试！',
        confirmText: '确定'
      })
    },
    // getinsuredIdType(){
    //     //uploadInsureIdTypeCode    0代表身份证，4代表出生证，5代表户口本
    //     this.uploadInsureIdTypeCode = window.localStorage.getItem("uploadInsureIdTypeCode")
    // },
    loadDetailDatas () {
        this.$request({
          url: `/contract/getPolicyDetail`,
          method: "POST",
          isLoading: true,
          isEncript: true,
          contentType: "application/json;charset=UTF-8",
          data: { orderNo: this.orderNo },
          userToken: this.userToken,
          successFn: data => {
            if (data) {
              this.product_id = data.productId
                this.uploadInsureIdTypeCode = data.insuredInfoList[0].idType
              if (data.appntInfo.idNo === data.insuredInfoList[0].idNo) {
                  this.isBenren = 'true'
              }
            } else {
              this.showErrTip()
            }
          },
          failFn: (err) => {
            this.showErrTip()
          }
        })
    },
    loadBackImgDatas () {
      this.$request({
          url: `/antiMoney/list/${this.orderNo}`,
          method: 'POST',
          isLoading: true,
          contentType: 'application/json',
          userToken: this.userToken,
          successFn: (res) => {
              if (res && res.length > 0) {
                res.forEach((item, index) => {
                  // uwStatus：0未通过，1审核中，2通过
                  this[`imgBackUrl${item.type}`] = item.cardImgUrl
                  this[`uwStatus${item.type}`] = item.uwStatus
                })
              }
              this.loadingDone = true
          },
          failFn: (err) => {
            this.loadingDone = true
          }
      })
    },
    reImg1 (data) {
      this.img1 = data
    },
    reImg2 (data) {
      this.img2 = data
    },
    reImg3 (data) {
      this.img3 = data
    },
    reImg4 (data) {
      this.img4 = data
    },
    reImg5 (data) {
      this.img5 = data
    },
    reImg6 (data) {
      this.img6 = data
    },
    subFn () {
      this.OCRfiles()
    },
    OCRfiles () {
      if (!this.img1) {
        Toast.info('请上传投保人身份证正面照片')
        return false
      } else if (!this.img2) {
        Toast.info('请上传投保人身份证反面照片')
        return false
      }

      if (this.isBenren !== 'true' && this.uploadInsureIdTypeCode == '0') {
        if (!this.img3) {
          Toast.info('请上传被保人身份证正面照片')
          return false
        } else if (!this.img4) {
          Toast.info('请上传被保人身份证反面照片')
          return false
        }
      }else if(this.isBenren !== 'true' && this.uploadInsureIdTypeCode == '5'){
         if (!this.img5) {
           Toast.info('请上传被保人户口本本人页正面照片')
           return false
         }
      }else if(this.isBenren !== 'true' && this.uploadInsureIdTypeCode == '4'){
         if (!this.img6) {
           Toast.info('请上传被保人出生证正面照片')
           return false
        }
      }
      if(this.uploadInsureIdTypeCode == '4' || this.uploadInsureIdTypeCode == '5'){
         this.warnDialog.open = true
      }else{
         this.subDatas.personFlag = '0'
         this.$request({
             url: `/antiMoney/card/submit`,
             method: 'POST',
             data: this.subDatas,
             isLoading: true,
             contentType: 'application/json',
             userToken: this.userToken,
             successFn: (res) => {
                 if (res) {
                   this.warnDialog.open = false
                   this.goNext()
                 }
             },
             failFn: (err) => {
               this.warnDialog.open = true
               this.failMsg = err.resultMsg
             }
         })
      }
    },
    goNext () {
      // 3-自核成功  2-自核失败 5-转人核成功
      if (this.status === '2' || this.status === '5') {
          this.showTip('证件审核成功，请耐心等待人工核保')
      } else {
          if (this.agentCode) {
              location.href = `/product/AgainOrderPayment.html?orderNo=${this.orderNo}&product_id=${this.product_id}&agentCode=${this.agentCode}`
          } else{
              location.href = `/product/AgainOrderPayment.html?orderNo=${this.orderNo}&product_id=${this.product_id}`
          }
      }
    },
    showTip (msg = '转人工审核成功，请耐心等待') {
      Dialog.alert({
        title: '提示',
        content: msg,
        confirmText: '确定',
        onConfirm: () => {
          if (this.isBrowser) {
            this.goHome()
          }
        }
      })
    },
    personConfirm () {
      this.subDatas.personFlag = '1'
      this.$request({
          url: `/antiMoney/card/submit`,
          method: 'POST',
          data: this.subDatas,
          isLoading: true,
          contentType: 'application/json',
          userToken: this.userToken,
          successFn: (res) => {
              this.warnDialog.open = false
              if (res) {
                this.showTip()
              } else {
                Dialog.alert({
                  title: '提示',
                  content: '转人工审核失败，请稍后再试',
                  confirmText: '确定'
                })
              }
          },
          failFn: (err) => {
            this.warnDialog.open = true
            this.failMsg = err.resultMsg
          }
      })
    },
    goHome () {
      setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler("backHome", {id: 2}, function () {
          })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.uploadIDcard-wrap {
  background-color: #F2F2F2;
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: 170px;
  .top-tip {
    height: 56px;
    text-align: center;
    color: #fff;
    line-height: 56px;
    background-color: #FC8F22;
    font-size: 24px;
  }
  .content {
    box-sizing: border-box;

    .box {
      background-color: #fff;
      width: 690px;
      margin: 32px auto;
      padding: 32px;
      box-sizing: border-box;
    }
  }
  .subbtn {
    background-color: #fff;
    @extend %gm-footer;
    padding: 16px 28px 14px 32px;
  }
}
</style>

<style lang="scss">
.fail-tip {
  text-align: center;
  font-size: 36px;
  color: #333;
}
</style>
