/**
 * Cash Report Collections
 */

// Transaction
Dental.Schema.CashTransactionReport = new SimpleSchema({
    branchId: {
        type: [String],
        label: 'Branch',
        autoform: {
            type: "select2",
            multiple: true,
            options: function () {
                return Dental.CashList.branchRpt();
            }
        },
        defaultValue:"All"
    },
    currencyId: {
        type: [String],
        label: "Currency",
        autoform: {
            type: "select2",
            multiple: true,
            options: function () {
                return Dental.CashList.currencyRpt();
            }
        },
        defaultValue:"All"
    },
    // cashierId: {
    //     type: [String],
    //     label: "Cashier",
    //     optional: true,
    //     autoform: {
    //         type: "select2",
    //         multiple: true,
    //         options: function () {
    //             return Dental.CashList.cashier();
    //         }
    //     }
    // },
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
        type: [String],
        label: 'Branch',
        autoform: {
            type: "select2",
            multiple: true,
            options: function () {
                return Dental.CashList.branchRpt();
            }
        }
    },
    currencyId: {
        type: [String],
        label: "Currency",
        autoform: {
            type: "select2",
            multiple: true,
            options: function () {
                return Dental.CashList.currencyRpt();
            }
        }
    },
    // cashierId: {
    //     type: [String],
    //     label: "Cashier",
    //     optional: true,
    //     autoform: {
    //         type: "select2",
    //         multiple: true,
    //         options: function () {
    //             return Dental.CashList.cashier();
    //         }
    //     }
    // },
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
        type: [String],
        label: 'Cash type',
        autoform: {
            type: "select2",
            multiple: true,
            options: function () {
                return Dental.CashList.cashType(false, true);
            }
        }
    }
});
