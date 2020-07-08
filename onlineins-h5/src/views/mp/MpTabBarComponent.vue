<template>
    <nav class="mp-tab-bar">

        <div class="mp-tab-bar-inner" ref="wrapper">
            <template v-if="scrollable">
                <div class="mp-tab-bar-start" v-show="maskStartShown"></div>
                <div class="mp-tab-bar-end" v-show="maskEndShown"></div>
            </template>
            <md-scroll-view
                ref="scroller"
                :scrolling-x="scrollable"
                :scrolling-y="false"
                :key="scrollerTmpKey"
                @scroll="$_onScroll"
            >

                <div class="mp-bg-part-top-line"></div>
                <div class="mp-bg-part-top"></div>
                <div class="mp-bg-part-bottom"></div>
                <div class="mp-top-line"></div>
                <div class="mp-tab-bar-list" :style="{width: contentW + 'px'}">
                    <a
                        class="mp-tab-bar-item"
                        :class="{
              'is-active': currentName === item.name,
              'is-group-active':sameGroup(item),
              'is-disabled': !!item.disabled
            }"
                        v-for="(item, index) in items"
                        :key="item.name"
                        ref="items"
                        @click="$_onClick(item, index)"
                    >
                        <slot
                            name="item"
                            :item="item"
                            :items="items"
                            :index="index"
                            :currentName="currentName"
                        >
                            <img class="mp-tab-icon" v-if="item.activeIcon&&currentName === item.name" :src="item.activeIcon" alt="">
                            <img class="mp-tab-icon" v-if="item.icon&&currentName !== item.name" :src="item.icon" alt="">
                            {{ item.label }}</slot>
                        <div v-show="index<3" class="mp-line"></div>
                    </a>
                </div>
                <span
                    class="mp-tab-bar-ink"
                    :class="{
            'is-disabled': currentTab && currentTab.disabled
          }"
                    v-if="hasInk"
                    :style="{
            width: inkWidth + 'px',
            transform: 'translateX(' + inkPos + 'px)',
          }"
                ></span>
            </md-scroll-view>
        </div>
    </nav>
</template>

<script>
    import {ScrollView} from 'mand-mobile'

    export default {
        name: 'mp-tab-bar',

        components: {
            [ScrollView.name]: ScrollView
        },

        props: {
            value: {
                type: [String, Number],
                default: '',
            },
            items: {
                type: Array,
                default: () => [],
            },
            hasInk: {
                type: Boolean,
                default: true,
            },
            inkLength: {
                type: Number,
                default: 100,
            },
            immediate: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                currentName: '',
                wrapperW: 0,
                contentW: 0,
                inkWidth: 0,
                inkPos: 0,
                scrollerTmpKey: Date.now(),
                maskStartShown: false,
                maskEndShown: true,
            }
        },

        computed: {
            scrollable() {
                return this.contentW > this.wrapperW
            },
            currentIndex() {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].name === this.currentName) {
                        return i
                    }
                }
            },
            currentTab() {
                if (this.currentIndex) {
                    return this.items[this.currentIndex]
                }
            },
        },

        watch: {
            value: {
                immediate: true,
                handler(val) {
                    if (val !== this.currentName) {
                        this.currentName = val
                    }
                },
            },
            inkWidth() {
                /* istanbul ignore next */
                this.$nextTick(function() {
                    this.reflow()
                })
            },
            items() {
                /* istanbul ignore next */
                this.$nextTick(function() {
                    this.reflow()
                })
            },
            currentIndex() {
                this.$nextTick(function() {
                    this.reflow()
                })
            },
            scrollable() {
                /* istanbul ignore next */
                this.scrollerTmpKey = Date.now()
            },
        },

        created() {
            if (this.currentName === '' && this.items.length) {
                this.currentName = this.items[0].name
                this.$emit('change', this.items[0], 0, 0)
            }
        },
        mounted() {
            this.$_resizeEnterBehavior()
        },
        activated() {
            /* istanbul ignore next */
            this.$_resizeEnterBehavior()
        },
        deactivated() {
            /* istanbul ignore next */
            this.$_resizeLeaveBehavior()
        },
        beforeDestroy() {
            this.$_resizeLeaveBehavior()
        },

        methods: {
            sameGroup (item) {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].name === this.currentName) {
                        return item.group === this.items[i].group
                    }
                }
                return false
            },
            // MARK: private events
            $_onScroll({scrollLeft}) /* istanbul ignore next */ {
                if (scrollLeft > 0) {
                    this.maskStartShown = true
                } else {
                    this.maskStartShown = false
                }

                if (scrollLeft >= this.$refs.scroller.contentW - this.$refs.scroller.containerW) {
                    this.maskEndShown = false
                } else {
                    this.maskEndShown = true
                }
            },
            $_onClick(item, index) {
                if (item.disabled) {
                    return
                }
                this.$emit('change', item, index, this.currentIndex)
                this.currentName = item.name
                this.$emit('input', item.name)
            },
            $_resizeEnterBehavior() {
                window.addEventListener('resize', this.reflow)
                this.reflow()
                /* istanbul ignore next */
                if (this.immediate) {
                    this.$nextTick(() => {
                        this.$emit('change', this.items[this.currentIndex], this.currentIndex)
                    })
                }
            },
            $_resizeLeaveBehavior() {
                window.removeEventListener('resize', this.reflow)
            },
            // MARK: public methods
            reflow() {
                /* istanbul ignore next */
                if (!this.$refs.items || this.$refs.items.length === 0) {
                    return
                }

                this.wrapperW = this.$refs.wrapper.offsetWidth

                let contentWidth = 0
                for (let i = 0, len = this.items.length; i < len; i++) {
                    const {width} = this.$refs.items[i].getBoundingClientRect()
                    contentWidth += width
                }
                this.contentW = contentWidth
                this.$refs.scroller.reflowScroller()
                this.$nextTick(() => {
                    /* istanbul ignore next */
                    if (!this.$refs.items || !this.$refs.items[this.currentIndex]) {
                        return
                    }

                    const target = this.$refs.items[this.currentIndex]
                    this.inkWidth = target.offsetWidth * this.inkLength / 100
                    this.inkPos = target.offsetLeft + (target.offsetWidth - this.inkWidth) / 2

                    const prevTarget = this.$refs.items[this.currentIndex - 1]
                    const nextTarget = this.$refs.items[this.currentIndex + 1]

                    if (!prevTarget) {
                        this.$refs.scroller.scrollTo(0, 0, true)
                        return
                    }
                    /* istanbul ignore next */
                    if (!nextTarget) {
                        this.$refs.scroller.scrollTo(this.contentW, 0, true)
                        return
                    }

                    const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
                    const prevTargetRect = prevTarget.getBoundingClientRect()
                    const nextTargetRect = nextTarget.getBoundingClientRect()

                    /* istanbul ignore next */
                    if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
                        this.$refs.scroller.scrollTo(prevTarget.offsetLeft, 0, true)
                    } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
                        this.$refs.scroller.scrollTo(nextTarget.offsetLeft + nextTarget.offsetWidth - this.wrapperW, 0, true)
                    }
                })
            },
        }
    }

