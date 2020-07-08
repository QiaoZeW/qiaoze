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
                        singleImgs: [
                            { url: require('@/assets/imgs/activity_m_entrance/01/02.png'),id: '1'},
                            { url: require('@/assets/imgs/activity_m_entrance/01/16.png'),id: '128'}]
                    },
                    {
                        title: '医疗险',
                        singleImgs: [
                            { url: require('@/assets/imgs/activity_m_entrance/01/14.png'),id: '132'},
                            // { url: require('@/assets/imgs/activity_m_entrance/01/15.png'),id: '134'},
                            { url: require('@/assets/imgs/activity_m_entrance/01/07.png'),id: '123'},
                            { url: require('@/assets/imgs/activity_m_entrance/01/08.png'),id: '124'}
                        ]
                    },
                    {
                        title: '重疾险',
                        singleImgs: [
                                { url: require('@/assets/imgs/activity_m_entrance/01/02.png'),id: '1'},
                                { url: require('@/assets/imgs/activity_m_entrance/01/13.png'),id: '130'},
                                { url: require('@/assets/imgs/activity_m_entrance/01/12.png'),id: '128'},
                                { url: require('@/assets/imgs/activity_m_entrance/01/06.png'),id: '2'}]
                    }/*,
                    {
                        title: '人寿险',
                        singleImgs: [{ url: require('@/assets/imgs/activity_m_entrance/01/09.png'),id: '3'}]
                    }*/
                ]
            }
        }
    }
</script>
