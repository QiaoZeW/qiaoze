<template>
    <div class="pccan">
        <PCHeader/>
        <div class="bg">
            <div class="bg-inner">
                <div class="bgTip">
                    <p>扫码下载百年人寿APP <br>查看保单</p>
                    <img src="@/assets/imgs/activity_pc/layout/img_code_01.png" />
                </div>
            </div>
        </div>
        <PCFooter/>
    </div>
</template>

<script>
    import PCHeader from '@/views/activity/PC/layout/PCHeader'
    import PCFooter from '@/views/activity/PC/layout/PCFooter'
    export default {
        name: "PCscan",
        components:{
            PCHeader,
            PCFooter,
        },
        data () {
            return {

            }
        },
        created() {
        },
        methods: {
        }
    };
</script>

<style lang='scss' scoped>
.pccan {
    .bg{
        height: 676PX;
        width: 100%;
        background: #5E564C url("../../../assets/imgs/activity_pc/PCIndex/bgOne.png") top center no-repeat;
       /* .bgOne{

            margin: 0 auto;
        }*/
        .bg-inner {
            width: 1200PX;
            margin: 0 auto;
            position: relative;
            height: 100%;
            .bgTip{
                position: absolute;
                top: 18%;
                left: 10%;
                img{
                    margin-top: 48PX;
                    width: 261PX;
                    height: 261PX;
                }
                p{
                    font-size: 44PX;
                    color: #fff;
                    line-height: 60PX;
                }
            }
        }
    }
}
</style>

