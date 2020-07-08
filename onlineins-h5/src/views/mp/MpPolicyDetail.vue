<template>
    <section>
        <div class="partTop">
           <p class="humanTip" v-show="status === '6' && codeNew != '00'">试一试继续支付或修改银行卡后继续支付呢~</p>
            <p class="humanTip" v-show="(status === '53' || status === '5') && codeNew != '00'">1-2个工作日完成人工核保，请注意查收短信！</p>
            <p class="humanTip" v-show="(status === '30' || status === '33' || status === '50') && codeNew != '00'">根据相关规定，累计保费超20万需上传相关证件照片</p>
            <div class="policyTitle">
                <ul>
                    <li>{{riskName}}</li>
                    <li>{{status | explainStatus}}</li>
                    <!-- <li>{{codeNew | explainCodeNew}}</li> -->
                </ul>
                <div class="simpleDetail">
                    <p>被保人：{{insure_detail.name}}</p>
                    <p v-show=" status.indexOf('3') < -1 || status.indexOf('5') < -1 ">保单号：{{contInfo.contNo}}</p>
                    <p v-show="status.indexOf('3') < -1 || status.indexOf('5') < -1 ">保障时间：{{contInfo.applyDate}}</p>
                </div>
            </div>
        </div>
        <div class="partMiddle">
            <div class="detailAll">
                <div class="partOne">
                    <h3>保障计划</h3>
                    <ul>
                        <li>险种名称</li>
                        <li>{{riskName}}</li>
                    </ul>
                    <ul>
                        <li>基本保额</li>
                        <li>{{insureAmount}}w</li>
                    </ul>
                    <ul>
                        <li>缴费年限</li>
                        <li>{{payYear}}年</li>
                    </ul>
                    <ul>
                        <li>保险期间</li>
                        <li>{{insureYear}}</li>
                    </ul>
                    <ul>
                        <li>保险费用</li>
                        <li>￥{{prem}}</li>
                    </ul>
                </div>
                <div class="partTwo">
                    <h3>被保人</h3>
                    <ul>
                        <li>被投保人</li>
                        <li>{{insure_detail.name}}</li>
                    </ul>
                    <ul>
                        <li>证件类型</li>
                        <li>{{insure_detail.idType === '4'?'出生证':insure_detail.idType === '5'?'户口本':'身份证'}}</li>
                    </ul>
                    <ul>
                        <li>证件号码</li>
                        <li>{{insure_detail.idNo }}</li>
                    </ul>
                    <ul>
                        <li>出生日期</li>
                        <li>{{insure_detail.birthday}}</li>
                    </ul>
                    <ul>
                        <li>性别</li>
                        <li>{{insure_detail.sex === '0'?'男':'女'}}</li>
                    </ul>
                    <div v-show="insureStature && insureStature !== '0' && insureAvoirdupois && insureAvoirdupois !== '0'">
                        <ul>
                            <li>身高</li>
                            <li>{{insureStature}}cm</li>
                        </ul>
                        <ul>
                            <li>体重</li>
                            <li>{{insureAvoirdupois}}kg</li>
                        </ul>
                    </div>
                </div>
                <div class="partThree">
                    <h3>投保人</h3>
                    <ul>
                        <li>投保人</li>
                        <li>{{proposer_detail.name}}</li>
                    </ul>
                    <ul>
                        <li>证件类型</li>
                        <li>{{proposer_detail.idType === '0'?'身份证':'出生证'}}</li>
                    </ul>
                    <ul>
                        <li>证件号码</li>
                        <li>{{proposer_detail.idNo}}</li>
                    </ul>
                    <ul>
                        <li>出生日期</li>
                        <li>{{proposer_detail.birthday}}</li>
                    </ul>
                    <ul>
                        <li>性别</li>
                        <li>{{proposer_detail.sex === '0'?'男':'女'}}</li>
                    </ul>
                    <div v-show="proposerStature && proposerStature !== '0' && proposerAvoirdupois && proposerAvoirdupois !== '0'">
                        <ul>
                            <li>身高</li>
                            <li>{{proposerStature}}cm</li>
                        </ul>
                        <ul>
                            <li>体重</li>
                            <li>{{proposerAvoirdupois}}kg</li>
                        </ul>
                    </div>
                </div>
                <div class="partFour" v-if="status === '6'||status === '7'||status==='8'||status==='9'||status==='10'">
                    <h3>缴费信息</h3>
                    <ul>
                        <li>银行</li>
                        <li>{{bankName}}</li>
                    </ul>
                    <ul>
                        <li>账号</li>
                        <li>{{bankCardNum}}</li>
                    </ul>
                    <ul>
                        <li>手机号</li>
                        <li>{{proposerPhone}}</li>
                    </ul>
                </div>
            </div>
        </div>
       <div class="partBottom" v-if="status === '2' && codeNew != '00'">
            <div class="btnBox">
                <p class="goInvestigation" @click="goHuman">转人工核保</p >
            </div>
        </div>
        <div class="partBottom" v-else-if="(status === '3' || status === '32') && codeNew != '00'">
            <div class="btnBox">
                <p class="goInvestigation" @click="goPay">去支付</p >
            </div>
        </div>
        <div class="partBottom" v-else-if="(status === '30' || status === '33' || status === '50' || status === '53') && codeNew != '00'">
            <div class="btnBox">
                <p class="goInvestigation" @click="uploadCard">上传证件</p >
            </div>
        </div>
        <div class="partBottom" v-else-if="status === '6' && codeNew != '00'">
            <div class="btnBox" >
                <p class="goInvestigation" @click="continuePay">继续支付</p >
            </div>
        </div>
        <div class="partBottom" v-else-if="status === '10' && codeNew != '00'">
            <div class="btnBox" >
                <p class="goInvestigation" @click="goShopping">去逛逛</p >
            </div>
        </div>
        <div class="partBottom" v-else-if="visitFlag">
            <div class="btnBox" >
                <p class="goInvestigation" @click="goInvestigationFunc">回访调研</p >
            </div>
        </div>

        <md-dialog
            title="提示信息"
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns"
        >
            <p>是否要发起撤单请求？</p>
        </md-dialog>
        <ConfirmVisit ref="confirm-visit" v-if="contNo" v-model="showConfirm" :contNo="contNo" :orderNo="orderNum" />
    </section>
