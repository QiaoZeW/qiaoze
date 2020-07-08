<template>
    <section>
        <div class="bgTop parts" v-show="bgTopUrl === ''"></div>
        <img v-show="bgTopUrl !== ''" :src="bgTopUrl" class="bgTop"/>
        <p class="beanDes" v-show="showTip">*百佳豆有效期一年</p>
        <h3>新手任务-豆子拿到手软</h3>
        <div class="partThree">
            <div class="task01" v-for=" (item,key) in newTask" :key="key">
               <p class="task01Left">任务{{key + 1}}</p>
               <div class="task01Mid">
                   <p>{{item.title}}</p>
                   <p>{{item.des}}</p>
               </div>
                <div class="submitBox">
                    <button class="task04Btn" v-if="key === 3">去参加</button>
                    <div v-else>
                        <button class="task04Btn" v-if="item.status === '0'"  @click="goDetail(item)">去领取</button>
                        <button  v-else-if="item.status === '1'">已完成</button>
                    </div>

                </div>
            </div>
        </div>

        <h3 v-show="showPartOne">热门任务</h3>
        <div class="partOne"  v-show="showPartOne">
            <div class="part_first">
                <div class="parList" v-for="item in taskList">
                    <div class="partOneLeft">
                        <div class="partIcon"><img :src="item.taskIconPicture" class="icon"/></div>
                        <div class="desc">
                            <p class="descOne">{{item.taskTitle}}</p>
                            <p class="descTwo"
                               v-if="item.taskCode === 'TASK_ADD_COMMON_INSURED' ||item.taskCode === 'TASK_BIND_BANK_CARD'">
                                奖励{{item.rewardScore}}豆（初次添加奖励）</p>
                            <p class="descTwo" v-else>奖励{{item.rewardScore}}豆</p>
                        </div>
                    </div>

                    <button class="status_01" v-show="item.taskStatus === '2'" @click="goComplete(item)">去完成</button>
                    <button class="status_02" v-show="item.taskStatus === '1'" @click="goReceive(item)">立即领取</button>
                    <button class="status_02"
                            v-show="item.taskStatus === '3' && (item.taskCode === 'TASK_ADD_COMMON_INSURED' || item.taskCode ==='TASK_BIND_BANK_CARD')"
                            @click="continueAdd(item)">
                        继续添加
                    </button>
                    <button class="status_03"
                            v-show="item.taskStatus === '3' && item.taskCode !== 'TASK_ADD_COMMON_INSURED' && item.taskCode !=='TASK_BIND_BANK_CARD'">
                        已完成
                    </button>
                </div>
            </div>
        </div>
        <h3  >选择礼包—限量兑换</h3>
        <div class="partFour">
            <ul>
                <li><img src="@/assets/imgs/taskCenter/1.png" @click="goPicDetail(1)" /></li>
                <li><img src="@/assets/imgs/taskCenter/2.png" @click="goPicDetail(2)"/></li>
                <li><img src="@/assets/imgs/taskCenter/3.png" @click="goPicDetail(3)" /></li>
                <li><img src="@/assets/imgs/taskCenter/4.png" @click="goPicDetail(4)" /></li>
            </ul>
        </div>
        <div class="partTwo"  v-show="showPartTwo">
            <h3>更多福利</h3>
            <ul>
                <li v-for="item in activityList">
                    <img :src="item.listPicture" @click="goActivity(item)"/>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import {goNative} from '@/utils/nativeUtils'
    import {Toast} from "mand-mobile";

    export default {
        name: "TaskCenter",
        data() {
            return {
                activityList: [],
                taskList: [],
                showPartOne:false,
                showPartTwo:false,
                showPartTop:false,
                bgTopUrl:'',
                showTip:false,
                newTask:[
                    {
                        'title':'注册百年APP',
                        'des':'奖励：最高18800豆',
                        'status':'0',  //0 去领取 1 已完成
                        'linkUrl':'/activity/Register.html'
                    },
                    {
                        'title':'领取成长礼包',
                        'des':'奖励：最高22000豆',
                        'status':'0',
                        'linkUrl':''
                    },
                    {
                        'title':'浏览产品',
                        'des':'奖励：100豆起(每月可领取一次)',
                        'status':'0',
                        'linkUrl':'/activity/Gathering.html'
                    },
                    {
                        'title':'走路赢大礼',
                        'des':'奖励：99~999豆不限量及金条',
                        'linkUrl':'/activity/step/StepNew.html'
                    }
                ]
            }
        },
        created() {
            console.log(3);
            let that = this
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    that.$app.getCurrentToken((userToken)=>{
                        if(userToken && userToken !== ''){
                            that.getStatus()
                            that.judgeGathering()
                            that.judgeRegister()
                            that.judgeVip()
                        }
                    })

                }
            }, false);

            this.loadTopBg()
        },
        mounted(){
            this.$app.getCurrentToken((userToken)=>{
                if(userToken && userToken !== ''){
                    this.showPartOne = true
                    this.showTip = true
                    this.judgeGathering()
                    this.judgeRegister()
                    this.getStatus()
                    this.judgeVip()
                }
            })
           setTimeout(()=>{
               this.getActivityList()
           },500)
        },
        methods: {
            /**
             * @author joe
             * @date 2019/11/18
             * @Description: 获取顶部图片
            */
            loadTopBg(){
                this.$request({
                    url: `/cms/content/image?moduleType=14`,
                    contentType: "application/json;charset=UTF-8",
                    successFn: data => {
                        this.bgTopUrl = data[0].imageUrl
                        console.log(data);
                    },
                    failFn: data => {
                        Toast.info(data.resultMsg)
                    }
                });
            },
            //判断用户有没有注册
            judgeRegister() {
                this.$app.getToken((userToken)=> {
                    this.$request({
                        url: `/cms/cmsActivity/getRegister`,
                        contentType: 'application/json;charset=UTF-8',
                        isLoading: true,
                        userToken: userToken,
                        successFn: (data) => {
                            //是否领取
                            if (data === '0') {  //0 未领取
                                this.newTask[0].status = '0'
                            } else {
                                this.newTask[0].status = '1'
                            }
                        },
                        failFn: (data) => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            //判断用户有没有领取升级礼包
            judgeVip() {
                this.$app.getToken((userToken)=> {
                    this.$request({
                        url: `/vip/grade/details`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            console.log('111',data);
                            this.rank = data.rank
                            this.newTask[1].linkUrl = '/vipUser/Vip.html?current_level=' + this.rank
                            if (data.giftRecordList.find((item) => item.giftRank === data.rank && item.giftType === 1)) {
                                this.newTask[1].status = '0'
                            } else {
                                this.newTask[1].status = '1'
                            }
                        },
                        failFn: () => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            judgeGathering() {
                this.$app.getToken((userToken) =>{
                    this.$request({
                        url: `/assembly/isGathering`,
                        params: {},
                        userToken: userToken,
                        successFn: (data) => {
                            if (data === '1') {  //去领取
                                this.newTask[2].status = '0'
                            } else if (data === '0') {
                                this.newTask[2].status = '1'
                            }
                        },
                        failFn: () => {
                            Toast.info(data.resultMsg)
                        }
                    })
                })
            },
            /**
             * @author joe
             * @date 2019/11/15
             * @Description: 完成任务点击立即领取
             */
            goReceive(item) {
                this.$app.getToken((userToken) => {
                    let data = {
                            "taskCode": item.taskCode
                    }
                    this.$request({
                        url: `/cms/taskCenter/taskScoresReceive`,
                        method: 'POST',
                        contentType: "application/json;charset=UTF-8",
                        userToken: userToken,
                        isEncript:true,
                        params: data,
                        successFn: data => {
                            Toast.info('已领取成功')
                            setTimeout(()=>{
                                this.getStatus()
                            },1000)
                        },
                        failFn: data => {
                            Toast.info(data.resultMsg)
                        }
                    });
                })
            },
            /**
             * @author joe
             * @date 2019/11/15
             * @Description: 去更多活动详情
             */
            goActivity(item){
                location.href = item.linkUrl
            },
            goPicDetail(index){
                this.$app.getToken((userToken)=>{
                    if(userToken){
                        switch (index){
                            case 1:
                            location.href = 'https://bnonline.aeonlife.com.cn/bnonlineimg/h5/20200401162413/bnVip/index.html'
                            break;
                            case 2:
                            location.href = 'https://bnonline.aeonlife.com.cn/activity/IntegralExchange/ScoreExNew.html'
                            break;
                            case 3:
                            location.href = 'https://bnonline.aeonlife.com.cn/activity/IntegralExchange/ScoreExNew.html'
                            break;
                            case 4:
                            return false
                            break;
                        }
                    }
                })
            },
            goDetail(item){
                this.$app.getToken((userToken)=>{
                    if(userToken && userToken !== ''){
                        location.href = item.linkUrl
                    }
                })

            },
            /**
             * @author joe
             * @date 2019/11/15
             * @Description: 去完成任务 判断并跳原生
             */
            goComplete(item) {
                switch (item.taskCode) {
                    /**
                     * @author joe
                     * @date 2019/11/15
                     * @Description: 绑定微信：1
                     绑定银行卡：2
                     绑定支付宝：3
                     添加常用被保人：4
                     实名认证：5
                     */
                    case 'TASK_BIND_ALIPAY':
                        goNative(3)
                        break;
                    case 'TASK_BIND_BANK_CARD':
                        goNative(2)
                        break;
                    case 'TASK_ADD_COMMON_INSURED':
                        goNative(4)
                        break;
                    case 'TASK_BIND_WECHAT':
                        goNative(1)
                        break;
                    case 'TASK_REAL_NAME_AUTHENTICATION':
                        goNative(5)
                        break;
                }
            },
            continueAdd(item) {
                if (item.taskCode === 'TASK_ADD_COMMON_INSURED') {
                    goNative(4)
                } else if (item.taskCode === 'TASK_BIND_BANK_CARD') {
                    goNative(2)
                }
            },
            /**
             * @author joe
             * @date 2019/11/15
             * @Description:  获取各个任务的状态
             */
            getStatus() {
                this.$app.getToken((userToken) => {
                    this.$request({
                        url: `/cms/taskCenter/getTaskInfoList`,
                        method: 'POST',
                        isLoading:true,
                        contentType: "application/json;charset=UTF-8",
                        userToken: userToken,
                        successFn: data => {
                            this.taskList = data.cmsTaskCenterVoList
                            this.showPartOne = true
                            console.log(this.taskList);
                        },
                        failFn: data => {
                            Toast.info(data.resultMsg)
                        },
                        errorFn: () => {
                        }
                    });
                })
            },
            /**
             * @author joe
             * @date 2019/11/15
             * @Description:  获取活动列表
             */
            getActivityList() {
                this.$request({
                    url: `/cms/cmsActivity/getActivityCenterList`,
                    contentType: "application/json;charset=UTF-8",
                    successFn: data => {
                        this.activityList = data
                        this.showPartTwo = true
                        console.log(this.activityList);
                    },
                    failFn: data => {
                    },
                    errorFn: () => {
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        padding: 44px 30px 100px;
        background: #F7F4F8;
        position: relative;
        h3 {
            margin-top: 44px;
            margin-left: 10px;
            font-size: 36px;
            color: #333333;
            font-weight: bold;
        }
        .bgTop {
            width: 100%;
            border-radius: 16px;
            min-height: 312px;
        }
        .parts{
            background: #ECECEC;
        }
        .partOne {
            margin-top: 37px;
            border-radius: 16px;
            background: #fff;
            .part_first {
                margin-top: 30px;
                padding: 0 22px;
                border: 1px solid #F8F8F8;
                border-radius: 16px;
                box-shadow: 0 0 8px #F5F5F5;
                -webkit-box-shadow: 0 0 8px #F2F2F2;

                .parList {
                    padding-top: 48px;
                    padding-bottom: 48px;
                    border-bottom: 1px solid #F2F2F2;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .partOneLeft {
                        display: flex;
                        align-items: center;
                    }

                    .desc {
                        display: inline-block;
                        line-height: 45px;
                        margin-left: 30px;

                        .descOne {
                            font-size: 28px;
                            font-family:FZLTZHUNHJW;
                            font-weight:bold;
                            color:rgba(0,0,0,1);
                        }

                        .descTwo {
                            font-size: 26px;
                            font-family:FZLTXIHJW;
                            font-weight:normal;
                            color:rgba(0,0,0,1);
                            opacity:0.6;
                        }
                    }

                    button {
                        width:143px;
                        height:56px;
                        border-radius: 50px;
                        line-height: .5rem;
                        font-size: 26px;
                    }

                    .status_01 {
                        background: #E10312;
                        color: #fff;
                    }

                    .status_02 {
                        background: #FEA61B;
                        color: #fff;
                    }

                    .status_03 {
                        background: #ECECEC;
                        color: #878787;
                    }
                }

                .parList:last-child {
                    border-bottom: 0 !important;
                }
            }
        }

        .partTwo {
            margin-top: 52px;

            h3 {
                margin-left: 10px;
                font-size: 36px;
                color: #333333;
                font-weight: bold;
            }

            ul {
                li {
                    img {
                        width: 100%;
                        border-radius: 16px;
                        margin-top: 30px;
                        max-height: 284px;
                    }
                }
            }
        }

        .partIcon {
            width: 90px;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon {
            max-width: 82px;
            min-width: 70px;
            max-height: 100%;
            display: inline-block;
        }
    }
    .partThree{
        div:last-child{
            border: none;
        }
    }
    .partThree {
        margin-top: 37px;
        border-radius: 16px;
        background: #fff;
        padding: 0 22px;
    }
    .task01{
        display: flex;
        padding: 38px 0 40px;
        border-bottom: 1px solid #F2F2F2;

        .task01Left{
            display: inline-block;
            font-size:32px;
            font-family:FZLTZHUNHJW;
            font-weight:bold;
            color:rgba(180,13,29,1);
        }
        .task01Mid{
            display: inline-block;
            padding-left: 0.37333rem;
            flex: 1;
            p:first-child{
                font-size:28px;
                font-family:FZLTZHUNHJW;
                font-weight:bold;
                color:rgba(0,0,0,1);
                line-height: .6rem;
            }
            p:last-child{
                font-size:26px;
                margin-top: .1rem;
                font-family:FZLTXIHJW;
                font-weight:normal;
                color:rgba(0,0,0,1);
                opacity:0.6;
            }
        }
        .submitBox{
            padding-top: .25rem;

            .task04Btn{
                background: #E10312;
                color: #fff;
            }
            button{
                width:143px;
                height:56px;
                line-height: .6rem;
                background: #ECECEC;
                color: #878787;
                border-radius:28px;
                font-size:28px;
                font-family:FZLTZHUNHJW;
                font-weight:normal;
            }
        }
    }
    .beanDes{
        position: absolute;
        font-size:28px;
        right: 0;
        margin-top: .15rem;
        margin-right: 30px;
        font-family:FZLTZHUNHJW;
        font-weight:normal;
        color:rgba(102,102,102,1);
    }
    .partFour{
        margin-top: 44px;
        padding: 9px 38px 36px;
        border-radius:20px;
        background: #CE2833;

        img{
            width: 287px;
            height: 133px;
            display: inline-block;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                margin-top: 22px;
                display: inline-block;
            }
        }
    }
</style>
