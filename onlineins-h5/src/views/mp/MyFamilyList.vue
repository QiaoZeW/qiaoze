<template>
    <div class="section" >
        <div v-show="dataBoolean">
            <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2" v-for="(item,index) in vipUserConnect" :key="index">
                <md-field >
<!--                    <md-cell-item :title="item.name" :brief="item.cardNo" addon="" arrow  @click="editMyFamily(item)" style="float: left"/>-->
                    <md-cell-item arrow @click="editMyFamily(item)">
                    <div class="familyTitle">
                        <div class="itemName">{{item.name}}</div>
                        <div class="relationShips" v-if="item.relationToAppnt">{{item.relationToAppnt}}</div>
                    </div>
                    <div class="zhi">
                        {{item.cardNoR}}
                    </div>
                    </md-cell-item>
                </md-field>
                <div class="contentBottom">
                    <a class="justDown_one" @click="addMyFamily()">
                        <span>添加家庭成员</span></a>
                </div>
            </div>
        </div>

        <div v-show="!dataBoolean" align="center" style="position: absolute; right: auto;
        top: auto;" class="center-all">
            <img src="@/assets/imgs/myFamily.jpg" alt=""  class="center-img">
            <md-field class="noData" >
                <span>您尚未添加您的家庭成员</span>
            </md-field>
            <md-button  type="warning" plain round @click="addMyFamily()" class="center-button">立即添加</md-button>
        </div>

    </div>
</template>

