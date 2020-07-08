<template>
    <div>
        <ul class="list">
            <li v-for="item in list" :key="item.drawId">
               <div class="left">
                   <div class="img-block">
                     <img :src="imgUrl" alt="">
                   </div>
                   <div v-if="item.ticketReceiveFlag==1" class="text">
                     <div class="title">
                       <button>收获地址</button>
                       <p class="name">{{ item.ticketReceiverUsername || ''}}</p>
                       <p class="phone">{{ item.ticketReceiverMobile || ''}}</p>
                     </div>
                     <p class="adress">{{ item.ticketReceiverArea + item.ticketReceiverAddress}}</p>
                     <p class="time">获取时间：{{ item.drawTime | tansTime }}</p>
                   </div>
                   <div v-else-if="item.ticketReceiveFlag==0" class="add">
                      <button @click="addAddress(item)">添加收货地址</button>
                      <p class="time">
                        领取有效期：{{ item.expireTime | tansTime }}
                      </p>
                   </div>
                   <div v-else="item.ticketReceiveFlag==2" class="fail">
                      <p class="time">
                        领取有效期：{{ item.expireTime | tansTime }}
                      </p>
                   </div>
               </div>
               <button v-if="item.ticketReceiveFlag==1" class="status red">已领取</button>
               <button v-else-if="item.ticketReceiveFlag==0" class="status yellow">未领取</button>
               <button v-else="item.ticketReceiveFlag==2" class="status grey">已失效</button>
            </li>
        </ul>
        <Adress
            :personInfo="person"
            @updateInfo="updateInfo"
            @closeAdd="closeAdd"
            :iphoneNum="iphone"
            :showAddress="showAddress"
            :id="id"
        />
    </div>
</template>

<script>
    import Adress from "@/views/activity/step/comp/Adress";
    export default {
        name: "Jintiao",
        data(){
            return{
              imgUrl: '',
              stepRewardDatail: {},
              // status: 3, // 0未领取，1已领取，2已失效
              person: {},
              iphone: '',
              id: NaN,
              showAddress: false,
              list: []
            }
        },
        components: {
          Adress
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
              this.stepRewardDatail = JSON.parse(sessionStorage.getItem('stepRewardDatail'))
              console.log('this.stepRewardDatail', this.stepRewardDatail)
              this.imgUrl= this.stepRewardDatail['rewardLogoUrl'] || ''
              this.stepRewardCode = this.stepRewardDatail['stepRewardCode'] || ''
              document.title =  this.stepRewardDatail['stepRewardCode']=='8' ? '纪念金条' : '口腔健康礼包'
              this.list = this.listData || []
            },
            closeAdd() {
                this.showAddress = false;
            },
            updateInfo(obj) {
                console.log(obj);
                this.getList();
            },
            addAddress(item) {
                this.id = item.drawId;
                this.showAddress = true;
            },
            getList () {
              let url = `/act/stepTwo/getActStepTwoRewardDetail/${this.stepRewardCode}`
              if (this.stepRewardCode == '4') {
                  url = `/act/stepTwo/getScoreRewards`
              }
              this.$app.getToken((userToken) => {
                this.$request({
                  url: url,
                  isLoading: true,
                  userToken: userToken,
                  successFn: data => {
                    this.list = data || []
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
            return dateInfo.join('-')
          }
        }
    }
</script>

<style scoped lang="scss">
.list {
  padding-top: 24px;
  li {
     display: flex;
     align-items: center;
     background-color: #fff;
     justify-content: space-between;
     padding: 24px 28px;
     box-sizing: border-box;
     padding: 30px;
     border-bottom: 1px solid #ECECEC;
     color: #333;
     font-size: 26px;
     border-radius: 12px;
     box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.06);
     position: relative;
     margin-bottom: 24px;
     .left {
       display: flex;
       color: #333;
       font-size: 26px;
       .img-block {
         width: 100px;
         height: 100px;
         margin-right: 16px;
         border-radius: 100px;
         position: relative;
         overflow: hidden;
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
       .text {
          .title {
              display: flex;
              margin-bottom: 16px;
              button {
                color: #D57374;
                min-width: 94px;
                height: 30px;
                line-height: 30px;
                background: #fff;
                border-radius: 4px;
                border: 1px solid #D57374;
                font-size: 20px;
                margin-top: -2px;
              }
             .name {
                margin: 0 10px 0 16px;
                font-size: 24px;
             }
             .phone {
                font-size: 24px;
             }
          }
          .adress {
            width: 364px;
            font-size: 26px;
            color: #333;
            margin-bottom: 16px;
          }
          .time {
             font-size: 24px;
             color: #A5A4A7;
          }
       }
       .add {
         button {
           width: 226px;
           height: 60px;
           line-height: 60px;
           color: #D57374;
           background-color: #fff;
           border-radius: 8px;
           border:2px solid #D57374;
           text-align: center;  
           margin: 16px 0 24px 36px;
         }
         .time {
           font-size: 26px;
           color: #A5A4A7;
         }
       }
       .fail {
         display: flex;
         align-items: center;
         font-size: 26px;
         color: #A5A4A7;
       }
     }
     button.status {
       min-width:122px;
       height:36px;
       background: #FA655E;
       border-radius: 4px;
       font-size: 24px;
       line-height: 36px;
       position: absolute;
       color: #fff;
       top: 28px;
       right: 30px;
       &.red {
         background-color: #FA655E;
       }
       &.yellow {
         background-color: #FEC711;
       }
       &.grey {
        background-color: #99989B;
       }
     }
  }
}
</style>
