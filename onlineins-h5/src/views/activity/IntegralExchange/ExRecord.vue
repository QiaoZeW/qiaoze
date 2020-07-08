<template>
    <div class="section exrecord-wrap">
        <div v-if="exchangeRecordShowList.length > 0" class="recordList">
          <div class="item" v-for="item in exchangeRecordShowList" :key="item.ticketNo">
            <div class="top">
              <img :src="item.minImage" alt="">
              <div class="right">
                <!-- 需要写收货地址的样式 -->
                <div v-if="item.isSend == 1" class="has-detail">
                  <h3>{{ item.name }}</h3>
                  <div v-if="!item.address" class="adddetail">
                    <button @click="addDetail(item)">添加收货地址</button>
                  </div>
                  <div v-else class="showdetail">
                    <h3>
                      <span class="detail">收货地址</span>
                      {{ item.receiverName }} {{ item.receiverMobile}}
                    </h3>
                    <p @click="item.isClick = !item.isClick" v-show="item.isClick">
                      {{ item.area + item.address }}
                      <a href="javascript:;">收起<md-icon name="arrow-up" size="sm" /></a>
                    </p>
                    <p @click="item.isClick = !item.isClick" v-show="!item.isClick">
                      {{ item.area + item.address | elipsis}}
                      <a v-if="(item.area + item.address).length>20" href="javascript:;">展开<md-icon name="arrow-down" size="sm" /></a>
                    </p>
                  </div>
                </div>
                <!-- 不需要写收货地址的样式 -->
                <div v-else>
                  <h3>{{ item.name }}</h3>
                  <p class="p1">券号： {{ item.ticketNo }}</p>
                  <p class="p2">密码： {{ item.ticketPassword }}</p>
                </div>
                <p class="p3">兑换时间： {{ item.exchangeTime | transDate }}</p>
                <!-- 已生效和未生效的样式 -->
                <button class="wait" :class="{'valid': item.ticketStatus == 1}">{{ item.ticketStatus | ticketStatusText}}</button>
                <!-- 已生效并且不是填写地址item显示电话预约 -->
                <a class="tele" v-if="item.ticketStatus == 1 && item.isSend != 1 && item.showType == 1" href="tel:4008801900">电话预约</a>
                <a class="gomeinian" v-if="item.ticketStatus == 1 && item.isSend != 1 && item.showType == 2" :href="meinianUrl">立即预约</a>
              </div>
            </div>
            <!-- 需要填写收货地址的信息展示 -->
            <div v-if="item.isSend == 1"  class="bottom">
              <p>1.预计2020年2月20日后，开始寄送口腔护理套餐</p>
              <p>2.请认准填写收货地址并保持电话畅通</p>
              <p>3.该服务有效期为一年，过期将视为放弃</p>
            </div>
            <!-- 非填写收货地址的信息展示 -->
            <div v-else class="bottom">
              <!-- 瑞尔口腔服务 -->
              <p v-if="item.showType == 1">
                1.预计于2020年2月20日生效。<br>
                 &nbsp;&nbsp;&nbsp;生效后，可致电4008801900完成预约使用。
              </p>
              <!-- 美年健康体检服务 -->
              <p v-else>
                1.预计于2020年2月20日生效。生效后，可致电<br>4007287289完成预约使用或<a v-if="item.ticketStatus == 1 && item.isSend != 1 && item.showType == 2" :href="meinianUrl">点击预约页面</a><span v-else>点击预约页面</span>完成预约。
              </p>
              <p>2.该服务有效期为一年，过期视为放弃。</p>
              <p v-if="item.fileLink">3.<a href="javascript:;" @click="openPdf(item.fileLink)">服务说明</a></p>
            </div>
          </div>
        </div>
        <div class="empty" v-else>
            <img src="@/assets/imgs/IntegralExchange/empty.png" alt="">
            <button id="exrecord_goexchange" class="goExchange" @click="goExchange">去兑换</button>
          </div>
        <AppPopup
          :personInfo="person"
          :showAddress="showAddress"
          @closeAdd="closeAdd"
          pageSource="兑换记录" />
        <Epopup ref="commonPopup" />
    </div>
</template>

