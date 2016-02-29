Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_payment.onRendered(function() {
  createNewAlertify(['payment', 'registerAddon', 'staffAddon',
    'patientAddon'
  ]);
});

Template.dental_payment.helpers({
  register: function() {
    return Dental.RegisterState.get('data');
  },
  selector: function() {
    var registerId = Dental.RegisterState.get('data')._id;

    return {
      registerId: registerId
    };
  }
});

Template.dental_payment.events({
  'click .btn-link': function() {
    var self = this;
    checkLastPayment(self);
  },
  'click .insert': function() {
    Session.set('closePayment', true);
    var data = Dental.RegisterState.get('data');

    // Check last balance
    var paymentLast = Dental.Collection.Payment.findOne({
      registerId: data._id
    }, {
      sort: {
        _id: -1
      }
    });
    if (!_.isUndefined(paymentLast)) {
      data.total = paymentLast.balance;
    }

    Meteor.setTimeout(function() {
      alertify.payment(fa("plus", "Payment"), renderTemplate(Template
        .dental_paymentInsert, data));
    }, 500);
  },
  'click .update': function() {
    var data = this;
    alertify.payment(fa("pencil", "Payment"), renderTemplate(Template.dental_paymentUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;
    alertify.confirm(
      fa("remove", "Payment"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.Payment.remove(self._id, function(error) {
          if (error) {
          } else {
            alertify.error(error.message);
            alertify.success("Success");
          }
        });
      },
      null
    );
  },
  'click .show': function() {
    alertify.alert(fa("eye", "Payment"), renderTemplate(Template.dental_paymentShow,
      this));
  },
  'click .paymentPrintAction': function() {
    var q = 'patient=' + this.patientId + '&register=' + this.registerId;
    var url = 'invoiceReportGen?' + q;
    window.open(url);
  }
});

/*
 * Insert
 */
Template.dental_paymentInsert.onRendered(function() {
  datepicker();
});

Template.dental_paymentInsert.events({
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
Template.dental_paymentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_paymentUpdate.helpers({
  registerId: function() {
    return this.registerId;
  }
});

Template.dental_paymentUpdate.events({
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
  dental_paymentInsert: {
    before: {
      insert: function(doc) {
        var branchPre = Session.get('currentBranch') + '-' + moment().format(
          "YYYYMMDD");
        doc._id = idGenerator.genWithPrefix(Dental.Collection.Payment,
          branchPre, 3);
        doc.branchId = Session.get('currentBranch');

        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closePayment')) {
        alertify.payment().close();
      }

      var printSession = Session.get('printInvoicePayment');
      var data = Dental.Collection.Payment.findOne(result);
      if (printSession) {
        var q = 'patient=' + data.patientId + '&register=' + data.registerId;
        var url = '/dental/invoiceReportGen?' + q;
        window.open(url);
      }
      Session.set('printInvoicePayment', false);
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_paymentUpdate: {
    onSuccess: function() {
      alertify.payment().close();
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
  var checkingLastPayment = Dental.Collection.Payment.findOne({
    registerId: self.registerId
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
