// 封装公共方法

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 提示框封装
function wxTips(msg, duration) {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: duration || 2000
    })
}

// 数据请求封装
function fetch(url, params, type = 'GET') {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: params,
            header: {
                "Content-Type": "json"
            },
            method: type,
            dataType: "json",
            success: resolve,
            fail: reject
        })
    })
}

module.exports = {
    formatTime: formatTime,
    wxTips: wxTips,
    fetch: fetch,
}