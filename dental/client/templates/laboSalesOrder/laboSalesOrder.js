Dental.ListState = new ReactiveObj();
/*
 *Index
 */
Template.dental_laboSalesOrder.onCreated(function() {
  Meteor.subscribe('dental_laboCustomer');
  Meteor.subscribe('dental_staff');
  Meteor.subscribe('dental_laboItem');
  Meteor.subscribe('dental_laboAverageStock');
  Meteor.subscribe('dental_laboSalesOrderPayment');

  createNewAlertify(['laboSalesOrder', 'customerAddon', 'staffAddon', 'salesOrderPaymentAction','statusSaleOrderAction']);
});

Template.dental_statusSaleOrderLinkAction.helpers({
  statusTitle:function () {
    var status = "Active"
    if(this.status.readyDate){
      status = "Ready";
    }
    if(this.status.checkOutDate){
      status = "CheckOut";
    }
    if(this.status.closingDate){
      status = "Closed";
    }
    return status;
  }
});

Template.dental_laboSalesOrder.events({
  'click .insert': function() {
    alertify.laboSalesOrder(fa("plus", "Laboratory Sales Order"), renderTemplate(Template.dental_laboSalesOrderInsert))
      .maximize();
  },
  'click .update': function() {
    var data = this;
    if (checkLastLaboSalesOrder() == data._id && _.isNull(checkMaterialUsingByPurchase(data)) || _.isUndefined(checkMaterialUsingByPurchase(data))) {
      alertify.laboSalesOrder(fa("pencil", "Laboratory Sales Order"), renderTemplate(Template.dental_laboSalesOrderUpdate,
        data)).maximize();
    } else if (!_.isNull(checkMaterialUsingByPurchase(data)) || !_.isUndefined(checkMaterialUsingByPurchase(data))) {
      alertify.message("Material Items Exist On Purchase > " + checkMaterialUsingByPurchase(data));
    } else {
      alertify.message("You Can Update The Last Sale Order Only !");
    }
  },
  'click .remove': function() {
    var self = this;

    if (checkLastLaboSalesOrder() == self._id && _.isUndefined(checkMaterialUsingByPurchase(self))) {
      alertify.confirm(
        fa("remove", "Laboratory Sales Order"),
        "Are you sure to delete [" + self._id + "] ?",
        function(result) {
          Dental.Collection.LaboSalesOrder.remove(self._id, function(error) {
            if (error) {
              alertify.error(error.message);
            } else {
              alertify.success('Success');
            }
          });
        },
        null
      );
    } else if (!_.isUndefined(checkMaterialUsingByPurchase(self))) {
      alertify.message("Material Items Exist On Purchase > " + checkMaterialUsingByPurchase(self));
    } else {
      alertify.message("You Can Remove The Last Sale Order Only !");
    }
  },
  'click .show': function() {
    alertify.laboSalesOrder(fa("eye", "Laboratory Sales Order"), renderTemplate(Template.dental_laboSalesOrderShow,
      this));
  },
  'click .laboSalesOrderPrintAction': function() {
    var q = 'customer=' + this.customerId + '&saleOrder=' + this._id;
    var url = 'laboSalesOrderReportGen?' + q;
    window.open(url);
  },
  'click .statusSaleOrderAction': function(e) {
    var self = this;
    var status = $(e.currentTarget).val();
    // Close register
    if (status == "Active") {
      var data = Dental.Collection.LaboSalesOrder.findOne({
        _id: self._id
      });
      data.status = {readyDate : moment().format('YYYY-MM-DD HH:mm:ss')};

      alertify.statusSaleOrderAction(fa("repeat", "Sale Order Ready Date"),
        renderTemplate(Template.dental_saleOrderStatusReadyDate, data));

    }else if (status == "Ready") {
      var data = Dental.Collection.LaboSalesOrder.findOne({
        _id: self._id
      });
      data.status = {checkOutDate : moment().format('YYYY-MM-DD HH:mm:ss')};

      alertify.statusSaleOrderAction(fa("repeat", "Sale Order Check Out Date"),
        renderTemplate(Template.dental_saleOrderStatusCheckOutDate, data));

    }else {
      // Reactive Sale Order
      if (_.isUndefined(self._salesOrderPaymentCount) || self._salesOrderPaymentCount == 0) {
        alertify.confirm(
          fa("undo", "Register Active"),
          "Are you sure to reactive [" + self._id + "] ?",
          function(result) {
            Dental.Collection.LaboSalesOrder.update(self._id, {
              $set: {
                status:{activeDate:self.salesOrderDate,readyDate:"",checkOutDate:""}
              }
            });

          }, null);
      } else {
        alertify.error(
          'You can\'t reactive this, because it has been payment.');
      }
    }
  },
  'click .salesOrderPaymentAction': function(e, t) {
    Session.set('closePayment', false);
    var data = this;
    if (this.status.checkOutDate) {
      if (e.ctrlKey) {
        salesOrderState(this);

        Router.go('dental.laboSalesOrderPayment', {
          saleOrderId: this._id
        });
      } else {
        // Check last balance
        var paymentLast = Dental.Collection.LaboSalesOrderPayment.findOne({
          saleOrderId: data._id
        }, {
          sort: {
            _id: -1
          }
        });

        //get date time from system
        data.paymentDate = moment(Date()).format("YYYY-MM-DD HH:mm:ss");

        if (!_.isUndefined(paymentLast)) {
          data.total = paymentLast.balance;
        }
        alertify.salesOrderPaymentAction(
          fa("plus", "Payment"),
          renderTemplate(Template.dental_laboSaleOrderPaymentInsert, data)
        );
      }
    }
  }
});

