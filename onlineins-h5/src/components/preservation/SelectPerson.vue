<template>
	<div class="nini">
        <div class="ins-title">
            投保人
        </div>
        <ul class="ins-list">
            <li v-for="(item,index) in appntList" :key="index" class="ins-item-appnt" :class="{'active':(item.customerNo===selectedPerson)}" @click="clickPerson(item)">

                <div class="ins-item-img"></div>

                <div class="ins-item-label">{{item.name}}</div>
            </li>
        </ul>
        <div class="ins-line">

        </div>
        <div class="ins-title">
            被保人
        </div>
        <ul class="ins-list">
            <li v-for="(item,index) in insuredList" :key="index" class="ins-item-insured" :class="{'active':(item.customerNo===selectedPerson)}" @click="clickPerson(item)">
                <div class="ins-item-img"></div>
                <div class="ins-item-label">{{item.name}}</div>
            </li>
        </ul>

	</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SelectPerson',
        data() {
            return {
                selectedPerson: "",
                appntList: [

                ],
                insuredList: [

                ],
            }
        },
        created() {
             this.selectPersonList();
        },
        mounted() {

        },
        computed: {
            ...mapState(['Ybt']),
        },
        methods: {
            clickPerson(person){
               this.selectedPerson=person.customerNo;
			   this.$emit('clickPerson',person)
            },
            selectPersonList(){
                var d_1={
					"edorType":"CM",
					"operatorType":"a",
					"operator":"wx",
					"customerNo":this.Ybt.customerNo,
                    // customerNo: "90000006412408",
					"operate":"Query"
                };
                var d_3={
                	"edorType":"CD",
                	"operatorType":"a",
                	"operator":"wx",
                	"customerNo":this.Ybt.customerNo,
                    // customerNo: "90000006412408",
                	"operate":"Query"
                };
				let that = this
                // if(true){ 
                if(this.Ybt.businessType == '1'){            //证件有效期变更
                    this.$app.getCurrentToken(userToken=>{
                        that.$prequest({
                            url: '/customerdata/query',
                            method: 'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data: d_1,
                            userToken: userToken,
                            // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
                            successFn: (data) => {
                                var customers = data.customerInfoDtos;
                                that.appntList=[];
                                that.insuredList=[];
                                customers.forEach(customer=> {
                                    if(customer.customerType=='i'){//被保人
                                        that.insuredList.push(customer);
                                    }
                                    else if(customer.customerType=='a'){//投保人
                                        that.appntList.push(customer);
                                    }
                                });
                            },
                            failFn: (data) => {
                            }
                        })
                    });
                }else if(this.Ybt.businessType == '3'){       //联系方式变更
                // }else if(true){
                    this.$app.getCurrentToken(userToken=>{
                        that.$prequest({
                            url: '/contact/cust/list',
                            method: 'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data: d_3,
                            userToken: userToken,
                            // userToken : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwOTMwMDk0MDQ1MDAwMDIiLCJleHAiOjE1NzM0NjIyNTZ9.EHZtmUoxMGA2uCNXrbGrw_0w6999pB3Kh5PVA-xqBPC_5I4-qjxATtCy7hyI-CCyhxDIilXP1fIlQeU41NOq0Q',
                            successFn: (data) => {
                                var customers = data;
                                that.appntList=[];
                                that.insuredList=[];
                                customers.forEach(customer=> {
                                    if(customer.customerType=='i'){//被保人
                                        that.insuredList.push(customer);
                                    }
                                    else if(customer.customerType=='a'){//投保人
                                        that.appntList.push(customer);
                                    }
                                });
                            },
                            failFn: (data) => {
                            }
                        })
                    });
                }
            },
			goNext(){
				//将选择的客户号放入session中
                localStorage.setItem('selectedPerson', this.selectedPerson)
				//跳转证件上传页面
                window.location.href =this.$router.siteUrl() + "/preservation/CardUpload.html";
			}

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/preservation/reuse.scss";
    .nini{
        width: 672px;
        margin: auto;
    }
    html, body {
        width: 100%;
        height: 100%;
        background: #F2F2F2;
    }

    .ins-container {
        padding: 30px;
        background: #FFF;
    }

    .ins-title {
        color: #333333;
        font-size: 28px;
        padding: 20px 0;
        margin-top: 40px;
        font-weight: 500;
    }

    .ins-list {
        display: flex;
        flex-wrap: wrap;
    }

    .ins-item-appnt,.ins-item-insured {
        width: 270px;
        flex-shrink: 0;
        border-radius: 16px;
        border: 2px solid #666666;
        padding: 20px 0 20px 40px;
        margin-top: 40px;
        margin-right: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .ins-item-appnt.active, .ins-item-insured.active {
        border: 2px solid #E10312 !important;
    }
    .ins-item-appnt.active .ins-item-img {
        background-image: url("../../assets/imgs/preservation/appnt_selected.png") !important;
    }
    .ins-item-insured.active .ins-item-img {
        background-image: url("../../assets/imgs/preservation/insured_selected.png") !important;
    }
    .ins-item-appnt.active .ins-item-label ,.ins-item-insured.active .ins-item-label{
        color: #E10312 !important;
    }
    .ins-item-appnt .ins-item-img{
        background-image: url("../../assets/imgs/preservation/appnt_unselected.png");
    }
    .ins-item-insured .ins-item-img{
        background-image: url("../../assets/imgs/preservation/insured_unselected.png");
    }
    .ins-item-img {
        flex: 0 0 auto;
        width: 50px;
        height: 54px;
        background-size: 100% 100%;
    }

    .ins-item-label {
        flex: 1;
        line-height: 54px;
        font-size: 30px;
        color: #666666;
        margin-left: 40px;
        font-weight: 400;
    }
    .ins-item-appnt:nth-child(2n+0),.ins-item-insured:nth-child(2n+0) {
        margin-right: 0px;
    }

    .ins-line {
        width: 100%;
        height: 20px;
        margin-top: 40px;
        margin-bottom: 40px;
        border-bottom: 2px dashed #666666;
    }
</style>
