var mapType = 'Clinic Special Payment';

Dental.Collection.SpecialPayment.before.insert(function (userId, doc) {
    if (doc.balance == 0) {
        doc.status = "Close";
    }
});

Dental.Collection.SpecialPayment.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        updateSpecialRegister(doc);

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

Dental.Collection.SpecialPayment.before.update(function (userId, doc, fieldNames,
                                                         modifier, options) {
    modifier.$set = modifier.$set || {};

    if (modifier.$set.balance == 0) {
        modifier.$set.status = "Close";
    }
});

Dental.Collection.SpecialPayment.after.update(function (userId, doc, fieldNames, modifier, options) {
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

Dental.Collection.SpecialPayment.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        Dental.Collection.SpecialRegister.direct.update({
            _id: doc.specialRegisterId
        }, {
            $set: {
                status: "Active",
                closingDate: doc._specialRegister.registerDate
            }
        });

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

var updateSpecialRegister = function (doc) {
    if (doc.paymentMethod == doc._specialRegister.paymentMethod.length) {
        Dental.Collection.SpecialRegister.direct.update({
            _id: doc.specialRegisterId
        }, {
            $set: {
                status: "Close",
                closingDate: doc.paymentDate
            }
        });
    }
};
