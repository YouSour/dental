/**
 * Security
 */
Security.defineMethod("dental_ifCashSetting", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['cash-setting'], 'Dental');
    }
});
Security.defineMethod("dental_ifCashInsert", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['cash-insert'], 'Dental');
    }
});
Security.defineMethod("dental_ifCashUpdate", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['cash-update'], 'Dental');
    }
});
Security.defineMethod("dental_ifCashRemove", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['cash-remove'], 'Dental');
    }
});
Security.defineMethod("dental_ifCashReport", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['cash-report'], 'Dental');
    }
});
//--------------------------------------------------


// Chart Account
Dental.Collection.CashChartAccount.permit(['insert', 'update', 'remove'])
    .dental_ifCashSetting()
    .apply();

// Cash Map
Dental.Collection.CashMap.permit(['insert', 'update', 'remove'])
    .dental_ifCashSetting()
    .apply();

// Cashier
Dental.Collection.CashCashier.permit(['insert'])
    .dental_ifCashInsert()
    .apply();

Dental.Collection.CashCashier.permit(['update'])
    .dental_ifCashUpdate()
    .apply();

Dental.Collection.CashCashier.permit(['remove'])
    .dental_ifCashRemove()
    .apply();

// Transaction
Dental.Collection.CashTransaction.permit(['insert'])
    .dental_ifCashInsert()
    .apply();

Dental.Collection.CashTransaction.permit(['update'])
    .dental_ifCashUpdate()
    .apply();

Dental.Collection.CashTransaction.permit(['remove'])
    .dental_ifCashRemove()
    .apply();
