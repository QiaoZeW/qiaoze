import {
    getRiskTypeName
} from '@/utils/dictionary'
export function load_shence_zj_buynow(data, {riskName, payIntvName, proposalResult, addressDataValue,insGiftInsuranceManage},callback) {
    let allData_shence = JSON.parse(localStorage.getItem('PAWithRule'))
    console.log(Number(allData_shence.policyInfoList[0].amnt))
    const {
        riskSubType,
		riskCode
    } = data
    let riskTypeName = getRiskTypeName(riskCode,riskSubType);
    if (riskSubType == 'HE') {
		if (riskCode == "5315" || riskCode == "5316"|| riskCode == "5032"||riskCode == "5323"||riskCode == "5324"||riskCode == "5325") {
			sensors.track('yl_buynow', {
				secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
			    risk_type: riskTypeName,
			    risk: riskName,
			    insured_birthday: allData_shence.insuredInfo.birthday,
			    insured_birth_year: Number(allData_shence.insuredInfo.birthday.substr(0, 4)),
			    insured_sex: allData_shence.insuredInfo.sex === 'M' ? '男' : '女',
			    appnt_birthday: allData_shence.appntInfo.birthday,
			    appnt_birth_year: Number(allData_shence.appntInfo.birthday.substr(0, 4)),
			    appnt_sex: allData_shence.appntInfo.sex === 'M' ? '男' : '女',
			    insu_period: allData_shence.policyInfoList[0].insuYear === '1000' ? '一次交清' : (allData_shence.policyInfoList[0].insuredYearFlag.indexOf('Y') > -1 ? '' : '至') + allData_shence.policyInfoList[0].insuredYear + allData_shence.policyInfoList[0].insuredYearFlag.replace('A', '岁').replace('Y', '年'),
			    pay_period: allData_shence.policyInfoList[0].payEndYear,
			    base_prem: Number(allData_shence.policyInfoList[0].amnt),
			    pay_method: payIntvName,
			    evaluate_amnt: proposalResult
			},callback)
		} else{
			sensors.track('zj_buynow', {
				secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
			    risk_type: riskTypeName,
			    risk: riskName,
			    insured_birthday: allData_shence.insuredInfo.birthday,
			    insured_birth_year: Number(allData_shence.insuredInfo.birthday.substr(0, 4)),
			    insured_sex: allData_shence.insuredInfo.sex === 'M' ? '男' : '女',
			    appnt_birthday: allData_shence.appntInfo.birthday,
			    appnt_birth_year: Number(allData_shence.appntInfo.birthday.substr(0, 4)),
			    appnt_sex: allData_shence.appntInfo.sex === 'M' ? '男' : '女',
			    insu_period: allData_shence.policyInfoList[0].insuYear === '1000' ? '一次交清' : (allData_shence.policyInfoList[0].insuredYearFlag.indexOf('Y') > -1 ? '' : '至') + allData_shence.policyInfoList[0].insuredYear + allData_shence.policyInfoList[0].insuredYearFlag.replace('A', '岁').replace('Y', '年'),
			    pay_period: allData_shence.policyInfoList[0].payEndYear,
			     base_prem: Number(allData_shence.policyInfoList[0].amnt),
			    pay_method: payIntvName,
			    if_mf_disease: allData_shence.policyInfoList.find(item => item.dutyCode == '5305D3') != undefined,
			    mf_disease_prem: allData_shence.policyInfoList.find(item => item.dutyCode == '5305D3') != undefined ? Number(allData_shence.policyInfoList.find(item => item.dutyCode == '5305D3').amnt) : 0,
			    if_child_disease: allData_shence.policyInfoList.find(item => item.dutyCode == '5305D4') != undefined,
			    child_disease_prem: allData_shence.policyInfoList.find(item => item.dutyCode == '5305D4') != undefined ? Number(allData_shence.policyInfoList.find(item => item.dutyCode == '5305D4').amnt) : 0,
			    if_accident: allData_shence.policyInfoList.find(item => item.dutyCode == '5305D7') != undefined,
                accident_prem:allData_shence.policyInfoList.find(item => item.dutyCode == '5305D7') != undefined ? Number(allData_shence.policyInfoList.find(item => item.dutyCode == '5305D7').amnt) : 0,
			    if_appnt_exempt: allData_shence.policyInfoList.find(item => item.dutyCode == '5909D1') != undefined,
                appnt_exempt_prem:allData_shence.policyInfoList.find(item => item.dutyCode == '5909D1') != undefined ? Number(allData_shence.policyInfoList.find(item => item.dutyCode == '5909D1').amnt) : 0,
                if_spc_disease: false,
                spc_disease_prem: 0,
			    if_fifty_sickness: allData_shence.policyInfoList.find(item => item.dutyCode == '5307D2') != undefined,
			    fify_sickness_prem: allData_shence.policyInfoList.find(item => item.dutyCode == '5307D2') != undefined ? allData_shence.policyInfoList.find(item => item.dutyCode == '5307D2').amnt : 0,
			    evaluate_amnt: proposalResult,
                if_gift_yht:insGiftInsuranceManage?true:false,
                if_add_yht: allData_shence.policyInfoList.find(item => item.dutyCode == '5031D1') != undefined
			},callback)
		}
    } else if (riskSubType == 'LF') {
        sensors.track('rs_buynow', {
        	secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
            risk_type: riskTypeName,
            risk: riskName,
            insured_birthday: allData_shence.insuredInfo.birthday,
            insured_birth_year: Number(allData_shence.insuredInfo.birthday.substr(0, 4)),
            insured_sex: allData_shence.insuredInfo.sex === 'M' ? '男' : '女',
            insured_city: addressDataValue[0].label + addressDataValue[1].label + addressDataValue[2].label,
            insu_period: allData_shence.policyInfoList[0].insuYear === '1000' ? '一次交清' : (allData_shence.policyInfoList[0].insuredYearFlag.indexOf('Y') > -1 ? '' : '至') + allData_shence.policyInfoList[0].insuredYear + allData_shence.policyInfoList[0].insuredYearFlag.replace('A', '岁').replace('Y', '年'),
            pay_period: allData_shence.policyInfoList[0].payEndYear,
            base_prem: Number(allData_shence.policyInfoList[0].amnt),
            pay_method: payIntvName,
            evaluate_amnt: proposalResult
        },callback)
    }
}

