var mapType = 'Labo Payment';

Dental.Collection.LaboSalesOrderPayment.before.insert(function (userId, doc) {
    if (doc.balance != 0) {
        doc.status = "Partial";
    } else {
        doc.status = "Close";

        var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id: doc.saleOrderId});
        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId}, {
            $set: {
                status: {
                    activeDate: salesOrderDoc.status.activeDate,
                    readyDate: salesOrderDoc.status.readyDate,
                    checkOutDate: salesOrderDoc.status.checkOutDate,
                    closingDate: doc.paymentDate
                }
            }
        });
    }
});

Dental.Collection.LaboSalesOrderPayment.before.update(function (userId, doc, fieldNames, modifier, options) {
    var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id: doc.saleOrderId});
    modifier.$set = modifier.$set || {};
    if (modifier.$set.balance != 0) {
        modifier.$set.status = "Partial";

        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId}, {
            $set: {
                status: {
                    activeDate: salesOrderDoc.status.activeDate,
                    readyDate: salesOrderDoc.status.readyDate,
                    checkOutDate: salesOrderDoc.status.checkOutDate,
                    closingDate: ""
                }
            }
        });
    } else {
        modifier.$set.status = "Close";
        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId}, {
            $set: {
                status: {
                    activeDate: salesOrderDoc.status.activeDate,
                    readyDate: salesOrderDoc.status.readyDate,
                    checkOutDate: salesOrderDoc.status.checkOutDate,
                    closingDate: doc.paymentDate
                }
            }
        });
    }
});

// Map cash
Dental.Collection.LaboSalesOrderPayment.after.insert(function (userId, doc) {
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

Dental.Collection.LaboSalesOrderPayment.after.update(function (userId, doc, fieldNames, modifier, options) {
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

Dental.Collection.LaboSalesOrderPayment.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id: doc.saleOrderId});
        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId}, {
            $set: {
                status: {
                    activeDate: salesOrderDoc.status.activeDate,
                    readyDate: salesOrderDoc.status.readyDate,
                    checkOutDate: salesOrderDoc.status.checkOutDate,
                    closingDate: ""
                }
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


    }); // end defer
});
