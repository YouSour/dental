/************ Form *************/
Dental.ListState = new ReactiveObj();

Template.dental_osLaboMaterialListReport.onRendered(function () {
    Meteor.subscribe('dental_laboMaterialCategory');
    Meteor.subscribe('dental_laboMaterial');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

/************ Generate *************/
Template.dental_osLaboMaterialListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_osLaboMaterialList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});

Template.dental_osLaboMaterialListReport.events({
  'change .category':function (e) {
    var category = $(e.currentTarget).val();
    Dental.ListState.set('categoryVal',category);
  }
});
