<template>
    <div>
        <ul class="list">
            <li>
              <p>明细</p>
              <button @click="goZuiMarket">
                去兑换>
              </button>
            </li>
            <li v-for="item in listData" :key="item.drawId">
               <div class="left">
                   <div class="img-block">
                     <img :src="item.rewardLogoUrl" alt="">
                   </div>
                   <div class="text">
                     <p class="p1">抽奖</p>
                     <p class="p2">{{ item.drawTime | tansTime }}</p>
                   </div>
               </div>
               <div class="right">
                   {{ item.rewardName}}
               </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Baijiadou",
        data () {
            return {
              imgUrl: '',
              stepRewardDatail: {}
            }
        },
        props: {
          listData: {
            type: Array,
            default: () => []
          }
        },
        created(){
            this.init()
        },
        methods:{
            init () {
              document.title = "百佳豆"
              // this.stepRewardDatail = JSON.parse(sessionStorage.getItem('stepRewardDatail'))
              // console.log('this.stepRewardDatail', this.stepRewardDatail)
              // this.imgUrl= this.stepRewardDatail['rewardLogoUrl'] || ''
              // this.getScoreRewards()
            },
            goZuiMarket () {
              location.href = '/activity/step/ZuiMarket.html'
            },
            getScoreRewards () {
                this.$app.getToken((userToken) => {
                  this.$request({
                    // 积分奖品明细
                    url: `/act/stepTwo/getScoreRewards`,
                    isLoading: true,
                    userToken: userToken,
                    successFn: data => {
                      this.list = data
                    },
                    failFn: () => {
                      Dialog.alert({ content: data.resultMsg });
                    }
                  });
                })
            }
        },
        filters: {
            tansTime (v) {
              const cDate = new Date(v)
              const dateInfo = [
                cDate.getFullYear(),
                cDate.getMonth() + 1,
                cDate.getDate()
              ]
              return dateInfo.join('.')
            }
        }
    }
</script>

<style scoped lang="scss">
.list {
  li {
     display: flex;
     align-items: center;
     background-color: #fff;
     justify-content: space-between;
     padding: 24px 28px;
     box-sizing: border-box;
     padding: 30px 0;
     border-bottom: 1px solid #ECECEC;
     color: #333;
     font-size: 30px;
     &:nth-of-type(1) {
        p {
           font-weight: bold;
        }
        button {
           color: #F96B62;
           font-size: 30px;
        }
     }
     .left {
       display: flex;
       align-items: center;
       color: #333;
       font-size: 26px;
       .img-block {
         width: 100px;
         height: 100px;
         margin-right: 36px;
         border-radius: 100px;
         position: relative;
         overflow: hidden;
         background-color: #FFEDD2;
         span {
           position: absolute;
           right: -20px;
           top: -8px;
           padding: 4px 12px 4px 8px;
           border-radius: 18px 18px 18px 0;
           color: #fff;
           font-size: 24px;
           background-color: #19CBFF;
         }
       }
       .p1 {
          font-weight: bold;
          font-size: 30px;
          color: #333；
       }
       .p2 {
          font-size: 28px;
          color: #A4A4A4;
       }
     }
     .right {
         font-size: 28px;
         color: #999;
     }
  }
}
</style>
