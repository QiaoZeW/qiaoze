<template>
  <div class="md-example-popup md-example-popup-bottom" style="position: relative;border-radius:10px 10px 0px 0px;">
      <img class="cancelLogo" src="../../assets/imgs/kanghuibao/x.png" @click="cancelFunc"/>
      <div class="contentS">
          <div>
            <h2>价格明细</h2>
            <ul class="first">
                <li v-if="riskFlag">超惠保首期保费</li>
				<li v-else>超倍保首期保费</li>
                <li>{{yhtPrice}}元</li>
            </ul>
            <ul class="second">
                <li>药惠通保费</li>
                <li>0元</li>
                <p style="position: relative;">27元<img class="pic" src="../../assets/imgs/kanghuibao/line.png" alt=""></p>
            </ul>
            <!-- <p>
                超倍保首期保费
            </p>
            <p>
                药惠通保费
            </p> -->
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Insform',
    props: {
      insformShow: {
        type: Boolean,
        default: true
      },
      yhtPrice: {
        type: Number,
        default: 0
      },
	  riskFlag: {
		type: Boolean,
		default: false  
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
            this.$emit("cancelIns",false)
        },
    }
}
</script>

<style lang='scss' scoped>
    .contentS{
        background: #FFF;
        h2{
            text-align: center;
            font-weight: bold;
            margin: 60px auto 0px;
            font-size: 40px;
            color: #333;
        }
        h2:first-child{
            margin-top: 0px;
        }
        ul{
            height: 42px;
            margin: 40px 0 50px;
            font-size: 30px;
            color: #333;
            line-height: .6rem;
            border-radius: 12px;
        }
        .second{
            margin-top: 0px;
        }
        li:nth-of-type(1){
            float: left;
            width: 50%;
        }
        li:nth-of-type(2){
            text-align: right;
            float: right;
            color: #E10312;
            width: 100px;
        }
        p{
            float: right;
            width: 66px;
            margin-right: -0.3rem;
        }
    }
    .cancelLogo{
        position: absolute;
        width: 44px;
        height: 44px;
        top: 30px;
        right: 38px;
    }
    .pic{
        position: absolute;
        top: 0.2rem;
        left: 0;
    }
</style>
<style>
    .md-example-popup-bottom{
        padding-top: 50px!important;
        padding-left:54px!important;
        padding-right:54px!important;
    }
    .insformPopup .md-popup-box {
        border-radius: 20px 20px 0 0!important;
        background: #fff;
        height: 506px;
    }
</style>
