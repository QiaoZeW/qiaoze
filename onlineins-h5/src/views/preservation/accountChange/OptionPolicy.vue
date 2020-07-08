<template>
    <div v-if="showPic" class="blankPolicy">
        <p class="particular"></p>
        <p class="tips" ><img src="@/assets/imgs/externalPay/blankPolicy.png"  /></p>
    </div>
	<div v-else class="container_s">
        <ul class="m_policeCard">
            <li class="policeCard" v-for="item in policeList">
                <div class="police_title" >
                    <md-check-group v-model="chooseOptions" @click.native="policeCheck(item)">
                        <md-check :name="item.contNo" />
                    </md-check-group>
                    <p>保单号：{{item.contNo}}</p>
                    <span>{{item.contState.substring(2)}}</span>
                </div>
                <div class="police_content">
                    <p>主险名称：{{item.mainRiskShortName}}</p>
                    <p>被保险人：{{item.insuredName}}</p>
                    <p>银行名称：{{item.bankName}}</p>
                    <p>银行账号：{{item.accNo}}</p>
                </div>
            </li>
        </ul>
        <md-dialog
            title="信息变更"
            :closable="false"
            v-model="userNotesDialog.open"
            :btns="userNotesDialog.btns"
        >
            <p>户名</p>
            <input class="inputList" type="text" :value= "Ybt.customerInfo.name" disabled>
            <p>变更后银行名</p>
            <md-field-item
                :content="bankName"
                @click="showSelector"
                arrow
                solid
            />

            <p>变更后银行账号</p>
            <md-input-item
                type="bankCard"
                maxlength="19"
                placeholder="请输入银行卡号"
                v-model="newBankCode"
            >
                <md-icon  name="camera" slot="right" size="lg" @click.native="showCamera()"></md-icon>
            </md-input-item>
            <p>再次输入变更后银行账号</p>
            <md-input-item
                type="bankCard"
                maxlength="19"
                placeholder="请输入银行卡号"
                v-model="bankCodeAgain"
            >
            </md-input-item>
            <div class="btnGroup btnGroup_line">
                <button class="btnLeft" @click="cancel">取消</button>
                <button class="btnRight" v-if="newBankCode===''"  @click="notarize" style="background: #666666;" >确认</button>
                <button class="btnRight" v-else @click="notarize" style="background: #E10312;" >确认</button>
            </div>
        </md-dialog>
        <md-dialog
            :closable="false"
            v-model="iconDialog.open"
            title="提示信息"
        >
        </md-dialog>
        <md-selector
            class="cardSelector"
            v-model="isSelectorShow"
            :data="chooseBankList"
            max-height="320px"
            title="银行名称"
            large-radius
            @choose="onSelectorChoose"
        ></md-selector>
        <div class="mainBtn">
            <div>
                <md-check-group v-model="allOptions" @click.native="allCheck">
                    <md-check name="all" label="全选"  />
                </md-check-group>
            </div>
            <button :class="chooseOptions.length?only_btn:disable_only_btn" @click="goChange">去变更</button>
        </div>
    </div>
