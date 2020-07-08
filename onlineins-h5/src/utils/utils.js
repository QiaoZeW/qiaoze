import {
    Dialog
} from 'mand-mobile'
import Request from '@/utils/request'
export function showFailAlert() {
    // 在app外部转人工核保直接不可以购买，app内部正常
    Dialog.failed({
        title: '智能核保不通过',
        content: '暂无法购买此产品',
        confirmText: '确定'
    })

}

export function debounce(fn = function() {}, delay = 300) {
    let timer = null

    return function() {
        let context = this

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function() {
            fn.apply(context, arguments)
        }, delay)
    }
}

export function throttle(fn = function() {}, interval = 300) {
    let last = 0

    return function() {
        let context = this
        const now = Date.now()

        if (now - last > interval) {
            last = now
            fn.apply(context, arguments)
        }
    }
}

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return  decodeURIComponent(r[2]);
    } else{
        return null
    }
}

export function getFalg({ agentCode='', callback=function () {} } = {}) {
    const cpsCode = localStorage.getItem('cps_secondaryDistributor')
    const hasAgentCode = !!agentCode
    Request({
        url: `/cps/getDistributor/${cpsCode}`,
        successFn: (data) => {
            const callbackData = {
                showBXD: data.serviceFlag === '1' || hasAgentCode, // 百小答显示控制
                showZNHB: data.smartUwFlag === '1' || hasAgentCode, // 智能核保显示控制
                cpsName: data.cpsName || '',
                remark: data.remark || '',
                manualUwFlag: data.manualUwFlag === '1' || hasAgentCode, // 人核开关
                wxPayFlag: data.wxPayFlag === '1' || false, // 微信支付显示开关
                ybkPayFlag: data.ybkPayFlag === '1' || false, //医保卡支付显示开关
                downloadVisit: data.downloadVisit === '0' || false, // 下载开关
                surveyFlag : data.surveyFlag === '1' || false, // 调研开关 0 关闭，1开启
                visit: data.visit === '1' || false,  // 回访开关 0 关闭，1开启
                groupId: data.serviceGroupId || '',
                insOrderFlag: data.insOrderFlag === '1' || false // 我的保单开关
            }
            callback (callbackData, data)
        },
        failFn: () => {
            callback({
                showBXD: hasAgentCode, // 百小答显示控制
                showZNHB: hasAgentCode, // 智能核保显示控制
                cpsName: '',
                remark :'',
                manualUwFlag: hasAgentCode,
                wxPayFlag: false,
                ybkPayFlag: false,
                groupId: '',
                insOrderFlag: false
            }, {})
        }
    })
}

export function getProdFlag (product_id, callback=function () {}) {
    const hasAgentCode = !!getQueryString('agentCode')
    Request({
        url: `/ins/product/product/risk/${product_id}`,
        successFn: (data) => {
            const riskInfo = data.riskInfo || {};
            const riskCode = data.riskInfo.riskCode || '';
            Request({
                url: `/ins/product/riskFlag/${product_id}`,
                successFn: (prodData) => {
                    if (prodData) {
                        callback({
                            smartUwFlag: prodData.smartUwFlag === '1', // 智能核保开关
                            manualUwFlag: prodData.manualUwFlag === '1', // 人工核保开关
                            serviceFlag: prodData.serviceFlag === '1', // 客服开关
                            monthPay:prodData.monthPay ,//月缴开关
                            yearPay:prodData.yearPay //年缴开关
                        }, riskInfo)
                    } else {
                        callback({
                            smartUwFlag: hasAgentCode, // 智能核保开关
                            manualUwFlag: hasAgentCode, // 人工核保开关
                            serviceFlag: hasAgentCode // 客服开关
                        }, riskInfo)
                    }
                },
                failFn: (err1) => {
                    callback({
                        smartUwFlag: hasAgentCode, // 智能核保开关
                        manualUwFlag: hasAgentCode, // 人工核保开关
                        serviceFlag: hasAgentCode // 客服开关
                    }, riskInfo)
                }
            });
        },
        failFn: (err2) => {
            console.error(err)
        }
    });
}

export function getBxdUrl (userToken='', callback=function () {}) {
    // const cpsCode = localStorage.getItem('cps_secondaryDistributor')
    Request({
        url: `/config/getCustomerServiceConfig`,
        userToken: userToken,
        method: 'POST',
        successFn: (data) => {
            callback(data)
        },
        failFn: (err) => {
            console.error(err)
        }
    });
}
export function getWxShare(options={},callback=function () {
}) {
    var reg = new RegExp( '&' , "g" );
    console.log("options",options);
    Request({
        url: `/wx/config/getWxShareConfig?curUrl=${options.href}`.replace(reg,'-'),
        successFn: data => {
            callback(data)
        },
        errorFn: () => {
            callback({})
        }
    });
}
export function getWxProduct(product_id,callback=function () {
}) {
    Request({
        url: `/ins/product/getWxShare/${product_id}`,
        successFn: data => {
            callback(data)
        },
        errorFn: () => {
            callback({})
        }
    });
}

