'use strict';

var app = angular.module('demo', ['ngSanitize', 'cropular']);

app.controller('DemoCtrl', function($scope, $http, $timeout, $interval) {
    
    var ctrl = this;
    ctrl.url = "http://api.goreport:8081/image/1602/13/614/29/5D88253B-BAEE-521D-9735-3B6DE53A065C.jpg/800";
});