</template>
<script>
	import { Dialog,Toast,InputItem, Field } from 'mand-mobile'
    import { mapState } from 'vuex'
	export default {
		name:'OptionPolicy',
        components:{
            [InputItem.name]: InputItem,
            [Field.name]: Field,
        },
		data(){
			return {
                manageComList:[],
                only_btn:'only_btn',
                disable_only_btn:'disable_only_btn',
                bankCode:'01',
			    contcont:[],
			    allOptions:['all'],
			    chooseOptions:[],
                manageComCode:[], //支付所属银行
                chooseBankList:[],
                changeFlag:'1',  //全部保单：1  or ：0
                newBankCode:'',
                proposerName:'',
                bankName:'工商银行',
                photoUrl: '',
                isbankshow: false,
                bankData: [],
                isSelectorShow: false,
                policeList:[], //保单列表
                choosePoliceList:[], //选取保单列表
                userNotesDialog: {
                    open: false,
                },
                iconDialog: {
                    open: false,
                },
                bankCodeAgain: '',
                showPic: true,
            }
		},
        mounted(){
            this.paymentList()
        },
        watch:{
            allOptions(newVal){
                if( newVal.length !== 0 ){
                    this.changeFlag = '1'
                } else {
                    this.changeFlag = '0'
                }
            }
        },
        computed:{
		    ...mapState(['Ybt'])
        },
		methods:{
            goChange(){
                if(this.chooseOptions.length){
                   // this.iconDialog.open = true
                   this.userNotesDialog.open = true
                   this.bankList()
                }
            },
            showSelector() {
                this.isSelectorShow = true
            },
            onSelectorChoose({text,bankCode}) {
                var that = this;
                that.bankName = text
                that.bankCode = bankCode
                console.log(that.bankCode)
            },
            //复选
            policeCheck(){
                this.chooseOptions.length === this.policeList.length? this.allOptions=['all']:this.allOptions=[]
            },
            //全选
            allCheck(){
                this.allOptions.length === 0? this.chooseOptions=[]:this.chooseOptions=this.choosePoliceList
            },
            cancel(){
                this.userNotesDialog.open = false
            },
            //去变更 - 确认
            notarize(){
                if( this.newBankCode ==="" ){
                    Toast({
                        content: '请输入更改后的银行卡号!'
                    })
                    return false
                } else if( this.bankCodeAgain ==="" ){
                    Toast({
                        content: '请再次输入更改后的银行卡号!'
                    })
                    return false
                } else if( this.newBankCode != this.bankCodeAgain ) {
                    Toast({
                        content: '两次输入的银行卡号码不一致!'
                    })
                    return false
                }
                window.localStorage.setItem("NewBankName", this.bankName);
                window.localStorage.setItem("Account", this.newBankCode);
                window.localStorage.setItem("ChangeFlag", this.changeFlag);
                window.localStorage.setItem("ContNo", JSON.stringify(this.chooseOptions));
                window.localStorage.setItem("BankCode", this.bankCode);
                window.location.href =this.$router.siteUrl() + "/preservation/accountChange/IdCardChange.html";
            },
            paymentList(){
                let that = this
                this.$app.getCurrentToken(function(userToken){
                    that.$prequest({
                        url:'/payment/selectPaymentAccount',
                        method: 'POST',
                        data: {
                            customerNo:that.Ybt.customerNo,
                            // customerNo: "90000006495408",
                            contNo:"",
                            edorType:"PC",
                            operate:"Init",
                            newBankCode:'',
                            newBankAccNo:"",
                            newAccName:"",
                            edorAcceptNo:""
                        },
                        contentType:'application/json',
                        userToken: userToken,
                        // userToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
                        successFn: (data) => {
                            if(data.contInfo) {
                                that.showPic = false
                                console.log(data)
                                that.policeList = data.contInfo
                                that.chooseOptions = that.policeList.map( item => { return item.contNo })
                                that.choosePoliceList =  that.chooseOptions
                            } else {
                                Toast({
                                    content: '您没有可以做交费账号变更的保单',
                                })
                            }
                        },
                        failFn: (data) => {
                            Toast({
                                content: data.resultMsg,
                            })
                        },
                        errorFn: function(){
                            Toast({
                                content: '服务器开小差了',
                            })
                            // setTimeout(()=>{
                            // 	window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
                            // },2000)
                        }
                        
                    })
                });
            },
            bankList(){
                let tempList = []
                for(let i=0;i<this.chooseOptions.length;i++){
                    for(let j=0;j<this.policeList.length;j++){
                        if(this.chooseOptions[i] == this.policeList[j].contNo){
                            tempList.push(this.policeList[j].manageCom)
                        }
                    }
                }
                this.manageComList = tempList
                let that = this
                let datas = {
                    "manageComs":that.manageComList
                }
                this.$app.getCurrentToken(function(userToken){
                    that.$prequest({
                        url:'/base/newbanklist',
                        method: 'POST',
                        data: datas,
                        contentType:'application/json',
                        userToken: userToken,
                        // userToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
                        successFn: (data) => {
                            let temp = []
                            data.map( (item,index) => {
                                temp.push(Object.assign({},item,{
                                    value:index + 1,
                                    text:item.bankName,
                                }))
                            } );
                            that.chooseBankList = temp
                            console.log(that.chooseBankList)
                        },
                        failFn: () => {
                            alert(data.resultMsg)
                        }
                    })
                });
            },
            showCamera() {
                let that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('getBase64'
                        , {'id': 2}, function (responseData) {
                            //银行卡号识别
                                responseData = JSON.parse(responseData)
                                that.photoUrl = responseData.data
                                that.photoUrl = that.photoUrl.replace(/""/g, "%22");
                                var datas = {
                                    "businessType": "8",
                                    "requestPlatform": "3",
                                    "userCode": that.Ybt.customerNo,
                                    "imgInfoList": [
                                        {
                                            "imgIndex": "17",
                                            "imgType": "17",
                                            "imgFormat": that.photoUrl.substring(that.photoUrl.length - 3),
                                            "imgData": "",
                                            "imgUrl": that.photoUrl
                                        }
                                    ]
                                }
                                let _this = that;
                                that.$app.getToken(function (userToken) {
                                    _this.$request({
                                        url: `/ocr/ocr/getappocrinfo`,
                                        method: 'POST',
                                        contentType: 'application/json;charset=UTF-8',
                                        data: datas,
                                        userToken: userToken,
                                        successFn: (data) => {
                                            let bankFlag = false;
                                            for(let i=0;i<_this.chooseBankList.length;i++){
                                                if(_this.chooseBankList[i].bankCode == data.bankNo){
                                                    bankFlag = true;
                                                }
                                            }
                                            if(!bankFlag){
                                                Dialog.alert({content: '暂不支持该银行卡'})
                                                return false
                                            }
                                            _this.bankName = data.bankName
                                            _this.newBankCode = data.cardNo
                                            _this.bankCodeAgain = data.cardNo
                                            _this.bankCode = data.bankNo
                                        },
                                        failFn: () => {
                                            Dialog.alert({content: '银行卡识别失败'})
                                        }
                                    })
                                })
                        }
                    );
                })

            },
        }
	}
