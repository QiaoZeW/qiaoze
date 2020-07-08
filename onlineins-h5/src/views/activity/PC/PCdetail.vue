<template>
    <div class="pcindex">
        <PCHeader />
        <section class="section">
            <Prointro />
            <Prodetail />
            <Suspension  :scrollHeight="scrollHeight" styleText="margin-left: 520px;" />
        </section>
        <PCFooter />
    </div>
</template>

<script>
    import PCHeader from '@/views/activity/PC/layout/PCHeader'
    import PCFooter from '@/views/activity/PC/layout/PCFooter'
    import Prointro from '@/views/activity/PC/layout/detail/Prointro'
    import Prodetail from '@/views/activity/PC/layout/detail/Prodetail'
    import Suspension from '@/views/activity/PC/layout/Suspension'
    import { setSize } from './PCutils'
    export default {
        name: "PCindex",
        components: {
           PCHeader,
           PCFooter,
           Prointro,
           Prodetail,
           Suspension
        },
        data () {
            return {
                scrollHeight: 650
            }
        },
        created() {
            setSize()
        },
        methods: {
        }
    };
</script>

<style lang='scss' scoped>
.pcindex {
  background-color: #F5F5F5;
  .section {
    margin-top: 7PX;
    background-color: #fff;
    .Suspension {
        margin-left: 500PX;
    }
  }
}
</style>