</template>

<script>
    import { Dialog,Toast } from 'mand-mobile'
    import ConfirmVisit from '@/views/externalPay/ConfirmVisit'
    export default {
        name: "MpPolicyDetail",
        components: {
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
            ConfirmVisit
        },
        data(){
            return{
                showConfirm:false,
                contNo:null,
                visitFlag:null,
                codeNew:null,
                status:'',
                userToken:'',
                orderNum:'',
                proposer_detail:{},
                insure_detail:{},
                riskName:'',
                contInfo:{},
                bankName:'',
                proposerPhone:'',
                bankCardNum:'',
                insureAmount:0,
                payYear:'',
                insureYear:'',
                prem:'',
                proposerStature:'',
                proposerAvoirdupois:'',
                insureStature:'',
                insureAvoirdupois:'',
                product_id:'',
                prtNo:'',
                uwStatus:'',
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                            handler: this.onBasicCancel,
                        },
                        {
                            text: '确认',
                            handler: this.onBasicConfirm,
                        },
                    ],
                },
            }
        },
        created(){
            /*this.orderNum =  '116601565002986448'  //this.$router.query('orderNo') ||*/
            //this.status = this.$router.query('status')
           // console.log(this.status);
            this.orderNum =  this.$router.query('orderNo') //this.$router.query('orderNo') ||
            this.userToken = window.localStorage.getItem("cps_token")
        },
        mounted(){
            this.loadOrderDetail()
        },
        methods:{
            goInvestigationFunc(){
                setTimeout(() => {
                    this.$refs['confirm-visit'].open()
                    // this.showConfirm = true
                }, 0)
                 //   this.showConfirm = true;
            },
            continuePay(){
                location.href =  "/product/AgainOrderPayment.html?orderNo=" + this.orderNum + '&frompage=failcash'
            },
            goShopping() {
                if(this.$app.isMiniProgram()){
                    //去首页
                    wx.miniProgram.switchTab({url: '/pages/home/index'})
                }
            },
            uploadCard(){
                this.status = this.status.substring(0,1)
                location.href =  `/product/UploadIDcard.html?orderNo=${this.orderNum}&prtNo=${this.prtNo}&status=${this.status}`
            },
            goPay(){
                location.href =  "/product/AgainOrderPayment.html?orderNo=" + this.orderNum
            },
            goHuman(){
                location.href = `/product/ArtificialConfirm.html?orderNo=${this.orderNum}&prtNo=${this.prtNo}&status=2`
            },
            onBasicConfirm() {
                this.cancelOrder()
                this.basicDialog.open = false
            },
            onBasicCancel() {
                this.basicDialog.open = false
            },
            cancelOrder(){
                if(this.orderNum === ''){
                    return false
                }
                let data =  {
                    "orderNo": this.orderNum,
                }
                this.$request({
                    url: '/contract/cancelPolicy',
                    userToken:this.userToken,
                    method:'POST',
                    isLoading: true,
                    data:data,
                    contentType: 'application/json',
                    successFn: (data) => {
                        window.location.reload()
                    },
                    failFn: (data) => {
                        Toast({
                            content: data.resultMsg,
                        })
                    }
                })
            },
            //格式转换
            substringHeight(str){
                return str.substring(0,str.length-3)
            },
            //获取银行名称
            getBankName(code){
                this.$request({
                    url: `/sys/dict/type`,
                    method: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data:{ type: "type_bank"},
                    successFn: data => {
                        console.log(data);
                        this.bankName =  data.find((item)=>item.value === code).label
                    },
                    failFn: data => {}
                });
            },
            //获取订单详情
            loadOrderDetail() {
                console.log(this);
                this.$request({
                    url: `/contract/getPolicyDetail`,
                    method: "POST",
                    isLoading: true,
                    isEncript:true,
                    contentType: "application/json;charset=UTF-8",
                    data: { orderNo: this.orderNum },
                    userToken: this.userToken,
                    successFn: data => {
                        if(data.codeNew){
                            this.codeNew = data.codeNew.substring(2);
                        }

                        this.proposer_detail = data.appntInfo
                        this.proposerPhone = this.proposer_detail.communicationInfo.mobile
                        this.insure_detail = data.insuredInfoList[0]
                        this.contInfo = this.insure_detail.contInfo
                        this.prtNo = this.contInfo.prtNo
                        this.status = this.contInfo.status
                        this.bankCardNum = this.contInfo.chargeInfo.bankAccNo
                        this.payYear = this.insure_detail.riskInfoList[0].payEndYear
                        this.insureYear = this.insure_detail.riskInfoList[0].insuYearDesc
                        this.insureAmount = parseInt(this.insure_detail.riskInfoList[0].amnt) /10000;
                        this.prem =  this.insure_detail.riskInfoList[0].prem
                        this.proposerStature = this.proposer_detail.stature && this.proposer_detail.stature !==''?this.substringHeight(this.proposer_detail.stature):''
                        this.proposerAvoirdupois = this.proposer_detail.avoirdupois && this.proposer_detail.avoirdupois !== ''?this.substringHeight(this.proposer_detail.avoirdupois):''
                        this.insureStature = this.insure_detail.stature && this.insure_detail.stature !== ''?this.substringHeight(this.insure_detail.stature):''
                        this.insureAvoirdupois = this.insure_detail.avoirdupois && this.insure_detail.avoirdupois !== ''?this.substringHeight(this.insure_detail.avoirdupois):''
                        this.riskName = data.insuredInfoList[0].riskInfoList[0].riskName
                        this.uwStatus = this.contInfo.uwStatus
                        this.getBankName(this.contInfo.chargeInfo.bankCode)
                        this.insure_detail.idNo = this.insure_detail.idNo.substr(0,3) + '*** **** ****' + this.insure_detail.idNo.substr(this.insure_detail.idNo.length-4,4)
                        this.bankCardNum = this.bankCardNum.substr(0,3) + '*** **** ****' + this.bankCardNum.substr(this.bankCardNum.length-4,4)
                        this.proposer_detail.idNo = this.proposer_detail.idNo.substr(0,3) + '*** **** ****' + this.proposer_detail.idNo.substr(this.proposer_detail.idNo.length-4,4)
                        this.contNo= this.contInfo.contNo
                        this.visitFlag = data.visitFlag;
                    },
                    failFn: data => {
                        Dialog.alert({ content: data.resultMsg });
                    }
                });
            },
//            loadRiskName(index) {
//                this.$request({
//                    url: `/ins/product/getProductNameList/${index}`,
//                    contentType: "application/json;charset=UTF-8",
//                    successFn: data => {
//                        this.riskName = data.name.replace(/）/g,')').replace(/（/g,'(');
//                    },
//                    failFn: data => {
//                        Dialog.alert({ content: data.resultMsg });
//                    }
//                });
//            },
        },
        filters: {
            explainStatus(status) {
                let result = "自核成功";
                switch (status) {
                    case "1":
                        result = "投保失败";
                        break;
                    case "2":
                        result = "自核失败";
                        break;
                    case "3":
                        result = "自核成功";
                        break;
                    case "30":
                        result = "自核成功";
                        break;
                    case "31":
                        result = "自核成功";
                        break;
                    case "32":
                        result = "自核成功";
                        break;
                    case "33":
                        result = "自核成功";
                        break;
                    case "4":
                        result = "转人工核保失败";
                        break;
                    case "5":
                        result = "转人工核保成功";
                        break;
                    case "50":
                        result = "转人工核保成功";
                        break;
                    case "51":
                        result = "转人工核保成功";
                        break;
                    case "52":
                        result = "转人工核保成功";
                        break;
                    case "53":
                        result = "转人工核保成功";
                        break;
                    case "6":
                        result = "承保失败";
                        break;
                    case "7":
                        result = "承保中";
                        break;
                    case "8":
                        result = "承保成功";
                        break;
                    case "9":
                        result = "已撤单";
                        break;
                    case "10":
                        result = "已终止";
                        break;
                }
                return result;
            },

            changeTime(str){
                return str.replace(/-/g,'.')
            },
            changeHeight(str){
                return str.substring(0,str.length-3)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .humanTip{
        height: 56px;
        line-height: 56px;
        font-size: 24px;
        text-align: center;
        color: #fff;
        background: #fc8f22;
    }
    section{
        min-height: calc(100vh);
        background: #F2F2F2;
        padding-top: 22px;
    }
    .partTop{
        background: #fff;
    .policyTitle{
        padding: 30px  0 44px ;
        margin: 0 32px ;
    ul{
        display: flex;
        justify-content: space-between;
    li{
        display: inline-block;
        line-height: 40px;
    }
    li:first-child{
        font-size:28px;
        font-weight:600;
        color:rgba(51,51,51,1);
    }
    li:last-child{
        font-size:26px;
        font-weight:400;
        color:rgba(225,3,18,1);
    }
    }

    .simpleDetail{
        margin-top: 8px;
    p{
        margin-top: 12px;
        font-size: 26px;
        color: #8E8E8E;
    }
    }
    }
    }
    .partMiddle{
        background: #fff;
        margin-top: 22px;
    .detailAll{
        margin: 0 32px ;
    .partOne , .partTwo , .partThree ,.partFour{
        padding-top: 44px;
        padding-bottom: 42px;
        border-bottom: 1px solid #ECECEC;
    h3{
        font-size:32px;
        font-weight:600;
        line-height: 44px;
        color:rgba(51,51,51,1);
    }
    ul{
        display: flex;
        justify-content: space-between;
    li{
        margin-top: 18px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(142,142,142,1);
        line-height:40px;
    }
    }
    }
    }
    }
    .partBottom{
        background: #fff;
        padding-top: 100px;
    .btnBox{
        box-shadow: 0px -5px 20px  #f3f3f3  ;
        border-top: 1px solid #f3f3f3;
        height: 118px;
        text-align: center;
        display: flex;
        justify-content: center;
    .goInvestigation{
        align-self: center;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        display: inline-block;
        height: 88px;
        width: 690px;
        background: #E10312;
        color: #fff;
        line-height:88px ;
        font-size: 32px;
        text-align: center;
    }
    ul{
        display: flex;
    li{
        height: 88px;
    }
    }
    }
    }
    .cancelOrder , .continuePay{
        align-self: center;
        width: 320px;
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .cancelOrder{
        border: 1px solid #E10312;
        background: #fff;
        color: #E10312;
        margin-right: .4rem;
    }
    .continuePay{
        background: #E10312;
        color: #fff;
    }
</style>
