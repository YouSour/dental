Dental.ListState = new ReactiveObj();
/*
 *Index
 */
Template.dental_laboPurchase.onCreated(function() {
  Meteor.subscribe('dental_laboSupplier');
  Meteor.subscribe('dental_staff');
  Meteor.subscribe('dental_laboMaterial');
  Meteor.subscribe('dental_laboAverageStock');

  createNewAlertify(['laboPurchase', 'supplierAddon', 'staffAddon']);
});

Template.dental_laboPurchase.helpers({});

Template.dental_laboPurchase.events({
  'click .insert': function() {
    alertify.laboPurchase(fa("plus", "Laboratory Purchase"), renderTemplate(Template.dental_laboPurchaseInsert))
      .maximize();
  },
  'click .update': function() {
    var data = this;
    if(checkLastLaboPurchase() == data._id  && _.isNull(checkMaterialUsingBySalesOrder(data))){
      alertify.laboPurchase(fa("pencil", "Laboratory Purchase"), renderTemplate(Template.dental_laboPurchaseUpdate,
        data)).maximize();
    }else if(!_.isNull(checkMaterialUsingBySalesOrder(data))) {
    alertify.message("Material Exist On Sale Order > " + checkMaterialUsingBySalesOrder(data));
    }else {
      alertify.message("You Can Update The Last Purchase Only !");
    }
  },
  'click .remove': function() {
    var self = this;

    if(checkLastLaboPurchase() == self._id && _.isNull(checkMaterialUsingBySalesOrder(self))){
    alertify.confirm(
      fa("remove", "Laboratory Purchase"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.LaboPurchase.remove(self._id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success('Success');
          }
        });
      },
      null
    );
    }else if(!_.isNull(checkMaterialUsingBySalesOrder(self))) {
    alertify.message("Material Exist On Sale Order > " + checkMaterialUsingBySalesOrder(self));
    }else{
    alertify.message("You Can Remove The Last Purchase Only !");
    }
  },
  'click .show': function() {
    alertify.laboPurchase(fa("eye", "Laboratory Purchase"), renderTemplate(Template.dental_laboPurchaseShow,
      this));
  },
  'click .laboPurchasePrintAction': function() {
    var q = 'supplier=' + this.supplierId + '&purchase=' + this._id;
    var url = 'laboPurchaseReportGen?' + q;
    window.open(url);
  }
});

/**
 * Insert
 */
Template.dental_laboPurchaseInsert.onRendered(function() {
  datepicker();
  // $('.btnAdd').attr('disabled', "disabled");
  $('.type').val('In');
});

Template.dental_laboPurchaseInsert.events({
  'click .supplierAddon': function() {
    alertify.supplierAddon(fa("plus", "Laboratory Supplier"), renderTemplate(
      Template.dental_laboSupplierInsert));
  },
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(
      Template.dental_staffInsert)).maximize();
  },
  'change .materialId': function(e) {
    onChangeMaterialId(e);
  },
  'click .btnRemove': function(e) {
    var thisValuePurchase = $(e.currentTarget).closest('.purchase').find('.amount').val();
    thisValuePurchase = parseFloat(thisValuePurchase);
    calculateTotal(thisValuePurchase);
  },
  // 'click .btnAdd': function(e) {
  //
  //   var materialId = $(e.currentTarget).val();
  //
  //   if (materialId != "") {
  //     $('.btnAdd').removeAttr('disabled');
  //   } else {
  //     $('.btnAdd').attr('disabled', "disabled");
  //
  //   }
  // },
  'keyup .price ,.qty , click .price ,.qty ': function(e) {
    checkEventKeyupAndClick(e);
  },
  'click #saveAndPrint': function() {
    Meteor.subscribe('dental_laboPurchase');
    Session.set('printInvoiceLaboPurchase', true);
  }
});

/**
 * Update
 */
Template.dental_laboPurchaseUpdate.onRendered(function() {
  datepicker();
  calculateTotal();
});

Template.dental_laboPurchaseUpdate.helpers({});

