<template>
    <!--<section>
        <div class="content">
            <div class="name">
                <img src="@/assets/imgs/groupBuying/name.png"/>
                <input class="myInput" placeholder="请输入您的姓名" v-model="name" @blur="checkName(name)" type="text" maxlength="20">
            </div>
            <div class="idNo">
                <img src="@/assets/imgs/groupBuying/idNo.png"/>
                <input class="myInput" placeholder="请输入您的身份证号码" v-model="idNo" @blur="checkName(name)" type="text"
                       oninput="value=value.replace(/[^\dXx]/g,'')" maxlength="18">
            </div>
            <div class="idNo">
                <img src="@/assets/imgs/groupBuying/idNo.png"/>
                <input class="myInput " placeholder="请输入您的手机号" v-model="mobileNumber" type="text"
                       oninput="value=value.replace(/[^\dXx]/g,'')" maxlength="11">
            </div>
            <div class="detailAdd idNo">
                <img src="@/assets/imgs/groupBuying/idNo.png"/>
                <input class="myInput mobNum" placeholder="请选择所在区"  v-model="detailAdd" type="text"
                       oninput="value=value.replace(/[^\dXx]/g,'')"  @click="showTab = !showTab" maxlength="0">
                <div class="smallLogo">

                </div>
            </div>
            <md-agree
                class="agree"
                v-model="agreeConf.checked"
                :disabled="agreeConf.disabled"
                :size="agreeConf.size"
            >
                我已阅读

                <span>
        <a class="parF"  >《产品条款》、</a>
      </span><span> <a class="parF"  >《用户协议》</a> </span>
            </md-agree>
        </div>

        <TabpickerSup
            v-model="showTab"
            :data="addressData_new"
            title="请选择地区"
            @change="addressHandleChange"
        />
    </section>-->
    <section>
        <img src="@/assets/imgs/bonusInsure/bgTop.png"  class="bgTop"/>
        <div class="bgBottom">
            <InputItem />
            <p class="bottomTip">*活动最终解释权归百年人寿所有</p>
        </div>
    </section>
</template>

<script>
    import InputItem from './InputItem'
    export default {
        name: "AccidentActivity",
        components: {
            InputItem
        },
        data() {
            return {
                name: '',
                idNo: '',
                mobileNumber:'',
                detailAdd:'',
                showTab:false,
                agreeConf: {
                    checked: false,
                    name: "agree0",
                    size: "md",
                    disabled: false,
                    introduction: "选中状态"
                },
            }
        },
        methods:{
            test(){
                console.log(1);
            },
            checkCard(item) {
                const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                var idCard = this.v_trim(item);
                if (regIdCard.test(this.v_trim(idCard))) {
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
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            },
            v_trim(s) {
                return s.replace(/\s/g, '');
            },
            addressHandleChange({options}) {
                console.log(options);
                this.detailAdd = options[0].label
            },
            checkName(name) {
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!regName.test(name)) {
                    Toast.failed('您输入的姓名格式不正确！')
                    return false;
                } else {
                    return true
                }
            },
        }
    }
</script>



<style lang="scss">
    html,body{
        background: #77CCBE;
    }
</style>
<style lang="scss" scoped>
    .parF {
        color: #d7000f !important;
    }
    .content {
        margin: 0 30px;
        padding: 40px;
        height: 100%;
    }
    .smallLogo{
        position: absolute;
        background: red;
        height: 100%;
        width: 86px;
        top: 0;
        right: 0;
    }
    .bgTop{
        width: 100%;
        height: 801px;
    }
    .bgBottom{
        background: #77CCBE;
        margin-top: -1rem;
        padding-top: 1rem;
        padding-bottom: .5rem;
    }
    .bottomTip{
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(213,245,239,1);
        line-height:30px;
        margin-left: .8rem;
        margin-top: .5rem;
    }
</style>
