<template>
    <div class="gbuycomp-wrap">
        <div class="giving">
            <md-field class="myField" title="投\被保人信息">
                <md-input-item
                    :maxlength="14"
                    placeholder="请输入您的姓名"
                    v-model="proposerName"
                    @blur="checkName(proposerName,$event)"
                >
                    <img class="person" slot="left" src="@/assets/imgs/giving/person.png" alt="">
                </md-input-item>
                <md-input-item
                    placeholder="请输入身份证号"
                    is-amount
                    v-model="proposerNameIdNo"
                    @blur="checkCard(proposerNameIdNo,$event)"
                    :maxlength="18"
                >
                    <img class="card" slot="left" src="@/assets/imgs/giving/card.png" alt="">
                </md-input-item>
                <div class="area">
                    <md-field-item
                        name="area"
                        align="left"
                        class="myArea"
                        placeholder="所在区域"
                        :content="addressStr1"
                        @click="ifAreaShow=true">
                        <img class="local" slot="left" src="@/assets/imgs/giving/local.png" alt="">
                    </md-field-item>
                </div>
                <md-input-item
                    placeholder="请输入详细地址"
                    is-amount
                    v-model="addressStr2"
                    @blur="checkDetail(addressStr2,$event)"
                    :maxlength="128"
                >
                    <img class="local" slot="left" src="@/assets/imgs/giving/local.png" alt="">
                    <md-icon
                        name="question"
                        size="lg"
                        color="#8e8e8e"
                        class="cardIcon"
                        slot="right"
                        @click="showTips()"
                    ></md-icon>
                </md-input-item>
                <div class="agreement">
                    <md-agree
                        v-model="agreeConf.checked"
                        :disabled="agreeConf.disabled"
                        :size="agreeConf.size"
                    >我已认真阅读并确认<a @click="goProductClause">《产品条款》</a><a @click="goInstruction">《投保须知》</a>
                    </md-agree>
                </div>
                <div class="subbtn">
                    <md-button type="warning" round @click="goInsure">我要领</md-button>
                </div>
            </md-field>
        </div>

        <TabpickerSup
            v-model="ifAreaShow"
            :data="addressdata"
            title="请选择地区"
            @change="addressHandleChange"
        />
        <TipComp ref="tipComp"/>
    </div>
</template>

