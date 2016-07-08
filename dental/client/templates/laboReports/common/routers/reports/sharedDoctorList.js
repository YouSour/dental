Router.route('dental/sharedDoctorListReport', function () {
    this.render('dental_sharedDoctorListReport');
}, {
    name: 'dental.sharedDoctorListReport',
    title: "Shared Doctor List Report",
    header: {title: 'Shared Doctor Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Shared Doctor Report', parent: 'dental.home'}
});

Router.route('dental/sharedDoctorListReportGen', function () {
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
    this.render('dental_sharedDoctorListReportGen', {
        data: function () {
            return q;
        }
    });
});
