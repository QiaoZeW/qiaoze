<template>
    <div class="outer">
      <ul>
        <li @click="showOneD()"></li>
        <li @click="showOneD()">
          <span>现金价值计算</span>
          <img
            src="../assets/imgs/kanghuibao/top.png"
            v-if="showFlag == true"
            class="mediumImg"
          >
          <img src="../assets/imgs/kanghuibao/bottom.png" v-else class="mediumImg">
        </li>
      </ul>
      
      <div class="oneDetail" v-if="showFlag == true">
          <div class="test" v-if="showHover">{{showHoverText}}</div>
          <div class="tab_title_out">
              <div v-for="(item,index) in dealList" :key="index" 
              :class="item.riskCode == clickedTab? 'tab_title_clicked' : 'tab_title'" 
              @click="getSomeList(item.riskCode)" 
              @touchstart="doShow(item.riskName)" @touchend="hideShow()" > {{item.riskName}}</div>
          </div>
          <div class="cv-form-title">
              <div class="cv-form-title-item" style="width: 31%; padding-left: 2%;">年度</div> 
              <div class="cv-form-title-item" style="width: 33%;">年龄</div> 
              <div class="cv-form-title-item" style="width: 34%;">现金价值</div>
          </div>
          <div class="cv-form-row" v-for="(item, index) in someList" :key="index" v-show="index < showNum">
              <div class="cv-form-row-item" style="width: 31%; padding-left: 2%">第{{item.duration}}年</div> 
              <div class="cv-form-row-item" style="width: 33%;">{{item.age}}岁</div>
              <div class="cv-form-row-item" style="width: 34%;"><span class='third-span'>{{item.cv|toMoney}}</span></div>
          </div>
          <div class="showMore" @click="getMore()"><span>{{waitMessage}}</span></div>
      </div>
      
    </div>
</template>

