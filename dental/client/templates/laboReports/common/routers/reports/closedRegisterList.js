Router.route('dental/closedRegisterListReport', function () {
    this.render('dental_closedRegisterListReport');
}, {
    name: 'dental.closedRegisterListReport',
    title: "Closed Register List Report",
    header: {title: 'Closing Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Closing Register Report', parent: 'dental.home'}
});

Router.route('dental/closedRegisterListReportGen', function () {
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
    this.render('dental_closedRegisterListReportGen', {
        data: function () {
            return q;
        }
    });
});
