<template>
    <div class="feb-wrap">
      <div class="lover">
        <div class="banner">
          <img src="@/assets/imgs/lover/banner01.png" alt="">
          <img src="@/assets/imgs/lover/banner02.png" alt="">
        </div>
        <div class="section-title">
          <h3>
            <img class="icon01" src="@/assets/imgs/lover/icon01.png" alt="">
            活动期间
            <img class="icon01" src="@/assets/imgs/lover/icon01.png" alt="">
          </h3>
          <div class="line"></div>
          <p class="p1">成功投保以下指定保险产品<br>即可获得口腔健康套餐一份</p>
          <p class="p2">（同一被保险人仅可获得一份）</p>
        </div>
        <ul v-if="prodlist.length > 0" class="prod">
          <li v-for="item in prodlist" :key="item.id">
            <div v-if="item.isShow">
              <img :src="item.imgUrl" alt="">
              <div class="desc">
                <div class="left">
                  <p>
                    <span>价格：</span>
                    <span class="price">{{ item.price }}</span>
                    <span class="date">元/年 起</span>
                  </p>
                </div>
                <div class="right">
                  <a href="javascript:;" @click="goDetail(item)">立即购买</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="section-title">
          <h3>
            <img class="icon01" src="@/assets/imgs/lover/icon01.png" alt="">
            活动规则
            <img class="icon01" src="@/assets/imgs/lover/icon01.png" alt="">
          </h3>
        </div>

        <div class="rules">
          <div class="text" v-show="!isShowAll">
            <p class="bold">一、活动时间：</p>
            <p>投保人在2020年2月1日至2020年2月29日完成指定产品的投保，即有机会获得口腔健康服务一次。</p>
            <p class="bold">二、本次活动产品：</p>
            <p>百年人寿康惠保2020 （保障期限至终身）、百年人寿超倍保（保障期限至终身）。</p>
            <p class="bold">三、活动规则：</p>
          </div>
          <div class="alltext" v-show="isShowAll">
            <p class="bold">一、活动时间：</p>
            <p>投保人在2020年2月1日至2020年2月29日完成指定产品的投保，即有机会获得口腔健康服务一次。</p>
            <p class="bold">二、本次活动产品：</p>
            <p>百年人寿康惠保2020 （保障期限至终身）、百年人寿超倍保（保障期限至终身）。</p>
            <p class="bold">三、活动规则：</p>
            <p>投保人需在活动期间内成功投保本次活动产品即可获得一次口腔健康服务。</p>
            <p class="bold">四、口腔健康服务说明：</p>
            <p>国内知名机构尊享口腔健康服务套餐。口腔健康服务将在2020年3月31日前完成发放，请关注百年人寿发送的手机短信以免错过领取信息。如用户投保后20天内发生退保，则退保保单所对应的口腔健康服务将不再进行发放。</p>
            <p><span class="bold">五、</span>活动期间，同一设备、手机号、身份信息注册的不同账号，视为同一账号。符合条件的保单中，同一被保人仅可享受口腔健康服务一次，不可重复累计获得。</p>
            <p><span class="bold">六、</span>活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实施网络攻击等）参与本次活动的用户，百年人寿保险公司有权终止其参与活动并回收所有奖品。</p>
            <p><span class="bold">七、</span>如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，百年人寿可立即暂停、中止或终止活动。</p>
          </div>
          <div class="hide" @click="isShowAll = !isShowAll">
            <a v-show="!isShowAll" href="javascript:;">展开 <md-icon name="arrow-down" size="sm" /></a>
            <a v-show="isShowAll" href="javascript:;">收起 <md-icon name="arrow-up" size="sm" /></a>
          </div>
        </div>
        <p class="tip">
          *活动最终解释权归百年人寿所有
        </p>

      </div>
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "Lover",
        data () {
            return {
              isShowAll: false,
              secondaryDistributor: '',
              showKHB: false, // 康惠保2020
              showCBB: false, // 超倍保
              prodlist: [],
              thirdClassDistributor:'',
              isNew: '0',
            }
        },
        created() {
          this.init()
        },
        mounted () {
        },
        methods: {
          init () {
            this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'CPS_00010009'
            this.thirdClassDistributor = this.$router.query("thirdClassDistributor") || '';
            this.getProdList()
          },
          getProdList () {
            this.isNew = this.$router.query("isNew")
            if(this.isNew === '1'){   //只有一个康惠保 2020
                this.showKHB = true
            }else if(this.isNew === '2'){  //只有一个超倍保
                this.showCBB = true
            }else{   //俩个产品
                this.showKHB = true
                this.showCBB = true
            }
            this.prodlist = [
              {
                imgUrl: require('@/assets/imgs/lover/kanghuibao.png'),
                price: '257',
                isShow: this.showKHB,
                prodUrl: 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=130',
                id: '130'
              },
              {
                imgUrl: require('@/assets/imgs/lover/chaobeibao.png'),
                price: '337',
                isShow: this.showCBB,
                prodUrl: 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=128',
                id: '128'
              }
            ]
          },
          goDetail(item) {
             location.href = item.prodUrl + '&secondaryDistributor=' + this.secondaryDistributor + '&thirdClassDistributor=' + this.thirdClassDistributor
          }
        }
    };