</script>
<style lang="stylus">
	.m_policeCard .md-check{
	    margin: 0!important;
	}
	.m_policeCard .md-icon.icon-font.md{
	    color: #fff!important;
	    font-size: 44px!important;
	    position: absolute!important;
	    line-height: 1.06667rem!important;
	    left: -0.9rem!important;
	}
	.mainBtn .md-check{
	    font-size:28px;
	    font-weight:400;
	    color:rgba(51,51,51,1);
	    line-height:  118px;
	    position: absolute;
	    left: 54px ;
	}
	.mainBtn .md-icon.icon-font.md{
	    color: #E10312!important;
	    font-size: 44px!important;
	}
    .md-field-item-control, .md-input-item-input{
        text-align: left!important;
    }
    .md-input-item-input::-webkit-input-placeholder{
        font-size: 28px!important;
        font-weight:400!important;
        color:rgba(142,142,142,1)!important;
    }
    .md-field-item-content{
        width: 100%;
        height: 80px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-bottom: 30px;
        padding: 28px;
        box-sizing: border-box;
        min-height :auto;
    }
    .md-field-item-content:before{
          border:0;
      }
    
</style>
<style lang="scss" scoped>
    @import "../../../assets/css/preservation/reuse";
    .blankPolicy{
        background: #fff;
        padding-top: 1.35rem;
        .tips{
            width: 100%;
            padding-top: 76px;
            img{
                margin: 0 auto;
                width: 378px;
                height: 416px;
            }
        }
        .newPart{
            margin-top: 282px;
            padding-bottom: 3.33333rem;
            margin-bottom: 0;
        }
    }  
    .cardSelector{
        position: relative;
        z-index: 100000;
    }
    .inputList{
        width: 100%;
        height: 80px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-bottom: 40px;
        padding:0 28px;
        box-sizing: border-box;
        font-size: 28px;
    }
    .inputList::-webkit-input-placeholder{
        font-size: 28px!important;
        font-weight:400!important;
        color:rgba(142,142,142,1)!important;
    }
    .md-dialog-body p{
        font-size: 28px;
        color: #333333;
        margin-bottom: 8px;
    }
    .btnGroup_line{
        padding-top: 40px;
        border-top:1px solid #ccc ;
    }
    .policeCard{
        width: 690px;
        margin: auto;
        margin-bottom: 20px;
        box-shadow:0 0 10px 0 rgba(0,0,0,0.08);
        .police_title{
            color:#fff;
            height: 80px;
            background: $fClrFocus;
            line-height: 80px;
            font-size: 32px;
            font-weight: 500;
            padding-left: 92px;
            border-radius: 10px 10px 0 0;
            overflow: hidden;
            span{
                display: block;
                color: $fClrFocus;
                font-size: 26px;
                width: 150px;
                height: 44px;
                text-align: center;
                background: #fff;
                position: relative;
                top: -1rem;
                left: 6.67rem;
                font-weight: 500;
                line-height: 44px;
                transform:rotate(45deg)
            }
        }
        .police_content{
            padding: 24px;
            line-height: 52px;
            font-size: 28px;
            font-weight: 400;
            color: #333;
            background: #fff;
            border-radius: 0 0 10px 10px;
         }
    }
</style>
