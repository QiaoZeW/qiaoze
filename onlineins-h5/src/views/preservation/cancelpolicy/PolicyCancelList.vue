<template>
    <div v-if="showPic" class="blankPolicy">
        <p class="particular"></p>
        <p class="tips" ><img src="@/assets/imgs/externalPay/blankPolicy.png"  /></p>
    </div>
    <div v-else class="container_l">
        <div v-for="(policy,index) in policyList" :key="index" class='item-outer' >
			<div class='item-up'>
				<span class='label'>保单号:</span>
				<span class='label'>{{policy.contNo}}</span>
				<span class='corner-right-up'>有效</span>
			</div>

			<div class='item-down'>
				<div class="row-1">
					<span>主险名称:</span>
					<span>{{policy.mainRiskShortName}}</span>
				</div>

				<div class="row-2">
					<span>被保险人:</span>
					<span>{{policy.insuredName}}</span>
				</div>
				<div class='btn-right' @click="goDetail(policy)">查看保单详情</div>
			</div>
            <div class="ins-fill"></div>
		</div>
		<!-- 进入页面弹窗 默认为true -->
		<md-dialog
            title="用户须知"
            :closable="false"
            v-model="userNotesDialog.open"
            :btns="userNotesDialog.btns"
        >
            <div class="ins-yhxz-body">
                <p>重要提示：保险合同非常重要，请您详细了解保单利益，慎重选择退保。</p>
                <p>1.本次保险合同变更申请须由投保人本人操作。</p>
                <p>2.自您成功提交退保申请之日起，保险合同即被解除，我公司不再承担保险责任。</p>
                <p>3.为保障您资金的安全性，退保金将支付到您的交费账户，请保持账户可以正常转账。</p>
                <p>4.如果您的保单有未清偿的保单贷款，我们将从退保金重直接和除贷款本金和利息。</p>
                <p>5.退保完成后，您须将纸质保单和交费凭证作废，如因纸质保单或交费凭证遗失或未及时作废而产生的相关风险，本公司不承担任何责任。</p>
                <p style="padding-bottom: 14px;">6.如有疑问，请您联系保单服务人员，所在客服中心或拨打<span style="color:#E10312;">95542</span>咨询。</p>
            </div>
        </md-dialog>
        <div v-show="userNotesDialog.open" class="img-icon" @click="change()"></div>
        <md-dialog
            :closable="false"
            v-model="cancelDilog.open"
            title="提示信息"
            :btns="cancelDilog.btns"
        >
            <p>
                {{message}}
            </p>
        </md-dialog>
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	import { Dialog, Toast } from 'mand-mobile'
	import MaskNote from '@/components/preservation/MaskNote'
    export default {
        name: "PolicyCancelList",
        data() {
            return {
				policyList:[],
                cancelDilog: {
                    open: false,
                    btns: [
                        {
                            text: "确定"
                        }
                    ]
                },
				userNotesDialog: {
					open:false,
				},
                message:'',
                showPic: true,
            }
		},
		components:{
			MaskNote
		},
        computed: {
            ...mapState(['Ybt']),
        },
        mounted() {
            this.selectPolicyList();
            // this.policyList = [
            //     {
            //         contNo: '123',
            //         mainRiskShortName: ''
            //     }
            // ]
            // this.showPic = false
        },
        methods: {
            back() {
                window.location.href = this.$router.siteUrl() + '/preservation/SelfPreservation.html'
            },
            change: function () {
                this.userNotesDialog.open = false;
            },
            selectPolicyList(){
                var d={
                    "edorType":"YT",
                    "operatorType":"bnzx",
                    "operator":"bnzx",
                    "customerNo":this.Ybt.customerNo,
					// "customerNo":'90000006469438',
                    "operate":"Init"
                };
                let that = this
                this.$app.getCurrentToken(userToken=>{
                    // if(!userToken){
                    //     userToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTA0MDM1MjE4MDAwMzUiLCJleHAiOjE1Nzg3MTI1MTN9.j7PckcWWCRjOdsmQDRJjGo31BPBVzqyHXHwm4VJxX4YHIvHOcEVQe9ZmnaQCgkwGXjeQ6UY6jKWcJF5l5Oa5nA';
                    // }
                    that.$prequest({
                        isLoading:true,
                        url: '/policy/cancel/init',
                        method: 'POST',
                        contentType: 'application/json;charset=UTF-8',
                        data: d,
                        userToken: userToken,
                        successFn: (data) => {
                            if(data.contList) {
                                that.showPic = false
                                that.policyList  = data.contList;
                                //弹出提示
                                that.userNotesDialog.open = true;
                            } else {
                                Toast({
                                    content: '您没有可以退保的保单',
                                })
                            }
                            
                        },
                        failFn: (data) => {
                            Toast({
                                content: '您没有可以退保的保单',
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
            goDetail(policy){
                if( policy.mainRiskShortName == '顺心保意外医疗' ) {
                    this.cancelDilog.open = true
                    this.message = '如需退保请联系95542。'
                    return
                }
                window.location.href =this.$router.siteUrl() + "/preservation/cancelpolicy/PolicyCancelDetail.html?contNo=" +policy.contNo;
            }
        }
    }

</script>
<style lang="scss">
    .md-popup-box{
        margin-top: -100px;
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
	.item-outer{
		width: 100%;
		height: 236px;
		box-shadow:0px 0px 10px 0px rgba(0,0,0,0.08);
		border-radius:10px;
		margin-top: 20px;

	}
	.item-outer:nth-of-type(1){
		margin-top: 0;
	}
	.item-up{
		width: 100%;
		height: 80px;
		background-color: #E10312;
		font-size:32px;
		font-weight:500;
		color:rgba(255,255,255,1);
		border-radius: 10px 10px 0 0;
		position: relative;
		overflow: hidden;
		.label{
			display: inline-block;
			height: 80px;
			line-height: 80px;
			margin-left: 24px;
		}
		.corner-right-up{
			display: inline-block;
			height: 44px;
			line-height: 44px;
			color: #E10312;
			background: rgba(255,255,255,1);
			font-size:28px;
			transform: rotate(45deg);
			position: absolute;
			right: -36px;
			width: 132px;
			text-align: center;
		}
	}
	.item-down{
		width: 100%;
		height: 156px;
		background-color: rgb(255, 255, 255);
		border-radius: 0 0 10px 10px;
		font-size:28px;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		position: relative;
		.row-1{
			position:absolute;
			left: 24px;
			top: 32px;
			height: 40px;
			span{
				display: inline-block;
				line-height:40px;
				height:40px;
			}
		}
		.row-2{
			position:absolute;
			left: 24px;
			bottom: 32px;
			height: 40px;
			span{
				display: inline-block;
				line-height:40px;
				height:40px;
			}
		}
		.btn-right{
			position: absolute;
			bottom: 32px;
			right: 24px;
			height: 40px;
			font-size:28px;
			font-weight:400;
			color:rgba(225,3,18,1);
			line-height:40px;
		}
	}
    .ins-yhxz-body{
        height:700px;
        overflow-y:auto;

    }

    .ins-yhxz-body::-webkit-scrollbar { display:none;width: 0 !important }

		.img-icon{
            z-index:1501;
            position: fixed;
            bottom:90px;
            left:50%;
            transform: translateX(-50%);
			width: 76px;
			height: 76px;
			background: url('../../../assets/imgs/surrender/X@2x.png') center center no-repeat;
			background-size: 76px auto;
		}

.ins-fill{
    height:100px;
}


</style>
