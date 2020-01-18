(function(window){
  'use strict';
  var App = window.App || {};

  var Validation = {
      isCompanyEmail: function(email){
        return /.+@bignerdranch\.com$/.test(email);
      },
      isStringAndNumber: function(str,num){
        if(num > 20){
          return /^((?!decaf)[a-zA-Z])*$/.test(str);
        }else {
          return false;
        }
      }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
