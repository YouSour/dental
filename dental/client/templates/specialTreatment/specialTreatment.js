/*
 * Index
 */
Template.dental_specialTreatment.onCreated(function() {
  createNewAlertify(['specialTreatment', 'doctorAddon']);
});

Template.dental_specialTreatment.helpers({
  register: function() {
    return Dental.RegisterState.get('data');
  },
  selector: function() {
    var specialRegisterId = Dental.RegisterState.get('data')._id;
    return {
      specialRegisterId: specialRegisterId
    };
  }
});

Template.dental_specialTreatment.events({
  'click .insert': function() {
    Session.set('closeTreatment', true);
    var data = Dental.RegisterState.get('data');
    alertify.specialTreatment(fa("plus", "Special Treatment"),
      renderTemplate(Template.dental_specialTreatmentInsert,
        data)).maximize();
  },
  'click .update': function() {
    var data = this;

    alertify.specialTreatment(fa("pencil", "Special Treatment"),
      renderTemplate(Template
        .dental_specialTreatmentUpdate, data)).maximize();
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Special Treatment"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Dental.Collection.SpecialTreatment.remove(self._id, function(
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
    var data = this;
    // data.attachFileUrl = null;
    //
    // if (!_.isUndefined(data.attachFile)) {
    //   data.attachFileUrl = Files.findOne(data.attachFile).url();
    // }
    alertify.alert(fa("eye", "Special Treatment"), renderTemplate(
      Template.dental_specialTreatmentShow,
      data));
  },
  'click .showDescription': function() {
    // Show Description
    var q = 'specialTreatmentId=' + this._id;
    var url = 'specialTreatmentDescriptionGen?' + q;
    window.open(url);
  },
  'click .specialTreatmentPrintAction': function() {
    var q = 'patient=' + this.patientId + '&specialRegister=' + this.specialRegisterId;
    var url = 'specialTreatmentReportGen?' + q;
    window.open(url);
  }
});

/**
 * Insert
 */
Template.dental_specialTreatmentInsert.onRendered(function() {
  datepicker();
});

Template.dental_specialTreatmentInsert.events({
  'click .doctorAddon': function(e, t) {
    alertify.doctorAddon(
      fa("plus", "Doctor"),
      renderTemplate(Template.dental_doctorInsert)
    );
  },
  'click #saveAndPrint': function(e, t) {
    return Session.set('printSpecialTreatment', true);
  }
});

/**
 * Update
 */
Template.dental_specialTreatmentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_specialTreatmentUpdate.events({
  'click .doctorAddon': function(e, t) {
    alertify.doctorAddon(
      fa("plus", "Doctor"),
      renderTemplate(Template.dental_doctorInsert)
    );
  }
});

/**
 * Hook
 */
AutoForm.hooks({
  dental_specialTreatmentInsert: {
    before: {
      insert: function(doc) {
        var currentBranch = Session.get('currentBranch');
        doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialTreatment,
          currentBranch + '-', 12);
        doc.branchId = currentBranch;

        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closeTreatment')) {
        alertify.specialTreatment().close();
      }
      //clear select2
      $('select').each(function() {
        $(this).select2("val", "");
      });

      var printSession = Session.get('printSpecialTreatment');
      var data = Dental.Collection.SpecialTreatment.findOne(result);
      if (printSession) {
        var q = 'patient=' + data.patientId + '&specialRegister=' + data.specialRegisterId;
        var url = 'specialTreatmentReportGen?' + q;
        window.open(url);
      }
      Session.set('printSpecialTreatment', false);
      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_specialTreatmentUpdate: {
    onSuccess: function(formType, result) {
      alertify.specialTreatment().close();
      alertify.success("Success");
    },
    onError: function(fromType, error) {
      alertify.error(error.message);
    }
  }
});

/**
 * Config date picker
 */
var datepicker = function() {
  var treatmentDate = $('[name="treatmentDate"]');
  DateTimePicker.dateTime(treatmentDate);
};
