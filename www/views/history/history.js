angular.module('App')
.controller('HistoryController', function ($scope, $http, $state, $stateParams, Currencies) {//创建控制器并注入服务,$stateParams中存有货币值
    $scope.history = {
        currency: $stateParams.currency || 'USD'//给history模型赋值一个下拉列表，默认是美元
    };

    $scope.currencies = Currencies;//把货币存储到作用域中

    $scope.changeCurrency = function () {//用来处理新货币被选择之后的状态变更
        $state.go('tabs.history', { currency: $scope.history.currency });
    };

    //chart声明的对象被Highcharts命令转换成图表
    $scope.chart = {                               
        options: {       
            chart: {
                type: 'line'
            },
            legend: {
                enabled: false
            }
        },
        title: {
            text: '历史信息'
        },
        yAxis: {
            title: null
        },
        xAxis: {
            type: 'datetime'
        },
        series: []
    };

    $http.get('https://api.bitcoinaverage.com/history/' + $scope.history.currency + '/per_hour_monthly_sliding_window.csv')//基于被选中的货币加载历史信息
    .success(function (prices) {
        prices = prices.split(/\n/);//把价格字符串分割成一个数组，每个元素都是一行价格
        //创建一个空坐标系数组
        var series = {//图表需要用到serie属性
            data: []
        };
        
        angular.forEach(prices, function (price, index) {
            price = price.split(',');//把妹一行用逗号分隔成数组
            var date = new Date(price[0].replace(' ', 'T')).getTime();//解析并格式化时间
            var value = parseFloat(price[3]);//解析并格式化价值

            //如果日期格式合法，吧这个点添加到坐标系数组中
            if (date && value > 0) {
                series.data.push([date, value]);
            };
        });
        $scope.chart.series.push(series);//把完整的坐标系数组添加到图标的数据中
    });

    //坚挺$ionicView.enter事件，在没有缓存的情况下重置货币模型
    $scope.$on('$ionicView.enter', function () {
        $scope.history = {
            currency: $stateParams.currency || 'USD'
        };
    });
});