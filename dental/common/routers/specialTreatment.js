Router.route('dental/specialTreatment', function () {
    this.render('dental_specialTreatment');
}, {
    name: 'dental.specialTreatment',
    title: 'Special Treatment',
    header: {title: 'specialTreatment', sub: '', icon: "fa fa-medkit"},
    breadcrumb: {title: 'Special Treatment', parent: 'dental.specialRegister'}
});
