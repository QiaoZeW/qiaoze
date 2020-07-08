<template>
  <div class="empty-notice-detail">
    <div class="name">{{ name }}</div>
    <div class="description">
      {{ description }}
      <a v-if="linkUrl" :href="linkUrl">查看详情>></a>
    </div>
    <div v-if="createTime" class="createTime">{{ createTime | transDate }}</div>
  </div>
</template>
<script>
export default {
  name: 'EmptyNoticeDetail',
  data () {
    return {
      id: '',
      createTime: '',
      name: '',
      description: '',
      linkUrl: ''
    }
  },
  created () {
    this.id = this.$router.query('id') || '1'
    this.getDatas()
  },
  methods: {
    getDatas () {
        this.$app.getToken((userToken) => {
            this.$request({
                url: `/cms/notice/getCmsNoticeById/${this.id}`,
                isLoading: true,
                userToken: userToken,
                contentType: 'application/json',
                successFn: data => {
                  if (data) {
                     const { name, createTime, description, linkUrl } = data
                     this.name= name
                     this.createTime = createTime
                     this.description = description
                     this.linkUrl = linkUrl
                  }
                },
                failFn: data => {}
            })
        })
    }
  },
  filters: {
    transDate (v) {
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      let date = new Date(v)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
      }
      return fmt
    }
  }
}
</script>
<style lang="scss"
       scoped>
.empty-notice-detail {
   padding: 30px;
   .name {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
   }
   .description {
      text-indent: 2em;
      font-size: 28px;
      margin: 30px 0;
      overflow: hidden;
      a {
         color: #2668FB;
      }
   }
   .createTime {
      text-align: right;
      font-size: 28px;
      margin: 30px 0;
   }

}
</style>
