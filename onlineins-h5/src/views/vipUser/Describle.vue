<template>
  <section>
      <h3>什么是百佳豆</h3>
      <p class="content">
          百佳豆可以在“发现-会员尊享/精品兑换”版块当钱花哦
      </p>
      <h3>	如何获取百佳豆</h3>
      <p class="content">
          参与平台日常活动和任务获取对应奖励百佳豆
      </p>
      <h3>	百佳豆如何使用
      </h3>
      <p class="content">
          百佳豆可进行话费充值、油卡充值、预约体检、预定酒店或兑换其他商品和服务
      </p>
      <h3>百佳豆冻结状态说明</h3>
      <p class="content">
          犹豫期过后5个工作日内解冻，可正常使用
      </p>
  </section>
</template>

<script>
    export default {
        name: "Describle",
        data(){
            return{

            }
        },
        created(){
            document.title = '百佳豆说明'
        }
    }
</script>

<style scoped lang="scss">
    h3{
        font-size: 32px;
        color: #333;
        font-weight: 600;
        padding: 60px 0 20px 30px;
    }
    .content{
        font-size:28px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: 0.7rem;
        padding:0 30px;
    }
</style>
