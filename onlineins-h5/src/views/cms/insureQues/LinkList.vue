<template>
  <div class="link-list">
    <div class="left">{{ linkData.text }}</div>
    <div class="right">
      <ul>
          <li v-for="item in linkData.linkArr">
            <a :href="item.link" v-if="linkData.text === '相关阅读：'" @click="relevantReading">{{ item.name }}</a>
            <a :href="item.link" v-else>{{ item.name }}</a>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinkList',
  props: {
    linkData: {
      type: Object,
      default: () => {}
    }
  },
  created () {
  },
  methods: {
      relevantReading(){
          sensors.track("related_article_click", {});
          console.log('相关阅读，触发该方法')
      }
  }
}
</script>
<style lang="scss" scoped>
.link-list {
  display: flex;
  font-size: 24px;
  color: #333;
  margin: 30px 0;
  .left {
    margin-right: 20px;
    white-space: nowrap;
    line-height: 40px;
  }
  .right {
    ul {
      display: flex;
      li {
        margin-right: 20px;
        line-height: 40px;
        a {
          color: #487FEF;
        }
      }
    }
  }
}
</style>
