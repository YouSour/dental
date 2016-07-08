Router.route('dental/laboPurchaseListReport', function () {
    this.render('dental_laboPurchaseListReport');
}, {
    name: 'dental.laboPurchaseListReport',
    title: "Labo Purchase List Report",
    header: {title: 'Labo Purchase Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Labo Purchase Report', parent: 'dental.home'}
});

Router.route('dental/laboPurchaseListReportGen', function () {
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
    this.render('dental_laboPurchaseListReportGen', {
        data: function () {
            return q;
        }
    });
});
