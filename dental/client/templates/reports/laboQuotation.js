/************ Generate *************/
Template.dental_laboQuotationReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboQuotation', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();

    }
});
