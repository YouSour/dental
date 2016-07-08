/************ Form *************/
Template.dental_osForCheckOutLaboSalesOrderReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForCheckOutLaboSalesOrderReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForCheckOutLaboSalesOrderReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForCheckOutLaboSalesOrderReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForCheckOutLaboSalesOrderReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
