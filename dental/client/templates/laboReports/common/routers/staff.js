Router.route('dental/staff', function () {

    this.render('dental_staff');

}, {
    name: 'dental.staff',
    title: "Staff",
    header: {title: 'Staff', sub: '', icon: 'list'},
    breadcrumb: {title: 'Staff', parent: 'dental.home'}
});