<template>
    <div class="box-order">
        <div class="box-detail">
            <div class="box-content-detail">
               <div class="box-title">{{riskName}}
               <div v-if="status == '8'" class="success-right"></div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">保单号：</div>
                 <div class="order-right">{{contNo}}</div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">被保人：</div>
                 <div class="order-right">{{insuredName}}</div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">总保额：</div>
                 <div class="order-right">¥{{insureAmount}}</div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">交费年限：</div>
                 <div class="order-right">{{payEndYearDesc}}</div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">当期费用：</div>
                 <div class="order-right">¥{{prem}}</div>
               </div>
               <div class="orderdetail">
                 <div class="order-left">保障期限：</div>
                 <div class="order-right">{{insuYearDesc}}</div>
               </div>
               <div class="underborder"></div>
               <div v-if="showMoreBtn" class="more-right"  @click="moreFunc">查看更多详情</div>
            </div>
        </div>
        <div class="container_service">
            <div class="box-second-title">
                <div class="service">服务
                    <div class="info-tel">咨询可拨打<span>95542</span>，我们将竭诚为您服务</div>
                </div>
            </div>
            <ul class="listControl"  >
                <li class="listItm" v-for="(item,key) in listControl" :key="key"  @click="gotoDetail(item,key)" >
                    <img :src=item.itmImg alt="">
                    <div class="corner" v-if="item.id==1 && expired == true"></div>
                    <p class="itm_font"><span>{{ item.itmTitle }}</span></p>
                </li>
            </ul>

            <md-dialog
                title="用户须知"
                :closable="false"
                v-model="userNotesDialog.open"
                :btns="userNotesDialog.btns"
            >
                <p>1.账户所有人须以申请资格人本人的真实姓名开立结算账户，并授权开户银行和百年人寿保险股份有限公司（以下简称本公司）从该账户划扣投保人的保单所需交付的各期保险费，账户所有人同意该结算账户中所扣交保险费优先于其他任何用途的支付。</p>
                <p>2.账户所有人应在保险费应交日前将足额保险费存至该结算账户中，本公司将在应交日后60天内定期扣除当期保险费。</p>
                <p>3.账户所有人保证账户有足够的金额支付应交保险费，因账户内余额不足或其他非本公司原因导致转账不成功而引起的责任，概由投保人承担。</p>
                <p style="border-bottom: 1px solid #CCCCCC;padding-bottom: 14px;">4.本公司不对该授权账户的失窃或冒领承担责任。</p>
                <div class="smsVer">
                    <h2 class="md-dialog-title">短信验证</h2>
                    <SendMessage ref='sms' @verifySuccess="verifySuccess()"></SendMessage>
                </div>
                <div class="btnGroup">
                    <button class="btnLeft" @click="cancelUserNotesDialog">取消</button>
                    <button class="btnRight" @click="notarize">确认</button>
                </div>
            </md-dialog>

            <md-dialog
                title="信息变更"
                :closable="false"
                v-model="accountChangeDialog.open"
                :btns="accountChangeDialog.btns"
            >
                <p>户名</p>
                <input class="inputList" type="text" :value= Ybt.customerInfo.name disabled>
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
                    <button class="btnLeft" @click="cancelAccountChangeDialog">取消</button>
                    <button class="btnRight" v-if="newBankCode===''"  @click="notarizeChange" style="background: #666666;" >确认</button>
                    <button class="btnRight" v-else @click="notarizeChange" style="background: #E10312;" >确认</button>
                </div>
            </md-dialog>

        	<md-dialog
        	    :closable="false"
        	    v-model="iconDialog.open"
        	    title="提示信息"
        	    :btns="iconDialog.btns"
        	>
        	    <p>
        	        {{iconDialog.message}}
        	    </p>
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
        </div>
    </div>
