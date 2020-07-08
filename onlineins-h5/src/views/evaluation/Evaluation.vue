<!--use strict-->
<template>

    <div class="finalDiv">
        <img ref="shareImg" src="../../assets/imgs/evaluation/shareBoot.png" alt="" style="display: none;">
        <div class="content" ref="content" v-bind:style="{ height: bodyHeight + 'px' }"   id="content" >
            <div>
                <!--性别-->
                <div class="questionOne" id="mod1" >
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;1</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>该称呼您先生还是女士?</p>
                    </div>
                    <div class="contBottom">
                        <ul>
                            <li class="parW"><img src="../../assets/imgs/evaluation/man.png" id="sexMan"
                                                  @click="nextModal(1)"/>
                                <p class="describle">男</p></li>
                            <li class="parM"><img src="../../assets/imgs/evaluation/women.png" id="sexWoman"
                                                  @click="nextModal(2)"/>
                                <p class="describle">女</p></li>
                        </ul>
                    </div>
                </div>
                <!--年龄-->
                <div class="questionTwo" id="mod2" style="display: none;">
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;2</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>您的年龄（周岁）是？</p>
                    </div>
                    <div class="sliderMod">

                        <span class="minNum">18</span>
                        <span class="maxNum">70</span>
                        <md-slider v-model="quantity" :min="18" :max="70" class="mySlider" range></md-slider>
                        <p class="sliderNum">{{quantityAge}}岁</p>
                    </div>
                    <!--<div class="scale">
                        <em class="blue">18</em>
                        <form oninput="scaleShow.value=parseInt(scale.value)">
                            <input type="range" id="scale" min="18" max="70" v-model="rangeNum"/>
                            <output name="scaleShow" for="scale">18</output>
                            <span class="age">岁</span>
                        </form>

                        <em class="red">70</em>
                    </div>-->
                    <div class="continue parG">
                        <ul>
                            <li class="back" @click="backModal()"><<&nbsp;上一题</li>
                            <li class="next" @click="nextModal(10)">下一题&nbsp;>></li>
                        </ul>
                    </div>
                </div>
                <!--婚姻-->
                <div class="questionFour" id="mod3" style="display: none;">
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;3</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>您正处在人生哪个阶段？</p>
                    </div>
                    <div class="lifeStage">
                        <ul>
                            <li><img src="../../assets/imgs/evaluation/double.png" class="parL" id="single"
                                     @click="nextModal(3)"/>
                                <p>单身贵族</p></li>
                            <li><img src="../../assets/imgs/evaluation/doubleSpouse.png" class="parP" id="double"
                                     @click="nextModal(4)"/>
                                <p>二人世界</p></li>
                            <li><img src="../../assets/imgs/evaluation/Mask Copy 4@2x.png" class="parP" id="third"
                                     @click="nextModal(5)"/>
                                <p>美满家庭</p></li>
                        </ul>
                    </div>
                    <div class="continue">
                        <ul>
                            <li class="back" @click="backModal()"><<&nbsp;上一题</li>
                            <li class="next" @click="changeStatus()">下一题&nbsp;>></li>
                        </ul>
                    </div>
                </div>
                <!--收入-->
                <div class="questionFive" id="mod4" style="display: none;">
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;4</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>您的年收入？</p>
                    </div>
                    <!--     <div class="scale">
                             <em class="blue">5</em>
                             <form oninput="scaleShows.value=parseInt(scales.value)">
                                 <input type="range" id="scales" min="5" max="100" v-model="rangeNums"/>
                                 <output name="scaleShows" for="scales">5</output>
                                 <span v-if="showHundred == 0" class="ageMiddle" ref="age">万</span>
                                 <span v-if="showHundred == 1" class="age" ref="age">万</span>
                                 <span v-else-if="showHundred == 2" class="ages" ref="ages">万及以上</span>
                                 <span v-else-if="showHundred == 3" class="ageSamll" ref="ages">万及以下</span>
                             </form>
                             <em class="red">100</em>
                         </div>-->

                    <div class="sliderMod">

                        <span class="minNum">5</span>
                        <span class="maxNum">100</span>
                        <md-slider v-model="quantityIncome" :min="5" :max="100" class="mySlider" range></md-slider>

                        <p class="sliderNum" v-if="showHundred === 1">{{evaluationIncome}}万及以下</p>
                        <p class="sliderNum" v-else-if="showHundred === 2">{{evaluationIncome}}万及以上</p>
                        <p class="sliderNum" v-else>{{evaluationIncome}}万</p>
                    </div>
                    <div class="continue parG">
                        <ul>
                            <li class="back" @click="backModal()"><<&nbsp;上一题</li>
                            <li class="next" @click="nextModal()">下一题&nbsp;>></li>
                        </ul>
                    </div>
                </div>
                <!--社保-->
                <div class="questionSix" id="mod5" style="display: none;">
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;5</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>是否有社保？</p>
                    </div>
                    <div class="contBottom contS">
                        <ul>
                            <li class="parW">
                                <div class="social" @click="chooseSocial(1)" id="socialOne"><span>无社保</span></div>
                            </li>
                            <li class="parM">
                                <div class="social" @click="chooseSocial(2)" id="socialTwo"><span>有社保</span></div>
                            </li>
                        </ul>
                    </div>
                    <div class="continue">
                        <ul>
                            <li class="back" @click="backModal()"><<&nbsp;上一题</li>
                            <li class="next" @click="changeSocial()">下一题&nbsp;>></li>
                        </ul>
                    </div>
                </div>
                <!--input-->
                <div class="questionSeven" id="mod6" style="display: none;" >
                    <div class="contTop">
                        <div class="parQ">
                            <p>问题&nbsp;&nbsp;6</p>
                        </div>
                    </div>
                    <div class="contMiddle">
                        <p>请补充已购买保障</p>
                    </div>
                    <div class="inputList">
                        <ul>
                            <li>人寿保障<md-icon
                                name="question" @click="openTip(1)"
                                size="md" class="questionInput"  color="#62FEFF"
                            ></md-icon></li>
                            <li class="moneyPicker" data-val="lifeShow"     @click="showMoneyPicker($event)"> {{life}} </li><span>万</span>
                        </ul>
                        <ul>
                            <li>重疾保障<md-icon
                                name="question"
                                @click="openTip(2)"
                                color="#62FEFF"   size="md" class="questionInput"
                            ></md-icon></li>
                            <li class="moneyPicker" data-val="sicknessShow"      @click="showMoneyPicker($event)"> {{sickness}} </li><span>万</span>
                        </ul>
                        <ul>
                            <li>意外保障</li>
                            <li class="moneyPicker" data-val="accidentShow"     @click="showMoneyPicker($event)"> {{accident}} </li><span>万</span>
                        </ul>
                        <ul>
                            <li>医疗保障</li>
                            <li class="moneyPicker" data-val="hospitalShow"     @click="showMoneyPicker($event)"> {{hospital}} </li><span>万</span>
                        </ul>
                        <ul>
                            <li>储蓄教育及养老</li>
                            <li class="moneyPicker" data-val="yearAmountShow"      @click="showMoneyPicker($event)"> {{yearAmount}}</li><span>万</span>
                        </ul>

                    </div>
                    <div class="continue contQ">
                        <ul>
                            <li class="back" @click="backModal()"><<&nbsp;上一题</li>
                            <li class="next" @click="generateReport()">下一题&nbsp;>></li>
                        </ul>
                    </div>
                </div>
                <!--报告-->
                <div class="conD" id="mod7"   style="display: none;" >
                    <div class="conTop">
                        <img :src="avatorUrl" class="myAvator"/>
                        <span>您的测评结果</span>
                        <!--  <p  class="goFamily" @click="goFamily">测测家人<img
                              src="../../assets/imgs/evaluation/arrow.png"/></p>-->
                        <p v-if="!isAppBrowser" class="goFamily" @click="goFamily">测测家人<img
                            src="../../assets/imgs/evaluation/arrow.png"/></p>
                        <div class="resultTag">
                            <ul>
                                <li v-for="item in tags">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="conMid">
                        <div class="gap">
                            <p class="gapQuestion">
                                保障缺口
                                <!--<md-icon
                                    name="question"
                                    size="lg"
                                    @click="basicDialog.open = true"
                                ></md-icon>-->
                            </p>
                        </div>
                        <div class="conK">
                            <div class="Analysis">

                                <div class="bgPic"></div>
                                <div class="midPic">
                                    <p class="lastUser">落后{{lastPercent}}%的用户</p>
                                    <p class="userScore"><span>{{myScore}}</span>分</p>
                                    <img src="../../assets/imgs/evaluation/bgPercent.png"></div>
                                <div class="life parLife">
                                    <span>{{lifeNum | toInt}}万</span>
                                    <p class="guarantee">人寿保障缺口</p>
                                </div>
                                <div class="illness parLife">
                                    <span>{{sicknessNum | toInt}}万</span>
                                    <p class="guarantee">重疾保障缺口</p>
                                </div>
                                <div class="accident parLife">
                                    <span>{{accidentNum | toInt}}万</span>
                                    <p class="guarantee">意外保障缺口</p>
                                </div>
                                <div class="medical parLife">
                                    <span>{{hospitalNum | toInt}}万</span>
                                    <p class="guarantee">医疗保障缺口</p>
                                </div>
                                <div class="savings parLife">
                                    <span>{{yearNum | toInt}}万</span>
                                    <p class="guarantee">储蓄教育及养老保障缺口</p>
                                </div>
                            </div>
                            <div class="resultList">
                                <h3>测评分析:</h3>
                                <p>{{description}}</p>
                            </div>
                            <div class="blank"></div>
                            <!--  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-2 myTabBar" ref="myTabBar">
                                  <md-tab-bar
                                      v-model="currents"
                                      :items="items"
                                      :maxLength="4"
                                      @change="onChange"
                                  />
                              </div>-->
                            <div class="tabOptions">
                                <div class="tabTitle">
                                    为您推荐
                                </div>
                                <div class="blueBlank"></div>
                                <p class="tabTips">综合您的年龄、收入及偏好，结合双十定律及标准普尔四象限法，为您精准推荐以下产品</p>
                               <div class="scrollDiv">
                                   <ul class="myTabOptions" id="myTabOptions" ref="myTabOptions">
                                       <li :class="item.isActive? 'tabActive':''" @click="onTabChange($event,item)" v-for="item in items">{{item.label}}</li>
                                   </ul>
                               </div>
                            </div>
                            <div class="lifeContent" v-if="showWaitProduct === 0">
                                <div class="tabResult" v-for="item in recommandProduct">
                                    <img :src="item.imageUrl" @click="goBuy(item)"
                                         class="lifePic"/>
                                    <div class="productIndruce">
                                        <ul>
                                            <li><img src="@/assets/imgs/evaluation/qian@2x.png"/>
                                                <p>建议投保额度</p>
                                                <span>{{adviceAmntQuota}}W</span>
                                            </li>
                                            <li class="parLi"><img src="@/assets/imgs/evaluation/nianling@2x.png"/>
                                                <p>投保年龄</p>
                                                <span>{{item.insureAgeStart}}{{item.insureAgeStartFlag === "A"?'岁':'天'}}~{{item.insureAgeEnd}}{{item.insureAgeEndFlag === "A"?'岁':'天'}}</span>
                                            </li>
                                            <img src="../../assets/imgs/evaluation/splitLine.png" class="rules"/>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="lifeContent" v-else-if="showWaitProduct === 1" >
                                 <div class="costEffective  ">
                                     <img src="@/assets/imgs/evaluation/costEffective.png" />
                                     <p>正在筹备高性价比的相关产品<br>
                                         敬请期待</p>
                                 </div>
                            </div>
                            <div class="lifeContent" v-else-if="showWaitProduct === 2" >
                                 <div class="costEffective  ">
                                     <img src="@/assets/imgs/evaluation/costEffective.png" />
                                     <p>无缺口，给您点赞</p>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div class="btnBox">
                        <button class="againTest" @click="againTest">重新测试</button>
                        <!--<button class="shareResult" @click="goShare">分享我的结果</button>-->
                    </div>
                </div>

                <md-dialog
                    title='提示'
                    :closable="true"
                    v-model="basicDialog.open"
                    :btns="basicDialog.btns">
                    <p>根据“双十法则”，“标准普尔四象限法”计算保额缺口。</p>


                </md-dialog>

            </div>


        </div>

        <div class="extraQuestion" ref="extraQuestion" id="extraQuestion"  style="display: none;" >
           <!-- <p class="extraTitle">为了生成更精准的测评结果，请您回答以下问题：</p>-->
            <div class="contTop">
                <div class="parQ">
                    <p>终极一问</p>
                </div>
            </div>
            <div class="questionOne parT" v-if="showHospitalQuestion">
                <p class="oneTitle">
                    *{{relation === '本人'?'您': relation === '父母'?'您父母':relation === '未成年子女' || relation === '成年子女'?'您孩子':relation === '配偶'?'您配偶': ''}}是否患有三高、糖尿病、风湿 ？
                </p>
                <div class="option">
                    <md-radio class="optionOne" name="1" v-model="sufferingIllness" label="是" inline />
                    <md-radio class="optionTwo"  name="2" v-model="sufferingIllness" label="否" inline />
                </div>
            </div>
            <div  :class="showHospitalQuestion?'questionOne':'questionOneQ'" v-if="showSicknessQuestion">
                <div class="questionSelect">
                    <p class="questionTitle">
                        * {{relation === '配偶'?'您配偶':'您'}}家族有心脏病遗传史吗 ？
                    </p>
                    <div class="option">
                        <md-radio class="optionOne" name="1" v-model="heartDisease" label="有" inline></md-radio>
                        <md-radio class="optionTwo"  name="2" v-model="heartDisease" label="没有" inline></md-radio>
                    </div>
                </div>
                <div class="questionSelect">
                    <p class="questionTitle">
                        * {{relation === '本人'?'您': relation === '父母'?'您父母':relation === '未成年子女' || relation === '成年子女'?'您孩子':relation === '配偶'?'您配偶': ''}}是否符合如下情况？（多选）
                    </p>
                    <div class="myOption">
                        <p @click="showOptions('highPressure')"><md-radio class="illness" name="1" v-model="highPressure" label="工作繁忙，压力大" ></md-radio></p>
                        <p  class="fatTip"><md-radio @click="showOptions('fat')" class="illness" name="1" v-model="fat" label="肥胖"> </md-radio> <md-icon
                            name="question"
                            @click="openTip(3)"
                            size="md" class="myQuestionInput"
                            color="#62FEFF"
                        ></md-icon> </p>
                        <p @click="showOptions('excessive')"><md-radio class="illness" name="1" v-model="excessive" label="过量吸烟及喝酒"></md-radio></p>
                        <p><md-radio class="illness" name="1" v-model="aboveInconformity" label="以上均不符合"></md-radio></p>
                    </div>
                </div>

            </div>
            <div class="bottomFixed">
                <div :class="showHospitalQuestion && !showSicknessQuestion? 'btnBox btnBoxOne':
