Router.route('dental/osLaboMaterialStockReport', function () {
    this.render('dental_osLaboMaterialStockListReport');
}, {
    name: 'dental.osLaboMaterialStockListReport',
    title: "OS-Labo Material Stock List Report",
    header: {title: 'OS-Labo Material Stock Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'OS-Labo Material Stock Report', parent: 'dental.home'}
});

Router.route('dental/osLaboMaterialStockListReportGen', function () {
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
    this.render('dental_osLaboMaterialStockListReportGen', {
        data: function () {
            return q;
        }
    });
});