/**
 * Insert
 */
Template.dental_laboSalesOrderInsert.onRendered(function() {
  datepicker();
  // $('.btnAdd').attr('disabled', "disabled");
  $('.status').val('Active');
});

Template.dental_laboSalesOrderInsert.events({
  'change .item': function(e, t) {

    var arr = [];
    $('.salesOrder .item').each(function() {
      var item = $(this).val();
      if (item != "") {
        arr.push(item);
      }
    });

    if (hasDuplicate(arr)) {
      alertify.error("Sorry , Duplicate Item !");
    } else {
      onChangeItem(e);
    }
  },
  'click .btnRemove': function(e, t) {
    var thisValueQuotation = $(e.currentTarget).closest('.salesOrder').find('.amount').val();
    thisValueQuotation = parseFloat(thisValueQuotation);

    // Cal footer
    calculateTotal(thisValueQuotation);
  },
  'keyup .qty,.discount, click .qty,.discount': function(e, t) {

    CalculateTotalAndAmount(e);
    // Cal footer
    calculateTotal();
  },
  'keyup #subDiscount, click #subDiscount': function(e, t) {
    // Cal footer
    calculateTotal();
  },
  'click #saveAndPrint': function() {
    Meteor.subscribe('dental_laboSalesOrder');
    Session.set('printInvoiceLaboSalesOrder', true);
  },
  'click .customerAddon': function() {
    alertify.customerAddon(fa("plus", "Laboratory Customer"), renderTemplate(Template.dental_laboCustomerInsert));
  },
  'click .staffAddon': function() {
    alertify.customerAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  }
});

/**
 * Update
 */
Template.dental_laboSalesOrderUpdate.onRendered(function() {
  datepicker();
  calculateTotal();
});

Template.dental_laboSalesOrderUpdate.helpers({});

