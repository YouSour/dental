/**
 * Declare template
 */
var formTpl = Template.dental_cashChartAccountReport,
    genTpl = Template.dental_cashChartAccountReportGen;


/**
 * Generate
 */
genTpl.onCreated(function () {
    var self = this;
    self.dataState = new ReactiveVar();

    self.autorun(function () {
        var q = Template.currentData();
        Meteor.call('dental_cashChartAccountReport', q, function (error, result) {
            if (!error) {
                console.log(result);

                self.dataState.set(result);
            }
        })
    });
});

genTpl.helpers({
    data: function () {
        var instance = Template.instance();
        return instance.dataState.get();
    },
    No: function (index) {
        return index + 1;
    }
});
