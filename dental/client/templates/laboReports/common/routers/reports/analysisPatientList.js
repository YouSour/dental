Router.route('dental/analysisPatientListReport', function () {
    this.render('dental_analysisPatientListReport');
}, {
    name: 'dental.analysisPatientListReport',
    title: "Analysis Patient List Report",
    header: {title: 'Analysis Patient Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Analysis Patient Report', parent: 'dental.home'}
});

Router.route('dental/analysisPatientListReportGen', function () {
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
    this.render('dental_analysisPatientListReportGen', {
        data: function () {
            return q;
        }
    });
});
