Router.route('dental/materialCostItem', function () {
    this.render('dental_materialCostItem');
}, {
    name: "dental.materialCostItem",
    title: "Material Item",
    header: {title: "Material Item", sub: "", icon: "fa fa-shopping-cart"},
    breadcrumb: {title: 'Material Item', parent: 'dental.home'}
});