import Axios from 'axios'
import Settings from '~/settings.json'
import { encrypt } from '@/utils/crypto1'
import {
    Toast
} from 'mand-mobile'

let server = Settings.preservation_devServer || {}
if (process.env.NODE_ENV === 'production') {
    server = Settings.preservation_server
} else if (process.env.NODE_ENV === 'sit') {
    server = Settings.preservation_sitServer
} else if (process.env.NODE_ENV === 'uat') {
    server = Settings.preservation_uatServer
}

const Preservation = ({
                     userToken = '',
                     isLoading = false,
                     method = 'GET',
                     isEncript = false,
                     url = '',
                     params = {},
                     data = {},
                     parentNode = document.body,
                     contentType = 'application/x-www-form-urlencoded',
                     successFn = function () {
                     }, // 请求成功回调
                     failFn = function () {
                     }, // 请求失败回调
                     completeFn = function () {
                     }, // 请求完成回调
                     errorFn = function () {
                     } // 网络错误回调
                 } = {}) => {
    let tracks = {
        t: (new Date()).valueOf()
    }

    let headers = {
        'Content-type': contentType,
        'App-Platform': 'H5'
    }


    let authorization = userToken
    if (authorization) {
        headers.Authorization = 'Bearer ' + userToken
    }
    const $http = Axios.create()
    $http.interceptors.request.use(request => {
        if (isLoading) {
            Toast.loading('请稍后...', 120000, true, parentNode)
        }
        if (isEncript) {
            /*d
                需要加密的接口传参isEncript:true
                如果是通过接口path传参， 例如/aa/bb/cc,bb和cc是动态参数这时候需要在parasms传入参数pathQueryLen=2,一个就传1
            */
            jiamiFn (request)
        }
        return request
    })
    $http.interceptors.response.use(request => {
        if (isLoading) {
            Toast.hide()
        }
        return request
    })

    $http({
        url: server + url,
        method: method,
        headers: headers,
        timeout: 120000,
        params: {
            ...params,
            ...tracks
        },
        data: JSON.stringify(data)
    }).then((res) => {
        if (res.status === 200) {
            if (res.headers.hasOwnProperty('cps_token')) {
                window.localStorage.setItem('cps_token', res.headers.cps_token.replace('Bearer ', ''))
            }
            if (res.data.success === 'true') {
                successFn(res.data.data)
            } else {
                failFn(res.data)
            }
            // (res.data.success === 'true') ? successFn(res.data.data) : failFn(res.data)
            completeFn(res.data)
        } else {
            errorFn()
        }
    }).catch(() => {
        errorFn()
    })
}

function randomStr () {
    return Math.random().toString(36).substr(2)
}

function isEmptyObj (obj) {
    (typeof obj === 'string') && (obj = JSON.parse(obj))
    return JSON.stringify(obj) === '{}'
}

function dealPathStr (path, len=1) {
    var lastIndex = path.lastIndexOf('/')
    while (len > 1) {
        lastIndex = path.lastIndexOf('/', lastIndex-1)
        len--
    }
    return path.substr(lastIndex+1).split('/').sort().join(',')
}

function jiamiFn (req) {
    let ifStrTrue = req.params.pathQueryLen
    delete req.params.t
    delete req.params.pathQueryLen
    const headersObj = {
        'App-Timestamp': Date.now(), // Date.now(),
        'App-Nonce': randomStr(), // randomStr(),
        'App-Device-No': `H5-${randomStr()}` // `H5-${randomStr()}`
    }
    req.headers['App-Timestamp'] = headersObj['App-Timestamp']
    req.headers['App-Nonce'] = headersObj['App-Nonce']
    req.headers['App-Device-No'] = headersObj['App-Device-No']
    let headersStartStr = '';
    if (!isEmptyObj(req.data)) {
        headersStartStr = req.data+'#'
    } else {
        req.data=''
    }
    let headersMidStr1 = !isEmptyObj(req.params) ? Object.keys(req.params).sort().map(item => `${item}=${req.params[item]}`).join('&')+'#' : '';
    let headersMidStr2 = ifStrTrue ? dealPathStr(req.url, ifStrTrue)+'#' : '';
    let headersEndStr = `app-timestamp=${headersObj['App-Timestamp']}&app-nonce=${headersObj['App-Nonce']}&app-device-no=${headersObj['App-Device-No']}`;
    let signStr = headersStartStr+headersMidStr1+headersMidStr2+headersEndStr;
    console.log('signStr', signStr)
    console.log('headersStartStr', headersStartStr)
    console.log('headersMidStr1', headersMidStr1)
    console.log('headersMidStr2', headersMidStr2)
    console.log('headersEndStr', headersEndStr)
    req.headers['App-Sign'] = encrypt(signStr)
}

Preservation.install = (Vue, options) => {
    Vue.prototype.$prequest = Preservation
}

export default Preservation
