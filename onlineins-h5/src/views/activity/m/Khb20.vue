<template>
    <div class="khb20-wrap">
      <div class="banner">
        <img class="block01" src="@/assets/imgs/activity_m_entrance/khb20/block01.png" alt="">
        <img class="block02" src="@/assets/imgs/activity_m_entrance/khb20/block02.png" alt="">
      </div>

      <div class="content mt-150">
        <img class="title-img title01" src="@/assets/imgs/activity_m_entrance/khb20/title01.png" />
        <div class="content-inner">
          <div class="content01">
            <ul>
              <li v-for="(item, index) in listDatas" :key="index">
                <img :src="item.imgUrl" alt="" />
                <div class="intro">
                  <p class="p0">
                    <span>{{ item.num }}</span>
                    {{ item.text1 }}
                  </p>
                  <p class="p1">{{ item.text2 }}</p>
                </div>
              </li>
            </ul>
            <button class="subbtn" @click="goInsure">立即投保</button>
          </div>
          <div class="content02">
            <p>
              <img class="icon04" src="@/assets/imgs/activity_m_entrance/khb20/icon04.png" alt="">
              <span @click="openFile1">
                 查看体检项目详情>
              </span>
            </p>
            <p>
              <img class="icon05" src="@/assets/imgs/activity_m_entrance/khb20/icon05.png" alt="">
              <span @click="openFile2">
                 查看体检项目覆盖城市>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="content mt36" >
        <img class="title-img title02" src="@/assets/imgs/activity_m_entrance/khb20/title02.png" />
        <div class="reg">
          <p><b>1. 活动时间：</b>2019年11月6日至2019年11月18日</p>
          <p><b>2. 活动产品：</b>本期活动产品为“百年人寿康惠保2020”</p>
          <p><b>3. 活动规则：</b></p>
          <p>a）活动期间内，投保指定产品且订单金额大于等于4500元人民币，同时保障期限为终身的保单；该保单在犹豫期内未发生退保，即可获得免费体检服务一次</p>
          <p>b) 活动期间内，同一被保人的保单只可获得一次体检服务；如同一被保人被多位投保人同时投保，体检服务将由最早的承保保单获得</p>
          <p>c) 体检服务将于活动结束20个自然日后，以短信形式发送给到投保人手机，投保人须点击短信中的领取链接，输入有体检权益的保单号进行领取预约体检</p>
          <p>d) 体检服务链接的有效期为2019年12月1日至2020年11月30日，逾期作废</p>
        </div>
      </div>
      <footer>
        <p>
          活动最终解释权归百年人寿所有
        </p>
      </footer>
    </div>
</template>
<script>
import { Toast } from 'mand-mobile'
export default {
    name: "Khb20",
    data() {
        return {
          secondaryDistributor: 'CPS_00010009',
          thirdClassDistributor: '',
          listDatas: [
            {
              imgUrl: require('@/assets/imgs/activity_m_entrance/khb20/icon01.png'),
              num: '100',
              text1: '种重疾',
              text2: '确诊即赔，前10年150%基本保额'
            },
            {
              imgUrl: require('@/assets/imgs/activity_m_entrance/khb20/icon02.png'),
              num: '20',
              text1: '种轻症',
              text2: '2次赔付，35种轻症，3次赔付'
            },
            {
              imgUrl: require('@/assets/imgs/activity_m_entrance/khb20/icon03.png'),
              num: '',
              text1: '新老客户一样保',
              text2: '符合条件的老客户可投保50万'
            }
          ],
          isBrowser: false,
          shareImage: require('@/assets/imgs/activity_m_entrance/khb20/block02.png')
        }
    },
    created() {
      this.secondaryDistributor = this.$router.query('secondaryDistributor') || 'CPS_00010009' //APP分享
      this.thirdClassDistributor = this.$router.query('thirdClassDistributor') || ''
      this.isBrowser = this.$app.isBrowser()
      if(this.isBrowser) {
        this.secondaryDistributor = ''
        setupWebViewJavascriptBridge((bridge)=> {
            bridge.callHandler('navigationConfig', {
                'flag_show': 1,
                'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                'title': '', //标题
                'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                'share_url': this.$router.siteUrl() + '/activity/m/Khb20.html?secondaryDistributor=CPS_00010009',
                'share_title': '康惠保2020 双11服务升级', //分享标题
                'share_text': '康惠保2020 双11服务升级', //分享描述
                'share_imgurl':this.$router.siteUrl() + this.shareImage //分享图片地址
            }, function (response) {
            })
        })
      } else {
        this.wxshare ()
      }
    },
    mounted() {
    },
    methods: {
      openFile1 () {
          let url = 'https://yxfile.aeonlife.com.cn/doc/2019/11/20191105/1/onlineins/onlineins_1_1_20191105165555039.pdf'
          this.$app.goPdfView(url);
      },
      openFile2 () {
          let url = 'https://yxfile.aeonlife.com.cn/doc/2019/11/20191105/1/onlineins/onlineins_1_1_20191105165142301.pdf'
          this.$app.goPdfView(url);
      },
      wxshare () {
        this.$app.wxShareDetail({
          href: location.href,
          link: this.$router.siteUrl() + '/activity/m/Khb20.html?secondaryDistributor=' + this.secondaryDistributor,
          imgUrl: this.$router.siteUrl() + this.shareImage,
          title: '康惠保2020 双11服务升级',
          desc: '康惠保2020 双11服务升级'
        })
      },
      goInsure () {
        location.href = this.$router.siteUrl() + `/product/Detail.html?product_id=130&secondaryDistributor=${this.secondaryDistributor}&thirdClassDistributor=`
      }
    }
};

