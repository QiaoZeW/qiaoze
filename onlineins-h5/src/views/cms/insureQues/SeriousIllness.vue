<template>
  <div class="wrap">
    <templete :datas="seriousIllnessDatas" name="重疾险" :banner="require('@/assets/imgs/insureQues/banner02.png')" >
      <div class="slot">
        <link-list :linkData="linkData1" />
        <link-list :linkData="linkData2" />
      </div>
    </templete>

  </div>
</template>
<script>
import Templete from './Templete'
import LinkList from './LinkList'
import { seriousIllnessDatas } from './data'
export default {
  name: 'SeriousIllness',
  components: {
    Templete,
    LinkList
  },
  data() {
    return {
      seriousIllnessDatas: seriousIllnessDatas,
      linkData1: {
        text: '产品推荐：',
        linkArr: [
          {'link': '/product/Detail.html?product_id=1', 'name': '康惠保旗舰版'},
          {'link': '/product/Detail.html?product_id=114', 'name': '康惠保尊享版'},
          {'link': '/product/Detail.html?product_id=113', 'name': '加惠保'},
          {'link': '/product/Detail.html?product_id=2', 'name': '童惠保'}
        ]
      },
      linkData2: {
        text: '相关阅读：',
        linkArr: [
          {'link': '/cms/prodStrategy/StrategyDetail.html?detail_id=01', 'name': '同样是重疾险。康惠保旗舰版、康惠保尊享版、加惠 保到底有什么不同？'}
        ]
      }
    }
  }
}
</script>

<style scoped>
  .slot {
    padding-top: 20px;
  }
</style>
