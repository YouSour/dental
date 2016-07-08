Router.route('dental/materialCostListReport', function () {
    this.render('dental_materialCostListReport');
}, {
    name: 'dental.materialCostListReport',
    title: "Material Cost List Report",
    header: {title: 'Material Cost Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'Material Cost Report', parent: 'dental.home'}
});

Router.route('dental/materialCostListReportGen', function () {
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
    this.render('dental_materialCostListReportGen', {
        data: function () {
            return q;
        }
    });
});
