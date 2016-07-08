Router.route('dental/paymentListReport', function () {
    this.render('dental_paymentListReport');
}, {
    name: 'dental.paymentListReport',
    title: "Payment List Report",
    header: {title: 'Payment Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Payment Report', parent: 'dental.home'}
});

Router.route('dental/paymentListReportGen', function () {
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
    this.render('dental_paymentListReportGen', {
        data: function () {
            return q;
        }
    });
});
