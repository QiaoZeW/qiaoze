<template>
    <div class="giving-buy-wrap">
      <div class="block-wrap">
        <Gbuycomp v-if="status === 0" />
        <Success :status="status" v-else />
      </div>
      <div class="block-wrap">
        <StatusBlock :status="status" />
      </div>
      <div class="block-wrap">
        <StatusBlock second :status="status" />
      </div>
      <EnsureContent />
      <Gpopup ref="pop" :params="params" />
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    import Gbuycomp from './Gbuycomp'
    import StatusBlock from './StatusBlock'
    import EnsureContent from './EnsureContent'
    import Success from './Success'
    import Gpopup from './Gpopup'

    export default {
        name: "GivingBuyWrap",
        components: {
          Gbuycomp,
          StatusBlock,
          EnsureContent,
          Success,
          Gpopup
        },
        data () {
            return {
              params: {
                pText: `您好友的福利已被领取`,
                btnText: '领取更多福利',
                isBlue: true
              },
              userToken: '',
              frequency: 0,
              canReceiveAgain: false
            }
        },
        created() {
          this.init()
        },
        computed: {
          status () {
             // 0--初次待领取  1--初次已领取完毕结果页  2--二次待领取  3--二次已领取完毕结果页
             if (this.frequency === 0) {
                return 0
             } else if (this.frequency === 1) {
                return this.canReceiveAgain ? 2 : 1  // canReceiveAgain有没有别人通过自己的分享链接承保成功
             } else {
                return 3
             }
          }
        },
        mounted () {
          if (this.success) {
            this.showDownLoadBtn()
          }
        },
        methods: {
          init () {
                  this.$app.getToken((userToken)=>{
                      this.userToken = userToken
                      this.getInsureNum()
                      this.getIsInviteReceiveZJRisk()
                  })
          },
          showDownLoadBtn () {
            this.params = {
              pText: `请至百年人寿APP“我的—<br>保单”管理您的保单`,
              btnText: '立即下载',
              clickFn: () => {
                this.$app.downLoadApp()
              }
            }
            this.$refs['pop'].show()
          },
          getIsInviteReceiveZJRisk () {
            this.$request({
                url: `/act/giftRisk/getIsInviteReceiveZJRisk`,
                contentType: 'application/json;charset=UTF-8',
                userToken: this.userToken,
                successFn: (data) => {
                  this.canReceiveAgain = data || false
                },
                failFn: (err) => {
                  Toast.failed(err.resultMsg)
                }
            })
          },
          getInsureNum () {
            this.$request({
                url: `/act/giftRisk/getReceiveTimes`,
                contentType: 'application/json;charset=UTF-8',
                userToken: this.userToken,
                successFn: (data) => {
                  this.frequency = data
                },
                failFn: (err) => {
                  Toast.failed(err.resultMsg)
                }
            })
          }
        }
    }
</script>

<style lang='scss' scoped>
.giving-buy-wrap {
    background-color: #FFE4D2;
    padding: 58px 0 40px;
    .myField{
        position: relative;
        width: 592px !important;
        margin: 0 auto;
        margin-top: 144px;
        padding-right: 10px;
    }
}
</style>