</script>
<style lang='scss' scoped>
%blockimg {
  height: 81px;
  position: absolute;
  top: -26px;
  left: 50%;
  -webkit-transform: translateX(-50%);
     -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
       -o-transform: translateX(-50%);
          transform: translateX(-50%);
}
.khb20-wrap {
  padding-top: 50px;
  padding-bottom: 60px;
  background: #F3C78E url('../../../assets/imgs/activity_m_entrance/khb20/bg01.png') top center no-repeat;
  background-size: contain;

  .content {
    width: 692px;
    height: 756px;
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
    &.mt-150 {
      margin-top: -150px;
      background: url('../../../assets/imgs/activity_m_entrance/khb20/outline01.png') top center no-repeat;
      background-size: contain;
    }
    &.mt36 {
      margin-top: 65px;
      height: 900px;
      box-sizing: border-box;
      padding: 92px 50px 35px;
      background: url('../../../assets/imgs/activity_m_entrance/khb20/outline02.png') top center no-repeat;
      background-size: contain;
    }
    .title-img {
      width: 490px;
      &.title02 {
        width: 269px;
      }
      @extend %blockimg
    }
    .reg {
      p {
        color: #545454;
        font-size: 26px;
        line-height: 46px;
      }
    }
    .content-inner {
      width: 100%;
      .content01 {
        box-sizing: border-box;
        padding: 99px 76px 0;
        li {
          margin-bottom: 64px;
          overflow: hidden;
          img {
            width: 76px;
            float: left;
            margin-right: 28px;
          }
          .intro {
            p {
              font-size: 34px;
              color:#545454;
              &.p0 {
                font-weight: bold;
              }
              &.p1 {
                font-size: 28px;
              }
              span {
                color: #FD7E25;
                font-size: 48px;
              }
            }
          }
        }
        .subbtn {
          width: 540px;
          height: 88px;
          line-height: 88px;
          border-radius: 88px;
          background-color: #F86D29;
          font-weight: bold;
          color: #fff;
          font-size: 36px;
          text-align: center;
          box-shadow: 0px 2px 0px 2px #DA5B1D;
          text-shadow: -3px 0px 3px #CF310B;
        }
      }
      .content02 {
        display: flex;
        justift-content: space-between;
        padding: 48px 40px 0;
        p {
          display: flex;
          margin-left: 14px;
          span {
            color: #FD793D;
            margin-left: 8px;
          }
        }
      }
    }
  }

  footer {
    margin-top: 30px;
    p {
      color: #FFF8EE;
      font-size: 22px;
      text-indent: 10%;
    }
  }
  img {
    margin: 0 auto;
    &.block01 {
      width: 570px;
      height: 149px;
      margin-bottom: 30px;
    }
    &.block02 {
      width: 572px;
      height: 601px;
    }
    &.icon04 {
      width: 28px;
      height: 27px;
    }
    &.icon05 {
      width: 32px;
      height: 29px;
      margin-left: 20px;
    }
  }
}

</style>
