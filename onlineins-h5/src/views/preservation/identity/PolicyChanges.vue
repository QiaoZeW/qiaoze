<template>
    <div class="container_1">
        <div style="background:#FFF;">
        <div >
           <md-input-item
               title="姓名"
               id="name" name="name"
			   v-model="custInfo.name"
               disabled
           ></md-input-item>
           <md-input-item
               title="性别"
               id="sex" name="sex"
			   v-model="custInfo.sex"
               disabled
           ></md-input-item>
           <md-input-item
               title="生日"
               id="birthday" name="birthday"
			   v-model="custInfo.birthday"
               disabled
           ></md-input-item>
            <md-input-item
                title="国籍"
                id="country" name="country"
				v-model="idCardObj.country"
                disabled
            ></md-input-item>
           <md-input-item
               title="证件类型"
               id="cardType" name="cardType"
			   v-model="idCardObj.cardType"
               disabled
           ></md-input-item>
           <md-input-item
               title="证件号码"
               id="cardNo" name="cardNo"
			   v-model="custInfo.idNo"
               disabled
           ></md-input-item>
           <md-input-item
               title="证件有效期至"
               id="proposerName" name="proposerName"
			   v-model="idCardObj.expiryDate"
               disabled
           ></md-input-item>
        </div>
            <div class="gap"></div>
        </div>
        <div class="changeCard">
                <div class="changeCard_2">
                    变更证件有效期是否为长期
                </div>
                <div class="changeCard_3">
                    <div class="md-example-child md-example-child-switch md-example-child-switch-1">
                        <md-switch
                            v-model="isActive"
                            @change="handler('switch1', isActive, $event)"
                        ></md-switch>
                    </div>
                </div>
        </div>

        <div :class="isActive?'disAppear':'disShow'">
            <div class="changeCard_1">
                <md-field-item
                    v-if="proposerChooseIndex==1"
                    name="name"
                    title="变更后的证件有效期至"
                    placeholder="请选择"
                    arrow="arrow-right"
                    align="right"
                    :content="datePickerValue"
                    @click="isDatePickerShow = true">
                </md-field-item>
            </div>
            <md-date-picker
                ref="datePicker"
                v-model="isDatePickerShow"
                type="custom"
                title="选择变更后的证件有效期"
                large-radius
                :text-render="textRender"
                :custom-types="['yyyy', 'MM','dd']"
                :default-date="currentDate"
				:min-date="currentDate"
                @change="onDatePickerChange"
                @confirm="onDatePickerConfirm"
            ></md-date-picker>
        </div>
        <div class="mainBtn">
            <button :class="btnResult?'may_btn':'disable_btn'" @click="goNext()">提交信息</button>
        </div>
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
		<Success v-if="isSuccess"/>
    </div>

</template>

