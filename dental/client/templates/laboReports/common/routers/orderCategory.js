Router.route('dental/orderCategory', function () {
    this.render('dental_orderCategory');
}, {
    name: "dental.orderCategory",
    header: {title: "Order Category", sub: "", icon: "fa fa-shopping-cart"},
    title: "Order Category",
    breadcrumb: {title: 'Order Category', parent: 'dental.home'}
});