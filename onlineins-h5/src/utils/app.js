import Settings from '~/settings.json'
import '../static/iconfont/iconfont.css'
import '../assets/iconfont/iconfont.css'
import { getBusinessShare, isPhone, getFalg, getBxdUrl, getWxShare, getWxProduct, getCPSWxShareInfo, if20AccessFn, ifYbkPayFn, ifWxPayFn, getDeviceId, ifAgreementPayFn, getMiniTokenFn, showAlert} from '@/utils/utils'
const App = {
    GLOBAL: {
        // 生产环境服务
        server: Settings.server,
        winWidth: window.screen.availWidth,
        winHeight: window.screen.availHeight
    },
    do: function () {
        // 供 Native 调用的 Js Function
        window.gmJS = {}
    },
    $router: {
        queryAll: (key) => {
            var search = window.location.search
            var value = ''
            var tmp = []
            if (search) {
                tmp = (process.env.NODE_ENV === 'production')
                    ? search.slice(1).split(key + '=')
                    : search.slice(1).split(key + '=')
            }
            value = tmp[1]
            return value
        },
        query: (key) => {
            var search = window.location.search
            // console.log(search)
            var value = ''
            var tmp = []
            if (search) {
                tmp = (process.env.NODE_ENV === 'production')
                    ? search.slice(1).split('&')
                    : search.slice(1).split('&')
            }
            for (let i in tmp) {
                if (key === tmp[i].split('=')[0]) {
                    value = tmp[i].split('=')[1]
                    break
                }
            }
            return value
        },
        siteUrl: () => {
            let SiteUrl = ''
            if (process.env.NODE_ENV === 'sit') {
                SiteUrl = Settings.siteUrl
            } else if (process.env.NODE_ENV === 'production') {
                SiteUrl = Settings.proSiteUrl
            } else if (process.env.NODE_ENV === 'uat') {
                SiteUrl = Settings.uatSiteUrl
            } else {
                SiteUrl = Settings.devSiteUrl
            }
            return SiteUrl
        },
        serverUrl: () => {
            let server = Settings.devServer || ''
            if (process.env.NODE_ENV === 'production') {
                server = Settings.server
            } else if (process.env.NODE_ENV === 'sit') {
                server = Settings.sitServer
            } else if (process.env.NODE_ENV === 'uat') {
                server = Settings.uatServer
            }
            return server
        }
    },
    $gmclient: {
        isClient: () => {
            var ua = window.navigator.userAgent.toLowerCase()
            return ua.indexOf('gengmei') > 0
        },
        version: () => {
            var ua = window.navigator.userAgent.toLowerCase()
            var tmp = ua.split(' ')
            var gmInfo = tmp[tmp.length - 1].split('/')
            var version = (gmInfo.length === 2 && gmInfo[0] === 'gengmei') ? gmInfo[1] : ''
            return version
        },
        diffVersion: (curVersion, baseVersion) => {
            if (!(curVersion && baseVersion)) {
                return false
            }
            var cur = curVersion.split('.')
            var base = baseVersion.split('.')
            if (cur[2] === undefined) {
                cur[2] = '0'
            }
            if (base[2] === undefined) {
                base[2] = '0'
            }
            var result = cur[0] * 10000 + cur[1] * 100 + cur[2] - (base[0] * 10000 + base[1] * 100 + base[2])
            return result
        }
    },
    setPageTitle: (title = '') => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.setPageTitle !== 'undefined')) {
            gmclient.setPageTitle(title)
        }
    },
    setPageData: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.setPageData !== 'undefined')) {
            gmclient.setPageData(JSON.stringify(opts))
        }
    },
    showToast: (opts = {}) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.showToast !== 'undefined')) {
            gmclient.showToast(JSON.stringify(opts))
        }
    },
    needLogin: () => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.logout !== 'undefined')) {
            gmclient.logout()
        }
    },
    // 埋点
    trackEvent: (opts = {}, callback) => {
        /* eslint-disable no-undef */
        if ((typeof gmclient !== 'undefined') && (typeof gmclient.trackEvent !== 'undefined')) {
            gmclient.trackEvent(JSON.stringify(opts))
        }
        callback && callback()
    },
    userSkip: (type, id) => {
        switch (type) {
            case 0:
                window.location.href = `gengmei://other_homepage?uid=${id}`
                break
            case 1:
                window.location.href = `gengmei://expert?expert_id=${id}`
                break
            case 2:
                window.location.href = `gengmei://organization_detail?organization_id=${id}`
                break
        }
    },
    // 获取APP的token，获取token后再执行回调函数
    getToken: (callback) => {
        if (App.isBrowser()) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getToken'
                    , {'id': 2}, function (responseData) {
                        responseData = JSON.parse(responseData)
                        var userToken = responseData.data
                        callback && callback(userToken)
                    }
                )
            })
        } else {
            // app 外
            let cps_token = localStorage.getItem('cps_token')
            let user_pay = JSON.parse(localStorage.getItem('USER_TOKEN_PAY'))
            if (cps_token) {
                callback(cps_token)
            } else if (user_pay) {
                callback(user_pay)
            } else {
                callback('')
                //  callback("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwODI5MDIzODM4MDAwMDgiLCJleHAiOjE1Njk2NTI3ODN9.O7rLDosWd4bhZqbkLrAVugg68JLGbXreI8u5uostiduVMViinxp1B8WhM_BKKgFNeDvW8Sy5EfRRDuQcMbtetg")
                //  callback("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCTjIwMTkwMzI0MDY0MjMxMDAwMDIiLCJleHAiOjE1NTk4MDU2NDF9.ThG5Mrsnm6Iysh_qgamcHxSDPldjCcsCNGX8_2oT8OwzVZiKmOphvLZkR88ZlwBDVbHqva2N45NtLKk91RczhA")
            }
        }
    },
    // 获取APP的token，返回结果但是不跳转登陆页面
    getCurrentToken: (callback) => {
        if (App.isBrowser()) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getCurrentToken'
                    , {'id': 2}, function (responseData) {
                        responseData = JSON.parse(responseData)
                        var userToken = responseData.data
                        callback && callback(userToken)
                    }
                )
            })
        } else {
            // 体外
            callback('')
        }
    },
    getDeviceNo: (callback) => {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('getDeviceNo'
                , {'id': 2}, function (responseData) {
                    responseData = JSON.parse(responseData)
                    var deviceNo = responseData.data
                    var appDeviceNo = responseData.anonymousId
                    callback && callback(deviceNo, appDeviceNo)
                }
            )
        })
    },
    // 获取APP的token，获取token后再执行回调函数
    getUserCode: (callback) => {
        if (App.isBrowser()) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getUser'
                    , {'id': 2}, function (responseData) {
                        responseData = JSON.parse(responseData)
                        var userCode = responseData.data
                        callback && callback(userCode)
                    }
                )
            })
        } else {
            if (App.isMiniProgram() && App.isBnMiniApp()) {
                let userCode = localStorage.getItem('miniapp_user_code') || localStorage.getItem('inviterCode') || ''
                callback(userCode)
            } else {
                //  APP外
                let userCode = ''
                if (localStorage.getItem('inviterCode')) {
                    userCode = localStorage.getItem('inviterCode')
                }
                callback(userCode)
            }
        }
    },

    // 获取APP的token，获取token后再执行回调函数
    getCurrentUserCode: (callback) => {
        if (App.isBrowser()) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getCurrentUserCode'
                    , {'id': 2}, function (responseData) {
                        responseData = JSON.parse(responseData)
                        var userCode = responseData.data
                        callback && callback(userCode)
                    }
                )
            })
        } else {
            //  APP外
            callback('')
        }
    },
    getVersion: (callback) => {
        if (App.isBrowser()) {
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getVersion'
                    , {}, function (res) {
                        var responseData = JSON.parse(res)
                        callback && callback(responseData)
                    }
                )
            })
        } else {
            //  APP外
            callback('')
        }
    },
    // 判断是否在App内
    isBrowser () {
        let ua = window.navigator.userAgent.toLowerCase()
        return ua.indexOf('bnonline') > -1
        // return ua.match(/bnonline/i) === 'bnonline' ? true : false
    },
    // 判断是否在小程序环境 但这个方法必须是在微信桥接方法执行之后
    isMiniProgram () {
        // 从微信7.0.0开始，可以通过判断userAgent中包含miniProgram字样来判断小程序web-view环境。
        let f = window.navigator.userAgent.toLowerCase().indexOf('miniprogram') > -1
        if (!f) {
            f = window.__wxjs_environment === 'miniprogram'
        }
        return f
    },
    // 判断是否在小程序环境,异步保证准确
    isMiniProgramAsync (callback) {
        if (App.isMiniProgram()) {
            return callback(true)
        }
        function _wxready () {
            callback(window.__wxjs_environment === 'miniprogram')
        }
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
            document.addEventListener('WeixinJSBridgeReady', _wxready, false)
        } else {
            _wxready()
        }
    },
    // 获得载体来源
    getCarrierType () {
        let types = ['app', 'bnminiapp', 'cpslink']//
        let r = 2
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.indexOf('bnonline') > -1) {
            r = 0
        } else if (ua.indexOf('miniprogram') > -1 && localStorage.getItem('isbn') == '1') {
            r = 1
        }
        return types[r]
    },
    // 获取百小答地址
    getBxdServiceUrl () {
        const agentCode = App.$router.query('agentCode')
        let riskName = JSON.parse(localStorage.getItem('riskName'))
        let mobile = '', name = '', channelCode = '', localUrl = ''

        let item = {}
        getFalg({
            agentCode,
            callback: function (data, allData) {
                if (agentCode) {
                    channelCode = '代理人微投'
                    item = {
                        'partnerId': 'oCrFruIKd1FxtW8iMDKwDYvoaxrQ',
                        'sign': 'E 04XlBBa0F2 oLO8EMzUt fQ/blEv6JBoESpijH1KQ=',
                        'name': name,
                        'mobile': mobile,
                        'productName': riskName,
                        'channelCode': channelCode
                    }
                    localUrl = 'https://crmrobot.aeonlife.com.cn/chat/h5/index.html?sysNum=fa80cd602dde489eb34207510aff607a&robotFlag=6&groupId=ed669afee44144cd9f0caf3914cd6024&channel=4&adminNonelineTitle=在线客服服务时间：09:00—22:00&params=' + JSON.stringify(item)
                } else {
                    item = {
                        'partnerId': 'oCrFruIKd1FxtW8iMDKwDYvoaxrQ',
                        'sign': 'E 04XlBBa0F2 oLO8EMzUt fQ/blEv6JBoESpijH1KQ=',
                        'name': name,
                        'mobile': mobile,
                        'productName': riskName,
                        'channelCode': data.remark // 这个参数要从接口读取，实现可配置
                    }
                    localUrl = 'https://crmrobot.aeonlife.com.cn/chat/h5/index.html?sysNum=fa80cd602dde489eb34207510aff607a&robotFlag=6&groupId=' + data.groupId + '&channel=4&adminNonelineTitle=在线客服服务时间：09:00—22:00&params=' + JSON.stringify(item)
                }
                App.getToken(function (userToken) {
                    getBxdUrl(userToken, function (url) {
                        if (url != 'N') {
                            delete item.partnerId
                            delete item.sign
                            localUrl = `${url}&params=${JSON.stringify(item)}&sourceCode=${allData.sourceCode}`
                            if (agentCode) {
                                localUrl = `${url}&params=${JSON.stringify(item)}&sourceCode=bnt_e_wechat_app`
                            }
                        }
                        // 百小达url增加设备id参数
                        getDeviceId(App.isBrowser(), function (deviceId) {
                            localUrl = `${localUrl}&deviceId=${deviceId}`
                            if (localStorage.getItem('cps_secondaryDistributor') == 'SEM_PC' && !isPhone()) {
                                window.open(localUrl)
                            } else {
                                location.href = localUrl
                            }
                        })
                    })
                })
            }
        })
    },
    getDeviceIdSence: (callback) => {
        getDeviceId(App.isBrowser(), function (deviceId) {
            callback && callback(deviceId)
        })
    },
    wxProductDetail (product_id, is_hide) {
        let cpsWS = localStorage.getItem('cps_cpsWS')
        let wxShareSign = localStorage.getItem('cps_wxShareSign')
        let cpsCode = localStorage.getItem('cps_secondaryDistributor')
        if (cpsWS !== '' && cpsWS !== null && cpsWS === 'true') {
            getCPSWxShareInfo(
                product_id, cpsCode, wxShareSign,
                function (data) {
                    let options = {}
                    let href
                    if (data.productLink !== '' && data.productLink !== null) {
                        // eslint-disable-next-line camelcase
                        href = data.productLink + '?product_id=' + product_id
                        if (App.$router.query('secondaryDistributor') !== null) {
                            href = href + ('&secondaryDistributor=' + App.$router.query('secondaryDistributor'))
                        }
                        if (App.$router.query('thirdClassDistributor')) {
                            href = href + ('&thirdClassDistributor=' + App.$router.query('thirdClassDistributor'))
                        }
                        if (App.$router.query('shareUserCode')) {
                            href = href + ('&shareUserCode=' + App.$router.query('shareUserCode'))
                        }
                        if (App.$router.query('agentCode')) {
                            href = href + ('&agentCode=' + App.$router.query('agentCode'))
                        }
                        if (App.$router.query('cpsWS')) {
                            href = href + ('&cpsWS=' + App.$router.query('cpsWS'))
                        }
                        if (App.$router.query('wxShareSign')) {
                            href = href + ('&wxShareSign=' + App.$router.query('wxShareSign'))
                        }
                    } else {
                        href = JSON.parse(localStorage.getItem('locationHref')) || (App.$router.siteUrl() + '/product/Detail.html?product_id=' + product_id +
                            ('&secondaryDistributor=' + App.$router.query('secondaryDistributor')) + ('&thirdClassDistributor=' + App.$router.query('thirdClassDistributor')) +
                            '&shareUserCode=' + App.$router.query('shareUserCode') + '&agentCode=' + App.$router.query('agentCode') + '&cpsWS=' + cpsWS + '&wxShareSign=' + wxShareSign)
                    }
                    options.href = location.href
                    options.title = data.shareTitle
                    options.desc = data.shareContent
                    options.link = href
                    options.imgUrl = data.minImage
                    console.log(options)
                    App.wxShareDetail(options, is_hide)
                }
            )
        } else {
            getWxProduct(
                product_id,
                function (data) {
                    let options = {}
                    let href
                    if (data.productLink !== '' && data.productLink !== null) {
                             href = data.productLink + '?product_id=' + product_id
                        if (App.$router.query('secondaryDistributor') !== null) {
                            href = href + ('&secondaryDistributor=' + App.$router.query('secondaryDistributor'))
                        }
                        if (App.$router.query('thirdClassDistributor')) {
                            href = href + ('&thirdClassDistributor=' + App.$router.query('thirdClassDistributor'))
                        }
                        if (App.$router.query('shareUserCode')) {
                            href = href + ('&shareUserCode=' + App.$router.query('shareUserCode'))
                        }
                        if (App.$router.query('agentCode')) {
                            href = href + ('&agentCode=' + App.$router.query('agentCode'))
                        }
                        if (App.$router.query('cpsWS')) {
                            href = href + ('&cpsWS=' + App.$router.query('cpsWS'))
                        }
                        if (App.$router.query('wxShareSign')) {
                            href = href + ('&wxShareSign=' + App.$router.query('wxShareSign'))
                        }
                    } else {
                        href = JSON.parse(localStorage.getItem('locationHref')) || (App.$router.siteUrl() + '/product/Detail.html?product_id=' + product_id +
                            ('&secondaryDistributor=' + App.$router.query('secondaryDistributor')) + ('&thirdClassDistributor=' + App.$router.query('thirdClassDistributor')) +
                            '&shareUserCode=' + App.$router.query('shareUserCode') + '&agentCode=' + App.$router.query('agentCode') + '&cpsWS=' + cpsWS + '&wxShareSign=' + wxShareSign)
                    }
                    /*  let userCode = ("&shareUserCode=" + App.$router.query('shareUserCode'))|| ''
                      let agentCode = ("&agentCode=" + App.$router.query('agentCode')) || ''
                      let thirdClassDistributor = ("&thirdClassDistributor=" + App.$router.query('thirdClassDistributor')) || ''
                      let secondaryDistributor =  ("&secondaryDistributor=" + App.$router.query('secondaryDistributor'))|| '' */
                    options.href = location.href
                    options.title = data.shareTitle
                    options.desc = data.shareContent
                    options.link = href
                    options.imgUrl = data.minImage
                    console.log(options)
                    App.wxShareDetail(options, is_hide)
                }
            )
        }
    },
    businessShareOptions (options, is_hide, flag = false) {
        getBusinessShare(options,
            function (data) {
                console.log('111', data)
                wx.config({
                    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，企业微信的corpID
                    timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
                    jsApiList: [
                        'hideOptionMenu', 'onMenuShareAppMessage', 'showOptionMenu', 'agentConfig', 'selectExternalContact', 'shareToExternalContact'
                    ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
                })
                wx.ready(function () {
                    console.log('agent调用测试')
                    console.log(wx)
                   /* wx.agentConfig({
                        corpid:  data.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                        agentid: '1000068', // 必填，企业微信的应用id （e.g. 1000247）
                        timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: ['shareToExternalContact','selectExternalContact'], //必填
                        success: function(res) {
                            console.log('qweqwewqewq',options);
                            wx.invoke("shareToExternalContact", {
                                    title: options.title, // 消息的标题
                                    desc: options.desc, // 消息的描述
                                    link: options.link, // 消息链接
                                    imgUrl: options.imgUrl// 消息封面
                                },function(res) {
                                    if (res.err_msg == "shareToExternalContact:ok") {
                                        console.log('接口調用成功');
                                    }
                                }
                            );
                        },
                        fail: function(res) {
                            if(res.errMsg.indexOf('function not exist') > -1){
                                alert('版本过低请升级')
                            }
                        }
                    }) */
                    if (is_hide) {
                        // 隐藏所有的微信操作 如分享/复制链接
                        wx.hideOptionMenu()
                    } else {
                        wx.showOptionMenu()
                    }

                 /*   wx.checkJsApi({
                        jsApiList: [
                            'shareToExternalContact',
                            'agentConfig',
                            'selectExternalContact'
                        ],
                        success: function (res) {
                            console.log(JSON.stringify(res));
                        },
                        fail: function (res) {
                            alert('版本过低请升级');
                        }
                    }) */

                    wx.onMenuShareAppMessage({
                        title: options.title, // 分享标题
                        desc: options.desc, // 分享描述
                        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: options.imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                })
                wx.error(function (res) {
                    console.log('config信息验证失败')
                    // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                })
            })
    },
    wxShareDetail (options, is_hide) {
        getWxShare(options,
            function (data) {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名
                    jsApiList: [ // 用的方法都要加进来
                        /* 'updateTimelineShareData', */ 'updateAppMessageShareData', 'hideOptionMenu'
                    ]
                })
                wx.ready(function () {
                    if (is_hide) {
                        // 隐藏所有的微信操作 如分享/复制链接
                        wx.hideOptionMenu()
                    }
                    /* wx.updateTimelineShareData({
                         title: '百年人寿官方app上线', // 分享标题
                         link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                         imgUrl: that.imgUrl, // 分享图标
                         success: function () {
                             // 用户确认分享后执行的回调函数
                         },
                         fail: function (res) {
                         }
                     }); */
                    wx.updateAppMessageShareData({
                        title: options.title, // 分享标题
                        desc: options.desc, // 分享描述
                        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: options.imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        },
                        fail: function (res) {
                        }
                    })
                })
                wx.error(function (res) {
                    console.log('config信息验证失败')
                    // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                })
            }
        )
    },
    // 下载app
    downLoadApp () {
        if (App.isMiniProgram()) {
            if (App.isBnMiniApp()) {
                wx.miniProgram.navigateTo({url: '/pages/user/downloadApp'})
                return
            } else {
                showAlert('请您在应用市场搜索“百年人寿”下载APP')
                return
            }
        }
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aeonlife.bnonline.prod'
    },
    // 20万反洗钱
    if20Access (callback) {
        if20AccessFn(callback)
    },
    // 微信支付
    ifWxPay (callback) {
        ifWxPayFn(callback)
    },
    // 医保卡支付
    ifYbkPay (callback) {
        ifYbkPayFn(callback)
    },
    // 协议支付
    ifAgreementPay (callback) {
        ifAgreementPayFn(callback)
    },
    // 是否显示智能核保和客服按钮
    showCustomerIntelligence (callback) {
        // 马上金融（关掉智核和客服）：  CPS_00010006
        // 北京外服（关掉智核和客服）：CPS_00010007
        // 支付宝生活号（需开智核客服）：CPS_00010008 可进入智能核保
        // 百年微信服务号（需开智核客服）： CPS_00010005 可进入智能核保
        // APP内分享出去的按钮（需开智核客服）：CPS_00010009 可进入智能核保
        // 开通百晓大开关   北京外服
        const agentCode = App.$router.query('agentCode')
        getFalg({ agentCode, callback })

        // 返回结果
        // {
        //     showBXD: data.serviceFlag === '1' || hasAgentCode, // 百小答显示控制
        //     showZNHB: data.smartUwFlag === '1' || hasAgentCode // 智能核保显示控制
        // }
        // const showCustomerIntelligenceArr = ['CPS_00010007', 'CPS_00010008', 'cps_00010005', 'CPS_00010009']
        // if(showCustomerIntelligenceArr.includes(ways) || agentCode ){
        //     return true
        // } else {
        //     return false
        // }
        // return showCustomerIntelligenceArr.includes(ways) // 显示返回true,不显示false
    },
    getCvalidateByBirthday (insurebirth, appbirth, applyDate) {
        let birthday = insurebirth
        if (appbirth) {
            if (this.getIsBirthday(appbirth, applyDate)) {
                birthday = appbirth
            }
        }
        let day3 = new Date()
        if (applyDate) {
            day3 = new Date(applyDate)
        }
        let today = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
        let toMor = new Date(day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000))
        let tomorrow = toMor.getFullYear() + '-' + (toMor.getMonth() + 1) + '-' + toMor.getDate()
        if (this.getIsBirthday(birthday, applyDate)) {
            return today
        } else {
            return tomorrow
        }
    },
    getIsBirthday (birthday, applyDate) {
        // 判断是否生日单，初始化生效时间，设置为当天
        let flag = false
        let ageBirthday = new Date(birthday)
        let day3 = new Date()
        if (applyDate) {
            day3 = new Date(applyDate)
        }
        let today = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
        let toMor = new Date(day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000))
        let tomorrow = toMor.getFullYear() + '-' + (toMor.getMonth() + 1) + '-' + toMor.getDate()
        if ((ageBirthday.getMonth() + 1) == parseInt(toMor.getMonth() + 1) && parseInt(ageBirthday.getDate()) == parseInt(toMor.getDate())) {
            flag = true
        }
        return flag
    },
    // 获取小程序token
    getMiniToken (code, callback) {
        getMiniTokenFn(code, callback)
    },
    isBnMiniApp () {
        if (window.localStorage.getItem('isbn') == '1') {
            return true
        }
        return false
    },
    /**
     * 过滤小程序跳转是否已登录，未登录跳转到小程序的登录页面否则直接跳转
     */
    goHrefFilter (url) {
        if (App.isMiniProgram() && App.isBnMiniApp()) {
            let userCode = window.localStorage.getItem('miniapp_user_code') || ''
            if (!userCode) {
                // let backUrl = encodeURIComponent(App.$router.siteUrl()+'/mp/MpHref?u='+encodeURIComponent(url));
                // let u =encodeURIComponent('/pages/w?u='+backUrl);
                let u = encodeURIComponent(App.$router.siteUrl() + '/mp/MpHref.html?u=' + encodeURIComponent(url))
                wx.miniProgram.navigateTo({url: `/pages/user/login?a=h5login&u=${u}`})
                return
                // wx.miniProgram.postMessage({
                //     data: JSON.stringify({
                //         action: 'goLogin',
                //         data: {u: u}
                //     })
                // });
                // wx.miniProgram.navigateBack();
            }
        }
        window.location.href = url
    },
    goPdfView (url) {
        let u = navigator.userAgent.toLowerCase()
        let isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
        if (isAndroid && App.isMiniProgram() && App.isBnMiniApp()) {
            wx.miniProgram.navigateTo({url: `/pages/pdf?u=${encodeURIComponent(url)}`})
        } else {
            window.location.href = url
        }
    },
    compareVersionGeq4ShareMpCard (version) {
        let r = false
        if (!version) return false
        var u = navigator.userAgent.toLowerCase()
        let isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1 // android终端
        let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) // ios终端
        version = version.replace(/[^.\d]/g, '')
        let androidVersion = '1.1.8'.split('.')
        let iosVersion = '1.1.5'.split('.')
        let ss = version.split('.')
        if (ss.length >= 3) {
            for (let i = 0; i < 3; i++) {
                if (isIos) {
                    if (parseInt(ss[i]) > parseInt(iosVersion[i])) {
                        r = true
                        break
                    } else if (parseInt(ss[i]) === parseInt(iosVersion[i])) {
                        if (i === 2) {
                            r = true
                        }
                        continue
                    } else {
                        break
                    }
                } else if (isAndroid) {
                    if (parseInt(ss[i]) > parseInt(androidVersion[i])) {
                        r = true
                        break
                    } else if (parseInt(ss[i]) === parseInt(androidVersion[i])) {
                        if (i === 2) {
                            r = true
                        }
                        continue
                    } else {
                        break
                    }
                }
            }
        }
        return r
    }
}

