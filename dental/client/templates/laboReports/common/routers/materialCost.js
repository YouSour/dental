Router.route('dental/materialCost', function () {
        this.render('dental_materialCost');
    }, {
        name: 'dental.materialCost',
        title: "Material Cost",
        header: {title: 'Material Cost', sub: '', icon: 'fa fa-cart-plus'},
        breadcrumb: {title: 'Material Cost', parent: 'dental.home'}
    }
);