Template.dental_laboPurchaseUpdate.events({
  'click .supplierAddon': function() {
    alertify.supplierAddon(fa("plus", "Supplier"), renderTemplate(
      Template.dental_supplierInsert));
  },
  'click .registerAddon': function() {
    alertify.registerAddon(fa("plus", "Register"), renderTemplate(
      Template.dental_registerInsert)).maximize();
  },
  'change .materialId': function(e) {
    onChangeMaterialId(e);
  },
  'click .btnRemove': function(e) {
    var thisValuePurchase = $(e.currentTarget).closest('.purchase').find('.amount').val();
    thisValuePurchase = parseFloat(thisValuePurchase);
    calculateTotal(thisValuePurchase);
  },
  // 'click .btnAdd': function(e) {
  //   var materialId = $(e.currentTarget).val();
  //
  //   if (materialId != "") {
  //     $('.btnAdd').removeAttr('disabled');
  //   } else {
  //     $('.btnAdd').attr('disabled', "disabled");
  //   }
  // },
  'keyup .price ,.qty , click .price ,.qty ': function(e) {
    checkEventKeyupAndClick(e);
  }

});

/**
 * Show
 */
Template.dental_laboPurchaseShow.helpers({
  purchaseDetailFormat: function() {
    var purchaseDetail = "<ul>";
    var data = this.purchaseDetail;
    data.forEach(function(obj) {
      purchaseDetail +=
        "<li>" + 'Material Id: ' + obj.materialId + ' | Qty: ' +
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
  dental_laboPurchaseInsert: {
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
      $('select.materialId')[0].selectize.clear(true);

      var printSession = Session.get('printInvoiceLaboPurchase');
      Meteor.call('getLaboPurchaseId', result, function(err, result) {
        var data = Dental.Collection.LaboPurchase.findOne(result);
        if (printSession) {
          var q = 'supplier=' + data.supplierId + '&purchase=' + data._id;
          var url = 'laboPurchaseReportGen?' + q;
          window.open(url);
        }
        Session.set('printInvoiceLaboPurchase', false);
      });
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_laboPurchaseUpdate: {
    before: {
      update: function(doc) {
        doc.$set.total = $('.total').val();
        return doc;
      }
    },
    onSuccess: function() {
      alertify.laboPurchase().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});

/**
 * onChange materialId
 */
function onChangeMaterialId(e) {
  var thisObj = $(e.currentTarget);
  var materialId = $(e.currentTarget).val();

  var qty, price, amount;

  if (materialId != "" && price != 0 && qty != 0) {
    var matrailDoc = Dental.Collection.LaboMaterial.findOne({
      _id: materialId
    });

    qty = 1;
    price = math.round(matrailDoc.price, 2);
    amount = math.round(qty * price, 2);

    // $('.btnAdd').attr('disabled', false);
  }
  // else {
  //   $('.btnAdd').attr('disabled', true);
  // }

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


  // if (price != 0 && qty != 0) {
  //   $('.btnAdd').removeAttr('disabled');
  // } else {
  //   $('.btnAdd').attr('disabled', "disabled");
  // }
}

/**
 * Calculate all amount to total
 */
function calculateTotal(minusValuePurchase) {
  minusValuePurchase = minusValuePurchase == null ? 0 : minusValuePurchase;
  minusValuePurchase = math.round(minusValuePurchase, 2);
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

/*
 * check last labo purchase
 */
var checkLastLaboPurchase = function() {
  var getLastPurchase = Dental.Collection.LaboPurchase.findOne({
  }, {
    sort: {
      purchaseDate: -1
    }
  });

  return getLastPurchase._id;
}

/*
 * check material using by sales order
 */
var checkMaterialUsingBySalesOrder = function(data) {

  var getAvgStockDoc = Dental.Collection.LaboAverageStock.findOne({purchaseId:data._id});
  var checkPurchaseHaveLastSaleOrder = Dental.Collection.LaboAverageStock.findOne({lastPurchaseId:data._id});
  var result = getAvgStockDoc.lastSaleOrderId ;

  if(_.isNull(getAvgStockDoc.lastSaleOrderId) && !_.isUndefined(checkPurchaseHaveLastSaleOrder)){
    result = checkPurchaseHaveLastSaleOrder.saleOrderId;
  }

  return result;
}
