<template>
    <div class="container-3">
		<div >
			<md-input-item
				title="保单号"
				id="contNo" name="contNo"
				v-model= "contInfo.contNo"
				disabled
			></md-input-item>
            <div class="md-field-item md-input-item is-solid is-browser is-amount left normal">
                <div class="md-field-item-content"  style="padding-bottom: 0px;padding-top: 0px;">
                    <label class="md-field-item-title">主险名称</label>
                    <div class="md-field-item-control" style="padding-right: 16px;">
                        <textarea style="padding-right: 0px;" class="md-input-item-input itemListCss" v-model="contInfo.mainRiskName" disabled></textarea>
                    </div>
                </div>
            </div>
			<md-input-item
				title="生效日期"
				id="cvaliDate" name="cvaliDate"
				v-model= "contInfo.cvaliDate"
				disabled
			></md-input-item>
			<md-input-item
				title="银行账号"
				id="accNo" name="accNo"
				v-model= "contInfo.accNo"
				disabled
			></md-input-item>
			<md-input-item
				title="交费银行"
				id="bankName" name="bankName"
				v-model= "contInfo.bankName"
				disabled
			></md-input-item>
			<md-input-item
				title="应交保费"
				id="sumPrem" name="sumPrem"
				:value= "contInfo.sumPrem|toMoney"
				disabled
			></md-input-item>
			<md-input-item
				title="红利金额"
				v-if="parseFloat(contInfo.hlMoney)>0"
				id="hlMoney" name="hlMoney"
				:value = "contInfo.hlMoney|toMoney"
				disabled
			></md-input-item>
			<md-input-item
				title="生存金金额"
				v-if="parseFloat(contInfo.liveMoney)>0"
				id="liveMoney" name="liveMoney"
				:value = "contInfo.liveMoney|toMoney"
				disabled
			></md-input-item>

			<div class="pol-div" v-for="(pol,index) in contInfo.polList" :key="index">
                <div class="md-field-item md-input-item is-solid is-browser is-amount left normal">
                    <div class="md-field-item-content"  style="padding-bottom: 0px;padding-top: 0px;">
                        <label class="md-field-item-title">险种名称</label>
                        <div class="md-field-item-control" style="padding-right: 16px;">
                            <textarea style="padding-right: 0px;" class="md-input-item-input itemListCss" v-model="pol.riskName" disabled></textarea>
                        </div>
                    </div>
                </div>
				<md-input-item
					title="主附险标识"
					:value="pol.subRiskFlag == 'S'? '附加险':'主险'"
					disabled
				></md-input-item>
				<md-input-item
					title="险种退保金额"
					:value="pol.ytMoney|toMoney"
					disabled
				></md-input-item>
			</div>

			<md-input-item
				title="退保总金额"
				id="getMoney" name="getMoney"
				:value= "contInfo.getMoney|toMoney"
				disabled
			></md-input-item>
			<md-input-item
				title="申请日期"
				id="queryDate" name="queryDate"
				v-model= "contInfo.queryDate"
				disabled
			></md-input-item>
		</div>

        <div class="changeCard_1">
            <div style="background: #fff">
                <md-field-item
                    title="退保原因"
                    :content="selectorValue"
                    @click="showSelector"
                    arrow
                    solid
                />
           </div>
        </div>

		<md-selector
			v-model="isSelectorShow"
			default-value="2"
			:data="surrenderReasonList"
			max-height="320px"
			title="退保原因"
			large-radius
			@choose="onSelectorChoose"
		></md-selector>

		<div class="reason-outer" v-if="selectorValue == '其他'">
			<textarea class="reason" placeholder="请输入退保原因" v-model="otherReason"></textarea>
		</div>

        <div class="mainBtn">
            <button :class="btnResult?'may_btn':'disable_btn'" @click="showConfirmDialog()">{{btnValue}}</button>
        </div>
		<!-- 弹窗 -->
		<div style="overflow-y:scroll;-webkit-overflow-scrolling: touch;overflow-scrolling: touch; ">
			<md-dialog
				title="确认退保信息"
				:closable="false"
				v-model="userNotesDialog.open"
				:btns="userNotesDialog.btns"
			>
				<!-- <md-input-item
					title="主险名称:"
					id="mainRiskName" name="mainRiskName"
					v-model= contInfo.mainRiskName
					disabled
				></md-input-item> -->
				<div class="md-field-item md-input-item is-solid is-browser is-amount left normal">
					<div class="md-field-item-content"  style="padding-bottom: 0px;padding-top: 0px;">
						<label class="md-field-item-title">主险名称:</label>
						<div class="md-field-item-control">
							<textarea class="md-input-item-input itemListCss" v-model="contInfo.mainRiskName" disabled></textarea>
						</div>
					</div>
				</div>
				<div class="pol-div" v-for="(pol,index) in contInfo.polList" :key="index">
                    <div class="md-field-item md-input-item is-solid is-browser is-amount left normal">
                        <div class="md-field-item-content"  style="padding-bottom: 0px;padding-top: 0px;">
                            <label class="md-field-item-title">险种名称:</label>
                            <div class="md-field-item-control">
                                <textarea class="md-input-item-input itemListCss" v-model="pol.riskName" disabled></textarea>
                            </div>
                        </div>
                    </div>
					<md-input-item
						title="主附险标识:"
						:value="pol.subRiskFlag == 'S'? '附加险':'主险'"
						disabled
					></md-input-item>
					<md-input-item
						title="险种退保金额:"
						:value="pol.ytMoney|toMoney"
						disabled
					></md-input-item>
				</div>

				<md-input-item
					title="生存金:"
                    v-if="Number(contInfo.liveMoney)>0"
					id="liveMoney" name="liveMoney"
					:value= "contInfo.liveMoney|toMoney"
					disabled
				></md-input-item>
				<md-input-item
					title="红利金额:"
                    v-if="Number(contInfo.hlMoney)>0"
					id="hlMoney" name="hlMoney"
					:value= "contInfo.hlMoney|toMoney"
					disabled
				></md-input-item>
				<md-input-item
					title="合计退保金额:"
					id="getMoney" name="getMoney"
					:value= "contInfo.getMoney|toMoney"
					disabled
				></md-input-item>
				<md-input-item
					title="账户名:"
					id="accName" name="accName"
					v-model= "contInfo.accName"
					disabled
				></md-input-item>
				<md-input-item
					title="银行名称:"
					id="bankName" name="bankName"
					v-model= "contInfo.bankName"
					disabled
				></md-input-item>
				<md-input-item
					title="银行账号:"
					id="accNo" name="accNo"
					v-model= "contInfo.accNo"
					disabled
				></md-input-item>
			</md-dialog>
		</div>
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
    </div>
