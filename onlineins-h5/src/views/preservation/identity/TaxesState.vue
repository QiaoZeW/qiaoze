<template>
	<div class="container-1">
		<Taxes :userNotes="userNotes" :reminders="reminders" @chooseTax="chooseTax"/>
        <div style="width:100%; height: 118px;"></div>
		<div class="mainBtn">
			<button :class="currentChoose == 1?'may_btn':'disable_btn'" @click="goNext()">{{btnValue}}</button>
		</div>
	</div>
</template>

<script>
	import Taxes from '@/components/preservation/Taxes'
	export default {
		name: 'TaxesState',
		data(){
			return {
				userNotes:[
					{
						text:'1.该项目仅支持变更身份证件有效期，护照/户口本等其他证件不支持该操作。'
					},
					{
						text:'2.该项目不支持变更姓名、性别、证件类型、证件号码、出生日期，如以上信息有误请至公司柜面办理变更。'
					}
				],
				reminders:[
                    {
                        text: '中国税收居民是指在中国境内居民（港澳台居民除外）有住所，或者无住所而在境内（港澳台地区除外）居住满一年的个人。在中国境内（港澳台地区除外）有住所是指因户籍、家庭、经济利益关系而在中国境内（港澳台地区除外）习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内（港澳台地区除外）居住365日，临时离境的，不扣减日数，临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。非居民是指中国税收居民以外的个人。'
                    }
				],
				currentChoose: 1,
				btnValue: '下一步'
			}
		},
		methods:{
			goNext(){
				if(this.btnValue != '下一步'){
					return
				}
				//跳转到证件有效期-选择变更人员页面
				window.location.href = this.$router.siteUrl() + '/preservation/identity/DoselectPerson.html'
			},
			chooseTax(index){
				this.currentChoose = index;
				if(index === 1) {
					this.btnValue = '下一步';
				} else {
					this.btnValue = '请根据要求，联系当地柜面办理'
				}
			}
		},
		components: {
			Taxes
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/preservation/reuse";
</style>
