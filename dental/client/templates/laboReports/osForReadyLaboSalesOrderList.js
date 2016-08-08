/************ Form *************/
Template.dental_osForReadyLaboSalesOrderReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForReadyLaboSalesOrderReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForReadyLaboSalesOrderReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForReadyLaboSalesOrderReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForReadyLaboSalesOrderReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
