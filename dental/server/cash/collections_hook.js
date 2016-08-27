/**
 * Cash hook
 */

// Chart Account
Dental.Collection.CashChartAccount.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Dental.Collection.CashChartAccount, 4);
});

// Cashier
Dental.Collection.CashCashier.before.insert(function (userId, doc) {
    var prefix = doc.cpanel_branchId + '-';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.CashCashier, prefix, 3);
});

// Transaction
Dental.Collection.CashTransaction.before.insert(function (userId, doc) {
    var prefix = doc.cpanel_branchId + '-';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.CashTransaction, prefix, 12);

    // Check null item
    var items = [];
    _.forEach(doc.items, function (val) {
        if (!_.isNull(val)) {
            // Find chart account
            val.chartAccountDoc = Dental.Collection.CashChartAccount.findOne({_id: val.chartAccountId});
            items.push(val);
        }
    });
    doc.items = items;
});

Dental.Collection.CashTransaction.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    // Check null item
    var items = [];
    _.forEach(modifier.$set.items, function (val) {
        if (!_.isNull(val)) {
            // Find chart account
            val.chartAccountDoc = Dental.Collection.CashChartAccount.findOne({_id: val.chartAccountId});
            items.push(val);
        }
    });
    modifier.$set.items = items;
});
