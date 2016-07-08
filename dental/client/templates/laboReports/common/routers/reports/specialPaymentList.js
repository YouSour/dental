Router.route('dental/specialPaymentListReport', function () {
    this.render('dental_specialPaymentListReport');
}, {
    name: 'dental.specialPaymentListReport',
    title: "Special Payment List Report",
    header: {title: 'Special Payment Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Special Payment Report', parent: 'dental.home'}
});

Router.route('dental/specialPaymentListReportGen', function () {
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
    this.render('dental_specialPaymentListReportGen', {
        data: function () {
            return q;
        }
    });
});
