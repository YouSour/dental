/************ Form *************/
Template.dental_specialPaymentListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_specialPaymentListReport.onRendered(function () {
    Meteor.subscribe('dental_staff');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_specialPaymentListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_specialPaymentListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_specialPaymentList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
