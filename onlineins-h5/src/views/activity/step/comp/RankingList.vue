<template>
    <div class="stage-list">
        <md-popup class="stage-list-wrap" position="bottom" v-model="showRankingList" large-radius>
            <img src="@/assets/imgs/stepComputed/new/icon04.png" class="topicon" />
            <div class="empty"></div>
            <div class="content">
               <md-icon class="close" name="clear" size="lg" @click="showRankingList=false" />
               <ol class="nav">
                  <li @click="toggle(1)" :class="{'active': activeIndex==1}">穿越中国排名</li>
                  <li>|</li>
                  <li @click="toggle(3)" :class="{'active': activeIndex==3}">总步数排名</li>
               </ol>
               <div class="rank">
                   <ul>
                        <li>
                            <div>
                              <div class="left">
                                  <img src="@/assets/imgs/stepComputed/new/icon01.png" alt="">
                                  <div>
                                    <p>我当前排名在第{{ ranking }}名</p>
                                  </div>
                              </div>
                              <p v-show="activeIndex==3" class="right">
                                 <span>{{ totalStep }}步</span>
                              </p>
                            </div>
                        </li>
                       <li v-for="item in list">
                           <div>
                             <div class="left">
                                 <img src="@/assets/imgs/stepComputed/new/icon01.png" alt="">
                                 <div>
                                   <p class="p1">{{item.mobile | filterMobile}}</p>
                                   <p class="p2">第{{ item.ranking || 9999}}名</p>
                                 </div>
                             </div>
                             <p v-show="activeIndex==3" class="right">
                                <span>{{item.totalStep}}步</span>
                             </p>
                           </div>
                       </li>
                   </ul>
               </div>
            </div>
        </md-popup>
    </div>
</template>

<script>
    export default {
        name: "rankingList",
        data(){
            return{
                showRankingList: false,
                list:[],
                activeIndex: 1,
                ranking: 9999,
                totalStep: 9999
            }
        },
        created(){
            this.getList()
        },
        methods:{
            toggle (index) {
              this.activeIndex = index
            },
            show () {
                this.showRankingList = true
            },
            getList(){
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/act/stepTwo/getActStepTwoRanking`,
                        userToken: userToken,
                        successFn: (data) => {
                            this.ranking = data.ranking || 9999
                            this.totalStep = data.totalStep || 0
                            this.list = data.actStepTwoRankingListDTOList || []
                        },
                        errorFn: (data) => {
                        }
                    })
                })
            }
        },
        filters: {
            filterMobile(value) {
                return value && value.substr(0,3) + '****' + value.substr(7,4) || '****'
            }
        }
    }
</script>

<style scoped lang="scss">
    .stage-list-wrap {
        .topicon {
          width: 188px;
          height: 188px;
          margin: 0 auto -100px;
          position: absolute;
          top: 0;
          left: 50%;
          -webkit-transform: translateX(-50%);
             -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
               -o-transform: translateX(-50%);
                  transform: translateX(-50%);
          z-index: 1;
        }
        .empty {
          width: 100%;
          height: 80px;
        }
        .content {
          position: relative;
          padding-bottom: 30px;
          width: 100%;
          background-color: #fff;
          border-radius: 40px 40px 0 0;
          .close {
            color: #DBD9DC;
            position: absolute;
            top: 30px;
            right: 30px;
          }
          .nav {
            font-size: 28px;
            color: #333;
            padding: 90px 150px 0;
            display: flex;
            justify-content: space-around;
            li {
              padding: 24px 0;
              font-size: 28px;
              color: #333;
              &:nth-child(2) {
                color: #D8D8D8;
              }
              &.active {
                color: #FB741D;
                border-bottom: 2px solid #FB741D;
              }
            }
          }

          .rank{
              max-height: 9rem;
              min-height: 9rem;
              width: 100%;
              overflow-y: scroll;
              box-sizing: border-box;
              li:nth-child(1) {
                background-color: #D2F2E9;
                .left {
                  div {
                    flex-direction: row;
                    align-items: center;
                  }
                }
                p.right {
                  font-size: 32px;
                  color: #E47B37;
                }
              }

              li{
                  > div {
                    margin: 0 30px;
                    display: flex;
                    justify-content: space-between;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 30px 0 30px 30px;
                    .left {
                      display: flex;
                      > div {
                        display: flex;
                        flex-direction: column;
                        .p1 {
                          font-size: 32px;
                          color: #333;
                          text-align: left;
                        }
                        .p2 {
                          font-size: 26px;
                          color: #999;
                          text-align: left;
                        }
                      }
                      img {
                        width: 80px;
                        height: 80px;
                      }
                    }
                    p{
                        font-size: 34px;
                        color: #34B776;
                        margin-left: 27px;
                        display: inline-block;
                        height: 47px;
                        line-height: .65rem;
                    }
                  }
              }
          }
        }
    }
</style>
<style>
    .myRankList .md-landscape-content{
        width: 100% !important;
    }
</style>