<script>
    import {Toast, Dialog} from 'mand-mobile'
    import addressdata from '@/static/addressInsure'
    import TabpickerSup from '@/components/BuyComp/TabpickerSup'
    import {agentCodeDatas} from './agentCodeDatas'
    import TipComp from '@/components/BuyComp/TipComp'
    export default {
        name: "Gbuycomp",
        data() {
            return {
                ifAreaShow: false,
                info: {
                    name: '',
                    idNo: '',
                    address: '', // 地址文字
                    agentCode: '',
                    mobile: '',
                },
                userToken: '',
                agentCodeNew:'',
                agentCodeDatas: agentCodeDatas,
                agreeConf: {
                    checked: false,
                    name: 'agree0',
                    size: 'md',
                    disabled: false,
                    introduction: '选中状态',
                },
                addressdata: addressdata,
                addressStr1: '',
                addressStr2: '',
                cityAndCodeArr: [],
                proposerName: '',
                proposerNameIdNo: '',
                inviterCode: '',
                shareImgUrl: require('../../../assets/imgs/giving/shareImg.png'),
                storageName: 'USER_INFO',
                secondary:'',
                thirdClass:''
            }
        },
        computed: {
            compSex() {
                return this.getSex(this.proposerNameIdNo)
            },
            compuBirthday() {
                const cardNo = this.proposerNameIdNo
                if (cardNo.length == 18) {
                    return cardNo.substring(6, 10) + "-" + cardNo.substring(10, 12) + "-" + cardNo.substring(12, 14)
                }
            }
        },
        components: {
            TabpickerSup,
            TipComp,
            [Dialog.name]: Dialog
        },
        created() {
            this._setStorage()
            this.init()
        },
        mounted() {
        },
        methods: {
            showTips(){
                this.$refs['tipComp'].showDetailTip()
            },
            goProductClause() {
                this.$app.goPdfView('https://yxfile.aeonlife.com.cn/doc/2019/10/20191015/1/onlineins/onlineins_1_1_20191015140451931.pdf');
            },
            goInstruction() {
                this.$app.goPdfView('https://yxfile.aeonlife.com.cn/doc/2019/10/20191015/1/onlineins/onlineins_1_1_20191015140416995.pdf');
            },
            init() {
                this.info.mobile = localStorage.getItem("mobile");
                this.$app.getToken((userToken) => {
                    this.userToken = userToken
                })
                this.inviterCode = this.$router.query("inviterCode") || '';

                let options = {}
                options.title = '百年人寿重疾险限时0元购',
                options.desc = '重疾险不要钱，帮好友保额翻倍',
                options.href = location.href
                this.secondary =  this.$router.query("secondaryDistributor") || ''
                this.thirdClass =  this.$router.query("thirdClassDistributor") || ''
                options.link = this.$router.siteUrl() + `/product/giving/Glogin.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
                options.imgUrl = this.$router.siteUrl() + this.shareImgUrl
                this.$app.wxShareDetail(options)
                // this.loadCityData()
            },
            addressHandleChange({options}) {
                let addStrArr = [], showSZ = false
                options.forEach((item, index) => {
                    addStrArr.push(item.label)
                    if (index === 0) {
                        this.agentCodeNew = this.agentCodeDatas.find(item1 => item1.value === item.value).agentCode
                    }
                    if (index === 1) {
                        if (item.value === '210200') { // 大连特殊处理agentCode 因为跟辽宁重复了
                            this.agentCodeNew = this.agentCodeDatas.find(item1 => item1.value === item.value).agentCode // 取得是最后一位置的value
                        } else if (item.value === '320500') {
                            Dialog.alert({content: '暂不支持苏州地区'})
                            console.log("addStrArr", addStrArr);
                            addStrArr.length = 0
                            showSZ = true
                            return false
                        }
                    }
                })
                console.log('this.agentCodeNew', this.agentCodeNew)
                if (showSZ) {
                    this.addressStr1 = ''
                } else {
                    this.addressStr1 = addStrArr.length === 0 ? [] : addStrArr.join('-')
                }
                this.addStorage('addressStr1', this.addressStr1)
                this.addStorage('agentCodeNew', this.agentCodeNew)
            },
            getSex(cardNo) {
                //获取性别
                return (parseInt(cardNo.substr(16, 1)) % 2 == 1) ? '0' : '1'
            },
            checkName(name, e = null) {
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!name) {
                    Toast.failed('您没有输入姓名！')
                    return false;
                } else if (!regName.test(name)) {
                    Toast.failed('您输入的姓名格式不正确！')
                    return false;
                } else {
                    this.addStorage('proposerName', this.proposerName)
                    return true
                }
            },
            checkCard(item) {
                const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                var idCard = item.trim();
                if (regIdCard.test(idCard.trim())) {
                    if (idCard.length == 18) {
                        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
                        var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
                        var idCardLast = idCard.substring(17); // 得到最后一位身份证号码
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                this.addStorage('proposerNameIdNo', this.proposerNameIdNo)
                                return true;
                            } else {
                                Toast.failed('您输入的身份证号不正确')
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                this.addStorage('proposerNameIdNo', this.proposerNameIdNo)
                                return true;
                            } else {
                                Toast.failed('您输入的身份证号不正确')
                                return false;
                            }
                        }
                    }
                } else {
                    Toast.failed('您输入的身份证号不正确！')
                    return false;
                }
            },
            checkDetail(item) {
                //验证投保人详细地址
                this.addStorage('addressStr2', this.addressStr2)
            },
            getBirthday(cardNo) {
                return cardNo.substring(6, 10) + "-" + cardNo.substring(10, 12) + "-" + cardNo.substring(12, 14)
            },
            validate() {
                if (!this.agreeConf.checked) {
                    Toast.failed('请勾选条款及协议！')
                    return false
                }
                if (!this.checkName(this.proposerName)) {
                    return false
                }
                if (!this.proposerNameIdNo) {
                    Toast.failed('您未输入身份证号！');
                    return false
                }
                if (!this.checkCard(this.proposerNameIdNo)) {
                    Toast.failed('您输入的身份证号不正确！');
                    return false
                }
                if (!this.addressStr1) {
                    Toast.failed('请选择所在区域！');
                    return false
                }
                if (!this.addressStr2 || this.addressStr2 === '') {
                    Toast.failed('请填写您的详细地址！');
                    return false
                }
                return true
            },
            goInsure() {
                if (!this.validate()) return false
                let addressStr = this.addressStr1.replace(/-/g, '') + this.addressStr2
                let subData = {
                    "actGiftRiskDTO": { // 投保人信息
                        "appntInfo": {
                            "address": addressStr, // 地址文字
                            "birthday": this.compuBirthday,
                            "idNo": this.proposerNameIdNo, // 身份证号
                            "idType": "0",
                            "mobile": this.info.mobile,
                            "name": this.proposerName,
                            "sex": this.compSex
                        },
                        "insuredInfo": { // 被保人信息
                            "address": addressStr,
                            "birthday": this.compuBirthday,
                            "idNo": this.proposerNameIdNo,
                            "idType": "0",
                            "mobile": this.info.mobile,
                            "name": this.proposerName,
                            "relationToAppnt": "00", // 为本人
                            "sex": this.compSex
                        },
                        "agentCode": this.agentCodeNew, // 地址code
                        "contPlanCode": "301133",
                        "cValidate": ""
                    },
                    "contNo": "",
                    "insuYear": "",
                    "prem": "",
                    "riskName": "",
                    "secondaryDistributor": this.$router.query("secondaryDistributor") || '',
                    "thirdClassDistributor": this.$router.query("thirdClassDistributor") || ''
                }
                localStorage.setItem("infoDatas", JSON.stringify(subData));
                location.href = `/product/giving/GhealthNotice.html?inviterCode=${this.inviterCode}&secondaryDistributor=${this.secondary}&thirdClassDistributor=${this.thirdClass}`
            },
            _setStorage() {
                //从浏览器储存里面读
                let storageItem = this._parseStorage();
                for (let item in storageItem) {
                    if (storageItem[item]) {
                        this[item] = storageItem[item]
                    }
                }
            },
            _parseStorage() {
                let object;
                try {
                    object = JSON.parse(sessionStorage.getItem(this.storageName));
                } catch (e) {
                    object = {};
                }

                return object || {};
            },
            addStorage(e, val) {
                //放缓存
                if (e) {
                    let _storageInfo = {}
                    _storageInfo[e] = val
                    this._expireStorage(_storageInfo)
                }
            },
            _expireStorage(info) {
                let object = this._parseStorage();
                let commos = Object.assign(object, info);
                commos.time = new Date().getTime();
                sessionStorage.setItem(this.storageName, JSON.stringify(commos));
            },
        }
    }
</script>

<style lang='scss' scoped>
    .gbuycomp-wrap {
        .area {
            position: relative;
            .optionlist {
                background-color: #fff;
                position: absolute;
                top: 100px;
                left: 50px;
                z-index: 99;
                border-radius: 8px;
                height: 400px;
                overflow: auto;
                li {
                    width: 480px;
                    margin: 30px 0;
                    padding-left: 18px;
                    font-size: 24px;
                }
            }
        }

        img {
            &.person {
                width: 32px;
                height: 30px;
            }
            &.card {
                width: 34px;
                height: 26px;
            }
            &.local {
                width: 34px;
                height: 36px;
            }
        }
    }
    .cardIcon{
        padding-right: .2rem;
    }
</style>

<style lang="scss">
    .gbuycomp-wrap {
        .giving {
            padding: 0 22px;
            .myField {
                position: relative;
                width: 100% !important;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 0 !important;

                .md-field-item-content {
                    border: 2px solid #FFAC9F !important;
                    margin-bottom: 34px;
                    border-radius: 8px;
                    height: 88px;
                    min-height: 88px;
                    padding-left: 16px;
                }
                .md-field-item-control {
                    font-size: 30px !important;
                    text-align: left !important;
                }
                .md-input-item-input {
                    text-align: left !important;
                }
                .md-button {
                    width: 184px;
                    height: 88px;
                    font-size: 28px;
                    line-height: 88px;
                }
                .agreement {
                    .md-agree {
                        color: #8e8e8e;
                        font-size: 24px;

                        a {
                            color: #FFAC9F;
                        }
                    }
                }
                .subbtn {
                    .md-button {
                        width: 100%;
                        height: 88px;
                    }
                }
                img.phone {
                    width: 28px;
                    height: 40px;
                }
                img.password {
                    width: 30px;
                    height: 32px;
                }
            }
        }
    }
    .myArea , .md-field-item-placeholder{
        font-size: .36rem !important;
    }
</style>
