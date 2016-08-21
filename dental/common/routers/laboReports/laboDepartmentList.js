Router.route('dental/laboDepartmentListReport', function () {
    this.render('dental_laboDepartmentListReport');
}, {
    name: 'dental.laboDepartmentListReport',
    title: "Labo Department List Report",
    header: {title: 'Labo Department Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Labo Department Report', parent: 'dental.home'}
});

Router.route('dental/laboDepartmentListReportGen', function () {
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
    this.render('dental_laboDepartmentListReportGen', {
        data: function () {
            return q;
        }
    });
});
