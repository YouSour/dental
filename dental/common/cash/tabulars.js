// Chart Account
Dental.TabularTable.CashChartAccount = new Tabular.Table({
    name: "dentalCashChartAccountList",
    collection: Dental.Collection.CashChartAccount,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_cashChartAccountAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "cashType", title: "Type"},
        {data: "memo", title: "Memo"},
    ]
});

// Cashier
Dental.TabularTable.CashCashier = new Tabular.Table({
    name: "dentalCashCashierList",
    collection: Dental.Collection.CashCashier,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_cashCashierAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "telephone", title: "En Address"},
        {data: "email", title: "Email"}
    ]
});

// Transaction
Dental.TabularTable.CashTransaction = new Tabular.Table({
    name: "dentalCashTransactionList",
    collection: Dental.Collection.CashTransaction,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_cashTransactionAction},
        // {data: "_id", title: "ID"},
        {
            data: "transactionDate",
            title: "Date",
            render: function (val, type, doc) {
                return moment(val).format('DD/MM/YYYY');
            }
        },
        {data: "cashType", title: "Type"},
        {data: "currencyId", title: "Currency"},
        {
            data: "totalAmount",
            title: "Total",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00');
            }
        },
        {data: "voucherId", title: "Voucher"},
        {data: "refFrom", title: "Ref From"}
    ],
    extraFields: ['_id']
});

// Map
Dental.TabularTable.CashMap = new Tabular.Table({
    name: "dentalCashMapList",
    collection: Dental.Collection.CashMap,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_cashMapAction},
        {data: "mapType", title: "Type"},
        {data: "_chartAccount.name", title: "Chart Acc"},
    ],
    extraFields: ['_id']
});