</script>

<style lang='scss' scoped>
.feb-wrap {
  background-color: #D5322B;
  padding-bottom: 90px;
  min-height: 100%;

  .lover {
    width: 750px;
    margin: 0 auto;
    .section-title {
      color: #FFF7E1;
      border-top: 0.02667rem solid #FACC91;
      border-bottom: 0.02667rem solid #FACC91;
      padding: 30px 0;
      background-color: #EA3C3E;
      h3 {
        font-size: 36px;
        text-align: center;
        color: #FFE5B7;
        display: flex;
        justify-content: center;
        .icon01 {
          width: 40px;
          height: 40px;
          margin: 0 20px;
        }
      }
      .line {
        background: url('~@/assets/imgs/lover/dashed.png') top center no-repeat;
        height: 1px;
        width: 367px;
        margin: 26px auto 0;
        background-size: 100%;
      }
      .p1 {
        margin-top: 30px;
        font-size: 34px;
        line-height: 46px;
        text-align: center;
        margin-bottom: 30px;
      }
      .p2 {
        font-size: 20px;
        color: #F9DFB2;
        text-align: center;
      }
    }

    .prod {
      padding: 26px 0;

      .desc {
        display: flex;
        justify-content: space-between;
        padding: 20px 60px 40px;
        p {
          font-size: 32px;
          color: #FFF7E1;
          .price {
            font-size: 60px;
            font-weight: bold;
            margin-left: -10px;
          }
          .date {
            font-size: 38px;
          }
        }
        a {
          background: linear-gradient(to bottom, #FCF2D8, #FCCB99);
          color: #931314;
          display: block;
          text-align: center;
          font-size: 32px;
          height: 60px;
          line-height: 60px;
          border-radius: 60px;
          min-width: 223px;
          margin-top: 14px;
          font-weight: bold;
        }
      }
    }

    .rules {
      width: 692px;
      margin: 38px auto;
      padding: 42px 34px 60px;
      background-color: #FEF7E4;
      border-radius: 12px;
      box-sizing: border-box;
      box-shadow: 0px 0px 10px 10px rgba(213,50,43, .6) inset;
      p {
        font-size: 26px;
        line-height: 46px;
      }
      .bold {
        font-weight: bold;
        font-size: 30px;
      }
      .hide {
        text-align: center;
        margin-top: 30px;
        a {
          color: #C40000;
        }
      }
    }

    .tip {
      font-size: 22px;
      color: #FFFFFF;
      margin-left: 40px;
    }

    
  }
}
</style>
