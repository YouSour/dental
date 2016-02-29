/**
 * Index
 */
Template.dental_doctor.onCreated(function() {
  // Create new  alertify
  createNewAlertify("doctor");
});

Template.dental_doctor.events({
  'click .insert': function(e, t) {
    alertify.doctor(fa("plus", "Doctor"), renderTemplate(Template.dental_doctorInsert))
      .maximize();
  },
  'click .update': function(e, t) {
    var data = this;
    alertify.doctor(fa("pencil", "Doctor"), renderTemplate(Template.dental_doctorUpdate,
      data)).maximize();
  },
  'click .remove': function(e, t) {
    var self = this;

    alertify.confirm(
      fa("remove", "Doctor"),
      "Are you sure to delete [" + self._id + "] ?",
      function(closeEvent) {
        Dental.Collection.Doctor.remove(self._id, function(error) {
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
  'click .show': function(e, t) {
    var data = this;
    data.photoUrl = null;
    if (!_.isUndefined(data.photo)) {
      data.photoUrl = Files.findOne(data.photo).url();
    }
    alertify.alert(fa("eye", "Doctor"), renderTemplate(Template.dental_doctorShow,
      data));
  }
});

/**
 * Insert
 */
Template.dental_doctorInsert.onRendered(function() {
  datePicker();
});

Template.dental_doctorInsert.rendered = function() {};

/**
 * Update
 */
Template.dental_doctorUpdate.onRendered(function() {
  datePicker();
});

/**
 * Hook
 */
AutoForm.hooks({
  dental_doctorInsert: {
    before: {
      insert: function(doc) {
        var branchPre = Session.get('currentBranch') + '-';
        doc._id = idGenerator.genWithPrefix(Dental.Collection.Doctor,
          branchPre, 4);
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      $('select').each(function() {
        $(this).select2("val", "");
      });

      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_doctorUpdate: {
    onSuccess: function(formType, result) {
      alertify.doctor().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});

/**
 * Config date picker
 */
var datePicker = function() {
  var startDate = $('[name="startDate"]');
  DateTimePicker.date(startDate);
};
