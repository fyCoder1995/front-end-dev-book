(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    var timer = null;
    this.$element.on('dblclick', 'input', function(event) {
      clearTimeout(timer);
    });

    this.$element.on('click', 'input', function(event) {
      clearTimeout(timer);
      var email = event.target.value;
      timer = setTimeout(function() {
        this.removeRow(email);
      }.bind(this), 1500);
      fn(email);
    }.bind(this));


  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    // 移除匹配相应邮箱地址的已有行
    this.removeRow(coffeeOrder.emailAddress);
    // 使用咖啡订单创建一个新的Row实例
    var rowElement = new Row(coffeeOrder);

    // 把新的Row实例的$element属性添加到清单中
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {
    var rowColor = 'lightpink';
    switch (coffeeOrder.flavor) {
      case 'caramel':
        rowColor = 'darkorange';
        break;
      case 'almond':
        rowColor = 'yellowgreen';
        break;
      case 'expression':
        rowColor = 'bisque';
        break;
      default:
        break;
    }
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox',
      'style': 'background:' + rowColor
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = '[' + coffeeOrder.strength + 'x] ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ') ';
    description += coffeeOrder.size + ' ';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
