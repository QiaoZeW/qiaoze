<template>
    <section>
        <div  :class="status !== 1?'parThere':'bgTop'"></div>
        <div  ref="content" :class="status !==1?'content':'contentS'">
            <div class="contentTop particular parS" v-if="status !== 1">
                <div class="name">
                    <img src="@/assets/imgs/groupBuying/name.png" />
                    <input class="myInput" :readonly="onlyRead" placeholder="请输入您的姓名" v-model="name" type="text" @blur="checkName(name)" @click="isLogin" maxlength="20" >
                </div>
                <div class="idNo">
                    <img src="@/assets/imgs/groupBuying/idNo.png" />
                    <input class="myInput"  :readonly="onlyRead" placeholder="请输入您的身份证号码" v-model="idNo" type="text" oninput="value=value.replace(/[^\dXx]/g,'')" @blur="checkCard(idNo)" @click="isLogin" maxlength="18"  >
                </div>
                <div class="verification">
                    <p class="goVerification" @click="goVerification">验证身份 管理保单</p>
                </div>
            </div>
            <div class="contentTop particular">
                <img src="@/assets/imgs/groupBuying/oneTitle.png" class="oneTitle"/>
                <div class="activityList">
                    <ul class="activityListOne" v-if="showChangePic">
                        <li><img src="@/assets/imgs/groupBuying/partOneLight.png" v-if="showPartOne"  /> <img src="@/assets/imgs/groupBuying/partOne.png" v-else @click="goActivityOne"/> <br> <p>验证身份证成为团长，团长或团员体验线上管理保单即可享</p> </li>
                        <li><img src="@/assets/imgs/groupBuying/partTwoLight.png" v-if="showPartTwo"  /> <img src="@/assets/imgs/groupBuying/partTwo.png"  v-else @click="goActivityTwo"/>  <br> <p>邀请好友体验线上管理保单的人数≥3位，全团皆享</p> </li>
                    </ul>
                    <ul class="activityListOne" v-else>
                        <li><img src="@/assets/imgs/groupBuying/partThree.png"  /> <br> <p>邀请10位好友体验线上管理保单的前300位团长</p> </li>
                        <li> <img src="@/assets/imgs/groupBuying/partFour.png"  /> <br> <p>邀请10位好友体验线上管理保单</p> </li>
                    </ul>
                </div>
                <p class="changeTab" @click="showChangePic = !showChangePic"><img src="@/assets/imgs/groupBuying/change.png"  /> 换一批</p>
            </div>
            <div class="contentTop particular">
                <img src="@/assets/imgs/groupBuying/myInvite.png" class="myInvite"/>
                <ul class="myInviteOne">
                    <li><img src="@/assets/imgs/groupBuying/successInvite.png"  /> <p>在线体验单数</p> <br> <span>{{countTeamOrder}}</span></li>
                    <li><img src="@/assets/imgs/groupBuying/myMember.png"  /><p>我的团员人数</p> <br> <span class="parT">{{countTeamMember}}</span></li>
                </ul>
                <div class="verification inviteFriend">
                    <p class="goVerification"  @click="showShare">邀请好友</p>
                </div>
                <div class="rule">
                    <img src="@/assets/imgs/groupBuying/rule.png"/>
                    <p class="ruleDetail">
                        <b>一、活动对象：</b><br>
                        百年人寿APP用户<br>
                        <b>二、活动时间：</b><br>
                        2019年8月20日至2019年10月4日<br>
                        <b>三、活动规则和权益：</b><br>
                        <b>权益①：</b>用户验证身份证成为团长，团长或团<br>
                        <span v-if="!showMoreRule" class="loadMore" @click="showMoreRule = true">展开更多  <md-icon
                            name="arrow-down"
                            size="md"
                        ></md-icon></span>
                        <span v-if="showMoreRule">
                           体验线上管理保单，全团（团长和所有团员）开启9.9元起包邮特卖专场权益<br>
                           <b>权益②：</b>团长邀请好友体验线上管理保单的数量达到3单及3单以上，全团（团长和所有团员）开启名牌产品3折起专场权益<br>
                           <b>权益③：</b>前300位邀请体验线上管理保单的数量达到10单的团长获得罗莱被子一条（达标团长将通过短信通知领取，请注意查收）<br>
                           <b>权益④：</b>邀请体验线上管理保单数量最多的3位团长将获得华为手机P30 PRO（活动结束后10个工作日内安排发货）<br>
                        <span class="loadMore"  @click="showMoreRule = false">收起  <md-icon
                            name="arrow-up"
                            size="md"
                        ></md-icon></span>
                       </span>
                    </p>
                </div>
            </div>
            <p class="finalExplain">
                *本活动最终解释权归百年人寿所有
            </p>
            <md-dialog
                :closable="true"
                v-model="activityDialog.open"
            >
                <p  class="dialogContent"> 华为p30将在2019年10月20日由系统抽奖产生</p>
            </md-dialog>
        </div>
    </section>
