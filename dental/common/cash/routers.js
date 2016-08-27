/**
 * Cash
 */

// Chart Account
// dentalRoutes.route('/cash-chart-account', {
//     name: 'dental.cashChartAccount',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashChartAccount');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Chart Account',
//         parent: 'dental.home'
//     }
// });
Router.route('dental/cash-chart-account', function () {
    this.render('dental_cashChartAccount');
}, {
    name: 'dental.cashChartAccount',
    title: 'Cash Chart Account',
    header: {title: 'Cash Chart Account', sub: '', icon: "fa fa-money"},
    breadcrumb: {title: 'Cash ChartAccount', parent: 'dental.home'}
});

// Cashier
// dentalRoutes.route('/cash-cashier', {
//     name: 'dental.cashCashier',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashCashier');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cashier',
//         parent: 'dental.home'
//     }
// });
Router.route('dental/cash-cashier', function () {
    this.render('dental_cashCashier');
}, {
    name: 'dental.cashCashier',
    title: 'Cash Cashier',
    header: {title: 'Cash Cashier', sub: '', icon: "fa fa-money"},
    breadcrumb: {title: 'Cash Cashier', parent: 'dental.home'}
});

// Transaction
// dentalRoutes.route('/cash-transaction', {
//     name: 'dental.cashTransaction',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashTransaction');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Transaction',
//         parent: 'dental.home'
//     }
// });
Router.route('dental/cash-transaction', function () {
    this.render('dental_cashTransaction');
}, {
    name: 'dental.cashTransaction',
    title: 'Cash Transaction',
    header: {title: 'Cash Transaction', sub: '', icon: "fa fa-money"},
    breadcrumb: {title: 'Cash Transaction', parent: 'dental.home'}
});


// Map
// dentalRoutes.route('/cash-map', {
//     name: 'dental.cashMap',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashMap');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Map',
//         parent: 'dental.home'
//     }
// });
Router.route('dental/cash-map', function () {
    this.render('dental_cashMap');
}, {
    name: 'dental.cashMap',
    title: 'Cash Map',
    header: {title: 'Cash Map', sub: '', icon: "fa fa-money"},
    breadcrumb: {title: 'Cash Map', parent: 'dental.home'}
});

// Transaction Report
// dentalRoutes.route('/cash-transaction-report', {
//     name: 'dental.cashTransactionReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashTransactionReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Transaction Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-transaction-reportGen', {
//     name: 'dental.cashTransactionReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashTransactionReportGen');
//     }
// });
Router.route('dental/transaction-report', function () {
    this.render('dental_cashTransactionReport');
}, {
    name: 'dental.cashTransactionReport',
    title: "Cash Transaction Report",
    header: {title: 'Cash Transaction Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash Transaction Report', parent: 'dental.home'}
});

Router.route('dental/transaction-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashTransactionReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashTransactionReportGen'
});

// Cash In Report
// dentalRoutes.route('/cash-in-report', {
//     name: 'dental.cashInReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashInReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cash In Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-in-reportGen', {
//     name: 'dental.cashInReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashInReportGen');
//     }
// });
Router.route('dental/cash-in-report', function () {
    this.render('dental_cashInReport');
}, {
    name: 'dental.cashInReport',
    title: "Cash In Report",
    header: {title: 'Cash In Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash In Report', parent: 'dental.home'}
});

Router.route('dental/cash-in-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashInReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashInReportGen'
});

// Cash Out Report
// dentalRoutes.route('/cash-out-report', {
//     name: 'dental.cashOutReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashOutReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cash Out Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-out-reportGen', {
//     name: 'dental.cashOutReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashOutReportGen');
//     }
// });
Router.route('dental/cash-out-report', function () {
    this.render('dental_cashOutReport');
}, {
    name: 'dental.cashOutReport',
    title: "Cash Out Report",
    header: {title: 'Cash Out Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash Out Report', parent: 'dental.home'}
});

Router.route('dental/cash-out-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashOutReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashOutReportGen'
});

// Cash balance Report
// dentalRoutes.route('/cash-balance-report', {
//     name: 'dental.cashBalanceReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashBalanceReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cash Balance Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-balance-reportGen', {
//     name: 'dental.cashBalanceReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashBalanceReportGen');
//     }
// });
Router.route('dental/cash-balance-report', function () {
    this.render('dental_cashBalanceReport');
}, {
    name: 'dental.cashBalanceReport',
    title: "Cash Balance Report",
    header: {title: 'Cash Balance Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash Balance Report', parent: 'dental.home'}
});

Router.route('dental/cash-balance-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashBalanceReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashBalanceReportGen'
});

// Cash Flow Report
// dentalRoutes.route('/cash-flow-report', {
//     name: 'dental.cashFlowReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashFlowReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cash Flow Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-flow-reportGen', {
//     name: 'dental.cashFlowReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashFlowReportGen');
//     }
// });
Router.route('dental/cash-flow-report', function () {
    this.render('dental_cashFlowReport');
}, {
    name: 'dental.cashFlowReport',
    title: "Cash Flow Report",
    header: {title: 'Cash Flow Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash Flow Report', parent: 'dental.home'}
});

Router.route('dental/cash-flow-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashFlowReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashFlowReportGen'
});

// Cash Chart Account Report
// dentalRoutes.route('/cash-chart-account-report', {
//     name: 'dental.cashChartAccountReport',
//     action: function (params, queryParams) {
//         Layout.main('dental_cashChartAccountReport');
//     },
//     breadcrumb: {
//         //params: ['id'],
//         //queryParams: ['show', 'color'],
//         title: 'Cash Chart Account Report',
//         parent: 'dental.home'
//     }
// });
//
// dentalRoutes.route('/cash-chart-account-reportGen', {
//     name: 'dental.cashChartAccountReportGen',
//     action: function (params, queryParams) {
//         Layout.report('dental_cashChartAccountReportGen');
//     }
// });
Router.route('dental/cash-chart-account-report', function () {
    this.render('dental_cashChartAccountReport');
}, {
    name: 'dental.cashChartAccountReport',
    title: "Cash Chart Account Report",
    header: {title: 'Cash Chart Account Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Cash Chart Account Report', parent: 'dental.home'}
});

Router.route('dental/cash-chart-account-reportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_cashChartAccountReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.cashChartAccountReportGen'
});