</template>

<script>
    import Vue from 'vue'
	import {mapState , mapMutations } from 'vuex'
    import { InputItem,
        Selector,
        Field,
        FieldItem,
        DatePicker,
		Switch,
		Dialog,
		Button,
		Toast
    } from 'mand-mobile'
    export default {
        name: "PolicyCancelDetail",
        components:{
            [InputItem.name]: InputItem,
            [Selector.name]: Selector,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [DatePicker.name]: DatePicker,
			[Switch.name]: Switch,
			[Dialog.name]: Dialog,
    		[Button.name]: Button,
        },
        data() {
            return {
                contNo:'',
				isSelectorShow: false,
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: "确定"
                        }
                    ],
                	message:''
                },
				userNotesDialog: {
					open: false,
					btns: [
					{
						text: '取消',
						handler: this.onBasicCancel,
					},
					{
						text: '确认',
						handler: this.goNext,
					},
					],
				},
                surrenderReasonList: [
                    // {
                    //     value: '1',
                    //     text: '经济原因',
                    // },
                    // {
                    //     value: '2',
                    //     text: '个人原因',
                    // },
                    // {
                    //     value: '3',
                    //     text: '家庭原因',
                    // },
                    // {
                    //     value: '4',
                    //     text: '重新下单',
                    // },
                    // {
                    //     value: '5',
                    //     text: '其他',
                    // },
                ],
                selectorValue: '请选择',
                edorReseaonCode:'',//退保原因编码
				contInfo: { //保单详情
					// contNo: '788010900304283',
					// mainRiskName: '康惠保康惠保康惠保康惠保康惠保康保康惠保惠保',
					// ytMoney:'1612.31',
					// riskName:'全残身故豁免',
					// liveMoney:'0.0',
					// hlMoney:'0.0',
					// accName:'陆人甲',
					// cvaliDate: '2017-07-11',
					// queryDate: '2017-07-20',
					// accNo:'7000098765737', //银行账号
					// bankName:'中国银行' ,//银行名称
					// sumPrem: '1405', //应交保费
					// getMoney:'11000', //退保总金额
					// polList:[
					// 	{
					// 		polNo: '1223111',
					// 		riskName: '第三者责任险第三者责任险第三者责任险第三者责任险第三者责任险第三者责任险',
					// 		subRiskFlag: 'S',
					// 		ytMoney: '1000'
					// 	},
     //                 {
					// 		polNo: '2232311',
					// 		riskName: '商业险',
					// 		subRiskFlag: 'M',
					// 		ytMoney: '10000'
					// 	}
					// ]
				},
				otherReason:''
            }
        },
		created() {
			this.contNo = this.$router.query('contNo')
            this.SET_BUSINESSTYPE('2')
            console.log("contNo:"+this.contNo);
		},
        mounted() {
            let that = this
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
                                if(day >= 23 && day <= 28) {
                                    that.iconDialog.open = false
                                    that.goHome()
                                    return
                                } else {
                                    that.iconDialog.open = false
                                    that.search()
                                } 
                            }
                        }
                    ],
                    message:'春节期间 （1.23-1.28），自助保全服务将暂停办理，给您带来的不便，敬请谅解！'
                }                      
            } else {
                this.search()
            }
        },
		computed: {
			...mapState(['Ybt']),
			btnResult: function() {
				if((this.selectorValue != '') && (this.selectorValue !='其他')&& (this.selectorValue !='请选择')){
					console.log('222',this.selectorValue)
					return true
				} else if((this.selectorValue =='其他') && (this.otherReason !='')){
					console.log('111',this.otherReason)
					return true
				} else {
					return false
				}
			},
			btnValue: function() {
				if(this.btnResult) {
					return '申请'
				} else {
					return '请填写退保原因'
				}
			}
		},
        methods: {
            ...mapMutations(['SET_BUSINESSTYPE', 'SET_CUST']),
            goHome(){
                var that = this
                setupWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler('backHome'
                        , {'id': 2}, function (responseData) {
                        }
                    );
                })
            },
			search(){
				//根据保单号，客户号查询保单详情
				let that = this;
				this.$app.getCurrentToken((userToken)=>{
                    if(!userToken){
                        userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q';
                    }
					that.$prequest({
						url:'/policy/cancel/search',
						method: 'POST',
						data: {
							edorType: 'YT',
							operate: 'Search',
							operatorType: 'bnzx',
							operator: 'bnzx',
							customerNo: that.Ybt.customerNo,
                            // customerNo: "90000006495268",
                            contNo: that.contNo,
                            // contNo: '7330101800046083'
						},
						contentType:'application/json',
						userToken: userToken,
						isLoading: true,
						successFn: (data) => {
						    console.log(data)
							that.contInfo = data
                            let arr = data.surrenderReasonList
                            let temArr = []
                            for(let obj in arr) {
                                let temp = {}
                                temp.value = arr[obj].reasonCode
                                temp.text = arr[obj].reasonDescribe
                                temArr.push(temp)
                            }
                            that.surrenderReasonList = temArr
						},
						failFn: () => {
                            Toast({
                                content: data.resultMsg,
                            })
						}
					})
				});
			},
            showSelector() {
                this.isSelectorShow = true
            },
            onSelectorChoose({text,value}) {
                this.selectorValue = text
                this.edorReseaonCode=value
            },
            chooseTax(index){
                this.currentChoose = index;
                if(index === 1) {
                    this.btnValue = '下一步';
                } else {
                    this.btnValue = '请根据要求，联系当地柜面办理'
                }
			},
            showConfirmDialog(){
                if(this.btnResult) {
                    this.userNotesDialog.open = true;
                } else {
                    this.userNotesDialog.open = false;
                }
            },
            goNext(){
                let edorReseaon =this.edorReseaonCode=='5'? this.otherReason:this.selectorValue
                let polList=[];
                if(this.contInfo.polList){
                    this.contInfo.polList.forEach(e=>{
                        polList.push({"polNo":e.polNo});
                    })
				}

                let cannelPolicyInfo={
                    edorReseaonCode:this.edorReseaonCode,
                    edorReseaon:edorReseaon,
                    contNo:this.contInfo.contNo,
                    polList:polList,
                    queryDate:this.contInfo.queryDate,
                    getMoney:this.contInfo.getMoney
                };
                //设置取消订单的信息传值
                localStorage.setItem("cannelPolicyInfo",JSON.stringify(cannelPolicyInfo));
                //设置当前人为选择人为了证件上传识别用户
                localStorage.setItem('selectedPerson', this.Ybt.customerNo)
                //跳转证件上传页面
                window.location.href =this.$router.siteUrl() + "/preservation/CardUpload.html";
            }
        },
        filters:{
            toMoney(value){
                if(value){
                    var t =  Number(value).toFixed(2);
                    return t;
                }else{
                    return value;
                }
            }
        }
    }
