<template>
    <div class="award-list">
        <ul v-if="list.length>0">
            <li v-for="item in list" :key="item.id">
                <div v-if="item.rewardNum > 0">
                  <div class="left">
                      <div class="img-block">
                        <img :src="item.rewardLogoUrl" alt="">
                        <span v-if="item.rewardNum">x{{ item.rewardNum }}</span>
                      </div>
                      <span>{{ item.rewardName }}</span>
                  </div>
                  <div class="right">
                      <button @click="goDetail(item)">去查看</button>
                  </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast, Dialog } from "mand-mobile";
    export default {
        name: "AwardList",
        data() {
            return {
              list: []
            }
        },
        created () {
          this.init()
        },
        methods: {
          init () {
            this.getActStepTwoDrawGroupReward()
          },
          goDetail (item) {
            sessionStorage.setItem('stepRewardDatail', JSON.stringify(item))
            location.href = `/activity/step/AwardDetail.html?stepRewardCode=${item.stepRewardCode}`
          },
          getActStepTwoDrawGroupReward () {
              this.$app.getToken((userToken) => {
                // 奖品数量列表
                this.$request({
                  url: `/act/stepTwo/getActStepTwoDrawGroupReward`,
                  isLoading: true,
                  userToken: userToken,
                  successFn: data => {
                    this.list = this.list.concat(data || [])
                  },
                  failFn: () => {
                    Dialog.alert({ content: data.resultMsg });
                  }
                });
              })
          }
        }
    }
</script>

<style lang="scss" scoped>
.award-list {
    background-color: #F2F2F4;
    min-height: 100%;
    padding: 24px 30px 60px;
    ul {
       width: 100%;
       li {
          > div {
             display: flex;
             align-items: center;
             background-color: #fff;
             justify-content: space-between;
             border-radius: 12px;
             padding: 24px 28px;
             box-sizing: border-box;
             box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.06);
             margin-bottom: 24px;
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
             }
             .right {
               button {
                 background-color: #F7655E;
                 min-width: 136px;
                 height: 48px;
                 color: #fff;
                 font-size: 26px;
                 border-radius: 8px;
               }
             }
          }
       }
    }
}
</style>
