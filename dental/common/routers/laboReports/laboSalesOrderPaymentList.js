Router.route('dental/laboSalesOrderPaymentListReport', function () {
    this.render('dental_laboSalesOrderPaymentListReport');
}, {
    name: 'dental.laboSalesOrderPaymentListReport',
    title: "Labo Sales Order Payment List Report",
    header: {title: 'Labo Sales Order Payment Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Labo Sales Order Payment Report', parent: 'dental.home'}
});

Router.route('dental/laboSalesOrderPaymentListReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a4',
            orientation: 'landscape',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_laboSalesOrderPaymentListReportGen', {
        data: function () {
            return q;
        }
    });
});
