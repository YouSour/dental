/**
 * Index
 */
Template.dental_laboDepartment.onRendered(function () {
    // Create new  alertify
    createNewAlertify("laboDepartment");
});

Template.dental_laboDepartment.events({
    'click .insert': function (e, t) {
        alertify.laboDepartment(fa("plus", "Laboratory Department"), renderTemplate(Template.dental_laboDepartmentInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboDepartment(fa("pencil", "Laboratory Department"), renderTemplate(Template.dental_laboDepartmentUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Department"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboDepartment.remove(self._id, function (error) {
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
        alertify.laboDepartment(fa("eye", "Laboratory Department"), renderTemplate(Template.dental_laboDepartmentShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboDepartmentInsert: {
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
    dental_laboDepartmentUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboDepartment().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
