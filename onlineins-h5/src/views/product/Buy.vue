<template>
  <div>
    <div class="tip-msg" v-if="isBrowser">请确认投保信息录入中默认的相关信息</div>
    <div class="box">
      <whirl v-if="showWhirl"></whirl>
      <error v-if="showError"></error>

      <md-field title="投保人信息" :class="setClass">
        <md-input-item
          title="姓名"
          :maxlength="14"
          placeholder="2位以上汉字"
          v-model="proposerName"
          v-bind:disabled="dataForm"
          ref="proposerName"
          id="proposerName"
          name="proposerName"
          @blur="checkName(proposerName,$event)"
        ></md-input-item>

        <md-input-item disabled title="证件类型" placeholder="身份证">身份证</md-input-item>
        <md-input-item
          ref="input0"
          title="证件号"
          placeholder="请输入"
          v-bind:disabled="cardNoDisable"
          is-amount
          v-model="proposerCard"
          @blur="cardNum(proposerCard,$event)"
          name="proposerCard"
          id="proposerCard"
          :maxlength="18"
        >
          <md-icon
            v-show="hideCamera&& isBrowser"
            name="camera"
            slot="right"
            id="buttons"
            @click.native="showCamera(1)"
            size="lg"
          ></md-icon>
        </md-input-item>
        <md-field-item title="证件有效期类型" solid>
          <div class="buttonarray">
            <md-icon
              name="info-solid"
              size="lg"
              color="#dbdbdb"
              class="cardIcon"
              @click="showIdCardTip"
            ></md-icon>
            <div
              :class="proposerChooseIndex==1?'active' : ''"
              @click="choosetype(1,'proposerChooseIndex')"
            >非长期</div>
            <div
              :class="proposerChooseIndex==2?'active' : ''"
              @click="choosetype(2,'proposerChooseIndex')"
            >长期</div>
          </div>
        </md-field-item>

        <!--<md-field-item
                    v-if="proposerChooseIndex==1"
                    name="eff-date"
                    arrow="arrow-right"
                    placeholder="请选择"
                    title="证件有效起期"
                    align="left"
                    :content="datePickerStartValue"
                    @click.native="showmodel('isDatePickerShow','datePickerStartValue')">
        </md-field-item>-->
        <!--   <md-date-picker
                       ref="datePicker"
                       v-model="isDatePickerShow"
                       type="custom"
                       :max-date="maxDate"
                       title="证件有效起期"
                       :text-render="textRender"
                       :custom-types="['yyyy', 'MM','dd']"
                       :default-date="currentDate"
                       @change="onDatePickerChange"
                       @confirm="onDatePickerConfirmStart"
        ></md-date-picker>-->

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

        <md-input-item
          title="联系电话"
          placeholder="11位手机号"
          ref="proposerPhone"
          type="phone"
          v-model="proposerPhone"
          name="proposerPhone"
          id="proposerPhone"
          v-bind:disabled="proposerPhoneDisable"
          @blur="checkPhone(proposerPhone,$event);synchroInfo()"
        ></md-input-item>
        <md-input-item
          title="电子邮箱"
          class="emailAdd"
          placeholder="接收电子保单及相关通知书"
          v-model="proposerEmail"
          id="proposerEmail"
          name="proposerEmail"
          @blur="checkEmail(proposerEmail,$event);synchroInfo()"
        >
        <md-icon
            name="info-solid"
            size="lg"
            color="#dbdbdb"
            class="cardIcon"
            slot="left"
            @click="showEmailTip"
        ></md-icon>
        </md-input-item>
        <div v-if="curRiskCode === '1315'||curRiskCode === '1314'">
          <md-input-item
            title="身高"
            placeholder="以厘米为单位"
            v-model="height"
            id="height"
            type="digit"
            @blur="checkHeight(height)"
            :maxlength="3"
          ></md-input-item>
          <md-input-item
            title="体重"
            class="myWeight"
            placeholder="以千克为单位"
            v-model="weight"
            id="weight"
            type="digit"
            @blur="checkWeight(weight)"
            :maxlength="3"
          ></md-input-item>
        </div>

        <md-field-item
          name="area"
          title="所在地区"
          arrow="arrow-right"
          align="left"
          placeholder="请选择"
          :content="proposerAddressStr"
          @click="isaddressDataShow = !isaddressDataShow"
        ></md-field-item>
        <!--<md-tab-picker-->
        <!--v-model="isaddressDataShow"-->
        <!--v-if="showInureCity == false&&(curRiskCode == 5313||curRiskCode == 5314||curRiskCode == 5318)"-->
        <!--:data="addressData_new"-->
        <!--title="请选择地区"-->
        <!--@change="addressPropHandleChange"-->
        <!--/>-->
        <TabpickerSup
          v-model="isaddressDataShow"
          v-if="showInureCity == false"
          :data="addressScreen"
          title="请选择地区"
          @change="addressPropHandleChange"
        />
        <md-input-item
          title="详细地址"
          class="detailHome detailAdd"
          placeholder="请填写详细的地址"
          v-model="proposerAddress1"
          name="proposerAddress1"
          @blur="getTi(proposerAddress1,$event);synchroInfo()"
          id="proposerAddress1"
          :maxlength="128"
        >
          <md-icon
            name="info-solid"
            size="lg"
            color="#dbdbdb"
            class="cardIcon"
            slot="left"
            @click="showDetailTip"
          ></md-icon>
        </md-input-item>
        <!-- <md-input-item
                     type="digit"
                     :maxlength="6"
                     title="邮编"
                     placeholder="请输入您的邮编" v-model="email" id="email" name="email"
        @blur="checkEmailCode(email,$event)"></md-input-item>-->
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
          v-if="curRiskCode == '5315'|| curRiskCode == '5316' || curRiskCode == '5032' || curRiskCode == '5323'|| curRiskCode == '5324' || curRiskCode == '5325'"
          v-model="isjobShow"
          :data="jobmedicalData"
          title="请选择职业"
          @change="handleChangeProp"
        />
        <md-tab-picker
          v-else-if="curRiskCode == '1037' || curRiskCode == '1318'"
          v-model="isjobShow"
          :data="job6Data"
          title="请选择职业"
          @change="handleChangeProp"
        />
        <md-tab-picker
          v-else-if="curRiskCode == '5321'"
          v-model="isjobShow"
          :data="job4Data"
          title="请选择职业"
          @change="handleChangeProp"
        />
        <md-tab-picker
          v-else
          v-model="isjobShow"
          :data="jobData"
          title="请选择职业"
          @change="handleChangeProp"
        />

        <div class="juMin">
          <md-field-item
            name="area"
            title="税收居民身份"
            arrow="arrow-right"
            align="left"
            :content="jumingDataValue"
            @click.native="showmodel('isjumingDataShow','jumingDataValue')"
          >
              仅为中国税收居民
            <!--{{jumingDataValue == 0 ? '仅为中国税收居民' : jumingDataValue == 1 ? '仅为非居民' : jumingDataValue == 2 ?-->
            <!--'中国大陆及其他辖区税收居民':''}}-->
          </md-field-item>
          <md-icon
            :name="infoSolid"
            size="lg"
            class="iconTiShi"
            color="#dbdbdb"
            id="proposerIcon"
            @click.stop="taxDialog.open = true"
          ></md-icon>
        </div>
        <md-picker
          v-model="isjumingDataShow"
          :data="jumingData"
          title="税收居民身份"
          @confirm="certificateConfirm"
        ></md-picker>
      </md-field>


      <md-field title="被保人信息" class="block">
        <md-field-item
          title="为谁投保"
          arrow="arrow-right"
          :content="relation"
          placeholder="请选择"
          @click="showmodel('isRelationShow','relation')"
          solid
        ></md-field-item>
        <md-picker
          v-model="isRelationShow"
          :data="pickerData"
          ref="myPicker"
          v-if="chooseRelationPicker"
          title="为谁投保"
          @confirm="relationConfirm"
        ></md-picker>
        <div v-if="insuredRelationToAppnt!= '00'" class="cdType">
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
            <div class="contacts-icon">
              <img @click="onContactIcon" src="@/assets/imgs/contacts-icon.png" alt>
            </div>
          </div>
          <!--v-if="curRiskCode == 5307  || curRiskCode == 5305"-->
          <md-field-item
            v-if="insuredRelationToAppnt == '03'"
            title="证件类型"
            arrow="arrow-right"
            placeholder="请选择"
            :content="insureIdType"
            @click="showmodel('isCertificateShow')"
            solid
          ></md-field-item>
          <md-input-item v-else disabled title="证件类型" placeholder="身份证">身份证</md-input-item>
          <md-picker
            v-model="isCertificateShow"
            :data="certificateTypeData"
            title="证件类型"
            @confirm="certificateConfirmChild"
          ></md-picker>
          <md-icon
            v-if="insuredRelationToAppnt == '03'&& (insureIdTypeCode == '4' || insureIdTypeCode == '5')"
            name="question"
            size="lg"
            class="iconTip"
            color="#dbdbdb"
            @click="showTip"
          ></md-icon>
          <!--性别  出生日期-->
          <div v-if="showSexAndBirth == true && insuredRelationToAppnt == '03'">
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
            ref="input1"
            title="证件号"
            placeholder="请输入"
            is-amount
            v-model="insuredCard"
            id="insuredCard"
            name="insuredCard"
            @blur="cardNum(insuredCard,$event)"
            :maxlength="18"
          >
            <md-icon
              name="camera"
              slot="right"
              @click.native="showCamera(3)"
              size="lg"
              v-if="(insureIdTypeCode != '4' && insureIdTypeCode != '5') && isBrowser"
            ></md-icon>
          </md-input-item>

          <div v-if="insureIdTypeCode == '0'">
            <md-field-item title="证件有效期类型" solid>
              <div class="buttonarray">
                <div
                  :class="insuredChooseIndex==1?'active' : ''"
                  @click="choosetype(1,'insuredChooseIndex')"
                >非长期</div>
                <div
                  :class="insuredChooseIndex==2?'active' : ''"
                  @click="choosetype(2,'insuredChooseIndex')"
                >长期</div>
              </div>
            </md-field-item>

            <!--<md-field-item
                            v-if="insuredChooseIndex==1"
                            name="eff-date"
                            title="证件有效起期"
                            arrow="arrow-right"
                            align="left"
                            placeholder="请选择"
                            :content="insurePickerStartValue"
                            @click.native="showmodel('isDatePickerShowInsureStart','insurePickerStartValue')">
            </md-field-item>-->
            <!-- <md-date-picker
                             ref="datePicker"
                             v-model="isDatePickerShowInsureStart"
                             type="custom"
                             :max-date="maxDate"
                             title="证件有效起期"
                             :text-render="textRender"
                             :custom-types="['yyyy', 'MM','dd']"
                             :default-date="currentDate"
                             @change="onDatePickerChange"
                             @confirm="onDatePickerConfirmStartInsure"
            ></md-date-picker>-->

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

          <div id="onagreeinfo" v-if="insuredRelationToAppnt=='03'">
            <div class="onagreeinfo-content">
              <div class="onagreeinfo-title">详细地址、手机号、邮箱是否同投保人</div>
              <div class="onagreeinfo-control">
                <div class="onagreeinfo-button">
                  <div :class="chooseIndex==1?'infoactive' : ''" @click="onAgreeInfoChange(1)">是</div>
                  <div :class="chooseIndex==2?'infoactive' : ''" @click="onAgreeInfoChange(2)">否</div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="onagreeinfo"
            v-else-if="insuredRelationToAppnt!='00' && insuredRelationToAppnt!='03'"
          >
            <div class="onagreeinfo-content">
              <div class="onagreeinfo-title">详细地址、邮箱是否同投保人</div>
              <div class="onagreeinfo-control">
                <div class="onagreeinfo-button">
                  <div :class="chooseIndex==1?'infoactive' : ''" @click="onAgreeInfoChange(1)">是</div>
                  <div :class="chooseIndex==2?'infoactive' : ''" @click="onAgreeInfoChange(2)">否</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="curRiskCode != 5307 || showSexAndBirth == true">
            <md-input-item
              title="联系电话"
              placeholder="11位手机号"
              type="phone"
              v-model="insuredPhone"
              name="insuredPhone"
              @blur="checkPhone(insuredPhone,$event)"
              id="insuredPhone"
            ></md-input-item>
            <md-input-item
              title="电子邮箱"
              placeholder="用于接收电子保单"
              v-model="insuredEmail"
              class="myEmailAdd"
              id="insuredEmail"
              name="insuredEmail"
              @blur="checkEmail(insuredEmail,$event)"
            ></md-input-item>
          </div>
          <!-- <div v-if="curRiskCode === '5313'||curRiskCode === '5314'||curRiskCode === '5318'||curRiskCode === '5315'||curRiskCode === '5316'||curRiskCode === '5305'">
                        <md-input-item
                            title="身高"
                            placeholder="以厘米为单位" v-model="insureHeight" id="insureHeight" type="digit"
                            @blur="checkHeight(insureHeight, $event, 'insureHeight')"
                            :maxlength="3"></md-input-item>
                        <md-input-item
                            title="体重"
                            class="myWeight"
                            placeholder="以千克为单位" v-model="insureWeight" id="insureWeight" type="digit"
                            @blur="checkWeight(insureWeight, $event, 'insureWeight')"
                            :maxlength="3"></md-input-item>
          </div>-->
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
          <md-input-item
            title="详细地址"
            class="detailHome detailAdd"
            placeholder="请填写详细的地址"
            v-model="insuredAddress1"
            name="insuredAddress1"
            @blur="getShi(insuredAddress1,$event)"
            id="insuredAddress1"
            :maxlength="128"
          ></md-input-item>
          <!-- <md-input-item
                         title="邮编"
                         type="digit"
                         :maxlength="6"
                         placeholder="请输入您的邮编" v-model="insureEmail" id="insureEmail" name="insureEmail"
          @blur="checkEmailCode(insureEmail,$event)"></md-input-item>-->

          <md-field-item
            name="area"
            title="职业"
            v-if="insureTrialAge >= 18 || riskCode == '5321'"
            arrow="arrow-right"
            placeholder="请选择"
            align="left"
            :content="insuredJobStr"
            @click="isjobShows = !isjobShows"
          ></md-field-item>

          <md-field-item
            name="area"
            title="职业"
            v-else
            arrow="arrow-right"
            placeholder="请选择"
            align="left"
            :content="insuredChildJob"
            @click="isjobShowQ = !isjobShowQ"
          ></md-field-item>
          <md-picker
            ref="job"
            v-model="isjobShowQ"
            :data="childJob"
            @confirm="onConfirmChildJob"
            title="请选择职业"
          ></md-picker>

          <md-tab-picker
            v-if="curRiskCode == '5315'|| curRiskCode == '5316'|| curRiskCode == '5032' || curRiskCode == '5323' || curRiskCode == '5324'|| curRiskCode == '5325'"
            ref="job"
            v-model="isjobShows"
            :data="jobmedicalInsureData"
            title="请选择职业"
            @change="handleChange"
          />
          <md-tab-picker
            v-else-if="curRiskCode == '1037' || curRiskCode == '1318'"
            ref="job"
            v-model="isjobShows"
            :data="job6InsureData"
            title="请选择职业"
            @change="handleChange"
          />
          <md-tab-picker
            v-else-if="curRiskCode == '5321'"
            ref="job"
            v-model="isjobShows"
            :data="job4InsureData"
            title="请选择职业"
            @change="handleChange"
          />
          <md-tab-picker
            v-else
            ref="job"
            v-model="isjobShows"
            :data="jobInsureData"
            title="请选择职业"
            @change="handleChange"
          />
          <div class="juMin">
            <md-field-item
              name="area"
              title="税收居民身份"
              arrow="arrow-right"
              align="left"
              :content="jumingDataValue1"
              @click.native="showmodel('isjumingDataShows','jumingDataValue1')"
            >
                仅为中国税收居民
              <!--{{jumingDataValue1 == 0 ? '仅为中国税收居民' : jumingDataValue1 == 1 ? '仅为非居民' : jumingDataValue1 ==-->
              <!--2?'中国大陆及其他辖区税收居民':''}}-->
            </md-field-item>
            <md-picker
              v-model="isjumingDataShows"
              :data="jumingData"
              title="税收居民身份"
              @confirm="certificateConfirmInsureTax"
            ></md-picker>
            <md-icon
              :name="infoSolid"
              size="lg"
              class="iconTiShi"
              color="#dbdbdb"
              id="insureIcon"
              @click.stop="taxDialog.open = true"
            ></md-icon>
          </div>
        </div>
        <div class="socialSecurity" v-if="socialSecurityFlag && curRiskCode != '5032'">
          <p>是否享有基本医疗保险或公费医疗</p>
          <p>{{ socialSecurity }}</p>
        </div>
      </md-field>
      <md-field title="受益人" class="block beneficiaryBlock" v-if="information">
        <md-icon
          name="question"
          size="lg"
          color="#dbdbdb"
          class="beneficiaryTip"
          @click="showBeneficiaryTip"
        ></md-icon>
        <md-field-item
          name="beneficiaryType"
          title="受益人"
          arrow="arrow-right"
          v-bind:disabled="showDeathDisabled"
          align="left"
          :content="beneficiaryValue"
          @click.native="showmodel('isbeneficiaryshow','beneficiaryValue')"
        ></md-field-item>

        <md-picker
          v-if="showDeath"
          v-model="isbeneficiaryshow"
          :data="beneficiaryData"
          @confirm="certificateConfirmBeneficiary"
        ></md-picker>
        <md-picker
          v-model="isbeneficiaryRealtionshow"
          :data="beneficiaryRealtionData"
          @confirm="beneficiaryArrayConfirm"
        ></md-picker>
      </md-field>
      <div class="md-example-child md-example-child-field md-example-child-field-0">
        <md-field
          v-for="(item,index) in beneficiaryArray"
          :key="index"
          :title="index==0? '第一受益人': index==1?'第二受益人': '第三受益人'"
          class="block"
          v-if="beneficiaryValue== '指定受益人'"
        >
          <div
            class="action-container"
            slot="action"
            @click="addbeneficiary()"
            v-if="index==0"
          >添加受益人</div>
          <div
            class="action-container"
            slot="action"
            @click="deletebeneficiary(index)"
            v-if="index!=0"
          >删除</div>
          <md-field-item
            v-if="beneficiaryValue== '指定受益人'"
            name="beneficiaryType"
            title="与被保人关系"
            arrow="arrow-right"
            placeholder="请选择"
            align="left"
            :content="item.beneficiaryRelation"
            @click.native="showmodel('isbeneficiaryRealtionshow','beneficiaryRelation',index)"
          ></md-field-item>
          <md-input-item
            v-if="beneficiaryValue== '指定受益人'"
            title="受益人名"
            :maxlength="15"
            placeholder="2位以上汉字"
            v-model="item.beneficiaryName"
            @blur="checkBeneficiaryName(item.beneficiaryName,$event)"
          ></md-input-item>
          <md-input-item
            v-if="beneficiaryValue== '指定受益人'"
            title="证件类型"
            disabled
            placeholder="身份证"
          >身份证</md-input-item>
          <md-input-item
            v-if="beneficiaryValue== '指定受益人'"
            ref="input2"
            title="证件号"
            placeholder="请输入"
            is-amount
            v-model="item.beneficiaryCertificateValue"
            @blur="cardNumBeneficary(item.beneficiaryCertificateValue)"
            :maxlength="18"
          ></md-input-item>
          <md-field-item
            v-if="beneficiaryValue== '指定受益人'"
            title="证件有效期类型"
            style="overflow: hidden;"
            solid
          >
            <div class="buttonarray">
              <div
                :class="item.beneficiaryChooseIndex==1?'active' : ''"
                @click="beneficiarychoosetype(1,'beneficiaryChooseIndex',index)"
              >非长期</div>
              <div
                :class="item.beneficiaryChooseIndex==2?'active' : ''"
                @click="beneficiarychoosetype(2,'beneficiaryChooseIndex',index)"
              >长期</div>
            </div>
          </md-field-item>
          <!-- <md-field-item
                         v-if="item.beneficiaryChooseIndex==1"
                         name="eff-date"
                         title="证件有效起期"
                         arrow="arrow-right"
                         placeholder="请选择"
                         align="left"
                         :content="item.beneficiaryCardStart"
                         @click.native="showmodel('isBeneficiaryDatePickerShow','beneficiaryCardStart',index)">
          </md-field-item>-->
          <md-date-picker
            ref="datePicker1"
            v-model="isBeneficiaryDatePickerShow"
            type="custom"
            :max-date="maxDate"
            :text-render="textRender"
            :custom-types="['yyyy', 'MM','dd']"
            :default-date="currentDate"
            @change="onDatePickerChange"
            @confirm="onBeneficiaryDatePickerConfirm"
          ></md-date-picker>

          <md-field-item
            v-if="item.beneficiaryChooseIndex==1"
            name="eff-date"
            title="证件有效止期"
            placeholder="请选择"
            arrow="arrow-right"
            align="left"
            :content="item.beneficiaryCardEnd"
            @click.native="showmodel('beneficiaryDateStopShow','beneficiaryCardEnd',index)"
          ></md-field-item>
          <md-date-picker
            ref="datePickerStop"
            v-model="beneficiaryDateStopShow"
            type="custom"
            :min-date="minDate"
            :text-render="textRender"
            :custom-types="['yyyy', 'MM','dd']"
            :default-date="currentDate"
            @change="onDatePickerChange"
            @confirm="onBeneficiaryDatePickerStopConfirm"
          ></md-date-picker>

          <md-input-item
            v-if="beneficiaryValue== '指定受益人'"
            title="手机号码"
            type="phone"
            placeholder="11位手机号"
            v-model="item.beneficiaryPhone"
            @blur="checkPhone(item.beneficiaryPhone)"
          ></md-input-item>
          <md-input-item
            v-if="beneficiaryValue== '指定受益人'"
            title="受益比例（%）"
            type="digit"
            :maxlength="3"
            placeholder="请输入受益比例"
            v-model="item.proportion"
            @blur="checkInputValue(item.proportion)"
          ></md-input-item>
        </md-field>
      </div>
      <md-field class="block" id="block"  v-if="curRiskCode === '5315'|| curRiskCode === '5316'|| curRiskCode === '5032' || curRiskCode === '5324'">
        <div class="renew">
          <p>申请自动连续投保<md-icon class="ifrenew" name="question" @click.native="showToast('ifrenewFlag')" size="lg"></md-icon></p>
          <ul>
            <li
              data-val="Y"
              :class="{active:(isMarriage === '2')}"
              @click="isMarriageHandleChoose($event,'2')"
            >是</li>
            <li
              data-val="N"
              :class="{active:(isMarriage === '1')}"
              @click="isMarriageHandleChoose($event,'1')"
            >否</li>
          </ul>
        </div>
        <!-- <div style="color:#ccc;line-height:18px;margin:8px auto;">为了确保您的保单成功承保，我们将对您提供的银行账户信息向相关机构查询真实性！</div> -->
      </md-field>

      <md-field title="风险抄录" class="block" v-if="curRiskCode == '1037'">
        <md-field-item
          name="area"
          title="风险抄录"
          arrow="arrow-right"
          placeholder="开始抄录"
          :content="confirmContent"
          align="left"
          @click="showPopUp1('bottom', 'statementShow')"
        ></md-field-item>
      </md-field>
      <md-field title="生存金领取方式" class="block" v-if="curRiskCode == '1037'">
        <md-field-item
          class="aliveWay"
          name="area"
          title="领取方式"
          arrow="arrow-right"
          align="left"
          :content="wnAliveWay"
        ></md-field-item>
      </md-field>
      <md-field title="生存金领取方式" class="block" v-if="curRiskCode == '1318'">
        <md-field-item
          class="aliveWay"
          name="area"
          title="领取方式"
          arrow="arrow-right"
          placeholder="请选择"
          align="left"
          :content="njAliveWay"
          @click="getAliveWay"
        ></md-field-item>
        <md-picker
          ref="policyChoose"
          v-model="isAliveWayShowQ"
          :data="aliveWay"
          @confirm="onConfirmAliveWay"
          title="请选择领取方式"
        ></md-picker>
      </md-field>
      <md-field title="双主险捆绑" class="block beneficiaryBlock"  v-if="curRiskCode == '1318'">
        <div class="md-example-child md-example-child-radio md-example-child-radio-0" @click="ifAlive(checked)">
            <div class="liveAgree">投保人及被保险人是否同意将生存利益转入万能险账户？（生存利益指以被保险人生存为给付条件的保险金。）</div>
            <md-radio v-if="ifChecked1" name="1" v-model="checked" label="是" @click="ifAlive(1)"/>
            <md-radio v-if="ifChecked0" name="0" v-model="checked" label="否" @click="ifAlive(0)" />
        </div>
        <md-field-item
          v-if="ifAliveShow"
          class="policyNo"
          name="area"
          title="万能险保单"
          arrow="arrow-right"
          placeholder="请选择"
          align="left"
          :content="njPolicyNumber"
          @click="getPolicyNo"
        ></md-field-item>
        <md-picker
          ref="policyChoose"
          v-model="ispolicyNoShowQ"
          :data="policyNo"
          @confirm="onConfirmPolicyNo"
          title="请选择保单"
        ></md-picker>
        <md-field class="block" id="block"  v-if="curRiskCode == '1318'"></md-field>
      </md-field>

      <md-agree
        v-model="agreeConf.checked"
        id="readContent"
        :disabled="agreeConf.disabled"
        :size="agreeConf.size"
        @change="onChange(agreeConf.name, agreeConf.checked, $event)"
      >
        <span v-if="curRiskCode == '1037'">本人已详细阅读<span class="userAdd" @click="goPersonalReminder">《人身保险投保提示书（适用网络销售）》</span>第六条相关内容，并由本人完成"本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。"38字的录入</span>
        <span v-else>我已阅读并确认</span>
        <span class="userAdd" @click="showPopUp('bottom', 'agreementShow')">《用户协议》</span>
        <span class="userAdd" @click="showPopUp('bottom', 'privateShow')">《隐私声明》</span>
        <span class="userAdd" v-if="riskCode == '5032'" @click="goProductRate">《产品费率表》</span>
      </md-agree>
      <md-field class="block" id="block"></md-field>
      <!-- <md-action-bar :actions="actionBarData" @click="jsubmit">
                 <div class="footerbox">
                     <small class="small">￥</small>
                     <div class="btnsize">{{premium.toFixed(2)}}</div>

                 </div>

      </md-action-bar>-->

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
      <md-popup v-model="isPopupShow1.bottom" position="bottom" class="statementPopup">
        <Statement :statementShow="statementShow" @confirmDone="ConfirmDone($event)" @cancelStatement="getCancelStatement($event)"/>
      </md-popup>
      <div class="contentBottom">
        <p class="bottom1" ref="bottom1">
          <span class="zongHe">￥</span>
          <span class="price">{{premium.toFixed(2)}}</span>
        </p>
        <a class="justDown" @click="jsubmit">下一步</a>
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
      <md-dialog :closable="true" v-model="iconDialog.open" :btns="iconDialog.btns">
        <p>您输入的被保人年龄与试算年龄不一致，如需调整，请至试算页面</p>
      </md-dialog>
      <md-dialog :closable="true" v-model="questionDialog.open" :btns="questionDialog.btns">
        <p>转人工核保成功</p>
      </md-dialog>
      <md-dialog :closable="true" v-model="trialDialog.open" :btns="trialDialog.btns">
        <p>试算保费与实际投保保费不符，请重新保费试算</p>
      </md-dialog>
      <md-dialog :closable="true" v-model="aliveWayDialog.open" :btns="aliveWayDialog.btns">
        <p>您暂无购买万能险，请先购买万能险</p>
      </md-dialog>
      <md-dialog class="jobMsgDialog" :closable="true" v-model="jobMsgDialog.open" :btns="jobMsgDialog.btns">
        <p>您的职业等级不符合所选附加险{{fjDutyName}}的投保规则，是否移除该附加险责任，继续投保？
          (<span class="ifChoose">选择否：当前订单将作废，您可重新投保；选择是：将为您移除不符合的附加险责任进行投保；</span>)
          </p>
      </md-dialog>
      <md-dialog class="jobMsgDialog" :closable="true" v-model="jobMsgDialog1.open" :btns="jobMsgDialog1.btns">
        <p>
              您已有保障中或待承保的医惠通保单，不可重复投保，是否移除附加医惠通责任，继续投保？
              (<span class="ifChoose">选择否：当前订单将作废，您可重新投保；选择是：将为您移除不符合的附加险责任进行投保；</span>)
          </p>
      </md-dialog>
      <md-dialog title="提示" :closable="true" v-model="removeTipDialog.open" :btns="removeTipDialog.btns">
        <p>已为您移除附加医惠通责任，并重新计算保费，请重新点击"下一步"完成投保。</p>
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
        ref="contactsMod"
        v-if="showContacts"
        v-model="isContactsShow"
        :data="contactsData"
        @confirm="contactsConfirm"
        title="常用被保人"
      ></md-picker>

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
  Captcha,
  Radio
} from "mand-mobile";
import Vue from "vue";
import Whirl from "@/components/Whirl";
import Error from "@/components/Error";
import job4 from "@/static/job4";
import job6 from '@/static/job6';
import job8 from "@/static/job8";
import job10 from "@/static/job10";
import addressdata from "@/static/addressInsure";
import addressdata_new from "@/static/addressInsure_new";
import addressdataAll from "@/static/addresstest";
import agentAddressData from "@/static/agentAddressInsure";
import Settings from "~/settings.json";
import { getRiskTypeName } from "@/utils/dictionary"; // 神策数据字典
import Agreement from "@/components/BuyComp/Agreement";
import TabpickerSup from "@/components/BuyComp/TabpickerSup";
import TipComp from "@/components/BuyComp/TipComp";
import Statement from "@/components/Universalinsurance/Statementcopy";
import 'babel-polyfill'

