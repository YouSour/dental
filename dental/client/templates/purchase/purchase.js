Dental.ListState = new ReactiveObj();
/*
 *Index
 */
 Template.dental_purchase.onCreated(function() {
  Meteor.subscribe('dental_supplier');
  Meteor.subscribe('dental_register');
  Meteor.subscribe('dental_orderItem');
  createNewAlertify(['purchase', 'supplierAddon', 'registerAddon']);
});

Template.dental_purchase.helpers({});

Template.dental_purchase.events({
  'click .insert': function() {
    alertify.purchase(fa("plus", "Purchase"), renderTemplate(Template.dental_purchaseInsert))
      .maximize();
  },
  'click .update': function() {
    var data = this;
    alertify.purchase(fa("pencil", "Purchase"), renderTemplate(Template.dental_purchaseUpdate,
      data)).maximize();
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Purchase"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.Purchase.remove(self._id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success('Success');
          }
        });
      },
      null
    );
  },
  'click .show': function() {
    alertify.alert(fa("eye", "Purchase"), renderTemplate(Template.dental_purchaseShow,
      this));
  },
  'click .purchasePrintAction': function() {
    var q = 'supplier=' + this.supplierId + '&purchase=' + this._id;
    var url = 'purchaseReportGen?' + q;
    window.open(url);
  }
});

/**
 * Insert
 */
