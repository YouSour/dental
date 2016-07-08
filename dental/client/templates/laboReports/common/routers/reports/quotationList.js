Router.route('dental/quotationListReport', function () {
    this.render('dental_quotationListReport');
}, {
    name: 'dental.quotationListReport',
    title: "Quotation List Report",
    header: {title: 'Quotation Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Quotation Report', parent: 'dental.home'}
});

Router.route('dental/quotationListReportGen', function () {
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
    this.render('dental_quotationListReportGen', {
        data: function () {
            return q;
        }
    });
});