App.install = (Vue, options) => {
    Vue.prototype.GLOBAL = App.GLOBAL
    Vue.prototype.$app = {
        setPageTitle: App.setPageTitle,
        setPageData: App.setPageData,
        showToast: App.showToast,
        needLogin: App.needLogin,
        trackEvent: App.trackEvent,
        userSkip: App.userSkip,
        getToken: App.getToken,
        getVersion: App.getVersion,
        getCurrentToken: App.getCurrentToken,
        getCurrentUserCode: App.getCurrentUserCode,
        getUserCode: App.getUserCode,
        isBrowser: App.isBrowser,
        downLoadApp: App.downLoadApp,
        showCustomerIntelligence: App.showCustomerIntelligence,
        getBxdServiceUrl: App.getBxdServiceUrl,
        getCvalidateByBirthday: App.getCvalidateByBirthday,
        getIsBirthday: App.getIsBirthday,
        wxShareDetail: App.wxShareDetail,
        wxProductDetail: App.wxProductDetail,
        if20Access: App.if20Access,
        ifWxPay: App.ifWxPay,
        ifYbkPay: App.ifYbkPay,
        ifAgreementPay: App.ifAgreementPay,
        getDeviceNo: App.getDeviceNo,
        isMiniProgram: App.isMiniProgram,
        isMiniProgramAsync: App.isMiniProgramAsync,
        getMiniToken: App.getMiniToken,
        isBnMiniApp: App.isBnMiniApp,
        goHrefFilter: App.goHrefFilter,
        getDeviceIdSence: App.getDeviceIdSence,
        getCarrierType: App.getCarrierType,
        goPdfView: App.goPdfView,
        businessShareOptions: App.businessShareOptions,
        compareVersionGeq4ShareMpCard: App.compareVersionGeq4ShareMpCard
    }
    Vue.prototype.$gmclient = App.$gmclient
    Vue.prototype.$router = App.$router
}

export default App
