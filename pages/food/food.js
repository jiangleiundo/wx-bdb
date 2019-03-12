// pages/food/food.js
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: 1, // 评分，默认是1颗星
        catID: 1, //默认显示美食商店列表
        pageSize: 20, // 每页加载数据个数
        pageIndex: 1, // 默认从第一页开始
        shopList: [], //商店列表
        totalPage: 0, // 总页数
        loading: 1, // 上拉加载时loading是否显示，默认显示 
    },
    /*点击五星评分 */
    changeStar: function(e) {
        var self = this;
        self.setData({
            flag: e.currentTarget.dataset.flag
        })
    },

    // 获取列表数据
    getShopList: function(){
        var url = "https://locally.uieee.com/categories/" + this.data.catID + "/shops";
        var params = {
            _limit: this.data.pageSize,
            _page: this.data.pageIndex
        }
        util.fetch(url, params).then(res => {
            console.log(res);
            res.data.map(item => {
                item.star = this.score2Star(item.score)
            })
            // 总商铺数
            var totalShopNum = parseInt(res.header['X-Total-Count']);
            if(totalShopNum) {
                // 渲染新数据
                this.setData({
                    shopList: this.data.shopList.concat(res.data),
                    totalPage: Math.ceil(totalShopNum / this.data.pageSize)
                })
            }else{
                this.setData({ loading: 0 })
            }
        })



        // wx.request({
        //     url: "https://locally.uieee.com/categories/" + this.data.catID + "/shops",
        //     data: {
        //         _limit: this.data.pageSize,
        //         _page: this.data.pageIndex
        //     },
        //     success: (res) => {
        //         res.data.map(item => {
        //             item.star = this.score2Star(item.score)
        //         })
        //         // this.data.shopList.push(...res.data);
        //         // 总商铺数
        //         var totalShopNum = parseInt(res.header['X-Total-Count']);
        //         // 渲染新数据
        //         this.setData({
        //             shopList: this.data.shopList.concat(res.data),
        //             totalPage: Math.ceil(totalShopNum / this.data.pageSize)
        //         })
        //     }
        // })
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
        // 接收url传递过来的title并设置为页面标题
        if(options.title){
            wx.setNavigationBarTitle({
                title: options.title
            })
        }
        // 当前分类id
        this.data.catID = options.cat;
        this.getShopList();
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
        this.setData({
            pageIndex: 1, // 默认从第一页开始
            shopList: [], //商店列表
            totalPage: 0, // 总页数
            loading: 1
        })
        this.getShopList();
        // 下拉刷新手机上需要清除刷新效果
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.pageIndex++ < this.data.totalPage){
            this.getShopList();
        }else{
            // util.wxTips('没有更多数据了');
            this.setData({
                loading: 0
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})