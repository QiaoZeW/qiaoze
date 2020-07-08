<template>
  <div class="md-example-popup md-example-popup-bottom" style="position: relative;border-radius:10px 10px 0px 0px;">
      <img class="cancelLogo" src="../../assets/imgs/kanghuibao/x.png" @click="cancelFunc"/>
      <div class="contentS">
          <h2>声明抄录</h2>
          <div class="contentD">
            <span v-if="contentShow" class="first">
                请按顺序点击下列文字
            </span>
            <span v-else class="second">
                {{content}}
            </span>
          </div>
          <p :class="{setClass:ifClick1}" @click.once="shuoming">本人已阅读保险条款、产品说明书和投保提示书，</p>
          <p :class="{setClass:ifClick2}" @click.once="product">了解本产品的特点和保单利益的不确定性。</p>
          <div class="btns" v-if="countNum == 2">
            <md-button type="primary" @click="saveData()">确定</md-button>
          </div>
          <div class="btns" v-else>
            <md-button type="default">确定</md-button>
          </div>
      </div>

  </div>
</template>

<script>

export default {
    name: 'Statement',
    props: {
      statementShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
            content:'',
            contentShow:true,
            countNum:0,
            ifClick1:false,
            ifClick2:false
        }
    },

    mounted () {
    },
    destroyed() {
    },
    methods: {
        cancelFunc(){
            this.$emit("cancelStatement",false)
        },
        shuoming(){
            this.contentShow = false
            this.content = '本人已阅读保险条款、产品说明书和投保提示书，'
            this.countNum++
            this.ifClick1 = true
            if(this.countNum == 2){
               this.content = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。"
            }
        },
        product(){
            this.contentShow = false
            this.content = '了解本产品的特点和保单利益的不确定性。'
            this.countNum++
            this.ifClick2 = true
            if(this.countNum == 2){
               this.content = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。"
            }
            // if(this.countNum == 2){
            //     this.$emit("confirmDone",true)
            // }
        },
        saveData(){
            this.$emit("confirmDone",true)
            this.$emit("cancelStatement",false)
        }
    }
}
</script>

<style lang='scss' scoped>
    .contentS{
        background: #FFF;
        height: 10.5rem;
        overflow: hidden;
        div{
            height: 250px;
            .first{
                color: #CCCCCC;
                font-size: 30px;
            }
            .second{
                color: #e7833e;
                font-size: 30px;
            }
        }
        h2{
            text-align: left;
            text-indent: 30px;
            font-weight: bold;
            margin: 60px auto 28px;
            font-size: 34px;
            color: #333;
        }
        h2:first-child{
            margin-top: 0px;
        }
        p{
            padding: 28px 30px;
            font-size: 28px;
            color: #333;
            line-height: .6rem;
            background:rgba(245,245,246,1);
            border-radius: 12px;
            text-align: justify;
            margin-bottom: 20px;
        }
    }
    .contentD{
        padding: 0 20px;
        line-height: 0.6rem;
    }
    .setClass{
        color: #888!important;
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
    .statementPopup .md-popup-box {
        border-radius: 20px 20px 0 0!important;
        background: #fff;
        height: 65%;
    }
    .statementPopup {
        z-index: 1001;
    }
    .md-button{
        bottom: -0.9rem!important;
    }
</style>
