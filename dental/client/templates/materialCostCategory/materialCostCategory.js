/*
 * Index
 */
Template.dental_materialCostCategory.onRendered(function () {
    createNewAlertify('materialCostCategory');
});

Template.dental_materialCostCategory.events({
    'click .insert': function () {
        alertify.materialCostCategory(fa("plus", "Material Category"),
            renderTemplate(Template.dental_materialCostCategoryInsert));
    },
    'click .update': function () {
        var data = this;
        alertify.materialCostCategory(fa("pencil", "Material Category"),
            renderTemplate(Template.dental_materialCostCategoryUpdate, data));
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Material Catogory"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.MaterialCostCategory.remove(self._id,
                    function (error) {
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

        alertify.materialCostCategory(fa("eye", "Material Category"), renderTemplate(
            Template.dental_materialCostCategoryShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_materialCostCategoryInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                Meteor.call('dental');
                return doc;
            }
        },
        onSuccess: function (fromType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_materialCostCategoryUpdate: {
        onSuccess: function (fromType, result) {
            alertify.materialCostCategory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