export function getCPSWxShareInfo(product_id,cpsCode,wxShareSign,callback=function () {
}) {
    Request({
        url: `/ins/product/getCPSWxShareInfo/${product_id}?cpsCode=${cpsCode}&wxShareSign=${wxShareSign}`,
        successFn: data => {
            callback(data)
        },
        errorFn: () => {
            callback({})
        }
    });
}

export function if20AccessFn (callback=function () {
}) {
    Request({
        url: `/config/list`,
        successFn: data => {
            if (data && data.length > 0) {
                const targetObj = data.find((item) => item.sysKey === 'SYS_ANTI_MONEY')
                callback(targetObj.sysValue === '1')
            } else {
                callback(false)
            }
        },
        errorFn: () => {
            callback(false)
        }
    });
}

export function getBusinessShare(options={},callback=function () {
}) {
    var reg = new RegExp( '&' , "g" );
    console.log("options-qiye",options);
    Request({
        url: `/wx/user/getSignInfo?shareUrl=${options.href}`.replace(reg,'-'),
        successFn: data => {
            callback(data)
        },
        errorFn: () => {
            callback({})
        }
    });
}

export function ifWxPayFn (callback=function () {
}) {
    Request({
        url: `/config/list`,
        successFn: data => {
        if (data && data.length > 0) {
            const targetObj = data.find((item) => item.sysKey === 'SYS_WX_PAY')
            callback(targetObj.sysValue === '1')
        } else {
                callback(false)
            }
        },
            errorFn: () => {
                callback(false)
        }
    });
}

export function ifYbkPayFn (callback=function () {
}) {
    Request({
        url: `/config/list`,
        successFn: data => {
        if (data && data.length > 0) {
            const targetObj = data.find((item) => item.sysKey === 'YBK_PAYMENT')
            callback(targetObj.sysValue === '0')
        } else {
                callback(false)
            }
        },
            errorFn: () => {
                callback(false)
        }
    });
}


export function getDeviceId(isInApp,callback){
    if (isInApp) {
        sensors.getAppStatus(function(app_info){
            console.log("app内获取的设备app_info",app_info);
            console.log("app内获取的设备id"+app_info.device_id);
            callback(app_info.device_id);
        });
    } else {
        sensors.quick('isReady',function(){
           let anonymousId = sensors.quick('getAnonymousID');
            console.log("app外获取的设备id"+anonymousId);
            callback(anonymousId);
        });
    }
}

export function ifAgreementPayFn (callback=function () {
}) {
    Request({
        url: `/config/list`,
        successFn: data => {
        if (data && data.length > 0) {
            const targetAgreementObj = data.find((item) => item.sysKey === 'SYS_PAYMENT')
            callback(targetAgreementObj.sysValue === '1')
        } else {
                callback(false)
            }
        },
            errorFn: () => {
                callback(false)
        }
    });
}

/**
 * 微信小程序获得token
 * @param code 小程序登录code
 * @param callback 回调函数
 */
export function getMiniTokenFn(code,callback=function(){}) {
    console.log('mini app code:',code);
    //避免返回造成code失效
    var _cp_token = window.localStorage.getItem("cps_token")||'';
    // var _token = window.localStorage.getItem('miniappcode_'+code);
    // if(_token){
    //     callback(_token);
    //     return;
    // }
    if (code&&code !==window.localStorage.getItem("MINI_APP_LAST_CODE")) {
        //先清理一下，避免登录的是上一个号
        _cp_token='';
        window.localStorage.setItem("cps_token",'');
        window.localStorage.setItem("miniapp_user_code",'');
        Request({
            url: '/portal/startMp',
            method: 'POST',
            data: {code: code},
            contentType: 'application/json',
            successFn: (data) => {
                window.localStorage.setItem("MINI_APP_LAST_CODE",code);
                //这里直接把token存到本地的cps_token中
                if(data.accessToken){
                    //window.localStorage.setItem('miniappcode_'+code,data.accessToken);
                    window.localStorage.setItem("cps_token",data.accessToken);
                    window.localStorage.setItem("miniapp_user_code",data.userCode);
                    window.localStorage.setItem("USERCODE", data.userCode);
                    _cp_token = data.accessToken;
                    //神策登录
                    sensors.login(data.userCode);
                }
                callback(_cp_token);
            },
            failFn: (data) => {
                callback(_cp_token,true);
            }
        })
    } else {
        callback(_cp_token);
    }
}

export function navGoBack (callback=function () {
}) {
       window.onpageshow = function(e){
           if(e.persisted || (window.performance && window.performance.navigation.type == 2)){
               callback();
           }
       }
}

export function showAlert(content) {
    Dialog.alert({
        content: content
    })

}

export function isPhone () {
  var sUserAgent = navigator.userAgent.toLowerCase();
  return (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent))
}