<script>
    import {mapState } from 'vuex'
    export default {
        data() {
            return {
                showFlag: false,
                dealList: [],
                someList: [],
                clickedTab: '',
                showNum: 20,
                waitMessage: '点击加载更多',
                isClicking: 0,
                showHover: false,
                showHoverText: '',
                showHideFlag: null,
            }
        },
        methods: {
            getMore() {
                this.isClicking += 1
                this.waitMessage = '加载中...'
                if(this.isClicking >= 2) {
                    return
                }
                setTimeout(()=>{
                	this.showNum += 20
                    this.waitMessage = '点击加载更多'
                    this.isClicking = 0
                },500)
            },
            showOneD() {
              this.showFlag = !this.showFlag;
            },
            doShow(text) {
               this.showHover = true 
               this.showHoverText = text
               if(this.showHideFlag) {
                   clearTimeout(this.showHideFlag)
               }
            },
            hideShow() {
                this.showHideFlag = setTimeout(()=>{
                	this.showHover = false
                    this.showHideClicks = 0
                },1500)
                
            },
            getSomeList( riskCode ) {
                //把dealList处理成对象
                let dealObj = {}
                for( let obj in this.dealList ) {
                    dealObj[ this.dealList[ obj ].riskCode ] = this.dealList[ obj ]
                } 
                if( dealObj[ riskCode ] ) {
                    this.someList = dealObj[ riskCode ].cvList
                    this.clickedTab = riskCode
                } else {
                    this.someList = dealObj[ this.riskCode ].cvList
                    this.clickedTab = this.riskCode
                }
                this.showNum = 20
            },
            changeList() {
                let outList = []
                for(let i = 0; i < this.cvResultList.length; i++) {
                    let { ...outtemp } = this.cvResultList[i]
                    let newList = []
                    for(let j = 0; j < this.cvResultList[i].cvList.length; j++) {
                        let { duration, cv } = this.cvResultList[i].cvList[j]
                        let temp = {}
                        temp.duration = duration
                        temp.cv = cv
                        temp.age = Number(this.cvResultList[i].cvList[j].duration) + this.customerAge
                        newList.push(temp)
                    }
                    outtemp.cvList = newList
                    outList.push(outtemp)
                }
                this.dealList = outList
            },
            
        },
        mounted() {
           
        },
        watch:{
            cvResultList: function() {
                this.changeList()
                if( this.clickedTab ) {
                    this.getSomeList(this.clickedTab)
                } else {
                    this.getSomeList(this.riskCode)
                }
            },
        },
        computed: {
            cvResultList() {
                return this.$store.state.Policy.cvResultList
            },
            riskCode() {
                return this.$store.state.Policy.cvResultList[0].riskCode
            }
        },
        filters:{
            toMoney(value){
                if(value){
                    var t =  Number(value).toFixed(2);
                    return t;
                }else{
                    return value;
                }
            }
        },
        props: {
            customerAge: Number
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/app";
    .test {
        position: absolute;
        top: -24px;
        left: 22px;
        border-radius: 5px;
        background: lightcoral;
        color: snow;
        font-size: 20px;
        height: 42px;
        line-height: 42px;
        padding: 0px 10px 0px 10px;
    }
    .showMore {
        background: whitesmoke;
        height: 40px;
        margin-top: 20px;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        span {
            width: 100%;
            text-align: center;
            height: 40px;
            line-height:  40px;
        }
    }
    .cv-form-title {
        background: rgb(245, 245, 245);
        height: 40px;
        margin-top: 20px;
        display: flex;
        width: 100%;
        .cv-form-title-item {
            height: 40px;
            line-height: 40px;
            font-size: 25px;
        }
    }
    .cv-form-row {
        display: flex;
        border-bottom: 1px solid gainsboro;
        .cv-form-row-item {
            display: flex;
            height: 60px;
            line-height: 60px;
            font-size: 28px;
            .third-span {
                width:170px;
                text-align: left;
            }
        }
    }
    .tab_title_out {
        display: flex;
        height: 40px;
        
        .tab_title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: black;
            font-size: 28px;
            border-bottom: 1px solid;
            margin-right: 40px;
            width: 270px;
        }
        .tab_title_clicked {
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           color: #d7000f;
           font-size: 28px;
           border-bottom: 1px solid;
           margin-right: 40px;
           width: 270px;
        }
    }
    .tab_title_out :last-child {
        margin-right: 0px;
    }
    
    .outer {
        width: 92%;
        margin: auto;
    }
    .formout{
        padding-bottom: 10px;
        
    }
    .oneDetail:last-child{
        padding-bottom: 10px;
        
    }
    .row {
        display: flex;
        margin-bottom: 10px;
        background: gainsboro;
        border-bottom: solid 1px;
        box-shadow: gainsboro 1px;
    }
    .row-label {
        padding-right: 20px;
        padding-left: 40px;
        width: 160px;
    }
    .row-value {
        width: 100px;
        text-align: right;
    }
    .row-title {
        font-size: larger;
        font-weight: bold;
    }
    .mediumImg {
      height: 30px;
      float: right;
      margin-left: 10px;
      width: 35px;
      margin-top: 0.15rem;
    }
    
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 0.2rem;
      li:first-child {
        color: rgb(102, 102, 102);
        font-size: 28px;
        width: 3.65rem;
        white-space: nowrap;
      }
      li:last-child {
        color: rgb(215, 0, 15);
        font-size: 28px;
        max-width: 6rem;
          span{
              display: inline-block;
          }
      }
      li {
        line-height: 0.7rem;
      }
      button {
        height: 65px;
        width: 180px;
        background: #fff;
        padding: 10px;
        font-size: 26px;
        color: #fff;
        border: 1px solid #d7000f;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
      }
    }
    .oneDetail {
      font-size: 25px;
      padding: 30px 35px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      color: rgb(153, 153, 153);
      position: relative;
    }
</style>
