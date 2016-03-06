/************ Form *************/
Template.dental_paymentListReport.onCreated(function () {
    Meteor.subscribe('dental_staff');
    createNewAlertify('exchange');
});

Template.dental_paymentListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_paymentListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_paymentListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_paymentList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