Template.dental_laboSalesOrderUpdate.events({
  'change .item': function(e, t) {
    var arr = [];
    $('.salesOrder .item').each(function() {
      var item = $(this).val();
      if (item != "") {
        arr.push(item);
      }
    });

    if (hasDuplicate(arr)) {
      var thisObj = $(e.currentTarget);
      var price = thisObj.parents('div.array-item').find('.price').val('');
      var qty = thisObj.parents('div.array-item').find('.qty').val('');
      var qty = thisObj.parents('div.array-item').find('.discount').val('');
      var qty = thisObj.parents('div.array-item').find('.amount').val('');
      alertify.error("Sorry , Duplicate Item !");
    } else {
      onChangeItem(e);
    }
  },
  'click .btnRemove': function(e, t) {
    var thisValueQuotation = $(e.currentTarget).closest('.salesOrder').find('.amount').val();
    thisValueQuotation = parseFloat(thisValueQuotation);
    // var enable = true;
    // $('.amount').each(function () {
    //     var amount = $(this).val() == "" ? 0 : parseFloat($(this)
    //         .val());
    //     if (amount == 0) {
    //         enable = false;
    //         return false;
    //     }
    //     enable = true;
    // });
    //
    // if (enable) {
    //     $('.btnAdd').attr('disabled', false);
    // } else {
    //     $('.btnAdd').attr('disabled', true);
    //
    // }

    // Cal footer
    calculateTotal(thisValueQuotation);
  },
  'keyup .qty,.discount, click .qty,.discount': function(e, t) {

    CalculateTotalAndAmount(e);
    // Cal footer
    calculateTotal();
  },
  'keyup #subDiscount, click #subDiscount': function(e, t) {
    // Cal footer
    calculateTotal();
  },
  'click .customerAddon': function() {
    alertify.customerAddon(fa("plus", "Laboratory Customer"), renderTemplate(Template.dental_laboCustomerInsert));
  },
  'click .staffAddon': function() {
    alertify.customerAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  }
});

/**
 * Show
 */
Template.dental_laboSalesOrderShow.helpers({
  salesOrderDetailFormat: function() {
    var salesOrderDetail = "<ul>";
    var data = this.salesOrderDetail;
    data.forEach(function(obj) {
      salesOrderDetail +=
        "<li>" + 'Item Id: ' + obj.itemId + ' | Qty: ' +
        obj.qty + ' | Price : ' + obj.price + ' | Amount: ' + obj.amount +
        '</li>';
    });
    salesOrderDetail += "</ul>";

    return new Spacebars.SafeString(salesOrderDetail);
  },
  salesOrderDateFormat: function() {
    return moment(this.salesOrderDate).format("YYYY-MM-DD");
  }
});

Template.dental_saleOrderStatusReadyDate.onRendered(function () {
  datepicker();
});

Template.dental_saleOrderStatusCheckOutDate.onRendered(function () {
  datepicker();
});



/**
 * Hook
 */
