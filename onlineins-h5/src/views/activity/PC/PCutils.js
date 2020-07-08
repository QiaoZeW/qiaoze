export function setSize () {
    function densityDpi() {
      var a = document.getElementById('densityDpi');
      if (!!a) {
        var b = parseInt(window.screen.width);
        var c = b / 1200;
        var d = RegExp("Android").test(navigator.userAgent);
        var e = !!navigator.userAgent.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/);
        if (d) {
          a.setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale = ' + c + ', maximum-scale = ' + c + ',initial-scale = ' + c + ',target-densitydpi=device-dpi')
        } else if (e) {
          a.setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale = ' + c + ', maximum-scale = ' + c + ',initial-scale = ' + c)
        }
      }
    }
    densityDpi()
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, function () {
      densityDpi()
    }, false)
}
