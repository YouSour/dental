Dental.ListForReportState = new ReactiveObj();
/************ Generate *************/
Template.dental_specialTreatmentReportGen.helpers({
  data: function() {
    var self = this;
    var callId = JSON.stringify(self);
    var call = Meteor.callAsync(callId, 'dental_specialTreatment', self);

    if (!call.ready()) {
      return false;
    }

    return call.result();
  }
});