export default {
  name: "ProductBuy",
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
    [Radio.name]: Radio,
    Whirl,
    Error,
    Agreement,
    TabpickerSup,
    TipComp,
    Statement
  },
  data() {
    return {
      ifConfirmDone: false,
      liveGetMode: '',
      ifChecked1: true,
      ifChecked0: true,
      njPolicyNumber: '',
      njAliveWay: '',
      wnAliveWay: '累积生息',
      appntName: '',
      appntIdNo: '',
      insurerName: '',
      insuredIdNo: '',
      hasNotPolicy: false,
      checked: '1',
      fjDutyFlag: '',
      fjDutyName: '',
      ifGift: '',
      deviceId: '',
      wxPayFlag: false,
      showWxPay: false,
      chooseIndex: 2,
      anonymousId: "", //神測匿名id
      renew: "", //是否续保
      renewFlag: null, //续保value
      renewType: true, //埋点是否续保
      socialSecurity: "是", //社保
      socialSecurityFlag: null, //社保val
      socialSecurityType: true, //埋点社保
      isPopupShow: {},
      isPopupShow1: {},
      statementShow: true,
      confirmContent: '',
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
      showError: false,
      showWhirl: false,
      attachmentUrl: "",
      key: 0,
      basicDialog: {
        open: false,
        msg: "",
        btns: [
          {
            text: "确认",
            handler: this.onBasicConfirm
          }
        ]
      },
      iconDialog: {
        open: false,
        btns: [
          {
            text: "我知道了",
            handler: this.closeDialog
          },
          {
            text: "前去调整",
            handler: this.goTrial
          }
        ]
      },
        jobMsgDialog: {
          open: false,
          btns: [
            {
              text: "否",
              handler: this.goTrial
            },
            {
              text: "是",
              handler: this.reTrial
            }
          ]
        },
        jobMsgDialog1: {
          open: false,
          btns: [
            {
              text: "否",
              handler: this.goDetail
            },
            {
              text: "是",
              handler: this.reTrial
            }
          ]
        },
      trialDialog: {
        open: false,
        btns: [
          {
            text: "重新试算保费",
            handler: this.calePremiun_temp
          }
        ]
      },
      aliveWayDialog: {
        open: false,
        btns: [
          {
            text: "立即购买",
            handler: this.goXingzuanDetail
          }
        ]
      },
	  removeTipDialog: {
        open: false,
        btns: [
          {
            text: "我知道了",
            handler: this.closeTipDialog
          }
        ]
      },
      taxDialog: {
        open: false,
        btns: [
          {
            text: "确认",
            handler: this.onBasicConfirm
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
      // 受益人信息
      beneficiaryArray: [
        {
          beneficiaryRelation: "",
          beneficiaryName: "",
          beneficiaryCertificateType: "",
          beneficiaryCertificateValue: "",
          beneficiaryChooseIndex: 1,
          beneficiaryCardType: "",
          beneficiaryCardStart: "",
          beneficiaryCardEnd: "",
          beneficiaryPhone: "",
          proportion: "",
          grade: "",
          relationCode: "",
          relationValue: ""
        }
      ],
      jumingDataValue: "0",
      jumingDataValue1: "0",
      infoSolid: "info-solid",
      insuredCertificateTypeValue: "",
      currentDate: new Date(),
      isjumingDataShows: false,
      relation: "",
      bankvalue: "",
      bankAccNo: "",
      bankAccNo1: "",
      phoneValue: 155354832,
      addressDataValue: [],
      isDatePickerShow: false,
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
      datePickerValue: "",
      // 投保人证件有效期起期
      datePickerStartValue: "",
      // 投保人证件有效期止期
      datePickerEndValue: "",
      // 被保人证件有效期起期
      insurePickerStartValue: "",
      // 被保人证件有效期止期
      insurePickerEndValue: "",
      beneficiaryValue: "法定受益人",
      datePickerValue2: "仅为中国税收居民",
      beneficiaryRelation: "",
      isPickerShow: false,
      isCertificateShow: false,
      ocrData: null,
      actionBarData: [
        {
          text: "下一步",
          onClick: function() {}
        }
      ],
      certificateValue: "请选择",
      pickerData: [],
      certificateTypeData: [],
      jumingData: [
        [
          { text: "仅为中国税收居民", value: 0, type: "propsercrsIdType" }
          //                    {text: '仅为非居民', value: 1, type: 'propsercrsIdType'},
          //                    {text: '中国大陆及其他辖区税收居民', value: 2, type: 'propsercrsIdType'}
        ]
      ],
      beneficiaryData: [[{ text: "法定受益人" }, { text: "指定受益人" }]],
      beneficiaryRealtionData: [
        [
          { text: "配偶", value: "01" },
          { text: "父母", value: "02" },
          {
            text: "子女",
            value: "03"
          }
        ]
      ],
      pickerData0: [[{ label: "男", value: "0" }, { label: "女", value: "1" }]],
      addressData: addressdata,
      addressData_new: addressdata_new,
      agentAddressData: agentAddressData,
      newAgentAddressData: {
        name: "job",
        label: "请选择",
        options: [
          {
            value: "",
            label: "",
            children: {
              name: "address1",
              label: "请选择",
              options: []
            }
          }
        ]
      },
      areaCode: "", //代理人地区code
      addressScreen: addressdata,
      job4Data: job8,
      job4InsureData: job8,
      jobData: job8,
      jobInsureData: job8,
      job6Data: job6,
      job6InsureData: job6,
      jobmedicalData: job10,
      jobmedicalInsureData: job10,
      pickerDefaultIndex: [0, 0, 0],
      pickindex: [0, 0],
      // 保费
      premium: 0,
      cvaliDate: "",
      photoUrl: "",
      applyDate: "",
      photoFormat: "",
      orderContent: "",
      riskInfo: {},
      bnRiskInfoList: [],
      riskName: "",
      marriage: "",
      isMarriage: "",
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
      socialData: [[{ text: "有", value: 0 }, { text: "否", value: 1 }]],
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
      aliveWay: [
        [
            {value:1,label:"累积生息"},
            {value:2,label:"自行领取"},
            {value:3,label:"抵交保费"},
            {value:4,label:"定期转账"},
            {value:7,label:"转入万能险"}
        ]
      ],
      policyNo: [
        []
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
      relProductId: "",
      product_id: "",
      agentCode: "",
      beneficiaryDateStopShow: false,
      orderAdd: "",
      humanNucleusAdd: "",
      email: "",
      insureEmail: "",
      showShi: true,
      insuredLiveCity: "",
      proposerLiveCity: "",
      insuredWork: "",
      proposerWork: "",
      proposerDateFlag: "",
      insureDateFlag: "",
      beneficiaryDateFlag: "",
      curRiskCode: "",
      riskCode: "",
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
      ispolicyNoShowQ: false,
      isAliveWayShowQ: false,
      ifAliveShow: true,
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
      contactsData: [],
      isBrowser: true,
      isIosShow: false,
      isMiniApp: false,
      isBnMiniApp: false,
      underwriteInfoData: {},
      ZNHBbodyInfoData: {},
      questionDialog: {
        open: false,
        btns: [
          {
            text: "返回首页",
            handler: this.goHome
          }
        ]
      },
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
      questionImpartInfoList:[],
      setClass:'block',
	  information: true
    };
  },
  created() {
    this.riskCode = localStorage.getItem("riskCode");
    this.isBrowser = this.$app.isBrowser();
    if(this.$app.isMiniProgram()){
        this.isbn=this.$app.isBnMiniApp()?'1':'0';
    }
    this.agentCode = this.$router.query("agentCode");
    this.product_id = this.$router.query("product_id");
    this.areaCode = JSON.parse(localStorage.getItem("areaCode"));
    if(localStorage.getItem("renew")){
        this.renew = localStorage.getItem("renew")
    }
    if(localStorage.getItem("renewFlag")){
        this.renewFlag = localStorage.getItem("renewFlag")
    }
    if (this.riskCode === '5032' || this.riskCode === '5315' || this.riskCode === '5316' || this.riskCode === '5325') {
      this.information = false
    }
    window.localStorage.setItem(
      "IS_SOCIAL_SECURITY",
      JSON.stringify(this.renew)
    );
    window.localStorage.setItem(
      "IS_SOCIAL_SECURITY_VAL",
      JSON.stringify(this.renewFlag)
    );
    if(this.riskCode == "1318"){
       this.relProductId = window.localStorage.getItem("relProductId");
    }
    this.ifGift = window.localStorage.getItem("ifGift");
    if(this.riskCode == "1037"){
        this.questionImpartInfoList = localStorage.getItem("questionImpartInfolist")
          ? JSON.parse(localStorage.getItem("questionImpartInfolist")) : []
        if(this.questionImpartInfoList.length == 0){
            if (this.agentCode==='') {
                window.location.href =
                     this.$router.siteUrl() +
                     "/product/Detail.html?product_id=" +
                     this.product_id;
            }else{
                window.location.href =
                     this.$router.siteUrl() +
                     "/product/Detail.html?product_id=" +
                     this.product_id +
                     "&agentCode=" +
                     this.agentCode;
            }
        }
    }
    localStorage.removeItem("questionImpartInfolist");
    this.agentAreaCode();
    this.isMiniApp = this.$app.isMiniProgram();
    this.isBnMiniApp = this.$app.isBnMiniApp();
    this.$app.wxProductDetail(this.product_id, 1);
    this.localdata = JSON.parse(localStorage.getItem("PAWithRule"));
    this.$app.getUserCode(userCode => {
    //顺心保如果没有登录，调用小程序登录
      /*if (!userCode&&this.isMiniApp&&this.isBnMiniApp) {
        let that = this;
        let url = that.$router.siteUrl() +'/product/Buy.html?product_id=' + that.product_id+'&agentCode='+that.agentCode;
        let u= encodeURIComponent(that.$router.siteUrl()+'/mp/MpHref.html?u='+encodeURIComponent(url));
        wx.miniProgram.navigateTo({url:`/pages/user/login?a=h5login&u=${u}`});
        return;
      }*/
    if (localStorage.getItem("underwriteInfo" + userCode + this.product_id)) {
      this.underwriteInfoData = JSON.parse(localStorage.getItem("underwriteInfo" + userCode + this.product_id)) || {};
      if (this.underwriteInfoData.questionnaireNo) {
        this.getStatusByQuestionNo()
      }
    }
  });
    this.ZNHBbodyInfoData = JSON.parse(localStorage.getItem("ZNHBbodyInfo")) || {};
    this.riskName = JSON.parse(window.localStorage.getItem("riskName"));
    document.title = this.riskName;
    if (this.riskCode != "5321") {
      this.insureTrialAge = this.localdata.insuredInfo && this.localdata.insuredInfo.age || '';
    }
    this.getRiskCode(); //获取产品基本信息
    let prem = 0;
    if (this.riskCode != "5321") {
      for (let i = 0; i < this.localdata.policyInfoList.length; i++) {
        prem += this.localdata.policyInfoList[i].prem - 0;
      }
    }
    this.premium = prem;

    //            this.getUserCode() //获取代理人编码
    if (this.agentCode === "") {
      this.orderAdd = "AgainOrderPayment.html?product_id=" + this.product_id;
      // this.orderAdd = 'AgainOrderPayment?product_id=' + this.product_id;
    } else {
      this.orderAdd =
        "AgainOrderPayment.html?product_id=" +
        this.product_id +
        "&agentCode=" +
        this.agentCode;
      // this.orderAdd = 'AgainOrderPayment?product_id=' + this.product_id + "&agentCode=" + this.agentCode;
    }
    this.loadContactsData();
    let _this = this;
    sensors.quick("isReady", function() {
      _this.anonymousId = sensors.quick("getAnonymousID");
      console.log("1", _this.anonymousId);
    });
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        _this.isIosShow = true
    }
    if(this.$app.isBrowser()){
        this.$app.getDeviceNo((deviceNo, appDeviceNo) => {
            console.log("123   "+deviceNo);
            console.log("321   "+appDeviceNo)
            console.log("ios 内" + _this.isIosShow)
            if(appDeviceNo){
                _this.deviceId = appDeviceNo;
            }else if(_this.isIosShow){
                //ios 老版本 deviceNo 为百小达所传设备id不需要改变
                _this.deviceId = deviceNo;
            }else{
                //Android 体内老版本则使用神策的匿名id
                _this.deviceId = _this.anonymousId;
            }
            console.log("987   "+ _this.deviceId);
        });
    }else{
        _this.deviceId = _this.anonymousId;
    }

  },
  mounted() {
    if(this.riskCode == "1037"){
      let tempInfo1 = JSON.parse(window.localStorage.getItem("tempInfo1318"));
      for(let key in tempInfo1){
          this[key] = tempInfo1[key]
      }
      this.calePremiun();
    }else if(this.riskCode == "1318"){
      let tempInfo2 = JSON.parse(window.localStorage.getItem("tempInfo1037"));
      for(let key in tempInfo2){
          this[key] = tempInfo2[key]
      }
      this.calePremiun();
    }
    if(process.env.NODE_ENV !== 'production'){
      this.setClass='block watermark';
    }
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
      if (this.curRiskCode === "1315" || this.curRiskCode === "1314") {
        return this.proposerAddressPar.map(item => item.label).join("-");
      } else {
        return this.proposerAddress.map(item => item.label).join("-");
      }
    }
  },
  methods: {
    showPopUp1(type, name) {
      this.statementShow = true;
      this.$set(this.isPopupShow1, type, true);
    },
    getCancelStatement(value){
      this.$set(this.isPopupShow1, "bottom", value)
    },
    ConfirmDone(value){
      this.ifConfirmDone = value;
      this.confirmContent = "已抄录";
    },
    goProductRate(){
        this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/01/20200108/1/onlineins/onlineins_1_1_20200108152633452.pdf");
    },
    goPersonalReminder(){  //跳转人身险风险提示书
        this.$app.goPdfView("https://yxfile.aeonlife.com.cn/doc/2020/02/20200225/1/onlineins/onlineins_1_1_20200225172041423.pdf");
    },
    getStatusByQuestionNo () { // 对于用户肥常规操作的处理，智能核保后返回返回返回
        this.$request({
          url: `/ins/order/getStatusByQuestionNo/${this.underwriteInfoData.questionnaireNo}`,
          successFn: data => {
            if (data) {
                if (data.status == '3' || data.status == '6') { // data.status == '3' || data.status == '6' 待支付
                    Dialog.confirm({
                      title: "提示",
                      content: "<span style='padding-bottom: 20px;'>您的本次投保订单已生成，请直接支付</span>",
                      confirmText: "去支付",
                      cancelText: "返回试算",
                      onConfirm: () => {
                        location.href = `/product/AgainOrderPayment.html?orderNo=${data.orderNo}&product_id=${this.product_id}`;
                        return false;
                      },
                      onCancel: () => {
                        location.href = `/product/Trial.html?orderNo=${data.orderNo}&product_id=${this.product_id}`;
                        return false;
                      }
                    });
                } else if (data.status == '8') { // 8 承保成功
                    let cps_secondaryDistributor = localStorage.getItem("cps_secondaryDistributor") || "";
                    Dialog.alert({
                      title: "提示",
                      content: "<span style='padding-bottom: 20px;'>您的本次投保订单已完成支付</span>",
                      confirmText: "我知道了",
                      onConfirm: () => {
                        location.href = `/product/Detail.html?product_id=${this.product_id}&secondaryDistributor=${cps_secondaryDistributor}`;
                        return false;
                      }
                    });
                } else if (data.status == '4' || data.status == '9' || data.status == '10') {
                    // 9 已撤單 4转人核失败 10已终止  ------------------您的订单已结束
                    let cps_secondaryDistributor = localStorage.getItem("cps_secondaryDistributor") || "";
                    Dialog.alert({
                        title: "提示",
                        content: "<span style='padding-bottom: 20px;'>您的订单已结束</span>",
                        confirmText: "再投一单",
                        onConfirm: () => {
                            location.href = `/product/Detail.html?product_id=${this.product_id}&secondaryDistributor=${cps_secondaryDistributor}`;
                            return false;
                        }
                    });
                } else if (data.status == '2' || data.status == '5' || data.status == '7') {
                    // 2 自核失败 \5转人核成功 \7 承包中  ----------------您的订单处理中
                    let cps_secondaryDistributor = localStorage.getItem("cps_secondaryDistributor") || "";
                    Dialog.alert({
                        title: "提示",
                        content: "<span style='padding-bottom: 20px;'>您的订单处理中</span>",
                        confirmText: "再投一单",
                        onConfirm: () => {
                            location.href = `/product/Detail.html?product_id=${this.product_id}&secondaryDistributor=${cps_secondaryDistributor}`;
                            return false;
                        }
                    });
                }
            }
          }
        });
    },
    //续保
    isMarriageHandleChoose(e, index) {
      this.isMarriage = index;
      this.renewFlag = e.target.dataset.val;
      this.renewFlag == "Y" ? (this.renew = "是") : (this.renew = "否");
      this.renewFlag == "Y"
        ? (this.renewType = true)
        : (this.renewType = false);
      window.localStorage.setItem(
        "IS_SOCIAL_SECURITY",
        JSON.stringify(this.renew)
      );
      window.localStorage.setItem(
        "IS_SOCIAL_SECURITY_VAL",
        JSON.stringify(this.renewFlag)
      );
    },
    // 证件有效期类型提示信息
    showIdCardTip() {
      this.$refs["tipComp"].showIdCardTip();
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
      if (this.agentCode) {
        this.addressScreen = this.newAgentAddressData;
      } else if (
        this.curRiskCode == 5313 ||
        this.curRiskCode == 5314 ||
        this.curRiskCode == 5317 ||
        this.curRiskCode == 5318 ||
        this.curRiskCode == 5315 ||
        this.curRiskCode == 5316 ||
        this.curRiskCode == 5323 ||
        this.curRiskCode == 5324 ||
        this.curRiskCode == 5325 ||
        this.curRiskCode == 5032 ||
        this.curRiskCode == 1037 ||
        this.curRiskCode == 1318
      ) {
        this.addressScreen = this.addressData_new;
      } else {
        this.addressScreen = this.addressData;
      }
    },
    //代理人负责地区筛选
    agentAreaCode() {
      this.agentAddressData.options.map(item => {
        if (item.value === this.areaCode) {
          this.newAgentAddressData.options.push(item);
          this.newAgentAddressData.options.shift();
        } else {
          item.children.options.map(i => {
            if (i.value === this.areaCode) {
              this.newAgentAddressData.options[0].children.options.push(i);
              this.newAgentAddressData.options[0].label = item.label;
              this.newAgentAddressData.options[0].value = item.value;
            }
          });
        }
      });
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
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    goUserAdd() {
      window.location.href =
        this.$router.siteUrl() + "/product/UserAgreement.html";
    },
    synchroInfo() {
      if (this.chooseIndex == 1) {
        this.insuredAddress1 = this.proposerAddress1;
        this.insuredEmail = this.proposerEmail;
      } else if(this.chooseIndex == 1 && this.insuredRelationToAppnt == "03"){
        this.insuredPhone = this.proposerPhone;
        this.insuredAddress1 = this.proposerAddress1;
        this.insuredEmail = this.proposerEmail;
      }
    },
    onAgreeInfoChange(num) {
      this.chooseIndex = num;
      if (num == 1) {
        if (this.insuredRelationToAppnt == "03") {
          this.insuredPhone = this.proposerPhone;
          this.insuredAddress1 = this.proposerAddress1;
          this.insuredEmail = this.proposerEmail;
        } else {
          this.insuredAddress1 = this.proposerAddress1;
          this.insuredEmail = this.proposerEmail;
        }
        this.addressDataValue = this.proposerAddress;
        this.insureProvinceAdd.placeCode = this.provinceAdd.placeCode;
        this.insureProvinceAdd.placeName = this.provinceAdd.placeName;
        this.insureCityAdd.placeCode = this.cityAdd.placeCode;
        this.insureCityAdd.placeName = this.cityAdd.placeName;
        this.insureAreaAdd.placeCode = this.areaAdd.placeCode;
        this.insureAreaAdd.placeName = this.areaAdd.placeName;
        this.insuredLiveCity = this.proposerLiveCity;
      } else {
        if (this.insuredRelationToAppnt == "03") {
          this.insuredAddress1 = "";
          this.insuredEmail = "";
        } else {
          this.insuredPhone = "";
          this.insuredAddress1 = "";
          this.insuredEmail = "";
        }
        this.addressDataValue = "";
        this.insureProvinceAdd.placeCode = "";
        this.insureProvinceAdd.placeName = "";
        this.insureCityAdd.placeCode = "";
        this.insureCityAdd.placeName = "";
        this.insureAreaAdd.placeCode = "";
        this.insureAreaAdd.placeName = "";
        this.insuredLiveCity = "";
      }
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
    //获取常用被保人
    loadContactsData() {
      this.contactsData.length = 0;
      let that = this;
      this.$app.getToken(function(userToken) {
        that.$request({
          url: `/vip/contact/getInsured`,
          params: {},
          userToken: userToken,
          successFn: data => {
            //                            smokeData: [[{text: '有', value: 0}, {text: '否', value: 1}]],
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
                occupation: item.occupation
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
              datas.push(temp);
            });

            that.contactsData.push(datas);
          },
          failFn: () => {}
        });
      });
    },
    contactsConfirm() {
      const values = this.$refs.contactsMod.getColumnValues();
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
            if (this.curRiskCode === "5315" || this.curRiskCode === "5316" || this.curRiskCode === "5032" || this.curRiskCode === "5323" || this.curRiskCode === "5324" ||  this.curRiskCode === "5325" ) {
              arr = job10.options[8];
            } else {
              arr = job8.options[9];
            }
            for (let i of arr.children.options) {
              if (i.value === str1) {
                for (let n of i.children.options) {
                  if (n.value === str2) {
                    for (let m of n.children.options) {
                      if (m.value === this.insureJobCode) {
                        if (
                          this.curRiskCode === "5315" ||
                          this.curRiskCode === "5316" ||
                            this.curRiskCode === "5323" ||
                            this.curRiskCode === "5324" ||
                            this.curRiskCode === "5325" ||
                          this.curRiskCode === "5032"
                        ) {
                          if (
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
                        } else {
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
          }
          if(this.riskCode != '5321'){
              if (this.insureTrialAge < 18) {
                  this.insuredChildJob = this.insuredJob
              }
          }
          console.log(
            "that.hat.insuredJob",
            this.insuredJob,
            this.insureJobCode
          );

          const areaArr = ["1314","1315"]; // 目前只有定汇保支持湖南地区curRiskCode
          // areaFlag为true省市区 非湖南时候带出，是湖南并且是定汇保也可带出
          const areaFlag =
            data.areaCode[0] !== "430000" || areaArr.includes[this.curRiskCode];
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
          if (this.riskCode == "1315"||this.curRiskCode === "1314") {
            this.getLocalAdress ()
          }
          this.calePremiun();
        }
        //                    value && (res += `${value.text || value.label} `)
      });
      this.chooseIndex = 2;
    },
    onContactIcon() {
      if (
        !Array.isArray(this.contactsData[0]) ||
        this.contactsData[0].length == 0
      ) {
        Toast.info("暂无常用被保人");
        return false;
      }
      this.showContacts = true;
      this.isContactsShow = true;
    },
    closeDialog() {
      this.iconDialog.open = false;
    },
		closeTipDialog() {
		  this.removeTipDialog.open = false;
		},
    //跳转至试算页面
    //如果是代理人体外投保则带agentCode调回代理人试算页
		goDetail() {
			  if (this.agentCode) {
			    window.location.href =
			      this.$router.siteUrl() +
			      "/product/Detail.html?product_id=" +
			      this.product_id +
			      "&agentCode=" +
			      this.agentCode;
			  } else {
			    window.location.href =
			      this.$router.siteUrl() +
			      "/product/Detail.html?product_id=" +
			      this.product_id;
			  }
		},
    goTrial() {
      if (this.curRiskCode == "5313") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/PlusTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/PlusTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5314") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/KangluxuryTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/KangluxuryTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5318") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/kangbeyond/KangBeyondTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/kangbeyond/KangBeyondTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5317") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/chaobeibao/ChaobeibaoTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5319") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/chaohuibao/ChaohuibaoTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5315") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/dkorenix/DKorenixTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/dkorenix/DKorenixTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5316") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/nosorrow/NoSorrowTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/nosorrow/NoSorrowTrial.html?product_id=" +
            this.product_id;
        }
      } else if (this.curRiskCode == "5032") {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/yaohuitong/YaohuitongTrial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/yaohuitong/YaohuitongTrial.html?product_id=" +
            this.product_id;
        }
      } else if(this.curRiskCode == "5323") {
          if (this.agentCode) {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/yihuibao/YihuibaoTrial.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
          } else {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/yihuibao/YihuibaoTrial.html?product_id=" +
                  this.product_id;
          }
      }else if(this.curRiskCode == "5324") {
          if (this.agentCode) {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/yihuitongzx/YihuitongTrial.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
          } else {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/yihuitongzx/YihuitongTrial.html?product_id=" +
                  this.product_id;
          }
      } else if (this.curRiskCode == "5325") {
          if (this.agentCode) {
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/baiyibao/BaiyibaoTrial.html?product_id=" +
                    this.product_id +
                    "&agentCode=" +
                    this.agentCode;
            } else {
                window.location.href =
                    this.$router.siteUrl() +
                    "/product/baiyibao/BaiyibaoTrial.html?product_id=" +
                    this.product_id;
          }
      } else if (this.curRiskCode == "1314") {
          if (this.agentCode) {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/dinghuibao/DinghuibaoTrial.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
          } else {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/dinghuibao/DinghuibaoTrial.html?product_id=" +
                  this.product_id;
          }
      } else if (this.curRiskCode == "1037") {
          if (this.agentCode) {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/xingzuan/XingzuanTrial.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
          } else {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/xingzuan/XingzuanTrial.html?product_id=" +
                  this.product_id;
          }
      } else if (this.curRiskCode == "1318") {
          if (this.agentCode) {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
          } else {
              window.location.href =
                  this.$router.siteUrl() +
                  "/product/xinhuibao/XinhuibaoTrial.html?product_id=" +
                  this.product_id;
          }
      } else {
        if (this.agentCode) {
          window.location.href =
            this.$router.siteUrl() +
            "/product/Trial.html?product_id=" +
            this.product_id +
            "&agentCode=" +
            this.agentCode;
        } else {
          window.location.href =
            this.$router.siteUrl() +
            "/product/Trial.html?product_id=" +
            this.product_id;
        }
      }
    },
		reTrial(){
			if(this.fjDutyFlag = '0'){                            //重复投保
				this._delCaleDuty('5031D1');
				this.removeTipDialog.open = true;
				this.jobMsgDialog1.open = false;
			}
			if(this.fjDutyFlag = '3'){
				this._delCaleDuty('5031D1');
				this._delCaleDuty('5909D1');
			}else if(this.fjDutyFlag = '2'){
				this._delCaleDuty('5031D1');
			}else if(this.fjDutyFlag = '1'){
				this._delCaleDuty('5909D1');
			}
			this.calePremiun(true);
			this.jobMsgDialog.open = false;
		},
		_delCaleDuty(dutyCode) {
		    let flagCreate = this._isCreateDuty(dutyCode)
		    if (flagCreate >= 0) {
		        //删除
		        this.localdata.policyInfoList.splice(flagCreate, 1);
		    }
		},
		_isCreateDuty(dutyCode) {
		    for (let index in this.localdata.policyInfoList) {
		        if (this.localdata.policyInfoList[index].dutyCode === dutyCode) {
		            return index;
		        }
		    }
		    return -1;
		},
    //拨打客户电话
    goCall() {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("callIphone", { number: 95542 }, function(
          responseData
        ) {});
      });
    },
    //跳转至白小答
    goCustomer() {
      this.$app.getBxdServiceUrl();
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
      this.calePremiun();
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
      this.calePremiun();
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
                                that.calePremiun();
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
                                const areaArr = ["1314","1315"]; // 目前只有定汇保支持湖南地区curRiskCode
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
                            if (that.riskCode == "1315"||that.riskCode === "1314") {
                              that.getLocalAdress ()
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
                            if (
                                that.curRiskCode === "5315" ||
                                that.curRiskCode === "5316" ||
                                that.curRiskCode === "5323" ||
                                that.curRiskCode === "5324" ||
                                that.curRiskCode === "5325" ||
                                that.curRiskCode === "5032"
                            ) {
                                arr = job10.options[8];
                            } else {
                                arr = job8.options[9];
                            }
                            for (let i of arr.children.options) {
                                if (i.value === str1) {
                                    for (let n of i.children.options) {
                                        if (n.value === str2) {
                                            for (let m of n.children.options) {
                                                if (m.value === that.jobCode) {
                                                    if (
                                                        that.curRiskCode === "5315" ||
                                                        that.curRiskCode === "5316" ||
                                                        that.curRiskCode === "5323" ||
                                                        that.curRiskCode === "5324" ||
                                                        that.curRiskCode === "5325" ||
                                                        that.curRiskCode === "5032"
                                                    ) {
                                                        if (
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
                                                    } else {
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
          "法定受益人第一顺序是配偶/父母/子女，第二顺序是祖父母/外祖父母/兄弟姐妹；指定受益人最多添加3名，所有受益人的收益比例之和必须为100%。"
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
    onConfirmChildJob(columnsValue) {
      this.insuredChildJob = columnsValue[0].label;
      this.insureJobCode = columnsValue[0].value;
      this.insuredWork = columnsValue[0].label;
    },
    onConfirmAliveWay(columnsValue){
      this.njAliveWay = columnsValue[0].label;
      this.ifAlive(0);
      if(columnsValue[0].value == 7){
          this.ifChecked0 = false;
          this.ifChecked1 = true;
          this.checked = "1";
          this.ifAliveShow = true;
      }else{
          this.ifChecked0 = true;
          this.ifChecked1 = false;
          this.checked = "0";
          this.ifAliveShow = false;
      }
      this.liveGetMode = columnsValue[0].value;
      this.calePremiun();
    },
    onConfirmPolicyNo(columnsValue){
      this.njPolicyNumber = columnsValue[0].label;
    },
    getAliveWay(){
      this.isAliveWayShowQ = true;
    },
    getPolicyNo(){
      if(this.insuredRelationToAppnt == "00"){
         this.insuredName = this.proposerName;
         this.insuredCard = this.proposerCard;
      }
      if(this.insuredRelationToAppnt == ""){
        Toast.failed("请选择为谁投保");
        return false;
      }else if(this.proposerName == ""){
        Toast.failed("请输入投保人姓名");
        return false;
      }else if(this.proposerCard == ""){
        Toast.failed("请输入投保人证件号");
        return false;
      }else if(this.insuredName == ""){
        Toast.failed("请输入被保人姓名");
        return false;
      }else if(this.insuredCard == ""){
        Toast.failed("请输入被保人证件号");
        return false;
      }

      this.appntName = this.proposerName;
      this.appntIdNo = this.proposerCard;
      this.insurerName = this.insuredName;
      this.insuredIdNo = this.insuredCard;
      let listData = {
          "appntName": this.appntName,
          "appntIdNo": this.appntIdNo,
          "insuredName": this.insurerName,
          "insuredIdNo": this.insuredIdNo,
          "status": "8",
          "mainRiskCode": "1037",
          "page":"1",
          "pageShowNum": "1000"
      }
      let tempInfo1318 = {
          "proposerName": this.proposerName,
          "proposerCard": this.proposerCard,
          "proposerPhone": this.proposerPhone,
          "proposerEmail": this.proposerEmail,
          "proposerAddress1": this.proposerAddress1,
          "insuredName": this.insurerName,
          "insuredIdNo": this.insuredIdNo,
          "insuredPhone": this.insuredPhone,
          "insuredEmail": this.insuredEmail,
          "insuredAddress1": this.insuredAddress1
      }
      window.localStorage.setItem("tempInfo1318",JSON.stringify(tempInfo1318))
      this.$request({
        url: `/contract/getWnPolicyList`,
        method: "post",
        data: listData,
        contentType: "application/json;charset=UTF-8",
        successFn: data => {
          this.policyNo[0].length = 0;
          console.log("listdata",this.policyNo[0])
          let prtNoList = [];
          if(data.policyInfoList.length > 0){
            for(let i = 0;i < data.policyInfoList.length;i++){
                prtNoList.push(data.policyInfoList[i].prtNo)
            }
            let tempPolicyNo = {};
            for(let j = 0;j < prtNoList.length;j++){
                tempPolicyNo.value = j;
                tempPolicyNo.label = prtNoList[j];
                this.policyNo[0].push(tempPolicyNo)
            }
            this.$refs.policyChoose.refresh();
            this.ispolicyNoShowQ = true;
          }else{
            this.aliveWayDialog.open = true;
            this.hasNotPolicy = true;
          }
        },
        failFn: data => {
            Toast({ content: data.resultMsg });
        }
      });
    },
    goXingzuanDetail(){
        window.location.href = this.$router.siteUrl() +'/product/Detail.html?product_id=' + this.relProductId+ '&agentCode=' + this.agentCode;
    },
    ifAlive(val){
       console.log(val)
       if(val == 0){
          this.ifAliveShow = false;
          this.njPolicyNumber = "";
          this.policyNo[0].length = 0;
       }else{
          this.ifAliveShow = true;
       }
    },
    handleChangeProp({ options }) {
      this.proposerJob = options;
      console.log(JSON.stringify(this.proposerJob)+"职业")
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
        this.addStorage(e, val); //放缓存
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
          // 智能核保体重项
          if (
            this.ZNHBbodyInfoData["height"] &&
            this.ZNHBbodyInfoData["height"]
          ) {
            this.insureHeight = this.ZNHBbodyInfoData["height"];
            this.insureWeight = this.ZNHBbodyInfoData["weight"];
          }
          this.riskInfo = data.riskInfo;
          this.showWhirl = false;
          if (localStorage.getItem("SOCIAL_SECURITY_VAL")) {
            this.socialSecurityFlag = localStorage.getItem("SOCIAL_SECURITY_VAL");
						if(this.socialSecurityFlag.indexOf("0") > -1){
							this.socialSecurityFlag = "0"
						}else if(this.socialSecurityFlag.indexOf("1") > -1){
							this.socialSecurityFlag = "1"
						}
          }
          if (localStorage.getItem("SOCIAL_SECURITY")) {
            this.socialSecurity = localStorage.getItem("SOCIAL_SECURITY");
            if (this.socialSecurity === "是") {
              this.socialSecurityType = true;
            } else {
              this.socialSecurityType = false;
            }
          }
          if (this.curRiskCode == "1315"||this.curRiskCode === "1314") {
            this.getLocalAdress ()
          }
          this.job4Data = job8;
          this.job4InsureData = job8;
          this.jobInsureData = job8;
          this.jobData = job8;
          this.jobmedicalData = job10;
          this.jobmedicalInsureData = job10;
          this.job6Data = job6;
          this.job6InsureData = job6;
          //判断职业等级
          if (this.curRiskCode == '1314') {
            this.jobInsureData= job4;   //定惠保1-4类职业
            this.jobData = job4;
          }
          /*if (this.curRiskCode == '5305') {     //1-6类职业
                    this.jobInsureData = job6   //被保人职业
                    if (this.localdata.policyInfoList.find((item) => (item.dutyCode == '5909D1'))) {    //选择了投保人豁免  （1~4类）
                        this.jobData = job4
                    } else {
                        this.jobData = job8
                    }
                } else if (this.curRiskCode == '5313') {     //1-6类职业
                    this.jobInsureData = job6   //被保人职业
                    if (this.localdata.policyInfoList.find((item) => (item.dutyCode == '5909D1'))) {    //选择了投保人豁免  （1~4类）
                        this.jobData = job4
                    } else {
                        this.jobData = job8
                    }
                } else if (this.curRiskCode == '5314') {     //1-6类职业
                    this.jobInsureData = job6   //被保人职业
                    if (this.localdata.policyInfoList.find((item) => (item.dutyCode == '5909D1'))) {    //选择了投保人豁免  （1~4类）
                        this.jobData = job4
                    } else {
                        this.jobData = job8
                    }
                } else if (this.curRiskCode == '5318') {     //康惠保（超越版）1-6类职业
                    this.jobInsureData = job6   //被保人职业
                    if (this.localdata.policyInfoList.find((item) => (item.dutyCode == '5909D1'))) {    //选择了投保人豁免  （1~4类）
                        this.jobData = job4
                    } else {
                        this.jobData = job8
                    }
                } else if (this.curRiskCode == '1315') {
                    this.jobInsureData = job6   //被保人职业
                    this.jobData = job6
                } else if (this.curRiskCode == '5307') {  //选择了投保人豁免  （1~4类）
                    this.jobData = job4
                    if (this.localdata.policyInfoList.find((item) => (item.dutyCode == '5909D1'))) {    //选择了投保人豁免  （1~4类）
                        this.jobData = job4
                    } else {
                        this.jobData = job8
                    }
                }*/

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
    getLocalAdress () {
      this.insureCity = JSON.parse(localStorage.getItem("TRIAL_ADDRESS"));
      this.provinceAdd.placeCode = this.insureCity[0].value;
      this.cityAdd.placeCode = this.insureCity[1].value;
      this.areaAdd.placeCode = this.insureCity[2].value;
      this.proposerAddressPar[0].label = this.insureCity[0].label;
      this.proposerAddressPar[1].label = this.insureCity[1].label;
      this.proposerAddressPar[2].label = this.insureCity[2].label;
      this.provinceAdd.placeName = this.proposerAddressPar[0].label;
      this.cityAdd.placeName = this.proposerAddressPar[1].label;
      this.areaAdd.placeName = this.proposerAddressPar[2].label;
      this.proposerLiveCity =
        this.proposerAddressPar[0].label +
        this.proposerAddressPar[1].label +
        this.proposerAddressPar[2].label;
      this.showInureCity = true;
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

    //ocr 调摄像头
    showCamera(n) {
      var that = this;
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("getBase64", { id: 2 }, function(responseData) {
          if (n == 1) {
            //身份证识别
            responseData = JSON.parse(responseData);
            that.photoUrl = responseData.data;
            // ocr身份证识别
            that.photoUrl = that.photoUrl.replace(/""/g, "%22");
            var datas = {
              businessType: "8",
              requestPlatform: "3",
              userCode: "1880100269",
              imgInfoList: [
                {
                  imgIndex: "2",
                  imgType: "2",
                  imgFormat: that.photoUrl.substring(that.photoUrl.length - 3),
                  imgData: "",
                  imgUrl: that.photoUrl
                }
              ]
            };
            that.showWhirl = true;
            let _this = that;
            that.$app.getToken(function(userToken) {
              _this.$request({
                url: `/ocr/ocr/getappocrinfo`,
                method: "POST",
                contentType: "application/json;charset=UTF-8",
                data: datas,
                userToken: userToken,
                successFn: _data => {
                  _this.showWhirl = false;
                  _this.proposerName = _data.name;
                  _this.addStorage("proposerName", _data.name); //放缓存
                  _this.proposerCard = _data.cardNo;
                  _this.addStorage("proposerCard", _data.cardNo); //放缓存
                  _this.proposer();
                  _this.calePremiun();
                },
                failFn: err => {
                  Dialog.alert({ content: "证件识别失败" });
                  _this.showWhirl = false;
                }
              });
            });
          } else if (n == 3) {
            //被保人ocr
            responseData = JSON.parse(responseData);
            that.photoUrl = responseData.data;
            // ocr身份证识别
            that.photoUrl = that.photoUrl.replace(/""/g, "%22");
            var datas = {
              businessType: "8",
              requestPlatform: "3",
              userCode: "1880100269",
              imgInfoList: [
                {
                  imgIndex: "2",
                  imgType: "2",
                  imgFormat: that.photoUrl.substring(that.photoUrl.length - 3),
                  imgData: "",
                  imgUrl: that.photoUrl
                }
              ]
            };
            that.showWhirl = true;
            let _this = that;
            that.$app.getToken(function(userToken) {
              _this.$request({
                url: `/ocr/ocr/getappocrinfo`,
                method: "POST",
                contentType: "application/json;charset=UTF-8",
                data: datas,
                userToken: userToken,
                successFn: _data => {
                  _this.showWhirl = false;
                  _this.insuredName = _data.name;
                  _this.addStorage("insuredName", _data.name); //放缓存
                  _this.insuredCard = _data.cardNo;
                  _this.addStorage("insuredCard", _data.cardNo); //放缓存
                  _this.insures();
                  _this.calePremiun();
                },
                failFn: err => {
                  Dialog.alert({ content: "证件识别失败" });
                  _this.showWhirl = false;
                }
              });
            });
          }
        });
      });
    },

    //ocr 识别银行卡判断银行编码
    contrastBank(index) {
      for (let i = 0; i < this.bankData[0].length; i++) {
        if (this.bankData[0][i].label == index) {
          this.bankNum = this.bankData[0][i].value;
        }
      }
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

    calePremiun_temp() {
      // 关闭重新试算保费弹窗
      this.trialDialog.open = false;
      this.calePremiun(true);
    },
    //  重新测算保费
    calePremiun(flag = false) {
      if (this.riskCode == "5321") {
        return;
      }
      if (this.relation === "" || this.insuredRelationToAppnt === "00") {
        if (this.proposerCard === "") {
          flag &&
            (Toast.failed("试算异常，请填写投保人身份证。"),
            (this.trialDialog.open = false));
          return false;
        }
        //本人投保
        let birthday = this.getBirth(this.proposerCard);
        let age = this.getAge(this.proposerCard);
        let sex = this.getSex(this.proposerCard);

        this.localdata.appntInfo.birthday = birthday;
        this.localdata.appntInfo.age = age;
        this.localdata.appntInfo.sex = sex;

        this.localdata.insuredInfo.birthday = birthday;
        this.localdata.insuredInfo.age = age;
        this.localdata.insuredInfo.sex = sex;
      } else {
        //是出生证
        if (this.showSexAndBirth) {
          if (this.proposerCard === "" || this.datePickerValueB === "") {
            flag &&
              (Toast.info("被保人身份证或出生证日期有误。"),
              (this.trialDialog.open = false));
            return false;
          } else if (this.insureChildSex === "") {
            flag &&
              (Toast.info("被保人性别有误。"), (this.trialDialog.open = false));
            return false;
          }

          let app_birthday = this.getBirth(this.proposerCard);
          let app_age = this.getAge(this.proposerCard);
          let app_sex = this.getSex(this.proposerCard);

          this.localdata.appntInfo.birthday = app_birthday;
          this.localdata.appntInfo.age = app_age;
          this.localdata.appntInfo.sex = app_sex;

          let birthday = this.datePickerValueB
            .replace("/", "-")
            .replace("/", "-");
          this.jsGetAge(birthday);
          let age = this.jsGetAge(birthday);
          let sex = this.insureChildSex == "0" ? "M" : "F";
          this.localdata.insuredInfo.birthday = birthday;
          this.localdata.insuredInfo.age = age;
          this.localdata.insuredInfo.sex = sex;
        } else {
          if (this.proposerCard === "" || this.insuredCard === "") {
            flag &&
              (Toast.info("投保人身份证或被保人身份证有误。"),
              (this.trialDialog.open = false));
            return false;
          }
          if (!this.checkCard(this.insuredCard)) {
            flag && Toast.info("试算异常，被保人身份证错误。");
            return false;
          }
          let app_birthday = this.getBirth(this.proposerCard);
          let app_age = this.getAge(this.proposerCard);
          let app_sex = this.getSex(this.proposerCard);

          this.localdata.appntInfo.birthday = app_birthday;
          this.localdata.appntInfo.age = app_age;
          this.localdata.appntInfo.sex = app_sex;

          let birthday = this.getBirth(this.insuredCard);
          let age = this.getAge(this.insuredCard);
          let sex = this.getSex(this.insuredCard);
          this.localdata.insuredInfo.birthday = birthday;
          this.localdata.insuredInfo.age = age;
          this.localdata.insuredInfo.sex = sex;
        }
      }

      if (this.curRiskCode === "5305") {
        if (this.localdata.insuredInfo.age >= 18) {
          this.localdata.insuredRelationToAppnt = "SF";
        } else {
          this.localdata.insuredRelationToAppnt = "CH";
        }
      } else if (this.curRiskCode === "5313") {
        if (this.localdata.insuredInfo.age >= 18) {
          this.localdata.insuredRelationToAppnt = "SF";
        } else {
          this.localdata.insuredRelationToAppnt = "CH";
        }
      } else if (this.curRiskCode === "5314") {
        if (this.localdata.insuredInfo.age >= 18) {
          this.localdata.insuredRelationToAppnt = "SF";
        } else {
          this.localdata.insuredRelationToAppnt = "CH";
        }
      } else if (
        this.curRiskCode === "5317" ||
        this.curRiskCode === "5318" ||
        this.curRiskCode === "5319" ||
        this.curRiskCode === "5315" ||
        this.curRiskCode === "5316" ||
        this.curRiskCode === "5323" ||
        this.curRiskCode === "5324" ||
        this.curRiskCode === "5325" ||
        this.curRiskCode === "5032" ||
        this.curRiskCode === "1037" ||
        this.curRiskCode === "1318"
      ) {
        //康惠保（超越版）//医惠通 //医无忧//超倍保
        if (this.localdata.insuredInfo.age >= 18) {
          if (
            (this.curRiskCode === "5315" ||
              this.curRiskCode === "5317" ||
              this.curRiskCode === "5319" ||
              this.curRiskCode === "5032") &&
            this.localdata.insuredInfo.age > 55
          ) {
            return false;
          }
          if (
              (this.curRiskCode === "5323" || this.curRiskCode === "5324" || this.curRiskCode === "5325")&&
              this.localdata.insuredInfo.age > 60
          ) {
              return false;
          }
          if (
              (this.curRiskCode === "1037")&&
              this.localdata.insuredInfo.age > 80
          ) {
              return false;
          }
          if (
              (this.curRiskCode === "1318")&&
              this.localdata.insuredInfo.age > 70
          ) {
              return false;
          }
          this.localdata.insuredRelationToAppnt = "SF";
        } else {
          this.localdata.insuredRelationToAppnt = "CH";
        }
      }

      //判断是否生日单，初始化生效时间，设置为当天
      //判断是否投保投保人豁免
      if (
        this.localdata.policyInfoList.find(item => item.dutyCode == "5909D1")
      ) {
        let cdate = this.$app.getCvalidateByBirthday(
          this.localdata.insuredInfo.birthday,
          this.localdata.appntInfo.birthday
        );
        this.cvaliDate = cdate;
        this.localdata.cvalidate = cdate;
        this.localdata.policyInfoList[0].cvalidate = cdate;
        this.localdata.policyInfoList.cvalidate = cdate;
      } else {
        let cdate = this.$app.getCvalidateByBirthday(
          this.localdata.insuredInfo.birthday,
          undefined
        );
        this.cvaliDate = cdate;
        this.localdata.cvalidate = cdate;
        this.localdata.policyInfoList[0].cvalidate = cdate;
        this.localdata.policyInfoList.cvalidate = cdate;
      }

      let insure_age = this.getAge(this.insuredCard);
      let insure_age_flag = false;
      if (this.curRiskCode === "5319" && this.localdata.insuredInfo.age > 50) {
        for (let i = 0; i < this.localdata.policyInfoList.length; i++) {
          if (this.localdata.policyInfoList[i].dutyCode == "5319D7") {
            Dialog.alert({
              title: "提示",
              content: "百年超惠保基本责任+可选特定疾病最高投保年龄为50岁。",
              confirmText: "确定"
            });
            insure_age_flag = true;
          }
        }
        if (insure_age_flag) {
          return false;
        }
      }

      this.$request({
        url: `/ins/product/productplatform/duty/calPAWithRule`,
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        data: this.localdata,
        isLoading: true,
        successFn: data => {
          let res = data.paCalResultList;

          let resultVal = 0;
          for (let j = 0; j < res.length; j++) {
            let index = this._isCreateDuty(res[j].dutyCode);
            this.localdata.policyInfoList[index].prem =
              res[j].prem == 0 ? "" : res[j].prem;
            resultVal += parseInt(res[j].prem);
          }
          this.premium = resultVal;

          this.bnRiskInfoList.length = 0;

          this.localdata.policyInfoList.forEach((item, index) => {
            let riskInfoSingle = {
              amnt: item.amnt,
              dutyCode: item.dutyCode,
              getRate: item.getRate,
              getYear: item.getYear,
              getYearFlag: item.getYearFlag,
              insuYear: item.insuredYear,
              insuYearFlag: item.insuredYearFlag,
              mult: item.mult,
              payEndYear: item.payEndYear,
              payEndYearFlag: item.payEndYearFlag,
              payIntv: item.payIntv,
              prem: item.prem,
              relaInfoList: [],
              renewFlag: this.renewFlag,
              renewYear: item.renewAssureYear,
              renewYearFlag: item.renewAssureYearFlag,
              riskCode: item.riskCode,
              riskName: "",
              subRiskFlag: "S",
              liveGetMode: this.liveGetMode
            };
            item.dutyCode === "5909D1" ? (riskInfoSingle.subRiskFlag = "S") : "M";
            var resMoney = res.find(item1 => {
              return item1.dutyCode === riskInfoSingle.dutyCode;
            });
            riskInfoSingle.amnt = resMoney.amnt;
            riskInfoSingle.prem = resMoney.prem;
            this.bnRiskInfoList.push(riskInfoSingle);
            flag && (this.trialDialog.open = false);
          });
        },
        failFn: data => {
          if (data.resultMsg.indexOf("费率不存在") > -1 || data.resultMsg.indexOf("规则引擎") > -1) {
            flag && (this.trialDialog.open = false);
            Dialog.alert({
              title: "提示",
              content: "被保人身份证的年龄与试算年龄不一致，请重新进行保费试算",
              confirmText: "重新试算",
              onConfirm: () => this.goTrial()
            });
          } else {
            this.basicDialog.msg = data.resultMsg.replace(
              "联系地址",
              "详细地址"
            );
            this.basicDialog.open = true;
          }
        }
      });
    },
    showToast(n) {
       if(n === 'ifrenewFlag'){
            this.toastInfo = '自动续保，不用担心忘了续保，省心！<br/>开通自动续保后，可以随时取消，放心！'
            Dialog.alert({content: this.toastInfo})
        }
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
    //判断报文是否有该责任
    _isCreateDuty(dutyCode) {
      for (let index in this.localdata.policyInfoList) {
        if (this.localdata.policyInfoList[index].dutyCode === dutyCode) {
          return index;
        }
      }
      return -1;
    },
    choosetype(num, name) {
      this[name] = num;
    },
    beneficiarychoosetype(num, name, index) {
      Vue.set(this.beneficiaryArray[index], name, num);
    },
    showmodel(model, modelName, modelIndex) {
      this[model] = true;
      this.modelName = modelName;
      if (modelIndex) {
        this.modelIndex = modelIndex;
      }
    },
    certificateConfirm(columnsValue) {
      if (this.modelName == "proposerJob") {
        this[this.modelName] =
          columnsValue[0].text + columnsValue[1].text + columnsValue[2].text;
        this.proposerJobValue =
          typeof columnsValue[2] == "undefined"
            ? columnsValue[2].key
            : columnsValue[1].key;
      } else if (this.modelName == "insuredJob") {
        this[this.modelName] =
          typeof columnsValue[2] == "undefined"
            ? columnsValue[1].text
            : columnsValue[2].text;
        this.insuredJobValue =
          typeof columnsValue[2] == "undefined"
            ? columnsValue[2].key
            : columnsValue[1].key;
        this.insuredJob =
          columnsValue[0].text + columnsValue[1].text + columnsValue[2].text;
      } else {
        if (columnsValue[0].type == "propsercrsIdType") {
          this[this.modelName] = columnsValue[0].value;
        } else {
          this[this.modelName] = columnsValue[0].label;
        }
      }
      if (
        columnsValue[0].type == "propsercrsIdType" &&
        columnsValue[0].value == 2
      ) {
        document.getElementById("proposerIcon").classList.add("particular");
      } else {
        document.getElementById("proposerIcon").classList.remove("particular");
      }
    },

    certificateConfirmInsureTax(columnsValue) {
      if (columnsValue[0].type == "propsercrsIdType") {
        this[this.modelName] = columnsValue[0].value;
      } else {
        this[this.modelName] = columnsValue[0].label;
      }
      if (
        columnsValue[0].type == "propsercrsIdType" &&
        columnsValue[0].value == 2
      ) {
        document.getElementById("insureIcon").classList.add("particular");
      } else {
        document.getElementById("insureIcon").classList.remove("particular");
      }
    },

    certificateConfirmChild(columnsValue) {
      this.insureIdTypeCode = columnsValue[0].value;
      this.insureIdType = columnsValue[0].label;
      // console.log(  this.insureIdTypeCode)
      // console.log(  this.insureIdType)
      /*  if(this.insuredRelationToAppnt !== '03' && this.insureIdTypeCode !== '4'){
                 this.insureIdType = '身份证'
                 }*/
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
    checkInputValue(index) {
      if (index == "0") {
        Toast.failed("受益比例不可为0，请重新输入");
        return false;
      } else {
        return true;
      }
    },
    // 受益人
    beneficiaryArrayConfirm(columnsValue) {
      Vue.set(
        this.beneficiaryArray[this.modelIndex],
        this.modelName,
        columnsValue[0].text
      );
      this.beneficiaryArray[this.modelIndex].relationCode =
        columnsValue[0].value;
      this.beneficiaryArray[this.modelIndex].relationValue =
        columnsValue[0].label;
    },
    // 与投保人关系
    relationConfirm(columnsValue) {
      this.relation = columnsValue[0].label;
      this.insuredRelationToAppnt = columnsValue[0].value;
      if (this.insuredRelationToAppnt !== "03") {
        this.insureIdTypeCode = "0";
        this.insureIdType = "身份证";
      }
	  if(this.insuredRelationToAppnt != "00"){
		this.insuredName = "";
		this.insuredCard = "";
	  }
      this.chooseIndex = 2;
      this.insuredPhone = "";
      this.onAgreeInfoChange(2);
      this.calePremiun();
    },
    addbeneficiary() {
      let data = {
        beneficiaryRelation: "",
        beneficiaryName: "",
        beneficiaryCertificateType: "",
        beneficiaryCertificateValue: "",
        beneficiaryChooseIndex: 1,
        beneficiaryCardType: 0,
        beneficiaryCardStart: "",
        beneficiaryCardEnd: "",
        beneficiaryPhone: "",
        proportion: ""
      };
      if (this.beneficiaryArray.length == 3) {
        Toast.failed("受益人最多三人");
        return false;
      } else {
        this.beneficiaryArray.push(data);
      }
    },

    deletebeneficiary(index) {
      this.beneficiaryArray.splice(index, 1);
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
    onDatePickerConfirmStart(columnsValue) {
      this.screenDate(columnsValue);
      this.datePickerStartValue =
        columnsValue[0].value +
        "/" +
        columnsValue[1].value +
        "/" +
        columnsValue[2].value;
    },
    onDatePickerConfirmStartInsure(columnsValue) {
      this.screenDate(columnsValue);
      this.insurePickerStartValue =
        columnsValue[0].value +
        "/" +
        columnsValue[1].value +
        "/" +
        columnsValue[2].value;
    },
    certificateConfirmBeneficiary(columnsValue) {
      this.beneficiaryValue = columnsValue[0].text;
    },
    // 受益人比例校验
    checkproportion() {
      let n = 0;
      if (this.beneficiaryValue == "指定受益人") {
        for (var i = 0; i < this.beneficiaryArray.length; i++) {
          n = n + Number(this.beneficiaryArray[i].proportion);
        }
      }
      if (this.beneficiaryValue == "指定受益人") {
        if (n != 100) {
          this.basicDialog.open = true;
          this.basicDialog.msg = "受益比例相加必须等于100！";
          return false;
        } else {
          return true;
        }
      }
    },
    //获取数据字典
    //            marriageType: {
    //                1: "type_marriage",
    //                2: "type_bank",
    //                3: "type_relation",
    //                4: "type_idType",
    //                5: "type_degree"
    //            }
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
            if (this.curRiskCode == "5305") {
              this.showDeathDisabled = true;
              this.showDeath = false;
              //康惠保  被保人大于18 选了身故 被保人只能是本人
              if (
                this.localdata.insuredInfo.age >= 18 &&
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5305D8"
                )
              ) {
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //康惠保  被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }

              if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5305D8"
                )
              ) {
                this.showDeath = true; //禁选
                this.showDeathDisabled = false;
              }
            } else if (this.curRiskCode == "5307") {
              //童惠保
              this.pickerData = [data.splice(3, 1)];
              this.chooseRelationPicker = false;
              this.relation = this.pickerData[0][0].label;
              this.insuredRelationToAppnt = this.pickerData[0][0].value;
            } else if (this.curRiskCode == "1315"||this.curRiskCode === "1314") {
              //定惠保
              this.pickerData = [data.splice(0, 1)];
              this.chooseRelationPicker = false;
              this.relation = this.pickerData[0][0].label;
              this.insuredRelationToAppnt = this.pickerData[0][0].value;
            } else if (this.curRiskCode == "5313") {
              this.showDeath = true; //禁选
              this.showDeathDisabled = false;
              if (this.localdata.insuredInfo.age >= 18) {
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //加惠保  被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }
            } else if (this.curRiskCode == "5314") {
              this.showDeath = true; //禁选
              this.showDeathDisabled = false;
              if (this.localdata.insuredInfo.age >= 18) {
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //康惠保（尊） 被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }
            } else if (this.curRiskCode == "5318") {
              //康惠保（超越版）
              this.showDeath = true; //禁选
              this.showDeathDisabled = false;
              if (this.localdata.insuredInfo.age >= 18) {
                //康惠保（超越）基本责任默认包含全残或者身故责任 被保人大于等于18 投保人只能是本人
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //康惠保（超越） 被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }
            } else if (this.curRiskCode == "5317" || this.curRiskCode == "1037" || this.curRiskCode == "1318") {
              //超倍保
              this.showDeath = true; //禁选
              this.showDeathDisabled = false;
              if (this.localdata.insuredInfo.age >= 18) {
                //超倍保 基本责任默认包含全残或者身故责任 被保人大于等于18 投保人只能是本人
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //超倍保  被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }
            } else if (this.curRiskCode == "5319") {
              this.showDeathDisabled = true;
              this.showDeath = false;
              //超惠保  被保人大于18 选了身故 被保人只能是本人
              if (
                this.localdata.insuredInfo.age >= 18 &&
                (this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D2"
                ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319D3"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319D5"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319D6"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319D8"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319D9"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319DB"
                  ) ||
                  this.localdata.policyInfoList.find(
                    item => item.dutyCode == "5319DC"
                  ))
              ) {
                this.pickerData = [data.splice(0, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (this.localdata.insuredInfo.age < 18) {
                //超惠保  被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              } else if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5909D1"
                )
              ) {
                // 新增  有附加豁免  关系不能选本人
                this.pickerData = [data.splice(1, 3)];
              } else {
                this.pickerData = [data.splice(0, 4)];
              }
              if (
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D2"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D3"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D5"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D6"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D8"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319D9"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319DB"
                ) ||
                this.localdata.policyInfoList.find(
                  item => item.dutyCode == "5319DC"
                )
              ) {
                this.showDeath = true; //禁选
                this.showDeathDisabled = false;
              }
            } else if (
              this.curRiskCode == "5315" ||
              this.curRiskCode == "5316" ||
              this.curRiskCode == "5032" ||
              this.curRiskCode == "5325" ||
              this.curRiskCode == "5324" ||
              this.curRiskCode == "5323"
            ) {
              //医无忧和医惠通
              this.showDeath = false; //禁选
              this.showDeathDisabled = true;
              if (this.localdata.insuredInfo.age >= 18) {
                this.pickerData = [data.splice(0, 4)];
              } else if (this.localdata.insuredInfo.age < 18) {
                //医无忧和医惠通 被保人小于18 投保人只能是父母
                this.pickerData = [data.splice(3, 1)];
                this.chooseRelationPicker = false;
                this.relation = this.pickerData[0][0].label;
                this.insuredRelationToAppnt = this.pickerData[0][0].value;
              }
            } else if (this.curRiskCode == "5321") {
              this.showDeathDisabled = false;
              this.showDeath = false;
              this.pickerData = [data.splice(0, 4)];
            }
            this.getStorageUserDetail(); //从接口获取缓存数据
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
    checkBMI(weight, height) {
      //【BMI=体重（公斤）÷身高（米）÷身高（米）】是否BMI≥28？
      let bmi = parseInt(weight / (height / 100) / (height / 100));
      if (bmi >= 28) {
        return false;
      }

      return true;
    },
    submitCheck() {
      if (!this.checkInput(this.proposerName, "请输入投保人的姓名")) {
        this.checkInput1("proposerName");
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

      if (!this.checkInput(this.proposerPhone, "请输入投保人的手机号")) {
        this.checkInput1("proposerPhone");
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
      if (this.curRiskCode == "1315"||this.curRiskCode === "1314") {
        if (!this.checkInput(this.height, "请输入投保人的身高")) {
          // this.checkInput1('height')
          return false;
        }
        if (!this.checkInput(this.weight, "请输入投保人的体重")) {
          // this.checkInput1('weight')
          return false;
        }

        if (!this.checkBMI(this.weight, this.height)) {
          Toast.info("投保人的身高和体重不符合健康要求");
          return false;
        }
      }

      if (this.curRiskCode !== "1315"  && this.curRiskCode !== "1314") {
        if (!this.checkInput(this.proposerAddress, "请选择投保人的所在地区")) {
          return false;
        }
      }

      if (!this.checkInput(this.proposerAddress1, "请输入投保人的详细地址")) {
        this.checkInput1("proposerAddress1");
        return false;
      }
      /*  if (!this.checkInput(this.email, '请输入投保人所在地区的邮编')) {
                      this.checkInput1('email')
                      return false;
                  }*/
      /*  if (this.email.length !== 6) {
                      Toast.failed('投保人地址的邮编填写有误')
                      return false
                  }*/
      if (!this.checkInput(this.proposerJob, "请选择投保人的职业")) {
        return false;
      }

      if (!this.checkInputS(this.relation, "请输入投保人与被保人的关系")) {
        return false;
      }

      //被保人
      if (!this.checkInput(this.insuredName, "请输入被保人的姓名")) {
        this.checkInput1("insuredName");
        return false;
      }
      /*  if (!this.checkInput(this.insureIdType, '请选择被保人的证件类型')) {
                 return false;
                 }*/
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
      if (this.curRiskCode != "5307" || this.showSexAndBirth == true) {
        if (!this.checkInput(this.insuredPhone, "请输入被保人的手机号")) {
          this.checkInput1("insuredPhone");
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
      }

      // if (this.curRiskCode == '5313' || this.curRiskCode == '5314' || this.curRiskCode == '5318'|| this.curRiskCode == '5315' || this.curRiskCode == '5316' || this.curRiskCode == '5305') {

      //     if (this.insuredRelationToAppnt !== '00') {
      //         if (!this.checkInput(this.insureHeight, '请输入被保人的身高')) {
      //             this.checkInput1('insureHeight')
      //             return false;
      //         }
      //         if (!this.checkInput(this.insureWeight, '请输入被保人的体重')) {
      //             this.checkInput1('insureWeight')
      //             return false;
      //         }

      //         if(!this.checkBMI(this.insureWeight,this.insureHeight)){
      //             Toast.info('被保人的身高和体重不符合健康要求')
      //             return false
      //         }
      //     }
      // }

      if (!this.checkInput(this.addressDataValue, "请选择被保人的所在地区")) {
        return false;
      }
      if (!this.checkInput(this.insuredAddress1, "请输入被保人的详细地址")) {
        this.checkInput1("insuredAddress1");
        return false;
      }
      /* if (!this.checkInput(this.insureEmail, '请输入被保人所在地区的邮编')) {
                     this.checkInput1('insureEmail')
                     return false;
                 }
                 if (this.insureEmail.length !== 6) {
                     Toast.failed('被保人地址的邮编填写有误')
                     return false
                 }*/
      if (!this.checkInput(this.insuredJob, "请选择被保人的职业")) {
        return false;
      }
      return true;
    },
    checkBeneficiary() {
      if (this.beneficiaryValue == "指定受益人") {
        for (var i = 0; i < this.beneficiaryArray.length; i++) {
          if (
            !this.checkInput(
              this.beneficiaryArray[i].beneficiaryName,
              "请输入受益人的姓名"
            )
          ) {
            return false;
          }
          if (
            !this.checkInput(
              this.beneficiaryArray[i].beneficiaryCertificateValue,
              "请输入受益人的证件号"
            )
          ) {
            return false;
          }

          if (
            !this.cardNumBeneficary(
              this.beneficiaryArray[i].beneficiaryCertificateValue
            )
          ) {
            return false;
          }

          if (this.beneficiaryArray[i].beneficiaryChooseIndex == "1") {
            if (
              !this.checkInput(
                this.beneficiaryArray[i].beneficiaryCardEnd,
                "请输入受益人的证件有效止期"
              )
            ) {
              return false;
            }
          }

          if (
            !this.checkInput(
              this.beneficiaryArray[i].beneficiaryPhone,
              "请输入受益人的手机号"
            )
          ) {
            return false;
          }
          if (
            !this.checkInput(
              this.beneficiaryArray[i].proportion,
              "请输入受益人的受益比例"
            )
          ) {
            return false;
          }
        }
        return true;
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {},
    onBeneficiaryDatePickerConfirm(columnsValue) {
      this.screenDate(columnsValue);
      Vue.set(
        this.beneficiaryArray[this.modelIndex],
        this.modelName,
        columnsValue[0].value +
          "/" +
          columnsValue[1].value +
          "/" +
          columnsValue[2].value
      );
    },
    onBeneficiaryDatePickerStopConfirm(columnsValue) {
      this.screenDate(columnsValue);
      Vue.set(
        this.beneficiaryArray[this.modelIndex],
        this.modelName,
        columnsValue[0].value +
          "/" +
          columnsValue[1].value +
          "/" +
          columnsValue[2].value
      );
    },
    textRender() {},
    _setStorage() {
      //从浏览器储存里面读
      let storageItem = this._parseStorage();
      for (let item in storageItem) {
        if (storageItem[item]) {
          if(this.isBrowser){
            this[item] = storageItem[item];
          }else{
              if(item != "proposerCard"){
                this[item] = storageItem[item];
              }
          }
        }
      }
      if(this.isBrowser){
        this.calePremiun();
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
      if(this.riskCode == '5321'){
         let proposerAge = this.getAge(this.proposerCard)
         if(proposerAge < 18){
            Toast.failed('投保人年龄需大于等于18岁！')
            return false
         }
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
          this.calePremiun();
          this.addStorage(e, phone); //放缓存
          return true;
        }
      } else if (this.checkCard(phone)) {
        if (this.insuredCard) {
          if(this.riskCode != '5321'){
             if (this.insureTrialAge < 18 && this.insureIdTypeCode == '0') {
                 let age = this.getAge(this.insuredCard)
                 if (age >= 18) {
                     this.iconDialog.open = true
                     return false
                 }
             }
          }
        }
        this.addStorage(e, phone); //放缓存

        //重新试算保费
        this.calePremiun();
        //被保人时子女的时候，试算年龄小于18 投保录入年龄大于18   提示去试算页面调整

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
    cardNumBeneficary(phone) {
      if (this.checkCard(phone)) {
        return true;
      } else {
        Toast.failed("受益人的身份证号码不正确！");
        return false;
      }
    },
    //            校验受益人名字
    checkBeneficiaryName(name, e = null) {
      var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
      if (!regName.test(name)) {
        Toast.failed("您输入的姓名格式不正确！");
        return false;
      }
    },
    //            校验名字
    checkName(name, e = null) {
      var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,14}$/;
      if (!regName.test(name)) {
        Toast.failed("您输入的姓名格式不正确！");
        return false;
      } else {
        this.addStorage(e, name); //放缓存
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
        this.addStorage(e, phone); //放缓存
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
    //校验身高
    checkHeight(height, e = null, id = "height") {
      var heightReg = /^[0-9]*$/;
      if (heightReg.test(height)) {
        if (height > 250) {
          Toast.failed("您的身高输入过大,请您重新输入！");
          this.checkInput1(id);
          return false;
        } else {
          this.addStorage(e, height); //放缓存
          return true;
        }
      } else {
        Toast.failed("您的身高输入有误！");
        return false;
      }
    },
    checkWeight(weight, e = null, id = "weight") {
      var weightReg = /^[0-9]*$/;
      if (weightReg.test(weight)) {
        if (weight > 200) {
          Toast.failed("您的体重输入过大,请您重新输入！");
          this.checkInput1(id);
          return false;
        } else {
          this.addStorage(e, weight); //放缓存
          return true;
        }
      } else {
        Toast.failed("您的体重输入有误！");
        return false;
      }
    },
    // 校验邮箱
    checkEmail(email, e = null) {
      email = email.trim();
      var emailReg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i;
      if (emailReg.test(email)) {
        this.addStorage(e, email); //放缓存

        return true;
      } else {
        Toast.failed("您的邮箱号码输入有误！");
        return false;
      }
    },
    //校验邮编
    checkEmailCode(emailCode, e = null) {
      var re = /^\d{6}$/;
      if (re.test(emailCode)) {
        this.addStorage(e, emailCode); //放缓存
        return true;
      } else {
        Toast.failed("您的邮编输入有误！");
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
    proposer() {
      // this.$refs.parQ.style.display = 'none'
    },
    insures() {
      // this.$refs.parP.style.display = 'none'
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
        // this.insureProvinceAdd = this.provinceAdd;
        // this.insureCityAdd = this.cityAdd;
        // this.insureAreaAdd = this.areaAdd;
        this.insureProvinceAdd.placeCode = this.provinceAdd.placeCode;
        this.insureProvinceAdd.placeName = this.provinceAdd.placeName;
        this.insureCityAdd.placeCode = this.cityAdd.placeCode;
        this.insureCityAdd.placeName = this.cityAdd.placeName;
        this.insureAreaAdd.placeCode = this.areaAdd.placeCode;
        this.insureAreaAdd.placeName = this.areaAdd.placeName;
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

    load_shence_zj_fill_info() {
      const { riskSubType, riskName, riskCode } = this.riskInfo;
      let riskTypeName = getRiskTypeName(riskCode, riskSubType);
      let beneficiaryArrayOne =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[0]
            ? this.beneficiaryArray[0].relationValue
              ? this.beneficiaryArray[0].relationValue
              : ""
            : ""
          : "";
      let beneficiaryArrayTwo =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[1]
            ? this.beneficiaryArray[1].relationValue
              ? this.beneficiaryArray[1].relationValue
              : ""
            : ""
          : "";
      let beneficiaryArrayThree =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[2]
            ? this.beneficiaryArray[2].relationValue
              ? this.beneficiaryArray[2].relationValue
              : ""
            : ""
          : "";
      let beneficiaryArrayOneName =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[0]
            ? this.beneficiaryArray[0].beneficiaryName
              ? this.beneficiaryArray[0].beneficiaryName
              : ""
            : ""
          : "";
      let beneficiaryArrayTwoName =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[1]
            ? this.beneficiaryArray[1].beneficiaryName
              ? this.beneficiaryArray[1].beneficiaryName
              : ""
            : ""
          : "";
      let beneficiaryArrayThreeName =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[2]
            ? this.beneficiaryArray[2].beneficiaryName
              ? this.beneficiaryArray[2].beneficiaryName
              : ""
            : ""
          : "";
      let beneficiaryArrayOneProportion =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[0]
            ? this.beneficiaryArray[0].proportion
              ? Number(this.beneficiaryArray[0].proportion)
              : 0
            : 0
          : 0;
      let beneficiaryArrayTwoProportion =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[1]
            ? this.beneficiaryArray[1].proportion
              ? Number(this.beneficiaryArray[1].proportion)
              : 0
            : 0
          : 0;
      let beneficiaryArrayThreeProportion =
        this.beneficiaryArray.length > 0
          ? this.beneficiaryArray[2]
            ? this.beneficiaryArray[2].proportion
              ? Number(this.beneficiaryArray[2].proportion)
              : 0
            : 0
          : 0;
      if (riskSubType == "HE") {
        if (riskCode == "5315" || riskCode == "5316" || riskCode == "5032" || riskCode == "5323" || riskCode == "5324" || riskCode == "5325" ) {
          //判断医疗险
          sensors.track("yl_fill_info", {
            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
            risk_type: riskTypeName,
            risk: this.riskName,
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
            appnt_crsid_type: "仅为中国税收居民",
            appnt_height: Number(this.height), //身高
            appnt_weight: Number(this.weight), //体重
            insured_height: Number(this.insureHeight), //被保人身高
            insured_weight: Number(this.insureWeight), //被保人体重
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
            insured_crsid_type: "仅为中国税收居民",
            bnf_type: this.beneficiaryValue,
            bnf_relation_to_insured_first: beneficiaryArrayOne,
            bnf_name_first: beneficiaryArrayOneName,
            bnf_proportion_first: beneficiaryArrayOneProportion,
            bnf_relation_to_insured_second: beneficiaryArrayTwo,
            bnf_name_second: beneficiaryArrayTwoName,
            bnf_proportion_second: beneficiaryArrayTwoProportion,
            bnf_relation_to_insured_third: beneficiaryArrayThree,
            bnf_name_third: beneficiaryArrayThreeName,
            bnf_proportion_third: beneficiaryArrayThreeProportion,
            bank: "",
            acc_name: this.proposerName,
            bank_acc_no: "",
            new_bank: "",
            new_acc_name: this.proposerName,
            new_bank_acc_no: "",
            renew_flag: this.renewType, //是否续保标识
            social_security_flag: this.socialSecurityType //是否有社保
          });
        } else {
          sensors.track("zj_fill_info", {
            secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
            risk_type: riskTypeName,
            risk: this.riskName,
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
            appnt_postal_zipcode: this.email,
            appnt_occupation: this.jobName,
            appnt_crsid_type: "仅为中国税收居民",
            appnt_height: Number(this.height), //身高
            appnt_weight: Number(this.weight), //体重
            insured_height: Number(this.insureHeight), //被保人身高
            insured_weight: Number(this.insureWeight), //被保人体重
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
            insured_postal_zipcode: this.insureEmail,
            insured_occupation: this.insuredWork,
            insured_crsid_type: "仅为中国税收居民",
            bnf_type: this.beneficiaryValue,
            bnf_relation_to_insured_first: beneficiaryArrayOne,
            bnf_name_first: beneficiaryArrayOneName,
            bnf_proportion_first: beneficiaryArrayOneProportion,
            bnf_relation_to_insured_second: beneficiaryArrayTwo,
            bnf_name_second: beneficiaryArrayTwoName,
            bnf_proportion_second: beneficiaryArrayTwoProportion,
            bnf_relation_to_insured_third: beneficiaryArrayThree,
            bnf_name_third: beneficiaryArrayThreeName,
            bnf_proportion_third: beneficiaryArrayThreeProportion,
            bank: "",
            acc_name: this.proposerName,
            bank_acc_no: "",
            new_bank: "",
            new_acc_name: this.proposerName,
            new_bank_acc_no: ""
          });
        }
      } else if (riskSubType == "LF") {
        sensors.track("rs_fill_info", {
          secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
          risk_type: riskTypeName,
          risk: this.riskName,
          total_amnt: this.premium,
          appnt_name: this.proposerName,
          appnt_id_type: "身份证",
          appnt_id_no: this.proposerCard,
          appnt_validate_type: this.proposerDateFlag === 1 ? "长期" : "非长期",
          appnt_id_validate_start: this.datePickerStartValue
            ? this.datePickerStartValue.replace("/", "-").replace("/", "-")
            : this.transferDate(new Date(), "yyyy-MM-dd"),
          appnt_id_validate_end:
            this.proposerDateFlag !== 1
              ? this.datePickerEndValue.replace("/", "-").replace("/", "-")
              : "2099-01-01",
          appnt_mobile: this.proposerPhone,
          appnt_email: this.proposerEmail,
          // appnt_stature: Number(this.height),
          // appnt_avoirdupois: Number(this.weight),
          appnt_longterm_add:
            this.provinceAdd.placeName +
            this.cityAdd.placeName +
            this.areaAdd.placeName,
          appnt_detailed_add: this.proposerAddress1,
          appnt_postal_zipcode: this.email,
          appnt_occupation: this.jobName,
          appnt_crsid_type: "仅为中国税收居民",
          appnt_height: Number(this.height), //身高
          appnt_weight: Number(this.weight), //体重
          insured_height: Number(this.insureHeight), //被保人身高
          insured_weight: Number(this.insureWeight), //被保人体重
          insured_relation_to_appnt: this.relation,
          insured_name: this.insuredName,
          insured_id_type: this.insureIdType,
          insured_id_no: this.insuredCard,
          insured_validate_type: this.insureDateFlag === 1 ? "长期" : "非长期",
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
          insured_postal_zipcode: this.insureEmail,
          insured_occupation: this.insuredWork,
          insured_crsid_type: "仅为中国税收居民",
          bnf_type: this.beneficiaryValue,
          bnf_relation_to_insured_first: beneficiaryArrayOne,
          bnf_name_first: beneficiaryArrayOneName,
          bnf_proportion_first: beneficiaryArrayOneProportion,
          bnf_relation_to_insured_second: beneficiaryArrayTwo,
          bnf_name_second: beneficiaryArrayTwoName,
          bnf_proportion_second: beneficiaryArrayTwoProportion,
          bnf_relation_to_insured_third: beneficiaryArrayThree,
          bnf_name_third: beneficiaryArrayThreeName,
          bnf_proportion_third: beneficiaryArrayThreeProportion,
          bank: "",
          acc_name: this.proposerName,
          bank_acc_no: "",
          new_bank: "",
          new_acc_name: this.proposerName,
          new_bank_acc_no: ""

          /*产品类型
                         产品名称
                         费用合计
                         投保人姓名
                         投保人证件类型
                         投保人证件号
                         投保人有效期类型
                         投保人证件有效起期
                         投保人证件有效止期
                         投保人联系电话
                         投保人电子邮箱
                         投保人所在地区
                         投保人详细地址
                         投保人邮编
                         投保人职业
                         投保人税收居民身份
                         被投保人身份
                         被投保人姓名
                         被投保人证件类型
                         被投保人证件号
                         被投保人有效期类型
                         被投保人证件有效起期
                         被投保人证件有效止期
                         被投保人联系电话
                         被投保人电子邮箱
                         被投保人所在地区
                         被投保人详细地址
                         被投保人邮编
                         被投保人职业
                         被投保人税收居民身份
                         受益人类型
                         第一受益人关系
                         第一受益人姓名
                         第一受益人比例
                         第二受益人关系
                         第二受益人姓名
                         第二受益人比例
                         第三受益人关系
                         第三受益人姓名
                         第三受益人比例
                         续期开户银行
                         续期账户名
                         续期卡号
                         首期开户银行
                         首期账户名
                         首期卡号*/
        });
      }
    },
    // 投保
    jsubmit() {
      if (!this.agreeConf.checked) {
        Toast.failed("请勾选《用户协议》");
        return false;
      }
      if(this.curRiskCode == "1037"){
        if(!this.ifConfirmDone){
          Toast.failed("请确认风险抄录语句");
          return false;
        }
      }
      if(this.curRiskCode == "1318"){
          if(this.liveGetMode == ""){
            Toast.failed("请选择生存金领取方式");
            return false;
          }
          if(this.checked == '1'){
            if(this.njPolicyNumber == ""){
              Toast.failed("请选择万能险保单号");
              return false;
            }
          }
      }
      let insure_age_flag = false;
      if (this.curRiskCode === "5319" && this.localdata.insuredInfo.age > 50) {
        for (let i = 0; i < this.bnRiskInfoList.length; i++) {
          if (this.bnRiskInfoList[i].dutyCode == "5319D7") {
            Dialog.alert({
              title: "提示",
              content: "百年超惠保基本责任+可选特定疾病最高投保年龄为50岁。",
              confirmText: "确定"
            });
            insure_age_flag = true;
          }
        }
        if (insure_age_flag) {
          return false;
        }
      }
      //如果是体外投保
      //                if (!this.$app.isBrowser()) {
      //                    this.smsVerifySend("first")
      //                    return false;
      //                }

      //被保人时子女的时候，年龄大于18   提示去试算页面调整
      if (this.insuredCard) {
        let insure_age = this.getAge(this.insuredCard);
        if (
          (this.curRiskCode === "5315" ||
            this.curRiskCode === "5317" ||
            this.curRiskCode === "5319" ||
            this.curRiskCode === "5032") &&
          this.localdata.insuredInfo.age > 55
        ) {
          Dialog.alert({
            title: "提示",
            content: "本产品被保人年龄范围为28天到55周岁，请确认被保人年龄！",
            confirmText: "确定"
          });
          return false;
        }
        if (
            (this.curRiskCode === "1037")
                 &&
            this.localdata.insuredInfo.age > 80
        ) {
            Dialog.alert({
                title: "提示",
                content: "本产品被保人年龄范围为28天到80周岁，请确认被保人年龄！",
                confirmText: "确定"
            });
            return false;
        }
        if (
            (this.curRiskCode === "1318")
                 &&
            this.localdata.insuredInfo.age > 70
        ) {
            Dialog.alert({
                title: "提示",
                content: "本产品被保人年龄范围为28天到70周岁，请确认被保人年龄！",
                confirmText: "确定"
            });
            return false;
        }
          if (
              (this.curRiskCode === "5323" || this.curRiskCode === "5324" || this.curRiskCode === "5325")
                   &&
              this.localdata.insuredInfo.age > 60
          ) {
              Dialog.alert({
                  title: "提示",
                  content: "本产品被保人年龄范围为28天到60周岁，请确认被保人年龄！",
                  confirmText: "确定"
              });
              return false;
          }
        //试算被保人小于18并且是身份证
        if (this.curRiskCode != "5321") {
          if (this.insureTrialAge < 18 && this.insureIdTypeCode == "0") {
            let age = this.getAge(this.insuredCard);
            if (age >= 18) {
              this.iconDialog.open = true;
              return false;
            }
          } else if (this.insureTrialAge < 18 && this.insureIdTypeCode == "5") {
            //试算被保人小于18并且是户口本
            let age = this.getAge(this.insuredCard);
            if (age >= 18) {
              this.iconDialog.open = true;
              return false;
            }
          }
        }
      }
      //检验录入信息
      if (this.relation == "") {
        Toast.failed("请选择投保人与被保人的关系");
        return false;
      }

      // 如果是本人
      this.ifBenfPeople();
      //验证投保人详细地址
      let myreg = /^.+(乡|镇|街|路|道|巷|委|段|里|社|园|苑).+(村|组|号|室|队|院|房|楼|栋).*$/;
      if (this.proposerAddress1 == "") {
        Toast.failed("投保人地址不能为空！");
        return false;
      } else if (!myreg.test(this.proposerAddress1)) {
        Toast.failed("投保人地址格式不正确！");
        return false;
      }
      //验证被保人详细地址
      if (this.insuredAddress1 == "") {
        Toast.failed("被保人地址不能为空！");
        return false;
      } else if (!myreg.test(this.insuredAddress1)) {
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
          if (this.insuredRelationToAppnt == "03") {
            if(this.riskCode != '5321'){
               if (this.insureTrialAge < 18) {
                   this.insuredJob = this.insuredChildJob
               }
            }
          }
        } else {
          this.insureChildBirth = this.datePickerValueB.replace("/", "-").replace("/", "-");
          if(this.riskCode != '5321'){
              if (this.insureTrialAge < 18) {
                  this.insuredJob = this.insuredChildJob
              }
          }
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
      if(this.riskCode == '5321'){
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
      }
      //顺心保--校验被保人年龄与职业的关系
      if(this.riskCode == '5321'){
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
      }
      let result = this.submitCheck();
      if (!result) {
        return false;
      }

      //校验头被保人年龄
      /*    如果是夫妻关系，性别不能是同性
                    如果被保人是父母，年龄要大于投保人18岁
                    如果被保人是子女，年龄要小于投保人18岁*/
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

      //检验受益人比例
      if (this.beneficiaryValue == "指定受益人") {
        let checkBeneficiaryResult = this.checkBeneficiary();
        if (!checkBeneficiaryResult) {
          return false;
        }

        let beneficiaryResult = this.checkproportion();
        if (!beneficiaryResult) {
          return false;
        }
      }
      if (this.curRiskCode != "5321") {
        if (
          !Array.isArray(this.bnRiskInfoList) ||
          this.bnRiskInfoList.length == 0
        ) {
          // 关闭其他弹框
          this.basicDialog.open = false;
          this.taxDialog.open = false;
          //如果为空强行保费试算一次
          this.trialDialog.open = true;
          return false;
        }
      }
      // this.cvaliDate = this.cvaliDate || this.localdata.cvaliDate || new Date()

      // this.cvaliDate = this.transferDate(this.cvaliDate, 'yyyy-MM-dd');

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


      if (this.curRiskCode !== "1315" && this.curRiskCode !== "1314") {
        if (
          this.ZNHBbodyInfoData["height"] &&
          this.ZNHBbodyInfoData["height"]
        ) {
          this.insureHeight = this.ZNHBbodyInfoData["height"];
          this.insureWeight = this.ZNHBbodyInfoData["weight"];
        } else {
          this.insureHeight = null;
          this.insureWeight = null;
        }
      }

      if (this.riskCode == "5321") {
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
      }


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
        },
        impartInfoList: this.questionImpartInfoList
      };

      // 被保人身高体重判断5313 加惠保 5314 康惠保尊享版 5318康惠保超越版 5317超倍保超越版

      if (
        this.curRiskCode !== "5313" ||
        this.curRiskCode !== "5314" ||
        this.curRiskCode !== "5317" ||
        this.curRiskCode !== "5318" ||
        this.curRiskCode !== "5315" ||
        this.curRiskCode !== "5316" ||
        this.curRiskCode !== "5323" ||
        this.curRiskCode !== "5324" ||
        this.curRiskCode !== "5325" ||
        this.curRiskCode !== "5032" ||
        this.curRiskCode !== "1037" ||
        this.curRiskCode !== "1318"
      ) {
        if (!this.insureHeight) {
          this.insureHeight = null;
        }
        if (!this.insureWeight) {
          this.insureWeight = null;
        }
      }
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
          crsIdType: this.jumingDataValue1, //税收居民身份类型不能为空   仅支持仅为中国税收居民   税收居民身份类型0仅为中国税收居民 1仅为非中国税收居民 2既是中国税收居民又是其他国家税收居民
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
            relaPrtNo: this.njPolicyNumber,
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
            questionnaireNo: this.underwriteInfoData.questionnaireNo, //智能核保问卷号
            smartUwConclusion: this.underwriteInfoData.smartUwConclusion //智能核保结论 9：标体 4：除责 5：转人工核保
          }
        }
      ];
      if (this.agentCode) {
        var data = {
          appntInfo: bnappntInfo,
          userCode: this.agentCode, //代理人编码 todo
          insuredInfoList: insuredInfoList,
          productId: this.product_id,
          appUserCode: "",
          shareUserCode: "",
          smsVerifyCode: this.smsVerifyCodeVal,
          anonymousId: this.anonymousId,
          isbn:this.isbn,
          ifGift:this.ifGift
        };
      } else {
        var data = {
          appntInfo: bnappntInfo,
          userCode: "72845852", //代理人编码 todo
          insuredInfoList: insuredInfoList,
          productId: this.product_id,
          appUserCode: "",
          shareUserCode: "",
          smsVerifyCode: this.smsVerifyCodeVal,
          anonymousId: this.anonymousId,
          isbn:this.isbn,
          ifGift:this.ifGift
        };
      }
      //增加出单载体
      data.carrierType = this.$app.getCarrierType(); //app:百年人寿APP;bnminiapp:百年人寿小程序;cpslink:CPS链接
      console.log('data.carrierType:',data.carrierType)
      if (this.riskCode == "5321") {
      } else if (this.riskCode == "5324") {
          data.insuredInfoList[0].riskInfoList[0].renewFlag = "Y";
      }else {
        data.insuredInfoList[0].riskInfoList[0].renewFlag = this.renewFlag;

      }
      if (this.beneficiaryValue === "法定受益人") {
      } else {
        var d = this.beneficiaryArray;
        // 指定受益人
        for (var i = 0; i < this.beneficiaryArray.length; i++) {
          data.insuredInfoList[0].bnfInfoList[i] = {};
          data.insuredInfoList[0].bnfInfoList[i].name = d[i].beneficiaryName;
          data.insuredInfoList[0].bnfInfoList[i].idType = "0";
          data.insuredInfoList[0].bnfInfoList[i].sex =
            this.getSex(d[i].beneficiaryCertificateValue) == "M" ? "0" : "1";
          data.insuredInfoList[0].bnfInfoList[i].birthday = this.getBirth(
            d[i].beneficiaryCertificateValue
          );
          data.insuredInfoList[0].bnfInfoList[i].idNo =
            d[i].beneficiaryCertificateValue;
          if (d[i].proportion == 0) {
            Toast.failed("受益比例不可为0，请重新输入");
            return false;
          }
          data.insuredInfoList[0].bnfInfoList[i].proportion =
            parseInt(d[i].proportion) / 100;
          data.insuredInfoList[0].bnfInfoList[i].grade = 1;
          data.insuredInfoList[0].bnfInfoList[i].relationToInsured =
            d[i].relationCode;
          d[i].beneficiaryCardEnd = d[i].beneficiaryCardEnd
            .replace("/", "-")
            .replace("/", "-");
          if (d[i].beneficiaryCardEnd) {
            data.insuredInfoList[0].bnfInfoList[i].idValidate =
              d[i].beneficiaryCardEnd;
          } else {
            data.insuredInfoList[0].bnfInfoList[i].idValidate = "3000-01-01";
          }
        }
      }

      //缓存当前页数据  订单页要用
      this.jobInfo.proposerJob = this.proposerWork;
      this.jobInfo.insuredJob = this.insuredWork;
      this.jobInfo.proposerDateFlag = this.proposerDateFlag;
      this.jobInfo.insureDateFlag = this.insureDateFlag;
      if (this.riskCode == "5321") {
        this.jobInfo.cvaliDates = this.cvalidate5321;
      } else {
        this.jobInfo.cvaliDates = this.localdata.cvalidate;
      }
      this.jobInfo.properResident = this.jumingDataValue;
      this.jobInfo.insureResident = this.jumingDataValue1;
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
      window.localStorage.setItem("allInfo", JSON.stringify(data));
      this.insuredData = data;

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
      //年金险时，校验获取万能险的投被保人信息是否与年金险投被保人相同
      if(this.curRiskCode == "1318"){
          if(this.checked == "1"){
            if(this.appntName != this.proposerName){
              Dialog.alert({ content: "您年金险的投保人姓名与所选万能险的投保人姓名不符,请修改投保人姓名或重新选择万能险保单号" });
              return false;
            }else if(this.appntIdNo != this.proposerCard){
              Dialog.alert({ content: "您年金险的投保人证件号与所选万能险的投保人证件号不符,请修改投保人证件号或重新选择万能险保单号" });
              return false;
            }else if(this.insurerName != this.insuredName){
              Dialog.alert({ content: "您年金险的被保人姓名与所选万能险的被保人姓名不符,请修改被保人姓名或重新选择万能险保单号" });
              return false;
            }else if(this.insuredIdNo != this.insuredCard){
              Dialog.alert({ content: "您年金险的被保人证件号与所选万能险的被保人证件号不符,请修改被保人证件号或重新选择万能险保单号" });
              return false;
            }
          }
      }
      //万能险为年金险做信息缓存，年金险投保时清除
      if(this.curRiskCode == "1037"){
        let tempInfo1037 = {
            "proposerName": this.proposerName,
            "proposerCard": this.proposerCard,
            "proposerPhone": this.proposerPhone,
            "proposerEmail": this.proposerEmail,
            "proposerAddress1": this.proposerAddress1,
            "insuredName": this.insurerName,
            "insuredIdNo": this.insuredIdNo,
            "insuredPhone": this.insuredPhone,
            "insuredEmail": this.insuredEmail,
            "insuredAddress1": this.insuredAddress1
        }
        window.localStorage.setItem("tempInfo1037",JSON.stringify(tempInfo1037))
      }
      if(this.curRiskCode == "1318"){
        window.localStorage.removeItem("tempInfo1037")
        window.localStorage.removeItem("tempInfo1318")
      }
      this.insureSubmit();
    },

    insureSubmit() {
      //throttleFlag函数节流 默认是false，执行一下改为true,执行结束又回false
      if (this.throttleFlag) return;
      this.throttleFlag = true;
      let that = this;
      that.load_shence_zj_fill_info();
      var deviceId = that.deviceId;
      this.$app.getToken(function(userToken) {
        that.$request({
          url: `/contract/policytrade`,
          method: "POST",
          contentType: "application/json;charset=UTF-8",
          data: that.insuredData,
          isLoading: true,
          userToken: userToken,
          isSenceDeviceId: true,
          senceDeviceId: deviceId,
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
              let msgStr = data.policyInfoList[0].message;
              if(that.curRiskCode == "5319" || that.curRiskCode == "5317"){
                  if(msgStr.indexOf("不得重复投保") != -1){
                      // that.fjDutyName = "'不得重复投保'"
                      that.fjDutyFlag = '0';
                      that.jobMsgDialog1.open = true;
                 }
              }
              if((msgStr.indexOf("百年附加医惠通") != -1)&&(msgStr.indexOf("职业拒保") != -1)&&(msgStr.indexOf("百年附加投保人豁免") != -1)){
              		that.fjDutyName = "'附加投保人豁免保险费重大疾病保险（2018版）'以及'附加医惠通费用补偿医疗保险'"
									that.fjDutyFlag = '3';
									that.jobMsgDialog.open = true;
              }else if((msgStr.indexOf("百年附加医惠通") != -1)&&(msgStr.indexOf("职业拒保") != -1)){
              		that.fjDutyName = "'附加医惠通费用补偿医疗保险'"
									that.fjDutyFlag = '2';
									that.jobMsgDialog.open = true;
              }else if((msgStr.indexOf("百年附加投保人豁免") != -1)&&(msgStr.indexOf("职业拒保") != -1)){
              		that.fjDutyName = "'附加投保人豁免保险费重大疾病保险（2018版）'"
									that.fjDutyFlag = '1';
									that.jobMsgDialog.open = true;
              }else{
                  if(that.curRiskCode == "5319" || that.curRiskCode == "5317"){
                      if(msgStr.indexOf("不得重复投保") == -1){
                        that.basicDialog.msg = data.policyInfoList[0].message;
                        that.basicDialog.open = true;
                      }
                  }else{
                     that.basicDialog.msg = data.policyInfoList[0].message;
                     that.basicDialog.open = true;
                  }
              }
            } else if (data.policyInfoList[0].status == 2) {
                localStorage.removeItem("EXInfoQ");
                if (data.policyInfoList[0].message != "") {
                    localStorage.setItem("ERRInfo", data.policyInfoList[0].message);
                } else {
                    localStorage.setItem("ERRInfo", "");
                }
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
              // that.questionDialog.open = true
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
                  if (that.agentCode) {
                    location.href = `/product/UploadIDcard.html?orderNo=${
                      that.orderContent
                    }&status=5&isBenren=${isBenren}&product_id=${
                      that.product_id
                    }&agentCode=${that.agentCode}`;
                  } else {
                    location.href = `/product/UploadIDcard.html?orderNo=${
                      that.orderContent
                    }&status=5&isBenren=${isBenren}&product_id=${
                      that.product_id
                    }`;
                  }

                  return false;
                },
                function() {
                  // 正常流程走这里
                  if (that.agentCode) {
                    window.location.href =
                      that.$router.siteUrl() +
                      "/product/HumanNucleusSuccess.html?orderNo=" +
                      that.orderContent +
                      "&agentCode=" +
                      that.agentCode;
                  } else {
                    window.location.href =
                      that.$router.siteUrl() +
                      "/product/HumanNucleusSuccess.html?orderNo=" +
                      that.orderContent;
                  }
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
            } else if (data.resultMsg.indexOf("费率不存在") > -1) {
                that.goTrial()
            }else {
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

      if (that.agentCode) {
        window.location.href = `/product/ArtificialConfirm.html?product_id=${
          that.product_id
        }&orderNo=${data.policyInfoList[0].orderNo}&prtNo=${
          data.policyInfoList[0].prtNo
        }&antiMoneyFlag=${data.policyInfoList[0].antiMoneyFlag ||
          ""}&status=2&isBenren=${isBenren}&agentCode=${that.agentCode}`;
      } else {
        window.location.href = `/product/ArtificialConfirm.html?product_id=${
          that.product_id
        }&orderNo=${data.policyInfoList[0].orderNo}&prtNo=${
          data.policyInfoList[0].prtNo
        }&antiMoneyFlag=${data.policyInfoList[0].antiMoneyFlag ||
          ""}&status=2&isBenren=${isBenren}`;
      }
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
  },
  filters: {
    chooseCertificateType(myInput) {
      let result = "身份证";
      switch (myInput) {
        case "1":
          result = "身份证";
          break;
        case "2":
          result = "护照";
          break;
        default:
          result = "身份证";
      }
      return result;
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
  padding-right: 0.4rem !important;
  position: relative;
}


#block {
  padding-top: px2em(0px) !important;
  p {
    line-height: 1.65em;
  }
}

.box {
  padding: px2em(20px) px2em(24px) px2em(100px);
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
    left: 3.4em;
  }
}
.emailAdd{
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
.liveAgree{
    color: #666;
    font-size: 32px;
}
</style>

<style lang="scss">
    #readContent .md-agree-content{
        text-align: justify!important;
    }
    .box .md-field .md-field-content .emailAdd .md-field-item-content .md-field-item-title{
          width: 2.5rem !important;
    }
    #proposerAddress1 .md-field-item-content .md-field-item-title{
        margin-right: 0;
    }
		.jobMsgDialog .md-popup .md-popup-box .md-dialog-content .md-dialog-body{
			font-size: .4267rem;
			color: #111a34;
			padding-bottom: 0.3rem!important;
		}
		.jobMsgDialog .md-popup .md-popup-box .md-dialog-content .md-dialog-body .ifChoose{
			font-size: 0.37333rem;
			color: #666f83;
		}
		.jobMsgDialog .md-popup .md-popup-box .md-dialog-content .md-dialog-body .md-dialog-close{
			top: 0.15rem!important;
			right: 0.23rem!important;
			display: none;
		}
    .ifrenew:before{
        left: 0.1rem!important;
        top: 0.06rem!important;
    }
    .md-radio.is-checked .md-radio-icon{
        color:#d7000f!important;
    }
    .md-radio-label{
        font-size: 0.4rem!important;
        color: #111a34!important;
        margin-top: 0.26rem!important;
        margin-bottom: 0.26rem!important;
    }
    .policyNo .md-field-item-content{
        border-top: 0.02667rem solid #e2e4ea;
    }
</style>
