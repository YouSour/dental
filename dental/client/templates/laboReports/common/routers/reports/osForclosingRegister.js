Router.route('dental/osForClosingRegisterReport', function () {
    this.render('dental_osForClosingRegisterReport');
}, {
    name: 'dental.osForClosingRegisterReport',
    title: "OS-Closing Register Report",
    header: {title: 'OS-Closing Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'OS-Closing Register Report', parent: 'dental.home'}
});

Router.route('dental/osForClosingRegisterReportGen', function () {
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
    this.render('dental_osForClosingRegisterReportGen', {
        data: function () {
            return q;
        }
    });
});