AutoForm.hooks({
  dental_laboSalesOrderInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        doc.status = {
          activeDate: doc.salesOrderDate
        };
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
      $('select.item')[0].selectize.clear(true);

      var printSession = Session.get('printInvoiceLaboSalesOrder');
      Meteor.call('getLaboSalesOrderId', result, function(err, result) {
        var data = Dental.Collection.LaboSalesOrder.findOne(result);
        if (printSession) {
          var q = 'customer=' + data.customerId + '&saleOrder=' + data._id;
          var url = 'laboSalesOrderReportGen?' + q;
          window.open(url);
        }
        Session.set('printInvoiceLaboSalesOrder', false);
      });
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_saleOrderStatusReadyDate: {
      onSuccess: function (formType, result) {
          alertify.statusSaleOrderAction().close();
          alertify.success('Success');
      },
      onError: function (formType, error) {
          alertify.error(error.message);
      }
  },
  dental_saleOrderStatusCheckOutDate: {
      onSuccess: function (formType, result) {
          alertify.statusSaleOrderAction().close();
          alertify.success('Success');
      },
      onError: function (formType, error) {
          alertify.error(error.message);
      }
  },
  dental_laboSalesOrderUpdate: {
    before: {
      update: function(doc) {
        doc.$set.total = $('.total').val();
        return doc;
      }
    },
    onSuccess: function() {
      alertify.laboSalesOrder().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});


/**
 * Calculate total & Amount for disease item When keyUp & click
 */

function CalculateTotalAndAmount(e) {
  var thisObj = $(e.currentTarget);
  var qty = thisObj.parents('div.array-item').find('.qty').val();
  var price = thisObj.parents('div.array-item').find('.price').val();
  var discount = thisObj.parents('div.array-item').find('.discount').val();
  var amount = math.round(qty * price, 2);
  var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);

  thisObj.parents('div.array-item').find('.amount').val(amountAfterDiscount);

  // if (qty > 0 && (discount >= 0 && discount <= 100)) {
  //     $('.btnAdd').removeAttr('disabled');
  // } else {
  //     $('.btnAdd').attr('disabled', "disabled");
  // }
}

/**
 * Calculate all amount to total
 */
function calculateTotal(minusValueSalesOrder) {
  minusValueSalesOrder = minusValueSalesOrder == null ? 0 : minusValueSalesOrder;
  minusValueSalesOrder = math.round(minusValueSalesOrder, 2);
  // Cal subtotal by items amount
  var subtotal = 0;
  $('.salesOrder .amount').each(function() {
    var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
    subtotal += amount;
  });

  subtotal = subtotal - minusValueSalesOrder;
  // Set value on subtotal textbox
  $('[name="subTotal"]').val(subtotal);

  // Cal total after deposit and sub discount
  var deposit = _.isEmpty($('[name="deposit"]').val()) ? 0 : parseFloat($(
    '[name="deposit"]').val());
  var subDiscount = _.isEmpty($('#subDiscount').val()) ? 0 : parseFloat($(
    '#subDiscount').val());

  var total = math.round((subtotal - deposit) - subDiscount, 2);

  // Set value on total
  $('.total').val(total);
}

/*
 * Config date picker
 */
var datepicker = function() {
  var salesOrderDate = $('[name="salesOrderDate"]');
  var readyDate = $('.readyDate');
  var checkOutDate = $('.checkOutDate');
  DateTimePicker.dateTime(salesOrderDate);
  DateTimePicker.dateTime(readyDate);
  DateTimePicker.dateTime(checkOutDate);
};

/**
 * Register state
 */
var salesOrderState = function(param) {
  var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({
    _id: param._id
  });

  // Set state
  Dental.ListState.set('data', salesOrderDoc);
};

/*
 * check last labo SalesOrder
 */
var checkLastLaboSalesOrder = function() {
  var getLastSalesOrder = Dental.Collection.LaboSalesOrder.findOne({}, {
    sort: {
      salesOrderDate: -1
    }
  });

  return getLastSalesOrder._id;
}

/*
 * check material have purchase
 */
var checkMaterialUsingByPurchase = function(data) {
  var getAvgStockDoc = Dental.Collection.LaboAverageStock.findOne({
    saleOrderId: data._id
  });
  var checkPurchaseHaveLastSaleOrder = Dental.Collection.LaboAverageStock.findOne({
    lastSaleOrderId: data._id
  });

  if (!_.isUndefined(getAvgStockDoc) && !_.isUndefined(checkPurchaseHaveLastSaleOrder)) {
    var result = getAvgStockDoc.lastPurchaseId;
    if (_.isNull(getAvgStockDoc.lastPurchaseId)) {
      result = checkPurchaseHaveLastSaleOrder.purchaseId;
    }
  }

  return result;
}

/**
 * onChange material
 */
function onChangeItem(e) {
  var thisObj = $(e.currentTarget);
  var itemId = $(e.currentTarget).val();
  var qty, price, discount, amount;

  if (itemId != "") {
    var itemDoc = Dental.Collection.LaboItem.findOne({
      _id: itemId
    });

    qty = 1;
    price = math.round(itemDoc.price, 2);
    discount = 0;
    amount = math.round(qty * price, 2);
  }

  thisObj.parents('div.array-item').find('.qty').val(qty);
  thisObj.parents('div.array-item').find('.price').val(price);
  thisObj.parents('div.array-item').find('.discount').val(discount);
  thisObj.parents('div.array-item').find('.amount').val(amount);

  // Cal footer
  calculateTotal();
}

// check array item duplicate
function hasDuplicate(arr) {
  return (arr.length != _.uniq(arr).length);
}
