Router.route('dental/closedSpecialRegisterListReport', function () {
    this.render('dental_closedSpecialRegisterListReport');
}, {
    name: 'dental.closedSpecialRegisterListReport',
    title: "Closed Special Register List Report",
    header: {title: 'Closing Special Register Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Closing Special Register Report', parent: 'dental.home'}
});

Router.route('dental/closedSpecialRegisterListReportGen', function () {
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
    this.render('dental_closedSpecialRegisterListReportGen', {
        data: function () {
            return q;
        }
    });
});
