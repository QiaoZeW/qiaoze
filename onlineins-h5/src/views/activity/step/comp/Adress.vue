<template>
   <div>
       <md-landscape v-model="showAddress" class="myAddress">
           <div class="address">
               <h2>请填写收货地址</h2>
               <div class="inputAll">
                   <div class="name">
                       <input type="text" placeholder="收货人" v-model="person.ticketReceiverUsername" @blur="checkName(person.ticketReceiverUsername)"  maxlength="20">
                       <img src="@/assets/imgs/appointment/start/name.png" class="iconImg"/>
                   </div>
                   <div class="iphone">
                       <input type="tel" placeholder="手机号" v-model="person.ticketReceiverMobile"  maxlength="11" @blur="checkPhone(person.ticketReceiverMobile)">
                       <img src="@/assets/imgs/appointment/start/iphone.png" class="iconImg"/>
                   </div>
                   <div class="area">
                       <div class="areaPart">
                       <!--    <input type="text" placeholder="所在地区" readonly="readonly" v-model="person.ticketReceiverArea">-->
                           <div class="areaInput" >
                               <span class="chooseArea" v-if="!person.ticketReceiverArea">请选择地区</span>
                               <span v-else class="chooseAreaPar">{{person.ticketReceiverArea}}</span>
                           </div>
                           <img src="@/assets/imgs/appointment/start/car.png" class="iconImgPar"/>
                           <div class="chooseAdd" @click="areaShow = true">
                               请选择
                               <img src="@/assets/imgs/appointment/start/bottom.png" />
                           </div>
                       </div>
                   </div>
                   <div class="detail">
                       <input type="text" placeholder="详细地址" v-model="person.ticketReceiverAddress">
                       <img src="@/assets/imgs/appointment/start/address.png" class="iconImg"/>
                   </div>

                  <div class="chooseSame">
                      <p>未领取的其他奖品是否也寄到相同的地址？</p>
                      <div class="radios">
                        <md-radio name="1" v-model="person.isUpdateAll" label="是" inline />
                        <md-radio name="0" v-model="person.isUpdateAll" label="否" inline />
                      </div>
                  </div>

               </div>
               <div class="btn_submit">
                   <button @click="postInfo">提交收货地址</button>
               </div>
           </div>
           <div class="address_02">
               <i class="iconfont icon-guanbi myCloseIcon" @click="hidePopup"></i>
           </div>
       </md-landscape>
       <TabpickerSup
           v-model="areaShow"
           :data="addressData"
           title="请选择地区"
           @change="addressHandleChange"
       />
   </div>
</template>

<script>
    import addressData from "@/static/addressAll"
    import TabpickerSup from '@/components/BuyComp/TabpickerSup'
    import {Dialog, Toast} from 'mand-mobile'
    export default {
        name: "AppPopup",
        data() {
            return {
                addressData: addressData,
                areaShow:false,
                person:{
                    ticketReceiverUsername:'',
                    ticketReceiverMobile:'',
                    ticketReceiverArea:'',
                    detailAdd:''
                }
            }
        },
        created(){
            if(this.personInfo){
                this.person = this.personInfo
            }
        },
        components:{
            TabpickerSup
        },
        props: {
            showAddress: {
                type: Boolean,
                default: false
            },
            id: {
                type: Number,
                default: NaN
            },
            iphoneNum:{
                type: String,
                default: ''
            },
            personInfo:{
                type: Object,
                default:()=>{}
            }
        },
        methods:{
            hidePopup(){
                this.$emit('closeAdd','')
            },
            postInfo(){
                if(!this.person.ticketReceiverUsername || !this.person.ticketReceiverAddress || !this.person.ticketReceiverArea || !this.person.ticketReceiverMobile){
                    Toast.info('您有信息未填写')
                    return false
                }

                let resultName = this.checkName(this.person.ticketReceiverUsername)
                let resultIphone = this.checkPhone(this.person.ticketReceiverMobile)
                if(!resultName){
                    Toast.info('您的姓名不正确')
                    return false
                }
                if(!resultIphone){
                    Toast.info('您的手机号不正确')
                    return false
                }

                let data ={
                    "receiverName":this.person.ticketReceiverUsername,
                    "ticketReceiverAddress": this.person.ticketReceiverAddress,
                    "ticketReceiverArea": this.person.ticketReceiverArea,
                    "id": this.id,
                    "isUpdateAll": this.person.isUpdateAll,
                    "ticketReceiverMobile": this.person.ticketReceiverMobile,
                }
                this.$app.getToken((userToken) => {
                    this.$request({
                        //  /api/act/stepTwo/saveActStepTwoDrawReceiverInfo 保存收货人
                        url: `/act/stepTwo/saveActStepTwoDrawReceiverInfo`,
                        method: 'POST',
                        isLoading: true,
                        data: data,
                        userToken: userToken,
                        contentType: 'application/json',
                        successFn: (data) => {
                            this.$emit('updateInfo',this.person)
                            this.$emit('closeAdd', '')
                        },
                        failFn: (data) => {
                        }
                    })
                })
            },
            addressHandleChange({options}) {
                let addStrArr = [];
                options.forEach((item, index) => {
                    addStrArr.push(item.label)
                })
                this.person.ticketReceiverArea = addStrArr.join().replace(/,/g,'')
            },
            checkName(name, e = null) {
                var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
                if (!name) {
                    Toast.failed('您没有输入姓名！')
                    return false;
                } else if (!regName.test(name)) {
                    Toast.failed('您输入的姓名格式不正确！')
                    return false;
                }
                return  true
            },
            checkPhone(phone, e = null) {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    Toast.failed("您输入的手机号格式不正确！");
                    return false;
                }
                return  true
            },
        }
    }
