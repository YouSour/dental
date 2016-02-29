/*
 *Index
 */
 Template.dental_materialCost.onCreated(function() {
   Meteor.subscribe('dental_doctor');
   Meteor.subscribe('dental_materialCostItem');
  createNewAlertify(['materialCost', 'doctorAddon']);
});


Template.dental_materialCost.helpers({});

Template.dental_materialCost.events({
  'click .insert': function() {
    alertify.materialCost(fa("plus", "Material Cost"), renderTemplate(
      Template.dental_materialCostInsert)).maximize();
  },
  'click .update': function() {
    var data = this;
    alertify.materialCost(fa("pencil", "Material Cost"), renderTemplate(
      Template.dental_materialCostUpdate, data)).maximize();
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Material cost"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.MaterialCost.remove(self._id, function(error) {
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
    alertify.alert(fa("eye", "Material Cost"), renderTemplate(Template.dental_materialCostShow,
      this));
  },
  'click .materialCostPrintAction': function() {
    var q = 'doctor=' + this.doctorId + '&materialCost=' + this._id;
    var url = 'materialCostReportGen?' + q;
    window.open(url);
  }
});

/**
 * Insert
 */
Template.dental_materialCostInsert.onRendered(function() {
  datepicker();
  $('.btnAdd').attr('disabled', "disabled");
});

Template.dental_materialCostInsert.helpers({});

Template.dental_materialCostInsert.events({
  'click .doctorAddon': function() {
    alertify.doctorAddon(fa("plus", "Doctor"), renderTemplate(Template.dental_doctorInsert))
      .maximize();
  },
  'change .materialCostItemId': function(e) {
    onChangeMaterialCostItemId(e);
  },
  'click .btnRemove': function(e) {

    setTimeout(function() {
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

      calculateTotal();
    }, 300);

  },
  'click .btnAdd': function(e) {

    var materialCostItemId = $(e.currentTarget).val();

    if (materialCostItemId != "") {
      $('.btnAdd').removeAttr('disabled');
    } else {
      $('.btnAdd').attr('disabled', "disabled");

    }
  },
  'keyup .price ,.qty , click .price ,.qty ': function(e) {
    checkEventKeyupAndClick(e);
  },
  'click #saveAndPrint': function() {
    Session.set('printInvoiceMaterialCost', true);
  }

});

/**
 * Update
 */
Template.dental_materialCostUpdate.onRendered(function() {
  datepicker();
  calculateTotal();
});

Template.dental_materialCostUpdate.helpers({});

Template.dental_materialCostUpdate.events({
  'click .doctorAddon': function() {
    alertify.doctorAddon(fa("plus", "Doctor"), renderTemplate(Template.dental_doctorInsert))
      .maximize();
  },
  'change .materialCostItemId': function(e) {
    onChangeMaterialCostItemId(e);
  },
  'click .btnRemove': function(e) {

    setTimeout(function() {
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

      calculateTotal();
    }, 300);

  },
  'click .btnAdd': function(e) {
    var materialCostItemId = $(e.currentTarget).val();

    if (materialCostItemId != "") {
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
Template.dental_materialCostShow.helpers({
  materialCostDetailFormat: function() {
    var materialCostDetail = "<ul>";
    var data = this.items;
    data.forEach(function(obj) {
      materialCostDetail +=
        "<li>" + 'MaterialCostItem Id: ' + obj.materialCostItemId +
        ' | Qty: ' + obj.qty + ' | Price : ' + obj.price +
        ' | Amount: ' + obj.amount + '</li>';
    });

    materialCostDetail += "</ul>";

    return new Spacebars.SafeString(materialCostDetail);
  },
  materialCostDateFormat: function() {
    return moment(this.materialCostDate).format("YYYY-MM-DD");
  }
});
/**
 * Hook
 */
AutoForm.hooks({
  dental_materialCostInsert: {
    before: {
      insert: function(doc) {
        var materialCostPrefix = Session.get('currentBranch') + '-' +
          moment($('.materialCostDate').val()).format("YYYYMMDD");
        doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCost,
          materialCostPrefix, 3);
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      //clear select2
      $('select').each(function() {
        $(this).select2("val", "");
      });
      //clear selectize
      $('select.materialCostItemId')[0].selectize.clear(true);

      var printSession = Session.get('printInvoiceMaterialCost');
      var data = Dental.Collection.MaterialCost.findOne(result);
      if (printSession) {
        var q = 'doctor=' + data.doctorId + '&materialCost=' + data._id;
        var url = 'materialCostReportGen?' + q;
        window.open(url);
      }
      Session.set('printInvoiceMaterialCost', false);

      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_materialCostUpdate: {
    onSuccess: function() {
      alertify.materialCost().close();
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
function onChangeMaterialCostItemId(e) {
  var thisObj = $(e.currentTarget);
  var materialCostItemId = $(e.currentTarget).val();
  var qty, price, amount;

  if (materialCostItemId != "" && price != 0 && qty != 0) {
    var materialCostItemDoc = Dental.Collection.MaterialCostItem.findOne({
      _id: materialCostItemId
    });

    qty = 1;
    price = math.round(materialCostItemDoc.price, 2);
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
function calculateTotal() {
  var total = 0;
  $('#materialCost .amount').each(function() {
    var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
    total += amount;
  });
  $('[name="total"]').val(total);

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
      200
    );
}

/*
 * Config date picker
 */

var datepicker = function() {
  var materialCostDate = $('[name="materialCostDate"]');
  DateTimePicker.dateTime(materialCostDate);
};
