<template>
  <div class="md-example-popup md-example-popup-bottom" style="position: relative;border-radius:10px 10px 0px 0px;">
      <img class="cancelLogo" src="../../assets/imgs/kanghuibao/x.png" @click="cancelFunc"/>
      <div class="contentS">
          <div>
            <h2>产品说明</h2>
            <p>
                保险期间1年，免赔额0元，年限额100万，保障范围内赔付比例100%（医保目录内药品，有社保未使用社保报销的，赔付比例60%）。确诊初次患恶性肿瘤，保障确诊后1年内用于治疗该恶性肿瘤且满足条款所载明条件的特定药品。<br/>（适用条款《百年药惠通特种药品费用医疗保险条款》）<br/>特别服务：新增【新冠肺炎危重型10万康复津贴】服务。详见保障责任中服务手册。
            </p>
            <h2>赠送说明</h2>
            <p>
                本赠送产品《百年药惠通特种药品费用医疗保险》仅限活动期内对成功投保《百年超惠保重大疾病保险（康惠保2020）》或《百年超倍保重大疾病保险》的同一被保险人同时予以赠送，如被保险人已投保《百年药惠通特种药品费用医疗保险》或已领取过同一赠险产品，则不再赠送。（本产品不得重复投保）仅标体可领取。
            </p>
            <h2>保单形式</h2>
            <p>
                我们为您提供电子保单，根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式，电子保单和纸质保单具有同等法律效力。保单承保后，您可以通过“百年人寿APP”查询您的电子保单。请您查阅电子保单时仔细阅读关于“责任免除”的相关条款。
            </p>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Shuoming',
    props: {
      shuomingShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
        }
    },

    mounted () {
    },
    destroyed() {
    },
    methods: {
        cancelFunc(){
            this.$emit("cancelShuoming",false)
        },
    }
}
</script>

<style lang='scss' scoped>
    .contentS{
        background: #FFF;
        h2{
            text-align: left;
            text-indent: 30px;
            font-weight: bold;
            margin: 60px auto 28px;
            font-size: 40px;
            color: #333;
        }
        h2:first-child{
            margin-top: 0px;
        }
        p{
            padding: 28px 30px;
            font-size: 28px;
            color: #666;
            line-height: .6rem;
            background:rgba(245,245,246,1);
            border-radius: 12px;
            text-align: justify;
        }
    }
    .cancelLogo{
        position: absolute;
        width: 44px;
        height: 44px;
        top: 30px;
        right: 38px;
    }
</style>
<style>
    .md-example-popup-bottom{
        padding-top: 48px!important;
        padding-left:20px!important;
        padding-right:20px!important;
    }
    .shuomingPopup .md-popup-box {
        border-radius: 20px 20px 0 0!important;
        background: #fff;
        height: 95%;
    }
    .shuomingPopup {
        z-index: 1001;
    }
</style>