</script>

<style lang="scss" scoped>
    .address_02{
        width: 100%;
        margin-top: 20px;
        text-align: center;
        i{
          font-size: .86rem;
            color: #fff;
        }
    }
    .address {
        width: 670px;
        background: #fff;
        border-radius: 30px;
        padding-bottom: 60px;
        .exsuccess {
          position: absolute;
          top: 10px;
          left: 50%;
          -webkit-transform: translateX(-50%);
             -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
               -o-transform: translateX(-50%);
                  transform: translateX(-50%);
          color: red;
        }
        h2 {
            padding-top: 50px;
            font-size: 40px;
            font-family: PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            text-align: center;
        }

        .inputAll {
            margin-top: 23px;
            .name,.iphone,.detail{
                input {
                    width: 521px;
                    padding-left: 95px;
                    height: 88px;
                    font-size: 28px;
                    border: 1px solid #DBD0D0;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 36px auto 0;
                    padding-right: 0;
                }
            }
            div {
                position: relative;
                width: 616px;
                margin: 0 auto;

                .iconImg {
                    position: absolute;
                    top: 50%;
                    left: .45rem;
                    transform: translateY(-50%);
                }
            }

            .name img {
                width: 35px;
                height: 40px;
            }

            .iphone img {
                width: 32px;
                height: 42px;
            }

            .area {
                .iconImgPar {
                    position: absolute;
                    width: 44px;
                    height: 32px;
                    left: .4rem !important;
                    top: 50%;
                    transform: translateY(-40%);
                }
                .chooseArea{
                    color: #E8D3D3;
                    font-size: 0.37333rem;

                }
                .chooseAreaPar{
                    max-width: 4.5rem;
                    text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
                    color: #333;

                }
                .areaInput{
                    width: 521px;
                    padding-left: 95px;
                    height: 95%;
                    font-size: 28px;
                    border: .02rem solid #DBD0D0;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    margin: 36px auto 0;
                    padding-right: 0;
                }
                .areaPart{
                    width: 616px;
                    height: 92px;
                    margin: 0 auto;
                    position: relative;
                }
                .chooseAdd {
                    width: 180px;
                    position: absolute;
                    height: 100%;
                /*    border: 2PX solid #FF522F;*/
                    top: 0;
                    right: -.1rem;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #FF522F;
                    border-radius: 0px 10px 10px 0px;
                    img{
                        width: 28px;
                        height: 24px;
                        margin-left: 24px;
                    }
                }
            }

            .detail img {
                width: 31px;
                height: 37px;
            }

            .chooseSame {
              margin: 28px auto;
              font-size: 28px;
              color: #333;
              .radios {
                display: flex;
                justify-content: space-evenly;
              }
            }
        }
        .btn_submit{
            width: 100%;
            margin-top: 30px;
            button{
                display: block;
                margin: 0 auto;
                width: 616px;
                height: 88px;
                border-radius: 44px;
                background:linear-gradient(0deg,#D01C1B,#FC5430);
                -webkit-background:linear-gradient(0deg,#D01C1B,#FC5430);
                color:  #fff;
                font-size: 32px;
            }
        }
    }

</style>

<style lang="scss">
    .myAddress .md-popup {
        z-index: 100 ;
    }
    .inputAll input::-webkit-input-placeholder {
        color: #E8D3D3;
    }

    .inputAll input::-moz-input-placeholder {
        color: #E8D3D3;
    }

    .inputAll input::-ms-input-placeholder {
        color: #E8D3D3;
    }

    .myAddress .md-landscape-content {
        width: 100% !important;
    }

    input,textarea {
        -webkit-appearance: none; /* 方法2 */
    }

    .myAddress .md-icon-close:before{
        content:'' !important;
    }

    .chooseSame {
      .md-radio.is-checked .md-radio-icon {
        color: #FF522F;
      }
    }
</style>
