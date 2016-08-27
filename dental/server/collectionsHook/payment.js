var mapType = 'Clinic Payment';

Dental.Collection.Payment.before.insert(function (userId, doc) {
    //doc.createdAt = new Date();

    if (doc.balance != 0) {
        doc.status = "Partial";
    } else {
        doc.status = "Close";
    }
});

Dental.Collection.Payment.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    //modifier.$set.updatedAt = new Date();

    if (modifier.$set.balance != 0) {
        modifier.$set.status = "Partial";
    } else {
        modifier.$set.status = "Close";
    }
});

// Map cash
Dental.Collection.Payment.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        // Map cash
        var map = Dental.Collection.CashMap.findOne({mapType: mapType});
        var cashData = {
            transactionDate: moment(doc.paymentDate, "YYYY-MM-DD HH:mm:ss").toDate(),
            cashType: 'In', // In, Out
            currencyId: 'USD', // KHR, USD, THB
            voucherId: '',
            memo: '',
            items: [
                {
                    chartAccountId: map.chartAccountId,
                    amount: doc.paidAmount
                },
            ],
            totalAmount: doc.paidAmount,
            refFrom: mapType,
            refId: doc._id,
            cpanel_branchId: doc.branchId
        };
        Meteor.call(
            'dental_cashTransactionInsert',
            cashData
        );
    });
});

Dental.Collection.Payment.after.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    Meteor.defer(function () {
        // Map cash
        var map = Dental.Collection.CashMap.findOne({mapType: mapType});
        var cashData = {
            transactionDate: moment(doc.paymentDate, "YYYY-MM-DD HH:mm:ss").toDate(),
            cashType: 'In', // In, Out
            currencyId: 'USD', // KHR, USD, THB
            voucherId: '',
            memo: '',
            items: [
                {
                    chartAccountId: map.chartAccountId,
                    amount: doc.paidAmount
                },
            ],
            totalAmount: doc.paidAmount,
            refFrom: mapType,
            refId: doc._id,
            cpanel_branchId: doc.branchId
        };
        Meteor.call(
            'dental_cashTransactionUpdate',
            cashData
        );

    });
});

Dental.Collection.Payment.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        // Map cash
        var cashData = {
            refFrom: mapType,
            refId: doc._id
        };
        Meteor.call(
            'dental_cashTransactionRemove',
            cashData
        );
    });
});
