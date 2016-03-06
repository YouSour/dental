/************ Form *************/
Template.dental_purchaseListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_purchaseListReport.onRendered(function () {
    Meteor.subscribe('dental_supplier');
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_purchaseListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }

});

/************ Generate *************/
Template.dental_purchaseListReportGen.helpers({
    data: function () {
        var self = this;
        var callId = JSON.stringify(self);
        var call= Meteor.callAsync(callId,'dental_purchaseList',self);

        if(!call.ready()){
            return false;
        }

        return call.result();
    }
});
