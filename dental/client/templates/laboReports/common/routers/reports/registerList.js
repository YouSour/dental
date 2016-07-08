Router.route('dental/registerListReport', function () {
    this.render('dental_registerListReport');
}, {
    name: 'dental.registerListReport',
    title: "Register List Report",
    header: {title: 'Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Register Report', parent: 'dental.home'}
});

Router.route('dental/registerListReportGen', function () {
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
    this.render('dental_registerListReportGen', {
        data: function () {
            return q;
        }
    });
});
