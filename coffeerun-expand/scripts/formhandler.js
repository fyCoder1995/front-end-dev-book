(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function(event) {
        event.preventDefault();

        var data = {};
        $(this).serializeArray().forEach(function(item) {
          data[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
        console.log(data);

        if(data.size === "godzilla" && data.strength === "100"){
          $('#myModal').modal('show');
          $('#rightAddress').val(data['emailAddress']);
          $("#add_customize").click(function(){
            if($('#rightAddress').val() === ""){
              alert('Enter your email address');
            }else {
              $('#myModal').modal('hide');
            }
          });
        }
        fn(data);
        this.reset();
        this.elements[0].focus();
        $("#range-number").hide();
      });

      this.$formElement.on('reset',function() {
        $("#range-number").hide();
      })
    };

    FormHandler.prototype.addInputHandler = function(fn){
      console.log('Setting input handler for form');
      this.$formElement.on('input','[name="emailAddress"]',function(event){
        var emailAddress = event.target.value;
        var message = '';
        if(fn(emailAddress)){
          $(event.target).setCustomValidity('');
        }else {
          message = emailAddress + 'is not an authorized email address';
          $(event.target).setCustomValidity(message);
        }
        console.log(message);
      });
    };

    //当滑块滑动时显示其数值，并改变颜色
    FormHandler.prototype.changeRangeHandler = function(fn) {
      console.log('Change range handler for form');
      var colors = "";
      this.$formElement.on('input','[name="strength"]',function(event) {
        $("#range-number").show();
        var orderStr = $('[name="coffee"]').val();
        var rangNumber = event.target.value;
        var message = '';
        if(fn(orderStr,rangNumber)){
          $(event.target).setCustomValidity('');
        }else {
          message = orderStr + ' do not have [decaf] and ' + rangNumber + ' is not less than [20]';
          $(event.target).setCustomValidity(message);
          console.log(message);
        }

        $("#range-number").html("&nbsp;&nbsp;&nbsp;" + rangNumber);
        if (rangNumber <= 33) {
          colors = "green";
        } else if (33 < rangNumber && rangNumber <= 66) {
          colors = 'yellow';
        } else {
          colors = "red";
        }

        $("#range-number").css("color", colors);


      });
    };

  }
  App.FormHandler = FormHandler;
  window.App = App;

})(window);
