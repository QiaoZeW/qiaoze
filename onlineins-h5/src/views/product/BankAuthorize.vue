<template>
    <div class="content">
        投保人（以下简称本人）对百年人寿保险股份有限公司（以下简称百年人寿）及授权的开户银行（以下简称银行）授权如下：<br/>
        1、本人同意委托百年人寿，从本人的授权账户中扣取本保险合同所需缴纳的保险费，并保证授权账户中有足够的金额支付应交保险费。<br/>
        2、本人确认授权的银行账户所有人为投保人本人账户的开户银行、户名和账号均真实有效，续期交费账户与首期保费交纳账户为同一账户。<br/>
        3、本人同意若因账户挂失、账户冻结、账户余额不足或其他非银行原因造成转账不成功，致使产生保险合同终止的任何后果或投资账户的费用损失，因此引起的责任概由本人承担。<br/>
        4、如本人在同一指定账户内同时授权两张或两张以上保险单中的保险费或其他自动转账业务时，本人同意依照百年人寿规定的转账顺序转账。<br/>
        5、本人投保后若办理退保或退费业务，同意百年人寿将应退金额通过银行划转入该账户。<br/>
        6、本人因故结清账户，会重新开立账户，并及时通过百年人寿进行变更。如本人欲终止本授权，应立即向百年人寿递交终止的书面申请，由百年人寿知会银行停止转账；若因本人未及时办理账户变更手续而导致退保给付金无法按时给付，则同意百年人寿按退保申请日的给付金额支付。<br/>
        7、本人同意百年人寿进行首期保险费的划转；对于一年期以上的产品，百年人寿可在保险费约定支付日之前及时通知本人交纳续期保险费。<br/>

    </div>
</template>

<script>
    export default {
        name: "BankAuthorize",
        created(){
            document.title = '银行转账授权书'
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('backHomeConfig', {
                    'flag_back': 0, //是否返回按钮，1-返回 0-不返回
                }, function (response) {
                });
            })
            this.product_id = this.$router.query("product_id");
            this.$app.wxProductDetail(this.product_id, 1)
        }
    }
</script>

<style scoped lang="scss">
 .content{
     width: 94%;
     margin-left: 3%;
     margin-top: .5rem;
     margin-bottom: .5rem;
 }
</style>
