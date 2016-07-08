Router.route('dental/laboratory', function () {
    this.render('dental_laboratory');
}, {
    name: "dental.laboratory",
    title: "Laboratory Item",
    header: {title: "Laboratory Item", sub: "", icon: "fa fa-shopping-cart"},
    breadcrumb: {title: 'Laboratory Item', parent: 'dental.home'}
});