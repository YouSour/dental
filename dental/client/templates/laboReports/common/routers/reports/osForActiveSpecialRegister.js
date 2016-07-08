Router.route('dental/osForActiveSpecialRegisterReport', function () {
    this.render('dental_osForActiveSpecialRegisterReport');
}, {
    name: 'dental.osForActiveSpecialRegisterReport',
    title: "OS-Active Special Register Report",
    header: {title: 'OS-Active Special Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'OS-Active Special Register Report', parent: 'dental.home'}
});

Router.route('dental/osForActiveSpecialRegisterReportGen', function () {
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
    this.render('dental_osForActiveSpecialRegisterReportGen', {
        data: function () {
            return q;
        }
    });
});
