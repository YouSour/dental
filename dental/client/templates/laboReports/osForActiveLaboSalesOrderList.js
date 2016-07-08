/************ Form *************/
Template.dental_osForActiveLaboSalesOrderReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_osForActiveLaboSalesOrderReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_osForActiveLaboSalesOrderReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_osForActiveLaboSalesOrderReportGen.helpers({
    data: function () {
        var callId = JSON.stringify(this);
        var call = Meteor.callAsync(callId, 'dental_osForActiveLaboSalesOrderReport', this);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
