Router.route('dental/activeRegisterListReport', function () {
    this.render('dental_activeRegisterListReport');
}, {
    name: 'dental.activeRegisterListReport',
    title: "Active Register List Report",
    header: {title: 'Active Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Active Register Report', parent: 'dental.home'}
});

Router.route('dental/activeRegisterListReportGen', function () {
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
    this.render('dental_activeRegisterListReportGen', {
        data: function () {
            return q;
        }
    });
});
