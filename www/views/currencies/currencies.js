angular.module('App')
.controller('CurrenciesController', function ($scope, Currencies) {
    $scope.currencies = Currencies;//把货币类型关联到作用域

    //声明默认的reordering状态
    $scope.state = {
        reordering: false
    };

    //监听状态变化，在离开选项卡的时候退出重排状态
    $scope.$on('$stateChangeStart', function () {
        $scope.state.reordering = false;
    })

    //处理元素移动，移动元素在列表中的位置
    $scope.move = function (currency, fromIndex, toIndex) {
        $scope.currencies.splice(fromIndex, 1);
        $scope.currencies.splice(toIndex, 0, currency);
    }
});