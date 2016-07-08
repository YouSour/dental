Router.route('dental/quotation', function () {
        this.render('dental_quotation');
    }, {
        name: 'dental.quotation',
        title: 'Quotation',
        header: {title: 'quotation', sub: '', icon: 'list'},
        breadcrumb: {title: 'Quotation', parent: 'dental.home'}
    }
);