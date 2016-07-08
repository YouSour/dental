Router.route('dental/invoiceListReport', function () {
    this.render('dental_invoiceListReport');
}, {
    name: 'dental.invoiceListReport',
    title: "invoice Report",
    header: {title: 'Invoice Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Invoice  Report', parent: 'dental.home'}
});

Router.route('dental/invoiceListReportGen', function () {
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
    this.render('dental_invoiceListReportGen', {
        data: function () {
            return q;
        }
    });
});
