<template>
    <Templete :datas="MedicalCareDatas" name="医疗险" :banner="require('@/assets/imgs/insureQues/banner03.png')">
      <div class="slot">
        <link-list :linkData="linkData" />
      </div>
    </templete>
</template>
<script>
import Templete from './Templete'
import LinkList from './LinkList'
import { MedicalCareDatas } from './data'

export default {
  name: 'MedicalCare',
  components: {
    Templete,
    LinkList
  },
  data() {
    return {
      MedicalCareDatas: MedicalCareDatas,
      linkData: {
        text: '产品推荐：',
        linkArr: [
          {'link': '/product/Detail.html?product_id=123', 'name': '医惠通'},
          {'link': '/product/Detail.html?product_id=124', 'name': '医无忧'}
        ]
      }
    }
  }
}
</script>
