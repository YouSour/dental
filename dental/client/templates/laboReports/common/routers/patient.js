Router.route('dental/patient', function () {

    this.render('dental_patient');

}, {
    name: 'dental.patient',
    title: "Patient",
    header: {title: 'Patient', sub: '', icon: 'list'},
    breadcrumb: {title: 'Patient', parent: 'dental.home'}
});