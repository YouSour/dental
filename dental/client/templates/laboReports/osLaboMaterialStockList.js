/************ Form *************/
Dental.ListState = new ReactiveObj();

Template.dental_osLaboMaterialStockListReport.onRendered(function () {
    Meteor.subscribe('dental_laboMaterialCategory');
    Meteor.subscribe('dental_laboMaterial');
    Meteor.subscribe('dental_laboAverageStock');
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

/************ Generate *************/
Template.dental_osLaboMaterialStockListReportGen.helpers({
    data: function () {
        var self = this;

        var callId = JSON.stringify(self);
        var call = Meteor.callAsync(callId, 'dental_osLaboMaterialStockList', self);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});

Template.dental_osLaboMaterialStockListReport.events({
  'change .category':function (e) {
    var category = $(e.currentTarget).val();
    Dental.ListState.set('categoryVal',category);
  }
});
