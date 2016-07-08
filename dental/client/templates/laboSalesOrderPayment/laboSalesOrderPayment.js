Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_laboSaleOrderPayment.onRendered(function() {
  createNewAlertify(['salesOrderPayment', 'saleOrderAddon','customerAddon']);
});

Template.dental_laboSaleOrderPayment.helpers({
  saleOrder: function() {
    return Dental.ListState.get('data');
  },
  selector: function() {
    var saleOrderId = Dental.ListState.get('data')._id;

    return {
      saleOrderId: saleOrderId
    };
  }
});

Template.dental_laboSaleOrderPayment.events({
  'click .btn-link': function() {
    var self = this;
    checkLastPayment(self);
  },
  'click .insert': function() {
    Session.set('closePayment', true);
    debugger;
    var data = Dental.ListState.get('data');

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

      alertify.salesOrderPayment(fa("plus", "Sales Order Payment"), renderTemplate(Template
        .dental_laboSaleOrderPaymentInsert, data));
  },
  'click .update': function() {
    var data = this;
    alertify.salesOrderPayment(fa("pencil", "Sales Order Payment"), renderTemplate(Template.dental_laboSaleOrderPaymentUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;
    alertify.confirm(
      fa("remove", "Sales Order Payment"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.LaboSalesOrderPayment.remove(self._id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success("Success");
          }
        });
      },
      null
    );
  },
  'click .show': function() {
    alertify.salesOrderPayment(fa("eye", "Sales Order Payment"), renderTemplate(Template.dental_laboSaleOrderPaymentShow,
      this));
  },
  'click .salesOrderPaymentPrintAction': function() {
    var q = 'customer=' + this.customerId + '&saleOrder=' + this.saleOrderId;
    var url = 'laboSalesOrderReportGen?' + q;
    window.open(url);
  }
});

/*
 * Insert
 */
Template.dental_laboSaleOrderPaymentInsert.onRendered(function() {
  datepicker();
});

Template.dental_laboSaleOrderPaymentInsert.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  },
  'click #saveAndPrint': function() {
    Session.set('printInvoicePayment', true);
  },
  'click .btnFree': function(e, t) {
    $('.dueAmount, .paidAmount, .balance').val(0);
  }
});

/*
 * Update
 */
Template.dental_laboSaleOrderPaymentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_laboSaleOrderPaymentUpdate.helpers({
  saleOrderId: function() {
    return this.saleOrderId;
  }
});

Template.dental_laboSaleOrderPaymentUpdate.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  },
  'click .btnFree': function(e, t) {
    $('.dueAmount, .paidAmount, .balance').val(0);
  }
});

// Hook
AutoForm.hooks({
  dental_laboSaleOrderPaymentInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        var prefix = doc.branchId + '-';
        Meteor.call('dental', prefix);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closePayment')) {
        alertify.salesOrderPayment().close();
      }

      var printSession = Session.get('printInvoicePayment');
      Meteor.call('getPaymentId', result, function (err, result) {
        var data = Dental.Collection.Payment.findOne(result);
          if (printSession) {
            var q = 'patient=' + data.patientId + '&saleOrder=' + data.saleOrderId;
            var url = '/dental/invoiceReportGen?' + q;
            window.open(url);
          }
          Session.set('printInvoicePayment', false);
      });
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_laboSaleOrderPaymentUpdate: {
    onSuccess: function() {
      alertify.salesOrderPayment().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});

// Config date picker
function datepicker() {
  var paymentDate = $('[name="paymentDate"]');
  DateTimePicker.dateTime(paymentDate);
}

//check last payment
function checkLastPayment(self) {
  var checkingLastPayment = Dental.Collection.LaboSalesOrderPayment.findOne({
    saleOrderId: self.saleOrderId
  }, {
    sort: {
      _id: -1
    }
  });
  var lastPayment = checkingLastPayment.paymentDate;

  if (lastPayment == self.paymentDate) {
    $('.update').show();
    $('.remove').show();
  } else {
    $('.update').hide();
    $('.remove').hide();
  }
}

// calculate Balance
function calculateBalance() {
  var dueAmount = $('.dueAmount').val();
  var paidAmount = $('.paidAmount').val();
  var balance = math.round(dueAmount - paidAmount, 2);
  $('.balance').val(balance);
}
