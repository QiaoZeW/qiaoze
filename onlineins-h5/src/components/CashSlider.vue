<template>
    <div class="cash-out">
        <div class="model-cash-out">
            <h2 class="cashtitle">现金价值计算</h2>
            <div class="cashtitle-tip">拖动按钮查看现金价值</div>
        </div>
        <!-- <div v-for=" (item,index) in newCashList" :key="index" > -->
        <div v-for=" (item,index) in newCashList" :key="index" v-show="item.riskCode != '5909'">
            <div  :class=" showS==true? 'cash-row-bottom-hide':'cash-row-bottom-show' " class="cash-row" >
                <div class="cash-row-item-label">主险现金价值</div> <div class="cash-question"  @touchstart="doShow('m', index)" @touchend="hideShow('m', index)"></div> <div class="cash-row-item-value">{{item.cv|toMoney}}</div>
                <div class="showHover" v-if="showHoverM && index == clickedIndex"> {{item.riskName}}</div>
            </div>
            <div class="year-row">
                <div class="year-row-label1">第</div><div class="year-row-value1">{{item.currentVal}}</div><div class="year-row-label1">年</div> 
                <div class="year-row-label2">(被保人</div> <div class="year-row-value1">{{item.age}}</div> <div class="year-row-label1">岁)</div>
            </div>
            <div class="slider-row">
                <div class = "btn-reduce" @click=" cal('reduce', index) "></div>
                <div class = "val-min">0</div>
                <mjslider ref = "mjslider" :maxV = "item.endVal" 
                :sliderIndex = "index"
                :sliderRiskCode = "item.riskCode"
                :currentVal = "item.currentVal"
                @returnCurrentVal = "returnCurrentVal"></mjslider>
                <div class = "val-max" > {{ item.endVal }} </div>
                <div class = "btn-plus" @click = "cal('plus', index)"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState } from 'vuex'
    import mjslider from '@/components/slider/mjslider'
    import Vue from 'vue'
    export default {
        components: {
            mjslider
        },
        created() {
        },
        data() {
            return {
                newCashList:[],
                showHoverM: false,
                showHoverS: false,
                showHideFlagM: null,
                showHideFlagS: null,
                showHideClicksM: 0,
                showHideClicksS: 0,
                showS: false,
                clickedIndex: null
            }
        },
        mounted() {
            let cashList = []
            let cvResultList = this.$store.state.Policy.cvResultList
            for(let i = 0; i < cvResultList.length; i++) {
                let cashObj = {}
                cashObj.startVal = 0
                cashObj.endVal = cvResultList[i].cvList.length
                cashObj.currentVal = 0
                cashObj.age = this.customerAge
                cashObj.cv = 0
                cashObj.riskName = cvResultList[i].riskName
                cashObj.riskCode = cvResultList[i].riskCode
                cashList.push(cashObj)
            }
            this.newCashList = cashList
        },
        methods: {
            doShow(val, index) {
               this.clickedIndex = index
               if( val == 'm') {
                   this.showHideClicksM ++ 
                   if( this.showHideClicksM >= 2) {
                       return
                   }
                   this.showHoverM = true 
                   if(this.showHideFlag) {
                       clearTimeout(this.showHideFlag)
                   }
               } else {
                   this.showHideClicksS ++ 
                   if( this.showHideClicksS >= 2) {
                       return
                   }
                   this.showHoverS = true 
                   if(this.showHideFlag) {
                       clearTimeout(this.showHideFlag)
                   }
               }
               
            },
            hideShow(val) {
                if( val == 'm') {
                    if( this.showHideClicksM >= 2) {
                        return
                    }
                    this.showHideFlagM = setTimeout(()=>{
                    	this.showHoverM = false
                        this.showHideClicksM = 0
                    },1500)
                } else {
                    if( this.showHideClicksS >= 2) {
                        return
                    }
                    this.showHideFlagS = setTimeout(()=>{
                    	this.showHoverS = false
                        this.showHideClicksS = 0
                    },1500)
                }
            },
            cal( val, index ) {
                let currentV = this.newCashList[index].currentVal
                let { ...temp } = this.newCashList[index]
                if( val == 'plus' ) {
                    let maxV = this.newCashList[index].endVal
                    if( currentV < maxV ) {
                        temp.currentVal ++
                        Vue.set(this.newCashList, index, temp)
                    }
                }
                if( val == 'reduce' ) {
                    if( currentV > 0) {
                        temp.currentVal --
                        Vue.set(this.newCashList, index, temp)
                    }
                }
            },
            returnCurrentVal(data) {
                let { ...temp } = this.newCashList[data.sliderIndex]
                temp.currentVal = Number(data.currentV)
                temp.age = Number(data.currentV) + this.customerAge
                if(data.currentV >= 1) {
                    temp.cv = this.cvResultList[data.sliderIndex].cvList[data.currentV-1].cv
                } else {
                    temp.cv = 0
                }
                Vue.set(this.newCashList, data.sliderIndex, temp)
            },
            getcvListTocvObj(cvList) {
                if(cvList) {
                    let obj = {}
                    for(let i = 0; i < cvList.length; i++) {
                        obj[cvList[i].riskCode] = cvList[i]
                    }
                    return obj
                } else {
                    return {}
                }
            }
        },
        watch: {
            cvResultList: function() {
                let cashList = []
                let cvResultList = this.$store.state.Policy.cvResultList
                for(let i = 0; i < cvResultList.length; i++) {
                    let cashObj = {}
                    let newCashListToObj = this.getcvListTocvObj(this.newCashList)
                    if(newCashListToObj[cvResultList[i].riskCode]) {
                        let {...cashObjTemp} = newCashListToObj[cvResultList[i].riskCode]
                        cashObjTemp.endVal = cvResultList[i].cvList.length
                        cashObjTemp.riskCode = cvResultList[i].riskCode
                        cashObjTemp.riskName = cvResultList[i].riskName
                        if(cashObjTemp.currentVal > cvResultList[i].cvList.length) {
                            cashObjTemp.currentVal = cvResultList[i].cvList.length
                        }
                        if(cashObjTemp.currentVal >= 1) {
                            cashObjTemp.cv = cvResultList[i].cvList[cashObjTemp.currentVal-1].cv
                        }else {
                            cashObjTemp.cv = 0
                            cashObjTemp.age = this.customerAge
                        }
                        cashObj = cashObjTemp
                    }
                    else {
                        cashObj.startVal = 0
                        cashObj.endVal = cvResultList[i].cvList.length
                        cashObj.currentVal = 0
                        cashObj.age = this.customerAge
                        cashObj.cv = 0
                        cashObj.riskName = cvResultList[i].riskName
                        cashObj.riskCode = cvResultList[i].riskCode
                    }
                    
                    cashList.push(cashObj)
                }
                this.newCashList = cashList
            }
           
        },
        computed: {
            cvResultList() {
                return this.$store.state.Policy.cvResultList
            }
        },
        props: {
            customerAge: Number
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
    }
</script>
<style>
</style>
<style  lang="scss" scoped>
    @import "../assets/app";
    .showHover {
        position: absolute;
        top: -24px;
        left: -42px;
        border-radius: 5px;
        background: lightcoral;
        color: snow;
        font-size: 20px;
        height: 42px;
        line-height: 42px;
        padding: 5px 10px 0px 10px;
    }
    .val-max {
       width: 72px;
       height: 100px;
       line-height: 100px;
       text-align: center;
       font-size:24px;
       font-weight: 400; 
    }
    .val-min {
        width: 48px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size:24px;
        font-weight: 400;
    }
    .btn-plus {
        background-image: url("../assets/imgs/cashslider/cash_btn_plus.png");
        width: 44px;
        height: 44px;
        margin-top: 31px;
        margin-bottom: 25px;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .btn-reduce {
        background-image: url("../assets/imgs/cashslider/cash_btn_reduce.png");
        width: 44px;
        height: 44px;
        margin-top: 31px;
        margin-bottom: 25px;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .slider-row {
        height: 100px;
        width: 92%;
        margin: auto;
        display: flex;
    }
    .year-row-label2 {
        padding-left: 20px;
        height: 98px;
        width: 102px;
        line-height: 98px;
        font-size:30px;
        font-weight:400;
        color:rgba(51,51,51,1);
        text-align: center
    }
    .year-row-value1 {
        height: 98px;
        width: 80px;
        line-height: 98px;
        font-size:30px;
        font-weight:800;
        color: #d7000f;
        text-align: center;
    }
    .year-row-label1 {
        height: 98px;
        line-height: 98px;
        font-size:30px;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .year-row {
        height: 98px;
        width: 92%;
        margin: auto;
        display: flex;
    }
    .cash-question {
        background-image: url("../assets/imgs/cashslider/cash_name_question.png");
        width: 32px;
        height: 32px;
        margin-top: 29px;
        margin-bottom: 29px;
        margin-left: 24px;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .cash-row-item-value {
        position: absolute;
        right: 0;
        height: 90px;
        line-height: 90px;
        font-weight:400;
        color:#d7000f;
        font-size:28px;
    }
    .cash-row-item-label {
        height: 90px;
        line-height: 90px;
        font-size:30px;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .cash-row {
        height: 90px;
        border-top: 1px solid #EDEDED;
        border-bottom: 1px solid #EDEDED;
        width: 92%;
        margin: auto;
        display: flex;
        position: relative;
    }
    .model-cash-out {
        display: flex;
        width: 100%;
    }
    .cashtitle-tip {
        text-align: right;
        width: 57%;
        height: 82px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 82px;
        padding-right:4%;
    }
    .cash-out {
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        margin: auto;
        margin-top: 20px;
        border-radius: 10px;
        width: 92%;
        background: #fff;
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
    }
    .cashtitle {
        font-size: 36px;
        width: 35%;
        margin-left: 4%;
        padding-bottom: 30px;
        padding-top: 20px;
        font-weight: bold;
    }
    .cash-row-bottom-hide {
        border-bottom: 0px;
    }
    .cash-row-bottom-show {
        border-bottom: 1px solid #EDEDED;
    }
</style>
