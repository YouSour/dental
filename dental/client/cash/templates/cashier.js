var indexTpl = Template.dental_cashCashier,
    insertTpl = Template.dental_cashCashierInsert,
    updateTpl = Template.dental_cashCashierUpdate,
    showTpl = Template.dental_cashCashierShow;

// Index
indexTpl.onCreated(function () {
    createNewAlertify('cashier');
});
indexTpl.onRendered(function () {
});

indexTpl.helpers({
    selector: function () {
        return {cpanel_branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.cashier(fa("plus", "Cashier"), renderTemplate(insertTpl)).maximize();
    },
    'click .update': function (e, t) {
        alertify.cashier(fa("pencil", "Cashier"), renderTemplate(updateTpl, {cashierId: this._id})).maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Cashier"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Dental.Collection.CashCashier.remove(self._id, function (error) {
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
        alertify.cashier(fa("eye", "Cashier"), renderTemplate(showTpl, {cashierId: this._id}));
    }
});

// Update
updateTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashCashierById', currentData.cashierId);
        }
    });
});
updateTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        return Dental.Collection.CashCashier.findOne({_id: currentData.cashierId});
    }
});

// Show
showTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashCashierById', currentData.cashierId);
        }
    });
});
showTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        var data = Dental.Collection.CashCashier.findOne({_id: currentData.cashierId});

        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        return data;
    }
});


// Hook
AutoForm.hooks({
    dental_cashCashierInsert: {
        before: {
            insert: function (doc) {
                doc.cpanel_branchId = Session.get('currentBranch');
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
    dental_cashCashierUpdate: {
        onSuccess: function (formType, result) {
            alertify.cashier().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
