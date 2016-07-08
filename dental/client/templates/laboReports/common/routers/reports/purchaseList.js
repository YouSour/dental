Router.route('dental/purchaseListReport', function () {
    this.render('dental_purchaseListReport');
}, {
    name: 'dental.purchaseListReport',
    title: "Purchase List Report",
    header: {title: 'Purchase Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'purchase Report', parent: 'dental.home'}
});

Router.route('dental/purchaseListReportGen', function () {
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
    this.render('dental_purchaseListReportGen', {
        data: function () {
            return q;
        }
    });
});
