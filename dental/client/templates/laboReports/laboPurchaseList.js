/************ Form *************/

Template.dental_laboPurchaseListReport.onRendered(function () {
    Meteor.subscribe('dental_laboSupplier');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_laboPurchaseListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboPurchaseList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
