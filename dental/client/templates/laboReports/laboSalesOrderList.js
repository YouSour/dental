/************ Form *************/

Template.dental_laboSalesOrderListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_laboSalesOrderListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboSalesOrderList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
