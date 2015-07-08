Router.route('dental/quotationReport', function () {
    this.render('dental_quotationReport');
}, {
    name: 'dental.quotationReport',
    header: {title: 'Quotation Report', sub: '', icon: 'file-text-o'},
    title: "Quotation Report"
});

Router.route('dental/quotationReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a5',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_quotationReportGen', {
        data: function () {
            return q;
        }
    });
});
