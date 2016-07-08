Router.route('dental/diseaseListReport', function () {
    this.render('dental_diseaseListReport');
}, {
    name: 'dental.diseaseListReport',
    title: "Disease List Report",
    header: {title: 'Disease Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Disease Report', parent: 'dental.home'}
});

Router.route('dental/diseaseListReportGen', function () {
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
    this.render('dental_diseaseListReportGen', {
        data: function () {
            return q;
        }
    });
});
