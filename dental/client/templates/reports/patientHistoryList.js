/************ Form *************/
Template.dental_patientHistoryListReport.onRendered(function () {
  Meteor.subscribe('dental_patient');
});

/************ Generate *************/
Template.dental_patientHistoryListReportGen.helpers({
  data: function() {
    var self = this;

    var callId = JSON.stringify(self);
    var call = Meteor.callAsync(callId,
      'dental_patientHistoryList', self);

    if (!call.ready()) {
      return false;
    }

    return call.result();
  }
});
