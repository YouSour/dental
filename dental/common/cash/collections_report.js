/**
 * Cash Report Collections
 */

// Transaction
Dental.Schema.CashTransactionReport = new SimpleSchema({
    branchId: {
        type: String,
        label: 'Branch',
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.branch();
            }
        }
    },
    currencyId: {
        type: String,
        label: "Currency",
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.currencyForReport();
            }
        }
    },
    repDate: {
        type: [Date],
        label: 'Date',
        autoform: {
            type: "bootstrap-daterangepicker",
            afFieldInput: {
                dateRangePickerOptions: function () {
                    return dateRangePickerOptions;
                }
            }
        }
    },
    exchange: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.exchange();
            }
        }
    }
});

// Cash In/Out
Dental.Schema.CashInOutReport = new SimpleSchema({
    branchId: {
        type: String,
        label: 'Branch',
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.branch();
            }
        }
    },
    currencyId: {
        type: String,
        label: "Currency",
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.currencyForReport();
            }
        }
    },
    repDate: {
        type: [Date],
        label: 'Date',
        autoform: {
            type: "bootstrap-daterangepicker",
            afFieldInput: {
                dateRangePickerOptions: function () {
                    return dateRangePickerOptions;
                }
            }
        }
    },
    exchange: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.exchange();
            }
        }
    }
});

// Cash Chart Account
Dental.Schema.CashChartAccountReport = new SimpleSchema({
    cashType: {
        type: String,
        label: 'Cash type',
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.cashTypeForReport();
            }
        }
    }
});