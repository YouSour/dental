Router.route('dental/depositReport', function () {
    this.render('dental_depositReport');
}, {
    name: 'dental.depositReport',
    title: "Deposit Report",
    header: {title: 'Deposit Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Deposit Report', parent: 'dental.home'}
});

Router.route('dental/depositReportGen', function () {
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
    this.render('dental_depositReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.depositReportGen'
});
