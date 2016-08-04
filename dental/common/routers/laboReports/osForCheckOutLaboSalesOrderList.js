Router.route('dental/osForCheckOutLaboSalesOrderReport', function () {
    this.render('dental_osForCheckOutLaboSalesOrderReport');
}, {
    name: 'dental.osForCheckOutLaboSalesOrderReport',
    title: "Unpaid Sales Order Report",
    header: {title: 'Unpaid Sales Order Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Unpaid Sales Order Report', parent: 'dental.home'}
});

Router.route('dental/osForCheckOutLaboSalesOrderReportGen', function () {
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
    this.render('dental_osForCheckOutLaboSalesOrderReportGen', {
        data: function () {
            return q;
        }
    });
});
