/*
 * Index
 */
Template.dental_orderCategory.onRendered(function () {
    createNewAlertify('orderCategory');
});

Template.dental_orderCategory.events({
    'click .insert': function () {
        alertify.orderCategory(fa("plus", "Order Category"), renderTemplate(
            Template.dental_orderCategoryInsert));
    },
    'click .update': function () {
        var data = this;
        alertify.orderCategory(fa("pencil", "Order Category"), renderTemplate(
            Template.dental_orderCategoryUpdate, data));
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Order Catogory"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.OrderCategory.remove(self._id, function (error) {
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

        alertify.orderCategory(fa("eye", "Order Category"), renderTemplate(Template.dental_orderCategoryShow,
            data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_orderCategoryInsert: {
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
    dental_orderCategoryUpdate: {
        onSuccess: function (fromType, result) {
            alertify.orderCategory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
