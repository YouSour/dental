/**
 * Index
 */
Template.dental_diseaseCategory.onRendered(function () {
    // Create new  alertify
    createNewAlertify("diseaseCategory");
});

Template.dental_diseaseCategory.events({
    'click .insert': function (e, t) {
        alertify.diseaseCategory(fa("plus", "Disease Category"), renderTemplate(Template.dental_diseaseCategoryInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.diseaseCategory(fa("pencil", "Disease Category"), renderTemplate(Template.dental_diseaseCategoryUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Disease Category"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {

                Dental.Collection.DiseaseCategory.remove(self._id, function (error) {
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
    'click .show': function (e, t) {
        var data = this;
        alertify.diseaseCategory(fa("eye", "Disease Category"), renderTemplate(Template.dental_diseaseCategoryShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_diseaseCategoryInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                Meteor.call('dental');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_diseaseCategoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.diseaseCategory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
