/************ Form *************/
Template.dental_appointmentListReport.onRendered(function () {
    Meteor.subscribe('dental_doctor');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

/************ Generate *************/
Template.dental_appointmentListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_appointmentList', self);

        if (!call.ready()) {
            return false;
        }
        return call.result();

    }

});