</template>

<script>
    import {Toast ,Dialog} from  'mand-mobile'
    export default {
        name: "groupBuying",
        data(){
            return{
                status: 1,   //1------登录实名   2------登录未实名  3------未登录
                name:'',
                idNo:'',
                showChangePic:true,
                countTeamMember:0,
                countTeamOrder:0,
                activityDialog: {
                    open: false,
                },
                onlyRead:null,
                shareImg:require('@/assets/imgs/groupBuying/wxShare.png'),
                isLogins:false,
                showPartOne:true,
                showPartTwo:true,
                showPartThree:true,
                showMoreRule:false
            }
        },
        created(){
            window.localStorage.clear()
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    window.location.reload()
                }
            }, false);
            this.confirmReal()


        },
        mounted(){
            this.$app.getCurrentUserCode((userCode)=>{
                if(userCode && userCode !== ''){
                    this.isLogins = true
                    setupWebViewJavascriptBridge((bridge)=> {
                        bridge.callHandler('navigationConfig', {
                            share_data: '',
                            flag_show: 1,
                            flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                            title: '', //标题
                            flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                            flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                            share_url: this.$router.siteUrl() + '/activity/WarmGreetings.html?inviterCode=' + userCode, //分享跳转的url
                            share_title: 'Hi,你的好友送来一条被子。', //分享标题
                            share_text: '让还在奋斗的你多一份温暖和保障', //分享描述
                            share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                        }, function (response) {
                        })
                    })
                }else{
                    this.isLogins = false
                }
            })
            console.log(this.status);
        },
        methods:{
            goActivityOne(){
                location.href = 'https://shop40212583.youzan.com/v2/feature/08lKxWfluD'
            },
            goActivityTwo(){
                location.href = 'https://shop40212583.youzan.com/v2/feature/mBMBkVZ1ZA'
            },
            goActivityThree(){
                this.activityDialog.open = true
            },
            confirmReal(){
                this.$app.getCurrentToken((userToken)=>{
                    if(userToken && userToken !== ''){
                        this.onlyRead = false
                        this.$request({
                            url: `/vip/user/current`,
                            userToken: userToken,
                            isLoading: true,
                            contentType: 'application/json',
                            successFn: (data) => {
                                if(data.isReal === '1'){
                                    this.status = 1
                                    this.getInviteNum()
                                }else{
                                    this.status = 2
                                }
                                console.log(this.status);
                            },
                            failFn: (data) => {
                            }
                        })
                    }else{
                        this.onlyRead = true
                        this.status = 3
                    }
                })
            },
            isLogin(){
                this.$app.getToken(()=>{})
            },
            goVerification(){
                if(!this.isLogins){
                    this.isLogin()
                    return false
                }
                if(this.name === ''){
                    Toast.info('姓名不可为空！')
                    return
                }
                if(this.idNo === ''){
                    Toast.info('身份证号不可为空！')
                    return
                }
                let data = {
                    "cardNo": this.idNo,
                    "cardType": '0',
                    "isReal": "1",
                    "name": this.name,
                }
                console.log(JSON.stringify(data));
                this.$app.getToken((userToken)=>{
                    this.$request({
                        url: '/vip/user/vipUserReal',
                        userToken: userToken,
                        isLoading:true,
                        method: 'PUT',
                        data:data,
                        contentType: 'application/json;charset=UTF-8',
                        successFn: (data) => {
                            this.getInviteNum()
                            this.status = 1
                        },
                        failFn: (data) => {
                            Dialog.alert({content: data.resultMsg})
                        }
                    })
                })
            },

            v_trim(s) {
                return s.replace(/\s/g, '');
            },
            // 校验身份证
            checkCard(item) {
                const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                var idCard = this.v_trim(item);
                if (regIdCard.test(this.v_trim(idCard))) {
                    if (idCard.length == 18) {
                        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                        var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
                        var idCardLast = idCard.substring(17); // 得到最后一位身份证号码
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    Toast.failed('您输入的身份证格式不正确！')
                    return false;
                }
            },
            checkName(name) {
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!regName.test(name)) {
                    Toast.failed('您输入的姓名格式不正确！')
                    return false;
                } else {
                    return true
                }
            },
            getInviteNum(){
                this.$app.getCurrentToken((userToken)=>{
                    this.$request({
                        url: '/vip/vipUserInviteRecord/getInviteCount',
                        userToken: userToken,
                        isLoading:true,
                        contentType: 'application/json;charset=UTF-8',
                        successFn: (data) => {
                            console.log(data);
                            this.countTeamMember = data.countTeamMember
                            this.countTeamOrder = data.countTeamOrder
                            if(this.countTeamOrder >= 1){
                                this.showPartOne = false
                            }
                            if(this.countTeamOrder >= 3){
                                this.showPartTwo = false
                            }
                            if(this.countTeamOrder >= 10){
                                this.showPartThree = false
                            }
                        },
                        failFn: (data) => {
                            if(data.resultCode !== 'SYS_ERROR_0088'){
                                Toast.info(data.resultMsg)
                            }
                        }
                    })
                })
            },
            showShare(){
                this.$app.getUserCode(userCode=>{
                    if(userCode && userCode !== ''){
                        if(userCode.substring(0,2) === 'BN'){
                            setupWebViewJavascriptBridge((bridge)=> {
                                //导航是否显示分享按钮
                                bridge.callHandler(
                                    "shareActive",
                                    {
                                        share_data: '',
                                        flag_show: 1,
                                        flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                                        title: '', //标题
                                        flag_share: 1, //是否显示分享按钮，1-显示 0-不显示
                                        flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                                        share_url: this.$router.siteUrl() + '/activity/WarmGreetings.html?inviterCode=' + userCode, //分享跳转的url
                                        share_title: 'Hi,你的好友送来一条被子。', //分享标题
                                        share_text: '让还在奋斗的你多一份温暖和保障', //分享描述
                                        share_imgurl: this.$router.siteUrl() + this.shareImg //分享图片地址
                                    },
                                    function (response) {
                                        //alert(response,'');
                                    }
                                );
                            });
                        }else{
                            return false
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .contentTop{
        -webkit-border-radius: 26px;
        -moz-border-radius: 26px;
        border-radius: 26px;
        background: #ffefed;
        margin: 0 26px;
        box-shadow:  0 0 1.5rem #ffcbbb inset;
        .oneTitle{
            width: 474px;
            height: 46px;
            margin: 0 auto;
            padding-top: 42px;
        }
        .myInvite{
            width: 356px;
            height: 46px;
            margin: 0 auto;
            padding-top: 42px;
        }
        .activityList{
            .activityListOne{
                display: flex;
                li{
                    flex: 1;
                    display: inline-block;
                    img{
                        width: 312px;
                        height: 380px;
                        margin: 46px auto 0;
                    }
                    p{
                        max-width: 282px;
                        line-height:34px;
                        margin-left: 35px;
                        font-size: 26px;
                        color:rgba(242,70,32,1);
                        min-height: 1.4rem;
                    }
                }
            }
            .activityTwo{
                img{
                    width: 312px;
                    height: 380px;
                }
                p{
                    max-width: 282px;
                    line-height:34px;
                    margin-left: 35px;
                    font-size: 26px;
                    color:rgba(242,70,32,1);
                }
            }
        }
        .changeTab{
            margin-top: 32px;
            text-align: center;
            line-height:36px;
            padding-bottom: 36px;
            img{
                display: inline-block;
                width: 26px;
                height: 20px;
            }
        }
        .name{
            position: relative;
            width: 570px;
            margin: 0 auto;
            img{
                position: absolute;
                width: 34px;
                height: 32px;
                top:50%;
                transform :translateY(-50%);
                left: .3rem;
            }

        }
        .myInput{
            display: block;
            margin: 0 auto;
            height: 86px;
            width: 570px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            font-size: 30px;
            border-radius: 10px;
            border: 1px solid #EB493E;
            padding-left:70px ;
            outline: none;
            box-sizing: border-box;
            -webkit-appearance: none;
            -webkit-box-shadow: 0 0 0 0;
            -moz-box-shadow: 0 0 0 0;
            box-shadow: 0 0 0 0;
        }
        .idNo{
            position: relative;
            margin: 0 auto;
            margin-top: 36px;
            width: 570px;

            img{
                position: absolute;
                width: 38px;
                height: 28px;
                top:50%;
                transform :translateY(-50%);
                left: .3rem;
            }
        }
        .verification{
            padding-bottom:42px;
        }
        .goVerification{
            width: 570px;
            height: 88px;
            line-height: 88px;
            margin: 48px auto 0;
            font-size: 32px;
            color: #fff;
            text-align: center;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            background: linear-gradient(left,#ff903a,#ff3f32);
            background: -webkit-linear-gradient(left,#ff903a,#ff3f32);
        }
        .inviteFriend{
            margin-top: 44px;
        }
        .myInviteOne{
            margin: 36px 62px 0;
            display: flex;
            li{
                img{
                    display: inline-block;
                    vertical-align:middle;
                }
                p{
                    display: inline-block;
                    line-height: 58px;
                    height: 58px;
                    font-size: 26px;
                    color: #504F4F;
                    margin-left: 12px;
                }
                span{
                    font-size: 74px;
                    color:#353535;
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-weight: bolder;
                    margin-left: -.45rem;
                }
                .parT{
                    margin-left: .4rem;
                }
            }
            li:first-child{
                flex: 1;
                img{
                    width:  44px;
                    height: 56px;
                }
            }
            li:last-child{
                img{
                    width: 56px;
                    height: 58px;
                }
            }
        }
        .rule{
            img{
                width: 574px;
                height: 0.4rem;
                margin: 0 auto 0;
            }
            .ruleDetail{
                padding-bottom: 32px;
                font-size: 28px;
                line-height:.6rem;
                color: #333;
                margin: 24px 62px 0;
            }
        }
    }
    .particular{
        margin-top: 44px !important;
    }
    .parS{
        padding-top:  52px;
    }
    ::-webkit-input-placeholder {
        color:rgba(142,142,142,1);
        font-size: 28px;
    }
    .loadMore{
        width: 100%;
        margin-top:42px;
        text-align: center;
        display: block;
        color: #EB3B14;
        font-size: 28px;
    }
    .parThere{
        width: 100%;
        height: 832px;
        background: url("../../assets/imgs/groupBuying/bgTop.png") no-repeat ;
        background-size: cover;

    }
    .bgTop{
        width: 100%;
        height: 832px;
        background-size: cover;
        background: url("../../assets/imgs/groupBuying/bgTopOne.png") no-repeat;
        background-size: cover;
    }
    .content{
        background: url("../../assets/imgs/groupBuying/bgMid.png") no-repeat;
        background-size: cover;
        padding-bottom: 1rem;
        margin-top: -3.2rem;
        background-position-y: 2.3rem;
    }
    .contentS{
        background: url("../../assets/imgs/groupBuying/bgMid.png") no-repeat;
        background-size: cover;
        padding-bottom: 1rem;
        margin-top:-1rem ;
    }
    .finalExplain{
        color: #FFEFED;
        font-size: 28px;
        padding-top: 24px;
        padding-left: 88px;
    }
</style>
<style>

</style>
