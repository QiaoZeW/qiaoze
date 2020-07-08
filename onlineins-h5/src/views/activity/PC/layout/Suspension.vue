<template>
    <div :class="homeFlag?'contentComponent home':'contentComponent ' " ref="home" :style="styleText">
        <ul>
            <li @click="goBxdSev">
                <img src="@/assets/imgs/activity_pc/PCIndex/customer.png" class="customer" />
                <a>在线客服</a>
            </li>
            <li @click="backTop">
                <img src="@/assets/imgs/activity_pc/PCIndex/goTop.png" class="goTop" />
                <a>返回顶部</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Suspension",
    data() {
        return {
            sTop: 0
        }
    },
    props: {
        scrollHeight: {
            type: Number,
            default: 0
        },
        homeFlag: {
            type: Boolean,
            default: true
        },
        styleText: {
          type: String,
          default: ''
        }
    },
    created() {
        localStorage.setItem('cps_secondaryDistributor', 'SEM_PC')
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.sTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (this.sTop > this.scrollHeight) {
                this.$refs.home.style.display = 'block'
            } else {
                this.$refs.home.style.display = 'none'
            }
        },
        backTop() {
            window.scrollTo(0, 0)
        },
        goBxdSev () {
          this.$app.getBxdServiceUrl();
        }
    }
}

</script>
<style lang="scss" scoped>
.home {
    top: 130PX;
    margin-left: 620PX;
}

.contentComponent {
    display: none;
    position: fixed;
    left: 50%;

    ul {
        li {
            background: #fff;
            padding: 14PX 14PX 9PX;
            cursor: pointer;

            .customer {
                width: 38PX;
                margin: 0 auto;
                height: 42PX;
            }

            .goTop {
                margin: 0 auto;
                width: 38PX;
                height: 34PX;
            }

            a {
                margin-top: 11PX;
                display: inline-block;
                font-size: 16PX;
                color: #8A8A8A;
                text-align: center;
            }
        }
    }
}

</style>

<style>
    html,body{
        background: #F5F5F5;
        scroll-behavior: smooth;
    }
</style>
