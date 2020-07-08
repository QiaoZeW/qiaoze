<template>
    <div>
        <ul class="list">
            <li v-for="item in listData" :key="item.drawId">
               <div class="left">
                   <div class="img-block">
                     <img :src="imgUrl" alt="">
                   </div>
                   <div class="text">
                     <p class="p1">{{ stepRewardDatail.rewardName }}</p>
                     <p class="p2">券号：{{ item.ticketNo }}</p>
                     <p class="p2">密码：{{ item.ticketPassword }}</p>
                     <p class="p3">获取时间：{{ item.drawTime | tansTime}}</p>
                   </div>
               </div>
               <a href="tel:4008801900">电话预约</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Baijiadou",
        data(){
            return{
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
              document.title = "口腔检查券"
              this.stepRewardDatail = JSON.parse(sessionStorage.getItem('stepRewardDatail'))
              this.imgUrl= this.stepRewardDatail['rewardLogoUrl'] || ''
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
         margin-right: 36px;
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
       .p1 {
          font-weight: bold;
          font-size: 28px;
          margin-bottom: 12px;
       }
       .p2 {
          font-size: 26px;
          margin-bottom: 8px;
       }
       .p3 {
         font-size: 26px;
         color: #999;
       }
     }
     a {
       min-width:122px;
       height:36px;
       background: #fff;
       border-radius: 4px;
       border:1px solid #DB6E6A;
       font-size: 24px;
       line-height: 36px;
       position: absolute;
       color: #DB6E6A;
       top: 28px;
       right: 30px;
       text-align: center;
     }
  }
}
</style>
