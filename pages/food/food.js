// pages/food/food.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: 3,
        shopList: [], //商店列表
    },
    /*点击五星评分 */
    changeStar: function(e) {
        var self = this;
        self.setData({
            flag: e.currentTarget.dataset.flag
        })
    },

    // 分数转化为star,分数除10后四舍五入取正
    score2Star: function(score) {
        var star = 1;
        score = Math.round(parseInt(score) / 10);
        switch (score) {
            case 10:
            case 9:
                star = 5;
                break;
            case 8:
            case 7:
                star = 4;
                break;
            case 6:
            case 5:
                star = 3;
                break;
            case 4:
            case 3:
                star = 2;
                break;
            case 2:
            case 1:
                star = 1;
                break;
            default:
                star = 1;
        }
        return star;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        wx.request({
            url: "https://locally.uieee.com/categories/" + options.cat + "/shops",
            data: {
                _limit: 10,
                _page: 1
            },
            success: (res) => {
                
                res.data.map(item => {
                    item.star = this.score2Star(item.score)
                })
                this.setData({
                    shopList : res.data
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})