</script>
<style lang="scss">
    .md-icon.icon-font:before {
        margin-right: 26px;
    }
	.changeCard_1 {
		border-top: 4px solid rgb(248,249,250);
        width: 100%;
	}
    .changeCard_1 .md-field-item .md-field-item-content .md-field-item-title{
        color:red !important;
        padding-left: 32px;
    }
	.container_1 .md-field-item .md-field-item-title{
	    width:750px;
	}
	.changeCard_1 .md-field-item .md-field-item-content .md-field-item-control {
		width: 200px;
	}
	.pol-div{
		border-bottom: 4px solid rgb(248,249,250);
	}
	.md-field-item .md-field-item-content .md-field-item-control .md-input-item-input{
		-webkit-text-fill-color: black;
	}
    .container-3 .md-field-item-title{
        padding-left: 32px;
    }
     .container-3 .md-input-item-input{
        padding-right: 32px;
	}
	.md-popup-box {
		max-height: 85% !important;
	}
	.md-dialog-title {
		font-size:20px;
		font-family:PingFangSC-Medium,PingFangSC;
		font-weight:500;
		color:rgba(225,3,18,1);
		line-height:28px;
	}
	.md-field-item-title {
		width:auto !important;
		white-space: nowrap !important;
		font-size:0.4rem!important;
	}
	.md-field-item-control {
		overflow-y:scroll;
		-webkit-overflow-scrolling:touch;
	}
	.itemListCss {
		line-height:3.5;
		white-space:nowrap;
		overflow-y: hidden;
        color: black !important;
		font-weight:700 !important;
	}
</style>
<style lang="scss" scoped>
    @import "../../../assets/css/preservation/reuse";
	.reason-outer{
		width: 750px;
		height: 256px;
		background: #FFFFFF;
	}
	.reason{
		width: 686px;
		height: 228px;
		border: 1px solid rgb(248,249,250);
		margin-left: 30px;
		line-height: 42px;
		font-size:30px;
	}
	textarea::-webkit-input-placeholder{
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(142,142,142,1);
	}
</style>
