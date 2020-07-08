<template>
    <div class="detail">
        <div class="nav">
           <ul class="nav-list">
               <li :class="{'active': index===1}"><a href="#block1">产品特色</a></li>
               <li :class="{'active': index===2}"><a href="#block2">理赔流程</a></li>
               <li :class="{'active': index===3}"><a href="#block3">常见问题</a></li>
           </ul>
        </div>
        <div class="inner">
            <div class="block" id="block1">
                <div class="block-title">
                  <h3 class="bold">产品特色</h3>
                  <div class="line"></div>
                </div>
                <img v-for="item in renderData" :src="item" alt="">
            </div>
            <div class="block" id="block2">
              <div class="block-title">
                  <h3 class="bold">理赔流程</h3>
                  <div class="line"></div>
              </div>
              <div class="claims">
                <ul>
                    <li v-for="item in claimsDatas" :key="item.id">
                      <img class="left" :src="item.imgUrl" alt="" width="83" height="83" />
                      <div class="right">
                        <p class="title">{{ item.title }}</p>
                        <p class="p2" v-html="item.p2"></p>
                      </div>
                    </li>
                </ul>
              </div>

            </div>
            <div class="block" id="block3">
              <div class="block-title">
                  <h3 class="bold">常见问题</h3>
                  <div class="line"></div>
              </div>
              <div class="question">
                <ul>
                    <li v-for="(item, index) in questionsDatas" :key="index">
                      <p class="p1">
                        <span class="symbol">?</span>
                        <span class="block">{{ item.ask }}</span>
                      </p>
                      <p class="p2">
                        {{ item.ans }}
                      </p>
                    </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    import proDetailData from './proDetailData'
    import allQuestionsDatas from './questionsDatas'
    export default {
        name: "Detail",
        data () {
            return {
                product_id: '',
                proDetailData: proDetailData,
                renderData: [],
                index: 1,
                claimsDatas: [
                  {
                    id: 1,
                    title: '1.报案',
                    p2: `拨打客服电话：<span style="color:#910E0E;">0411-95542</span>进行报案`,
                    imgUrl: require('@/assets/imgs/activity_pc/pc_detail/icon01.png')
                  },
                  {
                    id: 2,
                    title: '2.准备资料',
                    p2: '专业理赔人员会远程协助您整理好理赔资料',
                    imgUrl: require('@/assets/imgs/activity_pc/pc_detail/icon02.png')
                  },
                  {
                    id: 3,
                    title: '3.保险公司核准',
                    p2: '将准备好的保险资料寄送至保险公司',
                    imgUrl: require('@/assets/imgs/activity_pc/pc_detail/icon03.png')
                  },
                  {
                    id: 4,
                    title: '4.领取理赔金',
                    p2: '保险公司会将理赔金给付至指定账户',
                    imgUrl: require('@/assets/imgs/activity_pc/pc_detail/icon04.png')
                  }
                ],
                allQuestionsDatas: allQuestionsDatas,
                questionsDatas: []
            }
        },
        created() {
            this.product_id = this.$router.query('product_id') || ''
            this.renderData = this.proDetailData[this.product_id].map(item => require(`@/assets/imgs/activity_pc/pc_detail/${this.product_id}/${item}.png`))
            this.questionsDatas = this.allQuestionsDatas[this.product_id]
        },
        methods: {
        }
    };
</script>

<style lang='scss' scoped>
.detail {
    .red {
      color: #910E0E;
    }
    .bold {
      font-weight: bold;
    }
    background-color: #F5F5F5;
    padding-bottom: 60PX;
    .nav {
        background-color: #fff;
        .nav-list {
            width: 480PX;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
            li {
                padding: 30PX 30PX;
                font-size: 24PX;
                color: #747474;
                a {
                    color: #747474;
                }
                &.active {
                    a {
                        border-bottom: 2PX solid #D6000E;
                        padding: 30PX 0;
                        color: #000;
                    }
                }
            }
        }
    }
    .inner {
        width: 990PX;
        margin: 60PX auto 0;

        .block-title {
          width: 400PX;
          margin:60PX auto;
          h3 {
            text-align: center;
            font-size: 30PX;
            color: #000;
            width: 220px;
            margin: 0 auto;
            background-color: #F5F5F5;
            position: relative;
          }
          .line {
            border-top: 2PX solid #333;
            margin-top: -20PX;
          }
        }
        .claims {
          margin-left: 180PX;
          ul {
            li {
              display: flex;
              margin: 30PX auto;
              img.left {
                margin-right: 34PX;
              }
              .right {
                color: #000;
                .title {
                  font-size: 30PX;
                  margin-bottom: 17PX;
                }
                .p2 {
                  font-size: 26PX;
                }
              }
            }
          }
        }
        .question {
          margin-left: 180PX;
          li {
            p {
              font-size: 26PX;
              &.p1 {
                color: #000;
                margin-bottom: 16PX;
                position: relative;
                .symbol {
                  position: absolute;
                  width: 34PX;
                  height: 34PX;
                  line-height: 34PX;
                  border-radius: 50%;
                  background-color: #910E0E;
                  text-align: center;
                  color: #fff;
                  left: -10PX;
                }
                .block {
                  display: inline-block;
                  margin-left: 40PX;
                }
              }
              &.p2 {
                color: #999;
                margin-left: 40PX;
                line-height: 44PX;
                margin-bottom: 30PX;
              }
            }
          }
        }
    }
}
</style>

