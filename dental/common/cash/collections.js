/**
 * Cash Collections
 */

// Chart Account
Dental.Collection.CashChartAccount = new Mongo.Collection("dental_cashChartAccount");

Dental.Schema.CashChartAccount = new SimpleSchema({
    cashType: {
        type: String,
        label: 'Cash type',
        defaultValue: 'In',
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return Dental.CashList.cashType();
            }
        }
    },
    name: {
        type: String,
        label: 'Name',
        unique: true,
        max: 250
    },
    memo: {
        type: String,
        label: 'Memo',
        optional: true,
        autoform: {
            afFieldInput: {
                rows: 3
            }
        }
    },
});

Dental.Collection.CashChartAccount.attachSchema(Dental.Schema.CashChartAccount);

// Cashier
Dental.Collection.CashCashier = new Mongo.Collection("dental_cashCashier");

Dental.Schema.CashCashier = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 250
    },
    gender: {
        type: String,
        label: 'Gender',
        defaultValue: 'M',
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return Dental.CashList.gender();
            }
        }
    },
    dob: {
        type: Date,
        label: "Date of Birth",
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    address: {
        type: String,
        label: 'Address',
        max: 500,
        optional: true
    },
    telephone: {
        type: String,
        label: 'Telephone',
        max: 100,
        optional: true
    },
    photo: {
        type: String,
        label: 'Photo',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        }
    },
    cpanel_branchId: {
        type: String
    }
});

Dental.Collection.CashCashier.attachSchema(Dental.Schema.CashCashier);

// Transaction
Dental.Collection.CashTransaction = new Mongo.Collection("dental_cashTransaction");

Dental.Schema.CashTransactionAccountType = new SimpleSchema({
    cashType: {
        type: String,
        label: "Cash type",
        autoform: {
            type: "select",
            options: function () {
                return Dental.CashList.cashType(true, true);
            }
        }
    },
});

Dental.Schema.CashTransaction = new SimpleSchema({
    transactionDate: {
        type: Date,
        label: "Transaction Date",
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    cashType: {
        type: String,
        label: "Cash type",
        defaultValue: function () {
            if (Meteor.isClient) {
                return Session.get('cashType');
            }
        }
    },
    currencyId: {
        type: String,
        label: "Currency",
        defaultValue: 'KHR',
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return Dental.CashList.currency();
            }
        }
    },
    voucherId: {
        type: String,
        label: "Voucher",
        optional: true
    },
    cashierId: {
        type: String,
        label: "Cashier",
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.CashList.cashier();
            }
        }
    },
    memo: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            type: "textarea"
        }
    },
    items: {
        type: Array,
        label: 'Items',
        minCount: 1
    },
    'items.$': {
        type: Object
    },
    'items.$.chartAccountId': {
        type: String,
        label: "Chart account",
        autoform: {
            type: 'selectize',
            options: function () {
                return Dental.CashList.chartAccount();
            }
        }
    },
    'items.$.amount': {
        type: Number,
        label: 'Amount',
        decimal: true,
        min: 0.01,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: ''});
            }
        }
    },
    totalAmount: {
        type: Number,
        label: 'Total',
        decimal: true,
        min: 0.01,
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: ''});
            }
        }
    },
    refFrom: {
        type: String,
        optional: true
    },
    refId: {
        type: String,
        optional: true
    },
    cpanel_branchId: {
        type: String
    }
});

Dental.Collection.CashTransaction.attachSchema(Dental.Schema.CashTransaction);

// Map Cash (Chart Account)
Dental.Collection.CashMap = new Mongo.Collection("dental_cashMap");


Dental.Schema.CashMap = new SimpleSchema({
    mapType: {
        type: String,
        label: "Map type"
    },
    chartAccountId: {
        type: String,
        label: "Chart account",
        optional: true,
        autoform: {
            type: 'selectize',
            options: function () {
                return Dental.CashList.chartAccountForMap();
            }
        }
    }
});

Dental.Collection.CashMap.attachSchema(Dental.Schema.CashMap);
