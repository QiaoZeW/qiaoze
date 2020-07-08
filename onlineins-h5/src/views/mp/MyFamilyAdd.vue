<template>
    <div>
        <div class="box">
            <md-dialog
                title="确认删除"
                :closable="true"
                v-model="basicDialog.open"
                :btns="basicDialog.btns"
            >
            </md-dialog>
            <md-field class="block">

                <md-field-item
                               title="关系"
                               arrow="arrow-right"
                               align="left"
                               placeholder="请选择家庭关系"
                               :content="proposerRelationressStr"
                               @click="relationShow = !relationShow"
                               >
                </md-field-item>
                <TabpickerSup
                    v-model="relationShow"
                    v-if="showInureCity == false"
                    :data="relationData"
                    title="请选择家庭关系"
                    @change="relationPropHandleChange"
                    :defaultValue="defaultSelectedRelationToAppntValue"
                />

                <md-input-item
                    title="姓名"
                    :maxlength="14"
                    placeholder="请输入姓名" v-model="name" ref="name"
                    id="name" name="name"
                    @blur="checkName(name,$event)"
                ></md-input-item>

                <md-input-item
                    ref="input0"
                    title="身份证号"
                    placeholder="请输入身份证号"
                    is-amount
                    v-model="cardNo" @blur="cardNum(cardNo,$event)"
                    name="cardNo"
                    id="cardNo"
                    :maxlength="18"
                >
                </md-input-item>

                <md-input-item
                    title="联系电话"
                    placeholder="请输入联系电话" ref="mobile" type="phone" v-model="mobile" name="mobile"
                    id="mobile"
                    @blur="checkPhone(mobile,$event)"></md-input-item>

                <md-field class="moreMsg" v-if="moreMsgBtnFlag" >
                    <span @click="moreMsg(moreMsgBtnFlag)">更多信息补充&nbsp;
                        <img class="downPull" style="display:inline-block;" src="@/assets/imgs/pulldown@2x.png"/>
                    </span>
                </md-field>

                <md-input-item v-if="!moreMsgBtnFlag"
                    title="电子邮箱"
                    placeholder="请输入电子邮箱" v-model="email" id="email" name="email"
                    @blur="checkEmail(email,$event);"></md-input-item>

                <md-field-item v-if="!moreMsgBtnFlag"
                    title="省市区"
                    arrow="arrow-right"
                    align="left"
                    placeholder="请选择省市区"
                    :content="proposerAddressStr"
                    @click="isaddressDataShow = !isaddressDataShow"
                >
                </md-field-item>
                <TabpickerSup
                    v-model="isaddressDataShow"
                    v-if="showInureCity == false"
                    :data="addressScreen"
                    title="请选择省市区"
                    :defaultValue="defaultSelectedAddress"
                    @change="addressPropHandleChange"
                />
                <md-input-item v-if="!moreMsgBtnFlag"
                    title="详细地址"
                    class="detailHome detailAdd"
                    placeholder="请输入详细地址" v-model="detailAddress" name="detailAddress"
                    @blur="getTi(detailAddress,$event)"
                    id="detailAddress">
                    <md-icon
                        name="info-solid"
                        size="lg"
                        color="#dbdbdb"
                        class="cardIcon"
                        slot="left"
                        @click="showDetailTip"
                    ></md-icon>
                </md-input-item>
                <md-field-item
                    title="职业"
                    arrow="arrow-right"
                    align="left"
                    placeholder="请选择职业"
                    :content="proposerJobStr"
                    @click.native="isjobShow = !isjobShow"
                    v-if="!moreMsgBtnFlag">
                </md-field-item>
                <md-tab-picker
                    v-model="isjobShow"
                    :data="jobmedicalData"
                    title="请选择职业"
                    :default-value="defaultSelectedJob"
                    @change="handleChangeProp"
                />
            </md-field>
            <div class="contentBottom" v-if="btnFlag">
                <a class="justDown" @click="delMyFamily"
                ><span class="deleteBtn">
                    <font color="#FF0000">删&nbsp;除</font>
                </span></a> &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="justDown" @click="jsubmit"
                ><span>确&nbsp;认</span></a>
            </div>
            <div class="contentBottom" v-else>
                <a class="justDown_one" @click="jsubmit"
                ><span>确&nbsp;认</span></a>
            </div>
            <TipComp ref="tipComp"/>
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
        Captcha
    } from 'mand-mobile'
    import job8 from '@/static/job8'
    import job10 from '@/static/job10'
    import addressdata from '@/static/addressAll'
    import addressdata_new from '@/static/addressInsure_new'
    import Agreement from '@/components/BuyComp/Agreement'
    import TabpickerSup from '@/components/BuyComp/TabpickerSup'
    import TipComp from '@/components/BuyComp/TipComp'
    import Whirl from '@/components/Whirl'
    import Error from '@/components/Error'
    import relationData from '@/static/relationData'
    export default {
        name: 'MyFamilyAdd',
        components: {
            [Agree.name]: Agree,
            [ActionBar.name]: ActionBar,
            [Field.name]: Field,
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
                data : {
                    relationToAppnt:'',
                    name:'',
                    cardNo:'',
                    mobile:'',
                    email:'',
                    areaCode:'',
                    detailAddress:'',
                    occupation:'',
                    gender:'',
                    birthday: '',
                    cardType:'0',//0身份证4出生证5户口本，
                    mp:true,
                    id:''
                },
                insuredJob: [],
                addressDataValue:[],
                name: '',
                proposerJobValue: '',
                proposerAddressArr: [],
                cardNo: '',
                mobile: '',
                email: '',
                proposerAddressCode: '',
                detailAddress: '',
                proposerJob: [],
                beneficiaryRealtionData: [[{text: '本人', value: '00'},{text: '配偶', value: '01'}, {text: '父母', value: '02'}, {
                    text: '子女',
                    value: '03'
                }]],
                pickerData0: [[{label: '男', value: '0'}, {label: '女', value: '1'}]],
                addressData: addressdata,
                addressData_new: addressdata_new,
                addressScreen: addressdata,
                relationData: relationData,
                jobData: job8,
                jobInsureData: job8,
                jobmedicalData: job10,
                jobmedicalInsureData: job10,
                pickerDefaultIndex: [0, 0, 0],
                pickindex: [0, 0],
                jobCode: '',
                jobName: '',
                provinceAdd: {
                    placeCode: '',
                    placeName: ''
                },
                cityAdd: {
                    placeCode: '',
                    placeName: ''
                },
                areaAdd: {
                    placeCode: '',
                    placeName: ''
                },
                insureProvinceAdd: {
                    placeCode: '',
                    placeName: ''
                },
                insureCityAdd: {
                    placeCode: '',
                    placeName: ''
                },
                insureAreaAdd: {
                    placeCode: '',
                    placeName: ''
                },
                dataForm: false,
                cardNoDisable: false,
                proposerPhoneDisable: false,
                isjobShow:false,
                relationShow:false,
                showInureCity:false,
                isaddressDataShow:false,
                proposerAddress: [],
                proposerRelation: [],
                relationAdd: {
                    label: '',
                    value: ''
                },
                btnFlag:false,
                moreMsgBtnFlag:false,
                gender:'',
                birthday:'',
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: '取消',
                            handler: this.onBasicCancel,
                        },
                        {
                            text: '确认操作',
                            handler: this.onBasicConfirm,
                        },
                    ],
                },
                retAddressBoolean:false,
                addressArray:[],
                jobArray:[],
                jobHit:false,
                userToken:'',
                defaultSelectedJob:[],
                defaultSelectedAddress:[],
                defaultSelectedRelationToAppntValue:[]
            }
        },
        created() {
            this.userToken =JSON.parse(window.localStorage.getItem("MY_FAMILY_TOKEN"));
            /*this.addressArray.push(this.findAddress(addressdata.options,'330281'))
            this.proposerAddress = this.addressArray;
            console.log("this.addressArray =" + JSON.stringify(this.addressArray))*/
            if(this.$router.query('id') != ''){

                    var myFamilyData =  window.localStorage.getItem("myFamilyData");
                    var jsonMyFamilyData = JSON.parse(myFamilyData);
                  //var jsonMyFamilyData ={occupation:'1020201',areaCode:'520422',cardNo:'：123',relationToAppntValue:'00'};
                    this.findAddress(addressdata.options,jsonMyFamilyData.areaCode);//省市区回显

                    this.findJob(job10,jsonMyFamilyData.occupation);//职业回显

                    this.defaultSelectedJob = this.jobArray.map(item=>{return item.value});
                    this.defaultSelectedAddress = this.addressArray.map(item=>{return item.value});

                    for(var i=0;i<relationData.options.length;i++){
                        if(relationData.options[i].value==jsonMyFamilyData.relationToAppntValue){
                            this.relationAdd.label = relationData.options[i].label;
                            this.relationAdd.value =relationData.options[i].value;
                        }
                    }
                this.defaultSelectedRelationToAppntValue=[jsonMyFamilyData.relationToAppntValue];
                //alert(jsonMyFamilyData.areaCode);//省市区(最后一级)
                //alert(jsonMyFamilyData.occupation);//职业(最后一级)
                    this.data.areaCode=jsonMyFamilyData.areaCode;
                    this.data.occupation=jsonMyFamilyData.occupation;
                    this.name = jsonMyFamilyData.name;
                    this.cardNo =  jsonMyFamilyData.cardNo.split('：')[1];
                    this.mobile =  jsonMyFamilyData.mobile;
                this.email = jsonMyFamilyData.email==null?'':jsonMyFamilyData.email;
                    //areaCode:this.areaAdd.placeCode,
                this.detailAddress= jsonMyFamilyData.detailAddress==null?'':jsonMyFamilyData.detailAddress;
                    //occupation:this.jobCode,
                    this.btnFlag = true;
                    this.moreMsgBtnFlag = false;
            }else{
                this.btnFlag = false;
                this.moreMsgBtnFlag = true;
            }
        },
        mounted() {
        },
        computed: {
           /* insuredJobStr() {
                if (Array.isArray(this.insuredJob)) {
                    return this.insuredJob.map(item => item.label).join('-')
                } else {
                    return this.insuredJob
                }

            },*/
            proposerJobStr() {//职业回显
                if(this.proposerJob.length==0){
                    this.proposerJob = this.jobArray;
                }
              if (Array.isArray(this.proposerJob)) {
                    return this.proposerJob.map(item => item.label).join('-')
                } else {
                    return this.proposerJob
                }
            },
            /*addressDataValueStr() {
                if (Array.isArray(this.addressDataValue)) {
                    return this.addressDataValue.map(item => item.label).join('-')
                } else {
                    return this.addressDataValue
                }

            },*/
            proposerAddressStr() {//省市区回显
               // alert(JSON.stringify(this.addressArray[0]));
                if(this.proposerAddress.length==0){
                    this.proposerAddress = this.addressArray;
                }
                //this.proposerAddress= JSON.parse("[{\"value\":\"330000\",\"label\":\"浙江省\",\"children\":{\"name\":\"address1\",\"label\":\"请选择\",\"options\":[{\"value\":\"330200\",\"label\":\"宁波市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330281\",\"label\":\"余姚市\"},{\"value\":\"330283\",\"label\":\"奉化市\"},{\"value\":\"330282\",\"label\":\"慈溪市\"},{\"value\":\"330226\",\"label\":\"宁海县\"},{\"value\":\"330225\",\"label\":\"象山县\"},{\"value\":\"330212\",\"label\":\"鄞州区\"},{\"value\":\"330211\",\"label\":\"镇海区\"},{\"value\":\"330206\",\"label\":\"北仑区\"},{\"value\":\"330204\",\"label\":\"江东区\"},{\"value\":\"330205\",\"label\":\"江北区\"},{\"value\":\"330203\",\"label\":\"海曙区\"},{\"value\":\"330201\",\"label\":\"市辖区\"}]}},{\"value\":\"330600\",\"label\":\"绍兴市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330682\",\"label\":\"上虞市\"},{\"value\":\"330683\",\"label\":\"嵊州市\"},{\"value\":\"330681\",\"label\":\"诸暨市\"},{\"value\":\"330621\",\"label\":\"绍兴县\"},{\"value\":\"330624\",\"label\":\"新昌县\"},{\"value\":\"330602\",\"label\":\"越城区\"},{\"value\":\"330601\",\"label\":\"市辖区\"}]}},{\"value\":\"330300\",\"label\":\"温州市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330329\",\"label\":\"泰顺县\"},{\"value\":\"330327\",\"label\":\"苍南县\"},{\"value\":\"330328\",\"label\":\"文成县\"},{\"value\":\"330326\",\"label\":\"平阳县\"},{\"value\":\"330324\",\"label\":\"永嘉县\"},{\"value\":\"330322\",\"label\":\"洞头县\"},{\"value\":\"330304\",\"label\":\"瓯海区\"},{\"value\":\"330303\",\"label\":\"龙湾区\"},{\"value\":\"330302\",\"label\":\"鹿城区\"},{\"value\":\"330301\",\"label\":\"市辖区\"},{\"value\":\"330381\",\"label\":\"瑞安市\"},{\"value\":\"330382\",\"label\":\"乐清市\"}]}},{\"value\":\"331100\",\"label\":\"丽水市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"331127\",\"label\":\"景宁畲族自治县\"},{\"value\":\"331126\",\"label\":\"庆元县\"},{\"value\":\"331125\",\"label\":\"云和县\"},{\"value\":\"331124\",\"label\":\"松阳县\"},{\"value\":\"331123\",\"label\":\"遂昌县\"},{\"value\":\"331122\",\"label\":\"缙云县\"},{\"value\":\"331121\",\"label\":\"青田县\"},{\"value\":\"331102\",\"label\":\"莲都区\"},{\"value\":\"331101\",\"label\":\"市辖区\"},{\"value\":\"331181\",\"label\":\"龙泉市\"}]}},{\"value\":\"330700\",\"label\":\"金华市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330782\",\"label\":\"义乌市\"},{\"value\":\"330781\",\"label\":\"兰溪市\"},{\"value\":\"330784\",\"label\":\"永康市\"},{\"value\":\"330783\",\"label\":\"东阳市\"},{\"value\":\"330723\",\"label\":\"武义县\"},{\"value\":\"330726\",\"label\":\"浦江县\"},{\"value\":\"330727\",\"label\":\"磐安县\"},{\"value\":\"330701\",\"label\":\"市辖区\"},{\"value\":\"330702\",\"label\":\"婺城区\"},{\"value\":\"330703\",\"label\":\"金东区\"}]}},{\"value\":\"330400\",\"label\":\"嘉兴市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330483\",\"label\":\"桐乡市\"},{\"value\":\"330482\",\"label\":\"平湖市\"},{\"value\":\"330481\",\"label\":\"海宁市\"},{\"value\":\"330424\",\"label\":\"海盐县\"},{\"value\":\"330411\",\"label\":\"秀洲区\"},{\"value\":\"330421\",\"label\":\"嘉善县\"},{\"value\":\"330402\",\"label\":\"秀城区\"},{\"value\":\"330401\",\"label\":\"市辖区\"}]}},{\"value\":\"331000\",\"label\":\"台州市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"331004\",\"label\":\"路桥区\"},{\"value\":\"331003\",\"label\":\"黄岩区\"},{\"value\":\"331002\",\"label\":\"椒江区\"},{\"value\":\"331001\",\"label\":\"市辖区\"},{\"value\":\"331021\",\"label\":\"玉环县\"},{\"value\":\"331022\",\"label\":\"三门县\"},{\"value\":\"331023\",\"label\":\"天台县\"},{\"value\":\"331024\",\"label\":\"仙居县\"},{\"value\":\"331082\",\"label\":\"临海市\"},{\"value\":\"331081\",\"label\":\"温岭市\"}]}},{\"value\":\"330100\",\"label\":\"杭州市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330110\",\"label\":\"余杭区\"},{\"value\":\"330105\",\"label\":\"拱墅区\"},{\"value\":\"330106\",\"label\":\"西湖区\"},{\"value\":\"330103\",\"label\":\"下城区\"},{\"value\":\"330104\",\"label\":\"江干区\"},{\"value\":\"330109\",\"label\":\"萧山区\"},{\"value\":\"330108\",\"label\":\"滨江区\"},{\"value\":\"330102\",\"label\":\"上城区\"},{\"value\":\"330101\",\"label\":\"市辖区\"},{\"value\":\"330122\",\"label\":\"桐庐县\"},{\"value\":\"330127\",\"label\":\"淳安县\"},{\"value\":\"330185\",\"label\":\"临安市\"},{\"value\":\"330183\",\"label\":\"富阳市\"},{\"value\":\"330182\",\"label\":\"建德市\"}]}},{\"value\":\"330500\",\"label\":\"湖州市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330523\",\"label\":\"安吉县\"},{\"value\":\"330521\",\"label\":\"德清县\"},{\"value\":\"330522\",\"label\":\"长兴县\"},{\"value\":\"330502\",\"label\":\"吴兴区\"},{\"value\":\"330501\",\"label\":\"市辖区\"},{\"value\":\"330503\",\"label\":\"南浔区\"}]}},{\"value\":\"330800\",\"label\":\"衢州市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330881\",\"label\":\"江山市\"},{\"value\":\"330822\",\"label\":\"常山县\"},{\"value\":\"330824\",\"label\":\"开化县\"},{\"value\":\"330825\",\"label\":\"龙游县\"},{\"value\":\"330801\",\"label\":\"市辖区\"},{\"value\":\"330802\",\"label\":\"柯城区\"},{\"value\":\"330803\",\"label\":\"衢江区\"}]}},{\"value\":\"330900\",\"label\":\"舟山市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330901\",\"label\":\"市辖区\"},{\"value\":\"330902\",\"label\":\"定海区\"},{\"value\":\"330903\",\"label\":\"普陀区\"},{\"value\":\"330922\",\"label\":\"嵊泗县\"},{\"value\":\"330921\",\"label\":\"岱山县\"}]}}]}},{\"value\":\"330200\",\"label\":\"宁波市\",\"children\":{\"name\":\"block\",\"label\":\"\",\"options\":[{\"value\":\"330281\",\"label\":\"余姚市\"},{\"value\":\"330283\",\"label\":\"奉化市\"},{\"value\":\"330282\",\"label\":\"慈溪市\"},{\"value\":\"330226\",\"label\":\"宁海县\"},{\"value\":\"330225\",\"label\":\"象山县\"},{\"value\":\"330212\",\"label\":\"鄞州区\"},{\"value\":\"330211\",\"label\":\"镇海区\"},{\"value\":\"330206\",\"label\":\"北仑区\"},{\"value\":\"330204\",\"label\":\"江东区\"},{\"value\":\"330205\",\"label\":\"江北区\"},{\"value\":\"330203\",\"label\":\"海曙区\"},{\"value\":\"330201\",\"label\":\"市辖区\"}]}},{\"value\":\"330281\",\"label\":\"余姚市\"}]")
                return this.proposerAddress.map(item => item.label).join('-')
            },
            proposerRelationressStr() {//关系回显
                if(this.proposerRelation.length==0){
                    this.proposerRelation.push(this.relationAdd);
                }
                return this.proposerRelation.map(item => item.label).join('-')
            }
        },
        methods: {
            moreMsg(moreMsgBtnFlag){
                this.moreMsgBtnFlag = !moreMsgBtnFlag;
            },
            addressPropHandleChange({options}) {
                this.proposerAddress = options
                this.provinceAdd.placeCode = options[0].value
                this.provinceAdd.placeName = options[0].label
                this.cityAdd.placeCode = options[1].value
                this.cityAdd.placeName = options[1].label
                this.areaAdd.placeCode = options[2].value
                this.areaAdd.placeName = options[2].label
                this.proposerLiveCity = this.provinceAdd.placeName + this.cityAdd.placeName + this.areaAdd.placeName
            },

            relationPropHandleChange({options}) {
                this.proposerRelation = options
                this.relationAdd.value = options[0].value
                this.relationAdd.label = options[0].label
            },
            handleChangeProp({options}) {
                this.proposerJob = options

                let proposerWorkStr = ''
                options.forEach((item, index) => {
                    proposerWorkStr += item.label
                    if (index === options.length-1) {
                    this.jobCode = item.value // 取得是最后一位置的value
                    this.jobName = item.label
                    console.log(this.jobName)
                }
            })
                this.proposerWork = proposerWorkStr
            },
            getTi(val, e) {
                let myreg = /^.+(乡|镇|街|路|道|巷|委|段|里|社|园|苑).+(村|组|号|室|队|院|房|楼|栋).*$/;
                if(!myreg.test(val)) {
                    Toast.failed('详细地址格式不正确！')
                    return false;
                }else{
                    return true;
                }
            },
            checkInput(item, conS) {
                if (item == '' || !item) {
                    Toast.failed(conS)
                    return false
                } else {
                    return true
                }
            },
            checkInputS(item, conS) {
                if (item == '请选择' || item == '') {
                    Toast.failed(conS)
                    return false
                } else {
                    return true
                }
            },
            checkInput1(item) {
                document.getElementById(item).getElementsByTagName('input')[0].focus();

            },
            checkName(name, e = null) {
                if(name==''){
                    Toast.failed('姓名不能为空！')
                    return false;
                }
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!regName.test(name)) {
                    Toast.failed('姓名格式不正确！')
                    return false;
                } else {
                    return true
                }
            },
