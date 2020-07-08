// 这个要删除，但为了引起代码合办兼容性先留着
export const riskTypeNameText = {
    'LF': '寿险',
    'AN': '年金险',
    'AD': '意外',
    'HE': '健康险'
}
 const riskTypeNameMap = {
    'YL': '医疗',
    'ZJ': '重疾',
    'RS': '人寿',
    'YW': '意外'
}
export function getRiskTypeName (riskCode, riskSubType) {
    var riskTypeCode = ''
    if (riskSubType === 'HE') {
        if (riskCode === '5315' || riskCode === '5316' || riskCode === '5032' || riskCode === '5323' || riskCode === '5324' || riskCode === '5325') {
            riskTypeCode = 'YL'
        } else if (riskCode === '5321') {
            riskTypeCode = 'YW'
        } else {
            riskTypeCode = 'ZJ'
        }
    } else if (riskSubType === 'LF') {
        riskTypeCode = 'RS'
    }
    return riskTypeNameMap[riskTypeCode] || ''
}
// 重疾riskCode集合
const _ZJ_RISK_CODE = ['5305', '5307', '5313', '5314', '5318', '5317', '5319']
// 医疗riskCode集合
const _YL_RISK_CODE = ['5315', '5316', '5032', '5323', '5324', '5325']
// 意外riskCode集合
const _YW_RISK_CODE = ['5321']
// 人寿riskCode集合
const _RW_RISK_CODE = ['1314', '1315']

export function getRiskTypeNameExt (riskCode) {
    var riskTypeCode = ''
    if (_ZJ_RISK_CODE.indexOf(riskCode) > -1) {
        riskTypeCode = 'ZJ'
    } else if (_YL_RISK_CODE.indexOf(riskCode) > -1) {
        riskTypeCode = 'YL'
    } else if (_YW_RISK_CODE.indexOf(riskCode) > -1) {
        riskTypeCode = 'YW'
    } else if (_RW_RISK_CODE.indexOf(riskCode) > -1) {
        riskTypeCode = 'RS'
    }
    return riskTypeNameMap[riskTypeCode] || ''
}
