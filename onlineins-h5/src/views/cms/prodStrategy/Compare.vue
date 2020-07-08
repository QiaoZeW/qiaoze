<template>
  <div class="compare">
    <Templete :datas="compareDatas" />
    <Templete :datas="planDatas" />
  </div>
</template>
<script>
import Templete from '@/views/cms/prodStrategy/Templete'
// import { compareDatas, planDatas } from '@/views/cms/prodStrategy/data'
export default {
  name: 'Compare',
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
      planDatas: []
    }
  },
  created () {
    if (this.allDatas.length > 0) {
        this.compareDatas = this.allDatas.filter((item) => item.strategyType === '02')
        this.planDatas = this.allDatas.filter((item) => item.strategyType === '03')
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.compare {
}
</style>
