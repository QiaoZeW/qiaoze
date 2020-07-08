function setupWebViewJavascriptBridge(callback) {
    if(_isBrowser()){//如果是体内再增加这个部分
        // Android使用
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function () {
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
        // iOS使用
        if (window.WebViewJavascriptBridge) {
            // return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }

        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }
}

document.documentElement.addEventListener('touchmove', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);


function _isMiniProgram(){
    //从微信7.0.0开始，可以通过判断userAgent中包含miniProgram字样来判断小程序web-view环境。
    var f = window.navigator.userAgent.toLowerCase().indexOf("miniprogram")>-1;
    if(!f){
        f = window.__wxjs_environment === 'miniprogram';
    }
    return f;
}
//判断是否在App内
function _isBrowser () {
    var ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('bnonline') > -1 ? true : false
    // return ua.match(/bnonline/i) === 'bnonline' ? true : false
}
