// Cash Methods for transaction
Meteor.methods({
    dental_cashTransactionInsert: function (data) {
        _.defaults(data, {
            transactionDate: moment().toDate(),
            cashType: 'In', // In, Out
            currencyId: 'KHR', // KHR, USD, THB
            voucherId: '000001', // Optional
            memo: '', // Optional
            items: [
                {
                    chartAccountId: '0003',
                    amount: 10000
                },
                {
                    chartAccountId: '0004',
                    amount: 10000
                }
            ],
            totalAmount: 20000,
            refFrom: 'Dental',// Optional
            refId: '001-000001',// Optional
            cpanel_branchId: '001'
        });

        return Dental.Collection.CashTransaction.insert(data);
    },
    dental_cashTransactionUpdate: function (data) {
        _.defaults(data, {
            transactionDate: moment().toDate(),
            cashType: 'In', // In, Out
            currencyId: 'KHR', // KHR, USD, THB
            voucherId: '000001', // Optional
            memo: '', // Optional
            items: [
                {
                    chartAccountId: '0003',
                    amount: 10000
                },
                {
                    chartAccountId: '0004',
                    amount: 10000
                }
            ],
            totalAmount: 20000,
            refFrom: 'Dental',// Optional
            refId: '001-000001',// Optional
            cpanel_branchId: '001'
        });

        return Dental.Collection.CashTransaction.update(
            {refFrom: data.refFrom, refId: data.refId},
            {$set: data}
        );
    },
    dental_cashTransactionRemove: function (data) {
        _.defaults(data, {
            refFrom: 'My Ref',
            refId: '001-000001'
        });

        return Dental.Collection.CashTransaction.remove(
            {refFrom: data.refFrom, refId: data.refId}
        );
    }
});