<script>
    import {
        Agree,
        ActionBar,
        Field,
        FieldItem,
        InputItem,
        Picker,
        Icon,
        Toast,
        Dialog,
        Button,
        TabPicker,
        Captcha,
        CellItem
    } from 'mand-mobile'
    import Vue from 'vue'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import job8 from '@/static/job8'
    import job10 from '@/static/job10'
    import addressdata from '@/static/addressInsure'
    import addressdata_new from '@/static/addressInsure_new'
    import addressdataAll from '@/static/addresstest'
    import agentAddressData from '@/static/agentAddressInsure'
    import Settings from '~/settings.json'
    import { getRiskTypeName } from "@/utils/dictionary"
    import Agreement from '@/components/BuyComp/Agreement'
    import TabpickerSup from '@/components/BuyComp/TabpickerSup'
    import TipComp from '@/components/BuyComp/TipComp'

    export default {
        name: 'MyFamilyList',
        components: {
            [Agree.name]: Agree,
            [ActionBar.name]: ActionBar,
            [Field.name]: Field,
            [CellItem.name]: CellItem,
            [FieldItem.name]: FieldItem,
            [InputItem.name]: InputItem,
            [Picker.name]: Picker,
            [Dialog.name]: Dialog,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [TabPicker.name]: TabPicker,
            [Captcha.name]: Captcha,
            Whirl,
            Error,
            Agreement,
            TabpickerSup,
            TipComp
        },
        data() {
            return {
                vipUserConnect : [],
                dataBoolean:true,
                code:'',
                userToken: ''
            }
        },
        created() {
            document.title = '我的家庭';
            // this.dataBoolean = true;
            // this.vipUserConnect = [{
            //     name:'宋知航',cardNoR:'身份证：110101199403073158',relationToAppnt:'本人'},
            //     {name:'谢大脚',cardNoR:'身份证：110101199403073158',relationToAppnt:'妻子'
            // }];
            // return;
            this.code = this.$router.query('code') || ''
            this.getToken(() => {
                this.userToken = JSON.parse(window.localStorage.getItem("MY_FAMILY_TOKEN"))
            this.getMyFamilyList();
        });

        },
        mounted() {
        },
        computed: {
        },
        methods: {
            getToken(callBack) {
                var code = this.code;
                //避免返回造成code失效
                if (code&&code !==window.localStorage.getItem("LAST_CODE")) {
                    this.$request({
                        url: '/portal/startMp',
                        method: 'POST',
                        isLoading: true,
                        data: {code: code},
                        contentType: 'application/json',
                        successFn: (data) => {
                        window.localStorage.setItem("LAST_CODE",code);
                    window.localStorage.setItem("MY_FAMILY_TOKEN", JSON.stringify(data.accessToken));
                            //神策登录
                            sensors.login(data.userCode);
                    callBack();
                },
                    failFn: (data) => {
                        Toast.info(data.resultMsg)
                    }
                })
                } else {
                    callBack();
                }


            },
            editMyFamily(data){
                window.localStorage.setItem("myFamilyData",JSON.stringify(data));
                location.href = this.$router.siteUrl() +`/mp/MyFamilyAdd.html?id=${data.id}`
            },
            addMyFamily(){
                location.href = this.$router.siteUrl() +`/mp/MyFamilyAdd.html?id=`
            },
            getMyFamilyList(){
                let that =this;
                this.$request({
                    userToken:that.userToken,
                    url: `/vip/contact/getInsured`,
                    successFn: (res) => {
                        //res = [];
                        if(res.length==0){
                            that.dataBoolean = false;
                        }else{
                            that.dataBoolean = true;
                        }
                        for (var i = 0; i < res.length; i++) {
                            window.localStorage.setItem("myFamilyAllData",res);
                            res[i]['relationToAppntValue'] = res[i].relationToAppnt;
                            res[i].relationToAppnt = that.getRelationNameByCode(res[i].relationToAppnt, res[i].gender);
                            res[i]['cardNoR'] = "身份证号：" +   res[i].cardNo.substr(0,3) + '*** **** ****' + res[i].cardNo.substr(res[i].cardNo.length-4,4);
                            res[i].cardNo = "身份证号：" +  res[i].cardNo;//脱敏显示
                        }
                        that.vipUserConnect=res
                    },
                   errorFn: () => {

                   }
                });
            },
            getRelationNameByCode(relationCode,sex){
                if (relationCode == '00') {//本人
                    return "本人";
                }
                if (relationCode == '01') {//配偶
                    if (sex == '1') {//1女 0男
                        return "妻子";
                    } else {
                        return "丈夫";
                    }
                }
                if (relationCode == '02') {//父母
                    if (sex == '1') {
                        return "母亲";
                    } else {
                        return "父亲";
                    }
                }
                if (relationCode == '03') {//子女
                    if (sex == '1') {
                        return "女儿";
                    } else {
                        return "儿子";
                    }
                }
            }
        },
        filters: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    .section {
        background: #fff;
        padding-bottom: px2em(150px);
    }

    .contentMiddle {
        color: #666;
        background: #fff;
        /*margin-bottom: 150px;*/
        p {
            font-size: 28px;
            padding: 20px 30px 0;
            line-height: 45px;
        }
        h3 {
            margin-bottom: 20px;
            font-size: 32px;
            font-weight: bold;
            padding-left: 20px;
            padding-top: 20px;
            color: #333;
        }
    }
    .contentBottom {
        background:rgba(255,255,255,1);
        display: flex;
        height: 100px;
        position: fixed;
        width: 100%;
        z-index: 100 !important;
        bottom: 0;
        left: 0;
        padding: 25px 35px;

    }
    .md-field {
        padding-bottom: 0px !important;
    }


    .justDown {
        background: rgb(215, 0, 15);
        text-align: center;
        font-size: 34px;
        color: #fff;
    }

    .holder {
        display:block;
        width:88px;
        height:88px;
        border-radius:44px;
        background-color:#E6E6E6;
    }
    .noData {
        margin-top: 20px;
        text-align: center;
        font-size: 34px;
        /*width:600px;*/
        height:50px;
        /*font-size:13px;*/
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:50px;
        margin-bottom: 30px;
    }
    .center-all{
        /*display: table-cell ;*/
        font-size: 0 ;
        text-align: center;
        height: 300px;
        width: 100%;
        vertical-align: middle ;
        margin-top: 35%;
    }
    .center-img{
        width:210px;
        height:160px;
        background:rgba(255,255,255,1);
        display: inline-block ;
        text-align: center;
        /*margin-left: 30%;*/
    }
    .center-button{
        width: 430px;
        height: 80px;
        text-align: center;
        display: inline-block ;
    }
    .justDown_one{
        width:90%;
        height:100%;
        background:rgba(225,3,18,1);
        border-radius:5px;
        border:1px solid rgba(225,3,18,1);
    }
    .justDown_one span{
        padding: 0px;
        width:20rem;
        height:100px;
        text-align:center;
        font-size:40px;
        font-family:PingFangSC-Medium,PingFang SC;
        /*font-weight:bold;*/
        color:rgba(255,255,255,1);
        display: table-cell;
        vertical-align:middle;
    }
    .relationShips{
        width:88px;
        height:32px;
        background:linear-gradient(90deg,rgba(253,114,95,1) 0%,rgba(229,48,43,1) 100%);
        border-radius:28px;
        color:rgba(255,255,255,1);
        line-height:32px;
        text-align: center;
        float: left;
        margin-left: 20px;
        font-size:24px;
        align-items: center;
    }
    .itemName {
        height:44px;
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:44px;
        float: left;
    }
    .familyTitle {
        height: 50px;
        display:flex;
        align-items: center;
    }
    .zhi{
        /*width:400px;*/
        height:17px;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:17px;
        margin-top: 10px;
    }

</style>
