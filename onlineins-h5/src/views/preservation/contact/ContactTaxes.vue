<template>
	<div class="container-1">
		<Taxes :userNotes="userNotes" :reminders="reminders" @chooseTax="chooseTax"/>
		<div class="used"></div>
		<md-agree
		  v-model="agreeConf.checked"
		  :disabled="agreeConf.disabled"
		  :size="agreeConf.size"
		  @change="onChange(agreeConf.name, agreeConf.checked, $event)"
		>
		  我已阅读并同意授权
		  <span class="userAdd" @click="showPopUp('bottom', 'agreementShow')">《授权条款》</span>
		</md-agree>
		<md-popup v-model="isPopupShow.bottom" position="bottom" class="myPopup">
		  <md-popup-title-bar
		    :title="popTitle"
		    ok-text="确认"
		    cancel-text="取消"
		    @confirm="hidePopUp('bottom',1)"
		    @cancel="hidePopUp('bottom',2)"
		  ></md-popup-title-bar>
		  <MustKnow :agreementShow="agreementShow"/>
		</md-popup>
        <md-dialog
            :closable="false"
            v-model="iconDialog.open"
            title="提示信息"
            :btns="iconDialog.btns"
        >
            <p>
                {{message}}
            </p>
        </md-dialog>
        <div style="width:100%; height: 118px;"></div>
		<div class="mainBtn">
			<button :class="currentChoose == 1?'may_btn':'disable_btn'" @click="goNext()">{{btnValue}}</button>
		</div>
	</div>
</template>

<script>
	import Taxes from '@/components/preservation/Taxes'
	import MustKnow from '@/components/preservation/MustKnow'
    import { Toast} from 'mand-mobile'
	export default {
		name: 'ContactTaxes',
		data(){
			return {
				userNotes:[
					{
						text:'1、请您准确地填写您的联系信息，我们将按照您留下的联系方式，为您提供交费提醒，信函寄送，投资报告等后续服务。'
					},
					{
						text:'2、地址变更将会同时变更您名下的所有保单地址，如您仅需要变更其中一张保单地址，请联系您的服务人员为您处理。'
					},
					{
						text:'3、为保证我们的服务质量，请留存您准确的联系信息。如果您的联系信息发生变更，请及时更新。'
					},
					{
						text:'4、欢迎您订阅电子函件，请注意查收。电子函件的类型包括：《个人分红保险和交费提醒通知书》、《保额分红通知书》、《满期金给付通知书》、《万能年度报告通知书》。'
					}
				],
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: "确定"
                        },
                
                    ]
                },
				reminders:[
                    {
                        text: '中国税收居民是指在中国境内居民（港澳台居民除外）有住所，或者无住所而在境内（港澳台地区除外）居住满一年的个人。在中国境内（港澳台地区除外）有住所是指因户籍、家庭、经济利益关系而在中国境内（港澳台地区除外）习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内（港澳台地区除外）居住365日，临时离境的，不扣减日数，临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。非居民是指中国税收居民以外的个人。'
                    }
				],
				currentChoose: 1,
				btnValue: '下一步',
				agreeConf: {
				  checked: false,
				  name: "agree0",
				  size: "md",
				  disabled: false,
				  introduction: "选中状态"
				},
				agreementShow: true,
				popTitle: "授权条款",
				isPopupShow: {},
                message: ""
			}
		},
		methods:{
			goNext(){
				if(this.btnValue != '下一步'){
					return
				}
                if(!this.agreeConf.checked) {
                    this.iconDialog.open = true
                    this.message = '您未阅读授权条款内容，无法申请本次变更'
                    return
                }
				//跳转到选择变更人员页面
				window.location.href = this.$router.siteUrl() + '/preservation/contact/SelectPersons.html'
			},
			chooseTax(index){
				this.currentChoose = index;
				if(index === 1) {
					this.btnValue = '下一步';
				} else {
					this.btnValue = '请根据要求，联系当地柜面办理'
				}
			},
			showPopUp(type, name) {
			  if (name === "agreementShow") {
			    this.popTitle = "授权条款";
			    this.agreementShow = true;
			  } 
			  this.$set(this.isPopupShow, type, true);
			},
			onChange(name, checked) {
			  // console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
			},
			hidePopUp(type, index) {
			  this.$set(this.isPopupShow, type, false);
              if( index == 1) {
                this.agreeConf.checked = true
              }
			},
		},
		components: {
			Taxes,
			MustKnow
		}
	}
</script>
<style lang="scss">
	.myPopup .md-popup-box .md-slide-up {
	  height: 70% !important;
	}
	.md-example-popup {
	  position: relative;
	  font-size: 28px;
	  font-family: DINPro;
	  font-weight: 500;
	  box-sizing: border-box;
	  background-color: #fff;
	}
	.md-example-popup-bottom {
	  width: 100%;
	  padding: 40px 35px;
	  line-height: 0.6rem;
	  p {
	    line-height: 50px;
	  }
	}
</style>
<style lang="scss" scoped>
	@import "../../../assets/css/preservation/reuse";
	.userAdd {
	  color: #c5261d;
	}
	.used {
		height: 20px;
	}
	
</style>
