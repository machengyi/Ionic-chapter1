angular.module('App', ['ionic','highcharts-ng'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('tabs', {
            url: '/tabs',
            abstract: true,
            templateUrl: 'views/tabs/tabs.html'
        })
        .state('tabs.rates', {
            url: '/rates',
            views: {
                'rates-tab': {
                    templateUrl: 'views/rates/rates.html',
                    controller: 'RatesController'
                }
            }
        })
        .state('tabs.history', {
            url: '/history?currency',
            views: {
                'history-tab': {
                    templateUrl: 'views/history/history.html',
                    controller: 'HistoryController'
                }
            }
        })
        .state('tabs.currencies', {
            url: '/currencies',
            views: {
                'currencies-tab': {
                    templateUrl: 'views/currencies/currencies.html',
                    controller: 'CurrenciesController'
                }
            }
        })
        .state('tabs.detail', {
            url: '/detail/:currency',
            views: {
                'rates-tab': {
                    templateUrl: 'views/detail/detail.html',
                    controller:'DetailController'
                }
            }
        })
        $urlRouterProvider.otherwise('/tabs/rates');
    })

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.factory('Currencies', function () {
    return [
        { code: 'AUD', text: 'Australian Dollar', selected: true },
        { code: 'BRL', text: 'Brazilian Real', selected: true },
        { code: 'CAD', text: 'CanaDan Dollar', selected: true },
        { code: 'EUR', text: 'Chiness Yuan', selected: true },
        { code: 'GBP', text: 'Euro Dollar', selected: true },
        { code: 'IDR', text: 'British Pound Sterling', selected: true },
        { code: 'ILS', text: 'Indonesian Rupiah', selected: true },
        { code: 'NOK', text: 'Polish Zloty', selected: true },
        { code: 'NZD', text: 'Romanian Leu', selected: false },
        { code: 'PLN', text: 'Polish Zloty', selected: true },
        { code: 'RON', text: 'Romanian Real', selected: true },
        { code: 'RUB', text: 'Russian Ruble', selected: true },
        { code: 'SEK', text: 'Swedish Krona', selected: true },
        { code: 'SGD', text: 'Singapore Dollar', selected: true },
        { code: 'USD', text: 'United States Dollar', selected: true },
        { code: 'ZAR', text: 'South African Rand', selected: true }
    ];
});
