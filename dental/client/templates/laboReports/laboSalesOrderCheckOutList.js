/************ Form *************/

Template.dental_laboSalesOrderCheckOutListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_laboSalesOrderCheckOutListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboSalesOrderCheckOutList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
