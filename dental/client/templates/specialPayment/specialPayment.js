Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_specialPayment.onRendered(function() {
  createNewAlertify(['payment', 'registerAddon', 'staffAddon',
    'patientAddon'
  ]);
});

Template.dental_specialPayment.helpers({
  register: function() {
    return Dental.ListState.get('data');
  },
  selector: function() {
    var registerId = Dental.ListState.get('data')._id;
    return {
      specialRegisterId: registerId
    };
  }
});

Template.dental_specialPayment.events({
  'click .btn-link': function() {
    var self = this;
    checkLastPayment(self);
  },
  'click .insert': function() {
    Session.set('closeSpecialPayment', true);
    var data = Dental.ListState.get('data');

    // Check last balance
    var paymentLast = Dental.Collection.SpecialPayment.findOne({
      specialRegisterId: data._id
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

    Meteor.setTimeout(function() {
      alertify.payment(fa("plus", "Special Payment"), renderTemplate(
        Template.dental_specialPaymentInsert, data));
    }, 500);
  },
  'click .update': function() {
    var data = Dental.Collection.SpecialPayment.findOne({
      _id: this._id
    });

    alertify.payment(fa("pencil", "Special Payment"), renderTemplate(
      Template.dental_specialPaymentUpdate, data));
  },
  'click .remove': function() {
    var self = this;
    alertify.confirm(
      fa("remove", "Special Payment"),
      "Are you sure to delete [" + self._id + "] ?",
      function(result) {
        Dental.Collection.SpecialPayment.remove(self._id, function(
          error) {
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
    alertify.payment(fa("eye", "Special Payment"), renderTemplate(Template.dental_specialPaymentShow,
      this));
  },
  'click .specialPaymentPrintAction': function() {
    var q = 'specialRegister=' + this.specialRegisterId;
    var url = 'specialPaymentReportGen?' + q;
    window.open(url);
  }
});

/*
 * Insert
 */
Template.dental_specialPaymentInsert.onRendered(function() {
  datepicker();
});

Template.dental_specialPaymentInsert.helpers({
  total: function() {
    return Dental.ListState.get('amount');
  }
});

Template.dental_specialPaymentInsert.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'click #saveAndPrint': function() {
    Meteor.subscribe('dental_specialPayment');
    Session.set('printSpecialPayment', true);
  },
  'change .paymentMethod': function(e) {
    var getAmount = $(e.currentTarget).val();
    var splitAmount = getAmount.split(" | ");
    var amount = splitAmount[1];
    Dental.ListState.set("amount", amount);
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  }
});

/*
 * Update
 */
Template.dental_specialPaymentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_specialPaymentUpdate.helpers({
  registerId: function() {
    return this.registerId;
  },
  total: function() {
    return Dental.ListState.get('amount');
  }
});

Template.dental_specialPaymentUpdate.events({
  'click .staffAddon': function() {
    alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'change .paymentMethod': function(e) {
    var getAmount = $(e.currentTarget).val();
    var splitAmount = getAmount.split(" | ");
    var amount = splitAmount[1];
    Dental.ListState.set("amount", amount);
  },
  'keyup .paidAmount': function() {
    calculateBalance();
  }
});

// Hook
AutoForm.hooks({
  dental_specialPaymentInsert: {
    before: {
      insert: function(doc) {
        var paymentMethod = $("select.paymentMethod").val();
        var getIndex = paymentMethod.split(" | ");
        var index = getIndex[0];
        //doc._id = branchPre;
        doc.paymentMethod = index;
        doc.branchId = Session.get('currentBranch');
        var prefix = doc.branchId + '-';
        Meteor.call('dental', prefix);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closeSpecialPayment')) {
        alertify.payment().close();
      }

      Meteor.call('getSpecialRegisterIdForPayment', result, function(err, result) {
        var printSession = Session.get('printSpecialPayment');
        if (printSession) {
          var specialRegisterId = Dental.Collection.SpecialPayment.findOne(result).specialRegisterId;
          var q = 'specialRegister=' + specialRegisterId;
          var url = 'specialPaymentReportGen?' + q;
          window.open(url);
        }
        Session.set('printSpecialPayment', false);
      });

      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_specialPaymentUpdate: {
    before: {
      update: function(modifier) {
        var paymentMethod = $("select.paymentMethod").val();
        var getIndex = paymentMethod.split(" | ");
        var index = getIndex[0];
        modifier.$set.paymentMethod = index;

        return modifier;
      }
    },
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
  var checkingLastPayment = Dental.Collection.SpecialPayment.findOne({
    specialRegisterId: self.specialRegisterId
  }, {
    sort: {
      _id: -1
    }
  });
  var lastPayment = checkingLastPayment.paymentDate;

  if (lastPayment == self.paymentDate) {
    $('.update').hide();
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
