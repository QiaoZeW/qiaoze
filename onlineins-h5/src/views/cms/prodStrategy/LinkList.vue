<template>
  <ul class="link-list">
    <li v-for="(itemlink,index) in linkData"
        :key="index">
      <a :class="{'first': index === 0, 'em5': em5, 'em6': em6}" :href="itemlink.href">
          {{ itemlink.text }}
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'LinkList',
  props: {
    linkData: {
      type: Array,
      default: () => []
    },
    em5: {
      type: Boolean,
      default: false
    },
    em6: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    goNext(href) {
      location.href = href
    }
  }
}
</script>
<style lang="scss" scoped>
.link-list {
  li {
    margin: 40px 0;

    a {
      margin-left: 4em;
      color: #0170F5;
      font-size: 32px;
      text-decoration: underline;
      &.em5 {
        margin-left: 5em;
      }
      &.em6 {
        margin-left: 6em;
      }
      &.first {
        margin-left: 0px;
      }
    }
  }
}
</style>
