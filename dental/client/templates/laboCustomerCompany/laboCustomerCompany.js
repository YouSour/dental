/**
 * Index
 */
Template.dental_laboCustomerCompany.onRendered(function () {
    // Create new  alertify
    createNewAlertify("laboCustomerCompany");
});

Template.dental_laboCustomerCompany.events({
    'click .insert': function (e, t) {
        alertify.laboCustomerCompany(fa("plus", "Laboratory Customer Company"), renderTemplate(Template.dental_laboCustomerCompanyInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboCustomerCompany(fa("pencil", "Laboratory Customer Company"), renderTemplate(Template.dental_laboCustomerCompanyUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Customer Company"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboCustomerCompany.remove(self._id, function (error) {
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
        alertify.laboCustomerCompany(fa("eye", "Laboratory Customer Company"), renderTemplate(Template.dental_laboCustomerCompanyShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboCustomerCompanyInsert: {
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
    dental_laboCustomerCompanyUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboCustomerCompany().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
