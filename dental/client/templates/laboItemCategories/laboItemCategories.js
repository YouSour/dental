/*
 * Index
 */
Template.dental_laboItemCategories.onRendered(function () {
    createNewAlertify('laboItemCategories');
});

Template.dental_laboItemCategories.events({
    'click .insert': function () {
        alertify.laboItemCategories(fa("plus", "Laboratory Item Categories"), renderTemplate(
            Template.dental_laboItemCategoriesInsert));
    },
    'click .update': function () {
        var data = this;
        alertify.laboItemCategories(fa("pencil", "Laboratory Item Categories"), renderTemplate(
            Template.dental_laboItemCategoriesUpdate, data));
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Item Categories"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboItemCategories.remove(self._id, function (error) {
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
    'click .show': function () {
        var data = this;
        alertify.laboItemCategories(fa("eye", "Laboratory Item Categories"), renderTemplate(Template.dental_laboItemCategoriesShow,
            data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboItemCategoriesInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                Meteor.call('dental');
                return doc
            }
        },
        onSuccess: function (fromType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_laboItemCategoriesUpdate: {
        onSuccess: function (fromType, result) {
            alertify.laboItemCategories().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
