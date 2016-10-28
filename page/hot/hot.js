Page({
    data: {
        hidden: true,           // loading动画是否显示
        tipShow: false,         // 判断是否还有更多数据
        page: 1,               // 当前分页
        nextPage: "",           // 分页信息
        us: "",                 // 用户分享的ID，之前为了做分享统计什么的，现在没卵用
        lists: []
    },

    onLoad: function(e) {
        var listArr = [],
            self = this,
            page = self.data.page,
            nextpage = self.data.nextpage,
            us = self.data.us;
        
        // 显示加载动画;
        self.setData({
             hidden: false,
        });

        // 发送请求
        wx.request({
            url: "http://service.ipinbb.com:8080/dispatcherService/getAttendGroupList",
            data: {
                page: page,
                nextpage: nextpage,
                us: us
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res){

               var nextpage = res.data.nextPage;

                console.log(res);
                // 关闭加载动画并将请求回来的数据添加到data中
                self.setData({
                    hidden: true,
                    page: page + 1,
                    nextpage: nextpage,
                    lists: self.dataRead(res.data.lst)
                })
            },
            file: function(e){
                console.log("网络错误!!");
            }
        });
    },

    // 上拉加载跟多数据
    loadList: function(e) {
        var listArr = [],
            self = this;

        // 判断是否存在更多数据
        if(!self.tipShow) {
            // 显示加载动画;
            self.setData({
                hidden: false,
            });

            var page = Number(self.data.page);
            console.log(page);
            
            // 发送请求
            wx.request({
                url: "http://service.ipinbb.com:8080/dispatcherService/getAttendGroupList",
                data: {
                    page: page,
                    nextpage: self.data.nextpage,
                    us: self.data.us
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res){

                    
                    var nextpage = JSON.stringify(res.data.nextPage);

                    if(res.data != null) {
                        // 将请求回来的数据添加到data中
                        self.setData({
                            hidden: true,
                            page: page + 1,
                            nextpage: nextpage,
                            lists: self.data.lists.concat(self.dataRead(res.data.lst))
                        })
                    } else {
                        self.setData({
                            hidden: true,
                            tipShow: true
                        });
                    }
                },
                file: function(e){
                    console.log("网络错误!!");
                }
            });
        }
    },

    // 对数据进行提取
    dataRead: function(data) {
        // 用于存放提取后的数据
        var dataArr = [];

        data.forEach(function(item) {
            // 用于存放单条团数据
            var groupData = {};

            groupData.groupId = item.groupId;
            groupData.goodsImg = item.goodsImg;
            groupData.goodsTitle = item.goodsTitle;
            groupData.groupSize = item.groupSize;
            groupData.groupPrice = item.groupViewPrice;
            groupData.lessNum = item.lessNum;
            groupData.groupEndTime = item.restTime;
            groupData.userLst = item.userLst;

            dataArr.push(groupData);
        });

        return dataArr;
    }
})