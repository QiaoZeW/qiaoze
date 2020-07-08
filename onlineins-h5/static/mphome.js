(function () {
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }
    function getClass( elem ) {
        return elem.getAttribute && elem.getAttribute( "class" ) || "";
    }
    function classesToArray( value ) {
        if ( Array.isArray( value ) ) {
            return value;
        }
        if ( typeof value === "string" ) {
            return value.match( rnothtmlwhite ) || [];
        }
        return [];
    }
    function stopTouch(e){
        e.preventDefault();
    }

    var MpHome = {
        elem: null,
        flag: false,
        cur: {
            left: 0,
            top: 0,
            x: 0,
            y: 0
        },
        style: function (elem, name, value) {
            var style = elem.style;
            style[name] = value;
        },
        styles: function (elem, styles) {
            for (key in styles) {
                MpHome.style(elem, key, styles[key]);
            }
        },
        addClass: function( elem,value ) {
            var classes,  cur, curValue, clazz, j, finalValue,
                i = 0;
            classes = classesToArray( value );
            if ( classes.length ) {
                    curValue = getClass( elem );
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
            }
        },

        removeClass: function( elem,value ) {
            var classes, cur, curValue, clazz, j, finalValue,
                i = 0;
            if ( !value ) {
                return elem.setAttribute( "class", "" );
            }
            classes = classesToArray( value );
            if ( classes.length ) {
                    curValue = getClass( elem );
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {
                            while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
            }
        },
        goHome: function (e) {
            wx.miniProgram.switchTab({url: '/pages/home/index'});
        },
        down: function (event) {
            console.log('move down');
            MpHome.flag = true;
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            console.log('elem-left', MpHome.elem.offsetLeft, 'elem-top:', MpHome.elem.offsetTop);
            MpHome.cur = {x: touch.clientX, y: touch.clientY, left: MpHome.elem.offsetLeft, top: MpHome.elem.offsetTop};
            MpHome.elem.style.opacity = 1;
        },
        move: function (event) {
            if (MpHome.flag) {
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                var cur = MpHome.cur;
                var nx = touch.clientX - cur.x;
                var ny = touch.clientY - cur.y;
                var x = cur.left + nx;
                var y = cur.top + ny;
                x = x > 0 ? x : 0;
                y = y > 0 ? y : 0;
                MpHome.elem.style.left = x + "px";
                MpHome.elem.style.top = y + "px";
                MpHome.addClass(document.body,'no-scroll');
                //阻止页面的滑动默认事件
                document.body.addEventListener("touchmove", stopTouch, {passive: false, capture: true});
            }
        },
        //鼠标释放时候的函数
        end: function () {
            MpHome.flag = false;
            console.log('move end');
            MpHome.removeClass(document.body,'no-scroll');
            document.body.removeEventListener("touchmove", stopTouch, {passive: true, capture: true});
           // document.body.addEventListener("touchmove",function(){ MpHome.removeClass(document.body,'no-scroll');},false);
            MpHome.elem.style.opacity = 0.5;
        },
        init: function () {
            var elem = document.createElement("div");
            elem.addEventListener("click", MpHome.goHome, false);
            // elem.setAttribute("draggable", "true");
            document.body.append(elem);
            var initStyle = {
                backgroundImage: "url(/static/images/mp_home.png)",
                backgroundSize: "80% 80%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center 2px',
                position: 'fixed',
                width: '40px',
                height: '40px',
                bottom: '60px',
                right: '10px',
                backgroundColor: '#ffffff',
                borderRadius: "40px",
                borderColor: "#aaa",
                borderStyle: 'solid',
                borderWidth: '1px',
                opacity: 0.5,
                zIndex:9999
            };
            MpHome.styles(elem, initStyle);

            elem.addEventListener("mousedown", MpHome.down, false);
            elem.addEventListener("touchstart", MpHome.down, false)
            elem.addEventListener("mousemove", MpHome.move, false);
            elem.addEventListener("touchmove", MpHome.move, false)
            elem.addEventListener("touchend", MpHome.end, false);
            document.addEventListener("mouseup", function () {
                MpHome.end();
            }, false);

            MpHome.elem = elem;
        }

    };

    //判断是否在小程序环境,异步保证准确
    function isBnMiniProgramAsync(callback) {
        function _wxready() {
            var isMp = window.navigator.userAgent.toLowerCase().indexOf("miniprogram")>-1?true: window.__wxjs_environment === 'miniprogram'?true:false;
            var isBnMp = '1' === window.localStorage.getItem("isbn");
            callback(isMp && isBnMp);
        }

        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
            document.addEventListener('WeixinJSBridgeReady', _wxready, false);
        } else {
            _wxready();
        }
    }

    // setTimeout(function () {
    //     isBnMiniProgramAsync(function (isbnmp) {
    //         if (isbnmp) {
    //             MpHome.init();
    //             window.addEventListener('popstate', function (e) {
    //                 localStorage.setItem("popstate",e);
    //                 console.log('popstate:',e);
    //                 let curUrl =window.location.href;
    //                 localStorage.setItem("popstate",cururl);
    //                 console.log('cururl:',window.location.href);
    //                 if(curUrl.indexOf('/product/WaitPayResult')>-1) {
    //                     //避免永远返回不到上一个页面
    //                     console.log('进入m/product/WaitPayResult页面');
    //                     localStorage.setItem("popstate",'进入/product/WaitPayResult页面');
    //                     history.go(-2);
    //                 }
    //             });
    //         }
    //     });
    // }, 3000);
})();
