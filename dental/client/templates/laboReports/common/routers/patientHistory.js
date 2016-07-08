Router.route('dental/patientHistory', function () {
    this.render('dental_patientHistory');
}, {
    name: 'dental.patientHistory',
    title: "Patient History",
    header: {title: 'Patient History', sub: '', icon: 'list'},
    breadcrumb: {title: 'Patient History', parent: 'dental.home'}
});