var shenceUrl = 'https://scdata.aeonlife.com.cn/sa?project=default'; //测试环境URL
if (window.shenceprodeurl) {
    shenceUrl = window.shenceprodeurl;
}
(function (para) {
    var p = para.sdk_url,
        n = para.name,
        w = window,
        d = document,
        s = 'script',
        x = null,
        y = null;
    if (typeof (w['sensorsDataAnalytic201505']) !== 'undefined') {
        return false;
    }
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function (a) {
        return function () {
            (w[n]._q = w[n]._q || []).push([a, arguments]);
        }
    };
    var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'trackAbtest',
        'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus'
    ];
    for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        x.setAttribute('charset', 'UTF-8');
        y.parentNode.insertBefore(x, y);
        w[n].para = para;
    }
})({

    sdk_url: '/static/shencemodules/sensorsdata.min.js',
    heatmap_url: '/static/shencemodules/heatmap.min.js',
    is_track_device_id: true,
    cross_subdomain: false,
    latest_referrer_host:true,
    name: 'sensors',
    // 测试环境
    server_url: shenceUrl,
    // 生产环境
    // server_url: 'https://scdata.aeonlife.com.cn/sa?project=production',
    // 配置打通 App 与 H5 的参数
    use_app_track: true,
    callback_timeout: 500,
    heatmap: {
        // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
        // 需要 JSSDK 版本号大于 1.7
        clickmap: 'default',
        // 是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
        // 需要 JSSDK 版本号大于 1.9.1
        scroll_notice_map: 'default',
        // 设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
        loadTimeout: 3000,
        collect_elements: 'all',
        //设置只采集a,input,button,textarea,img的$WebClick 事件
        collect_element: function(element_target){
            var t = element_target.tagName.toLowerCase();
            if("a" === t || "button" === t || "input" === t || "img" === t || "textarea" ===t){
                    return true;
            }else{
                if(element_target.getAttribute&&element_target.getAttribute('sensors-enable') === 'true'){
                    return true;
                }
            }
            return false;
        }
    },
});
(function(){
    //判断是否在小程序环境,异步保证准确
    function isBnMpForShence(q) {
        var isMp = window.navigator.userAgent.toLowerCase().indexOf("miniprogram")>-1?true: window.__wxjs_environment === 'miniprogram'?true: false;
        var isBnMp = false;
        if(isMp){
            if('1'===q['isbn']){
                isBnMp=true;
            }else if('1' === window.localStorage.getItem("isbn")){
                isBnMp=true;
            }
        }
        return isBnMp;
    }
    function isBrowserForShence() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('bnonline') > -1 ? true : false;
    }
    var APP_NAME = '百年人寿在线app',q={},PLATFORM_TYPE = 'H5';
    // location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
	location.search.replace(/([^?&=]+)=([^&]+)/g,function (_,k,v){
		 return q[k]=v
	});
    if (q['agentCode']) {
        // 代理人微投AppName设为代理人微投
        APP_NAME = '代理人微投';
    }
    if(isBrowserForShence()){
        PLATFORM_TYPE = "app";
    }else if(isBnMpForShence(q)){
        PLATFORM_TYPE = "MiniProgram";
    }
    sensors.registerPage({
        platform_type: PLATFORM_TYPE,
        app_name: APP_NAME,
    });
    sensors.quick('autoTrack');
})();
