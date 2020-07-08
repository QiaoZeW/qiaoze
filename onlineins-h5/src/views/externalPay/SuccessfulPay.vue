<template>
    <div class="section">
        <div class="content">
            <img src="../../assets/imgs/kanghuibao/successful.png"/>
        </div>
        <div class="medium">
            <div class="order">
                <span class="line"></span>
                <span class="txt">您本次投保的保险产品详情如下</span>
                <span class="line"></span>
            </div>
            <ul>
                <li><span>保单号：</span>{{contNo}}</li>
                <li><span>保险名称：</span>
                    <p>{{riskName}}</p></li>
                <!-- <li><span>被保险人：</span>白小年</li>
                 <li><span>保障额度：</span>10万</li>
                 <li><span>缴费年限：</span>10年</li>-->
            </ul>
            <p class="parT">
                <a class="chaKan" v-if="isBrowser"><button @click="clears">查看保单</button></a>
            </p>
        </div>
        <md-dialog
            :closable="true"
            v-model="iconDialog.open"
            :btns="iconDialog.btns"
        >
            亲，您还没有完成回访调研
        </md-dialog>
        <md-dialog
            :closable="true"
            v-model="warnDialog.open"
            :btns="warnDialog.btns"
        >
            亲，您还没有完成回访调研
        </md-dialog>
        <!--  <a  class="bottom" @click="clears"><a :href="detailAdd">返回商城</a></a>-->
        <!-- <div class="bottom" v-if="isBrowser">-->
        <div class="bottom" >
            <ul>
                <li class="parQ" @click="goBackHome" > 返回首页 </li>
                <li v-show="openInvestigationConfig" class="parS" @click="goInvestigation">回访调研&nbsp;100%中奖</li>
            </ul>
        </div>

    </div>

</template>

<script>
    import '../../assets/js/bridge'
    import Settings from '~/settings.json'
    //const SiteUrl = (process.env.NODE_ENV === 'production') ? Settings.siteUrl : Settings.devSiteUrl
    export default {
        name: 'successful',
        data() {
            return {
                product_id: '',
                detailAdd: '',
                contNo: '',
                myOneT: '',
                riskName: '',
                isBrowser: true,
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确认离开',
                            handler: this.confirmLeave,
                        },
                        {
                            text: '参与调研',
                            handler: this.goInvestigation,
                        },
                    ],
                },
                warnDialog: {
                    open: false,
                    btns: [
                        {
                            text: '返回首页',
                            handler: this.backHome,
                        },
                        {
                            text: '参与调研',
                            handler: this.goInvestigation,
                        },
                    ],
                },
                openInvestigationConfig:null
            }
        },
        created(){
            this.getSysConfig()
            this.userToken = JSON.parse(window.localStorage.getItem("USER_TOKEN_PAY"))
            if(!this.userToken || this.userToken === ''){
                location.href = this.$router.siteUrl() + '/externalPay/ExternalLogin.html'
            }
            this.isBrowser = this.$app.isBrowser()
            this.product_id = this.$router.query('product_id')
            this.detailAdd = 'Detail.html?product_id=' + this.product_id
            this.contNo = JSON.parse(localStorage.getItem('getContNum'))
            this.loadRiskName()
            this.orderContent = JSON.parse(localStorage.getItem('orderNumber'))
            this.orderNumber = this.orderContent
            this.clearStorage('BUYSTORAGE'+ this.$router.query('product_id')+(window.localStorage.getItem("USERCODE") || ''))
            this.clearStorage('PAWithRule')
            this.$app.getUserCode((userCode)=>{
                this.clearStorage('underwriteInfo'+userCode+this.product_id)
            })
            //this.clearStorage('BUYSTORAGE')
            this.clearStorage('allInfo')
            this.clearStorage('guarantee')
            this.clearStorage('jobInfo')
            this.clearStorage('knowledge')
        },
        methods: {
            goDownload(){
                window.location.href = this.$router.siteUrl() + '/cms/Download.html'
            },
            goInvestigation(){
                window.location.href =  this.$router.siteUrl() + '/activity/Investigation.html?orderNo=' +  this.orderNumber
                // window.location.href =  this.$router.siteUrl() + '/activity/investigation?orderNo=' +  this.orderNumber
                //   window.location.href = 'http://localhost:8080/activity/investigation?product_id='+this.product_id
            },
            getSysConfig(){
                this.$request({
                    url: `/config/list`,
                    params: {},
                    successFn: (data) => { //0--false  1--true
                        if(data.find((item)=>item.sysKey === 'SYS_IS_SHOW_HUIFANG').sysValue === '0'){
                            this.openInvestigationConfig = false
                        }else if(data.find((item)=>item.sysKey === 'SYS_IS_SHOW_HUIFANG').sysValue === '1'){
                            this.openInvestigationConfig = true
                        }
                        if(this.isBrowser){
                            if(this.openInvestigationConfig){
                                setupWebViewJavascriptBridge(function (bridge) {
                                    //导航是否显示分享按钮，分享内容先固定死
                                    bridge.callHandler('currentPageForbid', {
                                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                                    }, function (response) {
                                    });
                                })
                                let that = this
                                //和原生进行交互  原生调用js
                                setupWebViewJavascriptBridge(function (bridge) {
                                    bridge.registerHandler('openPopup',function(data,callback){
                                        that.iconDialog.open = true
                                    });
                                })
                            }else{
                                let that = this
                                //和原生进行交互  原生调用js
                                setupWebViewJavascriptBridge(function (bridge) {
                                    bridge.callHandler('backHomeConfig', {
                                        'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                                    }, function (response) {
                                    });
                                })
                            }

                        }else{
                            let that = this
                            //和原生进行交互  原生调用js
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('backHomeConfig', {
                                    'flag_back': 1, //是否返回按钮，1-返回 0-不返回
                                }, function (response) {
                                });
                            })
                        }
                    },
                    failFn: () => {
                        this.showWhirl = false
                        this.showError = true
                    }
                })
            },
            goBackHome(){
                location.href = "/externalPay/ExternalList.html"
            },
            confirmLeave(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
            closeBrowser(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('closeBrower'
                        , {'id': 2}, function (responseData) {
                        }
                    );

                })
            },
            loadRiskName(){
                this.$request({
                    url: `/ins/product/getProductNameList/${this.product_id}`,
                    isLoading: true,
                    contentType: 'application/json;charset=UTF-8',
                    successFn: (data) => {
                        this.riskName = data.name
                        document.title =  this.riskName
                    },
                    failFn: (data) => {
                        Dialog.alert({content: data.resultMsg})
                    }
                })
            },
            clears(){
                let orderNumber = this.orderNumber
                // app外部跳转至外部保单详情
                let url = `/externalPay/PolicyDetails.html?orderNo=${orderNumber}`
                if (this.agentCode) {
                    url += `&agentCode=${this.agentCode}`
                }
                location.href = url
            },
            clearStorage(index){
                window.localStorage.removeItem(index)
            },
            getFriend() {
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('shareFriend'
                        , {'id': 2}, function (responseData) {

                        }
                    );
                })
            },
            backHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                            //that.iconDialog.open = true
                        }
                    );
                })
            },
        },
    }

