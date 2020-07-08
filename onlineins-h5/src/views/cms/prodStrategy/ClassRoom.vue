<template>
  <div class="class">
    <Templete :datas="classDatas" />
  </div>
</template>
<script>
import Templete from '@/views/cms/prodStrategy/Templete'
// import { classDatas } from '@/views/cms/prodStrategy/data'
export default {
  name: 'Compare',
  components: {
    Templete
  },
  data () {
    return {
      classDatas: []
    }
  },
  props: {
    allDatas: {
       type: Array,
       default: () => []
    }
  },
  created () {
    if (this.allDatas.length > 0) {
        this.classDatas = this.allDatas.filter((item) => item.strategyType === '04')
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.class {
}
</style>