<script>
    import { Toast } from 'mand-mobile'
    import { goNative } from '@/utils/nativeUtils'
    import AppPopup from "@/views/activity/appointment/AppPopup";
    import Epopup from '@/views/activity/IntegralExchange/Epopup'

    export default {
        name: "ExRecord",
        components: {
          AppPopup,
          Epopup
        },
        data() {
            return {
              userToken: '',
              exchangeRecordShowList: [],
              person:{
                name:'',
                iphone:'',
                areaAdd:'',
                detailAdd:''
              },
              showAddress: false,
              ticketNo: '',
              meinianUrl: 'http://m.guanaihui.com/sh/payCard/?navIndex=2&from=singlemessage&isappinstalled=0'
            };
        },
        computed: {
        },
        created() {
            this.init();
        },
        methods: {
            init() {
              document.addEventListener("visibilitychange", function () {
                  if (!document.hidden) {
                      window.location.reload();
                  }
              }, false);
              var browserRules = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
              if(browserRules.test(navigator.userAgent)){
                  window.onpageshow = function(e){
                      if(e.persisted || (window.performance && window.performance.navigation.type == 2)){
                          window.location.reload();
                      }
                  }
              }
              this.userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN_PAY')) || ''
              let newFlag = this.$router.query('newFlag')
                if(!this.userToken){
                    if(newFlag === '1'){
                        location.href = '/activity/IntegralExchange/ScoreExNew.html'
                        return false
                    }else{
                        location.href = '/activity/IntegralExchange/MyIntegEx.html'
                        return false
                    }
                }
              this.getExchangeHistory()
            },
            getExchangeHistory () {
              this.$request({
                  url: `/act/actScoreExchange/getExchangeHistory`,
                  userToken: this.userToken,
                  method: 'POST',
                  successFn: data => {
                      if(data && data.exchangeRecordShowList.length > 0){
                        this.exchangeRecordShowList = data.exchangeRecordShowList.map((item) => {
                          // 增加此参数判断点击
                          item.isClick = false
                          return item
                        }) || []
                        if (data.receiver) {
                          this.person.name = data.receiver.receiverName || ''
                          this.person.iphone = data.receiver.receiverMobile || ''
                          this.person.areaAdd = data.receiver.area || ''
                          this.person.detailAdd = data.receiver.address || ''
                        }
                      }
                  },
                  failFn: data => {
                      Toast.info(data.resultMsg);
                  }
              });
            },
            openPdf (url) {
              this.$app.goPdfView(url);
            },
            addDetail (item) {
              this.showAddress = true
              this.ticketNo = item.ticketNo
            },
            closeAdd (data) {
              this.showAddress = false
              if (data) {
                this.saveReceiverInfo(data)
              }
            },
            saveReceiverInfo (data) {
              // POST /api/act/actScoreExchange/saveReceiverInfo
              this.$request({
                  url: `/act/actScoreExchange/saveReceiverInfo`,
                  method: "POST",
                  userToken: this.userToken,
                  isLoading: true,
                  contentType: "application/json;charset=UTF-8",
                  data: {
                    address: data.detailAdd,
                    area: data.areaAdd,
                    ticketNo: this.ticketNo,
                    receiverMobile: data.iphone,
                    receiverName: data.name
                  },
                  successFn: data => {
                      this.getExchangeHistory ()
                      this.$refs['commonPopup'].showTip({
                        text: '收货地址添加成功',
                        btnText: '确定'
                      })
                  },
                  failFn: data => {
                      this.$refs['commonPopup'].showTip({
                        text: data.resultMsg
                      })
                  }
              });
            },
            goExchange () {
              location.href = '/activity/IntegralExchange/MyIntegEx.html'
            }
        },
        filters: {
          transDate (v) {
            // let fmt = 'yyyy-MM-dd hh:mm:ss'
            let fmt = 'hh:mm'
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
          },
          ticketStatusText (v) {
            let tansObj = {
              '0': '待生效',
              '1': '已生效',
              '2': '已失效'
            }
            return tansObj[v] || '待生效'
          },
          elipsis (v) {
            return v.length > 20 ? (v.substr(0,20) + '...') : v
          }
        },
        watch: {
          person: {
            handler (v) {
              this.person = v
            }
          }
        }
    };
</script>

<style lang="scss" scoped>
.exrecord-wrap {
    font-size: 26px;
    background-color: #F2F2F2;
    min-height: 100%;
    padding: 24px;
    .recordList {
      width: 690px;
      margin: 0 auto;

      .item {
        padding: 30px 40px;
        background-color: #fff;
        border-radius: 12px;
        margin-bottom: 30px;
        .top {
          display: flex;
          img {
            width: 100px;
            height: 100px;
            margin-right: 16px;
          }
          .right {
            position: relative;
            flex: 1;
            .has-detail {
              .adddetail {
                margin: 24px 24px 24px 0;
                button {
                  min-width: 226px;
                  height: 60px;
                  text-align: center;
                  border: 1px solid #EB6B67;
                  color: #EB6B67;
                  border-radius: 8px;
                  font-size: 28px;
                }
              }
              .showdetail {
                margin-bottom: 12px;
                font-size: 24px;
                h3 {
                  font-weight: normal;
                  font-size: 24px;
                  span {
                    border: 1px solid #EB6B67;
                    color: #EB6B67;
                    border-radius: 4px;
                    font-size: 20px;
                  }
                }
                p {
                  width: 364px;
                  &.elipsis {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    -webkit-box-orient: vertical !important;
                  }
                  a {
                    color: #EBB067;
                  }
                }
              }
            }
            h3 {
              color: #333;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 14px;
            }
            p {
              font-size: 26px;
              color: #333;
              line-height: 40px;
            }
            .p3 {
              font-size: 26px;
              color:#8E8E8E;
              margin-bottom: 8px;
            }
            .wait,
            .tele,
            .gomeinian {
              min-width: 122px;
              height: 36px;
              display: inline-block;
              text-align: center;
              line-height: 36px;
              background-color: #EB6B67;
              border-radius: 8px;
              position: absolute;
              color: #fff;
              font-size: 24px;
              box-sizing: border-box;
              right: 0;
              top: 0;

              &.valid {
                background-color: #EBB067;
                min-width: 108px;
              }
              &.tele,
              &.gomeinian {
                top: 47%;
                border: 1px solid #EB6B67;
                color: #EB6B67;
                background-color: #fff;
                white-space: nowrap;
              }
            }
          }
        }
        .bottom {
          padding: 16px 26px;
          background-color: #F2F2F2;
          margin-top: 16px;
          border-radius: 12px;
          p {
            color: #8E8E8E;
            font-size: 24px;
            line-height: 40px;
            a {
              color: #C99D58;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .empty {
      text-align: center;
      img {
        width: 378px;
        height: 416px;
        margin: 180px auto 80px;
      }
      .goExchange {
        width: 304px;
        height: 64px;
        border-radius: 64px;
        border: 1px solid #E30513;
        color: #E30513;
        text-align: center;
      }
    }
}
</style>
