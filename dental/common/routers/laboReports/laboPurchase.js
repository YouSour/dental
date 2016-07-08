Router.route('dental/laboPurchaseReportGen', function () {
    // Config layout
    this.layout('reportLayout', {
        // Page size: a4, a5, mini
        // Orientation: portrait, landscape
        // Font size: fontBody: undefined (10px), bg (12px)
        data: {
            pageSize: 'a5',
            orientation: 'portrait',
            fontBody: 'bg'
        }
    });

    var q = this.params.query;
    this.render('dental_laboPurchaseReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.laboPurchaseReportGen'
});
