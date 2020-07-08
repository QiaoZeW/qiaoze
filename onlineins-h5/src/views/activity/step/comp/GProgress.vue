<template>
    <div ref="procomp" class="g-progress">
      <slot />
      <p class="text">{{ text }}</p>
      <div ref="pro" class="pro">
        <div ref="bar" class="bar"></div>
      </div>
      <p class="num">{{ step }}/40000</p>
    </div>
</template>

<script>
    export default {
        name: "GProgress",
        data () {
            return {
              bar: null,
              pro: null,
              procomp: null,
              perCent: 0
            }
        },
        props: {
          step: {
            type: Number,
            default: 0
          },
          text: {
            type: String,
            default: ''
          },
          width: {
            type: Number,
            default: 486
          },
          height: {
            type: Number,
            default: 56
          }
        },
        mounted () {
          this.bar = this.$refs['bar']
          this.pro = this.$refs['pro']
          this.procomp = this.$refs['procomp']
          this.procomp.style.width = `${this.width/75}rem`
          this.pro.style.height = `${this.height/75}rem`
          this.pro.style.lineHeight = `${this.height/75}rem`
          this.perCent = this.step/40000
          this.bar.style.width = `${this.perCent*100}%`
        },
        methods: {
        }
    }
</script>

<style lang='scss' scoped>
.g-progress {
  .text {
    margin-bottom: 15px;
    font-size: 28px;
    text-align: left;
    padding-left: 20px;
  }
  .num {
    font-size: 30px;
    color: #FF8D14;
    margin-top: 15px;
    text-align: right;
  }
  .pro{
    width: 100%;
    height: 56px;
    background-color: #B1892C;
    border-radius: 56px;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 4px 1px #A47C0D;
    .bar {
      padding: 8px;
      box-sizing: border-box;
      background-color: #FFB914;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 1s;
      /* width: 150px; */
      border: 3px solid #A47C0D;
      border-radius: 56px;
      height: 100%;
    }
  }
}
</style>
