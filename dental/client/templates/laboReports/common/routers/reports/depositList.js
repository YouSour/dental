Router.route('dental/depositListReport', function () {
    this.render('dental_depositListReport');
}, {
    name: 'dental.depositListReport',
    title: "Deposit List Report",
    header: {title: 'Deposit Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Deposit Report', parent: 'dental.home'}
});

Router.route('dental/depositListReportGen', function () {
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
    this.render('dental_depositListReportGen', {
        data: function () {
            return q;
        }
    });
});
