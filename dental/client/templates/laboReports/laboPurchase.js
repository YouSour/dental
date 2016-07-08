/************ Generate *************/
Template.dental_laboPurchaseReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboPurchase', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
