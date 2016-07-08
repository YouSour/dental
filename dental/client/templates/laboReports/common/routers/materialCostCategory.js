Router.route('dental/materialCostCategory', function () {
    this.render('dental_materialCostCategory');
}, {
    name: "dental.materialCostCategory",
    header: {title: "Material Category", sub: "", icon: "fa fa-shopping-cart"},
    title: "Material Category",
    breadcrumb: {title: 'Material Category', parent: 'dental.home'}
});