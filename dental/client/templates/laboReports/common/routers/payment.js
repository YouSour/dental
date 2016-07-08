Router.route('dental/payment', function () {
    this.render('dental_payment');
}, {
    name: 'dental.payment',
    title: 'Payment',
    header: {title: 'payment', sub: '', icon: "fa fa-credit-card"},
    breadcrumb: {title: 'Payment', parent: 'dental.register'}
});