<script>
    import Vue from 'vue'
    import {mapState } from 'vuex'
    import { InputItem,
             Selector,
             Field,
             FieldItem,
             DatePicker,
             Switch,
			 Dialog,Toast, Button
    } from 'mand-mobile'
	import Success from '@/components/preservation/Success'
    export default {
        components:{
            [InputItem.name]: InputItem,
            [Selector.name]: Selector,
            [Field.name]: Field,
            [FieldItem.name]: FieldItem,
            [DatePicker.name]: DatePicker,
            [Switch.name]: Switch,
			Success
        },
        computed:{
        	...mapState(['Ybt']),
        },
        data() {
            return {
				iconDialog: {
				    open: false,
				    btns: [
				        {
				            text: "重新上传"
				        },
				        {
				            text: "进入人工审核",
				            handler: this.onIconConfirm
				        }
				    ]
				},
                isSelectorShow: false, //是否显示选择器
                selectorValue: '', //选择器值
                currentDate: new Date(), //当前日期
                isDatePickerShow: false, //是否显示时间选择器
                datePickerValue: '', //时间选择器值
                btnResult: false, //按钮是否高亮
                isActive: false, //身份证有效期是否长期开关
                proposerChooseIndex: 1, //默认选择时间
				idCardObj:{
				}, //需要变更证件有效期的客户对象
				expiryDate:'', //变更后的日期
				selectedPerson: '', //变更证件有效期的客户号
				idCardFront: '', //身份证正面
				idCardBack: '', //身份证反面
				message: '', //提示消息
				isSuccess: false, //Toast弹窗状态
                custInfo: {},
            }
        },
		created(){
			this.idCardObj = JSON.parse(localStorage.getItem('ocrInfo'))
            this.custInfo = JSON.parse(localStorage.getItem('custInfo'))
			if(this.idCardObj.expiryDate == '3000-01-01') {
				this.isActive = true
			}
			this.selectedPerson = localStorage.getItem('selectedPerson')
			this.idCardFront = localStorage.getItem('idCardFront')
			this.idCardBack = localStorage.getItem('idCardBack')
		},
        methods: {
            showSelector() {
                this.isSelectorShow = true
            },
            onSelectorConfirm({text}) {
                this.selectorValue = text
            },
            textRender() {
                const args = Array.prototype.slice.call(arguments)
                const typeFormat = args[0] // 类型
                // const column0Value = args[1] // 第1列选中值
                // const column1Value = args[2] // 第2列选中值
                const column2Value = args[3] // 第3列选中值
                if (typeFormat === 'dd') {
                    return `${column2Value}日`
                }
            },
            onDatePickerChange(columnIndex, itemIndex, value) {
                console.log(
                    `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
                        value,
                    )}`,
                )
            },
            onDatePickerConfirm(columnsValue) {
                console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
                this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
				this.expiryDate = this.datePickerValue;
				this.btnResult = true

            },
            handler(name, active) {
                console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
				//如果打开开关
				if(active) {
					this.btnResult = true;
					this.expiryDate = '3000-01-01'
				}
				//如果关闭开关 && 已选择日期
				else if( this.datePickerValue) {
					this.btnResult = true;
					this.expiryDate = this.datePickerValue;
				} else {
					this.btnResult = false;
				}
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
            goNext() {
                if(!this.btnResult) {
                    return
                }
				let that = this
				let requestData = {
					edorType: 'CM',
					operate: 'Save',
					operatorType: 'a',
					operator: 'wx',
					customerNo: that.selectedPerson,
					name:that.custInfo.name,
					sex:that.custInfo.sex == '男'?'0':'1',
					birthday:that.custInfo.birthday,
					idType:'0', //0身份证
					idTypeName:'身份证',
					idNo:that.custInfo.idNo,
					idCvaliDate:that.expiryDate,
					photo1:that.idCardFront,
					photo2:that.idCardBack,
					confirmMethod:'2',//ocr
					needManualReview:'N'//人工审核
				}
				console.log('requestData', requestData)
				this.$app.getCurrentToken(function(userToken){
					that.$prequest({
						url:'/customerdata/custsave',
						method: 'POST',
						data: requestData,
						contentType:'application/json',
						userToken: userToken,
                        isLoading: true,
						successFn: (data) => {
							//Toast弹窗操作成功
							that.isSuccess = true
							setTimeout(()=>{
								that.isSuccess = false
								//跳转保全页面 //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
								if(that.Ybt.entryType === '0') {
								    window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
								} else if(that.Ybt.entryType === '1') {
								    that.goHome()
								}
							},2000)
						},
						failFn: (data) => {
							that.message = data.resultMsg
							that.iconDialog = {
							    open: true,
							    btns: [
							        {
							            text: "确定",
							            handler: function() {
											//跳转保全页面 //ENTRYTYPE 入口类型 0：保全首页进入 1：保全服务页进入
											if(that.Ybt.entryType === '0') {
											    window.location.href =that.$router.siteUrl() + "/preservation/SelfPreservation.html";
											} else if(that.Ybt.entryType === '1') {
											    that.goHome()
											}
										}
							        }
							    ]
							}
						}
					})
				});
			}
        }
    }
</script>
<style lang="scss">
    .container_1 .changeCard_1 .md-field-item-title{
        color:#DE3030!important;
        width: 10em !important;
        padding-left: 32px;
    }
    .md-icon.icon-font:before{
        padding-right: 38px;
    }
	.md-field-item-title{
		padding-left: 32px;
	}
	.md-switch.active{
		background-color: #DE3030
	}
	.md-input-item-input{
		padding-right: 32px;
	}
</style>
<style lang="scss" scoped>
    @import "../../../assets/css/preservation/reuse";

	.changeCard{
		width: 740px;
		height: 104px;
		background: #fff;
		border-bottom: 1px solid #eeeeee;
		margin: auto;
	}
    .changeCard_1{
        width: 740px;
        height: 100px;
        background: #fff;
		margin: auto;
    }
	.changeCard_2{
		float: left;
		width:542px;
		height:48px;
		font-size: 32px;
		font-weight:400;
		color:rgba(222,48,48,1);
		line-height:104px;
		padding-left: 32px;
	}
	.changeCard_3{
		float: right;
		padding-right: 32px;
		padding-top: 22px;
	}
    .container_1{
        background: #F2F2F2;
        height: 100%;
    }
	.gap{
		width: 100%;
		height: 20px;
		background: #F2F2F2;
	}
    .disAppear{
        display: none;
    }
    .disShow{
        display: block;
    }
</style>
