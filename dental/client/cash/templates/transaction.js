var indexTpl = Template.dental_cashTransaction,
    insertTpl = Template.dental_cashTransactionInsert,
    updateTpl = Template.dental_cashTransactionUpdate,
    cashTypeTpl = Template.dental_cashTransactionCashType,
    customArrayFieldForCashTransactionTpl = Template.afArrayField_customArrayFieldForCashTransaction,
    customObjectFieldForCashTransactionTpl = Template.customObjectFieldForCashTransaction,
    showTpl = Template.dental_cashTransactionShow;

// Set state
var totalAmountState = new ReactiveVar(0);

// Index
indexTpl.onCreated(function () {
    createNewAlertify(['cashType', 'transaction']);

    // subscribe
    var self = this;
    self.autorun(function () {
        self.subscribe('dental.cashCashierByBranch', Session.get('currentBranch'));
        self.subscribe('dental.cashChartAccount');
    });
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
        alertify.cashType(fa("plus", "Cash Type"), renderTemplate(cashTypeTpl));
    },
    'click .update': function (e, t) {
        // Check ref from
        if (this.refFrom) {
            alertify.warning('You can not update this, because [Ref From] is exist!');
        } else {
            Session.set('cashType', this.cashType);
            alertify.transaction(fa("pencil", "Transaction (" + this.cashType + ")"), renderTemplate(updateTpl, {transactionId: this._id})).maximize();
        }
    },
    'click .remove': function (e, t) {
        var self = this;

        // Check ref from
        if (self.refFrom) {
            alertify.warning('You can not delete this, because [Ref From] is exist!');
        } else {
            alertify.confirm(
                fa("remove", "Transaction"),
                "Are you sure to delete [" + self._id + "]?",
                function () {
                    Dental.Collection.CashTransaction.remove(self._id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                null
            );
        }
    },
    'click .show': function (e, t) {
        alertify.transaction(fa("eye", "Transaction"), renderTemplate(showTpl, {transactionId: this._id}));
    }
});

// Account type
cashTypeTpl.events({
    'change [name="cashType"]': function (e, t) {
        console.log(e.currentTarget.value);
        Session.set('cashType', e.currentTarget.value);
    },
    'click .btn-default': function (event, instance) {
        alertify.cashType().close();
    }
});
cashTypeTpl.onDestroyed(function () {
    Session.set('cashType', null);
});

// Update
updateTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashTransactionById', currentData.transactionId);
        }
    });
});
updateTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        var data = Dental.Collection.CashTransaction.findOne({_id: currentData.transactionId});

        // Set state
        if (data) {
            totalAmountState.set(data.totalAmount);
        }

        return data;
    }
});

// Custom array field for cash transaction
customArrayFieldForCashTransactionTpl.helpers({
    totalAmountVal: function () {
        return totalAmountState.get();
    }
});


// Custom array field for cash transaction
customObjectFieldForCashTransactionTpl.events({
    'keyup .amount': function (e, t) {
        var totalAmount = 0, amount;

        $('.amount').each(function () {
            amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
            totalAmount += amount;
        });

        totalAmountState.set(totalAmount);
    }
});
// Show
showTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashTransactionById', currentData.transactionId);
        }
    });
});
showTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        var data = Dental.Collection.CashTransaction.findOne({_id: currentData.transactionId});
        return data;
    },
    jsonViewOpts: function () {
        return {collapsed: true};
    }
});


// Hook
AutoForm.hooks({
    dental_cashTransactionCashType: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done();
        },
        onSuccess: function (formType, result) {
            // Session.set('cashType', result.cashType);
            alertify.transaction(fa("plus", "Transaction (" + Session.get('cashType') + ')'), renderTemplate(insertTpl)).maximize();
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_cashTransactionInsert: {
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
    dental_cashTransactionUpdate: {
        onSuccess: function (formType, result) {
            Session.set('cashType', null);
            alertify.transaction().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
