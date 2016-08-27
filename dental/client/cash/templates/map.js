var indexTpl = Template.dental_cashMap,
    updateTpl = Template.dental_cashMapUpdate;

// Index
indexTpl.onCreated(function () {
    createNewAlertify('map');

    // subscribe
    var self = this;
    self.autorun(function () {
        self.subscribe('dental.cashChartAccount');
    });
});

indexTpl.events({
    'click .update': function (e, t) {
        alertify.map(fa("pencil", "Map"), renderTemplate(updateTpl, {mapId: this._id}));
    }
});

// Update
updateTpl.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var currentData = Template.currentData();
        if (currentData) {
            self.subscribe('dental.cashMapById', currentData.mapId);
        }
    });
});
updateTpl.helpers({
    data: function () {
        var currentData = Template.currentData();
        return Dental.Collection.CashMap.findOne({_id: currentData.mapId});
    }
});

// Hook
AutoForm.hooks({
    dental_cashMapUpdate: {
        onSuccess: function (formType, result) {
            alertify.map().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
