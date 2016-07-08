//Router.route('dental/materialCostReport', function () {
//    this.render('dental_materialCostReport');
//}, {
//    name: 'dental.materialCostReport',
//    title: "materialCost Report",
//    header: {title: 'Quotation Report', sub: '', icon: 'file-text-o'},
//    breadcrumb: {title: 'Quotation Report', parent: 'dental.home'}
//});

Router.route('dental/purchaseReportGen', function () {
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
    this.render('dental_purchaseReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.purchaseReportGen'
});
