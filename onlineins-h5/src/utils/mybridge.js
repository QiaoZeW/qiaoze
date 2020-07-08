export function myBridge(callback) {
    console.log('妈妈再也不用担心我的学习')
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

//判断是否在App内
function _isBrowser () {
    let ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('bnonline') > -1 ? true : false
    // return ua.match(/bnonline/i) === 'bnonline' ? true : false
}