/*
 * Index
 */
Template.dental_treatment.onCreated(function() {
  createNewAlertify(['treatment', 'doctorAddon']);
});

Template.dental_treatment.helpers({
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

Template.dental_treatment.events({
  'click .insert': function() {
    Session.set('closeTreatment', true);
    var data = Dental.RegisterState.get('data');
    alertify.treatment(fa("plus", "Treatment"), renderTemplate(Template.dental_treatmentInsert,
      data)).maximize();
  },
  'click .update': function() {
    var data = Dental.Collection.Treatment.findOne({
      _id: this._id
    });
    alertify.treatment(fa("pencil", "Treatment"), renderTemplate(Template
      .dental_treatmentUpdate, data)).maximize();
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Treatment"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Dental.Collection.Treatment.remove(self._id, function(error) {
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
    var data = Dental.Collection.Treatment.findOne(this._id);
    // data.attachFileUrl = null;
    //
    // if (!_.isUndefined(data.attachFile)) {
    //   data.attachFileUrl = Files.findOne(data.attachFile).url();
    // }
    alertify.alert(fa("eye", "Treatment"), renderTemplate(Template.dental_treatmentShow,
      data));
  },
  'click .showDescription': function() {
    // Show Description
    var q = 'treatmentId=' + this._id;
    var url = 'treatmentDescriptionGen?' + q;
    window.open(url);
  }
});

/**
 * Insert
 */
Template.dental_treatmentInsert.onRendered(function() {
  datepicker();
});

Template.dental_treatmentInsert.events({
  //'change [name="patientId"]': function (e, t) {
  //    var patientId = t.$('[name="patientId"]').val();
  //
  //    // Set list state
  //    Dental.ListState.set('patientId', patientId);
  //},
  //'change [name="registerId"]': function (e, t) {
  //    var registerId = t.$('[name="registerId"]').val();
  //    var treatmentDate = t.$('[name="treatmentDate"]');
  //
  //    // Set treatment date
  //    if (!_.isEmpty(registerId)) {
  //        var registerDoc = Dental.Collection.Register.findOne(registerId);
  //        treatmentDate.data("DateTimePicker").minDate(registerDoc.registerDate);
  //
  //        // Check last treatment
  //        var getLastTreatment = lastTreatment(registerId);
  //        if (!_.isUndefined(getLastTreatment)) {
  //            treatmentDate.data("DateTimePicker").minDate(getLastTreatment.treatmentDate);
  //        }
  //    }
  //},
  //'click .patientAddon': function (e, t) {
  //    alertify.patientAddon(
  //        fa("plus", "Patient"),
  //        renderTemplate(Template.dental_patientInsert)
  //    ).maximize();
  //},
  //'click .registerAddon': function (e, t) {
  //    alertify.registerAddon(
  //        fa("plus", "Register"),
  //        renderTemplate(Template.dental_registerInsert)
  //    ).maximize();
  //},
  'click .doctorAddon': function(e, t) {
    alertify.doctorAddon(
      fa("plus", "Doctor"),
      renderTemplate(Template.dental_doctorInsert)
    );
  }
});

/**
 * Update
 */
Template.dental_treatmentUpdate.onRendered(function() {
  datepicker();
});

Template.dental_treatmentUpdate.events({
  //'change [name="patientId"]': function (e, t) {
  //    var patientId = t.$('[name="patientId"]').val();
  //
  //    // Set list state
  //    Dental.ListState.set('patientId', patientId);
  //},
  //'change [name="registerId"]': function (e, t) {
  //    var registerId = t.$('[name="registerId"]').val();
  //    var treatmentDate = t.$('[name="treatmentDate"]');
  //
  //    // Set treatment date
  //    if (!_.isEmpty(registerId)) {
  //        var registerDoc = Dental.Collection.Register.findOne(registerId);
  //        treatmentDate.data("DateTimePicker").minDate(registerDoc.registerDate);
  //
  //        // Check last treatment
  //        var getLastTreatment = lastTreatment(registerId);
  //        if (!_.isUndefined(getLastTreatment)) {
  //            treatmentDate.data("DateTimePicker").minDate(getLastTreatment.treatmentDate);
  //        }
  //    }
  //}
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
  dental_treatmentInsert: {
    before: {
      insert: function(doc) {
        var currentBranch = Session.get('currentBranch');
        doc._id = idGenerator.genWithPrefix(Dental.Collection.Treatment,
          currentBranch + '-', 12);
        doc.branchId = currentBranch;

        return doc;
      }
    },
    onSuccess: function(formType, result) {
      if (Session.get('closeTreatment')) {
        alertify.treatment().close();
      }
      //clear select2
      $('select').each(function() {
        $(this).select2("val", "");
      });

      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_treatmentUpdate: {
    onSuccess: function(formType, result) {
      alertify.treatment().close();
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
