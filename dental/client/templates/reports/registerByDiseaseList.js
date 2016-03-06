/************ Form *************/
Template.dental_registerByDiseaseListReport.onRendered(function() {
  Meteor.subscribe('dental_diseaseItem');
  var name = $('[name="date"]');
  DateTimePicker.dateRange(name);
});

/************ Generate *************/
Template.dental_registerByDiseaseListReportGen.helpers({
  data: function() {
    var self = this;

    var callId = JSON.stringify(self);
    var call = Meteor.callAsync(callId,
      'dental_registerByDiseaseList', self);

    if (!call.ready()) {
      return false;
    }

    return call.result();
  }
});
