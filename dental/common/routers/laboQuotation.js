Router.route('dental/laboQuotation', function () {
        this.render('dental_laboQuotation');
    }, {
        name: 'dental.laboQuotation',
        title: 'Laboratory Quotation',
        header: {title: 'Laboratory Quotation', sub: '', icon: 'list'},
        breadcrumb: {title: 'Laboratory Quotation', parent: 'dental.home'}
    }
);