!showHospitalQuestion && showSicknessQuestion?'btnBoxTwo btnBox':'btnBox'
">
                    <p class="partOne" @click="fillIn">不想填</p>
                    <p class="partTwo" @click="submit">提交</p>
                </div>
                <p class="bottomTip">本次结果仅用于测评，不影响您的投保结果</p>
            </div>
        </div>

        <md-picker
            ref="life"
            v-model="lifeShow"
            :data="lifeData"
            @confirm="onPickerConfirmLife()"
            title="选择保额"
        ></md-picker>
        <md-picker
            ref="sickness"
            v-model="sicknessShow"
            :data="sicknessData"
            @confirm="onPickerConfirmSickness()"
            title="选择保额"
        ></md-picker>
        <md-picker
            ref="accident"
            v-model="accidentShow"
            :data="accidentData"
            @confirm="onPickerConfirmAccident()"
            title="选择保额"
        ></md-picker>
        <md-picker
            ref="hospital"
            v-model="hospitalShow"
            :data="hospitalData"
            @confirm="onPickerConfirmHospital()"
            title="选择保额"
        ></md-picker>
        <md-picker
            ref="yearAmount"
            v-model="yearAmountShow"
            :data="yearData"
            @confirm="onPickerConfirmYearAmount()"
            title="选择保额"
        ></md-picker>

        <div class="myReport"   v-bind:style="{ height: bodyHeight + 'px' }"
             id="myReport" style="display: none;">

            <div class="myFamily" id="myFamily">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;1</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>请选择您要为哪位家人测评？</p>
                </div>
                <div class="contBottom familyMember">
                    <ul>
                        <li class="parW"><img src="../../assets/imgs/evaluation/doubleSpouse.png"
                                              @click="chooseRealation(1)"/>
                            <p class="describle">配偶</p></li>
                        <li class="parM"><img src="../../assets/imgs/evaluation/myParent.png"
                                              @click="chooseRealation(2)"/>
                            <p class="describle">父母</p></li>
                        <li class="parW"><img src="../../assets/imgs/evaluation/minorChildren.png"
                                              @click="chooseRealation(3)"/>
                            <p class="describle">未成年子女</p></li>
                        <li class="parM"><img src="../../assets/imgs/evaluation/adultChildren.png"
                                              @click="chooseRealation(4)"/>
                            <p class="describle">成年子女</p></li>
                    </ul>
                </div>
            </div>


            <!--年龄-->
            <div class="questionTwo" id="modAge" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>您{{relation}}的年龄（周岁）是？</p>
                </div>
                <div class="sliderMod">

                    <span class="minNum">18</span>
                    <span class="maxNum">70</span>
                    <md-slider v-model="quantity" :min="18" :max="70" class="mySlider" range></md-slider>
                    <p class="sliderNum">{{quantityAge}}岁</p>
                </div>
                <!--   <div class="scale">
                       <em class="blue">18</em>
                       <form oninput="scaleShow.value=parseInt(scaleR.value)">
                           <input type="range" id="scaleR" min="18" max="70" v-model="rangeNum"/>
                           <output name="scaleShow" for="scaleR">18</output>
                           <span class="age">岁</span>
                       </form>

                       <em class="red">70</em>
                   </div>-->
                <div class="continue parG">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="nextQuestion()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>
            <div class="questionTwo" id="childModAge" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>您{{relation}}的年龄（周岁）是？</p>
                </div>
                <!--     <div class="scale">
                         <em class="blue">1</em>
                         <form oninput="scaleShow.value=parseInt(scaleP.value)">
                             <input type="range" id="scaleP" min="1" max="17" v-model="rangeNum"/>
                             <output name="scaleShow" for="scaleP">17</output>
                             <span class="age">岁</span>
                         </form>

                         <em class="red">17</em>
                     </div>-->
                <div class="sliderMod">

                    <span class="minNum">1</span>
                    <span class="maxNum">17</span>
                    <md-slider v-model="quantityChild" :min="1" :max="17" class="mySlider" range></md-slider>
                    <p class="sliderNum">{{quantityChildAge}}岁</p>
                </div>
                <div class="continue parG">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="nextQuestion()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>
            <!--婚姻-->
            <div class="questionFour" id="modLife" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>您{{relation}}正处在人生哪个阶段？</p>
                </div>
                <div class="lifeStage">
                    <ul>
                        <li><img src="../../assets/imgs/evaluation/double.png" class="parL"
                                 id="childSingle" @click="nextQuestion(1)"/>
                            <p>单身贵族</p></li>
                        <li><img src="../../assets/imgs/evaluation/doubleSpouse.png" class="parP"
                                 id="childDouble" @click="nextQuestion(2)"/>
                            <p>二人世界</p></li>
                        <li><img src="../../assets/imgs/evaluation/Mask Copy 4@2x.png" class="parP"
                                 id="childThird" @click="nextQuestion(3)"/>
                            <p>美满家庭</p></li>
                    </ul>
                </div>
                <div class="continue">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="changeStatus()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>
            <!--收入-->
            <div class="questionFive" id="modIncome" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>您{{relation}}的年收入？</p>
                </div>

                <div class="sliderMod">

                    <span class="minNum">5</span>
                    <span class="maxNum">100</span>
                    <md-slider v-model="quantityFamilyIncome" :min="5" :max="100" class="mySlider" range></md-slider>

                    <p class="sliderNum" v-if="showHundredFamily === 1">{{evaluationFamilyIncome}}万及以下</p>
                    <p class="sliderNum" v-else-if="showHundredFamily === 2">{{evaluationFamilyIncome}}万及以上</p>
                    <p class="sliderNum" v-else>{{evaluationFamilyIncome}}万</p>
                </div>
                <!--                <div class="scale">
                                    <em class="blue">5</em>
                                    <form oninput="scaleShows.value=parseInt(scales.value)">
                                        <input type="range" id="scaleQ" min="5" max="100" v-model="rangeNums"/>
                                        <output name="scaleShows" for="scales">5</output>
                                        <span v-if="showHundred == 0" class="ageMiddle" ref="age">万</span>
                                        <span v-if="showHundred == 1" class="age" ref="age">万</span>
                                        <span v-else-if="showHundred == 2" class="ages" ref="ages">万及以上</span>
                                        <span v-else-if="showHundred == 3" class="ageSamll" ref="ages">万及以下</span>
                                    </form>
                                    <em class="red">100</em>
                                </div>-->
                <div class="continue parG">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="nextQuestion()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>
            <!--社保-->
            <div class="questionSix" id="modSocial" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>是否有社保？</p>
                </div>
                <div class="contBottom contS">
                    <ul>
                        <li class="parW">
                            <div class="social" @click="chooseFamilySocial(1)" id="socialFamilyOne"><span>无社保</span>
                            </div>
                        </li>
                        <li class="parM">
                            <div class="social" @click="chooseFamilySocial(2)" id="socialFamilyTwo"><span>有社保</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="continue">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="changeSocial()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>
            <!--input-->
            <div class="questionSeven" id="modInput" style="display: none;">
                <div class="contTop">
                    <div class="parQ">
                        <p>问题&nbsp;&nbsp;{{currentIndex + 2}}</p>
                    </div>
                </div>
                <div class="contMiddle">
                    <p>请补充已购买保障</p>
                </div>
                <div class="inputList">
                    <ul>
                        <li>人寿保障 <md-icon
                            name="question" @click="openTip(1)"
                            color="#62FEFF"  size="md" class="questionInput"
                        ></md-icon></li>
                        <li class="moneyPicker" data-val="lifeShow"     @click="showMoneyPicker($event)"> {{life}} </li><span>万</span>
                    </ul>
                    <ul>
                        <li>重疾保障<md-icon
                            name="question"
                            color="#62FEFF"  @click="openTip(2)"
                            size="md" class="questionInput"
                        ></md-icon></li>
                        <li class="moneyPicker" data-val="sicknessShow"      @click="showMoneyPicker($event)"> {{sickness}} </li><span>万</span>
                    </ul>
                    <ul>
                        <li>意外保障</li>
                        <li class="moneyPicker" data-val="accidentShow"     @click="showMoneyPicker($event)"> {{accident}} </li><span>万</span>
                    </ul>
                    <ul>
                        <li>医疗保障</li>
                        <li class="moneyPicker" data-val="hospitalShow"     @click="showMoneyPicker($event)"> {{hospital}} </li><span>万</span>
                    </ul>
                    <ul>
                        <li>储蓄教育及养老</li>
                        <li class="moneyPicker" data-val="yearAmountShow"      @click="showMoneyPicker($event)"> {{yearAmount}}</li><span>万</span>
                    </ul>

                </div>
                <div class="continue contQ">
                    <ul>
                        <li class="back" @click="backQuestion()"><<&nbsp;上一题</li>
                        <li class="next" @click="generateFamilyReport()">下一题&nbsp;>></li>
                    </ul>
                </div>
            </div>

            <!--报告-->
            <div class="conD" id="modReport" style="display: none;">
                <div class="conTop">
                    <img :src="avatorUrl" class="myAvator"/>
                    <span>您{{relation}}的测评结果</span>
                    <div class="resultTag">
                        <ul>
                            <li v-for="item in tags">{{item}}</li>
                        </ul>
                    </div>
                </div>
                <div class="conMid">
                    <div class="gap">
                        <p class="gapQuestion">
                            保障缺口
                          <!--  <md-icon
                                name="question"
                                size="lg"
                                @click="basicDialog.open = true"
                            ></md-icon>-->
                        </p>
                    </div>
                    <div class="conK">
                        <div class="Analysis" v-if="relation === '未成年子女'">

                            <div class="bgPic childBgPic"></div>
                            <div class="midPic">
                                <p class="lastUser">落后{{lastPercent}}%的用户</p>
                                <p class="userScore"><span>{{myScore}}</span>分</p>
                                <img src="../../assets/imgs/evaluation/bgPercent.png"></div>
                            <div class="illness parLife childLife">
                                <span v-if="showAmount">{{sicknessNum | toInt}}万</span>
                                <p v-if="!showAmount" class="guarantee particular">重疾保障缺口</p>
                                <p v-if="showAmount" class="guarantee">重疾保障缺口</p>
                            </div>
                            <div class="medical parLife childMedical">
                                <span v-if="showAmount">{{hospitalNum | toInt}}万</span>
                                <p v-if="!showAmount" class="guarantee particular">医疗保障缺口</p>
                                <p v-if="showAmount" class="guarantee">医疗保障缺口</p>
                            </div>
                            <div class="savings parLife childSavings">
                                <span v-if="showAmount">{{yearNum | toInt}}万</span>
                                <p v-if="showAmount" class="guarantee">储蓄教育及养老保障缺口</p>
                                <p v-if="!showAmount" class="guarantee particular">储蓄教育及养老保障缺口</p>
                            </div>
                        </div>

                        <div class="Analysis" v-else>

                            <div class="bgPic"></div>
                            <div class="midPic">
                                <p class="lastUser">落后{{lastPercent}}%的用户</p>
                                <p class="userScore"><span>{{myScore}}</span>分</p>
                                <img src="../../assets/imgs/evaluation/bgPercent.png"></div>
                            <div class="life parLife">
                                <span v-if="showAmount">{{lifeNum | toInt}}万</span>
                                <p v-if="showAmount" class="guarantee">人寿保障缺口</p>
                                <p v-if="!showAmount" class="guarantee particular">人寿保障缺口</p>
                            </div>
                            <div class="illness parLife">
                                <span v-if="showAmount">{{sicknessNum | toInt}}万</span>
                                <p v-if="!showAmount" class="guarantee particular">重疾保障缺口</p>
                                <p v-if="showAmount" class="guarantee">重疾保障缺口</p>
                            </div>
                            <div class="accident parLife">
                                <span v-if="showAmount">{{accidentNum | toInt}}万</span>
                                <p v-if="showAmount" class="guarantee">意外保障缺口</p>
                                <p v-if="!showAmount" class="guarantee particular">意外保障缺口</p>
                            </div>
                            <div class="medical parLife">
                                <span v-if="showAmount">{{hospitalNum | toInt}}万</span>
                                <p v-if="!showAmount" class="guarantee particular">医疗保障缺口</p>
                                <p v-if="showAmount" class="guarantee">医疗保障缺口</p>
                            </div>
                            <div class="savings parLife">
                                <span v-if="showAmount">{{yearNum | toInt}}万</span>
                                <p v-if="showAmount" class="guarantee">储蓄教育及养老保障缺口</p>
                                <p v-if="!showAmount" class="guarantee particular">储蓄教育及养老保障缺口</p>
                            </div>
                        </div>
                        <div class="resultList">
                            <h3>测评分析:</h3>
                            <p>{{description}}</p>
                        </div>
                        <div class="blank"></div>

                        <div class="tabOptions">
                            <div class="tabTitle">
                                为您推荐
                            </div>
                            <div class="blueBlank"></div>
                            <p class="tabTips">综合{{relation === '本人'?'您': relation === '父母'?'您父母':relation === '未成年子女' || relation === '成年子女'?'您孩子':relation === '配偶' ?'您配偶': ''}}的年龄、收入及偏好，结合双十定律及标准普尔四象限法，为您精准推荐以下产品</p>
                            <div class="scrollDiv">
                              <ul class="myTabOptions" id="myTabOptionsQ" ref="myTabOptions">
                                <li :class="item.isActive? 'tabActive':''" @click="onTabChange($event,item)" v-for="item in items">{{item.label}}</li>
                              </ul>
                            </div>
                        </div>
                        <div class="lifeContent"   v-if="showWaitProduct === 0">
                            <div class="tabResult" v-for="item in recommandProduct">
                                <img :src="item.imageUrl" @click="goBuy(item)"
                                     class="lifePic"/>
                                <div class="productIndruce" v-if="relation !== '父母' && relation !== '未成年子女'">
                                    <ul>
                                        <li><img src="@/assets/imgs/evaluation/qian@2x.png"/>
                                            <p>建议投保额度</p>
                                            <span>{{adviceAmntQuota}}W</span>
                                        </li>
                                        <li class="parLi"><img src="@/assets/imgs/evaluation/nianling@2x.png"/>
                                            <p>投保年龄</p>
                                            <span>{{item.insureAgeStart}}{{item.insureAgeStartFlag === "A"?'岁':'天'}}~{{item.insureAgeEnd}}{{item.insureAgeEndFlag === "A"?'岁':'天'}}</span>
                                        </li>
                                        <img src="../../assets/imgs/evaluation/splitLine.png" class="rules"/>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="lifeContent" v-else-if="showWaitProduct === 1" >
                            <div class="costEffective  ">
                                <img src="@/assets/imgs/evaluation/costEffective.png" />
                                <p>正在筹备高性价比的相关产品<br>
                                    敬请期待</p>
                            </div>
                        </div>
                        <div class="lifeContent" v-else-if="showWaitProduct === 2" >
                            <div class="costEffective  ">
                                <img src="@/assets/imgs/evaluation/thumbsUp.png" />
                                <p>无缺口，给您点赞   </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnBox">
                    <button class="againTest" @click="againFamilyTest">重新测试</button>
                    <!--<button class="shareResult" @click="goShare">分享我的结果</button>-->
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import '../../assets/animate.min.css'
    import addresstest from '@/static/address.js'
    import '../../assets/evaluation.scss'
    import { Dialog,  Toast } from 'mand-mobile'
    import {lifeData, sicknessData, accidentData, hospitalData, yearData} from './data.js'
    import { debounce} from  '../../utils/utils'

    export default {
        name: 'sex',
        components: {
        },
        data () {
            return {
                complexShow: false,
                complexData: null,
                shareImg: require('@/assets/imgs/evaluation/shareBoot.png'),
                checkNumFlag: false,
                current: 1,
                showLoad: false,
                currents: 1,
                currentQ: 1,
                items: [
                    {
                        label:"重疾",
                        isActive:true,
                        name:1
                    },
                    {
                        label:"人寿",
                        isActive:false,
                        name:2
                    },
                    {
                        label:"医疗",
                        isActive:false,
                        name:3
                    },
                    {
                        label:"意外",
                        isActive:false,
                        name:4
                    },
                    {
                        label:"储蓄教育及养老",
                        isActive:false,
                        name:5
                    }
                ],
                tags: [],
                modelName: '',
                questionOne: true,
                questionFour: false,
                questionSix: false,
                _curModIdx: 1,
                jobNum: addresstest,
                pickerDefaultIndex: [],
                pickerDefaultValue: [],
                pickerValue: '',
                addJson: '',
                insureSex: '',
                life: 0,
                sickness: 0,
                accident: 0,
                hospital: 0,
                yearAmount: 0,
                marrirageRelation: '',
                socialFlag: '',
                rangeNum: 18,
                rangeNums: 5,
                description: '',
                lifeNum: 0,
                sicknessNum: 0,
                accidentNum: 0,
                adviceAmntQuota: 0,
                particular: false,
                hospitalNum: 0,
                yearNum: 0,
                lastPercent: '',
                myScore: '',
                isClick: true,
                bodyHeight: '',
                tabCurrent: 1,
                relation: '本人',
                recommandProduct: [],
                recommandProductList: [],
                insuredAmountVO: {
                    lifeAmount: 0,
                    sicknessAmount: 0,
                    accidentAmount: 0,
                    hospitalizationAmount: 0,
                    annuityAmount: 0
                },
                avatorUrl: require('../../assets/imgs/evaluation/avaitor.png'),
                avatorUrlMan: require('../../assets/imgs/evaluation/man.png'),
                avatorUrlWomen: require('../../assets/imgs/evaluation/women.png'),
                avatorUrlSpouse: require('../../assets/imgs/evaluation/doubleSpouse.png'),
                avatorUrlParent: require('../../assets/imgs/evaluation/myParent.png'),
                avatorUrlChild: require('../../assets/imgs/evaluation/minorChildren.png'),
                avatorUrlAdult: require('../../assets/imgs/evaluation/adultChildren.png'),
                showHundred: 0,
                basicDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确认',
                            handler: this.onBasicConfirm
                        }
                    ]
                },
                minAge: '18',
                maxAge: '70',
                defaultAge: '18',
                questionArr: [],
                currentIndex: -1,
                report_id: '',
                showAmount: true,
                isAppBrowser: false,
                showHundredFamily: 0,
                quantity: 28,
                quantityAge: 28,
                quantityIncome: 10,
                evaluationIncome: 10,
                quantityFamilyIncome: 10,
                evaluationFamilyIncome: 10,
                quantityChild: 8,
                quantityChildAge: 8,
                reportDetail_id: '',
                changeName: 0,
                options: {

                },
                lifeShow: false,
                sicknessShow: false,
                accidentShow: false,
                hospitalShow: false,
                yearAmountShow: false,
                lifeData: lifeData ,
                sicknessData: sicknessData,
                accidentData: accidentData,
                hospitalData: hospitalData,
                yearData:yearData,
                sufferingIllness: '',
                heartDisease: '',
                highPressure: '',
                fat: '',
                excessive: '',
                aboveInconformity: '',
                showSicknessQuestion: false,
                showHospitalQuestion: false,
                status: '',  // 总状态
                statusZJ: '', // 重疾题目状态
                statusYL: '',  // 医疗题目状态
                result_id: null,
                showWaitProduct:0
            }
        },
        created () {
            this.report_id = this.$router.query('report_id')
            this.postAnswer = debounce(this.postAnswer,300)
            document.title = '智能评测'
            /* document.addEventListener("visibilitychange", function () {
                 if (!document.hidden) {
                     that.postAnswer()
                 }
             }, false); */
            let that = this
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('navigationConfig', {
                    'flag_show': 1,
                    'flag_back': 1, // 是否显示返回按钮，1-显示 0-不显示
                    // 'title': '智能评测报告', //标题
                    'flag_share': 1, // 是否显示分享按钮，1-显示 0-不显示
                    'flag_service': 0, // 是否显示现在客服的按钮，1-显示 0-不显示
                    'share_url': that.$router.siteUrl() + '/evaluation/Evaluation.html', // 分享跳转的url
                    'share_title': '百年人寿智能评测', // 分享标题
                    'share_text': '测一测你的综合保障指数', // 分享描述
                    'share_imgurl': that.$router.siteUrl() + that.shareImg // 分享图片地址
                }, function (response) {
                })
            })
        },

        mounted () {
            this.bodyHeight = document.documentElement.clientHeight
            if (this.report_id == '2') {
                document.getElementById('content').style.display = 'none'
                document.getElementById('myReport').style.display = 'block'
            }
                // 分享图片

                this.options.href = location.href
                this.options.title = '百年人寿智能评测'
                this.options.desc = '测一测你的综合保障指数'
                this.options.link = this.$router.siteUrl() + '/evaluation/Evaluation.html'
                this.options.imgUrl = this.$router.siteUrl() + this.shareImg
                this.$app.wxShareDetail(this.options)

                /*    //返回首页
                    setupWebViewJavascriptBridge(function (bridge) {
                        //导航是否显示分享按钮，分享内容先固定死
                        bridge.callHandler('backHomeConfig', {
                            'flag_back': 1, //是否显示返回按钮，1-显示 0-不显示
                        }, function (response) {
                        });
                    }) */
            let result = this.$app.isBrowser()
            if (!result) {
                this.isAppBrowser = true
            } else {
                this.isAppBrowser = false
            }

            window.PickerTrigger0 = () => {
                this.getColumnValues('picker')
            }
        },
        updated () {
            this.quantityAge = Array.isArray(this.quantity) ? this.quantity[0] : this.quantity
            this.quantityChildAge = Array.isArray(this.quantityChild) ? this.quantityChild[0] : this.quantityChild
            this.evaluationIncome = Array.isArray(this.quantityIncome) ? this.quantityIncome[0] : this.quantityIncome
            if (this.evaluationIncome == 5) {
                this.showHundred = 1
            } else if (this.evaluationIncome == 100) {
                this.showHundred = 2
            } else {
                this.showHundred = 0
            }
            // 家人收入
            this.evaluationFamilyIncome = Array.isArray(this.quantityFamilyIncome) ? this.quantityFamilyIncome[0] : this.quantityFamilyIncome
            if (this.evaluationFamilyIncome == 5) {
                this.showHundredFamily = 1
            } else if (this.evaluationFamilyIncome == 100) {
                this.showHundredFamily = 2
            } else {
                this.showHundredFamily = 0
            }

            if (this.aboveInconformity !== '') {
                this.highPressure = ''
                this.fat = ''
                this.excessive = ''
            }
        },
        methods: {
            openTip(index){
                if( index === 2 ){
                    Dialog.alert({content: '以特定重大疾病，如恶性肿瘤、急性心肌梗塞等为保障项目，当被保险人患有上述疾病时，由保险公司按合同约定的保额给付。'})
                }else if( index === 1 ){
                    Dialog.alert({content: '以被保险人的寿命为保险标的，且以被保险人的生存或死亡为给付条件的人身保险。'})
                }else if(index === 3){
                    Dialog.alert({content: '（*BMI>=28,BMI=体重（KG）/身高（M）/身高（M））'})
                }
            },
            showOptions (index) {
                this[`${index}`] = '1'
                this.aboveInconformity = ''
            },
            showMoneyPicker (e, index) {
                this[e.target.dataset.val] = true
            },
            // ui框架选择器 confirm
            onPickerConfirmLife () {
                const values = this.$refs.life.getColumnValues()
                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text} `)
                })
                res = res.replace(/万/g, '')
                res = res.trim()
                this.life = res
            },
            onPickerConfirmSickness () {
                const values = this.$refs.sickness.getColumnValues()
                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text} `)
                })
                res = res.replace(/万/g, '')
                res = res.trim()
                this.sickness = res
            },
            onPickerConfirmAccident () {
                const values = this.$refs.accident.getColumnValues()
                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text} `)
                })
                res = res.replace(/万/g, '')
                res = res.trim()
                this.accident = res
            },
            onPickerConfirmHospital () {
                const values = this.$refs.hospital.getColumnValues()
                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text} `)
                })
                res = res.replace(/万/g, '')
                res = res.trim()
                this.hospital = res
            },
            onPickerConfirmYearAmount () {
                const values = this.$refs.yearAmount.getColumnValues()
                let res = ''
                values.forEach(value => {
                    value && (res += `${value.text} `)
                })
                res = res.replace(/万/g, '')
                res = res.trim()
                this.yearAmount = res
            },
          /*  getColumnValues(picker) {
                const value = this.$refs[picker].getColumnValues()
                Dialog.alert({
                    content: `<pre>${JSON.stringify(value)}</pre>`,
                })
            }, */
            // 为家人评测
            /*
            * 1.配偶    【年龄，居住地区，年收入，社保，保障额度】【mod2,mod3,mod5,mod6,mod7】
            * 2.父母    【年龄，社保，保障额度】 【mod2,mod6,mod7】
            * 3.未成年子女 【年龄，保障额度】   【mod2,mod7】
            * 4.成年子女 【年龄，居住地区，人生阶段,年收入，社保，保障额度】 【mod2,mod3,mod4,mod5,mod6,mod7】
            * */

            chooseRealation (n) {
                this.accident = 0
                this.yearAmount = 0
                this.hospital = 0
                this.life = 0
                this.sickness = 0
                this.socialFlag = ''
                this.quantityAge = '0'
                this.marrirageRelation = ''
                this.evaluationIncome = 0
                this.sufferingIllness = ''
                this.heartDisease = ''
                this.highPressure = ''
                this.fat = ''
                this.excessive = ''
                this.aboveInconformity = ''
                if (n === 1) {
                    this.questionArr = [modAge, modIncome, modSocial, modInput] // 配偶问题
                    this.relation = '配偶'
                    this.avatorUrl = this.avatorUrlSpouse
                    this.quantity = 28
                } else if (n === 2) {
                    this.questionArr = [modAge, modSocial, modInput] // 父母问题
                    this.relation = '父母'
                    this.quantity = 50
                    this.avatorUrl = this.avatorUrlParent
                } else if (n === 3) {
                    this.questionArr = [childModAge, modInput] // 未成年子女问题
                    this.relation = '未成年子女'
                    this.avatorUrl = this.avatorUrlChild
                } else if (n === 4) {
                    this.questionArr = [modAge, modLife, modIncome, modSocial, modInput] // 成年子女
                    this.relation = '成年子女'
                    this.quantity = 28
                    this.avatorUrl = this.avatorUrlAdult
                }

                this.hideModal(document.getElementById('myFamily'))
                // document.getElementById('myFamily').style.display = 'none';
                // this.showModal(document.getElementById('myReport'))
                document.getElementById('myReport').style.display = 'block'
                this.showModal(this.questionArr[0])
                setTimeout(() => {
                    this.currentIndex++
                }, 300)

                // this.questionArr[0].style.display = 'block';
            },
            backQuestion () {
                this.questionArr.forEach((item, index) => {
                    if (this.currentIndex == index) {
                        if (index == 0) {
                            this.showModalQ(document.getElementById('myFamily'))
                            this.hideModalQ(this.questionArr[index])
                            // this.questionArr[index].style.display = 'none';
                            // document.getElementById('myReport').style.position = 'absolute';
                            //   document.getElementById('myReport').style.left = '-2000px';

                            // document.getElementById('myFamily').style.display = 'block';
                            // this.hideModalQ(document.getElementById('myReport'))
                        } else {
                            this.showModalQ(this.questionArr[index - 1])
                            this.hideModalQ(this.questionArr[index])
                        }

                        /*
                          else if( this.questionArr[index].id == 'modArea'){
                              this.hideModal(this.questionArr[index])
                              //this.questionArr[index].style.position = 'absolute';
                              //this.questionArr[index].style.left = '-2000px';
                              this.showModal( this.questionArr[index - 1])
                              //this.questionArr[index - 1].style.display = 'block';
                          } else {
                              this.showModal(this.questionArr[index - 1])
                              this.hideModal(this.questionArr[index])
                            //  this.questionArr[index - 1].style.display = 'block';
                             // this.questionArr[index].style.display = 'none';
                          } */
                    }
                })
                setTimeout(() => {
                    this.currentIndex--
                }, 300)
            },
            nextQuestion (n) {
                if (this.isClick) {
                    this.isClick = false
                    setTimeout(() => {
                        this.isClick = true
                    }, 1000)
                    if (n == 1) {
                        this.sexAnmiate('childSingle')
                        this.marrirageRelation = '单身'
                    } else if (n == 2) {
                        this.sexAnmiate('childDouble')
                        this.marrirageRelation = '已婚无娃'
                    } else if (n == 3) {
                        this.sexAnmiate('childThird')
                        this.marrirageRelation = '已婚有娃'
                    }
                    this.questionArr.forEach((item, index) => {
                        if (this.currentIndex == index) {
                            this.showModal(this.questionArr[index + 1])
                            this.hideModal(this.questionArr[index])
                        }
                    })
                    setTimeout(() => {
                        this.currentIndex++
                    }, 300)
                }
            },
            chooseFamilySocial (n) {
                if (n == 1) {
                    this.socialFlag = '否'
                    document.getElementById('socialFamilyOne').classList.add('active')
                    document.getElementById('socialFamilyTwo').classList.remove('active')
                    this.nextQuestion()
                } else if (n == 2) {
                    this.socialFlag = '是'
                    document.getElementById('socialFamilyTwo').classList.add('active')
                    document.getElementById('socialFamilyOne').classList.remove('active')
                    this.nextQuestion()
                }
            },
            goFamily () {
                document.getElementById('myReport').style.display = 'block'
                document.getElementById('content').style.display = 'none'
            },
            getUserDetail () {
                let that = this
                this.$app.getCurrentToken(function (userToken) {
                    if (userToken !== '') {
                        that.$request({
                            url: `/vip/user/current`,
                            params: {},
                            userToken: userToken,
                            successFn: (data) => {
                                if (data.avator) {
                                    that.avatorUrl = data.avator
                                }
                            },
                            failFn: () => {
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
            loadShenceData() {
                sensors.track("assessment_answer", {
                    assessment_source:localStorage.getItem('shence_assessment_source'),
                    self_assessment:this.relation,
                    ass_Q1: this.insureSex,
                    ass_Q2: ''+this.quantityAge,
                     ass_Q3: '',
                     ass_Q3_2: '',
                    ass_Q4: this.marrirageRelation,
                    ass_Q5: this.evaluationIncome,
                    ass_Q6:  this.socialFlag == '是' ? true : false,
                    ass_Q7: this.checkNumList,
                    // answer_7_1: this.life,
                    // answer_7_2: this.sickness,
                    // answer_7_3: this.accident,
                    // answer_7_4: this.hospital,
                    // answer_7_5: this.yearAmount,

                });
            },
            load_Shence_Data(props) {
                sensors.track("assessment_result",props);
            },
            onTabChange (e, item) {
                this.showWaitProduct = 0
                let odiv = this.$refs.myTabOptions
                console.log(odiv.getElementsByTagName('li'))
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].isActive = false
                }
                item.isActive = true

                if (item.name === 1) {
                    this.adviceAmntQuota = this.sicknessNum
                    if(this.adviceAmntQuota === 0){
                        this.showWaitProduct = 2
                        return false
                    }
                } else if (item.name === 2) {
                    this.adviceAmntQuota = this.lifeNum
                    if(this.adviceAmntQuota === 0){
                        this.showWaitProduct = 2
                        return false
                    }
                } else if (item.name === 3) {
                    this.adviceAmntQuota = this.hospitalNum
                    if(this.adviceAmntQuota === 0){
                        this.showWaitProduct = 2
                        return false
                    }
                } else if (item.name === 4) {
                    this.adviceAmntQuota = this.yearNum
                } else if (item.name === 5) {
                    this.adviceAmntQuota = this.accidentNum
                }
                if(item.name === 4 || item.name === 5 ){
                    this.showWaitProduct= 1
                    return false
                }
                for (let i = 0; i < this.recommandProductList.length; i++) {
                   if( Number(this.recommandProductList[i].riskType) === item.name){
                       this.showWaitProduct = 0
                       this.recommandProduct = this.recommandProductList[i].vipUserEvaluationProductDetailDTOList
                       return false
                   }else{
                       this.showWaitProduct = 2
                   }
                }
            },
            goBuy (item) {
                window.location.href = item.linkUrl
                localStorage.setItem('shence_view_detail_risk_source', '测评页')
            // window.location.href = this.$router.siteUrl() + '/product/Detail.html?product_id=' + index + '&evaluation_id=1'+'&reportDetail_id=' + this.reportDetail_id
            },
            chooseSocial (n) {
                if (n == 1) {
                    this.socialFlag = '否'
                    document.getElementById('socialOne').classList.add('active')
                    document.getElementById('socialTwo').classList.remove('active')
                    this.nextModal()
                } else if (n == 2) {
                    this.socialFlag = '是'
                    document.getElementById('socialTwo').classList.add('active')
                    document.getElementById('socialOne').classList.remove('active')
                    this.nextModal()
                }
            },
            againTest () {
                window.location.href = this.$router.siteUrl() + '/evaluation/Evaluation.html'
            },
            againFamilyTest () {
                window.location.href = this.$router.siteUrl() + '/evaluation/Evaluation.html?report_id=2'
            },
            checkInput (item, conS) {
                //  document.getElementById(item).focus();
                if (item == '') {
                    Toast.failed(conS)
                    return false
                } else {
                    return true
                }
            },
            checkNum (height) {
                var reg = new RegExp('^[0-9]*$')
                if (!reg.test(height)) {
                    Toast.failed('您的输入有误！')
                    this.checkNumFlag = false
                    return false
                } else {
                    this.checkNumFlag = true
                    return true
                }
            },
            sexAnmiate (model) {
                document.getElementById(model).classList.add('pulse')
                document.getElementById(model).classList.add('animated')
                setTimeout(function () {
                    document.getElementById(model).classList.remove('pulse')
                    document.getElementById(model).classList.remove('animated')
                }, 500)
            },
            nextModal (n) {
                if (this.isClick) {
                    this.isClick = false
                    setTimeout(() => {
                        this.isClick = true
                    }, 1000)
                    let odiv = document.getElementById('mod' + this.current)
                    let odivs = document.getElementById('mod' + (this.current + 1))
                    if (n == 1) {
                        this.sexAnmiate('sexMan')
                        this.insureSex = '男'
                        this.avatorUrl = this.avatorUrlMan
                    } else if (n == 2) {
                        this.sexAnmiate('sexWoman')
                        this.insureSex = '女'
                        this.avatorUrl = this.avatorUrlWomen
                    } else if (n == 3) {
                        this.sexAnmiate('single')
                        this.marrirageRelation = '单身'
                    } else if (n == 4) {
                        this.sexAnmiate('double')
                        this.marrirageRelation = '已婚无娃'
                    } else if (n == 5) {
                        this.sexAnmiate('third')
                        this.marrirageRelation = '已婚有娃'
                    } else if (n === 10) {
                    }
                    this.hideModal(odiv)
                    this.showModal(odivs)
                    this.current++
                }
            },
            backModal () {
                let odiv = document.getElementById('mod' + this.current)
                let odivs = document.getElementById('mod' + (this.current - 1))
                this.hideModalQ(odiv)
                this.showModalQ(odivs)
                this.current--
            },

            // 上一题的方法
            showModalQ (mod) {
                mod.classList.remove('fadeInRight')
                setTimeout(function () {
                    mod.classList.add('modal-in')
                    mod.classList.add('fadeInLeft')
                    mod.classList.add('animated')

                    mod.style.display = 'block'
                }, 200)
            },
            hideModalQ (mod) {
                mod.classList.remove('fadeInRight')
                setTimeout(function () {
                    mod.style.display = 'none'
                }, 200)
            },
            // 下一题的方法
            showModal (mod) {
                console.log(mod)
                mod.classList.remove('fadeInLeft')
                setTimeout(function () {
                    mod.classList.add('modal-in')
                    mod.classList.add('fadeInRight')
                    mod.classList.add('animated')
                    mod.style.display = 'block'
                }, 200)
            },
            hideModal (mod) {
                mod.classList.remove('fadeInLeft')
                setTimeout(function () {
                    mod.style.display = 'none'
                }, 200)
            },
            generateFamilyReport () {
                this.generateReport()
            },

            // 为本人评测
            fillIn () { // 不想填
                if (this.relation === '本人') {
                    this.$refs.content.style.display = 'block'
                    let odiv = document.getElementById('extraQuestion')
                    document.getElementById('mod6').style.display = 'none'
                    let odivs = document.getElementById('mod7')
                    this.hideModal(odiv)
                    this.showModal(odivs)
                } else {
                    document.getElementById('myReport').style.display = 'block'
                    let odiv = document.getElementById('extraQuestion')
                    document.getElementById('modInput').style.display = 'none'
                    let odivs = document.getElementById('modReport')
                    this.hideModal(odiv)
                    this.showModal(odivs)
                }
                this.getUserDetail()
                if (this.showSicknessQuestion && !this.showHospitalQuestion) {
                    this.status = '9'
                } else if (!this.showSicknessQuestion && this.showHospitalQuestion) {
                    this.status = '8'
                } else if (this.showSicknessQuestion && this.showHospitalQuestion) {
                    this.status = '10'
                }

                this.getRecommendProduct()
            },
            submit () {  // 提交

                if (this.status !== '7') {
                    if (this.sufferingIllness === '1') {
                        this.status = '3'
                    } else if (this.sufferingIllness === '2') {
                        this.status = '4'
                    } else if (this.heartDisease === '1' || this.highPressure === '1' || this.fat === '1' || this.excessive === '1') {
                        this.status = '5'
                    } else if (this.heartDisease === '2' && this.aboveInconformity === '1') {
                        this.status = '6'
                    } else {
                        Toast.failed("您有必选项没有选择！");
                        return false
                    }
                } else {
                    if (this.sufferingIllness === '1') {
                        this.statusYL = '3'
                    } else if (this.sufferingIllness === '2') {
                        this.statusYL = '4'
                    }
                    if (this.heartDisease === '1' || this.highPressure === '1' || this.fat === '1' || this.excessive === '1') {
                        this.statusZJ = '5'
                    } else if (this.heartDisease === '2' && this.aboveInconformity === '1') {
                        this.statusZJ = '6'
                    } else {
                        Toast.failed("您有必选项没有选择！");
                        return false
                    }
                }
                this.getRecommendProduct()
                this.getUserDetail()

                if (this.relation === '本人') {
                    this.$refs.content.style.display = 'block'
                    let odiv = document.getElementById('extraQuestion')
                    document.getElementById('mod6').style.display = 'none'
                    let odivs = document.getElementById('mod7')
                    this.hideModal(odiv)
                    this.showModal(odivs)
                } else {
                    document.getElementById('myReport').style.display = 'block'
                    document.getElementById('modInput').style.display = 'none'
                    let odiv = document.getElementById('extraQuestion')
                    let odivs = document.getElementById('modReport')
                    this.hideModal(odiv)
                    this.showModal(odivs)
                }
            },
            judgeMyRelation () {
                if (this.relation === '本人') {
                    let odiv = document.getElementById('mod' + this.current)
                    let odivs = document.getElementById('mod' + (this.current + 1))
                    this.hideModal(odiv)
                    this.showModal(odivs)
                } else {
                    let odiv = document.getElementById('modInput')
                    let odivs = document.getElementById('modReport')
                    this.hideModal(odiv)
                    this.showModal(odivs)
                }
            },
            generateReport () {
                this.getUserDetail()
                this.postAnswer()
                this.loadShenceData()
            },
            loadReport () {
                // odiv = document.getElementById("mod" + this.current);
                if (this.relation === '本人') {
                    let odiv = document.getElementById('content')
                    let odivs = document.getElementById('extraQuestion')
                    odiv.classList.add('fadeInLeft')
                    setTimeout(() => {
                        odiv.style.display = 'none'
                    }, 600)
                    odivs.classList.add('animated')
                    odivs.classList.add('fadeInRight')
                    setTimeout(() => {
                        odivs.style.display = 'block'
                    }, 300)
                } else {
                    let odiv = document.getElementById('myReport')
                    let odivs = document.getElementById('extraQuestion')
                    odiv.classList.add('fadeInLeft')
                    setTimeout(() => {
                        odiv.style.display = 'none'
                    }, 600)
                    odivs.classList.add('animated')
                    odivs.classList.add('fadeInRight')
                    setTimeout(() => {
                        odivs.style.display = 'block'
                    }, 300)
                }
            },
            judgeGap(){
                if (this.relation !== '未成年子女') {
                    if (Number(this.sicknessNum) === 0 && Number(this.hospitalNum) === 0) {
                        this.judgeMyRelation()
                        this.status = '1'
                        this.getRecommendProduct()
                    } else if (Number(this.sicknessNum) !== 0 && Number(this.hospitalNum) === 0) {
                        this.showSicknessQuestion = true
                        this.loadReport()
                    } else if (Number(this.sicknessNum) === 0 && Number(this.hospitalNum) !== 0 && Number(this.quantityAge) > 55) {
                        this.judgeMyRelation()
                        this.status = '2'
                        this.getRecommendProduct()
                    } else if (Number(this.sicknessNum) === 0 && Number(this.hospitalNum) !== 0 && Number(this.quantityAge) <= 55) {
                        this.showHospitalQuestion = true
                        this.loadReport()
                    } else if (Number(this.sicknessNum) !== 0 && Number(this.hospitalNum) !== 0) {
                        this.showSicknessQuestion = true
                        this.showHospitalQuestion = true
                        this.status = '7'
                        this.loadReport()
                    }
                } else {
                    this.status = '0'
                    this.getRecommendProduct()
                    this.judgeMyRelation()
                }
            },
            // 提交数据
            postAnswer () {
                let that = this
                if (this.relation == '未成年子女') {
                    this.quantityAge = this.quantityChildAge
                }
                if(this.relation !== '本人'){
                    if (this.relation == '未成年子女' || this.relation == '父母') {
                        this.evaluationIncome = 0
                    } else {
                        this.evaluationIncome = this.evaluationFamilyIncome
                    }
                }

                let date = new Date()
                const arr = []
                that.life !== '' && arr.push(`人寿保障${that.life}万`)
                that.sickness !== '' && arr.push(`重疾保障${that.sickness}万`)
                that.accident !== '' && arr.push(`意外保障${that.accident}万`)
                that.hospital !== '' && arr.push(`医疗保障${that.hospital}万`)
                that.yearAmount !== '' && arr.push(`储蓄教育及养老${that.yearAmount}万`)
                that.checkNumList = arr
                var data = {
                    'accidentAmount': Number(that.accident) === 0 ? '0' : that.accident + '0000',            // 意外
                    'annualIncome': that.evaluationIncome === 0 ? '0' : that.evaluationIncome + '0000',         // 年收入
                    'annuityAmount': Number(that.yearAmount) === 0 ? '0' : that.yearAmount + '0000',             // 年金
                    'birthYear': date.getFullYear() - that.quantityAge,        // 出生年
                    'city': '',             // 地区
                    'hospitalizationAmount': Number(that.hospital) === 0 ? '0' : that.hospital + '0000',     // 医疗保障
                    'lifeAmount': Number(that.life) === 0 ? '0' : that.life + '0000',               // 人寿
                    'lifeStage': that.marrirageRelation,        // 人生阶段
                    'relation': that.relation,          // 关系
                    'score': 0,                  // 得分  可以为空
                    'sex': that.insureSex,            // 性别
                    'sicknessAmount': Number(that.sickness) === 0 ? '0' : that.sickness + '0000',         // 重疾
                    'socialSecurityFlag': that.socialFlag === '是' ? '1' : '0'    // 是否有社保
                    // "userCode": ""                 //可以为空
                }
                console.log(data.sicknessAmount)
            // app内
                let myToken = ''
                this.$app.getCurrentToken(function (userToken) {
                    myToken = userToken
                    if (myToken !== '') {
                        that.$request({
                            url: `/vip/evaluation/save`,
                            method: 'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data: data,
                            userToken: myToken,
                            successFn: (data) => {
                                that.description = data.description
                                if (data.insuredGapVO != null) {
                                    that.lifeNum = parseInt(data.insuredGapVO.lifeGap) / 10000
                                    that.sicknessNum = parseInt(data.insuredGapVO.sicknessGap) / 10000
                                    that.accidentNum = parseInt(data.insuredGapVO.accidentGap) / 10000
                                    that.hospitalNum = parseInt(data.insuredGapVO.hospitalizationGap) / 10000
                                    that.yearNum = parseInt(data.insuredGapVO.annuityGap) / 10000

                                    that.lifeNum = isNaN(that.lifeNum) ? 0 : that.lifeNum
                                    that.sicknessNum = isNaN(that.sicknessNum) ? 0 : that.sicknessNum
                                    that.accidentNum = isNaN(that.accidentNum) ? 0 : that.accidentNum
                                    that.hospitalNum = isNaN(that.hospitalNum) ? 0 : that.hospitalNum
                                    that.yearNum = isNaN(that.yearNum) ? 0 : that.yearNum

                                    that.judgeGap()
                                }


                                if (data.insuredAmountVO) {
                                    that.insuredAmountVO = data.insuredAmountVO
                                }
                                that.result_id = data.vipUserEvaluation.id
                                that.lastPercent = data.lastPercent
                                that.tags = data.tags
                                that.myScore = data.vipUserEvaluation.score

                                that.load_Shence_Data({evaluation_score:that.myScore });

                                if (data.vipUserEvaluation.relation == '未成年子女' || data.vipUserEvaluation.relation == '父母') {
                                    that.showAmount = false
                                }
                                that.reportDetail_id = data.vipUserEvaluation.id
                            },
                            failFn: (data) => {
                                that.showLoad = false
                                Dialog.alert({content: data.resultMsg})
                            }
                        })
                    } else {
                        that.$request({
                            url: `/vip/evaluation/getShare`,
                            method: 'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data: data,
                            successFn: (data) => {
                                console.log(data)
                                that.description = data.description
                                if (data.insuredGapVO) {
                                    that.lifeNum = parseInt(data.insuredGapVO.lifeGap) / 10000
                                    that.sicknessNum = parseInt(data.insuredGapVO.sicknessGap) / 10000
                                    that.accidentNum = parseInt(data.insuredGapVO.accidentGap) / 10000
                                    that.hospitalNum = parseInt(data.insuredGapVO.hospitalizationGap) / 10000
                                    that.yearNum = parseInt(data.insuredGapVO.annuityGap) / 10000

                                    that.lifeNum = isNaN(that.lifeNum) ? 0 : that.lifeNum
                                    that.sicknessNum = isNaN(that.sicknessNum) ? 0 : that.sicknessNum
                                    that.accidentNum = isNaN(that.accidentNum) ? 0 : that.accidentNum
                                    that.hospitalNum = isNaN(that.hospitalNum) ? 0 : that.hospitalNum
                                    that.yearNum = isNaN(that.yearNum) ? 0 : that.yearNum
                                    that.judgeGap()
                                }
                                if (data.insuredAmountVO) {
                                    that.insuredAmountVO = data.insuredAmountVO
                                }
                                that.lastPercent = data.lastPercent
                                that.tags = data.tags
                                that.myScore = data.vipUserEvaluation.score
                                that.load_Shence_Data({evaluation_score:that.myScore });
                                if (data.vipUserEvaluation.relation == '未成年子女' || data.vipUserEvaluation.relation == '父母') {
                                    that.showAmount = false
                                }
                            },
                            failFn: (data) => {
                                that.showLoad = false
                                Dialog.alert({content: data.resultMsg})
                            }
                        })
                    }
                })
            },
            changeStatus () {
                if(this.relation === '本人'){
                    if(this.marrirageRelation === ''){
                        Toast.failed('请选择人生阶段')
                        return false
                    }else{
                        this.nextModal()
                    }
                }else{
                    if(this.marrirageRelation === ''){
                        Toast.failed('请选择人生阶段')
                        return false
                    }else{
                        this.nextQuestion()
                    }
                }
            },
            changeSocial () {
                if(this.relation === '本人'){
                    if(this.socialFlag === ''){
                        Toast.failed('请选择是否具有社保')
                        return false
                    }else{
                        this.nextModal()
                    }
                }else{
                    if(this.socialFlag === ''){
                        Toast.failed('请选择是否具有社保')
                        return false
                    }else{
                        this.nextQuestion()
                    }
                }
            },
            saveResultId(){
                let data = {
                    "type":this.status,
                    "statusZJ":this.statusZJ,
                    "statusYL":this.statusYL,
                    "id":this.reportDetail_id? Number(this.reportDetail_id):"",
                }
                this.$app.getCurrentToken((userToken) => {
                    if(userToken && userToken !== ''){
                        this.$request({
                            url: `/vip/evaluation/saveQuestionResultToEvaluation`,
                            method: 'POST',
                            contentType: 'application/json;charset=UTF-8',
                            data: data,
                            userToken: userToken,
                            successFn: (data) => {
                                console.log(data);
                            },
                            failFn: (data) => {
                            }
                        })
                    }
                })

            },
            getRecommendProduct () {
                let data = {}
                if (this.relation == '未成年子女') {
                    data.age = Number(this.quantityChildAge)
                } else {
                    data.age = Number(this.quantityAge)
                }
                if(this.relation !== '本人'){
                    if (this.relation == '未成年子女' || this.relation == '父母') {
                        this.evaluationIncome = 0
                    } else {
                        this.evaluationIncome = this.evaluationFamilyIncome
                    }
                }
                data.type = this.status
                data.annualIncome = this.evaluationIncome === 0 ? 0 : Number(this.evaluationIncome + '0000')
                data.statusZJ = this.statusZJ
                data.statusYL = this.statusYL
                console.log('status', data.status)
                this.$request({
                    url: `/vip/evaluation/getRecommendProduct`,
                    method: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: data,
                    successFn: (data) => {
                        this.saveResultId()
                        let arr = []
                        data.forEach((item, index) => {
                            arr.push({
                                'isActive': false,
                                'name': Number(item.riskType),
                                'label': Number(item.riskType) === 1 ? '重疾保险' : Number(item.riskType) === 2 ? '人寿保险' : Number(item.riskType) === 3 ? '医疗保险' : ''
                            })
                        })
                        this.recommandProductList = data

                        if(data[0] && data[0].riskType === '1'){
                            this.showWaitProduct = 0
                            this.adviceAmntQuota = this.sicknessNum
                            this.recommandProduct = data[0].vipUserEvaluationProductDetailDTOList
                        } else{
                            this.showWaitProduct = 2
                        }
                    },
                    failFn: (data) => {
                    }
                })
            }
        },
        filters: {
            toInt (value) {
                return parseInt(value)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .content {
        background: url("../../assets/imgs/evaluation/bg@2x.png") no-repeat;
        height: 100%;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
    }
    .finalDiv{
        background: url("../../assets/imgs/evaluation/bgExtra.png") no-repeat;
        height: calc(100vh);
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        overflow-x: hidden;
    }

    .contTop {
        padding-left: 290px;
        padding-right: 284px;
        padding-top: 84px;
        .parQ {
            position: relative;
            p {
                position: absolute;
                color: #fff;
                top: .28rem;
                font-size: 28px;
                padding: .2rem;
                width: 2rem;
                background: #3BCCE6;
                text-align: center;
                -webkit-border-radius: 30px;
                -moz-border-radius: 30px;
                border-radius: 30px;
            }
        }
    }

    .contMiddle {
        margin-top: 140px;
        font-size: 36px;
        padding-left: 72px;
        color: #fff;
    }

    .contBottom {
        img {
            display: inline-block;
            height: 260px;
            width: 260px;
            margin-top: 1.2rem;
        }
        .parW {
            margin-left: 1.1rem;
        }
        .describle {
            margin-top: 10px;
            color: #fff;
            font-size: 30px;
            text-align: center;
        }
        li {
            display: inline-block;
        }
        .parM {
            margin-left: .6rem;
        }
    }

    .lifeStage {
        margin-top: 150px;
        margin-bottom: 5rem;
        ul {
            li {
                display: inline-block;
                img {
                    height: 180px;
                    width: 180px;
                }
                .parP {
                    margin-left: 60px;
                }
                .parL {
                    margin-left: 40px;
                }
            }
            p {
                margin-top: 20px;
                font-size: 30px;
                color: #ffffff;
                text-align: center;
                margin-left: .7rem;
            }
        }
    }

    .parG {
        margin-top: 6.5rem !important;
    }

    .parArea {
        margin-top: 3rem !important;
    }

    .continue {
        margin-top: 4rem;
        margin-left: 140px;
        ul {
            display: flex;
            justify-content: space-between;
            li {
                display: inline-block;
            }
            .next {
                margin-right: 130px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: #46FAFB;
                line-height: 56px;
                font-size: 40px;
                margin-top: -.3rem;
                text-shadow: 0 0.02rem 0.2rem #46FAFB
            }
            .back {
                font-size: 22px;
                color: #fff;
            }
        }
    }

    .social {
        height: 260px;
        width: 260px;
        background: #0AA8B7;
        margin-top: 1.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: #fff;
        font-size: 30px;
    }

    .active {
        background: #2BE0EE;
    }

    .inputList {
        margin-top: 12px;

        ul {
            display: flex;
            /*   justify-content: space-between;*/
            line-height: 1.7rem;
            li {
                display: inline-block;
                font-size: 32px;
                color: #fff;
                margin-left: 72px;

            }
            li:first-child {
                width: 4rem;
            }
            .moneyPicker {
                width: 250px;
                height: .9rem;
                background: #72A0B9;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                color: #fff;
                text-align: right;
                padding-right: .2rem;
                font-size: 34px;
                margin-top: .4rem;
                margin-left: .5rem;
                line-height: .9rem;
            }
            span{
                font-size: 32px;
                color: #fff;
                margin-left: .23rem;
            }
        }
    }

    .contQ {
        margin-top:1.85333rem !important;
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #fff;
        font-size: 32px;
    }

    .conD {
        background: url("../../assets/imgs/evaluation/endBg.png") !important;
        background-position: center center;
        /* 背景图不平铺 */
        background-repeat: no-repeat;
        /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
        background-attachment: fixed;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        //height: 100%;
       /* overflow-x: hidden;*/
        .conTop {
            padding-top: 90px;
            margin-left: 30px;
            position: relative;
            width: 100%;
            .myAvator {
                display: inline-block;
                height: 120px;
                width: 120px;
            }
            .goFamily {
                display: inline-block;
                position: absolute;
                right: 1.5rem;
                color: #5AFEFF;
                top: 1.4rem;
                font-size: 32px;
                img {
                    position: absolute;
                    display: inline-block;
                    width: 0.5rem;
                    color: #fff;
                    height: 0.5rem;
                    margin-left: 0.15rem;
                }
            }
            span {
                position: absolute;
                top: 100px;
                font-size: 40px;
                color: #fff;
                left: 1.8rem;
            }
            .resultTag {
                display: inline-block;
                position: absolute;
                top: 2rem;
                li {
                    margin-left: 28px;
                    margin-top: 20px;
                    display: inline-block;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    width: 115px;
                    height: 36px;
                    background: #129EC0;
                    line-height: 36px;
                    padding: 5px;
                    text-align: center;
                    color: #47C9DF;
                }
            }
        }
        .conMid {
            margin-top: 50px;
            margin-left: 30px;
            margin-right: 30px;
            .gap {
                width: 690px;
                height: 112px;
                background: url("../../assets/imgs/evaluation/endTop.png") no-repeat left top;
                background-size: 100%;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                font-size: 36px;
                color: #fff;
                text-align: center;
                line-height: 112px;
                position: relative;

            }
            .Analysis {
                height: 100%;
                padding-top: 156px;
                position: relative;
                .bgPic {
                    width: 484px;
                    margin-left: 104px;
                    height: 484px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border: 1px dashed #8E8E8E;
                }
                .parLife {
                    height: 160px;
                    position: absolute;
                    width: 160px;
                    background: #1CBECB;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    .tips {
                        position: absolute;
                        top: 170px;
                        width: 2rem;
                        left: 0.25rem;
                    }
                    .guarantee {
                        position: absolute;
                        left: 15px;
                        top: 85px;
                        color: #fff;
                        font-size: 22px;
                    }
                    span {
                        position: absolute;
                        width: 2rem;
                        text-align: center;
                        top: 30px;
                        font-size: 40px;
                        color: #fff;
                    }
                }
                .life {
                    top: 65px;
                    left: 266px;
                }
                .illness {
                    top: 232px;
                    left: 504px;
                    z-index: 20;
                }
                .accident {
                    top: 232px;
                    left: 26px;
                }
                .medical {
                    top: 500px;
                    left: 418px;
                }
                .savings {
                    top: 500px;
                    left: 112px;
                }
                .midPic {
                    position: absolute;
                    top: 294px;
                    left: 258px;
                    img {
                        height: 212px;
                        width: 176px;
                    }
                    .lastUser {
                        position: absolute;
                        color: #fff;
                        font-size: 22px;
                        left: .2rem;
                        width: 3rem;
                        top: 1.7rem;
                    }
                    .userScore {
                        top: .5rem;
                        /* left: .5rem; */
                        text-align: center;
                        width: 2.5rem;
                        position: absolute;
                        color: #FFFD06;
                        font-size: 28px;
                        span {
                            font-size: 64px;
                        }
                    }
                }

            }
            .resultList {
                margin-top:1rem;
                margin-left: 32px;
                margin-right: 32px;
                h3 {
                    font-size: 28px;
                    color: #19B3C7;
                }
                p {
                    margin-top: 20px;
                    color: #333;
                    line-height: 36px;
                    font-size: 26px;
                }
            }
            .blank {
                margin-top: 60px;
                height: 22px;
                width: 100%;
                background: #F2F2F2;
                margin-bottom: 60px;
            }
        }
        .tabOptions{
            padding: 0 26px;
            position: relative;
            z-index: 40;
            .tabTitle{
                font-size: 36px;
                color: #333;
                font-weight:500;
            }
            .blueBlank{
                width: 12px;
                height: 50px;
                background: #2ECADC;
                position: absolute;
                top: -.08rem;
                left: 0;
            }
            .tabTips{
                margin-top: 20px;
                font-size: 28px;
                line-height:40px;
                color: #8e8e8e;
            }
            .myTabOptions{
                height: 69px;
                overflow-x: scroll;
                overflow-y: hidden;
                max-width: 100%;
                z-index: 30;
                white-space:nowrap;
                padding-bottom: 20px;
                li{
                    display: inline-block;
                    padding: 0 32px;
                    height: 69px;
                    margin-right: .3rem;
                    background: #ECECEC;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    font-size: 28px;
                    color: #333;
                    line-height: 69px;
                    text-align: center;
                }
            }
        }
        .lifeContent {
            padding: 0 26px;
            margin-top: 36px;
            padding-bottom: .5rem;
            .lifePic {
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                height: 259px;
                width: 659px;
                padding-bottom: .3rem;
            }
            .productIndruce {
                display: flex;
                position: relative;
                ul {
                    li {
                        display: inline-block;
                        position: relative;
                        padding-left: 36px;
                        padding-bottom: .7rem;
                        p {
                            position: absolute;
                            width: 4rem;
                            left: 1.2rem;
                            font-size: 28px;
                            top: .5rem;
                            color: #333;
                        }
                        span {
                            position: absolute;
                            left: 1.2rem;
                            display: block;
                            top: 1rem;
                            width: 4rem;
                            font-size: 28px;
                            color: #E30513;
                        }
                        img {
                            margin-top: 40px;
                            width: 40px;
                            height: 40px;

                        }
                    }
                    .parLi {
                        margin-left: 230px;
                    }
                    .rules {
                        position: absolute;
                        height: 90px;
                        width: 2px;
                        top: .4rem;
                        left: 4rem;
                    }
                }
            }
        }
        .btnBox {
            margin-top: .5rem;
            text-align: center;
            padding-bottom: .5rem;
            button {
                width: 320px;
                height: 88px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                font-size: 32px;

            }
            .againTest {
                color: #fff;
                background: #31CEDC;
            }
            .shareResult {
                color: #31CEDC;
                margin-left: 54px;
                background: #fff;
                border: 1px solid #31CEDC;
            }
        }
        .conK {
            background: #fff;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    * {
        padding: 0;
        margin: 0;
    }

    .scale {
        position: relative;
        width: 90%;
        padding: 10px 0;
        margin-left: 3%;
        margin-top: 2.5rem;
    }

    .scale em {
        position: absolute;
        top: 50%;
        display: block;
        width: 1rem;
        height: 28px;
        font-size: 20px;
        font-style: normal;
        line-height: 28px;
        margin-top: -14px;
    }

    .scale em.blue {
        left: 10px;
        color: #fff;
        font-size: 30px;
    }

    .scale em.red {
        right: -.6rem;
        color: #fff;
        font-size: 30px;
    }

    form {
        padding: 0 60px;
    }

    input[type="range"] {
        width: 100%;
        height: .03rem;
        /*background: url(images/int-risk-level-bar.png) no-repeat center;*/
        background-size: 100% 9px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 2px 2px 3px 0 rgba(11, 18, 73, 0.4);
        box-shadow: 2px 2px 3px 0 rgba(11, 18, 73, 0.4);
        -webkit-appearance: none;
        outline: none;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 48px;
        height: 48px;
        margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
        background: #46FAFB;
        -webkit-border-radius: 50%;
        border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
        box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
    }

    output {
        position: absolute;
        left: 48%;
        bottom: -40px;
        display: block;
        color: #46FAFB;
        font-size: 60px;
        text-align: center;
        line-height: 40px;
        top: 1.2rem;
        margin-left: -20px;
    }

    .age {
        font-size: 28px;
        position: absolute;
        color: #46FAFB;
        top: 1.4rem;
        left: 5.1rem;
    }

    .ages {
        font-size: 28px;
        position: absolute;
        color: #46FAFB;
        top: 1.4rem;
        left: 5.6rem;
    }

    .ageMiddle {
        font-size: 28px;
        position: absolute;
        color: #46FAFB;
        top: 1.4rem;
        left: 4.7rem;
    }

    .ageSamll {
        font-size: 28px;
        position: absolute;
        color: #46FAFB;
        top: 1.4rem;
        left: 4.7rem;
    }

    .md-example-child-md-activity-indicator-0 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .md-activity-indicator {
        margin-bottom: 30px;
        &.md-activity-indicator-css
        .md-activity-indicator-svg {
            width: 60px !important;
            height: 60px !important;
        }
    }

    .md-activity-indicator-css {
        position: absolute;
        top: 7rem;
        left: 4rem;
    }

    /*  #mod8 {
          position: absolute;
          left: -2000px;
      }*/

    .scale .blue, .red {
        top: .4rem;
    }

    .myAvator {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

    .familyMember img {
        /*   padding-top: .7rem !important*/
    }

    .myReport {
        background: url("../../assets/imgs/evaluation/bg@2x.png") no-repeat;
        height: 100%;
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        .reportTitle {
            padding-top: 100px;
            padding-left: 34px;
            font-size: 32px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            .riskReport {
                line-height: 44px;
                overflow: hidden;
            }
            .riskTag {
                position: relative;
                background: #3ACCDD;
                padding: 15px 25px 15px 65px;
                float: right;
                -webkit-border-radius: 50px;
                -moz-border-radius: 50px;
                border-radius: 50px;
                margin-right: .8rem;
                margin-top: -.7rem;
                img {
                    position: absolute;
                    display: inline-block;
                    width: 35px;
                    height: 30px;
                    left: .4rem;
                    top: .22rem;
                }

            }
        }
        .reportContent {
            margin-top: 1rem;
            overflow: hidden;
            .reportS {
                margin-bottom: .5rem;
                position: relative;
                width: 94%;
                margin-left: 3%;
                background: #fff;
                overflow: hidden;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                h2 {
                    display: inline-block;
                    margin-top: 30px;
                    margin-left: 36px;
                }
                ul {
                    margin-left: 0.15rem;
                    max-width: 7.5rem;
                    li {
                        margin-top: .3rem;
                        display: inline-block;
                        font-size: 26px;
                        margin-left: 0.2rem;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(85, 207, 227, 1);
                        padding: 10px 20px;
                        background: rgb(229, 249, 253);
                        -webkit-border-radius: 20px;
                        -moz-border-radius: 20px;
                        border-radius: 20px;
                    }
                }
                .description {
                    margin-top: .5rem;
                    width: 92%;
                    margin-left: 4%;
                    font-size: 24px;
                    color: #8e8e8e;
                    line-height: .5rem;
                    max-height: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .reportDetail {
                    margin-top: 30px;
                    float: right;
                    margin-right: .7rem;
                    position: relative;
                    margin-bottom: .5rem;
                    p {
                        display: inline-block;
                        margin-right: .5rem;
                        color: #1ECACF;
                        font-size: .4rem;
                    }
                    img {
                        position: absolute;
                        display: inline-block;
                        top: -0rem;
                        right: -.2rem;
                        width: .3rem;
                        height: .4rem;
                    }
                }
            }
            .lastPercent {
                float: right;
                position: absolute;
                top: .2rem;
                right: .4rem;
                img {
                    width: 2rem;
                    height: 2.2rem;
                }
                .userScore {
                    position: absolute;
                    color: #FFFD06;
                    font-size: 28px;
                    left: .35rem;
                    top: .2rem;
                    span {
                        font-size: 64px;
                    }
                }
                .lastUser {
                    top: 1.2rem;
                    left: .25rem;
                    position: absolute;
                    color: #fff;
                }
            }
        }
    }

    .myFamily {
        /* background: url("../../assets/imgs/evaluation/bg@2x.png") no-repeat;
         height: 100%;
         !* 让背景图基于容器大小伸缩 *!
         background-size: cover;*/
    }

    #modArea {
        position: absolute;
        left: -2000px;
        top: 0;
    }

    .parDel {
        display: none;
    }

    .particular {
        top: .9rem !important;
    }

    .mySlider {
        margin: 0 auto;
        margin-top: 2rem;
        width: 75%;
    }

    .sliderNum {
        margin-top: .5rem;
        text-align: center;
        color: #46FAFB;
        font-size: .6rem;
    }

    .sliderMod {
        position: relative;
        .minNum {
            position: absolute;
            top: .1rem;
            font-size: .5rem;
            color: #fff;
            left: .2rem;
        }
        .maxNum {
            color: #fff;
            position: absolute;
            top: .1rem;
            font-size: .5rem;
            right: .2rem;
        }
    }
    .childLife{
        top: 1rem !important;
        left: 3.55rem !important;
    }
    .childMedical{
        top: 3.5rem !important;
        left: .5rem !important;
    }
    .childSavings{
        top: 3.5rem !important;
        left: 6.7rem !important;
    }
    .childBgPic{
        height: 5.5rem !important;
        border: 0 !important;
        margin-left: 1.9rem !important;
        width: 5.5rem !important;
        border-top: 1px dashed #8e8e8e !important;
    }
    .extraQuestion{
        background: url("../../assets/imgs/evaluation/bgExtra.png") no-repeat;
        height: calc(100vh);
        /* 让背景图基于容器大小伸缩 */
        background-size: cover;
        .extraTitle{
            width: 100%;
            font-size: 26px;
            color: #fff;
            padding-top: 64px;
            margin-left: 72px;
        }
        .questionOne{
            margin-left: 72px;
        }
        .questionOneQ{
            margin-left: 72px;
            margin-top: 1.5rem;
        }
        .oneTitle ,.questionTitle{
            color: #fff;
            margin-top: 48px;
            font-size: 32px;
            font-family:PingFangSC-Medium;
            font-weight:500;
        }
        .option,.myOption{
            margin-top: 40px;
            display: flex;
            .optionOne{
                margin-left:22px;
            }
            .optionTwo{
                margin-left: 140px;
            }
        }
        .myOption{
            margin-top: 20px;
            flex-direction: column;
            .illness{
                margin-top: 36px;
                margin-left:22px;
            }
        }
        .bottomFixed{
           /* position: fixed;
            left: 72px;
            bottom: 0;*/
            .bottomTip{
                text-align: center;
                margin-bottom: 42px;
                font-size:22px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
            .btnBoxOne{
                margin-top: 8rem !important;
            }
            .btnBoxTwo{
                margin-top: 3rem !important;
            }
            .btnBox{
                margin-top: 1rem;
                display: flex;
                p{
                    margin: 0 auto;
                    display: inline-block;
                    width: 260px;
                    height: 80px;
                    font-size: 32px;
                    line-height: 80px;
                    color: #fff;
                    margin-bottom: 56px;
                    -webkit-border-radius: 50px;
                    -moz-border-radius: 50px;
                    border-radius: 50px;
                    text-align: center;
                }
                .partOne{
                    background: #22A4E1;
                }
                .partTwo{
                    background: #15D0D3;
                    margin-left: 86px;
                }
            }
        }
    }
    .tabActive{
        background: linear-gradient(to right,#3BDBDB,#1FB7DE)!important;
        background: -webkit-linear-gradient(to right,#3BDBDB,#1FB7DE)!important;
        color: #fff !important;
    }
    .questionInput{
        margin-left: 20px;
    }
    .fatTip{
        z-index: 20;
        position: relative;
        .myQuestionInput{
            position: absolute;
            top: .63rem;
            left: 2.1rem;
            z-index: 30;
        }
    }
    /*#myTabOptionsQ::-webkit-scrollbar {//滚动条的宽度
        width:9px;
        height:0;
        display: none;
    }*/
    .tabResult{
        box-shadow: 0 0 15px  #f3f3f3;
    }
    .costEffective{
        box-shadow: 0 0 15px  #f3f3f3;
        height: 248px;
        width: 100%;
        background: #fff;
        padding-top: 72px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        img{
            width: 98px;
            height: 84px;
            margin: 0 auto;
        }
        p{
            margin-top: 36px;
            color: #333;
            font-size: 28px;
            text-align: center;
            line-height: 40px;
        }
    }
    .parT{
        margin-top: 1.7rem;
    }
    .scrollDiv{
        margin-top: 36px;
        overflow: hidden; height: 65px;
    }
</style>
<style lang="scss">
    .option,.myOption{
        .md-radio-icon{
            color: #fff;

        }
        .md-radio-label{
            color: #fff;
            font-size: 32px;
        }
        .md-radio.is-checked .md-radio-icon{
            color: #62FEFF;
        }
    }
    .particularQ{
        margin-top: 1.5rem;
    }
</style>
