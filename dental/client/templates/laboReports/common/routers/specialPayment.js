Router.route('dental/specialPayment', function () {
    this.render('dental_specialPayment');
}, {
    name: 'dental.specialPayment',
    title: 'Special Payment',
    header: {title: 'special payment', sub: '', icon: "fa fa-credit-card"},
    breadcrumb: {title: 'Special Payment', parent: 'dental.specialRegister'}
});