</script>

<style lang="scss" scoped>
    .mp-tab-bar {
        position: relative;
        padding-left: 0px;
        padding-right: 0px;
        background-color: #ffffff;
    }
    .mp-bg-part-top-line{
        position:absolute;
        background-color: #ECECEC;
        z-index:0;
        width:100%;
        height:0.03rem;
        top:0;
        left:0;
    }
    .mp-bg-part-top{
        position:absolute;
        background-color: #ddd;
        z-index:0;
        width:100%;
        height:0.55rem;
        top:0.03rem;
        left:0;
    }
    .mp-bg-part-bottom{
        position:absolute;
        background-color: #fff;
        z-index:0;
        width:100%;
        height:0.59rem;
        top:0.59rem;
        left:0;
    }
    .mp-tab-bar-inner{
        position:relative;
        width:100%;
        z-index:1;
    }
    .mp-top-line{
        width:100%;
        height:0.03rem;
        background-color: #ECECEC;
    }
    .mp-tab-bar-list{
        display:flex;
        justify-content:space-between;
        min-width:100% ;
        height:1.17rem;
    }


    .mp-tab-bar-item{
        background-color: #F4F4F4;
        flex:auto;
        flex-shrink:0;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        font-size: .37rem;
        font-weight: 400;
        height: 1.03rem;
        padding: 0 20px;
        margin: 0 auto;
        box-sizing:border-box;
        -webkit-user-select:none;
        -webkit-tap-highlight-color:transparent;
        &.is-active{
            color:#E10312;
            font-weight: 600;
        }

        &.is-disabled{
            color:#C5CAD5;
        }
        .mp-line{
            position: absolute;
            right:0;
            top:0.43rem;
            width:0.05rem;
            height:0.45rem;
            background-color:#EEEEEE ;
        }
        &.is-group-active{
            background-color: #fff;
        }
    }

    .mp-tab-bar-item:nth-of-type(4){
        border-radius:0 .45rem  .25rem 0;
    }
    .mp-tab-bar-item:nth-of-type(5){
        border-radius:.45rem 0  0 .25rem;
    }

    .mp-tab-bar-ink{
        position:absolute;
        bottom: 0;
        left: 0;
        display: block;
        height: 0.06rem;
        background-color: #E10312;
        transition: all 300ms;
        &.is-disabled{
            background-color: #C5CAD5;
        }

    }


    .mp-tab-bar-start,
    .mp-tab-bar-end{
        position: absolute;
        top: 0;
        left: 0;
        width: 14px;
        height: 100px;
        overflow: hidden;
        &::after{
            content: '';
            display: block;
            position: absolute;
            left: -14px;
            top: 50%;
            width: 14px;
            margin-top: -40px;
            height: 80px;
            border-radius: 50%;
            box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2);
        }
    }

    .mp-tab-bar-end{
        left: auto;
        right: 0;
        transform: rotate(180deg);
    }



    .mp-tab-bar{
        .mp-scroll-view{
            display: block;
        }
        .scroll-view-container{
            min-width: 100%
        }

    }
    .mp-tab-icon{
        width:0.35rem;
        height:0.37rem;
        margin-right:0.1rem;
    }

</style>
