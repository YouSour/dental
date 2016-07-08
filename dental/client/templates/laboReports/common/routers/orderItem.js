Router.route('dental/orderItem', function () {
    this.render('dental_orderItem');
}, {
    name: "dental.orderItem",
    title: "Order Item",
    header: {title: "Order Item", sub: "", icon: "fa fa-shopping-cart"},
    breadcrumb: {title: 'Order Item', parent: 'dental.home'}
});