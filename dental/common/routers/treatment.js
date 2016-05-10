Router.route('dental/treatment', function () {
    this.render('dental_treatment');
}, {
    name: 'dental.treatment',
    title: 'Treatment',
    header: {title: 'treatment', sub: '', icon: "fa fa-medkit"},
    breadcrumb: {title: 'Treatment', parent: 'dental.register'}
});
