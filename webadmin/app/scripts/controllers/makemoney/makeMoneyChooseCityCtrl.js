/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
(function () {
  'use strict';
  angular.module('webApp').controller('makeMoneyChooseCityCtrl', makeMoneyChooseCityCtrl);
  function makeMoneyChooseCityCtrl($scope, HOST,commonServ,$rootScope,$timeout,$location) {
    $scope.isSearch = false;
    $scope.cityList = {};
    $scope.regionList = [];
    var type=$location.search().type;
    $scope.chooseCity = function (cityname) {
      window.location.href = 'makemoney/makemoney?city=' + cityname;
    };
    commonServ.post({
      url: HOST + '/house/house-city',
      success: function(data) {
        $scope.cityList = data.errmsg.data;
        $scope.cityList.forEach(function (val) {
              var a = val.indexcity;
              a.forEach(function (vle) {
                if(vle.is_hot == 1){
                  $scope.regionList.push(vle);
                }
              })
        });
        $scope.isLoading = {
          display: "none"
        };
        if(data.errcode == 0) {
          $(".elastic-layer").show();
        }
      },
      error: function(data) {
        $scope.isLoading = {
          display: "none"
        };
        wsh.successText(data.errmsg, false, $rootScope, $timeout);
      }
    });
  }
  makeMoneyChooseCityCtrl.$inject = ['$scope', 'HOST','commonServ','$rootScope','$timeout','$location'];
})();


