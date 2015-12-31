/************ Form *************/

Template.dental_registerListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_registerListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_registerList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
