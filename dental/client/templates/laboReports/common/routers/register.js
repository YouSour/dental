Router.route('dental/register', function () {
    this.render('dental_register');
}, {
    name: "dental.register",
    title: "Register",
    header: {title: "Register", sub: "", icon: "list"},
    breadcrumb: {title: 'Register', parent: 'dental.home'}
});