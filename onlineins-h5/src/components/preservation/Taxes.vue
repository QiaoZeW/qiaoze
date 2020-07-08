<template>
	<div>
		<ul class="TaxesList">
			<li :class="index == currentClick? 'TaxItem_c' : 'TaxItem'" v-for="(item,index) in TaxesList" @click="chooseTaxer(index,item.tip)" :key="index">
				<div class="upHalf">
					<img :src=item.imgPath alt="">
				</div>
				<div class="downHalf">
					<p class="itm_font">
						<span>{{ item.context }}</span>
					</p>
				</div>

			</li>
		</ul>
        <div class="nini">
            <div class="tip-outer">
                    <p class="tip">
                        <span>
                            {{tip}}
                        </span>
                    </p>
                </div>
            <div class="middle-line"/>
            <div class="title-1" v-if="userNotes.length!=0">用户须知</div>
            <ul class="userNotes" v-if="userNotes.length!=0">
                <li v-for="(userNote,index) in userNotes" :key="index">{{userNote.text}}</li>
            </ul>
            <div class="title-1" v-show="reminders.length!=0">温馨提示</div>
            <ul class="userNotes" v-show="reminders.length!=0">
                <li v-for="(reminder,index) in reminders" :key="index">{{reminder.text}}</li>
            </ul>
            <div class="myb"></div>
        </div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'Taxes',
		data() {
			return {
				TaxesList: [
					{
						id: 0,
						imgPath: require("@/assets/imgs/preservation/taxes/tax_not_resident.png"),
						context: '仅为非居民',
						tip: '根据监管机关要求，您需要到当地的客服柜面办理相关保全手续。'
					},
					{
						id: 1,
						imgPath: require("@/assets/imgs/preservation/taxes/tax_chinese_only.png"),
						context: '仅为中国税收居民',
						tip: '本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则，本人承担由此造成的不利后果。'
					},
					{
						id: 2,
						imgPath: require("@/assets/imgs/preservation/taxes/tax_other_either.png"),
						context: '既是中国税收居民又是其他国家税收居民',
						tip: '根据监管机关要求，您需要到当地的客服柜面办理相关保全手续。'
					}
				],
				currentClick:1,
				originList:[],
				tip: ''
			}
		},
		mounted(){
			this.originList = [...this.TaxesList]
			this.chooseTaxer(1,'本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则，本人承担由此造成的不利后果。')
		},
		methods:{
			chooseTaxer(index,tip){
				this.tip = tip;
				this.currentClick = index;
				if(index === 0) {
					Vue.set(this.TaxesList, index, {
							id: 0,
							imgPath: require("@/assets/imgs/preservation/taxes/tax_not_resident_c.png"),
							context: '仅为非居民',
							tip: '根据监管机关要求，您需要到当地的客服柜面办理相关保全手续。'
						})
				} else if(index === 1) {
					Vue.set(this.TaxesList, index, {
						id: 1,
						imgPath: require("@/assets/imgs/preservation/taxes/tax_chinese_only_c.png"),
						context: '仅为中国税收居民',
						tip: '本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则，本人承担由此造成的不利后果。'
					})
				} else if(index === 2) {
					Vue.set(this.TaxesList, index, {
						id: 2,
						imgPath: require("@/assets/imgs/preservation/taxes/tax_other_either_c.png"),
						context: '既是中国税收居民又是其他国家税收居民',
						tip: '根据监管机关要求，您需要到当地的客服柜面办理相关保全手续。'
					})
				}
				this.reset(index)
				this.$emit('chooseTax', index);
			},
			reset(index) {
				for(let item in this.TaxesList) {
					if(!(index == this.TaxesList[item].id)) {
						Vue.set(this.TaxesList, item, this.originList[item])
					}
				}
			}
		},
		props:{
			userNotes: Array,
			reminders: Array
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/preservation/reuse";
    .nini{
        width: 672px;
        margin: auto;
    }
	.TaxesList{
        width: 672px;
		display: flex;
        margin:auto;
		li:nth-child(1){
		    margin-left: 0;
		};
		li:nth-child(3){
		    margin-right: 0;
		};
	}
	.TaxItem{
		margin: 18px;
		margin-top: 0;
		margin-bottom: 0;
		width:200px;
		height:260px;
		background:rgba(255,255,255,1);
		border-radius:16px;
		border:2px solid rgba(102,102,102,1);
		position: relative;

		.itm_font{
			display: table-cell;
			width: 30%;
			vertical-align: middle;
			text-align: center;

			font-size:24px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:34px;
		}
		img{
			position: absolute;
			left: 0;
			top: 0;
			right: 0%;
			bottom: 0;
			width:29px;
			width:29px;
			margin: auto;
		}
	}
	.TaxItem_c{
		margin: 18px;
		margin-top: 0;
		margin-bottom: 0;
		width:200px;
		height:260px;
		background:rgba(255,255,255,1);
		border-radius:16px;
		border:4px solid rgba(225,3,18,1);
		position: relative;

		.itm_font{
			display: table-cell;
			width: 30%;
			vertical-align: middle;
			text-align: center;

			font-size:24px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(225,3,18,1);
			line-height:34px;
		}
		img{
			position: absolute;
			left: 0;
			top: 0;
			right: 0%;
			bottom: 0;
			width:29px;
			width:29px;
			margin: auto;
		}
	}
	.upHalf{
		width: 100%;
		height: 45%;
		position: relative;
	}
	.downHalf{
		display: table;
		width: 144px;
		height: 55%;
		position: absolute;
		left: 0;
		right: 0;
		bottom:2%;
		margin: auto;
	}
	.tip-outer{
		display: table;
		width:680px;
		height:138px;
		margin-top: 40px;
	}
	.tip{
		display: table-cell;
		vertical-align: middle;
		width:680px;
		height:138px;
		background:rgba(253,151,81,1);
		border-radius:16px;
		font-size:24px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:34px;
		text-align: justify;

		padding-left: 20px;
		padding-right:20px;
	}
	.middle-line{
		height: 40px;
		width: 680px;
		border-bottom: dashed 1px;
	}
	.title-1{
		font-size:28px;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(51,51,51,1);
		width:200px;
		height:40px;
		line-height: 40px;
		margin-top: 40px;
	}
	.userNotes{
		margin-top: 20px;
		width:680px;
		font-size:26px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:36px;
		li{
			text-align: justify
		}
	}
</style>
