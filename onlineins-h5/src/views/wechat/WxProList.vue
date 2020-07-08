<template>
    <section class="prolist-mod">
        <ul>
            <li v-for="(item,key) in proList">
                <a :href="item.href">
                    <img :src="item.maxImage" alt="">
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: 'wxprolist',
        components: {},
        data() {
            return {
                proList: [],
                href: this.$router.siteUrl
            }
        },
        created() {
            document.title = '产品列表'
            this.loadProList()
        },

        methods: {
            loadProList() {
                let _this = this
                this.$request({
                    url: `/cms/content/image?moduleType=08`,
                    isLoading: true,
                    successFn: (data) => {
                        console.log(data)
                        let ret_data = []
                        data.forEach(function (value) {
                            let temp = {
                                'maxImage': value.imageUrl,
                                'href': value.linkUrl
                            }
                            ret_data.push(temp)
                        })

                        this.proList = ret_data
                        console.log(this.proList)
                    },
                    errorFn: () => {
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.prolist-mod{padding:30px;}
.prolist-mod li{border-radius: 8px;overflow: hidden;margin-top:35px;}
.prolist-mod li:first-child{margin-top:0}
.prolist-mod li img{width: 100%;}
</style>
