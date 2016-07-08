/************ Form *************/
Template.dental_laboSalesOrderPaymentListReport.onCreated(function () {
    Meteor.subscribe('dental_staff');
    createNewAlertify('exchange');
});

Template.dental_laboSalesOrderPaymentListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_laboSalesOrderPaymentListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_laboSalesOrderPaymentListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_salesOrderPaymentList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
