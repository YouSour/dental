/************ Form *************/

Template.dental_closedSpecialRegisterListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_closedSpecialRegisterListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_closedSpecialRegisterList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
