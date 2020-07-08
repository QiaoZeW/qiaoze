<template>
    <layout :allDatas="allDatas" />
</template>

<script>
    import Layout from './Layout'
    export default {
        name: "ActivityM",
        components: {
            Layout
        },
        data () {
            return {
                allDatas: [
                    {
                        title: '爆款推荐',
                        bothImg: true,
                        leftImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/01.png'), id: '1'}],
                        rightImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/12.png'), id: '128'}]
                    },
                    {
                        title: '医疗险',
                        bothImg: true,
                        leftImgs: [/*{url: require('@/assets/imgs/activity_m_entrance/02/16.png'), id: '134'},*/
                                    {url: require('@/assets/imgs/activity_m_entrance/02/09.png'), id: '124'}],
                        rightImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/08.png'), id: '123'}],
                        hasSingle: true,
                        singleImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/15.png'), id: '132'}]
                    },
                    {
                        title: '重疾险',
                        bothImg: true,
                        leftImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/03.png'), id: '1'},
                                    {url: require('@/assets/imgs/activity_m_entrance/02/07.png'), id: '2'}],
                        rightImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/14.png'), id: '130'},
                                    {url: require('@/assets/imgs/activity_m_entrance/02/13.png'), id: '128'}]
                    }/*,
                    {
                        title: '人寿险',
                        singleImgs: [{url: require('@/assets/imgs/activity_m_entrance/02/10.png'), id: '3'}]
                    }*/
                ]
            }
        }
    };
</script>

