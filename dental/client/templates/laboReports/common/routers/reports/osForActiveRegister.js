Router.route('dental/osForActiveRegisterReport', function () {
    this.render('dental_osForActiveRegisterReport');
}, {
    name: 'dental.osForActiveRegisterReport',
    title: "OS-Active Register Report",
    header: {title: 'OS-Active Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'OS-Active Register Report', parent: 'dental.home'}
});

Router.route('dental/osForActiveRegisterReportGen', function () {
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
    this.render('dental_osForActiveRegisterReportGen', {
        data: function () {
            return q;
        }
    });
});
