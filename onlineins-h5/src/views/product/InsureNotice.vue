<template>
  <div>
      <whirl v-if="showWhirl"></whirl>
      <error v-if="showError"></error>
      <div class="content" v-for="(item,index) in detailList">
          <md-cell-item :title="item.noticeTitle" arrow @click="goDetail(index)"  />
      </div>
  </div>
</template>

<script>
    import {Field, CellItem, Dialog, Icon} from 'mand-mobile'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    export default {
        name: "insureNotice",
        components: {
            [Field.name]: Field,
            [CellItem.name]: CellItem,
            [Icon.name]: Icon,
            Whirl,
            Error
        },
        data(){
          return{
              detailList:[],
              showError: false,
              showWhirl: false,
              product_id:''
          }
        },
        created(){

            this.product_id = this.$router.query('product_id')
            this.$app.wxProductDetail(this.product_id, 1)
            this.showWhirl = true
          this.loadInsureNotice()
        },
        methods:{
            loadInsureNotice(){
                this.$request({
                    url: `/ins/product/insProductNotice/${this.product_id}`,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.showWhirl = false
                        this.detailList = data
                    },
                    failFn: (data) => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            goDetail(index){
                window.location.href = this.$router.siteUrl() + '/product/NoticeDetail.html?detail_id=' + index
            }
        }
    }
</script>

<style scoped lang="scss">
.content{
    width: 94%;
    margin-left: 3%;
}
</style>
