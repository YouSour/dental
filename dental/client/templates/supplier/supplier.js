/**
 * Index
 */
Template.dental_supplier.onRendered(function() {
  createNewAlertify('supplier');
});

Template.dental_supplier.events({
  'click .insert': function() {
    alertify.supplier(fa("plus", "Supplier"), renderTemplate(Template.dental_supplierInsert));
  },
  'click .update': function() {
    var data = this;
    alertify.supplier(fa("", "Supplier"), renderTemplate(Template.dental_supplierUpdate,
      data));
  },
  'click .remove': function() {
    var self = this;

    alertify.confirm(
      fa("remove", "Supplier"),
      "Are you sure to delete [" + self._id + "] ?",
      function(closeEvent) {
        Dental.Collection.Supplier.remove(self._id, function(error) {
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
    alertify.alert(fa("eye", "Suppiler"), renderTemplate(Template.dental_supplierShow,
      this));
  }
});

/**
 * Hook
 */
AutoForm.hooks({
  dental_supplierInsert: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Dental.Collection.Supplier, 3);
        doc.branchId = Session.get('currentBranch');
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
  dental_supplierUpdate: {
    onSuccess: function() {
      alertify.supplier().close();
      alertify.success("Success");
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
