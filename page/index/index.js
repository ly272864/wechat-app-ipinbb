Page({
  data: {
    fixed: "",
    tabIndex: "-1",
    pageIndex: "",
    ft: "Home",
    nextPage: "",
    hidden: true,
    bannerUrls: [
      'http://service.ipinbb.com:8080/ImageService/GetImage?imageName=750--300__group1__$$M00$$00$$35$$CgqAy1gARE6ATVW_AATVFxSqnd0643.png',
      'http://service.ipinbb.com:8080/ImageService/GetImage?imageName=750--300__group1__$$M00$$00$$35$$CgoSrFgARF-AVp1FAAVmt1Ye8gk871.png',
      'http://service.ipinbb.com:8080/ImageService/GetImage?imageName=750--300__group1__$$M00$$00$$35$$CgqAy1gARIyAadf0AAUPDtnD8xU586.png'
    ],
    bannerConfig: {
      mode: "aspectFit",
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
    },
    activityUrls: [
      'http://m.ipinbb.com/ipbb/static/images/home-01.png',
      "http://m.ipinbb.com/ipbb/static/images/home-02.png",
      "http://m.ipinbb.com/ipbb/static/images/home-03.png",
      "http://m.ipinbb.com/ipbb/static/images/home-04.png"
    ],
    navItems: [{
      text: "最新",
      className: "navigator-hover",
      url: ""
    },{
      text: "全网折上折",
      className: "",
      url: ""
    },{
      text: "儿童玩具",
      className: "",
      url: ""
    },{
      text: "运动修身",
      className: "",
      url: ""
    },{
      text: "学习用品",
      className: "",
      url: ""
    },{
      text: "童装童鞋",
      className: "",
      url: ""
    },{
      text: "孕童用品",
      className: "",
      url: ""
    },{
      text: "孕童用品",
      className: "",
      url: ""
    }],
    list: []
  },
  // 首次加载
  onLoad: function(e) {
    var self = this;
    wx.request({
      url: 'http://m.ipinbb.com/ipbb/home/load?ti=-1&ft=Home',
      header: {
          'goods_promote_info-Type': 'application/json'
      },
      success: function(res) {

        var nextPage = JSON.stringify(res.data.nextPage),
            resData = res.data.lst;

        self.dataRead(resData);
        self.setData({
          hidden: true, 
          pageIndex: 1,
          nextPage: nextPage,
          list: self.data.list
        });
      }
    })
  },

  scroolTop: function(e) {
    
    // console.log(e);
    // console.log(e.detail.scrollTop);

    if(e.detail.scrollTop >= 321) {
      this.setData({
        fixed: "fixed"
      })
    } else {
      this.setData({
        fixed: ""
      })
    }
  },

  loadingChange: function () {
    this.setData({
      hidden: true
    });
  },
  
  // 下拉加载;
  downLoad: function(e) {
    // console.log("scroll bottom!!!")
    var self = this,
        nextPage = self.data.nextPage,
        ft = self.data.ft,
        tabIndex = self.data.tabIndex,
        pageIndex = self.data.pageIndex;
        
    self.setData({
      hidden: false
    });
    wx.request({
      url: 'http://m.ipinbb.com/ipbb/home/load',
      data : {
        nextPage : nextPage,
        ft : ft,
        ti : tabIndex,
        page : pageIndex
      },
      header: {
          'goods_promote_info-Type': 'application/json'
      },
      success: function(res) {
        
        var resData = res.data.lst,
            nextPage = JSON.stringify(res.data.nextPage);

        self.dataRead(resData);
        self.setData({
          hidden: true,
          pageIndex: pageIndex + 1,
          nextPage: nextPage,
          list: self.data.list
        });
      }
    });
  },

  // 数据提取;
  dataRead: function(data) {
    var self = this;
    data.forEach(function(item){
      var itemObj = {};
      itemObj.goods_id = item.goods_id;
      itemObj.goods_img = item.goods_img;
      itemObj.goods_title = item.goods_title;
      itemObj.goods_group_size = item.goods_group_size;
      itemObj.goods_group_price = item.goods_group_price;
      itemObj.goods_promote_info = item.goods_promote_info;

      self.data.list.push(itemObj);
    });
  }
})