<template>
  <section>
      <img src="@/assets/imgs/BdProduct/bgTop.png" class="bgTop"/>
      <div class="parT">
          <div class="bgContent">
              <img src="@/assets/imgs/BdProduct/introduction.png" class="bgCont"/>
          </div>
          <div class="introduction">
              <div class="introductionTop">
                  <p v-if="isAllShow">百年人寿保险股份有限公司于2009年6月3日正式开业，总部选址大连，是东北地区首家中资寿险法人机构。公司注册资本77.948亿元，十年累计实现保费收入超过1400亿元，总资产突破千亿元，价值与规模、品质和效益同步提升，连续四年实现盈利，从寿险到资管，健康…</p>
                  <div v-else>
                      <p>百年人寿保险股份有限公司于2009年6月3日正式开业，总部选址大连，是东北地区首家中资寿险法人机构。公司注册资本77.948亿元，十年累计实现保费收入超过1400亿元，总资产突破千亿元，价值与规模、品质和效益同步提升，连续四年实现盈利，从寿险到资管，健康而快速的发展备受行业瞩目。</p>
                      <p>百年人寿坚持价值导向和结构调整，采取多元化销售发展策略，陆续建立并行发展个险、银行保险、创新销售、电话销售、顾问行销等业务渠道，互联网金融和健康管理服务多领域创新发展。十年间百年人寿已在全国开设21家省级分公司，累计拥有各级分支机构390余家，全国主要省市战略布局已基本完成，销售体系日益完善。</p>
                      <p>百年人寿通过“以客户为中心”战略始终致力于为社会大众提供优质的保险产品和服务，便捷高效的操作体验，尖端前沿的医疗支持，持续升级的特色服务，更好地满足了客户对于保险保障的全面需求，为超过2000万客户提供寿险保障服务。百年人寿荣获人身险公司服务评价A类评级，标志着服务已经进入行业前列。</p>
                      <p>凭借优异的市场表现，百年人寿连续被评为行业最具发展潜力和最具成长性的保险公司、最佳保险企业和最佳责任典范公司；连续四年荣膺“年度中国价值成长性十佳寿险公司”，公司产品创新亮点频出，多项产品获得行业大奖，行业地位和品牌知名度显著提升。</p>
                  </div>
              </div>
          </div>
          <p class="chaKan" v-if="isAllShow" @click="isAllShow = false">查看全部简介</p>
          <p class="chaKan" v-else  @click="hideAll()">收起简介</p>
      </div>
      <div class="content">
            <div class="contTop">
                <div :class="activeNum === '01'?'active':''" @click="changeActiveNum01">重疾保险</div>
                <div :class="activeNum === '02'?'active':''" @click="changeActiveNum02">医疗保险</div>
                <div :class="activeNum === '03'?'active':''" @click="changeActiveNum03">人寿保险</div>
            </div>
            <div class="contBody">
                <ul>
                    <li v-for="item in productAllData">
                        <img :src="item.imgUrl" alt="" @click="goDetail(item.id)">
                    </li>
                </ul>
            </div>
      </div>
  </section>
</template>

<script>
    export default {
        name: "BdProduct",
        data(){
            return{
                activeNum:'01',
                productAllData:[],
                productData01:[
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product01.png'),
                        id:1
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product02.png'),
                        id:125
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product03.png'),
                        id:130
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product04.png'),
                        id:128
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product05.png'),
                        id:114
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product06.png'),
                        id:113
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product07.png'),
                        id:2
                    }
                ],
                productData02:[
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product08.png'),
                        id:123
                    },
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product09.png'),
                        id:124
                    }
                ],
                productData03:[
                    {
                        imgUrl:require('@/assets/imgs/BdProduct/product10.png'),
                        id:3
                    }
                ],
                isAllShow:true
            }
        },
        created(){
          this.productAllData = this.productData01
        },
        methods:{
            hideAll(){
                window.scrollTo(0,0)
                this.isAllShow = true
            },
            changeActiveNum01(){
                this.activeNum = '01'
                this.productAllData = this.productData01
            },
            changeActiveNum02(){
                this.activeNum = '02'
                this.productAllData = this.productData02
            },
            changeActiveNum03(){
                this.activeNum = '03'
                this.productAllData = this.productData03
            },
            goDetail(index){
                location.href = '/product/Detail.html?product_id=' + index + '&secondaryDistributor=APP_00010001'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .parT{
        background: #fff;
        padding-bottom: 62px;
    }
    .introduction{
        width: 100%;
        margin-top: 36px;
        .introductionTop{
            margin: 0 auto;
            width:688px;
            p{
                font-size:28px;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:40px;
                text-indent: 2em;
                text-align: justify;
            }
        }

    }
    .chaKan{
        margin-top: 40px;
        text-align: center;
        font-size:24px;
        font-weight:500;
        color:rgba(207,176,136,1);
        line-height:36px;
    }
    .bgTop{
        height: 404px;
        width: 100%;
    }
    .bgContent{
        width: 100%;
    }
    .bgCont{
        width: 622px;
        height: 70px;
        margin: 0 auto;
        padding-top: 48px;
    }
    .content{
        width: 100%;
        .contTop{
            display: flex;
            div{
                flex: 1;
                text-align: center;
                height: 88px;
                line-height: 88px;
                display: inline-block;
                font-size:34px;
                font-weight:bold;
                color:rgba(207,176,136,1);
                background: #29252B;
                border-left: 1px solid #CFB088;
            }
        }
        .contBody{
            margin-top: -3px;
            padding-top: 3px;
            padding-bottom: 48px;
            min-height: calc(100vh - 16rem);
            background: rgba(207,176,136,1);
            ul{
                margin: 0 30px;
                li{
                    margin-top: 30px;
                }
            }
        }
    }
    .active{
        background: linear-gradient(top,#F2D6B1,#CFB088) !important;
        background: -webkit-linear-gradient(top,#F2D6B1,#CFB088) !important;
        color: #fff !important;
    }
</style>
<style>
    html,body{
        background: #CFB088;
    }
</style>
