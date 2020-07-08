<template>
    <div class="section" >
        <button  class="refresh" v-if="refresh" @click="isRefresh">刷 新</button>
    </div>
</template>

<script>
    import {Toast} from 'mand-mobile'
    export default {
        name: 'waitalipayresult',
        data() {
            return {
                randomTime: Date.now(),
                refresh: false, //刷新按钮
                callTimes: 0,  //加载次数
                agentCode: '',
                product_id: '',
                orderNo:'',
            }
        },
        created(){
            this.agentCode=this.$router.query('agentCode')
            this.orderNo = this.$router.query("order_id");
            this.aliPayResult()
            let _this = this
            var clearId = setInterval(function () {
                if(_this.callTimes < 3) {
                    _this.aliPayResult()
                    console.log("1")
                }else {
                    clearInterval(clearId)
                    _this.refresh = true
                    Toast.hide()
                    console.log("2")
                }
            },3000)
        },
        methods: {
            isRefresh(){
                this.refresh = false
                let _this = this
                if(!this.refresh){
                    this.aliPayResult()
                    setInterval(function () {
                        Toast.hide()
                        _this.refresh = true
                    },3000)
                }
            },
            //支付宝支付结果返回接口
            aliPayResult(){
                let _this = this
                _this.callTimes ++
                Toast.loading('订单处理中...', 0, true)
                _this.$request({
                    url: `/alipay/aliPayResult/${_this.orderNo}`,
                    contentType: "application/json;charset=UTF-8",
                    successFn: data => {
                        if(data.actGiftFlag && data.actGiftFlag == "8"){
                            window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                        }else if (data.actGiftFlag && data.actGiftFlag == "7") {
                            window.localStorage.setItem("actGiftFlag",data.actGiftFlag)
                            window.localStorage.setItem("actGiftErrMsg",data.actGiftErrMsg)
                        } else {
                            window.localStorage.setItem("actGiftFlag","")
                            window.localStorage.setItem("actGiftErrMsg","")
                        }
                        Toast.hide()
                        window.localStorage.setItem("getContNum", JSON.stringify(data.contNo));
                        if(data.modelCode == 1){
                            window.location.href = "Successful.html?product_id=" + data.productId + "&agentCode=" + data.agentCode+ "&randomTime=" + _this.randomTime;
                        }else{
                            window.location.href = "Successful.html?product_id=" + data.productId + "&randomTime=" + _this.randomTime;
                        }
                    },
                    failFn: data => {
                        Toast.hide()
                        if(data.data.modelCode == 1){
                            window.location.href = "AgainOrderPayment.html?product_id=" + data.data.productId + "&agentCode=" + data.data.agentCode + "&orderNo=" + data.data.orderNo;
                        }else{
                            window.location.href = "AgainOrderPayment.html?product_id=" + data.data.productId + "&orderNo=" + data.data.orderNo;
                        }
                    },
                    errorFn: () => {
                        Toast.hide()
                        console.log('error')
                    }
                 });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .refresh{
        border-radius: 0.08rem;
        width: 3.6rem;
        height: 1.1rem;
        font-size: 0.4rem;
        background: #f00;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>
