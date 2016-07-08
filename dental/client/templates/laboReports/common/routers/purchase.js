Router.route('dental/purchase', function () {
        this.render('dental_purchase');
    }, {
        name: 'dental.purchase',
        title: "Purchase",
        header: {title: 'purchase', sub: '', icon: 'fa fa-cart-plus'},
        breadcrumb: {title: 'Purchase', parent: 'dental.home'}
    }
);