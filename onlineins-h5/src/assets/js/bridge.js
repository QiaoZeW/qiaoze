
var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//判断是否在App内
function _isBrowser () {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('bnonline') > -1 ? true : false
    // return ua.match(/bnonline/i) === 'bnonline' ? true : false
}

 function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        if (!isAndroid) {
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            if(_isBrowser()) {//如果是体内再增加这个部分
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0)
            }
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }
}


connectWebViewJavascriptBridge(function (bridge) {
    if (isAndroid == true) {
        bridge.init(function (message, responseCallback) {
            responseCallback({'Javascript Responds': 'Wee!'})
        })
    }
});
