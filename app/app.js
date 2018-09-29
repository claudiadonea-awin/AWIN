(function () {
  "use strict";

  angular
    .module('currencyApp', []);

  angular
    .module('currencyApp')
    .controller('currencyAppController', currencyAppController);

    function currencyAppController ($scope, $http) {
      var vm = this;
      vm.greeting = "Currency Converter";
      vm.changeCurrencyBase = changeCurrencyBase;
      vm.convertAmount = convertAmount;
      vm.amount = "";
      vm.data = {
        currencyList: [],
        base: {name: 'EUR'},
        target: {}
    };

    function getCurrencyData(){
      $http.get("https://api.exchangeratesapi.io/latest", {params: {base: vm.data.base.name}} ).then(function(res){
        vm.data.currencyList = [];
        for(let item in res.data.rates){
          vm.data.currencyList.push({
            name: item,
            value: res.data.rates[item]
          })
        }
        vm.data.currencyList.push(vm.data.base);
      })
    }

    getCurrencyData();

      function changeCurrencyBase() {
        getCurrencyData();
        vm.amount = "";
      }

      function convertAmount(amount, target){
        vm.amount = parseInt(amount) * target;
        return vm.amount;
      }

    }

}());
