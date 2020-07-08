<template>
    <div>
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
        <img ref="shareImg" src="@/assets/imgs/evaluation/shareBoot.png" alt="" style="display: none;">
        <div class="myReport" id="myReport"  >
            <div class="reportTitle">
                <p class="riskReport">我和家人的保障风险报告</p>
                <p class="riskTag" @click="againTest"><img src="@/assets/imgs/evaluation/plus.png"/>为家人保障</p>
            </div>
            <div class="reportContent" >
                <div class="reportS" v-for="item in userAllList">
                    <h2>{{item.vipUserEvaluation.relation== '本人'?'我':'您' + item.vipUserEvaluation.relation}}的测评报告</h2>
                    <ul >
                        <li v-for="itemQ in item.tags">{{itemQ}}</li>
                    </ul>
                    <div class="lastPercent">
                        <p class="userScore"><span>{{item.vipUserEvaluation.score}}</span>分</p>
                        <p class="lastUser">保障分数</p>
                        <img src="@/assets/imgs/evaluation/bgPercent.png"/>
                    </div>
                    <div class="description">
                        {{item.description}}
                    </div>
                    <div class="reportDetail">
                        <p @click="getReportResult(item.vipUserEvaluation.id)"> 查看报告详情</p>
                        <img src="@/assets/imgs/evaluation/shapeCopy@2x.png" @click="getReportResult(item.vipUserEvaluation.id)"/>
                    </div>
                </div>
            </div>


        </div>
        <div  style="display: none; " class="conD" id="conD">
            <div class="conTop">
                <img :src="avatorUrl" class="myAvator"/>
                <span>您{{relation}}的测评结果</span>
                <div class="resultTag">
                    <ul>
                        <li v-for="item in tags">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="conMid">
                <div class="gap">
                    <p class="gapQuestion">
                        保障缺口
                        <md-icon
                            name="question"
                            size="lg"
                            @click="basicDialog.open = true"
                        ></md-icon>
                    </p>
                </div>
                <div class="conK">
                    <div class="Analysis">

                        <div class="bgPic"></div>
                        <div class="midPic">
                            <p class="lastUser">落后{{lastPercent}}%的用户</p>
                            <p class="userScore"><span>{{myScore}}</span>分</p>
                            <img src="@/assets/imgs/evaluation/bgPercent.png"></div>
                        <div class="life parLife">
                            <span v-if="showAmount">{{lifeNum | toInt}}万</span>
                            <p v-if="showAmount" class="guarantee">人寿保障缺口</p>
                            <p v-if="!showAmount" class="guarantee particular">人寿保障缺口</p>
                            <p  v-if="showAmount" class="tips">应有{{parseInt(insuredAmountVO.lifeAmount) / 10000}}万</p>
                        </div>
                        <div  class="illness parLife">
                            <span  v-if="showAmount">{{sicknessNum | toInt}}万</span>
                            <p v-if="!showAmount" class="guarantee particular">重疾保障缺口</p>
                            <p v-if="showAmount" class="guarantee">重疾保障缺口</p>
                            <p  v-if="showAmount" class="tips">应有{{parseInt(insuredAmountVO.sicknessAmount) / 10000}}万</p>
                        </div>
                        <div class="accident parLife">
                            <span  v-if="showAmount">{{accidentNum | toInt}}万</span>
                            <p v-if="showAmount" class="guarantee">意外保障缺口</p>
                            <p v-if="!showAmount" class="guarantee particular">意外保障缺口</p>
                            <p  v-if="showAmount" class="tips">应有{{parseInt(insuredAmountVO.accidentAmount) / 10000}}万</p>
                        </div>
                        <div class="medical parLife">
                            <span  v-if="showAmount">{{hospitalNum | toInt}}万</span>
                            <p v-if="!showAmount" class="guarantee particular">医疗保障缺口</p>
                            <p v-if="showAmount" class="guarantee">医疗保障缺口</p>
                            <p  v-if="showAmount" class="tips">应有{{parseInt(insuredAmountVO.hospitalizationAmount) / 10000}}万</p>
                        </div>
                        <div class="savings parLife">
                            <span  v-if="showAmount">{{yearNum | toInt}}万</span>
                            <p v-if="showAmount" class="guarantee">储蓄教育及养老保障缺口</p>
                            <p v-if="!showAmount" class="guarantee particular">储蓄教育及养老保障缺口</p>
                            <p v-if="showAmount" class="tips">应有{{parseInt(insuredAmountVO.annuityAmount) / 10000}}万</p>
                        </div>
                    </div>
                    <div class="resultList">
                        <h3>测评分析:</h3>
                        <p>{{description}}</p>
                    </div>
                    <div class="blank"></div>

                <div v-if="relation == '未成年子女'">
                    <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-2 myTabBar">
                        <md-tab-bar
                            v-model="currents"
                            :items="itemChild"
                            :maxLength="4"
                            @change="onChange"
                        />
                    </div>

                    <div class="lifeContent" id="tab3">
                        <img src="@/assets/imgs/evaluation/bannerChild.jpg" @click="goDetail(2)" class="lifePic"/>
                        <div class="productIndruce">
                            <ul>
                                <li><img src="@/assets/imgs/evaluation/qian@2x.png"/>
                                    <p>建议投保额度</p>
                                    <span>{{sicknessNum}}W</span>
                                </li>
                                <li class="parLi"><img src="@/assets/imgs/evaluation/nianling@2x.png"/>
                                    <p>投保年龄</p>
                                    <span>28天~17周岁</span>
                                </li>
                                <img src="@/assets/imgs/evaluation/splitLine.png" class="rules"/>
                            </ul>
                        </div>
                    </div>
                </div>

                  <div v-else>
                      <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-2 myTabBar">
                          <md-tab-bar
                              v-model="currents"
                              :items="items"
                              :maxLength="4"
                              @change="onChange"
                          />
                      </div>

                      <div class="lifeContent" id="tab1">
                          <img src="../../assets/imgs/evaluation/bnner2@2x.png" @click="goDetail(3)" class="lifePic"/>
                          <div class="productIndruce">
                              <ul>
                                  <li><img src="@/assets/imgs/evaluation/qian@2x.png"/>
                                      <p>建议投保额度</p>
                                      <span>{{lifeNum}}W</span>
                                  </li>
                                  <li class="parLi"><img src="../../assets/imgs/evaluation/nianling@2x.png"/>
                                      <p>投保年龄</p>
                                      <span>18周岁~55周岁</span>
                                  </li>
                                  <img src="@/assets/imgs/evaluation/splitLine.png" class="rules"/>
                              </ul>
                          </div>
                      </div>
                      <div class="lifeContent" id="tab2" style="display: none;">
                          <img src="../../assets/imgs/evaluation/bnner1@2x.png" @click="goDetail(1)" class="lifePic"/>
                          <div class="productIndruce">
                              <ul>
                                  <li><img src="../../assets/imgs/evaluation/qian@2x.png"/>
                                      <p>建议投保额度</p>
                                      <span>{{sicknessNum}}W</span>
                                  </li>
                                  <li class="parLi"><img src="../../assets/imgs/evaluation/nianling@2x.png"/>
                                      <p>投保年龄</p>
                                      <span>28天~55周岁</span>
                                  </li>
                                  <img src="../../assets/imgs/evaluation/splitLine.png" class="rules"/>
                              </ul>
                          </div>
                      </div>
                  </div>

                </div>
            </div>
            <div class="btnBox">
                <button class="againTest" @click="againTest(relation)">重新测试</button>
                <!--<button class="shareResult">分享我的结果</button>-->
            </div>
        </div>
        <md-dialog
            title='提示'
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns">
            <p>“根据“双十法则”，“标准普尔四象限法”计算保额缺口”。</p>


        </md-dialog>
    </div>
