<template>
  <div class="md-example-popup md-example-popup-bottom">
      <div class="contentS">
          <div class="agreement" v-if="agreementShow">
            <h2>联系方式变更授权条款</h2>
            <p>
                为提供保险服务的需要，本人授权：<br/>
                1. 贵公司可通过知悉本人信息的机构查询与本人有关的全部信息（包括但不限于投保、承保、理赔、保金、医疗信息等）。<br/>
                2. 贵公司及与其具有必要合作关系的机构均可对上述信息进行合理的使用。为确保信息安全，贵公司及其合作机构应采取有效措施并承担保密义务。<br/>
            </p>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Agreement',
    props: {
      agreementShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style lang='scss' scoped>
    .contentS{
        h2{
            text-align: center;
            font-weight: bold;
        }
        p{
            margin: 40px 0 30px;
            font-size: 28px;
            color: #666;
            line-height: .6rem;
        }
    }
</style>
