var indexTpl = Template.dental_cashChartAccount,
    insertTpl = Template.dental_cashChartAccountInsert,
    updateTpl = Template.dental_cashChartAccountUpdate,
    showTpl = Template.dental_cashChartAccountShow;

// Index
indexTpl.onCreated(function () {
    createNewAlertify('chartAccount');
});
indexTpl.onRendered(function () {
});

indexTpl.helpers({
    selector: function () {
        return {$or: [{cashType: 'In'}, {cashType: 'Out'}]};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.chartAccount(fa("plus", "Chart Account"), renderTemplate(insertTpl));
    },
    'click .update': function (e, t) {
        alertify.chartAccount(fa("pencil", "Chart Account"), renderTemplate(updateTpl, {chartAccountId: this._id}));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Chart Account"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Dental.Collection.CashChartAccount.remove(self._id, function (error) {
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
        alertify.chartAccount(fa("eye", "Chart Account"), renderTemplate(showTpl, {chartAccountId: this._id}));
    }
});

// Update
updateTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashChartAccountById', currentData.chartAccountId);
        }
    });
});
updateTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        return Dental.Collection.CashChartAccount.findOne({_id: currentData.chartAccountId});
    }
});

// Show
showTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashChartAccountById', currentData.chartAccountId);
        }
    });
});
showTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        var data = Dental.Collection.CashChartAccount.findOne({_id: currentData.chartAccountId});

        return data;
    }
});


// Hook
AutoForm.hooks({
    dental_cashChartAccountInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_cashChartAccountUpdate: {
        onSuccess: function (formType, result) {
            alertify.chartAccount().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
