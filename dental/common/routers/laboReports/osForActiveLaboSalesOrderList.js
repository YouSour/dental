Router.route('dental/osForActiveLaboSalesOrderReport', function () {
    this.render('dental_osForActiveLaboSalesOrderReport');
}, {
    name: 'dental.osForActiveLaboSalesOrderReport',
    title: "Active Sales Order Report",
    header: {title: 'Active Sales Order Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Active Sales Order Report', parent: 'dental.home'}
});

Router.route('dental/osForActiveLaboSalesOrderReportGen', function () {
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
    this.render('dental_osForActiveLaboSalesOrderReportGen', {
        data: function () {
            return q;
        }
    });
});
