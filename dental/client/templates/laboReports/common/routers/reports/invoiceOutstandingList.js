Router.route('dental/invoiceOutstandingListReport', function () {
    this.render('dental_invoiceOutstandingListReport');
}, {
    name: 'dental.invoiceOutstandingListReport',
    title: "Invoice Outstanding List Report",
    header: {title: 'Invoice Outstanding Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Invoice Outstanding Report', parent: 'dental.home'}
});

Router.route('dental/invoiceOutstandingListReportGen', function () {
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
    this.render('dental_invoiceOutstandingListReportGen', {
        data: function () {
            return q;
        }
    });
});
