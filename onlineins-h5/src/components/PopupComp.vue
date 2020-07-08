<template>
    <md-popup v-model="visible">
      <div class="popupcomp">
        <slot />
      </div>
    </md-popup>
</template>

<script>
    export default {
        name: "PopupComp",
        data () {
            return {
              visible: false
            }
        },
        props: {
          value: {
            type: Boolean,
            default: false
          }
        },
        created() {
        },
        watch: {
          value (n) {
            this.visible = n
          },
          visible (n) {
            this.$emit('input', n)
          }
        }
    }
</script>

<style lang='scss' scoped>
.popupcomp {
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 52px 60px;
}
</style>
