/************ Form *************/
Template.dental_materialCostListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_materialCostListReport.onRendered(function () {
    Meteor.subscribe('dental_doctor');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_materialCostListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_materialCostListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_materialCostList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
