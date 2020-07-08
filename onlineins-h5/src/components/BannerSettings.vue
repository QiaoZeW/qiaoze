<template>
    <div class="banner-settings">
      <a :href="linkUrl">
        <img v-if="showBanner" :src="imageUrl" alt="">
      </a>
    </div>
</template>

<script>

export default {
    name: 'BannerSettings',
    props: {
        propImgs: {
            type: String,
            default: require('@/assets/imgs/invitaion/tit2.png')
        },
        moduleType: {
          type: String,
          default: '15'
        },
        showBanner: {
          type: Boolean,
          default: true
        }
    },
    data () {
        return {
          imageUrl: '',
          linkUrl: '',
          cpsCode: ''
        }
    },
    created () {
        this.cpsCode = this.$router.query('secondaryDistributor') || 'APP_00010001'
        this.getBannerImage()
    },
    methods: {
        getBannerImage () {
            this.$request({
                url: `/cms/content/image?moduleType=${this.moduleType}`,
                successFn: data => {
                    if (this.showBanner) {
                      this.imageUrl = data[0].imageUrl || ''
                      this.linkUrl = data[0].linkUrl + '?secondaryDistributor=' + this.cpsCode
                    }
                    this.$emit('getImageData', data)
                },
                failFn: data => {}
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.banner-settings {
  margin: 30px auto;
  border-radius: 12px;
  overflow: hidden;
}
</style>
