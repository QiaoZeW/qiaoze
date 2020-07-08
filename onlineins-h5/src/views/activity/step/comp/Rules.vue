<template>
    <md-popup class="rules-wrap" position="bottom" v-model="showRules" large-radius>
        <div class="content">
           <md-icon class="close" name="clear" size="lg" @click="showRules=false" />
           <h3 class="title">活动规则</h3>
           <div class="theme">
             <h4>活动主题：穿越中国遇见你 百根金条等你嬴</h4>
             <div class="block"></div>
           </div>
           <div class="detail">
              <p>活动规则：</p>
              <p><span class="bold">一、</span>每日可行走步数上限为15000步。</p>
              <p><span class="bold">二、打卡奖励：</span>到达任一城市时获得，并有机会抽中金条大奖。</p>
              <p><span class="bold">三、超越奖励：</span>超过一名玩家，可获得一次抽奖机会。反复超越同一名玩家不会获得奖励，每日仅能获得1次超越奖励。</p>
              <p><span class="bold">四、邀请奖励：</span>分享本活动。成功邀请一位百年新注册用户参加本活动，即可获得一次抽奖机会。每日最多获得3次邀请奖励。</p>
              <p><span class="bold">五、行者奖励：</span>每走40000步，可获得一次抽奖机会。</p>
              <p>1.连续3天完成行走，第3天起，行走步数按1.2倍计算；连续7天完成行走，第7天起，行走步数按1.5倍计算。如有中断，加成需从新累计。</p>
              <p><span class="bold">六、道具卡：</span>在活动周期内，可累计获得“自行车卡”和“汽车卡”。“自行车卡”可增加3万步，“汽车卡”可增加15万步</p>
              <p>1.投保以下产品获“自行车卡”：<span class="green">医惠通、医无忧、药惠通、顺心保、百医保</span></p>
              <p>2.投保以下产品获“汽车卡”：<span class="green">康惠保2020版、超倍保、康惠保旗舰版、加惠保、童惠保、定惠保</span></p>
              <p><span class="bold">七、</span>活动分三个阶段进行。到达每个阶段终点后，如下一阶段暂未开放，那么玩家暂不能前进，但依然可以继续行走获得“<span class="bold">邀请奖励</span>”、“<span class="bold">行者奖励</span>”与“<span class="bold">道具卡</span>”。</p>
              <p>1.第一阶段，北京至广东，时间：2020年4月1~2020年6月30日</p>
              <p>2.第二阶段，广东至西藏，时间：2020年7月1~2020年9月30日</p>
              <p>3.第三阶段，西藏至辽宁，时间：2020年10月1~2020年12月31日</p>
              <p><span class="bold">八、</span>特等奖：<span class="bold">4天3晚日本双人游（双飞+全程5星酒店）</span>。</p>
              <p>获奖资格如下：</p>
              <p>1.活动时间内到达终点辽宁。</p>
              <p>1.获得阶段冠军最多的玩家获奖。</p>
              <p>3.如阶段冠军的获得次数有多人一样，那么其中总行走步数最多的玩家获奖。</p>
              <p>4.如阶段冠军的获得次数及总行走步数有多人一样，那么其中获得邀请奖励最多的玩家获奖。</p>
              <p><span class="bold">九、</span>禁止作弊，如发现有作弊行为的，百年人寿有权清空其所有奖励。</p>
              <p><span class="bold">十、</span>所有道具及抽奖奖励请在2020.12.31前使用，过期自动失效。</p>
              <p>本活动解释权归百年人寿所有</p>
           </div>
        </div>
    </md-popup>
</template>

<script>
    export default {
        name: "Rules",
        data(){
            return{
              showRules: false
            }
        },
        created(){
        },
        methods:{
            show () {
                this.showRules = true
            }
        }
    }
</script>

<style scoped lang="scss">
    .bold {
      font-weight: bold;
    }
    .green {
      color: #18BBA8;
    }
    .rules-wrap {
        .content {
          background-color: #fff;
          position: relative;
          padding-bottom: 30px;
          padding: 50px 36px;
          width: 100%;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 40px 40px 0 0;
          .close {
            color: #DBD9DC;
            position: absolute;
            top: 30px;
            right: 30px;
          }
          .title {
            background-color: #E5F4F6;
            color: #07A895;
            font-size: 36px;
            font-weight: bold;
            width: 272px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            border-radius: 80px;
            margin: 0 auto 50px;
          }
          .theme {
            margin-top: -20px;
            h4 {
              font-size: 34px;
              color: #07A895;
              text-align: center;
              position: relative;
              top: 16px;
            }
            .block {
              width: 100%;
              height: 28px;
              background-color: #C4EBEA;
              border-radius: 10px;
            }
          }
          .detail {
            padding-top: 30px;
            max-height: 700px;
            overflow: scroll;
            p {
              color: #333;
              font-size: 28px;
              line-height: 46px;
            }
          }
        }
    }
</style>
