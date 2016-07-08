Router.route('dental/laboSalesOrderListReport', function () {
    this.render('dental_laboSalesOrderListReport');
}, {
    name: 'dental.laboSalesOrderListReport',
    title: "Labo Sales Order List Report",
    header: {title: 'Labo Sales Order Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Labo Sales Order Report', parent: 'dental.home'}
});

Router.route('dental/laboSalesOrderListReportGen', function () {
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
    this.render('dental_laboSalesOrderListReportGen', {
        data: function () {
            return q;
        }
    });
});
