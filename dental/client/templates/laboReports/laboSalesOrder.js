/************ Generate *************/
Template.dental_laboSalesOrderReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboSalesOrder', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
