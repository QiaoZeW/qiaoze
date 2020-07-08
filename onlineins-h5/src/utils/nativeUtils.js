import Vue from './app'

/**
 * @author joe
 * @date 2019/11/12
 * @Description:
 绑定微信：1
 绑定银行卡：2
 绑定支付宝：3
 添加常用被保人：4
 实名认证：5
 发现页面： 6
 */
export function goNative(flag) {
    setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(
            "goNative", {"id": JSON.stringify(flag)}, function (response) {
            }
        );
    });
}

/**
 * @author joe
 * @date 2019/12/27
 * @Description: 回首页的方法 包括小程序等
*/
export function  goBackHome (id=1) {
    console.log(Vue);
    if (Vue.isBrowser()) { // 体内返回首页
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('backHome'
                , {'id': 2}, function (responseData) {
                }
            );
        })
    } else { // 体外
         let cpsGoBackUrl = localStorage.getItem('cps_goBackUrl') || '';
         let product_id = Vue.$router.query('product_id') || id;
         let secondaryDistributor = Vue.$router.query('secondaryDistributor') || localStorage.getItem('cps_secondaryDistributor') || 'CPS_00010009';
        if (Vue.isMiniProgram()&&Vue.isBnMiniApp()){   //是否在小程序内   直接跳转到首页
            wx.miniProgram.switchTab({ url: '/pages/home/index' })
            return false
        } else if (cpsGoBackUrl) { // 渠道链接首页
            location.href = cpsGoBackUrl
            return false
        } else {
            // 回详情页面
            location.href = `https://bnonline.aeonlife.com.cn/product/Detail.html?product_id=${product_id}&thirdClassDistributor=&secondaryDistributor=${secondaryDistributor}&shareUserCode=`
        }
    }
}
