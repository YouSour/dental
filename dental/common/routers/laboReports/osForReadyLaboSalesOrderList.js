Router.route('dental/osForReadyLaboSalesOrderReport', function () {
    this.render('dental_osForReadyLaboSalesOrderReport');
}, {
    name: 'dental.osForReadyLaboSalesOrderReport',
    title: "Ready Sales Order Report",
    header: {title: 'Ready Sales Order Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Ready Sales Order Report', parent: 'dental.home'}
});

Router.route('dental/osForReadyLaboSalesOrderReportGen', function () {
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
    this.render('dental_osForReadyLaboSalesOrderReportGen', {
        data: function () {
            return q;
        }
    });
});
