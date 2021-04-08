/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-14 07:44:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-14 10:05:18
 */

class CookieUtil {
    get(name) {
        let cookieName = `${encodeURIComponent(name)}=`
        let cookieStart = document.cookie.indexOf(cookieName)
        let cookieValue = null
        console.log(cookieStart);
        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart)
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))

        }
        return cookieValue
    }
    set(name, value, expires, path, domain, secure) {
        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        if (expires instanceof Date) {
            cookieText += `; expires=${expires.toGMTString()}`
        }
        if (path) {
            cookieText += `; path=${path}`
        }
        if (domain) {
            cookieText += `; domain=${domain}`
        }
        if (secure) {
            cookieText += `; secure`
        }

        document.cookie = cookieText

    }
    unset(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure)
    }

}

const cookieUtil = new CookieUtil()

function getCookie(name) {
    return cookieUtil.get(name)
}
function setCookie(name, value, expires, path, domain, secure) {
    return cookieUtil.set(name, value, expires, path, domain, secure)
}
function unSet(name, path, domain, secure) {
    cookieUtil.unset(name, path, domain, secure)
}


export { getCookie, setCookie, unSet }

