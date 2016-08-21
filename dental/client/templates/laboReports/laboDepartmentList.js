/************ Form *************/

Template.dental_laboDepartmentListReport.onRendered(function () {
    Meteor.subscribe('dental_laboDepartment');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});


/************ Generate *************/
Template.dental_laboDepartmentListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_laboDepartmentList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
