Router.route('dental/laboSalesOrder', function() {
  this.render('dental_laboSalesOrder');
}, {
  name: 'dental.laboSalesOrder',
  title: 'Laboratory Sales Order',
  header: {
    title: 'Laboratory Sales Order',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Sales Order',
    parent: 'dental.home'
  }
});
