Router.route('dental/supplier', function () {
    this.render('dental_supplier');
}, {
    name: "dental.supplier",
    title: "Supplier",
    header: {title: "Supplier", sub: "", icon: "fa fa-truck"},
    breadcrumb: {title: 'Supplier', parent: 'dental.home'}
});