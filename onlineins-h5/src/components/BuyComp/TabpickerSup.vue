<template>
  <div class="md-tab-picker">
    <md-popup
      :value="value"
      position="bottom"
      :mask-closable="maskClosable"
      @input="$_onPopupInput"
      @show="$_onPopupShow"
      @hide="$_onPopupHide"
      @maskClick="$_onCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        @cancel="$_onCancel"
      >
        <md-icon name="close" size="lg" slot="cancel" />
      </md-popup-title-bar>
      <div class="md-tab-picker-content">
          <md-tabs
            v-model="currentTab"
            ref="tabs"
          >
            <md-scroll-view :scrolling-x="false" auto-reflow ref="scrollView">
              <md-tab-pane
                v-for="(pane, index) in panes"
                :key="pane.name"
                :name="pane.name"
                :label="pane.label"
                :class="`panel${index}`"
              >
                <md-radio-list
                  :value="pane.value"
                  :options="pane.options"
                  :is-slot-scope="hasSlot"
                  :key="tabsTmpKey"
                  @input="$_onSelectPaneItem($event, index)"
                  icon=""
                  icon-inverse=""
                  icon-position="right"
                >
                  <template slot-scope="{ option }">
                    <slot :option="option"></slot>
                  </template>
                </md-radio-list>
              </md-tab-pane>
            </md-scroll-view>
          </md-tabs>
      </div>
    </md-popup>
  </div>
</template>

<script>
import popupMixin from './mixins'
import popupTitleBarMixin from './mixins/title-bar'

export default {
  name: 'Babpick',

  mixins: [popupMixin, popupTitleBarMixin],

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    }
  },

  data() {
    return {
      selected: [],
      oldSelected: [],
      currentTab: '',
      oldCurrentTab: '',
      tabsTmpKey: Date.now(),
    }
  },

  computed: {
    panes() {
      const panes = []
      let target = this.data
      let cursor = 0
      while (target && target.name) {
        const pane = {
          name: target.name,
          label: target.label || this.placeholder,
          value: this.selected[cursor],
          selected: null,
          options: target.options,
        }
        let find = false
        for (let i = 0, len = target.options.length; i < len; i++) {
          if (target.options[i].value === this.selected[cursor]) {
            pane.label = target.options[i].label
            pane.selected = target.options[i]
            target = target.options[i].children
            find = true
            cursor++
            break
          }
        }
        if (!find) {
          target = null
        }
        panes.push(pane)
      }

      return panes
    },
    hasSlot() {
      return !!this.$scopedSlots.default
    },
  },

  created() {
    /* istanbul ignore else */
    if (this.defaultValue) {

      this.selected = this.defaultValue
    }

    /* istanbul ignore else */
    if (this.data) {
        if(this.selected&&this.selected.length>0){
            try{
                this.currentTab = this.panes[this.selected.length-1].name;
            }catch(e){
                this.currentTab = this.data.name
            }
        }else{
            this.currentTab = this.data.name
        }
    }
  },

  methods: {
    // MARK: private events
    $_onPopupInput(val) {
      this.$emit('input', val)
    },
    $_onPopupShow() {
      this.$refs.tabs.reflowTabBar()
      this.$emit('show')
      setTimeout(() => {
        this.oldSelected = this.extend([], this.selected)
        this.oldCurrentTab = this.currentTab
      }, 100)
    },
    $_onPopupHide() {
      this.$emit('hide')
    },
    $_onCancel() {
      this.hideTabPicker()
      setTimeout(() => {
        this.selected = this.extend([], this.oldSelected)
        this.currentTab = this.oldCurrentTab
        this.tabsTmpKey = Date.now()
      }, 100)
    },
    $_onSelectPaneItem(value, index) {
      this.selected.splice(index, this.selected.length - index, value)
      this.$nextTick(() => {
        const nextPane = this.panes[index + 1]

        /* istanbul ignore else */
        if (nextPane) {
          this.currentTab = nextPane.name
        } else if (value !== '') {
          setTimeout(() => {
            this.$emit('change', {
              values: this.getSelectedValues(),
              options: this.getSelectedOptions(),
            })
            this.hideTabPicker()
          }, 300)
        }
        this.$refs['scrollView'].scrollTo(0,0)
      })
    },
    // MARK: public methods
    getSelectedValues() {
      return this.selected
    },
    getSelectedOptions() {
      if (this.panes && this.panes.length) {
        return this.panes.filter(pane => pane.value).map(pane => pane.selected)
      } else {
        return []
      }
    },
    hideTabPicker() {
      this.$emit('input', false)
    },
    extend(to, _from) {
      for (const key in _from) {
        to[key] = _from[key]
      }
      return to
    }
  },
}
</script>

<style lang="stylus">
.md-tab-picker
  .md-popup
    z-index tab-picker-zindex
  .md-tab-bar
    position relative
    margin-left tab-picker-h-gap
    margin-right tab-picker-h-gap
    padding-left 0
    padding-right 0
    background-color tab-picker-bg
    hairline(bottom, color-border-base)
  .md-tabs-content
    height tab-picker-height
    overflow auto
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
  .md-tab-bar-list
    justify-content flex-start
    .md-tab-bar-item
      margin 0 60px 0 0
      padding 0
      font-size font-caption-normal
  .md-tab-pane
    padding-left tab-picker-h-gap
    padding-right tab-picker-h-gap
    box-sizing border-box
  .md-popup-cancel
    width 90px !important
.md-tab-picker-content
  background-color tab-picker-bg
  .md-radio-item.is-selected
    .md-cell-item-body .md-cell-item-title
      color radio-color
</style>
