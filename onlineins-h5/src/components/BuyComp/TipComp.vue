<template>
  <div class="tip-comp">
    <md-dialog title='提示'
               :closable="true"
               v-model="msgDialog.open"
               :btns="msgDialog.btns">
      <div v-html="showMsg"></div>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: 'TipComp',

  data() {
    return {
      showMsg: '',
      contentMsg: {
        sxbIdCardMsg:`请投保时使用有效期内证件进行投保`,
        idCardMsg: `有效期请在身份证背面查看。<br />长期：有效期限包含“长期”字样，即为长期身份证`,
		emailMsg:`可用于接收电子保单、分红通知书、万能险保单年度报告、满期领取通知书、保全变更批单等。`,
        detailMsg: `详细地址示例：xx区/县/州/旗+xx镇/街/路等+xx村/号/室等（具体到路、门牌号、小区、楼栋号、单元室)`
      },
      msgDialog: {
        open: false,
        btns: [{
          text: '确认'
        }],
      }
    }
  },

  computed: {},

  created() {},

  methods: {
    showSxbIdCardTip () {
      this.showMsg = this.contentMsg.sxbIdCardMsg
      this.msgDialog.open = true
    },
    showIdCardTip () {
      this.showMsg = this.contentMsg.idCardMsg
      this.msgDialog.open = true
    },
    showEmailTip () {
      this.showMsg = this.contentMsg.emailMsg
      this.msgDialog.open = true
    },
    showDetailTip () {
      this.showMsg = this.contentMsg.detailMsg
      this.msgDialog.open = true
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
