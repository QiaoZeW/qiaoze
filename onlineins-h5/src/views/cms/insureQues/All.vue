<template>
    <div>
      <Templete :datas="allDatas" name="全部" :isShow="false" />
      <Templete :datas="seriousIllnessDatas" name="重疾险" :banner="require('@/assets/imgs/insureQues/banner02.png')" />
      <Templete :datas="MedicalCareDatas" name="医疗险" :banner="require('@/assets/imgs/insureQues/banner03.png')" />
      <Templete :datas="LifeInsuranceDatas" name="寿险" :banner="require('@/assets/imgs/insureQues/banner04.png')" />
    </div>
</template>
<script>
import Templete from './Templete'
import { allDatas, LifeInsuranceDatas, MedicalCareDatas, seriousIllnessDatas } from './data'

export default {
  name: 'LifeInsurance',
  components: {
    Templete
  },
  data() {
    return {
      allDatas: allDatas,
      LifeInsuranceDatas: LifeInsuranceDatas,
      MedicalCareDatas: MedicalCareDatas,
      seriousIllnessDatas: seriousIllnessDatas
    }
  }
}
</script>
