<template>
    <div class="mar-wrap">
      <div class="lover">
        <div class="banner">
          <img src="@/assets/imgs/lover/mar/banner01.png" alt="">
          <img src="@/assets/imgs/lover/mar/banner02.png" alt="">
        </div>
        <div class="region">
          <div class="region-inner">
              <div class="gift">
                <div class="p1">活动期间：2020年3月1日 - 3月31日</div>
                <div class="p2">
                    成功投保以下指定产品<br>即可获得口腔健康服务一份
                </div>
                <div class="p3">（同一被保险人仅可获得一份）</div>
                <img src="@/assets/imgs/lover/mar/gift.png" alt="">
                <div class="p4">*图片仅为展示，以实际接收到的服务为准</div>
              </div>
              <ul v-if="prodlist.length > 0" class="prod">
                <li v-for="item in prodlist" :key="item.id">
                  <div v-if="item.isShow">
                    <img :src="item.imgUrl" alt="">
                    <div class="intro" :class="{'mt': item.isCbbintro}">
                      <div class="p1">{{ item.p1 }}</div>
                      <div class="p2">{{ item.p2 }}</div>
                      <div class="p3">{{ item.p3 }}</div>
                    </div>
                    <div class="desc">
                      <div class="left">
                        <p>
                          <span>价格：￥</span>
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
          </div>
        </div>

        <div class="rules">
          <div class="rules-inner">
            <div class="alltext">
                <p class="title">一、活动时间：</p>
                <p>投保人在2020年3月1日至2020年3月31日完成指定产品的投保，即有机会获得口腔健康服务一次。</p>

                <p class="title">二、本次活动产品：</p>
                <p>百年人寿康惠保2020（保障期限至终身）百年人寿超倍保（保障期限至终身）</p>

                <p class="title">三、口腔健康服务说明：</p>
                <p>国内知名机构尊享口腔健康服务套餐。口腔健康服务将在2020年3月31日前完成发放，请关注百年人寿发送的手机短信以免错过领取信息。如用户投保后20天内发生退保，则退保保单所对应的口腔健康服务将不再进行发放。</p>

                <p class="title">四、活动期间，同一设备、手机号、身份信息注册的不同账号，视为同一账号。符合条件的保单中，同一被保人仅可享受口腔健康服务一次，不可重复累计获得。</p>

                <p class="title">五、活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实施网络攻击等）参与本次活动的用户，百年人寿保险公司有权终止其参与活动并回收所有奖品。</p>

                <p class="title">六、如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，百年人寿可立即暂停、中止或终止活动。</p>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    export default {
        name: "Lover",
        data () {
            return {
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
                imgUrl: require('@/assets/imgs/lover/mar/kanghuibao.png'),
                price: '257',
                isShow: this.showKHB,
                prodUrl: 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=130',
                id: '130',
                p1: '康惠保重疾险（2020版）',
                p2: '重疾超级魔方 责任组合DIY',
                p3: '需保障至终身'
              },
              {
                imgUrl: require('@/assets/imgs/lover/mar/chaobeibao.png'),
                price: '337',
                isShow: this.showCBB,
                prodUrl: 'https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=128',
                id: '128',
                isCbbintro: true,
                p1: '超倍保重疾险',
                p2: '多次赔付 超倍保护',
                p3: '需保障至终身'
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
.mar-wrap {
  background-color: #FFD6C9;
  padding-bottom: 90px;
  min-height: 100%;

  .lover {
    width: 750px;
    margin: 0 auto;
    .region {
      margin-top: -20%;
      position: relative;
      padding-top: 297px;
      background: url('~@/assets/imgs/lover/mar/bg01_head.png') top right no-repeat;
      background-size: 96%;
      .region-inner {
        background: url('~@/assets/imgs/lover/mar/bg01.png') bottom right no-repeat;
        background-size: 96%;
        padding-bottom: 110px;

        .gift {
          width: 560px;
          border-radius: 20px;
          background-color: #FFD5C9;
          margin: 0 auto;
          padding: 42px;
          box-sizing: border-box;
          text-align: center;

          .p1 {
            font-size: 29px;
            color: #CD5262;
            margin-bottom: 40px;
            font-weight: bold;
          }

          .p2 {
            color: #2A1B17;
            font-size: 36px;
            font-weight: bold;
            line-height: 60px;
            margin-bottom: 20px;
          }

          .p3 {
            font-size: 24px;
            color: #271A13;
            margin-bottom: 50px;
          }

          .p4 {
            font-size: 18px;
            color: #A59B8E;
            margin-top: 14px;
          }

          img {
            width: 556px;
            height: 320px;
            margin: 0 auto;
          }
        }

        .prod {
          width: 534px;
          margin: 0 auto;

          li {
              margin-top: 60px;
              img {
                width: 482px;
                margin: 0 auto;
              }
              .intro {
                width: 534px;
                box-sizing: border-box;
                padding: 34px 20px 24px;
                background-color: #FFD5C9;
                margin: 0 auto;
                text-align: center;
                box-sizing: border-box;
                border-radius: 12px;
                position: relative;
                margin-top: -23px;
                &.mt {
                  margin-top: -44px;
                }

                .p1 {
                  font-size: 43px;
                  color: #CA5264;
                  font-weight: bold;
                }

                .p2,
                .p3 {
                  font-size: 30px;
                  color: #56423D;
                  margin-top: 20px;
                }
              }
              .desc {
                display: flex;
                justify-content: space-between;
                margin-top: 23px;
                p {
                  font-size: 28px;
                  color: #FED2C5;
                  .price {
                    font-size: 50px;
                    font-weight: bold;
                    margin-left: -10px;
                  }
                }
                a {
                  background: #70D8DB;
                  color: #fff;
                  display: block;
                  text-align: center;
                  font-size: 36px;
                  height: 68px;
                  line-height: 68px;
                  border-radius: 68px;
                  min-width: 210px;
                  font-weight: bold;
                }
              }
          }
        }
      }
    }

    .rules {
      padding-top: 250px;
      margin-top: 23px;
      background: url('~@/assets/imgs/lover/mar/bg02_head.png') left top no-repeat;
      background-size: 96%;
      padding-top: 256px;
      box-sizing: border-box;
      // height: 1599px;

      .rules-inner {
          background: url('~@/assets/imgs/lover/mar/bg02.png') left bottom no-repeat;
          background-size: 96%;
          padding-bottom: 110px;
      }

      .alltext {
          width: 554px;
          margin: 0 auto;
          p {
            font-size: 30px;
            line-height: 40px;
            color: #FFBBC3;

            &.title {
              margin-top: 20px;
            }
          }
          .hide {
            text-align: center;
            margin-top: 30px;
            a {
              color: #C40000;
            }
          }
      }
    }
  }
}
</style>
