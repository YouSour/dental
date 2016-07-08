/**
 * Index
 */
Template.dental_laboMaterialCategory.onRendered(function () {
    // Create new  alertify
    createNewAlertify("laboMaterialCategory");
});

Template.dental_laboMaterialCategory.events({
    'click .insert': function (e, t) {
        alertify.laboMaterialCategory(fa("plus", "Laboratory Material Categories"), renderTemplate(Template.dental_laboMaterialCategoryInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboMaterialCategory(fa("pencil", "Laboratory Material Categories"), renderTemplate(Template.dental_laboMaterialCategoryUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Material Categories"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboMaterialCategory.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            }, null
        );
    },
    'click .show': function (e, t) {
        var data = this;
        alertify.laboMaterialCategory(fa("eye", "Laboratory Material Categories"), renderTemplate(Template.dental_laboMaterialCategoryShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboMaterialCategoryInsert: {
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
    dental_laboMaterialCategoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboMaterialCategory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
