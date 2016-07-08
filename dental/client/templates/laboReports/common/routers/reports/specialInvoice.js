//Router.route('dental/invoiceReport', function () {
//    this.render('dental_invoiceReport');
//}, {
//    name: 'dental.invoiceReport',
//    title: "Invoice Report",
//    header: {title: 'Invoice Report', sub: '', icon: 'file-text-o'},
//    breadcrumb: {title: 'Invoice Report', parent: 'dental.home'}
//});

Router.route('dental/specialInvoiceReportGen', function () {
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
    this.render('dental_specialInvoiceReportGen', {
        data: function () {
            return q;
        }
    });
}, {
    name: 'dental.specialInvoiceReportGen'
});
