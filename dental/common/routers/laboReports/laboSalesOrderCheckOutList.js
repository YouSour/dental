Router.route('dental/laboSalesOrderCheckOutListReport', function () {
    this.render('dental_laboSalesOrderCheckOutListReport');
}, {
    name: 'dental.laboSalesOrderCheckOutListReport',
    title: "Labo Sales Order By Status List Report",
    header: {title: 'Labo Sales Order By Status Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Labo Sales Order By Status Report', parent: 'dental.home'}
});

Router.route('dental/laboSalesOrderCheckOutListReportGen', function () {
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
    this.render('dental_laboSalesOrderCheckOutListReportGen', {
        data: function () {
            return q;
        }
    });
});
