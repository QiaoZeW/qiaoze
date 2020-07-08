<template>
    <div class="wrap">
      <md-popup class="stage-list-wrap" position="bottom" v-model="showStageList" large-radius>
          <img src="@/assets/imgs/stepComputed/new/icon01.png" class="topicon" />
          <div class="empty"></div>
          <div class="content">
             <md-icon class="close" name="clear" size="lg" @click="showStageList=false" />
             <h2 class="stage-title">道具</h2>
             <ul class="list">
               <li v-for="(item, index) in list" :key="index" :class="[item.stepPropCode==1 ? 'green' : 'yellow']">
                 <div class="left">
                   <div class="imgouter">
                     <img :src="item.propImageUrl || imgurl" alt="">
                     <span v-if="item.stepPropNum">{{ item.stepPropNum }}</span>
                   </div>
                   <p class="text">{{ compDesc(item) }}</p>
                 </div>
                 <div class="right">
                   <button @click="goAction(item)">{{ compBtnText(item) }}</button>
                 </div>
               </li>
             </ul>
          </div>
      </md-popup>
      <Gpopup ref="stage-tip" />
    </div>
</template>

<script>
    import {Toast,Dialog} from "mand-mobile";
    import Gpopup from "@/views/activity/step/comp/Gpopup";
    import { goBackHome } from "@/utils/nativeUtils";
    export default {
        name: "rankingList",
        data(){
            return{
                // stepPropCode 1-汽车卡 2-自行车卡
                showStageList: false,
                list:[],
                stageStatusMap: {
                  // stepPropCode
                  '1': {
                     // status
                     '1': {
                       desc: '每张可立即增加3万步',
                       btnText: '立即使用'
                     },
                     '2': {
                       desc: '每张可立即增加3万步保单过犹豫期后生效',
                       btnText: '待生效'
                     },
                     '3': {
                       desc: '每张可立即增加3万步，购买“医惠通、医无忧、药惠通、顺心保、百医保”产品，每张保单可获得一张自行车卡',
                       btnText: '立即购买'
                     }
                  },
                  '2': {
                     // status
                     '1': {
                       desc: '每张可立即增加15万步',
                       btnText: '立即使用'
                     },
                     '2': {
                       desc: '每张可立即增加15万步保单过犹豫期后生效',
                       btnText: '待生效'
                     },
                     '3': {
                       desc: '每张可立即增加15万步，购买“医惠通、医无忧、药惠通、顺心保、百医保”产品，每张保单可获得一张自行车卡',
                       btnText: '立即购买'
                     }
                  }
                },
                deviceNo: '',
                imgurl: require('@/assets/imgs/stepComputed/new/icon02.png'),
                isBrowser: false
            }
        },
        components: {
          Gpopup
        },
        created(){
            this.isBrowser = this.$app.isBrowser()
            this.$app.getDeviceNo((deviceNo) => {
                this.deviceNo = deviceNo
            })
            this.getList()
        },
        methods:{
            show () {
                this.showStageList = true
            },
            goRiskList () {
              if (this.isBrowser) {
                 setupWebViewJavascriptBridge(function (bridge) {
                     bridge.callHandler('goRiskList', {'id': 2}, function () {});
                 })
              }
            },
            compDesc (item) {
              return this.stageStatusMap[item.stepPropCode][item.status].desc
            },
            compBtnText (item) {
              return this.stageStatusMap[item.stepPropCode][item.status].btnText
            },
            goAction (item) {
              if (item.status == '1') {
                // 使用道具卡
                if (item.stepPropCode == '1') {
                   this.$refs['stage-tip'].show('6')
                } else if (item.stepPropCode == '2') {
                   this.$refs['stage-tip'].show('7')
                }
                this.useProp(item)
              } else if (item.status == '2') {
                // return false
              } else if (item.status == '3') {
                goBackHome()
              }
            },
            getList(){
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/stepTwo/getActStepTwoProps`,
                        userToken: userToken,
                        successFn: (data) => {
                            this.list = data || []
                        },
                        errorFn: (data) => {
                        }
                    })
                })
            },
            useProp(item){
                let subData = {
                  deviceNo: this.deviceNo,
                  stepPropCode: item.stepPropCode
                }
                this.$app.getToken((userToken) => {
                    // POST /api/act/stepTwo/useProp -- 使用道具卡
                    this.$request({
                        url: `/act/stepTwo/useProp`,
                        userToken: userToken,
                        method: 'POST',
                        data: subData,
                        successFn: (data) => {
                            this.$emit()
                        },
                        errorFn: (data) => {
                          Toast.info(data.resultMsg || '道具使用失败')
                        }
                    })
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .stage-list-wrap {
        .topicon {
          width: 188px;
          height: 188px;
          margin: 0 auto -100px;
          position: absolute;
          top: 0;
          left: 50%;
          -webkit-transform: translateX(-50%);
             -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
               -o-transform: translateX(-50%);
                  transform: translateX(-50%);
          z-index: 1;
        }
        .empty {
          width: 100%;
          height: 80px;
        }
        .content {
          position: relative;
          padding-bottom: 30px;
          width: 100%;
          background-color: #fff;
          border-radius: 40px 40px 0 0;
          .close {
            color: #DBD9DC;
            position: absolute;
            top: 30px;
            right: 30px;
          }
          h2.stage-title {
            border-bottom: 1px solid #ececec;
            font-size: 28px;
            color: #333;
            padding: 90px 0 20px 50px;
          }
          .list {
            width: 710px;
            margin: 32px auto 0;
            li {
              &.yellow {
                background-color: #FFB400;
                box-shadow: 0 4px 2px 2px #EEB331;
                button {
                  color: #FFB400;
                }
              }
              margin-bottom: 32px;
              padding: 42px 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 20px;
              background-color: #26CDB9;
              box-shadow: 0 4px 2px 2px #C7FCF7;
              .left {
                display: flex;
                align-items: center;
                .imgouter {
                  position: relative;
                  width: 120px;
                  height: 120px;
                  span {
                    padding: 5px 20px 5px 10px;
                    position: absolute;
                    top: -6px;
                    right: -10px;
                    background-color: #F6434E;
                    color: #fff;
                    border-radius: 30px 30px 30px 0;
                  }
                }
                p {
                  margin-left: 20px;
                  color: #fff;
                  font-size: 28px;
                  flex: 1;
                  line-height: 40px;
                }
              }
              button {
                min-width: 136px;
                height: 40px;
                color: #15B6A4;
                text-align: center;
                line-height: 40px;
                background-color: #fff;
                border-radius: 40px;
                font-size: 24px;
              }
            }
          }
        }
    }
</style>