</template>
<script>
	import {mapState, mapActions, mapMutations} from 'vuex'
    import SendMessage from '../../components/preservation/SendMessage'
	import { GET_CUSTOMERNO } from '../../store/mutations'
	import {Dialog,Toast, Button} from 'mand-mobile'
	export default {
		name:'SelfPreservation',
        components:{
            SendMessage
        },
		data(){
			return {
                manageComList:[],
                count: 0,
                canRun: true,
                showMoreBtn: false,
                insuredName: '',
                riskName:'',
                insureAmount:'',
                prem:'',
                insuYearDesc:'',
                payEndYearDesc: '',
                orderNo:'',
                contNo:'',
                status:'',
                policyStatus:'',
			    isShow: false,
                isOddShow: false,
                smsVerifyFirst:true,
                expired: false,
                proposerPhone:'13130000741'.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3'),
                listControl: [
                    {
                        id: 0,
                        itmTitle:'交费账号变更',
                        itmPath:this.$router.siteUrl()+'/preservation/accountChange/OptionPolicy.html',
                        itmImg: require("@/assets/imgs/preservation/service/account_change.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/1-1.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/1-1.png"),
                    },
                    {
                        id: 1,
                        itmTitle:'证件有效期变更',
                        itmPath:this.$router.siteUrl()+'/preservation/identity/TaxesState.html',
                        itmImg: require("@/assets/imgs/preservation/service/id_expiredate_change.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/2-2.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/2.png"),
                    },
                    {
                        id: 3,
                        itmTitle:'联系方式变更',
                        itmPath:this.$router.siteUrl()+'/preservation/contact/ContactTaxes.html',
                        itmImg: require("@/assets/imgs/preservation/service/contact_change.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/4-4.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/4-4.png"),
                    },
                    // {
                    //     itmTitle:'保单详情',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/5.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/5-5.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/5-5.png"),
                    // },
                    // {
                    //     itmTitle:'收益查询',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/6.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/6-6.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/6-6.png"),
                    // },
                    // {
                    //     itmTitle:'投保状态',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/7.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/7-7.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/7-7.png"),
                    // },
                    // {
                    //     itmTitle:'保全记录',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/8.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/8-8.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/8-8.png"),
                    // },
                    // {
                    //     itmTitle:'贷款查询',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/9.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/9-9.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/9-9.png"),
                    // },
                    // {
                    //     itmTitle:'重疾绿通资格查询',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/10.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/10-10.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/10-10.png"),
                    // },
                    // {
                    //     itmTitle:'爱的手书增值服务',
                    //     itmPath:'/preservation/identity',
                    //     itmImg: require("@/assets/imgs/preservation/selfPreservation/11.png"),
                    //     itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/11-11.png"),
                    //     itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/11-11.png"),
                    // }
                ],
                //用户须知弹窗
                userNotesDialog: {
                    open: false,
                },
                //交费账号变更弹窗
                accountChangeDialog: {
                    open: false,
                },
				custInfo:{},
				iconDialog: {
				    open: false,
				    btns: [
				        {
				            text: "确定"
				        }
				    ],
					message:''
				},
                bankName:'工商银行',
                isSelectorShow: false,
                chooseBankList:[],
                newBankCode:'',
                policeList: [],
                bankCodeAgain: ''
			}
		},
		mounted() {
            this.orderNo = this.$router.query("orderNo");
            this.policyListStatus = this.$router.query("policyListStatus");
            //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
            this.SET_ENTRYTYPE('1')
            let isSpring = this.springFestervalAlert2()
            //获取客户信息
            this.getCustomerNo();
		},
        created(){
            
        },
        computed:{
            ...mapState(['Ybt'])
        },
		methods:{
			...mapActions(['SET_CUSTOMERNO']),
			...mapMutations(['SET_BUSINESSTYPE', 'SET_CUST', 'SET_ENTRYTYPE']),
            cancelUserNotesDialog(){
                this.userNotesDialog.open = false
                window.scrollTo(0,0);
            },
            cancelAccountChangeDialog() {
			    this.accountChangeDialog.open = false
            },
            notarize(){
                this.$refs.sms.verifySmsCode()
            },
            verifySuccess(){
                this.accountChangeDialog.open = true
                this.bankList()
            },
            fnThrottle(fn) {
                let that = this;
                return function () {
                    if (!that.canRun) return;
                    that.canRun = false;
                    setTimeout(() => {
                        that.count = 0;
                        that.canRun = true;
                    }, 2000);
                };
            },
            moreFunc() {
              if(this.count == 0){
                this.count++;
                this.goPolicyDetail()
              }else{
                this.fnThrottle(this.goPolicyDetail)();
              }
            },
            goPolicyDetail(){
                this.fnThrottle(this.goPolicyDetail)();
                let that = this 
                location.href = `/externalPay/PolicyDetails.html?orderNo=${that.orderNo}&status=${that.policyListStatus}`
                // setupWebViewJavascriptBridge(function (bridge) {
                // bridge.callHandler('goPolicyDetail'
                // 	, {'id': 2,'customerNo':that.Ybt.customerNo,'contNo':that.contNo}, function (responseData) {
                // 	});
                // })
            },
            springFestervalAlert2() {
                let that = this
                //春节返回，否则继续操作
                let toDay = new Date();
                let month = toDay.getMonth() + 1;
                let day = toDay.getDate();
                if(month == 1) {
                    this.iconDialog = {
                        open: true,
                        btns: [
                            {
                                text: '确定',
                                handler: function() {
                                    that.iconDialog.open = false
                                    return false
                                }
                            }
                        ],
                        message:'春节期间 （1.23-1.28），自助保全服务将暂停办理，给您带来的不便，敬请谅解！'
                    }
                } else {
                    return true
                }
            },
            springFestervalAlert() {
               let that = this
               //春节返回，否则继续操作
               let toDay = new Date();
               let month = toDay.getMonth() + 1;
               let day = toDay.getDate();
               if(month == 1 && (day >= 23 && day <= 28)) {
                   this.iconDialog = {
                       open: true,
                       btns: [
                           {
                               text: '确定',
                               handler: function() {
                                   that.iconDialog.open = false
                                   return false
                               }
                           }
                       ],
                       message:'春节期间 （1.23-1.28），自助保全服务将暂停办理，给您带来的不便，敬请谅解！'
                   }
               } else {
                   return true
               }
            },
            gotoDetail(item,key){
                let that = this
			    if( !this.isShow ) {
			       return
			    }
                if(!this.springFestervalAlert()) {
                    return
                }
                this.SET_BUSINESSTYPE(item.id)
                if(item.id == 1) {
                    window.location.href = item.itmPath
                    return
                }
                //判断证件有效期是否过期
                if(!that.expired) {
                    //交费账号变更
                    if(item.id === 0){
                        that.paymentList()
                        return;
                    } else {
                        window.location.href = item.itmPath
                    }
                } else {
                	that.iconDialog =  {
                	    open: true,
                	    btns: [
                	        {
                	            text: "确定"
                	        }
                	    ],
                		message:'您预留在我公司的证件有效期已过期，请先进行证件有效期变更。'
                	}
                }
            },
            paymentList(){
                let that = this
                this.$app.getToken(function(userToken){
                    that.$prequest({
                        url:'/payment/selectPaymentAccount',
                        method: 'POST',
                        data: {
                            customerNo:that.Ybt.customerNo,
                            // customerNo: "90000006495268",
                            contNo:that.contNo,
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
                            if(data.contInfo){
                               that.policeList = data.contInfo
                               that.userNotesDialog.open = true
                            }else{
                                Toast({content: '该保单不能做缴费账号变更'})
                            }
                        },
                        failFn: () => {
                            Toast(data.resultMsg)
                        }
                    })
                });
            },
            showTip() {
			    if(this.codeShow){
                    Toast({
                        content: '请先获取验证码'
                    })
                }
            },
			/**
			 * 1.点击保全
			 * 2.查询客户号
			 * 3.查询客户号成功 点亮所有图标， 查询客户失败---图标置灰并不可点击弹窗让用户选择前去实名认证
			 */
			getCustomerNo() {
				let that = this;
				this.$app.getToken(function(userToken){
					that.$request({
						url: `/vip/user/getCustomerNo`,
						params: {},
						userToken: userToken,
                        // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
						successFn: (data) => {
						    console.log(data)
							if(data.customerCodeList[0].customerCode){
								that.SET_CUSTOMERNO(data.customerCodeList[0].customerCode)
								//根据客户号查询客户信息
								that.getCustInfo(data.customerCodeList[0].customerCode)
							}else {
								that.isShow = false
								that.isOddShow = false
							}
                            that.getOrderDetail();
						},
					    failFn: (data) => {
                            //跳转到实名认证
                            if(data.resultCode === "SYS_ERROR_005") {
                            	that.confirm(data.resultMsg);
                            }
					    }
					})
				});

			},
            goHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
            getOrderDetail(){
                let that = this;
                this.$app.getToken(function(userToken){
                	that.$request({
                		url: `/contract/getPolicyDetail`,
                		method: "POST",
                		contentType: "application/json;charset=UTF-8",
                		data: {orderNo: that.orderNo},
                        // data: {orderNo: '116381557209107709'},
                		userToken: userToken,
                        // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
                		successFn: (data) => {
                		    console.log(data)
                            for(let i=0;i<data.insuredInfoList[0].riskInfoList.length;i++){
                                if(data.insuredInfoList[0].riskInfoList[i].subRiskFlag == 'M'){
                                    that.insuredName = data.insuredInfoList[0].name
                                    that.riskName = data.insuredInfoList[0].riskInfoList[i].riskName
                                    that.insureAmount = Number(data.insuredInfoList[0].riskInfoList[i].amnt).toFixed(2)
                                    that.prem = Number(data.insuredInfoList[0].contInfo.prem).toFixed(2)
                                    that.insuYearDesc = data.insuredInfoList[0].riskInfoList[i].insuYearDesc
                                    that.payEndYearDesc = data.insuredInfoList[0].riskInfoList[i].payEndYearDesc
                                    that.contNo = data.insuredInfoList[0].contInfo.contNo
                                    that.status = data.insuredInfoList[0].contInfo.status   //保单状态
                                }
                            }
                            if(that.status != '8') {
                                that.iconDialog = {
                                    open: true,
                                    btns: [
                                        {
                                            text: "确定",
                                            handler: function() {
                                                that.goHome()
                                            }
                                        }
                                    ],
                                	message:'您的保单暂未生效或已失效，无法进行保全操作，详询95542！'
                                }
                            }
                            if(that.Ybt.customerNo && that.contNo){
                               that.showMoreBtn = true;
                            }
                            switch(that.status)
                            {
                                case '1':
                                    that.policyStatus = '投保失败';
                                    break;
                                case '2':
                                    that.policyStatus = '自核失败';
                                    break;
                                case '3':
                                    that.policyStatus = '自核成功';
                                    break;
                                case '4':
                                    that.policyStatus = '转人工核保失败';
                                    break;
                                case '5':
                                    that.policyStatus = '转人工核保成功';
                                    break;
                                case '6':
                                    that.policyStatus = '承保失败';
                                    break;
                                case '7':
                                    that.policyStatus = '承保中';
                                    break;
                                case '8':
                                    that.policyStatus = '承保成功';
                                    break;
                                case '9':
                                    that.policyStatus = '已撤单';
                                    break;
                                case '10':
                                    that.policyStatus = '已终止';
                                    break;
                                default:
                                    break;
                            }
                		},
                	    failFn: (data) => {
                            Toast({content: data.resultMsg})
                	    }
                	})
                });
            },
			getCardValid(customerNo) {
				let that = this;
				this.$app.getToken(function(userToken){
					that.$prequest({
						url:'/customerdata/valid',
						method: 'POST',
						data: {
							customerNo: customerNo
						},
						contentType:'application/json',
						userToken: userToken,
                        // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
						isLoading: true,
						successFn: (data) => {
							if(data.msgFlag === '0' || data.msgFlag === '3') {
								that.isShow = true
                                that.expired = false
							} else {
								that.isShow = true
                                that.expired = true
							}
						},
						failFn: () => {
						    alert(data.resultMsg)
						}
					})
				});
			},
			getCustInfo(customerNo) {
				let that = this;
				this.$app.getToken(function(userToken){
					that.$prequest({
						url:'/customerdata/init',
						method: 'POST',
						data: {
							"customerNo": customerNo,
							"operatorType": "wx",
							"operate": "Init",
							"edorType":"CM",
							"operator": "WXS"
						},
						contentType:'application/json',
						userToken: userToken,
                        // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
						isLoading: true,
						successFn: (data) => {
							that.SET_CUST(data)
                            //根据客户号查询客户证件是否过期
                            that.getCardValid(customerNo)
						},
						failFn: () => {
						    alert(data.resultMsg)
						}
					})
				});
			},
			confirm(text) {
				Dialog.confirm({
					title: '温馨提示',
					content: text,
					confirmText: '去实名认证',
					onConfirm: () => {
						setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('goRealName'
							, {'id': 2}, function (responseData) {
							});
						})
					},
				})
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
            //去变更 - 确认
            notarizeChange(){
                if( this.newBankCode ===""){
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
                let contArray = []
                contArray.push(this.contNo)
                window.localStorage.setItem("NewBankName", this.bankName);
                window.localStorage.setItem("Account", this.newBankCode);
                window.localStorage.setItem("ChangeFlag", '0');
                window.localStorage.setItem("ContNo", JSON.stringify(contArray));
                window.localStorage.setItem("BankCode", this.bankCode);
                window.location.href =this.$router.siteUrl() + "/preservation/accountChange/IdCardChange.html";
            },
            bankList(){
                let tempList = []
                tempList.push(this.policeList[0].manageCom)
                this.manageComList = tempList
                let that = this
                let datas = {
                    "manageComs":that.manageComList
                }
                this.$app.getToken(function(userToken){
                    that.$prequest({
                        url:'/base/newbanklist',
                        method: 'POST',
                        data: datas,
                        contentType:'application/json',
                        userToken: userToken,
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
    @import "../../assets/css/preservation/reuse";
    .cardSelector{
        position: relative;
        z-index: 100000;
    }
    .btnGroup_line{
        padding-top: 40px;
        border-top:1px solid #ccc ;
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
    .box-order {
      background: #F2F2F2;
      height: 100%;
    }
    .container_service {
        padding-top:10px;
        background: #F2F2F2;
        height: 100%;
    }
    .box-second-title {
      font-size: px2em(32px);
      font-weight: 700;
      padding: 28px 54px 28px 52px;
      background: #FFFFFF;
       .info-tel {
         float:right;
         font-size: px2em(24px);
         font-weight: 400;
         color: #999999;
         margin-top: 6px;
         span {
             color: #E10312;
         }
       }
    }

    .box-detail {
      border-radius: px2em(10px);
      border-top: 1px solid #ECECEC;
      background: #F2F2F2;
      /*background-color: #f52b55;*/
      .box-content-detail{
          background: white;
          padding: 28px 54px 0px 52px;
          .box-title {
            height: 72px;
            font-size: px2em(28px);
            font-weight: 700;
                .success-right {
                  background-image: url("../../assets/imgs/preservation/service/statusNew_5.png");
                  width: 160px;
                  height:164px;
                  background-size: 100% 100%;
                  position: absolute;
                  right: 0.3rem;
                  top: -0.17rem;
                }
            padding-top: 30px;
            margin-bottom: 28px;
            border-bottom: 1px solid #ECECEC;
          }
          .orderdetail {
            display: flex;
            padding: px2em(15px) 0;
            justify-content: space-between;

            .order-left {
              font-size: px2em(30px);
              color: #999999;
              min-width: 120px;
            }
            .order-right {
              font-size: px2em(28px);
              color: #333333;
              max-width: 600px;
            }
          }
          .underborder {
              margin-top: 15px;
              border-top: 1px solid #ECECEC;
              height: 0px;
          }
          .more-right {
            width: 175px;
            height: 40px;
            line-height: 40px;
            font-size: px2em(28px);
            font-weight: 700;
            color: #E10312;
            margin: 20px auto 0;
            padding-bottom: 20px;
          }
      }
    }
    .container .md-dialog-title{
        font-size: 40px;
    }
    .listControl{
        /* width:690px;*/
        /*height:800px;*/
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.08);
        display: flex;
        flex-wrap:wrap;
        li:nth-child(3n){
            border-right: 0;
        }
    }
    .listItm{
        width:33.33%;
        height: 100%;
        border-right: 1px solid #ECECEC;
        border-bottom: 1px solid #ECECEC;
        box-sizing: border-box;
        position: relative;
        .corner{
            background-image: url("../../assets/imgs/preservation/service/corner.png");
            width: 50px;
            height:24px;
            background-size: 100% 100%;
            position: absolute;
            right: 45px;
            top: 10px;
        }
        .itm_font{
            font-size:24px;
            font-weight:400;
            color:#333333;
            line-height:40px;
            text-align: center;
            height: 110px;
            width: 112px;
            margin: auto;
        }
        img{
            padding-top:30px;
            padding-bottom:20px;
            width: 54px;
            height: 44px;
            margin: auto;
        }
    }
    //短信验证
    .smsVer{
        h2{
            margin: 28px auto;
        }
    }
</style>
