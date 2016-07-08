Router.route('dental/home', function () {

    this.render('dental_home');

}, {
    name: 'dental.home',
    title: "Home",
    header: {title: 'home', sub: '', icon: 'home'},
    breadcrumb: {title: 'Home', parent: 'cpanel.welcome'}
});
