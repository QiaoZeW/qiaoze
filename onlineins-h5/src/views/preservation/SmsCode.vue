<template>
	<div class="div-out-Main">
		<div class="m-up"><span class="phone">手机号码</span></div>
		<div class="m-mid"><span class="phoneNum">{{phoneNum}}</span>
		<span class="smsCodeSession">{{smsCodeSession}}</span></div>
		<div class="m-down">
			<input type="text" v-model="smsCode"
			class="smsCode" placeholder="请输入验证码"
			v-validate="'required'"
			name="smsCode"/>
			<span class="smsCode-valid-text">{{ errors.first('smsCode') }}</span>
			<input type="button" :class="getting == true? 'btn-click-getting': 'btn-click' "
			@click="notGet && getSmsCode()" v-model="gettingContent"/>
		</div>

		<SingleButton @doSubmit="doCommit()" :buttonValue="buttonValue"/>
	</div>
</template>

<script>
	import {mapState } from 'vuex'
	import SingleButton from '@/components/preservation/SingleButton'
	import smsCodeValid from '@/assets/js/preservation/valid/smscode'
	export default {
	    name: 'SmsCode',
		data() {
			return {
				timerId: null,
				gettingContent: '获取验证码',
				timer: 5,
				getting: false,
				notGet: true,
				buttonValue: '确定',
				phoneNum: '',
				smsCode: '',
				smsCodeSession: '',
			}
		},
		watch:{
			getting(val){
				if(val) {
					this.timerId = window.setInterval(() => {
						this.timer--
						this.gettingContent = this.timer + 's后重新发送'
					},1000)
					console.log('timeId',this.timerId)
				}
			},
			timer(val) {
				console.log('val', val)
				console.log('this.timeid', this.timerId)
				if(val == 0) {
					this.getting = false
					this.notGet = true
					this.timer = 5
					this.gettingContent= '获取验证码'
					window.clearInterval(this.timerId);
				}
			}
		},
		mounted() {
			smsCodeValid.smsCodeValid()
		},
		computed: {
			...mapState(['Ybt']),
		},
		methods:{
			getSmsCode() {
				/**
				 * 倒计时应该放到success中
				 */
				this.getting = true
				this.notGet = false
				this.gettingContent = this.timer + 's后重新发送'
				/**
				 *
				 */
				this.$request({
				        url: '/ybt/public/getSmsCode?customerNo='+this.Ybt.customerNo,
				        method: 'GET',
				        contentType: 'application/json;charset=UTF-8',
				        successFn: (data) => {
							this.phoneNum = data.phoneNo;
							this.smsCodeSession = data.veriCode;
				        },
				        failFn: (data) => {
				        }
				 })
			},
			doCommit() {
				this.$validator.validateAll().then((x)=>{
					if(x){
						//联系方式变更
						if(this.Ybt.businessType == 3){
							this.$router.push({path:'/contact/info'})
						} else {
							this.$router.push({path:'/ybtnote'})
						}
					}
				})

			}
		},
		components:{
			SingleButton
		}
	}
</script>

<style>
	@import '../../assets/css/preservation/ybtmain.css';
	.smsCode-valid-text{
	position: absolute;
    top: 5.3rem;
    left: 2.4rem;
    color: red;
	}
	.m-up{
		height: 33%;
		position: relative;
	}
	.m-mid{
		height: 23%;
		position: relative;
	}
	.m-down{
		height: 43%;
		position: relative;
	}
	.phone{
		font-size: 1.5rem;
		font-weight: 400;
		font-family: PingFangSC;
		top: 35%;
		position: absolute;
		left: 11%;
		color: black;
	}

	.smsCode {
		border-bottom: solid 1px rgb(135,135,135);
		position: absolute;
		left: 11%;
		top: 22%;
		width: 79%;
		height: 40%;
		font-size: medium;
		border-left: none;
		border-right: none;
		border-top: none;
		outline:none;
	}
	.btn-click {
		position: absolute;
		right: 10%;
		width: 31%;
		height: 28.5%;
		top: 21%;
		border: solid 0.05rem black;
		background: white;
		border-radius: 0.2rem;
		outline:none;
	}
	.btn-click-getting {
		position: absolute;
		right: 10%;
		width: 31%;
		height: 28.5%;
		top: 21%;
		border: solid 0.05rem rgb(135,135,135);
		background: white;
		border-radius: 0.2rem;
		color: rgb(135,135,135);
		outline:none;
	}
	.phoneNum {
		position: absolute;
		top: 15%;
		left: 11%;
		font-size: medium;
	}
	.smsCodeSession {
		position: absolute;
		left: 11%;
		top: 19%;
	}
</style>
