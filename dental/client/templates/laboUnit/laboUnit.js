/**
 * Index
 */
Template.dental_laboUnit.onRendered(function () {
    // Create new  alertify
    createNewAlertify("laboUnit");
});

Template.dental_laboUnit.events({
    'click .insert': function (e, t) {
        alertify.laboUnit(fa("plus", "Laboratory Unit"), renderTemplate(Template.dental_laboUnitInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboUnit(fa("pencil", "Laboratory Unit"), renderTemplate(Template.dental_laboUnitUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Unit"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboUnit.remove(self._id, function (error) {
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
        alertify.laboUnit(fa("eye", "Laboratory Unit"), renderTemplate(Template.dental_laboUnitShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboUnitInsert: {
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
    dental_laboUnitUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboUnit().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
