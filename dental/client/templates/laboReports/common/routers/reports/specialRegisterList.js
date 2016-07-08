Router.route('dental/specialRegisterListReport', function () {
    this.render('dental_specialRegisterListReport');
}, {
    name: 'dental.specialRegisterListReport',
    title: "Special Register List Report",
    header: {title: 'Special Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Special Register Report', parent: 'dental.home'}
});

Router.route('dental/specialRegisterListReportGen', function () {
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
    this.render('dental_specialRegisterListReportGen', {
        data: function () {
            return q;
        }
    });
});
