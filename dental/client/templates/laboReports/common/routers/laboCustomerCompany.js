Router.route('dental/laboCustomerCompany', function() {
  this.render('dental_laboCustomerCompany');
}, {
  name: 'dental.laboCustomerCompany',
  title: 'Laboratory Customer Company',
  header: {
    title: 'Laboratory Customer Company',
    sub: '',
    icon: 'building-o'
  },
  breadcrumb: {
    title: 'Laboratory Customer Company',
    parent: 'dental.home'
  }
});