Template.dental_purchaseInsert.onRendered(function() {
  datepicker();
  $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_purchaseInsert.helpers({});

Template.dental_purchaseInsert.events({
  'click .supplierAddon': function() {
    alertify.supplierAddon(fa("plus", "Supplier"), renderTemplate(
      Template.dental_supplierInsert));
  },
  'click .registerAddon': function() {
    alertify.registerAddon(fa("plus", "Register"), renderTemplate(
      Template.dental_registerInsert)).maximize();
  },
  'change .orderItemId': function(e) {
    onChangeOrderItemId(e);
  },
  'click .btnRemove': function(e) {
    var thisValuePurchase= $(e.currentTarget).closest('.purchase').find('.amount').val();
    thisValuePurchase=parseFloat(thisValuePurchase);
      var enable = true;
      $('.amount').each(function() {
        var amount = $(this).val() == "" ? 0 : parseFloat($(this)
          .val());
        if (amount == 0) {
          enable = false;
          return false;
        }
        enable = true;
      });

      if (enable) {
        $('.btnAdd').attr('disabled', false);
      } else {
        $('.btnAdd').attr('disabled', true);

      }

      calculateTotal(thisValuePurchase);
  },
  'click .btnAdd': function(e) {

    var orderItemId = $(e.currentTarget).val();

    if (orderItemId != "") {
      $('.btnAdd').removeAttr('disabled');
    } else {
      $('.btnAdd').attr('disabled', "disabled");

    }
  },
  'keyup .price ,.qty , click .price ,.qty ': function(e) {
    checkEventKeyupAndClick(e);
  },
  'click #saveAndPrint': function() {
    Meteor.subscribe('dental_purchase');
    Session.set('printInvoicePurchase', true);
  }
});

/**
 * Update
 */
Template.dental_purchaseUpdate.onRendered(function() {
  datepicker();
  calculateTotal();
});

Template.dental_purchaseUpdate.helpers({});

Template.dental_purchaseUpdate.events({
  'click .supplierAddon': function() {
    alertify.supplierAddon(fa("plus", "Supplier"), renderTemplate(
      Template.dental_supplierInsert));
  },
  'click .registerAddon': function() {
    alertify.registerAddon(fa("plus", "Register"), renderTemplate(
      Template.dental_registerInsert)).maximize();
  },
  'change .orderItemId': function(e) {
    onChangeOrderItemId(e);
  },
  'click .btnRemove': function(e) {
    var thisValuePurchase= $(e.currentTarget).closest('.purchase').find('.amount').val();
    thisValuePurchase=parseFloat(thisValuePurchase);
      var enable = true;
      $('.amount').each(function() {
        var amount = $(this).val() == "" ? 0 : parseFloat($(this)
          .val());
        if (amount == 0) {
          enable = false;
          return false;
        }
        enable = true;
      });

      if (enable) {
        $('.btnAdd').attr('disabled', false);
      } else {
        $('.btnAdd').attr('disabled', true);
      }

      calculateTotal(thisValuePurchase);
  },
  'click .btnAdd': function(e) {
    var orderItemId = $(e.currentTarget).val();

    if (orderItemId != "") {
      $('.btnAdd').removeAttr('disabled');
    } else {
      $('.btnAdd').attr('disabled', "disabled");
    }
  },
  'keyup .price ,.qty , click .price ,.qty ': function(e) {
    checkEventKeyupAndClick(e);
  }

});

/**
 * Show
 */
Template.dental_purchaseShow.helpers({
  purchaseDetailFormat: function() {
    var purchaseDetail = "<ul>";
    var data = this.items;
    data.forEach(function(obj) {
      purchaseDetail +=
        "<li>" + 'OrderItem Id: ' + obj.orderItemId + ' | Qty: ' +
        obj.qty + ' | Price : ' + obj.price + ' | Amount: ' + obj.amount +
        '</li>';
    });
    purchaseDetail += "</ul>";

    return new Spacebars.SafeString(purchaseDetail);
  },
  purchaseDateFormat: function() {
    return moment(this.purchaseDate).format("YYYY-MM-DD");
  }
});
/**
 * Hook
 */
AutoForm.hooks({
  dental_purchaseInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        doc.total = $('.total').val();
        var prefix = doc.branchId + '-';
        Meteor.call('dental', prefix);
        return doc;
      }
    },
    onSuccess: function(formType, result) {

      //clear select2
      $('select').each(function() {
        $(this).select2("val", "");
      });
      //clear selectize
      // $('select.orderItemId')[0].selectize.clear(true);

        var printSession = Session.get('printInvoicePurchase');
      Meteor.call('getPurchaseId', result, function (err, result) {
        var data = Dental.Collection.Purchase.findOne(result);
        if (printSession) {
        var q = 'supplier=' + data.supplierId + '&purchase=' + data._id;
        var url = 'purchaseReportGen?' + q;
        window.open(url);
        }
        Session.set('printInvoicePurchase', false);
      });
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_purchaseUpdate: {
    before:{
      update:function (doc) {
        doc.$set.total = $('.total').val();
        return doc;
      }
    },
    onSuccess: function() {
      alertify.purchase().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});

/**
 * onChange orderItemId
 */
function onChangeOrderItemId(e) {
  var thisObj = $(e.currentTarget);
  var orderItemId = $(e.currentTarget).val();
  var qty, price, amount;

  if (orderItemId != "" && price != 0 && qty != 0) {
    var orderItemDoc = Dental.Collection.OrderItem.findOne({
      _id: orderItemId
    });

    qty = 1;
    price = math.round(orderItemDoc.price, 2);
    amount = math.round(qty * price, 2);

    $('.btnAdd').attr('disabled', false);
  } else {
    $('.btnAdd').attr('disabled', true);
  }

  thisObj.parents('div.array-item').find('.qty').val(qty);
  thisObj.parents('div.array-item').find('.price').val(price);
  thisObj.parents('div.array-item').find('.amount').val(amount);

  calculateTotal();
}

/**
 *
 */

function checkEventKeyupAndClick(e) {
  var thisObj = $(e.currentTarget);
  var price = thisObj.parents('div.array-item').find('.price').val();
  var qty = thisObj.parents('div.array-item').find('.qty').val();
  var amount = price * qty;
  thisObj.parents('div.array-item').find('.amount').val(amount);
  calculateTotal();


  if (price != 0 && qty != 0) {
    $('.btnAdd').removeAttr('disabled');
  } else {
    $('.btnAdd').attr('disabled', "disabled");
  }
}

/**
 * Calculate all amount to total
 */
function calculateTotal(minusValuePurchase) {
  minusValuePurchase=minusValuePurchase==null?0:minusValuePurchase;
  minusValuePurchase=math.round(minusValuePurchase, 2);
  var total = 0;
  $('.purchase .amount').each(function() {
    var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
    total += amount;
  });
  total = total - minusValuePurchase;
  $('.total').val(total);

  var decimal_places = 2;
  var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;

  $('.totalAmount')
    .animateNumber({
        number: total * decimal_factor,

        numberStep: function(now, tween) {
          var floored_number = Math.floor(now) / decimal_factor,
            target = $(tween.elem);

          if (decimal_places > 0) {
            // force decimal places even if they are 0
            floored_number = floored_number.toFixed(decimal_places);

            // replace '.' separator with ','
            floored_number = floored_number.toString().replace('.', ',');
          }

          target.text('$' + floored_number);
        }
      },
      100
    );
}

/*
 * Config date picker
 */

var datepicker = function() {
  var purchaseDate = $('[name="purchaseDate"]');
  DateTimePicker.dateTime(purchaseDate);
};
