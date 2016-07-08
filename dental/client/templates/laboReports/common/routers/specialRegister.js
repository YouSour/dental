Router.route('dental/specialRegister', function () {
    this.render('dental_specialRegister');
}, {
    name: "dental.specialRegister",
    title: "Special Register",
    header: {title: "Special Register", sub: "", icon: "list"},
    breadcrumb: {title: 'Special Register', parent: 'dental.home'}
});