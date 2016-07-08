Router.route('dental/laboSalesOrderPayment', function () {
    this.render('dental_laboSaleOrderPayment');
}, {
    name: 'dental.laboSalesOrderPayment',
    title: 'Laboratory Sales Order Payment',
    header: {title: 'Laboratory Sales Order Payment', sub: '', icon: "fa fa-credit-card"},
    breadcrumb: {title: 'Laboratory Sales Order Payment', parent: 'dental.laboSalesOrder'}
});
