/**
 * Cash
 */

// Chart Account
Meteor.publish('dental.cashChartAccountById', function (chartAccountId) {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashChartAccount.find({_id: chartAccountId});
    } else {
        return [];
    }
});
Meteor.publish('dental.cashChartAccount', function () {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashChartAccount.find();
    } else {
        return [];
    }
});

// Cashier
Meteor.publish('dental.cashCashierById', function (cashierId) {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashCashier.find({_id: cashierId});
    } else {
        return [];
    }
});
Meteor.publish('dental.cashCashierByBranch', function (branchId) {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashCashier.find({cpanel_branchId: branchId});
    } else {
        return [];
    }
});

// Transaction
Meteor.publish('dental.cashTransactionById', function (transactionId) {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashTransaction.find({_id: transactionId});
    } else {
        return [];
    }
});

// Cash Map
Meteor.publish('dental.cashMapById', function (mapId) {
    if (this.userId) {
        Meteor._sleepForMs(200);

        return Dental.Collection.CashMap.find({_id: mapId});
    } else {
        return [];
    }
});
