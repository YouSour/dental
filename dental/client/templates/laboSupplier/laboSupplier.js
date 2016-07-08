/**
 * Index
 */
Template.dental_laboSupplier.onRendered(function() {
  createNewAlertify('laboSupplier');
});

Template.dental_laboSupplier.events({
  'click .insert': function() {
    alertify.laboSupplier(fa("plus", "Laboratory Supplier"), renderTemplate(Template.dental_laboSupplierInsert));
  },
  'click .update': function() {
    var data = this;
    alertify.laboSupplier(fa("", "Laboratory Supplier"), renderTemplate(Template.dental_laboSupplierUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Laboratory Supplier"),
      "Are you sure to delete [" + self._id + "] ?",
      function(closeEvent) {
        Dental.Collection.LaboSupplier.remove(self._id, function(error) {
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
    alertify.laboSupplier(fa("eye", "Laboratory Suppiler"), renderTemplate(Template.dental_laboSupplierShow,
      this));
  }
});

/**
 * Hook
 */
AutoForm.hooks({
  dental_laboSupplierInsert: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        Meteor.call('dental');
        return doc;
      }
    },
    onSuccess: function(fromType, result) {
      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  dental_laboSupplierUpdate: {
    onSuccess: function() {
      alertify.laboSupplier().close();
      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
