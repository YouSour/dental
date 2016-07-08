Router.route('dental/doctor', function () {

    this.render('dental_doctor');

}, {
    name: 'dental.doctor',
    title: "Doctor",
    header: {title: 'Doctor', sub: '', icon: 'list'},
    breadcrumb: {title: 'Doctor', parent: 'dental.home'}
});