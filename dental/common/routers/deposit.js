Router.route('dental/deposit', function () {
    this.render('dental_deposit');
}, {
    name: 'dental.deposit',
    title: 'Deposit',
    header: {title: 'deposit', sub: '', icon: "fa fa-credit-card"},
    breadcrumb: {title: 'Deposit', parent: 'dental.register'}
});
