Dental.ListForReportState = new ReactiveObj();

/************ Generate **** *********/
Template.dental_treatmentDescription.helpers({
  data: function() {
    var self = this;
    var callId = JSON.stringify(self);
    var call = Meteor.callAsync(callId, 'dental_treatmentDescription',
      self);

    if (!call.ready()) {
      return false;
    }

    return call.result();
  }
});