</script>

<style lang="scss" scoped>
    .parT {
        text-align: center;
    }

    .content {
        width: 92%;
        margin-left: 4%;
        padding-top: 45px;
        img {
            height: 278px;
        }
    }

    .bottom {
        position: fixed;
        bottom: 100px;
        width: 92%;
        margin-left: 4%;
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        height: 100px;

        ul {
            display: flex;
            justify-content: center;
            text-align: center;
            li {
                width: 4rem;
                height: 88px;
                line-height: 88px;
                font-size: .4rem;
                text-align: center;
                border: 2px solid #d7000f;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
            .parQ {
                color: #d7000f;
                box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
            }
            .parS {
                color: #fff;
                background: #d7000f;
                margin-left: 20px;
            }
        }
    }

    .medium {
        width: 92%;
        margin-left: 4%;
        box-shadow: 0px 4px 15px #6666;
        padding-bottom: 28px;
        background: url("../../assets/imgs/kanghuibao/successfulBg.png");
        ul {
            margin-bottom: 57px;
            li {
                color: #666;
                padding-top: 40px;
                font-size: 26px;
                width: 70%;
                margin-left: 15%;
                text-align: left;
                overflow: hidden;
                span {
                    display: inline-block;
                    width: 30%;
                }
                p {
                    float: right;
                    width: 70%;
                }
            }
        }
        .chaKan {
            text-align: center;
            button {
                font-size: 24px;
                width: 160px;
                height: 50px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
                color: #fff;
                background: #d7000f;
            }
        }
    }

    .order {
        font-size: 20px;
        padding-top: 50px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #d7000f;
    }

    .order .line {
        display: inline-block;
        width: 50px;
        border-top: 2px solid #d7000f;
    }

    .order .txt {
        vertical-align: middle;
    }
</style>
