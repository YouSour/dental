/**
 * Cash Collection Cash
 */

// Cashier
Dental.Collection.CashCashier.cacheCount(
    'transactionCount',
    Dental.Collection.CashTransaction,
    'cashierId'
);

// Transaction
Dental.Collection.CashTransaction.cacheDoc(
    'cashier',
    Dental.Collection.CashCashier,
    ['name', 'gender', 'dob', 'address', 'telephone']
);

// Map
Dental.Collection.CashMap.cacheDoc(
    'chartAccount',
    Dental.Collection.CashChartAccount,
    ['name', 'cashType']
);