</template>
<script>
    import { Icon } from 'mand-mobile'
    import { TabBar, Toast, } from 'mand-mobile'
    import '../../assets/animate.min.css'
    import { Picker, Dialog, ActivityIndicator } from 'mand-mobile'
    import '../../assets/evaluation.scss'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import '../../assets/js/bridge'

    export default {
        name: "Report",
        components: {
            [Icon.name]: Icon,
            [TabBar.name]: TabBar,
            [Picker.name]: Picker,
            [Dialog.name]: Dialog,
            Whirl,
            Error
        },
        data() {
            return {
                current: 1,
                showLoad: false,
                currents: 1,
                reportId: '',
                items: [
                    {name: 1, label: '人寿保险'},
                    {name: 2, label: '重疾保险'}
                    /* {name: 3, label: '意外保险'},
                     {name: 4, label: '医疗保险'},
                     {name: 5, label: '储蓄教育及养老保险'}*/
                ],
                itemChild: [
                    {name: 1, label: '重疾保险'}
                    /* {name: 3, label: '意外保险'},
                     {name: 4, label: '医疗保险'},
                     {name: 5, label: '储蓄教育及养老保险'}*/
                ],
                tags: [],
                modelName: '',
                questionOne: true,
                questionFour: false,
                questionSix: false,
                _curModIdx: 1,
                pickerDefaultIndex: [],
                pickerDefaultValue: [],
                pickerValue: '',
                addJson: '',
                insureSex: '',
                life: '',
                sickness: '',
                accident: '',
                hospital: '',
                yearAmount: '',
                relation:'',
                marrirageRelation: '',
                socialFlag: '',
                rangeNum: 18,
                rangeNums: 5,
                description: '',
                bodyHeight: '',
                lifeNum: 0,
                sicknessNum: 0,
                accidentNum: 0,
                particular: false,
                hospitalNum: 0,
                yearNum: 0,
                lastPercent: '',
                myScore: '',
                isClick: true,
                showError: false,
                showWhirl: false,
                avatorUrl: require('../../assets/imgs/evaluation/avaitor.png'),
                tabCurrent: 1,
                //userBiaoShi:'BN2019030212073200001',
                userBiaoShi: '',
                userAllList:[],
                reportUser_id:'',
                insuredAmountVO: {
                    lifeAmount:0,
                    sicknessAmount:0,
                    accidentAmount:0,
                    hospitalizationAmount:0,
                    annuityAmount:0
                },
                showAmount:true,
                isAppBrowser:false,
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确认',
                            handler: this.onBasicConfirm,
                        },
                    ],
                },
            }
        },
        created() {
            this.reportUser_id = this.$router.query('reportUser_id')
            document.title = '智能评测报告'
            this.getUserDetail()
            this.getUserAllDetail()
            let shareImg = this.$refs.shareImg.currentSrc;
            setupWebViewJavascriptBridge(function (bridge) {
                //导航是否显示分享按钮，分享内容先固定死
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                    //'title': '智能评测报告', //标题
                    'flag_share': 1, //是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, //是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': this.$router.siteUrl() + '/evaluation/Evaluation.html', //分享跳转的url
                    'share_title': "百年人寿智能评测", //分享标题
                    'share_text': '测一测你的综合保障指数', //分享描述
                    'share_imgurl': shareImg //分享图片地址
                }, function (response) {
                });
            })
        },
        mounted() {
            this.bodyHeight = document.documentElement.clientHeight
        /*    let result =  this.$app.isBrowser()
            if(!result){
                this.getReportResult(this.reportUser_id)
                this.isAppBrowser = true
                document.getElementById('myReport').style.display = 'none'
                document.getElementById('conD').style.display = 'block'
            }*/
        },
        methods: {

            getReportResult(id){
                 window.location.href = this.$router.siteUrl() + '/evaluation/ReportDetail.html?reportUser_id='+id
                //  window.location.href = 'http://localhost:8080/evaluation/reportdetail?reportUser_id='+ id

            },
            getUserAllDetail() {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/evaluation/list`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            that.userAllList = data
                        },
                        failFn: () => {
                            that.showError = true
                        }
                    })
                })

            },
            getUserDetail() {
                let that = this
                this.$app.getToken(function (userToken) {
                    that.$request({
                        url: `/vip/user/current`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            if(data.avator){
                                that.avatorUrl = data.avator
                            }
                        },
                        failFn: () => {
                            //that.showError = true
                        }
                    })
                })

            },
            againTest(item){
                if(this.isAppBrowser){
                    window.location.href = this.$router.siteUrl()+ '/evaluation/Evaluation.html?report_id=1'
                }else{
                    if(item == '本人'){
                        window.location.href = this.$router.siteUrl()+ '/evaluation/Evaluation.html?report_id=1'
                    }else{
                        window.location.href = this.$router.siteUrl() + '/evaluation/Evaluation.html?report_id=2'
                    }

                }

            },
            onChange(item, index, prevIndex) {
                // Toast.info(`index: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`)
                if (index == 0) {
                    document.getElementById('tab1').style.display = 'block'
                    document.getElementById('tab2').style.display = 'none'
                } else if (index == 1) {
                    document.getElementById('tab1').style.display = 'none'
                    document.getElementById('tab2').style.display = 'block'
                }
            },

          /*  getEvaluationResult(){

                let that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('getUser'
                        , {'id': 2}, function (responseData) {
                            responseData = JSON.parse(responseData)
                            let userCode = responseData.data

                            that.$request({
                                // url: `/ins/product/product/risk/${this.reportId}`,
                                url: `/vip/evaluation/share/${userCode}`,
                                params: {},
                                successFn: (data) => {
                                    that.description = data.description
                                    that.lifeNum = parseInt(data.insuredGapVO.lifeGap) / 10000
                                    that.sicknessNum = parseInt(data.insuredGapVO.sicknessGap) / 10000
                                    that.accidentNum = parseInt(data.insuredGapVO.accidentGap) / 10000
                                    that.hospitalNum = parseInt(data.insuredGapVO.hospitalizationGap) / 10000
                                    that.yearNum = parseInt(data.insuredGapVO.annuityGap) / 10000
                                    that.lastPercent = data.lastPercent
                                    that.tags = data.tags
                                    that.myScore = data.vipUserEvaluation.score
                                    that.insuredAmountVO = data.insuredAmountVO
                                },
                                failFn: () => {
                                    that.showWhirl = false
                                    that.showError = true
                                }
                            })
                        }
                    )
                })
            },*/
            goDetail(index){
                window.location.href = this.$router.siteUrl() + '/product/Detail.html?product_id=' + index
            }
        },
        filters: {
            toInt(value) {
                return parseInt(value);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .conD {
        background: url("../../assets/imgs/evaluation/endBg.png") no-repeat !important;
        background-size: cover;
        height: 100%;
        overflow-x: hidden;
        // height: 165%;
        .conTop {
            padding-top: 90px;
            margin-left: 30px;
            position: relative;
            width: 100%;
            img {
                display: inline-block;
                height: 120px;
                width: 120px;
            }
            span {
                position: absolute;
                top: 100px;
                font-size: 40px;
                color: #fff;
                left: 1.8rem;
            }
            .resultTag {
                display: inline-block;
                position: absolute;
                top: 2rem;
                li {
                    margin-left: 28px;
                    margin-top: 20px;
                    display: inline-block;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    width: 115px;
                    height: 36px;
                    background: #129EC0;
                    line-height: 36px;
                    padding: 5px;
                    text-align: center;
                    color: #47C9DF;
                }
            }
        }
        .conMid {
            margin-top: 50px;
            margin-left: 30px;
            margin-right: 30px;
            .gap {
                width: 690px;
                height: 112px;
                background: url("../../assets/imgs/evaluation/endTop.png") no-repeat left top;
                background-size: 100%;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                font-size: 36px;
                color: #fff;
                text-align: center;
                line-height: 112px;
            }
            .Analysis {
                height: 100%;
                padding-top: 156px;
                position: relative;
                .bgPic {
                    width: 484px;
                    margin-left: 104px;
                    height: 484px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border: 1px dashed #8E8E8E;
                }
                .parLife {
                    height: 160px;
                    position: absolute;
                    width: 160px;
                    background: #1CBECB;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    .tips {
                        position: absolute;
                        top: 170px;
                        left: 30px;
                        width: 2rem;
                    }
                    .guarantee {
                        position: absolute;
                        left: 15px;
                        top: 85px;
                        color: #fff;
                        font-size: 22px;
                    }
                    span {
                        position: absolute;
                        left: 35px;
                        top: 30px;
                        font-size: 40px;
                        color: #fff;
                    }
                }
                .life {
                    top: 65px;
                    left: 266px;
                }
                .illness {
                    top: 232px;
                    left: 504px;
                }
                .accident {
                    top: 232px;
                    left: 26px;
                }
                .medical {
                    top: 500px;
                    left: 418px;
                }
                .savings {
                    top: 500px;
                    left: 112px;
                }
                .midPic {
                    position: absolute;
                    top: 294px;
                    left: 258px;
                    img {
                        height: 212px;
                        width: 176px;
                    }
                    .lastUser {
                        position: absolute;
                        color: #fff;
                        font-size: 22px;
                        left: .3rem;
                        width: 3rem;
                        top: 1.7rem;
                    }
                    .userScore {
                        top: .55rem;
                        left: 1rem;
                        position: absolute;
                        color: #FFFD06;
                        font-size: 28px;
                        span {
                            font-size: 64px;
                        }
                    }
                }

            }
            .resultList {
                margin-top: 86px;
                margin-left: 32px;
                margin-right: 32px;
                h3 {
                    font-size: 28px;
                    color: #19B3C7;
                }
                p {
                    margin-top: 20px;
                    color: #333;
                    line-height: 36px;
                    font-size: 26px;
                }
            }
            .blank {
                margin-top: 60px;
                height: 22px;
                width: 100%;
                background: #F2F2F2;
                margin-bottom: 60px;
            }
        }

        .lifeContent {
            padding: 0 26px;
            margin-top: 36px;
            .lifePic {
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                height: 259px;
                width: 659px;
            }
            .productIndruce {
                display: flex;
                position: relative;
                ul {
                    li {
                        display: inline-block;
                        position: relative;
                        padding-left: 36px;
                        padding-bottom:75px;
                        p {
                            position: absolute;
                            width: 4rem;
                            left: 1.2rem;
                            font-size: 28px;
                            top: .5rem;
                            color: #333;
                        }
                        span {
                            position: absolute;
                            left: 1.2rem;
                            display: block;
                            top: 1rem;
                            width: 4rem;
                            font-size: 28px;
                            color: #E30513;
                        }
                        img {
                            margin-top: 40px;
                            width: 40px;
                            height: 40px;

                        }
                    }
                    .parLi {
                        margin-left: 230px;
                    }
                    .rules {
                        position: absolute;
                        height: 90px;
                        width: 2px;
                        top: .4rem;
                        left: 4rem;
                    }
                }
            }
        }
        .btnBox {
            margin-top: 1rem;
            text-align: center;
            padding-bottom: 1rem;
            button {
                width: 320px;
                height: 88px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                font-size: 32px;

            }
            .againTest {
                color: #fff;
                background: #31CEDC;
            }
            .shareResult {
                color: #31CEDC;
                margin-left: 54px;
                background: #fff;
                border: 1px solid #31CEDC;
            }
        }
        .conK {
            background: #fff;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    .myAvator{
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .myReport {
        min-height:calc(100vh) ;
        background: url("../../assets/imgs/evaluation/bg@2x.png") no-repeat;
        height: 100%;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        .reportTitle {
            padding-top: 100px;
            padding-left: 34px;
            font-size: 32px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            .riskReport {
                line-height: 44px;
                overflow: hidden;
            }
            .riskTag {
                position: relative;
                background: #3ACCDD;
                padding: 15px 25px 15px 65px;
                float: right;
                -webkit-border-radius: 50px;
                -moz-border-radius: 50px;
                border-radius: 50px;
                margin-right: .8rem;
                margin-top: -.7rem;
                img {
                    position: absolute;
                    display: inline-block;
                    width: 35px;
                    height: 30px;
                    left: .4rem;
                    top: .22rem;
                }

            }
        }
        .reportContent {
            margin-top: .5rem;
            overflow: hidden;
            .reportS {
                position: relative;
                width: 94%;
                margin-left: 3%;
                background: #fff;
                overflow: hidden;
                margin-top: .25rem;
                margin-bottom: .25rem;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                h2 {
                    display: inline-block;
                    margin-top: 30px;
                    margin-left: 36px;
                }
                ul {
                    margin-left: 0.15rem;
                    max-width: 7.5rem;
                    li {
                        margin-top: .3rem;
                        display: inline-block;
                        font-size: 26px;
                        margin-left: 0.2rem;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(85, 207, 227, 1);
                        padding: 10px 20px;
                        background: rgb(229, 249, 253);
                        -webkit-border-radius: 20px;
                        -moz-border-radius: 20px;
                        border-radius: 20px;
                    }
                }
                .description {
                    margin-top: .5rem;
                    width: 92%;
                    margin-left: 4%;
                    font-size: 24px;
                    color: #8e8e8e;
                    line-height: .5rem;
                    max-height: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .reportDetail {
                    margin-top: 30px;
                    float: right;
                    margin-right: .7rem;
                    position: relative;
                    margin-bottom: .5rem;
                    p {
                        display: inline-block;
                        margin-right: .5rem;
                        color: #1ECACF;
                        font-size: .4rem;
                    }
                    img {
                        position: absolute;
                        display: inline-block;
                        top: -0rem;
                        right: -.2rem;
                        width: .3rem;
                        height: .4rem;
                    }
                }
            }
            .lastPercent {
                float: right;
                position: absolute;
                top: .2rem;
                right: .4rem;
                img {
                    width: 2rem;
                    height: 2.2rem;
                }
                .userScore {
                    position: absolute;
                    color: #FFFD06;
                    font-size: 0.37333rem;
                    width: 2rem;
                    text-align: center;
                    /* left: .35rem; */
                    top: .2rem;
                    span {
                        font-size: 64px;
                    }
                }
                .lastUser {
                    top: 1.2rem;
                    display: inline-block;
                    text-align: center;
                    width: 2rem;
                    /* left: .3rem; */
                    position: absolute;
                    color: #fff;
                }
            }
        }
    }

    .particular{
        top: .9rem !important;
    }
</style>
