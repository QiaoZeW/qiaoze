<template>
    <div class="award-detail">
        <div v-if="list.length>0">
            <Jintiao v-if="stepRewardCode==8 || stepRewardCode==6" :list-data="list" />
            <Kouqiangquan v-else-if="stepRewardCode==5 || stepRewardCode==7" :list-data="list" />
            <Baijiadou v-else :list-data="list" />
        </div>
        <div v-else class="empty">没有记录哦！</div>
    </div>
</template>

<script>
    import {Toast} from "mand-mobile";
    import Baijiadou from "@/views/activity/step/comp/Baijiadou";
    import Kouqiangquan from "@/views/activity/step/comp/Kouqiangquan";
    import Jintiao from "@/views/activity/step/comp/Jintiao";
    export default {
        name: "AwardDetail",
        data() {
            return {
                list: [],
                stepRewardCode: '',
                stepRewardDatail: {}
            }
        },
        components: {
          Baijiadou,
          Kouqiangquan,
          Jintiao
        },
        created(){
            // step_reward_code
            // 纪念金条-8
            // 健康体检-7
            // 口腔健康礼包-6
            // 口腔检查券-5
            // 999百佳豆-4
            // 299百佳豆-3
            // 199百佳豆-2
            // 99百佳豆-1
            this.init()
        },
        methods: {
            init () {
              this.stepRewardDatail = JSON.parse(sessionStorage.getItem('stepRewardDatail'))
              this.stepRewardCode = this.stepRewardDatail['stepRewardCode'] || ''
              this.getActStepTwoRewardDetail()
            },
            getActStepTwoRewardDetail () {
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
        }
    }
</script>

<style lang="scss" scoped>
.award-detail {
  min-height: 100%;
  padding: 0 30px;
  background-color: #fff;
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
  }
}
</style>