//            校验手机号
            checkPhone(phone, e = null) {
                if(phone==''){
                    Toast.failed('联系电话不能为空！')
                    return false;
                }
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    Toast.failed('联系电话格式不正确！')
                    return false;
                } else {
                    return true
                }
            },
            // 校验身份证
            checkCard(item) {
                if(item==''){
                    Toast.failed('身份证号不能为空！')
                    return false;
                }
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
            // 校验邮箱
            checkEmail(email, e = null) {
                email = email.trim()
                var emailReg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i;
                if (emailReg.test(email)) {
                    return true
                } else {
                    Toast.failed('电子邮箱格式不正确！');
                    return false;
                }
            },
            // 获取生日
            getBirth(cardNo) {
                var tmpStr = cardNo.substring(6, 14);
                return tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
            },
            //详细地址提示信息
            showDetailTip () {
                this.$refs['tipComp'].showDetailTip()
            },
            // 去空格
            v_trim(s) {
                return s.replace(/\s/g, '');
            },
            cardNum(item, e = null) {
                if (item == '') {
                    Toast.failed('身份证号不能为空！');
                    return false;
                }
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
                                //this.addStorage('cardNo', this.cardNo)
                                return true;
                            } else {
                                Toast.failed('身份证号格式不正确！');
                                return false;
                            }
                        } else {
                            // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                return true;
                            } else {
                                Toast.failed('身份证号格式不正确！');
                                return false;
                            }
                        }
                    }
                } else {
                    Toast.failed('身份证号格式不正确！');
                    return false;
                }
            },
            checkRelation(val){
                if(val.label==''){
                    Toast.failed('请选择家庭关系！');
                    return false;
                }else{
                    return true;
                }
            },
            getBirthday(cardNo) {
                let str = cardNo.substr(6, 4) + '-' + cardNo.substr(10, 2) + '-' + cardNo.substr(12, 2)
                return str
            },
            getSex(cardNo) {
                return (parseInt(cardNo.substr(16, 1)) % 2 == 1) ? '0' : '1'
            },
            delMyFamily(){
                this.basicDialog.open = true;
            },
            addOrEdit(){
                   /* var allData = window.localStorage.getItem("myFamilyAllData");
                    alert(allData);
                    alert(this.relationAdd.value);
                    for(var k = 0;k<allData.length;k++){
                        //alert(allData[k].relationToAppnt);
                        if(allData[k].relationToAppnt=='00' && this.relationAdd.value==allData[k].relationToAppnt){
                            Toast.failed("关系为本人只能添加一次！");
                            return;
                        }
                    }
                    return;*/
                    this.data.relationToAppnt = this.relationAdd.value;//暂时定 关系，配偶01各自能添加一个，父母02各自添加一个，子女03,无限
                    this.data.birthday=new Date(this.getBirthday(this.cardNo));//暂时定 年龄关系，父母大于本人18岁，子女小于本人18岁，配偶无限
                    this.data.cardNo=this.cardNo;//
                    this.data.name=this.name;
                    this.data. mobile=this.mobile;
                    this.data.email=this.email;
                    if(this.areaAdd.placeCode!=''){
                        this.data.areaCode=this.areaAdd.placeCode;
                    }
                    this.data.detailAddress=this.detailAddress;
                    if(this.jobCode!=''){
                        this.data.occupation=this.jobCode;
                    }
                    this.data.gender=this.getSex(this.cardNo);
                    this.data.cardType='0';//0身份证4出生证5户口本，
                    this.data.mp=true;
                    this.data.id=this.$router.query('id');
                var url = '';
                if(this.$router.query('id') != ''){
                    url = '/vip/contact/updInsured';
                }else{
                    url = '/vip/contact/addInsured';
                }
                this.$request({
                    userToken:this.userToken,
                    url: url,
                    method: 'POST',
                    isLoading: true,
                    isEncript:true,
                    data: this.data,
                    contentType: 'application/json',
                    successFn: (data) => {
                    if(JSON.stringify(data)=='true'){
                    Toast.succeed("添加成功！");
                    location.href = this.$router.siteUrl() +`/mp/MyFamilyList.html`;
                }else{
                    Toast.failed("添加失败！");
                }
            },
                failFn: (data) => {
                    Toast.failed(data.resultMsg);
                }
            })
            },
            jsubmit(){
                if(this.checkRelation(this.relationAdd)){
                    if(this.checkName(this.name)){
                        if(this.cardNum(this.cardNo)){
                            if(this.checkPhone(this.mobile)){
                                if(this.email!=''){
                                    if(this.checkEmail(this.email)){
                                        if(this.detailAddress!=''){
                                            if(this.getTi(this.detailAddress)){
                                                this.addOrEdit();
                                            }
                                        }else{
                                            this.addOrEdit();
                                        }
                                    }
                                }else{
                                    if(this.detailAddress!=''){
                                        if(this.getTi(this.detailAddress)){
                                            this.addOrEdit();
                                        }
                                    }else{
                                        this.addOrEdit();
                                    }
                                }
                            }

                        }
                    }
                }
            },
            onBasicConfirm() {
                this.$request({
                    userToken:this.userToken,
                    url: '/vip/contact/delInsured/'+this.$router.query('id'),
                    method: 'DELETE',
                    isLoading: true,
                    isEncript:true,
                    successFn: (data) => {
                    if(JSON.stringify(data)=='true'){
                    this.basicDialog.open = false
                    Toast.succeed("删除成功！");
                    location.href = this.$router.siteUrl() +`/mp/MyFamilyList.html`;
                    //location.href =  this.$router.siteUrl() +`/mp/MyFamilyList.html`;
                }else{
                    this.basicDialog.open = false
                    Toast.failed("删除失败！");
                    location.href = this.$router.siteUrl() +`/mp/MyFamilyList.html`;
                  //  location.href =  this.$router.siteUrl() +`/mp/MyFamilyList.html`;
                }
            },
                failFn: (data) => {
                    this.basicDialog.open = false
                    Toast.failed(data.resultMsg);
                }
            })

            },
            onBasicCancel() {
                this.basicDialog.open = false
            },
            findAddress(data, val) {
                    for(var i=0;i<data.length;i++){
                        if(data[i].value){
                            if(data[i].value==val){
                                return data[i];
                            }else{
                                if(data[i].children){
                                    var retBoolean = this.findAddressDG(data[i],data[i].children,data[i].children.options,val);
                                    if(this.retAddressBoolean){
                                        return data[i];
                                    }
                                }else{
                                    this.findAddress(data[i],val);
                                }
                            }
                        }
                    }
            },
            findAddressDG(father,children,data, val) {
                for(var i=0;i<data.length;i++){
                    if(data[i].value){
                        if(data[i].value==val){
                            this.addressArray.push({'label': father.label,'value':father.value,'children':father.children});
                            this.addressArray.push({'label': children.label,'value':children.value,'children':children.children});
                            this.addressArray.push({'label': data[i].label,'value':data[i].value});
                            this.retAddressBoolean  = true;
                        }else{
                            if(data[i].children){
                                this.findAddressDG(father,data[i],data[i].children.options,val);
                            }
                        }
                    }
                }
            },
            findJob(data, val){
                var r=[];
                for (var i = 0; i <data.options.length-1 ; i++) {
                    if(data.options[i].value==val){
                        r.push({value:data.options[i].value,label:data.options[i].label});
                        this.jobArray = r;
                        return;
                    }
                }
                this.findNode(data.options[8],val,r);
                this.jobArray = r;
                return r;
            },
            findNode(data,val,r){
                r.push({value:data.value,label:data.label})
                if(data.value==val){
                    return true;
                }else{
                    if(data.children){
                        for(var i=0;i<data.children.options.length;i++){
                            var options = data.children.options;
                            if(this.findNode(options[i],val,r)){
                                return true;
                            }
                        }
                    }
                    r.pop()
                    return false;
                }
            },
        },
        filters: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
    #onagreeinfo{
        position: relative;
        color: #666;
    }
    #onagreeinfo .onagreeinfo-title{
        font-size: 0.35rem;
        width: 40%;
        color: #999;
    }
    #onagreeinfo .onagreeinfo-control{
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 0%;
        flex: 1 1 0%;
        color: #111a34;
        font-size: 0.373333rem;
        font-weight: 500;
        line-height: 1.2;
    }
    #onagreeinfo .onagreeinfo-content{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        min-height: 1.33333rem;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
    }
    #onagreeinfo .onagreeinfo-content:before {
        content: "";
        position: absolute;
        z-index: 2;
        -webkit-transform-origin: 100% 50%;
        transform-origin: 100% 50%;
        -webkit-transform: scaleY(.5) translateY(100%);
        transform: scaleY(.5) translateY(100%);
        bottom: 0;
        left: 0;
        right: auto;
        top: auto;
        width: 100%;
        border-bottom: 0.02667rem solid #e2e4ea;
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
    }
    .onagreeinfo-button {
        float: right;
        display: flex;
        .cardIcon {
            position: absolute;
            left: -25px;
            top: 5px;
        }
    }
    .onagreeinfo-button > div {
        border-radius: px2em(15px);
        border: 2px solid rgb(176, 175, 175);
        margin-right: px2em(20px);
        line-height: px2em(50px);
        padding: 0 px2em(20px);
        color: #333333;
        text-align: center;
        width: 1.2rem;
        height: px2em(50px);
        display: inline-block;
        font-size: 0.3rem;
    }
    .onagreeinfo-button > div.infoactive{
        border: 2px solid #c5261d;
        color: #c5261d;
    }
    .md-field-content {
        position: relative
    }

    .md-captcha .md-icon.icon-font.md {
        display: none !important;
    }

    .socialSecurity ,.renew{
        display: flex;
        justify-content: space-between;
        padding-top: .4rem;
        padding-bottom: 30px;
        p{
            font-size: 0.4rem;
            color: #666;
            line-height: 1.45em;
        }
        li{
            border: 1px solid #b0afaf;
            border-radius: 0.06667rem;
            font-size: 0.37333rem;
            text-align: center;
            display: inline-block;
            padding: 0.09333rem 0.53333rem;
            margin-left: 0.16rem;
        }
        .active{
            color: rgb(215, 0, 15) !important;
            border: 2px solid rgb(215, 0, 15) !important;
        }
    }
    .contacts-icon {
        position: absolute;
        top: 35px;
        right: 0;
        width: 30px;
        height: 30px;
        z-index: 100;
        display: none;
    }

    .cdType .contacts-type {
        position: relative;
        z-index: 100
    }

    .cdType .contacts-type .md-field-item {
        width: 92%
    }

    .cdType .contacts-type .contacts-icon {
        display: block;
    }

    .md-action-bar {
        padding: 0;
    }

    .footerbox {
        display: flex;
        text-align: center;
        justify-content: center;
        flex: 1;
        align-items: flex-end;
        color: #d7000f;
    }

    .small {
        font-size: px2em(26px);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        vertical-align: bottom;
    }

    .btnsize {
        font-size: px2em(50px);
        font-weight: 700;
    }

    .md-button.primary {
        background-color: #d7000f !important;
    }

    .block {
        /*border: px2em(1px) solid coral;*/
        margin-bottom: px2em(20px);
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
        padding-top: px2em(41px) !important;
        padding-bottom: px2em(0px) !important;
        padding-right: .4rem !important;
        position: relative;
    }

    #block {
        padding-top: px2em(0px) !important;
        p {
            line-height: 1.65em
        }
    }

    .box {
        padding: px2em(20px) px2em(24px) px2em(700px);
        background-color: #fcfcfc;
    }

    .md-field-item-control {
        font-size: px2em(28px) !important;
    }

    .buttonarray {
        float: right;
        display: flex;
        .cardIcon {
            position: absolute;
            left: -25px;
            top: 5px;
        }
    }

    .buttonarray > div {
        border-radius: px2em(5px);
        border: 2px solid rgb(176, 175, 175);
        margin-right: px2em(20px);
        line-height: px2em(50px);
        padding: 0 px2em(20px);
        color: #333333;
        text-align: center;
        width: 1.2rem;
        display: inline-block;
    }

    .buttonarray > div.active {
        border: 2px solid #c5261d;
        color: #c5261d;
    }

    .button.gm-btn {
        background: #1FB2A7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: px2em(36px);
        line-height: px2em(140px);
    }

    .button1.gm-btn {
        background: #1FB2A7;
        text-align: center;
        width: 100%;
        color: #fff;
        display: block;
        font-size: 36px;
        line-height: 140px;
    }

    .md-dialog-title {
        font-size: px2em(20px);
    }

    .md-example-child-field-0 .md-field-action {
        height: 36px;
        align-items: flex-end
    }

    .action-container {
        border: 2px solid #FF5963;
        padding: px2em(10px) 0;
        color: #FF5963;
        width: px2em(150px);
        text-align: center;
    }

    .parS {
        height: 200px;
        max-width: 300px;
    }

    .parQ {
        height: 100px;
        background: red;
        width: 200px;
    }

    .shuiShou p {
        line-height: 40px;
    }

    .parP {
        position: absolute;
        width: 480px;
        font-size: 0.373333rem;
        color: #c5cad5;
        right: -.2rem;
        top: 12%;
        z-index: 10
    }

    .detailAdd {
        position: relative;
        .cardIcon {
            position: absolute;
            left: 3.4em;
        }
    }

    .juMin {
        position: relative;
    }

    .iconTiShi {
        position: absolute;
        top: 30px;
        left: 200px;
    }

    .detailHome {
        /*  max-width: 650px;*/
        z-index: 20 !important;
    }

    .cdType {
        position: relative;
    }

    .iconTip {
        position: absolute;
        top: 1.75rem;
        left: 1.75rem;
    }

    .beneficiaryBlock {
        position: relative;
    }

    .beneficiaryTip {
        position: absolute;
        top: .5rem;
        left: 2rem;
    }

    .particular {
        top: .55rem !important;
    }
    .userAdd{
        color: #c5261d;
    }
    .price {
        font-size: 50px;
        color: #d7000f !important;
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
        /*.bottom1 {*/
        /*    flex: 1;*/
        /*    border-top: 1px solid #eee;*/
        /*    color: rgb(153, 153, 153);*/
        /*    line-height: 100px;*/
        /*}*/
        /*a {*/
        /*    flex: 1;*/
        /*    color: #fff;*/
        /*    line-height: 100px;*/
        /*}*/
        /*a:visited {*/
        /*    color: #fff;*/
        /*}*/
    }
    /*.bottom1 {*/
    /*    background: #ffffff;*/
    /*    text-align: center;*/
    /*    color: rgb(215, 0, 15);*/
    /*    font-size: 30px;*/
    /*    font-weight: bold;*/
    /*}*/
    .zongHe {
        color: rgb(215, 0, 15);
    }
    .justDown {
        width:43%;
        height:100%;
        background:rgba(225,3,18,1);
        border-radius:5px;
        border:1px solid rgba(225,3,18,1);

    }
    .justDown_one{
        width:90%;
        height:100%;
        background:rgba(225,3,18,1);
        border-radius:5px;
        border:1px solid rgba(225,3,18,1);
    }
    .justDown span{
        padding: 0px;
        width:9rem;
        height:100px;
        text-align:center;
        font-size:40px;
        font-family:PingFangSC-Medium,PingFang SC;
        /*font-weight:bold;*/
        color:rgba(255,255,255,1);
        display: table-cell;
        vertical-align:middle;
        /*line-height:50%;*/
        /*text-align: center;*/
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
    /*justDown-1{*/
    /*    width:165px;*/
    /*    height:44px;*/
    /*    background:rgba(225,3,18,1);*/
    /*    border-radius:5px;*/
    /*    border:1px solid rgba(225,3,18,1);*/
    /*}*/
    .contentS{
        h2{
            text-align: center;
            font-weight: bold;
        }
        p{
            margin: 40px 0 30px;
            font-size: 28px;
            color: #666;
            line-height: .6rem;
        }
    }
    .md-button {
        margin-bottom: 20px;
    }

    .md-example-popup {
        position: relative;
        font-size: 28px;
        font-family: DINPro;
        font-weight: 500;
        box-sizing: border-box;
        //text-align: center;
        background-color: #FFF
    }

    .md-example-popup-center {
        padding: 50px;
    }

    .md-example-popup-top {
        width: 100%;
        height: 75px;
        line-height: 75px;
        background: #4a4c5b;
        color: #fff
    }



    .md-example-popup-bottom {
        width: 100%;
        padding: 40px 35px;
        line-height: .6rem;
        p {
            line-height: 50px;
        }
    }

    .md-example-popup-left, .md-example-popup-right {
        height: 100%;
        padding: 0 150px;
        display: flex;
        align-items: center
    }
    .tips{
        position: relative;
    }
    .md-example-child-landscape{
        .md-button{
            margin-bottom :20px;
            .md-landscape-content{
                padding :30px;
                font-size: 30px;
                line-height :1.5;
                color :#666;
                p{
                    margin-bottom :30px
                }
            }
        }
    }
    .tip-msg {
        font-size: 24px;
        width: 100%;
        height: 56px;
        color: #fff;
        line-height: 56px;
        text-align: center;
        background: #fc8f22;
    }
</style>

<style lang="css">
    .myPopup .md-popup-box{
        height: 70% !important;
    }
    .bankIcon{
        font-size: 40px;
        position: absolute;
        top: 0.45rem;
        color: #d7000f;
        right: .6rem;
    }
    .moreMsg {
        height:50px;
        line-height: 50px;
        padding-top: 20px;
        text-align: center;
        color: #d7000f;
        font-size: 24px;
    }
    .md-field-item-control{
        color:#666666 !important;
    }
    .deleteBtn {
        background:rgba(255,255,255,1);
        color: #E10312;
    }
    .downPull {
        width:20px;
        height:12px;
    }
</style>
