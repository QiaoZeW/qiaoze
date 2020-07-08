<template>
  <div class="section shunxinbao-detail">
      <whirl v-if="showWhirl"></whirl>
      <error v-if="showError"></error>
      <offShelves v-if="showShelves"></offShelves>
      <div class="content" v-if="!showShelves">
        <div ref="divSearch">
          <div class="contentTop">
            <img :src="bannerUrl" class="contentTopImg">
          </div>
            <div v-for="(item,index) in cpsAdvImage">
                <img :src="item.url" class="contentMiddle2" v-if="index === 0 "  >
            </div>

            <div  :class="advertising ? 'contentMiddle_a' : 'contentMiddle'">
            <div :class="setClass">
              <ul class="contentMiddleTitle">
                <li class="myTitle">保障计划</li>
              </ul>

              <div v-for="(item,index) in dutyList" v-if="index == '0' || index == '1' || showMoreContent">
                <ul>
                  <li @click="showOneD(item)">{{item.protectionName}}</li>
                  <li @click="showOneD(item)">
                    <span>{{item.description}}</span>
                    <img
                      src="../../assets/imgs/sunxinbao/grey2.png"
                      v-if="item.showFlag == true"
                      class="mediumImg"
                    >
                    <img src="../../assets/imgs/sunxinbao/grey1.png" v-else class="mediumImg">
                  </li>
                </ul>
                <div class="oneDetail" v-if="item.showFlag == true">
                  <p>{{item.detailDescription}}</p>
                </div>
              </div>
              <div v-if="showMoreContent">
                <ul>
                    <li>投保年龄</li>
                    <li class="insuredDetail"><span>28天到60周岁</span></li>
                </ul>
                <ul>
                    <li>保障期限</li>
                    <li class="insuredDetail"><span>1年</span></li>
                </ul>
                <ul>
                    <li>缴费频次</li>
                    <li class="insuredDetail"><span>年缴</span></li>
                </ul>
              </div>
              <div class="unFoldOrFold" @click="unFoldOrFold">{{ifUnfold}}<div v-if="showMoreContent" class="toTop"></div><div v-else class="toDown"></div></div>
            </div>
          </div>

          <p class="toast">
            更多详情请阅读
            <span @click="goNotice">《投保须知》</span>和
            <a @click="goClause" class="product">《产品条款》</a><br>
              <span  @click="goPersonalReminder">《人身险风险提示书》</span>
          </p>
          <md-landscape v-model="showFullScreen" full-screen>
            <h2 class="insureKnow">投保须知</h2>
            <div class="showInsure">
              <p v-html="insureKnow"></p>
            </div>
          </md-landscape>

        </div>

        <div class="blank"></div>

        <div class="medium" ref="medium">
          <p @click="showProduct">
            <span :class="actives == 0?'active':''">产品特色</span>
          </p>
          <p @click="showCase">
            <span :class="actives == 1?'active':''">常见问题</span>
          </p>
          <p @click="showToubao">
            <span :class="actives == 2?'active':''">我要投保</span>
          </p>
        </div>
        <div class="particular" ref="image">
          <div v-html="riskDetail"></div>
        </div>

        <div>
          <div class="shuoming" ref="shuoming">
            <h3>理赔说明</h3>
            <div v-html="controduce" class="myShuoMing"></div>

            <span class="showAllText" @click="showAll">{{ showAllText }}>></span>
            <div v-show="!isShowAll" v-html="questionLittle" class="myQuestion"></div>
            <div v-show="isShowAll" v-html="question" class="myQuestion"></div>

          </div>
        </div>

        <div>
          <div class="often" ref="often">
            <h3>我要投保</h3>
            <div class="box">
              <div class="box-border">
                <whirl v-if="showWhirl"></whirl>
                <error v-if="showError"></error>
                <div class="proposertitle"><p></p><p><span>投保人</span>（本人—仅限中国大陆税收居民）</p>
                    <md-icon
                      name="question"
                      size="lg"
                      class="iconTiShi"
                      color="#dbdbdb"
                      id="proposerIcon"
                      @click.stop="taxDialog.open = true"
                    ></md-icon>
                </div>
                <div class="proposerInfo">
                    <md-input-item
                      title="姓名"
                      style="text-align:left"
                      :maxlength="14"
                      placeholder="2位以上汉字"
                      v-model="proposerName"
                      v-bind:disabled="dataForm"
                      ref="proposerName"
                      id="proposerName"
                      name="proposerName"
                      @blur="checkName(proposerName,$event)"
                    ></md-input-item>

                    <md-input-item
                      title="联系电话"
                      placeholder="11位手机号"
                      ref="proposerPhone"
                      type="phone"
                      v-model="proposerPhone"
                      name="proposerPhone"
                      id="proposerPhone"
                      v-bind:disabled="proposerPhoneDisable"
                      @blur="checkPhone(proposerPhone,$event)"
                    ></md-input-item>

                    <md-input-item
                      ref="input0"
                      title="身份证号"
                      placeholder="请输入"
                      v-bind:disabled="cardNoDisable"
                      is-amount
                      v-model="proposerCard"
                      @blur="cardNum(proposerCard,$event)"
                      @focus="showProposerMoreInfo()"
                      name="proposerCard"
                      id="proposerCard"
                      :maxlength="18"
                    >
                    </md-input-item>
                </div>

                  <!-- <div class="proposerMoreInfo" v-if="isShowProposerMoreInfo"><span>投保人补充信息</span>(仅为税收大陆居民)</div> -->
                  <div class="moreInfo">
                      <div class="certificate-validity">
                        <md-field-item title="证件有效期类型" solid>
                          <div class="buttonarray">
                            <!-- <md-icon
                              v-if="proposerChooseIndex==1"
                              name="question"
                              size="lg"
                              color="#dbdbdb"
                              class="cardIcon"
                              @click="showIdCardTip"
                            ></md-icon> -->
                            <div
                              :class="proposerChooseIndex==1?'active' : ''"
                              @click="choosetype(1,'proposerChooseIndex')"
                            >非长期</div>
                            <div
                              :class="proposerChooseIndex==2?'active' : ''"
                              @click="choosetype(2,'proposerChooseIndex')"
                            >长期</div>
                          </div>
                          <p v-if="proposerChooseIndex == 1" class="certificateTypeTip2"><span>*</span>请使用有效期内证件投保</p>
                        </md-field-item>

                        <md-field-item
                          v-if="proposerChooseIndex==1"
                          name="eff-date"
                          arrow="arrow-right"
                          placeholder="请选择"
                          title="证件有效止期"
                          align="left"
                          :content="datePickerEndValue"
                          @click.native="showmodel('isDatePickerShowStop','datePickerEndValue')"
                        ></md-field-item>

                        <md-date-picker
                          ref="datePicker"
                          v-model="isDatePickerShowStop"
                          type="custom"
                          :min-date="minDate"
                          title="证件有效止期"
                          :text-render="textRender"
                          :custom-types="['yyyy', 'MM','dd']"
                          :default-date="currentDate"
                          @change="onDatePickerChange"
                          placeholder="请选择"
                          @confirm="onDatePickerConfirm"
                        ></md-date-picker>
                      </div>
                      <div  class="jobChoose">
                        <md-field-item
                          name="area"
                          title="职业"
                          arrow="arrow-right"
                          align="left"
                          placeholder="请选择"
                          :content="proposerJobStr"
                          @click.native="isjobShow = !isjobShow"
                        ></md-field-item>
                        <md-tab-picker
                          v-model="isjobShow"
                          :data="job4Data"
                          title="请选择职业"
                          @change="handleChangeProp"
                        />

                        <md-field-item
                          class="area"
                          name="area"
                          title="所在地区"
                          arrow="arrow-right"
                          align="left"
                          placeholder="请选择"
                          :content="proposerAddressStr"
                          @click="isaddressDataShow = !isaddressDataShow"
                        ></md-field-item>
                        <TabpickerSup
                          v-model="isaddressDataShow"
                          v-if="showInureCity == false"
                          :data="addressScreen"
                          title="请选择地区"
                          @change="addressPropHandleChange"
                        />
                      </div>
                        <md-input-item
                          title="详细地址"
                          class="detailHome detailAdd"
                          placeholder="请填写详细的地址"
                          v-model="proposerAddress1"
                          name="proposerAddress1"
                          @blur="getTi(proposerAddress1,$event)"
                          id="proposerAddress1"
                        >
                          <md-icon
                            name="question"
                            size="lg"
                            color="#dbdbdb"
                            class="cardIcon"
                            slot="left"
                            @click="showDetailTip"
                          ></md-icon>
                        </md-input-item>

                        <md-input-item
                          title="电子邮箱"
                          class="emailAdd"
                          placeholder="接收电子保单及相关通知书"
                          v-model="proposerEmail"
                          id="proposerEmail"
                          name="proposerEmail"
                          @blur="checkEmail(proposerEmail,$event)"
                        >
                        <md-icon
                            name="question"
                            size="lg"
                            color="#dbdbdb"
                            class="cardIcon"
                            slot="left"
                            @click="showEmailTip"
                        ></md-icon>
                        </md-input-item>
                  </div>

                <div class="insuredtitle"><p></p><p><span>被保人</span>（仅限中国大陆税收居民）</p>
                    <md-icon
                      name="question"
                      size="lg"
                      class="iconTiShi2"
                      color="#dbdbdb"
                      id="insureIcon"
                      @click.stop="taxDialog.open = true"
                    ></md-icon>
                </div>
                  <ul  class="relationship">
                      <li :class="insuredChooseNum == index?'active' : ''" @click="chooseInsured(index,item,'insuredChooseNum')" v-for="(item,index) in relationData">{{item}}</li>
                  </ul>
                  <div v-if="insuredRelationToAppnt!= '00'" class="relation-notself cdType">
                      <div :class="isBrowser||(isMiniApp&&isBnMiniApp) ? 'contacts-type' : ''">
                          <md-input-item
                            title="姓名"
                            placeholder="2位以上汉字"
                            v-model="insuredName"
                            id="insuredName"
                            name="insuredName"
                            :maxlength="14"
                            @blur="checkName(insuredName,$event)"
                          ></md-input-item>
                          <!-- <div class="contacts-icon">
                              <img @click="onContactIcon" src="@/assets/imgs/contacts-icon.png" alt>
                          </div> -->
                      </div>

                      <md-input-item
                        title="联系电话"
                        placeholder="11位手机号"
                        type="phone"
                        v-model="insuredPhone"
                        name="insuredPhone"
                        @blur="checkPhone(insuredPhone,$event)"
                        id="insuredPhone"
                      ></md-input-item>
                    <div class="certificate-type" v-if="insuredRelationToAppnt == '03'">
                        <ul class="certificateType">
                            <li>证件类型</li>
                            <li  :class="certificateTypeNum == index?'active' : ''" v-for="(item,index) in certificateType" @click="certificateTypeChoose(index,item,'certificateTypeNum')">{{item}}</li>
                        </ul>
                    </div>
                    <p v-if="insureIdTypeCode == '4'" class="certificateTypeTip"><span>*</span>出生证仅支持2周岁（含）以下</p>
                    <p v-if="insureIdTypeCode == '5'" class="certificateTypeTip"><span>*</span>户口本仅支持17周岁（含）以下</p>
                    <!--性别  出生日期-->
                    <div v-if="showSexAndBirth == true && insuredRelationToAppnt == '03'" class="sex-date">
                      <md-field-item
                        title="性别"
                        arrow="arrow-right"
                        :content="pickerValue0"
                        placeholder="请选择"
                        @click="showSex = true"
                      ></md-field-item>
                      <md-picker
                        ref="picker0"
                        v-model="showSex"
                        :data="pickerData0"
                        @confirm="onPickerConfirm(0)"
                        title="选择性别"
                      ></md-picker>
                      <md-field-item
                        title="出生日期"
                        arrow="arrow-right"
                        placeholder="请选择"
                        :content="datePickerValueB"
                        @click="showBirth = true"
                      ></md-field-item>

                      <md-date-picker
                        ref="picker1"
                        v-model="showBirth"
                        :cols="3"
                        :max-date="maxChildDate"
                        :min-date="minChildDate"
                        is-cascade
                        type="custom"
                        :text-render="textRender"
                        :custom-types="['yyyy', 'MM','dd']"
                        title="选择出生日期"
                        @confirm="onDatePickerConfirmBirth"
                      ></md-date-picker>
                    </div>
                    <!--性别  出生日期  户口本-->
                    <div
                      v-if="showSexAndBirth == false && insuredRelationToAppnt == '03' && insureIdTypeCode == '5'"
                    >
                      <md-field-item
                        title="性别"
                        arrow="arrow-right"
                        :content="pickerValue0"
                        placeholder="请选择"
                        @click="showSex = true"
                      ></md-field-item>
                      <md-picker
                        ref="picker0"
                        v-model="showSex"
                        :data="pickerData0"
                        @confirm="onPickerConfirm(0)"
                        title="选择性别"
                      ></md-picker>
                      <md-field-item
                        title="出生日期"
                        arrow="arrow-right"
                        placeholder="请选择"
                        :content="datePickerValueB"
                        @click="showBirth = true"
                      ></md-field-item>

                      <md-date-picker
                        ref="picker1"
                        v-model="showBirth"
                        :cols="3"
                        :max-date="maxChildDate"
                        :min-date="minChildDate"
                        is-cascade
                        type="custom"
                        :text-render="textRender"
                        :custom-types="['yyyy', 'MM','dd']"
                        title="选择出生日期"
                        @confirm="onDatePickerConfirmBirth"
                      ></md-date-picker>
                    </div>
                    <md-input-item
                      v-if="insuredRelationToAppnt == '03'"
                      ref="input1"
                      title="证件号"
                      placeholder="请输入"
                      is-amount
                      v-model="insuredCard"
                      id="insuredCard"
                      name="insuredCard"
                      @blur="cardNum(insuredCard,$event)"
                      @focus="showInsuredMoreInfo()"
                      :maxlength="18"
                    >
                    </md-input-item>
                    <md-input-item
                      v-else
                      ref="input1"
                      title="身份证号"
                      placeholder="请输入"
                      is-amount
                      v-model="insuredCard"
                      id="insuredCard"
                      name="insuredCard"
                      @blur="cardNum(insuredCard,$event)"
                      @focus="showInsuredMoreInfo()"
                      :maxlength="18"
                    >
                    </md-input-item>
                  </div>
                    <!-- <div class="proposerMoreInfo" v-if="isShowInsuredMoreInfo"><span>被保人补充信息</span>(仅为税收大陆居民)</div> -->
                    <div class="moreInfo" v-if="insuredRelationToAppnt!= '00'">
                        <div v-if="insureIdTypeCode == '0'" class="insuredCertificateType">
                          <md-field-item title="证件有效期类型" solid>
                            <div class="insuredButtonarray">
                              <!-- <md-icon
                                v-if="insuredChooseIndex==1"
                                name="question"
                                size="lg"
                                color="#dbdbdb"
                                class="cardIcon"
                                @click="showIdCardTip"
                              ></md-icon> -->
                              <div
                                :class="insuredChooseIndex==1?'active' : ''"
                                @click="choosetype(1,'insuredChooseIndex')"
                              >非长期</div>
                              <div
                                :class="insuredChooseIndex==2?'active' : ''"
                                @click="choosetype(2,'insuredChooseIndex')"
                              >长期</div>
                            </div>
                            <p v-if="insuredChooseIndex == 1" class="certificateTypeTip2"><span>*</span>请使用有效期内证件投保</p>
                          </md-field-item>

                          <md-field-item
                            v-if="insuredChooseIndex==1"
                            name="eff-date"
                            title="证件有效止期"
                            arrow="arrow-right"
                            placeholder="请选择"
                            align="left"
                            :content="insurePickerEndValue"
                            @click.native="showmodel('isDatePickerShowInsureStop','insurePickerEndValue')"
                          ></md-field-item>
                          <md-date-picker
                            ref="datePicker"
                            v-model="isDatePickerShowInsureStop"
                            type="custom"
                            :min-date="minDate"
                            title="证件有效止期"
                            :text-render="textRender"
                            :custom-types="['yyyy', 'MM','dd']"
                            :default-date="currentDate"
                            @change="onDatePickerChange"
                            placeholder="请选择"
                            @confirm="onDatePickerConfirmInsure"
                          ></md-date-picker>
                        </div>
                        <div class="insuredJobChoose">
                            <md-field-item
                                name="area"
                                title="职业"
                                arrow="arrow-right"
                                placeholder="请选择"
                                align="left"
                                :content="insuredJobStr"
                                @click="isjobShows = !isjobShows"
                              ></md-field-item>
                              <md-tab-picker
                                ref="job"
                                v-model="isjobShows"
                                :data="job4InsureData"
                                title="请选择职业"
                                @change="handleChange"
                              />

                            <md-field-item
                              name="area"
                              title="所在地区"
                              arrow="arrow-right"
                              align="left"
                              placeholder="请选择"
                              :content="addressDataValueStr"
                              @click="isaddressDataShowInsure = !isaddressDataShowInsure"
                            ></md-field-item>
                            <TabpickerSup
                              v-model="isaddressDataShowInsure"
                              :data="addressScreen"
                              title="请选择地区"
                              @change="addressHandleChange"
                            />
                        </div>

                        <md-input-item
                          title="详细地址"
                          class="detailHome detailAdd"
                          placeholder="请填写详细的地址"
                          v-model="insuredAddress1"
                          name="insuredAddress1"
                          @blur="getShi(insuredAddress1,$event)"
                          id="insuredAddress1"
                        >
                            <md-icon
                              name="question"
                              size="lg"
                              color="#dbdbdb"
                              class="cardIcon"
                              slot="left"
                              @click="showDetailTip"
                            ></md-icon>
                        </md-input-item>

                        <md-input-item
                          title="电子邮箱"
                          placeholder="用于接收电子保单"
                          v-model="insuredEmail"
                          class="emailAdd"
                          id="insuredEmail"
                          name="insuredEmail"
                          @blur="checkEmail(insuredEmail,$event)"
                        >
                            <md-icon
                              name="question"
                              size="lg"
                              color="#dbdbdb"
                              class="cardIcon"
                              slot="left"
                              @click="showEmailTip"
                            ></md-icon>
                        </md-input-item>

                    </div>
                </div>
                <div class="beneficiary-title-sub"><span></span><p>受益人：法定受益人</p></div>
             </div>
          </div>

          <div class="white-box">
              <div></div>
              <p>本产品由百年人寿保险有限公司承保并负责理赔</p>
          </div>

                <md-dialog
                  title="提示"
                  :closable="true"
                  v-model="basicDialog.open"
                  :btns="basicDialog.btns"
                  class="shuiShou"
                  ref="tiShi"
                >{{basicDialog.msg}}</md-dialog>
                <md-dialog :closable="true" v-model="cardCheck.open" :btns="cardCheck.btns">
                  <p>该投保人身份证已被绑定，请使用已绑定的手机号登录，如果想更换绑定关系，请联系客服处理</p>
                </md-dialog>
                <md-dialog title="提示" :closable="true" v-model="taxDialog.open" :btns="taxDialog.btns">
                  1.中国税收居民：指在中国境内有住所，或者无住所而在境内居住满一年的个人。
                  <br>2.非居民：指中国税收居民以外的个人。
                  <br>3.军人、武装警察持有效的军官（武装警察）身份证件的即认为是中国税收居民。
                  <br>
                </md-dialog>
                <md-captcha
                  ref="captcha"
                  v-model="smsVerifyShow"
                  title="请输入验证码"
                  :maxlength="6"
                  :system="false"
                  :mask="false"
                  :appendTo="smsVerifyAppendTo"
                  @submit="smsVerifySubmit"
                  @show
                  @hide
                  @send="smsVerifySend"
                  :auto-countdown="false"
                >{{smsVerifyContent}}</md-captcha>
                <md-dialog :closable="true" v-model="smsCodeDialog.open" :btns="smsCodeDialog.btns">
                  <p style="width: 70%;margin:0 auto;margin-top:20px;">
                    <img @click="smsVerifyCode" :src="smsCodeDialog.img" alt>
                  </p>
                  <p style="margin-top:20px;text-align: center" class="smsCode">
                    <md-input-item
                      style="text-align: center !important;border-bottom:1px solid #ccc !important;"
                      title
                      type="text"
                      v-model="smsCodeDialog.code"
                      maxlength="4"
                      placeholder="请输入图形验证码"
                    ></md-input-item>
                  </p>
                </md-dialog>
                <md-picker
                  ref="contactsMod1"
                  v-if="showContacts && (insuredRelationToAppnt == '01')"
                  v-model="isContactsShow"
                  :data="contactsData1"
                  @confirm="contactsConfirm1"
                  title="常用被保人"
                ></md-picker>
                <md-picker
                  ref="contactsMod2"
                  v-else-if="showContacts && (insuredRelationToAppnt == '02')"
                  v-model="isContactsShow"
                  :data="contactsData2"
                  @confirm="contactsConfirm2"
                  title="常用被保人"
                ></md-picker>
                <md-picker
                  ref="contactsMod3"
                  v-else-if="showContacts && (insuredRelationToAppnt == '03')"
                  v-model="isContactsShow"
                  :data="contactsData3"
                  @confirm="contactsConfirm3"
                  title="常用被保人"
                ></md-picker>
                <TipComp ref="tipComp"/>
        </div>

        <!-- <div class="beneficiary-title">
            <md-agree
              v-model="agreeConf.checked"
              :disabled="agreeConf.disabled"
              :size="agreeConf.size"
              @change="onChange(agreeConf.name, agreeConf.checked, $event)"
            >
              同意
              <span class="userAdd" @click="showPopUp('bottom', 'agreementShow')">《用户协议》</span>
              <span class="userAdd" @click="showPopUp('bottom', 'privateShow')">《隐私声明》</span>
            </md-agree>
            <md-popup v-model="isPopupShow.bottom" position="bottom" class="myPopup">
              <md-popup-title-bar
                :title="popTitle"
                ok-text="确认"
                cancel-text="取消"
                @confirm="hidePopUp('bottom')"
                @cancel="hidePopUp('bottom')"
              ></md-popup-title-bar>
              <agreement :agreementShow="agreementShow"/>
            </md-popup>
        </div> -->

        <div class="contentBottom" :class="{'isIphonex': isIphonex}" v-if="!showShelves">
          <div class="beneficiary-title">
              <md-agree
                v-model="agreeConf.checked"
                :disabled="agreeConf.disabled"
                :size="agreeConf.size"
                @change="onChange(agreeConf.name, agreeConf.checked, $event)"
              >
                同意
                <span class="userAdd" @click="showPopUp('bottom', 'agreementShow')">《用户协议》</span>
                <span class="userAdd" @click="showPopUp('bottom', 'privateShow')">《隐私声明》</span>
              </md-agree>
              <md-popup v-model="isPopupShow.bottom" position="bottom" class="myPopup">
                <md-popup-title-bar
                  :title="popTitle"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="hidePopUp('bottom')"
                  @cancel="hidePopUp('bottom')"
                ></md-popup-title-bar>
                <agreement :agreementShow="agreementShow"/>
              </md-popup>
          </div>
          <p class="customerModal" @click="goCustomer" v-if="showCustomer">
            <img class="customer" src="../../assets/imgs/customer.png">
            <span>客服</span>
          </p>
          <p v-if="!isBrowser &&!isBnMiniApp && showExlogin" class="customerModal" @click="goExlogin">
            <img class="customer exlogin" src="../../assets/imgs/cps_icon.png">
            <span>保单</span>
          </p>
          <p class="bottomP" ref="bottomP">
            ￥
            <span class="bottomArt">{{lowPrice}}</span>
          </p>
          <a v-if="isLoginFlag && (isBrowser||isBnMiniApp)" class="bottomA" @click="goToLogin">去登录</a>
          <a v-else class="bottomA" @click="jsubmit">立即投保</a>
        </div>
        <div class="empty" v-if="isIphonex"></div>

        <div class="xiTop" ref="xiTop">
          <p @click="showProduct">
            <span :class="activeQ === 0?'activeB':''">产品特色</span>
          </p>
          <p @click="showCase">
            <span :class="activeQ === 1?'activeB':''">常见问题</span>
          </p>
          <p @click="showToubao">
            <span :class="activeQ === 2?'activeB':''">我要投保</span>
          </p>
        </div>
      </div>
      <div class="floatingWindow" v-if="showCount">{{countDown}}S</div>
      <div v-for="(item,index) in cpsAdvImage">
          <img :src="item.url" class="contentMiddle1" v-if="index === 1 "  >
      </div>
  </div>
