Router.route('dental/laboCustomerCompany', function() {
  this.render('dental_laboCustomerCompany');
}, {
  name: 'dental.laboCustomerCompany',
  title: 'Laboratory Doctor Company',
  header: {
    title: 'Laboratory Doctor Company',
    sub: '',
    icon: 'building-o'
  },
  breadcrumb: {
    title: 'Laboratory Doctor Company',
    parent: 'dental.home'
  }
});