export function loadShenceData(data) {
    const {
        riskSubType,
        riskName,
		riskCode      //医疗险用riskCode来判断
    } = data
    let riskTypeName = getRiskTypeName(riskCode,riskSubType)
    if (riskSubType == 'HE') {
		if (riskCode == "5315" || riskCode == "5316"|| riskCode == "5032"||riskCode == "5323"||riskCode == "5324"||riskCode == "5325") {           //如果是医疗险
            console.log(localStorage.getItem('shence_calculate_risk_button'))
			sensors.track('yl_calculate', {
				secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
                risk_button : localStorage.getItem('shence_calculate_risk_button'),
				risk_type: riskTypeName,
				risk: riskName
			})
		} else{
		    console.log(localStorage.getItem('shence_calculate_risk_button'))
			sensors.track('zj_calculate', {
				secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
			    risk_button : localStorage.getItem('shence_calculate_risk_button'),
				risk_type: riskTypeName,
				risk: riskName
			})
		}
    } else if (riskSubType == 'LF') {
        console.log(localStorage.getItem('shence_calculate_risk_button'))
        sensors.track('rs_calculate', {
        	secondaryDistributor: localStorage.getItem("cps_secondaryDistributor"),
            risk_button : localStorage.getItem('shence_calculate_risk_button'),
            risk_type: riskTypeName,
            risk: riskName
        })
    }
}
