Router.route('dental/osLaboMaterialReport', function () {
    this.render('dental_osLaboMaterialListReport');
}, {
    name: 'dental.osLaboMaterialListReport',
    title: "OS-Labo Material List Report",
    header: {title: 'OS-Labo Material Report', sub: '', icon: 'file-text-o'},
    breadcrumb: {title: 'OS-Labo Material Report', parent: 'dental.home'}
});

Router.route('dental/osLaboMaterialListReportGen', function () {
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
    this.render('dental_osLaboMaterialListReportGen', {
        data: function () {
            return q;
        }
    });
});
