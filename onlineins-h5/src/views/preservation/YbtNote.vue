<template>
	<div>
		<Note :content="content"/>
		<SingleButton @doSubmit="jumpToNewPage()" :buttonValue="buttonValue"/>
	</div>
</template>

<script>
	import SingleButton from '@/components/preservation/SingleButton'
	import Note from '@/components/preservation/Note'
	export default{
		name: 'ybtnote',
		data() {
			return {
				buttonValue: '下一步'
			}
		},
		created: function() {
		},
		computed:{
			businessType: function() {
				return this.$store.state.Ybt.businessType;

			},
			content: function() {
				//缴费账号变更
				if(this.businessType == 0) {
					return "<li>1、账户所有人须以申请资格人本人的真实姓名开立结算账户，并授权开户银行和百年人寿保险股份有限公司（以下简称本公司）从该账户划扣投保人的保单所需交付的各期保险费，账户所有人同意该结算账户中所扣交保险费优先于其他任何用途的支付。</li>" +
					       "<li>2、账户所有人应在保险费应交日前将足额保险费存至该结算账户中，本公司将在应交日后60天内定期扣除当期保险费。</li>" +
						   "<li>3、账户所有人保证账户有足够的金额支付应交保险费，因账户内余额不足或其他非本公司原因导致转账不成功而引起的责任，概由投保人承担。</li>"+
						   "<li>4、本公司不对该授权账户的失窃或冒领承担责任。</li>"
				}
				//证件有效期变更
				else if(this.businessType == 1) {
					return "<li>1、该项目仅支持变更身份证件有效期，护照、户口本等其他证件不支持该操作。</li>" +
					       "<li>2、该项目不支持变更姓名、性别、证件类型、证件号码、出生日期，如以上信息有误请至公司柜面办理变更。</li>"
				}
				//退保
				else if(this.businessType == 2) {
					return  "<li>重要提示：保险合同非常重要，请您详细了解保单利益，慎重选择退保。</li>" +
						    "<li>1、本次保险合同变更申请须由投保人本人操作。</li>" +
							"<li>2、自您成功提交退保申请之日起，保险合同即被解除，我公司不再承担保险责任。</li>" +
							"<li>3、为保障您资金的安全性，退保金将支付到您的交费账户，请保持账户可以正常转账。</li>" +
							"<li>4、如果您的保单有未清偿的保单贷款，我们将从退保金中直接扣除贷款本金和利息。</li>" +
							"<li>5、退保完成后，您须将纸质保单和交费凭证作废，如因纸质保单或交费凭证遗失或未及时作废而产生的相关风险，本公司不承担任何责任。</li>" +
							"<li>6、如有疑问，请您联系保单服务人员、所在地客服中心或拨打<a font style='color:#c1272d'>95542</a>咨询。</li>"
				}
				//联系方式变更
				else if(this.businessType == 3) {
					return  "<li>1、请您准确地填写您的联系信息，我们将按照您留下的联系方式，为您提供交费提醒，信函寄送，投资报告等后续服务。</li>" +
							"<li>2、地址变更将会同时变更您名下的所有保单地址，如您仅需要变更其中一张保单地址，请联系您的服务人员为您处理。</li>" +
							"<li>3、为保证我们的服务质量，请留存您准确的联系信息。如果您的联系信息发生变更，请及时更新。</li>" +
							"<li>4、欢迎您订阅电子函件，请注意查收。电子函件的类型包括：《个人分红保险和交费提醒通知书》、《保额分红通知书》、《满期金给付通知书》、《万能年度报告通知书》。</li>"
				}
			}
		},
		methods:{
			jumpToNewPage() {
				//缴费账号变更
				if(this.businessType == 0) {
					this.$router.push({path:'/policylist'})
				}//证件有效期变更
				else if(this.businessType == 1) {
					this.$router.push({path:'/idcard'})
				}
				//退保
				else if(this.businessType == 2) {
					this.$router.push({path:'/policylist'})
				}
				else if(this.businessType == 3) {
					this.$router.push({path:'/contact/taxType'})
				}
			}
		},
		components: {
			Note,
			SingleButton
		}
	}
</script>

<style>
</style>
