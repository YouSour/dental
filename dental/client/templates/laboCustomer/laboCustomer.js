/**
 * Index
 */
Template.dental_laboCustomer.onRendered(function () {
    //Subscribe
    Meteor.subscribe('dental_laboCustomerCompany');
    // Create new  alertify
    createNewAlertify(["laboCustomer","laboCustomerCompany"]);
});

Template.dental_laboCustomer.events({
    'click .insert': function (e, t) {
        alertify.laboCustomer(fa("plus", "Laboratory Customer"), renderTemplate(Template.dental_laboCustomerInsert)).maximize();
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboCustomer(fa("pencil", "Laboratory Customer"), renderTemplate(Template.dental_laboCustomerUpdate, data)).maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Customer"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboCustomer.remove(self._id, function (error) {
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
        alertify.laboCustomer(fa("eye", "Laboratory Customer"), renderTemplate(Template.dental_laboCustomerShow, data));
    }
})
;

/**
 * Insert
 */
 Template.dental_laboCustomerInsert.events({
     'click .laboCustomerCompanyAddon': function (e, t) {
         alertify.laboCustomerCompany(fa("plus", "Laboratory Customer Company"),
             renderTemplate(Template.dental_laboCustomerCompanyInsert));
     }
 });

/**
 * Update
 */
 Template.dental_laboCustomerUpdate.events({
     'click .laboCustomerCompanyAddon': function (e, t) {
         alertify.laboCustomerCompany(fa("plus", "Laboratory Customer Company"),
             renderTemplate(Template.dental_laboCustomerCompanyInsert));
     }
 });

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboCustomerInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('dental', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('select').each(function(){
                $(this).select2("val","");
            });

            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
  dental_laboCustomerUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboCustomer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
