/**
 * Declare template
 */
var formTpl = Template.dental_cashBalanceReport,
    genTpl = Template.dental_cashBalanceReportGen;


formTpl.onCreated(function () {
    // subscribe
    var self = this;
    self.autorun(function () {
        self.subscribe('dental.cashCashierByBranch', Session.get('currentBranch'));
        self.subscribe('dental.exchange');
    });
});

/**
 * Generate
 */
genTpl.onCreated(function () {
    var self = this;
    self.dataState = new ReactiveVar();

    self.autorun(function () {
        var q = Template.currentData();
        Meteor.call('dental_cashBalanceReport', q, function (error, result) {
            if (!error) {
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
