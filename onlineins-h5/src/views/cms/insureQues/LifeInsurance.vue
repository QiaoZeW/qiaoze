<template>
    <templete :datas="LifeInsuranceDatas" name="寿险"    :banner="require('@/assets/imgs/insureQues/banner04.png')">
      <div class="slot">
        <link-list :linkData="linkData" />
      </div>
    </templete>
</template>
<script>
import Templete from './Templete'
import LinkList from './LinkList'
import { LifeInsuranceDatas } from './data'

export default {
  name: 'LifeInsurance',
  components: {
    Templete,
    LinkList
  },
  data() {
    return {
      LifeInsuranceDatas: LifeInsuranceDatas,
        name:LifeInsuranceDatas.name,
        list: [
            {
                title: '寿险',
                content: '寿险content'
            }],
      linkData: {
        text: '产品推荐：',
        linkArr: [
          {'link': '/product/Detail.html?product_id=3', 'name': '定惠保旗舰版'}
        ]
      }
    }
  }
}
</script>
