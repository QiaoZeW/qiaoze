<template>
  <div class="template">
      <ul>
          <li v-for="(item,index) in datas" :key="index" @click="goDetail(item)">
            <div class="content">
                <h4 v-html="item.title"></h4>
                <img :src="item.minImage" alt="图片未显示">
            </div>
            <div class="footer-bar">
                <div v-if="item.strategyLabel === '1'" class="region red">
                    <img src="@/assets/imgs/prodStrategy/icon_spacial.png" alt="icon_01">
                    <span>专栏</span>
                </div>
                <div v-if="item.strategyLabel === '2'" class="region red">
                    <img src="@/assets/imgs/prodStrategy/icon_good.png" alt="icon_02">
                    <span>推荐</span>
                </div>
                <div class="region">
                  <img src="@/assets/imgs/prodStrategy/icon_look.png" alt="icon_03">
                  <span>{{ item.readFalseNum }}正在围观</span>
                </div>
            </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'Template',
  props: {
    datas: {
      type: Array,
      default: () =>[]
    }
  },
  inject: [ 'changeTabs' ],
  methods: {
    goDetail (item) {
       // 神策埋点
        this.contentTitle = item.title
        localStorage.setItem("shence_view_detail_risk_source","保障攻略");
        localStorage.setItem("shence_view_detail_risk_source_sub",item.title);
        this.loadShenceData()
       // 神策埋点
        if (item.strategyType === '01') {
            this.changeTabs(item.id)
            return false
        }
        location.href = `${item.linkUrl}?article_id=${item.id}`
    },

      loadShenceData() {
         let questionLabel= localStorage.getItem("shence_insurance_tactics_content_click_risk_source");
          let compareLabel= localStorage.getItem("shence_insurance_tactics_content_click_content_type");

          sensors.track("insurance_tactics_content_click", {
              risk_source : questionLabel ,
              content_type: compareLabel ,
              content_title: this.contentTitle
          });
          // console.log(this.contentTitle)
      },
  }
}
</script>
<style lang="scss" scoped>
.template {
  ul {
     li {
        padding:26px 0px 14px;
        border-bottom: 1px solid #f6f6f6;
        margin: 0 20px;
        .content {
           display: flex;
           justify-content: space-between;
           align-items: center;
           h4 {
              font-size: 28px;
              color: #333;
              font-weight: bold;
              width: 448px;
              line-height: 40px;
           }
           img {
              width: 168px;
              height: 128px;
              border-radius: 8px;
           }
        }
        .footer-bar {
            margin-top: 12px;
            font-size: 20px;
            color: #8e8e8e;
            display: flex;
            .region {
               display: flex;
               margin-right: 20px;

               &.red {
                  color: #E10312;
                  img {
                    height: 22px;
                  }
               }
               img {
                  width: 26px;
                  height: 18px;
                  margin-right: 5px;
               }
            }
        }
     }
  }
}
</style>
