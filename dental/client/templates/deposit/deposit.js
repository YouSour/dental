/*
 * Index
 */
Template.dental_deposit.onCreated(function() {
  createNewAlertify('deposit');
});

Template.dental_deposit.helpers({
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

Template.dental_deposit.events({
  'click .insert': function() {
    Session.set('closeDeposit', true);
    var data = Dental.RegisterState.get('data');
    alertify.deposit(fa("plus", "Deposit"), renderTemplate(Template.dental_depositInsert,
      data));
  },
  'click .update': function() {
    var data = Dental.Collection.Deposit.findOne({
      _id: this._id
    });
    alertify.deposit(fa("pencil", "Deposit"), renderTemplate(Template.dental_depositUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Deposit"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Dental.Collection.Deposit.remove(self._id, function(error) {
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
    var data = Dental.Collection.Deposit.findOne(this._id);
    data.amountVal = numeral(data.amount).format('0,0.00');

    alertify.alert(fa("eye", "Deposit"), renderTemplate(Template.dental_depositShow,
      data));
  }
});

/**
 * Insert
 */
Template.dental_depositInsert.onRendered(function() {
  datepicker();
});

Template.dental_depositInsert.events({
  'click #saveAndPrint': function() {
    Session.set('printInvoiceDeposit', true);
  }
});
/**
 * Update
 */
Template.dental_depositUpdate.onRendered(function() {
  datepicker();
});


/*
 *Hook
 */
AutoForm.hooks({
  dental_depositInsert: {
    before: {
      insert: function(doc) {
        var currentBranch = Session.get('currentBranch');
        doc._id = idGenerator.genWithPrefix(Dental.Collection.Deposit,
          currentBranch + '-', 12);
        doc.branchId = currentBranch;

        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closeDeposit')) {
        alertify.deposit().close();
      }

      var printSession = Session.get('printInvoiceDeposit');
      var data = Dental.Collection.Deposit.findOne(result);
      if (printSession) {
        var q = 'patient=' + data.patientId + '&register=' + data.registerId;
        var url = '/dental/invoiceReportGen?' + q;
        window.open(url);
      }
      Session.set('printInvoiceDeposit', false);
      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_depositUpdate: {
    onSuccess: function(formType, result) {
      alertify.deposit().close();
      alertify.success("Success");
    },
    onError: function(fromType, error) {
      alertify.error(error.message);
    }
  }
});

/*
 *Config date picker
 */
var datepicker = function() {
  var depositDate = $('[name="depositDate"]');
  DateTimePicker.dateTime(depositDate);
};
