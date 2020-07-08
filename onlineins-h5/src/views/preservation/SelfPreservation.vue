<template>
	<div class="container_l">
        <ul class="listControl"  >
            <li class="listItm" v-for="(item,key) in listControl" :key="key"  @click="gotoDetail(item,key)" >
                <img :src=item.itmImg alt="" v-if="isShow">
                <img :src=item.itmImgDisabledShow alt="" v-else-if="isOddShow">
                <img :src=item.itmImgDisabled alt="" v-else>
                <p class="itm_font"><span>{{ item.itmTitle }}</span></p>
            </li>
        </ul>
        <p class="bottom_tittle">保单服务咨询可拨打<span>95542</span>,我们将竭诚为您服务！</p>

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
                <button class="btnLeft" @click="cancel">取消</button>
                <button class="btnRight" @click="doVerify">确认</button>
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
    </div>
</template>
<script>
	import {mapActions, mapMutations} from 'vuex'
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
			    isShow: false,
                isOddShow: false,
                smsVerifyFirst:true,
                proposerPhone:'13130000741'.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3'),
                listControl: [
                    {
                        id: 0,
                        itmTitle:'交费账号变更',
                        itmPath:this.$router.siteUrl()+'/preservation/accountChange/OptionPolicy.html',
                        itmImg: require("@/assets/imgs/preservation/selfPreservation/1.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/1-1.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/1-1.png"),
                    },
                    {
                        id: 1,
                        itmTitle:'证件有效期变更',
                        itmPath:this.$router.siteUrl()+'/preservation/identity/TaxesState.html',
                        itmImg: require("@/assets/imgs/preservation/selfPreservation/2.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/2-2.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/2.png"),
                    },
                    {
                        id: 2,
                        itmTitle:'退保',
                        itmPath:this.$router.siteUrl()+'/preservation/cancelpolicy/PolicyCancelList.html',
                        itmImg: require("@/assets/imgs/preservation/selfPreservation/3.png"),
                        itmImgDisabled: require("@/assets/imgs/preservation/selfPreservation/3-3.png"),
                        itmImgDisabledShow: require("@/assets/imgs/preservation/selfPreservation/3-3.png"),
                    },
                    {
                        id: 3,
                        itmTitle:'联系方式变更',
                        itmPath:this.$router.siteUrl()+'/preservation/contact/ContactTaxes.html',
                        itmImg: require("@/assets/imgs/preservation/selfPreservation/4.png"),
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
                customerNo: ''
			}
		},
		mounted() {
            //获取客户信息
            this.getCustomerNo()
            let isSpring = this.springFestervalAlert2()
		},
        created(){
            //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
            this.SET_ENTRYTYPE('0')
        },
		methods:{
			...mapActions(['SET_CUSTOMERNO']),
			...mapMutations(['SET_BUSINESSTYPE', 'SET_CUST', 'SET_ENTRYTYPE']),
            cancel(){
                this.userNotesDialog.open = false
            },
            verifySuccess(){
                window.location.href =this.$router.siteUrl() + "/preservation/accountChange/OptionPolicy.html";
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
                if( this.isShow == false && this.isOddShow == false ) {
                    return
                } else if( this.isShow == true && this.isOddShow == false ) {
                    this.SET_BUSINESSTYPE(item.id)
                    if(!this.springFestervalAlert()) {
                        return
                    }
                    if(item.id === 0){
                        this.userNotesDialog.open = true
                        return;
                    } 
                    else {
                        window.location.href = item.itmPath
                    }
                } else if( this.isShow == false && this.isOddShow == true && item.id == 1) {
                    this.SET_BUSINESSTYPE(item.id)
                    window.location.href = item.itmPath
                }

            },
            showTip() {
			    if(this.codeShow){
                    Toast({
                        content: '请先获取验证码'
                    })
                }
            },
            doVerify() {
				// this.iconDialog.open = true
				this.$refs.sms.verifySmsCode()
			},
			/**
			 * 1.点击保全
			 * 2.查询客户号
			 * 3.查询客户号成功 ---查询证件有效期， 查询客户失败---图标置灰并不可点击弹窗让用户选择前去实名认证
			 * 4.查询证件有效期成功 --- 显示所有图标 查询证件有效期失败---只显示证件有效期图标其他图标置灰不可点击
			 */
			getCustomerNo() {
				let that = this;
				this.$app.getToken(function(userToken){
				    if(!userToken){
                        userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwNzEyMDM1NDMyMDAwMDciLCJleHAiOjE1NzE0NjI3OTB9.yM2c-uAAwZ2OhBiHledZOD5-s3qWhSmUlJhsoq9dbFpOzOynxVcnJHJSnoCSkx18ZedNZc7rbNS95HtLBw5MVg';
                    }
					that.$request({
						url: `/vip/user/getCustomerNo`,
						params: {},
						userToken: userToken,
						successFn: (data) => {
						    console.log(data)
							if(data.customerCodeList[0].customerCode){
                                that.customerNo = data.customerCodeList[0].customerCode
								that.SET_CUSTOMERNO(data.customerCodeList[0].customerCode)
								//根据客户号查询客户信息
								that.getCustInfo(data.customerCodeList[0].customerCode)
							}else {
								that.isShow = false
								that.isOddShow = false
							}
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
			getCardValid(customerNo) {
				let that = this;
				this.$app.getToken(function(userToken){
                    if(!userToken){
                        userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwNzEyMDM1NDMyMDAwMDciLCJleHAiOjE1NzE0NjI3OTB9.yM2c-uAAwZ2OhBiHledZOD5-s3qWhSmUlJhsoq9dbFpOzOynxVcnJHJSnoCSkx18ZedNZc7rbNS95HtLBw5MVg';
                    }
					that.$prequest({
						url:'/customerdata/valid',
						method: 'POST',
						data: {
							customerNo: customerNo
						},
						contentType:'application/json',
						userToken: userToken,
						isLoading: true,
						successFn: (data) => {
							if(data.msgFlag === '0' || data.msgFlag === '3') {
								that.isShow = true
							} else {
								that.isOddShow = true
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
						isLoading: true,
						successFn: (data) => {
							that.SET_CUST(data)
                            //根据客户号查询客户证件是否过期
                            that.getCardValid(that.customerNo)
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
		}
	}
</script>
<style lang="scss" scoped>
    @import "../../assets/css/preservation/reuse";
    .container .md-dialog-title{
        font-size: 40px;
    }
    .listControl{
        /* width:690px;*/
        /*height:800px;*/
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.08);
        border-radius:8px;
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
        .itm_font{
            font-size:28px;
            font-weight:400;
            color:#333333;
            line-height:40px;
            text-align: center;
            height: 110px;
            width: 120px;
            margin: auto;
        }
        img{
            width: 248px;
            height: 123px;
        }
    }
    //短信验证
    .smsVer{
        h2{
            margin: 28px auto;
        }
    }
</style>