</template>
<script>
import {
  FieldItem,
  Field,
  DatePicker,
  Landscape,
  Dialog,
  Button,
  Toast,
  Tabs,
  TabPane,
  Popup,
  PopupTitleBar,
  Icon,
  Agree,
  ActionBar,
  InputItem,
  Picker,
  TabPicker,
  Captcha
} from "mand-mobile";
import "../../assets/detail.scss";
import Whirl from "@/components/Whirl";
import Error from "@/components/Error";
import OffShelves from "@/components/OffShelves";
import Settings from "~/settings.json";
import { getRiskTypeName } from "@/utils/dictionary" // 神策数据字典
import { getProdFlag, debounce } from "@/utils/utils"
import Vue from "vue";
import job8 from "@/static/job8";
import addressdata from "@/static/addressInsure";
import Agreement from "@/components/BuyComp/Agreement";
import TabpickerSup from "@/components/BuyComp/TabpickerSup";
import TipComp from "@/components/BuyComp/TipComp";
import 'babel-polyfill';

export default {
  name: "Index",
  components: {
    [DatePicker.name]: DatePicker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Dialog.name]: Dialog,
    [Landscape.name]: Landscape,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [InputItem.name]: InputItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon,
    [Agree.name]: Agree,
    [ActionBar.name]: ActionBar,
    [InputItem.name]: InputItem,
    [Picker.name]: Picker,
    [TabPicker.name]: TabPicker,
    [Captcha.name]: Captcha,
    Error,
    Whirl,
    OffShelves,
    Agreement,
    TabpickerSup,
    TipComp
  },
  data() {
    return {
      ptData: [],
      paData: [],
      chData: [],
      certificateType: ['出生证','户口本','身份证'],
      showMoreContent: false,
      ifUnfold:'展开',
      showAllText: '展开',
      isShowAll: false,
      isShowProposerMoreInfo: false,
      isShowInsuredMoreInfo: false,
      showWhiteBox: true,
      showExlogin: false,
      showHeight: 0,
      $myQuestion: null,
      cpsWS:'',
      wxShareSign:'',
      advertising: false,
      cpsCode:'',
      cpsAdvImage:[],
      image:{
          url:undefined,
          imageType:undefined
      },
      wxShareTitle: "", // 微信分享标题
      descContent: "", // 分享描述
      imgUrl: "", //分享小图标
      showBXD: false,
      isclick: true,   //是否有权点击投保
      currentDate: new Date(),
      dataList: [],
      riskName: "",
      proData: null,
      showError: false,
      showWhirl: false,
      showShelves: false,
      dutyList: [],
      product_id: null,
      agentCode: "3880100278",
      isPopupShow: {},
      isPopupBoxShow: {},
      isFixed: false,
      lightData: "",
      lightHuo: "",
      dieData: "",
      fatData: "",
      riskCode: "",
      andData: "",
      childData: "",
      actives: "0",
      mediumData: "",
      riskInfo: {},
      showSeven: false,
      riskDetail: null,
      isDatePickerShow: false,
      datePickerValue: "",
      lowPrice: "",
      clauseUrl: "",
      insureKnow: null,
      controduce: null,
      question: null,
      questionLittle: null,
      bannerUrl: "",
      activeQ: null,
      health: null,
      introduce: {},
      modelCode: "",      //模块code
      guaranteeDetails: null,
      knows: {},
      showFullScreen: false,
      addNewInsured: false,
      actDialog: {
      open: false,
      btns: [
          {
            text: '我再想想',
            type: 'danger',
            handler: this.thinkAgain,
          },
          {
            text: '是的，我想为别人投保',
            handler: this.thinkOthers,
          },
        ],
      },
      basicDialog: {
        open: false,
        btns: [
          {
            text: "确认操作",
            handler: this.onBasicConfirm
          }
        ]
      },
      gathering_id: "",
      articlePro_id: "",
      countDown: 5,
      showCount: false,
      evaluation_id: "",
      isBrowser: false,
      reportDetail_id:'',
      showCustomer:null,
      bxdUrl:'',
      areaCode:'',    //代理人地区code
      secondaryDistributor:'',
      isBnMiniApp:false,
      productLink:'',
      wxPayFlag: false,
      showWxPay: false,
      chooseIndex: 1,
      anonymousId: "", //神測匿名id
      renew: "是", //是否续保
      renewFlag: "Y", //续保value
      renewType: true, //埋点是否续保
      socialSecurity: "是", //社保
      socialSecurityFlag: null, //社保val
      socialSecurityType: true, //埋点社保
      throttleFlag: false,
      minDate: new Date(),
      maxDate: new Date(),
      insureHeight: null,
      maxChildDate: new Date(),
      minChildDate: new Date(),
      showTab: false,
      insureWeight: null,
      height: null,
      weight: null,
      localdata: null,
      picUrl: "",
      attachmentUrl: "",
      key: 0,
      taxDialog: {
        open: false,
        btns: [
          {
            text: "确认",
            handler: this.onTaxDialogConfirm
          }
        ]
      },
      smsCodeDialog: {
        img: "",
        randomStr: "",
        code: "",
        open: false,
        btns: [
          {
            text: "确定",
            handler: this.smsCodeSend
          }
        ]
      },
      cardCheck: {
        open: false,
        btns: [
          {
            text: "联系客服",
            handler: this.goCustomer
          },
          {
            text: "拨打95542",
            handler: this.goCall
          }
        ]
      },
      agreeConf: {
        checked: true,
        name: "agree0",
        size: "md",
        disabled: false,
        introduction: "选中状态"
      },
      proposerChooseIndex: 1,
      insuredChooseIndex: 1,
      insuredChooseNum: 0,
      certificateTypeNum: 2,
      beneficiaryChooseIndex: 1,
      modelName: "",
      marriageInfo: "",
      // 投保人信息
      proposerName: "",
      proposerJobValue: "",
      proposerAddressArr: [],
      proposerCard: "",
      proposerPhone: "",
      proposerEmail: "",
      proposerAddressCode: "",
      proposerAddress1: "",
      proposerJob: [],
      // 被保人信息
      insuredName: "",
      insuredCard: "",
      insuredPhone: "",
      insuredEmail: "",
      insuredAddress: "",
      isjobShows: false,
      insuredAddressCode: "",
      insuredAddressArr: [],
      insuredJobValue: "",
      insuredAddress1: "",
      insuredJob: [],
      insuredRelationToAppnt: "00", // 被保人与投保人关系
      modelIndex: 0,
      showTi: true,
      kaihuhangaddress: "",
      jumingDataValue: "0",
      infoSolid: "question",
      insuredCertificateTypeValue: "",
      relation: "本人",
      bankvalue: "",
      bankAccNo: "",
      bankAccNo1: "",
      phoneValue: 155354832,
      addressDataValue: [],
      isaddressDataShowInsure: false,
      isBeneficiaryDatePickerShow: false,
      isRelationShow: false,
      isjumingDataShow: false,
      isaddressDataShow: false,
      orderNum: "",
      isbeneficiaryshow: false,
      isbeneficiaryRealtionshow: false,
      isbeneficiaryCardTypeShow: false,
      isjobShow: false,
      mydata: null,
      // 投保人证件有效期起期
      datePickerStartValue: "",
      // 投保人证件有效期止期
      datePickerEndValue: "",
      // 被保人证件有效期起期
      insurePickerStartValue: "",
      // 被保人证件有效期止期
      insurePickerEndValue: "",
      beneficiaryValue: "法定受益人",
      datePickerValue2: "仅为大陆税收居民",
      beneficiaryRelation: "",
      isPickerShow: false,
      isCertificateShow: false,
      ocrData: null,
      pickerData: [],
      certificateTypeData: [],
      pickerData0: [[{ label: "男", value: "0" }, { label: "女", value: "1" }]],
      addressData: addressdata,
      addressScreen: addressdata,
      job4Data: job8,
      job4InsureData: job8,
      pickerDefaultIndex: [0, 0, 0],
      pickindex: [0, 0],
      // 保费
      premium: 0,
      cvaliDate: "",
      photoUrl: "",
      applyDate: "",
      photoFormat: "",
      orderContent: "",
      bnRiskInfoList: [],
      marriage: "",
      marriageNum: "",
      isShowMarriage: false,
      isMarriage: "2",
      marriageData: [],
      insureMarriageNum: "",
      insureMarriage: "",
      isInsureMarriage: "",
      isShowInsureMarriage: false,
      social: "",
      socialNum: "",
      isShowSocial: false,
      isSocial: "",
      insureSocial: "",
      insureSocialNum: "",
      isInsureShowSocial: false,
      isInsureSocial: "",
      smoke: "",
      isInfsureSmoke: "",
      smokeData: [[{ text: "有", value: 0 }, { text: "否", value: 1 }]],
      isShowSmoke: false,
      smokeNum: "",
      degreeData: [],
      degree: "",
      isShowDegree: false,
      isDegree: "",
      degreeNum: "",
      insureDegree: "",
      isInsureShowDegree: false,
      childJob: [
        [
          { value: 2099907, label: "一般学生" },
          { value: 2099908, label: "学龄前儿童" }
        ]
      ],
      isInsureDegree: "",
      insureDegreeNum: "",
      bankData: [],
      bankNum: "",
      jobCode: "",
      jobName: "", //投保人职业
      insureJobCode: "",
      provinceAdd: {
        placeCode: "",
        placeName: ""
      },
      cityAdd: {
        placeCode: "",
        placeName: ""
      },
      areaAdd: {
        placeCode: "",
        placeName: ""
      },
      insureProvinceAdd: {
        placeCode: "",
        placeName: ""
      },
      insureCityAdd: {
        placeCode: "",
        placeName: ""
      },
      insureAreaAdd: {
        placeCode: "",
        placeName: ""
      },
      insureSex: "",
      jobInfo: {},
      userBiaoShi: "",
      orderAdd: "",
      email: "",
      insureEmail: "",
      showShi: true,
      insuredLiveCity: "",
      proposerLiveCity: "",
      insuredWork: "",
      proposerWork: "",
      proposerDateFlag: "",
      insureDateFlag: "",
      curRiskCode: "",
      proposerIdValidate: "",
      showSexAndBirth: false,
      insureIdValidate: "",
      storageName:
        "BUYSTORAGE" +
        this.$router.query("product_id") +
        (window.localStorage.getItem("USERCODE") || ""),
      userName: "",
      userCardNo: "",
      hideCamera: false,
      insureIdTypeCode: "0",
      insureIdType: "身份证",
      showSex: false,
      showDeathDisabled: false,
      showDeath: true,
      showBirth: false,
      pickerValue0: "",
      pickerValue1: "",
      datePickerValueB: "",
      insureChildSex: "",
      insureChildBirth: "",
      isDatePickerShowStop: false,
      isDatePickerShowInsureStart: false,
      isDatePickerShowInsureStop: false,
      insuredChildJob: "",
      isjobShowQ: false,
      showPropserName: false,
      showProposerCard: false,
      dataForm: false,
      cardNoDisable: false,
      proposerPhoneDisable: false,
      insureCity: [],
      showInureCity: false,
      proposerAddress: [],
      proposerAddressPar: [
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        }
      ],
      marriageType: {
        1: "type_marriage",
        2: "type_bank",
        3: "type_relation",
        4: "type_idType",
        5: "type_degree"
      },
      insureTrialAge: "",
      chooseRelation: false,
      chooseRelationPicker: true,
      smsVerifyShow: false,
      smsVerifyContent: "",
      smsVerifyAppendTo: document.body,
      smsVerifyFirst: true,
      smsVerifyCodeVal: "",
      insuredData: null,
      showContacts: true,
      isContactsShow: false,
      contactIconShow: true,
      relationData: ['本人','配偶','父母','子女'],
      contactsData1: [],
      contactsData2: [],
      contactsData3: [],
      isMiniApp: false,
      options: "330281",
      optionsTest: ["", "", ""],
      optionsText: [
        {
          label: ""
        },
        {
          label: ""
        },
        {
          label: ""
        }
      ],
      agreementShow: true,
      popTitle: "用户协议",
      isbn:'0',
      cvalidate5321: "",
      smsVerifyMobilePhone:'',
      setClass:'contS',
      isLoginFlag: true
    };
  },
  computed: {
      insuredJobStr() {
        if (Array.isArray(this.insuredJob)) {
          return this.insuredJob.map(item => item.label).join("-");
        } else {
          return this.insuredJob;
        }
      },
      proposerJobStr() {
        if (Array.isArray(this.proposerJob)) {
          return this.proposerJob.map(item => item.label).join("-");
        } else {
          return this.proposerJob;
        }
      },
      addressDataValueStr() {
        if (Array.isArray(this.addressDataValue)) {
          return this.addressDataValue.map(item => item.label).join("-");
        } else {
          return this.addressDataValue;
        }
      },
      proposerAddressStr() {
        return this.proposerAddress.map(item => item.label).join("-");

      },


    isIphonex () {
      if (typeof window !== 'undefined' && window) {
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
      }
      return false
    }
  },
  created() {
    //获取参数
    this.isMiniApp = this.$app.isMiniProgram();
    this.agentCode = this.$router.query("agentCode");
    this.product_id = this.$router.query("product_id");
    this.saveUrlParams();

    this.initMiniApp(()=>{
        if(this.isBrowser || (this.isMiniApp && this.$app.isBnMiniApp())){
           this.goLoginGetToken();
        }
    });
    this.areaCode = JSON.parse(localStorage.getItem("areaCode"));

    this.$app.wxProductDetail(this.product_id, 0);
    this.getRiskCode(); //获取产品基本信息
    let prem = 0;
    this.premium = prem;
    //            this.getUserCode() //获取代理人编码
    this.orderAdd = "AgainOrderPayment.html?product_id=" + this.product_id;

    let _this = this;
    sensors.quick("isReady", function() {
      _this.anonymousId = sensors.quick("getAnonymousID");
      console.log("1", _this.anonymousId);
    });

    this.loadProDetail();
    this.loadDutyDetail();

    if(this.reportDetail_id){ //reportUser_id
        let that = this
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('backHomeConfig', {
                'flag_back': 0, //是否返回按钮，1-返回 0-不返回
            }, function (response) {
            });
        })
          setupWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler("goEvaluationReport", { reportAdd: that.$router.siteUrl() + '/evaluation/ReportDetail.html?reportUser_id=' + that.reportDetail_id }, function(responseData) {});
          });
      }
  },
  mounted() {
     if (process.env.NODE_ENV !== 'production'){
                this.setClass='contS watermark';

            }
    this.$myQuestion = document.querySelector('.myQuestion')
    window.addEventListener("scroll", this.handleScroll);
    this.$app.showCustomerIntelligence((data) => {
        this.showExlogin = data.insOrderFlag
        getProdFlag (this.product_id, (flagData) => {
            this.showBXD = data.showBXD
            // 体内显示或者 体外 客服入口判断显示
            if (flagData.serviceFlag) {
              if(this.isBrowser || this.showBXD){
                  this.showCustomer = true
                  this.$refs.bottomP.style.flex = '.7'
              }else{
                  this.showCustomer = false
                  this.$refs.bottomP.style.flex = '1'
              }
              if (this.evaluation_id) {
                let _this = this;
                if (window.history && window.history.pushState) {
                  history.pushState(null, null, document.URL);
                  window.addEventListener("popstate", _this.closeBrowser, false);
                }
              }
            }

        })
    })
  },
  updated () {
    if (this.$myQuestion.children[9]) {
      let pagebreak = document.querySelector('.ke-pagebreak')
      if (pagebreak) {
        pagebreak.style.opacity = '0'
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("popstate", this.closeBrowser, false);
    //remove storage
    window.localStorage.removeItem("shence_view_detail_risk_source");
  },
  methods: {
      onContactIcon() {
        if(this.insuredRelationToAppnt == '01'){
           if (
             !Array.isArray(this.contactsData1[0]) ||
             this.contactsData1[0].length == 0
           ) {
             Toast.info("暂无常用被保人");
             return false;
           }
        }
        if(this.insuredRelationToAppnt == '02'){
           if (
             !Array.isArray(this.contactsData2[0]) ||
             this.contactsData2[0].length == 0
           ) {
             Toast.info("暂无常用被保人");
             return false;
           }
        }
        if(this.insuredRelationToAppnt == '03'){
           if (
             !Array.isArray(this.contactsData3[0]) ||
             this.contactsData3[0].length == 0
           ) {
             Toast.info("暂无常用被保人");
             return false;
           }
        }
        this.showContacts = true;
        this.isContactsShow = true;
      },
      //获取常用被保人
      loadContactsData() {
        let that = this;
        this.$app.getToken(function(userToken) {
          that.$request({
            url: `/vip/contact/getInsured`,
            params: {},
            userToken: userToken,
            successFn: data => {
              for(let i=0;i<data.length;i++){
                  if(data[i].relationToAppnt == "01"){
                      that.ptData.push(data[i])
                  }
              }
              for(let j=0;j<data.length;j++){
                  if(data[j].relationToAppnt == "02"){
                      that.paData.push(data[j])
                  }
              }
              for(let k=0;k<data.length;k++){
                  if(data[k].relationToAppnt == "03"){
                      that.chData.push(data[k])
                  }
              }
              console.log('111',that.ptData)
              console.log('222',that.paData)
              console.log('333',that.chData)
            },
            failFn: () => {}
          });
        });
      },
      getContactsData(relationValue){
        this.contactsData1.length = 0;
        this.contactsData2.length = 0;
        this.contactsData3.length = 0;
        if(relationValue == '01'){
           let data = [];
           data = this.ptData;
           if(data.length == 0){
               return false;
           }
           let datas = [];
           data.forEach(function(item, i) {
             let temp = {};
             temp.text = item.name;
             let _text = {
               name: item.name,
               mobile: item.mobile,
               cardNo: item.cardNo,
               email: item.email,
               detailAddress: item.detailAddress,
               occupation: item.occupation,
               relationToAppnt: item.relationToAppnt
             };
             _text.areaCode =
               item.areaCode && item.areaCode !== ""
                 ? [
                     item.areaCode.substring(0, 2) + "0000",
                     item.areaCode.substring(0, 4) + "00",
                     item.areaCode
                   ]
                 : "";
             temp.value = JSON.stringify(_text);
             if(temp.text != ""){
                 datas.push(temp);
             }
           });
           this.contactsData1.push(datas);
        }else if(relationValue == '02'){
           let data = [];
           data = this.paData;
           if(data.length == 0){
               return false;
           }
           let datas = [];
           data.forEach(function(item, i) {
             let temp = {};
             temp.text = item.name;
             let _text = {
               name: item.name,
               mobile: item.mobile,
               cardNo: item.cardNo,
               email: item.email,
               detailAddress: item.detailAddress,
               occupation: item.occupation,
               relationToAppnt: item.relationToAppnt
             };
             _text.areaCode =
               item.areaCode && item.areaCode !== ""
                 ? [
                     item.areaCode.substring(0, 2) + "0000",
                     item.areaCode.substring(0, 4) + "00",
                     item.areaCode
                   ]
                 : "";
             temp.value = JSON.stringify(_text);
             if(temp.text != ""){
                 datas.push(temp);
             }
           });
           this.contactsData2.push(datas);
        }else if(relationValue == '03'){
           let data = [];
           data = this.chData;
           if(data.length == 0){
               return false;
           }
           let datas = [];
           data.forEach(function(item, i) {
             let temp = {};
             temp.text = item.name;
             let _text = {
               name: item.name,
               mobile: item.mobile,
               cardNo: item.cardNo,
               email: item.email,
               detailAddress: item.detailAddress,
               occupation: item.occupation,
               relationToAppnt: item.relationToAppnt
             };
             _text.areaCode =
               item.areaCode && item.areaCode !== ""
                 ? [
                     item.areaCode.substring(0, 2) + "0000",
                     item.areaCode.substring(0, 4) + "00",
                     item.areaCode
                   ]
                 : "";
             temp.value = JSON.stringify(_text);
             if(temp.text != ""){
                 datas.push(temp);
             }
           });
           this.contactsData3.push(datas);
        }
      },
      contactsConfirm1() {
        const values = this.$refs.contactsMod1.getColumnValues();
        values.forEach(value => {
          if (value) {
            let data = JSON.parse(value.value);
            this.insuredName = data.name || "";
            this.insuredCard = data.cardNo || "";
            this.insuredPhone = data.mobile || "";
            this.insuredEmail = data.email || "";

            let result = this.checkCard(this.insuredCard);
            if (!result) {
              Toast.failed("被保人身份证不正确");
              this.checkInput1("insuredCard");
            }

            if (data.occupation && data.occupation !== "") {
              //
              this.insureJobCode = data.occupation;
              console.log("this.insureJobCode", this.insureJobCode);
              let str1 = this.insureJobCode.substr(0, 1);
              let str2 = this.insureJobCode.substr(0, 3);
              let arr = [];
              arr = job8.options[9];
              for (let i of arr.children.options) {
                if (i.value === str1) {
                  for (let n of i.children.options) {
                    if (n.value === str2) {
                      for (let m of n.children.options) {
                        if (m.value === this.insureJobCode) {
                            if (
                              data.occupation === "2079901" ||
                              data.occupation === "3010101" ||
                              data.occupation === "1050103" ||
                              data.occupation === "2021302" ||
                              data.occupation === "2060301" ||
                              data.occupation === "4010101" ||
                              data.occupation === "3010202" ||
                              data.occupation === "2099908" ||
                              data.occupation === "2099907"
                            ) {
                              this.insuredJob = m.label;
                            } else {
                              this.insuredJob =
                                arr.label +
                                "-" +
                                i.label +
                                "-" +
                                n.label +
                                "-" +
                                m.label;
                            }
                        }
                      }
                    }
                  }
                }
              }
            }
            console.log(
              "that.hat.insuredJob",
              this.insuredJob,
              this.insureJobCode
            );

          //areaFlag为true省市区 非湖南时候带出
          const areaFlag = data.areaCode[0] !== "430000"
          if (data.areaCode !== [] && data.areaCode) {
            if (areaFlag) {
              const targetArr = [{ label: "" }, { label: "" }, { label: "" }];
              for (let i of this.addressScreen.options) {
                if (i.value === data.areaCode[0]) {
                  targetArr[0].label = i.label;
                  for (let a of i.children.options) {
                    if (a.value === data.areaCode[1]) {
                      targetArr[1].label = a.label;
                      for (let b of a.children.options) {
                        if (b.value === data.areaCode[2]) {
                          targetArr[2].label = b.label;
                        }
                      }
                    }
                  }
                }
              }
                this.insureProvinceAdd.placeCode = data.areaCode[0];
                this.insureProvinceAdd.placeName = targetArr[0].label;
                this.insureCityAdd.placeCode = data.areaCode[1];
                this.insureCityAdd.placeName = targetArr[1].label;
                this.insureAreaAdd.placeCode = data.areaCode[2];
                this.insureAreaAdd.placeName = targetArr[2].label;
                // 地区
                this.insuredLiveCity =
                  this.insureProvinceAdd.placeName +
                  this.insureCityAdd.placeName +
                  this.insureAreaAdd.placeName;
                // 详细地址
                if (this.insuredLiveCity) {
                  this.insuredAddress1 = data.detailAddress.replace(
                    this.insuredLiveCity,
                    ""
                  );
                  this.addressDataValue = targetArr;
                } else {
                  this.insuredAddress1 = "";
                  this.addressDataValue = [];
                }
              }
            }
          }
        });
      },
      contactsConfirm2() {
        const values = this.$refs.contactsMod2.getColumnValues();
        values.forEach(value => {
          if (value) {
            let data = JSON.parse(value.value);
            this.insuredName = data.name || "";
            this.insuredCard = data.cardNo || "";
            this.insuredPhone = data.mobile || "";
            this.insuredEmail = data.email || "";

            let result = this.checkCard(this.insuredCard);
            if (!result) {
              Toast.failed("被保人身份证不正确");
              this.checkInput1("insuredCard");
            }

            if (data.occupation && data.occupation !== "") {
              //
              this.insureJobCode = data.occupation;
              console.log("this.insureJobCode", this.insureJobCode);
              let str1 = this.insureJobCode.substr(0, 1);
              let str2 = this.insureJobCode.substr(0, 3);
              let arr = [];
              arr = job8.options[9];
              for (let i of arr.children.options) {
                if (i.value === str1) {
                  for (let n of i.children.options) {
                    if (n.value === str2) {
                      for (let m of n.children.options) {
                        if (m.value === this.insureJobCode) {
                            if (
                              data.occupation === "2079901" ||
                              data.occupation === "3010101" ||
                              data.occupation === "1050103" ||
                              data.occupation === "2021302" ||
                              data.occupation === "2060301" ||
                              data.occupation === "4010101" ||
                              data.occupation === "3010202" ||
                              data.occupation === "2099908" ||
                              data.occupation === "2099907"
                            ) {
                              this.insuredJob = m.label;
                            } else {
                              this.insuredJob =
                                arr.label +
                                "-" +
                                i.label +
                                "-" +
                                n.label +
                                "-" +
                                m.label;
                            }
                        }
                      }
                    }
                  }
                }
              }
            }
            console.log(
              "that.hat.insuredJob",
              this.insuredJob,
              this.insureJobCode
            );

          //areaFlag为true省市区 非湖南时候带出
          const areaFlag = data.areaCode[0] !== "430000"
          if (data.areaCode !== [] && data.areaCode) {
            if (areaFlag) {
              const targetArr = [{ label: "" }, { label: "" }, { label: "" }];
              for (let i of this.addressScreen.options) {
                if (i.value === data.areaCode[0]) {
                  targetArr[0].label = i.label;
                  for (let a of i.children.options) {
                    if (a.value === data.areaCode[1]) {
                      targetArr[1].label = a.label;
                      for (let b of a.children.options) {
                        if (b.value === data.areaCode[2]) {
                          targetArr[2].label = b.label;
                        }
                      }
                    }
                  }
                }
              }
                this.insureProvinceAdd.placeCode = data.areaCode[0];
                this.insureProvinceAdd.placeName = targetArr[0].label;
                this.insureCityAdd.placeCode = data.areaCode[1];
                this.insureCityAdd.placeName = targetArr[1].label;
                this.insureAreaAdd.placeCode = data.areaCode[2];
                this.insureAreaAdd.placeName = targetArr[2].label;
                // 地区
                this.insuredLiveCity =
                  this.insureProvinceAdd.placeName +
                  this.insureCityAdd.placeName +
                  this.insureAreaAdd.placeName;
                // 详细地址
                if (this.insuredLiveCity) {
                  this.insuredAddress1 = data.detailAddress.replace(
                    this.insuredLiveCity,
                    ""
                  );
                  this.addressDataValue = targetArr;
                } else {
                  this.insuredAddress1 = "";
                  this.addressDataValue = [];
                }
              }
            }
          }
        });
      },
      contactsConfirm3() {
        const values = this.$refs.contactsMod3.getColumnValues();
        values.forEach(value => {
          if (value) {
            let data = JSON.parse(value.value);
            this.insuredName = data.name || "";
            this.insuredCard = data.cardNo || "";
            this.insuredPhone = data.mobile || "";
            this.insuredEmail = data.email || "";

            let result = this.checkCard(this.insuredCard);
            if (!result) {
              Toast.failed("被保人身份证不正确");
              this.checkInput1("insuredCard");
            }

            if (data.occupation && data.occupation !== "") {
              //
              this.insureJobCode = data.occupation;
              console.log("this.insureJobCode", this.insureJobCode);
              let str1 = this.insureJobCode.substr(0, 1);
              let str2 = this.insureJobCode.substr(0, 3);
              let arr = [];
              arr = job8.options[9];
              for (let i of arr.children.options) {
                if (i.value === str1) {
                  for (let n of i.children.options) {
                    if (n.value === str2) {
                      for (let m of n.children.options) {
                        if (m.value === this.insureJobCode) {
                            if (
                              data.occupation === "2079901" ||
                              data.occupation === "3010101" ||
                              data.occupation === "1050103" ||
                              data.occupation === "2021302" ||
                              data.occupation === "2060301" ||
                              data.occupation === "4010101" ||
                              data.occupation === "3010202" ||
                              data.occupation === "2099908" ||
                              data.occupation === "2099907"
                            ) {
                              this.insuredJob = m.label;
                            } else {
                              this.insuredJob =
                                arr.label +
                                "-" +
                                i.label +
                                "-" +
                                n.label +
                                "-" +
                                m.label;
                            }
                        }
                      }
                    }
                  }
                }
              }
            }
            console.log(
              "that.hat.insuredJob",
              this.insuredJob,
              this.insureJobCode
            );

          //areaFlag为true省市区 非湖南时候带出
          const areaFlag = data.areaCode[0] !== "430000"
          if (data.areaCode !== [] && data.areaCode) {
            if (areaFlag) {
              const targetArr = [{ label: "" }, { label: "" }, { label: "" }];
              for (let i of this.addressScreen.options) {
                if (i.value === data.areaCode[0]) {
                  targetArr[0].label = i.label;
                  for (let a of i.children.options) {
                    if (a.value === data.areaCode[1]) {
                      targetArr[1].label = a.label;
                      for (let b of a.children.options) {
                        if (b.value === data.areaCode[2]) {
                          targetArr[2].label = b.label;
                        }
                      }
                    }
                  }
                }
              }
                this.insureProvinceAdd.placeCode = data.areaCode[0];
                this.insureProvinceAdd.placeName = targetArr[0].label;
                this.insureCityAdd.placeCode = data.areaCode[1];
                this.insureCityAdd.placeName = targetArr[1].label;
                this.insureAreaAdd.placeCode = data.areaCode[2];
                this.insureAreaAdd.placeName = targetArr[2].label;
                // 地区
                this.insuredLiveCity =
                  this.insureProvinceAdd.placeName +
                  this.insureCityAdd.placeName +
                  this.insureAreaAdd.placeName;
                // 详细地址
                if (this.insuredLiveCity) {
                  this.insuredAddress1 = data.detailAddress.replace(
                    this.insuredLiveCity,
                    ""
                  );
                  this.addressDataValue = targetArr;
                } else {
                  this.insuredAddress1 = "";
                  this.addressDataValue = [];
                }
              }
            }
          }
        });
      },
      unFoldOrFold(){
        this.showMoreContent = !this.showMoreContent;
        this.ifUnfold = this.showMoreContent ? '收起' : '展开';
      },
      loginSuccess(userCode){
          console.log('loginSuccess userCode', userCode )
          if (!userCode&&this.$app.isMiniProgram()&&this.$app.isBnMiniApp()) {
              let siteUrl = this.$router.siteUrl();
              let secondaryDistributor = localStorage.getItem("cps_secondaryDistributor")||'';
              let thirdClassDistributor = localStorage.getItem("cps_thirdClassDistributor")||'';
              let agentCode = this.agentCode||'';
              let shareUserCode = this.shareUserCode||'';
              let url =  `${siteUrl}/product/SunxinbaoDetail.html?product_id=${this.product_id}&isbn=1&secondaryDistributor=${secondaryDistributor}&thirdClassDistributor=${thirdClassDistributor}&agentCode=${agentCode}&shareUserCode=${shareUserCode}`;
              let u= encodeURIComponent(url);
              wx.miniProgram.navigateTo({url:`/pages/user/login?a=h5login&u=${u}`});
              return;
          }
          let storage_userCode = window.localStorage.getItem("USERCODE");
          let _this = this;
          if(userCode){
            _this.isLoginFlag = false;
            console.log('loginSuccess isLoginFlag', _this.isLoginFlag )
            _this.getStorageUserDetail(); //从接口获取缓存数据
            _this.loadContactsData();
          }
          if ((!storage_userCode) || storage_userCode != userCode) {
              window.localStorage.setItem("USERCODE", userCode);
          }
      },
      //获取APP的token
      goLoginGetToken() {
          //缓存投保城市
          window.localStorage.setItem("TRIAL_ADDRESS", JSON.stringify(this.addressDataValue));
          let _this = this
          this.$app.getUserCode(function (userCode) {
              _this.loginSuccess(userCode);
          })
      },
      goExlogin () {
        location.href = '/externalPay/ExternalLogin.html?cps=' + this.cpsCode
      },
      showAll () {
        this.isShowAll = !this.isShowAll
        this.showAllText = this.isShowAll ? '收起' : '展开'
      },
      loadAdvertising(){
          if ((Array.prototype.isPrototypeOf(this.cpsAdvImage) && this.cpsAdvImage.length === 0) || this.cpsAdvImage == null) {
              this.advertising = false
          } else {
              this.advertising = true
          }
      },
    closeBrowser() {
      var that = this;
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("closeBrower", { id: 2 }, function(responseData) {});
      });
    },
    goCustomer() {
      if (this.isBrowser) {
        setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("goCustomer", { id: 2 }, function(
            responseData
          ) {});
        });
      } else {
        this.$app.getBxdServiceUrl();
      }
    },
    loadProDetail() {
      let _this = this;
      this.$request({
        url: `/ins/product/product/risk/${this.product_id}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
          if (data === null) {
            _this.showShelves = true;
            return;
          }
          this.riskInfo = data.riskInfo;
          this.riskCode = data.riskInfo.riskCode;
          window.localStorage.setItem('riskCode',this.riskCode)
          this.loadClause();
          this.showWhirl = false;
          this.loadPrice();
          //神策数据采集
          this.loadShenceDetailData(data.riskInfo);
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
      /**
       * 神策浏览详情
       * @param data
       */
      loadShenceDetailData(data) {
          const { riskSubType, riskName, riskCode } = data;
          let riskTypeName =getRiskTypeName(riskCode,riskSubType);// riskTypeNameText[riskSubType] || '';
          let riskSource = localStorage.getItem('shence_view_detail_risk_source')||'首页运营位';
          let secondaryDistributor = localStorage.getItem('cps_secondaryDistributor');
          sensors.track("yw_view_details", {
              risk_source : riskSource,
              risk_source_sub:[],
              risk_type: riskTypeName,
              risk: riskName,
              secondaryDistributor:secondaryDistributor
          });

      },
      load_shence_yw_fill_info() {
          const { riskSubType, riskName, riskCode } = this.riskInfo;
          let riskTypeName = getRiskTypeName(riskCode, riskSubType);
          //判断医疗险
          sensors.track("yw_fill_info", {
              risk_type: riskTypeName,
              risk: riskName,
              total_amnt: this.premium,
              appnt_name: this.proposerName,
              appnt_id_type: "身份证",
              appnt_id_no: this.proposerCard,
              appnt_validate_type:
                  this.proposerDateFlag === 1 ? "长期" : "非长期",
              appnt_id_validate_start: this.datePickerStartValue
                  ? this.datePickerStartValue.replace("/", "-").replace("/", "-")
                  : this.transferDate(new Date(), "yyyy-MM-dd"),
              appnt_id_validate_end:
                  this.proposerDateFlag !== 1
                      ? this.datePickerEndValue.replace("/", "-").replace("/", "-")
                      : "2099-01-01",
              appnt_mobile: this.proposerPhone,
              appnt_email: this.proposerEmail,
              appnt_longterm_add:
                  this.provinceAdd.placeName +
                  this.cityAdd.placeName +
                  this.areaAdd.placeName,
              appnt_detailed_add: this.proposerAddress1,
              appnt_occupation: this.jobName,
              appnt_crsid_type: "仅为大陆税收居民",
              appnt_height: null, //身高
              appnt_weight: null, //体重
              insured_height: null, //被保人身高
              insured_weight: null, //被保人体重
              insured_relation_to_appnt: this.relation,
              insured_name: this.insuredName,
              insured_id_type: this.insureIdType,
              insured_id_no: this.insuredCard,
              insured_validate_type:
                  this.insureDateFlag === 1 ? "长期" : "非长期",
              insured_id_validate_start: this.insurePickerStartValue
                  ? this.insurePickerStartValue.replace("/", "-").replace("/", "-")
                  : this.transferDate(new Date(), "yyyy-MM-dd"),
              insured_id_validate_end:
                  this.insureDateFlag !== 1
                      ? this.insurePickerEndValue.replace("/", "-").replace("/", "-")
                      : "2099-01-01",
              insured_mobile: this.insuredPhone,
              insured_email: this.insuredEmail,
              insured_longterm_add:
                  this.insureProvinceAdd.placeName +
                  this.insureCityAdd.placeName +
                  this.insureAreaAdd.placeName,
              insured_detailed_add: this.insuredAddress1,
              insured_occupation: this.insuredWork,
              insured_crsid_type: "仅为大陆税收居民",
              bnf_type: this.beneficiaryValue,
              bnf_relation_to_insured_first: "",
              bnf_name_first: "",
              bnf_proportion_first: "",
              bnf_relation_to_insured_second: "",
              bnf_name_second: "",
              bnf_proportion_second: "",
              bnf_relation_to_insured_third: "",
              bnf_name_third: "",
              bnf_proportion_third: "",
              bank: "",
              acc_name: this.proposerName,
              bank_acc_no: "",
              new_bank: "",
              new_acc_name: this.proposerName,
              new_bank_acc_no: "",
          });
      },
    loadDutyDetail() {
      this.$request({
        url: `/ins/product/insProductProtection/${this.product_id}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
          for (let i = 0; i < data.length; i++) {
            data[i]["showFlag"] = false;
          }
          this.dutyList = data;
          console.log(this.dutyList)
          this.showWhirl = false;
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    saveUrlParams () {
      this.agentCode = this.$router.query("agentCode");
      this.product_id = this.$router.query("product_id");
      this.articlePro_id = this.$router.query("articlePro_id");
      this.evaluation_id = this.$router.query("evaluation_id");
      this.isBrowser = this.$app.isBrowser();
      this.gathering_id = this.$router.query("gathering_id");
      this.reportDetail_id = this.$router.query("reportDetail_id");
      if (!this.$app.isBrowser()) {

        //如果是cps投保，需要提前保存cps相关信息
        let cps_thirdClassDistributor = this.$router.query(
          "thirdClassDistributor"
        );
        let cps_secondaryDistributor = this.$router.query(
          "secondaryDistributor"
        );
        let cps_shareUserCode = this.$router.query("shareUserCode");
        if (!cps_thirdClassDistributor || !cps_secondaryDistributor) {
          console.log("体外投保没有渠道标识");
        }
        // 添加cps 特殊分享信息存储
        let cps_wxShareSign = this.$router.query(
            "wxShareSign"
        );
        let cpsWS = this.$router.query(
            "cpsWS"
        );
          let goBackUrl = this.$router.query(
              "goBackUrl"
          );
          console.log(goBackUrl)
          goBackUrl ? window.localStorage.setItem("cps_goBackUrl", goBackUrl) : window.localStorage.removeItem("cps_goBackUrl");
          this.cpsCode = cps_secondaryDistributor;
          console.log(this.cpsCode)
        cps_thirdClassDistributor ? window.localStorage.setItem("cps_thirdClassDistributor", cps_thirdClassDistributor) : window.localStorage.removeItem("cps_thirdClassDistributor");
        cps_secondaryDistributor ? window.localStorage.setItem("cps_secondaryDistributor", cps_secondaryDistributor) :  window.localStorage.removeItem("cps_secondaryDistributor");
        cps_shareUserCode ? window.localStorage.setItem("cps_shareUserCode", cps_shareUserCode) : window.localStorage.removeItem("cps_shareUserCode");
        if (cps_wxShareSign !== '' || cpsWS !== '') {
            cps_wxShareSign ? window.localStorage.setItem("cps_wxShareSign", cps_wxShareSign) : window.localStorage.removeItem("cps_wxShareSign");
            cpsWS ? window.localStorage.setItem("cps_cpsWS", cpsWS) : window.localStorage.removeItem("cps_cpsWS");
        }


      }else{
          window.localStorage.setItem("cps_secondaryDistributor", "APP_00010001")
          this.cpsCode = "APP_00010001"
          console.log(this.cpsCode)
      }
    },
    initMiniApp(callback){
          //微信小程序获得token
          if(this.$app.isMiniProgram()){
              let isbn = this.$router.query(
                  "isbn"
              );
              window.localStorage.removeItem('isbn');
              if('1'==isbn){
                  window.localStorage.setItem("isbn","1");
                  this.isbn='1';
              }
              if(this.$app.isBnMiniApp()){
                  localStorage.setItem('shence_view_detail_risk_source', '微信小程序');
                  this.isBnMiniApp=true;
                  let code = this.$router.query("code");
                  this.$app.getMiniToken(code,(token,error)=>{
                      console.log('mini app token:',token);
                      if(error){
                          this.showError=true;
                      }
                      callback();
                  });
              }else{
                  callback();
              }
          }else{
              callback();
          }

    },
    loadPrice() {
      this.$request({
        url: `/ins/product/${this.product_id}?cpsCode=${this.cpsCode}`,
        params: {
          id: this.product_id
        },
        successFn: data => {
          this.wxShareTitle = data.shareTitle; // 分享标题
          this.descContent = data.shareContent; // 分享描述
          this.imgUrl = data.minImage; //分享小图标
          this.modelCode = data.modelCode;
          this.lowPrice = data.money
          this.showWhirl = false;
          this.bannerUrl = data.productBannerImage;
          this.productLink = data.productLink;
          this.cpsAdvImage = data.cpsAdvImage;
          window.localStorage.setItem("cps_cpsOrderSuccessImag", data.cpsOrderSuccessImag)
          window.localStorage.setItem("cps_cpsOrderSuccessImageUrl", data.cpsOrderSuccessImageUrl)
          this.loadAdvertising();
          this.riskDetail = data.riskDetail;
          this.riskName = data.name;
          document.title = this.riskName;
            //微信小程序发送分享消息标题
            if(this.$app.isMiniProgram()){
                //小程序分享标题消息发送
                if (wx.miniProgram) {
                    wx.miniProgram.postMessage({
                        data: JSON.stringify({
                            action: 'share',
                            key: Math.random().toString(36).substr(2),
                            data: {title: document.title}
                        })
                    });
                }
            }
          window.localStorage.setItem("riskName", JSON.stringify(this.riskName))
          window.localStorage.setItem("locationHref", JSON.stringify(location.href))
          this.$app.wxProductDetail(this.product_id, 0)
          this.controduce = data.claimExplanation;
          this.question = data.commonProblem;

          // let pagebreak = data.commonProblem.split(`class="ke-pagebreak"`)
          // console.log(pagebreak)
          // if (pagebreak.length == '1') {
          //   this.questionLittle = pagebreak[0]
          //   this.showAllText = ''
          // } else {
          //   this.questionLittle =  pagebreak[0] + `style="opacity:0;" /></p>`
          // }

          this.insureKnow = data.insuranceNotice;
          this.guaranteeDetails = data.guaranteeDetails;
          this.health = data.healthNotification;
          this.introduce.guarantee = this.guaranteeDetails;
          this.introduce.health = this.health;
          window.localStorage.setItem(
            "guarantee",
            JSON.stringify(this.introduce)
          );
          this.knows.insureKnow = this.insureKnow;
          window.localStorage.setItem("knowledge", JSON.stringify(this.knows));
          //顺心保
          let that = this
          this.$app.getCurrentUserCode(function(userCode) {
              //设置APP内分享
              setupWebViewJavascriptBridge(function (bridge) {
                  console.log('data.shareFlag-------', data.shareFlag)
                  var herf =  location.href;
                  if (that.productLink !==''&& that.productLink !== null){
                      herf = that.productLink + "?product_id="+ that.product_id;
                  }
                  herf =  herf +
                      "&thirdClassDistributor=" +
                      "&secondaryDistributor=CPS_00010009" +
                      "&shareUserCode=" +
                      userCode, //分享跳转的url
                      console.log(herf)
                  that.$app.getVersion((response) => {
                      console.log('getVersion:', response)
                      let isNewVersonApp = false
                      if(response&&response.data){
                          isNewVersonApp = that.$app.compareVersionGeq4ShareMpCard(response.data)
                      }
                      if (isNewVersonApp) { //新版本
                          //导航是否显示分享按钮
                          let path = `pages/w?u=${encodeURIComponent(herf)}&share=1`
                          bridge.callHandler(
                              "navigationConfigMp",
                              {
                                  webpage_url: herf,
                                  miniprogram_type: process.env.NODE_ENV === 'production' ? 0 : 2,
                                  flag_show: 1,
                                  flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                                  title: data.shareTitle, //标题
                                  flag_share: Number(data.shareFlag), //是否显示分享按钮，1-显示 0-不显示
                                  flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                                  user_name: 'gh_dee9696877d7',
                                  path: path,
                                  share_title: data.shareTitle, //分享标题
                                  share_text: data.shareContent, //分享描述
                                  share_imgurl: data.minImage //分享图片地址
                              },
                              function(response) {
                                  //alert(response,'');
                              }
                          );
                      } else{
                          //导航是否显示分享按钮
                          bridge.callHandler(
                              "navigationConfig",
                              {
                                  flag_show: 1,
                                  flag_back: 1, //是否显示返回按钮，1-显示 0-不显示
                                  title: data.shareTitle, //标题
                                  flag_share: Number(data.shareFlag), //是否显示分享按钮，1-显示 0-不显示
                                  flag_service: 0, //是否显示现在客服的按钮，1-显示 0-不显示
                                  share_url:herf,
                                  share_title: data.shareTitle, //分享标题
                                  share_text: data.shareContent, //分享描述
                                  share_imgurl: data.minImage //分享图片地址
                              },
                              function(response) {
                                  //alert(response,'');
                              }
                          );
                      }
                  })
              });

          });
					// this.shareDetail();
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    goNotice() {
      window.location.href =
        this.$router.siteUrl() +
        "/product/NoticeDetail.html?product_id=" +
        this.product_id;
    },
    goClause() {
      window.location.href =
        this.$router.siteUrl() +
        "/product/ProductClause.html?product_id=" +
        this.product_id;
    },
      goPersonalReminder(){  //跳转人身险风险提示书
          window.location.href = this.$router.siteUrl() + '/product/PersonalReminder.html?product_id='+this.product_id
      },
    loadClause() {
      this.$request({
        url: `/ins/product/productplatform/risk/getriskfileinfoinner`,
        method: "POST",
        data: {
          riskFileQueryList: [
            {
              riskCode: this.riskCode,
              type: "T"
            }
          ]
        },
        contentType: "application/json",
        successFn: data => {
          this.clauseUrl = data.riskFileResultList[0].url;
          this.knows.clauseUrl = this.clauseUrl;
          window.localStorage.setItem("knowledge", JSON.stringify(this.knows));
        },
        errorFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // let searchHeight = this.$refs.divSearch.offsetHeight
        let a = this.$refs.medium.offsetTop + 100;
        var b = this.$refs.image.offsetTop;
        var c = this.$refs.shuoming.offsetTop - 130;
        var d = this.$refs.often.offsetTop - 180;
        if (scrollTop >= a) {
          this.$refs.xiTop.style.display = "flex";
          this.$refs.xiTop.style.position = "fixed";
          this.$refs.xiTop.style.top = "0";
        } else {
          this.$refs.xiTop.style.display = "none";
        }
        if (scrollTop >= b && scrollTop < c) {
          this.actives = 0;
          this.activeQ = 0;
        } else if (scrollTop >= c && scrollTop < d) {
          this.actives = 1;
          this.activeQ = 1;
        } else if (scrollTop >= d) {
          this.actives = 2;
          this.activeQ = 2;
        }
      });
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },

    showLoadingToast() {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.hide();
      }, 3000);
    },
    showProduct() {
      this.actives = 0;
      this.activeQ = 0;
      var a = this.$refs.image.offsetTop - 50;
      window.scrollTo(0, a);
    },
    showCase() {
      this.actives = 1;
      this.activeQ = 1;
      var b = this.$refs.shuoming.offsetTop-70;
      window.scrollTo(0, b);
    },
    showToubao() {
      this.actives = 2;
      this.activeQ = 2;
      console.log(this.actives);
      console.log(this.activeQ);
      var c = this.$refs.often.offsetTop-60;
      window.scrollTo(0, c);
    },
    onBasicConfirm() {
      this.basicDialog.open = false;
    },
    onTaxDialogConfirm (){
      this.taxDialog.open  = false;
    },
    showOneD(item) {
      item.showFlag = !item.showFlag;
    },
    textRender() {
      const args = Array.prototype.slice.call(arguments);
      const typeFormat = args[0]; // 类型
      // const column0Value = args[1] // 第1列选中值
      // const column1Value = args[2] // 第2列选中值
      const column2Value = args[3]; // 第3列选中值
      if (typeFormat === "dd") {
        return `${column2Value}日`;
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {},
    // 证件有效期类型提示信息
    showIdCardTip() {
      this.$refs["tipComp"].showSxbIdCardTip();
    },
    // 电子邮箱提示信息
    showEmailTip () {
        this.$refs['tipComp'].showEmailTip()
    },
    //详细地址提示信息
    showDetailTip() {
      this.$refs["tipComp"].showDetailTip();
    },
    //选择地区地址筛选
    addressScreenM() {
        this.addressScreen = this.addressData;
    },
    showPopUp(type, name) {
      if (name === "agreementShow") {
        this.popTitle = "用户协议";
        this.agreementShow = true;
      } else {
        this.popTitle = "隐私声明";
        this.agreementShow = false;
      }
      this.$set(this.isPopupShow, type, true);
    },
    onChange(name, checked) {
      // console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
    },
    //返回首页
    goHome() {
      var that = this;
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("backHome", { id: 2 }, function(responseData) {});
      });
    },
    thinkAgain() {
        this.actDialog.open = false;
    },
    thinkOthers(){
        this.isShowInsuredMoreInfo = false;
        this.actDialog.open = false;
        this.addNewInsured = true;
        this.insuredChooseNum = null;
        this.relation = "";
        this.insuredRelationToAppnt = "";
        this.insuredName = "";
        this.insuredPhone = "";
        this.insureIdTypeCode = "";
        this.insureIdType = "";
        this.insuredCard = "";
        this.insuredEmail = "";
    },
    //拨打客户电话
    goCall() {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("callIphone", { number: 95542 }, function(
          responseData
        ) {});
      });
    },
    minOrMaxBirthday(age, flagDay = 0) {
      //精确到天
      if (flagDay === 1) {
        let date = new Date();
        //当前日期的毫秒数 + 天数 * 一天的毫秒数
        let time = date.getTime() - 28 * 24 * 60 * 60 * 1000;
        let result = new Date(time);
        let month = result.getMonth() + 1;
        return (
          result.getFullYear().toString() +
          "/" +
          (month < 10 ? "0" + month : month).toString() +
          "/" +
          result.getDate().toString()
        );
      } else {
        //周岁
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let year = date.getFullYear() - age;
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? "0" + month : month;
        return year.toString() + "/" + month.toString() + "/" + day.toString();
      }
    },
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues();
      let res = "";
      values.forEach(value => {
        value && (res += `${value.text || value.label} `);
      });
      this[`pickerValue${index}`] = res;
      this.insureChildSex = values[0].value;
    },

    onDatePickerConfirmBirth(columnsValue) {
      this.screenDate(columnsValue);
      this.datePickerValueB =
        columnsValue[0].value +
        "/" +
        columnsValue[1].value +
        "/" +
        columnsValue[2].value;
      let year = Number(columnsValue[0].value),
        endValue =
          year + 2 + "/" + columnsValue[1].value + "/" + columnsValue[2].value;
      if (columnsValue[1].value === "02" && columnsValue[2].value === "29") {
        this.insurePickerEndValue = year + 2 + "/02/28";
      } else {
        this.insurePickerEndValue = endValue;
      }
    },
    //打开出生证说明
    showTip() {
      if (this.insureIdTypeCode == "4") {
        Dialog.alert({
          content:
            "年龄为0-2周岁，证件号首位必须是大写英文字母，位数必须为6-18位。"
        });
      } else if (this.insureIdTypeCode == "5") {
        Dialog.alert({
          content: "年龄小于18周岁，证件号为户口本对应的18位身份证。"
        });
      }
    },
    //展示税收提示
    showTax() {
      this.basicDialog.msg =
        "1.中国税收居民：指在中国境内有住所，或者无住所而在境内居住满一年的个人。" +
        "\r" +
        "2.非居民：指中国税收居民以外的个人。" +
        "\r" +
        "3.军人、武装警察持有效的军官（武装警察）身份证件的即认为是中国税收居民。";
      this.basicDialog.open = true;
    },
    //获取当前登陆用户的姓名和身份证号
    getStorageUserDetail() {
      this.addressScreenM();
      if(this.$app.isBrowser()||(this.$app.isMiniProgram()&&this.$app.isBnMiniApp())){
          let that = this
          this.$app.getToken(function(userToken) {
              that.$request({
                  url: `/vip/user/current`,
                  params: {},
                  userToken: userToken,
                  successFn: data => {
                      if (data.isReal == 1) {
                          that.hideCamera = false;
                          if (data.name && data.name != null) {
                              that.proposerName = data.name;
                              that.dataForm = true;
                          }
                          if (data.cardNo != "" && data.cardNo != null) {
                              that.proposerCard = data.cardNo;
                              that.cardNoDisable = true;
                          }
                          if (data.email != "" && data.email != null) {
                              that.proposerEmail = data.email;
                              that.insuredEmail = data.email;
                          }
                          if (data.mobile != "" && data.mobile != null) {
                              that.proposerPhone = data.mobile;
                              if (that.insuredRelationToAppnt == "03" || that.insuredRelationToAppnt == "00") {
                                  that.insuredPhone = data.mobile;
                              }
                          }
                          if (data.areaCode) {
                              let areaCodeArr =
                                  data.areaCode && data.areaCode !== ""
                                      ? [
                                          data.areaCode.substring(0, 2) + "0000",
                                          data.areaCode.substring(0, 4) + "00",
                                          data.areaCode
                                      ]
                                      : "";
                              const areaArr = ["1315"]; // 目前只有定汇保支持湖南地区curRiskCode
                              // areaFlag为true省市区 非湖南时候带出，是湖南并且是定汇保也可带出
                              const areaFlag =
                                  areaCodeArr[0] !== "430000" ||
                                  areaArr.includes[this.curRiskCode];
                              if (areaCodeArr !== [] && areaCodeArr) {
                                  if (areaFlag) {
                                      for (let i of that.addressScreen.options) {
                                          if (i.value === areaCodeArr[0]) {
                                              that.optionsText[0].label = i.label;
                                              for (let a of i.children.options) {
                                                  if (a.value === areaCodeArr[1]) {
                                                      that.optionsText[1].label = a.label;
                                                      for (let b of a.children.options) {
                                                          if (b.value === areaCodeArr[2]) {
                                                              that.optionsText[2].label = b.label;
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                      that.provinceAdd.placeCode = areaCodeArr[0];
                                      that.provinceAdd.placeName = that.optionsText[0].label;
                                      that.cityAdd.placeCode = areaCodeArr[1];
                                      that.cityAdd.placeName = that.optionsText[1].label;
                                      that.areaAdd.placeCode = areaCodeArr[2];
                                      that.areaAdd.placeName = that.optionsText[2].label;

                                      that.proposerLiveCity =
                                          that.provinceAdd.placeName +
                                          that.cityAdd.placeName +
                                          that.areaAdd.placeName;
                                      if (that.proposerLiveCity) {
                                          that.proposerAddress1 = data.areaName.replace(
                                              that.proposerLiveCity,
                                              ""
                                          );
                                          that.proposerAddress = that.optionsText;
                                      } else {
                                          that.proposerAddress1 = "";
                                          that.proposerAddress = [];
                                      }
                                  }
                              }
                          }
                      } else {
                          that.hideCamera = true;
                          if (data.email != "" && data.email != null) {
                              that.proposerEmail = data.email;
                              that.insuredEmail = data.email;
                          }
                          if (data.mobile != "" && data.mobile != null) {
                              // that.proposerPhoneDisable = true  //手机号禁止修改
                              that.proposerPhone = data.mobile;
                              if (that.insuredRelationToAppnt == "03" || that.insuredRelationToAppnt == "00") {
                                  that.insuredPhone = data.mobile;
                              }
                          }
                          that._setStorage(); //从缓存取已经填写的信息
                      }

                      if (data.occupation && data.occupation !== "") {
                          that.jobCode = data.occupation;
                          let str1 = that.jobCode.substr(0, 1);
                          let str2 = that.jobCode.substr(0, 3);
                          let arr = [];
                          arr = job8.options[9];
                          for (let i of arr.children.options) {
                              if (i.value === str1) {
                                  for (let n of i.children.options) {
                                      if (n.value === str2) {
                                          for (let m of n.children.options) {
                                              if (m.value === that.jobCode) {
                                                      if (
                                                          data.occupation === "2079901" ||
                                                          data.occupation === "3010101" ||
                                                          data.occupation === "1050103" ||
                                                          data.occupation === "2021302" ||
                                                          data.occupation === "2060301" ||
                                                          data.occupation === "4010101" ||
                                                          data.occupation === "3010202" ||
                                                          data.occupation === "2099908" ||
                                                          data.occupation === "2099907"
                                                      ) {
                                                          that.proposerJob = m.label;
                                                      } else {
                                                          that.proposerJob =
                                                              arr.label +
                                                              "-" +
                                                              i.label +
                                                              "-" +
                                                              n.label +
                                                              "-" +
                                                              m.label;
                                                      }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  },
                  failFn: () => {
                      that.showError = true;
                  }
              });
          });
      }else{
          this._setStorage(); //从浏览器缓存取已经填写的信息
      }
    },
    showBeneficiaryTip() {
      Dialog.alert({
        content:
          "法定受益人第一顺序是配偶/父母/子女，第二顺序是祖父母/外祖父母/兄弟姐妹；"
      });
    },
    addressHandleChange({ options }) {
      this.addressDataValue = options;
      this.insureProvinceAdd.placeCode = options[0].value;
      this.insureProvinceAdd.placeName = options[0].label;
      this.insureCityAdd.placeCode = options[1].value;
      this.insureCityAdd.placeName = options[1].label;
      this.insureAreaAdd.placeCode = options[2].value;
      this.insureAreaAdd.placeName = options[2].label;
      this.insuredLiveCity =
        this.insureProvinceAdd.placeName +
        this.insureCityAdd.placeName +
        this.insureAreaAdd.placeName;
    },
    addressPropHandleChange({ options }) {
      this.proposerAddress = options;
      console.log(options)
      this.provinceAdd.placeCode = options[0].value;
      this.provinceAdd.placeName = options[0].label;
      this.cityAdd.placeCode = options[1].value;
      this.cityAdd.placeName = options[1].label;
      this.areaAdd.placeCode = options[2].value;
      this.areaAdd.placeName = options[2].label;
      this.proposerLiveCity =
        this.provinceAdd.placeName +
        this.cityAdd.placeName +
        this.areaAdd.placeName;
      if(this.chooseIndex == 1){
          this.addressDataValue = this.proposerAddress;
          this.insureProvinceAdd.placeCode = this.provinceAdd.placeCode;
          this.insureProvinceAdd.placeName = this.provinceAdd.placeName;
          this.insureCityAdd.placeCode = this.cityAdd.placeCode;
          this.insureCityAdd.placeName = this.cityAdd.placeName;
          this.insureAreaAdd.placeCode = this.areaAdd.placeCode;
          this.insureAreaAdd.placeName = this.areaAdd.placeName;
          this.insuredLiveCity = this.proposerLiveCity;
      }
    },
    handleChange({ options }) {
      this.insuredJob = options;
      let insureWorkStr = "";
      options.forEach((item, index) => {
        insureWorkStr += item.label;
        if (index === options.length - 1) {
          this.insureJobCode = item.value; // 取得是最后一位置的value
        }
      });
      this.insuredWork = insureWorkStr;
    },
    handleChangeProp({ options }) {
      this.proposerJob = options;

      let proposerWorkStr = "";
      options.forEach((item, index) => {
        proposerWorkStr += item.label;
        if (index === options.length - 1) {
          this.jobCode = item.value; // 取得是最后一位置的value
          this.jobName = item.label;
          console.log(this.jobName);
        }
      });
      this.proposerWork = proposerWorkStr;
    },
    getTi(val, e) {
      let myreg = /^.+(乡|镇|街|路|道|巷|委|段|里|社|园|苑).+(村|组|号|室|队|院|房|楼|栋).*$/;
      if (this.proposerAddress1 == "") {
        // this.$refs.parQ.style.display = 'block'
      } else if (!myreg.test(val)) {
        Toast.failed("投保人地址格式不正确！");
        return false;
      } else {
        this.addStorage(e, val); //放缓存
      }
      // if (this.proposerAddress1 == '') {
      //     // this.$refs.parQ.style.display = 'block'
      // } else {
      //     this.addStorage(e, val) //放缓存
      // }
    },
    getShi(val, e) {
      let myreg = /^.+(乡|镇|街|路|道|巷|委|段|里|社|园|苑).+(村|组|号|室|队|院|房|楼|栋).*$/;
      if (this.insuredAddress1 == "") {
        // this.$refs.parP.style.display = 'block'
      } else if (!myreg.test(val)) {
        Toast.failed("被保人地址格式不正确！");
        return false;
      } else {
        // this.addStorage(e, val); //放缓存
      }
      // if (this.insuredAddress1 == '') {
      //     // this.$refs.parP.style.display = 'block'
      // } else {
      //     this.addStorage(e, val) //放缓存
      // }
    },
    //通过id查询riskCode
    getRiskCode() {
      this.$request({
        url: `/ins/product/product/risk/${this.product_id}`,
        params: {},
        successFn: data => {
          this.curRiskCode = data.riskInfo.riskCode;
          if (this.curRiskCode == "5321") {
            this.premium = 12;
            let day3 = new Date();
            day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
            let tomorrow =
              day3.getFullYear() +
              "-" +
              (day3.getMonth() + 1) +
              "-" +
              day3.getDate();
            this.cvalidate5321 = tomorrow;
          }
          this.riskInfo = data.riskInfo;
          this.showWhirl = false;
          this.job4Data = job8;
          this.job4InsureData = job8;
          this.getMarriageDataDic(3);
          this.getMarriageDataDic(1);
          this.getMarriageDataDic(2);
          this.getMarriageDataDic(4);
          this.addressScreenM();
        },
        failFn: () => {
          this.showWhirl = false;
          this.showError = true;
        }
      });
    },
    //获取当前用户的userCode
    getUserCode() {
      var that = this;
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("getUser", { id: 2 }, function(responseData) {
          responseData = JSON.parse(responseData);
          that.userBiaoShi = responseData.data;
        });
      });
    },
    transferDate(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    },
    //根据出生日期计算年龄
    jsGetAge(strBirthday) {
      var returnAge;
      // 根据生日计算年龄（"1995-09-25"）
      //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },
    choosetype(num, name) {
      this[name] = num;
    },
    chooseInsured(index,item,name){
      console.log(index,item)
      this[name] = index;
      this.relation = item;
      if(index == '0'){
        this.relation = "本人";
        this.insuredRelationToAppnt = "00";
        this.insuredName = "";
        this.insuredCard = "";
        this.insuredPhone = "";
        this.insureIdTypeCode = "0";
        this.insureIdType = "身份证";
        this.insuredAddress1 = "";
        this.insuredEmail = "";
      }
      if(index == '1'){
        this.insuredRelationToAppnt = '01'
      }else if(index == '2'){
        this.insuredRelationToAppnt = '02'
      }else if(index == '3'){
        this.insuredRelationToAppnt = '03'
        this.certificateTypeNum = 2;
      }
      this.insuredName = "";
      this.insuredCard = "";
      this.insuredPhone = "";
      console.log(this.relation,this.insuredRelationToAppnt)
      this.insureIdTypeCode = "0";
      this.insureIdType = "身份证";
      if(this.insuredRelationToAppnt == "00"){
          this.insuredAddress1 = "";
          this.insuredEmail = "";
      }else{
          this.showWhiteBox = false;
      }
      console.log(  this.insureIdTypeCode)
      console.log(  this.insureIdType)
      this.getContactsData(this.insuredRelationToAppnt);
    },
    certificateTypeChoose(index,item,name) {
      this[name] = index;
      this.insureIdType = item;
      if(index == 0){
        this.insureIdTypeCode = '4';
      }else if(index == 1){
        this.insureIdTypeCode = '5';
      }else if(index == 2){
        this.insureIdTypeCode = '0';
      }
      console.log(  this.insureIdTypeCode)
      console.log(  this.insureIdType)
      if (this.insureIdTypeCode == "4") {
        //出生证
        this.insuredCard = "";
        this.showSexAndBirth = true;
        this.insuredJob = [];
        this.maxChildDate = new Date(this.minOrMaxBirthday(28, 1));
        this.minChildDate = new Date(this.minOrMaxBirthday(2));
        this.datePickerValueB = "";
      } else if (this.insureIdTypeCode == "0") {
        //身份证
        this.showSexAndBirth = false;
        this.insuredChildJob = "";
        this.insuredCard = "";
      } else if (this.insureIdTypeCode == "5") {
        //户口本
        this.showSexAndBirth = true;
        this.insuredChildJob = "";
        this.insuredCard = "";
        this.maxChildDate = new Date(this.minOrMaxBirthday(0, 2));
        this.minChildDate = new Date(this.minOrMaxBirthday(18));
        this.datePickerValueB = "";
      }
    },
    showmodel(model, modelName, modelIndex) {
      this[model] = true;
      this.modelName = modelName;
      if (modelIndex) {
        this.modelIndex = modelIndex;
      }
    },
    // 与投保人关系
    relationConfirm(columnsValue) {
      this.addNewInsured = false;
      this.relation = columnsValue[0].label;
      this.insuredRelationToAppnt = columnsValue[0].value;
      console.log(this.relation,this.insuredRelationToAppnt)
      this.insuredName = "";
      this.insuredCard = "";
      this.insuredPhone = "";
      console.log(this.relation,this.insuredRelationToAppnt)
      if (this.insuredRelationToAppnt !== "03") {
        this.insureIdTypeCode = "0";
        this.insureIdType = "身份证";
      }
      if(this.insuredRelationToAppnt == "00"){
          this.insuredAddress1 = "";
          this.insuredEmail = "";
          this.isShowInsuredMoreInfo= false;
      }else{
          this.showWhiteBox = false;
      }
    },
    screenDate(columnsValue) {
      if (
        columnsValue[1].value.toString().length < 2 &&
        columnsValue[1].value < 10
      ) {
        columnsValue[1].value = "0" + columnsValue[1].value;
      }
      if (
        columnsValue[2].value.toString().length < 2 &&
        columnsValue[2].value < 10
      ) {
        columnsValue[2].value = "0" + columnsValue[2].value;
      }
    },
    onDatePickerConfirm(columnsValue) {
      this.screenDate(columnsValue);
      this.datePickerEndValue =
        columnsValue[0].value +
        "/" +
        columnsValue[1].value +
        "/" +
        columnsValue[2].value;
    },
    onDatePickerConfirmInsure(columnsValue) {
      this.screenDate(columnsValue);
      this.insurePickerEndValue =
        columnsValue[0].value +
        "/" +
        columnsValue[1].value +
        "/" +
        columnsValue[2].value;
    },
    getMarriageDataDic(index) {
      this.$request({
        url: `/sys/dict/type`,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: { type: this.marriageType[index] },
        successFn: data => {
          if (index === 1) {
            this.marriageData = [data];
          } else if (index === 5) {
            this.degreeData = [data];
          } else if (index === 4) {
            this.certificateTypeData = [data];
          } else if (index === 2) {
            // 银行数据
            // {value: "07", label: "招商银行"} 去掉招商银行
            // {value: "09", label: "邮储银行"} 去掉邮储银行
            const index = data.findIndex(item => item.value === "07");
            data.splice(index, 1);

            /*  const youchuIndex = data.findIndex((item) => item.value === "09")
                    data.splice(youchuIndex, 1)*/
            this.bankData = [data];
          } else if (index === 3) {
            if (this.curRiskCode == "5321") {
              this.showDeathDisabled = false;
              this.showDeath = false;
              this.pickerData = [data.splice(0, 4)];
            }

          }
        },
        failFn: data => {}
      });
    },
    //校验

    checkInput(item, conS) {
      if (item == "" || !item) {
        Toast.failed(conS);
        return false;
      } else {
        return true;
      }
    },
    checkInputS(item, conS) {
      if (item == "请选择" || item == "") {
        Toast.failed(conS);
        return false;
      } else {
        return true;
      }
    },
    checkInput1(item) {
      document
        .getElementById(item)
        .getElementsByTagName("input")[0]
        .focus();
    },
    submitProposerCheck(){
      if (!this.checkInput(this.proposerName, "请输入投保人的姓名")) {
        this.checkInput1("proposerName");
        return false;
      }

      if (!this.checkInput(this.proposerPhone, "请输入投保人的手机号")) {
        this.checkInput1("proposerPhone");
        return false;
      }

      if (!this.checkInput(this.proposerCard, "请输入投保人的身份证号")) {
        this.checkInput1("proposerCard");
        return false;
      }

      if (this.proposerChooseIndex == 1) {
        if (
          !this.checkInput(
            this.datePickerEndValue,
            "请选择投保人身份证的有效期"
          )
        ) {
          return false;
        }
      }

      if (!this.checkInput(this.proposerJob, "请选择投保人的职业")) {
        return false;
      }

      if (!this.checkInput(this.proposerAddress, "请选择投保人的所在地区")) {
        return false;
      }

      if (!this.checkInput(this.proposerAddress1, "请输入投保人的详细地址")) {
        this.checkInput1("proposerAddress1");
        return false;
      }

      if (!this.checkInput(this.proposerEmail, "请输入投保人的邮箱")) {
        this.checkInput1("proposerEmail");
        return false;
      }

      let resultProposerEmail = this.checkEmail(this.proposerEmail);
      if (!resultProposerEmail) {
        Toast.failed("投保人的邮箱格式有误");
        return false;
      }
      return true;
    },
    submitCheck() {
      if (!this.checkInputS(this.relation, "请输入投保人与被保人的关系")) {
        return false;
      }

      //被保人
      if (!this.checkInput(this.insuredName, "请输入被保人的姓名")) {
        this.checkInput1("insuredName");
        return false;
      }

      if (!this.checkInput(this.insuredPhone, "请输入被保人的手机号")) {
        this.checkInput1("insuredPhone");
        return false;
      }
      /*  if (!this.checkInput(this.insureIdType, '请选择被保人的证件类型')) {
                 return false;
                 }*/
      if(this.insureIdTypeCode == "4" || this.insureIdTypeCode == "5"){
        if(!this.insureChildSex){
           Toast.failed("请输入被保人性别");
        }
        if(!this.datePickerValueB){
           Toast.failed("请输入被保人出生日期");
        }
      }
      if (!this.checkInput(this.insuredCard, "请输入被保人的证件号")) {
        this.checkInput1("insuredCard");
        return false;
      }
      if (this.insureIdTypeCode == "4") {
        if (
          !this.checkInput(
            this.checkBirthCard(this.insuredCard),
            "请输入正确出生证证件号"
          )
        ) {
          this.checkInput1("insuredCard");
          return false;
        }
      }

      if (this.insuredRelationToAppnt != "00") {
        if (this.insureIdTypeCode != "4" && this.insuredChooseIndex == 1) {
          if (
            !this.checkInput(
              this.insurePickerEndValue,
              "请选择被保人身份证的有效期"
            )
          ) {
            return false;
          }
        }
      }
      if (this.insuredRelationToAppnt != "00") {
        if (this.insureIdTypeCode == "5") {
          let cardBirth = this.getBirth(this.insuredCard);
          let InsuredBirthday = this.datePickerValueB
            .replace("/", "-")
            .replace("/", "-");
          if (cardBirth != InsuredBirthday) {
            if (
              !this.checkInput(
                cardBirth == InsuredBirthday,
                "被保人身份证与出生日期不符"
              )
            ) {
              return false;
            }
          }
        }
      }

      if (!this.checkInput(this.insuredJob, "请选择被保人的职业")) {
        return false;
      }
      if (!this.checkInput(this.addressDataValue, "请选择被保人的所在地区")) {
        return false;
      }
      if (!this.checkInput(this.insuredAddress1, "请输入被保人的详细地址")) {
        this.checkInput1("insuredAddress1");
        return false;
      }
      if (!this.checkInput(this.insuredEmail, "请输入被保人的邮箱")) {
        this.checkInput1("insuredEmail");
        return false;
      }
      let resultInsuredCard = this.checkEmail(this.insuredEmail);
      if (!resultInsuredCard) {
        Toast.failed("被保人的邮箱格式有误");
        return false;
      }
      return true;
    },
    _setStorage() {
      //从浏览器储存里面读
      let storageItem = this._parseStorage();
      for (let item in storageItem) {
        if (storageItem[item]) {
          this[item] = storageItem[item];
        }
      }
    },
    _parseStorage() {
      let object;
      try {
        object = JSON.parse(window.localStorage.getItem(this.storageName));
      } catch (e) {
        object = {};
      }

      return object || {};
    },
    addStorage(e, val) {
      //放缓存
      if (e) {
        let _storageInfo = {};
        _storageInfo[e] = val;
        this._expireStorage(_storageInfo);
      }
    },
    _expireStorage(info) {
      let object = this._parseStorage();
      let commos = Object.assign(object, info);
      commos.time = new Date().getTime();
      window.localStorage.setItem(this.storageName, JSON.stringify(commos));
    },
    // 去空格
    v_trim(s) {
      return s.replace(/\s/g, "");
    },
    cardNum(phone, e = null) {
      let proposerAge = this.getAge(this.proposerCard)
      if(proposerAge < 18){
         Toast.failed('投保人年龄需大于等于18岁！')
         return false
      }

      if (this.insureIdTypeCode == "4") {
        if (phone == "") {
          Toast.failed("请输入出生证件号！");
          return false;
        }

        if (!this.checkBirthCard(phone)) {
          Toast.failed("请输入正确出生证证件号！");
          return false;
        } else {
            if(e == 'proposerCard'){
               this.addStorage(e, phone); //放缓存
            }
          return true;
        }
      } else if (this.checkCard(phone)) {
        return true;
      } else {
        if (this.insureIdTypeCode == "0") {
          Toast.failed("您的身份证号码不正确！");
        } else if (this.insureIdTypeCode == "5") {
          Toast.failed("您的户口本对应的身份证号码不正确！");
        }

        return false;
      }
    },
    showProposerMoreInfo(){
        this.isShowProposerMoreInfo= true;
        this.showWhiteBox = false;
    },
    showInsuredMoreInfo(){
        this.isShowInsuredMoreInfo= true;
        if(!this.insuredChooseNum){
           this.insuredAddress1 = this.proposerAddress1;
           this.insuredEmail = this.proposerEmail;
           this.addressDataValue = this.proposerAddress;
           this.insureProvinceAdd.placeCode = this.provinceAdd.placeCode;
           this.insureProvinceAdd.placeName = this.provinceAdd.placeName;
           this.insureCityAdd.placeCode = this.cityAdd.placeCode;
           this.insureCityAdd.placeName = this.cityAdd.placeName;
           this.insureAreaAdd.placeCode = this.areaAdd.placeCode;
           this.insureAreaAdd.placeName = this.areaAdd.placeName;
           this.insuredLiveCity = this.proposerLiveCity;
        }
    },
    //            校验名字
    checkName(name, e = null) {
      var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
      if (!regName.test(name)) {
        Toast.failed("您输入的姓名格式不正确！");
        return false;
      } else {
        if(e == 'proposerName'){
           this.addStorage(e, name); //放缓存
        }
        return true;
      }
    },
    //            校验手机号
    checkPhone(phone, e = null) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(phone)) {
        Toast.failed("您输入的手机号格式不正确！");
        return false;
      } else {
        if(e == 'proposerPhone'){
           this.addStorage(e, phone); //放缓存
        }
        return true;
      }
    },
    // 校验出生证
    checkBirthCard(item) {
      const regIdCard = /^[A-Z]\d{5,17}$/;
      var birthCard = this.v_trim(item);
      if (regIdCard.test(this.v_trim(birthCard))) {
        return true;
      }
      return false;
    },
    // 校验身份证
    checkCard(item) {
      const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      var idCard = this.v_trim(item);
      if (regIdCard.test(this.v_trim(idCard))) {
        if (idCard.length == 18) {
          var idCardWi = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          );
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
      email = email.trim();
      var emailReg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i;
      if (emailReg.test(email)) {
        if(e == 'proposerEmail'){
           this.addStorage(e, email); //放缓存
        }
        return true;
      } else {
        Toast.failed("您的邮箱号码输入有误！");
        return false;
      }
    },
    // 计算年龄
    getAge(cardNo) {
      var returnAge;
      var strBirthday =
        cardNo.substring(6, 10) +
        "-" +
        cardNo.substring(10, 12) +
        "-" +
        cardNo.substring(12, 14);
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },

    // 计算性别
    getSex(cardNo) {
      //获取性别
      if (parseInt(cardNo.substr(16, 1)) % 2 == 1) {
        return "M";
      } else {
        return "F";
      }
    },
    // 获取生日
    getBirth(cardNo) {
      var tmpStr = cardNo.substring(6, 14);
      return (
        tmpStr.substring(0, 4) +
        "-" +
        tmpStr.substring(4, 6) +
        "-" +
        tmpStr.substring(6)
      );
    },
    ifBenfPeople() {
      // 如果是本人
      if (this.insuredRelationToAppnt === "00") {
        this.insuredName = this.proposerName;
        this.insuredCard = this.proposerCard;
        this.insuredPhone = this.proposerPhone;
        this.insuredEmail = this.proposerEmail;
        this.addressDataValue = this.proposerLiveCity;
        this.insuredAddress = this.proposerAddress;
        this.insuredJob = this.proposerJob;
        this.insureIdType = "身份证";
        this.insureIdTypeCode = 0;
        this.insureChildSex = this.getSex(this.proposerCard) == "M" ? "0" : "1";
        this.insureChildBirth = this.getBirth(this.proposerCard);
        this.insuredJobValue = this.proposerJobValue;
        this.insurePickerStartValue = this.datePickerStartValue;
        this.insurePickerEndValue = this.datePickerEndValue;
        this.insureHeight = this.height;
        this.insureWeight = this.weight;
        this.insureSocialNum = this.socialNum;
        this.insureDegreeNum = this.degreeNum;
        this.insureMarriageNum = this.marriageNum;
        this.smokeNum = "N";
        this.insureJobCode = this.jobCode;
        this.insureProvinceAdd = this.provinceAdd;
        this.insureCityAdd = this.cityAdd;
        this.insureAreaAdd = this.areaAdd;
        this.insureEmail = this.email;
        this.insuredWork = this.proposerWork;
        this.insuredLiveCity = this.proposerLiveCity;
        this.insuredAddress1 = this.proposerAddress1;
        var a = [].concat(this.proposerAddressArr);
        this.insuredAddressArr = a;
        if (this.proposerChooseIndex == 1) {
          this.insuredChooseIndex = 1;
          this.insureDateFlag = 0;
        } else {
          this.insureDateFlag = 1;
          this.insuredChooseIndex = 0;
        }
      }
    },
    //
    goToLogin(){
         let _this = this;
         this.$app.getUserCode(function (userCode) {
             console.log('getusercode',userCode)
            _this.loginSuccess(userCode);
         })
    },
    // 投保
    jsubmit() {
      if(this.actives == 0 || this.actives == 1 || this.activeQ == 0 || this.activeQ == 1 || this.activeQ == null){
        this.showToubao();
        return false;
      }
      if (!this.agreeConf.checked) {
        Toast.failed("请勾选《用户协议》");
        return false;
      }
      let resultProposer = this.submitProposerCheck();
      if (!resultProposer) {
        return false;
      }
      //检验录入信息
      if (this.relation == "") {
        Toast.failed("请选择投保人与被保人的关系");
        return false;
      }
      // 如果是本人
      this.ifBenfPeople();
      let result = this.submitCheck();
      if (!result) {
        return false;
      }
      //验证投保人详细地址
      let myreg = /^.+(乡|镇|街|路|道|巷|委|段|里|社|园|苑).+(村|组|号|室|队|院|房|楼|栋).*$/;
      if (!myreg.test(this.proposerAddress1)) {
        Toast.failed("投保人地址格式不正确！");
        return false;
      }
      //验证被保人详细地址
      if (!myreg.test(this.insuredAddress1)) {
        Toast.failed("被保人地址格式不正确！");
        return false;
      }
      //判断投被保人手机号不能一致
      if (
        this.insuredRelationToAppnt !== "00" &&
        this.insuredRelationToAppnt !== "03"
      ) {
        if (this.proposerPhone === this.insuredPhone) {
          Toast.info("投保人与被保人的电话号码不能相同");
          return false;
        }
      }
      //如果不是本人
      if (this.insuredRelationToAppnt !== "00") {
        if (this.insureIdTypeCode == 0) {
          this.insureChildSex =
            this.getSex(this.insuredCard) == "M" ? "0" : "1";
          this.insureChildBirth = this.getBirth(this.insuredCard);
          this.insureIdTypeCode = 0;
        } else {
          this.insureChildBirth = this.datePickerValueB.replace("/", "-").replace("/", "-");
        }
      }

      let resultProposerCard = this.checkCard(this.proposerCard);
      if (!resultProposerCard) {
        Toast.failed("投保人身份证不正确");
        this.checkInput1("proposerCard");
        return false;
      }
      if (this.insureIdTypeCode !== "4") {
        let resultInsuredCard = this.checkCard(this.insuredCard);
        if (!resultInsuredCard) {
          if (this.insureIdTypeCode == "5") {
            Toast.failed("被保人户口本对应的身份证不正确");
          } else {
            Toast.failed("被保人身份证不正确");
          }

          this.checkInput1("insuredCard");
          return false;
        }
      }
      //顺心保--校验投保人年龄

      let proposerAge = this.getAge(this.proposerCard)
      if(proposerAge < 18){
        Toast.failed('投保人年龄需大于等于18岁！')
        return false
      }
      console.log(this.proposerJob)
      if(proposerAge >= 18 && this.proposerJob[0].value == '2099908'){
        Dialog.alert({content:"投保人职业与年龄不符，请重新确认。"})
        return false
      }

      //顺心保--校验被保人年龄与职业的关系
      let insuredAge = this.getAge(this.insuredCard)
      let insureJobCodeFlag1 = true;
      let insureJobCodeFlag2 = false;
      if(this.insureJobCode == '2099908' || this.insureJobCode == '2099907'){
          insureJobCodeFlag1 = false
      }
      if(this.insureJobCode == '2099908'){
          insureJobCodeFlag2 = true;
      }
      if(insuredAge >= 18 && insureJobCodeFlag2 && this.insureIdTypeCode != "4"){
         Dialog.alert({content:"被保人职业与年龄不符，请重新确认"})
         return false
      } else if(insuredAge < 18 && insureJobCodeFlag1 && this.insureIdTypeCode != "4"){
           Dialog.alert({content:"被保人职业与年龄不符，请重新确认"})
           return false
        }

      //校验投被保人年龄
      // 如果是夫妻关系，性别不能是同性
      // 如果被保人是父母，年龄要大于投保人18岁
      // 如果被保人是子女，年龄要小于投保人18岁
      if (this.insuredRelationToAppnt === "01") {
        if (this.getSex(this.proposerCard) === this.getSex(this.insuredCard)) {
          if (this.getSex(this.proposerCard) === "M") {
            Dialog.alert({ content: "配偶性别需为女" });
            return false;
          }
          if (this.getSex(this.proposerCard) === "F") {
            Dialog.alert({ content: "配偶性别需为男" });
            return false;
          }
        }
        if (this.jsGetAge(this.getBirth(this.insuredCard)) < 18) {
          Dialog.alert({ content: "配偶的年龄需满18周岁" });
          return false;
        }
      }
      if (this.insuredRelationToAppnt === "03") {
        if (this.insureIdTypeCode != "4") {
          //判断是否是出生证
          if (
            this.jsGetAge(this.getBirth(this.proposerCard)) -
              this.jsGetAge(this.getBirth(this.insuredCard)) <
            18
          ) {
            Dialog.alert({ content: "子女的年龄需比投保人小18周岁" });
            return false;
          }
        } else {
          let birthday = this.datePickerValueB
            .replace("/", "-")
            .replace("/", "-");
          if (
            this.jsGetAge(this.getBirth(this.proposerCard)) -
              this.jsGetAge(birthday) <
            18
          ) {
            Dialog.alert({ content: "子女的年龄需比投保人小18周岁" });
            return false;
          }
        }
      }
      if (this.insuredRelationToAppnt === "02") {
        if (
          this.jsGetAge(this.getBirth(this.insuredCard)) -
            this.jsGetAge(this.getBirth(this.proposerCard)) <
          18
        ) {
          Dialog.alert({ content: "父母的年龄需比投保人大18周岁" });
          return false;
        }
      }
      this.cvaliDate = this.transferDate(new Date(), "yyyy-MM-dd");

      //记录身份证有效期   //判断  如果选择了长期 默认值设置为3000/01/01
      //1--非长期   2--长期
      if (this.proposerChooseIndex == 1) {
        this.proposerIdValidate = this.datePickerEndValue
          .replace("/", "-")
          .replace("/", "-");
        this.insureDateFlag = 0;
      } else {
        this.proposerDateFlag = 1;
        this.datePickerEndValue = "3000/01/01";
        this.proposerIdValidate = this.datePickerEndValue
          .replace("/", "-")
          .replace("/", "-");
      }

      if (this.insureIdTypeCode !== "4" && this.insureIdTypeCode !== "5") {
        if (this.insuredChooseIndex == 1) {
          this.insureIdValidate = this.insurePickerEndValue
            .replace("/", "-")
            .replace("/", "-");
          this.insureDateFlag = 0;
        } else {
          this.insureDateFlag = 1;
          this.insurePickerEndValue = "3000/01/01";
          this.insureIdValidate = this.insurePickerEndValue
            .replace("/", "-")
            .replace("/", "-");
        }
      } else {
        this.insureDateFlag = 1;
      }

      this.insureHeight = null;
      this.insureWeight = null;


      let data = [
        {
          amnt: "1000",
          dutyCode: "5321D1",
          getRate: "",
          getYear: "",
          getYearFlag: "",
          insuYear: "1",
          insuYearFlag: "Y",
          mult: "1",
          payEndYear: "1",
          payEndYearFlag: "Y",
          payIntv: "12",
          prem: "12",
          relaInfoList: [],
          renewFlag: "N",
          riskCode: "5321",
          riskName: "",
          subRiskFlag: "M"
        }
      ];
      this.bnRiskInfoList = data;
      this.socialSecurityFlag = "1";

      //投保人
      var bnappntInfo = {
        // 投保人信息
        name: this.proposerName, //
        sex: this.getSex(this.proposerCard) == "M" ? "0" : "1", // 性别
        birthday: this.getBirth(this.proposerCard), // 生日
        occupationCode: this.jobCode, // 职业代码
        // "occupationCode": "3010101",           // 职业代码
        nativePlace: "CHN", // 国籍
        rgtAddressInfoList: [
          // 户籍地址
          {
            placeCode: this.provinceAdd.placeCode, // 地址编码
            placeName: this.provinceAdd.placeName, // 地址名称
            // 地址类型 01 省 02 市 03 县/区
            placeType: "01" // 地址类型 01 省 02 市 03 县/区
          },
          {
            placeCode: this.cityAdd.placeCode,
            placeName: this.cityAdd.placeName,
            placeType: "02"
          },
          {
            placeCode: this.areaAdd.placeCode,
            placeName: this.areaAdd.placeName,
            placeType: "03"
          }
        ],
        // "rgtAddressText": this.proposerLiveCity + this.proposerAddress1,           //详细地址
        rgtAddressText: "", //详细地址
        idType: 0, //证件类型
        idNo: this.proposerCard, //证件号码
        idValidate: this.datePickerEndValue.replace("/", "-").replace("/", "-"), //证件有效期
        crsIdType: this.jumingDataValue, //税收居民身份类型不能为空   仅支持仅为中国税收居民   税收居民身份类型0仅为中国税收居民 1仅为非中国税收居民 2既是中国税收居民又是其他国家税收居民
        communicationInfo: {
          //通信地址
          mobile: this.proposerPhone, //联系方式-手机号码
          otherMobile: "", //其他联系电话
          email: this.proposerEmail.trim(), //联系方式-邮件
          postalAddressInfoList: [
            //邮寄地址列表
            {
              placeCode: this.provinceAdd.placeCode, // 地址编码
              placeName: this.provinceAdd.placeName, // 地址名称
              // 地址类型 01 省 02 市 03 县/区
              placeType: "01" // 地址类型 01 省 02 市 03 县/区
            },
            {
              placeCode: this.cityAdd.placeCode,
              placeName: this.cityAdd.placeName,
              placeType: "02"
            },
            {
              placeCode: this.areaAdd.placeCode,
              placeName: this.areaAdd.placeName,
              placeType: "03"
            }
          ],
          postalAddressText: this.proposerLiveCity + this.proposerAddress1, //地址名称
          postalZipCode: this.email //地址邮编
        },
        marriage: null,
        degree: null,
        stature: this.height,
        avoirdupois: this.weight,
        socialSecurityFlag: null,
        customerLevel: "0", //客户等级  0：普通客户，1:高端客户
        specialImpartInfo: "", //特殊告知
        occupationInfo: {
          occupationCode: this.jobCode,
          // "occupationCode": "3010101",
          hosipRisk: "1",
          occupationType: "1",
          occupationName: "行政业务办公人员（内勤）"
        }
      };
      //被保人
      var insuredInfoList = [
        {
          name: this.insuredName, //姓名               //性别
          sex: this.insureChildSex,
          birthday: this.insureChildBirth, //生日
          occupationCode: this.insureJobCode, //职业代码
          // "occupationCode": "3010101",        //职业代码
          nativePlace: "CHN", //国籍
          rgtAddressInfoList: [
            {
              placeCode: this.insureProvinceAdd.placeCode,
              placeName: this.insureProvinceAdd.placeName,
              placeType: "01"
            },
            {
              placeCode: this.insureCityAdd.placeCode,
              placeName: this.insureCityAdd.placeName,
              placeType: "02"
            },
            {
              placeCode: this.insureAreaAdd.placeCode,
              placeName: this.insureAreaAdd.placeName,
              placeType: "03"
            }
          ],
          // "rgtAddressText": this.insuredLiveCity + this.insuredAddress1,
          rgtAddressText: "",
          //"rgtAddressZipCode": "100000",        //邮编
          rgtAddressZipCode: this.insureEmail, //邮编
          idType: this.insureIdTypeCode, // 证件类型
          idNo: this.insuredCard, // 证件号码
          idValidate: this.insurePickerEndValue
            .replace("/", "-")
            .replace("/", "-"), // 证件有效期
          crsIdType: "0", //税收居民身份类型不能为空   仅支持仅为中国税收居民   税收居民身份类型0仅为中国税收居民 1仅为非中国税收居民 2既是中国税收居民又是其他国家税收居民
          communicationInfo: {
            //通信地址
            mobile: this.insuredPhone, //联系方式-手机号码
            otherMobile: "",
            email: this.insuredEmail.trim(), //联系方式-邮件
            postalAddressInfoList: [
              {
                placeCode: this.insureProvinceAdd.placeCode,
                placeName: this.insureProvinceAdd.placeName,
                placeType: "01"
              },
              {
                placeCode: this.insureCityAdd.placeCode,
                placeName: this.insureCityAdd.placeName,
                placeType: "02"
              },
              {
                placeCode: this.insureAreaAdd.placeCode,
                placeName: this.insureAreaAdd.placeName,
                placeType: "03"
              }
            ],
            postalAddressText: this.insuredLiveCity + this.insuredAddress1, //详细地址
            // "postalZipCode": "10000"                     //邮寄地址编码
            postalZipCode: this.insureEmail //邮寄地址编码
          },
          marriage: null,
          degree: null,
          stature: this.insureHeight,
          avoirdupois: this.insureWeight,
          socialSecurityFlag: this.socialSecurityFlag,
          ifSmoke: "N",
          customerLevel: "0",
          occupationInfo: {
            occupationCode: this.insureJobCode,
            //"occupationCode": "3010101",
            hosipRisk: "1",
            occupationType: "1",
            occupationName: "行政业务办公人员（内勤）"
          },
          relationToAppnt: this.insuredRelationToAppnt, //被保人与投保人关系不能为空
          // "relationToAppnt": "00",            //被保人与投保人关系不能为空
          specialImpartInfo: "被保人特殊告知", //被保人特殊告知
          impartInfoList: localStorage.getItem("HealthNotification")
            ? JSON.parse(localStorage.getItem("HealthNotification"))
                .impartInfoList
            : [],
          bnfInfoList: [
            //受益人
          ],
          riskInfoList: this.bnRiskInfoList,
          contInfo: {
            //订单
            prem: this.premium,
            sumPrem: this.premium,
            manageCom: "86880101",
            chargeInfo: {
              //银行账户信息
              // "accName": this.bankvalue,                  //续期账户名称
              accName: this.proposerName, //续期账户名称
              bankCode: this.bankNum, //续期银行编码
              bankAccNo: this.bankAccNo, //续期账户号
              payMode: "R", //收费方式 R：实时收费，7：批次转账
              newAccName: this.proposerName,
              newBankAccNo: this.bankAccNo,
              newBankCode: this.bankNum
            },
            loveLetterInfoList: [
              //联系信息
            ],
            needBnfDocument: "N",
            saleChnl: "7",
            fileInfoList: [
              //文件信息
            ],
            applyDate: this.cvaliDate,
            printPaperPolicy: "", //是否打印纸制保单
            needEmailSubscribe: "Y", //是否需要电子函件订阅功能 Y：是 N：否
            saleMode: "6", //出的渠道 1传统手工出单 2 移动展业出单 3银保通出单 4 网银出单 5自助机出单 6网络出单
            subSaleMode: "ONLINE", //W:web版本 P:pad版本 M手机版本 SD:盛大 WX:微信 KX:开心保 AP:支付宝 TM:天猫 BB:百宝网
            thirdClassDistributor: "", //3级分销
            secondaryDistributor: "", //2级分校
            questionnaireNo: '', //智能核保问卷号
            smartUwConclusion: '9' //智能核保结论 9：标体 4：除责 5：转人工核保
          }
        }
      ];

      var _data = {
        appntInfo: bnappntInfo,
        userCode: "72845852", //代理人编码 todo
        insuredInfoList: insuredInfoList,
        productId: this.product_id,
        appUserCode: "",
        shareUserCode: "",
        smsVerifyCode: this.smsVerifyCodeVal,
        anonymousId: this.anonymousId,
          isbn:this.isbn
      };
      //增加出单载体
      _data.carrierType = this.$app.getCarrierType(); //app:百年人寿APP;bnminiapp:百年人寿小程序;cpslink:CPS链接
      //缓存当前页数据  订单页要用
      this.jobInfo.proposerJob = this.proposerWork;
      this.jobInfo.insuredJob = this.insuredWork;
      this.jobInfo.proposerDateFlag = this.proposerDateFlag;
      this.jobInfo.insureDateFlag = this.insureDateFlag;
      this.jobInfo.cvaliDates = this.cvalidate5321;
      this.jobInfo.properResident = this.jumingDataValue;
      this.jobInfo.insureResident = "0";
      this.jobInfo.proposerDetailAddress = this.proposerAddress1;
      this.jobInfo.insureDetailAddress = this.insuredAddress1;
      this.jobInfo.proposerAddressArr = this.proposerLiveCity;
      this.jobInfo.insureLiveAddress = this.insuredLiveCity;
      this.jobInfo.bankValue = this.bankvalue;
      this.jobInfo.userData = this.userBiaoShi;
      this.jobInfo.benValue = this.beneficiaryValue;
      this.jobInfo.proposerIdValidate = this.proposerIdValidate;
      this.jobInfo.insureIdValidate = this.insureIdValidate;
      window.localStorage.setItem("jobInfo", JSON.stringify(this.jobInfo));
      window.localStorage.setItem("allInfo", JSON.stringify(_data));
      this.insuredData = _data;

      //如果是体外投保
      if (!this.isBrowser) {
          this.insuredData.insuredInfoList[0].contInfo.secondaryDistributor =
            localStorage.getItem("cps_secondaryDistributor") || "";
          this.insuredData.insuredInfoList[0].contInfo.thirdClassDistributor =
            localStorage.getItem("cps_thirdClassDistributor") || "";
          this.insuredData.shareUserCode =
            localStorage.getItem("cps_shareUserCode") || "";
          if (
            !this.insuredData.insuredInfoList[0].contInfo.secondaryDistributor &&
            !this.agentCode
          ) {
            Toast.failed("渠道不可为空");
            return false;
          }
          //判断 有无发送验证码
          if(!this.smsVerifyMobilePhone || this.smsVerifyMobilePhone != this.insuredData.appntInfo.communicationInfo.mobile){
              if(this.$app.isMiniProgram()&&this.$app.isBnMiniApp()&&localStorage.getItem("cps_token")&&localStorage.getItem("miniapp_user_code")){
                //2019-10-25如果在小程序内，并且是二级经销商是miniapp时，不发送验证码，因为之前已经登录过了，保持和app体内一样
              }else{
                  this.smsVerifySend("first");
                  return false;
              }
          }
      }
      this.insureSubmit();
    },

    insureSubmit() {
      //throttleFlag函数节流 默认是false，执行一下改为true,执行结束又回false
      if (this.throttleFlag) return;
      this.throttleFlag = true;
      let that = this;
      that.load_shence_yw_fill_info();
      this.$app.getToken(function(userToken) {
        that.$request({
          url: `/contract/policytrade`,
          method: "POST",
          contentType: "application/json;charset=UTF-8",
          data: that.insuredData,
          isLoading: true,
          userToken: userToken,
          successFn: data => {
            if (data.policyInfoList[0].status == 3) {
              that.orderContent = data.policyInfoList[0].orderNo;
              window.localStorage.setItem(
                "orderNumber",
                JSON.stringify(that.orderContent)
              );
              that.load20WData(
                data,
                function(isBenren) {
                  // 20万反洗钱走这里
                  if (that.agentCode) {
                    location.href = `/product/UploadIDcard.html?orderNo=${
                      that.orderContent
                    }&status=3&isBenren=${isBenren}&product_id=${
                      that.product_id
                    }&agentCode=${that.agentCode}`;
                  } else {
                    location.href = `/product/UploadIDcard.html?orderNo=${
                      that.orderContent
                    }&status=3&isBenren=${isBenren}&product_id=${
                      that.product_id
                    }`;
                  }
                },
                function() {
                  // 正常流程走这里
                  if (that.isBrowser) {
                    that.orderAdd += `&orderNo=${that.orderContent}`;
                    location.href = that.orderAdd;
                  } else {
                    that.getNoBrowserUserCode();
                  }
                }
              );
              return false;
            } else if (data.policyInfoList[0].status == 1) {
              that.basicDialog.msg = data.policyInfoList[0].message;
              that.basicDialog.open = true;
            } else if (data.policyInfoList[0].status == 2) {
              that.load20WData(
                data,
                function(isBenren) {
                  // 20万反洗钱走这里
                  that.goArtificialConfirm(data, isBenren);
                },
                function(isBenren) {
                  // 正常流程走这里
                  that.goArtificialConfirm(data, isBenren);
                }
              );
              // 自核失败，走人核流程
              // orderNo: "112431560245574905", prtNo: "1701670000037227"
            } else if (data.policyInfoList[0].status == 5) {
              //转人核
              //ocation.href = that.$router.siteUrl()+'/product/HealthNotification.html?product_id=' + that.product_id
              that.orderContent = data.policyInfoList[0].orderNo;
              window.localStorage.setItem(
                "orderNumber",
                JSON.stringify(that.orderContent)
              );
              if (localStorage.getItem("HealthNotification")) {
                localStorage.removeItem("HealthNotification");
              }
              if (localStorage.getItem("ZNHBbodyInfo")) {
                // 删除健康传过来的身高和体重信息
                localStorage.removeItem("ZNHBbodyInfo");
              }
              that.$app.getUserCode(userCode => {
                if (
                  localStorage.getItem(
                    "underwriteInfo" + userCode + that.product_id
                  )
                ) {
                  localStorage.removeItem(
                    "underwriteInfo" + userCode + that.product_id
                  );
                }
              });

              that.load20WData(
                data,
                function(isBenren) {
                  // 20万反洗钱走这里
                  location.href = `/product/UploadIDcard.html?orderNo=${
                    that.orderContent
                  }&status=5&isBenren=${isBenren}&product_id=${
                    that.product_id
                  }`;
                  return false;
                },
                function() {
                  // 正常流程走这里
                  window.location.href =
                    that.$router.siteUrl() +
                    "/product/HumanNucleusSuccess.html?orderNo=" +
                    that.orderContent;
                }
              );
            }
            that.throttleFlag = false;
          },
          failFn: data => {
            that.throttleFlag = false;
            if (data.resultMsg.indexOf("职业服务获取职业信息失败") > -1) {
              Toast.failed("您选择的职业类别不符合投保标准");
            } else if (data.resultCode == "SYS_ERROR_0031") {
              that.cardCheck.open = true;
            } else if (data.resultCode === "SYS_ERROR_0041") {
              //体外投保短信验证码错误，重新获取验证码
              Toast({ content: data.resultMsg });
              that.smsVerifyFirst = true;
              that.smsVerifySend("first");
            } else {
              that.basicDialog.msg = data.resultMsg;
              that.basicDialog.open = true;
            }
          },
          errorFn: () => {
            that.throttleFlag = false;
          }
        });
      });
    },
    goArtificialConfirm(data, isBenren) {
      let that = this;
        window.location.href = `/product/ArtificialConfirm.html?product_id=${
          that.product_id
        }&orderNo=${data.policyInfoList[0].orderNo}&prtNo=${
          data.policyInfoList[0].prtNo
        }&antiMoneyFlag=${data.policyInfoList[0].antiMoneyFlag ||
          ""}&status=2&isBenren=${isBenren}`;
    },
    load20WData(data, callback1 = function() {}, callback2 = function() {}) {
      let that = this;
      let cps_secondaryDistributor =
        localStorage.getItem("cps_secondaryDistributor") || "";
      let isBenren = false;
      if (that.insuredRelationToAppnt == "00") {
        isBenren = true;
      }
      that.$app.if20Access(flag => {
        if (flag) {
          if (data.policyInfoList[0].antiMoneyFlag === "Y") {
            callback1(isBenren);
          } else {
            callback2(isBenren);
          }
        } else {
          callback2(isBenren);
        }
      });
    },
    smsVerifySubmit(val) {
      let _this = this;
      setTimeout(() => {
        this.$request({
          url:
            "/portal/validSmsCode/" +
            _this.insuredData.appntInfo.communicationInfo.mobile +
            "/" +
            val,
          method: "GET",
          isEncript: true,
          params: { pathQueryLen: 2 },
          contentType: "application/json",
          successFn: data => {
            if (data) {
              //成功后，调投保接口
              _this.smsCodeDialog.open = false;
              _this.smsVerifyShow = false;
              _this.smsVerifyFirst = true;
              _this.smsVerifyMobilePhone = _this.insuredData.appntInfo.communicationInfo.mobile
              _this.smsVerifyCodeVal = val;
              _this.insuredData.smsVerifyCode = val;
              _this.insureSubmit();
            } else {
              Toast({
                content: "验证码错误，请重新输入"
              });
            }
          },
          failFn: data => {
            Toast({ content: data.resultMsg });
            return false;
          }
        });
      }, 300);
    },

    smsVerifySend(flag) {
      if (!this.smsVerifyFirst) {
        //                    Toast({
        //                        content: '操作频繁，请稍后再试',
        //                    })
        console.log("60秒后发送");
        return false;
      }
      if (!this.insuredData) {
        Toast({
          content: "请先填写投保信息"
        });
        return false;
      }
      let appntMobile = this.insuredData.appntInfo.communicationInfo.mobile;

      let data = {};
      data.userName = appntMobile;
      if (this.smsCodeDialog.code) {
        data.imageCode = this.smsCodeDialog.code;
        data.randomStr = this.smsCodeDialog.randomStr;
      }
      this.$request({
        url: `/portal/sendSmsCode`,
        method: "POST",
        isLoading: true,
        isEncript: true,
        data: data,
        contentType: "application/json",
        successFn: data => {
          this.smsVerifyContent = "验证码已发送至 " + appntMobile;
          if (flag === "first" || flag === "code") {
            this.smsCodeDialog.open = false;
            this.smsVerifyShow = true;
          }
          //发送成功
          this.smsVerifyFirst = false;
          this.smsCodeDialog.code = "";
          this.smsCodeDialog.randomStr = "";

          this.$refs.captcha.countdown();
          let _this = this;
          setTimeout(function() {
            _this.smsVerifyFirst = true;
          }, 60 * 1000);
        },
        failFn: data => {
          if (data.resultCode === "SYS_ERROR_001") {
            this.smsVerifyShow = false;
            this.smsVerifyCode();
          } else {
            this.smsVerifyCode();
            this.smsCodeDialog.code = "";
            this.smsCodeDialog.randomStr = "";
            Toast({
              content: data.resultMsg
            });
          }
          return false;
        }
      });
    },
    smsVerifyCode() {
      this.smsCodeDialog.randomStr = new Date().getTime();
      this.smsCodeDialog.img =
        this.$router.serverUrl() + "/code/" + this.smsCodeDialog.randomStr;
      this.smsCodeDialog.open = true;
      window.scrollTo(0, 0);
    },
    smsCodeSend() {
      if (this.smsCodeDialog.code === "") {
        Toast({
          content: "请输入图形验证码"
        });
        return false;
      }

      this.smsVerifySend("code");
    },
    getNoBrowserUserCode() {
      let that = this;
      this.$app.getToken(function(userToken) {
        that.$request({
          url: `/vip/user/current`,
          isLoading: true,
          userToken: userToken,
          contentType: "application/json",
          successFn: data => {
            sensors.login(data.userCode);
            sensors.quick("autoTrack");
            that.orderAdd += `&orderNo=${that.orderContent}`;
            console.log("that.orderAdd", that.orderAdd);
            location.href = that.orderAdd;
          },
          failFn: data => {}
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.watermark{
        background: url("~@/assets/imgs/watermark.png") repeat-y center #fff !important;
        background-size: 100% auto!important;
    }

.toTop {
    display: inline-block;
    width: 30px;
    height: 16px;
    margin-left: 10px;
    background: url(../../assets/imgs/sunxinbao/toTop.png) no-repeat;
    background-size: 30px 15px;
 }
 .toDown {
    display: inline-block;
    width: 30px;
    height: 16px;
    margin-left: 10px;
    background: url(../../assets/imgs/sunxinbao/toDown.png) no-repeat;
    background-size: 30px 15px;
 }
.ke-pagebreak{
   display: none;
   background: red;
 }
.unFoldOrFold {
   box-sizing:border-box;
   -moz-box-sizing:border-box; /* Firefox */
   -webkit-box-sizing:border-box; /* Safari */
   width: 156px;
   height: 56px;
   line-height: 46px;
   padding: 6px 26px 8px 36px;
   margin: 20px auto 0px;
   border: 1px solid #c6ab83;
   border-radius: 8px;
   color: #c6ab83;
   span {
       font-size: 28px;
       margin-left: 20px;
   }
}
.content {
  background: #fff;
  position: relative;
}

.md-field {
  padding: 0 25px !important;
}

.button1.gm-btn {
  background: #1fb2a7;
  text-align: center;
  width: 100%;
  color: #fff;
  display: block;
  font-size: 36px;
  line-height: 140px;
}

.button.gm-btn {
  background: #1fb2a7;
  text-align: center;
  width: 100%;
  color: #fff;
  display: block;
  font-size: px2em(36px);
  line-height: px2em(140px);
}

.contentTop {
  width: 100%;
  .contentTopImg {
    width: 100%;
    position: relative;
  }
  .topIntroduce {
    height: 100px;
    margin-top: -15px;
    position: absolute;
    overflow: hidden;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: #fff;
    width: 94%;
    /*box-shadow: 0px 4px 15px #6666;*/
    box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
    margin-left: 3%;
    .topLogo {
      width: 120px;
      margin-top: 35px;
      display: inline-block;
      margin-left: 15px;
    }
    p {
      font-size: 22px;
      float: right;
      margin-right: 25px;
      margin-top: 25px;
    }
  }
}

.contentBottom {
  display: flex;
  height: 100px;
  position: fixed;
  z-index: 100 !important;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  &.isIphonex {
    bottom: 68px;
  }
  .customerModal {
    flex: 0.3;
  }
  .bottomP {
    flex: 0.7;
    line-height: 100px;
  }
  .bottomA {
    flex: 1;
    line-height: 100px;
  }
  a a:visited {
    color: #fff;
  }
}
.empty {
  display: flex;
  height: 100px;
  position: fixed;
  background-color: #fff;
  z-index: 99 !important;
  width: 100%;
  bottom: 0;
}
.contentMiddle {
  /*box-shadow: 0px 4px 15px #6666;*/
  box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
  width: 94%;
  margin-top: 40px;
  margin-left: 3%;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  .contentMiddleTitle {
    display: flex;
    font-weight: bold;
    padding: 30px 0 30px;
    border-bottom: 1px solid rgb(237, 237, 237);
    justify-content: space-between;
    font-size: 36px;
  }
  .contS {
    width: 96%;
    margin-left: 2%;
    padding-bottom: 30px;
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 0.2rem;
      li:first-child {
        color: #333;
        font-size: 30px;
        width: 3.65rem;
        white-space: nowrap;
      }
      li:last-child {
        color: #333;
        font-size: 30px;
        max-width: 6rem;
          span{
              display: inline-block;
          }
      }
      li {
        line-height: 0.7rem;
      }
      button {
        height: 65px;
        width: 180px;
        /*height: .9rem;*/
        /*width: 2.9rem;*/
        background: #fff;
        padding: 10px;
        font-size: 26px;
        color: #fff;
        border: 1px solid #d7000f;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
      }
      .insuredDetail{
          padding-right: 43px;
      }
    }
    .oneDetail {
      font-size: 24px;
      padding: 28px 18px 10px 20px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      background: url(../../assets/imgs/sunxinbao/bgcPic.png) no-repeat;
      background-size: 100% 100%;
      color: #C6AB83;
    }
    .parT {
    }
  }
}
.contentMiddle_a {
    /*box-shadow: 0px 4px 15px #6666;*/
    box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
    width: 94%;
    margin-left: 3%;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    .contentMiddleTitle {
        display: flex;
        font-weight: bold;
        padding: 30px 0 30px;
        border-bottom: 1px solid rgb(237, 237, 237);
        justify-content: space-between;
    }
    .contS {
        width: 96%;
        margin-left: 2%;
        ul {
            display: flex;
            justify-content: space-between;
            margin-top: 0.2rem;
            li:first-child {
                color: rgb(102, 102, 102);
                font-size: 28px;
                width: 3.65rem;
                white-space: nowrap;
            }
            li:last-child {
                color: rgb(215, 0, 15);
                font-size: 28px;
                max-width: 6rem;
                span{
                    display: inline-block;
                }
            }
            li {
                line-height: 0.7rem;
            }
            button {
                height: 65px;
                width: 180px;
                /*height: .9rem;*/
                /*width: 2.9rem;*/
                background: #fff;
                padding: 10px;
                font-size: 26px;
                color: #fff;
                border: 1px solid #d7000f;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
        }
        .oneDetail {
            margin-top: 15px;
            font-size: 25px;
            padding: 30px 35px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background: rgb(245, 245, 245);
            color: rgb(153, 153, 153);
        }
        .parT {
        }
    }
}
.contentMiddle1 {
    width: 94%;
    height: 4rem;
    margin-top: 4%;
    margin-bottom: 4%;
    margin-left: 3%;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;}
.contentMiddle2 {
    width: 94%;
    height: 2.4rem;
    margin-left: 3%;
    margin-top: 15%;
    margin-bottom: 4%;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;}
.toast {
  width: 94%;
  margin-left: 28px;
  margin-top: 37px;
  margin-bottom: 30px;
  text-align: left;
  font-size: 26px;
  span {
    color: rgb(215, 0, 15);
  }
}

.middleToast {
  width: 100%;
  overflow: hidden;
  .parS {
    margin-top: 20px;
  }
  p {
    width: 31%;
    display: inline-block;
    span {
      font-size: 24px;
      float: left;
      margin-top: -8px;
    }
    img {
      float: left;
      margin-right: 15px;
      display: inline-block;
    }
  }
}

.md-cell-item-title {
  font-size: 30px;
}

.md-example-child-popup-2 {
  float: left;
  width: 100%;
}

.md-button {
  margin-bottom: 20px;
}

.md-popup-title-bar .md-popup-cancel .md-icon {
  align-self: flex-start;
  margin-left: 32px;
}

.md-example-popup {
  position: relative;
  /*font-size: font-minor-large;*/
  /*background :color-bg-base;*/
  box-sizing: border-box;
  // text-align: center;
  background-color: #fff;
}

.md-example-popup-center {
  padding: 50px;
  border-radius: 10px;
}

.md-example-popup-top {
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #4a4c5b;
  color: #fff;
}

.md-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.md-example-popup-bottom {
  width: 100%;
  padding: 40px 35px;
  line-height: 0.6rem;
}

.md-example-popup-left,
.md-example-popup-right {
  height: 100%;
  padding: 0 150px;
  display: flex;
  display:-webkit-flex;
  display:-webkit-box;
  align-items: center;
}

p {
  line-height: 50px;
}

.shuoming {
  position: relative;
  .showAllText {
    background: rgb(255,255,255);
    opacity: 0.9;
    filter:alpha(opacity=100);
    position: absolute;
    bottom: -2Px;
    right: 50px;
    color: #d7000f;
    width: 100%;
    height: 40Px;
    background: rgba(255,255,255, 0.9);
    display: flex;
    display:-webkit-flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 1Px -10Px 20Px #fff;
    -webkit-box-shadow: 1Px -10Px 20Px #fff;
    z-index: 99;
  }
  .wenan {
    position: absolute;
    left: 20%;
    top: 4%;
  }
  h3 {
    color: #d7000f;
    font-size: 30px;
    margin-left: 30px;
    margin-top: 45px;
  }
  img {
    margin-left: 55px;
    display: inline-block;
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .shuoOne {
    .oneTitle {
      display: inline-block;
      font-size: 0.384rem;
      margin-top: 50px;
      color: #333;
    }
    .TwoTitle {
      margin-top: 45px;
      display: inline-block;
      font-size: 0.384rem;
      color: #333;
    }
    .oneBottom {
      font-size: 24px;
      color: #999999;
    }
  }
}

.often {
  width: 100%;
  overflow: hidden;
  position: relative;
  min-height: 325PX;
  .A {
    float: left;
    margin-top: 10px;
    color: #333;
  }
  h3 {
    color: #d7000f;
    font-size: 30px;
    margin-left: 30px;
    margin-top: 45px;
  }
  p {
    width: 87%;
  }
  .questionOne {
    margin-left: 30px;
    margin-top: 40px;
    font-size: 26px;
  }
}

.blank {
  height: 20px;
  background: #f3f3f3;
  width: 100%;
}

.xiTop {
  display: none;
  width: 100%;
  height: 105px;
  background: #f3f3f3;
  z-index: 1000;
  p {
    flex: 1;
    line-height: 105px;
    text-align: center;
    font-size: 26px;
  }
}

.medium {
  display: flex;
  width: 100%;
  height: 105px;
  background: #fff;
  p {
    flex: 1;
    line-height: 105px;
    text-align: center;
    font-size: 26px;
    span {
      display: inline-block;
    }
    .active {
      font-size: 0.4rem !important;
      color: #d7000f;
    }
  }
}

.liPei {
  height: 500px;
  width: 72px;
}

.activeB {
  font-size: 30px !important;
  color: #d7000f !important;
}

.myTitle {
  font-size: 36px !important;
}

.topImg {
  height: 30px;
  float: right;
  margin-left: 20px;
  width: 35px;
  margin-top: 15px;
}

.mediumImg {
  height: 16px;
  float: right;
  margin-left: 12px;
  width: 28px;
  margin-top: 0.22rem;
}

.bottomImg {
  height: 30px;
  float: right;
  margin-left: 20px;
  width: 35px;
  margin-top: 23px;
}

.rightImg {
  height: 40px;
  float: right;
  margin-left: 10px;
  width: 40px;
}

.tiaoZhuan a a:visited {
  color: #fff;
}

.shiSuan {
  color: #d7000f !important;
}

.phone {
  color: #d7000f;
}

.particular1 {
  height: 719px;
  width: 100%;
}

.particular2 {
  height: 787px;
  width: 100%;
}

.particular3 {
  height: 1102px;
  width: 100%;
}

.particular4 {
  height: 1198px;
  width: 100%;
}

.particular5 {
  height: 604px;
  width: 100%;
}

.particular6 {
  height: 1550px;
  width: 100%;
  margin-bottom: 50px;
}

.particular {
  margin-top: 1px;
}

.touBaoHuoMian {
  border-bottom: 1px solid rgb(237, 237, 237);
  padding-bottom: 30px;
  line-height: 75px;
}

.hangGao {
  line-height: 60px;
}

.lastUl {
  padding-bottom: 30px;
  p {
    font-size: 0.4rem;
    line-height: 1rem !important;
  }
}

.bottomP {
  background: #ffffff;
  text-align: center;
  color: rgb(215, 0, 15);
  border-top: 1px solid #f3f3f3;
  font-size: 30px;
  font-weight: bold;
}

.bottomA {
  background: rgb(215, 0, 15);
  text-align: center;
  font-size: 34px;
  flex: 1;
  line-height: 100px;
  color: #fff !important;
}

.chakan {
  overflow: hidden;
  color: rgb(215, 0, 15);
  margin-top: 15px;
  font-size: 30px;
}

.product {
  color: #d7000f !important;
}

.bottomArt {
  font-size: 50px;
}

.questionTitle {
  color: #333;
}

.questionAnswer {
  color: #999;
}

.parL {
  display: inline-block;
}

.duiHao {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.section {
  padding-bottom: px2em(150px);
}

.myQuestion {
  padding: 0px 30px 50px;
  overflow-x: hidden;
  word-wrap: break-word !important;
  word-break: normal !important;
}

.myShuoMing {
  padding: 0 30px;
}

.parLq {
  width: 200px;
  height: 200px;
  background: red;
}

.md-example-child-landscape {
  .md-button {
    margin-bottom: 20px;
    .md-landscape-content {
      padding: 30px;
      font-size: 30px;
      line-height: 1.5;
      color: #666;
      p {
        margin-bottom: 30px;
      }
    }
  }
}

.insureKnow {
  width: 100%;
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  background: #e8e8e8;
  position: fixed;
  font-size: 0.5rem;
  font-weight: 600;
}

.showInsure {
  padding: 100px 30px 30px;
  overflow-x: hidden;
}

.customer {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin-top: 0.1rem;
  margin-left: 0.4rem;
}

.customerModal {
  border-top: 1px solid #f3f3f3;
  background: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 1.2;
  img {
    width: 42px;
    height: 42px;
    &.exlogin {
      width: 34px;
      height: 42px;
    }
  }
  span {
    display: block;
    margin-left: 0.35rem;
    font-size: 18px;
    color: #8e8e8e;
  }
}

.floatingWindow {
  position: fixed;
  background: #8c8c8c;
  width: 100px;
  height: 100px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  bottom: 2.5rem;
  right: 0.5rem;
  font-size: 42px;
  color: #fff;
  text-align: center;
  line-height: 1.3rem;
}


#onagreeinfo {
  position: relative;
  color: #666;
}
#onagreeinfo .onagreeinfo-title {
  font-size: 0.35rem;
  width: 40%;
  color: #999;
}
#onagreeinfo .onagreeinfo-control {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 0%;
  flex: 1 1 0%;
  color: #111a34;
  font-size: 0.373333rem;
  font-weight: 500;
  line-height: 1.2;
}
#onagreeinfo .onagreeinfo-content {
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
  -webkit-transform: scaleY(0.5) translateY(100%);
  transform: scaleY(0.5) translateY(100%);
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
.onagreeinfo-button > div.infoactive {
  border: 2px solid #c5261d;
  color: #c5261d;
}
.md-field-content {
  position: relative;
}

.md-captcha .md-icon.icon-font.md {
  display: none !important;
}

.socialSecurity,
.renew {
  display: flex;
  justify-content: space-between;
  padding-top: 0.4rem;
  padding-bottom: 30px;
  p {
    font-size: 0.4rem;
    color: #666;
    line-height: 1.45em;
  }
  li {
    border: 1px solid #b0afaf;
    border-radius: 0.06667rem;
    font-size: 0.37333rem;
    text-align: center;
    display: inline-block;
    padding: 0.09333rem 0.53333rem;
    margin-left: 0.16rem;
  }
  .active {
    color: rgb(215, 0, 15) !important;
    border: 2px solid rgb(215, 0, 15) !important;
  }
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
.proposertitle{
    position: relative;
    margin-top: 50px;
    margin-bottom: 18px;
    font-size: 32px;
    p:first-child{
        position: absolute;
        top: -0.9px;
        width: 65px;
        height: 44px;
        background: url(../../assets/imgs/sunxinbao/1.png) no-repeat;
    }
    p:nth-of-type(2){
        color: #333;
        margin-left: 60px;
        height: 44px;
        line-height: 36px;
        span{
            font-weight: bolder;
        }
    }
}
.insuredtitle{
    position: relative;
    margin-top: 50px;
    margin-bottom: 48px;
    font-size: 32px;
    p:first-child{
        position: absolute;
        top: -0.9px;
        width: 65px;
        height: 44px;
        background: url(../../assets/imgs/sunxinbao/2.png) no-repeat;
    }
    p:nth-of-type(2){
        color: #333;
        margin-left: 60px;
        height: 44px;
        line-height: 36px;
        span{
            font-weight: bolder;
        }
    }
}
.insurance-title{
    height: px2em(70px) !important;
    line-height: px2em(70px) !important;
    color: #666;
    padding-left: 35px;
    font-size: 32px;
    position: relative;
}
.relationship{
    color: #333;
    font-size: 30px;
    display: flex;
    display:-webkit-flex;
    flex-wrap:nowrap;
    flex-direction:row;
    justify-content: space-between;
    li{
        width: 152px;
        height: 74px;
        color: #333;
        line-height: 74px;
        text-align: center;
        // border: 1px solid #333;
        // border-radius: 8px;
        background-image: url(../../assets/imgs/sunxinbao/juxing.png);
        background-size: 100% 74px;
    }
    .active{
        color: #e30513;
        border: none;
        width: 152px;
        height: 74px;
        line-height: 74px;
        background-image: url(../../assets/imgs/sunxinbao/chooseBorder-L.png);
        background-size: 100% 74px;
    }
    div{
        margin-left: 20px;
        height: 60px;
        line-height: 80px;
        color: #d7000f;
    }
}
.beneficiary-title{
    width: 100%;
    height: 0.9rem !important;
    background: #FFFFFF;
    line-height: 0.9rem !important;
    padding-top: 30px;
    padding-left: 30px;
    font-size: 26px;
    position: absolute;
    bottom: 1.3rem;
    z-index: 100;
    border-bottom: 1px solid #ECECEC;
}
.beneficiary-title-sub{
    position: relative;
    margin-top: 50px;
    margin-bottom: 48px;
    font-size: 32px;
    span{
        position: absolute;
        top: 1px;
        width: 65px;
        height: 44px;
        background: url(../../assets/imgs/sunxinbao/3.png) no-repeat;
    }
    p{
        color: #333;
        margin-left: 60px;
        height: 44px;
        line-height: 44px;
        font-weight: bolder;
    }
}
.white-box{
        height: 2.8rem;
        background-color: #F2F2F2;
        padding-top: 40px;
        white-space: nowrap;
        div{
            margin: 0 auto 28px;
            width: 160px;
            height: 44px;
            background: url(../../assets/imgs/sunxinbao/aeonlife-logo.png) no-repeat;
            background-size: 100% 100%;
        }
        p{
            width: 480px;
            margin: 0 auto;
            font-size: 22px;
        }

}
.moreInfo{
    margin: 2px 0px 18px 0px;
}
.proposerMoreInfo{
    padding: 35px 0 18px 35px;
    font-size: 30px;
    color: #666666;
    span{
        font-size: 32px;
        color: #000000;
        font-weight: bold;
    }
}
.block {
  font-size: 32px;
  margin-bottom: px2em(20px);
  padding-bottom: px2em(0px) !important;
  padding-right: 0.4rem !important;
  position: relative;
}

#block {
  padding-top: px2em(0px) !important;
  p {
    line-height: 1.65em;
  }
}
.box-border{
}
.box {
  padding: px2em(20px) px2em(30px) px2em(2px);
  background-color: #FFFFFF;
}
.md-field-item-control {
  font-size: px2em(28px) !important;
}

.buttonarray {
  display: flex;
  display:-webkit-flex;
  display:-webkit-box;
  .cardIcon {
    position: absolute;
    left: -25px;
    top:25px;
  }
}

.buttonarray > div {
  font-size: 30x;
  width: 160px;
  height: 74px;
  background: url(../../assets/imgs/sunxinbao/juxingB1.png) no-repeat;
  background-size: 100% 74px;
  line-height: 74px;;
  color: #333333;
  text-align: center;
  display: inline-block;
}
.buttonarray > div:last-child {
  margin-right: 0px;
  margin-left: 20px;
}
.buttonarray > div.active {
  width: 160px;
  height: 74px;
  line-height: 74px;
  border: none;
  color: #c5261d;
  padding: 0px;
  background-image: url(../../assets/imgs/sunxinbao/juxingB2.png);
  background-size: 100% 74px;
}

.insuredButtonarray {
  display: flex;
  display:-webkit-flex;
  display:-webkit-box;
  .cardIcon {
    position: absolute;
    left: -25px;
    top:25px;
  }
}

.insuredButtonarray > div {
  font-size: 30x;
  width: 160px;
  height: 74px;
  background: url(../../assets/imgs/sunxinbao/juxingB1.png) no-repeat;
  background-size: 100% 74px;
  line-height: 74px;;
  color: #333333;
  text-align: center;
  display: inline-block;
}
.insuredButtonarray > div:last-child {
  margin-right: 0px;
  margin-left: 20px;
}
.insuredButtonarray > div.active {
  width: 160px;
  height: 74px;
  line-height: 74px;
  border: none;
  color: #c5261d;
  padding: 0px;
  background-image: url(../../assets/imgs/sunxinbao/juxingB2.png);
  background-size: 100% 74px;
}
.button.gm-btn {
  background: #1fb2a7;
  text-align: center;
  width: 100%;
  color: #fff;
  display: block;
  font-size: px2em(36px);
  line-height: px2em(140px);
}

.button1.gm-btn {
  background: #1fb2a7;
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
  align-items: flex-end;
}

.action-container {
  border: 2px solid #ff5963;
  padding: px2em(10px) 0;
  color: #ff5963;
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
  right: -0.2rem;
  top: 12%;
  z-index: 10;
}

.detailAdd {
  position: relative;
  .cardIcon {
    position: absolute;
    right: 0em;
  }
}
.emailAdd{
  position: relative;
  .cardIcon {
    position: absolute;
    right: 0em;
  }
}

.iconTiShi {
  position: absolute;
  top: 18px;
  right: 0px;
}
.iconTiShi2 {
  position: absolute;
  top: 18px;
  right: 0.6rem;
}

.detailHome {
  /*  max-width: 650px;*/
  z-index: 20 !important;
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
  top: 0.5rem;
  left: 2rem;
}

.particular {
  top: 0.55rem !important;
}
.userAdd {
  color: #c5261d;
}
.price {
  font-size: 50px;
  color: #d7000f !important;
}
.contentBottom {
  display: flex;
  height: 100px;
  position: fixed;
  width: 100%;
  z-index: 100 !important;
  bottom: 0;
  left: 0;
  .bottom1 {
    flex: 1;
    border-top: 1px solid #eee;
    color: rgb(153, 153, 153);
    line-height: 100px;
  }
  a {
    flex: 1;
    color: #fff;
    line-height: 100px;
  }
  a:visited {
    color: #fff;
  }
}
.bottom1 {
  background: #ffffff;
  text-align: center;
  color: rgb(215, 0, 15);
  font-size: 30px;
  font-weight: bold;
}
.zongHe {
  color: rgb(215, 0, 15);
}
.justDown {
  background: rgb(215, 0, 15);
  text-align: center;
  font-size: 34px;
  color: #fff;
}
.contentS {
  h2 {
    text-align: center;
    font-weight: bold;
  }
  p {
    margin: 40px 0 30px;
    font-size: 28px;
    color: #666;
    line-height: 0.6rem;
  }
}
.md-button {
  margin-bottom: 20px;
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
  z-index: 100;
}

.cdType .contacts-type .md-field-item {
  width: 92%;
}

.cdType .contacts-type .contacts-icon {
  display: block;
}
.cdType {
  position: relative;
}
.certificate-type{
    height: 1.2rem;
    margin-top: 30px;
    ul{
       font-size: 30px;
       li{
           width: 152px;
           height: 74px;
           line-height: 74px;
           color: #333333;
           // border: 1px solid #A9A9A9;
           // border-radius: 8px;
           background-image: url(../../assets/imgs/sunxinbao/juxing.png);
           background-size: 100% 74px;
           margin-left: 18px;
           float: right;
           text-align: center;
           font-size: 30px;
       }
       li:first-child{
           font-size: 30px;
           border: none;
           margin-left: -0.2rem;
           color: #797979;
           float: left;
           background-image: none;
       }
    }
    .active{
        color: #e30513;
        border: none;
        width: 152px;
        height: 74px;
        line-height: 74px;
        background-image: url(../../assets/imgs/sunxinbao/chooseBorder-L.png);
        background-size: 100% 74px;
    }
}
.certificate-type .certificateType-2{
    li{
        width: 136px;
        height: 60px;
        line-height: 60px;
        color: #333333;
        border: 1px solid #A9A9A9;
        border-radius: 8px;
        margin-left: 175px;
        float: left;
        text-align: center;
        font-size: 32px;
    }
    li:first-child{
        font-size: 30px;
        border: none;
        margin-left: -8px;
        color: #797979;
        float: left;
    }
    .active{
        color: #e30513;
        border: none;
        width: 140px;
        height: 64px;
        line-height: 64px;
        background-image: url(../../assets/imgs/sunxinbao/chooseBorder-L.png);
        background-size: 100% 64px;
    }
}
.certificateTypeTip2 {
    // margin-left: 3rem;
    font-size: 26px;
    color: #797979;
    span{
        color: #e30513;
    }
}
.certificateTypeTip {
    margin-left: 2.18rem;
    font-size: 26px;
    color: #797979;
    span{
        color: #e30513;
    }
}
.md-example-popup {
  position: relative;
  font-size: 28px;
  font-family: DINPro;
  font-weight: 500;
  box-sizing: border-box;
  //text-align: center;
  background-color: #fff;
}

.md-example-popup-center {
  padding: 50px;
}

.md-example-popup-top {
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #4a4c5b;
  color: #fff;
}

.md-example-popup-bottom {
  width: 100%;
  padding: 40px 35px;
  line-height: 0.6rem;
  p {
    line-height: 50px;
  }
}

.md-example-popup-left,
.md-example-popup-right {
  height: 100%;
  padding: 0 150px;
  display: flex;
  display:-webkit-flex;
  display:-webkit-box;
  align-items: center;
}
.tips {
  position: relative;
}
.md-example-child-landscape {
  .md-button {
    margin-bottom: 20px;
    .md-landscape-content {
      padding: 30px;
      font-size: 30px;
      line-height: 1.5;
      color: #666;
      p {
        margin-bottom: 30px;
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
.myPopup .md-popup-box {
  height: 70% !important;
}
.bankIcon {
  font-size: 40px;
  position: absolute;
  top: 0.45rem;
  color: #d7000f;
  right: 0.6rem;
}
</style>

<style lang="scss">
    .buttonarray .cardIcon {
        left:-75px !important;
        top:0.53rem !important;
    }
    .insuredButtonarray .cardIcon {
        left:-75px !important;
        top:0.53rem !important;
    }
    .box .md-field .md-field-content .emailAdd .md-field-item-content .md-field-item-title{
          color: #797979;
          width: 2.5rem !important;
    }
    .box-border .md-input-item .md-field-item-content{
    }
    .moreInfo .md-field-item .md-field-item-content{
        font-size: 30px;
        padding-right: 50px;
        .md-field-item-title{
            width: 5em !important;
            font-size: 30px;
            color: #797979;
        }
    }
    .moreInfo .insuredCertificateType .md-field-item .md-field-item-content{
        border-bottom: none;
    }
    .md-field-item .md-field-item-content .md-field-item-control .md-field-item-placeholder{
        font-size: 30px !important;
    }
    .box-border .proposerInfo .md-field-item .md-field-item-content .md-field-item-control{
         margin-left: 44px;
         .md-input-item-input{
            font-size: 30px;
            color: #333333 !important;
            text-align: left !important;
         }
    }
    .box-border .proposerInfo .md-field-item .md-field-item-content .md-field-item-title{
         color: #797979;
         font-size: 30px;
    }
    .box-border .relation-notself .certificate-type .md-field-item .md-field-item-content{
        padding-left: 0px;
    }
    .box-border .relation-notself .md-field-item .md-field-item-content .md-field-item-control{
        margin-left: 44px;
        input{
           font-size: 30px;
           text-align: left !important;
           color: #333 !important;
        }
    }
    .box-border .relation-notself .md-field-item .md-field-item-content .md-field-item-title{
        color: #797979;
        font-size: 30px;
    }
    .box-border .relation-notself .sex-date .md-field-item .md-field-item-content .md-field-item-control{
        text-align: left !important;
        margin-left: 44px !important;
    }
    .moreInfo .certificate-validity .md-field-item .md-field-item-content .md-field-item-title{
        width: 8em !important;
        color: #797979;
    }
    .moreInfo .md-field-item .md-field-item-content .md-field-item-control{
        text-align: left !important;
        margin-left: 44px;
    }
    .moreInfo .jobChoose .md-field-item .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .moreInfo .jobChoose .md-field-item .md-field-item-content .md-field-item-control{
        margin-left: 44px;
    }
    .moreInfo #proposerAddress1 .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .moreInfo #proposerAddress1 .md-field-item-content .md-field-item-control{
        margin-left: 0.44rem;
        margin-right: 50px;
        input{
          font-size: 30px;
          text-align: left !important;
          color: #333 !important;
        }
    }
    .moreInfo #proposerEmail .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .moreInfo #proposerEmail .md-field-item-content .md-field-item-control{
        margin-left: 0.44rem;
        margin-right: 50px;
        input{
          font-size: 30px;
          text-align: left !important;
          color: #333 !important;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          font-size: 30px;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-size: 30px;
        }

        :-ms-input-placeholder { /* Internet Explorer 10+ */
          font-size: 30px;
        }
    }
    .moreInfo .md-field-item .md-field-item-content{
        padding-right: 0px;
    }
    .moreInfo .insuredCertificateType .md-field-item .md-field-item-content .md-field-item-control{
        margin-left: 44px;
    }
    .moreInfo .insuredCertificateType .md-field-item .md-field-item-content .md-field-item-title{
        width: 8em !important;
        color: #797979;
    }
    .moreInfo .insuredJobChoose .md-field-item .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .moreInfo .insuredJobChoose .md-field-item .md-field-item-content .md-field-item-control{
        margin-left: 44px;
    }
    .moreInfo #insuredAddress1 .md-field-item-content .md-field-item-control{
        margin-left: 0.44rem;
        margin-right: 50px;
        input{
          font-size: 30px;
          text-align: left !important;
          color: #333 !important;
        }
    }
    .moreInfo #insuredAddress1 .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .moreInfo #insuredEmail .md-field-item-content .md-field-item-control{
        margin-left: 0.44rem;
        margin-right: 50px;
        input{
          font-size: 30px;
          text-align: left !important;
          color: #333 !important;
        }
    }
    .moreInfo #insuredEmail .md-field-item-content .md-field-item-title{
        width: 8em !important;
    }
    .browserDialog .md-popup .md-dialog-content .md-dialog-body{
        color:#666 !important;
        height: 260px;
        line-height: 260px !important;
        font-size: 40px;
        text-align: center;
        padding-top: 0px !important;
    }
    .browserDialog .md-popup .md-dialog-content .md-dialog-actions .md-dialog-btn:last-child{
        color:#999 !important;
    }
    .shunxinbao-detail {
      input.md-input-item-input::-webkit-input-placeholder {
          font-size: 0.4rem !important;
      }
      input.md-input-item-input::-moz-input-placeholder {
          font-size: 0.4rem !important;
      }
      input.md-input-item-input::-ms-input-placeholder {
          font-size: 0.4rem !important;
      }
    }
</style>
