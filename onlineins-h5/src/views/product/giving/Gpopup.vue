<template>
    <md-popup v-model="isShow">
      <div class="gpopup">
        <p v-html="params.pText"></p>
        <button :class="{'blue': params.isBlue}" @click="btnClick">{{ params.btnText }}</button>
      </div>
    </md-popup>
</template>

<script>
    export default {
        name: "Gpopup",
        data () {
            return {
              isShow: false
            }
        },
        props: {
          params: {
            type: Object,
            default: () => {}
          }
        },
        created() {
        },
        methods: {
          show () {
            this.isShow = true
          },
          btnClick () {
            if (this.params.clickFn) {
              this.params.clickFn()
            } else {
              this.isShow = false
            }
          }
        }
    }
</script>

<style lang='scss' scoped>
.gpopup {
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 84px 100px 44px;
  p {
    color: #333;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 88px;
    line-height: 60px;
  }
  button {
    width: 340px;
    height: 88px;
    border-radius: 88px;
    background: linear-gradient(to bottom, #FF764D, #F64528);
    color: #fff;
    font-size: 32px;
    &.blue {
      background: linear-gradient(to bottom, #47C1FE, #2877F6);
    }
  }
}
</style>
