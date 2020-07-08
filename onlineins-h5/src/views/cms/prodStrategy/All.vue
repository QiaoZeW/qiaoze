<template>
  <div class="all">
    <Templete :datas="InsureQuestionsData" />
    <Templete :datas="compareDatas" />
    <Templete :datas="planDatas" />
    <Templete :datas="classDatas" />
  </div>
</template>
<script>
import Templete from '@/views/cms/prodStrategy/Templete'
// import { InsureQuestionsData } from '@/views/cms/prodStrategy/data'
export default {
  name: 'All',
  components: {
    Templete
  },
  props: {
    allDatas: {
       type: Array,
       default: () => []
    }
  },
  data () {
    return {
      compareDatas: [],
      planDatas: [],
      InsureQuestionsData: []
    }
  },
  created () {
    if (this.allDatas.length > 0) {
        this.InsureQuestionsData = this.allDatas.filter((item) => item.strategyType === '01')
        this.compareDatas = this.allDatas.filter((item) => item.strategyType === '02')
        this.planDatas = this.allDatas.filter((item) => item.strategyType === '03')
        this.classDatas = this.allDatas.filter((item) => item.strategyType === '04')
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.all {
}
</style>
