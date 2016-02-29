/**
 * Index
 */
Template.dental_diseaseItem.onCreated(function() {
  // Create new  alertify
  Meteor.subscribe('dental_diseaseCategory');
  createNewAlertify(["diseaseItem", 'diseaseCategory']);
});

Template.dental_diseaseItem.events({
  'click .insert': function(e, t) {
    alertify.diseaseItem(fa("plus", "Disease Item"), renderTemplate(
      Template.dental_diseaseItemInsert)).maximize();
  },
  'click .update': function(e, t) {
    var data = this;

    alertify.diseaseItem(fa("pencil", "Disease Item"), renderTemplate(
      Template.dental_diseaseItemUpdate, data)).maximize();
  },
  'click .remove': function(e, t) {
    var self = this;

    alertify.confirm(
      fa("remove", "Disease Item"),
      "Are you sure to delete [" + self._id + "] ?",
      function(closeEvent) {
        Dental.Collection.DiseaseItem.remove(self._id, function(error) {
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
    alertify.alert(fa("eye", "Disease Item"), renderTemplate(Template.dental_diseaseItemShow,
      data));
  }
});

/**
 * Insert
 */
Template.dental_diseaseItemInsert.events({
  'click .diseaseCategoryAddon': function(e, t) {
    alertify.diseaseCategory(fa("plus", "Disease Category"),
      renderTemplate(Template.dental_diseaseCategoryInsert));
  }
});

/**
 * Update
 */
Template.dental_diseaseItemUpdate.events({
  'click .diseaseCategoryAddon': function(e, t) {
    alertify.diseaseCategory(fa("plus", "Disease Category"),
      renderTemplate(Template.dental_diseaseCategoryInsert));
  }
});

/**
 * Hook
 */
AutoForm.hooks({
  dental_diseaseItemInsert: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Dental.Collection.DiseaseItem, 6);
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
  dental_diseaseItemUpdate: {

    onSuccess: function(formType, result) {
      alertify.diseaseItem().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }

});
